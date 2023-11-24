import { AntTable } from '@scs/ui';
import { FollowUpColumn } from './Columns';
import { useTranslation } from 'react-i18next';
import { useGetFollowUpHistory } from '../../queries';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

const FollowUpTable = () => {
  const { t } = useTranslation();
  const {
    data: AccountTitle,
    isError: isAccountTitleError,
    isLoading: isAccountTitleLoading,
  } = useGetFollowUpHistory();
  return (
    <div>
      <br></br>
      <AntTable
        columns={FollowUpColumn(t)}
        isError={isAccountTitleError}
        isLoading={isAccountTitleLoading}
        data={AccountTitle?.data?.Data?.Result || []}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default FollowUpTable;
