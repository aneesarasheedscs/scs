import { Col, Row, Tabs } from 'antd';
import '../Syllabus_Management/SyllabusManagement/Style.css';
import Class from './Class/Class';
import ClassDivision from './ClassDivision/ClassDivision';
import ClassSyllabus from './ClassSyllabus/ClassSyllabus';
const ClassManagement = () => (
  <div className="responsive-card " style={{ marginLeft: '3%' }}>
    <Row gutter={12}>
      <Col span={12}>
        <Tabs
          defaultActiveKey="tab1"
          // style={{ height: 220, width: 1100, marginLeft: 20 }}
        >
          <Tabs.TabPane tab="Classes" key="tab1">
            <Class />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Class Division" key="tab2">
            <ClassDivision />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Class Syllabus" key="tab3">
            <ClassSyllabus />
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  </div>
);

export default ClassManagement;
