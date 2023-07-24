import { Col, Row } from 'antd';
import { AntTable } from '@scs/ui';
import { columns } from './columns';
import { useGetSyllabusAuthority } from '../queries/useSyllabusAuthority';

function SyllabusAuthority() {
  const { data, isError, isLoading } = useGetSyllabusAuthority();

  return (
    <AntTable
      isError={isError}
      pagination={false}
      columns={columns()}
      isLoading={isLoading}
      numberOfSkeletons={6}
      data={data?.data?.apiData || []}
      tableTitle={
        <Row align="middle" justify="space-between">
          <Col>
            <h3>Syllabus Authority / Publisher</h3>
          </Col>
        </Row>
      }
      rowKey={(record: any) => record?.syllabusAuthorityId}
    />
  );
}

export default SyllabusAuthority;
