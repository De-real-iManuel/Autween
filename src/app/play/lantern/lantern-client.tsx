"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, Moon, Pause, Play, RotateCcw, SkipForward, Sparkles, Sun } from "lucide-react";
import type { AgeBand } from "@/lib/age-experience";

type Piece = { id: string; label: string; symbol: string; detail: string };
const pieces: Piece[] = [
  { id: "lantern", label: "Lantern", symbol: "🏮", detail: "A warm lantern for the garden" },
  { id: "moon", label: "Moon", symbol: "🌙", detail: "A moon above the garden" },
  { id: "mushroom", label: "Mushroom", symbol: "🍄", detail: "A small mushroom house" },
  { id: "cat", label: "Cat", symbol: "🐈‍⬛", detail: "A quiet visitor" },
  { id: "star", label: "Star", symbol: "⭐", detail: "A star in the sky" },
  { id: "flower", label: "Flower", symbol: "🌼", detail: "A flower beside the path" },
];
const ageCopy: Record<AgeBand, { eyebrow: string; title: string; prompt: string }> = {
  "6-9": { eyebrow: "A LITTLE NIGHT GARDEN", title: "Make a lantern garden", prompt: "Choose a few things to place in your garden. You can change your mind at any time." },
  "10-12": { eyebrow: "THE NIGHT GARDEN LAB", title: "Design a lantern scene", prompt: "Arrange a scene and decide what makes this place feel welcoming." },
  "13-15": { eyebrow: "CREATIVE SCENE STUDY", title: "Build an atmosphere", prompt: "Compose a small night scene. It can be calm, strange, bright, or something entirely different." },
  "16-17": { eyebrow: "VISUAL CONCEPT EXERCISE", title: "Compose a night garden", prompt: "Use a limited set of elements to establish a visual direction. There is no required outcome." },
};

export default function LanternClient({ initialAgeBand }: { initialAgeBand: AgeBand }) {
  const [ageBand] = useState(initialAgeBand);
  const [mode, setMode] = useState<"symbols" | "words">("symbols");
  const [quiet, setQuiet] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [contrast, setContrast] = useState(false);
  const [density, setDensity] = useState<"simple" | "roomy">("roomy");
  const [paused, setPaused] = useState(false);
  const [piecesOnScene, setPiecesOnScene] = useState<Piece[]>([{ ...pieces[0] }, { ...pieces[1] }]);
  const [note, setNote] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [status, setStatus] = useState("Your garden is ready. Choose an element to add.");

  const copy = ageCopy[ageBand];
  const explanation = useMemo(() => {
    const choices = [
      mode === "symbols" ? "symbol buttons" : "written labels",
      quiet ? "a quiet colour palette" : "the standard colour palette",
      reducedMotion ? "no decorative motion" : "still no automatic animation",
      contrast ? "higher contrast" : "standard contrast",
      density === "simple" ? "a simpler layout" : "a roomier layout",
    ];
    return "This scene is using " + choices.join(", ") + " because you selected those settings. Nothing is inferred about you.";
  }, [mode, quiet, reducedMotion, contrast, density]);

  function addPiece(piece: Piece) {
    setPiecesOnScene(current => [...current, piece]);
    setStatus(piece.detail + " added. You can remove it or reset the scene.");
  }
  function reset() {
    setPiecesOnScene([]);
    setNote("");
    setPaused(false);
    setStatus("The garden is clear. You can start again, or leave whenever you like.");
  }

  return (
    <main className={["lantern-app", quiet ? "lantern-quiet" : "", contrast ? "lantern-contrast" : "", density === "simple" ? "lantern-simple" : "", reducedMotion ? "lantern-still" : ""].join(" ")}>
      <header className="lantern-nav">
        <Link href="/play"><ArrowLeft size={17}/> Back to activities</Link>
        <span>autween <i>special activity</i></span>
        <Link href="/" className="lantern-leave">Leave activity</Link>
      </header>
      <div className="lantern-wrap">
        <div className="lantern-heading">
          <span className="lantern-eyebrow"><Sparkles size={14}/> {copy.eyebrow} · HALLOWEEN SPECIAL</span>
          <h1>{copy.title}</h1>
          <p>{copy.prompt}</p>
        </div>

        <section className="lantern-choice-panel" aria-label="How would you like to participate?">
          <div><strong>How would you like to participate?</strong><small>Choose the way that works for this activity. You can switch at any time.</small></div>
          <div className="lantern-choice-buttons">
            <button type="button" aria-pressed={mode === "symbols"} className={mode === "symbols" ? "active" : ""} onClick={() => setMode("symbols")}>🔣 Symbols</button>
            <button type="button" aria-pressed={mode === "words"} className={mode === "words" ? "active" : ""} onClick={() => setMode("words")}>✍️ Words</button>
          </div>
        </section>

        <div className="lantern-layout">
          <section className="lantern-scene-panel">
            <div className="lantern-scene-top"><div><span>YOUR SCENE</span><small>{piecesOnScene.length} {piecesOnScene.length === 1 ? "element" : "elements"} placed</small></div><button type="button" onClick={() => setShowSettings(value => !value)} aria-expanded={showSettings}><Eye size={16}/> Sensory settings</button></div>
            {showSettings && <div className="lantern-settings" aria-label="Sensory settings">
              <label><input type="checkbox" checked={quiet} onChange={event => setQuiet(event.target.checked)}/> Quiet colours</label>
              <label><input type="checkbox" checked={reducedMotion} onChange={event => setReducedMotion(event.target.checked)}/> Reduce decorative motion</label>
              <label><input type="checkbox" checked={contrast} onChange={event => setContrast(event.target.checked)}/> Higher contrast</label>
              <div className="lantern-density"><span>Visual space</span><button type="button" aria-pressed={density === "simple"} onClick={() => setDensity("simple")}>Simple</button><button type="button" aria-pressed={density === "roomy"} onClick={() => setDensity("roomy")}>Roomy</button></div>
            </div>}
            <div className="lantern-scene" aria-label="Your lantern garden scene">
              <div className="lantern-scene-moon">☾</div><div className="lantern-scene-ground"/>
              {paused ? <div className="lantern-paused"><Pause size={24}/><strong>Activity paused</strong><span>Your scene is still here. Nothing is happening in the background.</span><button type="button" onClick={() => { setPaused(false); setStatus("Welcome back. Continue whenever you are ready."); }}>Continue when ready</button></div> :
                <div className="lantern-scene-items">{piecesOnScene.map((piece, index) => <div className="lantern-piece" key={index}><span aria-hidden="true">{piece.symbol}</span><small>{piece.label}</small><button type="button" onClick={() => setPiecesOnScene(current => current.filter((_, i) => i !== index))} aria-label={"Remove " + piece.label}>×</button></div>)}</div>}
            </div>
            <p className="lantern-status" role="status">{status}</p>
            <div className="lantern-scene-actions">
              <button type="button" onClick={() => setPaused(value => !value)}>{paused ? <Play size={16}/> : <Pause size={16}/>} {paused ? "Resume" : "Pause"}</button>
              <button type="button" onClick={reset}><RotateCcw size={16}/> Reset scene</button>
              <Link href="/play"><SkipForward size={16}/> Skip activity</Link>
            </div>
          </section>

          <aside className="lantern-builder">
            <span className="lantern-builder-label">ADD TO YOUR SCENE</span>
            <p>{mode === "symbols" ? "Choose a symbol to add it." : "Choose an item by its written name."}</p>
            <div className="lantern-piece-options">{pieces.map(piece => <button type="button" key={piece.id} onClick={() => addPiece(piece)}>{mode === "symbols" && <span aria-hidden="true">{piece.symbol}</span>}<strong>{piece.label}</strong></button>)}</div>
            <label className="lantern-note-label" htmlFor="garden-note">Optional words or idea</label>
            <textarea id="garden-note" value={note} onChange={event => setNote(event.target.value)} placeholder="You can describe your garden, or leave this empty." rows={4}/>
            <div className="lantern-explanation"><strong>Why does it look this way?</strong><p>{explanation}</p><button type="button" onClick={() => { setMode("symbols"); setQuiet(true); setReducedMotion(true); setContrast(false); setDensity("roomy"); setStatus("Your presentation choices have been reset to the quiet starting settings."); }}>Reset presentation choices</button></div>
          </aside>
        </div>
        <p className="lantern-footer-note"><EyeOff size={15}/> No camera, microphone, timer, account data or background upload is used in this activity. Your scene stays in this page and is not saved automatically.</p>
      </div>
    </main>
  );
}
