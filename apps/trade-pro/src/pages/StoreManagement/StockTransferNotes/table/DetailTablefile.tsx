import React, { useEffect, useState } from 'react';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { useTranslation } from 'react-i18next';
import './detail.scss';
import _ from 'lodash';
import { Col, Row } from 'antd';
import { TWsRmStockTransferNotesDetailsList } from '../types';
import { useGetStockTransferNotesById } from '../quries';
import { formateDate } from '@tradePro/utils/formateDate';

const Tablefile: React.FC<{ selectedRecordId?: number | any; stockTransfer: any }> = ({
  selectedRecordId,
  stockTransfer,
}) => {
  const { t } = useTranslation();

  const {
    data: stockTransfergetById,
    refetch: refetchStock,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetStockTransferNotesById(selectedRecordId);
  const DetailData = stockTransfergetById?.data?.Data?.Result?.WsRmStockTransferNotesDetailsList;
  const [mainDataSourc, setMainDataSourc] = useState<TWsRmStockTransferNotesDetailsList[]>([]);
  console.log(DetailData);

  useEffect(() => {
    if (isDataSuccess && !isDataLoading) {
      setMainDataSourc(DetailData);
    }
  }, [isDataSuccess, !isDataLoading]);
  const totalQty = _.sumBy(DetailData, 'IssuedQty');
  const totalAmount = _.sumBy(DetailData, 'ItemNetAmount');
  const totalExpenseAmount = _.sumBy(DetailData, 'ExpenseAmount');
  const totalItemRate = _.sumBy(DetailData, 'IssuedRate');
  const totalNetWeight = _.sumBy(DetailData, 'StockWeight');
  const totalDetailAmount = _.sumBy(DetailData, 'ItemNetAmount');
  console.log(totalAmount);

  return (
    <>
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
            {mainDataSourc?.map((item: TWsRmStockTransferNotesDetailsList | any, index: number) => (
              <div className={`table-data ${index % 2 === 0 ? '' : 'alternate'}`} key={index}>
                <div className="table-Row">
                  <div
                    className="Account"
                    title="Click to View General Ledger"
                    style={{ color: '#8a86f7', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    {item.WareHouseName}
                  </div>

                  <div
                    className="offset_Account"
                    style={{ color: '#8a86f7', cursor: 'pointer', fontWeight: 'bold', marginLeft: '5%' }}
                    title="Click to View General Ledger"
                  >
                    {item.ItemName}
                  </div>

                  <div style={{ textAlign: 'center' }} className="Credit">
                    {item.IssuedQty > 0 ? numberFormatter(item.IssuedQty) : 0}
                  </div>
                  <div style={{ textAlign: 'center' }} className="Debit">
                    {item.UOMCode}
                  </div>
                  <div style={{ textAlign: 'right' }} className="Credit">
                    {item.StockWeight > 0 ? numberFormatter(item.StockWeight) : 0}
                  </div>
                  <div style={{ textAlign: 'right' }} className="Credit">
                    {item.IssuedRate > 0 ? numberFormatter(item.IssuedRate) : 0}
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
                        color: '#8a86f7',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        marginLeft: '0.5%',
                        width: '25%',
                      }}
                    >
                      {item.RemarksDetail}
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
                    {totalAmount > 0 ? numberFormatter(totalAmount) : 0}
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
              marginTop: '1%',
            }}
          >
            <div style={{ color: '#5A54F9', fontWeight: 'bold' }}>{t('prepared_by')}:</div>
            <div>
              {/* <img className="Img" src={stockTransfer?.[0]?.EntryUserProfileImageUrl}></img> */}
              {/* <img className="Img" src={convertFilePathToUrl(stockTransfer?.[0]?.EntryUserProfileImageUrl)} alt="Prepared By" /> */}
              <img className="Img" src={`file://${stockTransfer?.[0]?.EntryUserProfileImageUrl}`}></img>
              {/* <img className="Img" src={'\\DESKTOP-GAMC9GTAttachmentsProfilePicture.jpg'}></img> */}
              {/* <img className="Img" src={require(`.${stockTransfer?.[0]?.EntryUserProfileImageUrl}`)} alt="Prepared By" /> */}
            </div>
            <p>{stockTransfer?.[0]?.EntryUser}</p>
            <p>{formateDate(stockTransfer?.[0]?.EntryDate)}</p>
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
              marginTop: '1%',
            }}
          >
            <div style={{ color: '#5A54F9', fontWeight: 'bold' }}>{t('approved_by')}:</div>
            <div>
              <img className="Img" src={stockTransfer?.[0]?.ApprovalUserProfileImageUrl}></img>
            </div>
            <p>{stockTransfer?.[0]?.ApprovedUser}</p>
            <p>{formateDate(stockTransfer?.[0]?.ApprovedDate)}</p>
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
              marginTop: '1%',
            }}
          >
            <div style={{ color: '#5A54F9', fontWeight: 'bold' }}>{t('modify_user')}:</div>
            <div>
              <img
                className="Img"
                // src={'file://C:UsershpPictures.bg33-1.jpg'}
                src={stockTransfer?.[0]?.ModifyUserProfileImageUrl}
              ></img>
            </div>
            <div>
              <p>{stockTransfer?.[0]?.ModifyUser}</p>
              <p>{formateDate(stockTransfer?.[0]?.ModifyDate)}</p>
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
    </>
  );
};

export default Tablefile;
