import { Card, Input, Form, message, Row, Col, Divider } from 'antd';
import './Style.css';
import { AntButton } from '@scs/ui'; // Assuming this is the correct import
// import { useSyllabus } from './queries';
import { AntCard } from './queries/AntCard';
import { useState } from 'react';
import { useSyllabus } from './queries';



interface CardData {
  id: number;
  code: string;
  name: string;
}
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
function DTab() {
  const { data: apiResponse, isError, isLoading }= useSyllabus();
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
          <AntCard data={apiResponse?.data?.apiData} isLoading={isLoading} isError={isError}>
        {apiResponse?.data?.apiData.map((item: any) => (
          <Col span={8} key={item.syllabusAuthorityId}>
            <Card
              style={{ height: '100%', width: '90%', alignSelf: 'normal' }}
              className="card1 card"
              bordered={false}
            >
              <div>
                <p style={{ fontWeight: 'bold', fontSize: '16px', lineHeight: '12px', textAlign: 'center' }}>
                  {item.syllabusAuthorityCode}
                </p>
                <p style={{ textAlign: 'center' }}>{item.syllabusAuthorityName}</p>
              </div>

              <AntButton
                style={{ background: '#00a148', position: 'relative', top: '10px', left: '80px', marginTop: 'auto', alignSelf: 'flex-start' }}
                label="Edit"
              />
            </Card>
          </Col>
        ))}
      </AntCard>
            
          </Row>
        </div>
      </Card>
    </div>
  );
}
export default DTab;