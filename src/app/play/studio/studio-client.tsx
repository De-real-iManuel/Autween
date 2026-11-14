"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, BookOpen, Check, Download, FileText, Layers, Lightbulb,
  RotateCcw, Save, Sparkles, Volume2, VolumeX,
} from "lucide-react";
import { ageBands, getAgeExperience, isAgeBand, type AgeBand, type StudioFormat } from "@/lib/age-experience";

type ParticipationMode = "symbols" | "words" | "both";
type Draft = {
  ageBand: AgeBand;
  title: string;
  format: StudioFormat;
  participationMode: ParticipationMode;
  content: string;
};
const symbols = [
  { value: "🌱", label: "A beginning" },
  { value: "🌈", label: "A change" },
  { value: "🏡", label: "A place" },
  { value: "🐚", label: "A discovery" },
  { value: "🌙", label: "A quiet moment" },
  { value: "✨", label: "An idea" },
  { value: "🌀", label: "A pattern" },
  { value: "🧩", label: "A piece to connect" },
];

function isStudioFormat(value: unknown): value is StudioFormat {
  return value === "story" || value === "visual-journal" || value === "zine" || value === "worldbuilding";
}

function isParticipationMode(value: unknown): value is ParticipationMode {
  return value === "symbols" || value === "words" || value === "both";
}

export default function CreativeStudioPage({
  initialAgeBand,
  storageScope,
}: {
  initialAgeBand: AgeBand;
  storageScope: string | null;
}) {
  const [ageBand, setAgeBand] = useState<AgeBand>(initialAgeBand);
  const [format, setFormat] = useState<StudioFormat>("visual-journal");
  const [title, setTitle] = useState("Untitled project");
  const [content, setContent] = useState("");
  const [participationMode, setParticipationMode] = useState<ParticipationMode>(
    initialAgeBand === "6-9" ? "symbols" : initialAgeBand === "10-12" ? "both" : "words",
  );
  const [quietMode, setQuietMode] = useState(true);
  const [saved, setSaved] = useState(false);
  const [status, setStatus] = useState("");
  const experience = useMemo(() => getAgeExperience(ageBand), [ageBand]);
  const selectedFormat = experience.formats.find(item => item.id === format) ?? experience.formats[0];
  const storageKey = storageScope ? "autween-studio-draft-v2:" + storageScope : null;
  const ageStyle = ageBand === "6-9" ? "studio-young" : ageBand === "10-12" ? "studio-maker" : "studio-teen";

  useEffect(() => () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }, []);

  function changeAgeBand(next: AgeBand) {
    setAgeBand(next);
    const formats = getAgeExperience(next).formats;
    if (!formats.some(item => item.id === format)) setFormat(formats[0].id);
    setSaved(false);
  }

  function addSymbol(symbol: string, label: string) {
    setContent(current => current ? current + " " + symbol : symbol);
    setSaved(false);
    setStatus(label + " added to your project.");
  }

  function readPrompt() {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      setStatus("Audio reading is not available in this browser. The prompt is still shown as text.");
      return;
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(selectedFormat.prompt));
    setStatus("Reading the optional starting idea aloud.");
  }

  function stopReading() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setStatus("Audio reading stopped.");
  }

  function loadDraft() {
    if (!storageKey) {
      setStatus("Local saving is available when this studio is opened from a guardian-managed participant space.");
      return;
    }
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) {
        setStatus("There is no saved draft for this participant space yet.");
        return;
      }
      const draft = JSON.parse(raw) as Partial<Draft>;
      if (
        !isAgeBand(draft.ageBand) ||
        typeof draft.title !== "string" ||
        !isStudioFormat(draft.format) ||
        !isParticipationMode(draft.participationMode) ||
        typeof draft.content !== "string"
      ) {
        setStatus("That saved draft could not be opened. It has not been changed.");
        return;
      }
      const formats = getAgeExperience(draft.ageBand).formats;
      setAgeBand(draft.ageBand);
      setTitle(draft.title.slice(0, 80));
      setFormat(formats.some(item => item.id === draft.format) ? draft.format : formats[0].id);
      setParticipationMode(draft.participationMode);
      setContent(draft.content);
      setSaved(true);
      setStatus("Draft loaded from this device. It was not uploaded.");
    } catch {
      setStatus("Local storage is unavailable or the saved draft could not be read.");
    }
  }

  function saveDraft() {
    if (!storageKey) {
      setStatus("Local saving is unavailable here. You can export a copy instead.");
      return;
    }
    const draft: Draft = { ageBand, title, format, participationMode, content };
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(draft));
      setSaved(true);
      setStatus("Saved on this device for this participant space. Nothing was uploaded.");
    } catch {
      setSaved(false);
      setStatus("This browser could not save the draft. Try exporting a copy.");
    }
  }

  function exportDraft() {
    const markdown = ["# " + title, "", "Format: " + selectedFormat.title, "", content, ""].join("\n");
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "autween-creative-project.md";
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus("A Markdown copy was exported at your request.");
  }

  function resetDraft() {
    setTitle("Untitled project");
    setContent("");
    setSaved(false);
    if (storageKey) {
      try {
        window.localStorage.removeItem(storageKey);
      } catch {
        setStatus("The draft was cleared from this screen, but browser storage could not be reached.");
        return;
      }
    }
    setStatus("The current project and its local saved copy were cleared.");
  }

  return (
    <main className={["studio-page", ageStyle, quietMode ? "studio-quiet" : ""].join(" ")}>
      <header className="studio-nav">
        <Link href="/play"><ArrowLeft size={17} /> Back to activities</Link>
        <span className="studio-wordmark">autween <i>studio</i></span>
        <span className="studio-local-label"><span /> {storageScope ? "Private on this device" : "Export-only session"}</span>
      </header>
      <section className="studio-shell">
        <div className="studio-intro">
          <span className="studio-kicker"><Sparkles size={14} /> A SPACE TO MAKE THINGS</span>
          <h1>{ageBand === "16-17" ? "Your ideas, your workspace." : ageBand === "13-15" ? "Make room for an idea." : "What would you like to create?"}</h1>
          <p>{experience.introduction}</p>
        </div>

        <section className="studio-age-panel" aria-labelledby="age-heading">
          <div>
            <span className="studio-section-label" id="age-heading">EXPERIENCE PREVIEW</span>
            <p>This changes prompts and presentation only. It is a reversible preview, not age verification or an assessment.</p>
          </div>
          <div className="studio-age-options" role="group" aria-label="Choose an age-aware experience preview">
            {ageBands.map(band => (
              <button type="button" key={band.id} aria-pressed={ageBand === band.id} className={ageBand === band.id ? "selected" : ""} onClick={() => changeAgeBand(band.id)}>
                {band.label}
              </button>
            ))}
          </div>
        </section>

        <div className="studio-workspace">
          <aside className="studio-tools">
            <span className="studio-section-label">PROJECT FORMAT</span>
            {experience.formats.map(item => (
              <button type="button" key={item.id} aria-pressed={format === item.id} className={format === item.id ? "selected" : ""} onClick={() => { setFormat(item.id); setSaved(false); }}>
                <span className="studio-tool-icon">
                  {item.id === "story" ? <BookOpen size={18} /> : item.id === "zine" ? <Layers size={18} /> : item.id === "worldbuilding" ? <Lightbulb size={18} /> : <FileText size={18} />}
                </span>
                <span><strong>{item.title}</strong><small>{item.description}</small></span>
              </button>
            ))}
          </aside>

          <section className="studio-editor">
            <div className="studio-editor-top">
              <div><span className="studio-section-label">{experience.label.toUpperCase()}</span><h2>{selectedFormat.title}</h2></div>
              <span className="studio-style-note">{experience.tone}</span>
            </div>

            <div className="studio-participation">
              <span className="studio-section-label">HOW WOULD YOU LIKE TO WORK?</span>
              <div role="group" aria-label="Choose a way to participate">
                <button type="button" aria-pressed={participationMode === "symbols"} className={participationMode === "symbols" ? "selected" : ""} onClick={() => { setParticipationMode("symbols"); setSaved(false); }}>Symbols</button>
                <button type="button" aria-pressed={participationMode === "words"} className={participationMode === "words" ? "selected" : ""} onClick={() => { setParticipationMode("words"); setSaved(false); }}>Words</button>
                <button type="button" aria-pressed={participationMode === "both"} className={participationMode === "both" ? "selected" : ""} onClick={() => { setParticipationMode("both"); setSaved(false); }}>Both</button>
              </div>
              <p className="studio-adaptation-note">
                Current view: {ageBand} preview, {participationMode} participation, and {quietMode ? "quiet" : "standard"} presentation. These are your choices; nothing is inferred from how you use the studio.
              </p>
            </div>

            <label className="studio-field-label">PROJECT TITLE<input value={title} onChange={event => { setTitle(event.target.value); setSaved(false); }} maxLength={80} /></label>

            <div className="studio-prompt">
              <Sparkles size={16} />
              <div><strong>A starting point — only if useful</strong><p>{selectedFormat.prompt}</p></div>
            </div>
            <div className="studio-audio-controls">
              <button type="button" onClick={readPrompt}><Volume2 size={15} /> Read idea aloud</button>
              <button type="button" onClick={stopReading}><VolumeX size={15} /> Stop audio</button>
            </div>
            <p className="studio-audio-note">Read-aloud uses the voice available through your browser or device. Autween does not request microphone access or record audio.</p>

            {(participationMode === "symbols" || participationMode === "both") && (
              <section className="studio-symbol-section" aria-label="Symbol idea board">
                <span className="studio-field-label">ADD AN IDEA WITH SYMBOLS</span>
                <div className="studio-symbol-board">
                  {symbols.map(item => <button type="button" key={item.value} aria-label={item.label} title={item.label} onClick={() => addSymbol(item.value, item.label)}><span aria-hidden="true">{item.value}</span><small>{item.label}</small></button>)}
                </div>
              </section>
            )}

            {participationMode === "symbols" ? (
              <section className="studio-symbol-output" aria-label="Your symbol composition">
                <span className="studio-field-label">YOUR SYMBOLS</span>
                <p>{content || "Choose any symbols above. You can leave this empty."}</p>
              </section>
            ) : (
              <label className="studio-field-label">YOUR WORK<textarea value={content} onChange={event => { setContent(event.target.value); setSaved(false); }} placeholder="Start anywhere. You can change direction, leave this blank or come back later." rows={10} /></label>
            )}

            <div className="studio-actions">
              <button type="button" className="studio-export" onClick={loadDraft} disabled={!storageKey}>Load saved draft</button>
              <button type="button" className="studio-save" onClick={saveDraft} disabled={!storageKey}><Save size={16} /> Save on this device</button>
              <button type="button" className="studio-export" onClick={exportDraft}><Download size={16} /> Export as Markdown</button>
              <button type="button" className="studio-reset" onClick={resetDraft}><RotateCcw size={15} /> Clear</button>
              <button type="button" className="studio-export" onClick={() => setQuietMode(value => !value)} aria-pressed={quietMode}>{quietMode ? "Quiet presentation on" : "Quiet presentation off"}</button>
            </div>
            <p className="studio-privacy-note" role="status" aria-live="polite">
              {status || (storageScope ? "Drafts stay in this browser and are separated by participant space." : "This session does not save locally. Export a copy only if you choose.")}
            </p>
            {saved && <p className="studio-saved"><Check size={15} /> Saved locally. It has not been uploaded.</p>}
          </section>
        </div>
      </section>
    </main>
  );
}
