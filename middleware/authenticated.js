export default async function ({ app, store, redirect }) {
  if (store.getters['auth/isAuthenticated']) {
    return;
  }
  await store.dispatch('auth/logout');
  return redirect(app.localePath('/login'));
}
