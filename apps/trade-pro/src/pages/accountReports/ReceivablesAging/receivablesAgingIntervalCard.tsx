import { Card, Col, FormInstance, Row } from 'antd';
import _, { map } from 'lodash';
import { useGetReceivablesAgingRegister } from './queries';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { useTranslation } from 'react-i18next';

function ReceiableAgingIntervalCard({ form }: TInvtervalProps) {
  const {
    data,
    refetch,
    isFetching,
    isError: isError,
    isLoading: isLoading,
    isSuccess,
  } = useGetReceivablesAgingRegister(true, form.getFieldsValue());

  const firstCaption = data?.data?.Data?.Result?.[0]?.FirstIntervalCaption;
  const secondtCaption = data?.data?.Data?.Result?.[0]?.SecondIntervalCaption;
  const thirdCaption = data?.data?.Data?.Result?.[0]?.ThirdIntervalCaption;
  const aboveCaption = data?.data?.Data?.Result?.[0]?.AboveIntervalCaption;

  const TotalFirstInterval = _.sumBy(data?.data?.Data?.Result, 'IstIntervale');
  const TotalSecondInterval = _.sumBy(data?.data?.Data?.Result, 'ScnInterval');
  const TotalThirdInterval = _.sumBy(data?.data?.Data?.Result, 'TrdIntarval');
  const TotalAboveInterval = _.sumBy(data?.data?.Data?.Result, 'Above');
  const TotalOpeing = _.sumBy(data?.data?.Data?.Result, 'Opening');
  const TotalClosing = _.sumBy(data?.data?.Data?.Result, 'Closing');

  const receivalbeCards = [
    {
      status: firstCaption,
      value: TotalFirstInterval,
    },
    {
      status: secondtCaption,
      value: TotalSecondInterval,
    },
    {
      status: thirdCaption,
      value: TotalThirdInterval,
    },
    {
      status: aboveCaption,
      value: TotalAboveInterval,
    },
  ];
  const { t } = useTranslation();
  return (
    <>
      {!isLoading && isSuccess && !isFetching && data?.data?.Data?.Result !== null ? (
        <Row gutter={[5, 10]} style={{ marginTop: 0 }}>
          <Col xxl={14} lg={14} md={18} sm={16}>
            <Row gutter={[6, 6]} justify={'space-between'}>
              {map(receivalbeCards, (heading, index) => (
                <>
                  <Col
                    xl={12}
                    xs={6}
                    lg={12}
                    md={6}
                    sm={6}
                    key={index}
                    style={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <Card
                      style={{ height: '5.3vh', boxShadow: '0px 3px 6px #00000029' }}
                      cover={
                        <>
                          <h1 style={{ backgroundColor: '#25a7df', textAlign: 'center' }}>
                            <p>
                              {' '}
                              <span>{heading.status}</span>
                            </p>
                          </h1>
                          <h1 style={{ background: 'lightgrey', textAlign: 'center' }}>
                            <p>
                              {' '}
                              <span style={{ color: 'grey' }}>{numberFormatter(heading.value)}</span>
                            </p>
                          </h1>
                        </>
                      }
                    >
                      <></>
                    </Card>
                  </Col>
                </>
              ))}
            </Row>
          </Col>
          <Col xxl={10} xl={24} lg={10} md={6} sm={8} style={{}}>
            <Card
              style={{ height: '10vh' }}
              cover={
                <>
                  <div style={{ borderRadius: 3, height: '10vh' }}>
                    <h3 style={{ backgroundColor: '#25a7df', textAlign: 'center', padding: 5 }}>
                      {t('total_of_payables')}
                    </h3>
                    <Row gutter={[2, 10]} justify={'space-between'} style={{ marginTop: 5 }}>
                      <Col span={12} style={{ backgroundColor: '#25a7df', textAlign: 'center' }}>
                        <h3>{t('opening')}</h3>
                      </Col>
                      <Col span={12}>
                        <h3
                          style={{
                            color: 'grey',
                            fontSize: 18,
                            textAlign: 'center',
                            background: 'lightgrey',
                          }}
                        >
                          {numberFormatter(TotalOpeing)}
                        </h3>
                      </Col>
                    </Row>
                    <Row gutter={[2, 10]} justify={'space-between'} style={{ marginTop: 5 }}>
                      <Col span={12} style={{ backgroundColor: '#25a7df', textAlign: 'center' }}>
                        <h3>{t('opening')}</h3>
                      </Col>
                      <Col span={12}>
                        <h3
                          style={{
                            color: 'grey',
                            fontSize: 18,
                            textAlign: 'center',
                            background: 'lightgrey',
                          }}
                        >
                          {numberFormatter(TotalClosing)}
                        </h3>
                      </Col>
                    </Row>
                  </div>
                </>
              }
            ></Card>
          </Col>
        </Row>
      ) : (
        ''
      )}
    </>
  );
}

export default ReceiableAgingIntervalCard;

interface TInvtervalProps {
  form: FormInstance;
}
