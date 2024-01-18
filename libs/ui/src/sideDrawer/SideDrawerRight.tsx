import { Drawer } from 'antd';
import { ReactNode } from 'react';

function SideDrawerRight({ open, children, handleClose }: TDrawer) {
  return (
    <Drawer open={open} width={260} placement="right" onClose={handleClose}>
      {children}
    </Drawer>
  );
}

type TDrawer = { open: boolean; handleClose: VoidFunction; children?: ReactNode };

export default SideDrawerRight;
