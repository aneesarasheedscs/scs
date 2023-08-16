import React, { useState } from 'react';
import { Card, Col, Row, List, Progress, Divider, Input,Button } from 'antd';
import { green } from '@ant-design/colors';
import './SyllabusBooks.css';
import { Link, useNavigate } from 'react-router-dom';


function Assessment() {
  const handleClick=()=>{
    navigate('./SyllabusTopic')
    console.log('dfs');
  }
  const navigate = useNavigate()

  const cards = [
    {
      key: '1',
      Subject: 'English',
    },
    {
      key: '2',
      Subject: 'Urdu',
    },
    {
      key: '3',
      Subject: 'Math',
    },
    {
      key: '4',
      Subject: 'Islamiyat',
    },
    {
      key: '5',
      Subject: 'Pak.study',
    },
    {
      key: '6',
      Subject: 'Biology',
    },
    {
      key: '7',
      Subject: 'Physics',
    },
    {
      key: '8',
      Subject: 'Chemistery',
    },
    {
      key: '9',
      Subject: 'Geography',
    },
    {
      key: '10',
      Subject: 'Economics',
    },
    {
      key: '11',
      Subject: 'History',
    },
    {
      key: '12',
      Subject: 'Science',
    },
    {
      key: '13',
      Subject: 'Psychology',
    },
    {
      key: '14',
      Subject: 'computer',
    },
    {
      key: '15',
      Subject: 'Education',
    },
    {
      key: '16',
      Subject: 'Drawing',
    },
  ];
  
  return (
    <div className="assessment" style={{ height: '100hv', padding: 20 }}>
           <Divider orientation='center' style={{marginTop:'40px'}}><h1>Syllabus Status</h1></Divider>
      <Row gutter={[16, 16]} style={{ marginTop: '  2rem' }}>
        {cards.map((card) => {
          return (
            <Col xs={8} xl={3} sm={8} md={6} key={card.key}>
              <Card
                style={{ width: '100%', textAlign: 'center', border: '1px solid #00A148' }}
                className="singleCard"
                
              >
                <h3>{card.Subject}</h3>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Divider />
      
    
      
    </div>
  );
}
export default Assessment;