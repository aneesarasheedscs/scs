import { PayablesAgingRegisterHistory } from './type';
import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { TFunction } from 'i18next';

export const columns = (
  t: TFunction,
  FirstIntervalCaption: string,
  SecondIntervalCaption: string,
  ThirdIntervalCaption: string,
  AboveIntervalCaption: string
): AntColumnType<PayablesAgingRegisterHistory>[] => {
  console.log(FirstIntervalCaption);
  return [
    {
      title: t('r_no'),
      width: 100,
      dataIndex: 'RNo',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.RNo - b.RNo,
    },
    {
      title: t('account_code'),
      width: 200,
      dataIndex: 'AccountCode',
      // searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      render: (_, { AccountCode }) => <a onClick={() => console.log(AccountCode)}>{AccountCode}</a>,
      sorter: (a, b) => a.AccountCode.localeCompare(b.AccountCode),
    },
    {
      title: t('account_title'),
      width: 250,
      dataIndex: 'AccountTitle',
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
    },

    {
      align: 'right',
      title: t('opening'),
      dataIndex: 'Opening',
      width: 150,
      showTotal: true,
      searchableInput: true,
      isNumber: true,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.Opening - b.Opening,
      render: (Opening) => numberFormatter(Opening),
    },

    {
      title: FirstIntervalCaption,
      width: 150,
      align: 'right',
      isNumber: true,
      showTotal: true,
      searchableInput: true,
      dataIndex: 'IstIntervale',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a['IstIntervale'] - b['IstIntervale'],
      render: (IstIntervale) => <>{numberFormatter(IstIntervale)}</>,
    },

    {
      title: SecondIntervalCaption,
      width: 150,
      showTotal: true,
      align: 'right',
      isNumber: true,
      searchableInput: true,
      dataIndex: 'ScnInterval',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a['ScnInterval'] - b['ScnInterval'],
      render: (ScnInterval) => <>{numberFormatter(ScnInterval)}</>,
    },

    {
      title: ThirdIntervalCaption,
      width: 150,
      showTotal: true,
      align: 'right',
      isNumber: true,
      searchableInput: true,
      dataIndex: 'TrdIntarval',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a['TrdIntarval'] - b['TrdIntarval'],
      render: (TrdIntarval) => <>{numberFormatter(TrdIntarval)}</>,
    },

    {
      title: AboveIntervalCaption,
      width: 150,
      align: 'right',
      showTotal: true,
      searchableInput: true,
      isNumber: true,
      dataIndex: 'Above',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.Above - b.Above,
      render: (Above) => <>{numberFormatter(Above)}</>,
    },

    {
      width: 150,
      align: 'right',
      title: t('closing'),
      showTotal: true,
      isNumber: true,
      searchableInput: true,
      dataIndex: 'Closing',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.Closing - b.Closing,
      render: (Closing) => <>{numberFormatter(Closing)}</>,
    },
  ];
};
// export const columns = (t: any): AntColumnType<PayablesAgingRegisterHistory>[] => [

//     {
//         width: 300,
//         searchableInput: true,
//         title: 'Account Title',
//         dataIndex: 'AccountTitle',
//         sortDirections: ['ascend', 'descend'],
//         sorter: (a, b) => a.AccountTitle.localeCompare(b.AccountTitle),
//     },
//     // { title: 'Item Name', dataIndex: 'ItemName', width: 350 },
//     // {
//     //     width: 300,
//     //     searchableInput: true,
//     //     title: 'Transporter Name',
//     //     dataIndex: 'TransporterName',
//     //     sortDirections: ['ascend', 'descend'],
//     //     sorter: (a, b) => a.TransporterName.localeCompare(b.TransporterName),
//     // },
//     // {
//     //     width: 300,
//     //     searchableInput: true,
//     //     title: 'WareHouse Name',
//     //     dataIndex: 'WareHouse',
//     //     sortDirections: ['ascend', 'descend'],
//     //     sorter: (a, b) => a.WareHouse.localeCompare(b.WareHouse),
//     // },
//     // {
//     //     width: 170,
//     //     searchableInput: true,
//     //     title: 'JobLot Name',
//     //     dataIndex: 'JobLot',
//     //     sortDirections: ['ascend', 'descend'],
//     //     sorter: (a, b) => a.JobLot.localeCompare(b.JobLot),
//     // },
//     // { title: 'Pack UOM', dataIndex: 'PackUom', width: 120 },
//     // {
//     //     width: 120,
//     //     title: 'Item Qty',
//     //     showTotal:true,
//     //     dataIndex:'ItemQty',
//     //     render: (_, { ItemQty }) => numberFormatter(ItemQty),
//     // },
//     // {
//     //     width: 120,
//     //     title: 'Short Weight',
//     //     dataIndex:'ShortWeight',
//     //     showTotal:true,
//     //     render: (_, { ShortWeight }) => numberFormatter(ShortWeight),
//     // },
//     // {
//     //     width: 120,
//     //     title: 'Stock Weight',
//     //     dataIndex:'StockWeight',
//     //     showTotal: true,
//     //     render: (_, { StockWeight }) => numberFormatter(StockWeight),
//     // },
//     // {
//     //     width: 120,
//     //     showTotal: true,
//     //     title: 'Net Bill Weight',
//     //     dataIndex: 'NetBillWeight',
//     //     render: (_, { NetBillWeight }) => numberFormatter(NetBillWeight),
//     // },

//     // { title: 'Vehicle No', dataIndex: 'VehicleNo', width: 120 },
//     // { title: 'Bilty No', dataIndex: 'BiltyNo', width: 120 },
//     // {
//     //     width: 120,
//     //     title: 'Entry Date',
//     //     dataIndex: 'EntryDate',

//     //     render: (_, { EntryDate }) => formateDate(EntryDate),
//     // },
//     // {
//     //     width: 120,
//     //     title: 'Modify Date',
//     //     dataIndex:'ModifyDate',
//     //     render: (_, { ModifyDate }) => formateDate(ModifyDate),
//     // }
// ];
