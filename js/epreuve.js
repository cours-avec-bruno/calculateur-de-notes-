document.addEventListener('DOMContentLoaded', () => {
  const id = new URLSearchParams(window.location.search).get('id');
  const ep = CATALOGUE.find(e => e.id === id);

  if (!ep) { showFatal('Épreuve introuvable.'); return; }

  setHeader(ep);

  if (!ep.hasCorrige) {
    showComingSoon(ep);
    return;
  }

  // Chargement dynamique du fichier de corrigé
  const script    = document.createElement('script');
  script.src      = `js/data/${ep.id}.js`;
  script.onerror  = () => showFatal('Impossible de charger les données de cette épreuve.');
  script.onload   = () => {
    renderParties(ep);
    updateEstimator(ep, Storage.get(ep.id));
    updateProgress(ep, Storage.get(ep.id));
    if (typeof renderMathInElement !== 'undefined') {
      renderMathInElement(document.getElementById('partiesContainer'), {
        delimiters: [
          { left: '$$', right: '$$', display: true  },
          { left: '$',  right: '$',  display: false }
        ],
        throwOnError: false
      });
    }
  };
  document.head.appendChild(script);
});

// ── Helpers ──────────────────────────────────────────────────────────────────

function setHeader(ep) {
  document.title = `${ep.nom} — BANQUE PT ${ep.annee}`;
  document.getElementById('epNom').textContent   = ep.nom;
  document.getElementById('epAnnee').textContent = ep.annee;
  document.getElementById('epDuree').textContent = ep.duree;

  if (ep.mu !== null) {
    const span = document.createElement('span');
    span.className = 'stat-item';
    span.innerHTML = `μ = ${ep.mu} · σ = ${ep.sigma}`;
    document.getElementById('epStats').appendChild(span);
  }
}

function showFatal(msg) {
  document.getElementById('partiesContainer').innerHTML = `
    <div class="empty-state">
      <div class="empty-icon">⚠</div>
      <h3>${msg}</h3>
      <a href="index.html" class="btn btn-secondary" style="margin-top:16px">← Retour à l'accueil</a>
    </div>`;
}

function showComingSoon(ep) {
  document.getElementById('partiesContainer').innerHTML = `
    <div class="empty-state">
      <div class="empty-icon">📋</div>
      <h3>Corrigé à venir</h3>
      <p>Le corrigé de <strong>${ep.nom}</strong> n'est pas encore disponible.<br>
         Fournissez le sujet pour qu'il soit généré et intégré ici.</p>
    </div>`;
}

function renderParties(ep) {
  const container = document.getElementById('partiesContainer');

  if (!ep.parties || ep.parties.length === 0) {
    showComingSoon(ep);
    return;
  }

  const assessment = Storage.get(ep.id);

  ep.parties.forEach(partie => {
    const savedPct = assessment[partie.id];

    const questionsHTML = (partie.questions || []).map(q => `
      <div class="question-block">
        <div class="question-num">Question ${q.num}</div>
        <div class="question-enonce">${q.enonce}</div>
        <div class="corrige-label">✓ Corrigé</div>
        <div class="question-corrige">${q.corrige}</div>
      </div>`).join('');

    const btnsHTML = [0, 25, 50, 75, 100].map(v => `
      <button class="assess-btn${savedPct === v ? ' selected' : ''}" data-value="${v}">
        <span class="assess-pct">${v}%</span>
        <span class="assess-lbl">${LABELS[v]}</span>
      </button>`).join('');

    const div = document.createElement('div');
    div.className = 'partie-card';

    div.innerHTML = `
      <div class="partie-header">
        <div class="partie-title">${partie.titre}</div>
        <div class="partie-points">${partie.points} pts</div>
      </div>
      ${questionsHTML}
      <div class="assessment-section">
        <div class="assessment-label">Quelle part de cette partie as-tu réussie ?</div>
        <div class="assessment-buttons">${btnsHTML}</div>
      </div>`;

    div.querySelectorAll('.assess-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        div.querySelectorAll('.assess-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        const current = Storage.get(ep.id);
        current[partie.id] = parseInt(btn.dataset.value, 10);
        Storage.set(ep.id, current);
        updateEstimator(ep, current);
        updateProgress(ep, current);
      });
    });

    container.appendChild(div);
  });
}

function updateEstimator(ep, assessment) {
  const box = document.getElementById('estimatorContent');

  if (ep.mu === null) {
    box.innerHTML = `<p class="estimator-waiting">
      Distribution (μ, σ) non encore renseignée pour cette épreuve.</p>`;
    return;
  }
  if (!Object.keys(assessment).length) {
    box.innerHTML = `<p class="estimator-waiting">Évalue les parties pour voir ta note estimée.</p>`;
    return;
  }

  const pct = GradeModel.weightedPct(ep, assessment);
  const r   = GradeModel.estimate(pct, ep.mu, ep.sigma);
  const cls = GradeModel.gradeClass(r.centrale);

  const lo = (r.basse    / 20) * 100;
  const hi = (r.haute    / 20) * 100;
  const pt = (r.centrale / 20) * 100;

  box.innerHTML = `
    <div class="estimated-grade ${cls}">${GradeModel.fmt(r.centrale)}<span class="grade-denom">/20</span></div>
    <div class="estimator-sublabel">Estimation centrale</div>
    <div class="confidence-bar">
      <div class="confidence-range" style="left:${lo}%;width:${hi - lo}%"></div>
      <div class="confidence-point" style="left:${pt}%"></div>
    </div>
    <div class="confidence-labels">
      <span>${GradeModel.fmt(r.basse)}</span>
      <span>${GradeModel.fmt(r.haute)}</span>
    </div>
    <div class="estimator-meta">
      μ = ${ep.mu} · σ = ${ep.sigma}<br>
      Auto-éval. : ${Math.round(pct)}%<br>
      Marge λ = ${GradeModel.LAMBDA}σ
    </div>`;
}

function updateProgress(ep, assessment) {
  const total = (ep.parties || []).length;
  const done  = (ep.parties || []).filter(p => assessment[p.id] !== undefined).length;
  const pct   = total > 0 ? (done / total) * 100 : 0;
  const fill  = document.getElementById('progressFill');
  const label = document.getElementById('progressLabel');
  if (fill)  fill.style.width  = pct + '%';
  if (label) label.textContent = `${done} / ${total} parties évaluées`;
}

const LABELS = { 0: 'Pas réussi', 25: 'Difficultés', 50: 'Moyen', 75: 'Bien', 100: 'Excellent' };
