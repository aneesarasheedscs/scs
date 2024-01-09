import { AntButton, AntTable } from '@tradePro/components';
import { Card, Col, Row, message, notification, theme } from 'antd';
import { columns } from './columns';
import { useTranslation } from 'react-i18next';
import { useGetApprovalROLoad } from '../quries';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { selectedRowsAtom, addtableData } from '../form/Atom';
import { map } from 'lodash';
import { ArrowDownOutlined } from '@ant-design/icons';

function ROLoadOrder({ handleClose }: TFrom) {
  const { t } = useTranslation();
  const { data, isError, isLoading, refetch, isFetching } = useGetApprovalROLoad();
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);
  const [selectedRowsIds, setSelectedRowsIds] = useState<any[]>([]);
  const [tableData, setTableData] = useAtom(addtableData);

  const handleSelectAllUn = () => {
    if (data?.data?.Data?.Result?.length === selectedRows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(map(data?.data?.Data?.Result));
    }
  };
  console.log('checked', selectedRows);

  const handleLoadSelectedRecord = () => {
    const loaderDate = selectedRows?.map((item: any) => ({
      ...item,
      RequisitionNo: item.OrderNo,
      UOMCode: item.PackUom,
      IssuedRate: item.ReqRate,
      AvailableWeight: 0,
      AvailableStock: 0,
    }));
    if (tableData === null) {
      setTableData(loaderDate);
    } else {
      // notification.error(message)
      notification.error({
        message: 'Error',
        description:
          'Already Loaded Rows Have Different Requisition Order.So you Cant Load Rows of Different Requisition Order!',
      });
    }
  };

  const handleCheckboxChange = (recordId: number, checked: boolean) => {
    setSelectedRowsIds((prevSelectedRowsIds: number[]) => {
      if (checked) {
        // Add the recordId if checked
        return [...prevSelectedRowsIds, recordId];
      } else {
        // Remove the recordId if unchecked
        return prevSelectedRowsIds.filter((id) => id !== recordId);
      }
    });
    setSelectedRows((prevSelectedRowsIds: any) => [...prevSelectedRowsIds, ...selectedRowsArray]);
  };

  const selectedRowsArray = data?.data?.Data?.Result.filter((row: any) => selectedRowsIds.includes(row.Id));
  console.log(selectedRowsArray);
  useEffect(() => {
    if (selectedRowsArray) {
      setSelectedRows(selectedRowsArray);
    }
  }, [selectedRowsIds]);

  const [selectedRowKeys, setSelectedRowKeys] = React.useState<any>([]);
  const onSelectChange = (selectedRowKeys: any[], selectedRows: any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    const selectedRecord = data?.data?.Data?.Result?.filter((row: any) =>
      selectedRowKeys.includes(row.RequisitionDetailId)
    );
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
            {t('approved_requisition_order_load')}
            <Row style={{ display: 'flex', justifyContent: 'end', position: 'absolute', right: '6%', top: '10px' }}>
              <Col xl={2}>
                <AntButton
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
              rowKey={'RequisitionDetailId'}
              rowSelection={rowSelection}
              refetch={refetch}
              isError={isError}
              numberOfSkeletons={8}
              isLoading={isLoading}
              // scroll={{ x: '', y: convertVhToPixels('30vh') }}
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
};

export default ROLoadOrder;
