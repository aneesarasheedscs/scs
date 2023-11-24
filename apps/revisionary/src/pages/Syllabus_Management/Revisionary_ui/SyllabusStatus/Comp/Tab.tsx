import { Col, Row, Tabs } from "antd";
import LoginForm from "./LoginForm";
import SignForm from "./SignForm";
import StudentSyllabus from "./StudentSyllabus/StudentSyllabus";

const Tab = () => (
  
  <Row gutter={12}>
    <Col span={12}>

      <Tabs defaultActiveKey="tab1"     
        style={{ height: 220, width:1400, marginLeft:20 }}> 
      
        <Tabs.TabPane tab="Log In" key="tab2">
            <LoginForm/>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Sign Up" key="tab3">
           <SignForm/>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Student Syllabus" key="tab4">
           <StudentSyllabus/>
        </Tabs.TabPane>

        {/* <Tabs.TabPane tab="psycards" key="tab10">
          <PsyCards/>
        </Tabs.TabPane> */}

      </Tabs>
    </Col>
  </Row>
  
);

export default Tab;