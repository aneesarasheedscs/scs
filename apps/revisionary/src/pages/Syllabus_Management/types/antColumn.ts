import { ColumnType } from "antd/es/table";

export type AntColumnType<T> = { searchableInput?: boolean } & ColumnType<T>;