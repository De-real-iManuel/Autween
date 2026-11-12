# Privacy, Safety, and Safeguarding

Autween is intended for a child audience. Safety is a product requirement, not a later feature. This document is a minimum design constraint, not legal advice or a complete safeguarding policy.

## Prototype boundary

The hackathon prototype must use synthetic profiles and fictional activity content only. Do not recruit children into an unreviewed test, collect real child conversations, or store identifiable information.

## Child agency

- The child should be able to pause, leave, decline, block, and request help.
- The interface should explain choices in age-appropriate language and accessible formats.
- Adult support should not erase the child's preferences or turn the product into continuous surveillance.
- Any future consent process must distinguish guardian permission from the child's own assent and ongoing willingness to participate.

## Social access

For an initial networked release:
- use trusted, approved circles rather than public search;
- prohibit unsolicited adult-to-child contact;
- do not expose a child's location, school, phone number, or public identity;
- provide clear invitation, removal, and rejoining controls;
- consider carefully how mixed-age and mixed-neurotype groups are formed and supervised.

## Harmful content and moderation

- Do not treat unusual language, spelling, repetition, AAC use, delayed responses, or unconventional interaction as abuse or spam.
- Do not automatically punish or exclude a child based on an AI classification.
- Distinguish conflict, misunderstanding, and boundary-setting from harassment.
- Provide block, report, leave, and human-help pathways.
- Serious safeguarding concerns require a defined human escalation process before any real-world deployment.

## Data minimization

- Collect only information necessary for a clearly stated feature.
- Avoid collecting diagnosis, medical history, emotion labels, or detailed behavioural histories.
- Do not train models on children's messages.
- Do not record voice or video by default.
- Define retention and deletion rules before adding accounts or cloud sync.
- Keep analytics off by default until their necessity and privacy impact are reviewed.

## Research and testing with children

Any future research involving children must have an appropriate ethics and safeguarding plan, guardian consent where required, child assent, trained facilitators, accessible materials, and a clear withdrawal process. Do not assume that caregiver opinions substitute for children's own views.

## Release gate

No public deployment for real child-to-child interaction until the team has:
1. a threat model and abuse-case review;
2. a documented consent/assent and guardian-support model;
3. an incident response and human escalation plan;
4. privacy and retention documentation;
5. accessibility testing with autistic participants;
6. a clear moderation and cohort-supervision model;
7. legal review for relevant jurisdictions.
