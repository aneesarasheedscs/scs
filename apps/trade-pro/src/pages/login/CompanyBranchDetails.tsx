import './style.scss';
import { Col, Form, Row, Select } from 'antd';
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
import { useAtom } from 'jotai';
import { financialYearObject } from './Atom';
const { useForm, useWatch } = Form;
function CompanyBranchDetails() {
  const navigate = useNavigate();
  const [form] = useForm<TCompanyBranchDetail>();
  const formValues = useWatch<TCompanyBranchDetail>([], form);
  const [companyList, setcompanyList] = useState<Company[]>([]);
  const [financialYearObj, setFinancialYearObj] = useState<any>();
  console.log(financialYearObj);
  const [headOffice, setheadOffice] = useState<boolean | undefined>();
  const [financialYearObjec, setFinancialYearObjec] = useAtom(financialYearObject);
  console.log(financialYearObjec);
  const { data: CompanyData, isSuccess, isLoading } = useGetCompany();
  const handleFinancialChange = (selectedObject: any) => {
    console.log(selectedObject);
    if (selectedObject !== null && selectedObject !== undefined) setFinancialYearObj(selectedObject);
    else {
      form.validateFields();
    }
    console.log(selectedObject);
  };

  useEffect(() => {
    const userDetail = storedUserDetail();
    if (!userDetail?.access_token) navigate(route.LOGIN);
  }, []);

  useEffect(() => {
    if (isSuccess && !isLoading) {
      setcompanyList(CompanyData?.data?.Data?.Result);
      form.setFieldsValue({
        BranchId: 2,
      });
      form.setFieldsValue({
        FinancialYearId: financialYearObjec?.[0]?.Id,
      });
    }
    if (financialYearObjec !== null && financialYearObjec !== undefined) setFinancialYearObj(financialYearObjec);

    // if (year === false) {
    //   form.setFieldsValue({
    //     FinancialYearId: 2,
    //   });
    // } else if (year === true) {
    //   form.setFieldsValue({
    //     // FinancialYearId: 0,
    //   });
    // }
    CompanyData;
  }, [isSuccess, !isLoading, financialYearObjec]);
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
      const financialYearObject = financialYearObj.reduce((acc: any, cur: any) => {
        acc = cur;
        return acc;
      }, {});
      const financialYearString = JSON.stringify(financialYearObject);
      localStorage.setItem('loggedInUserDetail', JSON.stringify(mergeObject));
      localStorage.setItem('financialYear', financialYearString);
      // const financialYearString = JSON.stringify(financialYearObj);
      // console.log(financialYearString);
      // localStorage.setItem('loggedInUserDetail', JSON.stringify(mergeObject));
      // localStorage.setItem('financialYear', financialYearString);
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
            size="middle"
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
          size="middle"
          label="Branch"
          name="BranchId"
          fieldValue="BranchId"
          fieldLabel="BranchName"
          query={useGetBranch(formValues?.CompanyId)}
        />
        <AntSelectDynamic
          required
          size="middle"
          fieldValue="Id"
          name="FinancialYearId"
          label="Financial Year"
          fieldLabel="FinancialYearCode"
          onSelectChange={handleFinancialChange}
          query={useGetFinancialYear(formValues?.CompanyId)}
        />
        <Form.Item>
          <Row justify={'center'}>
            <Col span={4}>
              <AntButton size="large" className="btnColor" label="Submit" htmlType="submit" onClick={handleSubmit} />
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </CardWrapper>
  );
}
export default CompanyBranchDetails;
