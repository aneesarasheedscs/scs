// import { Card, Col, Form, Radio, Row, Select } from 'antd';
// import { AntButton, AntDatePicker, AntInput, AntSelectDynamic } from '@tradePro/components';
// import { useTranslation } from 'react-i18next';

// import { useState, useEffect } from 'react';
// import dayjs, { Dayjs } from 'dayjs';
// import { storedFinancialYear } from '@tradePro/utils/storageService';
// import { TMonthlySaleReportCriteria } from './types';
// import { map } from 'lodash';
// import { useGetMonthlySalesDashboard } from './query';
// const { useForm, useWatch } = Form;
// const { Option } = Select;

// function MonthlySaleCriteria() {
//   const [value, setValue] = useState(1);
//   const [form] = useForm<TMonthlySaleReportCriteria>();
//   const formValues = useWatch<TMonthlySaleReportCriteria>([], form);
//   const [selectedMonth, setSelectedMonth] = useState<string | Date>('');
//   const [selectedMonthDate, setSelectedMonthDate] = useState<Dayjs | null>(null);
//   const { data, isError, isLoading, refetch } = useGetMonthlySalesDashboard(true, form.getFieldsValue());

//   const { t } = useTranslation();
//   const onFinish = (values: TMonthlySaleReportCriteria) => {
//     refetch();
//     console.log(values);
//   };
//   const generateMonthsArray = () => {
//     const monthsArray = [];
//     let currentDate = FromDate.clone();

//     while (currentDate.isBefore(ToDate) || currentDate.isSame(ToDate, 'month')) {
//       const monthName = currentDate.format('MMMM');
//       const yearMonth = currentDate.format('YYYY-MM');
//       monthsArray.push({ value: yearMonth, label: `${monthName} ${currentDate.year()}` });
//       currentDate = currentDate.add(1, 'month');
//     }

//     return monthsArray;
//   };
//   const FinancialYear = storedFinancialYear();
//   const FromDate = dayjs(FinancialYear?.Start_Period);
//   const ToDate = dayjs(FinancialYear?.End_Period);

//   useEffect(() => {
//     const currentMonth = dayjs().format('YYYY-MM');
//     setSelectedMonth(currentMonth);
//   }, []);

//   const handleMonthChange = (value: string | Date) => {
//     setSelectedMonth(value);
//     const selectedMonthStartDate = dayjs(value);
//     const selectedMonthEndDate = selectedMonthStartDate.clone().endOf('month');
//     setSelectedMonthDate(selectedMonthStartDate);

//     form.setFieldsValue({
//       FromDate: selectedMonthStartDate,
//       ToDate: selectedMonthEndDate,
//     });
//   };
//   useEffect(() => {
//     form.setFieldsValue({ NoOfRecords: 10 });
//     form.setFieldsValue({ ReqType: 'Top' });
//   }, []);
//   const monthsArray = generateMonthsArray();
//   return (
//     <Row>
//       <Card style={{ width: '100vw' }}>
//         <Form form={form} onFinish={onFinish}>
//           <Row gutter={16} justify={'space-between'}>
//             <Col xl={5} className="formfield">
//               <AntSelectDynamic
//                 className="formfield"
//                 bordered={false}
//                 label="Month"
//                 fieldLabel="ReferenceName"
//                 fieldValue="Id"
//                 options={monthsArray}
//                 onChange={(value) => handleMonthChange(value)}
//               />
//               <AntDatePicker name="FromDate" bordered={false} label="" style={{ visibility: 'hidden' }} />
//               <AntDatePicker name="ToDate" bordered={false} label="" style={{ visibility: 'hidden' }} />
//             </Col>
//             <Col xl={5} className="formfield">
//               <AntSelectDynamic
//                 bordered={false}
//                 label={t('Companies')}
//                 name="Companies"
//                 fieldLabel="CompName"
//                 fieldValue="Id"
//                 // query={useGetMasterBranchByUserId}
//               />
//             </Col>
//             <Col xl={2} className="formfield">
//               <AntInput bordered={false} label={t('Count')} name="NoOfRecords" />
//             </Col>
//             <Col xl={3}>
//               <Radio.Group
//                 onChange={(e) => {
//                   form.setFieldsValue({ ReqType: e.target.value });
//                 }}
//                 defaultValue={'Top'}
//               >
//                 <Radio value={'Top'}> {t('top')}</Radio>
//                 <Radio value={'Bottom'}> {t('bottom')}</Radio>
//               </Radio.Group>
//               <AntInput label="" name="ReqType" type="hidden" />
//               {/* <Radio.Group value={value}>
//                 <Radio value={1}>{t('Top')}</Radio>
//                 <Radio value={2}>{t('Bottom')}</Radio>
//               </Radio.Group> */}
//             </Col>
//             <Col xl={2}>
//               <AntButton
//                 style={{ marginLeft: '-10px' }}
//                 label={t('show')}
//                 htmlType="submit"
//                 isError={isError}
//                 isLoading={isLoading}
//               />
//             </Col>
//           </Row>
//         </Form>
//       </Card>
//     </Row>
//   );
// }
// export default MonthlySaleCriteria;
