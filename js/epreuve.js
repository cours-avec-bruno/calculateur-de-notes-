document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id     = params.get('id');
  const ep     = BANQUE_PT.epreuves.find(e => e.id === id);

  if (!ep) {
    document.body.innerHTML = `
      <div class="container" style="padding:80px 20px;text-align:center">
        <h2>Épreuve introuvable</h2>
        <a href="index.html" class="btn btn-secondary" style="margin-top:16px">← Retour à l'accueil</a>
      </div>`;
    return;
  }

  document.title = `${ep.nom} — BANQUE PT ${ep.annee}`;
  document.getElementById('epNom').textContent    = ep.nom;
  document.getElementById('epAnnee').textContent  = ep.annee;
  document.getElementById('epDuree').textContent  = ep.duree;

  if (ep.mu !== null) {
    const tag = document.createElement('span');
    tag.className = 'stat-item';
    tag.innerHTML = `μ = ${ep.mu} &nbsp;·&nbsp; σ = ${ep.sigma}`;
    document.getElementById('epStats').appendChild(tag);
  }

  const saved      = JSON.parse(localStorage.getItem('banquePT_assessments') || '{}');
  const assessment = saved[ep.id] || {};

  // ── Render parties ─────────────────────────────────────────────────────────
  const container  = document.getElementById('partiesContainer');

  if (!ep.parties || ep.parties.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📋</div>
        <h3>Corrigé à venir</h3>
        <p>Le corrigé de cette épreuve n'a pas encore été intégré.<br>
           Fournissez le sujet pour qu'il soit généré.</p>
      </div>`;
    return;
  }

  const totalPoints = ep.parties.reduce((s, p) => s + p.points, 0);

  ep.parties.forEach(partie => {
    const saved_pct = assessment[partie.id];

    const questionsHTML = partie.questions.map(q => `
      <div class="question-block">
        <div class="question-num">Question ${q.num}</div>
        <div class="question-enonce">${q.enonce}</div>
        <div class="corrige-label">✓ Corrigé</div>
        <div class="question-corrige">${q.corrige}</div>
      </div>`).join('');

    const btnsHTML = [0, 25, 50, 75, 100].map(v => `
      <button class="assess-btn${saved_pct === v ? ' selected' : ''}"
              data-value="${v}">
        <span class="assess-pct">${v}%</span>
        <span class="assess-lbl">${assessLabel(v)}</span>
      </button>`).join('');

    const div = document.createElement('div');
    div.className = 'partie-card';
    div.dataset.partieId = partie.id;
    div.innerHTML = `
      <div class="partie-header">
        <div class="partie-title">${partie.titre}</div>
        <div class="partie-points">${partie.points} pts</div>
      </div>
      ${questionsHTML}
      <div class="assessment-section">
        <div class="assessment-label">
          Quelle part de cette partie as-tu réussie ?
        </div>
        <div class="assessment-buttons">${btnsHTML}</div>
      </div>`;

    // Assessment button clicks
    div.querySelectorAll('.assess-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        div.querySelectorAll('.assess-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        assessment[partie.id] = parseInt(btn.dataset.value, 10);
        persist(ep.id, assessment);
        updateEstimator(ep, assessment);
        updateProgress(ep, assessment);
      });
    });

    container.appendChild(div);
  });

  // ── Initial UI update ───────────────────────────────────────────────────────
  updateEstimator(ep, assessment);
  updateProgress(ep, assessment);

  // ── KaTeX render ────────────────────────────────────────────────────────────
  if (typeof renderMathInElement !== 'undefined') {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true  },
        { left: '$',  right: '$',  display: false }
      ],
      throwOnError: false
    });
  }
});

// ── Helpers ─────────────────────────────────────────────────────────────────

function assessLabel(v) {
  return { 0: 'Pas réussi', 25: 'Difficultés', 50: 'Moyen', 75: 'Bien', 100: 'Excellent' }[v];
}

function persist(epId, assessment) {
  const all = JSON.parse(localStorage.getItem('banquePT_assessments') || '{}');
  all[epId] = assessment;
  localStorage.setItem('banquePT_assessments', JSON.stringify(all));
}

function updateEstimator(ep, assessment) {
  const box = document.getElementById('estimatorContent');

  if (ep.mu === null) {
    box.innerHTML = `
      <p class="estimator-waiting">
        Les données de distribution (μ, σ) n'ont pas encore été renseignées pour cette épreuve.
      </p>`;
    return;
  }

  if (Object.keys(assessment).length === 0) {
    box.innerHTML = `
      <p class="estimator-waiting">Évalue les parties pour voir la note estimée.</p>`;
    return;
  }

  const pct    = GradeModel.weightedPct(ep, assessment);
  const result = GradeModel.estimate(pct, ep.mu, ep.sigma);
  const cls    = GradeModel.gradeClass(result.centrale);

  const lowPct   = (result.basse    / 20) * 100;
  const highPct  = (result.haute    / 20) * 100;
  const pointPct = (result.centrale / 20) * 100;
  const rangePct = highPct - lowPct;

  box.innerHTML = `
    <div class="estimated-grade ${cls}">
      ${GradeModel.fmt(result.centrale)}
      <span class="grade-denom">/20</span>
    </div>
    <div class="estimator-sublabel">Estimation centrale</div>

    <div class="confidence-bar">
      <div class="confidence-range" style="left:${lowPct}%;width:${rangePct}%"></div>
      <div class="confidence-point" style="left:${pointPct}%"></div>
    </div>
    <div class="confidence-labels">
      <span>${GradeModel.fmt(result.basse)}</span>
      <span>${GradeModel.fmt(result.haute)}</span>
    </div>
    <div class="estimator-meta">
      Distribution : μ = ${ep.mu}, σ = ${ep.sigma}<br>
      Auto-éval. pondérée : ${Math.round(pct)}%<br>
      Marge de sécurité λ = ${GradeModel.LAMBDA}σ
    </div>`;
}

function updateProgress(ep, assessment) {
  const total = (ep.parties || []).length;
  const done  = (ep.parties || []).filter(p => assessment[p.id] !== undefined).length;
  const pct   = total > 0 ? (done / total) * 100 : 0;

  const fill  = document.getElementById('progressFill');
  const label = document.getElementById('progressLabel');
  if (fill)  fill.style.width    = pct + '%';
  if (label) label.textContent   = `${done}/${total} parties évaluées`;
}
