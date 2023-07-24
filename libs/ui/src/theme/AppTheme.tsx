import { ReactNode } from 'react';
import { ConfigProvider } from 'antd';

export function AppTheme({ children, colorPrimary = '#00a148' }: TAppTheme) {
  return (
    <ConfigProvider theme={{ token: { colorPrimary, borderRadius: 5 } }}>{children}</ConfigProvider>
  );
}

type TAppTheme = { children: ReactNode; colorPrimary?: string };
