import { useAtom } from 'jotai';
import { detailColumns } from './column';
import { Col, Row, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { viewDetailList } from '../../Form/Atom';
import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

function JournalVoucherDetailTable({ refetch, isLoading }: any) {
  const { t } = useTranslation();
  const [viewDetail, setViewDetail] = useAtom(viewDetailList);
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <Row style={{ marginTop: '0.6%' }}>
        <Col span={24}>
          <h2 className="form-heading2" style={{ marginTop: -10 }}>
            {t('detail')}
          </h2>
          <AntTable
            refetch={refetch}
            isLoading={isLoading}
            numberOfSkeletons={4}
            scroll={{ x: '', y: convertVhToPixels('18vh') }}
            data={viewDetail || []}
            columns={detailColumns(t)}
            style={{ marginTop: 0 }}
          />
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
