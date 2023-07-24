import { Grid } from 'antd';
import { AntButton } from '../button/AntButton';
import { MenuFoldOutlined } from '@ant-design/icons';

const { useBreakpoint } = Grid;

function ToggleButton({ handleOpen }: { handleOpen: VoidFunction }) {
  const screens = useBreakpoint();

  if (screens.lg) return null;

  return <AntButton type="text" onClick={handleOpen} icon={<MenuFoldOutlined />} />;
}

export default ToggleButton;
