import {Button, Checkbox, Col, DatePicker, DatePickerProps, Form, Input, Result, Row, Select,} from "antd";
import React, { useEffect, useState } from "react";
import Tablefile from "./Tablefile";
import { TSideMenu } from '../types';
import { useGetSupplier } from "../queries";
import { AntButton, TableLoader } from "@scs/ui";
import { groupBy, map, size } from 'lodash';

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
};

function Formfile ()  {

    
   
  
    const { data, isError, refetch, isSuccess, isLoading } = useGetSupplier();
    const [list, setList] = useState<any[]>([]);
    if (isError) {
        return (
            <Result
              title=""
              status="error"
              style={{ marginTop: '10em' }}
              subTitle="Sorry, something went wrong"
              extra={[<AntButton label="Retry" onClick={refetch} />]}
            />
          );
      }
    
      if (isLoading) {
        return (
          <div style={{ padding: 15 }}>
            <TableLoader numberOfSkeletons={13} />
          </div>
        );
      }

    //   useEffect(() => {
    //     if (isSuccess) {
    //       setList(supplierList(data?.data?.Data?.Result));
    //     }
    //   }, [data, isSuccess]);

    //   const supplierList = (data: TSideMenu[]) => {
    //     if (size(data) > 0) {
    //       return map(data, (item) => {
    //             `${item.Id}-${item.CompanyName}`
    //         console.log(item.CompanyName)
    //       });
    //     }
    //     return [];
    //   };

    return(

        <>
         <div>

             <div className='main'>
                    <h4 className='form-label'></h4>
                 <Form
                     name=""
                     labelCol={{ span: 0 }}
                     wrapperCol={{ span: 12 }}
                     style={{ maxWidth: 400 }}
                     initialValues={{ remember: true }}
                     onFinish={onFinish}
                     onFinishFailed={onFinishFailed}
                     autoComplete="off">
                     <Row className='form-row'>
                         <Col xs={{span: 10}} sm={{span: 16}} md={{span: 11}} lg={{span: 6}} xl={{span: 5}} className='form-col'>
                             <Form.Item className=''
                                        label="From Date"
                                        name="date"
                                         
                             >
                               
                                 <DatePicker className='rr3'   placeholder='Select Date' onChange={onChange} />
                                    
                             </Form.Item>
                         </Col>
                         <Col xs={{span: 10}} sm={{span: 16}} md={{span: 12, offset: 1}} lg={{span: 7, offset: 1}} xl={{span: 6}} className='form-col'>
                             <Form.Item className=''
                                        label="Supplier Name"
                                        name="supplier"
                                        
                             >
                                {/* {map(
                                list,
                                ({ CompanyName, children }: TSideMenu & { children: TSideMenu[] }, index: number) => 
                                (
                                  {CompanyName}
                                //   <Menu.SubMenu key={index} title={CompanyName}>
                                    
                                //   </Menu.SubMenu>
                                )
                            )} */}
                                 <Select
                                     placeholder="" className='rr33'
                                     style={{width: "100%", marginLeft: 20}}
                                     options={[
                                        // supplierList
                                        //   {label: "Debit", value: "Debit"}
                                     ]}
                                 />
                             </Form.Item>
                         </Col>
                         <Col xs={{span: 10}} sm={{span: 16}} md={{span: 11, }} lg={{span: 6, offset: 1}} xl={{span: 6}} className='form-col'>
                             <Form.Item className=''
                                        label="Po From"
                                        name="text2"
                                        
                             >
                                 <Input type='number' className='rr36' style={{marginLeft: 50, padding: 5, width: "100%"}}/>
                             </Form.Item>
                         </Col>
                         <Col xs={{span: 10}} sm={{span: 16}} md={{span: 12, offset: 1}} lg={{span: 4, offset: 0}} xl={{span: 4, offset: 1}} className='form-col'>
                             <Form.Item className=''
                                        label="Status"
                                        name="status"
                                         
                             >
                                 <Select
                                     placeholder=""
                                     style={{width: "135%", marginLeft: 65}} className='rr'
                                     options={[
                                           {label: 'Open', value: 'Open'},
                                     ]}
                                 />
                             </Form.Item>
                         </Col>
                         <Col xs={{span: 10}} sm={{span: 16}} md={{span: 11}} lg={{span: 6 , offset: 3}} xl={{span: 5, offset: 0}} className='form-col'>
                             <Form.Item className=''
                                        label="To Date"
                                        name="dateto"
                                        
                             >
                               
                                          <DatePicker className='rr34' style={{padding: 5, width: "100%" , marginLeft: 15}} placeholder='Select Date' onChange={onChange} />
                                     
                             </Form.Item>
                         </Col>
                         <Col xs={{span: 10}} sm={{span: 16}} md={{span: 12, offset: 1}} lg={{span: 6, offset: 2}} xl={{span: 6, offset: 1}} className='form-col'>
                             <Form.Item className=''
                                        label="Item Name"
                                        name="text2"
                                        
                             >
                                 <Select
                                     placeholder=""
                                     style={{width: "100%", marginLeft: 40}} className='rr2'
                                     options={[
                                         {label: "Load", value: "Load" }, {label: "Cash", value: "Cash"}
                                     ]}
                                 />
                             </Form.Item>
                         </Col>
                         <Col xs={{span: 10}} sm={{span: 16}} md={{span: 11, }} lg={{span: 5, offset: 0}} xl={{span: 6, offset: 1}} className='form-col'>
                             <Form.Item className=''
                                        label="Po To"
                                        name="poto"
                                        
                             >
                                 <Input type='number' className='rr344' style={{marginLeft: 85, padding: 5, width: "100%"}}/>
                             </Form.Item>
                         </Col>
                         <Col xs={{span: 10}} sm={{span: 16}} md={{span: 12, offset: 1}} lg={{span: 7, offset: 2}} xl={{span: 6, offset: 0}} className='form-col'>
                             <Form.Item className=''
                                        label="IsApproved"
                                        name="approved"
                                        
                             >
                                <Row style={{width: "100%"}} className="rr2">
                                    <Col span={22}>
                                    <Select
                                    allowClear
                                     placeholder=""
                                     style={{width: "100%", marginLeft: 0}} className=''
                                     options={[
                                        {label: "NotApproved", value: "NotApproved"}
                                     ]}
                                 />
                                    </Col>
                                    <Col span={2}>
                                         {/* <Button  type="primary">Show</Button> */}
                                         <AntButton label="Show" />
                                    </Col>
                                </Row>
                             </Form.Item>
                         </Col>
                     </Row>
                 </Form>
             </div>
             <Tablefile />
         </div>
        </>
    )
}
export default Formfile;