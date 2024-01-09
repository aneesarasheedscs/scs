import React, { useEffect, useState } from 'react';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { useTranslation } from 'react-i18next';
import './detail.scss';
import { useGetStockTransferById } from '../quries';
import { TWsRmWareHouseToWareHouseStocTransferDetailList } from '../types';
import _ from 'lodash';
import { Col, Row } from 'antd';
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
  } = useGetStockTransferById(selectedRecordId);
  const DetailData = stockTransfergetById?.data?.Data?.Result?.WsRmWareHouseToWareHouseStocTransferDetailList;
  const [mainDataSourc, setMainDataSourc] = useState<TWsRmWareHouseToWareHouseStocTransferDetailList[]>([]);
  console.log(DetailData);

  useEffect(() => {
    if (isDataSuccess && !isDataLoading) {
      setMainDataSourc(DetailData);
    }
  }, [isDataSuccess, !isDataLoading]);
  const totalQty = _.sumBy(DetailData, 'ItemQty');
  const totalAmount = _.sumBy(DetailData, 'ItemAmount');
  const totalItemRate = _.sumBy(DetailData, 'ItemRate');
  const totalNetWeight = _.sumBy(DetailData, 'NetWeight');
  const totalDetailAmount = _.sumBy(DetailData, 'ItemAmount');
  console.log(totalAmount);

  return (
    <>
      <div>
        <div className="Detail-wrape">
          <div className="Table">
            <div className="table-header">
              <div className="Account">{t('ware_house_from')}</div>
              <div style={{ marginLeft: '0%' }} className="offset_Account">
                {t('item_name')}
              </div>
              <div style={{ marginLeft: '10%' }} className="jobLOt">
                {t('qty')}
              </div>
              <div style={{ textAlign: 'right' }} className="Debit">
                {t('pack_uom')}
              </div>
              <div style={{ textAlign: 'right' }} className="Credit">
                {t('weight')}
              </div>
              <div style={{ textAlign: 'right', marginRight: '1%' }} className="Credit">
                {t('rate')}
              </div>
              <div style={{ textAlign: 'center' }} className="Account">
                {t('ware_house_to')}
              </div>
              <div style={{ textAlign: 'right' }} className="Credit">
                {t('amount')}
              </div>
            </div>

            {mainDataSourc?.map((item: TWsRmWareHouseToWareHouseStocTransferDetailList | any, index: number) => (
              <div className={`table-data ${index % 2 === 0 ? '' : 'alternate'}`} key={index}>
                <div className="table-Row">
                  <div className="Account" title="" style={{ color: '#8a86f7', cursor: 'pointer', fontWeight: 'bold' }}>
                    {item.WarehouseFromName}
                  </div>

                  <div
                    className="offset_Account"
                    style={{ color: '#8a86f7', cursor: 'pointer', fontWeight: 'bold', marginLeft: '0%' }}
                    title="Click to View General Ledger"
                  >
                    {item.ItemName}
                  </div>

                  <div style={{ textAlign: 'left', marginRight: '0%' }} className="Debit">
                    {item.ItemQty > 0 ? numberFormatter(item.ItemQty) : 0}
                  </div>
                  <div style={{ textAlign: 'left' }} className="Debit">
                    {item.ItemUomCode}
                  </div>
                  <div style={{ textAlign: 'right' }} className="Credit">
                    {item.NetWeight > 0 ? numberFormatter(item.NetWeight) : 0}
                  </div>
                  <div style={{ textAlign: 'right' }} className="Credit">
                    {item.ItemRate > 0 ? numberFormatter(item.ItemRate) : 0}
                  </div>
                  <div
                    className="Account"
                    title=""
                    style={{ color: '#8a86f7', cursor: 'pointer', fontWeight: 'bold', textAlign: 'center' }}
                  >
                    {item.WarehouseToName}
                  </div>
                  <div style={{ textAlign: 'right' }} className="Credit">
                    {item.ItemAmount > 0 ? numberFormatter(item.ItemAmount) : 0}
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
                  <div style={{ textAlign: 'right', marginLeft: '0%' }} className="Debit">
                    {totalQty > 0 ? numberFormatter(totalQty) : 0}
                  </div>
                  <div style={{ textAlign: 'right' }} className="Credit"></div>
                  <div style={{ textAlign: 'right' }} className="Credit"></div>
                  <div style={{ textAlign: 'center', marginRight: '2%' }} className="Credit">
                    {totalNetWeight > 0 ? numberFormatter(totalNetWeight) : 0}
                  </div>
                  <div style={{ textAlign: 'left', marginRight: '' }} className="Credit">
                    {totalItemRate > 0 ? numberFormatter(totalItemRate) : 0}
                  </div>
                  <div style={{ textAlign: 'right', marginRight: '' }} className="Credit"></div>
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
              marginTop: '2%',
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
              marginTop: '2%',
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
              marginTop: '2%',
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
    </>
  );
};

export default Tablefile;
