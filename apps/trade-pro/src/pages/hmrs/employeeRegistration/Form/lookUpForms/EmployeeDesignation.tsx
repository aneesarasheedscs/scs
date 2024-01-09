import { useEffect, useState } from 'react';
import { SyncOutlined, SaveOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Form, Row } from 'antd';
import { AntButton, AntInput } from '@tradePro/components';
import { useTranslation } from 'react-i18next';
// import {
//   TAddItemCategory,
//   TAddItemCategoryonUpdate,
//   useAddItemCategory,
//   useGetItemCategoryById,
//   useUpdateItemCategory,
// } from './ItemCategory/queries';
import { AddButtonforItems } from '../AddButtonforItems';
import EmployeeDesignationHistory from './tables/EmployeeDesignationHistory';

function EmployeeDesignation() {
  const { useForm, useWatch } = Form;
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  // const [form] = useForm<TAddItemCategory | TGLAccounts>();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedRecordId, setSelectedRecordId] = useState<number>();

  // const { mutate: addItemCategory } = useAddItemCategory();
  // const { mutate: updateItemCategory, isSuccess } = useUpdateItemCategory(selectedRecordId);

  // const {
  //   data,
  //   refetch,
  //   isSuccess: isDataSuccess,
  //   isLoading: isDataLoading,
  // } = useGetItemCategoryById(selectedRecordId);

  // const onFinish = (values: TAddItemCategory | TGLAccounts | TAddItemCategoryonUpdate) => {
  //   console.log(values);
  //   if (isNumber(selectedRecordId)) {
  //     updateItemCategory(values);
  //   } else {
  //     addItemCategory(values);
  //   }
  // };

  // useEffect(() => {
  //   if (isNumber(selectedRecordId)) {
  //     refetch();
  //   }
  // }, [selectedRecordId]);

  // useEffect(() => {
  //   if (isDataSuccess) {
  //     form.setFieldsValue(data?.data?.Data?.Result);
  //   }
  // }, [isDataSuccess]);

  return (
    <AddButtonforItems open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <h4> {t('employee_information')} </h4>
      <Divider></Divider>

      <h2 style={{ marginBottom: 20 }}> {t('employee_designation')} </h2>
      <Card>
        <Form layout="inline" initialValues={{ remember: true }}>
          <Row gutter={[10, 10]} justify={'space-between'} style={{ width: '100%' }}>
            <Col
              xxl={{ span: 12, offset: 1 }}
              xs={24}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 12, offset: 1 }}
              className="formfield"
            >
              <AntInput name="CategoryCode" label={t('designation_name')} bordered={false} />
            </Col>
          </Row>
          <Row gutter={10} style={{ width: '100%', marginTop: 15 }}>
            <Col xxl={24} xl={24} md={24}>
              <Form.Item>
                <Row gutter={10} justify={'end'}>
                  <Col>
                    <AntButton danger ghost htmlType="reset" label={t('reset')} icon={<SyncOutlined />} />
                  </Col>
                  <Col>
                    <AntButton label={t('save_and_more')} htmlType="submit" />
                  </Col>
                  <Col>
                    <AntButton ghost label={t('save')} htmlType="submit" icon={<SaveOutlined />} />
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <EmployeeDesignationHistory />
    </AddButtonforItems>
  );
}

type TForm = {
  selectedRecordId?: number | null;
  setSelectedRecordId: (id: number | undefined) => void;
};
export default EmployeeDesignation;
