import { Card, Input, Form, message, Row, Col, Divider } from 'antd';
import '../Style.css';
import { AntButton } from '@revisionary/components'; // Assuming this is the correct import
// import { useSyllabus } from './queries';
// import { AntCard } from './Component/AntCard';
import { useState } from 'react';
import { useGetClassDivisions } from '../Queries';
import { AntCard } from '../../Component/AntCard';
import AddUpdateRecord from '../Class/UpdateClassRecord';
import AddUpdateClassDivision from './UpdateClassDivision';
import InputForm from '@revisionary/pages/Component/InputForm';

interface CardData {
  id: number;
  code: string;
  name: string;
}
function ClassDivision() {
  const { data: apiResponse, isError, isLoading } = useGetClassDivisions();
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
    <div className="cardcontainer">
      <Card className="cardContainer">
        <h1 className="h1">Syllabus Authority / Publisher</h1>
        <Divider />
        <Form>
          <Row>
            <Col>
              <Row gutter={100}>
                <Col>
                  <InputForm />
                </Col>
                <Col>
                  <AntButton size="large" label="Cancel" htmlType="submit" />
                </Col>
                <Col>
                  <AntButton ghost label="Save" htmlType="submit" size="large" />
                </Col>
              </Row>
            </Col>
          </Row>
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
                <Col span={8} key={item.classSubDivisionId}>
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
                        {item.className}
                      </p>
                      <p style={{ textAlign: 'center' }}>{item.divisionDescription}</p>
                    </div>

                    <div className="edit-button-container">
                      <AntButton
                        style={{ background: '#00a148' }}
                        label="Edit"
                        onClick={() => handleOpen(item.classSubDivisionId)}
                      />
                    </div>
                  </AntCard>
                </Col>
              ))}
            </Row>
            <AddUpdateClassDivision
              open={open}
              form={form}
              handleClose={handleClose}
              selectedRecordId={selectedRecordId}
              isClassLoading={false}
              classData={[]}
            />
          </AntCard>
        </div>
      </Card>
    </div>
  );
}
export default ClassDivision;
