import { useEffect, useState } from "react";

/**
 * Device sensor hooks for the Meta Ray-Ban Display.
 *
 * The Display's Web Apps platform exposes standard W3C sensor APIs —
 * no proprietary SDK. These hooks wrap them with a React-friendly
 * shape. In the browser you can drive them with Chrome DevTools'
 * Sensors panel (orientation, location) for local development.
 *
 * Note: `deviceorientation` and `devicemotion` fire ~60Hz, so each
 * hook guards setState — it only re-renders when a value actually
 * changes. Critical on the Display's tight perf budget.
 */

type Orientation = {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
};

type Motion = { x: number | null; y: number | null; z: number | null };

/** Exported for testing — the per-render no-op guard for orientation. */
export function orientationEqual(a: Orientation, b: Orientation): boolean {
  return a.alpha === b.alpha && a.beta === b.beta && a.gamma === b.gamma;
}

/** Exported for testing — the per-render no-op guard for motion. */
export function motionEqual(a: Motion, b: Motion): boolean {
  return a.x === b.x && a.y === b.y && a.z === b.z;
}

/** Head orientation — compass heading + tilt, in degrees. */
export function useDeviceOrientation() {
  const [orientation, setOrientation] = useState<Orientation>({
    alpha: null,
    beta: null,
    gamma: null,
  });

  useEffect(() => {
    function handle(e: DeviceOrientationEvent) {
      const next: Orientation = {
        alpha: e.alpha,
        beta: e.beta,
        gamma: e.gamma,
      };
      setOrientation((prev) => (orientationEqual(prev, next) ? prev : next));
    }
    window.addEventListener("deviceorientation", handle);
    return () => window.removeEventListener("deviceorientation", handle);
  }, []);

  return orientation;
}

/** Motion — acceleration (incl. gravity) on each axis, in m/s². */
export function useDeviceMotion() {
  const [motion, setMotion] = useState<Motion>({ x: null, y: null, z: null });

  useEffect(() => {
    function handle(e: DeviceMotionEvent) {
      const a = e.accelerationIncludingGravity;
      const next: Motion = {
        x: a?.x ?? null,
        y: a?.y ?? null,
        z: a?.z ?? null,
      };
      setMotion((prev) => (motionEqual(prev, next) ? prev : next));
    }
    window.addEventListener("devicemotion", handle);
    return () => window.removeEventListener("devicemotion", handle);
  }, []);

  return motion;
}

/** Live GPS — watches the phone's location. */
export function useGeolocation() {
  const [position, setPosition] = useState<{
    lat: number;
    lon: number;
    accuracy: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation is not available.");
      return;
    }
    // Guard against the success/error callback firing after unmount —
    // the OS can take seconds to acquire the first fix, and the user
    // may have navigated away by then.
    let cancelled = false;
    const watchId = navigator.geolocation.watchPosition(
      (p) => {
        if (cancelled) return;
        setPosition({
          lat: p.coords.latitude,
          lon: p.coords.longitude,
          accuracy: p.coords.accuracy,
        });
      },
      (e) => {
        if (cancelled) return;
        setError(e.message);
      },
      { enableHighAccuracy: true, maximumAge: 5000 },
    );
    return () => {
      cancelled = true;
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return { position, error };
}

/**
 * Neural Band gestures — the wristband's pinch / swipe events.
 *
 * Core gestures already arrive as D-pad arrow keys + Enter (see
 * dpad.tsx). This hook is the seam for the *richer* gestures (pinch,
 * double-pinch, swipe) — it listens for a `neuralband` CustomEvent.
 *
 * It's a **one-shot**: the gesture string is exposed for one render,
 * then cleared on the next microtask. That way `useEffect(...,
 * [gesture])` re-fires for every event, even two consecutive
 * identical pinches.
 *
 * Simulate in dev:
 *   window.dispatchEvent(
 *     new CustomEvent("neuralband", { detail: { gesture: "pinch" } }),
 *   );
 */
export function useNeuralBand() {
  const [gesture, setGesture] = useState<string | null>(null);

  useEffect(() => {
    function handle(e: Event) {
      const detail = (e as CustomEvent<{ gesture?: string }>).detail;
      const g = detail?.gesture ?? null;
      if (g == null) return;
      setGesture(g);
      queueMicrotask(() => setGesture(null));
    }
    window.addEventListener("neuralband", handle);
    return () => window.removeEventListener("neuralband", handle);
  }, []);

  return gesture;
}
