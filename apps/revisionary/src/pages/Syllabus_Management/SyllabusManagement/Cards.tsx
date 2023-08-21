import React from 'react';
import { Col, Row } from 'antd';

interface SubjectCard {
  subject: string;
}

interface DynamicCardsProps {
  subjects: SubjectCard[];
  onSelectSubject: (subject: string) => void;
}

const Cards: React.FC<DynamicCardsProps> = ({ subjects, onSelectSubject }) => {
  return (
    <div style={{ width: '70%', marginLeft: '4%', marginTop: '5%' }}>
      {subjects.map((subject) => (
        <Row gutter={[16, 16]}>
          <Col style={{ marginBottom: '5%' }} xs={{ span: 10 }} sm={{ span: 12 }} lg={{ span: 8 }}>
            <div className="boxesContainer">
              <div className="cardBox">
                <div className="card">
                  <div className="front">
                    <p style={{ marginTop: '1%', fontFamily: 'cursive', fontWeight: 'bold' }}>
                      {subject.subject}
                    </p>
                    {/* </div>
                <div className="back"> */}
                    <h4
                      onClick={() => onSelectSubject(subject.subject)}
                      style={{
                        color: '#00a148',
                        marginTop: '10%',
                        fontFamily: 'Poppins',
                        fontWeight: 'bold',
                        fontSize: '30px',
                        textAlign: 'center',
                      }}
                    >
                      Topics
                    </h4>
                    {/* <h4 style={{color:"white", fontFamily:'cursive',fontWeight:'bold', fontSize:'35px'}}>Sub Topics</h4>  */}
                    <p style={{ color: 'black' }}></p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      ))}
      ;
    </div>
  );
};

export default Cards;
