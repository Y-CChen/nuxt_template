export default function ({ app, store, redirect }) {
  if (!store.getters['auth/isAuthenticated']) {
    return;
  }
  return redirect(app.localePath('/'));
}
