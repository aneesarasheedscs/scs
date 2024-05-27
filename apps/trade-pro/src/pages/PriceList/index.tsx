import { AntButton, AntSelectDynamic, BackButton } from '@tradePro/components';
import { FormRowGutter } from '@tradePro/globalAtoms';
import { Card, Col, Form, Radio, RadioChangeEvent, Row, Space } from 'antd';
import './styles.scss';
import dayjs from 'dayjs';
import { useState } from 'react';
import CategoryTable from './CategoryTable';
import { useGetItemCatogory, useGetItemType, useGetPriceList } from './queries';
import { formateDate } from '@tradePro/utils/formateDate';
import { useTranslation } from 'react-i18next';
import { groupBy } from 'lodash';

const { useForm, useWatch } = Form;

function PriceList() {
  const [effectiveDate, setEffectiveDate] = useState<Date | string>(new Date());
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [form] = useForm<TPriceListFilter>();
  const formValues = useWatch<TPriceListFilter>([], form);

  const { data, refetch ,isError,isLoading,isFetching} = useGetPriceList(true, form.getFieldsValue());

  const PriceLists = data?.data?.Data?.Result;
  const [selectedRadio, setSelectedRadio] = useState<number | null>(1);
  const [typeDropdownDisabled, setTypeDropdownDisabled] = useState<boolean>(false);
  const { t } = useTranslation();

  const groupByCategory = groupBy(PriceLists, (item) => item.CategoryDescription);
  const groupByItem = groupBy(PriceLists, (item) => item.TypeDescription);

  console.log(groupByCategory, 'cate');
  console.log(groupByItem, 'item');

  const handleCategoryChange = (value: any) => {};
  const handleRadiobuttonchange = (e: RadioChangeEvent) => {
    setSelectedRadio(e.target.value);
    setTypeDropdownDisabled(e.target.value === 1 ? false : true);
  
  
    
  };
  const onFinish = (_: TPriceListFilter) => {
    if(selectedRadio == 1 ){
      form.setFieldValue('ItemTypeId',null)
 
   
    }else if(selectedRadio == 2){
      form.setFieldValue('ItemCategoryId',null)
    }
    refetch();
  };

  return (
    <>
      <Card
        style={{ height: '100%' }}
        cover={
          <>
            <div style={{ paddingTop: 10 }}>
              <Row justify={'space-around'}>
                <Col span={23} style={{ backgroundColor: '#fff', height: '' }}>
                  <Row justify={'space-between'}>
                    <Col xs={15} sm={12} md={7} lg={7} xl={5} xxl={3}>
                      <h1 className="report_heading" style={{ textAlign: 'center' }}>
                     {t('current_price_list')}
                      </h1>
                    </Col>

                    <Col xxl={1} xl={1} md={1} lg={2} sm={2} xs={2} style={{ marginRight: '30px', marginTop: 10 }}>
                      <BackButton goToDashboard={false} />
                    </Col>
                  </Row>
                </Col>
                <Col span={23} style={{ backgroundColor: '#fff' }}>
                  <Row gutter={[16, 0]} align={'bottom'} style={{ border: '', marginLeft: 0, marginTop: 5 }}>
                    <Col xxl={8} xl={15} lg={20} md={20} style={{ border: ' ' }}>
                      <Row gutter={0} justify={'space-between'}>
                        <Col span={12} className=" ">
                          {t('effective_date')} <span style={{ marginLeft: '5%' }}>{formateDate(effectiveDate)}</span>{' '}
                        </Col>

                        <Col span={12} className=" ">
                          {t('time')} <span style={{ marginLeft: '5%' }}> {currentTime} </span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Form onFinish={onFinish} form={form}>
                    <Row gutter={[16, 0]} align={'bottom'} style={{ border: '', marginLeft: 0, marginTop: 5 }}>
                      <Col xxl={8} xl={15} lg={20} md={20} style={{ border: ' ' }}>
                        <Row gutter={0} justify={'space-between'}>
                          <Col xs={15} sm={12} md={12} xl={15} lg={15}>
                            <Radio.Group
                              defaultValue={1}
                              value={selectedRadio}
                              style={{ display: 'flex', justifyContent: 'space-between' }}
                              onChange={(e) => {
                                handleRadiobuttonchange(e);
                              }} 
                            >
                              <Radio value={1}>{t('category')}</Radio>
                              <div style={{ width: '20px' }}></div>
                              <Radio value={2}>{t('type')}</Radio>
                            </Radio.Group>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row gutter={[16, 0]} align={'bottom'} style={{ border: '', marginLeft: 0, marginTop: 5 }}>
                      <Col xxl={10} xl={15} lg={24} md={20}  style={{ border: ' ' }}>
                        <Row gutter={0} justify={'space-between'}>
                          <Col xxl={8} lg={8} className="form_field ">
                            <AntSelectDynamic
                              bordered={false}
                              
                              fieldValue="ItemCategoryId"
                              fieldLabel="CategoryDescription"
                              defaultValue=""
                              label={t('category')}
                              query={useGetItemCatogory}
                              // query={useGetDateTypes}
                         
                              onChange={(value) => handleCategoryChange(value)}
                              name="ItemCategoryId"
                              disabled={typeDropdownDisabled}
                            />
                          </Col>
                          <Col xxl={9} lg={8} className="form_field ">
                            <AntSelectDynamic
                              bordered={false}
                              fieldValue="ItemTypeId"
                              fieldLabel="TypeDescription"
                              defaultValue=""
                              label={t('type')}
                              query={useGetItemType}
                              disabled={typeDropdownDisabled? false:true}
                              name="ItemTypeId"
                            />
                          </Col>
                          {/* </Col> */}
                          <Col xs={24} lg={4} sm={24} md={8} xxl={4}>
                            <AntButton
                              label={t('show')}
                              htmlType="submit"
                              style={{ marginTop: 2 }}
                              isError={isError}
                              isLoading={isLoading || isFetching}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Form>
                </Col>
                <Col span={23} style={{ backgroundColor: '#fff' }}>
                  <CategoryTable PriceLists={PriceLists} selectedRadio={selectedRadio} form={form}/>
                </Col>
              </Row>
            </div>
          </>
        }
      ></Card>
    </>
  );
}

export default PriceList;
