import { AntButton, AntDatePicker, AntSelectDynamic, SearchCriteriaWrapper } from '@tradePro/components';
import { useEffect, useState } from 'react';
import { Checkbox, Col, Form, Row } from 'antd';
import { useGetGeneralLedgerDetail, useGetGeneralLedgerSummaryI, useGetGeneralLedgerSummaryII } from '../queries';
import { TFilterForms } from '../type';
import { useGetAccountTitle, useGetCompany, useGetDateType, useGetSubBranch } from '../queryOptions';
import dayjs from 'dayjs';
// import { useAtom } from 'jotai';
// import { accountIdAtom } from '../../dashboard/Atom';

const { useForm, useWatch } = Form;

interface FormProps {
  onSelectedValuesChange: (branchName: string, accountTitle: string, branchCode: string) => void;
}

const AccountsDetailSearchCriteriaForm: React.FC<
  {
    FromdateProp?: Date | string;
    ToDateProp?: Date | string;
    Id?: number;
  } & FormProps
> = ({ onSelectedValuesChange }, props) => {
  const [open, setOpen] = useState(false);
  const [form] = useForm<TFilterForms>();
  const formValues = useWatch<TFilterForms>([], form);

  const { FromdateProp, ToDateProp, Id } = props;

  const { setFieldsValue, setFieldValue, getFieldValue } = form;

  const {
    refetch,
    isFetching,
    isError: isAccountsDetailError,
    isLoading: isAccountsDetailLoading,
  } = useGetGeneralLedgerDetail(FromdateProp !== undefined ? true : false, form.getFieldsValue());

  const { refetch: refetch1 } = useGetGeneralLedgerSummaryI(false, form.getFieldsValue());

  const { refetch: refetch2 } = useGetGeneralLedgerSummaryII(false, form.getFieldsValue());

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (FromdateProp !== undefined) {
      const januaryFirst = dayjs().startOf('year').set('month', 0).set('date', 1);
      form.setFields([{ name: 'FromDate', value: januaryFirst }]);
      form.setFields([{ name: 'ToDate', value: dayjs(new Date()) }]);
    } else {
      setFieldValue('FromDate', dayjs(FromdateProp));
      setFieldValue('ToDate', dayjs(ToDateProp));
      setFieldValue('Id', Id);
    }
  }, []);

  const onFinish = (_: TFilterForms) => {
    const branchName = getFieldValue('BranchName');
    const accountTitle = getFieldValue('AccountTitle');
    const branchCode = getFieldValue('BranchCode');
    refetch();
    refetch1();
    // refetch2();
    onSelectedValuesChange(branchName, accountTitle, branchCode);
    refetch().then(() => handleClose());
    console.log(accountTitle);
  };
  // const [accountId] = useAtom(accountIdAtom);
  // useEffect(() => {
  //   if (accountId !== null) {
  //     form.setFieldsValue(accountId); // Set AccountTitle field with accountId
  //   }
  // }, [accountId]);
  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form form={form} onFinish={onFinish} layout="vertical" initialValues={formValues}>
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={24} md={12}>
            <AntSelectDynamic
              fieldValue="BranchName"
              label="Branch"
              query={useGetCompany}
              fieldLabel="BranchName"
              name="BranchName"
              // onSelect={(obj) => handleItem(obj.BranchName)}
            />
          </Col>

          <Col xs={24} sm={24} md={12}>
            <AntSelectDynamic
              name="BranchCode" // This should be set to the field you want to store in the form
              fieldValue="BranchCode"
              query={useGetSubBranch}
              label="Sub-Branch"
              fieldLabel="BranchCode" // Render both BranchName and BranchCode
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            Account Title
            <AntSelectDynamic
              name="AccountTitle"
              fieldValue="AccountTitle"
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
        </Row>
        <Row align="middle" justify="end" gutter={[10, 10]}>
          <Col xs={24} sm={24} md={8}>
            <AntButton
              label="Show"
              htmlType="submit"
              style={{ marginTop: 15 }}
              isError={isAccountsDetailError}
              isLoading={isAccountsDetailLoading || isFetching}
            />
          </Col>
        </Row>
      </Form>
    </SearchCriteriaWrapper>
  );
};
export default AccountsDetailSearchCriteriaForm;
