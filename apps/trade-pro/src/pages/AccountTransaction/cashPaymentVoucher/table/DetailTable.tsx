import { AntTable } from '@tradePro/components';
import { Card, Col, Row, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { viewDetailList } from '../form/Atom';
import { detailColumns } from './DetailColumn';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

function CashPaymentDetailTable({ refetch, isLoadingDetail }: any) {
  const { t } = useTranslation();
  const [viewDetail, setViewDetail] = useAtom(viewDetailList);
  console.log(viewDetail);
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <Row style={{ marginTop: '0%' }}>
        <Col span={24}>
          <h2 className="form-heading2"> {t('detail')}</h2>
          <AntTable
            refetch={refetch}
            isLoading={isLoadingDetail}
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

export default CashPaymentDetailTable;
