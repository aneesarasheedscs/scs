import { atom } from 'jotai';
import { TExpenseDetailEntry, TSaveExpenseVoucher } from './types';

export const addtableData = atom<TExpenseDetailEntry[]>([]);
export const viewDetailList = atom<TSaveExpenseVoucher[]>([]);
