import { Card, Col, Row, Checkbox } from 'antd';
import '../../Syllabus_Management/SyllabusManagement/Style.css';

import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useGetClassSyllabus } from '../ClassDivision/queries';

function StudentSubject() {
  const { data: studentsubject, isError, isLoading } = useGetClassSyllabus();

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div>
      {isLoading ? (
        <p>Loading......</p>
      ) : (
        <div className="card-container" style={{ marginLeft: '14px' }}>
          <Row gutter={[16, 16]}>
            {studentsubject?.data?.apiData.map((item: any) => (
              <Col span={8} xs={24} sm={12.6} md={12} lg={6}>
                <Card key={item.subjectListId} className="cardS classCard" bordered={false}>
                  <div>
                    <div className="card-header">
                      <p className="card-header-text">Syllabus Books</p>
                      <div className="card-checkbox">
                        <Checkbox className="customCheckbox" checked={item.isActive}></Checkbox>
                      </div>
                    </div>

                    <p className="card-description">{item.subjectName}</p>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
}

export default StudentSubject;
