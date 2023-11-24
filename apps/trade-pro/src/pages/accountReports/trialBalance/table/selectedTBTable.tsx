import { AntTable } from '@scs/ui';
import { trialBalanceSelectedHistoryColumns } from './columns';

// const { data, isError, isLoading, refetch, isFetching } = useGetSelectedTBHistory();
const SelectedTBTable = () => {
  return (
    <div>
      <AntTable
        columns={trialBalanceSelectedHistoryColumns()}
        // data={data?.data?.Data?.Result || []}
        // isError={isError}
        // isLoading={isLoading || isFetching}
        // refetch={refetch}
      />
    </div>
  );
};
export default SelectedTBTable;
