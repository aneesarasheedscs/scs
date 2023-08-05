import { ColumnType } from 'antd/es/table/interface';

export type AntColumnType<T> = {
  searchableDate?: boolean;
  searchableInput?: boolean;
} & ColumnType<T>;
