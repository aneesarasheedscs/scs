import { Col, Tooltip } from 'antd';
import { AntButton } from '../button/AntButton';
import { SyncOutlined } from '@ant-design/icons';

function RefreshData({ disabled, handleRefresh, isRefreshDataEnabled }: TRefreshData) {
  if (!isRefreshDataEnabled) return null;

  return (
    <Col>
      <Tooltip arrow title="Refresh data">
        <AntButton disabled={disabled} type="default" icon={<SyncOutlined />} onClick={handleRefresh} />
      </Tooltip>
    </Col>
  );
}

type TRefreshData = { disabled?: boolean; handleRefresh?: VoidFunction; isRefreshDataEnabled: boolean };

export default RefreshData;
