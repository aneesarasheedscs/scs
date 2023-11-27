import './style.scss';
import { Form } from 'antd';
import { merge } from 'lodash';
import CardWrapper from './CardWrapper';
import { useEffect, useState } from 'react';
import { TCompanyBranchDetail } from './types';
import { useNavigate } from 'react-router-dom';
import { route } from '@tradePro/routes/constant';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { AntButton, AntSelectDynamic } from '@tradePro/components';
import { useGetBranch, useGetCompany, useGetFinancialYear } from './queries';
const { useForm, useWatch } = Form;
function CompanyBranchDetails() {
  const navigate = useNavigate();
  const [form] = useForm<TCompanyBranchDetail>();
  const formValues = useWatch<TCompanyBranchDetail>([], form);
  const [financialYearObj, setFinancialYearObj] = useState();

  let IsHeadOffice: boolean = false;
  const onSelectChange = (selectedObject: any) => {
    if (selectedObject !== null && selectedObject !== undefined) setFinancialYearObj(selectedObject);
    else {
      form.validateFields();
    }
  };
  useEffect(() => {
    const userDetail = storedUserDetail();
    if (!userDetail?.access_token) navigate(route.LOGIN);
  }, []);

  const handleCompanyChange = (obj: any) => {
    IsHeadOffice = obj?.IsHeadOffice;
  }

  const handleSubmit = async () => {
    if (await form.validateFields()) {
      const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');

      console.log(JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}'));
      console.log(userDetail);

      merge({}, userDetail, { CompanyId: formValues?.CompanyId, BranchId: formValues?.BranchId, IsHeadOffice: IsHeadOffice });

      console.log(userDetail);
      localStorage.setItem('loggedInUserDetail', JSON.stringify(userDetail));
      console.log(JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}'));

      localStorage.setItem('financialYear', JSON.stringify(financialYearObj));
      navigate(route.APP_MENU);
    }
  };
  return (
    <CardWrapper>
      <Form form={form} layout="vertical">
        <AntSelectDynamic
          required
          size="large"
          label="Company"
          name="CompanyId"
          fieldLabel="CompName"
          query={useGetCompany}
          fieldValue="CompanyId"
          onSelectChange={(obj) => handleCompanyChange(obj)}
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
    </CardWrapper>
  );
}
export default CompanyBranchDetails;
