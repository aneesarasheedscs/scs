import { Alert, Card, Col, Divider, Row, Typography, theme } from 'antd';
import '../style.scss';
import React from 'react';
import { useGetProfitLossHistory } from './queries';
import { map, sumBy } from 'lodash';
import { useNavigate } from 'react-router-dom';
import '../style.scss';
import { useTranslation } from 'react-i18next';

const { useToken } = theme;

const DataNonOperatingIncome = [
  {
    alertMessage: 'Discount Allowed',
    h3Value: '0',
  },
  {
    alertMessage: 'Other Income',
    h3Value: '0',
  },
];
const DataTNonOperatingIncome = [
  {
    label: 'T.Non Operating Income',
    value: '0',
  },
];
const DataTNonOperatingIncomeTotalProfit = [
  {
    label: 'Total Profit',
    value: '0',
  },
];

const TotalOperatingExpense = [
  {
    label: 'Total Operating Expense',
    value: '0',
  },
];
const TotalOperatingProfit = [
  {
    label: 'Total Operating Profit',
    value: '0',
  },
];
const FinancialExpense = [
  {
    label: 'Financial Expense',
    value: '0',
  },
  {
    label: 'Mark Up On Loans',
    value: '0',
  },
];
const TotalFinancialExpense = [
  {
    label: 'Total Financial Expense',
    value: '0',
  },
];
const ProfitBeforeTexation = [
  {
    label: 'Profit Before Texation',
    value: '0',
  },
];
const ProfitAfterTexation = [
  {
    label: 'Profit After Texation',
    value: '0',
  },
];

const Texation = [
  {
    label: 'Tax Expense',
    value: '0',
  },
];

const TotalIncome = [
  {
    label: 'Total Income',
    value: '0',
  },
];
const TotalExpense = [
  {
    label: 'Total Expense',
    value: '0',
  },
];
const NetProfit = [
  {
    label: 'Net Profit',
    value: '0',
  },
];

function ProfitLoss() {
  const navigate = useNavigate();
  const { data } = useGetProfitLossHistory();
  const filteredTotalSaleNet = data?.data?.Data?.Result.filter((item: any) => item.AccountNoteId === 2);
  const filteredTotalCostOfSale = data?.data?.Data?.Result.filter((item: any) => item.AccountNoteId === 4);
  const filteredTotalOtherExpense = data?.data?.Data?.Result.filter((item: any) => item.AccountNoteId === 5);
  const filteredTotalAdministration = data?.data?.Data?.Result.filter((item: any) => item.AccountNoteId === 8);
  const filteredTotalOperatingExpense = data?.data?.Data?.Result.filter((item: any) => item.AccountNoteId === 32);

  const totalSaleNet = sumBy(filteredTotalSaleNet, 'Amount');
  const totalCostOfSale = sumBy(filteredTotalCostOfSale, 'Amount');
  const totalOtherExpense = sumBy(filteredTotalOtherExpense, 'Amount');
  const totalAdministrationExpense = sumBy(filteredTotalAdministration, 'Amount');
  const totalOperatingExpense = sumBy(filteredTotalOperatingExpense, 'Amount');

  const {
    token: { colorPrimary },
  } = useToken();
  const { t } = useTranslation();
  const handleAccoutsNotesSaleNet = () => {
    navigate('/pl-notes-breakup', {
      state: {
        filteredTotalSaleNet,
      },
    });
  };

  const handleAccoutsNotesCostOfSale = () => {
    navigate('/pl-notes-breakup', {
      state: {
        filteredTotalCostOfSale,
      },
    });
  };

  const handleAccoutsNotesOtherExpense = () => {
    navigate('/pl-notes-breakup', {
      state: {
        filteredTotalOtherExpense,
      },
    });
  };
  const handleAccoutsNotesAdminstrationExpense = () => {
    navigate('/pl-notes-breakup', {
      state: {
        filteredTotalAdministration,
      },
    });
  };
  const handleAccoutsNotesOperatingExpense = () => {
    navigate('/pl-notes-breakup', {
      state: {
        filteredTotalOperatingExpense,
      },
    });
  };
  const staticDataArrayCard1 = [
    {
      label: (
        <a style={{ color: '#fff' }} onClick={handleAccoutsNotesSaleNet}>
          {t('net_sale')}
        </a>
      ),
      value: `${totalSaleNet}`,
    },
    {
      label: (
        <a style={{ color: '#fff' }} onClick={handleAccoutsNotesCostOfSale}>
          {t('cost_of_sale')}
        </a>
      ),
      value: `${totalCostOfSale}`,
    },
  ];

  const staticDataArrayCard2 = [
    {
      label: <>{t('gross_net')}</>,
      Value: '0',
    },
  ];

  const OperatingExpense = [
    {
      label: (
        <a style={{ color: '#fff' }} onClick={handleAccoutsNotesOtherExpense}>
          {t('other_expense')}
        </a>
      ),
      value: `${totalOtherExpense}`,
    },
    {
      label: 'Selling Expense',
      value: '0',
    },
    {
      label: (
        <a style={{ color: '#fff' }} onClick={handleAccoutsNotesAdminstrationExpense}>
          {t('administration_expense')}
        </a>
      ),
      value: `${totalAdministrationExpense}`,
    },
    {
      label: (
        <a style={{ color: '#fff' }} onClick={handleAccoutsNotesOperatingExpense}>
          {t('operating_expense')}
        </a>
      ),
      value: `${totalOperatingExpense}`,
    },
  ];
  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Card style={{ width: '40vw', marginLeft: '50px', marginTop: '5px' }} className="card_shadows ">
        <Row justify={'space-between'} style={{ marginTop: '-12px', marginBottom: '-15px' }}>
          {map(staticDataArrayCard1, (data, index) => (
            <React.Fragment key={index}>
              <Col xxl={12} xs={24} className="form-container">
                <Alert message={data.label} style={{ background: colorPrimary }} className="alert_style" />
              </Col>
              <Col>
                <h3>{data.value}</h3>
              </Col>
            </React.Fragment>
          ))}

          <Divider style={{ marginTop: '10px', marginBottom: '8px' }} />
          {map(staticDataArrayCard2, (data, index) => (
            <React.Fragment key={index}>
              <Col xxl={8} xs={24}></Col>
              <Col xl={8} className="form-container">
                <Alert message={data.label} type="info" style={{ color: colorPrimary }} className="alert_style " />
              </Col>
              <Col xl={8} xxl={8} xs={24} className="form-container">
                <Alert
                  message={data.Value}
                  type="success"
                  style={{ background: colorPrimary }}
                  className="alert_style"
                />
              </Col>
            </React.Fragment>
          ))}
        </Row>
      </Card>

      <Card
        style={{ width: '40vw', marginLeft: '50px', marginBottom: '10px', marginTop: '8px' }}
        className="card_shadows"
      >
        <Row justify={'space-between'} style={{ marginTop: '-12px', marginBottom: '-15px' }}>
          <Col xxl={24} xs={24} className="form-container">
            <Typography>
              <h3>{t('non_operating_income')}</h3>
            </Typography>
          </Col>

          {map(DataNonOperatingIncome, (data, index) => (
            <React.Fragment key={index}>
              <Col xxl={12} xs={24} className="form-container">
                <Alert
                  message={data.alertMessage}
                  style={{ background: colorPrimary }}
                  className="alert_style form-container"
                />
              </Col>
              <Col>
                <h3>{data.h3Value}</h3>
              </Col>
            </React.Fragment>
          ))}
          <Divider style={{ marginTop: '10px', marginBottom: '5px' }} />

          {map(DataTNonOperatingIncome, (data, index) => (
            <React.Fragment key={index}>
              <Col xxl={8} xs={24}></Col>
              <Col xl={8} className="form-container">
                <Alert
                  message={data.label}
                  type="info"
                  style={{ color: colorPrimary }}
                  className="alert_style form-container"
                />
              </Col>
              <Col xl={8} xxl={8} xs={24} className="form-container">
                <Alert
                  message={data.value}
                  type="success"
                  style={{ background: colorPrimary }}
                  className="alert_style"
                />
              </Col>
            </React.Fragment>
          ))}
        </Row>
      </Card>

      <Row justify={'end'} style={{ width: '38vw', marginLeft: '69px' }}>
        <Col xl={12} xxl={12} xs={24}></Col>
        {map(DataTNonOperatingIncomeTotalProfit, (data, index) => (
          <React.Fragment key={index}>
            <Col span={8}></Col>
            <Col xl={8} xxl={8} xs={24} className="form-container">
              <Alert message={data.label} type="info" style={{ color: colorPrimary }} className="alert_style" />
            </Col>
            <Col xl={8} xs={24} className="form-container">
              <Alert message={data.value} type="success" style={{ background: colorPrimary }} className="alert_style" />
            </Col>
          </React.Fragment>
        ))}
      </Row>

      <Card
        style={{ width: '40vw', marginLeft: '50px', marginBottom: '10px', marginTop: '8px' }}
        className="card_shadows"
      >
        <Row justify={'space-between'} style={{ marginTop: '-12px', marginBottom: '-15px' }}>
          <Col xxl={24} xs={24} className="form-container">
            <Typography>
              <h3>{t('operating_expense')}</h3>
            </Typography>
          </Col>
          {map(OperatingExpense, (data, index) => (
            <React.Fragment key={index}>
              <Col xxl={12} xs={24} className="form-container">
                <Alert
                  message={data.label}
                  style={{ background: colorPrimary }}
                  className="alert_style form-container"
                />
              </Col>
              <Col>
                <h3>{data.value}</h3>
              </Col>
            </React.Fragment>
          ))}

          <Divider style={{ marginTop: '10px', marginBottom: '8px' }} />
          <Col span={12}> </Col>
          <Col xl={12} xs={24}></Col>
          {map(TotalOperatingExpense, (data, index) => (
            <React.Fragment key={index}>
              <Col span={8}></Col>
              <Col xl={8} xxl={8} xs={24} className="form-container">
                <Alert
                  message={data.label}
                  type="info"
                  style={{ color: colorPrimary }}
                  className="alert_style form-container"
                />
              </Col>
              <Col xl={8} xxl={8} xs={24}>
                <Alert
                  message={data.value}
                  type="success"
                  style={{ background: colorPrimary }}
                  className="alert_style"
                />
              </Col>
            </React.Fragment>
          ))}
        </Row>
      </Card>

      <Row justify={'end'} style={{ width: '38vw', marginLeft: '69px' }}>
        <Col xl={12} xxl={12} xs={24}></Col>
        {map(TotalOperatingProfit, (data, index) => (
          <React.Fragment key={index}>
            <Col span={8}></Col>
            <Col xl={8} xxl={8} xs={24} className="form-container">
              <Alert
                message={data.label}
                type="info"
                style={{ color: colorPrimary }}
                className="alert_style form-container"
              />
            </Col>
            <Col xl={8} xxl={8} xs={24} className="form-container">
              <Alert message={data.value} type="success" style={{ background: colorPrimary }} className="alert_style" />
            </Col>
          </React.Fragment>
        ))}
      </Row>

      <Card
        style={{ width: '40vw', marginLeft: '50px', marginBottom: '10px', marginTop: '8px' }}
        className="card_shadows"
      >
        <Row justify={'space-between'} style={{ marginTop: '-12px', marginBottom: '-15px' }}>
          <Col xxl={24} xs={24}>
            <Typography>
              <h3>{t('financial_expense')}</h3>
            </Typography>
          </Col>
          {map(FinancialExpense, (data, index) => (
            <React.Fragment key={index}>
              <Col xxl={12} xs={24} className="form-container">
                <Alert
                  message={data.label}
                  style={{ background: colorPrimary }}
                  className="alert_style form-container"
                />
              </Col>
              <Col>
                <h3>{data.value}</h3>
              </Col>
            </React.Fragment>
          ))}
        </Row>
      </Card>
      <Row justify={'end'} style={{ width: '38vw', marginLeft: '69px' }}>
        <Col xl={12}></Col>
        {map(TotalFinancialExpense, (data, index) => (
          <React.Fragment key={index}>
            <Col xs={8} xxl={8}></Col>
            <Col xl={8} xxl={8} xs={24} className="form-container">
              <Alert
                message={data.label}
                type="info"
                style={{ color: colorPrimary }}
                className="alert_style form-container"
              />
            </Col>
            <Col xl={8} xxl={8} xs={24} className="form-container">
              <Alert message={data.value} type="success" style={{ background: colorPrimary }} className="alert_style" />
            </Col>
          </React.Fragment>
        ))}
      </Row>
      <Row justify={'end'} style={{ width: '38vw', marginLeft: '69px' }}>
        <Col xl={12}></Col>
        {map(ProfitBeforeTexation, (data, index) => (
          <React.Fragment key={index}>
            <Col span={8}></Col>
            <Col xl={8} xxl={8} xs={24} className="form-container">
              <Alert
                message={data.label}
                type="info"
                style={{ color: colorPrimary }}
                className="alert_style form-container"
              />
            </Col>
            <Col xl={8} xxl={8} xs={24}>
              <Alert message={data.value} type="success" style={{ background: colorPrimary }} className="alert_style" />
            </Col>
          </React.Fragment>
        ))}
      </Row>

      <Card
        style={{ width: '40vw', marginLeft: '50px', marginBottom: '10px', marginTop: '8px' }}
        className="card_shadows"
      >
        <Row justify={'space-between'} style={{ marginTop: '-12px', marginBottom: '-15px' }}>
          <Col xxl={24} xs={24}>
            <Typography>
              <h3>{t('taxation')}</h3>
            </Typography>
          </Col>
          {map(Texation, (data, index) => (
            <React.Fragment key={index}>
              <Col xxl={12} xs={24}>
                <Alert message={data.label} style={{ background: colorPrimary }} className="alert_style" />
              </Col>
              <Col>
                <h3>{data.value}</h3>
              </Col>
            </React.Fragment>
          ))}

          <Divider style={{ marginTop: '10px', marginBottom: '5px' }} />
        </Row>
      </Card>
      <Row justify={'end'} style={{ width: '38vw', marginLeft: '69px' }}>
        <Col xl={12}></Col>
        {map(ProfitAfterTexation, (data, index) => (
          <React.Fragment key={index}>
            <Col xl={8} xxl={8} xs={24}></Col>
            <Col xl={8}>
              <Alert
                message={data.label}
                type="info"
                style={{ color: colorPrimary }}
                className="alert_style form-container"
              />
            </Col>
            <Col xl={8} xxl={8} xs={24}>
              <Alert message={data.value} type="success" style={{ background: colorPrimary }} className="alert_style" />
            </Col>
          </React.Fragment>
        ))}
      </Row>
      <Row justify={'start'} className="total_row row_direction">
        {map(TotalIncome, (data, index) => (
          <React.Fragment key={index}>
            <Col span={6}></Col>
            <Col xl={6} xxl={6} xs={24}>
              <Alert
                message={data.label}
                type="info"
                style={{ color: colorPrimary }}
                className="alert_style form-container"
              />
            </Col>
            <Col xl={6} xxl={6} xs={24}>
              <Alert message={data.value} type="success" style={{ background: colorPrimary }} className="alert_style" />
            </Col>
          </React.Fragment>
        ))}
      </Row>
      <div className="row_direction">
        <Row justify={'start'} className="total_row">
          {map(TotalExpense, (data, index) => (
            <React.Fragment key={index}>
              <Col xl={6} xxl={6} xs={24}></Col>
              <Col xl={6}>
                <Alert
                  message={data.label}
                  type="info"
                  style={{ color: colorPrimary }}
                  className="alert_style form-container"
                />
              </Col>
              <Col xl={6} xxl={6} xs={24}>
                <Alert
                  message={data.value}
                  type="success"
                  style={{ background: colorPrimary }}
                  className="alert_style"
                />
              </Col>
            </React.Fragment>
          ))}
        </Row>
        <Row justify={'start'} className="total_row">
          {map(NetProfit, (data, index) => (
            <React.Fragment key={index}>
              <Col span={6}></Col>
              <Col xl={6} xxl={6} xs={24}>
                <Alert
                  message={data.label}
                  type="info"
                  style={{ color: colorPrimary }}
                  className="alert_style form-container"
                />
              </Col>
              <Col xl={6} xxl={6} xs={24}>
                <Alert
                  message={data.value}
                  type="success"
                  style={{ background: colorPrimary }}
                  className="alert_style"
                />
              </Col>
            </React.Fragment>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default ProfitLoss;
