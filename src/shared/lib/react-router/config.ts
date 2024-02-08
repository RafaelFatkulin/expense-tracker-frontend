export const pathKeys = {
  root: '/',
  home() {
    return pathKeys.root;
  },
  login() {
    return pathKeys.root.concat('login/');
  },
  signup() {
    return pathKeys.root.concat('signup/');
  },
  settings() {
    return pathKeys.root.concat('settings/');
  },
  page404() {
    return pathKeys.root.concat('404/');
  },
  wallet: {
    root() {
      return pathKeys.root.concat('wallet/');
    },
    byId(id: number) {
      return pathKeys.wallet.root().concat(`${id}`, '/');
    }
  }
};
