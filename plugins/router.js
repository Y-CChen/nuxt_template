import * as AsyncLock from 'async-lock';
import Vue from 'vue';
import { Layouts } from '~/utils/constant';
import { makePublicPath } from '~/utils/make-path';
import { timeout } from '~/utils/timeout';

const asyncLock = new AsyncLock();
const asyncLockKeys = {
  updateQuery: 'update-query',
};
const updateQueryActions = {
  patch: 'patch',
  put: 'put',
};

export default function ({ app }) {
  const routeStatus = Vue.observable({
    layout: Layouts.default,
    canGoBack: false,

    setLayout(layout) {
      this.layout = layout;
    },

    setCanGoBack(canGoBack) {
      this.canGoBack = !!canGoBack;
    },
  });

  const updateRouteStatus = (pathSegments) => {
    updateLayout(pathSegments);
    updateCanGoBack();
  };

  const updateLayout = (pathSegments) => {};

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
    return await asyncLock.acquire(asyncLockKeys.updateQuery, async () => {
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
    });
  };

  app.router.$routeStatus = routeStatus;

  app.router.$makePublicPath = (path) => {
    return makePublicPath(app.$config.routerBase, path);
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

  app.router.$backOrPush = async (path) => {
    if (routeStatus.canGoBack) {
      const state = window.history.state.key;
      app.router.back();
      await timeout(100);
      if (state !== window.history.state.key) {
        return;
      }
    }
    app.router.push(path);
  };

  app.router.afterEach((to, from) => {
    const path = to.path || '';
    const pathSegments = path.startsWith('/')
      ? path.substring(1).split('/')
      : path.split('/');
    updateRouteStatus(pathSegments);
  });
}
