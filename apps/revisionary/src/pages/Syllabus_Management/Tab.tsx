import { Col, Row, Tabs} from "antd";
import './Style.css'
import DTab from "./Tab1";
import Tab2 from "./Tab2";
import Table2 from "./Table";
import StudentProfile from "./Table";
import SubjectTopics1 from "./SubjectTopics";




// import DTab2 from "./DTab2";
// import Tab3 from "./Tab3";
// import Table2 from "./Table2";
const Tab: React.FC = () => (
  <div className="full-page-tabs-container">
   <Row gutter={12}>
    <Col span={12}> 
      <Tabs
      className="full-page-tabs"
        defaultActiveKey="tab1"
      >
        <Tabs.TabPane tab="Syllabus Authority / Publisher Cards" key="tab1">
          <DTab />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Subject Catagory card" key="tab2">
        <Tab2 />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Subject List card" key="tab3">
          <StudentProfile />
          {/* <Table2 /> */}
          {/* <Tab3 /> */}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Subject Topic" key="tab4">
         <SubjectTopics1 />
        </Tabs.TabPane>
      </Tabs>
     </Col>
  </Row> 
  </div>
);

export default Tab;
