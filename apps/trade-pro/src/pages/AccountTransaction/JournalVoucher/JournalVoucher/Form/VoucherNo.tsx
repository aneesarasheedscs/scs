import { AntButton } from '@tradePro/components';
import { SyncOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Skeleton, theme } from 'antd';
import { useTranslation } from 'react-i18next';

const { useToken } = theme;

function VoucherNo({ data, isError, refetch, isLoading }: TVoucherNo) {
  const { token } = useToken();
  const { t } = useTranslation();

  if (isError)
    return (
      <Row gutter={5} align="middle">
        <Col>
          <Typography.Text type="danger">{t('error')}</Typography.Text>
        </Col>
        <Col>
          <AntButton title="Refetch" type="text" icon={<SyncOutlined />} onClick={refetch} />
        </Col>
      </Row>
    );

  if (isLoading) return <Skeleton.Button active />;

  return <strong style={{ fontSize: 18, color: token.colorPrimary }}>{data}</strong>;
}

type TVoucherNo = { data: number | any; isError: boolean; isLoading: boolean; refetch: VoidFunction };

export default VoucherNo;
