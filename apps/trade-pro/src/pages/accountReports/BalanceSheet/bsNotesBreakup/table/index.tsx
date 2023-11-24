import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useTranslation } from 'react-i18next';
import { columns } from './column';
import { Card } from 'antd';

function BSNotesBreakupTable({
  shareCapital,
  salariesPayables,
  creditorsPaddyRices,
  tradeCreditors,
  otherCreditors,
  tradeDebtorLocal,
  stockInTrade,
  cashBankBalances,
}: any) {
  const { t } = useTranslation();
  const selectedData =
    shareCapital ||
    salariesPayables ||
    creditorsPaddyRices ||
    tradeCreditors ||
    otherCreditors ||
    stockInTrade ||
    tradeDebtorLocal ||
    cashBankBalances;
  return (
    <>
      <Card style={{ width: '80%', marginTop: 20 }}>
        <AntTable
          rowKey="Id"
          // refetch={refetch}
          // isError={isError}
          columns={columns(t)}
          numberOfSkeletons={12}
          // isLoading={isLoading || isFetching}
          data={selectedData || []}
          scroll={{ x: '', y: convertVhToPixels('42vh') }}
        />
      </Card>
    </>
  );
}

export default BSNotesBreakupTable;
