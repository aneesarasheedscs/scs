import { Card, Input, Form, message, Row, Col, Divider } from 'antd';
import '../SyllabusManagement/Style.css';
import { AntButton } from '@revisionary/components';
import { AntCard } from '../../Component/AntCard';
import { useState } from 'react';
import { useGetSubjectCategories } from '../queries';
import UpdateSubjectCategoryRecord from './UpdateSubjectCategoryRecord';

function SubjectCatagory() {
  const { data: cards2, isError, isLoading } = useGetSubjectCategories();

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

  const [form] = Form.useForm();

  return (
    <div className="card-containertab">
      <Card className="cardContainer responsive-card ">
        <h1 className="h1">Subject Catagory</h1>
        <Divider />
        <Row
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <AntButton
            ghost
            label="ADD"
            htmlType="submit"
            size="large"
            className="addbutton"
            onClick={(item: any) => handleOpen(item.subjectCategoryId)}
          />
        </Row>

        <div className="card-container2">
          <AntCard data={cards2?.data?.apiData} isLoading={isLoading} isError={isError}>
            <Row gutter={[10, 10]}>
              {cards2?.data?.apiData.map((item: any) => (
                <Col xs={24} sm={12} md={8} lg={6} key={item.subjectCategoryId}>
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
