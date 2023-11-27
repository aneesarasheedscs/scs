import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Col, Row, theme } from 'antd';
import { columns } from './columns';
import { useTranslation } from 'react-i18next';
import { useGetJournalVocherHistory } from '../../quries';

function JournalVoucherTable({ setSelectedRecordId, setActiveTab }: TFrom) {
  const { t } = useTranslation();
  const { data, isError, isLoading, refetch, isFetching } = useGetJournalVocherHistory();
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <Row style={{}}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={20}>
          <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}>
            <h2 className="form-heading3" style={{ marginTop: -15 }}>
              {' '}
              {t('journal_voucher_history')}{' '}
            </h2>
            <AntTable
              isError={isError}
              numberOfSkeletons={10}
              isLoading={isLoading}
              scroll={{ x: '', y: convertVhToPixels('34vh') }}
              data={data?.data?.Data?.Result || []}
              columns={columns(t, setSelectedRecordId, setActiveTab)}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

type TFrom = {
  setSelectedRecordId: (id: number | null) => void;
  setActiveTab: (tab: string) => void;
};

export default JournalVoucherTable;
