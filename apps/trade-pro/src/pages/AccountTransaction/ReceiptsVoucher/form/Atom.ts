import { atom } from 'jotai';
import { TReceiptsDetailEntry } from './types';

export const addtableData = atom<TReceiptsDetailEntry[]>([]);
export const viewDetailList = atom<TReceiptsDetailEntry[]>([]);
