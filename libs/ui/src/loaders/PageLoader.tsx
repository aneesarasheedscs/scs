import { Row, Spin } from 'antd';
import LogoImage from './Eccountbook Logo.png';
export function PageLoader() {
  return (
    <Row align="middle" justify="center" style={{ minHeight: '100vh', flexDirection: 'column' }}>
      <img src={LogoImage} alt="" width={'40%'} height={'30%'} />
      <Spin size="large"></Spin>
    </Row>
  );
}
