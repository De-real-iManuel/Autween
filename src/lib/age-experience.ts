export type AgeBand = "6-9" | "10-12" | "13-15" | "16-17";
export type StudioFormat = "story" | "visual-journal" | "zine" | "worldbuilding";
export type AgeExperience = { label: string; tone: string; introduction: string; formats: { id: StudioFormat; title: string; description: string; prompt: string }[] };
const experiences: Record<AgeBand, AgeExperience> = {
"6-9": { label:"Playful explorer", tone:"Bright, simple and imaginative", introduction:"Make a little world, invent a character or collect ideas. There is no right way to begin.", formats:[
{id:"story",title:"Make a story",description:"Pick an idea and give it a beginning.",prompt:"A small creature finds a door in an unusual place..."},
{id:"visual-journal",title:"Picture journal",description:"Collect colours, words and little observations.",prompt:"Something I noticed today..."},
{id:"worldbuilding",title:"Invent a world",description:"Imagine a place with its own rules.",prompt:"In my world, the sky changes colour when..."}]},
"10-12": { label:"Curious maker", tone:"Expressive, exploratory and hands-on", introduction:"Experiment with stories, ideas and visual collections. Take a project in any direction.", formats:[
{id:"story",title:"Story lab",description:"Build a character, conflict and unexpected turn.",prompt:"Someone discovers that the town map has been changing..."},
{id:"visual-journal",title:"Visual journal",description:"Mix observations, sketches described in words and reflections.",prompt:"A detail I keep thinking about..."},
{id:"zine",title:"Mini zine",description:"Create a small collection around one theme.",prompt:"A collection of things that belong together..."},
{id:"worldbuilding",title:"World design",description:"Develop the places, systems and stories of an imagined setting.",prompt:"The one rule everyone in this place knows..."}]},
"13-15": { label:"Creative studio", tone:"Independent, experimental and personal", introduction:"Develop a concept, explore a point of view or build a small creative publication. Your work can stay unfinished.", formats:[
{id:"story",title:"Narrative workshop",description:"Explore voice, structure and alternative endings.",prompt:"Write a scene where two people interpret the same event differently..."},
{id:"visual-journal",title:"Field notes",description:"Document an idea, reference or observation in your own format.",prompt:"An observation, question or contradiction worth keeping..."},
{id:"zine",title:"Editorial zine",description:"Shape a theme into a short independent publication.",prompt:"A point of view I want to explore..."},
{id:"worldbuilding",title:"Systems & worlds",description:"Design a setting through its culture, constraints and details.",prompt:"If this world were built around one unusual principle..."}]},
"16-17": { label:"Independent creator", tone:"Minimal, self-directed and concept-led", introduction:"Use the studio as a private workspace for writing, visual thinking and concept development. Choose a direction or ignore the prompts.", formats:[
{id:"story",title:"Long-form narrative",description:"Work with perspective, ambiguity and narrative structure.",prompt:"Begin with a consequence, then work backwards to the decision..."},
{id:"visual-journal",title:"Research journal",description:"Collect references, questions and developing ideas.",prompt:"Working question / reference / unresolved thought..."},
{id:"zine",title:"Independent publication",description:"Develop an editorial idea, sequence and point of view.",prompt:"Thesis, fragments, counterpoint, conclusion..."},
{id:"worldbuilding",title:"Concept design",description:"Model an imagined system, environment or alternative future.",prompt:"Assumptions, constraints, stakeholders and unintended effects..."}]}
};
export function getAgeExperience(ageBand: AgeBand): AgeExperience { return experiences[ageBand]; }
export const ageBands: {id:AgeBand;label:string}[] = [{id:"6-9",label:"6–9"},{id:"10-12",label:"10–12"},{id:"13-15",label:"13–15"},{id:"16-17",label:"16–17"}];
