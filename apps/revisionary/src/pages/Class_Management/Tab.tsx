import { Col, Row, Tabs} from "antd";
import './Tab.css'
import DTab from "./DTab";
import DTab2 from "./DTab2";
import Tab3 from "./Tab3";
import './DTab2.css'
const Tabs2 = () => (
  <div className="responsive-card " style={{marginLeft:'3%'}}>
  <Row gutter={12}>
    <Col span={12}>
      <Tabs
        defaultActiveKey="tab1"
        // style={{ height: 220, width: 1100, marginLeft: 20 }}
      >
        <Tabs.TabPane tab="Classes" key="tab1">
          <DTab/>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Class Division" key="tab2">
          <DTab2 />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Class Syllabus" key="tab3">
          <Tab3 />
          
        </Tabs.TabPane>
      </Tabs>
    </Col>
  </Row>
  </div>
);

export default Tabs2;
