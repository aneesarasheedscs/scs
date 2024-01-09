import { isNumber } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SaveOutlined, FileAddOutlined } from '@ant-design/icons';
import { Checkbox, Col, DatePicker, Divider, Form, Row, Table, Typography } from 'antd';
import { AntButton, AntInput, AntSelectDynamic, SearchCriteriaWrapper } from '@tradePro/components';
import DepartmentTable from './table/sectionTable';
import SectionTable from './table/sectionTable';
import LocationTable from './table/sectionTable';
import { AddButtonforItems } from '../definitionScreens/AddButtonforItems';

const { useForm, useWatch } = Form;

function LocationForm() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [form] = useForm<any>();
  const [selectedRecordId, setSelectedRecordId] = useState<number>();

  const formValues = useWatch<any>([], form);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFinish = (values: any | any) => {};

  return (
    <AddButtonforItems open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <h2 style={{ marginBottom: 20 }}>{t('define_location')} </h2>
      <Divider></Divider>

      <Form
        form={form}
        layout="horizontal"
        onFinish={handleFinish}
        initialValues={{ remember: true }}
        style={{ width: '100%' }}
      >
        <Row gutter={[10, 10]} style={{ marginLeft: '3%' }}>
          <Col xs={24} sm={24} md={{ span: 7 }} className="formfield">
            <AntInput name="Equivalent" label={t('location_name')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={{ span: 7, offset: 1 }} className="formfield">
            <AntInput name="Equivalent" label={t('location_short_name')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={{ span: 7, offset: 1 }} className="formfield">
            <AntInput name="Equivalent" label={t('sub_location__name')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={{ span: 7, offset: 0 }} className="formfield">
            <AntInput name="Equivalent" label={t('location_email')} bordered={false} />
          </Col>
          <Col xs={24} sm={24} md={{ span: 7, offset: 1 }} className="formfield">
            <AntSelectDynamic
              fieldLabel=""
              fieldValue=""
              name="Equivalent"
              label={t('location_type')}
              bordered={false}
            />
          </Col>
          <Col xs={24} sm={24} md={{ span: 7, offset: 1 }} className="formfield">
            <AntInput name="Equivalent" label={t('mobile_1')} bordered={false} />
          </Col>
          <Col xs={24} sm={24} md={{ span: 7, offset: 0 }} className="formfield">
            <AntInput name="Equivalent" label={t('mobile_2')} bordered={false} />
          </Col>
          <Col xs={24} sm={24} md={{ span: 7, offset: 1 }} className="formfield">
            <AntInput name="Equivalent" label={t('portal_url')} bordered={false} />
          </Col>
          <Col xs={24} sm={24} md={{ span: 7, offset: 1 }} className="formfield">
            <AntInput name="Equivalent" label={t('license_no')} bordered={false} />
          </Col>
          <Col xs={24} sm={24} md={{ span: 6, offset: 0 }} className="formfield">
            <AntInput name="Equivalent" label={t('address_detail')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={4} offset={10}>
            <AntButton
              label={t('cancel')}
              htmlType="submit"
              className="fullWidth"
              style={{ marginTop: 20, marginRight: 0 }}
            />
          </Col>
          <Col xs={24} sm={24} md={4}>
            <AntButton
              label={isNumber(selectedRecordId) ? t('update') : t('save')}
              icon={<SaveOutlined />}
              htmlType="submit"
              className="fullWidth"
              style={{ marginTop: 20, marginRight: 0 }}
            />
          </Col>
        </Row>
      </Form>
      <br />

      <LocationTable />
    </AddButtonforItems>
  );
}

export default LocationForm;
