import { isNumber } from 'lodash';
import { Row, Col, theme, Image } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { TPaymentDetailEntry } from '../form/types';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { useGetPaymentVoucherById } from '../queries/querySave';

const Tablefile: React.FC<{ selectedRecordId?: number | null; voucherData: any }> = ({
  selectedRecordId,
  voucherData,
}) => {
  const { t } = useTranslation();
  const { data, isLoading, isSuccess } = useGetPaymentVoucherById(selectedRecordId);
  const voucherDetailData = data?.data?.Data?.Result?.voucherDetailList;
  const [mainDataSource, setMainDataSource] = useState<TPaymentDetailEntry[]>([]);
  console.log(data?.data?.Data?.Result.IncludeWHT);
  type TaxEntry = {
    Wht_Account: string;
    Wht_AgainstAccount: string;
    TaxType: string;
    TaxPercent: number;
    TaxAmount: number;
  };

  useEffect(() => {
    if (isSuccess && !isLoading) {
      setMainDataSource(voucherDetailData);
      if (data?.data?.Data?.Result?.IncludeWHT) {
        for (let i = 0; i < voucherDetailData.length; i++) {
          if (
            voucherDetailData[i]?.IsTaxable == 'True' &&
            voucherDetailData[i].DebitAmount > 0 &&
            voucherDetailData[i].AccountId == data?.data?.Data?.Result?.RefDocNoId
          ) {
            setTaxableEntry({
              Wht_Account: voucherDetailData[i].AccountTitle,
              Wht_AgainstAccount: voucherDetailData[i].AgainstAccount,
              TaxType: voucherDetailData[i].TaxType,
              TaxPercent: voucherDetailData[i].TaxPrcnt,
              TaxAmount: voucherDetailData[i].TaxesTotalAmount,
            });
          }
        }
      }
    }
  }, [isSuccess, !isLoading]);

  const totalDebit = voucherDetailData?.reduce((total: number, item: any) => total + item.DebitAmount, 0) || 0;
  const totalCredit = voucherDetailData?.reduce((total: number, item: any) => total + item.CreditAmount, 0) || 0;
  const [TaxableEntry, setTaxableEntry] = useState<TaxEntry>();
  console.log(data?.data?.Data?.Result);
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

          {voucherDetailData?.map((item: TPaymentDetailEntry, index: number) => (
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
          style={{ marginTop: '0.9%' }}
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
                      {numberFormatter(TaxableEntry?.TaxAmount ? TaxableEntry?.TaxAmount : 0)}
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
