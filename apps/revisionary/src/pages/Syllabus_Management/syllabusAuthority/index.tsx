import { Card, Input, Form, message, Row, Col, Divider } from 'antd';

import '../../Syllabus_Management/SyllabusManagement/Style.css';
import { AntButton, PageLoader } from '@revisionary/components';
import { AntCard } from '../../Component/AntCard';
import { useState } from 'react';
import { useSyllabusAuthority } from '../queries';
import UpdateSyllabusAuthority from './UpdateSyllabusAthority';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  return (
    <div className="card-containertab">
      <Card className="cardContainer responsive-card" style={{ marginLeft: '-200%' }}>
        <h1 className="h1"> {t('syllabus_authority_puslisher')}</h1>
        <Divider />
        <Row
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <AntButton
            ghost
            label={t('add')}
            htmlType="submit"
            size="large"
            onClick={(item: any) => handleOpen(item.syllabusAuthorityId)}
            className="addbutton button-responsive"
          />
        </Row>

        <div className="card-container2">
          <AntCard data={apiResponse?.data?.apiData} isLoading={isLoading} isError={isError}>
            <Row gutter={[10, 10]}>
              {apiResponse?.data?.apiData.map((item: any) => (
                <Col xs={24} sm={12.6} md={12} lg={6} key={item.syllabusAuthorityId}>
                  <AntCard className="cardS inner-cards-responsive" bordered={false}>
                    <div>
                      <p className="paragraph">{item.syllabusAuthorityCode}</p>
                      <p className="paragraph2">{item.syllabusAuthorityName}</p>
                    </div>

                    <div className="edit-button-container">
                      <AntButton
                        style={{ background: '#00a148' }}
                        label={t('edit')}
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
          {/* )} */}
        </div>
      </Card>
    </div>
  );
}
export default SyllabusAuthority;
