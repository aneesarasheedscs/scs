import { Col, Tooltip } from 'antd';
import { AntButton } from '../button/AntButton';
import { SyncOutlined } from '@ant-design/icons';

function RefreshData({ disabled, handleRefresh, options = { show: true, enabled: true } }: TRefreshData) {
  if (!options?.show) return null;

  return (
    <Col>
      <Tooltip arrow title="Refresh data">
        <AntButton
          type="default"
          icon={<SyncOutlined />}
          onClick={handleRefresh}
          disabled={disabled || !options?.enabled}
        />
      </Tooltip>
    </Col>
  );
}

type TRefreshData = {
  disabled?: boolean;
  handleRefresh?: VoidFunction;
  options?: { enabled?: boolean; show?: boolean };
};

export default RefreshData;
