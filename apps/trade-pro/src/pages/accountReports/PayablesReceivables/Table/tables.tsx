import { AntTable } from '@scs/ui';
import { Col, Divider, Row, Typography, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { PayableColumn, ReceivableColumn } from './Columns';
import React from 'react';

const { Title, Text } = Typography;
const { useToken } = theme;

const PayablesReceivablesTable: React.FC<{
  AccountClassId?: number;
  Data?: any;
  IsError?: boolean;
  IsLoading?: boolean;
}> = (props) => {
  const { t } = useTranslation();
  const { AccountClassId, Data, IsError, IsLoading } = props;

  return (
    <>
      <Divider className="divider" />
      <Row gutter={[24, 24]}>
        <Col xs={24} md={24} className="summary-card">
          <AntTable
            columns={AccountClassId == 3 ? PayableColumn(t) : ReceivableColumn(t)}
            isError={IsError}
            isLoading={IsLoading}
            data={Data || []}
            scroll={{ x: '', y: convertVhToPixels('62vh') }}
          />
        </Col>
      </Row>
    </>
  );
};

export default PayablesReceivablesTable;