import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Col, Row, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { viewDetailList } from '../form/Atom';
import { detailColumns } from './DetailColumn';

function CashPaymentDetailTable() {
  const { t } = useTranslation();
  const [viewDetail, setViewDetail] = useAtom(viewDetailList);
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <Row style={{ marginTop: '0%' }}>
        <Col span={24}>
          <h2 className="form-heading2"> {t('detail')}</h2>
          <AntTable
            numberOfSkeletons={6}
            scroll={{ x: '', y: convertVhToPixels('20vh') }}
            data={viewDetail || []}
            columns={detailColumns(t)}
            style={{ marginTop: 0 }}
          />
        </Col>
      </Row>
    </>
  );
}

export default CashPaymentDetailTable;
