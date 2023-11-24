import { atom } from 'jotai';
import { TAccountReceivablesSearchCriteria } from './types';

export const selectedItems = atom<TAccountReceivablesSearchCriteria | null>(null);
