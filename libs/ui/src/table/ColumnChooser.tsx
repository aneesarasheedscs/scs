import { Col, Tooltip } from 'antd';
import { AntButton } from '../button/AntButton';
import { MenuOutlined } from '@ant-design/icons';

function ColumnChooser({ isColumnChooserEnabled }: TColumnChooser) {
  if (!isColumnChooserEnabled) return null;

  return (
    <Col>
      <Tooltip arrow title="Column chooser">
        <AntButton type="default" icon={<MenuOutlined />} />
      </Tooltip>
    </Col>
  );
}

type TColumnChooser = { isColumnChooserEnabled: boolean };

export default ColumnChooser;
