import { AntButton, AntTable } from '@tradePro/components';
import { Card, Col, Row, message, notification, theme } from 'antd';
import { columns } from './columns';
import { useTranslation } from 'react-i18next';
import { useGetDispatchedSTNLoad } from '../quries';
import { useAtom } from 'jotai';
import React from 'react';
import { selectedRowsAtom, addtableData } from '../form/Atom';
import { ArrowDownOutlined } from '@ant-design/icons';

function ROLoadOrder({ handleClose, selectedRecordId }: TFrom) {
  const { t } = useTranslation();
  const { data, isError, isLoading, refetch, isFetching } = useGetDispatchedSTNLoad();
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);
  const [tableData, setTableData] = useAtom(addtableData);

  console.log('checked', selectedRows);
  const e: any = [];
  console.log(e);
  const handleLoadSelectedRecord = () => {
    const loaderDate = selectedRows?.map((item: any) => ({
      ...item,
      TransferNo: item.DocNo,
      ReceivedRate: item.IssuedRate,
      IssuedQuantity: item.IssuedQty,
      ReceivedQty: item.IssuedQty,
      AvailableWeight: 0,
      AvailableStock: 0,
      ReceivedAmount: item.IssuedAmount,
      ItemNetAmount: item.IssuedAmount,
      ExpenseAmount: 0,
      AvgRate: 0,
    }));

    if (selectedRecordId === null || selectedRecordId === undefined) {
      setTableData(loaderDate);
    } else {
      notification.error({
        message: 'Error',
        description:
          'Already Loaded Rows Have Different Requisition Order.So you Cant Load Rows of Different Requisition Order!',
      });
    }
    // setTableData(loaderDate);
  };

  const [selectedRowKeys, setSelectedRowKeys] = React.useState<any>([]);
  const onSelectChange = (selectedRowKeys: any[], selectedRows: any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    const selectedRecord = data?.data?.Data?.Result?.filter((row: any) => selectedRowKeys.includes(row.Id));
    console.log('selectedRecord', selectedRecord);
    setSelectedRows(selectedRecord);
    setSelectedRowKeys(selectedRowKeys);
  };
  console.log(selectedRows);
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    hideDefaultSelections: true,
  };

  return (
    <div>
      <Row style={{ marginTop: '' }}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={24}>
          <h2 className="form-heading">
            {t('dispatched_stock_transfer_notes_load')}
            <Row style={{ display: 'flex', justifyContent: 'end', position: 'absolute', right: '6%', top: '10px' }}>
              <Col xl={2}>
                <AntButton
                  title="Load Selected Records"
                  className="btn"
                  label={t('load')}
                  icon={<ArrowDownOutlined />}
                  onClick={() => {
                    handleLoadSelectedRecord();
                    handleClose();
                    setSelectedRows([]);
                  }}
                />
              </Col>
            </Row>
          </h2>
          <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}>
            <AntTable
              rowKey={'Id'}
              rowSelection={rowSelection}
              refetch={refetch}
              isError={isError}
              numberOfSkeletons={8}
              isLoading={isLoading}
              scroll={{ x: 'max-content' }}
              data={data?.data?.Data?.Result || []}
              columns={columns(t)}
              style={{ width: '100%' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

type TFrom = {
  handleClose: () => void;
  selectedRecordId: any;
};

export default ROLoadOrder;
