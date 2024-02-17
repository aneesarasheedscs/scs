import { isNumber } from 'lodash';
import { Row, Col, theme, Image } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { TCashPaymentDetailEntry } from '../form/types';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { useGetCashPaymentVoucherById } from '../queries/querySave';

type TaxEntry = {
  Wht_Account: string;
  Wht_AgainstAccount: string;
  TaxType: string;
  TaxPercent: number;
  TaxAmount: number;
};
const Tablefile: React.FC<{ selectedRecordId?: number | null; voucherData: any }> = ({ selectedRecordId }) => {
  const { t } = useTranslation();
  const { data, isError, isLoading, isSuccess } = useGetCashPaymentVoucherById(selectedRecordId);
  console.log(selectedRecordId);
  let GeneralLedgerLinkVisible = true;
  const [TaxableEntry, setTaxableEntry] = useState<TaxEntry>();

  const voucherData = data?.data?.Data?.Result?.voucherDetailList;
  const [mainDataSource, setMainDataSource] = useState<TCashPaymentDetailEntry[]>([]);
  console.log(voucherData);
  useEffect(() => {
    if (isSuccess && !isLoading) {
      setMainDataSource(voucherData);
    }
  }, [isSuccess, !isLoading]);
  console.log(mainDataSource);
  useEffect(() => {
    if (isSuccess && !isLoading) {
      setMainDataSource(voucherData);
      if (data?.data?.Data?.Result?.IncludeWHT) {
        for (let i = 0; i < voucherData.length; i++) {
          if (
            voucherData[i]?.IsTaxable == 'True' &&
            voucherData[i].CreditAmount > 0 &&
            voucherData[i].AccountId == data?.data?.Data?.Result?.RefDocNoId
          ) {
            setTaxableEntry({
              Wht_Account: voucherData[i].AccountTitle,
              Wht_AgainstAccount: voucherData[i].AgainstAccount,
              TaxType: voucherData[i].TaxType,
              TaxPercent: voucherData[i].TaxPrcnt,
              TaxAmount: voucherData[i].TaxesTotalAmount,
            });
          }
        }
      }
    }
  }, [isSuccess, !isLoading]);
  useEffect(() => {
    GenerateDetailAndWhtInfo();
  }, [voucherData]);

  const GenerateDetailAndWhtInfo = () => {
    if (
      voucherData?.VoucherHistoryHeader?.DocumentTypeId == 1 ||
      voucherData?.VoucherHistoryHeader?.DocumentTypeId == 2
    ) {
      for (let i = 0; i < voucherData?.VoucherHistoryDetail?.length; i++) {
        // && this.VoucherData?.VoucherHistoryDetail[i].DetailAccountId != this.VoucherData?.VoucherHistoryHeader.RefAccountId
        if (voucherData?.VoucherHistoryDetail[i]?.IsTaxable == 'False') {
          VoucherDetail.push(voucherData?.VoucherHistoryDetail[i]);
        } else if (
          voucherData?.VoucherHistoryDetail[i]?.IsTaxable == 'True' &&
          voucherData?.VoucherHistoryDetail[i].DebitAmount > 0 &&
          voucherData?.VoucherHistoryDetail[i].DetailAccountId == voucherData.VoucherHistoryHeader?.RefDocNoId
        ) {
          voucherData.VoucherHistoryHeader.Wht_AgainstAccount = voucherData?.VoucherHistoryDetail[i].OffsetAccountTitle;
          voucherData.VoucherHistoryHeader.Wht_Account = voucherData?.VoucherHistoryDetail[i].DetailAccountTitle;
          voucherData.VoucherHistoryHeader.TaxType = voucherData?.VoucherHistoryDetail[i].TaxType;
          voucherData.VoucherHistoryHeader.TaxPercent = voucherData?.VoucherHistoryDetail[i].TaxPrcnt;
          voucherData.VoucherHistoryHeader.TaxAmount = voucherData?.VoucherHistoryDetail[i].TaxesTotalAmount;
        }
      }
    } else if (
      voucherData?.VoucherHistoryHeader?.DocumentTypeId == 3 ||
      voucherData?.VoucherHistoryHeader?.DocumentTypeId == 4
    ) {
      for (let i = 0; i < voucherData?.VoucherHistoryDetail?.length; i++) {
        if (voucherData?.VoucherHistoryDetail[i].IsTaxable == 'False') {
          VoucherDetail.push(voucherData.VoucherHistoryDetail[i]);
        } else if (
          voucherData.VoucherHistoryDetail[i].IsTaxable == 'True' &&
          voucherData.VoucherHistoryDetail[i].CreditAmount > 0 &&
          voucherData.VoucherHistoryDetail[i].DetailAccountId == voucherData?.VoucherHistoryHeader?.RefDocNoId
        ) {
          voucherData.VoucherHistoryHeader.Wht_AgainstAccount = voucherData?.VoucherHistoryDetail[i].OffsetAccountTitle;
          voucherData.VoucherHistoryHeader.Wht_Account = voucherData?.VoucherHistoryDetail[i].DetailAccountTitle;
          voucherData.VoucherHistoryHeader.TaxType = voucherData?.VoucherHistoryDetail[i].TaxType;
          voucherData.VoucherHistoryHeader.TaxPercent = voucherData?.VoucherHistoryDetail[i].TaxPrcnt;
          voucherData.VoucherHistoryHeader.TaxAmount = voucherData?.VoucherHistoryDetail[i].TaxesTotalAmount;
        }
      }
    } else if (
      voucherData?.VoucherHistoryHeader?.DocumentTypeId == 10 ||
      voucherData?.VoucherHistoryHeader?.DocumentTypeId == 26
    ) {
      for (let i = 0; i < voucherData?.VoucherHistoryDetail?.length; i++) {
        if (voucherData?.VoucherHistoryDetail[i].IsTaxable == 'False') {
          VoucherDetail.push(voucherData.VoucherHistoryDetail[i]);
        }
      }
      voucherData.VoucherHistoryHeader.IncludeWHT = false;
    } else if (voucherData?.VoucherHistoryHeader?.DocumentTypeId == 5) {
      for (let i = 0; i < voucherData?.VoucherHistoryDetail?.length; i++) {
        VoucherDetail.push(voucherData.VoucherHistoryDetail[i]);
      }
      voucherData.VoucherHistoryHeader.IncludeWHT = false;
    }
    setMainDataSource(voucherData);
  };

  const totalCredit = voucherData?.reduce((total: number, item: any) => total + item.CreditAmount, 0) || 0;
  const totalDebit = voucherData?.reduce((total: number, item: any) => total + item.DebitAmount, 0) || 0;

  const VoucherDetail = new Array<TCashPaymentDetailEntry>();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <div>
      <div className="Detail-wrape">
        <div className="Table">
          <div className="table-header">
            <div className="Account">{t('account_code')}</div>
            <div className="Account" style={{ marginLeft: '-1%' }}>
              {t('account_title')}
            </div>
            <div style={{ marginLeft: '4%' }} className="offset_Account">
              {t('offset_account')}
            </div>
            <div style={{ marginLeft: '10%' }} className="jobLOt">
              {t('job_lot')}
            </div>
            <div style={{ textAlign: 'right' }} className="Debit">
              {t('debit')}
            </div>
            <div style={{ textAlign: 'right' }} className="Credit">
              {t('credit')}
            </div>
          </div>
          {voucherData?.map((item: TCashPaymentDetailEntry, index: number) => (
            <div className={`table-data ${index % 2 === 0 ? '' : 'alternate'}`} key={index}>
              <div className="table-Row">
                <div
                  className="Account"
                  title="Click to View General Ledger"
                  style={{ color: 'blue', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  {item.AccountCode}
                </div>
                <div
                  className="Account"
                  title="Click to View General Ledger"
                  style={{ color: 'blue', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  {item.AccountTitle}
                </div>

                <div className="offset_Account" style={{ fontWeight: 'bold', marginLeft: '5%' }}>
                  {item.AgainstAccount}
                </div>

                <div style={{ marginLeft: '-9%' }} className="jobLOt">
                  {item.JobLotDescription}
                </div>
                <div style={{ textAlign: 'right' }} className="Debit">
                  {item.DebitAmount > 0 ? numberFormatter(item.DebitAmount) : 0}
                </div>
                <div style={{ textAlign: 'right' }} className="Credit">
                  {item.CreditAmount > 0 ? numberFormatter(item.CreditAmount) : 0}
                </div>
              </div>

              <div className="table-row">
                <p
                  style={{
                    marginLeft: '0.5%',
                    fontWeight: 'bold',
                    marginTop: '-0.5%',
                    width: '100%',
                  }}
                >
                  {item.Comments}
                </p>
              </div>
            </div>
          ))}
          <div style={{ marginTop: '1%' }} className="table-Footer">
            <div className="totals-wrape">
              <div className="values">
                <div className="total-caption">{t('totals')}</div>
                <div style={{ textAlign: 'right', marginLeft: '44%' }} className="Debit">
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
          xs={{ span: 8 }}
          sm={{ span: 8 }}
          md={{ span: 5 }}
          lg={{ span: 5 }}
          xl={{ span: 5 }}
          style={{
            display: 'flex',
            textAlignLast: 'center',
            flexDirection: 'column',
            marginTop: '2%',
          }}
        >
          <div style={{ fontWeight: 'bold' }}>{t('prepared_by')}:</div>
          <div>
            <Image
              className="Img"
              src={'data:image/jpeg;base64,' + voucherData?.[0]?.EntryUserProfileImageUrl}
              style={{ width: '4rem', height: '4rem' }}
            />
          </div>
          <div>
            <p>{voucherData?.[0]?.UserName}</p>
          </div>
        </Col>
        <Col
          xs={{ span: 8 }}
          sm={{ span: 8 }}
          md={{ span: 5 }}
          lg={{ span: 5 }}
          xl={{ span: 5 }}
          style={{
            display: 'flex',
            textAlignLast: 'center',
            flexDirection: 'column',
            marginTop: '2%',
          }}
        >
          <div style={{ fontWeight: 'bold' }}>{t('approved_by')}:</div>
          <div>
            <Image
              className="Img"
              src={'data:image/jpeg;base64,' + voucherData?.[0]?.ApprovalUserProfileImageUrl}
              style={{ width: '4rem', height: '4rem' }}
            />
          </div>
          <p>{voucherData?.[0]?.UserName}</p>
        </Col>
        <Col
          xs={{ span: 8 }}
          sm={{ span: 8 }}
          md={{ span: 5 }}
          lg={{ span: 5 }}
          xl={{ span: 5 }}
          style={{
            display: 'flex',
            textAlignLast: 'center',
            flexDirection: 'column',
            marginTop: '2%',
          }}
        >
          <div style={{ fontWeight: 'bold' }}>{t('modify_user')}:</div>
          <div>
            <Image
              className="Img"
              src={'data:image/jpeg;base64,' + voucherData?.[0]?.ModifyUserProfileImageUrl}
              style={{ width: '4rem', height: '4rem' }}
            />
          </div>
          <div>
            <p>{voucherData?.[0]?.UserName}</p>
          </div>
        </Col>

        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 9 }}
          lg={{ span: 9 }}
          xl={{ span: 9 }}
          style={{ marginTop: '0%' }}
        >
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

          <div style={{ marginLeft: '-2.5%' }} className="grand-total-wrape">
            <div className="grand-totals">
              <div className="calculate-wrape grand-total">
                <div className="total-caption">{t('amount')}</div>
                <div className="total-value">{numberFormatter(data?.data?.Data?.Result?.VoucherAmount)}</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <br />
    </div>
  );
};

export default Tablefile;
