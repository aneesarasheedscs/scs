import { atom } from 'jotai';
import { TPaymentDetailEntry } from './types';

export const addtableData = atom<TPaymentDetailEntry[]>([]);
export const viewDetailList = atom<TPaymentDetailEntry[]>([]);
