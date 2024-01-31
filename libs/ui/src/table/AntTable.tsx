import './style.scss';
import { map, size } from 'lodash';
import { jsPDFOptions } from 'jspdf';
import PrintData from './PrintData';
import DownloadPdf from './DownloadPdf';
import RefreshData from './RefreshData';
import TableSummary from './TableSummary';
import { UserOptions } from 'jspdf-autotable';
import ColumnChooser from './ColumnChooser';
import DownloadExcel from './DownloadExcel';
import GroupByColumns from './GroupByColumns';
import Highlighter from 'react-highlight-words';
import { AntButton } from '../button/AntButton';
import { SearchOutlined } from '@ant-design/icons';
import { TableLoader } from '../loaders/TableLoader';
import { AntTableVirtualized } from './AntTableVirtualized';
import { ReactNode, useMemo, useRef, useState } from 'react';
import { ColumnType, FilterConfirmProps, TableRowSelection } from 'antd/es/table/interface';
import { Button, Card, Col, Input, InputRef, Result, Row, Space, Table, TableProps } from 'antd';
import { useTranslation } from 'react-i18next';

export function AntTable({
  data,
  title,
  columns,
  isError,
  refetch,
  summary,
  onChange,
  isLoading,
  printData,
  downloadPdf,
  downloadExcel,
  groupByColumns,
  numberOfSkeletons,
  searchCriteriaForm,
  isVirtualized = true,
  rowSelection,
  refreshData: refreshDataOptions,
  columnChooser: columnChooserOptions,
  ...restProps
}: TAntTable) {
  const searchInput = useRef<InputRef>(null);
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [groupedData, setGroupedData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<any[]>([]);

  const handleSearch = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: string) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (column: AntColumnType<any>): ColumnType<any> => {
    const dataIndex = column?.dataIndex as string;

    if (column.searchableInput) {
      return {
        ...column,
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
          <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <Input
              ref={searchInput}
              value={selectedKeys[0]}
              placeholder={`Search ${column?.title}`}
              style={{ marginBottom: 8, display: 'block' }}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            />
            <Space>
              <Button
                size="small"
                type="primary"
                style={{ width: 90 }}
                icon={<SearchOutlined />}
                onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
              >
                {t('search')}
              </Button>
              <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: false });
                  setSearchText((selectedKeys as string[])[0]);
                  setSearchedColumn(dataIndex);
                }}
              >
                {t('filter')}
              </Button>
              <Button type="link" size="small" onClick={() => close()}>
                {t('close')}
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered: boolean) => (
          <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined, marginLeft: 4, marginRight: 4 }} />
        ),
        onFilter: (value, record: any) => {
          return record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase());
        },
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        render: (text) =>
          searchedColumn === dataIndex ? (
            <Highlighter
              autoEscape
              searchWords={[searchText]}
              textToHighlight={text ? text.toString() : ''}
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            />
          ) : (
            text
          ),
      };
    }

    return column;
  };

  const modifiedColumns = map(columns, (column) => getColumnSearchProps(column));
  const handleColumnSelection = (selectedCols: any[]) => setSelectedColumns(selectedCols);
  const handleGrouping = (groupedData: any[]) => setGroupedData(groupedData);

  const criteriaForm = useMemo(() => searchCriteriaForm, [isError, isLoading]);
  const refreshData = useMemo(
    () => <RefreshData handleRefresh={refetch} options={refreshDataOptions} disabled={isError || isLoading} />,
    [isError, isLoading]
  );

  const columnChooser = useMemo(
    () => (
      <ColumnChooser
        columns={modifiedColumns}
        options={columnChooserOptions}
        disabled={isError || isLoading}
        handleColumnSelection={handleColumnSelection}
      />
    ),
    [isError, isLoading]
  );

  const cols = size(selectedColumns) < 1 ? modifiedColumns : selectedColumns;

  return (
    <Card className="table-card">
      <Row align="middle" justify="space-between">
        <Col>{criteriaForm}</Col>
        <Col>
          <Row gutter={10}>
            {refreshData}

            <PrintData
              data={data}
              columns={cols}
              options={printData}
              filteredData={filteredData}
              disabled={isError || isLoading}
            />

            <DownloadPdf
              data={data}
              columns={cols}
              options={downloadPdf}
              filteredData={filteredData}
              disabled={isError || isLoading}
            />

            <DownloadExcel
              data={data}
              columns={cols}
              options={downloadExcel}
              filteredData={filteredData}
              disabled={isError || isLoading}
            />

            <>{columnChooser}</>

            <GroupByColumns
              data={data}
              columns={cols}
              options={groupByColumns}
              disabled={isError || isLoading}
              handleDataGrouping={handleGrouping}
            />
          </Row>
        </Col>
      </Row>

      <div style={{ marginBottom: 5 }} />

      {isError ? (
        <>
          <Result title="" status="500" subTitle="Sorry, something went wrong" />
          <Row justify="center">
            <AntButton label={t('retry')} fullWidth={false} onClick={refetch} />
          </Row>
        </>
      ) : isLoading ? (
        <TableLoader numberOfSkeletons={numberOfSkeletons} />
      ) : isVirtualized ? (
        <AntTableVirtualized
          columns={cols}
          dataSource={data}
          rowSelection={rowSelection}
          onChange={(pagination, filters, sorter, extra) => {
            if (onChange) onChange(pagination, filters, sorter, extra);
            else setFilteredData(extra?.currentDataSource);
          }}
          summary={() => {
            if (summary) return <>{summary}</>;

            return (
              <Table.Summary fixed>
                <TableSummary data={data} columns={cols} filteredData={filteredData} />
              </Table.Summary>
            );
          }}
          {...restProps}
        />
      ) : (
        <Table
          size="small"
          columns={cols}
          dataSource={data}
          rowSelection={rowSelection}
          onChange={(pagination, filters, sorter, extra) => {
            if (onChange) onChange(pagination, filters, sorter, extra);
            else setFilteredData(extra?.currentDataSource);
          }}
          summary={() => {
            if (summary) return <>{summary}</>;
            return (
              <Table.Summary fixed>
                <TableSummary data={data} columns={cols} filteredData={filteredData} />
              </Table.Summary>
            );
          }}
          {...restProps}
        />
      )}
    </Card>
  );
}

type TAntTable = {
  data?: Array<any>;
  isError?: boolean;
  isLoading?: boolean;
  refetch?: VoidFunction;
  isVirtualized?: boolean;
  numberOfSkeletons?: number;
  searchCriteriaForm?: ReactNode;
  refreshData?: { enabled?: boolean; show?: boolean };
  columnChooser?: { enabled?: boolean; show?: boolean };
  groupByColumns?: { enabled?: boolean; show?: boolean };
  downloadExcel?: { enabled?: boolean; show?: boolean; fileName?: string };
  printData?: { enabled?: boolean; show?: boolean; settings?: jsPDFOptions; pdfTableOptions?: UserOptions };
  rowSelection?: TableRowSelection<any>;
  downloadPdf?: {
    show?: boolean;
    enabled?: boolean;
    fileName?: string;
    settings?: jsPDFOptions;
    pdfTableOptions?: UserOptions;
  };
} & TableProps<any>;

type AntColumnType<T> = {
  showTotal?: boolean;
  showAverage?: boolean;
  searchableDate?: boolean;
  searchableInput?: boolean;
  hidden?: boolean;
} & ColumnType<T>;
