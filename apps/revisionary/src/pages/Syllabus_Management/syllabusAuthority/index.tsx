import { Card, Input, Form, message, Row, Col, Divider } from 'antd';

import '../../Syllabus_Management/SyllabusManagement/Style.css';
import { AntButton } from '@revisionary/components';
import { AntCard } from '../../Component/AntCard';
import { useState } from 'react';
import { useSyllabusAuthority } from '../queries';
import UpdateSyllabusAuthority from './UpdateSyllabusAthority';

function SyllabusAuthority() {
  const { data: apiResponse, isError, isLoading } = useSyllabusAuthority();

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
            onClick={(item: any) => handleOpen(item.syllabusAuthorityId)}
            className="addbutton"
          />
        </Row>

        <div className="card-container2">
          <AntCard data={apiResponse?.data?.apiData} isLoading={isLoading} isError={isError}>
            <Row gutter={[10, 10]}>
              {apiResponse?.data?.apiData.map((item: any) => (
                <Col xs={24} sm={12} md={8} lg={6} key={item.syllabusAuthorityId}>
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
