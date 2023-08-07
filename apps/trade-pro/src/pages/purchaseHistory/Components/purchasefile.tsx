import {Button, Col, DatePicker, DatePickerProps, Form, Row, Select, Space, Table,} from "antd";
import React, {useState} from "react";
import type { SelectProps } from 'antd';
import {ColumnsType} from "antd/es/table";
const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
};


const options: SelectProps['options'] = [];

for (let i = 10; i < 20; i++) {
    options.push({
        value: i.toString(20) + i,
        label: i.toString(20) + i,
    });
}
interface DataType {
    key: string;
    // name: string;


}


const columns: ColumnsType<DataType> = [
    {
        title: 'Sr#',
        dataIndex: 'key',
        key: 'key',
        fixed: 'left',
        width: "100px"
    },
    {
        title: 'Item Name',
        dataIndex: 'name',
        key: 'name',
        width: "200px",
        render: (text) => <h4 style={{color: "blue"}}>{text}</h4>,
    },
    {
        title: "Job Lot",
        dataIndex: "",
        key: "",
    },
    {
        title: "Base Uom",
        dataIndex: "",
        key: "",
    },


    {
        title: "Item Quantity",
        dataIndex: "",
        key: "",
    },

    {
        title: ' Weight',
        dataIndex: '',
        key: '',
    },
    {
        title: 'Item Rate',
        dataIndex: '',
        key: '',
    },
    {
        title: 'Rate Uom',
        dataIndex: '',
        key: '',
    },
    {
        title: "Amount",
        dataIndex: "",
        key: "",
    },

    {
        title: "Remarks",
        dataIndex: "",
        key: "",
    },

    {
        title: 'Action',
        key: 'action',
        // fixed: 'right',
        width: "200px",
        render: (_, record) => (
            <Space size="middle">
                <button  >Delete</button>
            </Space>
        ),
    },
];

const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
};
const Purchasefile: React.FC =() => {

    const [dataSource, setDataSource] = useState<DataType[]>([
        {
            key: '1',
            // name: 'Makai Ata 40kg',

        },


    ]);

    return(
        <>
            <div>
                <h3 className='form-heading'>PURCHASE ORDER HISTORY</h3>
                <div className='history'>
                    <h4 className='form-label'>History</h4>
                    <Form
                        name=""
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 500 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off">
                        <Row  className='row-col2'>
                            <Col span={8}  className='row3P'>
                            <Form.Item
                                       label="From Date"
                                       name="date"

                            >
                                        <DatePicker style={{padding: 5, width: "100%", border: ""}} placeholder='Select Date' onChange={onChange} />

                            </Form.Item>
                            </Col>
                            <Col span={8}  className='row3P'>
                            <Form.Item
                                       label="Supplier Name"
                                       name="supplier"

                            >
                                <Select
                                    placeholder="Select Supplier"
                                    style={{width: "100%"}}
                                    allowClear
                                    options={[
                                        {label: 'AAA FOODS SARGODHA', value: 'AAA FOODS SARGODHA'}, {label: 'AAA FOODS SARGODHA', value: 'AAA FOODS SARGODHA'},
                                    ]}
                                />
                            </Form.Item>
                            </Col>
                            <Col span={8}  className='row3P'>
                                <Form.Item   className='col-style'
                                           label="To Date"
                                           name="date to"

                                >
                                    <DatePicker style={{padding: 5, width: "100%", marginLeft: "18px"}} placeholder='Select Date' onChange={onChange} />

                                </Form.Item>
                            </Col>
                            <Col span={8}  className='row3P'>
                                <Form.Item className='col-style'
                                           label="Item Name"
                                           name="Item"
                                >
                                    <Select
                                        placeholder="Select Item"
                                        allowClear
                                        style={{width: "100%", marginLeft: "18px"}}
                                        onChange={handleChange}
                                        options={[
                                              {label: 'AAA FOODS SARGODHA', value: 'AAA FOODS SARGODHA'},
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}  className='row3P'>
                                <Form.Item className='col-style'
                                           label="Po From"
                                           name="Pofrom"

                                >
                                    <Select
                                        placeholder=" "
                                        style={{width: "100%", marginLeft: "18px"}}
                                        allowClear   onChange={handleChange} mode="tags"
                                        options={options}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}  className='row3P'>
                                <Form.Item className='col-style2'
                                           label="Status"
                                           name="status"
                                >
                                    <Select
                                        placeholder=" "
                                        style={{width: "100%", marginLeft: '50px'}}
                                        allowClear
                                        options={[
                                            {label: 'Open', value: 'Open'}, {label: 'Close', value: 'Close'},
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}  className='row3P'>
                                <Form.Item className='col-style3'
                                           label="Po To"
                                           name="Poto"
                                >
                                    <Select
                                        placeholder=" "
                                        style={{width: "100%", marginLeft: "38px"}}
                                        allowClear onChange={handleChange}  mode="tags"
                                        options={options}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}  className='row3P'>
                                <Form.Item className='col-style'
                                           label="IsApproved"
                                           name="approved"
                                >
                                    <Select
                                        placeholder=" "
                                        style={{width: "100%", marginLeft: "20px"}}
                                        allowClear
                                        options={[
                                            {label: 'Approved', value: 'Approved'}, {label: 'Not Approved', value: 'Not Approved'},
                                        ]}
                                    />
                                </Form.Item>
                            </Col>


                        </Row>
                    </Form>
                </div>
            </div>
            <div className='table'>

            <Table columns={columns} dataSource={dataSource} className='table2'
                   bordered
                   size="middle"
                   scroll={{  y: 400 }}

                   footer={()=> {
                       return(
                           <>
                               <div className='footer'>
                                   <h4>0</h4>
                                   <h4>000</h4>
                                   <h4>0000</h4>
                               </div>
                           </>
                       )
                   }}
            />
            </div>
        </>
    )
}
export default Purchasefile;