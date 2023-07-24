import { Drawer } from 'antd';
import { ReactNode } from 'react';

function SideDrawer({ open, children, handleClose }: TDrawer) {
  return (
    <Drawer open={open} width={260} placement="left" onClose={handleClose}>
      {children}
    </Drawer>
  );
}

type TDrawer = { open: boolean; handleClose: VoidFunction; children?: ReactNode };

export default SideDrawer;
