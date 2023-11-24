import { Button,Card, Col, Row, Tabs, Pagination } from "antd";
import SubjectTopics from "./SubjectTopics";
import './style.scss'
import CardTable from "../Syllabus_Management/Card-Table";

const Tab = () => (
  
  <Row gutter={12}>
    <Col span={12}>

      <Tabs defaultActiveKey="tab1"     
        style={{ height: 220, width:1400, marginLeft:20 }}> 
      

        <Tabs.TabPane tab="Dynamictables" key="tab9">
          <SubjectTopics/>
        </Tabs.TabPane>

        

      </Tabs>
    </Col>
  </Row>
  
);

export default Tab;