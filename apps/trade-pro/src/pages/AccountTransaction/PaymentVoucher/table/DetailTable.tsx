import { useAtom } from 'jotai';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { viewDetailList } from '../form/Atom';
import { detailColumns } from './Detailcolumn';
import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

function PaymentVoucherDetailTable({ refetch, isLoading }: TEVHistory) {
  const { t } = useTranslation();
  const [viewDetail, setViewDetail] = useAtom(viewDetailList);

  return (
    <>
      <Row>
        <Col span={24}>
          <h2 className="form-heading2">{t('detail')}</h2>
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
type TEVHistory = {
  refetch: () => void;
  isLoading: boolean;
};
export default PaymentVoucherDetailTable;
