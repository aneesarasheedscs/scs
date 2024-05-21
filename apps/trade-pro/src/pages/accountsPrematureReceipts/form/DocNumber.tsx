import { AntButton } from '@tradePro/components';
import { SyncOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Skeleton, theme } from 'antd';

const { useToken } = theme;

function DocNumber({ data, isError, refetch, isLoading }: TDocNumber) {
  const { token } = useToken();

  if (isError)
    return (
      <Row gutter={5} align="middle">
        <Col>
          <Typography.Text type="danger">Error</Typography.Text>
        </Col>
        <Col>
          <AntButton title="Refetch" type="text" icon={<SyncOutlined />} onClick={refetch} />
        </Col>
      </Row>
    );

  if (isLoading) return <Skeleton.Button active />;

  return <strong style={{ fontSize: 18, color: token.colorPrimary }}>{data}</strong>;
}

type TDocNumber = { data: number | string; isError: boolean; isLoading: boolean; refetch: VoidFunction };

export default DocNumber;
