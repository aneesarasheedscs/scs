import _, { map } from 'lodash';
import { useGetPayableAgingReport } from './queries';
import { Card, Col, FormInstance, Row, theme } from 'antd';
import { numberFormatter } from '@tradePro/utils/numberFormatter';

function PayableAgingCards({ form }: TCardsProps) {
  const {
    data,
    refetch,
    isFetching,
    isError: isError,
    isLoading,
    isSuccess,
  } = useGetPayableAgingReport(true, form.getFieldsValue());
  const FirstIntervalCaption = data?.data?.Data?.Result?.[0]?.FirstIntervalCaption;
  const SecondIntervalCaption = data?.data?.Data?.Result?.[0]?.SecondIntervalCaption;
  const ThirdIntervalCaption = data?.data?.Data?.Result?.[0]?.ThirdIntervalCaption;
  const AboveIntervalCaption = data?.data?.Data?.Result?.[0]?.AboveIntervalCaption;
  const totalIstIntervale = _.sumBy(data?.data?.Data?.Result, 'IstIntervale');
  const totalScnInterval = _.sumBy(data?.data?.Data?.Result, 'ScnInterval');
  const totalTrdIntarval = _.sumBy(data?.data?.Data?.Result, 'TrdIntarval');
  const totalAboveIntarval = _.sumBy(data?.data?.Data?.Result, 'Above');
  const totalClosing = _.sumBy(data?.data?.Data?.Result, 'Closing');
  const totalOpening = _.sumBy(data?.data?.Data?.Result, 'Opening');

  const payablesCards = [
    {
      Caption: FirstIntervalCaption,
      Amount: totalIstIntervale,
    },
    {
      Caption: SecondIntervalCaption,
      Amount: totalScnInterval,
    },
    {
      Caption: ThirdIntervalCaption,
      Amount: totalTrdIntarval,
    },
    {
      Caption: AboveIntervalCaption,
      Amount: totalAboveIntarval,
    },
  ];
  const {
    token: { colorPrimary },
  } = theme.useToken();
  return (
    <>
      {isSuccess && !isLoading ? (
        <Row gutter={[0, 10]} className="payables_cards">
          <Col xxl={12} xl={15} lg={24} md={24} sm={24} xs={24}>
            <Row gutter={[0, 8]}>
              {map(payablesCards, (item) => (
                <Col xs={24} sm={12} md={9} lg={11} xl={11} xxl={11} className="" style={{ marginRight: 10 }}>
                  <Card
                    style={{ height: '6vh' }}
                    cover={
                      <>
                        <div style={{ border: ' ', boxShadow: '2px 2px 12px 2px lightgrey', borderRadius: 4 }}>
                          <h3
                            style={{
                              backgroundColor: colorPrimary,
                              textAlign: 'center',
                              borderTopLeftRadius: 3,
                              borderTopRightRadius: 3,
                            }}
                          >
                            {item.Caption}
                          </h3>
                          <h3
                            style={{
                              // backgroundColor: '#EBEDEF',
                              textAlign: 'center',
                              color: 'grey',
                              fontSize: 18,
                            }}
                          >
                            {numberFormatter(item.Amount)}
                          </h3>
                        </div>
                      </>
                    }
                  ></Card>
                </Col>
              ))}
            </Row>
          </Col>
          <Col xxl={12} xl={9} lg={24} md={24} sm={24} xs={24}>
            <Col xs={24} sm={24} md={10} lg={24} xl={24} xxl={12} className="" style={{ marginRight: 10 }}>
              <Card
                style={{ height: '13vh' }}
                cover={
                  <>
                    <div
                      style={{ border: '', boxShadow: '2px 2px 12px 2px lightgrey', borderRadius: 5, height: '13vh' }}
                    >
                      <h3
                        style={{
                          backgroundColor: colorPrimary,
                          textAlign: 'center',
                          padding: 5,
                          borderTopLeftRadius: 3,
                          borderTopRightRadius: 3,
                        }}
                      >
                        Totals of Payables
                      </h3>
                      <Row
                        gutter={[6, 10]}
                        justify={'space-between'}
                        style={{ paddingLeft: 5, paddingRight: 5, marginTop: 4 }}
                      >
                        <Col span={12} style={{ backgroundColor: colorPrimary, textAlign: 'center' }}>
                          <h3>Opening</h3>
                        </Col>
                        <Col span={12}>
                          <h3
                            style={{
                              color: 'grey',
                              fontSize: 18,
                              textAlign: 'center',
                              background: '#EBEDEF',
                            }}
                          >
                            {numberFormatter(totalOpening)}
                          </h3>
                        </Col>
                      </Row>
                      <Row
                        gutter={[6, 10]}
                        justify={'space-between'}
                        style={{ paddingLeft: 5, paddingRight: 5, marginTop: 4 }}
                      >
                        <Col span={12} style={{ backgroundColor: colorPrimary, textAlign: 'center' }}>
                          <h3>Closing</h3>
                        </Col>
                        <Col span={12}>
                          <h3
                            style={{
                              color: 'grey',
                              fontSize: 18,
                              textAlign: 'center',
                              background: '#EBEDEF',
                            }}
                          >
                            {numberFormatter(totalClosing)}
                          </h3>
                        </Col>
                      </Row>
                    </div>
                  </>
                }
              ></Card>
            </Col>
          </Col>
        </Row>
      ) : (
        ''
      )}
    </>
  );
}

export default PayableAgingCards;
interface TCardsProps {
  form: FormInstance;
}
