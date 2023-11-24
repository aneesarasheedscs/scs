import { atom } from 'jotai';
import { TAccountPayablesSearchCriteria } from './types';

export const selectedItems = atom<TAccountPayablesSearchCriteria | null>(null);
