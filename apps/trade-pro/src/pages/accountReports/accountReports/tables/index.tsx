import { DetailTableColumns, SummaryIITableColumns, SummaryITableColumns } from './columns';
import { AntTable } from '@tradePro/components';
import { useGetGeneralLedgerDetail, useGetGeneralLedgerSummaryI, useGetGeneralLedgerSummaryII } from '../queries';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Col, Row, Space, theme } from 'antd';
import { useTranslation } from 'react-i18next';

interface SelectedValues {
  branchName: string;
  accountTitle: string;
}

interface TableCaptionProps {
  selectedValuess: SelectedValues;
  onSelectedValuesChange: (branchName: string, accountTitle: string) => void;
}
const { useToken } = theme;
const GeneralLedgerTables: React.FC<TableCaptionProps> = ({ selectedValuess, onSelectedValuesChange }) => {
  const { t } = useTranslation();
  const { data, refetch, isError, isLoading, isFetching } = useGetGeneralLedgerDetail();

  const {
    token: { colorPrimary },
  } = theme.useToken();
  const { branchName, accountTitle } = selectedValuess;

  return (
    <>
      <i>
        <Space
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '17px',
          }}
        >
          {`${branchName} - ${accountTitle}`}
        </Space>
      </i>

      <AntTable
        refetch={refetch}
        isError={isError}
        columns={DetailTableColumns(t)}
        numberOfSkeletons={12}
        isLoading={isLoading || isFetching}
        data={data?.data?.Data?.Result || []}
        scroll={{ x: '', y: convertVhToPixels('62vh') }}
      />
    </>
  );
};
export function GeneralLedgerTableSummaryI() {
  const { t } = useTranslation();
  const {
    data: SummaryI,
    refetch,
    isError: SummaryIError,
    isLoading: SummaryILoading,
    isFetching: SummaryIFetching,
  } = useGetGeneralLedgerSummaryI();

  return (
    <AntTable
      refetch={refetch}
      isError={SummaryIError}
      columns={SummaryITableColumns(t)}
      numberOfSkeletons={12}
      isLoading={SummaryILoading || SummaryIFetching}
      data={SummaryI?.data?.Data?.Result || []}
      scroll={{ x: '', y: convertVhToPixels('62vh') }}
    />
  );
}
export function GeneralLedgerTableSummaryII() {
  const { t } = useTranslation();
  const {
    data: SummaryII,
    refetch,
    isError: SummaryIIError,
    isLoading: SummaryIILoading,
    isFetching: SummaryIIFetching,
  } = useGetGeneralLedgerSummaryII();

  return (
    <AntTable
      refetch={refetch}
      isError={SummaryIIError}
      columns={SummaryIITableColumns(t)}
      numberOfSkeletons={12}
      isLoading={SummaryIILoading || SummaryIIFetching}
      data={SummaryII?.data?.Data?.Result || []}
      scroll={{ x: '', y: convertVhToPixels('62vh') }}
    />
  );
}
export default GeneralLedgerTables;
