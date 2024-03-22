// import dayjs from 'dayjs';
// import Buttons from './Buttons';
// import Tablefile from './DetailTableFile';
// import Search from 'antd/es/input/Search';
// import { useTranslation } from 'react-i18next';
// import { Card, Col, Image, Row } from 'antd';
// import React, { useEffect, useState } from 'react';
// import { TBankPaymentVoucherTable } from './types';
// import { formateDate } from '@tradePro/utils/formateDate';
// import { storedUserDetail } from '@tradePro/utils/storageService';
// import { useGetBankPaymentVoucherTable } from '../queries/queries';
// import { numberFormatter } from '@tradePro/utils/numberFormatter';
// import { SortAscendingOutlined, SortDescendingOutlined, HeartFilled } from '@ant-design/icons';

// const CardView: React.FC<{ setSelectedRecordId: (id: number | null) => void; setActiveTab: (tab: string) => void }> = ({
//   setSelectedRecordId,
//   setActiveTab,
// }) => {
//   const { t } = useTranslation();
//   const { data } = useGetBankPaymentVoucherTable();
//   const voucherData = data?.data?.Data?.Result;
//   console.log(data?.data?.Data?.Result);
//   const [records, setRecords] = useState<TBankPaymentVoucherTable[]>([]);
//   const [selectedCardData, setSelectedCardData] = useState<TBankPaymentVoucherTable>();
//   console.log(selectedCardData);
//   const totalRecords = data?.data?.Data?.Result.length || 0;
//   const userDetail = storedUserDetail();
//   const selectedRecordId = selectedCardData?.Id;

//   const handleSearch = (value: any) => {
//     console.log(value);
//     const trimmedValue = value.trim();
//     const filteredRecords = voucherData?.filter((record: TBankPaymentVoucherTable) => {
//       return record.AccountTitle.toLowerCase().includes(trimmedValue.toLowerCase());
//     });
//     setRecords(filteredRecords || []);
//     if (!filteredRecords || filteredRecords.length === 0) {
//       setRecords([]);
//       console.log('No matching records found');
//     }
//   };
//   const [sortOrderAmount, setSortOrderAmount] = useState<'asc' | 'desc' | undefined>(undefined);
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>(undefined);
//   const [sortOrderDocDate, setSortOrderDocDate] = useState<'asc' | 'desc' | undefined>(undefined);
//   const [sortOrderEntryUser, setSortOrderEntryUser] = useState<'asc' | 'desc' | undefined>(undefined);
//   const handleSortVoucherNo = () => {
//     //Sort Doc No
//     const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
//     setSortOrder(newSortOrder);

//     const sortedRecords = [...(records || [])].sort((a, b) => {
//       const comparison = sortOrder === 'asc' ? 1 : -1;
//       return a.VoucherCode > b.VoucherCode ? comparison : -comparison;
//     });

//     setRecords(sortedRecords);
//     console.log('sorting', sortedRecords);
//   };
//   const handleSortVoucherDate = () => {
//     //Sort Doc Date
//     const newSortOrder = sortOrderDocDate === 'asc' ? 'desc' : 'asc';
//     setSortOrderDocDate(newSortOrder);

//     const sortedRecords = [...(records || [])].sort((a, b) => {
//       const comparison = sortOrderDocDate === 'asc' ? 1 : -1;
//       return a.VoucherDate > b.VoucherDate ? comparison : -comparison;
//     });

//     setRecords(sortedRecords);
//   };
//   const handleSortAccount = () => {
//     // Sort Entry User
//     const newSortOrder = sortOrderEntryUser === 'asc' ? 'desc' : 'asc';
//     setSortOrderEntryUser(newSortOrder);

//     const sortedRecords = [...(records || [])].sort((a, b) => {
//       const entryUserA = a.AccountTitle.toLowerCase();
//       const entryUserB = b.AccountTitle.toLowerCase();

//       return newSortOrder === 'asc' ? entryUserA.localeCompare(entryUserB) : entryUserB.localeCompare(entryUserA);
//     });
//     console.log(sortedRecords);
//     setRecords(sortedRecords);
//   };
//   const handleSortAmount = () => {
//     // Sort Amount
//     const newSortOrder = sortOrderAmount === 'asc' ? 'desc' : 'asc';
//     setSortOrderAmount(newSortOrder);

//     const sortedRecords = [...(records || [])].sort((a, b) => {
//       const comparison = newSortOrder === 'asc' ? 1 : -1;
//       return a.VoucherAmount > b.VoucherAmount ? comparison : -comparison;
//     });

//     setRecords(sortedRecords);
//   };
//   useEffect(() => {
//     setRecords(voucherData);
//   }, [voucherData]);

//   return (
//     <>
//       <Row className="row1">
//         <Col lg={12} md={12} xl={7} xxl={6} sm={24} xs={24} className="columns">
//           <Row className="col" align="middle">
//             <Search onChange={(e) => handleSearch(e.target.value)} placeholder="Filter" />
//           </Row>

//           <Row className="row" style={{ fontSize: 14, fontWeight: '700' }}>
//             <Col lg={{ span: 7 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
//               {t('voucher_no')} <SortAscendingOutlined onClick={() => handleSortVoucherNo()} />
//               <SortDescendingOutlined onClick={() => handleSortVoucherNo()} />
//             </Col>
//             <Col lg={{ span: 7 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
//               {t('voucher_date')} <SortAscendingOutlined onClick={() => handleSortVoucherDate()} />
//               <SortDescendingOutlined onClick={() => handleSortVoucherDate()} />
//             </Col>
//             <Col lg={{ span: 5 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
//               {t('account')}
//               <SortAscendingOutlined onClick={() => handleSortAccount()} />
//               <SortDescendingOutlined onClick={() => handleSortAccount()} />
//             </Col>
//             <Col lg={{ span: 5 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
//               {t('amount')} <SortAscendingOutlined onClick={() => handleSortAmount()} />
//               <SortDescendingOutlined onClick={() => handleSortAmount()} />
//             </Col>
//           </Row>
//           <div style={{ backgroundColor: ' #d6d6e7', maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
//             <Row
//               gutter={[16, 16]}
//               style={{
//                 borderRadius: '1%',
//                 width: '99%',
//               }}
//             >
//               {records?.map((card: TBankPaymentVoucherTable | any) => (
//                 <Col span={24} key={card.Id}>
//                   <Card className="singleCard" onClick={() => setSelectedCardData(card)}>
//                     <Row justify={'space-between'} style={{ marginTop: '-3%' }}>
//                       <p className="list-item1">
//                         {card.VoucherCode} &nbsp; &nbsp;
//                         {card.DocumentTypeCode}
//                       </p>

//                       <h3>{formateDate(card.VoucherDate)}</h3>
//                     </Row>

//                     <Row justify={'space-between'} style={{ marginTop: '3%' }}>
//                       <h3 style={{ width: '' }}>{card.AccountTitle}</h3>

//                       <h3 style={{ textAlign: 'right' }}>{numberFormatter(card.VoucherAmount)}</h3>
//                       <h4 style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '1%' }}>
//                         <span
//                           style={{
//                             color: card.ApprovalStatus === 'Approved' ? 'green' : 'red',
//                           }}
//                         >
//                           {card.ApprovalStatus === 'Approved' ? 'Approved' : 'Not Approved'}
//                         </span>
//                       </h4>
//                     </Row>

//                     <Row justify={'space-between'} style={{ marginTop: '2%' }}>
//                       <p style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{card.Remarks}</p>
//                     </Row>
//                   </Card>
//                 </Col>
//               ))}
//             </Row>
//           </div>
//           <h3 style={{ textAlign: 'center' }}>
//             {' '}
//             {t('total_records')} {numberFormatter(totalRecords)}{' '}
//           </h3>
//         </Col>

//         {selectedCardData && (
//           <Col lg={{ span: 24 }} md={24} xl={17} xxl={18} xs={24} className="columns">
//             <Buttons
//               selectedRecordId={selectedRecordId}
//               setSelectedRecordId={setSelectedRecordId}
//               setActiveTab={setActiveTab}
//             />{' '}
//             <Row align="middle">
//               <Col xs={16} sm={16} className="columns">
//                 <div className="main-voucher-design" id="Rice_Invoice_Main_Box">
//                   <div className="row">
//                     <Row>
//                       <Col
//                         xs={{ span: 4 }}
//                         sm={{ span: 4 }}
//                         md={{ span: 4 }}
//                         lg={{ span: 4 }}
//                         xl={{ span: 3 }}
//                         xxl={{ span: 2 }}
//                         style={{ marginRight: '1%' }}
//                       >
//                         <div
//                           style={{
//                             fontSize: '1.5rem',
//                             color: 'green',
//                             fontWeight: 'bold',
//                             textAlign: 'left',
//                           }}
//                         >
//                           <div>
//                             <Image
//                               className="Img"
//                               src={'data:image/jpeg;base64,' + selectedCardData?.CompLogoImage}
//                               style={{ width: '6rem', height: '6rem' }}
//                             />
//                           </div>
//                         </div>
//                       </Col>
//                       <Col
//                         xs={{ span: 24 }}
//                         sm={{ span: 24 }}
//                         md={{ span: 18 }}
//                         lg={{ span: 18 }}
//                         xl={{ span: 20 }}
//                         xxl={{ span: 20 }}
//                       >
//                         <div>
//                           <div className="">
//                             <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'green', textAlign: 'left' }}>
//                               {userDetail?.CompanyName}
//                             </div>
//                             <div style={{ fontSize: '1rem', color: 'green', textAlign: 'left' }}>
//                               {userDetail?.CompanyAddress}
//                             </div>
//                             <div style={{ fontSize: '0.8rem', color: 'green', textAlign: 'left' }}>
//                               {userDetail?.CellNo}
//                             </div>
//                           </div>
//                         </div>
//                       </Col>
//                     </Row>
//                   </div>

//                   <div className="Wrapper" style={{ marginTop: '1.5%' }}>
//                     <Col span={7}>
//                       <div className="">
//                         <div className="caption-value-wrape">
//                           <div className="caption">{t('voucher_type')}</div>
//                           <div className="value">{selectedCardData?.DocumentTypeCode}</div>
//                         </div>
//                         <div className="caption-value-wrape">
//                           <div className="caption">{t('voucher_date')}</div>
//                           <div className="value">
//                             {selectedCardData ? dayjs(selectedCardData.VoucherDate).format('YYYY-MM-DD') : ''}
//                           </div>
//                         </div>

//                         <div className="caption-value-wrape">
//                           <div className="caption">{t('voucher_code')}</div>
//                           <div className="value">{selectedCardData?.VoucherCode}</div>
//                         </div>

//                         <div className="caption-value-wrape">
//                           <div className="caption">{t('total_amount')}</div>
//                           <div className="value">
//                             {selectedCardData?.VoucherAmount > 0 ? numberFormatter(selectedCardData?.VoucherAmount) : 0}
//                           </div>
//                         </div>

//                         <div className="caption-value-wrape">
//                           <div className="caption">{t('remarks')}</div>
//                           <div className="value">
//                             <div>{selectedCardData?.Remarks}</div>
//                           </div>
//                         </div>
//                       </div>
//                     </Col>
//                     <Col span={10} style={{ marginTop: '-1%' }}>
//                       <div className="">
//                         <div className="caption-value-wrape">
//                           <div className="voucher_Account_title">
//                             <div className="Account_title">{selectedCardData?.AccountTitle}</div>
//                           </div>
//                         </div>
//                       </div>
//                     </Col>
//                     <Col span={7}>
//                       <div className="">
//                         <div
//                           style={{ display: 'flex', justifyContent: 'space-between' }}
//                           className="caption-value-wrape"
//                         >
//                           <div className="caption">{t('payee_title')}</div>
//                           <div className="value">{selectedCardData?.PayeeTitle}</div>
//                         </div>
//                         <div
//                           style={{ display: 'flex', justifyContent: 'space-between' }}
//                           className="caption-value-wrape"
//                         >
//                           <div className="caption">{t('cheque_no')}</div>
//                           <div className="value">{selectedCardData?.CheqNo}</div>
//                         </div>
//                         <div
//                           style={{ display: 'flex', justifyContent: 'space-between' }}
//                           className="caption-value-wrape"
//                         >
//                           <div className="caption">{t('cheque_date')}</div>
//                           <div className="value">
//                             {selectedCardData ? dayjs(selectedCardData.ChequeDate).format('YYYY-MM-DD') : ''}
//                           </div>
//                         </div>
//                       </div>
//                     </Col>
//                   </div>
//                   <Tablefile selectedRecordId={selectedRecordId} voucherData={voucherData} />
//                 </div>
//               </Col>
//             </Row>
//           </Col>
//         )}
//         <Col xl={{ span: 17, offset: 7 }} xxl={{ span: 18, offset: 6 }} span={24}>
//           <div className="Footer">
//             <div className="Thanks">
//               {t('thank_you')}{' '}
//               <span className="heart-icon">
//                 {' '}
//                 <HeartFilled />{' '}
//               </span>
//             </div>
//             <div className="powered-by">
//               {t('powered_by')}{' '}
//               <span>
//                 <a href="https://eccountbookapps.com/" className="Scss-Link" target="_blank">
//                   {t('synergic_corporation_and_solution')}
//                 </a>
//               </span>
//             </div>
//           </div>
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default CardView;
