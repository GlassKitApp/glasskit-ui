"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap, CircleMarker, Polyline } from "leaflet";
import type * as LeafletNS from "leaflet";

type Leaflet = typeof LeafletNS;
import "leaflet/dist/leaflet.css";
import { cn } from "../lib/utils";

type LatLng = [number, number]; // [lat, lon]

type Place = { at: LatLng; name?: string; image?: string; rating?: string };

/**
 * <MapView> — a real, moving map for the lens, built on Leaflet (~42KB). Dark
 * raster tiles, locked to follow your position: it recenters smoothly as you
 * move (no manual pan/zoom — the glasses have no touch). Your route and a
 * "you are here" marker draw on top in the accent color.
 *
 * Tiles default to CARTO's dark basemap (keyless — fine for previews). In
 * production pass `tileUrl` for your own provider (MapTiler / Stadia free
 * tier); never ship someone else's key. Leaflet loads via dynamic import, so
 * the module is SSR-safe.
 */
export function MapView({
  center,
  zoom = 16,
  route,
  destination,
  places,
  onSelectPlace,
  tileUrl = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  attribution = "© OpenStreetMap © CARTO",
  className,
}: {
  /** Your position [lat, lon] — the map keeps this centered (follow mode). */
  center: LatLng;
  zoom?: number;
  /** The route polyline as [lat, lon] points. Redraws when it changes. */
  route?: LatLng[];
  /** Destination [lat, lon] — a white pin. Redraws when it changes. */
  destination?: LatLng;
  /** Photo markers (restaurants, stops): a circular image + name + rating. */
  places?: Place[];
  /** Fired when a place marker is activated (Enter / click). */
  onSelectPlace?: (index: number, place: Place) => void;
  /** Raster tile template; defaults to CARTO dark (keyless, preview-grade). */
  tileUrl?: string;
  attribution?: string;
  className?: string;
}) {
  const el = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const LRef = useRef<Leaflet | null>(null);
  const accentRef = useRef("#4c8dff");
  const youRef = useRef<CircleMarker | null>(null);
  const routeRef = useRef<Polyline | null>(null);
  const destRef = useRef<CircleMarker | null>(null);
  const onSelectRef = useRef(onSelectPlace);
  onSelectRef.current = onSelectPlace;
  const [ready, setReady] = useState(false);

  // Build the map + tiles + focusable place markers once (dynamic import keeps
  // Leaflet off the server). Route/destination are drawn in the effect below
  // so they can change.
  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};
    void (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !el.current || mapRef.current) return;
      LRef.current = L;
      const accent =
        getComputedStyle(el.current).getPropertyValue("--accent").trim() ||
        "#4c8dff";
      accentRef.current = accent;

      const map = L.map(el.current, {
        center,
        zoom,
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        touchZoom: false,
      });
      L.tileLayer(tileUrl, {
        attribution,
        subdomains: "abcd",
        maxZoom: 20,
      }).addTo(map);

      // Photo place markers are D-pad-FOCUSABLE buttons: the focus engine walks
      // them by screen position (arrows), Enter activates → `onSelectPlace`
      // (the consumer typically routes there). Styling lives in styles.css.
      const pinEls: HTMLElement[] = [];
      (places ?? []).forEach((p, i) => {
        const nameChip = p.name
          ? `<span class="gk-mapview__pin-name">${esc(p.name)}${
              p.rating
                ? `<span class="gk-mapview__pin-rating">★ ${esc(p.rating)}</span>`
                : ""
            }</span>`
          : "";
        const icon = L.divIcon({
          className: "gk-mapview__pinwrap",
          html: `<button type="button" class="focusable gk-mapview__pin" aria-label="${esc(
            p.name ?? "Place",
          )}">${nameChip}<span class="gk-mapview__pin-photo" style="background-image:url('${encodeURI(
            p.image ?? "",
          )}')"></span></button>`,
          iconSize: [46, 54],
          iconAnchor: [23, 54],
        });
        const marker = L.marker(p.at, { icon, interactive: false }).addTo(map);
        const btn = marker.getElement()?.querySelector("button");
        if (btn) {
          pinEls.push(btn);
          btn.addEventListener("click", () => {
            for (const b of pinEls) b.classList.remove("is-selected");
            btn.classList.add("is-selected");
            onSelectRef.current?.(i, p);
          });
        }
      });

      youRef.current = L.circleMarker(center, {
        radius: 8,
        color: "#fff",
        weight: 2,
        fillColor: accent,
        fillOpacity: 1,
      }).addTo(map);

      map.invalidateSize();
      mapRef.current = map;
      setReady(true);
      cleanup = () => {
        map.remove();
        mapRef.current = null;
      };
    })();
    return () => {
      cancelled = true;
      cleanup();
    };
    // build once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reactive route + destination: redraw whenever they change (once the map
  // exists). This is what lets "select a place → route appears."
  useEffect(() => {
    const map = mapRef.current;
    const L = LRef.current;
    if (!map || !L) return;
    routeRef.current?.remove();
    routeRef.current = null;
    destRef.current?.remove();
    destRef.current = null;
    if (route && route.length > 1) {
      routeRef.current = L.polyline(route, {
        color: accentRef.current,
        weight: 6,
        opacity: 0.95,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);
    }
    if (destination) {
      destRef.current = L.circleMarker(destination, {
        radius: 7,
        color: "#fff",
        weight: 3,
        fillColor: "#fff",
        fillOpacity: 1,
      }).addTo(map);
    }
  }, [ready, route, destination]);

  // Follow: glide to the new position and move the marker when center changes.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    map.panTo(center, { animate: true, duration: 0.6 });
    youRef.current?.setLatLng(center);
  }, [center]);

  return <div ref={el} className={cn("gk-mapview", className)} />;
}

/** Escape text before it goes into a Leaflet divIcon's HTML string. */
function esc(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c]!,
  );
}
