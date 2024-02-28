import { atom } from 'jotai';
import { TSaveContraVoucher } from './types';

export const addtableData = atom<TSaveContraVoucher[]>([]);
export const dataforCreditAmount = atom<TSaveContraVoucher[]>([]);
export const viewDetailList = atom<TSaveContraVoucher[]>([]);
