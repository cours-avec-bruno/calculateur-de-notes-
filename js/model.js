const GradeModel = {
  LAMBDA: 0.4,       // marge de sécurité (décalage vers le bas)
  DELTA_LOW: 0.75,   // borne basse supplémentaire (asymétrique)
  DELTA_HIGH: 0.40,  // borne haute supplémentaire

  // Convertit un pourcentage [0,100] en z-score
  // p=0% → z=-2 (2e percentile), p=50% → z=0 (médiane), p=100% → z=+2 (98e percentile)
  pToZ(pct) {
    return 4 * (pct / 100 - 0.5);
  },

  // Estime la note à partir d'un pourcentage de performance et de la distribution μ,σ
  estimate(pct, mu, sigma) {
    const z  = this.pToZ(pct);
    const zc = z - this.LAMBDA;
    const clamp = v => Math.max(0, Math.min(20, v));
    return {
      centrale: clamp(mu + zc * sigma),
      basse:    clamp(mu + (zc - this.DELTA_LOW)  * sigma),
      haute:    clamp(mu + (zc + this.DELTA_HIGH) * sigma)
    };
  },

  // Calcule le pourcentage global pondéré par les points de chaque partie
  weightedPct(epreuve, assessment) {
    const parties = epreuve.parties || [];
    const totalPoints = parties.reduce((s, p) => s + p.points, 0);
    if (totalPoints === 0 || parties.length === 0) return 50;

    let weighted = 0;
    parties.forEach(p => {
      const pct = (assessment[p.id] !== undefined) ? assessment[p.id] : 50;
      weighted += (p.points / totalPoints) * pct;
    });
    return weighted;
  },

  gradeClass(note) {
    if (note < 7)  return 'grade-low';
    if (note < 10) return 'grade-mid-low';
    if (note < 13) return 'grade-mid';
    if (note < 16) return 'grade-mid-high';
    return 'grade-high';
  },

  fmt(note) {
    return note.toFixed(1);
  }
};
