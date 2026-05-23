const Storage = {
  KEY: 'banquePT_v1',

  getAll() {
    try { return JSON.parse(localStorage.getItem(this.KEY) || '{}'); }
    catch { return {}; }
  },

  get(epId) {
    return this.getAll()[epId] || {};
  },

  set(epId, data) {
    const all = this.getAll();
    all[epId] = data;
    try { localStorage.setItem(this.KEY, JSON.stringify(all)); } catch (_) {}
  }
};
