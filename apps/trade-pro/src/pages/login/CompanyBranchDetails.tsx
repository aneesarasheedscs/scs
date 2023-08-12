import { Form } from 'antd';
import { merge } from 'lodash';
import { useState } from 'react';
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
  const [financialYearObj, setFinancialYearObj] = useState();
  const onSelectChange = (selectedObject: any) => setFinancialYearObj(selectedObject);

  const handleSubmit = () => {
    const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
    merge({}, userDetail, { CompanyId: formValues?.CompanyId, BranchId: formValues?.BranchId });

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
        query={useGetCompany}
        fieldValue="CompanyId"
      />

      <AntSelectDynamic
        required
        size="large"
        label="Branch"
        name="BranchId"
        fieldValue="BranchId"
        fieldLabel="BranchName"
        query={useGetBranch(formValues?.CompanyId)}
      />

      <AntSelectDynamic
        required
        size="large"
        fieldValue="Id"
        name="FinancialYearId"
        label="Financial Year"
        fieldLabel="FinancialYearCode"
        onSelectChange={onSelectChange}
        query={useGetFinancialYear(formValues?.CompanyId)}
      />

      <Form.Item>
        <AntButton size="large" label="Submit" htmlType="submit" onClick={handleSubmit} />
      </Form.Item>
    </Form>
  );
}

export default CompanyBranchDetails;
