import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Input, Divider, Select, Row, Col } from 'antd';
import './StudentProfile.css';
import { AntButton } from '@revisionary/components';
import { CameraOutlined } from '@ant-design/icons';
const StudentProfile: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Form values:', values);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };
  return (
    <div className="form1" style={{ marginTop: '2%' }}>
      <Form layout="vertical" onFinish={onFinish} className="form-container">
        <h2 className="heading">Student Profile Form</h2>
        <Divider orientation="center" style={{ marginTop: '10px' }}></Divider>
        <Row gutter={20} style={{ marginBottom: '-20%' }}>
          <div className="wrapper">
            <input type="file" className="my_file" accept="image/*" onChange={handleImageChange} />
            {previewUrl && <img className="profile-picture" src={previewUrl} alt="Preview" />}
            <CameraOutlined className="icon" />
          </div>
        </Row>
        <Row></Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label="Registration Code"
              name="Registration Code"
              rules={[{ required: true, message: 'Please enter your first name' }]}
            >
              <Input size="large" className="custom" placeholder="Registration Code" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Registration Date"
              name="Registration Date"
              rules={[{ required: true, message: 'Please enter your last name' }]}
            >
              <Input size="large" className="custom" placeholder="Registration Date" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label="Name"
              name="Name"
              rules={[
                {
                  required: true,
                  message: 'Please enter Your Name',
                },
              ]}
            >
              <Input size="large" className="custom" placeholder="Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Father Name"
              name="phone"
              rules={[{ required: true, message: 'Please enter Father Name' }]}
            >
              <Input size="large" className="custom" placeholder="Father Name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label="Gardian Name"
              name="gardian Name"
              rules={[{ required: true, message: 'Please enter your gardian Name' }]}
            >
              <Input size="large" className="custom" placeholder="Gardian Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Address"
              name="dob"
              rules={[{ required: true, message: 'Please select your address' }]}
            >
              <Input size="large" className="custom" placeholder="Address" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label="Class"
              name="Class"
              rules={[{ required: true, message: 'Please select your Class' }]}
            >
              <Select
                placeholder="Class Year"
                style={{ textAlign: 'left', width: '100%' }}
                onChange={handleChange}
                size="large"
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'disabled', label: 'Disabled', disabled: true },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Class Year"
              name="classyear"
              rules={[{ required: true, message: 'Please enter your Class Year' }]}
            >
              <Select
                placeholder="Class Year"
                style={{ textAlign: 'left' }}
                onChange={handleChange}
                size="large"
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'disabled', label: 'Disabled', disabled: true },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={24}>
            <Form.Item
              label="Board"
              name="classyear"
              rules={[{ required: true, message: 'Please enter your Board' }]}
            >
              <Select
                placeholder="Board"
                style={{ textAlign: 'left' }}
                onChange={handleChange}
                size="large"
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'disabled', label: 'Disabled', disabled: true },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
            <Form.Item>
              <AntButton size="large" htmlType="submit" className="btn1" label="Submit"></AntButton>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default StudentProfile;
