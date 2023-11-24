import { EditFilled, PrinterOutlined, DeleteOutlined } from '@ant-design/icons';
import { AntColumnType } from '@tradePro/globalTypes';
import { AntButton, AntSelectDynamic } from '@revisionary/components';
import { Form, Popconfirm, Space, Tooltip } from 'antd';
import { formateDate } from '@tradePro/utils/formateDate';

export const columns = (t: any, setSelectedRecordId?: any, setActiveTab?: any): AntColumnType<any>[] => [
  {
    title: <>{t('document_no')}</>,
    width: 220,
    searchableInput: true,
    dataIndex: 'DocumentTypeCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocumentTypeCode.localeCompare(b.DocumentTypeCode),
  },
  {
    title: <>{t('document date')}</>,
    width: 160,
    searchableInput: true,
    dataIndex: 'VoucherCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.VoucherCode.localeCompare(b.VoucherCode),
  },
  {
    title: <>{t('due date')}</>,
    width: 160,
    dataIndex: 'VoucherDate',
    render: (_, { VoucherDate }) => formateDate(VoucherDate),
  },
  {
    title: <>{t('customer name')}</>,
    width: 180,
    dataIndex: 'AccountTitle',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: <>{t('commission_agent')}</>,
    width: 190,
    dataIndex: 'Remarks',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
  },
  {
    title: <>{t('commission_type')}</>,
    width: 160,
    dataIndex: 'VoucherAmount',
  },
  {
    title: <>{t('commission_rate')}</>,
    width: 200,
    dataIndex: 'UserName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.UserName.localeCompare(b.UserName),
  },
  {
    title: <>{t('commission_amount')}</>,
    width: 160,
    dataIndex: 'CheqNo',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },
  {
    title: <>{t('commission_remarks')}</>,
    width: 160,
    dataIndex: 'Attachment',
  },
  {
    title: <>{t('bill_amount')}</>,
    width: 160,
    dataIndex: 'Attachment',
  },

  {
    title: <>{t('entry_date')}</>,
    width: 160,
    dataIndex: 'CheqNo',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },
  {
    title: <>{t('entry_user')}</>,
    width: 160,
    dataIndex: 'CheqNo',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },
  {
    title: <>{t('is_approved')}</>,
    width: 160,
    dataIndex: 'CheqNo',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },
  {
    title: <>{t('no_of_attachments')}</>,
    width: 160,
    dataIndex: 'CheqNo',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },
  {
    title: <>{t('remarks')}</>,
    width: 160,
    dataIndex: 'CheqNo',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },

  {
    title: <>{t('action')}</>,
    width: 120,
    render: (_, record) => (
      <Tooltip title="Actions">
        <Space>
          <AntButton
            type="text"
            icon={<EditFilled style={{ color: 'black' }} />}
            onClick={() => {
              setSelectedRecordId(record?.Id), setActiveTab('2');
            }}
          />
          <AntButton type="text" icon={<PrinterOutlined style={{ color: 'red', marginLeft: '-1rem' }} />} />
          <AntButton type="text" label="301-A" />
          <AntButton type="text" label="Voucher" />
        </Space>
      </Tooltip>
    ),
  },
];

export const detailColumn = (t: any, setSelectedRecordId?: any, setActiveTab?: any): AntColumnType<any>[] => [
  {
    title: <>{t('item_name')}</>,
    width: 220,
    searchableInput: true,
    dataIndex: 'DocumentTypeCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.DocumentTypeCode.localeCompare(b.DocumentTypeCode),
  },
  {
    title: <>{t('pack_uom')}</>,
    width: 160,
    searchableInput: true,
    dataIndex: 'VoucherCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.VoucherCode.localeCompare(b.VoucherCode),
  },
  {
    title: <>{t('item_qty')}</>,
    width: 160,
    dataIndex: 'VoucherDate',
    render: (_, { VoucherDate }) => formateDate(VoucherDate),
  },
  {
    title: <>{t('gross_weight')}</>,
    width: 180,
    dataIndex: 'AccountTitle',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: <>{t('short_weight')}</>,
    width: 190,
    dataIndex: 'Remarks',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
  },
  {
    title: <>{t('net_bill_weight')}</>,
    width: 160,
    dataIndex: 'VoucherAmount',
  },
  {
    title: <>{t('item_price')}</>,
    width: 200,
    dataIndex: 'UserName',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.UserName.localeCompare(b.UserName),
  },
  {
    title: <>{t('add_less')}</>,
    width: 160,
    dataIndex: 'CheqNo',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },
  {
    title: <>{t('net_rate')}</>,
    width: 160,
    dataIndex: 'Attachment',
  },
  {
    title: <>{t('rate_uom')}</>,
    width: 160,
    dataIndex: 'Attachment',
  },

  {
    title: <>{t('discount_type')}</>,
    width: 160,
    dataIndex: 'CheqNo',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },
  {
    title: <>{t('item_discount')}</>,
    width: 160,
    dataIndex: 'CheqNo',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },
  {
    title: <>{t('item_discount_amount')}</>,
    width: 160,
    dataIndex: 'CheqNo',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },
  {
    title: <>{t('warehouse')}</>,
    width: 160,
    dataIndex: 'CheqNo',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },
  {
    title: <>{t('job_lot')}</>,
    width: 160,
    dataIndex: 'CheqNo',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },

  {
    title: <>{t('bill_amount')}</>,
    width: 160,
    dataIndex: 'CheqNo',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },

  {
    title: <>{t('freights')}</>,
    width: 160,
    dataIndex: 'CheqNo',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },

  {
    title: <>{t('expense')}</>,
    width: 160,
    dataIndex: 'CheqNo',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },

  {
    title: <>{t('commission')}</>,
    width: 160,
    dataIndex: 'CheqNo',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },
];

export const detailGridColumn = (t: any, setSelectedRecordId?: any, handleDelete?: any): AntColumnType<any>[] => [
  {
    title: <>{t('warehouse')}</>,
    width: 220,
    key: 'warehouse',
    searchableInput: true,
    dataIndex: 'warehouse',
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
    title: <>{t('item_name')}</>,
    width: 220,
    key: 'item_name',
    searchableInput: true,
    dataIndex: 'item_name',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.VoucherCode.localeCompare(b.VoucherCode),
  },
  {
    title: <>{t('pack_uom')}</>,
    width: 220,
    key: 'pack_uom',
    dataIndex: 'pack_uom',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    render: (_, { VoucherDate }) => formateDate(VoucherDate),
  },
  {
    title: <>{t('packing_rate')}</>,
    width: 220,
    key: 'packing',
    dataIndex: 'packing',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
  },
  {
    title: <>{t('item_qty')}</>,
    width: 220,
    dataIndex: 'qty',
    key: 'qty',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
  },
  {
    title: <>{t('gross_weight')}</>,
    width: 220,
    key: 'gross',
    dataIndex: 'gross',
  },
  {
    title: <>{t('short_weight')}</>,
    width: 220,
    dataIndex: 'short',
    key: 'short',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.UserName.localeCompare(b.UserName),
  },
  {
    title: <>{t('net_weight')}</>,
    width: 220,
    key: 'net',
    dataIndex: 'net',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },
  {
    title: <>{t('item_price')}</>,
    width: 220,
    key: 'price',
    dataIndex: 'price',
  },
  {
    title: <>{t('add_less')}</>,
    width: 220,
    key: 'add_less',
    dataIndex: 'add_less',
  },

  {
    title: <>{t('net_rate')}</>,
    width: 220,
    dataIndex: 'net_rate',
    key: 'net_rate',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },
  {
    title: <>{t('rate_uom')}</>,
    width: 220,
    key: 'uom',
    dataIndex: 'uom',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },
  {
    title: <>{t('item_amount')}</>,
    width: 220,
    key: 'amount',
    dataIndex: 'amount',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },
  {
    title: <>{t('discount_type')}</>,
    width: 220,
    dataIndex: 'discount_type',
    key: 'discount_type',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },
  {
    title: <>{t('item_discount')}</>,
    width: 220,
    dataIndex: 'item_discount',
    key: 'item_discount',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },

  {
    title: <>{t('discount_amount')}</>,
    width: 220,
    key: 'discount_amount',
    dataIndex: 'discount_amount',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },

  {
    title: <>{t('wages_rate')}</>,
    width: 220,
    key: 'wages_rate',
    dataIndex: 'wages_rate',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },

  {
    title: <>{t('wages_amount')}</>,
    width: 220,
    dataIndex: 'wages_amount',
    key: 'wages_amount',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },

  {
    title: <>{t('freights')}</>,
    width: 220,
    key: 'freights',
    dataIndex: 'freights',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },

  {
    title: <>{t('expense')}</>,
    width: 220,
    key: 'expense',
    dataIndex: 'expense',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },
  {
    title: <>{t('commission')}</>,
    width: 220,
    key: 'commission',
    dataIndex: 'commission',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },
  {
    title: <>{t('item_net_amount')}</>,
    width: 220,
    key: ' item_net_amount',
    dataIndex: 'item_net_amount',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
  },
  {
    title: <>{t('remarks')}</>,
    width: 220,
    key: 'freights',
    dataIndex: 'freights',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CheqNo.localeCompare(b.CheqNo),
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
