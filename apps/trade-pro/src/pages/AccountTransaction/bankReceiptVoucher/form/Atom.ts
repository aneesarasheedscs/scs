import { atom } from 'jotai';
import { TBankReceiptDetailEntry } from './types';

export const addtableData = atom<TBankReceiptDetailEntry[]>([]);
export const viewDetailList = atom<TBankReceiptDetailEntry[]>([]);
