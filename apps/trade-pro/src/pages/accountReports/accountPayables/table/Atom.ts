import { atom } from 'jotai';
import { TAccountPayablesBetweenPeriodTable, TAccountPayablesSearchCriteria, TAccountPayablesTable } from './types';
import { AntColumnType } from '@tradePro/globalTypes';
type TableColumnType = AntColumnType<TAccountPayablesTable>[] | AntColumnType<TAccountPayablesBetweenPeriodTable>[];

export const selectedItems = atom<TAccountPayablesSearchCriteria | null>(null);
export const selectedRadio = atom<any>(null);
export const tableColumn = atom<TableColumnType | any>(null);
export const tableData = atom<any[]>([]);
