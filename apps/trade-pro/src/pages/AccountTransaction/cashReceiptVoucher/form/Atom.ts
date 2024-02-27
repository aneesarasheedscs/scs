import { atom } from 'jotai';
import { TCashReceiptDetailEntry } from './types';

export const addtableData = atom<TCashReceiptDetailEntry[]>([]);
export const viewDetailList = atom<TCashReceiptDetailEntry[]>([]);
