// Structure des épreuves BANQUE PT
// - mu / sigma : moyenne et écart-type des notes REHAUSSÉES (fournis par l'utilisateur)
// - parties    : sections de l'épreuve avec questions et corrigés (ajoutés au fil des sujets)
const BANQUE_PT = {
  epreuves: [
    {
      id: 'maths1',
      nom: 'Mathématiques 1',
      code: 'M1',
      annee: 2025,
      duree: '4h',
      mu: null,
      sigma: null,
      parties: []
    },
    {
      id: 'maths2',
      nom: 'Mathématiques 2',
      code: 'M2',
      annee: 2025,
      duree: '4h',
      mu: null,
      sigma: null,
      parties: []
    },
    {
      id: 'physique',
      nom: 'Physique-Chimie',
      code: 'PC',
      annee: 2025,
      duree: '4h',
      mu: null,
      sigma: null,
      parties: []
    },
    {
      id: 'si',
      nom: "Sciences de l'Ingénieur",
      code: 'SI',
      annee: 2025,
      duree: '4h',
      mu: null,
      sigma: null,
      parties: []
    },
    {
      id: 'francais',
      nom: 'Français-Philosophie',
      code: 'FR',
      annee: 2025,
      duree: '4h',
      mu: null,
      sigma: null,
      parties: []
    },
    {
      id: 'lv',
      nom: 'Langue Vivante',
      code: 'LV',
      annee: 2025,
      duree: '2h',
      mu: null,
      sigma: null,
      parties: []
    }
  ]
};

// Structure d'une partie (référence pour remplissage futur) :
//
// {
//   id: 'partie1',
//   titre: 'Partie I — Titre',
//   points: 8,                  // barème de la partie
//   questions: [
//     {
//       num: '1.',
//       enonce: 'Texte avec math inline $f(x)$ ou display $$\int_0^1 f dx$$',
//       corrige: 'Réponse détaillée avec math'
//     }
//   ]
// }
