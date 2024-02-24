import './style.scss';
import { Button, Col, Layout, MenuProps, Row, Space } from 'antd';
import ToggleButton, { ToggleButtonRightDrawer } from './ToggleButton';
import { ReactNode, useEffect, useState } from 'react';
import SideDrawer from '../sideDrawer/SideDrawer';
import { BankOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import UserInfoButton from './UserInfoButton';
import SupportButton from './SupportButton';
import CreateButton from './CreateButton';
import SideDrawerRight from '../sideDrawer/SideDrawerRight';
import NotificationButton from './NotificationButton';
const { Header } = Layout;

export function AppHeader({ appLogo, sideMenu, languageSwitcher }: TAppHeader) {
  const [open, setOpen] = useState(false);
  const [openRightDrawer, setOpenRight] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenRight = () => setOpenRight(true);
  const handleClose = () => setOpen(false);
  const handleCloseRight = () => setOpenRight(false);
  const storedData: any = localStorage.getItem('loggedInUserDetail');
  const userDetail: TUserDetail = JSON.parse(storedData);

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const { t } = useTranslation();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Header className="app-header">
        <Row justify="space-between">
          <Col xxl={5} xl={5} lg={6} md={4} sm={3} xs={4} style={{ border: '' }}>
            <Row align="middle">
              <Col xxl={0} xl={0} lg={2} md={2} sm={2} xs={2}>
                <div style={{ marginRight: 10, marginLeft: -30, marginTop: '-100%' }}>
                  <ToggleButton handleOpen={handleOpen} />
                </div>
              </Col>
              <Col span={22}> {appLogo ? appLogo : <h1>Logo</h1>}</Col>
            </Row>
          </Col>
          <Col xxl={6} xl={6} lg={6} md={6} sm={14} xs={20}>
            <Row align="middle" justify={'center'} style={{}}>
              <Col xxl={16} xl={22} lg={24} md={24} sm={24} xs={24}>
                <p style={{ marginTop: '-5%' }} className="companyInformation">
                  <BankOutlined style={{ color: 'green', fontSize: '18px', marginRight: '2%' }} />
                  <b>{userDetail?.CompanyName}</b>
                </p>
                <p style={{ marginTop: '-13%', textAlign: 'center' }}> {currentTime}</p>
              </Col>
            </Row>
          </Col>
          <Col xxl={8} xl={10} lg={12} md={14} sm={0} xs={0} style={{ marginRight: '-3%' }}>
            <Row gutter={10} className="headerSections">
              <Col xxl={6} xl={5} lg={7} md={7} sm={7}>
                {languageSwitcher}
              </Col>
              <Col xxl={5} xl={5} lg={5} md={5} sm={6} xs={24}>
                <SupportButton />
              </Col>
              <Col xxl={5} xl={5} lg={5} md={5} sm={6} xs={24}>
                <CreateButton />
              </Col>
              <Col xxl={2} xl={2} lg={2} md={2} sm={3} xs={24} className="headerBellIcon">
                <NotificationButton />
              </Col>
              <Col xxl={5} xl={5} lg={5} md={5} sm={6} xs={24}>
                <UserInfoButton />
              </Col>
            </Row>
          </Col>
          <Col xxl={0} xl={0} lg={0} md={0} sm={2} xs={0} style={{ marginRight: '-3%' }}>
            <Row gutter={10} className="headerSections">
              <Col span={24}>
                <ToggleButtonRightDrawer handleOpen={handleOpenRight} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Header>

      <SideDrawer open={open} handleClose={handleClose}>
        {sideMenu}
      </SideDrawer>
      <SideDrawerRight open={openRightDrawer} handleClose={handleCloseRight}>
        <Row gutter={10} className="headerSections" style={{ height: '20%' }}>
          <Col xxl={13} xl={13} lg={13} md={13} sm={13}>
            {languageSwitcher}
          </Col>
          <Col xxl={11} xl={11} lg={11} md={11} sm={11} xs={24}>
            <SupportButton />
          </Col>
          <Col xxl={13} xl={13} lg={13} md={13} sm={13} xs={24}>
            <CreateButton />
          </Col>
          <Col xxl={11} xl={11} lg={11} md={11} sm={11} xs={24} className="headerBellIcon">
            <NotificationButton />
          </Col>
          <Col xxl={13} xl={13} lg={13} md={13} sm={13} xs={24}>
            <UserInfoButton />
          </Col>
        </Row>
      </SideDrawerRight>
    </>
  );
}

type TAppHeader = { appLogo?: ReactNode; sideMenu?: ReactNode; languageSwitcher?: ReactNode };
type TUserDetail = {
  CellNo: string;
  RoleId: number;
  UserId: number;
  RoleName: string;
  UserName: string;
  CompanyId: number;
  TokenData: string;
  BranchesId: number;
  PictureURL: string;
  expires_in: number;
  token_type: string;
  CompanyName: string;
  DisplayName: string;
  LastLoggedIn: string;
  access_token: string;
  CompanyAddress: string;
  OrganizationId: number;
  OrganizationName: string;
  '.issued': Date | string;
  '.expires': Date | string;
  IsActive: string | boolean;
  AuthenticationEnabledForUser: number | string;
  IsHeadOffice: boolean;
};
