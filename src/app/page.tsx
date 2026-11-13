"use client";

import { useState } from "react";
import Link from "next/link";
import { authenticate } from "./actions/auth";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Heart,
  Leaf,
  LockKeyhole,
  Palette,
  ShieldCheck,
  Users,
} from "lucide-react";

type Screen = "home" | "signup" | "signin";
export default function HomePage() {
  const [screen, setScreen] = useState<Screen>("home");
  const [showPassword, setShowPassword] = useState(false);
  const [calm, setCalm] = useState(false);

  return (
    <main className={calm ? "site calm" : "site"}>
      <header className="nav wrap">
        <button className="wordmark" onClick={() => { setScreen("home"); }} aria-label="Autween home">
          <span className="logo-symbol"><span /></span>
          <span>autween</span>
        </button>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <a href="/approach">Our approach</a>
        </nav>
        <div className="nav-actions">
          <button className="text-button" onClick={() => { setScreen("signin"); }}>Log in</button>
          <Link className="nav-cta" href="/play">Try the demo <ArrowUpRight size={16} /></Link>
        </div>
      </header>

      {screen === "home" ? (
        <>
          <section className="hero wrap">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-dot" /> A little more room to be you</div>
              <h1>A world<br /><span>that makes room</span><br />for you.</h1>
              <p className="hero-text">You should not have to change how you communicate to join in. Choose pictures, symbols, words or optional audio. Autween shapes the experience around the choices you make.</p>
              <div className="hero-actions">
                <Link className="primary-button" href="/play">Try Autween <ArrowRight size={18} /></Link>
                <button className="secondary-button" onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}>Take a little tour</button>
              </div>
              <div className="hero-note"><ShieldCheck size={17} /> Designed around choice, kindness and safety.</div>
            </div>
            <div className="hero-art" aria-label="Illustration of a colourful imaginary garden with a friendly fox">
              <div className="sun-orbit" />
              <div className="float-note note-one">✳</div><div className="float-note note-two">✦</div>
              <div className="cloud cloud-one" /><div className="cloud cloud-two" />
              <div className="hill hill-back" /><div className="hill hill-front" />
              <div className="flower flower-one">✿</div><div className="flower flower-two">✿</div>
              <div className="hero-creature"><span className="fox-ear left" /><span className="fox-ear right" /><span className="fox-face"><i /><i /><b /></span><span className="fox-body" /></div>
              <div className="art-caption"><span>✦</span><div><strong>A world of your own</strong><small>Made for curious minds</small></div></div>
            </div>
          </section>

          <section className="quick-values wrap" id="our-promise">
            <div><span className="value-icon lavender"><Heart size={19} /></span><span><strong>Your pace, always</strong><small>There’s no rush here.</small></span></div>
            <div><span className="value-icon mint"><Palette size={19} /></span><span><strong>Many ways to express</strong><small>Make it, draw it, say it.</small></span></div>
            <div><span className="value-icon peach"><Users size={19} /></span><span><strong>Connection without pressure</strong><small>Join in your own way.</small></span></div>
          </section>

          <section className="how-section" id="how-it-works">
            <div className="wrap">
              <div className="section-intro"><div className="eyebrow">Your space, your choices</div><h2>There’s more than one<br />way to join the fun.</h2><p>Some days you want to make something quietly. Some days you want to build with a friend. Both belong here.</p></div>
              <div className="feature-grid">
                <article className="feature-card feature-lilac"><div className="feature-emoji">📖</div><span className="feature-number">01 / IMAGINE</span><h3>Make up a world</h3><p>Dream up characters, stories and places. Your imagination sets the rules.</p><div className="feature-decoration">✳</div></article>
                <article className="feature-card feature-peach"><div className="feature-emoji">🖍️</div><span className="feature-number">02 / CREATE</span><h3>Make it your way</h3><p>Draw, build, arrange, choose. There isn’t one right way to make something.</p><div className="feature-decoration">〰</div></article>
                <article className="feature-card feature-mint"><div className="feature-emoji">🪴</div><span className="feature-number">03 / CONNECT</span><h3>Grow something together</h3><p>Share an idea or add a little piece to a group creation, whenever you’re ready.</p><div className="feature-decoration">✿</div></article>
              </div>
            </div>
          </section>

          <section className="promise-section wrap">
            <div className="promise-art"><div className="promise-sun">☼</div><div className="promise-flower">✿</div><div className="promise-text">Different<br />is wonderful.</div></div>
            <div className="promise-copy"><div className="eyebrow">A promise from us</div><h2>You don’t have<br />to change to belong.</h2><p>Autween is being made with a simple idea: the space should adapt to the person—not the other way around. You choose how you communicate, what you explore and when you take a break.</p><ul><li><Check size={17} /> No points for acting a certain way</li><li><Check size={17} /> No pressure to talk or respond quickly</li><li><Check size={17} /> Your choices can change whenever you do</li></ul><button className="primary-button" onClick={() => setScreen("signup")}>Find your space <ArrowRight size={18} /></button></div>
          </section>
          <footer className="footer"><div className="wrap footer-inner"><a className="wordmark" href="#"><span className="logo-symbol"><span /></span><span>autween</span></a><p>A kinder corner of the internet, still growing.</p><span>Free. Open source. Always.</span></div></footer>
        </>
      ) : (
        <section className="auth-shell">
          <div className="auth-aside">
            <button className="back-link" onClick={() => { setScreen("home"); }}>← Back to Autween</button>
            <div className="auth-art"><div className="auth-sun">✳</div><div className="auth-planet">☾</div><div className="auth-art-title">Your next<br />little adventure<br /><em>starts here.</em></div><div className="auth-art-bottom">A place to play, make and belong.</div></div>
          </div>
          <div className="auth-main">
            <div className="auth-card">
              <div className="eyebrow">{screen === "signup" ? "A new adventure" : "Lovely to see you again"}</div>
              <h1>{screen === "signup" ? "Let’s get started." : "Welcome back."}</h1>
              <p className="auth-intro">{screen === "signup" ? "A parent or trusted grown-up can create a family account to get things ready." : "Sign in to your family space."}</p>
              <div className="auth-switch"><button className={screen === "signup" ? "active" : ""} onClick={() => setScreen("signup")}>Create account</button><button className={screen === "signin" ? "active" : ""} onClick={() => setScreen("signin")}>Log in</button></div>
              <form action={authenticate}>
                <input type="hidden" name="intent" value={screen} />
                {screen === "signup" && <label className="field-label">Grown-up’s name<input required name="guardianName" autoComplete="name" placeholder="Your name" /></label>}
                <label className="field-label">Email address<input required name="email" type="email" autoComplete="email" placeholder="you@example.com" /></label>
                <label className="field-label">Password<span className="password-wrap"><input required name="password" type={showPassword ? "text" : "password"} minLength={screen === "signup" ? 8 : 1} autoComplete={screen === "signup" ? "new-password" : "current-password"} placeholder="At least 8 characters" /><button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button></span></label>
                {screen === "signup" && <label className="consent-line"><input required name="guardianConsent" type="checkbox" /> <span>I’m a parent or legal guardian, and I agree to the <a href="#our-promise">privacy-first approach</a>.</span></label>}
                <button className="primary-button full" type="submit">{screen === "signup" ? "Create family account" : "Log in"} <ArrowRight size={18} /></button>
              </form>
              <div className="auth-safety"><LockKeyhole size={16} /><span>We’ll never ask a child to create a public profile or share personal details to join.</span></div>
              <p className="switch-prompt">{screen === "signup" ? "Already have a family account?" : "New to Autween?"} <button onClick={() => setScreen(screen === "signup" ? "signin" : "signup")}>{screen === "signup" ? "Log in" : "Create an account"}</button></p>
            </div>
          </div>
        </section>
      )}
      <button className="calm-control" onClick={() => setCalm(!calm)} aria-pressed={calm}><Leaf size={16} /> {calm ? "Calm mode on" : "Calm mode"}</button>
    </main>
  );
}
