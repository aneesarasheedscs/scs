import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Input, Divider, Select, Row, Col } from 'antd';
import './StudentProfile.css';
import { AntButton, AntInput, AntSelectDynamic } from '@revisionary/components';
import { CameraOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useGetStudentProfile } from './queries';
const StudentProfile: React.FC = () => {
  const { data: cards2, isError, isLoading } = useGetStudentProfile();

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
            <AntInput
              required
              size="large"
              name="registrationcode"
              label={t('registration_code')}
              placeholder=""
            ></AntInput>
          </Col>
          <Col span={12}>
            <AntInput
              required
              size="large"
              name="registrationdate"
              label={t('registration_date')}
              placeholder=""
            ></AntInput>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <AntInput required size="large" name="name" label={t('name')} placeholder=""></AntInput>
          </Col>
          <Col span={12}>
            <AntInput
              required
              size="large"
              name="fathername"
              label={t('father_name')}
              placeholder=""
            ></AntInput>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <AntInput
              required
              size="large"
              name="guardianname"
              label={t('guardian_name')}
              placeholder=""
            ></AntInput>
          </Col>
          <Col span={12}>
            <AntInput required size="large" name="address" label={t('address')} placeholder=""></AntInput>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <AntSelectDynamic
              required
              size="large"
              label={t('class')}
              name="CompanyId"
              fieldLabel="CompName"
              // query={useGetCompany}
              fieldValue="CompanyId"
            />
          </Col>
          <Col span={12}>
            <AntSelectDynamic
              required
              size="large"
              label={t('examination_board')}
              name="CompanyId"
              fieldLabel="CompName"
              // query={useGetCompany}
              fieldValue="CompanyId"
            />
          </Col>
        </Row>

        <Row>
          <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
            <AntButton size="large" htmlType="submit" className="btn1" label={t('submit')}></AntButton>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default StudentProfile;
