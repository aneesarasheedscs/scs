import { AntButton, AntTable } from '@tradePro/components';
import { columns } from './columns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetItemHistory } from './queries';
import { useTranslation } from 'react-i18next';

function HistoryTable({ setSelectedRecordId, setActiveTab }: THistoryTyes) {
  const { t } = useTranslation();
  const { data, isError, isLoading } = useGetItemHistory();

  return (
    <>
      <AntTable
        isError={isError}
        columns={columns(t, setSelectedRecordId, setActiveTab)}
        numberOfSkeletons={12}
        isLoading={isLoading}
        data={data?.data?.Data?.Result || []}
        scroll={{ x: '', y: convertVhToPixels('62vh') }}
      />
    </>
  );
}

export default HistoryTable;
interface THistoryTyes {
  setSelectedRecordId: (id: number | null) => void;
  setActiveTab: (tab: any) => void;
}
