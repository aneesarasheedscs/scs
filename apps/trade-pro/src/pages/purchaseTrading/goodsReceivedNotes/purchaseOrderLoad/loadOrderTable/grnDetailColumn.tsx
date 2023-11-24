import { AntColumnType } from '@tradePro/globalTypes';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Tooltip } from 'antd';
import { AntButton } from '@tradePro/components';
import { EditFilled, DeleteOutlined } from '@ant-design/icons';
import { TGrnDetailTable } from '../../types';

export const GRNDetailColumn = (t?: any): AntColumnType<TGrnDetailTable>[] => [
  { title: <>{t('order_no')}</>, dataIndex: 'DocNo', width: 110 },
  {
    width: 150,
    title: <>{t('order_date')}</>,
    searchableDate: true,
    dataIndex: 'DocDate',
    render: (_, { DocDate }) => formateDate(DocDate),
  },
  {
    title: <>{t('item_name')}</>,
    dataIndex: 'ItemName',
    width: 300,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },

  {
    title: <>{t('base_pack_uom')}</>,
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
  },
  {
    width: 160,
    title: <>{t('net_weight')}</>,
    dataIndex: 'NetWeight',
    render: (_, { NetWeight }) => numberFormatter(NetWeight),
  },
  {
    title: <>{t('job_lot')}</>,
    dataIndex: 'JobLotCode',
    width: 180,
  },
  {
    title: <>{t('ware_house_name')}</>,
    dataIndex: 'WareHouseCode',
    width: 200,
  },

  {
    width: 180,
    title: <>{t('city_name')}</>,
    dataIndex: 'Code',
  },

  {
    width: 160,
    title: <>{t('remarks-detail')}</>,
    dataIndex: 'RemarksHeader',
  },
  {
    width: 120,
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
      </>
    ),
  },
];
