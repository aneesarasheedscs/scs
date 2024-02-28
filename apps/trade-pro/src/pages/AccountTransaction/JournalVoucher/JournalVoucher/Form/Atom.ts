import { atom } from 'jotai';
import { TVoucherDetailList } from '../types';
export const addtableData = atom<TVoucherDetailList[]>([]);
export const viewDetailList = atom<TVoucherDetailList[]>([]);
