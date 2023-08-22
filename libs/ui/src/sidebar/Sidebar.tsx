import { Layout } from 'antd';
import { ReactNode } from 'react';

const { Sider } = Layout;

export function Sidebar({ children }: TSidebar) {
  return (
    <Sider
      width={250}
      trigger={null}
      breakpoint="lg"
      collapsedWidth="0"
      style={{
        left: 0,
        top: 65,
        bottom: 0,
        position: 'fixed',
        overflowY: 'auto',
        overflowX: 'hidden',
        backgroundColor: '#fff',
      }}
    >
      {children}
    </Sider>
  );
}

type TSidebar = { children?: ReactNode };
