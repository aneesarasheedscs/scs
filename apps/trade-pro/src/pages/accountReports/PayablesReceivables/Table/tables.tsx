import { AntTable } from '@scs/ui';
import { Col, Divider, Row, Typography, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { PayableColumn, ReceivableColumn } from './Columns';
import React, { useState } from 'react';

const { Title, Text } = Typography;
const { useToken } = theme;

const PayablesReceivablesTable: React.FC<{
  AccountClassId?: number;
  Data?: any;
  IsError?: boolean;
  IsLoading?: boolean;
  refetch?: boolean;
  handleAccountCodeClick: any;
}> = (props) => {
  const { t } = useTranslation();
  const { AccountClassId, Data, IsError, IsLoading, refetch, handleAccountCodeClick } = props;


   const CriteriaString =()=>{
    return(
      <Row style={{border: '1px solid #25A7DF',padding:7,borderRadius:5}}>
        <h5>{Data?.[0]?.ReportCriteria}</h5>
      </Row>
    )
   }
  return (
    <>
      <Divider className="divider" style={{ marginTop: '10px' }} />
      <Row gutter={[24, 24]}>
        <Col xs={24} md={24} className="">
          <AntTable
            columns={
              AccountClassId == 3
                ? PayableColumn(t, handleAccountCodeClick)
                : ReceivableColumn(t, handleAccountCodeClick)
            }
            isError={IsError}
            isLoading={IsLoading}
            data={Data || []}
            searchCriteriaReport={Data?.[0]?.ReportCriteria? <CriteriaString/>:''}
            scroll={{ x: '', y: convertVhToPixels('48vh') }}
            numberOfSkeletons={20}
          />
        </Col>
      </Row>
    </>
  );
};

export default PayablesReceivablesTable;
