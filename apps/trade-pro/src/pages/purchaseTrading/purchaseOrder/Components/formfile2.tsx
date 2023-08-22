// import React, { useState } from 'react';
// import { ColumnsType } from 'antd/es/table';
// import type { SelectProps } from 'antd';
// import { Simulate } from 'react-dom/test-utils';
// import select = Simulate.select;
// import TextArea from 'antd/es/input/TextArea';
// import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
// import { Button, Col, Form, Input, Popconfirm, Row, Select, Space, Table } from 'antd';
// import { useGetItem, useGetUom, useJobLot } from './queries';
// import { AntButton, AntInput, AntSelectDynamic } from '@scs/ui';
// import { map } from 'lodash';
// import { TCompanyBranchDetail } from '@tradePro/pages/login/types';
// // import { columnss } from './columns';
// const { useForm, useWatch } = Form;

// interface DataType {
//   key: string;
//   name: any;
//   joblot: any;
//   base: any;
//   quantity: any;
//   weight: any;
//   rate: any;
//   rate2: any;
//   amount: any;
// }
// const options: SelectProps['options'] = [];

// for (let i = 10; i < 40; i++) {
//   options.push({ label: `Makai Ata` + i + `KG`, value: `Makai Ata` + i + `KG` });
// }
// const handleChange = (value: string[]) => {
//   console.log(`selected ${value}`);
// };
// const onSearch = (value: string) => {
//   console.log('search:', value);
// };
// function Formfile2() {
//   const [form] = useForm<TCompanyBranchDetail>();
//   const [list, setList] = useState<any[]>([]);
//   const formValues = useWatch<TCompanyBranchDetail>([], form);
//   const { data, isSuccess, isError, isLoading, isRefetching } = useGetItem();
//   const {
//     data: uomData,
//     isSuccess: isUomSuccess,
//     isError: isUomError,
//     isLoading: isUomLoading,
//   } = useGetUom();
//   const {
//     data: joblot,
//     isSuccess: isSuccessjob,
//     isError: isErrorjob,
//     isLoading: isLoadingjob,
//   } = useJobLot();

//   // const columns: ColumnsType<DataType> = [
//   //   {
//   //     title: 'Sr#',
//   //     dataIndex: 'key',
//   //     key: 'key',
//   //     fixed: 'left',
//   //     width: '60px',
//   //   },
//   //   {
//   //     title: 'Item Name',
//   //     dataIndex: 'name',
//   //     key: 'name',
//   //     width: '250px',
//   //   },
//   //   {
//   //     title: 'Job Lot',
//   //     dataIndex: 'joblot',
//   //     key: 'joblot',
//   //     width: '180px',
//   //   },
//   //   {
//   //     title: 'Base Uom',
//   //     dataIndex: 'base',
//   //     key: 'base',
//   //     width: '150px',
//   //   },

//   //   {
//   //     title: 'Item Quantity',
//   //     dataIndex: 'quantity',
//   //     key: 'quantity',
//   //     width: '150px',
//   //   },

//   //   {
//   //     title: ' Weight',
//   //     dataIndex: 'weight',
//   //     key: 'weight',
//   //     width: '150px',
//   //   },
//   //   {
//   //     title: 'Item Rate',
//   //     dataIndex: 'rate',
//   //     key: 'rate',
//   //     width: '150px',
//   //   },
//   //   {
//   //     title: 'Rate Uom',
//   //     dataIndex: 'rate2',
//   //     key: 'rate2',
//   //     width: '150px',
//   //   },
//   //   {
//   //     title: 'Amount',
//   //     dataIndex: 'amount',
//   //     key: 'amount',
//   //     width: '150px',
//   //   },

//   //   {
//   //     title: 'Action',
//   //     key: 'action',
//   //     // fixed: 'right',
//   //     width: '150px',
//   //     render: (_, record: { key: React.Key }) => (
//   //       <Space size="middle">
//   //         <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
//   //           <Button className="button3">
//   //             {' '}
//   //             <DeleteFilled />{' '}
//   //           </Button>
//   //         </Popconfirm>
//   //       </Space>
//   //     ),
//   //   },
//   // ];
//   const handleDelete = (key: React.Key) => {
//     const newData = list.filter((item) => item.key !== key);
//     // setDataSource(newData);
//     console.log(data?.data?.Data?.Result);
//   };
//   const [count, setCount] = useState(0);
//   // const [dataSource, setDataSource] = useState<DataType[]>([
//   //   {
//   //     key: `${count}`,
//   //     name: (
//   //       <AntSelectDynamic
//   //         fieldValue="ItemName"
//   //         isError={isError}
//   //         isLoading={isLoading}
//   //         optionFilterProp="children"
//   //         showSearch
//   //         bordered={false}
//   //         className="select"
//   //         placeholder="click to select an item"
//   //         allowClear
//   //         fieldLabel="ItemName"
//   //         name="ItemsName"
//   //         style={{ width: '100%', marginLeft: 0 }}
//   //         data={data?.data?.Data?.Result}
//   //       />
//   //     ),
//   //     joblot: (
//   //       <AntSelectDynamic
//   //         fieldValue="JobLotDescription"
//   //         isError={isError}
//   //         isLoading={isLoading}
//   //         optionFilterProp="children"
//   //         showSearch
//   //         bordered={false}
//   //         className="select"
//   //         placeholder="select job/lot"
//   //         allowClear
//   //         fieldLabel="JobLotDescription"
//   //         name="ItemsName"
//   //         style={{ width: '100%', marginLeft: 0 }}
//   //         data={joblot?.data?.Data?.Result}
//   //       />
//   //     ),
//   //     base: (
//   //       <AntInput
//   //         name="ToDocNo"
//   //         inputProps={{ type: 'number' }}
//   //         className="input"
//   //         bordered={false}
//   //       />
//   //     ),

//   //     quantity: (
//   //       <AntInput
//   //         name="quantity"
//   //         inputProps={{ type: 'number' }}
//   //         className="input"
//   //         bordered={false}
//   //       />
//   //     ),
//   //     weight: (
//   //       <AntInput
//   //         name="weight"
//   //         inputProps={{ type: 'number' }}
//   //         className="input"
//   //         bordered={false}
//   //       />
//   //     ),
//   //     rate: (
//   //       <AntInput name="rate" inputProps={{ type: 'number' }} className="input" bordered={false} />
//   //     ),
//   //     rate2: (
//   //       <AntSelectDynamic
//   //         fieldValue="UOMCode"
//   //         isError={isError}
//   //         isLoading={isLoading}
//   //         optionFilterProp="children"
//   //         showSearch
//   //         bordered={false}
//   //         className="select"
//   //         placeholder="select Rate Uom"
//   //         allowClear
//   //         fieldLabel="UOMCode"
//   //         name="ItemsName"
//   //         style={{ width: '100%', marginLeft: 0 }}
//   //         data={uomData?.data?.Data?.Result}
//   //       />
//   //     ),
//   //     amount: (
//   //       <AntInput
//   //         name="quantity"
//   //         inputProps={{ type: 'number' }}
//   //         className="input"
//   //         bordered={false}
//   //       />
//   //     ),
//   //   },
//   // ]);

//   const handleAdd = () => {
//     const newData: DataType = {
//       key: `${count + 1}`,
//       name: (
//         <Select
//           optionFilterProp="children"
//           showSearch
//           bordered={false}
//           className="select"
//           placeholder="click to select an item"
//           allowClear
//           onChange={handleChange}
//           options={options}
//           onSearch={onSearch}
//         />
//       ),
//       joblot: (
//         <Select
//           bordered={false}
//           className="select"
//           placeholder="select job/lot"
//           allowClear
//           onChange={handleChange}
//           options={[{ label: 'General', value: 'General' }]}
//         />
//       ),
//       base: <Input className="input" bordered={false} />,
//       quantity: <Input className="input" bordered={false} />,
//       weight: <Input className="input" bordered={false} />,
//       rate: <Input className="input" bordered={false} />,
//       rate2: (
//         <Select
//           bordered={false}
//           className="select"
//           placeholder="select Rate Uom"
//           allowClear
//           onChange={handleChange}
//           options={[
//             { label: '50Kg', value: '50Kg' },
//             { label: '40Kg', value: '40Kg' },
//           ]}
//         />
//       ),
//       amount: <Input className="input" type="number" bordered={false} />,
//     };
//     // setDataSource([...dataSource, newData]);
//     setCount(count + 1);
//   };

//   return (
//     <>
//       {/* <Table
//         columns={columnss(handleDelete, data)}
//         dataSource={data?.data?.Data?.Result}
//         className="table"
//         bordered
//         size="middle"
//         scroll={{ x: 'calc(700px + 60%)' }}
//         // scroll={{  y: 90 }}
//         title={() => {
//           return (
//             <>
//               <AntButton onClick={handleAdd} icon={<PlusOutlined />}></AntButton>
//             </>
//           );
//         }}
//       /> */}
//       <Row className="row3">
//         <Col md={{ span: 16, offset: 0 }} lg={{ span: 12 }} className="remarks2">
//           <p className="remarks">Remarks</p>
//           <TextArea
//             style={{ width: '95%', height: '80px', margin: '0px 20px 10px 20px' }}
//             placeholder="Will be displayed on purchase order"
//           />
//         </Col>
//         <Col md={{ span: 16 }} lg={{ span: 10 }} className="remarks2">
//           <Space className="space">
//             <Row className="row0">
//               <Col span={10} className="columnsfooter">
//                 <p style={{ fontSize: 16, marginBottom: -5 }}>Sub Total:</p>
//                 Total Quantity: 1
//               </Col>
//               <Col span={8} className="columnsfooter2">
//                 <p>000.000</p>
//               </Col>
//               <Row className="row0">
//                 <Col span={6} className="columnsfooter">
//                   <p>Discount</p>
//                 </Col>
//                 <Col span={8} className="columnsfooter">
//                   <div className="inputbox">
//                     <Input type="number" bordered={false} style={{ width: '60%' }} />
//                     <Select
//                       bordered={false}
//                       options={[
//                         { label: '%', value: '%' },
//                         { label: 'SGD', value: 'SGD' },
//                       ]}
//                       className="select-style"
//                     />
//                   </div>
//                 </Col>
//                 <Col span={8} className="columnsfooter2">
//                   <p>000.000</p>
//                 </Col>
//               </Row>
//               <Row className="row0">
//                 <Col span={8} className="columnsfooter">
//                   <h3>Total</h3>
//                 </Col>
//                 <Col span={8} className="columnsfooter2">
//                   <h3>1024.000</h3>
//                 </Col>
//               </Row>
//             </Row>
//           </Space>
//         </Col>
//       </Row>
//     </>
//   );
// }
// export default Formfile2;
