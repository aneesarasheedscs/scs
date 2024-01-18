import './style.scss';
import { Col, Dropdown, Layout, MenuProps, Row, Space } from 'antd';
import ToggleButton from './ToggleButton';
import { ReactNode, useEffect, useState } from 'react';
import { AntButton } from '../button/AntButton';
import SideDrawer from '../sideDrawer/SideDrawer';
import { LogoutOutlined, SmileOutlined, BankOutlined, EnvironmentOutlined } from '@ant-design/icons';
import UploadButton from './UploadButton';
import { useTranslation } from 'react-i18next';
const { Header } = Layout;

export function AppHeader({ appLogo, sideMenu, languageSwitcher }: TAppHeader) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = window.location.origin + '/';
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          User Profile
        </a>
      ),
      icon: <SmileOutlined />,
    },

    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          Backup my data
        </a>
      ),
      disabled: true,
      icon: <BankOutlined />,
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          Subscriptions
        </a>
      ),
      disabled: true,
      icon: <BankOutlined />,
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          Support
        </a>
      ),
      disabled: true,
      icon: <BankOutlined />,
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          Company Settings
        </a>
      ),
      disabled: true,
      icon: <BankOutlined />,
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          Change Password
        </a>
      ),

      icon: <BankOutlined />,
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="" onClick={handleLogout}>
          Log Out
        </a>
      ),
      danger: true,
      icon: <LogoutOutlined />,
    },
  ];
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
          <Col xxl={6} xl={6} lg={7} md={7} sm={7} xs={9}>
            <Row align="middle" justify={'center'} style={{}}>
              <Col xxl={16} xl={20} lg={24} md={24} sm={24} xs={24}>
                <p style={{ marginTop: '-5%' }} className="companyInformation">
                  <EnvironmentOutlined style={{ color: 'red', fontSize: '18px' }} /> <b>{userDetail?.CompanyName}</b>
                </p>
                <p style={{ marginTop: '-13%', textAlign: 'center' }}> {currentTime}</p>
              </Col>
            </Row>
          </Col>
          <Col xxl={7} xl={9} lg={11} md={13} sm={14} xs={10} style={{ marginRight: '-3%' }}>
            <Row gutter={20}>
              <Col>{languageSwitcher}</Col>
              <Col xxl={14} xl={15} lg={14} md={14} sm={13} xs={24}>
                <Dropdown menu={{ items }} overlayStyle={{ border: '2px solid #006640', borderRadius: '5%' }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Row gutter={10} className="headerLogoutBtn">
                      <Col xxl={5} xl={5} lg={5} md={5} sm={5} xs={5}>
                        {/* <img
                          src={UserLogo}
                          width={'100%'}
                          height={'70%'}
                          style={{ marginTop: '10%', borderRadius: '50%', border: '1px solid black' }}
                        />{' '} */}
                        <p className="uploadbtn">
                          <UploadButton />
                        </p>
                      </Col>
                      <Col xxl={16} xl={15} lg={18} md={17} sm={18}>
                        <p className="userInformation">{userDetail?.UserName} </p>
                      </Col>
                    </Row>
                  </a>
                </Dropdown>
              </Col>
            </Row>
          </Col>
        </Row>
      </Header>

      <SideDrawer open={open} handleClose={handleClose}>
        {sideMenu}
      </SideDrawer>
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
