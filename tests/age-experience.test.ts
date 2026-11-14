import test from "node:test";
import assert from "node:assert/strict";
import { ageBands, getAgeExperience, isAgeBand, type AgeBand } from "../src/lib/age-experience.ts";
test("all supported age bands have at least three creative formats",()=>{for(const band of ageBands)assert.ok(getAgeExperience(band.id).formats.length>=3);});
test("teen experiences use distinct, self-directed language and formats",()=>{const young=getAgeExperience("6-9");const teen=getAgeExperience("16-17");assert.notEqual(young.introduction,teen.introduction);assert.match(teen.introduction,/private workspace/);assert.equal(teen.formats.find(item=>item.id==="zine")?.title,"Independent publication");});
test("each age band has distinct starting prompts",()=>{const bands:AgeBand[]=["6-9","10-12","13-15","16-17"];const prompts=bands.map(band=>getAgeExperience(band).formats[0].prompt);assert.equal(new Set(prompts).size,4);});
test("age bands are broad labels and do not require a date of birth",()=>{assert.deepEqual(ageBands.map(band=>band.id),["6-9","10-12","13-15","16-17"]);});
test("only the four supported broad age bands are accepted",()=>{assert.equal(isAgeBand("6-9"),true);assert.equal(isAgeBand("16-17"),true);assert.equal(isAgeBand("17-18"),false);assert.equal(isAgeBand("2008-04-24"),false);});
