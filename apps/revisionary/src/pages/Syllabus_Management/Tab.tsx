import { Col, Row, Tabs} from "antd";
import './Style.css'
import DTab from "./Tab1";
import Tab2 from "./Tab2";
import Table2 from "./Table";
import StudentProfile from "./Table";
import SubjectTopics1 from "./SubjectTopics";
import SubjectList from "./subjectList";





// import DTab2 from "./DTab2";
// import Tab3 from "./Tab3";
// import Table2 from "./Table2";
const Tab: React.FC = () => (
  <div className="full-page-tabs-container" style={{marginLeft:'3%'}}>
   <Row gutter={12}>
    <Col span={12}> 
      <Tabs
      className="full-page-tabs"
        defaultActiveKey="tab1"
      >
        <Tabs.TabPane tab="Syllabus Authority / Publisher" key="tab1">
          <DTab />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Subject Catagory" key="tab2">
        <Tab2 />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Subject List" key="tab3">
          {/* <StudentProfile /> */}
          <SubjectList/>
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
