import { AntButton, AntTable, AntTablecopy } from '@tradePro/components';
import {
  CustomerAndItemscolumns,
  Customercolumns,
  ItemAndCustomercolumns,
  ItemAndPackcolumns,
  Itemcolumns,
  PackAndItemcolumns,
} from './columns';
import { useTranslation } from 'react-i18next';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Col, Row } from 'antd';
import _, { filter, groupBy, map, size } from 'lodash';
import { useEffect, useState } from 'react';
import { numberFormatter } from '@tradePro/utils/numberFormatter';

export const ItemTable = ({ data, isLoading, isFetching, isError }: any) => {
  console.log(data);
  const { t } = useTranslation();
  return (
    <>
      <Row>
        <Col span={24}>
          <AntTable
            refreshData={{ show: false, enabled: false }}
            downloadPdf={{ show: false, enabled: false }}
            downloadExcel={{ show: false, enabled: false }}
            printData={{ show: false, enabled: false }}
            columnChooser={{ show: false, enabled: false }}
            groupByColumns={{ show: false, enabled: false }}
            columns={Itemcolumns(t)}
            scroll={{ x: '', y: convertVhToPixels('46vh') }}
            data={data}
            isLoading={isLoading || isFetching}
            isError={isError}
            numberOfSkeletons={8}
          />
        </Col>
      </Row>
    </>
  );
};
export const CustomerTable = ({ data, isLoading, isFetching, isError }: any) => {
  const { t } = useTranslation();
  return (
    <>
      <Col span={24}>
        <AntTable
          columns={Customercolumns(t)}
          refreshData={{ show: false, enabled: false }}
          downloadPdf={{ show: false, enabled: false }}
          downloadExcel={{ show: false, enabled: false }}
          printData={{ show: false, enabled: false }}
          columnChooser={{ show: false, enabled: false }}
          groupByColumns={{ show: false, enabled: false }}
          scroll={{ x: '', y: convertVhToPixels('46vh') }}
          data={data}
          isLoading={isLoading || isFetching}
          isError={isError}
          numberOfSkeletons={8}
        />
      </Col>
    </>
  );
};

export const ItemAndPackTable = ({ data, isLoading, isFetching, isError }: any) => {
  const [groupByItem, setGroupByItem] = useState<any[]>([]);

  const itemList = (data: any[]) => {
    if (size(data) > 0) {
      const groupedData = groupBy(data, (item) => `${item.ItemName}`);
      return map(groupedData, (group) => {
        const [ItemName] = group;
        return ItemName;
      });
    }

    return [];
  };

  useEffect(() => {
    setGroupByItem(itemList(data));
  }, [data]);

  console.log('groupByItem', groupByItem);
  const { t } = useTranslation();
  return (
    <>
      <Col span={24}>
        <AntTable
          rowKey={'ItemName'}
          columns={ItemAndPackcolumns(t)}
          data={groupByItem || []}
          refreshData={{ show: false, enabled: false }}
          downloadPdf={{ show: false, enabled: false }}
          downloadExcel={{ show: false, enabled: false }}
          printData={{ show: false, enabled: false }}
          columnChooser={{ show: false, enabled: false }}
          groupByColumns={{ show: false, enabled: false }}
          scroll={{ x: '', y: convertVhToPixels('46vh') }}
          isLoading={isLoading || isFetching}
          isError={isError}
          numberOfSkeletons={8}
        />
      </Col>
    </>
  );
};

export const PackAndItemTable = ({ data, isLoading, isFetching, isError }: any) => {
  const [groupByPackUom, setGroupByPackUom] = useState<any[]>([]);

  const packList = (data: any[]) => {
    if (size(data) > 0) {
      const groupedData = groupBy(data, (item) => `${item.PackUom}`);

      return map(groupedData, (group) => {
        const [PackUom] = group;
        return PackUom;
      });
    }

    return [];
  };

  useEffect(() => {
    setGroupByPackUom(packList(data));
  }, [data]);
  const [pageSize, setPageSize] = useState<number | undefined>(10);
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const mainData = data || [];
  console.log('groupByPackUom', groupByPackUom);
  const { t } = useTranslation();
  return (
    <>
      <Col span={24}>
        <AntTablecopy
          showDefaultTableGrid={true}
          rowKey={'PackUom'}
          paginate
          tableId="pagination-example-id" // id must be unique
          pageSize={pageSize}
          currentPage={currentPage}
          totalItems={mainData[0]?.row_count}
          onChange={(pagination) => {
            setPageSize(pagination?.pageSize);
            setCurrentPage(pagination?.current);
          }}
          isLoading={isLoading || isFetching}
          isError={isError}
          numberOfSkeletons={8}
          columns={PackAndItemcolumns(t)}
          scroll={{ x: '', y: convertVhToPixels('30vh') }}
          data={groupByPackUom || []}
          expandable={{
            expandedRowRender: (record) => (
              <AntTable
                // key={'ItemName'}
                columns={[
                  {
                    width: 30,
                  },
                  {
                    key: 'ItemName',
                    dataIndex: 'ItemName',
                    width: 340,
                  },

                  {
                    width: 150,
                    key: 'Qty',
                    dataIndex: 'Qty',
                    align: 'right',
                    render: (_, { Qty }) => numberFormatter(Qty),
                  },

                  {
                    width: 150,
                    key: 'Weight',
                    dataIndex: 'Weight',
                    align: 'right',
                    render: (_, { Weight }) => numberFormatter(Weight),
                  },
                  {
                    width: 150,
                    key: 'Amount',
                    dataIndex: 'Amount',
                    align: 'right',
                    render: (_, { Amount }) => numberFormatter(Amount),
                  },
                ]}
                printData={{ show: false }}
                refreshData={{ show: false }}
                downloadPdf={{ show: false }}
                downloadExcel={{ show: false }}
                columnChooser={{ show: false }}
                groupByColumns={{ show: false }}
                data={filter(data, (obj) => record?.PackUom === obj?.PackUom)}
              />
            ),
          }}
        />
      </Col>
    </>
  );
};
export const ItemAndCustomerTable = ({ data, isLoading, isFetching, isError }: any) => {
  const [groupByItemAndCustomer, setGroupByItemAndCustomer] = useState<any[]>([]);

  const itemAndCustomerList = (data: any[]) => {
    if (size(data) > 0) {
      const groupedData = groupBy(data, (item) => `${item.ItemName}`);
      return map(groupedData, (group) => {
        const [ItemName] = group;
        return ItemName;
      });
    }

    return [];
  };

  useEffect(() => {
    setGroupByItemAndCustomer(itemAndCustomerList(data));
  }, [data]);
  const [pageSize, setPageSize] = useState<number | undefined>(10);
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const mainData = data || [];
  console.log('groupByItemAndCustomer', groupByItemAndCustomer);
  const { t } = useTranslation();
  return (
    <>
      <Col span={24}>
        <AntTablecopy
          showDefaultTableGrid={true}
          rowKey={'ItemName'}
          paginate
          tableId="pagination-example-id" // id must be unique
          pageSize={pageSize}
          currentPage={currentPage}
          totalItems={mainData[0]?.row_count}
          onChange={(pagination) => {
            setPageSize(pagination?.pageSize);
            setCurrentPage(pagination?.current);
          }}
          isLoading={isLoading || isFetching}
          isError={isError}
          numberOfSkeletons={8}
          columns={ItemAndCustomercolumns(t)}
          scroll={{ x: '', y: convertVhToPixels('30vh') }}
          data={groupByItemAndCustomer || []}
          expandable={{
            expandedRowRender: (record) => (
              <AntTable
                // key={'ItemName'}
                columns={[
                  {
                    width: 30,
                  },
                  {
                    key: 'CustomerName',
                    dataIndex: 'CustomerName',
                    width: 340,
                  },

                  {
                    width: 150,
                    key: 'Qty',
                    dataIndex: 'Qty',
                    align: 'right',
                    render: (_, { Qty }) => numberFormatter(Qty),
                  },

                  {
                    width: 150,
                    key: 'Weight',
                    dataIndex: 'Weight',
                    align: 'right',
                    render: (_, { Weight }) => numberFormatter(Weight),
                  },
                  {
                    width: 150,
                    key: 'Amount',
                    dataIndex: 'Amount',
                    align: 'right',
                    render: (_, { Amount }) => numberFormatter(Amount),
                  },
                ]}
                printData={{ show: false }}
                refreshData={{ show: false }}
                downloadPdf={{ show: false }}
                downloadExcel={{ show: false }}
                columnChooser={{ show: false }}
                groupByColumns={{ show: false }}
                data={filter(data, (obj) => record?.ItemName === obj?.ItemName)}
              />
            ),
          }}
        />
      </Col>
    </>
  );
};
export const CustomerAndItemTable = ({ data, isLoading, isFetching, isError }: any) => {
  const [groupByCustomerAndItems, setGroupByCustomerAndItems] = useState<any[]>([]);

  const customerAndItemsList = (data: any[]) => {
    if (size(data) > 0) {
      const groupedData = groupBy(data, (item) => `${item.CustomerName}`);
      console.log(groupedData);
      return map(groupedData, (group) => {
        const [CustomerName] = group;
        return CustomerName;
      });
    }

    return [];
  };

  useEffect(() => {
    setGroupByCustomerAndItems(customerAndItemsList(data));
  }, [data]);
  const [pageSize, setPageSize] = useState<number | undefined>(10);
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const mainData = data || [];
  console.log(groupByCustomerAndItems);
  const { t } = useTranslation();
  return (
    <>
      <Col span={24}>
        <AntTablecopy
          showDefaultTableGrid={true}
          rowKey={'CustomerName'}
          paginate
          tableId="pagination-example-id" // id must be unique
          pageSize={pageSize}
          currentPage={currentPage}
          totalItems={mainData[0]?.row_count}
          onChange={(pagination) => {
            setPageSize(pagination?.pageSize);
            setCurrentPage(pagination?.current);
          }}
          isLoading={isLoading || isFetching}
          isError={isError}
          numberOfSkeletons={8}
          columns={CustomerAndItemscolumns(t)}
          scroll={{ x: '', y: convertVhToPixels('30vh') }}
          data={groupByCustomerAndItems || []}
          expandable={{
            expandedRowRender: (record) => (
              <AntTable
                // key={'ItemName'}
                columns={[
                  {
                    width: 30,
                  },
                  {
                    key: 'ItemName',
                    dataIndex: 'ItemName',
                    width: 340,
                  },

                  {
                    width: 150,
                    key: 'Qty',
                    dataIndex: 'Qty',
                    align: 'right',
                    render: (_, { Qty }) => numberFormatter(Qty),
                  },

                  {
                    width: 150,
                    key: 'Weight',
                    dataIndex: 'Weight',
                    align: 'right',
                    render: (_, { Weight }) => numberFormatter(Weight),
                  },
                  {
                    width: 150,
                    key: 'Amount',
                    dataIndex: 'Amount',
                    align: 'right',
                    render: (_, { Amount }) => numberFormatter(Amount),
                  },
                ]}
                printData={{ show: false }}
                refreshData={{ show: false }}
                downloadPdf={{ show: false }}
                downloadExcel={{ show: false }}
                columnChooser={{ show: false }}
                groupByColumns={{ show: false }}
                data={filter(data, (obj) => record?.CustomerName === obj?.CustomerName)}
              />
            ),
          }}
        />
      </Col>
    </>
  );
};
