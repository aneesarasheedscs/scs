import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Col, FormInstance, Modal, Row, theme } from 'antd'
import _, { map } from 'lodash'
import React, { useEffect, useState } from 'react'
import PADDY9CCriteria from '.';
import { AlternativeRowColor, AlternativeRowbackground } from '@tradePro/globalAtoms';

const { useToken } = theme;
interface PurchaseAnalyticsDetailProps {
    // purchaseInvoice:any
    PADDY9CData: any;
    // IpcId:number | null
    form: FormInstance,


  }

// const PADDY9C = ({purchaseInvoice,data,IpcId}:PurchaseAnalyticsDetailProps) => {
const PADDY9C = ({form,PADDY9CData}:PurchaseAnalyticsDetailProps) => {
  const [secondOpen, setSecondOpen] = useState(false);
  const [secondClose, setSecondClose] = useState(false);


  const handleSecond = () => setSecondOpen(false);
    // const filteredRecords = purchaseInvoice?.data?.Data?.Result?.filter((item:any)=>item.IpcId === IpcId)
    // console.log(data1,'1')

    const {
        token: { colorPrimary },
      } = theme.useToken();

      const [groupedData, setGroupedData] = useState<any>({});
      console.log(groupedData);
    //   useEffect(() => {
    //   const filteredRecords = purchaseInvoice?.data?.Data?.Result?.filter((item:any)=>item.IpcId === IpcId)
    //     setGroupedData(filteredRecords);
   
    //   }, [data]);

    console.log(PADDY9CData,'itemgroupdata')

    const handleOpenItemGroup = () =>{
      setSecondOpen(true)
    }

    // {groupedData[category].map((item: any, itemIndex: any, arr: any[]) => (
    //     <Col key={itemIndex}> {/* Make sure to add a unique key to each mapped element */}
    //       <div>
    //         <Row
    //           justify={'space-between'}
    //           style={{
    //             color: colorPrimary,
    //             fontSize: '17px',
    //             fontWeight: 'bold',
    //             background: itemIndex % 2 === 0 ? 'lightblue' : 'white', // Apply alternative colors
    //           }}
    //         >
    //           {/* Rest of your code */}
    //         </Row>
    //       </div>
    //       {/* Rest of your code */}
    //     </Col>
    //   ))}
      
  return (
    <div >
           <Row style={{ marginLeft: 5,}}  >
        <Col xxl={24}>
          <Row style={{ marginLeft: 1, marginBottom: 10 }} justify="space-between" gutter={[24, 10]}>
            {/* {map(PADDY9CData?.data?.Data?.Result, (item, index) => ( */}
              <Col xxl={24}>
                <Row justify={'space-between'}>
                  <Col xxl={24}>
                    <Col>
                      <h3
                        style={{
                          background: colorPrimary,
                          borderTopRightRadius: 10,
                          borderTopLeftRadius: 10,
                          padding: 7,
                          color: 'white',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        PADDY C-9

                      </h3>
                    </Col>

                    <div>
                      <Row
                        justify={'space-between'}
                        style={{  fontSize: '17px', fontWeight: 'bold', background: 'lightblue',color:'blue' }}
                      >
                        <Col xxl={6} style={{ textAlign: 'center' }}>
                    Description
                    {/* supplier */}
                        </Col> 
                        <Col xxl={2}>
                          <p style={{ borderBottom: '', width: '' }}>Qty</p>
                        </Col>
                        <Col xxl={2}>
                          <p style={{ borderBottom: '', width: '' }}>Rate</p>
                        </Col>
                        <Col xxl={2}>Avg Rate</Col>
                    
                        <Col xxl={2}>Weight</Col>
                        <Col xxl={2}>Exp/40kg</Col>
                        <Col xxl={2}>Exp+Amount</Col>
                        <Col xxl={2}>MinRate</Col>
                        <Col xxl={2}>MaxRate</Col>
                      </Row>
                    </div>
                    {/* <div>
                      <Row
                        justify={'space-between'}
                        style={{
                          color: colorPrimary,
                          fontSize: '17px',
                          fontWeight: 'bold',
                          borderBottom: '1px solid grey',
                          background: 'lightblue',
                        }}
                      >
                        <Col xxl={5}></Col>
                        <Col xxl={5}>Weight</Col>
                        <Col xxl={5}>Exp/40kg</Col>
                        <Col xxl={5}>Exp+Amount</Col>
                        <Col xxl={4}>MaxRate</Col>
                      </Row>
                    </div> */}
                 <Row style={{height:'65vh',overflowY:'scroll', overflowX:'hidden'}}>
                    <Col span={24}>
                    {map(PADDY9CData?.data?.Data?.Result, (item, index) => (
                        <>
                             <Col xxl={24}>
              <div>
                      <Row
                        justify={'space-between'}
                        key={index}
                        style={{ fontSize: '17px', fontWeight: 'bold',   background: index % 2 === 0 ? AlternativeRowbackground : 'white'}}
                      >
                        <Col xxl={6} style={{ color: 'blue' }}>
                          {/* {item.Descriptions} */}
                     
                          {/* <a  onClick={()=>handleOpenItemGroup()}>      <a><u>{'PADDY9-C'}</u></a></a> */}
                          {item.Suppplier}

                        </Col>
                        <Col xxl={2} >
                          <p style={{ }}>{numberFormatter(item.Qty)}</p>
                        </Col>
                        <Col xxl={2}>
                          <p style={{  }}>{numberFormatter(item.Rate)}</p>
                        </Col>
                        <Col xxl={2}>{numberFormatter(item.AvgRate)}</Col>
                        <Col xxl={2}>{numberFormatter(item.NetWeight)}</Col>
                        <Col xxl={2}>{numberFormatter(item.Exp40Kg)}</Col>
                        <Col xxl={2}>{numberFormatter(item.AmountWithExp)}</Col>
                        <Col xxl={2}>{numberFormatter(item.MinRate)}</Col>
                        <Col xxl={2}>{numberFormatter(item.MaxRate)}</Col>
                  
                      </Row>
                    </div>
                    <div>
                      <Row
                        justify={'space-between'}
                        style={{ fontSize: '17px', fontWeight: 'bold', background: '	#E6E6FA' }}
                      >
                        <Col xxl={5}></Col>
                        {/* <Col xxl={5}>{numberFormatter(item.NetWeight)}</Col> */}
                        {/* <Col xxl={5}>{numberFormatter(item.Exp40Kg)}</Col> */}
                       
                        {/* <Col xxl={5}>{numberFormatter(item.AmountWithExp)}</Col> */}
                        {/* <Col xxl={4}>{numberFormatter(item.MaxRate)}</Col> */}
                      </Row>
                    </div>
              </Col>
                        </>
                       ))}
                    </Col>
                 </Row>
         
                  </Col>
                </Row>
              </Col>
             {/* ))}  */}
          </Row>
        </Col>
      </Row>
      <>
      <Modal
          open={secondOpen}
          onCancel={handleSecond}
          footer={null}
          width={1700}
          bodyStyle={{
            maxHeight: '80vh',
            overflowY: 'auto',
            paddingRight: '15px',
            height: '80vh',
            marginRight: '20px',
          }}
        >
          <div style={{ maxHeight: '100%' }}>
            {/* <PuchaseAnalyticsB purchaseInvoice={purchaseInvoice} data={data} IpcId={IpcId} /> */}
            {/* <ItemGroupCriteria/> */}
            {/* <h1> PADDY  C-9</h1> */}
            <PADDY9CCriteria/>
           {/* <PADDY9C ItemGroupData={data} form={form} /> */}
       

           
          </div>
        </Modal>
      </>
    </div>
  )
}

export default PADDY9C