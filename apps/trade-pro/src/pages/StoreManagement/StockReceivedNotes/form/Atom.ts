import { atom } from 'jotai';
import { TStockReceivedNoteHistory } from '../types';

export const totalValue = atom<any>(0);
export const addtableData = atom<any[]>([]);
export const deleteData = atom<any[]>([]);
export const newTableData = atom<any[]>([]);
export const expenseList = atom<any>([]);
export const selectedRowsAtom = atom<any[]>([]);
