import { AntTable } from '@tradePro/components';
import { columns } from './columns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetItemHistory } from './queries';
import { useTranslation } from 'react-i18next';

function HistoryTable() {
  const { t } = useTranslation();
  const { data, isError, isLoading } = useGetItemHistory();
  return (
    <>
      <AntTable
        isError={isError}
        columns={columns(t)}
        numberOfSkeletons={12}
        isLoading={isLoading}
        data={data?.data?.Data?.Result || []}
        scroll={{ x: '', y: convertVhToPixels('62vh') }}
      />
    </>
  );
}

export default HistoryTable;
