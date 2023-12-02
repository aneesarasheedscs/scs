import React, { useState } from 'react';
import { Col, Row, Typography, Card, Modal, theme } from 'antd';
import { ArrowRightOutlined, SmileOutlined, HeartOutlined, LikeOutlined, ExportOutlined } from '@ant-design/icons';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { useTranslation } from 'react-i18next';
import './style.scss';
import ActivitySummaryReport from '@tradePro/pages/accountReports/ActivitySummary';
import CashBalances from '@tradePro/pages/accountReports/CashBalance';
import PayablesReceivablesReport from '@tradePro/pages/accountReports/PayablesReceivables/Payables&Receivaables/MainForm';
import BankBalances from '@tradePro/pages/accountReports/BankBalances/bankBalancesReport/BankBalances';
import { storedUserDetail } from '@tradePro/utils/storageService';
import CompanyWiseDataPopUp from './CompanyWiseDataPopup';

const { Title, Text } = Typography;
const { useToken } = theme;

const AccountDashboardCards: React.FC<{ Data: any; FromdateProp?: Date; TodateProp?: Date; Companies?: string }> = ({
  Data,
  FromdateProp,
  TodateProp,
  Companies,
}) => {
  const { t } = useTranslation();
  const UserDetail = storedUserDetail();
  const colorPrimary = useToken().token.colorPrimary;
  const [selectedCardData, setSelectedCardData] = useState<any>();

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <div className="card-main-container">
            <Row gutter={[8, 16]} justify="center">
              {Data?.map((card: any, index: number) => (
                <Col xs={24} sm={12} md={8} lg={6} xl={7} key={index}>
                  <Card
                    hoverable
                    className="card-container"
                    cover={<></>}
                    style={{
                      border: `1px solid ${colorPrimary}`,
                    }}
                  >
                    <div className="custom-div" style={{ background: colorPrimary }}>
                      <Title level={4} className="custom-title">
                        {/* {getIconForCard(card.Id)} */}
                        <ExportOutlined style={{ color: '#fff' }} />
                      </Title>
                    </div>
                    <Col span={24}>
                      <Title
                        level={5}
                        className="custom-title1"
                        style={{
                          backgroundColor: colorPrimary,
                          color: '#fff',
                        }}
                      >
                        <p className="card-description"> {card.AccountDescription}</p>
                      </Title>
                    </Col>

                    <Text>
                      <b>
                        <Col className="card-content">
                          <p> {t('opening')}</p>
                          <p> {numberFormatter(card.Opening)}</p>
                        </Col>
                        <Col className="card-content">
                          <p> {t('current_credit')}</p>
                          <p> {numberFormatter(card.CurrDr)}</p>
                        </Col>
                        <Col className="card-content">
                          <p> {t('current_debit')}</p>
                          <p> {numberFormatter(card.CurrCr)}</p>
                        </Col>
                        <Col className="card-content">
                          <p> {t('closing')}</p>
                          <p> {numberFormatter(card.Closing)}</p>
                        </Col>
                      </b>
                    </Text>
                    <Col span={24}>
                      <Title
                        level={5}
                        className="custom-title-info"
                        style={{
                          backgroundColor: colorPrimary,
                        }}
                      >
                        <p
                          onClick={() => setSelectedCardData(card)}
                          style={{ textAlign: 'center' }}
                          className="card-description"
                        >
                          {t('open_more_info')} <ArrowRightOutlined />
                        </p>
                      </Title>
                    </Col>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
      {UserDetail?.IsHeadOffice == false && (
        <Modal
          width={1700}
          key={selectedCardData?.Id}
          open={selectedCardData !== undefined}
          onCancel={() => setSelectedCardData(undefined)}
          footer={null}
          bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
        >
          {selectedCardData?.SortingNo == 1 && (
            <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
              <ActivitySummaryReport FromDateProp={FromdateProp} ToDateProp={TodateProp} />
            </div>
          )}
          {selectedCardData?.SortingNo == 2 && (
            <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
              <CashBalances FromDateProp={FromdateProp} ToDateProp={TodateProp} />
            </div>
          )}
          {selectedCardData?.SortingNo == 3 && (
            <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
              <BankBalances FromDateProp={FromdateProp} ToDateProp={TodateProp} />
            </div>
          )}
          {selectedCardData?.SortingNo == 6 && (
            <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
              <PayablesReceivablesReport AccountClassId={3} FromDateProp={FromdateProp} ToDateProp={TodateProp} />
            </div>
          )}
          {selectedCardData?.SortingNo == 7 && (
            <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
              <PayablesReceivablesReport AccountClassId={2} FromDateProp={FromdateProp} ToDateProp={TodateProp} />
            </div>
          )}
        </Modal>
      )}
      {UserDetail?.IsHeadOffice == true && (
        <Modal
          width={1500}
          title={selectedCardData?.AccountDescription}
          key={selectedCardData?.Id}
          open={selectedCardData !== undefined}
          onCancel={() => setSelectedCardData(undefined)}
          footer={null}
          destroyOnClose={true}
          bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
        >
          <CompanyWiseDataPopUp
            FromdateProp={FromdateProp}
            TodateProp={TodateProp}
            Companies={Companies}
            ReqType={selectedCardData?.AccountDescription}
            Id={selectedCardData?.SortingNo}
          />
        </Modal>
      )}
    </div>
  );
};

export default AccountDashboardCards;
