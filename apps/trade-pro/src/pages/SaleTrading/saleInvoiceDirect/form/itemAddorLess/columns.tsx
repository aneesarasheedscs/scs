import { EditFilled, PrinterOutlined, DeleteOutlined } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton, AntSelectDynamic } from '@revisionary/components';
import { Form, Popconfirm, Space, Tooltip } from 'antd';
import { formateDate } from '@tradePro/utils/formateDate';

export const columns = (t: any, setSelectedRecordId?: any, handleDelete?: any): AntColumnType<any>[] => [
  {
    title: <>{t('other_item_name')}</>,
    width: 260,
    key: 'other_item_name',
    searchableInput: true,
    dataIndex: 'other_item_name',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocumentTypeCode.localeCompare(b.DocumentTypeCode),
    // render: () => (
    //   <>
    //     <Form>
    //       <AntSelectDynamic
    //         style={{ border: '1px solid red', position: 'absolute', top: '-10px', height: '30px' }}
    //         // bordered={false}
    //         label={t('warehouse')}
    //         fieldValue="Id"
    //         fieldLabel="AccountTitle"
    //       />
    //     </Form>
    //   </>
    // ),
  },
  {
    title: <>{t('qty')}</>,
    width: 260,
    key: 'qty',
    searchableInput: true,
    dataIndex: 'qty',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.VoucherCode.localeCompare(b.VoucherCode),
  },
  {
    title: <>{t('rate')}</>,
    width: 260,
    key: 'rate',
    dataIndex: 'rate',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    render: (_, { VoucherDate }) => formateDate(VoucherDate),
  },
  {
    title: <>{t('amount')}</>,
    width: 260,
    key: 'amount',
    dataIndex: 'amount',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: <>{t('remarks')}</>,
    width: 260,
    dataIndex: 'remarks',
    key: 'remarks',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
  },
  {
    title: <>{t('action')}</>,
    width: 120,
    render: (_, record) => (
      <Tooltip title="Actions">
        <Space>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <AntButton
              type="text"
              icon={<DeleteOutlined style={{ color: 'red' }} />}
              // onClick={() => {
              //   setSelectedRecordId(record?.Id), setActiveTab('2');
              // }}
            />
          </Popconfirm>
        </Space>
      </Tooltip>
    ),
  },
];
