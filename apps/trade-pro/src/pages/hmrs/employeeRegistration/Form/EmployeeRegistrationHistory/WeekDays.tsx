import { AntButton, AntTable } from '@tradePro/components';
import { AntColumnType } from '@tradePro/globalTypes';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Col, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const columns = (t?: any): AntColumnType<any>[] => [
  {
    title: <>{t('week_days')}</>,
    dataIndex: 'ItemName',
    width: 200,
    searchableInput: true,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.ItemName.localeCompare(b.ItemName),
  },

  {
    title: <>{t('select')}</>,
    dataIndex: 'PackUom',
    width: 150,
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.PackUom.localeCompare(b.PackUom),
  },
];
function WeekDays() {
  const { t } = useTranslation();

  return (
    <>
      <Row>
        <Col xl={12}>
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

export default WeekDays;
