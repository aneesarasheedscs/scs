import { AntButton, AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { columns } from './columns';

function ShiftTable() {
  const { t } = useTranslation();
  return (
    <>
      <Card style={{ border: 'none' }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Col span={24}>
            <h2>{t('history')}</h2>
          </Col>
          <br />

          <Col span={24}>
            <Card
              style={{
                border: 'none',
                boxShadow: 'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px',
                textAlign: 'left',
              }}
            >
              {' '}
              <AntTable numberOfSkeletons={12} scroll={{ x: '', y: convertVhToPixels('18vh') }} columns={columns(t)} />
            </Card>
          </Col>
        </Col>
      </Card>
    </>
  );
}

export default ShiftTable;
