import { isNumber, map } from 'lodash';
import { useEffect, useState } from 'react';
import { Col, Form, FormInstance, Input, Row, Select } from 'antd';
import { useAddUpdateSubTopic, useGetTopicById } from './queries';
import LookupFormModal from '../../Revisionary_ui/SyllabusStatus/Components/LookUpFormModal';
import { TSubTopicFormDataOnAdd, TSubTopicFormDataOnUpdate } from '../../types/subTopics';
import { TTopicsData } from '../../types/topics';

function AddUpdateRecord({ open, form, handleClose, topicsData, isTopicsLoading, selectedRecordId }: TAddUpdateRecord) {
  const [btnClicked, setBtnClicked] = useState(false);
  const { mutate, isLoading, isSuccess } = useAddUpdateSubTopic(selectedRecordId);
  const {
    data,
    refetch,
    isFetching,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetTopicById(selectedRecordId);

  const onFinish = (values: TSubTopicFormDataOnAdd | TSubTopicFormDataOnUpdate) => {
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
      width={700}
      title="Sub-Topics"
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
          <Form.Item name="unitTopicId" rules={[{ required: true, message: "Please input your Topic!" }]}>
            <Select
              showSearch
              size="large"
              style={{ width: "100%" }}
              placeholder="Topic"
              loading={isTopicsLoading}
              options={map(topicsData, (item) => ({
                value: item?.unitTopicId,
                label: item?.unitTopicDescription,
              }))}
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
            />
          </Form.Item>
        </Col>

        <Col xs={6}>
          <Form.Item name="subTopicNo" rules={[{ required: true, message: "Please input your Code!" }]}>
            <Input size="large" placeholder="Code" />
          </Form.Item>
        </Col>

        <Col xs={10}>
          <Form.Item name="subTopicDescription" rules={[{ required: true, message: "Please input your Description!" }]}>
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
  isTopicsLoading: boolean;
  handleClose: VoidFunction;
  selectedRecordId?: number;
  topicsData: Array<TTopicsData>;
};

export default AddUpdateRecord;
