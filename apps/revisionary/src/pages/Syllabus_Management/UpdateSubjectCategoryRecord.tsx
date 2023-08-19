import { isNumber, values } from "lodash";
import { useEffect, useState } from "react";
import { Col, Form, FormInstance, Input, Row } from "antd";
 
// import { useAddUpdateSubjectCategory, useGetSubjectCategoryById } from "@/hooks/apis/useSubjectCategory";
// import { TSubjectCategoryFormDataOnAdd, TSubjectCategoryFormDataOnUpdate } from "@/types/subjectCategory";
import { useAddUpdateSubjectCategory, useGetSubjectCategoryById } from "./queries";
import LookupFormModal from "./Component/LookupFormModal";

function AddUpdateRecord({ open, form, handleClose, selectedRecordId }: TAddUpdateRecord) {
  const [btnClicked, setBtnClicked] = useState(false);
  const { mutate, isLoading, isSuccess } = useAddUpdateSubjectCategory(selectedRecordId);
  const {
    data,
    refetch,
    isFetching,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetSubjectCategoryById(selectedRecordId);

  const onFinish = (values: any) => {
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
      title="Subject Category"
      handleClose={handleClose}
      isDataLoading={isDataLoading}
      selectedRecordId={selectedRecordId}
      handleSaveMoreClick={() => setBtnClicked(true)}
    >
      <Row gutter={10} style={{ marginTop: 20 }}>
        <Col xs={8}>
          <Form.Item name="subjectCategoryCode" rules={[{ required: true, message: "Please input your Code!" }]}>
            <Input size="large" placeholder="Code" />
          </Form.Item>
        </Col>

        <Col xs={16}>
          <Form.Item
            name="subjectCategoryDescription"
            rules={[{ required: true, message: "Please input your Description!" }]}
          >
            <Input size="large" placeholder="Description" />
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
