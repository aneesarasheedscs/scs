import './style.scss';
import { Form, Select } from 'antd';
import { map, merge } from 'lodash';
import CardWrapper from './CardWrapper';
import { useEffect, useState } from 'react';
import { Company, TCompanyBranchDetail } from './types';
import { useNavigate } from 'react-router-dom';
import { route } from '@tradePro/routes/constant';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { AntButton, AntSelectDynamic } from '@tradePro/components';
import { useGetBranch, useGetCompany, useGetFinancialYear } from './queries';
import { TUserDetail } from '@tradePro/globalTypes';
const { useForm, useWatch } = Form;
function CompanyBranchDetails() {
  const navigate = useNavigate();
  const [form] = useForm<TCompanyBranchDetail>();
  const formValues = useWatch<TCompanyBranchDetail>([], form);
  const [companyList, setcompanyList] = useState<Company[]>([]);
  const [financialYearObj, setFinancialYearObj] = useState();
  const [headOffice, setheadOffice] = useState<boolean | undefined>();

  const { data: CompanyData, isSuccess } = useGetCompany();
  const handleFinancialChange = (selectedObject: any) => {
    console.log(selectedObject);
    if (selectedObject !== null && selectedObject !== undefined) setFinancialYearObj(selectedObject);
    else {
      form.validateFields();
    }
  };

  useEffect(() => {
    const userDetail = storedUserDetail();
    if (!userDetail?.access_token) navigate(route.LOGIN);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setcompanyList(CompanyData?.data?.Data?.Result);
    }
    CompanyData;
  });
  // const handleCompanyChange = (obj: Company) => {
  //   console.log(obj);
  //   if (obj !== null && obj !== undefined) {
  //     setheadOffice(obj?.IsHeadOffice);
  //   }
  // };

  const handleCompanyChange = async (value: number) => {
    const obj = await companyList.find((item: Company) => item.CompanyId === value);
    setheadOffice(obj?.IsHeadOffice);
  };

  const handleSubmit = async () => {
    if (await form.validateFields()) {
      const userDetail: TUserDetail = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
      const mergeObject = merge({}, userDetail, {
        CompanyId: formValues?.CompanyId,
        BranchesId: formValues?.BranchId,
        IsHeadOffice: headOffice,
      });
      localStorage.setItem('loggedInUserDetail', JSON.stringify(mergeObject));
      localStorage.setItem('financialYear', JSON.stringify(financialYearObj));
      navigate(route.APP_MENU);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setcompanyList(CompanyData?.data?.Data?.Result);

      // Set default value for "Company" field if there is a single record
      if (companyList.length === 1) {
        form.setFieldsValue({
          CompanyId: companyList[0].CompanyId,
        });
        setheadOffice(companyList[0]?.IsHeadOffice);
      }
    }
  }, [isSuccess, companyList, form]);

  return (
    <CardWrapper>
      <Form form={form} layout="vertical">
        <Form.Item label="Company" name="CompanyId">
          <Select
            allowClear
            onChange={handleCompanyChange}
            style={{ width: '100%' }}
            options={map(companyList, (item) => ({
              value: item.CompanyId,
              label: item.CompName,
            }))}
          />
        </Form.Item>
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
          onSelectChange={handleFinancialChange}
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
