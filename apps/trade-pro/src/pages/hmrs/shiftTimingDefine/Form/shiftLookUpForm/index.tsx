import { isNumber } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SaveOutlined, FileAddOutlined } from '@ant-design/icons';
import { Checkbox, Col, DatePicker, Divider, Form, Row, Table, Typography } from 'antd';
import { AntButton, AntInput, AntSelectDynamic, SearchCriteriaWrapper } from '@tradePro/components';
import { AddButtonforItems } from '../definitionScreens/AddButtonforItems';
import ShiftTable from './table/ShiftTable';

const { useForm, useWatch } = Form;

function ShiftLookUpForm() {
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
      <h2 style={{ marginBottom: 20 }}>{t('define_shift')} </h2>
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
            <AntInput name="Equivalent" label={t('shift_name')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={{ span: 7, offset: 1 }} className="formfield">
            <AntInput name="Equivalent" label={t('short_name')} bordered={false} />
          </Col>

          <Col xs={10} sm={24} md={4} offset={10}>
            <AntButton
              label={t('cancel')}
              htmlType="submit"
              className="fullWidth"
              style={{ marginTop: 20, marginRight: 0 }}
            />
          </Col>
          <Col xs={10} sm={24} md={4}>
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

      <ShiftTable />
    </AddButtonforItems>
  );
}

export default ShiftLookUpForm;
