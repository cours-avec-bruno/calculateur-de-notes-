// Métadonnées de toutes les épreuves BANQUE PT
// - hasCorrige : true quand js/data/<id>.js est prêt
// - mu / sigma : fournis par l'utilisateur (notes rehaussées)
// - parties    : tableau vide ici, rempli dynamiquement par le fichier de corrigé

const CATALOGUE = [
  {
    id: 'maths1',
    nom: 'Mathématiques A',
    code: 'MA',
    annee: 2026,
    duree: '4h',
    hasCorrige: true,
    mu: 8.41,
    sigma: 4.21,
    parties: []
  },
  {
    id: 'maths2',
    nom: 'Mathématiques 2',
    code: 'M2',
    annee: 2025,
    duree: '4h',
    hasCorrige: false,
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
    hasCorrige: false,
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
    hasCorrige: false,
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
    hasCorrige: false,
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
    hasCorrige: false,
    mu: null,
    sigma: null,
    parties: []
  }
];
