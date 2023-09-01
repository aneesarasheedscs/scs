import { Card, Col, Row, Checkbox, Select, Form } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useGetClassSyllabus } from '../../ClassDivision/queries';
function ClassSubjectTopic() {
  const { data: cards2, isError, isLoading } = useGetClassSyllabus();
  const inputStyle = {
    border: 'none',
    borderBottom: '1px solid #00a148',
    width: '70%',
    marginTop: '1.6rem',
    marginLeft: '17%',
  };
  return (
    <div>
      {isLoading ? (
        <p>Loading......</p>
      ) : (
        <div className="card-container" style={{ marginLeft: '14px' }}>
          <Row gutter={[16, 16]}>
            {cards2?.data?.apiData.map((item: any) => (
              <Col span={8} xs={{ span: 18 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <Card key={item.subjectListId} className="cardS classCard" bordered={false}>
                  <div>
                    <div className="card-header">
                      <p className="card-header-text">Syllabus Topic</p>
                    </div>

                    <p className="card-description" style={{ marginTop: '-1rem', textAlign: 'center' }}>
                      {item.subjectName}
                    </p>
                    <Select
                      size="middle"
                      className="custom-select"
                      style={{ ...inputStyle }}
                      placeholder="Class"
                      bordered={false}
                    />
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

export default ClassSubjectTopic;
