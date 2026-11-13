import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, SlidersHorizontal, Sparkles } from "lucide-react";

const principles = [
  { n: "01", title: "Choose how to join in", body: "Pictures, symbols, words or optional audio. The activity should not make one communication style the price of admission." },
  { n: "02", title: "The environment adapts", body: "Autween uses choices you make to order creative ideas. It does not ask you to change how you communicate to fit the interface." },
  { n: "03", title: "Every suggestion has a reason", body: "You can see which choices influenced a suggestion. You can change those choices, pause personalization or explore in any order." },
  { n: "04", title: "Safety comes before relevance", body: "An activity must pass its eligibility rules before personalization can rank it. A recommendation score can never grant access or override a safety rule." },
];

export default function ApproachPage() {
  return (
    <main className="approach-page">
      <header className="approach-nav"><Link href="/" className="approach-back"><ArrowLeft size={16}/> Back to Autween</Link><Link href="/play" className="approach-try">Try the interactive demo <ArrowRight size={16}/></Link></header>
      <section className="approach-hero">
        <div className="approach-kicker"><Sparkles size={15}/> THE IDEA BEHIND AUTWEEN</div>
        <h1>The environment<br/><span>should do the adapting.</span></h1>
        <p>Digital spaces often expect everyone to communicate, respond and participate in the same way. Autween starts from a different assumption: people should be able to take part without first translating themselves into the system&apos;s preferred format.</p>
      </section>
      <section className="approach-principles">
        {principles.map(item => <article className="approach-card" key={item.n}><span>{item.n}</span><div><h2>{item.title}</h2><p>{item.body}</p></div><CheckCircle2 size={20}/></article>)}
      </section>
      <section className="approach-engine">
        <div className="approach-engine-icon"><SlidersHorizontal size={23}/></div>
        <div><div className="approach-kicker">THE FIRST TECHNICAL PRINCIPLE</div><h2>Explainable adaptation, not a chatbot.</h2><p>The prototype uses a deterministic preference engine. It checks activity eligibility, compares activities with choices you explicitly made, then explains the result. There is no emotion recognition, diagnosis inference or behavioural score.</p><div className="approach-flow"><span>YOUR CHOICES</span><b>→</b><span>SAFETY CHECK</span><b>→</b><span>RELEVANCE ORDER</span><b>→</b><span>PLAIN-LANGUAGE REASON</span></div></div>
      </section>
      <section className="approach-boundaries">
        <ShieldCheck size={22}/><div><h2>What Autween does not do</h2><p>It does not score children, reward neurotypical behaviour, require speech, track eye contact, infer emotions or treat silence as rejection. The current demo uses fictional data and does not connect children to one another.</p></div>
      </section>
      <footer className="approach-footer"><span>Autween is a free, open-source project in development.</span><Link href="/play">Experience the prototype <ArrowRight size={15}/></Link></footer>
    </main>
  );
}
