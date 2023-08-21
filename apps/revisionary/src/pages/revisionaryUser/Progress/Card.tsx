import { Card, Col, Row } from 'antd';

import React, { useState } from 'react'
interface CardItem {
    key: string;
    Subject: string;
  }
  
  interface AddStudentThButtonProps {
    cards: CardItem[];
    onSubjectClick: (subject: string) => void; // Prop function type
  }
  
  export function AddStudentThButton({ cards, onSubjectClick }: AddStudentThButtonProps) {
    return (
      <div>
        <div style={{ marginTop: '45%' }}>
       
          {cards.map((card) => (
            <Col xs={8} xl={3} sm={8} md={6} key={card.key}>
              <Card
                onClick={() => onSubjectClick(card.Subject)}
                style={{ width: '10rem', textAlign: 'center', border: '1px solid #00A148', cursor: 'pointer' , marginBottom:'0.5rem' }}
                className="singleCard"
              >
                <h3>{card.Subject}</h3>
              </Card>
            </Col>
          ))}
          
          
        </div>
      </div>
    );
  }