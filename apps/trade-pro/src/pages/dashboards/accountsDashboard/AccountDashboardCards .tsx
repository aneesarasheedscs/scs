import React, { useState } from 'react';
import { Col, Row, Typography, Card, Modal, theme } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { useTranslation } from 'react-i18next';
import ActivitySummaryReport from '@tradePro/pages/accountReports/ActivitySummary';
import CashBalances from '@tradePro/pages/accountReports/CashBalance';
import PayablesReceivablesReport from '@tradePro/pages/accountReports/PayablesReceivables/Payables&Receivaables/MainForm';
import BankBalances from '@tradePro/pages/accountReports/BankBalances/bankBalancesReport/BankBalances';
import { storedUserDetail } from '@tradePro/utils/storageService';
import CompanyWiseDataPopUp from './CompanyWiseDataPopup';

const { Title, Text } = Typography;
const { useToken } = theme;

const AccountDashboardCards: React.FC<{
  Data: any;
  DateType?: string;
  FromdateProp?: Date;
  TodateProp?: Date;
  Companies?: string;
}> = ({ Data, DateType, FromdateProp, TodateProp, Companies }) => {
  const { t } = useTranslation();
  const UserDetail = storedUserDetail();
  const colorPrimary = useToken().token.colorPrimary;
  const [selectedCardData, setSelectedCardData] = useState<any>();
  const [columnWidth, setColumnWidth] = useState(false);

  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  return (
    <div>
      <Row gutter={[10, 10]} justify={'space-between'}>
        <Col xxl={23} xs={24} sm={24} md={24} lg={22} xl={20}>
          <div className="">
            <Row gutter={[10, 0]} justify="center">
              {Data?.map((card: any, index: number) => (
                <Col xxl={6} xs={22} sm={22} md={11} lg={8} xl={8} key={index}>
                  <Card
                    hoverable
                    className="card-container-accountD"
                    style={{
                      border: `1px solid ${colorPrimary}`,
                    }}
                  >
                    {/* <div className="custom-div" style={{ background: colorPrimary }}>
                      <Title level={4} className="custom-title"> */}
                    {/* {getIconForCard(card.Id)} */}
                    {/* <ExportOutlined style={{ color: '#fff' }} />
                      </Title>
                    </div> */}
                    <Col xxl={24} xs={24} sm={24} md={24} lg={24} xl={23}>
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
                          <p> {t('current_dr')}</p>
                          <p> {numberFormatter(card.CurrDr)}</p>
                        </Col>
                        <Col className="card-content">
                          <p> {t('current_cr')}</p>
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
                          onClick={() => {
                            setSelectedCardData(card);
                            setColumnWidth(true);
                          }}
                          style={{ textAlign: 'center' }}
                          className="card-description card-info"
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
          // width={selectedCardData?.SortingNo === 1? 1620 :1700}
          key={selectedCardData?.Id}
          open={selectedCardData !== undefined}
          onCancel={() => setSelectedCardData(undefined)}
          footer={null}
          bodyStyle={{ maxHeight: '80vh', overflowY: 'auto', paddingRight: '20px', marginRight: '20px' }}
        >
          {selectedCardData?.SortingNo == 1 && (
            <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
              <ActivitySummaryReport
                columnWidth={columnWidth}
                DateType={DateType}
                FromDateProp={FromdateProp}
                ToDateProp={TodateProp}
              />
            </div>
          )}
          {selectedCardData?.SortingNo == 2 && (
            <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
              <CashBalances DateType={DateType} FromDateProp={FromdateProp} ToDateProp={TodateProp} />
            </div>
          )}
          {selectedCardData?.SortingNo == 3 && (
            <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
              <BankBalances DateType={DateType} FromDateProp={FromdateProp} ToDateProp={TodateProp} />
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
