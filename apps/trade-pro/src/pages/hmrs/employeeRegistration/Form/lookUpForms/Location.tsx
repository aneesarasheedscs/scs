import { useEffect, useState } from 'react';
import { SyncOutlined, SaveOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Form, Row } from 'antd';
import { AntButton, AntInput, AntSelectDynamic } from '@tradePro/components';
import { useTranslation } from 'react-i18next';
// import {
//   TAddItemCategory,
//   TAddItemCategoryonUpdate,
//   useAddItemCategory,
//   useGetItemCategoryById,
//   useUpdateItemCategory,
// } from './ItemCategory/queries';
import { AddButtonforItems } from '../AddButtonforItems';
import LocationHistory from './tables/LocationHistory';

function LocationName() {
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

      <h2 style={{ marginBottom: 20 }}> {t('location_name')}</h2>
      <Card>
        <Form layout="inline" initialValues={{ remember: true }}>
          <Row gutter={[6, 8]} justify={'space-between'} style={{ width: '100%', marginTop: -10 }}>
            <Col
              xxl={{ span: 12, offset: 0 }}
              xs={24}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 12, offset: 1 }}
              className="formfield"
            >
              <AntSelectDynamic
                bordered={false}
                name="RateUOM"
                label={t('location_type')}
                fieldValue="Id"
                fieldLabel="VehicleDescription"
                // query={useGetVehicleType}
                style={{ marginLeft: 18, width: '105%' }}
              />
            </Col>

            <Col
              xxl={{ span: 11, offset: 0 }}
              xl={{ span: 11, offset: 0 }}
              lg={{ span: 11, offset: 0 }}
              xs={24}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 11, offset: 0 }}
              className="formfield"
            >
              <AntInput name="CategoryCode" label={t('location_name')} bordered={false} />
            </Col>
            <Col
              xxl={{ span: 12, offset: 0 }}
              xl={{ span: 12, offset: 0 }}
              lg={{ span: 12, offset: 0 }}
              xs={24}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 12, offset: 0 }}
              className="formfield"
            >
              <AntInput name="CategoryCode" label={t('location_short_name')} bordered={false} />
            </Col>
            <Col
              xxl={{ span: 11, offset: 0 }}
              xl={{ span: 11, offset: 0 }}
              lg={{ span: 11, offset: 0 }}
              xs={24}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 11, offset: 0 }}
              className="formfield"
            >
              <AntInput name="CategoryDescription" label={t('sub_location_name')} bordered={false} />
            </Col>
            <Col
              xxl={{ span: 12, offset: 0 }}
              xl={{ span: 12, offset: 0 }}
              lg={{ span: 12, offset: 0 }}
              xs={24}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 12, offset: 0 }}
              className="formfield"
            >
              <AntInput name="CategoryCode" label={t('mobile_1')} bordered={false} />
            </Col>
            <Col
              xxl={{ span: 11, offset: 0 }}
              xl={{ span: 11, offset: 0 }}
              lg={{ span: 11, offset: 0 }}
              xs={24}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 11, offset: 0 }}
              className="formfield"
            >
              <AntInput name="CategoryCode" label={t('mobile_2')} bordered={false} />
            </Col>
            <Col
              xxl={{ span: 12, offset: 0 }}
              xl={{ span: 12, offset: 0 }}
              lg={{ span: 12, offset: 0 }}
              xs={24}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 12, offset: 0 }}
              className="formfield"
            >
              <AntInput name="CategoryCode" label={t('location_email')} bordered={false} />
            </Col>
            <Col
              xxl={{ span: 11, offset: 0 }}
              xl={{ span: 11, offset: 0 }}
              lg={{ span: 11, offset: 0 }}
              xs={24}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 11, offset: 0 }}
              className="formfield"
            >
              <AntInput name="CategoryCode" label={t('portal_url')} bordered={false} />
            </Col>
            <Col
              xxl={{ span: 12, offset: 0 }}
              xl={{ span: 12, offset: 0 }}
              lg={{ span: 12, offset: 0 }}
              xs={24}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 12, offset: 0 }}
              className="formfield"
            >
              <AntInput name="CategoryCode" label={t('license_no')} bordered={false} />
            </Col>
            <Col
              xxl={{ span: 11, offset: 0 }}
              xl={{ span: 11, offset: 0 }}
              lg={{ span: 11, offset: 0 }}
              xs={24}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 11, offset: 0 }}
              className="formfield"
            >
              <AntInput name="CategoryCode" label={t('address_detail')} bordered={false} />
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
      <LocationHistory />
    </AddButtonforItems>
  );
}

type TForm = {
  selectedRecordId?: number | null;
  setSelectedRecordId: (id: number | undefined) => void;
};
export default LocationName;
