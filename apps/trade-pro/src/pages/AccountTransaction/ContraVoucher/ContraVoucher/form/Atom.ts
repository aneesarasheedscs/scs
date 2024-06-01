import { atom } from 'jotai';
import { TContraDetailEntry, TSaveContraVoucher } from './types';

export const addtableData = atom<TContraDetailEntry[]>([]);
export const dataforCreditAmount = atom<TSaveContraVoucher[]>([]);
export const viewDetailList = atom<TSaveContraVoucher[]>([]);
