import { atom } from 'jotai';
import { TRequisitionOrder, TWsRmRequisitionPoDetailsList } from '../types';

export const addtableData = atom<TWsRmRequisitionPoDetailsList[]>([]);
export const deleteData = atom<TWsRmRequisitionPoDetailsList[]>([]);
export const newTableData = atom<TWsRmRequisitionPoDetailsList[]>([]);
export const viewDetailList = atom<TRequisitionOrder[]>([]);
