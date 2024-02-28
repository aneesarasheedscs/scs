import { atom } from 'jotai';
import { InvStockAdjustmentDetail, TStockAdjustment } from '../types';

export const addtableData = atom<InvStockAdjustmentDetail[]>([]);
export const deleteData = atom<InvStockAdjustmentDetail[]>([]);
export const newTableData = atom<InvStockAdjustmentDetail[]>([]);
export const viewDetailList = atom<TStockAdjustment[]>([]);
