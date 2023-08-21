import { Col, Row, Tabs } from 'antd';
import SubjectList from './subjectList';

import SubjectTopics1 from './SyllabusManagement/SubjectTopics';
import SubjectCatagory from './SubjectCategory/index';
import { useGetSubjectCategories, useSyllabusAuthority } from './queries';
import { useGetClasses } from '../Class_Management/Queries';
import SyllabusAuthority from './syllabusAuthority';
import SyllabusAuthority1 from './syllabusAuthority';

function SyllabusManagement() {
  const { data, isError, isLoading } = useSyllabusAuthority();
  const { data: classData, isLoading: classLoading } = useGetClasses();
  const { data: subjData, isError: subjError, isLoading: subjLoading } = useGetSubjectCategories();
  return (
    <div className="full-page-tabs-container" style={{ marginLeft: '3%' }}>
      <Row gutter={12}>
        <Col span={12}>
          <Tabs defaultActiveKey="tab1">
            <Tabs.TabPane tab="Syllabus Authority / Publisher" key="tab1">
              <SyllabusAuthority />
            </Tabs.TabPane>

            <Tabs.TabPane tab="Subject Catagory" key="tab2">
              <SubjectCatagory />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Subject List" key="tab3">
              <SubjectList
                isClassListLoading={classLoading}
                classList={classData?.data?.apiData || []}
                isSubjectCategoryListLoading={subjLoading}
                isSyllabusAuthorityListLoading={isLoading}
                syllabusAuthorityList={data?.data?.apiData || []}
                subjectCategoryList={subjData?.data?.apiData || []}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Subject Topic" key="tab4">
              <SubjectTopics1 />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
}

export default SyllabusManagement;
