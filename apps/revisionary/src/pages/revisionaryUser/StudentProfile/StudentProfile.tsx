import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Form, Input, Divider, Select, Row, Col } from 'antd';
import './StudentProfile.css';
import { AntButton, AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic } from '@revisionary/components';
import { CameraOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { isNumber } from 'lodash';
import { useGetProfileById, useSaveProfile } from './queries';
const { Option } = Select;

interface ExaminationBoard {
  id: number;
  value: string;
  label: string;
}
const examinationBoards: ExaminationBoard[] = [
  { id: 1, value: 'GCSE AQA', label: 'Assessment and Qualifications Alliance' },
  { id: 2, value: 'EDEXCEL', label: 'Pearson Edexcel' },
  { id: 3, value: 'GCSE OCR', label: 'Oxford, Cambridge, and RSA Exams' },
  { id: 4, value: 'GCSE CCEA', label: 'Council for Curriculum and Examinations Assessment' },
  { id: 5, value: 'GCSE WJEC', label: 'Welsh Joint Examinations Committee' },
];
const examinationBoards2 = [
  { key: 1, value: 'GCSE AQA', label: 'Assessment and Qualifications Alliance' },
  { key: 2, value: 'EDEXCEL', label: 'Pearson Edexcel' },
  { key: 3, value: 'GCSE OCR', label: 'Oxford, Cambridge, and RSA Exams' },
  { key: 4, value: 'GCSE CCEA', label: 'Council for Curriculum and Examinations Assessment' },
  { key: 5, value: 'GCSE WJEC', label: 'Welsh Joint Examinations Committee' },
];
const StudentProfile: React.FC = () => {
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [btnClicked, setBtnClicked] = useState(false);
  const { data: apiresponse, refetch, isSuccess: isDataByIdSuccess } = useGetProfileById(selectedRecordId);
  const {
    mutate,
    isSuccess,
    data,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useSaveProfile(selectedRecordId);
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    if (isNumber(selectedRecordId)) {
      mutate({ ...values, rowVersion: data?.data?.apiData?.rowVersion });
    } else {
      mutate(values);
    }
  };
  const handleReset = () => {
    form.resetFields();
    setSelectedRecordId(null);
  };
  useEffect(() => {
    if (isSuccess) handleReset();
  }, [isSuccess]);
  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetch();
    }
  }, [selectedRecordId]);
  useEffect(() => {
    if (isDataByIdSuccess) {
      form.setFieldsValue(apiresponse?.data?.Data?.Result);
    }
  }, [isDataByIdSuccess]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const { t } = useTranslation();
  return (
    <div className="form1" style={{ marginTop: '2%' }}>
      <Form layout="vertical" onFinish={onFinish} className="form-container" form={form}>
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
            <AntInputNumber
              required
              size="large"
              name="registrationcode"
              label={t('registration_code')}
              placeholder=""
            ></AntInputNumber>
            {/* <AntInput
              required
              size="large"
              name="registrationcode"
              label={t('registration_code')}
              placeholder=""
            ></AntInput> */}
          </Col>
          <Col span={12}>
            <AntDatePicker
              required
              size="large"
              name="registrationdate"
              label={t('registration_date')}
              placeholder=""
            />
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <AntInput required size="large" name="name" label={t('name')} placeholder=""></AntInput>
          </Col>
          <Col span={12}>
            <AntInput required size="large" name="fathername" label={t('father_name')} placeholder=""></AntInput>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <AntInput required size="large" name="guardianname" label={t('guardian_name')} placeholder=""></AntInput>
          </Col>
          <Col span={12}>
            <AntInput required size="large" name="address" label={t('address')} placeholder=""></AntInput>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Col span={12}>
              <Form.Item label="class" name="class">
                <Select style={{ width: 350, marginTop: '-1px' }} size="large">
                  {examinationBoards2.map((board2) => (
                    <Option key={board2.key} value={board2.value}>
                      {board2.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            {/* <AntSelectDynamic
              required
              size="large"
              label={t('class')}
              name="className"
              fieldLabel="className"
              query={useGetClass}
              fieldValue="classId"
            /> */}
            {/* <Select
              loading={isLoading} // You can use isLoading from useGetClass
              size="large"
              name="classId"
              onChange={handleChange}
            >
              {data?.data?.apiData.map((item: any) => (
                <Select.Option key={item.classId} value={item.classId}>
                  {item.className}
                </Select.Option>
              ))}
            </Select> */}
          </Col>
          <Col span={12}>
            <Form.Item label="Examination Board" name={t('examination_board')}>
              <Select<ExaminationBoard> style={{ width: 350, marginTop: '-1px' }} size="large">
                {examinationBoards.map((board) => (
                  <Option key={board.id} value={board.value}>
                    {board.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            {/* <AntSelectDynamic
              required
              size="large"
              label={t('examination_board')}
              name="CompanyId"
              fieldLabel="CompName"
              // query={useGetCompany}
              fieldValue="CompanyId"
            /> */}
          </Col>
        </Row>

        <Row>
          <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
            <AntButton
              size="large"
              htmlType="submit"
              className="btn1"
              label={t('save')}
              onClick={(record: any) => setSelectedRecordId(record?.studentProfileId)}
            ></AntButton>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default StudentProfile;
