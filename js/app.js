document.addEventListener('DOMContentLoaded', () => {
  const grid  = document.getElementById('epreuvesGrid');
  const saved = Storage.getAll();
  let anyDone = false;

  CATALOGUE.forEach(ep => {
    const assessment = saved[ep.id];
    const hasDist    = ep.mu !== null && ep.sigma !== null;
    const isDone     = !!assessment && hasDist;
    if (isDone) anyDone = true;

    let badge     = '';
    let gradeHTML = '';

    if (!ep.hasCorrige) {
      badge = '<span class="status-badge status-pending">À venir</span>';
    } else if (!assessment) {
      badge = '<span class="status-badge status-available">À évaluer</span>';
    } else {
      badge = '<span class="status-badge status-done">Évalué</span>';
      if (hasDist) {
        const pct    = GradeModel.weightedPct(ep, assessment);
        const r      = GradeModel.estimate(pct, ep.mu, ep.sigma);
        const cls    = GradeModel.gradeClass(r.centrale);
        gradeHTML = `
          <div class="card-grade">
            <div class="grade-display ${cls}">${GradeModel.fmt(r.centrale)}<span class="grade-denom">/20</span></div>
            <div class="grade-interval">
              <div>↑ ${GradeModel.fmt(r.haute)}</div>
              <div>↓ ${GradeModel.fmt(r.basse)}</div>
            </div>
          </div>`;
      }
    }

    const distInfo = hasDist
      ? `<span>μ = ${ep.mu} · σ = ${ep.sigma}</span>`
      : '<span class="meta-dim">Distribution à renseigner</span>';

    const Tag  = ep.hasCorrige ? 'a' : 'div';
    const card = document.createElement(Tag);
    if (ep.hasCorrige) card.href = `epreuve.html?id=${ep.id}`;
    card.className = `epreuve-card${ep.hasCorrige ? '' : ' unavailable'}`;
    card.innerHTML = `
      <div class="card-header">
        <div class="card-code">${ep.code}</div>
        ${badge}
      </div>
      <div>
        <div class="card-title">${ep.nom}</div>
        <div class="card-meta"><span>${ep.annee}</span><span>${ep.duree}</span>${distInfo}</div>
      </div>
      ${gradeHTML}`;

    grid.appendChild(card);
  });

  if (!anyDone) {
    document.getElementById('resultsBtn').classList.add('btn-disabled');
  }
});
