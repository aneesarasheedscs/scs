import { atom } from 'jotai';
import { TCashPaymentDetailEntry } from './types';

export const addtableData = atom<TCashPaymentDetailEntry[]>([]);
export const viewDetailList = atom<TCashPaymentDetailEntry[]>([]);
