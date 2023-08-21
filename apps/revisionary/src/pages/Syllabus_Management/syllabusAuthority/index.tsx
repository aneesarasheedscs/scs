import { Card, Input, Form, message, Row, Col, Divider } from 'antd';
import './Style.css';
import { AntButton } from '@scs/ui'; // Assuming this is the correct import
// import { useSyllabus } from './queries';
import { AntCard } from '../../Component/AntCard';
import { useState } from 'react';
import AddUpdateRecord from '../SubjectCategory/UpdateSubjectCategoryRecord';
import { useSyllabusAuthority } from '../queries';
import UpdateSyllabusAuthority from './UpdateSyllabusAthority';
import InputForm from '@revisionary/pages/Component/InputForm';

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
    <div className="card-container" style={{ width: '120%' }}>
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
          <AntCard data={apiResponse?.data?.apiData} isLoading={isLoading} isError={isError}>
            <Row gutter={[10, 10]}>
              {apiResponse?.data?.apiData.map((item: any) => (
                <Col span={8} key={item.syllabusAuthorityId}>
                  <AntCard className="cardS card" bordered={false}>
                    <div>
                      <p className="paragraph">{item.syllabusAuthorityCode}</p>
                      <p className="paragraph2">{item.syllabusAuthorityName}</p>
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
          </AntCard>
        </div>
      </Card>
    </div>
  );
}
export default SyllabusAuthority;
