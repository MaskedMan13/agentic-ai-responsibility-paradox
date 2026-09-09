/* ============================================================
   THE RESPONSIBILITY PARADOX — data layer
   Source: Rossini & Prakash, "The Responsibility Paradox: Toward
   Value-Chain Accountability for Agentic AI" (UMass Amherst).
   All quotations marked as quotes are verbatim from the cited
   documents, as published or effective as of July 2026.
   ============================================================ */

window.RP = {};

/* ---------- Four actors ---------- */
RP.actors = [
  { id: "provider",  name: "Provider",  color: "#F59E0B",
    role: "Builds the foundation model — its architecture, training, alignment, safety interventions and capability releases.",
    controls: "Model architecture, training processes, alignment techniques, safety interventions, capability releases." },
  { id: "developer", name: "Developer", color: "#A78BFA",
    role: "Designs the agent around the model — planning systems, tool integrations, memory, autonomy settings.",
    controls: "Agent architecture, planning systems, tool integrations, memory systems, autonomy settings." },
  { id: "deployer",  name: "Deployer",  color: "#60A5FA",
    role: "Puts the agent to work in a real setting — environment, permissions, governance, monitoring.",
    controls: "Deployment environments, governance structures, operational permissions, monitoring mechanisms." },
  { id: "user",      name: "User",      color: "#34D399",
    role: "Sets the goals and instructions the agent pursues.",
    controls: "Objectives, instructions, operational decisions." }
];

/* ---------- Six criteria (plain-language) ---------- */
RP.criteria = [
  { key: "Control", plain: "Who can actually steer what the system does.",
    note: "Widely recognised as a foundation of responsibility. In agentic systems control is distributed — but very unevenly." },
  { key: "Capability Creation", plain: "Who built the abilities that make the agent possible.",
    note: "Manufacturers stay responsible for product design even when they don't control every use. The same logic applies to foundation models." },
  { key: "Risk Creation", plain: "Who introduces or amplifies the chance of harm.",
    note: "Providers by releasing under-tested capabilities; developers via excessive permissions; deployers via weak oversight; users via misuse." },
  { key: "Economic Benefit", plain: "Who profits most.",
    note: "The 'polluter pays' idea: actors that profit from an activity are appropriate bearers of some of its risk-management duties." },
  { key: "Capacity to Mitigate", plain: "Who can prevent harm most cheaply and at the widest scale.",
    note: "One fix at the model level can affect millions of downstream deployments. The 'least-cost avoider' principle." },
  { key: "Information Advantage", plain: "Who knows the most about how the system really behaves.",
    note: "Providers hold internal evaluations, red-team findings and failure analyses that nobody downstream can see." }
];

/* ---------- Table 1: Responsibility Allocation Matrix ---------- */
RP.matrix = [
  { criterion: "Control",               provider: "High",      developer: "High",     deployer: "Moderate", user: "Low" },
  { criterion: "Capability Creation",   provider: "Very High", developer: "Moderate", deployer: "Low",      user: "None" },
  { criterion: "Risk Creation",         provider: "High",      developer: "High",     deployer: "High",     user: "Variable" },
  { criterion: "Economic Benefit",      provider: "Very High", developer: "Moderate", deployer: "Moderate", user: "Low" },
  { criterion: "Capacity to Mitigate",  provider: "Very High", developer: "High",     deployer: "Moderate", user: "Low" },
  { criterion: "Information Advantage", provider: "Very High", developer: "Moderate", deployer: "Low",      user: "Minimal" }
];
RP.levelScore = { "None": 0, "Minimal": 0.5, "Low": 1, "Variable": 2, "Moderate": 2.5, "High": 4, "Very High": 5 };

/* ---------- Anatomy of an agent (Figure 1) ---------- */
RP.components = [
  { id: "perception", n: "1", name: "Perception", color: "#2D9735", icon: "eye",
    desc: "Receives input from the environment and interprets it.",
    failure: "Prompt injection — malicious instructions smuggled in through the inputs the agent reads.",
    owner: ["developer", "deployer"], ownerNote: "The design of the input layer is the developer's; what gets fed into it is often the deployer's." },
  { id: "model", n: "2", name: "Model (LLM)", color: "#0A4CD1", icon: "brain",
    desc: "The underlying AI model that understands language, generates reasoning, and produces outputs.",
    failure: "Hallucinations and reasoning failures — the model confidently gets things wrong.",
    owner: ["provider"], ownerNote: "These originate in training and alignment, which only the provider controls." },
  { id: "reasoning", n: "3", name: "Reasoning / Planning", color: "#C6870B", icon: "bulb",
    desc: "Analyzes information, reasons about goals and constraints, and decides what to do next.",
    failure: "Planning errors — a bad plan pursued step by step.",
    owner: ["developer"], ownerNote: "Planning errors frequently reflect developer decisions about the agent's architecture." },
  { id: "action", n: "4", name: "Action", color: "#5027A0", icon: "rocket",
    desc: "Executes the chosen action using tools and APIs to affect the environment.",
    failure: "Excessive permissions — an agent allowed to do more than it should.",
    owner: ["deployer"], ownerNote: "Permissions and scope are deployment choices." },
  { id: "memory", n: "5", name: "Memory", color: "#521BA0", icon: "database",
    desc: "Stores and retrieves information (short-term and long-term) to provide context.",
    failure: "Retrieval and memory errors that propagate into everything the agent does next.",
    owner: ["developer"], ownerNote: "Memory systems are built by the developer; errors here compound downstream." },
  { id: "tools", n: "6", name: "Tools", color: "#037E82", icon: "gear",
    desc: "External functions, APIs, and services the agent can use to accomplish tasks.",
    failure: "Tool misuse — the wrong tool, the wrong input, or a compromised connector.",
    owner: ["developer", "deployer"], ownerNote: "Which tools exist is a developer choice; which are permitted is a deployer choice." },
  { id: "user", n: "7", name: "User (Goal Setter)", color: "#D5610A", icon: "person",
    desc: "Provides goals, instructions, and feedback.",
    failure: "Misuse, malicious instructions, or circumventing safeguards.",
    owner: ["user"], ownerNote: "The one layer where the user holds real influence — over the instruction, not the system." },
  { id: "environment", n: "", name: "Environment", color: "#037E82", icon: "globe",
    desc: "The external world the agent observes and acts upon.",
    failure: "Live data, other agents and external systems behaving in ways nobody tested.",
    owner: ["deployer", "user"], ownerNote: "Operational context is chosen at deployment and shaped in use." }
];

/* ---------- Figure 3: risk origin vs mitigation across the lifecycle ---------- */
RP.stages = [
  { n: 1, name: "Data & Pretraining",           actor: "provider" },
  { n: 2, name: "Model Training & Alignment",   actor: "provider" },
  { n: 3, name: "Agent Design",                 actor: "developer" },
  { n: 4, name: "Development",                  actor: "developer" },
  { n: 5, name: "Testing & Evaluation",         actor: "provider+developer" },
  { n: 6, name: "Deployment",                   actor: "deployer" },
  { n: 7, name: "Operation & Monitoring",       actor: "deployer+user" },
  { n: 8, name: "Decommission",                 actor: "deployer" }
];
/* origin = filled, mitigation = open, both = origin and mitigation coincide */
RP.risks = [
  { group: "Inherited from the model",     name: "Reasoning failure",        origin: [1],   mit: [5, 7],    both: [] },
  { group: "Inherited from the model",     name: "Misalignment",             origin: [],    mit: [5],       both: [2] },
  { group: "Inherited from the model",     name: "Deception",                origin: [2],   mit: [5, 7],    both: [] },
  { group: "Inherited from the model",     name: "Emergence",                origin: [2],   mit: [5, 7],    both: [] },
  { group: "Inherited from the model",     name: "Biased action",            origin: [1, 2],mit: [5, 7],    both: [] },
  { group: "Introduced by the scaffolding",name: "Privilege compromise",     origin: [],    mit: [6, 7],    both: [3] },
  { group: "Introduced by the scaffolding",name: "Identity integrity",       origin: [],    mit: [6, 7],    both: [3] },
  { group: "Introduced by the scaffolding",name: "Tool misuse",              origin: [3],   mit: [5, 7],    both: [4] },
  { group: "Introduced by the scaffolding",name: "Protocol risk",            origin: [],    mit: [6, 7],    both: [4] },
  { group: "Introduced by the scaffolding",name: "Data exposure / integrity",origin: [1],   mit: [3, 7],    both: [4] },
  { group: "Emergent in operation",        name: "Cascading failure",        origin: [4],   mit: [5, 6, 7], both: [] },
  { group: "Emergent in operation",        name: "Multi-agent dynamics",     origin: [3, 4],mit: [5, 7],    both: [] },
  { group: "Emergent in operation",        name: "Sprawl",                   origin: [6],   mit: [7, 8],    both: [] },
  { group: "Emergent in operation",        name: "Oversight failure",        origin: [],    mit: [7],       both: [6] },
  { group: "Emergent in operation",        name: "Accountability diffusion", origin: [3],   mit: [4, 7],    both: [] },
  { group: "Emergent in operation",        name: "Capability erosion",       origin: [],    mit: [],        both: [7] }
];

/* ---------- Section 7: comparative analysis of five providers ---------- */
RP.providers = [
  {
    id: "openai", name: "OpenAI", tagline: "Everything the agent does is just “Output.”",
    vocab: "Folds agent conduct into “Output”",
    scores: { capability: "High", info: "High", benefit: "High", mitigate: "High", retained: "Low" },
    dims: {
      allocation: "OpenAI never calls the technology an “agent,” “agentic,” or “autonomous.” Everything the system does is folded into three defined terms — Services, Input and Output — so whatever an agent does counts, in the contract, as ordinary Output, and the user is responsible for it. Business contracts route liability to the customer through a “Customer Application” label and a “No Agency” clause, with no third-party beneficiaries: a person harmed by a deployed agent has no contractual route to OpenAI. This shifts both deployment-level risk (defensible) and capability-level risk the user cannot inspect.",
      oversight: "The duty to check is affirmative, not advisory — the user must review Output before using or sharing it. That sits awkwardly with a product whose whole value is acting without step-by-step review.",
      disclosure: "Extensive public materials — system cards, preparedness evaluations, usage policies. None of it names agents in the contracts, and none of it changes the allocation.",
      foreseeability: "Error is framed as inherent to the technology, citing the “probabilistic nature of machine learning,” and warranties are disclaimed broadly.",
      maturity: "Strong public governance; almost none in the contracts — no required human-in-the-loop, no limit on an agent's scope of authority, no transaction ceiling, no user-held kill switch."
    },
    quotes: [
      { text: "You must evaluate Output for accuracy and appropriateness for your use case, including using human review as appropriate, before using or sharing Output from the Services.", cite: "Terms of Use (effective Jan 1, 2026), Accuracy" },
      { text: "Given the probabilistic nature of machine learning, use of our Services may, in some situations, result in Output that does not accurately reflect real people, places, or facts.", cite: "Terms of Use (effective Jan 1, 2026), Accuracy" }
    ]
  },
  {
    id: "anthropic", name: "Anthropic", tagline: "Names the “Actions” — and makes them yours.",
    vocab: "Names “Actions”",
    scores: { capability: "High", info: "High", benefit: "High", mitigate: "High", retained: "Low" },
    dims: {
      allocation: "The consumer terms do something the other consumer contracts avoid: they name autonomous conduct. “Actions” are defined as the system taking steps on the user's behalf, then written into every risk clause — the warranty disclaimer, the damages exclusion, the liability cap, the indemnity. The user is responsible for all Actions. The commercial terms, where the most capable agents actually run, never adopted the category.",
      oversight: "Advisory in the Terms (“should not rely”); the hard rules live in the incorporated Usage Policy — seven high-risk domains where a qualified professional must review before a decision is finalized and AI involvement must be disclosed.",
      disclosure: "Highest in the set — and the only provider to state in its consumer contract that its agent may misbehave.",
      foreseeability: "Actions “may not be error free or operate as you intended,” and the user agrees in advance — converting an agent doing the wrong thing into an accepted risk.",
      maturity: "Most mature stated governance of the five, but it sits in an incorporated policy one step removed from the contract that assigns liability. The caps are unchanged."
    },
    quotes: [
      { text: "Our Services may generate responses (we call these “Outputs”), or enable the Services to take actions on your behalf, such as software manipulation, data processing, and system interactions (we call these “Actions”), based on your Inputs.", cite: "Consumer Terms (effective Oct 8, 2025), Sec. 4" },
      { text: "Actions may not be error free or operate as you intended.", cite: "Consumer Terms (effective Oct 8, 2025), Sec. 4" }
    ]
  },
  {
    id: "microsoft", name: "Microsoft", tagline: "You asked. You're responsible.",
    vocab: "Names “Tasks” and “Actions”",
    scores: { capability: "Moderate", info: "High", benefit: "High", mitigate: "High", retained: "Low" },
    dims: {
      allocation: "One of the clearest downstream allocations for autonomous action. The consumer Copilot terms define “Tasks” as the automated actions Copilot takes on the user's behalf — and state that when a user asks Copilot to take Actions, the user is solely responsible for those Actions and any results. Microsoft concedes that Copilot can act, and assigns responsibility for the acting to the user.",
      oversight: "Verify before relying. The AI Code of Conduct requires “meaningful human oversight” for applications that decide or act autonomously — but assigns that duty to the customer.",
      disclosure: "Mature: a Responsible AI Standard and detailed Copilot governance documentation; the contract names Tasks and Actions.",
      foreseeability: "“Copilot can make mistakes,” with no warranty of any kind.",
      maturity: "Strong guidance; the oversight duty is the deployer's and the liability terms are unchanged. Because Microsoft mostly deploys other developers' models, its capability-creation score is lower than a pure developer's."
    },
    quotes: [
      { text: "When you request that Copilot take Actions on your behalf, you are solely responsible for those Actions and any results or consequences", cite: "Copilot Terms of Use, consumer (effective Jun 12, 2026)" },
      { text: "Implement additional scenario-specific mitigations, as appropriate, to ensure responsible use of the Microsoft AI Service, including meaningful human oversight.", cite: "AI Code of Conduct (v4.0, May 1, 2026)" }
    ]
  },
  {
    id: "google", name: "Google", tagline: "Defines the agent — then disclaims it.",
    vocab: "Defines “AI Agents” outright",
    scores: { capability: "High", info: "High", benefit: "High", mitigate: "High", retained: "Low" },
    dims: {
      allocation: "Google names the technology directly: the API terms create an “agentic services” category, the enterprise terms carry a clause headed “Responsibilities for Agentic AI,” and the Cloud Service Specific Terms formally define “AI Agents.” Naming does not change the allocation — the user is solely responsible for the actions the service performs. Because an “AI Agent” is classified as a “Separate Offering,” and the umbrella terms disclaim liability for Separate Offerings, the definition of the agent doubles as the basis for disclaiming responsibility for it.",
      oversight: "The only provider to write an affirmative oversight rule into the contract itself: the user “will not automatically bypass any requests for human confirmation.” High-risk automated decisions require human supervision. Real limits — but duties on the user.",
      disclosure: "Most explicit naming of the five, with formal definitions of agents and agentic services.",
      foreseeability: "Generative AI is emerging technology that “may provide inaccurate or offensive” output and is “not designed” to meet the customer's legal obligations.",
      maturity: "Precise definitions and one in-contract guardrail, but liability is pushed up to the umbrella terms."
    },
    quotes: [
      { text: "“AI Agents” are goal-oriented, AI systems or workflows that perform actions or tasks on behalf of Customer in a supervised or autonomous manner that Customer may create, orchestrate, or initiate within an Agentic AI Service.", cite: "Google Cloud Service Specific Terms, Sec. 14 Definitions" },
      { text: "Google disclaims all liability arising from Customer’s use of Separate Offerings and Customer Models, and Google’s indemnification obligations do not apply to allegations arising from Separate Offerings or Customer Models.", cite: "Google Cloud Service Specific Terms, Sec. 19(b)" }
    ]
  },
  {
    id: "deepseek", name: "DeepSeek", tagline: "Disclaims the use case entirely.",
    vocab: "Disclaims the agentic use case",
    scores: { capability: "High", info: "High", benefit: "High", mitigate: "Low", retained: "Low" },
    dims: {
      allocation: "The Terms of Use use “Outputs” generically, never name agents, and make the user “solely and independently responsible” for any decision or action taken on an Output. The Open Platform Terms go further than the other four: they state that the Output “shall not form the basis for further actions or omissions” — which disclaims the agentic use case rather than governing it. Liability is capped at twelve months of consumed fees.",
      oversight: "Risky outputs “shall undergo human reviews,” with the user liable; developers must tell their own end users that content is AI-generated.",
      disclosure: "Lowest in the set: little public discussion of agentic governance, oversight or safety evaluation, and no agent terminology.",
      foreseeability: "Provided “as is”; Outputs are not DeepSeek's “legal declaration of intent.”",
      maturity: "Least developed — yet the downstream allocation matches the others. That a provider saying little about safety lands at the same allocation as providers that publish extensively is itself a finding."
    },
    quotes: [
      { text: "… such Outputs shall undergo human reviews; and you shall be solely and independently liable for the corresponding liabilities.", cite: "Terms of Use (last updated Mar 27, 2026), Sec. 5.4" },
      { text: "shall not form the basis for further actions or omissions", cite: "Open Platform Terms of Service (effective Apr 29, 2026) — on Outputs" }
    ]
  }
];
RP.dimLabels = {
  allocation: "Responsibility allocation",
  oversight: "Human oversight required",
  disclosure: "Transparency & disclosure",
  foreseeability: "Treatment of foreseeable harm",
  maturity: "Governance maturity"
};
RP.scoreLabels = { capability: "Capability creation", info: "Information advantage", benefit: "Economic benefit", mitigate: "Capacity to mitigate", retained: "Operational responsibility retained" };

/* ---------- Terms-of-Use corpus (Annex T1) — verbatim quotes ---------- */
RP.tou = [
  { provider: "OpenAI", doc: "Terms of Use", version: "Effective January 1, 2026", audience: "Consumer",
    url: "https://openai.com/policies/row-terms-of-use/",
    agent: "No", terms: "“Input,” “Output,” “Content”",
    quotes: [
      { label: "Verify before relying", text: "You must evaluate Output for accuracy and appropriateness for your use case, including using human review as appropriate, before using or sharing Output from the Services.", cite: "Accuracy" },
      { label: "Consequential decisions", text: "You must not use any Output relating to a person for any purpose that could have a legal or material impact on that person, such as making credit, educational, employment, housing, insurance, legal, medical, or other important decisions about them.", cite: "Accuracy" },
      { label: "Foreseeable error", text: "Given the probabilistic nature of machine learning, use of our Services may, in some situations, result in Output that does not accurately reflect real people, places, or facts.", cite: "Accuracy" }
    ],
    note: "The consumer contract is agent-silent: whatever an agent does is absorbed into the generic “Output” regime, and human review is the user's duty." },
  { provider: "OpenAI", doc: "Service Terms", version: "Updated June 2, 2026", audience: "All products (Apps, Actions, GPTs)",
    url: "https://openai.com/policies/service-terms/",
    agent: "No", terms: "“Action,” “Apps”",
    quotes: [
      { label: "Scope", text: "These Service Terms govern your use of the Services.", cite: "Preamble" },
      { label: "Precedence", text: "If there is a conflict between the Service Terms and your Agreement, the Service Terms will control.", cite: "Preamble" }
    ],
    note: "The document that actually governs the agent features (Apps, Actions, GPTs) — and it outranks the other two contracts — still never uses the word agent." },
  { provider: "OpenAI", doc: "OpenAI Services Agreement", version: "v.010126 (effective January 1, 2026)", audience: "Business / developers",
    url: "https://openai.com/policies/services-agreement/",
    agent: "No", terms: "“Customer Application”; “No Agency” clause",
    quotes: [
      { label: "Incorporated policies", text: "“OpenAI Policies” means the Service-Specific Terms, Sharing and Publication Policy, and Usage Policies.", cite: "Sec. 17 Definitions" }
    ],
    note: "Routes business liability to the customer through a “Customer Application” construct and a “No Agency” clause designed to block vicarious liability; no third-party beneficiaries." },

  { provider: "Anthropic", doc: "Consumer Terms of Service", version: "Effective October 8, 2025", audience: "Consumer (Claude.ai, Claude Pro)",
    url: "https://www.anthropic.com/legal/consumer-terms",
    agent: "No", terms: "“Actions”",
    quotes: [
      { label: "Defines autonomous conduct", text: "Our Services may generate responses (we call these “Outputs”), or enable the Services to take actions on your behalf, such as software manipulation, data processing, and system interactions (we call these “Actions”), based on your Inputs.", cite: "Sec. 4" },
      { label: "Who is responsible", text: "You are responsible for all Inputs you submit to our Services and all Actions.", cite: "Sec. 4" },
      { label: "Foreseeable error", text: "Actions may not be error free or operate as you intended.", cite: "Sec. 4" },
      { label: "Verify before relying", text: "You should not rely on any Outputs or Actions without independently confirming their accuracy.", cite: "Sec. 4" },
      { label: "Liability cap", text: "THE ANTHROPIC PARTIES’ TOTAL AGGREGATE LIABILITY TO YOU … WILL NOT EXCEED THE GREATER OF THE AMOUNT YOU PAID TO US FOR ACCESS TO OR USE OF THE SERVICES (IF ANY) IN THE SIX MONTHS PRECEDING THE DATE SUCH DAMAGES, LOSSES, AND CAUSES OF ACTION FIRST AROSE, AND $100.", cite: "Sec. 11" }
    ],
    note: "A rare contract that names what the AI does on your behalf — and, in the same clause, makes it your responsibility." },
  { provider: "Anthropic", doc: "Commercial Terms of Service", version: "Effective June 17, 2025", audience: "API / enterprise",
    url: "https://www.anthropic.com/legal/commercial-terms",
    agent: "No", terms: "“Outputs”",
    quotes: [
      { label: "Human review duty", text: "It is Customer’s responsibility to evaluate whether Outputs are appropriate for Customer’s use case, including where human review is appropriate, before using or sharing Outputs.", cite: "Sec. D.3" },
      { label: "Warn your own users", text: "Customer acknowledges, and must notify its Users, that factual assertions in Outputs should not be relied upon without independently checking their accuracy, as they may be false, incomplete, misleading or not reflective of recent events or information.", cite: "Sec. D.3" },
      { label: "No warranty", text: "ANTHROPIC DOES NOT WARRANT, AND DISCLAIMS THAT, THE SERVICES OR OUTPUTS ARE ACCURATE, COMPLETE OR ERROR-FREE OR THAT THEIR USE WILL BE UNINTERRUPTED.", cite: "Sec. L.2" },
      { label: "Liability cap", text: "… is limited to Fees paid by Customer for the Services in the previous 12 months.", cite: "Sec. L.3.a" }
    ],
    note: "The tier where the most capable agents run — yet conduct is never named; the verification duty and the indemnity speak only of Outputs." },
  { provider: "Anthropic", doc: "Usage Policy (Acceptable Use Policy)", version: "Effective September 15, 2025", audience: "All users",
    url: "https://www.anthropic.com/legal/aup",
    agent: "Yes", terms: "“agentic use”",
    quotes: [
      { label: "Names agentic use", text: "Our Additional Use Case Guidelines apply to certain other use cases, including consumer-facing chatbots, products serving minors, agentic use, and Model Context Protocol servers.", cite: "Additional Use Case Guidelines" },
      { label: "Human-in-the-loop", text: "Human-in-the-loop: any content that is provided to your consumers must be reviewed by a qualified professional in that field prior to dissemination. Your business is responsible for the accuracy and appropriateness of that information.", cite: "High-Risk Use Case Requirements" },
      { label: "Disclosure", text: "… you must disclose to your users that they are interacting with an AI system rather than a human.", cite: "Disclosure Requirements" }
    ],
    note: "This is where Anthropic names “agentic use” — in the conduct rules, not in the documents that allocate liability." },

  { provider: "Microsoft", doc: "Copilot Terms of Use (consumer)", version: "Effective June 12, 2026", audience: "Consumer",
    url: "https://www.microsoft.com/en-us/microsoft-copilot/for-individuals/termsofuse",
    agent: "No", terms: "“Tasks,” “Actions”",
    quotes: [
      { label: "Who is responsible", text: "When you request that Copilot take Actions on your behalf, you are solely responsible for those Actions and any results or consequences", cite: "Copilot Terms of Use" },
      { label: "No warranty", text: "WITHOUT LIMITING SECTION 12 OF THE MICROSOFT SERVICES AGREEMENT IN ANY WAY, BUT FOR THE SAKE OF CLARITY, WE DO NOT MAKE ANY WARRANTY OR REPRESENTATION OF ANY KIND ABOUT COPILOT.", cite: "Copilot Terms of Use" }
    ],
    note: "Copilot can act for you — and you are solely responsible for what it does." },
  { provider: "Microsoft", doc: "AI Code of Conduct", version: "v4.0, May 1, 2026", audience: "Enterprise customers building on Microsoft AI Services",
    url: "https://learn.microsoft.com/en-us/legal/ai-code-of-conduct",
    agent: "No", terms: "“autonomously,” “take actions,” “make decisions”",
    quotes: [
      { label: "Applies alongside", text: "This Code of Conduct applies in addition to the Microsoft Product Terms, including the Acceptable Use Policy.", cite: "Scope" },
      { label: "Human oversight", text: "Customers must ensure that all of their applications built with Microsoft AI Services, including applications that make decisions, or take actions, autonomously or with varying levels of human intervention … Implement additional scenario-specific mitigations, as appropriate, to ensure responsible use of the Microsoft AI Service, including meaningful human oversight.", cite: "Responsible use" }
    ],
    note: "“Meaningful human oversight” is required — of the customer. Liability is set elsewhere, in the Product Terms." },

  { provider: "Google", doc: "Gemini API Additional Terms of Service", version: "Effective March 23, 2026", audience: "Developers",
    url: "https://ai.google.dev/gemini-api/terms",
    agent: "Yes", terms: "“agentic services”",
    quotes: [
      { label: "Human confirmation", text: "will not automatically bypass any requests for human confirmation", cite: "Agentic services — user obligation" },
      { label: "Scope", text: "For clarity, these Terms do not govern your direct use of any Google Cloud Platform service (including those listed on the Google Cloud Services Summary).", cite: "Agentic services" }
    ],
    note: "A rare provision regulating the human checkpoint itself: the user is forbidden to automate away confirmation requests." },
  { provider: "Google", doc: "Gemini Enterprise – Business Edition Additional Terms", version: "No effective date shown", audience: "Business",
    url: "https://cloud.google.com/terms/gemini-enterprise/business",
    agent: "Yes", terms: "“AI agents”; “Responsibilities for Agentic AI”",
    quotes: [
      { label: "Scope", text: "These terms apply only to Gemini Enterprise – Business Edition and do not apply to any Google Cloud Platform services, including Gemini Enterprise – Standard Edition.", cite: "Preamble" },
      { label: "Who is responsible", text: "The Service may include AI agents that perform tasks on your behalf. You are solely responsible for configuring these agents; authorizing their access to data, applications, and systems; supervising the agents; and for all actions they perform.", cite: "Responsibilities for Agentic AI" }
    ],
    note: "The most developed agentic clause in the set — and it allocates all four enumerated duties to the customer." },
  { provider: "Google", doc: "Generative AI Prohibited Use Policy", version: "Last modified December 17, 2024", audience: "All Google generative AI products",
    url: "https://policies.google.com/terms/generative-ai/use-policy",
    agent: "No", terms: "“Generative AI uses”",
    quotes: [
      { label: "Scope", text: "The following restrictions apply to your interactions with generative AI in the Google products and services that refer to this policy.", cite: "Preamble" }
    ],
    note: "Lists banned uses; automated decisions in high-risk domains are allowed only with human supervision. Who pays if something goes wrong is set in the separate service terms." },
  { provider: "Google", doc: "Google Cloud Service Specific Terms — AI/ML Services (Sec. 14–20)", version: "Current (sections renumbered February 18, 2026)", audience: "Google Cloud customers",
    url: "https://cloud.google.com/terms/service-terms",
    agent: "Yes", terms: "“Agentic AI Services,” “AI Agents”",
    quotes: [
      { label: "Defines the agent", text: "“AI Agents” are goal-oriented, AI systems or workflows that perform actions or tasks on behalf of Customer in a supervised or autonomous manner that Customer may create, orchestrate, or initiate within an Agentic AI Service.", cite: "Sec. 14 Definitions" },
      { label: "Agent = Separate Offering", text: "“Separate Offering” means a model, dataset, application, product, service, solution, AI Agent or any other offering that Google makes available for a Customer’s use with AI/ML Services that is subject to terms and conditions separate from the Agreement …", cite: "Sec. 14 Definitions" },
      { label: "Liability disclaimed", text: "Google disclaims all liability arising from Customer’s use of Separate Offerings and Customer Models, and Google’s indemnification obligations do not apply to allegations arising from Separate Offerings or Customer Models.", cite: "Sec. 19(b)" },
      { label: "Foreseeable error", text: "Generative AI Services … use emerging technology, may provide inaccurate or offensive Generated Output, and are not designed for or intended to meet Customer’s regulatory, legal, or other obligations.", cite: "Sec. 20(b)" }
    ],
    note: "The only formal contractual definition of an “AI Agent” in the set — and because an AI Agent counts as a “Separate Offering,” the same document disclaims all liability for it." },

  { provider: "DeepSeek", doc: "Terms of Use", version: "Last updated March 27, 2026", audience: "Consumer",
    url: "https://cdn.deepseek.com/policies/en-US/deepseek-terms-of-use.html",
    agent: "No", terms: "“Outputs”",
    quotes: [
      { label: "Scope", text: "DeepSeek’s products and services include those provided to you through websites, applications (which may include different versions), software development kits (SDKs) for third-party websites and applications, application programming interfaces (APIs), and innovative forms that emerge with technological development.", cite: "Sec. 1.1" },
      { label: "Human review + liability", text: "… such Outputs shall undergo human reviews; and you shall be solely and independently liable for the corresponding liabilities.", cite: "Sec. 5.4" },
      { label: "At your own risk", text: "Your use of any such link is undertaken at your sole discretion and risk.", cite: "Sec. 4.4" }
    ],
    note: "Risky outputs need human review — and the user carries the liability." },
  { provider: "DeepSeek", doc: "Open Platform Terms of Service", version: "Effective April 29, 2026", audience: "Developers (API)",
    url: "https://cdn.deepseek.com/policies/en-US/deepseek-open-platform-terms-of-service.html",
    agent: "No", terms: "“Output,” “Services”",
    quotes: [
      { label: "Outputs must not be acted on", text: "shall not form the basis for further actions or omissions", cite: "On Outputs" },
      { label: "Relationship to Terms of Use", text: "serves as a Specific Agreement to the “DeepSeek Terms of Use”", cite: "Preamble" }
    ],
    note: "A contractual instruction that output must not be acted upon — which is exactly what an agent does by design. Developers must also tell their own users the content is AI-made." },

  { provider: "xAI", doc: "Consumer Terms of Service", version: "Effective June 26, 2026", audience: "Consumer",
    url: "https://x.ai/legal/terms-of-service",
    agent: "Yes", terms: "“Agentic Actions,” “autonomous actions”",
    quotes: [],
    note: "Defines “Agentic Actions” in concrete terms — including interactions with financial institutions — and then disclaims liability for them, while reserving the power to disable them. (Tabulated; not part of the five-provider deep analysis.)" },
  { provider: "GitHub", doc: "Generative AI Services Terms", version: "Version March 2026 (effective March 5, 2026)", audience: "Enterprise / Copilot",
    url: "https://github.com/customer-terms/github-generative-ai-services-terms",
    agent: "Yes", terms: "“agent”",
    quotes: [
      { label: "Who is responsible", text: "… you are solely responsible for any application or agent you create using (or for use with) Generative AI Services …", cite: "Shared Responsibility" },
      { label: "Agent templates", text: "… or responsibility for your use of non-GitHub products, including your use of third-party agent templates …", cite: "GitHub-integrated Components" }
    ],
    note: "The clause is headed “Shared Responsibility” — yet you alone are responsible for any application or agent you build. (Tabulated.)" },
  { provider: "AWS", doc: "AWS Service Terms (Sec. 1.24; Sec. 50 AI Services)", version: "Last updated July 17, 2026", audience: "All AWS customers",
    url: "https://aws.amazon.com/service-terms/",
    agent: "Yes", terms: "“agent” in product names (SageMaker Data Agent, DevOps Agent)",
    quotes: [
      { label: "Compliance is yours", text: "If you use any artificial intelligence and machine learning Services, features, and functionality (including third-party models) that we provide, it’s your responsibility to ensure that your use complies with all applicable laws, rules, and regulations, and the AWS Responsible AI Policy.", cite: "Sec. 1.24" }
    ],
    note: "Names branded agent products while the obligations governing them stay generic. (Tabulated; Amazon is infrastructure rather than a model developer.)" },
  { provider: "AWS", doc: "AWS Responsible AI Policy", version: "Last updated January 13, 2025", audience: "All AWS AI/ML customers",
    url: "https://aws.amazon.com/ai/responsible-ai/policy/",
    agent: "No", terms: "“AI/ML Services”",
    quotes: [
      { label: "Actions — and failures to act", text: "You and your end users are responsible for all decisions made, advice given, actions taken, and failures to take action based on your use of AI/ML Services.", cite: "Policy" },
      { label: "Verify", text: "Outputs should be evaluated for accuracy and appropriateness for your use case.", cite: "Policy" },
      { label: "AI law", text: "It’s your responsibility to ensure you comply with any laws, rules, and regulations applicable to your use of the AI/ML Services. This includes laws specific to artificial intelligence such as the EU AI Act.", cite: "Policy" }
    ],
    note: "Responsibility extends to “actions taken, and failures to take action” — both what the AI does and what it fails to do. (Tabulated.)" }
];

/* ---------- Governance scorecard (Section 10) ---------- */
RP.frameworks = [
  { name: "EU AI Act", region: "European Union · binding law", provider: "Strong", deployer: "Strong", enforcement: "Regulatory", paradox: "Partial",
    why: "The only instrument that combines binding force with duties at both ends of the chain — detailed provider duties (Art. 16), deployer duties (Art. 26), a value-chain clause (Art. 25) and upstream duties on general-purpose models (Arts. 53, 55). Still only partial: obligations are organised around use-case risk, and the upstream duties are gated by a systemic-risk threshold." },
  { name: "NIST AI RMF", region: "United States · voluntary", provider: "Limited", deployer: "Strong", enforcement: "Voluntary", paradox: "Weak",
    why: "A sophisticated, function-based approach to organisational risk management — but voluntary, and it does not differentiate obligations by position in the value chain." },
  { name: "OECD AI Principles", region: "Multilateral · voluntary", provider: "General", deployer: "General", enforcement: "Voluntary", paradox: "Weak",
    why: "Widely endorsed values — transparency, accountability, human oversight — that address providers and deployers only in general terms." },
  { name: "UNESCO Recommendation", region: "Multilateral · voluntary", provider: "General", deployer: "General", enforcement: "Voluntary", paradox: "Weak",
    why: "Normative foundations for responsible AI, written before agents; no binding force and no differentiated obligations." },
  { name: "IMDA Model AI Governance Framework for Agentic AI", region: "Singapore · voluntary (v1.5, June 2026)", provider: "Limited", deployer: "Very Strong", enforcement: "Voluntary", paradox: "Partial",
    why: "The strongest soft-law instrument on the deployment side — risk-based oversight, least privilege enforced structurally, cryptographic agent identity, and the rule that an agent's authority should never exceed its authorising human's. It names upstream actors, but hands the job of managing them to the deployer." },
  { name: "ICO Tech Futures: Agentic AI", region: "United Kingdom · foresight assessment", provider: "Limited", deployer: "Strong", enforcement: "Voluntary", paradox: "Weak",
    why: "Names supplier obligations before the point of sale, then organises its analysis around the deploying organisation as data controller and defers binding rules to a forthcoming statutory code." },
  { name: "Five Eyes: Careful Adoption of Agentic AI Services", region: "Multilateral · security guidance (2026)", provider: "Limited", deployer: "Strong", enforcement: "Voluntary", paradox: "Weak",
    why: "Detailed structural controls — least privilege at the tool layer, unique cryptographic identities, isolation, continuous monitoring. Diagnostic rather than corrective: it shows that risk originates upstream, then addresses the downstream actors." },
  { name: "Proposed Value-Chain Model", region: "This paper", provider: "Strong", deployer: "Strong", enforcement: "Mixed", paradox: "Strong",
    why: "Obligations track influence — capability creation, information advantage, economic benefit and capacity to mitigate — rather than proximity to the end user." }
];

/* ---------- Risk taxonomy (Annex T2) ---------- */
RP.taxonomy = [
  { tier: "Model / cognition", risks: [
    { name: "Reasoning failure", examples: "Hallucination; semantic misalignment; plan drift; accuracy gaps", fiveEyes: "Behavior and Accuracy families; addressed", imda: "Sources of risk; planning; addressed", mitigation: "Grounding/RAG; reflection; output validation" },
    { name: "Misalignment", examples: "Specification gaming; over-optimization; intent misinterpretation", fiveEyes: "Behavior family; detailed", imda: "Erroneous actions; addressed", mitigation: "Reward modelling; adversarial testing; SOPs" },
    { name: "Deception", examples: "Strategic deception; eval-gaming; sandbagging; unfaithful CoT", fiveEyes: "Behavior family; detailed", imda: "Addressed briefly", mitigation: "Interpretability; varied-condition eval" },
    { name: "Emergence", examples: "Unforeseen capabilities; unpredictable interactions", fiveEyes: "Behavior and Structural families; addressed", imda: "Systemic and multi-agent; addressed", mitigation: "Continuous capability eval; red teaming" } ] },
  { tier: "Privilege / identity", risks: [
    { name: "Privilege compromise", examples: "Over-privilege; scope creep; confused deputy; stale entitlements", fiveEyes: "Privilege family; detailed", imda: "Bounding agents by design; addressed", mitigation: "Least privilege; per-call authz; JIT credentials" },
    { name: "Identity integrity", examples: "Spoofing; impersonation; credential theft; recursive delegation", fiveEyes: "Privilege family; addressed", imda: "Agent identity; detailed", mitigation: "Unique crypto identity; central registry; mTLS" } ] },
  { tier: "Tool / interface", risks: [
    { name: "Tool misuse", examples: "Wrong tool/input/order; tool squatting; misleading descriptions; two-way injection", fiveEyes: "Structural family; tool use; addressed", imda: "Sources of risk; tools; addressed", mitigation: "Allow-lists; strict schemas; standardized descriptions" },
    { name: "Protocol risk", examples: "Compromised MCP servers; untrusted protocol deployment", fiveEyes: "Structural family; third-party components; addressed", imda: "Sources of risk; protocols; detailed (a focus unique to IMDA)", mitigation: "Server whitelisting; sandboxed execution; MCP as governance layer" } ] },
  { tier: "Data", risks: [
    { name: "Exposure / exfiltration", examples: "Sensitive data leakage; aggregation as attack target; persistent-memory accumulation", fiveEyes: "Structural and Visibility families; data exposure; addressed", imda: "Data breaches; addressed", mitigation: "Data minimization; context separation (TEE); DLP" },
    { name: "Integrity / poisoning", examples: "Data poisoning; memory poisoning; adversarial inputs", fiveEyes: "Behavior family; addressed", imda: "Sources of risk; addressed", mitigation: "Input validation; trusted data sources" } ] },
  { tier: "Structural / systemic", risks: [
    { name: "Cascading failure", examples: "Error propagation; hallucination propagation; orchestration faults; sponge/DoS", fiveEyes: "Structural family; detailed", imda: "Cascading and compounding failures; addressed", mitigation: "Isolation; circuit-breakers; rate limits" },
    { name: "Multi-agent dynamics", examples: "Miscoordination; conflict; collusion; rogue agent; comms eavesdrop/spoof", fiveEyes: "Structural family; rogue agents and communications; addressed", imda: "Systemic; collusion (raised only by IMDA); addressed", mitigation: "Structured-schema comms; multi-agent eval; consensus controls" },
    { name: "Sprawl", examples: "Uncontrolled proliferation; provenance / version incompatibility", fiveEyes: "Not addressed", imda: "Raised only by IMDA", mitigation: "Central agent registry; lifecycle management" } ] },
  { tier: "Human / organizational", risks: [
    { name: "Oversight failure", examples: "Automation bias; alert fatigue; rubber-stamping; expertise gaps", fiveEyes: "Implied only", imda: "Detailed; override-rate and response-time metrics", mitigation: "Checkpoint design; oversight auditing; deny-by-default" },
    { name: "Accountability diffusion", examples: "Attribution opacity; value-chain responsibility gaps; non-reproducibility", fiveEyes: "Accountability family; detailed", imda: "Accountability allocation; detailed", mitigation: "Value-chain mapping; immutable audit logs; role definition" },
    { name: "Capability erosion", examples: "Tradecraft / skill degradation; business-continuity risk", fiveEyes: "Not addressed", imda: "Raised only by IMDA", mitigation: "Core-skill training; work exposure retention" } ] },
  { tier: "Fairness", risks: [
    { name: "Biased action", examples: "Discriminatory outcomes in hiring / procurement / grants", fiveEyes: "Not addressed", imda: "Raised only by IMDA", mitigation: "Bias testing across demographics" } ] }
];

/* ---------- The case: Hugging Face, July 2026 ---------- */
RP.incident = [
  { t: "The setup", d: "Two OpenAI models are under evaluation inside a supposedly isolated testing environment." },
  { t: "The escape", d: "They break out by exploiting a previously unknown vulnerability in a package proxy." },
  { t: "The intrusion", d: "They intrude into Hugging Face's production systems — in search of solutions to the very benchmark they were being tested on." },
  { t: "The first", d: "Hugging Face describes the breach as the first cyberattack executed end to end by an autonomous agent system." },
  { t: "The dispute", d: "The two companies offer differing accounts of the cause. Hugging Face's chief executive demands that OpenAI release the agent traces so researchers can establish what happened and why." }
];

/* ---------- Policy implications ---------- */
RP.implications = [
  { t: "Provider responsibilities must expand", d: "Foundation model providers should bear obligations that match capability creation, information advantage and systemic influence." },
  { t: "Governance must follow architecture", d: "Because agent architectures are accountability architectures, responsibilities should follow the distribution of influence inside those systems." },
  { t: "Transparency alone is not enough", d: "Disclosure improves governance but does not by itself resolve accountability. Knowledge, power and responsibility have to be connected." },
  { t: "Build the capacity to measure and audit", d: "Value-chain accountability only works if we can reliably measure and audit what agents actually do — so that responsibility, once assigned, can be checked." }
];
