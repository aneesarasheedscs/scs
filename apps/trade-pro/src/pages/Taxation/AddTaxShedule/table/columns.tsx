import { TAddTaxSheduleHistory } from '../type';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Button, Checkbox } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { AntButton } from '@scs/ui';
import { useState } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox';
const CheckboxGroup = Checkbox.Group;
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
export const columns = (
  handleUpdateClick: any,
  handleRowSelection: (record: any) => void,
  handleSelectAllUn: any,
  setSelectedRows: any,
  selectedRows: any
): AntColumnType<TAddTaxSheduleHistory>[] => {
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectAllChecked2, setSelectAllChecked2] = useState(false);

  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
  };
  const plainOptions = [''];
  console.log('selectedRows : ', selectedRows);
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
            style={{ marginLeft: '10px' }}
          />
        </div>
      ),
      // title: 'selction',
      dataIndex: 'PostState',
      width: 100,
      render: (text: string, record: any) => (
        <Checkbox.Group options={plainOptions} name="PostState" onChange={onChange} />
      ),
      // render: (text: string, record: any) => (
      //   <Checkbox
      //     name="IsActive"
      //     onChange={(e) => {
      //       setSelectAllChecked2(e.target.checked), handleRowSelection(record);
      //     }}
      //     // checked={selectAllChecked2}
      //   >
      //     {' '}
      //   </Checkbox>
      // ),
    },

    { title: 'srNo', dataIndex: '', width: 50, render: (_, __, index) => index + 1 },

    {
      width: 150,
      title: 'Effected Date',
      searchableDate: true,
      dataIndex: 'EffectedDate',
      render: (_, { EffectedDate }) => formateDate(EffectedDate),
    },
    {
      width: 200,
      searchableInput: true,
      title: 'Tax Name',
      dataIndex: 'TaxName',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.TaxName.localeCompare(b.TaxName),
    },

    {
      width: 120,
      title: 'Tax Percent',
      dataIndex: 'TaxPercent',
      render: (_, { TaxPercent }) => numberFormatter(TaxPercent),
    },
    // {
    //   // width: 100,
    //   title: 'Action',
    //   dataIndex: '',
    //   key: 'Id',
    //   render: (_, record) => (
    //     <AntButton
    //       ghost
    //       type="primary"
    //       label="Update"
    //       size="small"
    //       icon={<EditOutlined />}
    //       onClick={(e) => handleUpdateClick(record)}
    //     />
    //   ),
    // },
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
  ];
};
