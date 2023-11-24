import { AntTable } from '@tradePro/components';
import { AntColumnType } from '@tradePro/globalTypes';
import { Card, Col, Row } from 'antd';
import React from 'react';
import { formateDate } from '@tradePro/utils/formateDate';
import { useTranslation } from 'react-i18next';
import { TGrnDetailTable } from '@tradePro/pages/purchaseTrading/purchaseInvoice/types';

function ChargeToProduct() {
  const { t } = useTranslation();
  return (
    <>
      <Row gutter={6} style={{ marginTop: 8 }}>
        <Col xl={12} xxl={12}>
          <h2 className="form-heading2">Charge To Product</h2>
          <AntTable
            // refetch={refetch}
            // isError={isError}
            columns={columns(t)}
            numberOfSkeletons={12}
            // isLoading={isLoading || isFetching}
            // data={selectedRows}
            // scroll={{ x: '', y: convertVhToPixels('30vh') }}
          />
        </Col>
        <Col xl={12} xxl={12}>
          <h2 className="form-heading2"> Supplier Add/Less</h2>
          <AntTable
            // refetch={refetch}
            // isError={isError}
            columns={columns(t)}
            numberOfSkeletons={12}
            // isLoading={isLoading || isFetching}
            // data={selectedRows}
            // scroll={{ x: '', y: convertVhToPixels('30vh') }}
          />
        </Col>
      </Row>
    </>
  );
}

export default ChargeToProduct;

export const columns = (t?: any): AntColumnType<TGrnDetailTable>[] => [
  {
    title: 'Charge To Product',
    dataIndex: 'Id',
    width: 150,
    // render: (_, record) => (
    //   <Checkbox
    //     onChange={(e) => handleCheckboxChange(record.OrderDetailId, e.target.checked)}
    //     checked={selectedRows.includes(record.OrderDetailId)}
    //   />
    // ),
  },
  { title: <>{t('percent')}</>, dataIndex: 'DocNo', width: 100 },
  // {
  //   width: 150,
  //   title: <>{t('order_date')}</>,
  //   searchableDate: true,
  //   dataIndex: 'DocDate',
  //   render: (_, { DocDate }) => formateDate(DocDate),
  // },

  // {
  //   title: <>{t('supplier_name')}</>,
  //   dataIndex: 'SupplierName',
  //   width: 320,
  //   searchableInput: true,
  //   sortDirections: ['ascend', 'descend'],
  //   sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
  // },
  // { title: <>{t('delivery_term')}</>, dataIndex: 'DeliveryTerm', width: 230 },
  // { title: <>{t('payment_term')}</>, dataIndex: 'PaymentTerm', width: 230 },
  {
    width: 150,
    title: <>{t('item_quantity')}</>,
    dataIndex: 'ItemQty',
    render: (_, { ItemQty }) => (
      <>{/* <Space style={{ marginLeft: '80%' }}>{ItemQty}</Space> */}</>
      // numberFormatter(ItemQty)
    ),
  },

  {
    width: 100,
    title: <>{t('item_rate')}</>,
    dataIndex: 'RemarksHeader',
    // render: (_, { NetWeight }) => numberFormatter(NetWeight),
  },
  {
    width: 110,
    title: <>{t('credit')}</>,
    dataIndex: 'RemarksHeader',
    // render: (_, { NetWeight }) => numberFormatter(NetWeight),
  },
  {
    width: 100,
    title: <>{t('remarks')}</>,
    dataIndex: 'RemarksHeader',
    // render: (_, { NetWeight }) => numberFormatter(NetWeight),
  },
  {
    width: 100,
    title: <>{t('action')}</>,
    dataIndex: 'RemarksHeader',
    // render: (_, { NetWeight }) => numberFormatter(NetWeight),
  },
];
