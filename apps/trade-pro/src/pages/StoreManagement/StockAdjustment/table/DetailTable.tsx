import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Col, Row, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { detailColumns } from './Detailcolumn';
import { TRequisitionOrder } from '../types';

function StockAdjustmentDetailTable({ requisitionDetail, isDataLoadingDetail, refetchDetail }: THistoryProps) {
  const { t } = useTranslation();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <div>
      <Row style={{ marginTop: '0.1%' }}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={24}>
          <h2 className="form-heading2">{t('detail')}</h2>
          <AntTable
            refetch={refetchDetail}
            isLoading={isDataLoadingDetail}
            numberOfSkeletons={4}
            scroll={{ x: '', y: convertVhToPixels('15vh') }}
            data={requisitionDetail?.WsRmRequisitionPoDetailsList || []}
            columns={detailColumns(t)}
            style={{ marginTop: 0 }}
          />
        </Col>
      </Row>
    </div>
  );
}

type THistoryProps = {
  requisitionDetail: TRequisitionOrder;
  isDataLoadingDetail: boolean;
  refetchDetail: () => void;
};

export default StockAdjustmentDetailTable;
