import { atom } from 'jotai';
import { TAddTaxSheduleHistory } from '../type';

export const selectedRowsAtom = atom<TAddTaxSheduleHistory[]>([]);
export const selectedRowsforAllocated = atom<TAddTaxSheduleHistory[]>([]);
