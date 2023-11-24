import React, { useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Select, Table } from "antd";


interface Modal2Props {
  visible: boolean;
  onCancel: () => void;
  onSave: (data: {
    classdivision: string;
    subjectname: string;
    topiccode: number;
    topicdescription: string;
  }) => void;
  onSaveAndAddMore: (data: {
    classdivision: string;
    subjectname: string;
    topiccode: number;
    topicdescription: string;
  }) => void;
}
interface Data {
  classdivision: string;
  subjectname: string;
  topiccode: number;
  topicdescription: string;
}

const Modal2: React.FC<Modal2Props> = ({
  visible,
  onCancel,
  onSave,
  onSaveAndAddMore,
}) => {
const [form] = Form.useForm();
const [dataa, setData] = useState<any | Data[]>([]);
const [subTopic, setSubTopic] = useState('');
const [subTopicCode, setSubTopicCode] = useState('');
const [subTopicDescription, setSubTopicDescription] = useState('');

  const handleSave = () => {
    setData([...dataa, { key: dataa.length + 1,subTopic, subTopicCode, subTopicDescription }]);
    form.validateFields().then((values) => {
      onSave(values);
      form.resetFields();
    });
  };

  const handleSaveAndAddMore = () => {
    setData([...dataa, { key: dataa.length + 1, subTopic, subTopicCode, subTopicDescription }]);
    form.validateFields().then((values) => {
      onSaveAndAddMore(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Sub-Topics"
      open={visible}
      onCancel={onCancel}
      onOk={handleSave}
      footer={null}
    >
      <Form form={form}>
      <Row gutter={10} style={{ marginTop: 20 }}>
        <Col xs={8}>
        <Form.Item
          name="subtopic"
          rules={[
            { required: true, message: "Please enter a Sub Topic!" },
          ]}
        >
            <Select
              showSearch
              size="large"
              style={{ width: "100%" }}
              placeholder="Topic"
              // value={subTopic}
              // onChange={(e) => setSubTopic(e.target.value)}
              // loading={isTopicsLoading}
              // options={map(topicsData, (item) => ({
              //   value: item?.unitTopicId,
              //   label: item?.unitTopicDescription,
              // }))}
              // filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
            />

        </Form.Item>
        </Col>

        <Col xs={6}>
        <Form.Item
          name="Subtopic"
          rules={[{ required: true, message: "Please enter a SubTopic Code!" }]}
        >
          <Input 
             size="large"
           value={subTopicCode}
            onChange={(e) => setSubTopicCode(e.target.value)}
            placeholder="SubTopic Code"/>
        </Form.Item>
        </Col>

        <Col xs={10}>
        <Form.Item
          name="description"
          rules={[{ required: true, message: "Please enter an Sub-Topic Description!" }]}
        >
          <Input 
             size="large"
          type="number"
          value={subTopicDescription}
          onChange={(e) => setSubTopicDescription(e.target.value)}
          placeholder="Topic Description" />
        </Form.Item>
        </Col>
        </Row>
       
        <Button style={{ marginLeft: "37%" }} onClick={onCancel}>
          Cancel
        </Button>
        <Button
          style={{ background: "#00a148", color: "white", marginLeft: "1%" }}
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          style={{ background: "#00a148", color: "white", marginLeft: "1%" }}
          onClick={handleSaveAndAddMore}
        >
          Save and Add More
        </Button>
      </Form>
    
    </Modal>
    
  );
};

export default Modal2;
