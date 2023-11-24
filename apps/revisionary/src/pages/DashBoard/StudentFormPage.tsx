// import React, { useState } from 'react';
// import { Form, Input, Button, Card } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import StudentProfile from './types';

// const FormPage: React.FC = () => {
//   const [form] = Form.useForm();
//   const history = useNavigate();
//   const [submittedData, setSubmittedData] = useState<StudentProfile | null>(null);

//   const handleSubmit = (values: StudentProfile) => {
//     setSubmittedData(values);
//     history('/details');
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Student Information Form</h2>
//       <Form form={form} layout="vertical" onFinish={handleSubmit}>
//         <Form.Item name="name" label="Name" rules={[{ required: true }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item name="age" label="Age" rules={[{ required: true, type: 'number' }]}>
//           <Input type="number" />
//         </Form.Item>
//         <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item name="address" label="Address" rules={[{ required: true }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default FormPage;
