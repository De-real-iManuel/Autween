"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Heart, Leaf, Moon, Plus, RotateCcw, Sparkles, Sun, Users, X } from "lucide-react";
import { explainActivity, rankActivities, type Activity, type Interest, type ParticipationMode, type Preferences } from "@/lib/adaptive-engine";

const activities: Activity[] = [
  { id: "world", title: "Build an underwater world", description: "Place sea creatures, plants and curious objects. Make a place that belongs to you.", emoji: "🪸", category: "building", modes: ["visual", "symbols", "text"], sensory: "gentle", minutes: "Take your time" },
  { id: "story", title: "Make a tiny story", description: "Choose a character, a place and what happens next. There is no wrong ending.", emoji: "📖", category: "stories", modes: ["visual", "symbols", "text", "audio"], sensory: "gentle", minutes: "A few little steps" },
  { id: "patterns", title: "Play with patterns", description: "Arrange shapes, colours and repeating patterns until they feel just right.", emoji: "🧩", category: "puzzles", modes: ["visual", "symbols"], sensory: "quiet", minutes: "No timer" },
  { id: "garden", title: "Grow a little garden", description: "Choose plants, arrange a garden and see what you can create.", emoji: "🌱", category: "nature", modes: ["visual", "symbols", "text"], sensory: "quiet", minutes: "At your pace" },
];

const interestOptions: { id: Interest; label: string; emoji: string }[] = [
  { id: "building", label: "Building", emoji: "🧱" }, { id: "stories", label: "Stories", emoji: "📚" },
  { id: "art", label: "Art", emoji: "🎨" }, { id: "puzzles", label: "Patterns", emoji: "🧩" },
  { id: "nature", label: "Nature", emoji: "🌿" }, { id: "animals", label: "Animals", emoji: "🦊" },
];

const objects = [
  { id: "coral", label: "Coral", emoji: "🪸" }, { id: "fish", label: "Fish", emoji: "🐠" },
  { id: "turtle", label: "Turtle", emoji: "🐢" }, { id: "shell", label: "Shell", emoji: "🐚" },
  { id: "plant", label: "Sea plant", emoji: "🌿" }, { id: "star", label: "Star", emoji: "⭐" },
  { id: "submarine", label: "Submarine", emoji: "🚢" }, { id: "bubble", label: "Bubbles", emoji: "🫧" },
];

type WorldItem = { id: number; emoji: string; label: string; by: string; tilt: number };

const defaultPreferences: Preferences = {
  interests: ["building", "nature"],
  modes: ["visual", "symbols"],
  sensory: "gentle",
  pace: "self",
  personalization: true,
};

export default function PlayPage() {
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);
  const [setupOpen, setSetupOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"discover" | "create" | "preferences">("discover");
  const [participant, setParticipant] = useState<"You" | "Friend">("You");
  const [worldItems, setWorldItems] = useState<WorldItem[]>([
    { id: 1, emoji: "🪸", label: "Coral", by: "You", tilt: -5 },
    { id: 2, emoji: "🐠", label: "Fish", by: "Friend", tilt: 4 },
    { id: 3, emoji: "🌿", label: "Sea plant", by: "You", tilt: 2 },
  ]);
  const [feedback, setFeedback] = useState<Record<string, "again" | "later">>({});
  const [calm, setCalm] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("autween-demo-preferences");
      if (saved) setPreferences({ ...defaultPreferences, ...JSON.parse(saved) });
    } catch { /* Keep safe demo defaults if local storage is unavailable. */ }
  }, []);

  useEffect(() => {
    try { window.localStorage.setItem("autween-demo-preferences", JSON.stringify(preferences)); }
    catch { /* The experience still works without persistence. */ }
  }, [preferences]);

  const ranked = useMemo(() => rankActivities(activities, preferences, feedback), [preferences, feedback]);
  const toggleInterest = (interest: Interest) => setPreferences(p => ({
    ...p, interests: p.interests.includes(interest) ? p.interests.filter(x => x !== interest) : [...p.interests, interest],
  }));
  const toggleMode = (mode: ParticipationMode) => setPreferences(p => ({
    ...p, modes: p.modes.includes(mode) ? p.modes.filter(x => x !== mode) : [...p.modes, mode],
  }));
  const addObject = (item: typeof objects[number]) => setWorldItems(current => [
    ...current, { id: Date.now(), emoji: item.emoji, label: item.label, by: participant, tilt: (current.length % 5 - 2) * 3 },
  ]);

  return (
    <main className={calm || preferences.sensory === "quiet" ? "play-app low-stimulation" : "play-app"}>
      <header className="play-topbar">
        <Link className="play-brand" href="/"><span className="play-brand-mark">a</span> autween</Link>
        <div className="demo-label"><span /> Interactive prototype · fictional demo</div>
        <div className="play-top-actions">
          <button className="icon-action" onClick={() => setCalm(v => !v)} aria-pressed={calm} title="Toggle calm presentation">{calm ? <Sun size={17}/> : <Moon size={17}/>}</button>
          <Link className="leave-button" href="/"><X size={16}/> Leave</Link>
        </div>
      </header>

      <div className="play-layout">
        <aside className="play-sidebar">
          <div className="profile-mini"><div className="profile-avatar">🌻</div><div><strong>Sunny's space</strong><span>Just for this demo</span></div></div>
          <div className="side-label">YOUR SPACE</div>
          <button className={activeTab === "discover" ? "side-link active" : "side-link"} onClick={() => setActiveTab("discover")}><Sparkles size={17}/> Discover</button>
          <button className={activeTab === "create" ? "side-link active" : "side-link"} onClick={() => setActiveTab("create")}><Heart size={17}/> My world</button>
          <button className={activeTab === "preferences" ? "side-link active" : "side-link"} onClick={() => setActiveTab("preferences")}><Leaf size={17}/> My choices</button>
          <div className="sidebar-note"><ShieldCheckIcon/><strong>You are in charge.</strong><span>Skip, pause or change anything. There is no score.</span></div>
          <div className="side-footer"><LockIcon/> No real child information is used here.</div>
        </aside>

        <section className="play-main">
          {setupOpen && (
            <div className="setup-banner">
              <div><span className="eyebrow-small">FIRST, MAKE IT YOURS</span><strong>How would you like to join in today?</strong><p>Pick what feels good. You can change these choices whenever you like.</p></div>
              <button className="setup-close" onClick={() => setSetupOpen(false)} aria-label="Close setup"><X size={18}/></button>
              <div className="setup-controls">
                <div className="setup-group"><span>Ways to join</span>{(["visual", "symbols", "text", "audio"] as ParticipationMode[]).map(mode => <button key={mode} onClick={() => toggleMode(mode)} className={preferences.modes.includes(mode) ? "choice-chip selected" : "choice-chip"}>{mode === "visual" ? "👀 Pictures" : mode === "symbols" ? "🔣 Symbols" : mode === "text" ? "✍️ Words" : "🔊 Optional audio"}{preferences.modes.includes(mode) && <Check size={13}/>}</button>)}</div>
                <div className="setup-group"><span>Things you enjoy</span>{interestOptions.map(item => <button key={item.id} onClick={() => toggleInterest(item.id)} className={preferences.interests.includes(item.id) ? "choice-chip selected" : "choice-chip"}>{item.emoji} {item.label}{preferences.interests.includes(item.id) && <Check size={13}/>}</button>)}</div>
              </div>
              <button className="setup-done" onClick={() => setSetupOpen(false)}>That feels right <ArrowRight size={16}/></button>
            </div>
          )}

          {activeTab === "discover" && (
            <>
              <div className="welcome-row"><div><div className="eyebrow-small">A PLACE TO PLAY YOUR WAY</div><h1>What would you like to make?</h1><p>There is no rush. Pick something, or just explore.</p></div><div className="welcome-sun">☀️</div></div>
              <div className="recommend-heading"><div><h2>A few ideas for you</h2><span>{preferences.personalization ? "Based on the choices you made" : "A mix of activities, without personalisation"}</span></div><button className="text-control" onClick={() => setActiveTab("preferences")}>Change my choices <ArrowRight size={15}/></button></div>
              <div className="activity-grid">{ranked.map((activity) => (
                <article className={"activity-card activity-" + activity.category} key={activity.id}>
                  <div className="activity-card-top"><span className="activity-emoji">{activity.emoji}</span><span className="activity-time">{activity.minutes}</span></div>
                  <h3>{activity.title}</h3><p>{activity.description}</p>
                  <div className="activity-explain"><Sparkles size={14}/><span>{explainActivity(activity, preferences)}</span></div>
                  <div className="activity-card-bottom"><button className="start-activity" onClick={() => setActiveTab("create")}>{activity.id === "world" ? "Open my world" : "Try this idea"} <ArrowRight size={15}/></button><button className="feedback-button" onClick={() => setFeedback(f => ({...f, [activity.id]: f[activity.id] === "again" ? "later" : "again"}))} aria-label="Tell Autween about this suggestion">{feedback[activity.id] === "again" ? <Check size={17}/> : <Heart size={17}/>}</button></div>
                </article>
              ))}</div>
              <div className="gentle-reminder"><Heart size={17}/><span><strong>Your choices are not a test.</strong> Autween uses them only to make suggestions you can change or ignore.</span></div>
            </>
          )}

          {activeTab === "create" && (
            <>
              <div className="welcome-row"><div><div className="eyebrow-small">YOUR CREATIVE SPACE</div><h1>Our underwater world</h1><p>Every little piece makes it more yours.</p></div><div className="world-count">{worldItems.length}<span>little things</span></div></div>
              <div className="world-board-wrap">
                <div className="world-board-header"><div><strong>🌊 The blue place</strong><span>A shared creation · demo mode</span></div><div className="contributor-switch"><button className={participant === "You" ? "active" : ""} onClick={() => setParticipant("You")}>🌻 You</button><button className={participant === "Friend" ? "active" : ""} onClick={() => setParticipant("Friend")}>🦊 Friend</button></div></div>
                <div className="world-board" aria-label="Underwater world creative board">
                  <div className="board-sun">☀️</div><div className="board-seaweed seaweed-one">🌿</div><div className="board-seaweed seaweed-two">🌱</div>
                  {worldItems.map(item => <div className="world-sticker" key={item.id} style={{ transform: "rotate(" + item.tilt + "deg)" }} title={item.label + " added by " + item.by}><span>{item.emoji}</span><small>{item.by}</small></div>)}
                  <div className="board-caption">A place made together</div>
                </div>
                <div className="object-picker"><div><strong>Add something to our world</strong><span>Choose an object. You can take turns or add something later.</span></div><div className="object-grid">{objects.map(item => <button key={item.id} onClick={() => addObject(item)}><span>{item.emoji}</span><small>{item.label}</small><Plus size={13}/></button>)}</div></div>
                <div className="collab-note"><Users size={17}/><span><strong>Two ways to take part.</strong> Switch between the two demo contributors to explore turn-taking. This prototype keeps the board on this device; it does not connect real children or sync across devices.</span></div>
                <button className="reset-world" onClick={() => setWorldItems([])}><RotateCcw size={14}/> Clear the world</button>
              </div>
            </>
          )}

          {activeTab === "preferences" && (
            <>
              <div className="welcome-row"><div><div className="eyebrow-small">YOUR CHOICES, YOURS TO CHANGE</div><h1>What feels good to you?</h1><p>These choices help Autween make suggestions. They are never a score.</p></div><div className="welcome-sun">🌈</div></div>
              <div className="preferences-panel">
                <section><h2>Things I enjoy</h2><p>Choose any that sound fun today.</p><div className="preference-options">{interestOptions.map(item => <button key={item.id} onClick={() => toggleInterest(item.id)} className={preferences.interests.includes(item.id) ? "preference-option chosen" : "preference-option"}><span>{item.emoji}</span>{item.label}{preferences.interests.includes(item.id) && <Check size={16}/>}</button>)}</div></section>
                <section><h2>Ways I like to join in</h2><p>You can choose more than one. You do not need to use them all.</p><div className="preference-options">{(["visual", "symbols", "text", "audio"] as ParticipationMode[]).map(mode => <button key={mode} onClick={() => toggleMode(mode)} className={preferences.modes.includes(mode) ? "preference-option chosen" : "preference-option"}><span>{mode === "visual" ? "👀" : mode === "symbols" ? "🔣" : mode === "text" ? "✍️" : "🔊"}</span>{mode === "visual" ? "Pictures" : mode === "symbols" ? "Symbols" : mode === "text" ? "Words" : "Optional audio"}{preferences.modes.includes(mode) && <Check size={16}/>}</button>)}</div></section>
                <section><h2>How should things feel?</h2><p>Choose a visual style for this visit.</p><div className="preference-options"><button className={preferences.sensory === "gentle" ? "preference-option chosen" : "preference-option"} onClick={() => setPreferences(p => ({...p, sensory:"gentle"}))}>🌤️ Gentle and colourful{preferences.sensory === "gentle" && <Check size={16}/>}</button><button className={preferences.sensory === "quiet" ? "preference-option chosen" : "preference-option"} onClick={() => setPreferences(p => ({...p, sensory:"quiet"}))}>🌙 Quieter and simpler{preferences.sensory === "quiet" && <Check size={16}/>}</button></div></section>
                <section className="personalization-setting"><div><h2>Personalised suggestions</h2><p>{preferences.personalization ? "Suggestions use only the choices you made here." : "You will see a varied list instead of preference-based suggestions."}</p></div><button className={preferences.personalization ? "toggle-switch on" : "toggle-switch"} onClick={() => setPreferences(p => ({...p, personalization:!p.personalization}))} role="switch" aria-checked={preferences.personalization}><span/></button></section>
                <div className="engine-explainer"><Sparkles size={18}/><div><strong>How Autween makes suggestions</strong><p>{preferences.personalization ? "It checks which activities match the interests and ways of joining in that you selected. It does not guess your feelings, diagnose you or measure how you behave." : "Personalisation is paused. You can still explore every activity, in any order."}</p></div></div>
                <button className="reset-preferences" onClick={() => {setPreferences(defaultPreferences); setFeedback({});}}> <RotateCcw size={15}/> Reset my choices</button>
              </div>
            </>
          )}
          <footer className="play-footer"><span>Autween · A place to play your way.</span><span>Prototype with fictional demo data. Not a live social network.</span></footer>
        </section>
      </div>
    </main>
  );
}

function ShieldCheckIcon() { return <span className="sidebar-shield">✓</span>; }
function LockIcon() { return <span className="sidebar-lock">⌑</span>; }
