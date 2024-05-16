import { Card, Col, Row } from 'antd';

import React, { useState } from 'react';
import { AntButton } from '@revisionary/components';
import StudentCard2 from './AQA';
import StudentCard1 from './PearsonEdexcel';

export function AddStudentThButton2() {
  const [showStudentCard1, setShowStudentCard1] = useState(false);
  const [showStudentCard2, setShowStudentCard2] = useState(false);

  const handleButtonClick1 = () => {
    setShowStudentCard1(!showStudentCard1);
    setShowStudentCard2(false);
  };

  const handleButtonClick2 = () => {
    setShowStudentCard2(!showStudentCard2);
    setShowStudentCard1(false);
  };
  return (
    <>
      <Card style={{ marginTop: '2%', boxShadow: '2px 2px 12px 1px gray' }}>
        <Row gutter={10}>
          <Col>
            <AntButton
              onClick={handleButtonClick1}
              label="Personal Edexcel"
              style={{
                width: '150px',
                marginRight: 10,
              }}
            />
            <AntButton
              onClick={handleButtonClick2}
              label="AQA"
              style={{
                width: '100px',
              }}
            />
            {showStudentCard1 && <StudentCard1 />}
            {showStudentCard2 && <StudentCard2 />}
          </Col>
        </Row>
      </Card>
    </>
  );
}
