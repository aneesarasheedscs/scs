import { isNumber, map } from 'lodash';
import { useEffect, useState } from 'react';
import { useGetSubjectLists } from './queries';
import { Col, Form, FormInstance, Input, Row, Select } from 'antd';
import { useGetClassDivisions } from './queries';
import { useAddUpdateTopic, useGetTopicById } from './queries';
import { useTranslation } from 'react-i18next';
// import LookupFormModal from '../../Revisionary_ui/SyllabusStatus/Components/LookUpFormModal';
import { TTopicFormDataOnAdd, TTopicFormDataOnUpdate } from '../../types/topics';
import LookupFormModal from '@revisionary/pages/Component/LookupFormModal';
function AddUpdateRecord({ open, form, handleClose, selectedRecordId }: TAddUpdateRecord) {
  const [btnClicked, setBtnClicked] = useState(false);
  const { t } = useTranslation();
  const { data: subjectListData, isLoading: isSubjectListLoading } = useGetSubjectLists();
  const { data: classDivisionData, isLoading: isClassDivisionLoading } = useGetClassDivisions();

  const { mutate, isLoading, isSuccess } = useAddUpdateTopic(selectedRecordId);
  const {
    data,
    refetch,
    isFetching,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetTopicById(selectedRecordId);

  const onFinish = (values: TTopicFormDataOnAdd | TTopicFormDataOnUpdate) => {
    if (isNumber(selectedRecordId)) {
      mutate({ ...values, rowVersion: data?.data?.apiData?.rowVersion });
    } else {
      mutate(values);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      if (!btnClicked) handleClose();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetch();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isDataSuccess) {
      form.setFieldsValue(data?.data?.apiData);
    }
  }, [isDataSuccess]);

  return (
    <LookupFormModal
      open={open}
      form={form}
      width={650}
      title="Topics"
      onFinish={onFinish}
      isLoading={isLoading}
      isFetching={isFetching}
      handleClose={handleClose}
      isDataLoading={isDataLoading}
      selectedRecordId={selectedRecordId}
      handleSaveMoreClick={() => setBtnClicked(true)}
    >
      <Row gutter={10} style={{ marginTop: 20 }}>
        <Col xs={12}>
          <Form.Item
            name="classesSubDivisionId"
            rules={[{ required: true, message: <>{t('please_input_your_class_division')}</> }]}
          >
            <Select
              showSearch
              size="large"
              style={{ width: '100%' }}
              placeholder={t('class_division')}
              loading={isClassDivisionLoading}
              options={map(classDivisionData?.data?.apiData, (item) => ({
                value: item?.classSubDivisionId,
                label: item?.divisionDescription,
              }))}
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            />
          </Form.Item>
        </Col>

        <Col xs={12}>
          <Form.Item
            name="subjectListId"
            rules={[{ required: true, message: <>{t('please_input_your_subject_list')}</> }]}
          >
            <Select
              showSearch
              size="large"
              style={{ width: '100%' }}
              placeholder={t('subject_list')}
              loading={isSubjectListLoading}
              options={map(subjectListData?.data?.apiData, (item) => ({
                label: item?.subjectName,
                value: item?.subjectListId,
              }))}
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            />
          </Form.Item>
        </Col>

        <Col xs={8}>
          <Form.Item name="unitTopicNo" rules={[{ required: true, message: <>{t('please_input_your_code')}</> }]}>
            <Input size="large" placeholder={t('topic_code')} />
          </Form.Item>
        </Col>

        <Col xs={16}>
          <Form.Item
            name="unitTopicDescription"
            rules={[{ required: true, message: <>{t('please_input_your_description')}</> }]}
          >
            <Input size="large" placeholder={t('topic_description')} />
          </Form.Item>
        </Col>
      </Row>
    </LookupFormModal>
  );
}

type TAddUpdateRecord = {
  open: boolean;
  form: FormInstance<any>;
  handleClose: VoidFunction;
  selectedRecordId?: number;
};

export default AddUpdateRecord;
