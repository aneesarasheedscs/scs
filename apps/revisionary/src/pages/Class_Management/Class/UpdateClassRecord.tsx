import { isNumber } from 'lodash';
import { Col, Form, FormInstance, Input, Row } from 'antd';
// import LookupFormModal from "@/pages/components/LookupFormModal";
// import { useAddUpdateClass, useGetClassById } from "@/hooks/apis/useClass";
// import { TClassFormDataOnAdd, TClassFormDataOnUpdate } from "@/types/classes";
import { useEffect, useState } from 'react';
import LookupFormModal from '../../Component/LookupFormModal';
import { TClassFormDataOnAdd, TClassFormDataOnUpdate } from '../Queries/Types';
import { useAddUpdateClass, useGetClassById } from '../Queries';
import { useTranslation } from 'react-i18next';

function AddUpdateRecord({ open, form, handleClose, selectedRecordId }: TAddUpdateRecord) {
  const [btnClicked, setBtnClicked] = useState(false);
  const { mutate, isLoading, isSuccess } = useAddUpdateClass(selectedRecordId);
  const {
    data,
    refetch,
    isFetching,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetClassById(selectedRecordId);

  const onFinish = (values: TClassFormDataOnAdd | TClassFormDataOnUpdate) => {
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
  const { t } = useTranslation();
  return (
    <LookupFormModal
      open={open}
      form={form}
      title={t('class')}
      onFinish={onFinish}
      isLoading={isLoading}
      isFetching={isFetching}
      handleClose={handleClose}
      isDataLoading={isDataLoading}
      selectedRecordId={selectedRecordId}
      handleSaveMoreClick={() => setBtnClicked(true)}
    >
      <Row gutter={10} style={{ marginTop: 20 }}>
        <Col xs={8}>
          <Form.Item name="classCode" rules={[{ required: true, message: <>{t('add_updata_code')}</> }]}>
            <Input size="large" placeholder={t('code')} />
          </Form.Item>
        </Col>

        <Col xs={16}>
          <Form.Item name="className" rules={[{ required: true, message: <>{t('add_updata_name')}</> }]}>
            <Input size="large" placeholder={t('updata_name')} />
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
