# The Responsibility Paradox — interactive explainer

A visual companion site to **_The Responsibility Paradox: Toward Value-Chain Accountability for Agentic AI_** by Professor Carolina A. Rossini and Vinit Prakash (University of Massachusetts Amherst).

Written for a general audience. Every quotation from a provider's terms of use is reproduced verbatim from the source document, as published or effective as of July 2026, with its version and a link to the source.

## What's in the site

| Section | What it shows |
|---|---|
| Hero | The four-actor value chain with the paradox encoded as two opposing gradients |
| From answering to acting | Why agentic AI changes the governance question |
| Architecture is accountability | Interactive anatomy of an agent — click a component, see who owns its failures |
| Who holds the power | The six-criteria Responsibility Allocation Matrix (Table 1), as a heat grid |
| Where risk is born vs. blamed | Interactive Figure 3 — 16 risk classes plotted from origin stage to mitigation stage |
| Naming the paradox | Definition, contrast with "many hands" and "moral crumple zone", causes and stakes |
| The Hugging Face breach | The July 2026 incident as a timeline |
| Five providers, one allocation | Section 7 comparative analysis — per-provider reading + verbatim clauses + scoring table |
| Read what you actually agreed to | Annex T1 — 18 documents, 8 providers, 42 verbatim quotations; filter and full-text search |
| Does anyone fix it? | Section 10 governance scorecard — 8 frameworks, click for reasoning |
| A map of agentic risk | Annex T2 — 7-tier risk taxonomy with Five Eyes / IMDA coverage |
| Value-chain accountability | The proposal and four policy implications |
| About | Collaborators and method |

## Files

```
index.html   — the page (all sections)
styles.css   — design system
data.js      — all content: matrices, risk lifecycle, providers, ToU quotes, frameworks, taxonomy
app.js       — rendering + interactions (no framework, no build step)
.nojekyll    — tells GitHub Pages to serve files as-is
```

### Optional: custom domain
Settings → Pages → *Custom domain*. GitHub will add a `CNAME` file for you.

## Updating content

All text and data live in `data.js` as plain JavaScript objects — you can edit a quotation, add a document to the terms explorer, or change a score without touching the layout code. The paper's own paragraph text lives in `index.html`.

## Credits

- **Prof. Carolina A. Rossini** — https://www.umass.edu/public-policy/about/directory/carolina-rossini  
- **Vinit Prakash** — https://www.linkedin.com/in/vinit-prakash1312  

© 2026 Carolina A. Rossini & Vinit Prakash · University of Massachusetts Amherst. This site is an explainer, not legal advice.
