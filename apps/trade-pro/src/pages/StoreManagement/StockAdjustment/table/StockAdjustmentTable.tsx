import { AntButton } from '@tradePro/components';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

function StockAdjustmentTable() {
  const { t } = useTranslation();
  return (
    <div>
      <Row>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
          xxl={{ span: 24 }}
          xl={{ span: 24 }}
        >
          <h2 style={{ marginLeft: '0.5%' }}>
            <Row gutter={10}>
              <div style={{ display: 'flex' }}>
                <AntButton label={t('grid_view')} className="btn" />
                <AntButton label={t('card_view')} className="btn" style={{ marginLeft: '2%' }} />
              </div>
            </Row>
          </h2>
        </Col>
      </Row>
    </div>
  );
}

export default StockAdjustmentTable;
