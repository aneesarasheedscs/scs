import { AntColumnType } from '@tradePro/globalTypes';
import { Tooltip } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { AntButton } from '@scs/ui';
import { TItemHistoryTable } from '../type';

export const columns = (t?: any, setSelectedRecordId?: any, setActiveTab?: any): AntColumnType<TItemHistoryTable>[] => [
  { title: <>{t('code')}</>, dataIndex: 'ItemCode', width: 100 },

  {
    width: 250,
    searchableInput: true,
    title: <>{t('item_name')}</>,
    dataIndex: 'ItemName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },
  {
    width: 200,
    searchableInput: true,
    title: <>{t('item_category')}</>,
    dataIndex: 'CategoryDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryDescription.localeCompare(b.CategoryDescription),
  },
  {
    width: 200,
    searchableInput: true,
    title: <>{t('item_type')}</>,
    dataIndex: 'TypeDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.TypeDescription.localeCompare(b.TypeDescription),
  },
  {
    title: <>{t('base_pack_uom')}</>,
    dataIndex: 'UOMCode',
    width: 200,
  },
  {
    width: 300,
    searchableInput: true,
    title: <>{t('purchase_account_GL')}</>,
    dataIndex: 'GlStockAccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.GlStockAccountTitle.localeCompare(b.GlStockAccountTitle),
  },
  {
    width: 300,
    searchableInput: true,
    title: <>{t('sale_account_GL')}</>,
    dataIndex: 'GlSaleAccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.GlSaleAccountTitle.localeCompare(b.GlSaleAccountTitle),
  },
  {
    width: 300,
    searchableInput: true,
    title: <>{t('cgs_account_GL')}</>,
    dataIndex: 'GlCgsAccountTitle',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.GlCgsAccountTitle.localeCompare(b.GlCgsAccountTitle),
  },
  {
    width: 200,
    title: <>{t('user_name')}</>,
    dataIndex: 'EntryUserName',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.EntryUserName.localeCompare(b.EntryUserName),
  },
  {
    width: 160,
    title: <>{t('number_of_attach')}</>,
    dataIndex: 'NoOfAttachments',
  },
  {
    width: 100,
    title: <>{t('action')}</>,
    dataIndex: '',
    render: (_, record) => (
      <Tooltip title="Edit">
        <AntButton
          type="text"
          icon={<EditFilled style={{ color: 'black' }} />}
          onClick={() => {
            setSelectedRecordId(record?.Id), setActiveTab('2');
          }}
        />
      </Tooltip>
    ),
  },
];
