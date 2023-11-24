import { isNumber } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import ItemScheduleUOMTable from './ItemScheduleUnit';
// import { AddButtonforItems } from './AddButtonforItems';
// import { usegetItemNameUOMSchedule } from './queryOptions';
// import { getItemType, getItemUOM } from '../queryOptions';
// import { TItemTypeData, TItemTypeDataonUpdate } from './types';
import { SaveOutlined, FileAddOutlined } from '@ant-design/icons';
import { Checkbox, Col, DatePicker, Divider, Form, Row, Table, Typography } from 'antd';
import { AntButton, AntInput, AntSelectDynamic, SearchCriteriaWrapper } from '@tradePro/components';
import { AddButtonforItems } from '../AddButtonForItems';
import DepartmentTable from './table/sectionTable';
import SectionTable from './table/sectionTable';
// import {
//   TAddScheduleUOM,
//   TAddScheduleUOMonUpdate,
//   useAddScheduleUOM,
//   useGetUOMScheduleById,
//   useUpdateScheduleUOM,
// } from './ItemScheduleUnit/queries';

const { useForm, useWatch } = Form;

function Section() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [form] = useForm<any>();
  const [selectedRecordId, setSelectedRecordId] = useState<number>();

  //   const { mutate: addScheduleUOM } = useAddScheduleUOM();
  //   const { mutate: updateScheduleUOM } = useUpdateScheduleUOM(selectedRecordId);
  //   const { data, refetch, isSuccess: isDataSuccess, isLoading: isDataLoading } = useGetUOMScheduleById(selectedRecordId);
  const formValues = useWatch<any>([], form);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFinish = (values: any | any) => {
    // console.log(values);
    // if (isNumber(selectedRecordId)) {
    //   updateScheduleUOM(values);
    // } else {
    //   addScheduleUOM(values);
    // }
  };
  //   useEffect(() => {
  //     if (isNumber(selectedRecordId)) {
  //       refetch();
  //     }
  //   }, [selectedRecordId]);

  //   useEffect(() => {
  //     if (isDataSuccess) {
  //       form.setFieldsValue(data?.data?.Data?.Result);
  //     }
  //   }, [isDataSuccess]);

  return (
    <AddButtonforItems open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <h2 style={{ marginBottom: 20 }}>{t('define_section')} </h2>
      <Divider></Divider>

      <Form form={form} layout="horizontal" onFinish={handleFinish} initialValues={{ remember: true }}>
        <Row gutter={[10, 10]} style={{ marginLeft: '3%' }}>
          <Col xs={24} sm={24} md={{ span: 6 }} className="formfield">
            <AntSelectDynamic bordered={false} label={t('department')} fieldValue="Id" fieldLabel="CheqNo" name="Id" />
          </Col>

          <Form.Item style={{ position: 'relative', top: 5 }}>
            <Section />
          </Form.Item>

          <Col xs={24} sm={24} md={{ span: 7, offset: 1 }} className="formfield">
            <AntInput name="Equivalent" label={t('short_name')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={{ span: 7, offset: 1 }} className="formfield">
            <AntInput name="Equivalent" label={t('section_name')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={{ span: 7, offset: 0 }} className="formfield">
            <AntInput name="Equivalent" label={t('code')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={3} offset={10}>
            <AntButton
              label={t('cancel')}
              htmlType="submit"
              className="fullWidth"
              style={{ marginTop: 20, marginRight: 0 }}
            />
          </Col>
          <Col xs={24} sm={24} md={3}>
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

      <SectionTable />
    </AddButtonforItems>
  );
}

export default Section;
