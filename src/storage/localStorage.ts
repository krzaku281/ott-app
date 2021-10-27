export const Storage = (function () {
  const prefix = 'ott-app';

  const store = localStorage;

  return {
    get: function (name: string): string | null {
      return store.getItem(prefix + '.' + name);
    },
    set: function (name: string, value: string): void {
      store.setItem(prefix + '.' + name, value);
    },
    clearAll: function (): void {
      sessionStorage.clear();
    },
  };
})();
