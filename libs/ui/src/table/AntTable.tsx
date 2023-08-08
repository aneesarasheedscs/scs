import {
  Col,
  Row,
  Card,
  Input,
  Space,
  Table,
  Button,
  Result,
  Tooltip,
  InputRef,
  TableProps,
} from 'antd';
import './style.scss';
import { map } from 'lodash';
import DownloadPdf from './DownloadPdf';
import RefreshData from './RefreshData';
import ColumnChooser from './ColumnChooser';
import DownloadExcel from './DownloadExcel';
import Highlighter from 'react-highlight-words';
import { AntButton } from '../button/AntButton';
import { TableLoader } from '../loaders/TableLoader';
import { AntTableVirtualized } from './AntTableVirtualized';
import { ReactNode, useMemo, useRef, useState } from 'react';
import { GroupOutlined, SearchOutlined } from '@ant-design/icons';
import { ColumnType, FilterConfirmProps } from 'antd/es/table/interface';

export function AntTable({
  data,
  title,
  columns,
  isError,
  isLoading,
  numberOfSkeletons,
  searchCriteriaForm,
  isVirtualized = true,
  isDownloadPdfEnabled = true,
  isRefreshDataEnabled = true,
  isColumnChooserEnabled = true,
  isDownloadExcelEnabled = true,
  isGroupByColumnEnabled = true,
  ...restProps
}: TAntTable) {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: string
  ) => {
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
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{ width: 90 }}
              >
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
                Filter
              </Button>
              <Button type="link" size="small" onClick={() => close()}>
                close
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered: boolean) => (
          <SearchOutlined
            style={{ color: filtered ? '#1890ff' : undefined, marginLeft: 4, marginRight: 4 }}
          />
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

    // if (column.searchableDate) {
    //   return {};
    // }

    return column;
  };

  const modifiedColumns = map(columns, (column) => getColumnSearchProps(column));

  const titleComponent = useMemo(
    () => (
      <Row align="middle" justify="space-between">
        <Col>{searchCriteriaForm}</Col>
        <Col>
          <Row gutter={10}>
            <RefreshData isRefreshDataEnabled={isRefreshDataEnabled} />
            <DownloadPdf isDownloadPdfEnabled={isDownloadPdfEnabled} />
            <DownloadExcel isDownloadExcelEnabled={isDownloadExcelEnabled} />
            {isGroupByColumnEnabled ? (
              <Col>
                <Tooltip arrow title="Group data by Columns">
                  <AntButton type="default" icon={<GroupOutlined />} />
                </Tooltip>
              </Col>
            ) : null}
            <ColumnChooser
              columns={modifiedColumns}
              isColumnChooserEnabled={isColumnChooserEnabled}
            />
          </Row>
        </Col>
      </Row>
    ),
    []
  );

  return (
    <Card className="table-card">
      {isError ? (
        <Result title="" status="500" subTitle="Sorry, something went wrong" />
      ) : isLoading ? (
        <TableLoader numberOfSkeletons={numberOfSkeletons} />
      ) : isVirtualized ? (
        <AntTableVirtualized
          dataSource={data}
          columns={modifiedColumns}
          title={() => <>{titleComponent}</>}
          {...restProps}
        />
      ) : (
        <Table
          size="small"
          dataSource={data}
          columns={modifiedColumns}
          title={() => <>{titleComponent}</>}
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
  isVirtualized?: boolean;
  numberOfSkeletons?: number;
  isRefreshDataEnabled?: boolean;
  isDownloadPdfEnabled?: boolean;
  searchCriteriaForm?: ReactNode;
  isDownloadExcelEnabled?: boolean;
  isColumnChooserEnabled?: boolean;
  isGroupByColumnEnabled?: boolean;
} & TableProps<any>;

type AntColumnType<T> = { searchableDate?: boolean; searchableInput?: boolean } & ColumnType<T>;
