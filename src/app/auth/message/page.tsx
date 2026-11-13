import Link from "next/link";

const messages: Record<string, { title: string; body: string }> = {
  setup: { title: "Account setup is not connected yet", body: "The application needs its Supabase project URL and public anon key before accounts can be created. No password has been stored by Autween." },
  "check-email": { title: "Check your email", body: "We sent a verification link. Open it on this device to finish creating your family account. If it does not arrive, check your spam folder." },
  invalid: { title: "Check those details", body: "Enter a valid email address and a password of at least eight characters when creating an account." },
  consent: { title: "Guardian confirmation needed", body: "A parent or legal guardian must create this account and confirm the guardian declaration." },
  "signup-error": { title: "We could not create that account", body: "The account provider rejected the request. The email may already be registered, or the password may not meet your provider's policy. Please try logging in or reset your password." },
  "login-error": { title: "We could not sign you in", body: "The email or password was not accepted. Please check your details and try again." },
  "verification-error": { title: "That verification link did not work", body: "The link may have expired or already been used. Start again by creating an account or request a fresh verification email." },
};
export default async function AuthMessage({ searchParams }: { searchParams: Promise<{ kind?: string }> }) {
  const { kind = "setup" } = await searchParams;
  const message = messages[kind] ?? messages.setup;
  return <main className="auth-message-page"><section className="auth-message-card"><span className="eyebrow">AUTWEEN ACCOUNT</span><h1>{message.title}</h1><p>{message.body}</p><div><Link className="primary-button" href="/?screen=signup">Back to Autween</Link><Link href="/?screen=signin">Log in</Link></div></section></main>;
}
