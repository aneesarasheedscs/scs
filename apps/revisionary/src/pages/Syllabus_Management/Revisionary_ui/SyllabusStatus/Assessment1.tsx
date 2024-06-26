import React, { useState } from 'react';
import { Card, Col, Row, Form, Progress, Divider, Input, Button } from 'antd';

import './Assessment.scss';

const cards = [
  {
    id: '1',
    Subject: 'English',
    relatedCards: [
      {
        id: 1,
        title: 'Topic 1',
        lession: 'lesson 1',
        progress: 50,
        subtopics: [
          { id: 1, title: 'Subtopic 1.1.1' },
          { id: 2, title: 'Subtopic 1.1.2' },
        ],
      },
      {
        id: 2,
        title: 'Topic 2',
        lession: 'lesson',
        progress: 75,
        subtopics: [
          { id: 1013, title: 'Subtopic 1.1.3' },
          { id: 1014, title: 'Subtopic 1.1.4' },
        ],
      },
      { id: 4, title: 'Topic 3', lession: 'lesson', progress: 30 },
      { id: 5, title: 'Topic 4', lession: 'lesson', progress: 20 },
      { id: 6, title: 'Topic 5', lession: 'lesson', progress: 10 },
      { id: 7, title: 'Topic 6', lession: 'lesson', progress: 70 },
      { id: 8, title: 'Topic 7', lession: 'lesson', progress: 100 },
      { id: 9, title: 'Topic 8', lession: 'lesson', progress: 60 },
      { id: 10, title: 'Topic 10', lession: 'lesson', progress: 40 },
    ],
  },
  {
    id: '2',
    Subject: 'Urdu',
    relatedCards: [
      {
        id: 1,
        title: 'Topic 1',
        lession: 'lesson 1',
        progress: 100,
        subtopic: [{ subtopic: 'dsdfds' }],
      },
      { id: 2, title: 'Topic 2', lession: 'lesson', progress: 75 },
      { id: 4, title: 'Topic 3', lession: 'lesson', progress: 30 },
      { id: 5, title: 'Topic 4', lession: 'lesson', progress: 20 },
      { id: 6, title: 'Topic 5', lession: 'lesson', progress: 10 },
      { id: 7, title: 'Topic 6', lession: 'lesson', progress: 80 },
      { id: 8, title: 'Topic 7', lession: 'lesson', progress: 100 },
      { id: 9, title: 'Topic 8', lession: 'lesson', progress: 60 },
      { id: 10, title: 'Topic 10', lession: 'lesson', progress: 40 },
    ],
  },
  {
    id: '3',
    Subject: 'Math',
    relatedCards: [
      { id: 1, title: 'Topic 1', lession: 'lesson 1', progress: 90 },
      { id: 2, title: 'Topic 2', lession: 'lesson', progress: 75 },
      { id: 4, title: 'Topic 3', lession: 'lesson', progress: 30 },
      { id: 5, title: 'Topic 4', lession: 'lesson', progress: 20 },
      { id: 6, title: 'Topic 5', lession: 'lesson', progress: 60 },
      { id: 7, title: 'Topic 6', lession: 'lesson', progress: 0 },
      { id: 8, title: 'Topic 7', lession: 'lesson', progress: 100 },
      { id: 9, title: 'Topic 8', lession: 'lesson', progress: 60 },
      { id: 10, title: 'Topic 10', lession: 'lesson', progress: 40 },
    ],
  },
  {
    id: '4',
    Subject: 'Islamiyat',
    relatedCards: [
      { id: 1, title: 'Topic 1', lession: 'lesson 1', progress: 50 },
      { id: 2, title: 'Topic 2', lession: 'lesson', progress: 75 },
      { id: 4, title: 'Topic 3', lession: 'lesson', progress: 30 },
      { id: 5, title: 'Topic 4', lession: 'lesson', progress: 20 },
      { id: 6, title: 'Topic 5', lession: 'lesson', progress: 30 },
      { id: 7, title: 'Topic 6', lession: 'lesson', progress: 0 },
      { id: 8, title: 'Topic 7', lession: 'lesson', progress: 100 },
      { id: 9, title: 'Topic 8', lession: 'lesson', progress: 60 },
      { id: 10, title: 'Topic 10', lession: 'lesson', progress: 40 },
    ],
  },
  {
    id: '5',
    Subject: 'Pak.study',
    relatedCards: [
      { id: 1, title: 'Topic 1', lession: 'lesson 1', progress: 50 },
      { id: 2, title: 'Topic 2', lession: 'lesson', progress: 75 },
      { id: 4, title: 'Topic 3', lession: 'lesson', progress: 30 },
      { id: 5, title: 'Topic 4', lession: 'lesson', progress: 20 },
      { id: 6, title: 'Topic 5', lession: 'lesson', progress: 10 },
      { id: 7, title: 'Topic 6', lession: 'lesson', progress: 90 },
      { id: 8, title: 'Topic 7', lession: 'lesson', progress: 100 },
      { id: 9, title: 'Topic 8', lession: 'lesson', progress: 60 },
      { id: 10, title: 'Topic 10', lession: 'lesson', progress: 40 },
    ],
  },
  {
    id: '6',
    Subject: 'Biology',
    relatedCards: [
      { id: 1, title: 'Topic 1', lession: 'lesson 1', progress: 50 },
      { id: 2, title: 'Topic 2', lession: 'lesson', progress: 75 },
      { id: 4, title: 'Topic 3', lession: 'lesson', progress: 30 },
      { id: 5, title: 'Topic 4', lession: 'lesson', progress: 20 },
      { id: 6, title: 'Topic 5', lession: 'lesson', progress: 10 },
      { id: 7, title: 'Topic 6', lession: 'lesson', progress: 0 },
      { id: 8, title: 'Topic 7', lession: 'lesson', progress: 100 },
      { id: 9, title: 'Topic 8', lession: 'lesson', progress: 60 },
      { id: 10, title: 'Topic 10', lession: 'lesson', progress: 40 },
    ],
  },
  {
    id: '7',
    Subject: 'Physics',
    relatedCards: [
      {
        id: 1,
        title: 'Topic 1',
        lession: 'lesson 1',
        progress: 50,
        subtopics: ['Subtopic 1.1', 'Subtopic 1.2'],
      },
      {
        id: 2,
        title: 'Topic 2',
        lession: 'lesson',
        progress: 75,
        subtopics: ['Subtopic 1.1', 'Subtopic 1.2'],
      },
      {
        id: 4,
        title: 'Topic 3',
        lession: 'lesson',
        progress: 30,
        subtopics: ['Subtopic 1.1', 'Subtopic 1.2'],
      },
      { id: 5, title: 'Topic 4', lession: 'lesson', progress: 20 },
      { id: 6, title: 'Topic 5', lession: 'lesson', progress: 10 },
      { id: 7, title: 'Topic 6', lession: 'lesson', progress: 0 },
      { id: 8, title: 'Topic 7', lession: 'lesson', progress: 100 },
      { id: 9, title: 'Topic 8', lession: 'lesson', progress: 60 },
      { id: 10, title: 'Topic 10', lession: 'lesson', progress: 40 },
    ],
  },
  {
    id: '8',
    Subject: 'Chemistery',
    relatedCards: [
      { id: 1, title: 'Topic 1', lession: 'lesson 1', progress: 50 },
      { id: 2, title: 'Topic 2', lession: 'lesson', progress: 75 },
      { id: 4, title: 'Topic 3', lession: 'lesson', progress: 30 },
      { id: 5, title: 'Topic 4', lession: 'lesson', progress: 20 },
      { id: 6, title: 'Topic 5', lession: 'lesson', progress: 10 },
      { id: 7, title: 'Topic 6', lession: 'lesson', progress: 0 },
      { id: 8, title: 'Topic 7', lession: 'lesson', progress: 100 },
      { id: 9, title: 'Topic 8', lession: 'lesson', progress: 60 },
      { id: 10, title: 'Topic 10', lession: 'lesson', progress: 40 },
    ],
  },
  {
    id: '9',
    Subject: 'Geography',
    relatedCards: [
      { id: 1, title: 'Topic 1', lession: 'lesson 1', progress: 50 },
      { id: 2, title: 'Topic 2', lession: 'lesson', progress: 75 },
      { id: 4, title: 'Topic 3', lession: 'lesson', progress: 30 },
      { id: 5, title: 'Topic 4', lession: 'lesson', progress: 20 },
      { id: 6, title: 'Topic 5', lession: 'lesson', progress: 10 },
      { id: 7, title: 'Topic 6', lession: 'lesson', progress: 0 },
      { id: 8, title: 'Topic 7', lession: 'lesson', progress: 100 },
      { id: 9, title: 'Topic 8', lession: 'lesson', progress: 60 },
      { id: 10, title: 'Topic 10', lession: 'lesson', progress: 40 },
    ],
  },
  {
    id: '10',
    Subject: 'Economics',
    relatedCards: [
      { id: 1, title: 'Topic 1', lession: 'lesson 1', progress: 50 },
      { id: 2, title: 'Topic 2', lession: 'lesson', progress: 75 },
      { id: 4, title: 'Topic 3', lession: 'lesson', progress: 30 },
      { id: 5, title: 'Topic 4', lession: 'lesson', progress: 20 },
      { id: 6, title: 'Topic 5', lession: 'lesson', progress: 10 },
      { id: 7, title: 'Topic 6', lession: 'lesson', progress: 0 },
      { id: 8, title: 'Topic 7', lession: 'lesson', progress: 100 },
      { id: 9, title: 'Topic 8', lession: 'lesson', progress: 60 },
      { id: 10, title: 'Topic 10', lession: 'lesson', progress: 40 },
    ],
  },
  {
    id: '11',
    Subject: 'History',
    relatedCards: [
      { id: 1, title: 'Topic 1', lession: 'lesson 1', progress: 50 },
      { id: 2, title: 'Topic 2', lession: 'lesson', progress: 75 },
      { id: 4, title: 'Topic 3', lession: 'lesson', progress: 30 },
      { id: 5, title: 'Topic 4', lession: 'lesson', progress: 20 },
      { id: 6, title: 'Topic 5', lession: 'lesson', progress: 10 },
      { id: 7, title: 'Topic 6', lession: 'lesson', progress: 0 },
      { id: 8, title: 'Topic 7', lession: 'lesson', progress: 100 },
      { id: 9, title: 'Topic 8', lession: 'lesson', progress: 60 },
      { id: 10, title: 'Topic 10', lession: 'lesson', progress: 40 },
    ],
  },
  {
    id: '12',
    Subject: 'Science',
    relatedCards: [
      { id: 1, title: 'Topic 1', lession: 'lesson 1', progress: 50 },
      { id: 2, title: 'Topic 2', lession: 'lesson', progress: 75 },
      { id: 4, title: 'Topic 3', lession: 'lesson', progress: 30 },
      { id: 5, title: 'Topic 4', lession: 'lesson', progress: 20 },
      { id: 6, title: 'Topic 5', lession: 'lesson', progress: 10 },
      { id: 7, title: 'Topic 6', lession: 'lesson', progress: 0 },
      { id: 8, title: 'Topic 7', lession: 'lesson', progress: 100 },
      { id: 9, title: 'Topic 8', lession: 'lesson', progress: 60 },
      { id: 10, title: 'Topic 10', lession: 'lesson', progress: 40 },
    ],
  },
  {
    id: '13',
    Subject: 'Psychology',
    relatedCards: [
      { id: 'related1', title: 'Topic 1', progress: 40 },
      { id: 'related2', title: 'Topic 2', progress: 80 },
    ],
  },
  {
    id: '14',
    Subject: 'computer',
    relatedCards: [
      { id: 'related1', title: 'Topic 1', progress: 40 },
      { id: 'related2', title: 'Topic 2', progress: 80 },
    ],
  },
  {
    id: '15',
    Subject: 'Education',
    relatedCards: [
      { id: 'related1', title: 'Topic 1', progress: 40 },
      { id: 'related2', title: 'Topic 2', progress: 80 },
    ],
  },
  {
    id: '16',
    Subject: 'Drawing',
    relatedCards: [
      { id: 'related1', title: 'Topic 1', progress: 40 },
      { id: 'related2', title: 'Topic 2', progress: 80 },
    ],
  },
];

const mark = [
  {
    key: '1',
    title: 'lession',
    type: 'input',
  },
];

function Assessment1() {
  const [activeCard, setActiveCard] = useState(null);
  const [activeRelatedCard, setActiveRelatedCard] = useState(null);
  const [activeSubtopic, setActiveSubtopic] = useState(null);
  const [enteredMarks, setEnteredMarks] = useState({});
  const [totalMarks, setTotalMarks] = useState(0);

  const handleCardClick = (cardId: any) => {
    setActiveCard(activeCard === cardId ? null : cardId);
    setActiveRelatedCard(null);
  };

  const handleRelatedCardClick = (relatedCardId: any) => {
    setActiveRelatedCard(activeRelatedCard === relatedCardId ? null : relatedCardId);
  };

  const handleSubtopicInputBlur = (subtopicId: any, event: any) => {
    const { value } = event.target;
    setEnteredMarks((prevMarks) => ({ ...prevMarks, [subtopicId]: parseInt(value, 10) || 0 }));
  };

  const handleCalculateTotal = () => {
    const subtopicMarks = Object.values(enteredMarks);
    const calculatedTotal: any = subtopicMarks.reduce((total: any, mark) => total + mark, 0);
    setTotalMarks(calculatedTotal);
  };

  return (
    <div className="assessment" style={{ height: '100hv', padding: 20 }}>
      <Divider orientation="center">
        <h2>Subject</h2>
      </Divider>
      <Row gutter={[16, 16]} style={{ marginTop: '2rem' }}>
        {cards.map((card) => (
          <Col xs={8} xl={3} sm={8} md={6} key={card.id}>
            <Card
              style={{
                width: '100%',
                textAlign: 'center',
                border: '1px solid #00a148',
              }}
              id="singleCard"
              key={card.id}
              onClick={() => handleCardClick(card.id)}
            >
              <h3>{card.Subject}</h3>
            </Card>
          </Col>
        ))}
      </Row>
      <Divider />
      <Row gutter={[24, 24]} style={{ marginTop: '2rem' }}>
        <div className="Topic">
          <h3
            style={{
              backgroundColor: '#00a148',
              borderRadius: '5px',
              color: 'white',
              padding: 10,
              textAlign: 'center',
            }}
          >
            Lesson
          </h3>
          {cards.map((card) => (
            <div key={card.id} className="table">
              {activeCard === card.id && (
                <div>
                  {card.relatedCards.map((relatedCard) => (
                    <div
                      key={relatedCard.id}
                      className={`related-topic ${activeRelatedCard === relatedCard.id ? 'active' : ''}`}
                      onClick={() => handleRelatedCardClick(relatedCard.id)}
                    >
                      <h3>{relatedCard.title}:</h3>
                      {/* <p>{relatedCard.lession}</p> */}
                      <Progress percent={relatedCard.progress} strokeWidth={5} strokeColor="#52c41a" showInfo={false} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <Col xs={16} xl={18} sm={16} md={16}>
          <div className="topicMark">
            <h3
              style={{
                backgroundColor: '#00a148',
                borderRadius: '5px',
                color: 'white',
                padding: 10,
                textAlign: 'center',
              }}
            >
              SubTopic
            </h3>

            <div style={{ padding: '10px', marginTop: '2 %' }}></div>

            {activeRelatedCard && (
              <div className="subtopics">
                {cards.map((card) =>
                  card.relatedCards.map((relatedCard: any) => {
                    if (relatedCard.id === activeRelatedCard && relatedCard.subtopics) {
                      return relatedCard.subtopics.map((subtopic: any) => (
                        <div key={subtopic.id}>
                          <h4>{subtopic.title}</h4>
                          <Input placeholder="Enter Marks" onBlur={(e) => handleSubtopicInputBlur(subtopic.id, e)} />
                        </div>
                      ));
                    }
                    return null;
                  })
                )}
                <br />
                <Button
                  type="primary"
                  onClick={handleCalculateTotal}
                  style={{ width: '100%', backgroundColor: '#00a148' }}
                >
                  Total
                </Button>
                <div style={{ marginTop: '16px' }}>
                  <Progress percent={(totalMarks / 1000) * 100} />
                </div>
                <p>Total Marks: {totalMarks}</p>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Assessment1;
