import { AntButton, AntSelectDynamic } from '@tradePro/components';
import { Card, Col, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  useGetAccountAllocationComp,
  useGetFinancialYear,
  useGetFinancialYearOnLeave,
  useGetAllocatedAccounts,
  useGetUnAllocationAccounts,
} from '../quries';
import AccountAllocationTable from '../table';
import { useWatch } from 'antd/es/form/Form';
import { TCompanyfilter, TaddAllocatedAccounts } from '../types';
import { useEffect, useState } from 'react';
import { SyncOutlined } from '@ant-design/icons';
import { useAtom } from 'jotai';
import { selectedRowsAtom } from '../table/Atom';
import '../style.scss';

const { useForm } = Form;

const AccountAllocation = () => {
  const [form] = useForm<TaddAllocatedAccounts>();
  const formValues = useWatch<TaddAllocatedAccounts>([], form);
  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [selectedRowKeysForUnAllocate, setSelectedRowKeysForUnAllocate] = useState<number[]>([]);

  const CompanyId = form?.getFieldValue('CompCode');
  const onFinish = () => {};
  const Id = form?.getFieldValue('CompCode');
  const { data, isLoading, isSuccess } = useGetFinancialYearOnLeave(Id);

  const {
    data: allocatedData,
    refetch,
    isError,
    isLoading: tableLoading,
    isFetching,
  } = useGetUnAllocationAccounts(true, Id);
  const {
    data: unallocatedData,
    refetch: unallocatedrefetch,
    isError: isErrorunallocated,
    isLoading: tableLoadingunallocated,
    isFetching: isFetchingunallocated,
  } = useGetAllocatedAccounts(true, Id);

  const { t } = useTranslation();
  const handleItemChange = (obj: TCompanyfilter, index: string) => {
    setSelectedRows([]);
    setSelectedRowKeys([]);
    setSelectedRowKeysForUnAllocate([]);
  };

  useEffect(() => {
    if (isSuccess && !isLoading) {
      form.setFields([{ name: 'FinancialYearCode', value: data?.data?.Data?.Result?.[0]?.FinancialYearCode }]);
    }
  }, [isSuccess, isLoading]);

  return (
    <div style={{ background: '#fff' }}>
      <Row>
        <Col xs={23} sm={10} md={23} lg={12} xl={14} xxl={16}>
          <h1 style={{ fontFamily: 'Poppins', fontSize: '19px', padding: '10px', marginLeft: '24px' }}>
            {t('account_allocation')}{' '}
          </h1>
        </Col>
      </Row>

      <Col xxl={14}>
        <Row justify={'space-around'}>
          <Col xxl={23} xl={23} sm={23} xs={23} lg={23} md={23}>
            <Card style={{ marginLeft: '10px' }}>
              <Form onFinish={onFinish} form={form}>
                <Col lg={24}>
                  <Row gutter={16} justify={'space-between'}>
                    <Col xs={23} sm={23} md={15} lg={13} xl={10} xxl={11} className="formfield form-container">
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
                    <Col xs={23} sm={23} md={8} lg={6} xl={6} xxl={7} className="formfield form-container">
                      <AntSelectDynamic
                        bordered={false}
                        label={t('financial_year')}
                        name="FinancialYearCode"
                        fieldLabel="FinancialYearCode"
                        fieldValue="Id"
                        query={useGetFinancialYear(Id)}
                      />
                    </Col>
                    <Col xs={10} sm={7} md={6} lg={4} xl={4} className="btn-margin-top">
                      <AntButton
                        danger
                        ghost
                        htmlType="reset"
                        onClick={() => {
                          form.resetFields();
                          setSelectedRows([]);
                          setSelectedRowKeys([]);
                          setSelectedRowKeysForUnAllocate([]);
                        }}
                        label={t('reset')}
                        icon={<SyncOutlined />}
                      />
                    </Col>
                  </Row>
                </Col>
              </Form>
            </Card>
          </Col>

          {/* Add more Col components for other content */}
        </Row>
      </Col>
      <AccountAllocationTable
        CompanyId={CompanyId}
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
