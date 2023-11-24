import { atom } from 'jotai';
import { TStockReportsSearchCriteria } from '../types';

export const selectedItems = atom<TStockReportsSearchCriteria | null>(null);
