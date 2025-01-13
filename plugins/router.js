import Vue from 'vue';
import { makePublishPath } from '~/utils/make-path';

export default function ({ app }) {
  const updateQueryActions = {
    patch: 'patch',
    put: 'put',
  };

  const routeStatus = Vue.observable({
    canGoBack: false,

    setCanGoBack(canGoBack) {
      this.canGoBack = !!canGoBack;
    },
  });

  const updateRouteStatus = (routeBaseName) => {
    updateCanGoBack();
  };

  const updateCanGoBack = () => {
    if (process.server) {
      routeStatus.setCanGoBack(false);
    } else if (window.navigation) {
      routeStatus.setCanGoBack(window.navigation.canGoBack);
    } else {
      routeStatus.setCanGoBack(window.history.length > 1);
    }
  };

  const makeUpdateQueryPath = (query, action) => {
    const route = app.context.route;
    let path = route.fullPath;
    switch (action) {
      case updateQueryActions.put:
        path = route.path;
        break;
      case updateQueryActions.patch:
      default:
        break;
    }
    return app.router.match({ path, query }).fullPath;
  };

  const updateQuery = async (query, action, replace) => {
    const route = app.context.route;
    const fullPath = makeUpdateQueryPath(query, action);
    if (fullPath !== route.fullPath) {
      return await new Promise((resolve, reject) => {
        if (replace) {
          app.router.replace(fullPath, resolve, reject);
        } else {
          app.router.push(fullPath, resolve, reject);
        }
      });
    }
  };

  app.router.$routeStatus = routeStatus;

  app.router.$makePublishPath = (path) => {
    return makePublishPath(app.$config.routerBase, path);
  };

  app.router.$makePatchQueryPath = (query) => {
    return makeUpdateQueryPath(query, updateQueryActions.patch);
  };

  app.router.$makePutQueryPath = (query) => {
    return makeUpdateQueryPath(query, updateQueryActions.put);
  };

  app.router.$patchQuery = async (query, replace = true) => {
    return await updateQuery(query, updateQueryActions.patch, replace);
  };

  app.router.$putQuery = async (query, replace = true) => {
    return await updateQuery(query, updateQueryActions.put, replace);
  };

  app.router.$windowOpen = (path, target) => {
    if (process.server) {
      return;
    }
    const url = app.router.match(path).fullPath;
    window.open(url, target);
  };

  app.router.afterEach((to, from) => {
    updateRouteStatus();
  });
}
