import { map } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { Alert, Card, Col, Divider, Row, message, theme } from 'antd';

function LiabilitiesCards({
  totalCreditorsAmount,
  totaltradeCreditorsAmount,
  totalsalariesPayablesAmount,
  totalshareCapitalAmount,
  totalotherCreditorsAmount,
  totalshareDepositAmount,
  totalUnAppropriatedAmount,
  totalfinancialLeaseAmount,
  totallongTermLoansAmount,
  totalShortTermBorrowingsAmount,
  totaltradeOthersPayablesAmount,
  totalloanAndAdvancesAmount,
  totalcreditorsAccruedLiabilitiesAmount,
  totalcreditorsStoreAmount,
  totalTaxationAmount,
  totalReserveAmount,
  totalNetProfitLoss,
  shareCapital,
  salariesPayables,
  creditorsPaddyRices,
  tradeCreditors,
  otherCreditors,
  netProfitLoss,
  shareDeposit,
  unAppropriated,
  reserve,
  financialLease,
  longTermLoans,
  taxation,
  shortTermBorrowings,
  tradeOthersPayables,
  loanAndAdvances,
  creditorsStore,
  creditorsAccruedLiabilities,
}: any) {
  const navigate = useNavigate();

  const handleAccoutsNotes = () => {
    navigate('/bs-notes-breakup', {
      state: {
        shareCapital,
      },
    });
    // console.log(shareCapital?.[0]?.AccountNoteId);
  };
  const handleAccoutsNotesShareDeposit = () => {
    if (shareDeposit?.[0]?.AccountNoteId !== undefined) {
      navigate('/bs-notes-breakup', {
        state: {
          shareDeposit,
        },
      });
    } else {
      message.error('Share Deposit has no Transaction!');
    }
  };
  const handleAccoutsNotesunAppropriated = () => {
    if (unAppropriated?.[0]?.AccountNoteId !== undefined) {
      navigate('/bs-notes-breakup', {
        state: {
          unAppropriated,
        },
      });
    } else {
      message.error('UnAppropriated has no Transaction!');
    }
  };
  const handleAccoutsNotesSalaries = () => {
    navigate('/bs-notes-breakup', {
      state: {
        salariesPayables,
      },
    });
  };
  const handleAccoutsCreditors = () => {
    navigate('/bs-notes-breakup', {
      state: {
        creditorsPaddyRices,
      },
    });
  };
  const handleAccoutsTradeCreditors = () => {
    navigate('/bs-notes-breakup', {
      state: {
        tradeCreditors,
      },
    });
  };
  const handleAccoutsOtherCreditors = () => {
    navigate('/bs-notes-breakup', {
      state: {
        otherCreditors,
      },
    });
  };
  const handleAccoutsNotesProfitLoss = () => {
    if (netProfitLoss?.[0]?.AccountNoteId !== undefined) {
      navigate('/bs-notes-breakup', {
        state: {
          netProfitLoss,
        },
      });
    } else {
      message.error('Net Profit/Loss has no Transaction!');
    }
  };
  const handleAccoutsNotesTradeOtherPayables = () => {
    if (tradeOthersPayables?.[0]?.AccountNoteId !== undefined) {
      navigate('/bs-notes-breakup', {
        state: {
          tradeOthersPayables,
        },
      });
    } else {
      message.error('Trade Others Payables has no Transaction!');
    }
  };
  const handleAccoutsNotesLoanandAdvances = () => {
    if (loanAndAdvances?.[0]?.AccountNoteId !== undefined) {
      navigate('/bs-notes-breakup', {
        state: {
          loanAndAdvances,
        },
      });
    } else {
      message.error('Loans And Advances has no Transaction!');
    }
  };
  const handleAccoutsNotesAccuredLiability = () => {
    if (creditorsAccruedLiabilities?.[0]?.AccountNoteId !== undefined) {
      navigate('/bs-notes-breakup', {
        state: {
          creditorsAccruedLiabilities,
        },
      });
    } else {
      message.error('Accouts Notes Accured Liability has no Transaction!');
    }
  };
  const handleAccoutsNotesCreditorStore = () => {
    if (creditorsStore?.[0]?.AccountNoteId !== undefined) {
      navigate('/bs-notes-breakup', {
        state: {
          creditorsStore,
        },
      });
    } else {
      message.error('Creditors Store has no Transaction!');
    }
  };
  const handleAccoutsNotesReserve = () => {
    if (reserve?.[0]?.AccountNoteId !== undefined) {
      navigate('/bs-notes-breakup', {
        state: {
          reserve,
        },
      });
    } else {
      message.error('Reserves has no Transaction!');
    }
  };
  const handleAccoutsNoteFinancialLease = () => {
    if (financialLease?.[0]?.AccountNoteId !== undefined) {
      navigate('/bs-notes-breakup', {
        state: {
          financialLease,
        },
      });
    } else {
      message.error('Financial Lease has no Transaction!');
    }
  };
  const handleAccoutsNoteLongTermLoans = () => {
    if (longTermLoans?.[0]?.AccountNoteId !== undefined) {
      navigate('/bs-notes-breakup', {
        state: {
          longTermLoans,
        },
      });
    } else {
      message.error('Long Term Loans has no Transaction!');
    }
  };
  const handleAccoutsNoteTaxation = () => {
    if (taxation?.[0]?.AccountNoteId !== undefined) {
      navigate('/bs-notes-breakup', {
        state: {
          taxation,
        },
      });
    } else {
      message.error('Taxation has no Transaction!');
    }
  };
  const handleAccoutsNoteShortTermB = () => {
    if (shortTermBorrowings?.[0]?.AccountNoteId !== undefined) {
      navigate('/bs-notes-breakup', {
        state: {
          shortTermBorrowings,
        },
      });
    } else {
      message.error('Short Term Borrowings has no Transaction!');
    }
  };
  const ownerEquity = [
    {
      label: (
        <a style={{ color: '#fff' }} onClick={handleAccoutsNotes}>
          Share Capital
        </a>
      ),
      value: `${totalshareCapitalAmount}`,
    },
    {
      label: (
        <a style={{ color: '#fff' }} onClick={handleAccoutsNotesShareDeposit}>
          Share Deposit
        </a>
      ),
      value: `${totalshareDepositAmount}`,
    },
    {
      label: (
        <a style={{ color: '#fff' }} onClick={handleAccoutsNotesunAppropriated}>
          Un-Appropriated P/L
        </a>
      ),
      value: `${totalUnAppropriatedAmount}`,
    },
    {
      label: (
        <a style={{ color: '#fff' }} onClick={handleAccoutsNotesReserve}>
          Reserves
        </a>
      ),
      value: `${totalReserveAmount}`,
    },
    {
      label: (
        <a style={{ color: '#fff' }} onClick={handleAccoutsNotesProfitLoss}>
          Net Profit/Loss
        </a>
      ),
      value: `${totalNetProfitLoss}`,
    },
  ];

  const nonCurrentLiabilities = [
    {
      label: (
        <a style={{ color: '#fff' }} onClick={handleAccoutsNoteFinancialLease}>
          Financial Lease
        </a>
      ),
      value: `${totalfinancialLeaseAmount}`,
    },
    {
      label: (
        <a style={{ color: '#fff' }} onClick={handleAccoutsNoteLongTermLoans}>
          Long Term Loans
        </a>
      ),
      value: `${totallongTermLoansAmount}`,
    },
    {
      label: (
        <a style={{ color: '#fff' }} onClick={handleAccoutsNoteTaxation}>
          Taxation
        </a>
      ),
      value: `${totalTaxationAmount}`,
    },
  ];
  const currentLiabilities = [
    {
      label: (
        <a style={{ color: '#fff' }} onClick={handleAccoutsNoteShortTermB}>
          Short Term Borrowings
        </a>
      ),
      value: `${totalShortTermBorrowingsAmount}`,
    },
    {
      label: (
        <a style={{ color: '#fff' }} onClick={handleAccoutsNotesSalaries}>
          Saleries Payables
        </a>
      ),
      value: `${totalsalariesPayablesAmount}`,
    },
    {
      label: (
        <a style={{ color: '#fff' }} onClick={handleAccoutsCreditors}>
          Creditors-Paddy Rice
        </a>
      ),
      value: `${totalCreditorsAmount}`,
    },
    {
      label: (
        <a style={{ color: '#fff' }} onClick={handleAccoutsTradeCreditors}>
          Trade Creditors-Service
        </a>
      ),
      value: `${totaltradeCreditorsAmount}`,
    },
    {
      label: (
        <a style={{ color: '#fff' }} onClick={handleAccoutsOtherCreditors}>
          Other Creditors
        </a>
      ),
      value: `${totalotherCreditorsAmount}`,
    },
    {
      label: (
        <a style={{ color: '#fff' }} onClick={handleAccoutsNotesTradeOtherPayables}>
          Trade Others Payables
        </a>
      ),
      value: `${totaltradeOthersPayablesAmount}`,
    },
    {
      label: (
        <a style={{ color: '#fff' }} onClick={handleAccoutsNotesLoanandAdvances}>
          Loan and Advances
        </a>
      ),
      value: `${totalloanAndAdvancesAmount}`,
    },
    {
      label: (
        <a style={{ color: '#fff' }} onClick={handleAccoutsNotesCreditorStore}>
          Creditor Store
        </a>
      ),
      value: `${totalcreditorsStoreAmount}`,
    },
    {
      label: (
        <a style={{ color: '#fff' }} onClick={handleAccoutsNotesAccuredLiability}>
          Accured Liability
        </a>
      ),
      value: `${totalcreditorsAccruedLiabilitiesAmount}`,
    },
  ];
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const totalOwnerEquity =
    totalshareCapitalAmount +
    totalshareDepositAmount +
    totalUnAppropriatedAmount +
    totalReserveAmount +
    totalNetProfitLoss;
  const totalCurrentLiabilities =
    totalShortTermBorrowingsAmount +
    totaltradeOthersPayablesAmount +
    totalloanAndAdvancesAmount +
    totalcreditorsStoreAmount +
    totalCreditorsAmount +
    totalsalariesPayablesAmount +
    totalotherCreditorsAmount +
    totaltradeCreditorsAmount +
    totalcreditorsAccruedLiabilitiesAmount;

  const totalNonCurrentLiabilities = totalfinancialLeaseAmount + totallongTermLoansAmount + totalTaxationAmount;
  const totalCapitalandLiabilities = totalOwnerEquity + totalCurrentLiabilities + totalNonCurrentLiabilities;

  return (
    <>
      <Row gutter={6} style={{ marginTop: 20 }}>
        <Col xl={13}>
          <Row gutter={6}>
            <Col xl={12} md={10}>
              <Card className="balanceSheet-cards">
                <h2 className="balanceSheet_heading">Owner Equity</h2>
                {map(ownerEquity, (item) => (
                  <>
                    <Row justify={'space-between'} style={{ marginTop: 3 }}>
                      <Col xl={4}>
                        <Alert
                          message={item.label}
                          className="balance_card_labels"
                          style={{ background: colorPrimary }}
                        />
                      </Col>
                      <Col>
                        <h3>{item.value}</h3>
                      </Col>
                    </Row>
                  </>
                ))}
                <Divider />
                <Row style={{ marginTop: 5 }}>
                  <Col xl={11} md={13} lg={13}>
                    <Alert message="Total Owner Equity" type="info" style={{ width: 150 }} />
                  </Col>
                  <Col xl={4} xs={5} offset={2}>
                    <Alert
                      message={<p style={{ color: '#fff' }}>{`${totalOwnerEquity}`}</p>}
                      className="liabilities_totals"
                      style={{ background: colorPrimary }}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xl={12} md={10}>
              <Card className="balanceSheet-cards">
                <h2 className="balanceSheet_heading">Non Current Liabilities</h2>
                {map(nonCurrentLiabilities, (item) => (
                  <>
                    <Row justify={'space-between'} style={{ marginTop: 3 }}>
                      <Col xl={4}>
                        <Alert
                          message={item.label}
                          className="balance_card_labels"
                          style={{ background: colorPrimary }}
                        />
                      </Col>
                      <Col>
                        <h3>{item.value}</h3>
                      </Col>
                    </Row>
                  </>
                ))}
                <Divider />
                <Row justify={'space-between'} style={{ marginTop: 5 }}>
                  <Col xl={11} xs={10} md={13} lg={13}>
                    <Alert message="Total Non Current Liabilities" type="info" style={{ width: 200 }} />
                  </Col>
                  <Col xl={8} xs={9} md={10} offset={2}>
                    <Alert
                      message={<p style={{ color: '#fff' }}>{`${totalNonCurrentLiabilities}`}</p>}
                      className="liabilities_totals"
                      style={{ background: colorPrimary }}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xl={8}>
          <Card className="balanceSheet-cards">
            <h2 className="balanceSheet_heading">Current Liabilities</h2>
            {map(currentLiabilities, (item: any) => (
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
                <Alert message="Total Current Liabilities" type="info" style={{ width: 200 }} />
              </Col>
              <Col lg={9} md={10}>
                <Alert
                  message={<p style={{ color: '#fff' }}>{`${totalCurrentLiabilities}`}</p>}
                  className="liabilities_totals"
                  style={{ background: colorPrimary }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Row justify={'space-between'} className="balanceSheet-totals">
          <Col xl={6} offset={1}>
            <Alert message={<h3>Total Capital and Liabilities</h3>} type="info" style={{ width: 250 }} />
          </Col>
          <Col xl={5} lg={8}>
            <Alert
              message={<p style={{ color: '#fff' }}>{`${totalCapitalandLiabilities}`}</p>}
              className="balance_card_labels"
              style={{ background: colorPrimary }}
            />
          </Col>
        </Row>
      </Row>
    </>
  );
}

export default LiabilitiesCards;
