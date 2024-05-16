import { Card, Col, Row, Tabs, Pagination, Divider, Form, message, Checkbox } from 'antd';
// import '../Syllabus_Management/SyllabusManagement/Style.css';
import '../../Style.css';

import type { CheckboxChangeEvent } from 'antd/es/checkbox';

function StudentCard2() {
  const cards2 = [
    {
      key: '1',
      code: 'GCSE',
      description: 'Math',
    },
    {
      key: '2',
      code: 'GCSE',
      description: 'Math',
    },
    {
      key: '3',
      code: 'GCSE',
      description: 'Math',
    },
    {
      key: '4',
      code: 'GCSE',
      description: 'Math',
    },
    {
      key: '4',
      code: 'GCSE',
      description: 'Math',
    },
    {
      key: '4',
      code: 'GCSE',
      description: 'Math',
    },
  ];
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div style={{ width: '100%', marginTop: '10%', marginRight: '200px' }}>
      <Card
        style={{
          width: '100%',
          background: 'rgb(250, 250, 250)',
          boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
        }}
      >
        <Row gutter={[16, 16]}>
          {cards2.map((card) => {
            return (
              <Col span={8} xs={{ span: 18 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <Card
                  style={{
                    height: '100%',
                    width: '90%',
                    alignSelf: 'normal',
                    marginLeft: '-30%',
                  }}
                  key={card.key}
                  className="cardSPersonal"
                  bordered={false}
                >
                  <div style={{ width: '110%', marginLeft: -5 }}>
                    <h3 style={{ display: 'flex', justifyContent: 'space-between', marginTop: -16, color: 'purple' }}>
                      AQA
                      <Checkbox className="customCheckboxP" onChange={onChange}></Checkbox>
                    </h3>
                  </div>
                  <p
                    style={{
                      fontSize: '14px',
                      textAlign: 'center',
                      marginTop: 10,
                    }}
                  >
                    {card.code}
                  </p>
                  <p
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '16px',
                    }}
                  >
                    {card.description}
                  </p>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Card>
    </div>
  );
}

export default StudentCard2;
