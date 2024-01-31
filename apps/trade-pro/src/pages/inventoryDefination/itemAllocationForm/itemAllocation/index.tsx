import { AntButton, AntSelectDynamic } from '@tradePro/components';
import { Card, Col, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useGetItemAllocationComp, useGetPendingItemsForAllocation, useGetUnAllocatedItems } from '../quries';

import { useWatch } from 'antd/es/form/Form';
import { TCompanyfilter, TaddAllocatedAccounts } from '../types';
import { SyncOutlined } from '@ant-design/icons';
import { useAtom } from 'jotai';
import { selectedRowsAtom } from '../table/Atom';
import ItemAllocationTable from '../table';
import { useState } from 'react';

const { useForm } = Form;

const ItemAllocation = () => {
  const [form] = useForm<TaddAllocatedAccounts>();
  const formValues = useWatch<TaddAllocatedAccounts>([], form);
  // const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);
  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [selectedRowKeysForUnAllocate, setSelectedRowKeysForUnAllocate] = useState<number[]>([]);
  const onFinish = () => {};
  const CompanyId = form?.getFieldValue('CompCode');

  const {
    data: allocatedData,
    refetch,
    isError,
    isLoading: tableLoading,
    isFetching,
  } = useGetPendingItemsForAllocation(true, CompanyId);
  const {
    data: unallocatedData,
    refetch: unallocatedrefetch,
    isError: isErrorunallocated,
    isLoading: tableLoadingunallocated,
    isFetching: isFetchingunallocated,
  } = useGetUnAllocatedItems(true, CompanyId);

  const { t } = useTranslation();
  const handleItemChange = (obj: TCompanyfilter, index: string | null) => {
    setSelectedRows([]);
    setSelectedRowKeys([]);
    setSelectedRowKeysForUnAllocate([]);
  };

  return (
    <div style={{ background: '#fff' }}>
      <Row>
        <Col xs={23} sm={10} md={23} lg={12} xl={14} xxl={16}>
          <h1 style={{ fontFamily: 'Poppins', fontSize: '19px', padding: '10px', marginLeft: '24px' }}>
            {t('item_allocation')}{' '}
          </h1>
        </Col>
      </Row>

      <Col xxl={10}>
        <Row justify={'space-around'}>
          <Col xxl={28} xl={23} sm={23} xs={23} lg={23} md={23}>
            <Card style={{ marginLeft: '18px' }}>
              <Form onFinish={onFinish} form={form}>
                <Row gutter={16} justify={'space-between'}>
                  <Col xs={18} sm={22} md={16} lg={16} xl={14} xxl={17} className="formfield">
                    <AntSelectDynamic
                      // className="company"
                      bordered={false}
                      label={t('company_name')}
                      name="CompCode"
                      fieldLabel="CompName"
                      fieldValue="Id"
                      query={useGetItemAllocationComp}
                      onSelectChange={(obj) => handleItemChange(obj, 'CompCode')}
                    />
                  </Col>

                  {/* <Col xs={24} sm={12} md={12} lg={12} xl={4} offset={1}>
                  <AntButton label={t('show')} htmlType="submit" />
                </Col> */}

                  <Col sm={4} md={4} lg={5} xl={6} xxl={6} style={{ marginTop: '6px' }} offset={1}>
                    <AntButton
                      className="buttons"
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
              </Form>
            </Card>
          </Col>
        </Row>
      </Col>
      <ItemAllocationTable
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
export default ItemAllocation;
