import { AntButton, AntTable } from '@tradePro/components';
import { AntColumnType } from '@tradePro/globalTypes';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Col, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const columns = (t?: any): AntColumnType<any>[] => [
  {
    title: <>{t('salary_type')}</>,
    dataIndex: 'ItemName',
    width: 200,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },

  {
    title: <>{t('type_percent')}</>,
    dataIndex: 'PackUom',
    width: 150,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
  {
    title: <>{t('amount')}</>,
    dataIndex: 'PackUom',
    width: 120,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
];
function EmployeeSalary() {
  const { t } = useTranslation();

  return (
    <>
      <Row gutter={[0, 10]} style={{ marginTop: 10 }}>
        <h3 className="employee-salary">{t('click_the_generate_button_to_generate_salary_breakup')}</h3>
        <Col xl={{ span: 2 }}>
          <AntButton label={t('generate')} />
        </Col>
        <Col xl={{ span: 2, offset: 1 }}>
          <AntButton label={t('salary_breakup')} />
        </Col>
      </Row>

      <Row>
        <Col xl={14}>
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
      </Row>
    </>
  );
}

export default EmployeeSalary;
