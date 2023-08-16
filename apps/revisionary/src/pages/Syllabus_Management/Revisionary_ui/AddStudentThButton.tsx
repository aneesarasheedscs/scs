


import { Card, Col, Row } from 'antd';

import React, { useState } from 'react'
import { AntButton } from '@scs/ui';
import StudentCard1 from './StudentCard1';
import StudentCard2 from './StudentCard2';
export function AddStudentThButton1() {
   
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
    <div style={{marginTop:'45%', marginLeft:'-210px'}}>
      <AntButton
              onClick={handleButtonClick1}
              label="Personal Edexcel"
              style={{
                
                width: '10rem',
                borderRadius: '16px',
                boxShadow: 'none',
                // height: '2rem',
                position: 'relative',
                top: '-2143px',
                left: '1060px',
                marginBottom: '5%',
              }}
            />
            <div
              style={{
                marginLeft: '220px',
                width: '40%',
                flex: 1,
                position: 'relative',
                left: '25rem',
                marginTop:'-2280px'
              }}
            >
              {showStudentCard1 && <StudentCard1/>}
            </div>
            
            <AntButton
              onClick={handleButtonClick2}
              label="AQA"
              style={{
               
                width: '10rem',
                borderRadius: '16px',
                boxShadow: 'none',
                // height: '2rem',
                marginLeft: '10%',
                position: 'absolute',
                top: '155px',
                left: '880px',
              }}
            />
            <div
               style={{
                marginLeft: '220px',
                width: '40%',
                flex: 1,
                position: 'relative',
                left: '25rem',
                marginTop:'-900px'
              }}
            >
              {showStudentCard2 && <StudentCard2/>}
            </div>
    
    </div>
  )
}





