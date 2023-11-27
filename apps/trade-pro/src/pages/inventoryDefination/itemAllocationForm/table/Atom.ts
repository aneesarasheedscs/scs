import { atom } from 'jotai';
import { ItemAllocationTypes } from '../types';

export const selectedRowsAtom = atom<ItemAllocationTypes[]>([]);
export const selectedRowsforAllocated = atom<ItemAllocationTypes[]>([]);
