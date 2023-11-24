import { atom } from 'jotai';

export const isWithHoldingCheckedAtom = atom<boolean>(false);
export const totalValue = atom<any>(0);
export const selectedCreditAccountAtom = atom<any>(null);
export const selectedAgainstAccountAtom = atom<any>(null);
export const addtableData = atom<any>([]);
export const viewDetailList = atom<any>([]);
