import React, { useEffect, useState } from 'react';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { useTranslation } from 'react-i18next';
import './detail.scss';
import _ from 'lodash';
import { Col, Image, Row } from 'antd';

import { formateDate } from '@tradePro/utils/formateDate';
import { useGetStockAdjustmentById } from '../quries';
import { InvStockAdjustmentDetail } from '../types';

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
  } = useGetStockAdjustmentById(selectedRecordId);
  const DetailData = stockTransfergetById?.data?.Data?.Result?.InvStockAdjustmentDetailslist;
  const [mainDataSourc, setMainDataSourc] = useState<InvStockAdjustmentDetail[]>([]);
  console.log(DetailData);

  useEffect(() => {
    if (isDataSuccess && !isDataLoading) {
      setMainDataSourc(DetailData);
    }
  }, [isDataSuccess, !isDataLoading]);
  const totalQty = _.sumBy(DetailData, 'Qty');
  const totalAmount = _.sumBy(DetailData, 'Amount');
  const totalItemRate = _.sumBy(DetailData, 'ReqRate');
  const totalNetWeight = _.sumBy(DetailData, 'NetWeight');
  const totalDetailAmount = _.sumBy(DetailData, 'Amount');
  console.log(totalAmount);

  return (
    <>
      <div>
        <div className="Detail-wrape">
          <div className="Table">
            <div className="table-header">
              {/* <div className="Account">{t('warehouse')}</div> */}
              <div style={{ marginLeft: '0%' }} className="offset_Account">
                {t('item_name')}
              </div>
              <div style={{ marginLeft: '25%' }} className="jobLOt">
                {t('item_qty')}
              </div>
              <div style={{ textAlign: 'center' }} className="Debit">
                {t('pack_uom')}
              </div>
              <div style={{ textAlign: 'right' }} className="Credit">
                {t('weight')}
              </div>
              <div style={{ textAlign: 'right' }} className="Credit">
                {t('item_rate')}
              </div>
              {/* <div style={{ textAlign: 'right' }} className="Credit">
                {t('expense')}
              </div> */}
              <div style={{ textAlign: 'right' }} className="Credit">
                {t('amount')}
              </div>
            </div>

            {mainDataSourc?.map((item: InvStockAdjustmentDetail | any, index: number) => (
              <div className={`table-data ${index % 2 === 0 ? '' : 'alternate'}`} key={index}>
                <div className="table-Row">
                  <div
                    className="offset_Account"
                    style={{ color: 'blue', cursor: 'pointer', fontWeight: 'bold', marginLeft: '0%' }}
                    title="Click to View General Ledger"
                  >
                    {item.ItemName}
                  </div>

                  <div style={{ textAlign: 'center' }} className="jobLOt">
                    {item.Qty > 0 ? numberFormatter(item.Qty) : 0}
                  </div>
                  <div style={{ textAlign: 'center' }} className="Debit">
                    {item.PackUom}
                  </div>
                  <div style={{ textAlign: 'right' }} className="Credit">
                    {item.NetWeight > 0 ? numberFormatter(item.NetWeight) : 0}
                  </div>
                  <div style={{ textAlign: 'right' }} className="Credit">
                    {item.ItemRate > 0 ? numberFormatter(item.ItemRate) : 0}
                  </div>
                  <div style={{ textAlign: 'right' }} className="Credit">
                    {item.Amount > 0 ? numberFormatter(item.Amount) : 0}
                  </div>
                </div>

                <div className="table-row">
                  <div>
                    <p
                      style={{
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
                  <div style={{ textAlign: 'right', marginLeft: '6%' }} className="jobLOt">
                    {totalQty > 0 ? numberFormatter(totalQty) : 0}
                  </div>
                  <div style={{ textAlign: 'right' }} className="Credit"></div>
                  <div style={{ textAlign: 'right' }} className="Credit"></div>
                  <div style={{ textAlign: 'right', marginRight: '2%' }} className="Credit">
                    {totalNetWeight > 0 ? numberFormatter(totalNetWeight) : 0}
                  </div>
                  <div style={{ textAlign: 'right', marginRight: '2%' }} className="Credit">
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
            <div style={{ fontWeight: 'bold' }}>{t('prepared_by')}:</div>
            <div>
              <Image
                className="Img"
                src={'data:image/jpeg;base64,' + stockTransfer?.[0]?.EntryUserProfileImageUrl}
                style={{ width: '4rem', height: '4rem' }}
              />
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
            <div style={{ fontWeight: 'bold' }}>{t('approved_by')}:</div>
            <div>
              <Image
                className="Img"
                src={'data:image/jpeg;base64,' + stockTransfer?.[0]?.ApprovalUserProfileImageUrl}
                style={{ width: '4rem', height: '4rem' }}
              />
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
            <div style={{ fontWeight: 'bold' }}>{t('modify_user')}:</div>
            <div>
              <Image
                className="Img"
                src={'data:image/jpeg;base64,' + stockTransfer?.[0]?.ModifyUserProfileImageUrl}
                style={{ width: '4rem', height: '4rem' }}
              />
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
