import { Row, Spin } from 'antd';

export function PageLoader() {
  return (
    <Row align="middle" justify="center" style={{ minHeight: '100vh', flexDirection: 'column' }}>
      <Spin size="large"></Spin>
    </Row>
  );
}
