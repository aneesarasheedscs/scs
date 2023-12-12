import React, { useEffect, useState } from 'react';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { useTranslation } from 'react-i18next';
import './detail.scss';
import { PlusSquareOutlined, MinusSquareOutlined, HeartFilled } from '@ant-design/icons';
import { useGetStockTransferById } from '../quries';
import { TWsRmWareHouseToWareHouseStocTransferDetailList } from '../types';
import _, { sumBy } from 'lodash';

const Tablefile: React.FC<{ selectedRecordId?: number | any; documentTypeId: number }> = ({
  selectedRecordId,
  documentTypeId,
}) => {
  const { t } = useTranslation();

  const {
    data: stockTransfergetById,
    refetch: refetchStock,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetStockTransferById(selectedRecordId);
  let GeneralLedgerLinkVisible = true;
  const DetailData = stockTransfergetById?.data?.Data?.Result?.WsRmWareHouseToWareHouseStocTransferDetailList; // Replace with your actual data array
  const [mainDataSourc, setMainDataSourc] = useState<TWsRmWareHouseToWareHouseStocTransferDetailList[]>([]);
  console.log(DetailData);
  // useEffect(() => {
  //   GenerateDetailAndWhtInfo();
  // }, [voucherData]);

  // const GenerateDetailAndWhtInfo = () => {
  //   if (
  //     voucherData?.VoucherHistoryHeader?.DocumentTypeId == 1 ||
  //     voucherData?.VoucherHistoryHeader?.DocumentTypeId == 2
  //   ) {
  //     for (let i = 0; i < voucherData?.VoucherHistoryDetail?.length; i++) {
  //       // && this.VoucherData?.VoucherHistoryDetail[i].DetailAccountId != this.VoucherData?.VoucherHistoryHeader.RefAccountId
  //       if (voucherData?.VoucherHistoryDetail[i]?.IsTaxable == 'False') {
  //         VoucherDetail.push(voucherData?.VoucherHistoryDetail[i]);
  //       } else if (
  //         voucherData?.VoucherHistoryDetail[i]?.IsTaxable == 'True' &&
  //         voucherData?.VoucherHistoryDetail[i].DebitAmount > 0 &&
  //         voucherData?.VoucherHistoryDetail[i].DetailAccountId == voucherData.VoucherHistoryHeader?.RefDocNoId
  //       ) {
  //         voucherData.VoucherHistoryHeader.Wht_AgainstAccount = voucherData?.VoucherHistoryDetail[i].OffsetAccountTitle;
  //         voucherData.VoucherHistoryHeader.Wht_Account = voucherData?.VoucherHistoryDetail[i].DetailAccountTitle;
  //         voucherData.VoucherHistoryHeader.TaxType = voucherData?.VoucherHistoryDetail[i].TaxType;
  //         voucherData.VoucherHistoryHeader.TaxPercent = voucherData?.VoucherHistoryDetail[i].TaxPrcnt;
  //         voucherData.VoucherHistoryHeader.TaxAmount = voucherData?.VoucherHistoryDetail[i].TaxesTotalAmount;
  //       }
  //     }
  //   } else if (
  //     voucherData?.VoucherHistoryHeader?.DocumentTypeId == 3 ||
  //     voucherData?.VoucherHistoryHeader?.DocumentTypeId == 4
  //   ) {
  //     for (let i = 0; i < voucherData?.VoucherHistoryDetail?.length; i++) {
  //       if (voucherData?.VoucherHistoryDetail[i].IsTaxable == 'False') {
  //         VoucherDetail.push(voucherData.VoucherHistoryDetail[i]);
  //       } else if (
  //         voucherData.VoucherHistoryDetail[i].IsTaxable == 'True' &&
  //         voucherData.VoucherHistoryDetail[i].CreditAmount > 0 &&
  //         voucherData.VoucherHistoryDetail[i].DetailAccountId == voucherData?.VoucherHistoryHeader?.RefDocNoId
  //       ) {
  //         voucherData.VoucherHistoryHeader.Wht_AgainstAccount = voucherData?.VoucherHistoryDetail[i].OffsetAccountTitle;
  //         voucherData.VoucherHistoryHeader.Wht_Account = voucherData?.VoucherHistoryDetail[i].DetailAccountTitle;
  //         voucherData.VoucherHistoryHeader.TaxType = voucherData?.VoucherHistoryDetail[i].TaxType;
  //         voucherData.VoucherHistoryHeader.TaxPercent = voucherData?.VoucherHistoryDetail[i].TaxPrcnt;
  //         voucherData.VoucherHistoryHeader.TaxAmount = voucherData?.VoucherHistoryDetail[i].TaxesTotalAmount;
  //       }
  //     }
  //   } else if (
  //     voucherData?.VoucherHistoryHeader?.DocumentTypeId == 10 ||
  //     voucherData?.VoucherHistoryHeader?.DocumentTypeId == 26
  //   ) {
  //     for (let i = 0; i < voucherData?.VoucherHistoryDetail?.length; i++) {
  //       if (voucherData?.VoucherHistoryDetail[i].IsTaxable == 'False') {
  //         VoucherDetail.push(voucherData.VoucherHistoryDetail[i]);
  //       }
  //     }
  //     voucherData.VoucherHistoryHeader.IncludeWHT = false;
  //   } else if (voucherData?.VoucherHistoryHeader?.DocumentTypeId == 5) {
  //     for (let i = 0; i < voucherData?.VoucherHistoryDetail?.length; i++) {
  //       VoucherDetail.push(voucherData.VoucherHistoryDetail[i]);
  //     }
  //     voucherData.VoucherHistoryHeader.IncludeWHT = false;
  //   }
  //   setMainDataSource(voucherData);
  // };
  useEffect(() => {
    if (isDataSuccess && !isDataLoading) {
      setMainDataSourc(DetailData);
    }
  }, [isDataSuccess, !isDataLoading]);
  const totalAmount = _.sumBy(DetailData, 'ItemAmount');
  const totalItemRate = _.sumBy(DetailData, 'ItemRate');
  const totalNetWeight = _.sumBy(DetailData, 'NetWeight');
  console.log(totalAmount);

  // const VoucherDetail = new Array<VoucherHistory_Detail>();
  const [clickedRow, setClickedRow] = useState(null); // Track clicked row

  const handleRowClick = (record: any) => {
    if (clickedRow === record.key) {
      setClickedRow(null); // Clear the clicked row if clicked again
    } else {
      setClickedRow(record.key); // Set the clicked row
    }
  };

  const [ExpandedFlag, setExpandedFlag] = useState(false);

  const ExpandAllDetails = () => {
    const newExpandedFlag = !ExpandedFlag;
    setExpandedFlag(newExpandedFlag);

    for (let i = 0; i < DetailData.length; i++) {
      DetailData[i].IsDetailExpanded = newExpandedFlag;
    }
  };

  const ExpandSpecificDetail = (data: any) => {
    data.IsDetailExpanded = !data.IsDetailExpanded;

    let newExpandedFlag = false;
    for (let i = 0; i < DetailData.length; i++) {
      if (DetailData[i].IsDetailExpanded) {
        newExpandedFlag = true;
        break;
      }
    }

    setExpandedFlag(newExpandedFlag);
  };

  return (
    <div>
      <div className="Detail-wrape">
        <div className="Table">
          <div className="table-header">
            <div className="show-hide-icon">
              <span className="show-detail-icon" onClick={() => ExpandAllDetails()}>
                {ExpandedFlag ? <MinusSquareOutlined /> : <PlusSquareOutlined />}
              </span>
            </div>
            <div className="Account">Item Name</div>
            <div className="offset_Account">Warehouse From </div>
            <div className="Debit">ItemQty </div>
            <div className="jobLOt"> Pack Uom</div>
            <div className="Credit">Net Weight</div>
            <div className="Credit">Item Rate </div>
            <div className="offset_Account"> Warehouse To </div>
            <div className="Credit"> Item Amount </div>
          </div>
          {mainDataSourc?.map((item: TWsRmWareHouseToWareHouseStocTransferDetailList) => (
            <div>
              <div className="table-Row">
                <div className="show-hide-icon">
                  <span className="show-detail-icon" onClick={() => ExpandSpecificDetail(item)}>
                    {item?.IsDetailExpanded ? <MinusSquareOutlined /> : <PlusSquareOutlined />}
                  </span>
                </div>
                <div className="Account">{item.ItemName}</div>

                <div className="offset_Account">{item.WarehouseFromName} </div>
                <div className="Debit">{item.ItemQty > 0 ? numberFormatter(item.ItemQty) : 0}</div>
                <div className="jobLOt">{item.ItemUomCode}</div>
                <div className="Credit">{item.NetWeight > 0 ? numberFormatter(item.NetWeight) : 0}</div>
                <div className="Credit">{item.ItemRate > 0 ? numberFormatter(item.ItemRate) : 0}</div>
                <div className="offset_Account">{item.WarehouseToName} </div>
                <div className="Credit">{item.ItemAmount > 0 ? numberFormatter(item.ItemAmount) : 0}</div>
              </div>
              {item.IsDetailExpanded && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="detail-table-row">
                    <div className="Detail-remarks">
                      <div className="caption">Remarks</div>
                      <div className="value">{item.RemarksDetail}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="table-Footer">
            <div className="totals-wrape">
              <div className="values">
                <div className="total-caption">Detail Total</div>
                <div className="Debit">{}</div>
                <div className="Credit">{}</div>
                <div className="Credit">{totalNetWeight > 0 ? numberFormatter(totalNetWeight) : 0}</div>
                <div className="Credit">{totalItemRate > 0 ? numberFormatter(totalItemRate) : 0}</div>
                <div className="Credit">{}</div>
                <div className="Credit">{totalAmount > 0 ? numberFormatter(totalAmount) : 0}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grand-total-wrape">
        <div className="grand-totals">
          <div className="calculate-wrape grand-total">
            <div className="total-caption">Total Amount</div>
            <div className="total-value">{numberFormatter(stockTransfergetById?.data?.Data?.Result?.TotalAmount)}</div>
          </div>
        </div>
      </div>
      <div className="Footer">
        <div className="Thanks">
          Thank You{' '}
          <span className="heart-icon">
            <HeartFilled />
          </span>
        </div>
        <div className="powered-by">
          Powered by{' '}
          <span>
            <a href="https://eccountbookapps.com/" className="Scss-Link" target="_blank">
              Synergic Corporation And Solution
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Tablefile;
