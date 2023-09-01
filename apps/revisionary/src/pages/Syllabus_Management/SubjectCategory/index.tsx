import { Card, Input, Form, message, Row, Col, Divider } from 'antd';
import '../SyllabusManagement/Style.css';
import { AntButton } from '@revisionary/components';
import { AntCard } from '../../Component/AntCard';
import { useState } from 'react';
import { useGetSubjectCategories } from '../queries';
import UpdateSubjectCategoryRecord from './UpdateSubjectCategoryRecord';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  return (
    <div className="card-containertab">
      <Card className="cardContainer responsive-card ">
        <h1 className="h1">{t('subject_catagory')}</h1>
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
            className="addbutton button-responsive"
            onClick={(item: any) => handleOpen(item.subjectCategoryId)}
          />
        </Row>

        <div className="card-container2">
          <AntCard data={cards2?.data?.apiData} isLoading={isLoading} isError={isError}>
            <Row gutter={[10, 10]}>
              {cards2?.data?.apiData.map((item: any) => (
                <Col xs={24} sm={12.6} md={12} lg={6} key={item.subjectCategoryId}>
                  <AntCard className="cardS inner-cards-responsive" bordered={false}>
                    <div>
                      <p className="paragraph">{item.subjectCategoryCode}</p>
                      <p className="paragraph2">{item.subjectCategoryDescription}</p>
                    </div>
                    <div className="edit-button-container">
                      <AntButton
                        style={{ background: '#00a148' }}
                        label={t('edit')}
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
