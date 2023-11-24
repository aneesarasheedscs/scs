import { Alert, Button, Card, Col, Divider, Row, theme } from 'antd';
import { map, sumBy } from 'lodash';
import { useNavigate } from 'react-router-dom';

function BalanceSheetAssetsCards({
  totalstockAmount,
  totalpropertyPlantEquipment,
  totalcashBankBalancesAmount,
  totaltradeDebtorLocalAmount,
  propertyPlantEquipment,
  cashBankBalances,
  stockInTrade,
  tradeDebtorLocal,
}: any) {
  const navigate = useNavigate();

  const handleAccoutsNotes = () => {
    navigate('/bs-notes-breakup', {
      state: {
        propertyPlantEquipment,
      },
    });
    // console.log(propertyPlantEquipment?.[0]?.AccountNoteId);
  };
  const handleAccoutsNotesCashBank = () => {
    navigate('/bs-notes-breakup', {
      state: {
        cashBankBalances,
      },
    });
  };
  const handleAccoutsNotesstockInTrade = () => {
    navigate('/bs-notes-breakup', {
      state: {
        stockInTrade,
      },
    });
  };
  const handleAccoutsNotestradeDebtorLocal = () => {
    navigate('/bs-notes-breakup', {
      state: {
        tradeDebtorLocal,
      },
    });
  };
  const nonCurrentAssets = [
    { label: 'Intangible Assets', value: 0 },
    { label: 'Long Term Investment', value: 0 },
    {
      label: (
        <a style={{ color: '#fff' }} onClick={handleAccoutsNotes}>
          Property, Plant & Equipment
        </a>
      ),
      value: `${totalpropertyPlantEquipment}`,
    },
    { label: 'Capital Work In Progress', value: 0 },
  ];
  const currentAssets = [
    {
      label: (
        <a style={{ color: '#fff' }} onClick={handleAccoutsNotesCashBank}>
          Cash and Bank Balances
        </a>
      ),
      value: `(${totalcashBankBalancesAmount})`,
    },
    { label: 'Advances PrePayments', value: 0 },
    {
      label: (
        <a style={{ color: '#fff' }} onClick={handleAccoutsNotesstockInTrade}>
          Stock-In-Trade
        </a>
      ),
      value: `${totalstockAmount}`,
    },
    { label: 'Advance Others', value: 0 },
    {
      label: (
        <a style={{ color: '#fff' }} onClick={handleAccoutsNotestradeDebtorLocal}>
          Trade Debtors-Local
        </a>
      ),
      value: `${totaltradeDebtorLocalAmount}`,
    },
    { label: 'Trade Debtors-Export', value: 0 },
    { label: 'Sundry Debtors', value: 0 },
    { label: 'Store Spare Parts and Loose Tools', value: 0 },
  ];
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const totalNonCurrentAssets = totalpropertyPlantEquipment;
  const totalCurrentAssets = totalcashBankBalancesAmount + totalstockAmount + totaltradeDebtorLocalAmount;
  // console.log(totalCurrentAssets);
  const totalAssets = totalCurrentAssets + totalNonCurrentAssets;
  return (
    <>
      <Row gutter={[10, 10]} style={{ marginTop: 10 }}>
        <Col xl={10}>
          <Card className="balanceSheet-cards">
            <h2 className="balanceSheet_heading">Non Current Assets</h2>
            {map(nonCurrentAssets, (item) => (
              <>
                <Row justify={'space-between'} style={{ marginTop: 3 }}>
                  <Col xl={4}>
                    <Alert message={item.label} className="balance_card_labels" style={{ background: colorPrimary }} />
                  </Col>
                  <Col>
                    <h3>{item.value}</h3>
                  </Col>
                </Row>
              </>
            ))}
            <Divider />
            <Row justify={'space-between'} style={{ marginTop: 5 }}>
              <Col>
                <Alert message="Total Non Current Assets" type="info" style={{ width: 200 }} />
              </Col>
              <Col>
                <Alert message="0" className="balance_card_labels" style={{ background: colorPrimary }} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xl={11}>
          <Card className="balanceSheet-cards">
            <h2 className="balanceSheet_heading"> Current Assets</h2>
            {map(currentAssets, (item) => (
              <>
                <Row justify={'space-between'} style={{ marginTop: 3 }}>
                  <Col xl={4}>
                    <Alert message={item.label} className="balance_card_labels" style={{ background: colorPrimary }} />
                  </Col>
                  <Col>
                    <h3>{item.value}</h3>
                  </Col>
                </Row>
              </>
            ))}
            <hr />
            <Row justify={'space-between'} style={{ marginTop: 5 }}>
              <Col>
                <Alert message="Total Current Assets" type="info" style={{ width: 200 }} />
              </Col>
              <Col>
                <Alert
                  message={<p style={{ color: '#fff' }}>{`${totalCurrentAssets}`}</p>}
                  className="balance_card_labels"
                  style={{ background: colorPrimary }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row justify={'space-between'} className="balanceSheet-totals">
        <Col xl={6} offset={1}>
          <Alert message={<h3>Total Assets</h3>} type="info" style={{ width: 250 }} />
        </Col>
        <Col xl={5} lg={8}>
          <Alert
            message={<p style={{ color: '#fff' }}>{`${totalAssets}`}</p>}
            className="balance_card_labels"
            style={{ background: colorPrimary }}
          />
        </Col>
      </Row>
    </>
  );
}

export default BalanceSheetAssetsCards;
