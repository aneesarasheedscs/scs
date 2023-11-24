import { AntTable } from '@scs/ui';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Detailcolumns, columns } from './column';
import { useTranslation } from 'react-i18next';
import { useGRNDetailTableHistory } from '../../query';
import { Col, Row } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import { string } from 'joi';

interface Props {
  onSelectChange: (selectedRowKeys: string[], selectedRows: any[]) => void;
  selectedRowKeys: string[];
}
function GRNLoadOrderTable({ onSelectChange, selectedRowKeys }: Props) {
  const { t } = useTranslation();
  const { data, refetch, isError, isLoading, isFetching } = useGRNDetailTableHistory();

  const rowSelection: TableRowSelection<any> = {
    type: 'checkbox',
    onChange: (keys, selectedRows) => {
      const stringKeys: string[] = keys as string[];
      onSelectChange(stringKeys, selectedRows);
    },
    selectedRowKeys: selectedRowKeys,
  };

  return (
    <>
      <Row gutter={[10, 10]} style={{ marginTop: 40 }}>
        <Col xl={24}>
          <AntTable
            refetch={refetch}
            isError={isError}
            columns={columns(t)}
            numberOfSkeletons={12}
            isLoading={isLoading || isFetching}
            data={data?.data?.Data?.Result || []}
            rowKey="Id"
            rowSelection={rowSelection}
            scroll={{ x: '', y: convertVhToPixels('40vh') }}
          />
        </Col>
        <Col xl={24}>
          <h2 className="form-heading">Detail</h2>

          <AntTable
            refetch={refetch}
            isError={isError}
            columns={Detailcolumns(t)}
            numberOfSkeletons={12}
            isLoading={isLoading || isFetching}
            data={data?.data?.Data?.Result || []}
            scroll={{ x: '', y: convertVhToPixels('42vh') }}
          />
        </Col>
      </Row>
    </>
  );
}

export default GRNLoadOrderTable;
