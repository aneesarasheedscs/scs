import { atom } from 'jotai';
import { TStockReportSearchCriteria } from './types';

export const selectedItems = atom<TStockReportSearchCriteria | null>(null);
