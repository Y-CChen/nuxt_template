export default function ({ store, redirect }) {
  if (!store.getters['auth/isAuthenticated']) {
    return;
  }
  return redirect('/');
}
