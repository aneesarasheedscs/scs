import { EditFilled, PrinterOutlined, DeleteOutlined } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton, AntSelectDynamic } from '@revisionary/components';
import { Form, Popconfirm, Space, Tooltip } from 'antd';
import { formateDate } from '@tradePro/utils/formateDate';

export const columns = (t: any, setSelectedRecordId?: any, handleDelete?: any): AntColumnType<any>[] => [
  {
    title: <>{t('account')}</>,
    width: 220,
    key: 'account',
    searchableInput: true,
    dataIndex: 'account',
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
    title: <>{t('remarks')}</>,
    width: 220,
    key: 'remarks',
    searchableInput: true,
    dataIndex: 'remarks',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.VoucherCode.localeCompare(b.VoucherCode),
  },
  {
    title: <>{t('percentage')}</>,
    width: 220,
    key: 'percentage',
    dataIndex: 'percentage',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    render: (_, { VoucherDate }) => formateDate(VoucherDate),
  },
  {
    title: <>{t('qty')}</>,
    width: 220,
    key: 'qty',
    dataIndex: 'qty',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: <>{t('rate')}</>,
    width: 220,
    dataIndex: 'rate',
    key: 'rate',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
  },
  {
    title: <>{t('debit')}</>,
    width: 220,
    key: 'debit',
    dataIndex: 'debit',
  },
  {
    title: <>{t('credit')}</>,
    width: 220,
    dataIndex: 'credit',
    key: 'credit',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.UserName.localeCompare(b.UserName),
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
