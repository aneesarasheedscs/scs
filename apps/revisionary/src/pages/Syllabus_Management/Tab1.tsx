import React, { useState } from 'react';
import { Card, Input, Form, message, Row, Col, Divider } from 'antd';
// import { AntButton } from "./Button";
// import { AntButton2 } from "./Button2";
// import { AntButton3 } from "./Button3";
// import { AntButton4 } from "./Button4";
// import "./DTable.css";
import './Style.css';
import { AntButton,  } from '@scs/ui';
import map from 'lodash/map';
import { useSyllabus } from './queries';
import { AntCard } from './queries/AntCard';






interface CardData {
  id: number;
  code: string;
  name: string;
}

function DTab() {
  const { data, isError, isLoading } = useSyllabus();
  const cards1 = [
    {
      key: 1,
      code: 'GCSE AQA ',
      name: 'Assessment and Qualifications Alliance',
    },
    {
      key: 2,
      code: 'EDEXCEL  ',
      name: 'Pearson Edexcel',
    },
    {
      key: 3,
      code: 'GCSE OCR',
      name: ' Oxford, Cambridge, and RSA Exams',
    },
    {
      key: 4,
      code: 'GCSE CCEA  ',
      name: 'Council for Curriculum and Examinations Assessment',
    },

    {
      key: 5,
      code: 'GCSE CCEA  ',
      name: 'Council for Curriculum and Examinations Assessment',
    },
    {
      key: 6,
      code: 'GCSE CCEA  ',
      name: 'Council for Curriculum and Examinations Assessment',
    },
    {
      key: 7,
      code: 'GCSE CCEA  ',
      name: 'Council for Curriculum and Examinations Assessment',
    },
    {
      key: 8,
      code: 'GCSE CCEA  ',
      name: 'Council for Curriculum and Examinations Assessment',
    },
    {
      key: 9,
      code: 'GCSE CCEA  ',
      name: 'Council for Curriculum and Examinations Assessment',
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
    <div
      className="cards1"
      style={{
        width: '100%',
        marginLeft: '420px',
        marginTop: '40px',
        background: 'rgb(250, 250, 250)',
        boxShadow:
          'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
        padding: '25px',
        borderRadius: '10px',
      }}
    >
      <h1 className="h1">Syllabus Authority / Publisher</h1>
      <Divider />
      <div>
        <Form style={{ marginLeft: '63px' }}>
          <Input
            placeholder="Code"
            value={newCard.code}
            onChange={(e) => handleChange(e, 'code')}
            style={{
              width: '31.6%',
              position: 'relative',
              top: '5px',
              right: '50px',
              height: '40px',
              marginBottom: '30px',
            }}
            className="success"
          />
          <Input
            placeholder="Name"
            value={newCard.name}
            onChange={(e) => handleChange(e, 'name')}
            style={{
              width: '31.6%',
              position: 'relative',
              top: '5px',
              right: '10px',
              height: '40px',
              marginBottom: '30px',
            }}
            className="success"
          />

          <AntButton
            style={{
              width: '12%',
              position: 'relative',
              top: '5px',
              left: '37px',
              background: 'white',
              border: '1px solid rgb(204, 202, 202)',
              color: '#00a148',
            }}
            size="large"
            onClick={handleCancel}
            label="Cancel"
          />
          <AntButton
            style={{
              width: '12%',
              position: 'relative',
              top: '5px',
              left: '93px',
              background: '#00a148',
            }}
            size="large"
            label="Save"
            onClick={handleAddCard}
          />



          
        </Form>
         <div className="card-container">
          <Row gutter={[16, 16]}>
          {/* {data.data.apiData.map((item:any) => (
        <div key={item.syllabusAuthorityId} className="card">
          <h2>{item.syllabusAuthorityCode}</h2>
          <p>{item.syllabusAuthorityName}</p>
   
        </div>
      ))}     */}

 

     <AntCard data={data?.data?.apiData} isLoading={isLoading} isError={isError}  > 
      </AntCard>   


            {cards1.map((card) => {
              return (
                <Col span={8} xs={{ span: 18 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                  <Card
                // data={data?.data?.apiData || []} isLoading={isLoading} isError={isError}
                    style={{ height: '100%', width: '90%', alignSelf:'normal' }}
                    key={card.key}
                    className="card1 card"
                 
                    bordered={false} 
                    
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
                      <p style={{ textAlign: 'center' }}>{card.name}</p>
                    </div>
                    
                      <AntButton 
                        style={{
                          background: '#00a148',
                          position: 'relative',
                          top: '10px',
                          left: '80px',
                          marginTop: 'auto',
                          alignSelf:'flex-start'
                        }}
                        label="Edit"
                      />
                    
                  </Card>
                </Col>
              );
            })} 

             {cards.map((card) => {
              return (
                <Col span={8} xs={{ span: 18 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                  <Card  style={{ height: '100%', width: '90%', alignSelf:'normal' }}
                    key={card.id}
                    className="card1"
                    // code="Code :  &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp; Name:&nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp;   Action"
                    bordered={false}
                  >
                    <div>
                      {/* <img
                      src={card.img}
                      style={{ height: "63px", width: "80px" }}
              /> */}
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
                      <p style={{ textAlign: 'center', }}>{card.name}</p>
                    </div>
                    <div>
                      <AntButton style={{ background: '#00a148',textAlign: 'center',
                          
                          position: 'relative',
                          top: '10px',
                          left: '85px',
                          marginTop: 'auto',
                          alignSelf:'flex-start'
                        }} label="Edit" />
                    </div>
                  </Card>
                </Col>
              );
            })}
           
            
          </Row> 
        </div>
        </div>
        </div>
        
      
     
    
    
    
    
  );
};

export default DTab;
