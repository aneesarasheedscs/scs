import React, { useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Select, Table } from "antd";


interface Modal1Props {
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

const Modal1: React.FC<Modal1Props> = ({
  visible,
  onCancel,
  onSave,
  onSaveAndAddMore,
}) => {
const [form] = Form.useForm();
const [dataa, setData] = useState<any | Data[]>([]);
const [classdivision, setClassDivision] = useState('');
const [subjectname, setSubjectName] = useState('');
const [topiccode, setTopicCode] = useState('');
const [topicdescription, setTopicDescription] = useState('');

  const handleSave = () => {
    setData([...dataa, { key: dataa.length + 1, classdivision, subjectname, topiccode, topicdescription }]);
    form.validateFields().then((values) => {
      onSave(values);
      form.resetFields();
    });
  };

  const handleSaveAndAddMore = () => {
    setData([...dataa, { key: dataa.length + 1, classdivision, subjectname, topiccode, topicdescription }]);
    form.validateFields().then((values) => {
      onSaveAndAddMore(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Topics"
      open={visible}
      onCancel={onCancel}
      onOk={handleSave}
      footer={null}
    > 

      <Form form={form}>
      <Row gutter={10} style={{ marginTop: 20 }}>
      <Col xs={12}>
        <Form.Item
          name="class"
          rules={[
            { required: true, message: "Please enter a Class Division!" },
          ]}
        >
           <Select
              showSearch
              size="large"
              style={{ width: "100%" }}
              placeholder="Class Division"
              // value={classdivision}
              // onChange={(e) => setClassDivision(e.target.value)}
              // loading={isClassDivisionLoading}
              // options={map(classDivisionData?.data?.apiData, (item) => ({
              //   value: item?.classSubDivisionId,
              //   label: item?.divisionDescription,
              // }))}
              // filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
            />
        </Form.Item>
        </Col>

        <Col xs={12}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please enter a Subject List!" }]}
        >
           <Select
              showSearch
              size="large"
              // value={subjectname}
              // onChange={(e) => setSubjectName(e.target.value)}
              style={{ width: "100%" }}
              placeholder="Subject List"
            //   loading={isSubjectListLoading}
            //   options={map(subjectListData?.data?.apiData, (item) => ({
            //     label: item?.subjectName,
            //     value: item?.subjectListId,
            //   }))}
            //   filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
             />
        </Form.Item>
        </Col>

        <Col xs={10}>
        <Form.Item
          name="code"
          rules={[{ required: true, message: "Please enter an Topic Code!" }]}
        >
          <Input 
          size="large"
          type="number"
          value={topiccode}
          onChange={(e) => setTopicCode(e.target.value)}
          placeholder="Topic Code" />
        </Form.Item>
        </Col>

        <Col xs={14}>
        <Form.Item
          name="description"
          rules={[
            { required: true, 
              message: "Please enter an Topic Description!" },
          ]}
        >
          <Input
           size="large"
           value={topicdescription}
            onChange={(e) => setTopicDescription(e.target.value)}
            placeholder="Topic Description" />
        </Form.Item>
        </Col>
        </Row>

        <Button style={{ marginLeft: "37%" }} onClick={onCancel}>
          Cancel
        </Button>
        <Button
          style={{ background: "#00a148", color: "white", marginLeft: "1.1%" }}
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

export default Modal1;
