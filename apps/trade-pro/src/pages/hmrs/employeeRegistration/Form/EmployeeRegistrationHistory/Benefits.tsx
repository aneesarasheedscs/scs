import { AntButton, AntTable } from '@tradePro/components';
import { AntColumnType } from '@tradePro/globalTypes';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Checkbox, Col, Row } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DefineBenefits from '../lookUpForms/DefineBenifits';

const columns = (t?: any): AntColumnType<any>[] => [
  {
    title: <>{t('benefit_name')}</>,
    dataIndex: 'ItemName',
    width: 150,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },

  {
    title: <>{t('benefit_value')}</>,
    dataIndex: 'PackUom',
    width: 130,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
  {
    title: <>{t('approval_person')}</>,
    dataIndex: 'PackUom',
    width: 160,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
  {
    title: <>{t('select')}</>,
    dataIndex: 'PackUom',
    width: 100,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
];
const assestscolumns = (t?: any): AntColumnType<any>[] => [
  {
    title: <>{t('benefit_name')}</>,
    dataIndex: 'ItemName',
    width: 150,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },

  {
    title: <>{t('benefit_value')}</>,
    dataIndex: 'PackUom',
    width: 130,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
  {
    title: <>{t('approval_person')}</>,
    dataIndex: 'PackUom',
    width: 160,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
  {
    title: <>{t('select')}</>,
    dataIndex: 'PackUom',
    width: 100,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
];

const handleChange = () => {
  console.log('checked');
};
function EmployeeBenefits() {
  const { t } = useTranslation();

  return (
    <>
      <Row gutter={[10, 10]}>
        <Col xl={13}>
          <Row gutter={[0, 10]} style={{ marginTop: 10 }}>
            <p className="benefits_description">
              <Checkbox onChange={() => handleChange} /> All {t('all')}
            </p>
            <Col xxl={3} xl={{ span: 3, offset: 1 }} lg={3} md={3} sm={3} xs={3}>
              <AntButton label={t('generate')} />
            </Col>
            <Col xxl={{ span: 4, offset: 1 }} xl={{ span: 5, offset: 1 }} lg={{ span: 5 }} md={4} sm={4} xs={4}>
              <DefineBenefits />
            </Col>
            <h3 className="employee-salary"> {t('direct_benefits')} </h3>
          </Row>
          <AntTable
            // refetch={refetch}
            // isError={isError}
            columns={columns(t)}
            numberOfSkeletons={12}
            // isLoading={isLoading || isFetching}
            // data={selectedRows}
            scroll={{ x: '', y: convertVhToPixels('20vh') }}
          />
        </Col>
        <Col xl={11} style={{ textAlign: 'center' }}>
          <h3 className="employee_benefits"> {t('assets_benefits')} </h3>

          <AntTable
            // refetch={refetch}
            // isError={isError}
            columns={assestscolumns(t)}
            numberOfSkeletons={12}
            // isLoading={isLoading || isFetching}
            // data={selectedRows}
            scroll={{ x: '', y: convertVhToPixels('20vh') }}
          />
        </Col>
      </Row>
    </>
  );
}

export default EmployeeBenefits;
