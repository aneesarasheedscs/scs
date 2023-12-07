import React, { useEffect, useState } from 'react';
import { useGetVouchersModernHistoryByHeaderId } from '../queries/approvel';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Row, Col, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import './Approval.scss';
import { VoucherHistory_Detail, VouchersModernHistory } from '../type';
import { PlusSquareOutlined, MinusSquareOutlined, HeartFilled } from '@ant-design/icons';

const Tablefile: React.FC<{ voucherHeadId?: number; documentTypeId: number }> = ({ voucherHeadId, documentTypeId }) => {
  const { t } = useTranslation();
  const {
    data: DetailData,
    isError: DetailError,
    isLoading: DetailLoading,
    isSuccess: DetailSuccess,
  } = useGetVouchersModernHistoryByHeaderId(voucherHeadId, documentTypeId.toString());
  let GeneralLedgerLinkVisible = true;
  const voucherData = DetailData?.data?.Data?.Result; // Replace with your actual data array
  const [mainDataSource, setMainDataSource] = useState<VouchersModernHistory>();

  useEffect(() => {
    GenerateDetailAndWhtInfo();
  }, [voucherData]);

  const GenerateDetailAndWhtInfo = () => {
    if (
      voucherData?.VoucherHistoryHeader?.DocumentTypeId == 1 ||
      voucherData?.VoucherHistoryHeader?.DocumentTypeId == 2
    ) {
      for (let i = 0; i < voucherData?.VoucherHistoryDetail?.length; i++) {
        // && this.VoucherData?.VoucherHistoryDetail[i].DetailAccountId != this.VoucherData?.VoucherHistoryHeader.RefAccountId
        if (voucherData?.VoucherHistoryDetail[i]?.IsTaxable == 'False') {
          VoucherDetail.push(voucherData?.VoucherHistoryDetail[i]);
        } else if (
          voucherData?.VoucherHistoryDetail[i]?.IsTaxable == 'True' &&
          voucherData?.VoucherHistoryDetail[i].DebitAmount > 0 &&
          voucherData?.VoucherHistoryDetail[i].DetailAccountId == voucherData.VoucherHistoryHeader?.RefDocNoId
        ) {
          voucherData.VoucherHistoryHeader.Wht_AgainstAccount = voucherData?.VoucherHistoryDetail[i].OffsetAccountTitle;
          voucherData.VoucherHistoryHeader.Wht_Account = voucherData?.VoucherHistoryDetail[i].DetailAccountTitle;
          voucherData.VoucherHistoryHeader.TaxType = voucherData?.VoucherHistoryDetail[i].TaxType;
          voucherData.VoucherHistoryHeader.TaxPercent = voucherData?.VoucherHistoryDetail[i].TaxPrcnt;
          voucherData.VoucherHistoryHeader.TaxAmount = voucherData?.VoucherHistoryDetail[i].TaxesTotalAmount;
        }
      }
    } else if (
      voucherData?.VoucherHistoryHeader?.DocumentTypeId == 3 ||
      voucherData?.VoucherHistoryHeader?.DocumentTypeId == 4
    ) {
      for (let i = 0; i < voucherData?.VoucherHistoryDetail?.length; i++) {
        if (voucherData?.VoucherHistoryDetail[i].IsTaxable == 'False') {
          VoucherDetail.push(voucherData.VoucherHistoryDetail[i]);
        } else if (
          voucherData.VoucherHistoryDetail[i].IsTaxable == 'True' &&
          voucherData.VoucherHistoryDetail[i].CreditAmount > 0 &&
          voucherData.VoucherHistoryDetail[i].DetailAccountId == voucherData?.VoucherHistoryHeader?.RefDocNoId
        ) {
          voucherData.VoucherHistoryHeader.Wht_AgainstAccount = voucherData?.VoucherHistoryDetail[i].OffsetAccountTitle;
          voucherData.VoucherHistoryHeader.Wht_Account = voucherData?.VoucherHistoryDetail[i].DetailAccountTitle;
          voucherData.VoucherHistoryHeader.TaxType = voucherData?.VoucherHistoryDetail[i].TaxType;
          voucherData.VoucherHistoryHeader.TaxPercent = voucherData?.VoucherHistoryDetail[i].TaxPrcnt;
          voucherData.VoucherHistoryHeader.TaxAmount = voucherData?.VoucherHistoryDetail[i].TaxesTotalAmount;
        }
      }
    } else if (
      voucherData?.VoucherHistoryHeader?.DocumentTypeId == 10 ||
      voucherData?.VoucherHistoryHeader?.DocumentTypeId == 26
    ) {
      for (let i = 0; i < voucherData?.VoucherHistoryDetail?.length; i++) {
        if (voucherData?.VoucherHistoryDetail[i].IsTaxable == 'False') {
          VoucherDetail.push(voucherData.VoucherHistoryDetail[i]);
        }
      }
      voucherData.VoucherHistoryHeader.IncludeWHT = false;
    } else if (voucherData?.VoucherHistoryHeader?.DocumentTypeId == 5) {
      for (let i = 0; i < voucherData?.VoucherHistoryDetail?.length; i++) {
        VoucherDetail.push(voucherData.VoucherHistoryDetail[i]);
      }
      voucherData.VoucherHistoryHeader.IncludeWHT = false;
    }
    setMainDataSource(voucherData);
  };

  const totalDebit =
    voucherData?.VoucherHistoryDetail.reduce((total: number, item: any) => total + item.DebitAmount, 0) || 0;
  const totalCredit =
    voucherData?.VoucherHistoryDetail.reduce((total: number, item: any) => total + item.CreditAmount, 0) || 0;

  const VoucherDetail = new Array<VoucherHistory_Detail>();
  const [clickedRow, setClickedRow] = useState(null); // Track clicked row

  const handleRowClick = (record: any) => {
    if (clickedRow === record.key) {
      setClickedRow(null); // Clear the clicked row if clicked again
    } else {
      setClickedRow(record.key); // Set the clicked row
    }
  };

  const [ExpandedFlag, setExpandedFlag] = useState(false);

  const ExpandSpecificDetail = (data: any) => {
    data.IsDetailExpanded = !data.IsDetailExpanded;
    setExpandedFlag(false);
    for (let i = 0; i < voucherData?.VoucherHistoryDetail?.length; i++) {
      if (voucherData.VoucherHistoryDetail[i].IsDetailExpanded == true) {
        setExpandedFlag(true);
        break;
      }
    }
  };

  const ExpandAllDetails = () => {
    setExpandedFlag(false);
    for (let i = 0; i < voucherData?.VoucherHistoryDetail?.length; i++) {
      if (voucherData.VoucherHistoryDetail[i].IsDetailExpanded == true) {
        setExpandedFlag(true);
        break;
      }
    }
    let Action = ExpandedFlag == false ? true : false;
    for (let i = 0; i < voucherData?.VoucherHistoryDetail?.length; i++) {
      voucherData.VoucherHistoryDetail[i].IsDetailExpanded = Action;
    }
  };

  return (
    <div>
      <div className="Detail-wrape">
        <div className="Table" key={1}>
          <div className="table-header">
            {/* <div className="show-hide-icon">
              <span className="show-detail-icon" onClick={() => ExpandAllDetails()}>
                {ExpandedFlag ? <MinusSquareOutlined /> : <PlusSquareOutlined />}
              </span>
            </div> */}
            <div className="Account">Account Title</div>
            <div className="offset_Account">Offset Account</div>
            <div className="jobLOt">Job/Lot</div>
            <div className="Debit">Debit</div>
            <div className="Credit">Credit</div>
          </div>
          {mainDataSource?.VoucherHistoryDetail?.map((item: VoucherHistory_Detail) => (
            <div key={item.VoucherDetailId}>
              <div className="table-Row">
                {/* <div className="show-hide-icon">
                  <span className="show-detail-icon" onClick={() => ExpandSpecificDetail(item)}>
                    {item?.IsDetailExpanded ? <MinusSquareOutlined /> : <PlusSquareOutlined />}
                  </span>
                </div> */}
                {!GeneralLedgerLinkVisible ? (
                  <div className="Account">{item.DetailAccountTitle}</div>
                ) : (
                  <div
                    className="Account"
                    title="Click to View General Ledger"
                    // onClick={() => HandleGeneralLedgerLinkClicked(item.DetailAccountId)}
                    style={{ color: 'blue', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    {item.DetailAccountTitle}
                  </div>
                )}
                {!GeneralLedgerLinkVisible ? (
                  <div className="offset_Account">{item.OffsetAccountTitle}</div>
                ) : (
                  <div
                    className="offset_Account"
                    title="Click to View General Ledger"
                    // onClick={() => HandleGeneralLedgerLinkClicked(item.AgainstAccountId)}
                    style={{ color: 'blue', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    {item.OffsetAccountTitle}
                  </div>
                )}

                <div className="jobLOt">{item.Job_Lot}</div>
                <div className="Debit">{item.DebitAmount > 0 ? numberFormatter(item.DebitAmount) : 0}</div>
                <div className="Credit">{item.CreditAmount > 0 ? numberFormatter(item.CreditAmount) : 0}</div>
              </div>
              {/* {item.IsDetailExpanded && ( */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="detail-table-row">
                  <div className="Detail-remarks">
                    <div className="caption">Remarks</div>
                    <div className="value">{item.Comments}</div>
                  </div>
                </div>
              </div>
              {/* )} */}
            </div>
          ))}
          <div key={0} className="table-Footer">
            <div className="totals-wrape">
              <div className="values">
                <div className="total-caption">Detail Total</div>
                <div className="Debit">{totalDebit > 0 ? numberFormatter(totalDebit) : 0}</div>
                <div className="Credit">{totalCredit > 0 ? numberFormatter(totalCredit) : 0}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {mainDataSource?.VoucherHistoryHeader.IncludeWHT && (
        <Row>
          <Col span={24}>
            <div className="WhtAgaints_Account">
              <div className="Wrap">
                <div className="Title_Wrap">
                  <div className="Wht-Title">WHT_Against Account</div>
                  <div className="Wht-Value">{mainDataSource.VoucherHistoryHeader.Wht_AgainstAccount}</div>
                </div>
                <div className="my-2">
                  <div className="caption-value-wrape">
                    <div className="caption">Wht Account:</div>
                    <div className="value">{mainDataSource?.VoucherHistoryHeader?.Wht_Account}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="caption-value-wrape">
                      <div className="caption">Tax Type:</div>
                      <div className="value">{mainDataSource?.VoucherHistoryHeader?.TaxType}</div>
                    </div>
                    <div className="caption-value-wrape">
                      <div className="caption">Tax%:</div>
                      <div className="value">{mainDataSource?.VoucherHistoryHeader?.TaxPercent.toFixed(3)}</div>
                    </div>
                  </div>
                  <div className="caption-value-wrape">
                    <div className="caption">Tax Amount:</div>
                    <div className="value">{numberFormatter(mainDataSource?.VoucherHistoryHeader?.TaxAmount)}</div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      )}
      <div className="grand-total-wrape">
        <div className="grand-totals">
          <div className="calculate-wrape grand-total">
            <div className="total-caption">Voucher Amount</div>
            <div className="total-value">{numberFormatter(voucherData?.VoucherHistoryHeader?.VoucherAmount)}</div>
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
              Synergic Corporate And Solutions
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Tablefile;
