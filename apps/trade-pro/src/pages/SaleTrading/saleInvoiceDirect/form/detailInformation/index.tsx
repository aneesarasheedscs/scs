import { AntButton, AntInput, AntInputNumber, AntSelectDynamic, AntTable } from '@tradePro/components';
import { Card, Col, FormInstance, Row, Form, theme, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { isNumber, map, size } from 'lodash';
import { useTranslation } from 'react-i18next';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import ItemInfo from './itemInfo';
import { useEffect, useState } from 'react';
import { detailGridColumn } from '../../table/columns';

const DetailInformation = ({ form }: TDynamicForm) => {
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();

  const {
    token: { colorPrimary },
  } = theme.useToken();
  const { t } = useTranslation();
  const [count, setCount] = useState(0);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const [dataSource, setDataSource] = useState<any[]>([
    {
      key: `${count}`,
      warehouse: (
        <AntSelectDynamic
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
          fieldValue="Id"
          fieldLabel="AccountTitle"
        />
      ),
      item_name: (
        <AntSelectDynamic
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
          fieldValue="Id"
          fieldLabel="JobLotDescription"
        />
      ),
      pack_uom: (
        <AntInput
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      packing: (
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
      gross: (
        <AntInput
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      short: (
        <AntInput
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      net: (
        <AntInput
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      price: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      add_less: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),

      net_rate: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      uom: (
        <AntInput
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
      discount_type: (
        <AntSelectDynamic
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
          fieldLabel=""
          fieldValue=""
        />
      ),
      item_discount: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),

      discount_amount: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      wages_rate: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      wages_amount: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      freights: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      expense: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      commission: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      item_net_amount: (
        <AntInputNumber
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
    },
  ]);

  const handleAdd = () => {
    const newData: any = {
      key: `${count + 1}`,
      warehouse: (
        <AntSelectDynamic
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
          fieldValue="Id"
          fieldLabel="AccountTitle"
        />
      ),
      item_name: (
        <AntSelectDynamic
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
          fieldValue="Id"
          fieldLabel="JobLotDescription"
        />
      ),
      pack_uom: (
        <AntInput
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),

      packing: (
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
      gross: (
        <AntInput
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      short: (
        <AntInput
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      net: (
        <AntInput
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      price: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      add_less: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),

      net_rate: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      uom: (
        <AntInput
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
      discount_type: (
        <AntSelectDynamic
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
          fieldLabel=""
          fieldValue=""
        />
      ),
      item_discount: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),

      discount_amount: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      wages_rate: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      wages_amount: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      freights: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      expense: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      commission: (
        <AntInputNumber
          style={{ position: 'absolute', top: '-10px', height: '30px', width: '160%' }}
          // bordered={false}
          label={''}
        />
      ),
      item_net_amount: (
        <AntInputNumber
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
          <Col xs={24} sm={24} md={24} lg={{ span: 24 }} xl={{ span: 20 }}>
            <Card
              style={{ height: 'auto', marginTop: '-5%', boxShadow: '2px 4px 12px 1px gray' }}
              className="antCard card-shadow saleInvoice detail-card"
            >
              <h3>{t('detail')}</h3>
              <br />

              <div className="form-list-container">
                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 23, offset: 0 }}
                  md={{ span: 11, offset: 0 }}
                  lg={{ span: 11, offset: 0 }}
                  xl={{ span: 7, offset: 0 }}
                  className="formfield"
                >
                  <AntSelectDynamic bordered={false} label={t('warehouse')} fieldValue="Id" fieldLabel="AccountTitle" />
                </Col>
                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 23, offset: 0 }}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                  xl={{ span: 7, offset: 1 }}
                  className="formfield"
                >
                  <Row>
                    <Col span={24} offset={22}>
                      <p style={{ marginTop: '-10%' }}>Dr</p>
                    </Col>
                  </Row>
                  <AntSelectDynamic
                    bordered={false}
                    label={t('item_name')}
                    fieldValue="Id"
                    fieldLabel="JobLotDescription"
                  />
                </Col>

                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 23, offset: 0 }}
                  md={{ span: 11, offset: 0 }}
                  lg={{ span: 11, offset: 0 }}
                  xl={{ span: 7, offset: 1 }}
                  className="formfield"
                >
                  <AntInput bordered={false} label={t('pack_uom')} />
                </Col>

                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 23, offset: 0 }}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                  xl={{ span: 7, offset: 0 }}
                  className="formfield"
                >
                  <AntInputNumber bordered={false} label={t('packing_rate')} />
                </Col>

                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 23, offset: 0 }}
                  md={{ span: 11, offset: 0 }}
                  lg={{ span: 11, offset: 0 }}
                  xl={{ span: 7, offset: 1 }}
                  className="formfield"
                >
                  <AntInputNumber bordered={false} label={t('item_qty')} />
                </Col>

                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 23, offset: 0 }}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                  xl={{ span: 7, offset: 1 }}
                  className="formfield"
                >
                  <AntInput bordered={false} label={t('gross_weight')} />
                </Col>

                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 23, offset: 0 }}
                  md={{ span: 11, offset: 0 }}
                  lg={{ span: 11, offset: 0 }}
                  xl={{ span: 7, offset: 0 }}
                  className="formfield"
                >
                  <AntInput bordered={false} label={t('short_weight')} />
                </Col>

                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 23, offset: 0 }}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                  xl={{ span: 7, offset: 1 }}
                  className="formfield"
                >
                  <AntInput bordered={false} label={t('net_weight')} />
                </Col>

                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 23, offset: 0 }}
                  md={{ span: 11, offset: 0 }}
                  lg={{ span: 11, offset: 0 }}
                  xl={{ span: 7, offset: 1 }}
                  className="formfield"
                >
                  <AntInputNumber bordered={false} label={t('item_price')} />
                </Col>

                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 23, offset: 0 }}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                  xl={{ span: 7, offset: 0 }}
                  className="formfield"
                >
                  <AntInputNumber bordered={false} label={t('add_less')} />
                </Col>

                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 23, offset: 0 }}
                  md={{ span: 11, offset: 0 }}
                  lg={{ span: 11, offset: 0 }}
                  xl={{ span: 7, offset: 1 }}
                  className="formfield"
                >
                  <AntInputNumber bordered={false} label={t('net_rate')} />
                </Col>

                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 23, offset: 0 }}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                  xl={{ span: 7, offset: 1 }}
                  className="formfield"
                >
                  <AntInput bordered={false} label={t('rate_uom')} />
                </Col>

                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 23, offset: 0 }}
                  md={{ span: 11, offset: 0 }}
                  lg={{ span: 11, offset: 0 }}
                  xl={{ span: 7, offset: 0 }}
                  className="formfield"
                >
                  <AntInputNumber bordered={false} label={t('item_amount')} />
                </Col>

                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 23, offset: 0 }}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                  xl={{ span: 7, offset: 1 }}
                  className="formfield"
                >
                  <AntSelectDynamic bordered={false} label={t('discount_type')} fieldLabel="" fieldValue="" />
                </Col>

                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 23, offset: 0 }}
                  md={{ span: 11, offset: 0 }}
                  lg={{ span: 11, offset: 0 }}
                  xl={{ span: 7, offset: 1 }}
                  className="formfield"
                >
                  <AntInputNumber bordered={false} label={t('item_discount')} />
                </Col>

                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 23, offset: 0 }}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                  xl={{ span: 7, offset: 0 }}
                  className="formfield"
                >
                  <AntInputNumber bordered={false} label={t('discount_amount')} />
                </Col>

                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 23, offset: 0 }}
                  md={{ span: 11, offset: 0 }}
                  lg={{ span: 11, offset: 0 }}
                  xl={{ span: 7, offset: 1 }}
                  className="formfield"
                >
                  <AntInputNumber bordered={false} label={t('wages_rate')} />
                </Col>

                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 23, offset: 0 }}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                  xl={{ span: 7, offset: 1 }}
                  className="formfield"
                >
                  <AntInputNumber bordered={false} label={t('wages_amount')} />
                </Col>

                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 23, offset: 0 }}
                  md={{ span: 11, offset: 0 }}
                  lg={{ span: 11, offset: 0 }}
                  xl={{ span: 7, offset: 0 }}
                  className="formfield"
                >
                  <AntInputNumber bordered={false} label={t('item_net_amount')} />
                </Col>

                <Col
                  xs={{ span: 23, offset: 0 }}
                  sm={{ span: 23, offset: 0 }}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                  xl={{ span: 7, offset: 1 }}
                  className="formfield"
                >
                  <AntInput bordered={false} label={t('remarks')} />
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
          <ItemInfo form={form} />
        </Row>
        <br />

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <h2 className="form-heading" style={{ marginBottom: '0.6%' }}>
              {t('detail_grid')}
            </h2>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
            <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}>
              <AntTable
                columns={detailGridColumn(
                  t,
                  setSelectedRecordId,
                  handleDelete
                  // , setActiveTab
                )}
                numberOfSkeletons={8}
                data={dataSource}
                // className="table"
                // bordered
                // size="middle"
                scroll={{ x: '', y: convertVhToPixels('15vh') }}
              />
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

type TDynamicForm = { form: FormInstance };

export default DetailInformation;
