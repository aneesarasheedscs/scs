import { TItemTaxShedule } from '../type';
import { AntColumnType } from '@tradePro/globalTypes';
import { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { EditOutlined } from '@ant-design/icons';
import { AntButton } from '@scs/ui';
import { Button, Checkbox, Form } from 'antd';
import { useState } from 'react';

export const columns = (
  handleUpdateClick: any,
  handleRowSelection: (record: any) => void,
  handleSelectAllUn: any,
  setSelectedRows: any,
  handleSelectAll: any
): AntColumnType<TItemTaxShedule>[] => {
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectAllChecked2, setSelectAllChecked2] = useState(false);

  return [
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
      title: 'sr#',
      dataIndex: '',
      width: 50,
      render: (_, __, index) => index + 1,
    },
    {
      width: 200,
      title: 'Effected Date',
      dataIndex: 'EffectedDate',
      searchableDate: true,
      render: (_, { EffectedDate }) => formateDate(EffectedDate),
    },
    {
      width: 200,
      title: 'Item Name',
      dataIndex: 'ItemName',
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      // sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
    },
    {
      width: 200,
      title: 'Tax Type',
      dataIndex: 'TaxName',
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      // sorter: (a, b) => a.TaxName.localeCompare(b.TaxName),
    },

    {
      // width: 100,
      title: 'Action',
      dataIndex: '',

      render: (_, record) => (
        <Button ghost type="primary" size="small" icon={<EditOutlined />} onClick={(e) => handleUpdateClick(record)}>
          Update
        </Button>
      ),
    },
  ];
};
