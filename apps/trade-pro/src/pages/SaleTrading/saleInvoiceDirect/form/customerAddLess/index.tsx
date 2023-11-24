import { AntButton, AntInput, AntInputNumber, AntSelectDynamic, AntTable } from '@tradePro/components';
import { Card, Col, FormInstance, Row, Form, theme, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { isNumber, map, size } from 'lodash';
import { useTranslation } from 'react-i18next';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

import { useState } from 'react';
import { detailGridColumn } from '../../table/columns';
import { columns } from './columns';
// import { fetchAccountBalance, useGetContraCreditAccountSelect, useGetContraJobLotSelect } from '../queries/queries'

const { useWatch } = Form;

const CustomerAddLess = ({ form }: TDynamicForm) => {
  // const [debitAccountId, setDebitAccountId] = useState(null);
  // const [debitAccountBalance, setDebitAccountBalance] = useState(0);
  const { t } = useTranslation();

  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  // const { data, isError, isLoading } = useGetJobLotsTable();
  // const { mutate, isSuccess, isLoading: isSaveLoading } = useSaveJobLotsType(selectedRecordId);
  // const {
  //   data: joblot,
  //   refetch,
  //   isSuccess: isDataByIdSuccess,
  //   isLoading: isDataLoading,
  // } = useGetJobLotsById(selectedRecordId);

  // const formValues = useWatch<any[]>('transportationDetailList', form);
  // const initialValues = {
  //   AccountTypeId: null,
  //   JobLotId: null,
  //   DebitAmount: null,
  //   Remarks: null,
  // };

  // const onFinish = (values: any) => {
  //   if (isNumber(selectedRecordId)) {
  //     mutate(values);
  //   }
  // };

  // const handleReset = () => {
  //   form.resetFields();
  //   setSelectedRecordId(null);
  // };

  // useEffect(() => {
  //   if (isSuccess) handleReset();
  // }, [isSuccess]);

  // useEffect(() => {
  //   if (isNumber(selectedRecordId)) {
  //     refetch();
  //   }
  // }, [selectedRecordId]);

  // useEffect(() => {
  //   if (isDataByIdSuccess) {
  //     form.setFieldsValue(joblot?.data?.Data?.Result);
  //     form.setFieldValue('StartDate', dayjs(joblot?.data?.Data?.Result?.StartDate));
  //     form.setFieldValue('EndDate', dayjs(joblot?.data?.Data?.Result?.EndDate));
  //   }
  // }, [isDataByIdSuccess]);
  // const { data: filter } = useGetContraCreditAccountSelect();
  // const { data: filter } = useGetContraCreditAccountSelect();

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
  const [count, setCount] = useState(0);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const [dataSource, setDataSource] = useState<any[]>([
    {
      key: `${count}`,
      account: (
        <AntInput
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      remarks: (
        <AntInput
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      percentage: (
        <AntInputNumber
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
      debit: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      credit: (
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
      account: (
        <AntInput
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      remarks: (
        <AntInput
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      percentage: (
        <AntInputNumber
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
      debit: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      credit: (
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
              <h3>{t('customer add_less')}</h3>
              <br />

              <div className="form-list-container">
                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 21, offset: 1 }}
                  md={{ span: 11, offset: 0 }}
                  lg={{ span: 11, offset: 0 }}
                  xl={{ span: 7, offset: 0 }}
                  // style={{ marginBottom: '2%', marginTop: '1%' }}
                  className="formfield"
                >
                  <AntInput
                    bordered={false}
                    label={t('account')}
                    // formItemProps={{ ...field, name: [field.name, 'Remarks'] }}
                    // style={{ width: '102.5%' }}
                  />
                </Col>

                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 21, offset: 1 }}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                  xl={{ span: 15, offset: 1 }}
                  // style={{ marginBottom: '2%', marginTop: '1%' }}
                  className="formfield"
                >
                  <AntInput
                    bordered={false}
                    label={t('remarks')}
                    // formItemProps={{ ...field, name: [field.name, 'Remarks'] }}
                    // style={{ width: '102.5%' }}
                  />
                </Col>

                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 21, offset: 1 }}
                  md={{ span: 11, offset: 0 }}
                  lg={{ span: 11, offset: 0 }}
                  xl={{ span: 7, offset: 0 }}
                  // style={{ marginBottom: '2%', marginTop: '1%' }}
                  className="formfield"
                >
                  <AntInputNumber
                    bordered={false}
                    label={t('percentage')}
                    // formItemProps={{ ...field, name: [field.name, 'Remarks'] }}
                    // style={{ width: '102.5%' }}
                  />
                </Col>

                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 21, offset: 1 }}
                  md={{ span: 11, offset: 1 }}
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
                  sm={{ span: 21, offset: 1 }}
                  md={{ span: 11, offset: 0 }}
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
                  sm={{ span: 21, offset: 1 }}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                  xl={{ span: 7, offset: 0 }}
                  // style={{ marginBottom: '2%', marginTop: '1%' }}
                  className="formfield"
                >
                  <AntInputNumber
                    bordered={false}
                    label={t('debit')}
                    // formItemProps={{ ...field, name: [field.name, 'Remarks'] }}
                    // style={{ width: '102.5%' }}
                  />
                </Col>

                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 21, offset: 1 }}
                  md={{ span: 11, offset: 0 }}
                  lg={{ span: 11, offset: 0 }}
                  xl={{ span: 7, offset: 1 }}
                  // style={{ marginBottom: '2%', marginTop: '1%' }}
                  className="formfield"
                >
                  <AntInputNumber
                    bordered={false}
                    label={t('credit')}
                    // formItemProps={{ ...field, name: [field.name, 'Remarks'] }}
                    // style={{ width: '102.5%' }}
                  />
                </Col>
                <Row style={{ marginTop: '2%' }}>
                  <Col
                    xs={{ span: 1, offset: 10 }}
                    sm={{ span: 1, offset: 13 }}
                    md={{ span: 2, offset: 8 }}
                    lg={{ span: 2, offset: 9 }}
                    xl={{ span: 24, offset: 24 }}
                  >
                    <Button onClick={handleAdd} style={{ background: colorPrimary }}>
                      <PlusOutlined style={{ color: 'white', fontSize: '1rem' }} />
                    </Button>
                  </Col>
                </Row>
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

export default CustomerAddLess;
