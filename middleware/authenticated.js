export default async function ({ store, redirect }) {
  if (store.getters['auth/isAuthenticated']) {
    return;
  }
  await store.dispatch('auth/logout');
  return redirect('/login');
}
