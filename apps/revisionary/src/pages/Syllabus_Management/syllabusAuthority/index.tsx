import { Card, Input, Form, message, Row, Col, Divider } from 'antd';
import './Style.css';
import { AntButton } from '@scs/ui'; // Assuming this is the correct import
// import { useSyllabus } from './queries';
import { AntCard } from '../../Component/AntCard';
import { useState } from 'react';
import AddUpdateRecord from '../SubjectCategory/UpdateSubjectCategoryRecord';
import { useSyllabusAuthority } from '../queries';
import UpdateSyllabusAuthority from './UpdateSyllabusAthority';

interface CardData {
  id: number;
  code: string;
  name: string;
}
function SyllabusAuthority() {
  const { data: apiResponse, isError, isLoading } = useSyllabusAuthority();
  const [cards, setCards] = useState<CardData[]>([]);
  const [newCard, setNewCard] = useState<CardData>({
    id: 1,
    code: '',
    name: '',
  });
  const [open, setOpen] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<number>();

  const handleOpen = (id?: number) => {
    setOpen(true);
    setSelectedRecordId(id);
  };

  const handleClose = () => {
    setOpen(false);
    form.resetFields();
    setSelectedRecordId(undefined);
  };
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
    <div style={{ width: '120%' }}>
      <Card
        style={{
          width: '100%',
          marginLeft: '300px',
          marginTop: '40px',
          background: 'rgb(250, 250, 250)',
          boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
        }}
      >
        <h1 className="h1">Syllabus Authority / Publisher</h1>
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
          <AntCard
            data={apiResponse?.data?.apiData}
            isLoading={isLoading}
            isError={isError}
            style={{ width: '100%' }}
          >
            <Row gutter={[10, 10]} style={{ width: '100%' }}>
              {apiResponse?.data?.apiData.map((item: any) => (
                <Col span={8} key={item.syllabusAuthorityId}>
                  <AntCard
                    style={{ height: '100%', width: '100%', alignSelf: 'normal' }}
                    className="cardS card"
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
                        {item.syllabusAuthorityCode}
                      </p>
                      <p style={{ textAlign: 'center' }}>{item.syllabusAuthorityName}</p>
                    </div>

                    <div className="edit-button-container">
                      <AntButton
                        style={{ background: '#00a148' }}
                        label="Edit"
                        onClick={() => handleOpen(item.syllabusAuthorityId)}
                      />
                    </div>
                  </AntCard>
                </Col>
              ))}
            </Row>

            <UpdateSyllabusAuthority
              open={open}
              form={form}
              handleClose={handleClose}
              selectedRecordId={selectedRecordId}
            />
            {/* <AddUpdateRecord open={open} form={form} handleClose={handleClose} selectedRecordId={selectedRecordId} /> */}
          </AntCard>
        </div>
      </Card>
    </div>
  );
}
export default SyllabusAuthority;
