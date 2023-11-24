import { Row, Spin } from "antd";

function PageLoader() {
  return (
    <Row
      align="middle"
      justify="center"
      style={{ minHeight: "100vh", flexDirection: "column" }}
    >
      <Spin tip="Loading" size="large"></Spin>
    </Row>
  );
}

export default PageLoader;
