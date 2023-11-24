import { TSaleOrder, TSaleOrderForm, TSaleOrderForm2 } from '../type';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Button, Space, Tooltip } from 'antd';
import { PrinterFilled, EditFilled, SaveFilled } from '@ant-design/icons';

export const saleOrderFormcolumns = (): AntColumnType<TSaleOrderForm>[] => [
  { title: 'Item Name', dataIndex: 'DocNo', width: 100 },
  {
    width: 150,
    title: 'Pack Uom',
    searchableDate: true,
    dataIndex: 'DocDate',
  },
  {
    width: 150,
    searchableInput: true,
    title: 'QTY',
    dataIndex: 'SupplierName',
    sortDirections: ['ascend', 'descend'],
  },
  { title: 'Weight', dataIndex: 'DeliveryTerm', width: 150 },
  { title: 'Item Price', dataIndex: 'ItemName', width: 150 },
  { title: 'Base UOM', dataIndex: 'UOMCodeItm', width: 120 },
  {
    width: 120,
    title: 'Add Less',
    dataIndex: 'OrderItemQty',
  },
  {
    width: 120,
    title: 'Net Rate',
    dataIndex: 'ReceivedQty',
  },
  {
    width: 100,
    title: 'Rate UOM',
    dataIndex: 'RejQty',
  },
  {
    width: 120,
    dataIndex: 'Amount',
    title: 'Balance Qty',
  },
  {
    width: 120,
    title: 'Remarks',
    dataIndex: 'NetWeight',
  },
  {
    width: 130,
    title: 'Action',
    dataIndex: 'ReceivedWeight',
  },
];

export const saleOrderFormcolumns2 = (): AntColumnType<TSaleOrderForm2>[] => [
  { title: 'Item Name', dataIndex: '', width: 100 },
  {
    width: 150,
    title: 'Pack Uom',
    searchableDate: true,
    dataIndex: '',
  },
  {
    width: 150,
    searchableInput: true,
    title: 'QTY',
    dataIndex: '',
    sortDirections: ['ascend', 'descend'],
  },
  { title: 'Weight', dataIndex: '', width: 150 },
  { title: 'Rate', dataIndex: '', width: 150 },

  {
    width: 100,
    title: 'Rate UOM',
    dataIndex: '',
  },
  {
    width: 120,
    dataIndex: '',
    title: 'Balance Qty',
  },
  {
    width: 120,
    title: '',
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
    render: (_, { DueDate }) => formateDate(DueDate),
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
