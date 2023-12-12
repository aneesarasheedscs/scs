import React, { useEffect, useState } from 'react';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Row, Col, Space, theme, Badge, Avatar, Image } from 'antd';
import { useTranslation } from 'react-i18next';
// import { VoucherHistory_Detail, VouchersModernHistory } from '../type';
import { PlusSquareOutlined, MinusSquareOutlined, HeartFilled } from '@ant-design/icons';
import { useGetBankPaymentVoucherById } from '../queries/querySave';
import { TBankPaymentDetailEntry } from '../form/types';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { isNumber } from 'lodash';
import icon from '../../../../../public/favicon.ico';
type TaxEntry = {
  Wht_Account: string;
  Wht_AgainstAccount: string;
  TaxType: string;
  TaxPercent: number;
  TaxAmount: number;
};

const Tablefile: React.FC<{ selectedRecordId?: number | string }> = ({ selectedRecordId }) => {
  const { t } = useTranslation();
  const { data, isError, isLoading, isSuccess } = useGetBankPaymentVoucherById(selectedRecordId);

  console.log(selectedRecordId);
  const voucherBankData = data?.data?.Data?.Result?.voucherDetailList;
  const [mainDataSource, setMainDataSource] = useState<TBankPaymentDetailEntry[]>([]);
  const [TaxableEntry, setTaxableEntry] = useState<TaxEntry>();
  const userDetail = storedUserDetail();
  console.log(voucherBankData);

  useEffect(() => {
    if (isSuccess && !isLoading) {
      setMainDataSource(voucherBankData);
      if (data?.data?.Data?.Result?.IncludeWHT) {
        for (let i = 0; i < voucherBankData.length; i++) {
          if (
            voucherBankData[i]?.IsTaxable == 'True' &&
            voucherBankData[i].DebitAmount > 0 &&
            voucherBankData[i].AccountId == data?.data?.Data?.Result?.RefDocNoId
          ) {
            setTaxableEntry({
              Wht_Account: voucherBankData[i].AccountTitle,
              Wht_AgainstAccount: voucherBankData[i].AgainstAccount,
              TaxType: voucherBankData[i].TaxType,
              TaxPercent: voucherBankData[i].TaxPrcnt,
              TaxAmount: voucherBankData[i].TaxesTotalAmount,
            });
          }
        }
      }
    }
  }, [isSuccess, !isLoading]);

  console.log(mainDataSource);

  const totalDebit = voucherBankData?.reduce((total: number, item: any) => total + item.DebitAmount, 0) || 0;
  const totalCredit = voucherBankData?.reduce((total: number, item: any) => total + item.CreditAmount, 0) || 0;

  const [ExpandedFlag, setExpandedFlag] = useState(false);

  const ExpandAllDetails = () => {
    setExpandedFlag(false);
    for (let i = 0; i < voucherBankData?.length; i++) {
      if (voucherBankData[i].IsDetailExpanded == true) {
        setExpandedFlag(true);
        break;
      }
    }
    let Action = ExpandedFlag == false ? true : false;
    for (let i = 0; i < voucherBankData; i++) {
      voucherBankData[i].IsDetailExpanded = Action;
    }
  };

  const {
    token: { colorPrimary },
  } = theme.useToken();
  const imageName = 'Screenshot (2).png';
  return (
    <>
      <div className="Detail-wrape">
        <div className="Table">
          <div className="table-header">
            <div className="show-hide-icon">
              <span className="show-detail-icon" onClick={() => ExpandAllDetails()}>
                {ExpandedFlag ? <MinusSquareOutlined /> : <PlusSquareOutlined />}
              </span>
            </div>
            <div className="Account">{t('account_title')}</div>
            <div className="offset_Account">{t('offset_account')}</div>
            <div className="jobLOt">{t('job_lot')}</div>
            <div style={{ textAlign: 'right' }} className="Debit">
              {t('debit')}
            </div>
            <div style={{ textAlign: 'right' }} className="Credit">
              {t('credit')}
            </div>
          </div>

          {voucherBankData?.map((item: TBankPaymentDetailEntry) => (
            <div>
              <div className="table-Row">
                <div
                  className="Account"
                  title="Click to View General Ledger"
                  style={{ color: '#8a86f7', cursor: 'pointer', fontWeight: 'bold', marginLeft: '4%' }}
                >
                  {item.AccountCode}
                </div>

                <div className="offset_Account" title="Click to View General Ledger">
                  {item.AgainstAccount}
                </div>

                <div className="jobLOt">{item.JobLotDescription}</div>
                <div style={{ textAlign: 'right' }} className="Debit">
                  {item.DebitAmount > 0 ? numberFormatter(item.DebitAmount) : 0}
                </div>
                <div style={{ textAlign: 'right' }} className="Credit">
                  {item.CreditAmount > 0 ? numberFormatter(item.CreditAmount) : 0}
                </div>
              </div>

              <div className="table-row">
                <div>
                  <p style={{ color: '#8a86f7', cursor: 'pointer', fontWeight: 'bold', marginLeft: '4%' }}>
                    {item.AccountTitle}
                  </p>
                  <p style={{ marginLeft: '34%', marginTop: '-2.3%' }}> {item.Comments}</p>
                </div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '1%' }} className="table-Footer">
            <div className="totals-wrape">
              <div className="values">
                <div className="total-caption">{t('total')}</div>
                <div style={{ textAlign: 'right', marginLeft: '8%' }} className="Debit">
                  {totalDebit > 0 ? numberFormatter(totalDebit) : 0}
                </div>
                <div style={{ textAlign: 'right' }} className="Credit">
                  {totalCredit > 0 ? numberFormatter(totalCredit) : 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Row>
        <Col
          span={12}
          style={{
            marginTop: '3%',
            display: 'flex',

            justifyContent: 'space-evenly',
          }}
        >
          <div style={{ margin: '0px 50px' }}>
            <div style={{ color: '#5a54f9', fontWeight: 'bold' }}>{t('prepared_by')}:</div>
            <div>
              {userDetail?.PictureURL && (
                <Image src="file:///DESKTOP-GAMC9GT/Attachments/1338694.png" alt="Screenshot" />
              )}
              <p style={{ marginLeft: '5%' }}>{userDetail?.UserName}</p>
            </div>
          </div>
          <br />
          <br />
          <div style={{ margin: '0px 50px' }}>
            <div style={{ color: '#5a54f9', fontWeight: 'bold' }}>{t('approved')}:</div>
            <div>
              <img className="Img" src={userDetail?.PictureURL}></img>
              <p style={{ marginLeft: '5%' }}>{userDetail?.UserName}</p>
            </div>
          </div>
        </Col>
        <Col span={12}>
          {data?.data?.Data?.Result.IncludeWHT && (
            <div className="WhtAgaints_Account">
              <div className="Wrap">
                <div className="Title_Wrap">
                  <div className="Wht-Title">{t('wht_against_account')}</div>
                  <div className="Wht-Value">{TaxableEntry?.Wht_AgainstAccount}</div>
                </div>
                <div className="my-2">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                    className="caption-value-wrape"
                  >
                    <div className="caption">{t('wht_account')}</div>
                    <div style={{ textAlign: 'right' }} className="value">
                      {TaxableEntry?.Wht_Account}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                      className="caption-value-wrape"
                    >
                      <div className="caption">{t('tax_type')}</div>
                      <div style={{ textAlign: 'right' }} className="value">
                        {TaxableEntry?.TaxType}
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                      className="caption-value-wrape"
                    >
                      <div className="caption">{t('tax_percent')}</div>
                      <div style={{ textAlign: 'right' }} className="value">
                        {TaxableEntry?.TaxPercent.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                    className="caption-value-wrape"
                  >
                    <div className="caption">{t('tax_amount')}</div>
                    <div style={{ textAlign: 'right' }} className="value">
                      {numberFormatter(isNumber(TaxableEntry?.TaxAmount) ? TaxableEntry?.TaxAmount : 0)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="grand-total-wrape">
            <div className="grand-totals">
              <div className="calculate-wrape grand-total">
                <div className="total-caption">{t('amount')}</div>
                <div className="total-value">{numberFormatter(data?.data?.Data?.Result?.VoucherAmount)}</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Tablefile;
