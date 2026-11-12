# Autween — Problem Thesis

**Status:** Working hypothesis, 12 November 2026  
**Evidence type:** Desk research and product reasoning; not primary user validation.

## 1. Problem statement

Autistic children and young people are not a uniform group. Communication preferences, sensory needs, interests, support needs, and comfort with social interaction vary substantially between individuals and across contexts.

Online communication can be valuable partly because it gives people more control over timing, modality, and self-presentation. But online social environments can also create exposure to bullying, harassment, unwanted contact, scams, misunderstandings, and privacy risks. Generic social products are not necessarily designed around the controls, predictability, accessibility, and safeguarding that some autistic children may need.

The product problem is therefore not “teach autistic children to socialize normally.” It is:

> How might we create a safe, interest-led online space where each child can choose how to express themselves and participate, while the environment adapts to their preferences?

## 2. Product hypothesis

A closed, child-centred social play environment may improve the experience of participation when it combines:

- choice of communication mode and pace;
- shared-interest activities that give people something to do together;
- optional rather than compulsory conversation;
- transparent, user-controlled personalization;
- trusted-circle access and strong safety boundaries;
- accessible ways to stop, leave, block, report, and ask for help.

This hypothesis must be tested with autistic people and relevant caregivers. It is not a claim that an app can treat autism, improve social skills, or prevent all harm.

## 3. What “learning the child” means—and does not mean

The system may learn narrow, practical preferences such as:
- whether a child chooses text, symbols, audio, or a combination;
- preferred pace, activity duration, and sensory intensity;
- topics or creative activities they repeatedly choose;
- whether they prefer solo creation, parallel play, or small-group collaboration;
- which accessibility controls they turn on or off.

These are preferences for configuring the experience, not a psychological profile.

The system must not infer or score:
- diagnosis or autism “severity”;
- emotion, intent, intelligence, empathy, or social competence;
- eye contact, masking, compliance, or “normality”;
- whether a child is a “good” or “bad” communicator.

Inferences must remain tentative, explainable, inspectable, editable, and resettable. Explicit choices should outweigh passive behavioural signals. The child must be able to use the product without personalization.

## 4. Adaptation model

The initial system should be deterministic and interpretable. It can use simple Bayesian preference estimates to represent uncertainty about which activities a child may prefer. A contextual bandit may later rank a small set of suitable activities, but only against user-centred feedback such as “I liked this,” “not now,” “too much,” or “show me something else.”

This is not a reward system for social behaviour. There must be no reward for eye contact, speech, conversation frequency, masking, speed, or conformity. No activity should become harder or more socially demanding because the child did not perform a target behaviour.

A safe first version can use explicit preference selection and transparent rules. The Bayesian component should only be added if it improves the experience and can be evaluated without collecting sensitive data.

## 5. Social experience

The initial social model should be closed and small:
- trusted-circle invitations rather than public child discovery;
- shared-interest rooms or worlds;
- cooperative building, drawing, storytelling, puzzles, and role-play;
- asynchronous contributions so participants do not need to respond immediately;
- multiple communication modes, including symbol-based choices;
- no unsolicited direct messages from strangers;
- no public location, school, or contact details.

A child should be able to participate without speaking, explain a boundary without writing a paragraph, and leave an interaction without penalty.

## 6. What must be validated

We do not yet know:
1. Which social activities autistic children themselves would choose.
2. Whether “shared worlds” are appealing or whether another interaction metaphor is better.
3. Which controls children want to operate themselves and which require caregiver support.
4. How children want to handle invitations, disagreement, blocking, and rejoining.
5. What makes a space feel welcoming rather than clinical, infantilizing, or segregating.
6. Whether personalization feels helpful or intrusive.
7. Which accessibility options matter to different children, and how they should be presented.

## 7. Validation approach

Before any real-child pilot:
- conduct a structured literature review;
- seek feedback from autistic adults, autism-led organizations, AAC practitioners, child-safety specialists, and caregivers;
- use accessible, non-leading co-design activities;
- include children only with appropriate ethics review, guardian consent, child assent, safeguarding, and trained facilitation;
- test interaction flows with synthetic personas and adult usability participants first;
- document disagreement and variation rather than claiming one design fits everyone.

## 8. Success measures for a prototype

Measure product experience, not normalization:
- Can a participant choose a comfortable communication mode?
- Can they understand and control privacy and interaction boundaries?
- Can they create or contribute without forced speech?
- Can they decline, pause, or leave easily?
- Can they find an activity they want to do with another person?
- Do participants describe the experience as welcoming, predictable, and self-directed?

Do not use “more eye contact,” “more speech,” “less stimming,” or “more typical behaviour” as success metrics.

## 9. Explicit non-goals

- Autism diagnosis, screening, or treatment.
- Therapy or social-skills compliance training.
- Public social networking for children.
- Open direct messaging or stranger matching.
- Emotion recognition or analysis of voice/video.
- Ranking children or comparing their social performance.
- Training a model on children's conversations.
