import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Col, Row, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { detailColumns } from './Detailcolumn';

function RequisitionOrderDetailTable({ stockReceivedDetail, isDataLoadingDetail, refetchDetail }: any) {
  const { t } = useTranslation();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <div>
      <Row style={{ marginTop: '0.1%' }}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={24}>
          <h2 className="form-heading3" style={{ marginTop: 0 }}>
            {t('detail')}
          </h2>
          <AntTable
            refetch={refetchDetail}
            isLoading={isDataLoadingDetail}
            numberOfSkeletons={6}
            scroll={{ x: '', y: convertVhToPixels('20vh') }}
            data={stockReceivedDetail?.data?.Data?.Result?.WsRmStockReceivedNotesDetailList || []}
            columns={detailColumns(t)}
            style={{ marginTop: 0 }}
          />
        </Col>
      </Row>
    </div>
  );
}

type TFrom = {
  setSelectedRecordId: (id: number | null) => void;
  setActiveTab: (tab: string) => void;
};

export default RequisitionOrderDetailTable;
