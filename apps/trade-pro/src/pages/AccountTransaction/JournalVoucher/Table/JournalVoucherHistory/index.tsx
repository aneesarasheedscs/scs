import { Col, Row, theme } from 'antd';
import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { columns, columnsDetail } from './columns';
// import { columns, columnsDetail } from './column';

function HistoryTable() {
  return (
    <div className="childTables1">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={20} lg={20} xl={24}>
          <h2 className="journalform-heading">Journal Voucher Histery</h2>
          <AntTable
            // refetch={refetch}
            // isError={tableError}
            // data={filteredTableData || []}
            columns={columns()}
            // isLoading={tableLoading}
            numberOfSkeletons={15}
            scroll={{ x: '', y: convertVhToPixels('38vh') }}
          />
        </Col>
        <Col xs={24} sm={24} md={20} lg={20} xl={24}>
          <h2 className="journalform-heading">Detail</h2>
          <AntTable
            // refetch={refetch}
            // isError={tableError}
            // data={filteredTableData || []}
            columns={columnsDetail()}
            // isLoading={tableLoading}
            numberOfSkeletons={15}
            scroll={{ x: '', y: convertVhToPixels('38vh') }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default HistoryTable;
