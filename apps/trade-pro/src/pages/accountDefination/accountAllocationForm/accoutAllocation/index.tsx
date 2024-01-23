import { AntButton, AntSelectDynamic } from '@tradePro/components';
import { Card, Col, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  useGetAccountAllocationComp,
  useGetFinancialYear,
  useGetFinancialYearOnLeave,
  useGetPendingAccountForAllocation,
  useGetAllocatedAccounts,
} from '../quries';
import AccountAllocationTable from '../table';
import { useWatch } from 'antd/es/form/Form';
import { TCompanyfilter, TaddAllocatedAccounts } from '../types';
import { useEffect } from 'react';
import { SyncOutlined } from '@ant-design/icons';
import { useAtom } from 'jotai';
import { selectedRowsAtom } from '../table/Atom';
const { useForm } = Form;

const AccountAllocation = () => {
  const [form] = useForm<TaddAllocatedAccounts>();
  const formValues = useWatch<TaddAllocatedAccounts>([], form);
  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);
  const onFinish = () => {};
  const Id = form?.getFieldValue('CompCode');
  const { data, isLoading, isSuccess } = useGetFinancialYearOnLeave(Id);

  const {
    data: allocatedData,
    refetch,
    isError,
    isLoading: tableLoading,
    isFetching,
  } = useGetPendingAccountForAllocation(true, Id);
  const {
    data: unallocatedData,
    refetch: unallocatedrefetch,
    isError: isErrorunallocated,
    isLoading: tableLoadingunallocated,
    isFetching: isFetchingunallocated,
  } = useGetAllocatedAccounts(true, Id);

  const { t } = useTranslation();
  const handleItemChange = (obj: TCompanyfilter, index: string) => {};

  useEffect(() => {
    if (isSuccess && !isLoading) {
      form.setFields([{ name: 'FinancialYearCode', value: data?.data?.Data?.Result?.[0]?.FinancialYearCode }]);
    }
  }, [isSuccess, isLoading]);

  return (
    <div style={{ background: '#fff' }}>
      <Row>
        <Col xs={10} sm={10} md={12} lg={12} xl={14} xxl={16} className="forms-heading-container">
          <h1 className="report_heading">{t('account_allocation')} </h1>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={8} lg={6} xl={24}>
          <Card style={{ width: '50vw' }}>
            <Form onFinish={onFinish} form={form}>
              <Row gutter={16} justify={'start'}>
                <Col xs={24} sm={12} md={12} lg={12} xl={10} className="formfield">
                  <AntSelectDynamic
                    bordered={false}
                    label={t('to_company')}
                    name="CompCode"
                    fieldLabel="CompName"
                    fieldValue="Id"
                    query={useGetAccountAllocationComp}
                    onSelectChange={(obj) => handleItemChange(obj, 'CompCode')}
                  />
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={6} className="formfield" offset={1}>
                  <AntSelectDynamic
                    bordered={false}
                    label={t('financial_year')}
                    name="FinancialYearCode"
                    fieldLabel="FinancialYearCode"
                    fieldValue="Id"
                    query={useGetFinancialYear(Id)}
                  />
                </Col>

                {/* <Col xs={24} sm={12} md={12} lg={12} xl={2} offset={1}>
                  <AntButton label={t('add')} htmlType="submit" />
                </Col> */}

                <Col xs={24} sm={12} md={12} lg={12} xl={4} offset={1}>
                  <AntButton
                    danger
                    ghost
                    htmlType="reset"
                    onClick={() => {
                      form.resetFields();
                      setSelectedRows([]);
                    }}
                    label={t('reset')}
                    icon={<SyncOutlined />}
                  />
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>

        {/* Add more Col components for other content */}
      </Row>
      <AccountAllocationTable
        allocatedData={allocatedData}
        tableLoading={tableLoading}
        isError={isError}
        isFetching={isFetching}
        refetch={refetch}
        unallocatedData={unallocatedData}
        unallocatedrefetch={unallocatedrefetch}
        isErrorunallocated={isErrorunallocated}
        tableLoadingunallocated={tableLoadingunallocated}
        isFetchingunallocated={isFetchingunallocated}
      />
    </div>
  );
};
export default AccountAllocation;
