import React, { useEffect, useState } from 'react';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Row, Col, Space, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { useGetStockReceivedNotesById } from '../quries';
import { TWsRmStockReceivedNotesDetailList } from '../types';
import _ from 'lodash';
import { formateDate } from '@tradePro/utils/formateDate';

const Tablefile: React.FC<{ selectedRecordId?: number | null; historyData: any }> = ({
  selectedRecordId,
  historyData,
}) => {
  const { t } = useTranslation();
  const { data, isError, isLoading, isSuccess } = useGetStockReceivedNotesById(selectedRecordId);
  console.log(selectedRecordId);
  const DetailData = data?.data?.Data?.Result?.WsRmStockReceivedNotesDetailList;
  const [mainDataSource, setMainDataSource] = useState<TWsRmStockReceivedNotesDetailList[]>([]);
  const userDetail = storedUserDetail();
  console.log(DetailData);
  useEffect(() => {
    if (isSuccess && !isLoading) {
      setMainDataSource(DetailData);
    }
  }, [isSuccess, !isLoading]);
  const convertFilePathToUrl = (filePath: string) => {
    // Assuming your server's base URL is "http://example.com/"
    const baseUrl = 'http://example.com/';
    return `${baseUrl}${filePath.replace(/\\/g, '/')}`;
  };

  console.log(mainDataSource);
  console.log(historyData?.[0]?.EntryUserProfileImageUrl);
  const totalQty = _.sumBy(DetailData, 'ReceivedQty');
  const totalItemRate = _.sumBy(DetailData, 'ReceivedRate');
  const totalNetWeight = _.sumBy(DetailData, 'StockWeight');
  const totalExpenseAmount = _.sumBy(DetailData, 'ExpenseAmount');
  const totalNetAmount = _.sumBy(DetailData, 'ItemNetAmount');
  const totalDetailAmount = _.sumBy(DetailData, 'ItemNetAmount');

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <div>
      <div className="Detail-wrape">
        <div className="Table">
          <div className="table-header">
            <div className="Account">{t('warehouse')}</div>
            <div style={{ marginLeft: '5%' }} className="offset_Account">
              {t('item_name')}
            </div>
            <div style={{ marginLeft: '15%' }} className="jobLOt">
              {t('qty')}
            </div>
            <div style={{ textAlign: 'right' }} className="Debit">
              {t('pack_uom')}
            </div>
            <div style={{ textAlign: 'right' }} className="Credit">
              {t('weight')}
            </div>
            <div style={{ textAlign: 'right' }} className="Credit">
              {t('rate')}
            </div>
            <div style={{ textAlign: 'right' }} className="Credit">
              {t('expense')}
            </div>
            <div style={{ textAlign: 'right' }} className="Credit">
              {t('amount')}
            </div>
          </div>

          {DetailData?.map((item: TWsRmStockReceivedNotesDetailList | any, index: number) => (
            <div className={`table-data ${index % 2 === 0 ? '' : 'alternate'}`}>
              <div className="table-Row">
                <div
                  className="Account"
                  title="Click to View General Ledger"
                  style={{ color: 'blue', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  {item.WareHouseName}
                </div>

                <div
                  className="offset_Account"
                  style={{ color: 'blue', cursor: 'pointer', fontWeight: 'bold', marginLeft: '5%' }}
                  title="Click to View General Ledger"
                >
                  {item.ItemName}
                </div>

                <div style={{ textAlign: 'center' }} className="Credit">
                  {item.ReceivedQty > 0 ? numberFormatter(item.ReceivedQty) : 0}
                </div>
                <div style={{ textAlign: 'center' }} className="Debit">
                  {item.UOMCode}
                </div>
                <div style={{ textAlign: 'right' }} className="Credit">
                  {item.StockWeight > 0 ? numberFormatter(item.StockWeight) : 0}
                </div>
                <div style={{ textAlign: 'right' }} className="Credit">
                  {item.ReceivedRate > 0 ? numberFormatter(item.ReceivedRate) : 0}
                </div>
                <div style={{ textAlign: 'right' }} className="Credit">
                  {item.ExpenseAmount > 0 ? numberFormatter(item.ExpenseAmount) : 0}
                </div>
                <div style={{ textAlign: 'right' }} className="Credit">
                  {item.ItemNetAmount > 0 ? numberFormatter(item.ItemNetAmount) : 0}
                </div>
              </div>

              <div className="table-row">
                <div>
                  <p
                    style={{
                      color: 'blue',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      marginLeft: '0.5%',
                      width: '25%',
                    }}
                  >
                    {item.Remarks}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: '1%' }} className="table-Footer">
            <div className="totals-wrape">
              <div className="values">
                <div className="total-caption">{t('totals')}</div>
                <div style={{ textAlign: 'left', marginLeft: '27%' }} className="Debit">
                  {totalQty > 0 ? numberFormatter(totalQty) : 0}
                </div>
                <div style={{ textAlign: 'right' }} className="Credit"></div>
                <div style={{ textAlign: 'right' }} className="Credit"></div>
                <div style={{ textAlign: 'left' }} className="Credit">
                  {totalNetWeight > 0 ? numberFormatter(totalNetWeight) : 0}
                </div>
                <div style={{ textAlign: 'center' }} className="Credit">
                  {totalItemRate > 0 ? numberFormatter(totalItemRate) : 0}
                </div>
                <div style={{ textAlign: 'right', marginRight: '1.5%' }} className="Credit">
                  {totalExpenseAmount > 0 ? numberFormatter(totalExpenseAmount) : 0}
                </div>
                <div style={{ textAlign: 'right' }} className="Credit">
                  {totalNetAmount > 0 ? numberFormatter(totalNetAmount) : 0}
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
          <div style={{  fontWeight: 'bold' }}>{t('prepared_by')}:</div>
          <div>
            {/* <img className="Img" src={historyData?.[0]?.EntryUserProfileImageUrl}></img> */}
            {/* <img className="Img" src={convertFilePathToUrl(historyData?.[0]?.EntryUserProfileImageUrl)} alt="Prepared By" /> */}
            <img className="Img" src={`file://${historyData?.[0]?.EntryUserProfileImageUrl}`}></img>
            {/* <img className="Img" src={'\\DESKTOP-GAMC9GTAttachmentsProfilePicture.jpg'}></img> */}
            {/* <img className="Img" src={require(`.${historyData?.[0]?.EntryUserProfileImageUrl}`)} alt="Prepared By" /> */}
          </div>
          <p>{historyData?.[0]?.EntryUser}</p>
          <p>{formateDate(historyData?.[0]?.EntryDate)}</p>
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
          <div style={{  fontWeight: 'bold' }}>{t('approved_by')}:</div>
          <div>
            <img className="Img" src={historyData?.[0]?.ApprovalUserProfileImageUrl}></img>
          </div>
          <p>{historyData?.[0]?.ApprovedUser}</p>
          <p>{formateDate(historyData?.[0]?.ApprovedDate)}</p>
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
          <div style={{  fontWeight: 'bold' }}>{t('modify_user')}:</div>
          <div>
            <img
              className="Img"
              // src={'file://C:UsershpPictures.bg33-1.jpg'}
              src={historyData?.[0]?.ModifyUserProfileImageUrl}
            ></img>
          </div>
          <div>
            <p>{historyData?.[0]?.ModifyUser}</p>
            <p>{formateDate(historyData?.[0]?.ModifyDate)}</p>
          </div>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 9 }}
          lg={{ span: 9 }}
          xl={{ span: 9 }}
          style={{ marginTop: '1%' }}
        >
          <div style={{ marginLeft: '-2.5%' }} className="grand-total-wrape">
            <div className="grand-totals">
              <div className="calculate-wrape grand-total">
                <div className="total-caption">{t('amount')}</div>
                <div className="total-value">{totalDetailAmount > 0 ? numberFormatter(totalDetailAmount) : 0}</div>
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
