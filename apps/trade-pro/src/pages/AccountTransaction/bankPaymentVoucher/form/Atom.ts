import { atom } from 'jotai';
import { TBankPaymentDetailEntry } from './types';

export const addtableData = atom<TBankPaymentDetailEntry[]>([]);
export const viewDetailList = atom<TBankPaymentDetailEntry[]>([]);
