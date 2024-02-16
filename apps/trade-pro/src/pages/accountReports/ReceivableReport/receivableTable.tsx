import React, { useState } from 'react';

import { ReceivablColumn } from './columns/colomns';
import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import ReceivableFormCriteria from './searchCriteria';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import './style.scss';
import { ReceivableReportQueryHistory } from './queries';

const ReceivableReportTable: React.FC = () => {
  const [SelectedAccount, setSelectedAccount] = useState<number | undefined>(undefined);
  const { data, refetch, isError, isLoading, isFetching } = ReceivableReportQueryHistory();
  // const handleAccountCodeClick = (AccountId: number) => {
  //   setSelectedAccount(AccountId);
  // };
  const { t } = useTranslation();
  return (
    <div>
      <Row>
        <Col xxl={24}>
          <AntTable
            refetch={refetch}
            isError={isError}
            numberOfSkeletons={12}
            isLoading={isLoading || isFetching}
            columns={ReceivablColumn(t)}
            data={data?.data?.Data?.Result || []}
            searchCriteriaForm={<ReceivableFormCriteria />}
            scroll={{ x: '', y: convertVhToPixels('60vh') }}
            // rowKey={(row: ReceivableReportTypeHistory) => row.Id}
            rowKey="Id"
          />
        </Col>
      </Row>
    </div>
  );
};

export default ReceivableReportTable;
