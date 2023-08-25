
import React from 'react';
import {useState , useEffect} from "react"
import {Badge, Button, Col, Input, Row, Table, TableProps} from 'antd';
import type { ColumnsType } from 'antd/es/table';
 
interface TableColumns {
    title: string;
    dataIndex: string;

}
const Tablefile: React.FC =(  ) => {
    const columns: ColumnsType<TableColumns> = [

        {
            title: "Order No",
            dataIndex: "",

        },
        {
            title: "Order Date",
            dataIndex: "",

        },
        {
            title: "Supplier Name",
            // dataIndex: "",
            width: "200px",
            render: (_ : any ,record: any)=>{
                return <>  <h4 style={{color: "blue"}}>{record.title}</h4>  </>
            }
        },
        {
            title: "Delivery Term",
            dataIndex: ""
        },
        {
            title: "Item Name",
            dataIndex: "title"
            
        },
        {
            title: "Base UOM",
            dataIndex: "discountPercentage",
        },
        {
            title: "Order Qty",
            dataIndex: "stock",
             
        },
        {
            title: "Rej Qty",
            dataIndex: "rating",
        },
        {
            title: "Balance Qty",
            dataIndex: "price",
        },
        {
            title: "Order Weight",
            dataIndex: "price",
        },
        {
            title: "Recieved Weight",
            dataIndex: "price",
        },
        {
            title: "Bal Weight",
            dataIndex: "price",
        },
        {
            title: "Item Rate",
            dataIndex: "price",
        },
        {
            title: "Approved",
            dataIndex: "",
        },
        {
            title: "Approved Date",
            dataIndex: "",
        },
        {
            title: "Order Expiry Date",
            dataIndex: "",
        },
        {
            title: "Slip",
            fixed: 'right',
            render: (_ : any,record: any)=>{
                return <>  <Button style={{background: "#747bff", color: "#fff"}}>Slip</Button> </>
            }
        },

    ];
    const [dataSource , setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect (()=>{
        setLoading(true);
        

        //   fetch('https://dummyjson.com/products/search?q=phone')
        //     .then(res => res.json())
        //     .then((result) =>{
        //         setDataSource(result.products);
        //         console.log(result.products);
        //     });
           setLoading(false)

    } ,[])
   

    
    return (
        <>
            <div className='border'>
                <Row style={{background: "#747bff", padding: 5, marginTop: 10}}>
                    <Col span={10}>
                      <Input  placeholder='Drag a Column header here to group by that column.'/>
                    </Col>
                </Row>
                <Table className='tablestyling'
                       columns={columns}
                       loading={loading}
                       dataSource={dataSource}
                       scroll={{ x: 1500, y: 600 }}
                       // expandable={{
                       //     expandedRowRender: (record)=> <p>{record.description} { record.images} </p> ,
                       //
                       // }}
                       //expandable={{ expandedRowRender, defaultExpandedRowKeys: ['']  }}
                    //    footer={() => {
                           
                    //    }}
                />
               
            </div>


        </>
    )
}

export default Tablefile