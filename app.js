/* ============================================================
   THE RESPONSIBILITY PARADOX — app
   ============================================================ */
(function(){
  const $ = (s, el=document) => el.querySelector(s);
  const h = (tag, attrs={}, ...kids) => {
    const el = document.createElement(tag);
    for (const [k,v] of Object.entries(attrs)) {
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else if (k === 'style') el.style.cssText = v;
      else el.setAttribute(k, v);
    }
    for (const k of kids.flat()) if (k != null) el.append(k.nodeType ? k : document.createTextNode(k));
    return el;
  };
  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const actorColor = id => (RP.actors.find(a => a.id === id) || {}).color || '#fff';
  const actorName  = id => (RP.actors.find(a => a.id === id) || {}).name || id;

  /* ---------- icons ---------- */
  const ICON = {
    eye:      `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 24 C13 13 35 13 43 24 C35 35 13 35 5 24 Z"/><circle cx="24" cy="24" r="6.5"/><circle cx="24" cy="24" r="1.8" fill="currentColor"/></svg>`,
    brain:    `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M24 12 C20 8 13 9 12 15 C7 16 7 23 12 25 C11 31 17 34 21 31"/><path d="M24 12 C28 8 35 9 36 15 C41 16 41 23 36 25 C37 31 31 34 27 31"/><line x1="24" y1="12" x2="24" y2="33"/></svg>`,
    bulb:     `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M24 6 C16 6 11 12 11 19 C11 24 15 27 17 30 L31 30 C33 27 37 24 37 19 C37 12 32 6 24 6 Z"/><line x1="18" y1="35" x2="30" y2="35"/><line x1="20" y1="40" x2="28" y2="40"/></svg>`,
    rocket:   `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M24 5 C31 12 33 22 31 32 L17 32 C15 22 17 12 24 5 Z"/><circle cx="24" cy="18" r="3.6"/><path d="M17 31 L11 37 L15 37"/><path d="M31 31 L37 37 L33 37"/><path d="M21 35 L24 42 L27 35"/></svg>`,
    database: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="24" cy="11" rx="13" ry="5"/><path d="M11 11 v25 c0 3 6 5 13 5 s13 -2 13 -5 V11"/><path d="M11 24 c0 3 6 5 13 5 s13 -2 13 -5"/></svg>`,
    gear:     `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="8.5"/><circle cx="24" cy="24" r="3"/><line x1="33" y1="24" x2="36" y2="24"/><line x1="12" y1="24" x2="15" y2="24"/><line x1="24" y1="12" x2="24" y2="15"/><line x1="24" y1="33" x2="24" y2="36"/><line x1="30.4" y1="17.6" x2="32.5" y2="15.5"/><line x1="15.5" y1="32.5" x2="17.6" y2="30.4"/><line x1="30.4" y1="30.4" x2="32.5" y2="32.5"/><line x1="15.5" y1="15.5" x2="17.6" y2="17.6"/></svg>`,
    person:   `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="16" r="7"/><path d="M11 39 C11 30 17 26 24 26 C31 26 37 30 37 39"/></svg>`,
    globe:    `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="18"/><ellipse cx="24" cy="24" rx="8" ry="18"/><line x1="6" y1="24" x2="42" y2="24"/><path d="M9 15 C16 19 32 19 39 15"/><path d="M9 33 C16 29 32 29 39 33"/></svg>`
  };

  /* ---------- anatomy ---------- */
  function renderAnatomy(){
    const grid = $('#compGrid'), detail = $('#compDetail');
    let active = RP.components[1].id;
    const draw = () => {
      grid.innerHTML = '';
      RP.components.forEach(c => {
        const b = h('button', { class: 'comp' + (c.id===active?' active':''), style: `--c:${c.color}`, onclick: () => { active = c.id; draw(); } },
          h('span', { class: 'ic', html: ICON[c.icon] }),
          h('span', {}, h('b', {}, (c.n ? c.n + '. ' : '') + c.name), h('small', {}, c.desc))
        );
        grid.append(b);
      });
      const c = RP.components.find(x => x.id === active);
      detail.style.setProperty('--c', c.color);
      detail.innerHTML = '';
      detail.append(
        h('div', { class: 'ic', html: ICON[c.icon] }),
        h('h3', {}, (c.n ? c.n + '. ' : '') + c.name),
        h('p', {}, c.desc),
        h('div', { class: 'lab' }, 'What goes wrong here'),
        h('p', {}, c.failure),
        h('div', { class: 'lab' }, 'Who owns the failure'),
        h('div', { class: 'owners' }, ...c.owner.map(o => h('span', { class: 'tag ' + o }, actorName(o)))),
        h('p', { class: 'small', style: 'margin-top:.6rem' }, c.ownerNote)
      );
    };
    draw();
  }

  /* ---------- matrix ---------- */
  function renderMatrix(){
    const g = $('#matrixGrid'), note = $('#critNote'), list = $('#critList');
    const defaultNote = note.innerHTML;
    g.append(h('div', { class: 'h' }, 'Criterion'));
    RP.actors.forEach(a => g.append(h('div', { class: 'h actor', style: `--c:${a.color}` }, a.name)));
    RP.matrix.forEach((row, i) => {
      const crit = RP.criteria[i];
      const r = h('div', { class: 'r', onmouseenter: () => { note.innerHTML = `<b>${esc(crit.key)}</b> — ${esc(crit.plain)} ${esc(crit.note)}`; }, onmouseleave: () => { note.innerHTML = defaultNote; } }, row.criterion);
      g.append(r);
      ['provider','developer','deployer','user'].forEach(a => {
        const v = row[a]; const s = RP.levelScore[v];
        const cls = 'lvl-' + String(s).replace('.','');
        g.append(h('div', { class: 'c ' + cls, title: `${row.criterion} — ${actorName(a)}: ${v}` }, v));
      });
    });
    RP.criteria.forEach(c => list.append(h('div', { class: 'crit' }, h('b', {}, c.key), h('span', {}, c.plain))));
  }

  /* ---------- risk lifecycle plot ---------- */
  function renderPlot(){
    const wrap = $('#plot'), tip = $('#riskTip');
    const defaultTip = tip.innerHTML;
    const NS = 'http://www.w3.org/2000/svg';
    const W = 1100, L = 250, R = 30, TOP = 96, rowH = 30, gapH = 26;
    const groups = [...new Set(RP.risks.map(r => r.group))];
    const nRows = RP.risks.length + groups.length;
    const H = TOP + nRows * rowH + 30;
    const colW = (W - L - R) / RP.stages.length;
    const cx = n => L + (n - .5) * colW;
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const S = (tag, a={}, txt) => { const e = document.createElementNS(NS, tag); for (const [k,v] of Object.entries(a)) e.setAttribute(k, v); if (txt!=null) e.textContent = txt; return e; };

    // actor bands
    const bandFor = a => a.split('+').map(actorColor);
    RP.stages.forEach((st, i) => {
      const x = L + i * colW;
      const cols = bandFor(st.actor);
      const grad = S('linearGradient', { id: 'g' + i, x1: 0, x2: 1, y1: 0, y2: 0 });
      cols.forEach((c, j) => grad.append(S('stop', { offset: cols.length === 1 ? 0 : j / (cols.length - 1), 'stop-color': c })));
      const defs = S('defs'); defs.append(grad); svg.append(defs);
      svg.append(S('rect', { x: x + 2, y: 14, width: colW - 4, height: 8, rx: 4, fill: `url(#g${i})`, opacity: .9 }));
      const lab = S('text', { x: cx(i + 1), y: 46, 'text-anchor': 'middle', 'font-size': 11, fill: '#B8C2D6', 'font-weight': 600 });
      st.name.split(' & ').forEach((part, j, arr) => { const t = S('tspan', { x: cx(i + 1), dy: j === 0 ? 0 : 13 }, arr.length > 1 && j === 0 ? part + ' &' : part); lab.append(t); });
      svg.append(lab);
      svg.append(S('text', { x: cx(i + 1), y: 84, 'text-anchor': 'middle', 'font-size': 9.5, fill: '#5C6780' }, st.actor.split('+').map(actorName).join(' · ')));
      // grid line
      svg.append(S('line', { x1: cx(i + 1), x2: cx(i + 1), y1: TOP - 6, y2: H - 20, stroke: 'rgba(255,255,255,.06)' }));
    });

    let y = TOP; let lastGroup = null;
    RP.risks.forEach(r => {
      if (r.group !== lastGroup) {
        y += 6;
        svg.append(S('text', { x: 12, y: y + 12, 'font-size': 11.5, fill: '#F59E0B', 'font-style': 'italic', 'font-weight': 600 }, r.group));
        y += rowH - 4; lastGroup = r.group;
      }
      const cy = y + rowH / 2;
      const gRow = S('g', { class: 'rrow', style: 'cursor:default' });
      const all = [...r.origin, ...r.mit, ...r.both];
      const mn = Math.min(...all), mx = Math.max(...all);
      gRow.append(S('rect', { x: 0, y: y, width: W, height: rowH, fill: 'transparent', class: 'hit' }));
      const lbl = S('text', { x: 24, y: cy + 4, 'font-size': 12, fill: '#EAF0FA' }, r.name);
      gRow.append(lbl);
      if (mn !== mx) gRow.append(S('line', { x1: cx(mn), x2: cx(mx), y1: cy, y2: cy, stroke: 'rgba(255,255,255,.28)', 'stroke-width': 1.5, class: 'span' }));
      r.origin.forEach(n => gRow.append(S('circle', { cx: cx(n), cy, r: 5.5, fill: '#fff', class: 'dot' })));
      r.mit.forEach(n => gRow.append(S('circle', { cx: cx(n), cy, r: 5.5, fill: '#070B14', stroke: '#fff', 'stroke-width': 2, class: 'dot' })));
      r.both.forEach(n => { gRow.append(S('circle', { cx: cx(n), cy, r: 7.5, fill: 'none', stroke: '#fff', 'stroke-width': 2, class: 'dot' })); gRow.append(S('circle', { cx: cx(n), cy, r: 3.2, fill: '#fff', class: 'dot' })); });
      const originStages = [...r.origin, ...r.both].map(n => RP.stages[n - 1].name);
      const mitStages = [...r.mit, ...r.both].map(n => RP.stages[n - 1].name);
      const originActors = [...new Set([...r.origin, ...r.both].map(n => RP.stages[n - 1].actor))].join('+').split('+').map(actorName).filter((v, i, a) => a.indexOf(v) === i);
      gRow.addEventListener('mouseenter', () => {
        gRow.querySelector('.hit').setAttribute('fill', 'rgba(245,158,11,.10)');
        lbl.setAttribute('fill', '#FDE68A');
        tip.innerHTML = `<b>${esc(r.name)}</b> <span class="muted">(${esc(r.group.toLowerCase())})</span> — originates at <b>${esc(originStages.join(', '))}</b>, controlled by <b>${esc(originActors.join(' / '))}</b>; primarily mitigated at <b>${esc(mitStages.join(', '))}</b>.${mn !== mx ? ' <em>Origin ≠ point of detection.</em>' : ' <em>Origin and mitigation coincide.</em>'}`;
      });
      gRow.addEventListener('mouseleave', () => { gRow.querySelector('.hit').setAttribute('fill', 'transparent'); lbl.setAttribute('fill', '#EAF0FA'); tip.innerHTML = defaultTip; });
      svg.append(gRow);
      y += rowH;
    });
    wrap.append(svg);
  }

  /* ---------- timeline ---------- */
  function renderTimeline(){
    const t = $('#timeline');
    RP.incident.forEach(e => t.append(h('div', { class: 'ev' }, h('b', {}, e.t), h('span', {}, e.d))));
  }

  /* ---------- providers ---------- */
  function renderProviders(){
    const tabs = $('#provTabs'), panel = $('#provPanel');
    let active = RP.providers[0].id;
    const draw = () => {
      tabs.innerHTML = ''; panel.innerHTML = '';
      RP.providers.forEach(p => tabs.append(h('button', { class: 'tab' + (p.id===active?' active':''), onclick: () => { active = p.id; draw(); } }, p.name)));
      const p = RP.providers.find(x => x.id === active);
      panel.append(h('div', { class: 'head' }, h('h3', {}, p.name), h('div', { class: 'tl' }, p.tagline)));
      const left = h('div', { style: 'display:grid;gap:.8rem' });
      Object.keys(RP.dimLabels).forEach(k => left.append(h('div', { class: 'dim' }, h('div', { class: 'lab' }, RP.dimLabels[k]), h('p', {}, p.dims[k]))));
      const right = h('div', { style: 'display:grid;gap:.8rem;align-content:start' });
      right.append(h('div', { class: 'dim' }, h('div', { class: 'lab' }, 'In the contract — verbatim')));
      p.quotes.forEach(q => right.append(h('blockquote', { class: 'q', style: 'margin:0' }, q.text, h('cite', {}, q.cite))));
      panel.append(left, right);
      const sc = h('div', { class: 'scores' });
      Object.keys(RP.scoreLabels).forEach(k => {
        const v = p.scores[k]; const cls = v.toLowerCase().split(' ')[0];
        sc.append(h('div', { class: 'score ' + cls + (k==='retained'?' retained':'') }, h('small', {}, RP.scoreLabels[k]), h('b', {}, v)));
      });
      panel.append(sc);
    };
    draw();

    // vocabulary strip
    const v = $('#vocab');
    RP.providers.forEach(p => v.append(h('div', { class: 'v' }, h('b', {}, p.name), h('span', {}, p.vocab))));

    // allocation table
    const t = $('#allocTable');
    const thead = h('thead', {}, h('tr', {}, h('th', {}, 'Provider'), ...Object.values(RP.scoreLabels).map(l => h('th', {}, l))));
    const tbody = h('tbody');
    RP.providers.forEach(p => {
      const tr = h('tr', {}, h('td', { class: 'n' }, p.name));
      Object.keys(RP.scoreLabels).forEach(k => {
        const val = p.scores[k]; const base = val.split(' ')[0];
        tr.append(h('td', {}, h('span', { class: 'pill ' + base }, val)));
      });
      tbody.append(tr);
    });
    t.append(h('caption', { style: 'caption-side:top;text-align:left;padding:.9rem 1rem;font-size:.85rem;color:var(--muted)' }, 'Provider scoring on the capability and benefit criteria (High / Moderate / Low). The last column records how much responsibility each provider keeps under its own contracts.'), thead, tbody);
  }

  /* ---------- ToU explorer ---------- */
  function renderTou(){
    const bar = $('#touToolbar'), docs = $('#touDocs'), count = $('#touCount');
    const provs = ['All', ...new Set(RP.tou.map(d => d.provider))];
    let prov = 'All', q = '';
    const search = h('input', { class: 'search', type: 'search', placeholder: 'Search the contract language… e.g. “solely responsible”, “human review”, “agent”', oninput: e => { q = e.target.value.trim().toLowerCase(); draw(); } });
    const chips = h('div', { style: 'display:flex;gap:.4rem;flex-wrap:wrap' });
    const drawChips = () => { chips.innerHTML = ''; provs.forEach(p => chips.append(h('button', { class: 'chip' + (p===prov?' active':''), onclick: () => { prov = p; draw(); } }, p))); };
    bar.append(chips, search);
    const draw = () => {
      drawChips();
      docs.innerHTML = '';
      const list = RP.tou.filter(d => (prov === 'All' || d.provider === prov)).filter(d => {
        if (!q) return true;
        const hay = [d.provider, d.doc, d.version, d.terms, d.note, ...d.quotes.map(x => x.label + ' ' + x.text + ' ' + x.cite)].join(' ').toLowerCase();
        return hay.includes(q);
      });
      count.textContent = `${list.length} document${list.length===1?'':'s'}${prov!=='All'?' · '+prov:''}${q?' · matching “'+q+'”':''}`;
      list.forEach(d => {
        const card = h('div', { class: 'doc' });
        card.append(h('div', { class: 'top' },
          h('div', {}, h('div', { class: 'prov-name' }, d.provider), h('h4', {}, d.doc)),
          h('span', { class: 'tag ' + (d.agent==='Yes'?'yes':'no') }, d.agent === 'Yes' ? 'names agents' : 'no “agent” wording')
        ));
        card.append(h('div', { class: 'meta' }, h('span', {}, d.version), h('span', {}, '·'), h('span', {}, d.audience), h('span', {}, '·'), h('a', { href: d.url, target: '_blank', rel: 'noopener' }, 'source ↗')));
        card.append(h('div', { class: 'terms', html: `<b>Terms used:</b> ${esc(d.terms)}` }));
        if (d.quotes.length) {
          const det = h('details', {}, h('summary', {}, `${d.quotes.length} verbatim quotation${d.quotes.length>1?'s':''}`));
          const qs = h('div', { class: 'qs' });
          d.quotes.forEach(x => qs.append(h('div', { class: 'qq' }, h('div', { class: 'l' }, x.label), h('div', { class: 't' }, '“' + x.text + '”'), h('div', { class: 'c' }, `${d.doc} — ${x.cite}`))));
          det.append(qs); card.append(det);
        }
        card.append(h('div', { class: 'note' }, d.note));
        docs.append(card);
      });
      if (!list.length) docs.append(h('div', { class: 'card' }, h('p', {}, 'No documents match that search.')));
    };
    draw();
  }

  /* ---------- governance scorecard ---------- */
  function renderFrames(){
    const f = $('#frames');
    f.append(h('div', { class: 'hdr' }, h('span', {}, 'Framework'), h('span', {}, 'Provider duties'), h('span', {}, 'Deployer duties'), h('span', {}, 'Enforcement'), h('span', {}, 'Addresses paradox?')));
    const pill = v => h('span', { class: 'pill ' + v.replace(/\s+/g,'') }, v);
    RP.frameworks.forEach(fr => {
      const row = h('div', { class: 'frame' + (fr.name.startsWith('Proposed')?' hl':''), onclick: () => row.classList.toggle('open') },
        h('div', { class: 'nm' }, h('b', {}, fr.name), h('span', {}, fr.region)),
        h('div', { class: 'cell' }, pill(fr.provider)), h('div', { class: 'cell' }, pill(fr.deployer)), h('div', { class: 'cell' }, pill(fr.enforcement)), h('div', { class: 'cell' }, pill(fr.paradox)),
        h('div', { class: 'why' }, fr.why)
      );
      f.append(row);
    });
  }

  /* ---------- taxonomy ---------- */
  function renderTax(){
    const t = $('#tax');
    RP.taxonomy.forEach((tier, i) => {
      const d = h('details', { class: 'tier' }, h('summary', {}, h('span', {}, h('span', { class: 'n' }, String(i + 1)), tier.tier), h('span', { class: 'cnt' }, `${tier.risks.length} risk${tier.risks.length>1?'s':''}`)));
      const body = h('div', { class: 'body' });
      const tbl = h('table', {}, h('thead', {}, h('tr', {}, h('th', {}, 'Sub-risk'), h('th', {}, 'Examples'), h('th', {}, 'Five Eyes coverage'), h('th', {}, 'IMDA coverage'), h('th', {}, 'Primary mitigation'))));
      const tb = h('tbody');
      tier.risks.forEach(r => tb.append(h('tr', {}, h('td', {}, r.name), h('td', {}, r.examples), h('td', {}, r.fiveEyes), h('td', {}, r.imda), h('td', {}, r.mitigation))));
      tbl.append(tb); body.append(tbl); d.append(body); t.append(d);
    });
  }

  /* ---------- implications ---------- */
  function renderImps(){
    const el = $('#imps');
    RP.implications.forEach(i => el.append(h('div', { class: 'imp' }, h('b', {}, i.t), h('span', {}, i.d))));
  }

  /* ---------- reveal + progress ---------- */
  function fx(){
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
    document.querySelectorAll('.rv').forEach(el => io.observe(el));
    const bar = $('#progress');
    const onScroll = () => { const d = document.documentElement; const p = d.scrollTop / (d.scrollHeight - d.clientHeight); bar.style.width = (p * 100) + '%'; };
    document.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    setTimeout(() => $('#paradoxViz').classList.add('in'), 200);
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderAnatomy(); renderMatrix(); renderPlot(); renderTimeline(); renderProviders(); renderTou(); renderFrames(); renderTax(); renderImps(); fx();
  });
})();
