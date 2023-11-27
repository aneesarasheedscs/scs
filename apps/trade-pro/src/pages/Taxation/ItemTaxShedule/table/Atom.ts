import { atom } from 'jotai';
import { TItemTaxShedule } from '../type';

export const selectedRowsAtom = atom<TItemTaxShedule[]>([]);
export const selectedRowsforAllocated = atom<TItemTaxShedule[]>([]);
