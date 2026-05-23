document.addEventListener('DOMContentLoaded', () => {
  const grid       = document.getElementById('epreuvesGrid');
  const resultsBtn = document.getElementById('resultsBtn');
  const saved      = JSON.parse(localStorage.getItem('banquePT_assessments') || '{}');
  let anyDone      = false;

  BANQUE_PT.epreuves.forEach(ep => {
    const assessment  = saved[ep.id];
    const hasCorrige  = ep.parties && ep.parties.length > 0;
    const hasDist     = ep.mu !== null && ep.sigma !== null;
    const isDone      = !!assessment && hasDist;
    if (isDone) anyDone = true;

    let statusBadge = '';
    let gradeHTML   = '';

    if (!hasCorrige) {
      statusBadge = '<span class="status-badge status-pending">À venir</span>';
    } else if (!assessment) {
      statusBadge = '<span class="status-badge status-available">À évaluer</span>';
    } else {
      statusBadge = '<span class="status-badge status-done">Évalué</span>';
      if (hasDist) {
        const pct    = GradeModel.weightedPct(ep, assessment);
        const result = GradeModel.estimate(pct, ep.mu, ep.sigma);
        const cls    = GradeModel.gradeClass(result.centrale);
        gradeHTML = `
          <div class="card-grade">
            <div class="grade-display ${cls}">${GradeModel.fmt(result.centrale)}<span class="grade-denom">/20</span></div>
            <div class="grade-interval">
              <div>↑ ${GradeModel.fmt(result.haute)}</div>
              <div>↓ ${GradeModel.fmt(result.basse)}</div>
            </div>
          </div>`;
      }
    }

    const distInfo = hasDist
      ? `<span>μ = ${ep.mu} &nbsp;·&nbsp; σ = ${ep.sigma}</span>`
      : '<span>Distribution à renseigner</span>';

    const Tag  = hasCorrige ? 'a' : 'div';
    const card = document.createElement(Tag);
    if (hasCorrige) card.href = `epreuve.html?id=${ep.id}`;
    card.className = `epreuve-card${!hasCorrige ? ' unavailable' : ''}`;
    card.innerHTML = `
      <div class="card-header">
        <div class="card-code">${ep.code}</div>
        ${statusBadge}
      </div>
      <div>
        <div class="card-title">${ep.nom}</div>
        <div class="card-meta">
          <span>${ep.annee}</span>
          <span>${ep.duree}</span>
          ${distInfo}
        </div>
      </div>
      ${gradeHTML}`;

    grid.appendChild(card);
  });

  if (!anyDone) {
    resultsBtn.classList.add('btn-disabled');
  }
});
