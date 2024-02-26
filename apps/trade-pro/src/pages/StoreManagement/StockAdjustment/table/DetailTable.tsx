import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Col, Row, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { detailColumns } from './Detailcolumn';
import { TStockAdjustment } from '../types';

function StockAdjustmentDetailTable({ stockAdjustmentDetail, isDataLoadingDetail, refetchDetail }: THistoryProps) {
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
            data={stockAdjustmentDetail?.InvStockAdjustmentDetailslist || []}
            columns={detailColumns(t)}
            style={{ marginTop: 0 }}
          />
        </Col>
      </Row>
    </div>
  );
}

type THistoryProps = {
  stockAdjustmentDetail: TStockAdjustment;
  isDataLoadingDetail: boolean;
  refetchDetail: () => void;
};

export default StockAdjustmentDetailTable;
