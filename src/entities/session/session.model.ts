import type { StateCreator } from 'zustand';
import { createStore } from 'zustand';
import type { DevtoolsOptions, PersistOptions } from 'zustand/middleware';
import { devtools, persist } from 'zustand/middleware';
import type { User } from '~entities/session/session.types';

type Token = string;

type State = {
  token: Token | null;
  user: User | null;
};

type Actions = {
  updateToken: (token: Token | null) => void;
  updateUser: (user: User | null) => void;
};

type SessionState = State & Actions;

const createSessionSlice: StateCreator<
  SessionState,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  SessionState
> = (set) => ({
  token: null,
  user: null,
  updateToken: (token: Token | null) => set({ token: token || null }, false, 'updateToken'),
  updateUser: (user: User | null) => set({ user: user || null }, false, 'updateUser')
});

const persistOptions: PersistOptions<SessionState> = { name: 'session' };
const devtoolsOptions: DevtoolsOptions = { name: 'SessionStore' };

export const sessionStore = createStore<SessionState>()(
  devtools(persist(createSessionSlice, persistOptions), devtoolsOptions)
);
