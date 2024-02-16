import { AntTable } from '@scs/ui';

import { useTranslation } from 'react-i18next';
import { useGetFollowUpHistory } from '../../queries';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { FollowUpColumn } from '../columns/colomns';
import { Col, Row } from 'antd';

const FollowUpTable = () => {
  const { t } = useTranslation();
  const {
    data: AccountTitle,
    isError: isAccountTitleError,
    isLoading: isAccountTitleLoading,
  } = useGetFollowUpHistory();
  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
        <Col xxl={24} lg={24} xl={24}>
          <AntTable
            columns={FollowUpColumn(t)}
            isError={isAccountTitleError}
            isLoading={isAccountTitleLoading}
            data={AccountTitle?.data?.Data?.Result || []}
            scroll={{ x: 'max-content' }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default FollowUpTable;
