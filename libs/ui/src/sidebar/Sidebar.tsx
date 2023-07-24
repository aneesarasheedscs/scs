import { Layout } from 'antd';
import { ReactNode } from 'react';

const { Sider } = Layout;

export function Sidebar({ children }: TSidebar) {
  return (
    <Sider
      width={220}
      trigger={null}
      breakpoint="lg"
      collapsedWidth="0"
      style={{ position: 'fixed', left: 0, top: 65, bottom: 0, backgroundColor: '#fff' }}
    >
      {children}
    </Sider>
  );
}

type TSidebar = { children?: ReactNode };
