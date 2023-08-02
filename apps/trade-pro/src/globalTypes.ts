import { ColumnType } from 'antd/es/table/interface';

export type AntColumnType<T> = { searchableInput?: boolean } & ColumnType<T>;
