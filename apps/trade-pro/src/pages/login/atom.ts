import { atomWithStorage } from 'jotai/utils';
import { TLoggedInUserDetail } from './types';

export const loggedInUserDetailAtom = atomWithStorage<TLoggedInUserDetail | null>(
  'loggedInUserDetail',
  null
);
