document.addEventListener('DOMContentLoaded', () => {
  const saved     = Storage.getAll();
  const tbody     = document.getElementById('resultsTableBody');
  const noResults = document.getElementById('noResults');
  const table     = document.getElementById('resultsTable');
  let hasAny      = false;

  CATALOGUE.forEach(ep => {
    const assessment = saved[ep.id];
    if (!assessment || ep.mu === null) return;
    hasAny = true;

    const pct = GradeModel.weightedPct(ep, assessment);
    const r   = GradeModel.estimate(pct, ep.mu, ep.sigma);
    const cls = GradeModel.gradeClass(r.centrale);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <strong>${ep.nom}</strong>
        <div class="table-sub">μ = ${ep.mu} · σ = ${ep.sigma}</div>
      </td>
      <td><span class="table-grade ${cls}">${GradeModel.fmt(r.centrale)}/20</span></td>
      <td class="table-interval">${GradeModel.fmt(r.basse)} – ${GradeModel.fmt(r.haute)}</td>
      <td class="table-pct">${Math.round(pct)}%</td>
      <td><a href="epreuve.html?id=${ep.id}" class="table-link">Modifier →</a></td>`;
    tbody.appendChild(row);
  });

  if (!hasAny) {
    noResults.style.display = 'flex';
    table.style.display     = 'none';
  }
});
