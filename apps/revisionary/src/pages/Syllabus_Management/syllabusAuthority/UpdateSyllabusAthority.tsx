import { isNumber } from 'lodash';
import { useEffect, useState } from 'react';
import { Col, Form, FormInstance, Input, Row } from 'antd';
import LookupFormModal from '../../Component/LookupFormModal';
import { useAddUpdateSyllabusAuthority, useGetSyllabusAuthorityById } from '../queries';
import { TSyllabusAuthorityFormDataOnAdd, TSyllabusAuthorityFormDataOnUpdate } from '../queries/types';
// import LookupFormModal from "@/pages/components/LookupFormModal";
// import { useGetSyllabusAuthorityById, useAddUpdateSyllabusAuthority } from "@/hooks/apis/useSyllabusAuthority";
// import { TSyllabusAuthorityFormDataOnAdd, TSyllabusAuthorityFormDataOnUpdate } from "@/types/syllabusAuthority";

function UpdateSyllabusAuthority({ open, form, handleClose, selectedRecordId }: TAddUpdateRecord) {
  const [btnClicked, setBtnClicked] = useState(false);
  const { mutate, isLoading, isSuccess } = useAddUpdateSyllabusAuthority(selectedRecordId);
  const {
    data,
    refetch,
    isFetching,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetSyllabusAuthorityById(selectedRecordId);

  const onFinish = (values: TSyllabusAuthorityFormDataOnAdd | TSyllabusAuthorityFormDataOnUpdate) => {
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
      onFinish={onFinish}
      isLoading={isLoading}
      isFetching={isFetching}
      handleClose={handleClose}
      isDataLoading={isDataLoading}
      selectedRecordId={selectedRecordId}
      title="Syllabus Authority / Publisher"
      handleSaveMoreClick={() => setBtnClicked(true)}
    >
      <Row gutter={10} style={{ marginTop: 20 }}>
        <Col xs={8}>
          <Form.Item
            name="syllabusAuthorityCode"
            rules={[{ required: true, message: 'Please input your Code!' }]}
          >
            <Input size="large" placeholder="Code" />
          </Form.Item>
        </Col>

        <Col xs={16}>
          <Form.Item
            name="syllabusAuthorityName"
            rules={[{ required: true, message: 'Please input your Name!' }]}
          >
            <Input size="large" placeholder="Name" />
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

export default UpdateSyllabusAuthority;
