import { Col, Tooltip } from 'antd';
import { AntButton } from '../button/AntButton';
import { SyncOutlined } from '@ant-design/icons';

function RefreshData({ isRefreshDataEnabled }: TRefreshData) {
  if (!isRefreshDataEnabled) return null;

  return (
    <Col>
      <Tooltip arrow title="Refresh data">
        <AntButton type="default" icon={<SyncOutlined />} />
      </Tooltip>
    </Col>
  );
}

type TRefreshData = { isRefreshDataEnabled: boolean };

export default RefreshData;
