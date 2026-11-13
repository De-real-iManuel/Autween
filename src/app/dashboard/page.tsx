import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Compass, Heart, Palette, ShieldCheck, Sparkles } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createParticipantProfile } from "./actions";

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ error?: string; created?: string }> }) {
  const params = await searchParams;
  let supabase;
  try { supabase = await createSupabaseServerClient(); } catch { redirect("/auth/message?kind=setup"); }
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/?screen=signin");
  const { data: profiles } = await supabase.from("participant_profiles").select("id,display_name,age_band,created_at").order("created_at", { ascending: true });

  return <main className="account-dashboard">
    <header className="dashboard-nav"><Link href="/" className="play-brand"><span className="play-brand-mark">a</span> autween</Link><span>Family space</span><form action="/auth/signout" method="post"><button className="dashboard-signout">Sign out</button></form></header>
    <section className="dashboard-content">
      <div className="dashboard-welcome"><span className="eyebrow">YOUR FAMILY SPACE</span><h1>A space to grow, create and explore.</h1><p>Signed in as {user.email}. You’re in control of the profiles connected to this family account.</p></div>
      <div className="dashboard-shortcuts"><Link href="/play"><Sparkles/><strong>Explore activities</strong><span>Open the interactive Autween experience <ArrowRight size={15}/></span></Link><Link href="/approach"><Heart/><strong>Our approach</strong><span>How Autween is designed to adapt <ArrowRight size={15}/></span></Link></div>
      <section className="family-panel"><div className="family-heading"><div><span className="eyebrow">PARTICIPANT SPACES</span><h2>Your family profiles</h2></div><ShieldCheck/></div>
      {profiles?.length ? <div className="participant-list">{profiles.map(profile => <article key={profile.id}><span className="participant-avatar"><Palette/></span><div><strong>{profile.display_name}</strong><small>Age range: {profile.age_band}</small></div><span className="profile-private">Private</span></article>)}</div> : <p className="empty-profiles">No participant spaces have been created yet. You can create one below using a nickname and an age range. You do not need to enter a date of birth or diagnosis.</p>}
      {params.created && <p className="form-success">Participant space created.</p>}
      {params.error && <p className="form-error">We couldn’t save that profile. Check the details and try again.</p>}
      <form action={createParticipantProfile} className="profile-create-form"><h3>Create a participant space</h3><label>Nickname<input name="nickname" required maxLength={32} placeholder="A name used inside Autween"/></label><label>Age range<select name="ageBand" required defaultValue=""><option value="" disabled>Choose an age range</option><option value="6-9">6–9 years</option><option value="10-12">10–12 years</option><option value="13-15">13–15 years</option><option value="16-17">16–17 years</option></select></label><p>Age ranges help us offer a more appropriate experience. They are not a measure of ability, maturity or support needs.</p><button className="primary-button" type="submit">Create private space <ArrowRight size={17}/></button></form>
      </section>
      <p className="dashboard-footnote"><ShieldCheck size={15}/> Accounts are guardian-managed. Participant spaces are private and are not publicly searchable.</p>
    </section>
  </main>;
}
