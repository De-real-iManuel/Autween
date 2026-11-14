import HomeClient from "./home-client";

type Screen = "home" | "signup" | "signin";

export default async function HomePage({ searchParams }: { searchParams: Promise<{ screen?: string }> }) {
  const { screen } = await searchParams;
  const initialScreen: Screen = screen === "signup" || screen === "signin" ? screen : "home";
  return <HomeClient initialScreen={initialScreen} />;
}
