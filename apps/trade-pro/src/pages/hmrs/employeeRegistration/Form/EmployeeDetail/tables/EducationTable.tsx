import { AntTable } from '@tradePro/components';
import { AntColumnType } from '@tradePro/globalTypes';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useTranslation } from 'react-i18next';

const columns = (t?: any): AntColumnType<any>[] => [
  {
    title: <>{t('degree')}</>,
    dataIndex: 'ItemName',
    width: 180,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },

  {
    title: <>{t('degree_title')}</>,
    dataIndex: 'PackUom',
    width: 180,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
  {
    title: <>{t('institute')}</>,
    dataIndex: 'PackUom',
    width: 150,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
  {
    title: <>{t('city')}</>,
    dataIndex: 'PackUom',
    width: 150,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
  {
    title: <>{t('start_year')}</>,
    dataIndex: 'PackUom',
    width: 180,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
  {
    title: <>{t('passing_year')}</>,
    dataIndex: 'PackUom',
    width: 180,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
  {
    title: <>{t('cgpa')}</>,
    dataIndex: 'PackUom',
    width: 150,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
];
function EducationTable() {
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

export default EducationTable;
