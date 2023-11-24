import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Form, Tooltip } from 'antd';
import { AntButton, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { EditFilled, DeleteOutlined, PrinterOutlined } from '@ant-design/icons';
import { TGrnDetailTable } from '@tradePro/pages/purchaseTrading/purchaseInvoice/types';
// import { useGetCityName, useGetJobLot, useGetWareHouseName } from '../../queryOptions';

export const columns = (t?: any, selectFieldValues?: any, onSelectChange?: any): AntColumnType<TGrnDetailTable>[] => [
  { title: <>{t('order_no')}</>, dataIndex: 'DocNo', width: 110 },
  // {
  //   width: 150,
  //   title: <>{t('order_date')}</>,
  //   searchableDate: true,
  //   dataIndex: 'DocDate',
  //   render: (_, { DocDate }) => formateDate(DocDate),
  // },
  {
    title: <>{t('item_name')}</>,
    dataIndex: 'ItemName',
    width: 300,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },

  {
    title: <>{t('base_uom')}</>,
    dataIndex: 'PackUom',
    width: 150,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
  {
    width: 150,
    title: <>{t('item_quantity')}</>,
    dataIndex: 'ItemQty',
    render: (_, { ItemQty }) => numberFormatter(ItemQty),
  },
  {
    width: 160,
    title: <>{t('gross_weight')}</>,
    dataIndex: 'GrossWeight',
    // render: (_, { GrossWeight }) => numberFormatter(GrossWeight),
  },

  {
    width: 180,
    title: <>{t('add_less_weight')}</>,
    dataIndex: 'AddLessWeight',
    render: () => (
      <>
        <Form>
          <AntInputNumber label="" style={{ position: 'absolute', top: '-10px', height: '30px' }} name="AdLsWeight" />
        </Form>
      </>
    ),
  },
  {
    width: 160,
    title: <>{t('net_bill_weight')}</>,
    dataIndex: 'NetWeight',
    render: (_, { NetWeight }) => numberFormatter(NetWeight),
  },
  {
    title: <>{t('job_lot')}</>,
    dataIndex: 'JobLotCode',
    width: 180,
    render: () => (
      <>
        <Form>
          <AntSelectDynamic
            fieldValue="Id"
            fieldLabel="JobLotDescription"
            name="JobLotId"
            label=""
            style={{ position: 'absolute', top: '-10px', height: '30px' }}
            // query={useGetJobLot}
            value={selectFieldValues['JobLotId']}
          />
        </Form>
      </>
    ),
  },
  {
    title: <>{t('ware_house')}</>,
    dataIndex: 'WareHouseCode',
    width: 200,
    render: () => (
      <>
        <Form>
          <AntSelectDynamic
            fieldValue="Id"
            fieldLabel="WareHouseName"
            name="WareHouseId"
            label=""
            style={{ position: 'absolute', top: '-10px', height: '30px' }}
            // query={useGetWareHouseName}
            value={selectFieldValues['WareHouseId']}
          />{' '}
        </Form>
      </>
    ),
  },

  {
    width: 180,
    title: <>{t('item_rate')}</>,
    dataIndex: 'CityName',
    render: (_, record) => (
      <>
        <Form>
          <AntSelectDynamic
            fieldValue="Id"
            fieldLabel="CityName"
            name="AreaCity"
            label=""
            style={{ position: 'absolute', top: '-10px', height: '30px' }}
            // query={useGetCityName}
            value={selectFieldValues['AreaCity']}
          />{' '}
          {/* <AntSelectDynamic
            fieldValue="Id"
            fieldLabel="CityName"
            name="AreaCity"
            label=""
            style={{ position: 'absolute', top: '-10px', height: '30px' }}
            query={useGetCityName}
          />{' '} */}
        </Form>
      </>
    ),
  },
  {
    title: <>{t('rate_uom')}</>,
    dataIndex: 'PackUom',
    width: 150,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
  {
    width: 160,
    title: <>{t('rate_cut')}</>,
    dataIndex: 'RemarksHeader',
  },
  {
    width: 160,
    title: <>{t('freights')}</>,
    dataIndex: 'RemarksHeader',
  },
  {
    width: 160,
    title: <>{t('expense')}</>,
    dataIndex: 'RemarksHeader',
  },
  {
    width: 160,
    title: <>{t('commission')}</>,
    dataIndex: 'RemarksHeader',
  },
  {
    width: 160,
    title: <>{t('item_net_amount')}</>,
    dataIndex: 'RemarksHeader',
  },
  {
    width: 150,
    title: <>{t('action')} </>,
    dataIndex: 'Remarks',

    render: (_, record) => (
      <>
        <Tooltip title={t('edit')}>
          <AntButton
            type="text"
            icon={<EditFilled style={{ color: 'black' }} />}
            // onClick={() => setSelectedRecordId(record?.Id)}
          />
        </Tooltip>
        <Tooltip title={t('delete')}>
          <AntButton
            type="text"
            icon={<DeleteOutlined style={{ color: 'red' }} />}
            // onClick={() => setSelectedRecordId(record?.Id)}
          />
        </Tooltip>
        <Tooltip title={t('print')}>
          <AntButton
            type="text"
            icon={<PrinterOutlined style={{ color: 'blue' }} />}
            // onClick={() => setSelectedRecordId(record?.Id)}
          />
        </Tooltip>
      </>
    ),
  },
];
