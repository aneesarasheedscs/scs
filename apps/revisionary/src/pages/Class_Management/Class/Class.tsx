import { Card, Input, Form, message, Row, Col, Divider } from 'antd';
import '../../Syllabus_Management/SyllabusManagement/Style.css';
import { AntButton } from '@revisionary/components';
import { useState } from 'react';
import { useGetClasses } from '../Queries';
import { AntCard } from '../../Component/AntCard';
import AddUpdateRecord from './UpdateClassRecord';

function Class() {
  const { data: apiResponse, isError, isLoading } = useGetClasses();

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
    <div className="card-container">
      <Card className="cardContainer responsive-card">
        <h1 className="h1">Syllabus Authority / Publisher</h1>
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
            onClick={(item: any) => handleOpen(item.classId)}
            className="addbutton"
          />
        </Row>
        <div className="card-container2">
          <AntCard data={apiResponse?.data?.apiData} isLoading={isLoading} isError={isError}>
            <Row gutter={[10, 10]}>
              {apiResponse?.data?.apiData.map((item: any) => (
                <Col xs={24} sm={12} md={8} lg={6} key={item.classId}>
                  <AntCard className="cardS card" bordered={false}>
                    <div>
                      <p className="paragraph">{item.classCode}</p>
                      <p className="paragraph2">{item.className}</p>
                    </div>

                    <div className="edit-button-container">
                      <AntButton
                        style={{ background: '#00a148' }}
                        label="Edit"
                        onClick={() => handleOpen(item.classId)}
                      />
                    </div>
                  </AntCard>
                </Col>
              ))}
            </Row>
            <AddUpdateRecord
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
export default Class;
