import { atom } from 'jotai';
import { TAddTaxTypeHistory } from '../type';

export const selectedRowsAtom = atom<TAddTaxTypeHistory[]>([]);
export const selectedRowsforAllocated = atom<TAddTaxTypeHistory[]>([]);
