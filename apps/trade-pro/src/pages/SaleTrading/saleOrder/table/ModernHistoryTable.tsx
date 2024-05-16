import React, { useEffect, useState } from 'react';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { useTranslation } from 'react-i18next';
import './detail.scss';
import _ from 'lodash';
import { Col, Image, Row } from 'antd';
import { formateDate } from '@tradePro/utils/formateDate';
import { useGetSaleOrderById } from '../queries';
import { TSaleOrderDetail } from '../type';

const Tablefile: React.FC<{ selectedRecordId?: number | any; saleOrderHistory: any }> = ({
  selectedRecordId,
  saleOrderHistory,
}) => {
  const { t } = useTranslation();

  const {
    data: purchaseOrdergetById,
    refetch,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetSaleOrderById(selectedRecordId);
  const DetailData = purchaseOrdergetById?.data?.Data?.Result?.purchaseOrderDetailList;
  const [mainDataSourc, setMainDataSourc] = useState<TSaleOrderDetail[]>([]);
  console.log(DetailData);

  useEffect(() => {
    if (selectedRecordId) {
      refetch();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isDataSuccess && !isDataLoading) {
      setMainDataSourc(DetailData);
    }
  }, [isDataSuccess, !isDataLoading, DetailData]);
  const totalQty = _.sumBy(DetailData, 'OrderItemQty');
  const totalAmount = _.sumBy(DetailData, 'Amount');
  const totalItemRate = _.sumBy(DetailData, 'OrderItemRate');
  const totalNetWeight = _.sumBy(DetailData, 'NetWeight');
  const totalDetailAmount = _.sumBy(DetailData, 'Amount');
  console.log(totalAmount);

  return (
    <>
      <div>
        <div className="Detail-wrape">
          <div className="Table">
            <div className="table-header">
              <div style={{ marginLeft: '0%' }} className="offset_Account">
                {t('item_name')}
              </div>
              <div style={{ marginLeft: '16%' }} className="jobLOt">
                {t('job_lot')}
              </div>
              <div style={{ textAlign: 'right' }} className="Debit">
                {t('pack_uom')}
              </div>
              <div style={{ textAlign: 'right' }} className="Credit">
                {t('qty')}
              </div>
              <div style={{ textAlign: 'right' }} className="Credit">
                {t('weight')}
              </div>
              <div style={{ textAlign: 'right', marginLeft: '3%' }} className="Credit">
                {t('rate_uom')}
              </div>
              <div style={{ textAlign: 'right', marginRight: '3%' }} className="Credit">
                {t('rate')}
              </div>
              <div style={{ textAlign: 'right' }} className="Credit">
                {t('amount')}
              </div>
            </div>

            {mainDataSourc?.map((item: TSaleOrderDetail | any, index: number) => (
              <div className={`table-data ${index % 2 === 0 ? '' : 'alternate'}`} key={index}>
                <div className="table-Row">
                  <div
                    className="offset_Account"
                    style={{ color: '#8a86f7', cursor: 'pointer', fontWeight: 'bold', marginLeft: '0%' }}
                    title="Click to View General Ledger"
                  >
                    {item.ItemName}
                  </div>

                  <div style={{ textAlign: 'left', marginLeft: '-5%' }} className="jobLOt">
                    {item.JobLotDescription}
                  </div>
                  <div style={{ textAlign: 'center' }} className="Debit">
                    {item.UOMCode}
                  </div>
                  <div style={{ textAlign: 'right' }} className="Credit">
                    {item.OrderItemQty > 0 ? numberFormatter(item.OrderItemQty) : 0}
                  </div>
                  <div style={{ textAlign: 'right' }} className="Credit">
                    {item.NetWeight > 0 ? numberFormatter(item.NetWeight) : 0}
                  </div>
                  <div style={{ textAlign: 'center' }} className="Credit">
                    {item.RateUom}
                  </div>
                  <div style={{ textAlign: 'right' }} className="Credit">
                    {item.OrderItemRate > 0 ? numberFormatter(item.OrderItemRate) : 0}
                  </div>
                  <div style={{ textAlign: 'right' }} className="Credit">
                    {item.Amount > 0 ? numberFormatter(item.Amount) : 0}
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
                  <div style={{ textAlign: 'left', marginLeft: '26%' }} className="Debit">
                    {totalQty > 0 ? numberFormatter(totalQty) : 0}
                  </div>
                  <div style={{ textAlign: 'center' }} className="Credit">
                    {totalNetWeight > 0 ? numberFormatter(totalNetWeight) : 0}
                  </div>
                  <div style={{ textAlign: 'center' }} className="Credit"></div>
                  <div style={{ textAlign: 'right' }} className="Credit"></div>

                  <div style={{ textAlign: 'left', marginRight: '-2%' }} className="Credit">
                    {totalItemRate > 0 ? numberFormatter(totalItemRate) : 0}
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
          {/* <Col
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
          {/* <img className="Img" src={`file://${saleOrderHistory?.[0]?.EntryUserProfileImageUrl}`}></img> */}
          {/* <img className="Img" src={'\\DESKTOP-GAMC9GTAttachmentsProfilePicture.jpg'}></img> */}
          {/* <img className="Img" src={require(`.${saleOrderHistory?.[0]?.EntryUserProfileImageUrl}`)} alt="Prepared By" /> */}
          {/* </div>
            <p>{saleOrderHistory?.[0]?.EntryUser}</p>
            <p>{formateDate(saleOrderHistory?.[0]?.EntryDate)}</p>
          </Col> */}
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
                src={'data:image/jpeg;base64,' + saleOrderHistory?.[0]?.EntryUserProfileImageUrl}
                style={{ width: '4rem', height: '4rem' }}
              />
            </div>
            <div>
              <p>{saleOrderHistory?.[0]?.UserName}</p>
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
                // src={'data:image/jpeg;base64,' + saleOrderHistory?.[0]?.ApprovalUserProfileImageUrl}
                src={saleOrderHistory?.[0]?.ApprovalUserProfileImageUrl}
                style={{ width: '4rem', height: '4rem' }}
              />
            </div>
            <div>
              <p>{saleOrderHistory?.[0]?.ApprovedUser}</p>
            </div>

            {/* <p>{formateDate(saleOrderHistory?.[0]?.ApprovedDate)}</p>  */}
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
                // src={'data:image/jpeg;base64,' + saleOrderHistory?.[0]?.ApprovalUserProfileImageUrl}
                src={saleOrderHistory?.[0]?.ModifyUserProfileImageUrl}
                style={{ width: '4rem', height: '4rem' }}
              />
            </div>

            <div>
              <p>{saleOrderHistory?.[0]?.ModifyUser}</p>
              {/* <p>{formateDate(saleOrderHistory?.[0]?.ModifyDate)}</p> */}
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
