import { Card, Input, Form, message, Row, Col, Divider } from 'antd';
import '../SyllabusManagement/Style.css';
import { AntButton } from '@revisionary/components';
import { AntCard } from '../../Component/AntCard';
import { useEffect, useState } from 'react';
import {
  useAddUpdateSubjectList,
  useGetSubjectCategories,
  useGetSubjectCategoryById,
  useGetSubjectListById,
} from '../queries';
import UpdateSubjectCategoryRecord from './UpdateSubjectCategoryRecord';
import InputForm from '@revisionary/pages/Component/InputForm';
import { TSubjectListFormDataOnAdd, TSubjectListFormDataOnUpdate } from '../queries/types';
import { isNumber } from 'lodash';
import { queryClient } from '@scs/configs';

interface CardData {
  id: number;
  code: string;
  name: string;
}

function SubjectCatagory() {
  const { data: cards2, isError, isLoading } = useGetSubjectCategories();
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
  const { mutate, isSuccess } = useAddUpdateSubjectList(selectedRecordId);
  const { data, refetch, isSuccess: isDataByIdSuccess } = useGetSubjectCategoryById(selectedRecordId);
  const onFinish = (values: TSubjectListFormDataOnAdd | TSubjectListFormDataOnUpdate) => {
    if (isNumber(selectedRecordId)) {
      mutate({ ...values, rowVersion: cards2?.data?.apiData?.rowVersion });
    } else {
      mutate(values);
    }
  };
  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetch();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isDataByIdSuccess) {
      form.setFieldsValue(cards2?.data?.apiData);
    }
  }, [isDataByIdSuccess]);

  return (
    <div style={{ width: '120%' }}>
      <Card className="cardContainer">
        <h1 className="h1">Subject Catagory</h1>
        <Divider />
        <Form onFinish={onFinish}>
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
          <AntCard data={cards2?.data?.apiData} isLoading={isLoading} isError={isError}>
            <Row gutter={[10, 10]}>
              {cards2?.data?.apiData.map((item: any) => (
                <Col span={8} key={item.subjectCategoryId}>
                  <AntCard className="cardS card" bordered={false}>
                    <div>
                      <p className="paragraph">{item.subjectCategoryCode}</p>
                      <p className="paragraph2">{item.subjectCategoryDescription}</p>
                    </div>
                    <div className="edit-button-container">
                      <AntButton
                        style={{ background: '#00a148' }}
                        label="Edit"
                        onClick={() => handleOpen(item.subjectCategoryId)}
                      />
                    </div>
                  </AntCard>
                </Col>
              ))}
            </Row>
            <UpdateSubjectCategoryRecord
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
export default SubjectCatagory;
