import React, { useEffect, useState } from 'react';
import { Row, Col, theme, Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { TVoucherDetailList } from '../../types';
import { useGetJournalVoucherById } from '../../quries';
import { numberFormatter } from '@tradePro/utils/numberFormatter';

const Tablefile: React.FC<{ selectedRecordId?: number | null; voucherData: any }> = ({
  selectedRecordId,
  voucherData,
}) => {
  const { t } = useTranslation();
  const { data, isLoading, isSuccess } = useGetJournalVoucherById(selectedRecordId);
  const voucherDetailData = data?.data?.Data?.Result?.voucherDetailList;
  const [mainDataSource, setMainDataSource] = useState<TVoucherDetailList[]>([]);
  console.log(data?.data?.Data?.Result.IncludeWHT);

  useEffect(() => {
    if (isSuccess && !isLoading) {
      setMainDataSource(voucherDetailData);
    }
  }, [isSuccess, !isLoading]);

  const totalDebit = voucherDetailData?.reduce((total: number, item: any) => total + item.DebitAmount, 0) || 0;
  const totalCredit = voucherDetailData?.reduce((total: number, item: any) => total + item.CreditAmount, 0) || 0;

  console.log(data?.data?.Data?.Result);
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <div>
      <div className="Detail-wrape">
        <div className="Table">
          <div className="table-header">
            <div className="Account" style={{}}>
              {t('account_title')}
            </div>
            <div style={{}} className="offset_Account">
              {t('offset_account')}
            </div>
            <div style={{}} className="jobLOt">
              {t('cheque no')}
            </div>
            <div style={{ textAlign: 'left' }} className="Remarks">
              {t('remarks')}
            </div>
            <div style={{ textAlign: 'right' }} className="Debit">
              {t('debit')}
            </div>
            <div style={{ textAlign: 'right' }} className="Credit">
              {t('credit')}
            </div>
          </div>

          {voucherDetailData?.map((item: TVoucherDetailList, index: number) => (
            <div className={`table-data ${index % 2 === 0 ? '' : 'alternate'}`} key={index}>
              <div className="table-Row">
                <div
                  className="Account"
                  title="Click to View General Ledger"
                  style={{ color: 'blue', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  {item.AccountTitle}
                </div>

                <div className="offset_Account" style={{ fontWeight: 'bold' }}>
                  {item.AgainstAccount}
                </div>

                <div style={{ textAlign: 'center' }} className="jobLOt">
                  {item.CheqNoDetail}
                </div>
                <div style={{ textAlign: 'left', marginLeft: '1%' }} className="Remarks">
                  {item.Comments}
                </div>
                <div style={{ textAlign: 'right' }} className="Debit">
                  {item.DebitAmount > 0 ? numberFormatter(item.DebitAmount) : 0}
                </div>
                <div style={{ textAlign: 'right' }} className="Credit">
                  {item.CreditAmount > 0 ? numberFormatter(item.CreditAmount) : 0}
                </div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: '1%' }} className="table-Footer">
            <div className="totals-wrape">
              <div className="values">
                <div className="total-caption">{t('totals')}</div>
                <div style={{ textAlign: 'right', marginLeft: '28%' }} className="Debit">
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
              src={'data:image/jpeg;base64,' + voucherData?.[0]?.EntryUserProfileImageUrl}
              style={{ width: '4rem', height: '4rem' }}
            />
          </div>
          <div>
            <p>{voucherData?.[0]?.UserName}</p>
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
              src={'data:image/jpeg;base64,' + voucherData?.[0]?.ApprovalUserProfileImageUrl}
              style={{ width: '4rem', height: '4rem' }}
            />
          </div>
          <p>{voucherData?.[0]?.UserName}</p>
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
              src={'data:image/jpeg;base64,' + voucherData?.[0]?.ModifyUserProfileImageUrl}
              style={{ width: '4rem', height: '4rem' }}
            />
          </div>
          <div>
            <p>{voucherData?.[0]?.UserName}</p>
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
