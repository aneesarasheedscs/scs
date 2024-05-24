import { BackButton } from '@tradePro/components';
import { FormRowGutter } from '@tradePro/globalAtoms';
import { Card, Col, Row } from 'antd';
import './styles.scss';
import dayjs from 'dayjs';
import { useState } from 'react';
import CategoryTable from './CategoryTable';
import { useGetPriceList } from './queries';
import { formateDate } from '@tradePro/utils/formateDate';

function PriceList() {
  const [effectiveDate, setEffectiveDate] = useState<Date | string>(new Date());
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const { data } = useGetPriceList();
  const PriceLists = data?.data?.Data?.Result;
  return (
    <>
      <Card
        style={{ height: '80vh' }}
        cover={
          <>
            <div style={{ paddingTop: 10 }}>
              <Row justify={'space-around'}>
                <Col span={23} style={{ backgroundColor: '#fff', height: '' }}>
                  <Row justify={'space-between'}>
                    <Col xs={15} sm={12} md={7} lg={7} xl={5} xxl={3}>
                      <h1 className="report_heading" style={{ textAlign: 'center' }}>
                        Current Price List
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
                          Effective Date : <span style={{ marginLeft: '5%' }}>{formateDate(effectiveDate)}</span>{' '}
                        </Col>

                        <Col span={12} className=" ">
                          Time : <span style={{ marginLeft: '5%' }}> {currentTime} </span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col span={23} style={{ backgroundColor: '#fff' }}>
                  <CategoryTable PriceLists={PriceLists} />
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
