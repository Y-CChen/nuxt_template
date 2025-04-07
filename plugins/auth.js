import { authMiddleware } from '@nuxtjs/auth-next/dist/runtime';

export default function ({ app, $auth }) {
  const logoutFunc = $auth.logout.bind($auth);
  const logout = async (...args) => {
    const result = await logoutFunc?.(...args);
    authMiddleware(app.context);
    return result;
  };
  $auth.logout = logout;
}
