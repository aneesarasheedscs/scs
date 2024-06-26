import { AntTable } from '@scs/ui';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Detailcolumns, columns } from './column';
import { useTranslation } from 'react-i18next';
import { useGRNPurchaseOrderLoadTable } from '../../query';
import { Col, Row } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { selectedRowsAtom } from './Atom';
import { GRNDetailColumn } from './grnDetailColumn';

function GRNLoadOrderTable() {
  const { t } = useTranslation();
  const { data, refetch, isError, isLoading, isFetching } = useGRNPurchaseOrderLoadTable();

  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  const rowSelection: TableRowSelection<any> = {
    type: 'checkbox',
    selectedRowKeys: selectedRowKeys,
    onChange: (keys, selectedRows) => {
      setSelectedRowKeys(keys);
    },
  };

  const handleCheckboxChanges = (recordId: number, checked: boolean) => {
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
  const handleCheckboxChange = (recordId: number, checked: boolean) => {
    if (checked) {
      const selectedRecord = data?.data?.Data?.Result.find((row: any) => row.OrderDetailId === recordId);

      if (selectedRecord) {
        if (selectedRows.length === 0) {
          // No selected rows, add the current one
          setSelectedRows([recordId]);
        } else {
          const matchingRecord = data?.data?.Data?.Result.find((row: any) => row.OrderDetailId === selectedRows[0]);

          if (matchingRecord && matchingRecord.OrderSupCustId === selectedRecord.OrderSupCustId) {
            // Same OrderSupCustId, add the current row
            setSelectedRows((prevRows) => [...prevRows, recordId]);
          } else {
            // Different OrderSupCustId, select only the current row
            setSelectedRows([recordId]);
          }
        }
      }
    } else {
      // Deselect the row
      setSelectedRows(selectedRows.filter((id: number) => id !== recordId));
    }
  };

  console.log(selectedRows);
  return (
    <>
      <Row gutter={[10, 10]} style={{ marginTop: 40 }}>
        <Col xl={24}>
          <AntTable
            refetch={refetch}
            isError={isError}
            columns={columns(t, handleCheckboxChange, selectedRows)}
            numberOfSkeletons={12}
            isLoading={isLoading || isFetching}
            data={data?.data?.Data?.Result || []}
            rowKey="Id"
            rowSelection={rowSelection}
            scroll={{ x: '', y: convertVhToPixels('30vh') }}
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
            rowKey="Id"
            rowSelection={rowSelection}
            scroll={{ x: '', y: convertVhToPixels('30vh') }}
          />

          <h2 className="form-heading2"> Purchase Detail</h2>
          <AntTable
            refetch={refetch}
            isError={isError}
            columns={GRNDetailColumn(t)}
            numberOfSkeletons={12}
            isLoading={isLoading || isFetching}
            data={data?.data?.Data?.Result?.filter((row: any) => selectedRows.includes(row.OrderDetailId)) || []}
            scroll={{ x: '', y: convertVhToPixels('25vh') }}
          />
        </Col>
      </Row>
    </>
  );
}

export default GRNLoadOrderTable;
