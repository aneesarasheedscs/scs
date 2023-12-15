import React, { useEffect, useState } from 'react';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Row, Col, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { isNumber } from 'lodash';
import { useGetBankReceiptVoucherTable } from '../queries/queries';
import { useGetBankReceiptVoucherById } from '../queries/querySave';
import { TBankReceiptDetailEntry } from '../form/types';

const Tablefile: React.FC<{ selectedRecordId?: number | string }> = ({ selectedRecordId }) => {
  const { t } = useTranslation();
  const { data: table } = useGetBankReceiptVoucherTable();
  const { data, isLoading, isSuccess } = useGetBankReceiptVoucherById(selectedRecordId);
  const voucherData = data?.data?.Data?.Result?.voucherDetailList;
  const [mainDataSource, setMainDataSource] = useState<TBankReceiptDetailEntry[]>([]);
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

  const totalDebit = voucherData?.reduce((total: number, item: any) => total + item.DebitAmount, 0) || 0;
  const totalCredit = voucherData?.reduce((total: number, item: any) => total + item.CreditAmount, 0) || 0;
  const [TaxableEntry, setTaxableEntry] = useState<TaxEntry>();
  console.log(data?.data?.Data?.Result);
  console.log(table?.data?.Data?.Result?.[0]?.ModifyUserProfileImageUrl);
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <div>
      <div className="Detail-wrape">
        <div className="Table">
          <div className="table-header">
            <div className="Account">{t('account_title')}</div>
            <div style={{ marginLeft: '5%' }} className="offset_Account">
              {t('offset_account')}
            </div>
            <div style={{ marginLeft: '15%' }} className="jobLOt">
              {t('job_lot')}
            </div>
            <div style={{ textAlign: 'right' }} className="Debit">
              {t('debit')}
            </div>
            <div style={{ textAlign: 'right' }} className="Credit">
              {t('credit')}
            </div>
          </div>

          {voucherData?.map((item: TBankReceiptDetailEntry, index: number) => (
            <div className={`table-data ${index % 2 === 0 ? '' : 'alternate'}`} key={index}>
              <div className="table-Row">
                <div
                  className="Account"
                  title="Click to View General Ledger"
                  style={{ color: '#8a86f7', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  {item.AccountCode}
                </div>

                <div
                  className="offset_Account"
                  style={{ color: '#8a86f7', cursor: 'pointer', fontWeight: 'bold', marginLeft: '5%' }}
                  title="Click to View General Ledger"
                >
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
                <div>
                  <p
                    style={{
                      color: '#8a86f7',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      marginLeft: '0.5%',
                      width: '25%',
                    }}
                  >
                    {item.AccountTitle}
                  </p>
                  <p
                    className="table-remarks"
                    style={{
                      marginLeft: '44.5%',
                      marginTop: '-3.3%',
                      position: 'absolute',
                      width: '100%',
                    }}
                  >
                    {' '}
                    {item.Comments}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: '1%' }} className="table-Footer">
            <div className="totals-wrape">
              <div className="values">
                <div className="total-caption">{t('total')}</div>
                <div style={{ textAlign: 'right', marginLeft: '27%' }} className="Debit">
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
          <div style={{ color: '#5a54f9', fontWeight: 'bold' }}>{t('prepared_by')}:</div>
          <div>
            <img className="Img" src={table?.data?.Data?.Result?.[0]?.EntryUserProfileImageUrl}></img>
          </div>
          <div>
            <p>{table?.data?.Data?.Result?.[0]?.UserName}</p>
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
          <div style={{ color: '#5a54f9', fontWeight: 'bold' }}>{t('approved_by')}:</div>
          <div>
            <img className="Img" src={table?.data?.Data?.Result?.[0]?.ApprovalUserProfileImageUrl}></img>
          </div>
          <p>{table?.data?.Data?.Result?.[0]?.UserName}</p>
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
          <div style={{ color: '#5a54f9', fontWeight: 'bold' }}>{t('modify_user')}:</div>
          <div>
            <img
              className="Img"
              // src={'file://C:UsershpPictures.bg33-1.jpg'}
              src={table?.data?.Data?.Result?.[0]?.ModifyUserProfileImageUrl}
            ></img>
          </div>
          <div>
            <p>{table?.data?.Data?.Result?.[0]?.UserName}</p>
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
