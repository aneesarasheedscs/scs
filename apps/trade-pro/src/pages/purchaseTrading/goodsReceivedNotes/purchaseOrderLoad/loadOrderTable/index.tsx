import { AntTable } from '@scs/ui';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Detailcolumns, columns } from './column';
import { useTranslation } from 'react-i18next';
import { useGRNPurchaseOrderLoadTable } from '../../query';
import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { selectedRowsAtom } from './Atom';
import { GRNDetailColumn } from './grnDetailColumn';

function GRNLoadOrderTable() {
  const { t } = useTranslation();
  const { data, refetch, isError, isLoading, isFetching } = useGRNPurchaseOrderLoadTable();

  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  console.log(selectedRows);
  const handleCheckboxChange2 = (recordId: number, checked: boolean) => {
    if (checked) {
      const selectedRecord = data?.data?.Data?.Result.find((row: any) => row.OrderDetailId === recordId);

      if (selectedRecord) {
        if (selectedRows.length === 0) {
          setSelectedRows([recordId]);
        } else {
          const matchingRecord = data?.data?.Data?.Result.find((row: any) => row.OrderDetailId === selectedRows[0]);
          if (matchingRecord && matchingRecord.OrderSupCustId === selectedRecord.OrderSupCustId) {
            setSelectedRows([...selectedRows, recordId]);
            console.log(recordId);
          } else {
            setSelectedRows([recordId]);
          }
        }
      }
    } else {
      setSelectedRows(selectedRows.filter((id: number) => id !== recordId));
    }
  };

  const handleCheckboxChange = (recordId: number, checked: boolean) => {
    if (checked) {
      const selectedRecord = data?.data?.Data?.Result.find((row: any) => row.OrderDetailId === recordId);

      if (selectedRecord) {
        if (selectedRows.length === 0) {
          setSelectedRows([recordId]);
        } else {
          const matchingRecord = data?.data?.Data?.Result.find((row: any) => row.OrderDetailId === selectedRows[0]);
          if (matchingRecord && matchingRecord.OrderSupCustId === selectedRecord.OrderSupCustId) {
            setSelectedRows([...selectedRows, recordId]);
          } else {
            setSelectedRows([recordId]);
          }
        }
      }
    } else {
      setSelectedRows(selectedRows.filter((id: number) => id !== recordId));
    }
  };
  //********** row selection ************//
  useEffect(() => {
    if (selectedRows) {
      setSelectedRows(selectedRows);
    }
  }, [selectedRows, selectedRowKeys]);
  const onSelectChange = (selectedRowKeys: any[], selectedRows: any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    const selectedRecord = data?.data?.Data?.Result?.filter((row: any) => selectedRowKeys.includes(row.OrderDetailId));
    console.log('selectedRecord', selectedRecord);
    setSelectedRows(selectedRecord);
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    hideDefaultSelections: true,
  };

  return (
    <>
      <Row gutter={[10, 10]} style={{ marginTop: 40 }}>
        <Col xl={24}>
          <AntTable
            rowKey={'OrderDetailId'}
            rowSelection={rowSelection}
            refetch={refetch}
            isError={isError}
            columns={columns(t, handleCheckboxChange, selectedRows)}
            numberOfSkeletons={12}
            isLoading={isLoading || isFetching}
            data={data?.data?.Data?.Result || []}
            // scroll={{ x: '', y: convertVhToPixels('30vh') }}
            scroll={{ x: 'max-content' }}
          />
        </Col>
        <Col xl={24}>
          <h2 className="form-heading">Detail</h2>

          <AntTable
            refetch={refetch}
            isError={isError}
            columns={Detailcolumns(t, handleCheckboxChange, selectedRows)}
            numberOfSkeletons={12}
            isLoading={isLoading || isFetching}
            data={data?.data?.Data?.Result || []}
            rowKey={'OrderDetailId'}
            rowSelection={rowSelection}
            // scroll={{ x: '', y: convertVhToPixels('30vh') }}
            scroll={{ x: 'max-content' }}
          />
          {/* 
          <h2 className="form-heading2"> GRN Detail</h2>
          <AntTable
            refetch={refetch}
            isError={isError}
            columns={GRNDetailColumn(t)}
            numberOfSkeletons={12}
            isLoading={isLoading || isFetching}
            data={selectedRows}
            scroll={{ x: '', y: convertVhToPixels('25vh') }}
          /> */}
        </Col>
      </Row>
    </>
  );
}

export default GRNLoadOrderTable;
