import React, { useEffect, useState } from 'react';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Row, Col, theme, Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { isNumber } from 'lodash';
import { useGetContraVoucherTable } from '../queries/queries';
import { useGetContraVoucherById } from '../queries/querySave';
import { TContraDetailEntry } from '../form/types';
import './DetailTableFile.scss';
const Tablefile: React.FC<{ selectedRecordId?: number | string }> = ({ selectedRecordId }) => {
  const { t } = useTranslation();
  const { data: table } = useGetContraVoucherTable();
  const { data, isLoading, isSuccess } = useGetContraVoucherById(selectedRecordId);
  const voucherData = data?.data?.Data?.Result?.voucherDetailList;
  const [mainDataSource, setMainDataSource] = useState<TContraDetailEntry[]>([]);
  console.log(data?.data?.Data?.Result.IncludeWHT);

  useEffect(() => {
    if (isSuccess && !isLoading) {
      setMainDataSource(voucherData);
    }
  }, [isSuccess, !isLoading]);

  const totalDebit = voucherData?.reduce((total: number, item: any) => total + item.DebitAmount, 0) || 0;
  const totalCredit = voucherData?.reduce((total: number, item: any) => total + item.CreditAmount, 0) || 0;

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
            <div className="Account">{t('account_code')}</div>
            <div className="Account" style={{ marginLeft: '-2%' }}>
              {t('account_title')}
            </div>
            <div style={{ marginLeft: '5%' }} className="offset_Account">
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

          {voucherData?.map((item: TContraDetailEntry, index: number) => (
            <div className={`table-data ${index % 2 === 0 ? '' : 'alternate'}`} key={index}>
              <div className="table-Row">
                <div className="AccountCode" title="Click to View General Ledger">
                  {item.AccountCode}
                </div>
                <div className="Account" title="Click to View General Ledger">
                  {item.AccountTitle}
                </div>

                <div className="offset_Account" style={{ marginLeft: '5%' }} title="Click to View General Ledger">
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
                <div style={{ textAlign: 'right', marginLeft: '45%' }} className="Debit">
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
          xl={5}
          lg={5}
          md={5}
          sm={6}
          xs={6}
          style={{
            textAlign: 'center',
            marginTop: '2%',
          }}
        >
          <div style={{ fontWeight: 'bold' }}>{t('prepared_by')}:</div>
          <div>
            <Image
              className="Img"
              src={'data:image/jpeg;base64,' + table?.data?.Data?.Result?.[0]?.EntryUserProfileImageUrl}
              style={{ width: '4rem', height: '4rem' }}
            />
          </div>
          <div>
            <p>{table?.data?.Data?.Result?.[0]?.UserName}</p>
          </div>
        </Col>
        <Col
          xl={4}
          lg={4}
          md={4}
          sm={5}
          xs={6}
          style={{
            textAlign: 'center',
            marginTop: '2%',
          }}
        >
          <div style={{ fontWeight: 'bold' }}>{t('approved_by')}:</div>
          <div>
            <Image
              className="Img"
              src={'data:image/jpeg;base64,' + table?.data?.Data?.Result?.[0]?.ApprovalUserProfileImageUrl}
              style={{ width: '4rem', height: '4rem' }}
            />
          </div>
          <p>{table?.data?.Data?.Result?.[0]?.UserName}</p>
        </Col>
        <Col
          xl={4}
          lg={4}
          md={4}
          sm={5}
          xs={6}
          style={{
            textAlign: 'center',
            marginTop: '2%',
          }}
        >
          <div style={{ fontWeight: 'bold' }}>{t('modify_user')}:</div>
          <div>
            <Image
              className="Img"
              src={'data:image/jpeg;base64,' + table?.data?.Data?.Result?.[0]?.ModifyUserProfileImageUrl}
              style={{ width: '4rem', height: '4rem' }}
            />
          </div>
          <div>
            <p>{table?.data?.Data?.Result?.[0]?.UserName}</p>
          </div>
        </Col>
        <Col xl={11} lg={11} md={11} sm={24} xs={24}>
          <Col style={{ marginTop: '2%' }}>
            <div className="grand-total-wrape">
              <div className="grand-totals">
                <div className="calculate-wrape grand-total">
                  <div className="total-caption"> {t('voucher_amount')} </div>
                  <div className="total-value">{numberFormatter(data?.data?.Data?.Result?.VoucherAmount)}</div>
                </div>
              </div>
            </div>
          </Col>
        </Col>
      </Row>
      <br />
    </div>
  );
};

export default Tablefile;
