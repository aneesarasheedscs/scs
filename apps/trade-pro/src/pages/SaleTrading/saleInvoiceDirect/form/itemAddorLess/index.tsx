import { AntButton, AntInput, AntInputNumber, AntSelectDynamic, AntTable } from '@tradePro/components';
import { Card, Col, FormInstance, Row, Form, theme, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { map, size } from 'lodash';
import { useTranslation } from 'react-i18next';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

import { useState } from 'react';
import { columns } from './columns';
import { detailGridColumn } from '../../table/columns';
// import { fetchAccountBalance, useGetContraCreditAccountSelect, useGetContraJobLotSelect } from '../queries/queries'

const { useWatch } = Form;

const ItemAddLess = ({ form }: TDynamicForm) => {
  // const [debitAccountId, setDebitAccountId] = useState(null);
  // const [debitAccountBalance, setDebitAccountBalance] = useState(0);
  const { t } = useTranslation();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  // const formValues = useWatch<any[]>('transportationDetailList', form);
  // const initialValues = {
  //   AccountTypeId: null,
  //   JobLotId: null,
  //   DebitAmount: null,
  //   Remarks: null,
  // };
  // const { data: filter } = useGetContraCreditAccountSelect();

  // const handleItemChange = (obj: TContraDetailEntry, index: number) => {
  //   setFields([
  //     { name: ['contraVoucherDetailList', index, ' AccountTypeId'], value: obj?. AccountTypeId },
  //     { name: ['contraVoucherDetailList', index, 'JobLotId'], value: obj?. JobLotId },
  //     // { name: ['contraVoucherDetailList', index, ' DebitAmount'], value: obj?. DebitAmount },
  //     // { name: ['contraVoucherDetailList', index, 'Remarks'], value: obj?.Remarks },
  //   ]);

  //   const itemQty = getFieldValue(['purchaseOrderDetailList', index, 'AccountTypeId']);
  // }

  // For Debit Account
  // const handleDebitAccountChange = async (value: any) => {
  //   setDebitAccountId(value);

  //   // Fetch and update the debit account balance based on the selected account
  //   try {
  //     await fetchAccountBalance(value, 'debit', setDebitAccountBalance);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();

  const [count, setCount] = useState(0);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const [dataSource, setDataSource] = useState<any[]>([
    {
      key: `${count}`,
      other_item_name: (
        <AntInput
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      qty: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      rate: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      amount: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      remarks: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
    },
  ]);

  const handleAdd = () => {
    const newData: any = {
      key: `${count + 1}`,
      other_item_name: (
        <AntInput
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      qty: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      rate: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      amount: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      remarks: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
    };

    setDataSource([...dataSource, newData]);
    console.log(dataSource);
    setCount(count + 1);
  };

  return (
    <div>
      <Form
        style={{
          width: '80vw',
          paddingTop: '5%',
        }}
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 15 }}
        initialValues={{ remember: true }}
        // onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={{ span: 24 }} xl={{ span: 24 }}>
            <Card style={{ height: 'auto', marginTop: '-4.5%', boxShadow: '2px 4px 12px 1px gray' }}>
              <h3>{t('item add_less')}</h3>
              <br />

              <div className="form-list-container">
                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 23, offset: 0 }}
                  md={{ span: 19, offset: 2 }}
                  lg={{ span: 11, offset: 0 }}
                  xl={{ span: 7, offset: 0 }}
                  // style={{ marginBottom: '2%', marginTop: '1%' }}
                  className="formfield"
                >
                  <AntInput
                    bordered={false}
                    label={t('other_item_name')}
                    // formItemProps={{ ...field, name: [field.name, 'Remarks'] }}
                    // style={{ width: '102.5%' }}
                  />
                </Col>

                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 23, offset: 0 }}
                  md={{ span: 19, offset: 2 }}
                  lg={{ span: 11, offset: 1 }}
                  xl={{ span: 7, offset: 1 }}
                  // style={{ marginBottom: '2%', marginTop: '1%' }}
                  className="formfield"
                >
                  <AntInputNumber
                    bordered={false}
                    label={t('qty')}
                    // formItemProps={{ ...field, name: [field.name, 'Remarks'] }}
                    // style={{ width: '102.5%' }}
                  />
                </Col>

                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 23, offset: 0 }}
                  md={{ span: 19, offset: 2 }}
                  lg={{ span: 11, offset: 0 }}
                  xl={{ span: 7, offset: 1 }}
                  // style={{ marginBottom: '2%', marginTop: '1%' }}
                  className="formfield"
                >
                  <AntInputNumber
                    bordered={false}
                    label={t('rate')}
                    // formItemProps={{ ...field, name: [field.name, 'Remarks'] }}
                    // style={{ width: '102.5%' }}
                  />
                </Col>
                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 23, offset: 0 }}
                  md={{ span: 19, offset: 2 }}
                  lg={{ span: 11, offset: 1 }}
                  xl={{ span: 7, offset: 0 }}
                  // style={{ marginBottom: '2%', marginTop: '1%' }}
                  className="formfield"
                >
                  <AntInputNumber
                    bordered={false}
                    label={t('amount')}
                    // formItemProps={{ ...field, name: [field.name, 'Remarks'] }}
                    // style={{ width: '102.5%' }}
                  />
                </Col>

                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 23, offset: 0 }}
                  md={{ span: 19, offset: 2 }}
                  lg={{ span: 11, offset: 0 }}
                  xl={{ span: 7, offset: 1 }}
                  // style={{ marginBottom: '2%', marginTop: '1%' }}
                  className="formfield"
                >
                  <AntInputNumber
                    bordered={false}
                    label={t('remarks')}
                    // formItemProps={{ ...field, name: [field.name, 'Remarks'] }}
                    // style={{ width: '102.5%' }}
                  />
                </Col>
                <Col
                  xs={{ span: 10, offset: 7 }}
                  sm={{ span: 10, offset: 9 }}
                  md={{ span: 5, offset: 10 }}
                  lg={{ span: 5, offset: 1 }}
                  xl={{ span: 3, offset: 1 }}
                >
                  <Row gutter={[16, 16]} style={{ marginTop: '15%' }}>
                    <Col>
                      <Button onClick={handleAdd} style={{ background: colorPrimary }}>
                        <PlusOutlined style={{ color: 'white', fontSize: '1rem' }} />
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </div>

              <br />
            </Card>
          </Col>
        </Row>
        <br />

        <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}>
          <AntTable
            //   isError={isError}
            numberOfSkeletons={8}
            //   isLoading={isLoading}
            scroll={{ x: '', y: convertVhToPixels('15vh') }}
            // style={{ width: 'auto', padding: '2%' }}
            //   data={data?.data?.Data?.Result}
            columns={columns(
              t,
              setSelectedRecordId,
              handleDelete
              // , setActiveTab
            )}
            data={dataSource}
          />
        </Card>
        <br />

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <h2 className="form-heading">{t('detail_grid')}</h2>
          </Col>
        </Row>

        <Row style={{ marginTop: '0.5%' }} gutter={[16, 16]}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
            <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}>
              <AntTable
                //   isError={isError}
                numberOfSkeletons={8}
                //   isLoading={isLoading}
                scroll={{ x: '', y: convertVhToPixels('15vh') }}
                // style={{ width: 'auto', padding: '2%' }}
                //   data={data?.data?.Data?.Result}
                columns={detailGridColumn(
                  t,
                  setSelectedRecordId,
                  handleDelete
                  // , setActiveTab
                )}
                // data={dataSource}
              />
            </Card>
          </Col>
        </Row>
      </Form>{' '}
    </div>
  );
};

type TDynamicForm = { form: FormInstance };

export default ItemAddLess;
