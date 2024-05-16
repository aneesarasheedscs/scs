import { Col, Row, theme } from 'antd';
import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { columns } from './columns';

function JournalVoucherDetail() {
  //   const {
  //     refetch,

  //     data: table,
  //     isError: tableError,
  //     isLoading: tableLoading,
  //     isSuccess: tableSuccess,
  //   } = usegetAccountLevels();

  //   const filteredTableData = table?.data?.Data?.Result?.filter((item: any) => item.Account_Level === 1) || [];
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={20} lg={20} xl={24}>
          <h2 className="journalform-heading">Detail</h2>
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
      </Row>
    </div>
  );
}

export default JournalVoucherDetail;
