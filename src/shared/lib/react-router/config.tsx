import type { ReactNode } from 'react';
import { Settings, WalletCards } from 'lucide-react';

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
    return pathKeys.root.concat('not-found/');
  },
  wallet: {
    root() {
      return pathKeys.root.concat('wallets/');
    },
    byId(id: number) {
      return pathKeys.wallet.root().concat(`${id}`, '/');
    }
  }
};

type NavLink = {
  path: string;
  icon: ReactNode;
  text: string;
};

export const navLinks: NavLink[] = [
  {
    path: pathKeys.wallet.root(),
    icon: <WalletCards className='mr-2 size-5' />,
    text: 'Кошельки'
  },
  {
    path: pathKeys.settings(),
    icon: <Settings className='mr-2 size-5' />,
    text: 'Настройки'
  }
];
