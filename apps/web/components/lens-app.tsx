"use client";

import { useEffect, useState } from "react";
import { GlassViewport, useDpad, useNeuralBand } from "@glasskit/glasses-ui";

/**
 * A self-contained showcase that runs inside the 600×600 emulator lens, built
 * with nothing but the published `@glasskit/glasses-ui` SDK — the same code
 * path a real glasses app uses.
 *
 * The screens are GENERIC HUD archetypes derived from first principles (Launch,
 * Monitor, Choose, Caption, Notify) — deliberately NOT the boilerplate's named
 * demo apps (those ship separately as a docs `/examples` gallery). The launcher
 * grid is the focus-engine demo: arrows move the ring to the nearest target;
 * Enter opens; the Neural Band "pinch" confirms.
 */

type Screen = "home" | "monitor" | "choose" | "cue" | "notify";

const TILES: { id: Exclude<Screen, "home">; label: string; tagline: string }[] =
  [
    { id: "monitor", label: "Monitor", tagline: "Glanceable readout" },
    { id: "choose", label: "Choose", tagline: "Pinch to confirm" },
    { id: "cue", label: "Cue", tagline: "Hands-free caption" },
    { id: "notify", label: "Notify", tagline: "Glance + reply" },
  ];

export function LensApp() {
  const { seedFocus } = useDpad();
  const [screen, setScreen] = useState<Screen>("home");

  // One useDpad mount for the whole app; re-seed the focus ring each time the
  // screen swaps so the D-pad always lands on something.
  useEffect(() => {
    seedFocus();
  }, [screen, seedFocus]);

  const back = () => setScreen("home");
  return (
    <GlassViewport frame={false}>
      {screen === "home" && <Home onOpen={setScreen} />}
      {screen === "monitor" && <Monitor onBack={back} />}
      {screen === "choose" && <Choose onBack={back} />}
      {screen === "cue" && <Cue onBack={back} />}
      {screen === "notify" && <Notify onBack={back} />}
    </GlassViewport>
  );
}

function Home({ onOpen }: { onOpen: (s: Exclude<Screen, "home">) => void }) {
  return (
    <div className="launcher">
      <p className="label">● GlassKit</p>
      <h1 className="launcher-title">Focus engine</h1>
      <p className="dim launcher-tagline">Arrows move the ring · Enter opens</p>
      <div className="launcher-grid">
        {TILES.map((t) => (
          <button
            key={t.id}
            type="button"
            className="focusable launcher-card"
            onClick={() => onOpen(t.id)}
          >
            <span className="launcher-card__label">{t.label}</span>
            <span className="launcher-card__tagline">{t.tagline}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/** Monitor — the glanceable-readout archetype. */
function Monitor({ onBack }: { onBack: () => void }) {
  return (
    <div className="screen">
      <div className="app-head">
        <span>Monitor</span>
        <span className="tabular-nums">live</span>
      </div>
      <div className="readout">
        <span>Heading</span>
        <strong className="tabular-nums">124°</strong>
      </div>
      <div className="row">
        <div className="readout">
          <span>Pace</span>
          <strong className="tabular-nums">5:20</strong>
        </div>
        <div className="readout">
          <span>Dist</span>
          <strong className="tabular-nums">2.4 km</strong>
        </div>
      </div>
      <button type="button" className="focusable" onClick={onBack}>
        Back
      </button>
    </div>
  );
}

/** Choose — the decision archetype (Enter to pick, pinch to confirm). */
function Choose({ onBack }: { onBack: () => void }) {
  const pinch = useNeuralBand();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (pinch === "pinch") setDone(true);
  }, [pinch]);

  if (done) {
    return (
      <div className="screen">
        <p className="label">● Shared with Maya</p>
        <button type="button" className="focusable" onClick={onBack}>
          Back
        </button>
      </div>
    );
  }
  return (
    <div className="screen">
      <div className="app-head">
        <span>Choose</span>
        <span>decision</span>
      </div>
      <strong className="max-w-[20ch] text-[22px] font-semibold leading-tight">
        Share your location with Maya?
      </strong>
      <div className="row">
        <button
          type="button"
          className="focusable"
          onClick={() => setDone(true)}
        >
          Yes
        </button>
        <button type="button" className="focusable" onClick={onBack}>
          No
        </button>
      </div>
      <p className="dim">Enter to pick · pinch to confirm</p>
    </div>
  );
}

/** Cue — the hands-free caption archetype. */
function Cue({ onBack }: { onBack: () => void }) {
  return (
    <div className="screen">
      <div className="app-head">
        <span>Cue</span>
        <span>caption</span>
      </div>
      <p className="max-w-[26ch] text-[20px] leading-snug">
        &ldquo;Take the next left, then it&rsquo;s the second door on your
        right.&rdquo;
      </p>
      <button type="button" className="focusable" onClick={onBack}>
        Back
      </button>
    </div>
  );
}

/** Notify — the glanceable comms archetype. */
function Notify({ onBack }: { onBack: () => void }) {
  return (
    <div className="screen">
      <div className="app-head">
        <span>Notify</span>
        <span className="tabular-nums">1 new</span>
      </div>
      <p className="label">● Message · Maya</p>
      <p className="max-w-[24ch] text-[19px] leading-snug">
        &ldquo;On my way — five minutes out.&rdquo;
      </p>
      <div className="row">
        <button type="button" className="focusable" onClick={onBack}>
          Dismiss
        </button>
        <button type="button" className="focusable" onClick={onBack}>
          Reply
        </button>
      </div>
    </div>
  );
}
