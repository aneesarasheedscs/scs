import { atom } from 'jotai';
import { AccountAllocationTypes } from '../types';

export const selectedRowsAtom = atom<any[]>([]);
export const selectedRowsforAllocated = atom<AccountAllocationTypes[]>([]);

