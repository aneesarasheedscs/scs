import { Card, Col, Row, Tabs, Pagination, Divider, Form, message, Checkbox } from 'antd';
// import '../Style.css'

import type { CheckboxChangeEvent } from 'antd/es/checkbox';
// interface CardData {
//   id: number;
//   code: string;
//   name: string;
// }
function StudentCard1() {
  const cards2 = [
    {
      key: '1',
      code: 'GCSE',
      description: 'English',
    },
    {
      key: '2',
      code: 'GCSE',
      description: 'English',
    },
    {
      key: '3',
      code: 'GCSE',
      description: 'English',
    },
    {
      key: '4',
      code: 'GCSE',
      description: 'English',
    },
    {
      key: '4',
      code: 'GCSE',
      description: 'English',
    },
    {
      key: '4',
      code: 'GCSE',
      description: 'English',
    },
    {
      key: '4',
      code: 'GCSE',
      description: 'English',
    },
    {
      key: '4',
      code: 'GCSE',
      description: 'English',
    },
  ];
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div style={{ width: '100%', marginTop: '10%', marginRight: '200px' }}>
      <Card
        style={{
          width: '150%',
          //   marginLeft: '390px',
          //   marginTop: '40px',
          background: 'rgb(250, 250, 250)',
          boxShadow:
            'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
        }}
      >
        <div className="card-container">
          <Row gutter={[16, 16]}>
            {cards2.map((card) => {
              return (
                <Col span={8} xs={{ span: 18 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                  <Card
                    style={{ height: '100%', width: '90%', alignSelf: 'normal' }}
                    key={card.key}
                    className="cardS"
                    bordered={false}
                  >
                    <div>
                      <div
                        style={{
                          background: '#1e8045',
                          color: 'white',
                          height: '2rem',
                          width: '50%',
                          position: 'relative',
                          top: '-1.4rem',
                          left: '-3%',
                          borderBottomLeftRadius: '16px',
                          borderBottomRightRadius: '16px',
                        }}
                      >
                        <p style={{ paddingTop: '4%', fontSize: '13px', marginLeft: '1.2rem' }}>
                          Pearson Edexel
                        </p>
                        <div style={{ position: 'relative', left: '201.7%', top: '-1.4rem' }}>
                          <Checkbox className="customCheckbox" onChange={onChange}></Checkbox>
                        </div>
                      </div>
                      <p
                        style={{
                          // fontWeight: 'bold',
                          fontSize: '14px',
                          // lineHeight: '5px',
                          position: 'relative',
                          bottom: '-19px',
                          textAlign: 'left',
                        }}
                      >
                        {card.code}
                      </p>
                      <p
                        style={{
                          textAlign: 'left',
                          position: 'relative',
                          bottom: '-19px',
                          fontWeight: 'bold',
                          fontSize: '16px',
                        }}
                      >
                        {card.description}
                      </p>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </Card>
    </div>
  );
}

export default StudentCard1;
