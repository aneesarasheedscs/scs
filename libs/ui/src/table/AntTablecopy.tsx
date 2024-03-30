import './style.scss';
import dayjs from 'dayjs';
import PrintData from './PrintData';
// import PrintSlip from './PrintSlip';
import DownloadPdf from './DownloadPdf';
import RefreshData from './RefreshData';
import TableSummary from './TableSummary';
// import AntButton from '../button/AntButton';
import ColumnChooser from './ColumnChooser';
import DownloadExcel from './DownloadExcel';
import GroupByColumns from './GroupByColumns';
import { isUndefined, map, size } from 'lodash';
import Highlighter from 'react-highlight-words';
import { useMemo, useRef, useState } from 'react';
import { DatePickerProps, Select, Typography } from 'antd';
import { AntColumnType, TAntTable } from './types';
// import { numberFormatter } from '@/utils/numberFormatter';
import { CalendarOutlined, SearchOutlined, FilterFilled } from '@ant-design/icons';
import { ColumnType, FilterConfirmProps } from 'antd/es/table/interface';
import { Button, Card, Col, DatePicker, Input, InputRef, Result, Row, Space, Table } from 'antd';
import { numberFormatter } from './utils';

export function AntTablecopy({
  data,
  title,
  isChild,
  columns,
  tableId,
  isError,
  refetch,
  summary,
  onChange,
  paginate,
  pageSize,
  isLoading,
  printData,
  printSlip,
  totalItems,
  expandable,
  downloadPdf,
  refreshData,
  currentPage,
  downloadExcel,
  // virtual = true,
  groupByColumns,
  pageSizeOptions,
  defaultPageSize,
  isRowSelectable,
  showTotalRecords,
  numberOfSkeletons,
  searchCriteriaForm,
  getSelectedRowKeys,
  showSorterTooltip = true,
  columnChooser: columnChooserOptions,
  ...restProps
}: TAntTable) {
  const searchInput = useRef<InputRef>(null);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<any[]>([]);
  const [selectedCompare, setSelectedCompare] = useState<string | undefined>(undefined);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [groupedColsNData, setGroupedColNData] = useState<{ [key: string]: any[] }>({});

  const handleSearch = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: string) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const handleComparisonChange = (
    value: string,
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: string,
    clearFilters: VoidFunction | undefined
  ) => {
    if (value === 'Clear') {
      setSelectedCompare(undefined);
      clearFilters && clearFilters();
      setSearchText('');
      return confirm();
    }
    confirm();
    setSelectedCompare(value);
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const getColumnSearchProps = (column: AntColumnType<any>): ColumnType<any> => {
    const dataIndex = column?.dataIndex as string;

    if (column.isNumber && column.searchableInput) {
      return {
        ...column,
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
          <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <Input
              ref={searchInput}
              value={selectedKeys[0]}
              placeholder={`${column?.title}`}
              style={{ marginBottom: 8, display: 'block' }}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            />
            <Select
              value={selectedCompare}
              placeholder="Select Comparison"
              onChange={(value) =>
                handleComparisonChange(value, selectedKeys as string[], confirm, dataIndex, clearFilters)
              }
              style={{ marginBottom: 8, display: 'block' }}
            >
              {map(
                [
                  {
                    text: 'Clear',
                    value: 'Clear',
                  },
                  {
                    text: 'Equal',
                    value: 'Equal',
                  },
                  {
                    text: 'Not Equal',
                    value: 'Not Equal',
                  },
                  {
                    text: 'Greater Than',
                    value: 'Greater Than',
                  },
                  {
                    text: 'Greater Than Or Equal',
                    value: 'Greater Than Or Equal',
                  },
                  {
                    text: 'Less Than',
                    value: 'Less Than',
                  },
                  {
                    text: 'Less Than Or Equal',
                    value: 'Less Than Or Equal',
                  },
                ],
                (opt) => (
                  <Select.Option key={opt.value} value={opt.value}>
                    {opt.text}
                  </Select.Option>
                )
              )}
            </Select>
          </div>
        ),
        filterIcon: (filtered: boolean) => (
          <FilterFilled style={{ color: filtered ? '#1890ff' : undefined, marginLeft: 4, marginRight: 4 }} />
        ),
        onFilter: (value, record: any) => {
          switch (selectedCompare) {
            case 'Equal':
              return record[dataIndex] === parseFloat(value as string);
            case 'Not Equal':
              return record[dataIndex] !== parseFloat(value as string);
            case 'Greater Than':
              return record[dataIndex] > parseFloat(value as string);
            case 'Greater Than Or Equal':
              return record[dataIndex] >= parseFloat(value as string);
            case 'Less Than':
              return record[dataIndex] < parseFloat(value as string);
            case 'Less Than Or Equal':
              return record[dataIndex] <= parseFloat(value as string);
            default:
              // If no comparison is selected, return true to show all data
              return true;
          }
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
          ) : column.isNumber ? (
            numberFormatter(text)
          ) : (
            text
          ),
      };
    }

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
                Search
              </Button>
              <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
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
          ) : column.isNumber ? (
            numberFormatter(text)
          ) : (
            text
          ),
      };
    }

    if (column.searchableDate) {
      return {
        ...column,
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
          const handleConfirm = () => confirm();
          const handleDateChange: DatePickerProps['onChange'] = (_, dateString) => {
            //@ts-ignore
            setSelectedKeys(dateString ? [dateString] : []);
          };

          return (
            <div style={{ padding: 8 }}>
              <DatePicker
                format="DD-MMM-YYYY"
                onChange={handleDateChange}
                value={selectedKeys[0] ? dayjs(selectedKeys[0] as string) : null}
              />
              <Button
                size="small"
                type="primary"
                style={{ width: 90, marginLeft: 2 }}
                icon={<SearchOutlined />}
                onClick={handleConfirm}
              >
                Search
              </Button>
            </div>
          );
        },
        filterIcon: (filtered: boolean) => (
          <CalendarOutlined style={{ color: filtered ? '#1890ff' : undefined, marginLeft: 4, marginRight: 4 }} />
        ),
        onFilter: (value, record: any) => dayjs(record?.[dataIndex])?.isSame(dayjs(value as string)),
      };
    }

    return column;
  };

  const modifiedColumns = map(columns, (column) => getColumnSearchProps(column));
  const handleColumnSelection = (selectedCols: any[]) => setSelectedColumns(selectedCols);
  const handleGrouping = (groupedData: { [key: string]: any[] }) => setGroupedColNData(groupedData);

  const criteriaForm = useMemo(() => searchCriteriaForm, [isError, isLoading]);
  const columnChooser = useMemo(
    () => (
      <ColumnChooser
        // tableId={tableId}
        columns={modifiedColumns}
        options={columnChooserOptions}
        handleColumnSelection={handleColumnSelection}
      />
    ),
    [selectedCompare]
  );

  const cols = size(selectedColumns) < 1 && !isUndefined(columnChooserOptions) ? modifiedColumns : selectedColumns;
  console.log(cols);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    if (getSelectedRowKeys) getSelectedRowKeys(newSelectedRowKeys as Array<string | number>);
  };

  const rowSelection = {
    fixed: true,
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Card className={isChild ? '' : 'table-card'}>
      <Row align="middle" justify="space-between">
        <Col>{criteriaForm}</Col>
        <Col>
          <Row gutter={10}>
            <RefreshData handleRefresh={refetch} options={refreshData} disabled={isError || isLoading} />

            <PrintData
              data={data}
              columns={cols}
              options={printData}
              disabled={size(data) < 1}
              filteredData={filteredData}
            />

            <DownloadPdf
              data={data}
              columns={cols}
              options={downloadPdf}
              disabled={size(data) < 1}
              filteredData={filteredData}
            />

            <DownloadExcel
              data={data}
              columns={cols}
              options={downloadExcel}
              disabled={size(data) < 1}
              filteredData={filteredData}
            />

            {/* <PrintSlip options={printSlip} disabled={isError || isLoading} /> */}

            {columnChooser}

            <GroupByColumns
              data={data}
              columns={cols}
              options={groupByColumns}
              disabled={size(data) < 1}
              // handleGrouping={handleGrouping}
            />
          </Row>
        </Col>
      </Row>

      <div style={{ marginBottom: 5 }} />

      {isError ? (
        <>
          <Result title="" status="500" subTitle="Sorry, something went wrong" />
          <Row justify="center">{/* <AntButton label="Retry" fullWidth={false} onClick={refetch} /> */}</Row>
        </>
      ) : (
        <>
          <Table
            className="v__expand_cell"
            size="small"
            columns={cols}
            loading={isLoading}
            // virtual={paginate ? false : virtual}
            showSorterTooltip={showSorterTooltip}
            rowSelection={isRowSelectable ? rowSelection : undefined}
            dataSource={
              size(groupedColsNData?.columns) > 0 && size(groupedColsNData?.data) > 0 ? groupedColsNData?.data : data
            }
            expandable={expandable}
            pagination={
              paginate
                ? {
                    total: totalItems,
                    pageSize: pageSize,
                    current: currentPage,
                    showPrevNextJumpers: true,
                    pageSizeOptions: pageSizeOptions,
                    defaultPageSize: defaultPageSize,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} records`,
                  }
                : false
            }
            onChange={(pagination, filters, sorter, extra) => {
              if (onChange) onChange(pagination, filters, sorter, extra);
              setFilteredData(extra?.currentDataSource);
            }}
            summary={() => {
              if (summary) return <>{summary}</>;
              return (
                <Table.Summary fixed>
                  <TableSummary
                    data={data}
                    columns={cols}
                    filteredData={filteredData}
                    // selectable={isRowSelectable}
                    // expandable={Boolean(expandable)}
                  />
                </Table.Summary>
              );
            }}
            {...restProps}
          />
        </>
      )}
      {showTotalRecords && !isError && !isLoading ? (
        <Typography.Title level={5} style={{ marginTop: 5 }}>
          Records: {size(data)}
        </Typography.Title>
      ) : null}
    </Card>
  );
}

// export default AntTablecopy;
