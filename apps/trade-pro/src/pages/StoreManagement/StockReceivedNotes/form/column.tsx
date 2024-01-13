import { AntButton } from '@tradePro/components';
import { AntColumnType } from '@tradePro/globalTypes';
import { Popconfirm, Space, Tooltip } from 'antd';
import { DeleteOutlined, EditFilled } from '@ant-design/icons';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TLoadORderHistory, TWsRmStockReceivedNotesExpensesList } from '../types';

export const columns = (t: any, handleDeleteRow: any, handleEditRow: any): AntColumnType<TLoadORderHistory>[] => [
  {
    title: t('stn'),
    width: 100,
    dataIndex: 'TransferNo',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => {
      const orderNoA = a.DocNo || 0;
      const orderNoB = b.DocNo || 0;
      const requisitionNoA = a.TransferNo || 0;
      const requisitionNoB = b.TransferNo || 0;

      return orderNoA + requisitionNoA - (orderNoB + requisitionNoB);
    },
    render: (_, { DocNo, TransferNo }) => {
      if (TransferNo !== undefined && TransferNo !== null && TransferNo !== 0) {
        return <span>{numberFormatter(TransferNo)}</span>;
      } else {
        return <span>{numberFormatter(DocNo)}</span>;
      }
    },
  },
  {
    title: t('warehouse_name'),
    width: 200,
    searchableInput: true,
    dataIndex: 'WareHouseName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.WareHouseName.localeCompare(b.WareHouseName),
  },
  {
    title: t('item_name'),
    width: 320,
    searchableInput: true,
    dataIndex: 'ItemName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },
  {
    title: t('issued_qty'),
    width: 130,
    showTotal: true,
    dataIndex: 'IssuedQuantity',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.IssuedQuantity - b.IssuedQuantity,
    render: (_, { IssuedQuantity }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '20%' }}>
        {numberFormatter(IssuedQuantity)}
      </span>
    ),
  },
  {
    title: t('rec_qty'),
    width: 100,
    showTotal: true,
    dataIndex: 'ReceivedQty',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ReceivedQty - b.ReceivedQty,
    render: (_, { ReceivedQty }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '20%' }}>{numberFormatter(ReceivedQty)}</span>
    ),
  },
  {
    title: t('available_stock'),
    width: 130,
    showTotal: true,
    dataIndex: 'AvailableStock',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AvailableStock - b.AvailableStock,
    render: (_, { AvailableStock }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '20%' }}>
        {numberFormatter(AvailableStock)}
      </span>
    ),
  },
  {
    title: t('pack_uom'),
    width: 150,
    searchableInput: true,
    dataIndex: 'UOMCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.UOMCode.localeCompare(b.UOMCode),
  },
  {
    title: t('weight'),
    width: 100,
    showTotal: true,
    dataIndex: 'StockWeight',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.StockWeight - b.StockWeight,
    render: (_, { StockWeight }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>{numberFormatter(StockWeight)}</span>
    ),
  },
  {
    title: t('available_weight'),
    width: 140,
    showTotal: true,
    dataIndex: 'AvailableWeight',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AvailableWeight - b.AvailableWeight,
    render: (_, { AvailableWeight }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>
        {numberFormatter(AvailableWeight)}
      </span>
    ),
  },
  {
    title: t('item_rate'),
    width: 100,
    showTotal: true,
    dataIndex: 'ReceivedRate',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ReceivedRate - b.ReceivedRate,
    render: (_, { ReceivedRate }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>
        {numberFormatter(ReceivedRate)}
      </span>
    ),
  },
  {
    title: t('average_rate'),
    width: 150,
    showTotal: true,
    dataIndex: 'AvgRate',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.AvgRate - b.AvgRate,
    render: (_, { AvgRate }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>{numberFormatter(AvgRate)}</span>
    ),
  },
  {
    title: t('rec_amount'),
    width: 130,
    showTotal: true,
    dataIndex: 'ReceivedAmount',
    sortDirections: ['ascend', 'descend'],
    // render: (_, { ReceivedAmount, StockWeight, PackEquivalent, ReqRate }) => {
    // if (ReceivedAmount !== undefined && ReceivedAmount !== null && ReceivedAmount !== 0) {
    //   return (
    //     <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>
    //       {' '}
    //       {numberFormatter(ReceivedAmount)}
    //     </span>
    //   );
    // } else {
    //   const ReceivedAmount = (StockWeight / PackEquivalent) * ReqRate;
    //   return (
    //     <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>
    //       {numberFormatter(ReceivedAmount)}
    //     </span>
    //   );
    // }
    // },
    render: (_, { ReceivedAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>
        {numberFormatter(ReceivedAmount)}
      </span>
    ),
  },
  {
    title: t('expense'),
    width: 130,
    showTotal: true,
    dataIndex: 'ExpenseAmount',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ExpenseAmount - b.ExpenseAmount,
    render: (_, { ExpenseAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>
        {numberFormatter(ExpenseAmount)}
      </span>
    ),
  },

  {
    title: t('net_amount'),
    width: 130,
    showTotal: true,
    dataIndex: 'ItemNetAmount',
    sortDirections: ['ascend', 'descend'],
    // render: (_, { ItemNetAmount, StockWeight, PackEquivalent, ReqRate }) => {
    //   if (ItemNetAmount !== undefined && ItemNetAmount !== null && ItemNetAmount !== 0) {
    //     return (
    //       <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>
    //         {numberFormatter(ItemNetAmount)}
    //       </span>
    //     );
    //   } else {
    //     const NetAmount = (StockWeight / PackEquivalent) * ReqRate;
    //     return (
    //       <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>
    //         {numberFormatter(NetAmount)}
    //       </span>
    //     );
    //   }
    // },
    render: (_, { ItemNetAmount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>
        {numberFormatter(ItemNetAmount)}
      </span>
    ),
  },

  {
    title: t('remarks'),
    width: 220,
    dataIndex: 'RemarksDetail',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.RemarksDetail.localeCompare(b.RemarksDetail),
  },
  {
    title: t('action'),
    width: 120,
    render: (_, record) => (
      <>
        <Tooltip title={t('edit')}>
          <Space>
            <AntButton
              type="text"
              icon={<EditFilled style={{ color: 'blue' }} />}
              onClick={() => handleEditRow(record)}
            />
          </Space>
        </Tooltip>
        <Tooltip title={t('delete')}>
          <Space>
            <AntButton
              type="text"
              icon={<DeleteOutlined style={{ color: 'red' }} />}
              onClick={() => handleDeleteRow(record)}
            />
          </Space>
        </Tooltip>
      </>
    ),
  },
];
export const expenseColumns = (
  t: any,
  handleDeleteRow: any,
  handleEditRow: any
): AntColumnType<TWsRmStockReceivedNotesExpensesList>[] => [
  {
    title: t('other_item_name'),
    width: 400,
    searchableInput: true,
    dataIndex: 'OtherItemName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.OtherItemName.localeCompare(b.OtherItemName),
  },
  {
    title: t('qty'),
    width: 200,
    showTotal: true,
    dataIndex: 'Qty',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Qty - b.Qty,
    render: (_, { Qty }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>{numberFormatter(Qty)}</span>
    ),
  },

  {
    title: t('rate'),
    width: 200,
    showTotal: true,
    dataIndex: 'Rate',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Rate - b.Rate,
    render: (_, { Rate }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>{numberFormatter(Rate)}</span>
    ),
  },

  {
    title: t('amount'),
    width: 200,
    showTotal: true,
    dataIndex: 'Amount',
    sortDirections: ['ascend', 'descend'],
    render: (_, { Amount }) => (
      <span style={{ display: 'flex', justifyContent: 'end', marginRight: '10%' }}>{numberFormatter(Amount)}</span>
    ),
  },

  {
    title: t('remarks'),
    width: 380,
    dataIndex: 'Remarks',
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
  },
  {
    title: t('action'),
    width: 150,
    render: (_, record) => (
      <>
        <Tooltip title={t('edit')}>
          <Space>
            <AntButton
              type="text"
              icon={<EditFilled style={{ color: 'blue' }} />}
              onClick={() => handleEditRow(record)}
            />
          </Space>
        </Tooltip>
        <Tooltip title={t('delete')}>
          <Space>
            <AntButton
              type="text"
              icon={<DeleteOutlined style={{ color: 'red' }} />}
              onClick={() => handleDeleteRow(record)}
            />
          </Space>
        </Tooltip>
      </>
    ),
  },
];
