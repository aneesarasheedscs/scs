import { isNumber, map } from 'lodash';
import { useEffect, useState } from 'react';
import { Col, DatePicker, Form, FormInstance, Input, Row, Select } from 'antd';
import { useAddUpdateClassDivision, useGetClassDivisionById, useGetClassDivisions } from '../Queries';
import { TClassData, TClassDivisionFormDataOnAdd, TClassDivisionFormDataOnUpdate } from '../Queries/Types';
import LookupFormModal from '../../Component/LookupFormModal';
import { useTranslation } from 'react-i18next';
import { AntSelectDynamic } from '@scs/ui';

function AddUpdateClassDivision({
  open,
  form,
  handleClose,
  classData,
  isClassLoading,
  selectedRecordId,
}: TAddUpdateRecord) {
  const [btnClicked, setBtnClicked] = useState(false);
  const { mutate, isLoading, isSuccess } = useAddUpdateClassDivision(selectedRecordId);
  const {
    data,
    refetch,
    isFetching,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetClassDivisionById(selectedRecordId);

  const onFinish = (values: TClassDivisionFormDataOnAdd | TClassDivisionFormDataOnUpdate) => {
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

  // useEffect(() => {
  //   if (isDataSuccess) {
  //     const date = new Date(data?.data?.apiData?.effectiveFrom);
  //     form.setFieldsValue({ ...data?.data?.apiData, effectiveFrom: moment(date) });
  //   }
  // }, [isDataSuccess]);
  const { t } = useTranslation();
  return (
    <LookupFormModal
      open={open}
      form={form}
      width={650}
      onFinish={onFinish}
      isLoading={isLoading}
      title="Class Division"
      isFetching={isFetching}
      handleClose={handleClose}
      isDataLoading={isDataLoading}
      selectedRecordId={selectedRecordId}
      handleSaveMoreClick={() => setBtnClicked(true)}
    >
      <Row gutter={10} style={{ marginTop: 20 }}>
        <Col xs={12}>
          <Form.Item name="classId" rules={[{ required: true, message: <>{t('add_updata_class')}</> }]}>
            <AntSelectDynamic // Replace with your AntSelectDynamic component
              required
              size="large"
              label={''}
              name="classId"
              fieldLabel="className"
              query={useGetClassDivisions} // Replace with your class division query hook
              fieldValue="classId"
            />
            <Select
              showSearch
              size="large"
              style={{ width: '100%' }}
              placeholder={t('class')}
              loading={isClassLoading}
              options={map(classData, (item) => ({
                value: item?.classId,
                label: item?.className,
              }))}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
        </Col>

        <Col xs={12}>
          <Form.Item name="effectiveFrom" rules={[{ required: true, message: <>{t('add_updata_date')}</> }]}>
            <DatePicker
              size="large"
              format="DD-MMM-YYYY"
              placeholder={t('efective_form')}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>

        <Col xs={8}>
          <Form.Item
            name="classSubDivisionCode"
            rules={[{ required: true, message: <>{t('add_updata_code')}</> }]}
          >
            <Input size="large" placeholder={t('code')} />
          </Form.Item>
        </Col>

        <Col xs={16}>
          <Form.Item
            name="classSubDivisionDescription"
            rules={[{ required: true, message: <>{t('subject_description')}</> }]}
          >
            <Input size="large" placeholder={t('name')} />
          </Form.Item>
        </Col>
      </Row>
    </LookupFormModal>
  );
}

type TAddUpdateRecord = {
  open: boolean;
  form: FormInstance<any>;
  isClassLoading: boolean;
  handleClose: VoidFunction;
  selectedRecordId?: number;
  classData: Array<TClassData>;
};

export default AddUpdateClassDivision;
// function moment(date: Date) {
//   throw new Error('Function not implemented.');
// }
