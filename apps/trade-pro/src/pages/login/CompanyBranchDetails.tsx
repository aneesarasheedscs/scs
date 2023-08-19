import { Form } from 'antd';
import { find, merge } from 'lodash';
import { TCompanyBranchDetail } from './types';
import { useNavigate } from 'react-router-dom';
import { route } from '@tradePro/routes/constant';
import { AntButton, AntSelectDynamic } from '@tradePro/components';
import { useGetBranch, useGetCompany, useGetFinancialYear } from './queries';

const { useForm, useWatch } = Form;

function CompanyBranchDetails() {
  const navigate = useNavigate();
  const [form] = useForm<TCompanyBranchDetail>();
  const formValues = useWatch<TCompanyBranchDetail>([], form);

  const {
    data: companyData,
    isError: isCompanyError,
    isLoading: isCompanyLoading,
  } = useGetCompany();

  const {
    data: financialYearData,
    isError: isFinancialYearError,
    isLoading: isFinancialYearLoading,
  } = useGetFinancialYear(formValues?.CompanyId);

  const {
    data: branchData,
    isError: isBranchError,
    isLoading: isBranchLoading,
  } = useGetBranch(formValues?.CompanyId);

  const handleSubmit = () => {
    const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
    merge({}, userDetail, { CompanyId: formValues?.CompanyId, BranchId: formValues?.BranchId });

    const financialYearObj = find(financialYearData?.data?.Data?.Result, (item) => {
      return item?.Id === formValues?.FinancialYearId;
    });

    localStorage.setItem('financialYear', JSON.stringify(financialYearObj));

    navigate(route.PURCHASE_ORDER);
  };

  return (
    <Form form={form} layout="vertical">
      <AntSelectDynamic
        required
        size="large"
        label="Company"
        name="CompanyId"
        fieldLabel="CompName"
        fieldValue="CompanyId"
        isError={isCompanyError}
        isLoading={isCompanyLoading}
        data={companyData?.data?.Data?.Result}
      />
      <AntSelectDynamic
        required
        size="large"
        label="Branch"
        name="BranchId"
        fieldValue="BranchId"
        isError={isBranchError}
        fieldLabel="BranchName"
        isLoading={isBranchLoading}
        data={branchData?.data?.Data?.Result}
      />
      <AntSelectDynamic
        required
        size="large"
        fieldValue="Id"
        name="FinancialYearId"
        label="Financial Year"
        fieldLabel="FinancialYearCode"
        isError={isFinancialYearError}
        isLoading={isFinancialYearLoading}
        data={financialYearData?.data?.Data?.Result}
      />
      <Form.Item>
        <AntButton
          size="large"
          label="Submit"
          htmlType="submit"
          className="fullWidth"
          onClick={handleSubmit}
        />
      </Form.Item>
    </Form>
  );
}

export default CompanyBranchDetails;
