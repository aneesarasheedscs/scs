import { ReactNode } from 'react';
import { TableProps } from 'antd';
import { jsPDFOptions } from 'jspdf';
import { ColumnType } from 'antd/es/table';
import { UserOptions } from 'jspdf-autotable';

export type TPagination = {
  paginate?: boolean;
  currentPage: number;
  totalItems: number;
  pageSizeOptions: number[];
  pageSize: number;
  defaultPageSize: number;
};

export type TAntTable = {
  tableId?: string;
  isChild?: boolean;
  data?: Array<any>;
  isError?: boolean;
  isLoading?: boolean;
  refetch?: VoidFunction;
  isRowSelectable?: boolean;
  showTotalRecords?: boolean;
  numberOfSkeletons?: number;
  searchCriteriaForm?: ReactNode;
  refreshData?: { enabled?: boolean; show?: boolean };
  columnChooser?: { enabled?: boolean; show?: boolean };
  groupByColumns?: { enabled?: boolean; show?: boolean };
  downloadExcel?: { enabled?: boolean; show?: boolean; fileName?: string };
  getSelectedRowKeys?: (key: Array<string | number>) => void;
  printData?: { enabled?: boolean; show?: boolean; settings?: jsPDFOptions; pdfTableOptions?: UserOptions };
  printSlip?: {
    data?: any;
    show?: boolean;
    enabled?: boolean;
    isSuccess?: boolean;
    isPending?: boolean;
    onClick?: VoidFunction;
  };
  downloadPdf?: {
    show?: boolean;
    enabled?: boolean;
    fileName?: string;
    settings?: jsPDFOptions;
    pdfTableOptions?: UserOptions;
  };
  pagination?: boolean;
} & TableProps<any> &
  Partial<TPagination>;

export type AntColumnType<T> = {
  isNumber?: boolean;
  showTotal?: boolean;
  showAverage?: boolean;
  searchableDate?: boolean;
  searchableInput?: boolean;
} & ColumnType<T>;
