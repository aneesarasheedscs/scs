import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Col, Row, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { viewDetailList } from '../../Form/Atom';
import { useGetJournalVocherHistory } from '../../quries';
import { detailColumns } from './column';

function JournalVoucherDetailTable() {
  const { t } = useTranslation();
  // const { data, isError, isLoading, refetch, isFetching } = useGetJournalVocherHistory();
  const [viewDetail, setViewDetail] = useAtom(viewDetailList);
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <Row style={{ marginTop: '0.6%' }}>
        <Col span={24}>
          {/* <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}> */}
          <h2 className="form-heading2" style={{ marginTop: -10 }}>
            {t('detail')}
          </h2>
          <AntTable
            // isError={isError}
            numberOfSkeletons={4}
            // isLoading={isLoading}
            scroll={{ x: '', y: convertVhToPixels('18vh') }}
            data={viewDetail || []}
            columns={detailColumns(t)}
            style={{ marginTop: 0 }}
          />
          {/* </Card> */}
        </Col>
      </Row>
    </>
  );
}

type TFrom = {
  setSelectedRecordId: (id: number | null) => void;
  setActiveTab: (tab: string) => void;
};

export default JournalVoucherDetailTable;
