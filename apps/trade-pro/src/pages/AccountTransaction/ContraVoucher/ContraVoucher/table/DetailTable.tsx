import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Col, Row, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { detailColumns } from './DetailColumn';
import { viewDetailList } from '../form/Atom';

function ContraVoucherDetailTable({ refetch, isLoading }: TCVHistory) {
  const { t } = useTranslation();
  const [viewDetail, setViewDetail] = useAtom(viewDetailList);
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <Row style={{ marginTop: '0%' }}>
        <Col span={24}>
          <h2 className="form-heading2">{t('detail')}</h2>
          <AntTable
            refetch={refetch}
            isLoading={isLoading}
            numberOfSkeletons={4}
            scroll={{ x: '', y: convertVhToPixels('18vh') }}
            data={viewDetail || []}
            columns={detailColumns(t)}
          />
        </Col>
      </Row>
    </>
  );
}

type TCVHistory = {
  refetch: () => void;
  isLoading: boolean;
};
export default ContraVoucherDetailTable;
