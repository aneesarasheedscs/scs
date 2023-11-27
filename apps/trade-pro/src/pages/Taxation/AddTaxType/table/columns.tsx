import { TAddTaxTypeHistory } from '../type';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Checkbox from 'antd/es/checkbox/Checkbox';
import { useState } from 'react';
export const columns = (
  handleUpdateClick: any,
  handleRowSelection: (record: any) => void,
  handleSelectAllUn: any,
  setSelectedRows: any,
  handleSelectAll: any
): AntColumnType<TAddTaxTypeHistory>[] => { 
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectAllChecked2, setSelectAllChecked2] = useState(false);
  return[
    {
      title: (
        <div>
          for all
          <Checkbox
            onChange={(e) => {
              setSelectAllChecked(e.target.checked);
              setSelectAllChecked2(e.target.checked);
              if (e.target.checked) {
                handleSelectAllUn();
              } else {
                setSelectedRows([]);
              }
            }}
            title="IsActive"
            name="IsActive"
            style={{ marginLeft: '10px' }}
          />
        </div>
      ),
      dataIndex: 'IsActive',
      width: 100,
      render: (text: string, record: any) => (
        <Checkbox
          name="IsActive"
          onChange={(e) => {
            setSelectAllChecked2(e.target.checked), handleRowSelection(record);
          }}
          // checked={selectAllChecked2}
        >
          {' '}
        </Checkbox>
      ),
    },
  
  {
    title: 'SrNo',
    dataIndex: '',
    width: 80,
    render: (_, __, index) => index + 1,
  },
  {
    width: 200,
    searchableInput: true,
    title: 'AccountTitle',
    dataIndex: 'AccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    width: 200,
    searchableInput: true,
    title: 'Name',
    dataIndex: 'TaxName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.TaxName.localeCompare(b.TaxName),
  },
  {
    // width:100,
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: (_, record) => (
      <Button ghost type="primary" size="small" icon={<EditOutlined />} onClick={(e) => handleUpdateClick(record)}>
        Update
      </Button>
    ),
  },
]
};
