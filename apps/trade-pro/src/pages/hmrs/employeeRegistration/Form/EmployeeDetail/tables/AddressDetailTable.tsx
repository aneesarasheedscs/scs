import { AntTable } from '@tradePro/components';
import { AntColumnType } from '@tradePro/globalTypes';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useTranslation } from 'react-i18next';

const columns = (t?: any): AntColumnType<any>[] => [
  {
    title: <>{t('address_type')}</>,
    dataIndex: 'ItemName',
    width: 200,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },

  {
    title: <>{t('country')}</>,
    dataIndex: 'PackUom',
    width: 150,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
  {
    title: <>{t('province')}</>,
    dataIndex: 'PackUom',
    width: 150,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
  {
    title: <>{t('city')}</>,
    dataIndex: 'PackUom',
    width: 120,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
  {
    title: <>{t('address_detail')}</>,
    dataIndex: 'PackUom',
    width: 180,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
];
function AddressDetailTable() {
  const { t } = useTranslation();
  return (
    <>
      <AntTable
        // refetch={refetch}
        // isError={isError}
        columns={columns(t)}
        numberOfSkeletons={12}
        // isLoading={isLoading || isFetching}
        // data={selectedRows}
        scroll={{ x: '', y: convertVhToPixels('20vh') }}
      />
    </>
  );
}

export default AddressDetailTable;
