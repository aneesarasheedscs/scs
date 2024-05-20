import { TSaleOrder, TSaleOrderDetail, TSaleOrderForm, TSaleOrderForm2 } from '../type';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { Button, Space, Tooltip } from 'antd';
import { PrinterFilled, EditFilled, SaveFilled, DeleteOutlined } from '@ant-design/icons';
import { AntButton } from '@tradePro/components';
import { numberFormatter } from '@tradePro/utils/numberFormatter';

export const saleOrderFormcolumns = (
  t: any,
  handleDeleteRow: any,
  handleEditRow: any
): AntColumnType<TSaleOrderDetail>[] => [
  { title: <>t{'Item Name'}</>, dataIndex: 'ItemName', width: 300 },
  {
    width: 150,
    title: <>{t('pack_uom')}</>,
    searchableDate: true,
    dataIndex: 'UOMCode',
  },
  {
    width: 150,
    searchableInput: true,
    title: <>{t('qty')}</>,
    dataIndex: 'OrderItemQty',
    sortDirections: ['ascend', 'descend'],
  },

  { title: <>{t('weight')}</>, dataIndex: 'NetWeight', width: 150 },
  {
    title: <>{t('item_price')}</>,
    dataIndex: 'BagPrice',
    width: 150,
    render: (Amount, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Amount)}</Space>
    ),
  },

  // { title: 'Base UOM', dataIndex: 'UOMCodeItm', width: 120 },
  {
    width: 120,
    title: <>{t('add_less')}</>,
    dataIndex: 'AddLess',
  },
  {
    width: 120,
    title: <>{t('net_rate')}</>,
    dataIndex: 'RetailRate',
  },
  {
    width: 100,
    title: <>{'Rate UOM'}</>,
    dataIndex: 'RateUom',
  },
  {
    title: <>{t('amount')}</>,
    width: 120,
    showTotal: true,
    dataIndex: 'Amount',
    render: (Amount, record) => (
      <Space style={{ display: 'flex', justifyContent: 'end', marginRight: 20 }}>{numberFormatter(Amount)}</Space>
    ),
  },
  {
    width: 120,
    title: <>{t('remarks')}</>,
    dataIndex: 'OrderRemarks',
  },

  {
    title: 'Action',
    width: 120,
    render: (_, record) => (
      <Tooltip title="Actions">
        <Space>
          <AntButton
            type="text"
            icon={<DeleteOutlined style={{ color: 'red' }} onClick={() => handleDeleteRow(record)} />}
          />

          <AntButton
            type="text"
            icon={<EditFilled style={{ color: 'blue' }} />}
            onClick={() => handleEditRow(record)}
          />
        </Space>
      </Tooltip>
    ),
  },
];

export const saleOrderFormcolumns2 = (): AntColumnType<TSaleOrderForm2>[] => [
  { title: 'Item Name', dataIndex: 'ItemName', width: 100 },
  {
    width: 150,
    title: 'Pack Uom',
    searchableDate: true,
    dataIndex: 'UOMCode',
  },
  {
    width: 150,
    searchableInput: true,
    title: 'QTY',
    dataIndex: 'OrderItemQty',
    sortDirections: ['ascend', 'descend'],
  },
  { title: 'Weight', dataIndex: 'NetWeight', width: 150 },
  { title: 'Rate', dataIndex: '', width: 150 },

  {
    width: 100,
    title: 'Rate UOM',
    dataIndex: 'UOMCode',
  },
  {
    width: 120,
    dataIndex: 'OrderItemQty',
    title: 'Balance Qty',
  },
  {
    width: 120,
    title: 'NetWeight',
    dataIndex: 'NetWeight',
  },
];

export const SaleOrdercolumns = (t: any): AntColumnType<TSaleOrder>[] => [
  {
    width: 120,
    title: 'Doc No',
    searchableDate: true,
    dataIndex: 'DocNo',
  },
  {
    width: 120,
    title: 'DocDate',
    searchableDate: true,
    dataIndex: 'DocDate',
    render: (_, { DocDate }) => formateDate(DocDate),
  },

  {
    width: 200,
    title: 'Customer',
    searchableDate: true,
    dataIndex: 'Customer',
  },
  {
    width: 150,
    title: 'Sub Part Account',
    searchableDate: true,
    dataIndex: 'SubPartyAccount',
  },
  {
    width: 150,
    title: 'Ship To Address',
    searchableDate: true,
    dataIndex: 'ShipToAddress',
  },
  {
    width: 150,
    title: 'Due Days',
    dataIndex: 'DueDays',
  },
  {
    width: 150,
    title: 'Due Date',
    dataIndex: 'DueDate',
    // render: (_, { DueDate }) => formateDate(DueDate),
  },
  {
    width: 120,
    title: 'Delivery Term',
    dataIndex: 'DeliveryTerm',
  },
  {
    width: 120,
    title: 'Payment Term',
    dataIndex: 'PaymentTerm',
  },
  {
    width: 150,
    title: 'Commission Agent',
    dataIndex: 'CommAgent',
  },
  {
    width: 150,
    title: 'Commission Type',
    dataIndex: 'CommType',
  },
  {
    width: 150,
    title: 'Commission Rate',
    dataIndex: 'CommRate',
  },
  {
    width: 170,
    title: 'Commission Amount',
    dataIndex: 'CommAmount',
  },
  {
    width: 150,
    title: 'Common Remarks',
    dataIndex: 'CommRemarks',
  },
  {
    width: 120,
    title: 'Status',
    dataIndex: 'Status',
  },
  {
    width: 150,
    title: 'Is Approved',
    dataIndex: 'IsApproved',
  },
  {
    width: 150,
    title: 'Entry Date',
    dataIndex: 'EntryDate',
    render: (_, { EntryDate }) => formateDate(EntryDate),
  },
  {
    width: 150,
    title: 'Entry User',
    dataIndex: 'EntryUser',
  },
  {
    width: 150,
    title: 'Remarks',
    dataIndex: 'Remarks',
  },
  { title: 'Edit ', dataIndex: '', width: 100 },
  {
    width: 120,
    title: 'Print',
    searchableDate: true,
    dataIndex: '',
  },
  {
    width: 120,
    title: 'Save As',
    searchableDate: true,
    dataIndex: '',
  },
  {
    title: 'Actions',
    dataIndex: '',
    render: (_, record) => (
      <Space>
        <Tooltip title="Edit">
          <EditFilled
            style={{
              fontSize: 18,
              cursor: 'pointer',
              color: '#5A54F9',
              boxShadow:
                'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
            }}
          />
        </Tooltip>
        <Tooltip title="Print">
          <PrinterFilled
            style={{
              fontSize: 18,
              cursor: 'pointer',
              color: '#F37DAA',
              boxShadow:
                'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
            }}
          />
        </Tooltip>
        <Tooltip title="Save As">
          <SaveFilled
            style={{
              fontSize: 18,
              cursor: 'pointer',
              color: '#ffc40c',
              boxShadow:
                'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
            }}
          />
        </Tooltip>
      </Space>
    ),
    width: 150,
  },
];
