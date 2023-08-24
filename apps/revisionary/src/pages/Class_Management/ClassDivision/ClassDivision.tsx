import { Card, Form, Row, Col, Divider } from 'antd';
import '../../Syllabus_Management/SyllabusManagement/Style.css';
import { AntButton } from '@revisionary/components';
import { useState } from 'react';
import { useGetClassDivisions } from '../Queries';
import { AntCard } from '../../Component/AntCard';
import AddUpdateClassDivision from './UpdateClassDivision';

function ClassDivision() {
  const { data: apiResponse, isError, isLoading } = useGetClassDivisions();

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
        <h1 className="h1">ClassDivision</h1>
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
            size="large"
            onClick={(item: any) => handleOpen(item.classSubDivisionId)}
            className="addbutton"
          />
        </Row>
        <div className="card-container2">
          <AntCard data={apiResponse?.data?.apiData} isLoading={isLoading} isError={isError}>
            <Row gutter={[10, 10]}>
              {apiResponse?.data?.apiData.map((item: any) => (
                <Col xs={24} sm={12} md={8} lg={6} key={item.classSubDivisionId}>
                  <AntCard className="cardS card" bordered={false}>
                    <div>
                      <p className="paragraph">{item.className}</p>
                      <p className="paragraph2">{item.divisionDescription}</p>
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
              classData={apiResponse?.data?.apiData || []}
            />
          </AntCard>
        </div>
      </Card>
    </div>
  );
}
export default ClassDivision;
