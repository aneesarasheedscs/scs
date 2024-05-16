import { Card, Col, FormInstance, Row } from 'antd';
// import { useGetPurchaseOrderStatus } from '../queries';
import _, { map } from 'lodash';
import {
  useGetReceivablesAgingRegister,
  useGetReceivablesAgingRegisterNotYetDue,
  useGetReceivablesAgingRegisterOverDue,
} from './queries';
import { numberFormatter } from '@tradePro/utils/numberFormatter';

function ReceiableAgingIntervalOverDueCards({ form }: TInvtervalProps) {
 
 
    const {
        data: DataforOverDue,
        refetch: refetchOverDue,
        isFetching: isFetchingOverDue,
        isError: isErrorOverDue,
        isLoading: isLoadingOverDue,
        isSuccess
      } = useGetReceivablesAgingRegisterOverDue(true, form.getFieldsValue());
 



  const firstCaption = DataforOverDue?.data?.Data?.Result?.[0]?.FirstIntervalCaption;
  const secondtCaption = DataforOverDue?.data?.Data?.Result?.[0]?.SecondIntervalCaption;
  const thirdCaption = DataforOverDue?.data?.Data?.Result?.[0]?.ThirdIntervalCaption;
  const aboveCaption = DataforOverDue?.data?.Data?.Result?.[0]?.AboveIntervalCaption;

  const TotalFirstInterval = _.sumBy(DataforOverDue?.data?.Data?.Result, 'IstIntervale');
  const TotalSecondInterval = _.sumBy(DataforOverDue?.data?.Data?.Result, 'ScnInterval');
  const TotalThirdInterval = _.sumBy(DataforOverDue?.data?.Data?.Result, 'TrdIntarval');
  const TotalAboveInterval = _.sumBy(DataforOverDue?.data?.Data?.Result, 'Above');
  const TotalOpeing = _.sumBy(DataforOverDue?.data?.Data?.Result, 'Opening');
  const TotalClosing = _.sumBy(DataforOverDue?.data?.Data?.Result, 'Closing');

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

  return (
    <>
      {/* <Card style={{ marginBottom: 5 }}> */}
      {!isLoadingOverDue && isSuccess && !isFetchingOverDue && DataforOverDue?.data?.Data?.Result !==null ? 
          <Row gutter={[5, 5]} style={{ marginTop: -20,  }}>
       <Col xxl={14}>
      <Row gutter={[6,6]} justify={'space-between'}>
      {map(receivalbeCards, (heading, index) => (
         <>
           <Col xl={12} xs={6} key={index} style={{display:'flex',flexDirection:'column'}}>
            <Card
              // className="purchase-cards"
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
        <Col xxl={10} style={{  }}>
          <Card
            style={{ height: '10vh' }}
            cover={
              <>
                <div style={{ borderRadius: 3, height: '10vh' }}>
                  <h3 style={{ backgroundColor: '#25a7df', textAlign: 'center', padding: 5 }}>Totals of Payables</h3>
                  <Row gutter={[2, 10]} justify={'space-between'} style={{ marginTop: 5 }}>
                    <Col xxl={12} style={{ backgroundColor: '#25a7df', textAlign: 'center' }}>
                      <h3>Opening</h3>
                    </Col>
                    <Col xxl={12}>
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
                    <Col xxl={12} style={{ backgroundColor: '#25a7df', textAlign: 'center' }}>
                      <h3>Closing</h3>
                    </Col>
                    <Col xxl={12}>
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
      </Row>:''}
      
 

      {/* </Card> */}
    </>
  );
}

export default ReceiableAgingIntervalOverDueCards;

interface TInvtervalProps {
  form: FormInstance;
}
