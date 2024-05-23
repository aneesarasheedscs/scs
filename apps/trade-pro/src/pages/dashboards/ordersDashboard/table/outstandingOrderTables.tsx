import { AntButton, AntTable } from '@tradePro/components';
import React from 'react';
import { Customercolumns, ItemAndPackcolumns, Itemcolumns, PackAndItemcolumns } from './columns';
import { useTranslation } from 'react-i18next';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetPreBookingTablesData } from '../quries';
import { Col, Row } from 'antd';
import _ from 'lodash';

export const ItemTable = ({ data }: any) => {
  const { t } = useTranslation();
  return (
    <>
      <Row>
        <Col xxl={14}>
          <AntTable
            refreshData={{ show: false, enabled: false }}
            downloadPdf={{ show: false, enabled: false }}
            downloadExcel={{ show: false, enabled: false }}
            printData={{ show: false, enabled: false }}
            columnChooser={{ show: false, enabled: false }}
            groupByColumns={{ show: false, enabled: false }}
            columns={Itemcolumns(t)}
            scroll={{ x: '', y: convertVhToPixels('40vh') }}
            data={data?.data?.Data?.Result?.Table}
          />
        </Col>
      </Row>
    </>
  );
};
export const CustomerTable = ({ data }: any) => {
  const { t } = useTranslation();
  return (
    <>
      <Col xxl={13}>
        <AntTable
          columns={Customercolumns(t)}
          scroll={{ x: '', y: convertVhToPixels('22vh') }}
          data={data?.data?.Data?.Result?.Table1}
        />
      </Col>
    </>
  );
};

export const ItemAndPackTable = ({ data }: any) => {
  const { t } = useTranslation();
  return (
    <>
      <Col xxl={13}>
        <AntTable
          columns={ItemAndPackcolumns(t)}
          scroll={{ x: '', y: convertVhToPixels('22vh') }}
          // data={data?.data?.Data?.Result?.Table2}
        />
      </Col>
    </>
  );
};

export const PackAndItemTable = ({ data }: any) => {
  const { t } = useTranslation();
  return (
    <>
      <Col xxl={13}>
        <AntTable
          columns={PackAndItemcolumns(t)}
          scroll={{ x: '', y: convertVhToPixels('22vh') }}
          data={data?.data?.Data?.Result?.Table2}
        />
      </Col>
    </>
  );
};
