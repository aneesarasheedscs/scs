import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Col, Row, theme } from 'antd';
import { columns } from './columns';
import { useTranslation } from 'react-i18next';
import { useGetJournalVocherHistory } from '../quries';
import { detailColumns } from './Detailcolumn';
import { useAtom } from 'jotai';
import { viewDetailList } from '../form/Atom';

function JournalVoucherDetailTable() {
  const { t } = useTranslation();
  const { data, isError, isLoading, refetch, isFetching } = useGetJournalVocherHistory();
  const [viewDetail, setViewDetail] = useAtom(viewDetailList);
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <div>
      <Row style={{ marginTop: '0.1%' }}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={20}>
          <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}>
            <h2 className="form-heading3" style={{ marginTop: -10 }}>
              {' '}
              Detail
            </h2>
            <AntTable
              isError={isError}
              numberOfSkeletons={6}
              isLoading={isLoading}
              scroll={{ x: '', y: convertVhToPixels('20vh') }}
              data={viewDetail || []}
              columns={detailColumns(t)}
              style={{ marginTop: 0 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

type TFrom = {
  setSelectedRecordId: (id: number | null) => void;
  setActiveTab: (tab: string) => void;
};

export default JournalVoucherDetailTable;
