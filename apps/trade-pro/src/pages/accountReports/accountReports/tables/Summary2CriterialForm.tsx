import { AntButton, AntDatePicker, AntSelectDynamic, SearchCriteriaWrapper } from '@tradePro/components';
import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useGetGeneralLedgerSummaryI, useGetGeneralLedgerSummaryII } from '../queries';
import { TGeneralLedgerSummaryI, TGeneralLedgerSummaryII } from '../type';
import { useGetAccountTitle, useGetCompany, useGetDateType, useGetSubBranch } from '../queryOptions';
import dayjs from 'dayjs';

const { useForm, useWatch } = Form;

const Summary2CriteriaForm: React.FC<{
  FromdateProp?: Date | string;
  ToDateProp?: Date | string;
  Id?: number;
}> = (props) => {
  const { FromdateProp, ToDateProp, Id } = props;
  const [open, setOpen] = useState(false);
  const [form] = useForm<TGeneralLedgerSummaryII>();
  const formValues = useWatch<TGeneralLedgerSummaryII>([], form);
  const { setFieldValue } = form;

  const {
    refetch,
    isFetching,
    isError: isSummaryIIError,
    isLoading: isSummaryIILoading,
  } = useGetGeneralLedgerSummaryII(true, form.getFieldsValue());

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFinish = (values: TGeneralLedgerSummaryII) => {
    console.log(values);
    refetch().then(() => handleClose());
  };

  useEffect(() => {
    // if (Id === undefined) {
    //   const januaryFirst = dayjs().startOf('year').set('month', 0).set('date', 1);
    //   form.setFields([{ name: 'FromDate', value: januaryFirst }]);
    //   form.setFields([{ name: 'ToDate', value: dayjs(new Date()) }]);
    // } else {
    setFieldValue('FromDate', dayjs(FromdateProp));
    setFieldValue('ToDate', dayjs(ToDateProp));
    setFieldValue('Id', Id);
    // }
  }, []);

  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form form={form} onFinish={onFinish} layout="vertical" initialValues={formValues}>
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={24} md={12}>
            <AntSelectDynamic
              fieldValue="Id"
              label="Branch"
              query={useGetCompany}
              fieldLabel="BranchName"
              name="BranchName"
            />
          </Col>

          <Col xs={24} sm={24} md={12}>
            <AntSelectDynamic
              name="BranchName"
              fieldValue="Id"
              query={useGetSubBranch}
              label="Sub-Branch"
              fieldLabel="BranchName"
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            Account Title
            <AntSelectDynamic
              name="AccountTitle"
              fieldValue="Id"
              label=""
              query={useGetAccountTitle}
              fieldLabel="AccountTitle"
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <AntSelectDynamic
              name="Date Type"
              fieldValue="Id"
              label="Date Type"
              query={useGetDateType}
              fieldLabel="DateType"
            />
          </Col>
        </Row>
        <Row align="middle" gutter={[10, 10]}>
          <Col xs={24} sm={24} md={12}>
            <AntDatePicker name="FromDate" label="From Date" />
          </Col>

          <Col xs={24} sm={24} md={12}>
            <AntDatePicker name="ToDate" label="To Date" />
          </Col>
          {/* <Col xs={24} sm={24} md={12}>
            <Checkbox>Include Unposted Voucher</Checkbox>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Checkbox>Detail</Checkbox>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Checkbox>Summary-I</Checkbox>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Checkbox>Summary-II</Checkbox>
          </Col> */}
        </Row>
        <Row align="middle" justify="end" gutter={[10, 10]}>
          <Col xs={24} sm={24} md={8}>
            <AntButton
              label="Show"
              htmlType="submit"
              style={{ marginTop: 15 }}
              isError={isSummaryIIError}
              isLoading={isSummaryIILoading || isFetching}
            />
          </Col>
        </Row>
      </Form>
    </SearchCriteriaWrapper>
  );
};
export default Summary2CriteriaForm;
// <Col xs={24} sm={24} md={24}>
// <Row gutter={10}>
//   <Col> Account Title</Col>
//   <Col span={16}>
//     {' '}
//     <AntSelectDynamic
//       style={{ width: '100%' }}
//       name="AccountTitle"
//       fieldValue="Id"
//       label=""
//       query={useGetAccountTitle}
//       fieldLabel="AccountTitle"
//     />
//   </Col>
// </Row>
// </Col>

//
