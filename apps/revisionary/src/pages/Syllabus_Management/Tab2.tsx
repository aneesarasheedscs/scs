import { Card, Col, Row, Tabs, Pagination, Divider, Form, message } from 'antd';

import React, { useState } from 'react';
import { Input } from 'antd';
import { AntButton } from '@scs/ui';

interface CardData {
  id: number;
  code: string;
  name: string;
}
function Tab2() {
  const cards2 = [
    {
      key: '1',
      code: 'ENG',
      description: 'English',
    },
    {
      key: '2',
      code: 'MAT',
      description: 'Math',
    },
    {
      key: '3',
      code: 'BIO',
      description: 'Biology',
    },
    {
      key: '4',
      code: 'CHEM',
      description: 'Chemistry',
    },
    {
      key: '4',
      code: 'PHY',
      description: 'Physics',
    },
    {
      key: '5',
      code: 'COMP',
      description: 'Computer',
    },
  ];
  const [cards, setCards] = useState<CardData[]>([]);
  const [newCard, setNewCard] = useState<CardData>({
    id: 1,
    code: '',
    name: '',
  });

  const handleAddCard = () => {
    if (newCard.code.trim() === '') {
      return message.error('Please Enter Code');
    }
    if (newCard.name.trim() === '') {
      return message.error('Please Enter Name');
    } else {
      message.success('Success');
    }
    setCards((prevCards) => [...prevCards, { ...newCard, id: Date.now() }]);
    setNewCard({
      id: Date.now() + 1,
      code: '',
      name: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof CardData) => {
    const { value } = e.target;
    setNewCard((prevCard) => ({ ...prevCard, [field]: value }));
  };

  const [form] = Form.useForm();
  const handleCancel = () => {
    setNewCard({
      id: Date.now() + 1,
      code: '',
      name: '',
    });
    form.resetFields();
  };

  return (
    <div style={{ width: '100%' }}>
      <Card
        style={{
          width: '100%',
          marginLeft: '390px',
          marginTop: '40px',
          background: 'rgb(250, 250, 250)',
          boxShadow:
            'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
        }}
      >
        <h1 className="h1">Subject Catagory</h1>
        <Divider />
        <Form style={{ marginLeft: '63px' }}>
          <Input
            placeholder="Code"
            style={{
              width: '31.6%',
              position: 'relative',
              top: '5px',
              right: '50px',
              height: '40px',
              marginBottom: '30px',
            }}
            value={newCard.code}
            onChange={(e) => handleChange(e, 'code')}
            className="success"
          />
          <Input
            placeholder="Name"
            style={{
              width: '31.6%',
              position: 'relative',
              top: '5px',
              right: '10px',
              height: '40px',
              marginBottom: '30px',
            }}
            value={newCard.name}
            onChange={(e) => handleChange(e, 'name')}
            className="success"
          />
          <AntButton
            size="large"
            style={{
              width: '12%',
              position: 'relative',
              top: '5px',
              left: '37px',
              background: 'white',
              border: '1px solid rgb(204, 202, 202)',
              color: '#00a148',
            }}
            onClick={handleCancel}
            label="Cancel"
          />
          <AntButton
            size="large"
            style={{
              width: '12%',
              position: 'relative',
              top: '5px',
              left: '93px',
              background: '#00a148',
            }}
            onClick={handleAddCard}
            label="Save"
          />
        </Form>
        <div className="card-container">
          <Row gutter={[16, 16]}>
            {cards2.map((card) => {
              return (
                <Col span={8} xs={{ span: 18 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                  <Card
                    style={{ height: '100%', width: '90%', alignSelf: 'normal' }}
                    key={card.key}
                    className="cardS"
                    // title="Code :  &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp; Name:&nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp;   Action"
                    bordered={false}
                    // style={{ lineHeight:'8px'}}
                  >
                    <div>
                      <p
                        style={{
                          fontWeight: 'bold',
                          fontSize: '16px',
                          lineHeight: '12px',
                          textAlign: 'center',
                        }}
                      >
                        {card.code}
                      </p>
                      <p style={{ textAlign: 'center' }}>{card.description}</p>
                      <AntButton
                        style={{
                          background: '#00a148',
                          position: 'relative',
                          top: '10px',
                          left: '80px',
                          marginTop: 'auto',
                          alignSelf: 'flex-start',
                        }}
                        label="Edit"
                      />
                    </div>
                  </Card>
                </Col>
              );
            })}
            {cards.map((card) => {
              return (
                <Col span={8}>
                  <Card
                    key={card.id}
                    className="cardS"
                    bordered={false}
                  >
                    <div>
                     
                      <p
                        style={{
                          fontWeight: 'bold',
                          fontSize: '16px',
                          lineHeight: '12px',
                        }}
                      >
                        {card.code}
                      </p>
                      <p>{card.name}</p>

                      <AntButton style={{ background: '#00a148' }} label="Edit" />
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

export default Tab2;
