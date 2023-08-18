import React, { useState } from 'react';
import { Card, Col, Row, List, Progress, Divider, Input } from 'antd';
import { green } from '@ant-design/colors';
import '../Style.css';
import {  AddStudentThButton1 } from './AddStudentThButton';



import StudentCard1 from './StudentCard1';
import StudentCard2 from './StudentCard2';
import { AddStudentThButton } from './SyllabusStatus/Progress/Card';
interface CardItem {
  key: string;
  Subject: string;
}
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

function Subject1() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const handleSubjectClick = (subject: string) => {
    setSelectedSubject(subject);
  };

  return (
    <div  style={{ height: '100hv', padding: 20 }}>
      <Divider orientation='center' style={{ marginTop: '30px' }}>
        <h1>Add Subject</h1>
      </Divider>
      <Row gutter={[16, 16]} style={{ marginTop: '-4rem' }}>
       
        <AddStudentThButton cards={cards} onSubjectClick={handleSubjectClick} />
        
      </Row>
      <Divider />
      <div style={{marginRight:'5rem'}}>
        {selectedSubject === 'English' && <AddStudentThButton1 />}
        {selectedSubject === 'Urdu' && <StudentCard2 />}
      </div>
    </div>
  );
}

export default Subject1;