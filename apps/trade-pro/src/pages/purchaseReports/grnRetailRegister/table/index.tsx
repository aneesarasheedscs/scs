import { AntTable } from '@scs/ui';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import React from 'react';
import { columns } from './column';
import { useTranslation } from 'react-i18next';
import SearchCriteriaFrom from './SearchCriteriaForm';
import { useGRNDetailTableHistory } from '../query';
import { Col, Row } from 'antd';
import '../style.scss';

function GRNHistoryTable() {
  const { t } = useTranslation();
  const { data, refetch, isError, isLoading, isFetching } = useGRNDetailTableHistory();
  
  function CriteriaString() {
    return (
      <Row style={{ border: '1px solid #25A7DF', padding: 7, borderRadius: 5 }}>
        <h5> {data?.data?.Data?.Result?.[0]?.ReportCriteria}</h5>
      </Row>
    );
  }

  return (
    <>
      <Row justify={'space-around'}>
        <Col xxl={23} xl={23} lg={23} xs={23} sm={23} md={23}>
          <AntTable
            refetch={refetch}
            isError={isError}
            columns={columns(t)}
            numberOfSkeletons={12}
            isLoading={isLoading || isFetching}
            data={data?.data?.Data?.Result || []}
            searchCriteriaForm={<SearchCriteriaFrom />}
            searchCriteriaReport={data?.data?.Data?.Result?.[0]?.ReportCriteria ? <CriteriaString /> : ''}
            scroll={{ x: '', y: convertVhToPixels('62vh') }}
          />
        </Col>
      </Row>
    </>
  );
}

export default GRNHistoryTable;
