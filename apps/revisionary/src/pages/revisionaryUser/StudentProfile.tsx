import React, { useState } from 'react';
import { Form, Input, Button, DatePickerProps, Select, Divider } from 'antd';
// import 'antd/dist/antd.css';
import './StudentProfile.css';
// import ProfilePic from "./ProfilePic";
import { flattenDiagnosticMessageText } from 'typescript';
import { AntButton, AntSelectDynamic } from '@revisionary/components';
import { Link } from 'react-router-dom';
// import ProfilePic from './ProfilePic';
const customStyles = {
  borderColor: 'red',
};
const StudentProfile: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Form values:', values);
  };
  const onChange: DatePickerProps['onChange'] = (date: any, dateString: any) => {
    console.log(date, dateString);
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };
  return (
    <div className="form1" style={{ marginTop: '2%' }}>
      {/* <ProfilePic /> */}
      <Form
        layout="vertical"
        onFinish={onFinish}
        className="form-container"
        style={{
          marginTop: '-336px',
          marginLeft: '950px',
          width: '100%',
          boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
        }}
      >
        <h2 style={{ fontWeight: 'bold', fontSize: '30px', textAlign: 'center' }}>Student Profile Form</h2>
        <Divider orientation="center" style={{ marginTop: '10px' }}></Divider>
        <div className="wrapper">
          <input type="file" className="my_file" accept="image/*" onChange={handleImageChange} />
          {previewUrl && <img src={previewUrl} alt="Preview" />}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
          <Form.Item
            className="custom-input"
            label="Registration Code"
            name="Registration Code"
            rules={[{ required: true, message: 'Please enter your first name' }]}
          >
            <Input size="large" className="custom" placeholder="Registration Code" />
          </Form.Item>
          <Form.Item
            className="custom-input"
            label="Registration Date"
            name="Registration Date"
            rules={[{ required: true, message: 'Please enter your last name' }]}
          >
            <Input size="large" className="custom" placeholder="Registration Date" />
          </Form.Item>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
          <Form.Item
            className="custom-input"
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
          <Form.Item
            className="custom-input"
            label="Father Name"
            name="phone"
            rules={[{ required: true, message: 'Please enter Father Name' }]}
          >
            <Input size="large" className="custom" placeholder="Father Name" />
          </Form.Item>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
          <Form.Item
            className="custom-input"
            label="Gardian Name"
            name="gardian Name"
            rules={[{ required: true, message: 'Please enter your gardian Name' }]}
          >
            <Input size="large" className="custom" placeholder="Gardian Name" />
          </Form.Item>

          <Form.Item
            className="custom-input"
            label="Address"
            name="dob"
            rules={[{ required: true, message: 'Please select your address' }]}
          >
            <Input size="large" className="custom" placeholder="Address" />
          </Form.Item>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
          <Form.Item
            className="custom-input"
            label="Class"
            name="Class"
            rules={[{ required: true, message: 'Please select your Class' }]}
          >
            {/* <AntSelectDynamic 
            label=''
            placeholder="Class Year"
            fieldLabel=''
            fieldValue=''
            name='' */}
            {/* // data={data?.Data?.apiData}
            /> */}
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
            {/* <Input
              size="large"
              className="custom"
              placeholder="Class"
            /> */}
          </Form.Item>
          <Form.Item
            className="custom-input"
            label="Class Year"
            name="classyear"
            rules={[{ required: true, message: 'Please enter your Class Year' }]}
            style={{ width: '50%' }}
          >
            {/* <Input size="large" className="custom" placeholder="Class Year" /> */}
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
        </div>
        <Form.Item
          className="custom-input"
          label="Board"
          name="classyear"
          rules={[{ required: true, message: 'Please enter your Board' }]}
          style={{ width: '100%' }}
        >
          {/* <Input size="large" className="custom" placeholder="Board" /> */}
          <Select
            placeholder="Board"
            // className="custom"
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

        <Form.Item>
          <AntButton
            size="large"
            htmlType="submit"
            style={{
              position: 'relative',
              top: '-160px',
              right: '-230px',
              width: '35%',
              borderRadius: '22px',
              height: '2.9rem',
              color: 'white',
              background: ' rgba(0, 0, 0, 0.7)',
              fontWeight: 'bold',
              border: 'none',
            }}
            className="btn1"
            label="Submit"
          ></AntButton>
        </Form.Item>
      </Form>

      <Link to="/syllabus1">
        <AntButton label={'Next Page'} style={{ position: 'absolute', top: '4%', left: '2%' }}></AntButton>
      </Link>
    </div>
  );
};

export default StudentProfile;
