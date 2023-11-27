import { AntButton, AntSelectDynamic } from '@tradePro/components';
import { Card, Col, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useGetItemAllocationComp, useGetPendingItemsForAllocation, useGetUnAllocatedItems } from '../quries';
import AccountAllocationTable from '../table';
import { useWatch } from 'antd/es/form/Form';
import { TCompanyfilter, TaddAllocatedAccounts } from '../types';
import { SyncOutlined } from '@ant-design/icons';
import { useAtom } from 'jotai';
import { selectedRowsAtom } from '../table/Atom';
import ItemAllocationTable from '../table';

const { useForm } = Form;

const ItemAllocation = () => {
  const [form] = useForm<TaddAllocatedAccounts>();
  const formValues = useWatch<TaddAllocatedAccounts>([], form);
  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);
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
  const handleItemChange = (obj: TCompanyfilter, index: string | null) => {};

  return (
    <div style={{ background: '#fff', marginBottom: '-10%' }}>
      <Row>
        <Col
          xs={10}
          sm={10}
          md={6}
          lg={8}
          xl={14}
          style={{ display: 'flex', alignItems: 'center', alignContent: 'center', margin: '16px' }}
        >
          <h1 style={{ fontFamily: 'Poppins', fontSize: '19px', padding: '10px' }}>{t('item_allocation')} </h1>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={22} md={22} lg={22} xl={{ span: 15, offset: 1 }}>
          <Card className="margin-left-right">
            <Form onFinish={onFinish} form={form}>
              <Row gutter={[16, 16]} justify={'start'}>
                <Col xs={18} sm={18} md={16} lg={16} xl={14} className="formfield ">
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

                <Col xs={{ span: 5, offset: 1 }} sm={4} md={4} lg={5} xl={5} className="buttons ">
                  <AntButton
                    className="buttons"
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
      </Row>
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
