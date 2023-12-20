import React, { useEffect, useState } from 'react';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Row, Col, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { useGetExpenseVoucherTable } from '../queries/queries';
import { TExpenseDetailEntry } from '../form/types';
import { useGetExpenseVoucherById } from '../queries/querySave';

const Tablefile: React.FC<{ selectedRecordId?: number | string }> = ({ selectedRecordId }) => {
  const { t } = useTranslation();
  const { data: table } = useGetExpenseVoucherTable();
  const { data, isLoading, isSuccess } = useGetExpenseVoucherById(selectedRecordId);
  const voucherData = data?.data?.Data?.Result?.voucherDetailList;
  const [mainDataSource, setMainDataSource] = useState<TExpenseDetailEntry[]>([]);
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

          {voucherData?.map((item: TExpenseDetailEntry, index: number) => (
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
          span={8}
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
          span={8}
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
          span={8}
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
      </Row>
      <br />
    </div>
  );
};

export default Tablefile;
