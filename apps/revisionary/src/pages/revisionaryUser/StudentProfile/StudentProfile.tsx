import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Input, Divider, Select, Row, Col } from 'antd';
import './StudentProfile.css';
import { AntButton } from '@revisionary/components';
import { CameraOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  return (
    <div className="form1" style={{ marginTop: '2%' }}>
      <Form layout="vertical" onFinish={onFinish} className="form-container">
        <h2 className="heading">{t('student_profile_form')}</h2>
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
              label={t('registration_code')}
              name="Registration Code"
              rules={[{ required: true, message: <>{t('enter_registration_code')}</> }]}
            >
              <Input size="large" className="custom" placeholder={t('registration_code')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('registration_date')}
              name="Registration Date"
              rules={[{ required: true, message: <>{t('enter_registration_date')}</> }]}
            >
              <Input size="large" className="custom" placeholder={t('registration_date')} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label={t('name')}
              name="Name"
              rules={[
                {
                  required: true,
                  message: <>{t('add_updata_name')}</>,
                },
              ]}
            >
              <Input size="large" className="custom" placeholder={t('name')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('father_name')}
              name="Father Name"
              rules={[{ required: true, message: <>{t('enter_father_name')}</> }]}
            >
              <Input size="large" className="custom" placeholder={t('father_name')} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label={t('guardian_name')}
              name="Gardian Name"
              rules={[{ required: true, message: <>{t('enter_guardian_name')}</> }]}
            >
              <Input size="large" className="custom" placeholder={t('guardian_name')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('address')}
              name="Address"
              rules={[{ required: true, message: <>{t('enter_address')}</> }]}
            >
              <Input size="large" className="custom" placeholder={t('address')} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label={t('class')}
              name="Class"
              rules={[{ required: true, message: <>{t('add_updata_class')}</> }]}
            >
              <Select
                placeholder={t('class')}
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
              label={t('board')}
              name="Board"
              rules={[{ required: true, message: <>{t('enter_board')}</> }]}
            >
              <Select
                placeholder={t('board')}
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
              <AntButton size="large" htmlType="submit" className="btn1" label={t('submit')}></AntButton>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default StudentProfile;
