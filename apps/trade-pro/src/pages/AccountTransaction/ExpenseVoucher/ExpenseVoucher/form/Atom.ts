import { atom } from 'jotai';
import { TSaveExpenseVoucher } from './types';

export const addtableData = atom<TSaveExpenseVoucher[]>([]);
export const viewDetailList = atom<TSaveExpenseVoucher[]>([]);
