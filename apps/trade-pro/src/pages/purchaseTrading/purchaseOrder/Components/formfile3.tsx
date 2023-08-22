// import React, { ReactNode } from 'react';
// import { Form, Input, Select, Button, AutoComplete, Row } from 'antd';
// import { useForm } from 'antd/lib/form/Form';
// import { useGetItem, useGetUom, useJobLot } from './queries';
// import { indexOf, map, remove } from 'lodash';
// import { AntButton, AntInput, AntSelectDynamic } from '@scs/ui';
// import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
// import { appendFile, appendFileSync } from 'fs';

// const { Option } = Select;

// const DynamicForm = () => {
//   const [form] = useForm();
//   //   const { append, remove, fields } = useFieldArray({
//   //     control: form.control,
//   //     name: 'items',
//   //   });
//   const { data } = useGetItem();
//   const {
//     data: joblot,
//     isSuccess: isSuccessjob,
//     isError: isErrorjob,
//     isLoading: isLoadingjob,
//   } = useJobLot();
//   const {
//     data: uomData,
//     isSuccess: isUomSuccess,
//     isError: isUomError,
//     isLoading: isUomLoading,
//   } = useGetUom();

//   const calculateTotal = (quantity: number, baseUom: number) => {
//     return (quantity * baseUom).toFixed(2);
//   };
//   const handleDelete = (form: any) => {
//     console.log(form);
//   };
//   const handleAdd = (form: any) => {
//     console.log(form);
//     // appendFile(form,)
//   };
//   return (
//     <>
//       <Form form={form} layout={'vertical'} style={{ marginTop: 30 }}>
//         <div>
//           <AntButton
//             icon={<PlusOutlined />}
//             onClick={() => handleAdd(form)}
//             style={{ marginTop: 25 }}
//           ></AntButton>
//           <Row>
//             <Form.Item label="ItemName" style={{ marginRight: 40 }}>
//               <AntSelectDynamic
//                 fieldValue="ItemName"
//                 optionFilterProp="children"
//                 showSearch
//                 bordered={false}
//                 className="select"
//                 placeholder="click to select an item"
//                 allowClear
//                 fieldLabel="ItemName"
//                 name="ItemsName"
//                 style={{ width: '120%', marginRight: 0 }}
//                 data={data?.data?.Data?.Result}
//               />
//             </Form.Item>
//             <Form.Item label="Job/Lot" style={{ marginRight: 15 }}>
//               <AntSelectDynamic
//                 fieldValue="JobLotDescription"
//                 isError={isSuccessjob}
//                 isLoading={isLoadingjob}
//                 optionFilterProp="children"
//                 showSearch
//                 bordered={false}
//                 className="select"
//                 placeholder="select job/lot"
//                 allowClear
//                 fieldLabel="JobLotDescription"
//                 name="JobLotDescription"
//                 style={{ width: '100%', marginLeft: 5 }}
//                 data={joblot?.data?.Data?.Result}
//               />
//             </Form.Item>
//             <Form.Item label="Base Uom" style={{ marginRight: 10 }}>
//               <AntInput
//                 name="baseUom"
//                 inputProps={{ type: 'number' }}
//                 className="input"
//                 bordered={false}
//                 style={{ width: '100%', marginLeft: 0 }}
//               />
//             </Form.Item>
//             <Form.Item label="Item Quantity" style={{ marginRight: 10 }}>
//               <AntInput
//                 name="quantity"
//                 inputProps={{ type: 'number' }}
//                 className="input"
//                 bordered={false}
//               />
//             </Form.Item>
//             <Form.Item label="Weight" style={{ marginRight: 10 }}>
//               {/* <Input
//                 // value={calculateTotal(field.value?.quantity, field.value?.baseUom)}
//                 readOnly
//               /> */}
//               <AntInput
//                 readOnly
//                 className="input"
//                 bordered={false}
//                 // value={calculateTotal(field.value?.quantity, field.value?.baseUom)}
//               />
//             </Form.Item>
//             <Form.Item label="Item Rate" style={{ marginRight: 10 }}>
//               <AntInput
//                 name="itemRate"
//                 inputProps={{ type: 'number' }}
//                 className="input"
//                 bordered={false}
//               />
//             </Form.Item>
//             <Form.Item label="Rate UOM" style={{ marginRight: 10 }}>
//               <AntSelectDynamic
//                 fieldValue="UOMCode"
//                 optionFilterProp="children"
//                 showSearch
//                 bordered={false}
//                 className="select"
//                 placeholder="select Rate Uom"
//                 allowClear
//                 fieldLabel="UOMCode"
//                 name="UOMCodes"
//                 style={{ width: '100%', marginLeft: 0 }}
//                 data={uomData?.data?.Data?.Result}
//               />
//             </Form.Item>
//             <Form.Item label="Amount" style={{ marginRight: 10 }}>
//               <AntInput
//                 name="Amount"
//                 inputProps={{ type: 'number' }}
//                 className="input"
//                 bordered={false}
//               />
//             </Form.Item>
//             <AntButton
//               icon={<DeleteFilled />}
//               onClick={() => handleDelete(form)}
//               style={{ marginTop: 25 }}
//             ></AntButton>
//           </Row>
//         </div>

//         {/* <Button
//           type="dashed"
//           onClick={() => append({ item: '', quantity: 0, unitPrice: 0 })}
//           style={{ marginTop: 10 }}
//         >
//           Add Row
//         </Button> */}
//       </Form>
//     </>
//   );
// };

// export default DynamicForm;
