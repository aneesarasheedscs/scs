import './style.scss';
import { map } from 'lodash';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { ReactNode, useRef, useState } from 'react';
import { TableLoader } from '../loaders/TableLoader';
import { ColumnType, FilterConfirmProps } from 'antd/es/table/interface';
import { Button, Card, Input, InputRef, Result, Space, Table, TableProps } from 'antd';

export function AntTable({
  data,
  title,
  columns,
  isError,
  isLoading,
  tableTitle,
  numberOfSkeletons,
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
    if (column.searchableInput) {
      const dataIndex = column?.dataIndex as string;
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
          <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined, marginLeft: 10 }} />
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

  return (
    <Card className="table-card">
      {isError ? (
        <Result title="" status="500" subTitle="Sorry, something went wrong" />
      ) : isLoading ? (
        <TableLoader numberOfSkeletons={numberOfSkeletons} />
      ) : (
        <Table
          size="small"
          dataSource={data}
          columns={modifiedColumns}
          title={() => tableTitle}
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
  tableTitle?: ReactNode;
  numberOfSkeletons?: number;
} & TableProps<any>;

type AntColumnType<T> = { searchableInput?: boolean } & ColumnType<T>;
