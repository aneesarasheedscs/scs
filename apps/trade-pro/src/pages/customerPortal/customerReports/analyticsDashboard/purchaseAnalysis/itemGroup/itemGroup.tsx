import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Col, FormInstance, Modal, Row, theme } from 'antd';
import _, { groupBy, map } from 'lodash';
import React, { useEffect, useState } from 'react';
import PADDY9CCriteria from './PADDY9-C';
import { AlternativeRowbackground } from '@tradePro/globalAtoms';
const { useToken } = theme;
interface PurchaseAnalyticsDetailProps {
  // purchaseInvoice:any
  ItemGroupData: any;
  IpcId: number | null;
  form: FormInstance;
}
// const ItemGroup = ({purchaseInvoice,data,IpcId}:PurchaseAnalyticsDetailProps) => {
const ItemGroup = ({ form, ItemGroupData, IpcId }: PurchaseAnalyticsDetailProps) => {
  const [secondOpen, setSecondOpen] = useState(false);
  const [secondClose, setSecondClose] = useState(false);
  const handleSecond = () => setSecondOpen(false);
  // const filteredRecords = purchaseInvoice?.data?.Data?.Result?.filter((item:any)=>item.IpcId === IpcId)
  // console.log(data1,'1')
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const [groupedData, setGroupedData] = useState<any[]>([]);
  console.log(groupedData, 25);
  // useEffect(() => {
  //   const structuredData = ItemGroupData?.data?.Data?.Result?.reduce((acc: any[], currentItem: any) => {
  //     // Find if the item already exists in the accumulator array
  //     const existingItemIndex = acc.findIndex(item => item.ItemName === currentItem.ItemName);
  
  //     if (existingItemIndex !== -1) {
  //       // If the item already exists, update its total quantity
  //       acc[existingItemIndex].TotalQty += currentItem.Qty;
  //       // Also, add the current record to the existing item's data array
  //       acc[existingItemIndex].Data.push({
  //         SortNo: currentItem.SortNo,
  //         Descriptions: currentItem.Descriptions,
  //         ParentCategory: currentItem.ParentCategory,
  //         Suppplier: currentItem.Suppplier,
  //         Qty: currentItem.Qty,
  //         NetWeight: currentItem.NetWeight,
  //         Rate: currentItem.Rate,
  //         Exp40Kg: currentItem.Exp40Kg,
  //         AvgRate: currentItem.AvgRate, 
  //         Amount: currentItem.Amount,
  //         AmountWithExp: currentItem.AmountWithExp,
  //         MinRate: currentItem.MinRate,
  //         MaxRate: currentItem.MaxRate,
  //       });
  //     } else {
  //       // If the item doesn't exist, add it to the accumulator array
  //       acc.push({
  //         ItemName: currentItem.ItemName,
  //         ItemId: currentItem.ItemId,
  //         TotalQty: currentItem.Qty, // Initialize total quantity with the current record's quantity
  //         Data: [
  //           {
  //             SortNo: currentItem.SortNo,
  //             Descriptions: currentItem.Descriptions,
  //             ParentCategory: currentItem.ParentCategory,
  //             Suppplier: currentItem.Suppplier,
  //             Qty: currentItem.Qty,
  //             NetWeight: currentItem.NetWeight,
  //             Rate: currentItem.Rate,
  //             Exp40Kg: currentItem.Exp40Kg,
  //             AvgRate: currentItem.AvgRate,
  //             Amount: currentItem.Amount,
  //             AmountWithExp: currentItem.AmountWithExp,
  //             MinRate: currentItem.MinRate,
  //             MaxRate: currentItem.MaxRate,
  //           },
  //         ],
  //       });
  //     }
  //     return acc; // Return the accumulator
  //   }, []); // Initialize acc as an empty array
  
  //   setGroupedData(structuredData);
  // }, [ItemGroupData]);
 

useEffect(() => {
  if (!ItemGroupData?.data?.Data?.Result) return;

  const structuredData = _.chain(ItemGroupData.data.Data.Result)
  .groupBy('ItemName')
  .map((groupedRecords, itemName, index) => {
      const maxRateRecord = _.maxBy(groupedRecords, 'Rate');
      const minRateRecord = _.minBy(groupedRecords, 'Rate');
      return {
          ItemName: itemName,
          ItemId: _.get(groupedRecords[0], 'ItemId', null), // Assuming ItemId is the same for all records with the same itemName
          TotalQty: _.sumBy(groupedRecords, 'Qty'),
          TotalNetWeight: _.sumBy(groupedRecords, 'NetWeight'),
          TotalAmountWithExp   : _.sumBy(groupedRecords, 'AmountWithExp'),
          TotalAmount: _.sumBy(groupedRecords, 'Amount'),
          TotalExp40Kg: _.sumBy(groupedRecords, 'Exp40Kg'),
          MinRate: minRateRecord?.Rate || null,
          MaxRate: maxRateRecord?.Rate || null,
          // Rate: 
          Data: groupedRecords.map(record => ({
              SortNo: record.SortNo,
              Descriptions: record.Descriptions,
              ParentCategory: record.ParentCategory,
              Suppplier: record.Suppplier,
              Qty: record.Qty,
              NetWeight: record.NetWeight,
              Rate: record.Rate,
              Exp40Kg: record.Exp40Kg,
              AvgRate: record.AvgRate,
              Amount: record.Amount,
              AmountWithExp: record.AmountWithExp,
              MinRate: record.MinRate,
              MaxRate: record.MaxRate,
          })),
      };
  })
  .value();


  setGroupedData(structuredData);
}, [ItemGroupData]);

  
  // useEffect(() => {
  //   const structuredData = ItemGroupData?.data?.Data?.Result?.reduce((acc: any[], currentItem: any) => {
  //     // Check if there's already an entry for the ItemName
  //     const existingItem = acc.find(item => item.ItemName === currentItem.ItemName);
  
  //     if (existingItem) {
  //        existingItem.Data.push({
  //         SortNo: currentItem.SortNo,
  //         Descriptions: currentItem.Descriptions,
  //         ParentCategory: currentItem.ParentCategory,
  //         Suppplier: currentItem.Suppplier,
  //         Qty: currentItem.Qty,
  //         NetWeight: currentItem.NetWeight,
  //         Rate: currentItem.Rate,
  //         Exp40Kg: currentItem.Exp40Kg,
  //         AvgRate: currentItem.AvgRate,
  //         Amount: currentItem.Amount,
  //         AmountWithExp: currentItem.AmountWithExp,
  //         MinRate: currentItem.MinRate,
  //         MaxRate: currentItem.MaxRate,
  //       });
  //     } else { 
  //       acc.push({
  //         ItemName: currentItem.ItemName,
  //         ItemId: currentItem.ItemId,
  //         TotalQty: currentItem.Qty, 
  //         Data: [
  //           {
  //             SortNo: currentItem.SortNo,
  //             Descriptions: currentItem.Descriptions,
  //             ParentCategory: currentItem.ParentCategory,
  //             Suppplier: currentItem.Suppplier,
  //             Qty: currentItem.Qty,
  //             NetWeight: currentItem.NetWeight,
  //             Rate: currentItem.Rate,
  //             Exp40Kg: currentItem.Exp40Kg,
  //             AvgRate: currentItem.AvgRate,
  //             Amount: currentItem.Amount,
  //             AmountWithExp: currentItem.AmountWithExp,
  //             MinRate: currentItem.MinRate,
  //             MaxRate: currentItem.MaxRate,
  //           },
  //         ],
  //       });
  //     }
  //     return acc; // Return the accumulator
  //   }, []); // Initialize acc as an empty array
  
  //   setGroupedData(structuredData);
  // }, [ItemGroupData]);
  
    // useEffect(() => {
    // // const groupedRecords =  groupBy(ItemGroupData?.data?.Data?.Result, (item)=> item.ItemName)
    // const structuredData =  ItemGroupData?.data?.Data?.Result?.reduce((acc: any[], currentItem: any) => {
    //   // Check if there's already an entry for the SupplierName and SupplierId
    //   const existingItem = acc?.find(
    //     item => item.ItemName === currentItem.ItemName,
    //   );

    //   if (existingItem) {
    //     existingItem.Data.push({
    //       SortNo: currentItem.SortNo,
    //       Descriptions: currentItem.Descriptions,
    //       ParentCategory: currentItem.ParentCategory,
    //       Suppplier: currentItem.Suppplier,
    //       Qty: currentItem.Qty,
    //       NetWeight: currentItem.NetWeight,
    //       Rate: currentItem.Rate,
    //       Exp40Kg: currentItem.Exp40Kg,
    //       AvgRate: currentItem.AvgRate,
    //       Amount: currentItem.Amount,
    //       AmountWithExp: currentItem.AmountWithExp,
    //       MinRate: currentItem.MinRate,
    //       MaxRate: currentItem.MaxRate,
    //     });
    //   } else {
    //     // If the Supplier doesn't exist, create a new entry
    //     acc.push({
    //       ItemName: currentItem.ItemName,
    //       ItemId: currentItem.ItemId,
    //       Data: [
    //         {
    //           SortNo: currentItem.SortNo,
    //           Descriptions: currentItem.Descriptions,
    //           ParentCategory: currentItem.ParentCategory,
    //           Suppplier: currentItem.Suppplier,
    //           Qty: currentItem.Qty,
    //           NetWeight: currentItem.NetWeight,
    //           Rate: currentItem.Rate,
    //           Exp40Kg: currentItem.Exp40Kg,
    //           AvgRate: currentItem.AvgRate,
    //           Amount: currentItem.Amount,
    //           AmountWithExp: currentItem.AmountWithExp,
    //           MinRate: currentItem.MinRate,
    //           MaxRate: currentItem.MaxRate,
    //         },
    //       ],
    //     });
    //   }
    // })
    //   setGroupedData(structuredData);
    // }, [ItemGroupData]);
  console.log(ItemGroupData, 'itemgroupdata');
  const handleOpenItemGroup = () => {
    setSecondOpen(true);
  };
  return (
    <div>
      <Row style={{ marginLeft: 5 }}>
        <Col xxl={24}>
          <Row style={{ marginLeft: 1, marginBottom: 10 }} justify="space-between" gutter={[24, 10]}>
            <Col span={24}>
              <div>
                <Row
                  justify={'space-between'}
                  style={{ color: 'blue', fontSize: '17px', fontWeight: 'bold', background: 'lightblue', }}
                >
                  <Col xxl={3} style={{ textAlign: '' }}>
                    Item
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
            </Col>
            {map(groupedData, (item, index) => (
              <Col xxl={24}>
                <Row justify={'space-between'}>
                  <Col xxl={24}>
                    {/* <Col>
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
                        {'Item Group'}
                      </h3>
                    </Col> */}
                    <div>
                      <Row
                        justify={'space-between'}
                        // style={{ fontSize: '17px', fontWeight: 'bold', background: ' #E6E6FA' }}
                        // style={{ fontSize: '17px', fontWeight: 'bold', background: ' #214A57' }}
                        style={{ fontSize: '17px', fontWeight: 'bold', background: index % 2 === 0 ? AlternativeRowbackground : 'white' }}
                      >
                        <Col xxl={3}  >
                          {/* {item.Descriptions} */}
                          <a onClick={() => handleOpenItemGroup()} style={{color:'blue'}}>
                      
                          <u>{item.ItemName}</u>
                            
                            </a>
                    
                        </Col>
                        <Col xxl={2}>
                          <p style={{ borderBottom: '', width: '' }}>{numberFormatter(item.TotalQty)}</p>
                        </Col>
                        <Col xxl={2}>
                          <p style={{ borderBottom: '', width: '' }}>{numberFormatter(item.Rate)}</p>
                        </Col>
                        <Col xxl={2}>{numberFormatter(item.AvgRate)}</Col>
                        <Col xxl={2}>{numberFormatter(item.TotalNetWeight)}</Col>
                        <Col xxl={2}>{numberFormatter(item.TotalExp40Kg)}</Col>
                        <Col xxl={2}>{numberFormatter(item.TotalAmountWithExp)}</Col>
                        <Col xxl={2}>{numberFormatter(item.MinRate)}</Col>
                        <Col xxl={2}>{numberFormatter(item.MaxRate)}</Col>
                      </Row>
                    </div>
                    <div>

                    </div>
                  </Col>
                </Row>
              </Col>
            ))}
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
            <PADDY9CCriteria />
            {/* <ItemGroup ItemGroupData={data} form={form} /> */}
          </div>
        </Modal>
      </>
    </div>
  );
};
export default ItemGroup;