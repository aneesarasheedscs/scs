import { Col, Dropdown, MenuProps, Row } from 'antd';
import React from 'react';
import {
  LogoutOutlined,
  SmileOutlined,
  PhoneOutlined,
  SettingOutlined,
  KeyOutlined,
  BellOutlined,
  DatabaseOutlined,
  UserOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
function UserInfoButton() {
  const storedData: any = localStorage.getItem('loggedInUserDetail');
  const userDetail: TUserDetail = JSON.parse(storedData);
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = window.location.origin + '/';
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a className="dropdown" target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
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
      icon: <DatabaseOutlined />,
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          Subscriptions
        </a>
      ),

      icon: <BellOutlined />,
    },
    {
      key: '4',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          Support
        </a>
      ),

      icon: <PhoneOutlined />,
    },
    {
      key: '5',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          Company Settings
        </a>
      ),

      icon: <SettingOutlined />,
    },
    {
      key: '6',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          Change Password
        </a>
      ),
      icon: <KeyOutlined />,
    },
    {
      key: '7',
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
      <Dropdown menu={{ items }} overlayStyle={{ border: '2px solid #006640', borderRadius: '5%', width: '10%' }}>
        <a onClick={(e) => e.preventDefault()}>
          <Row gutter={0} className="headerLogoutBtn">
            {/* <Col xxl={5} xl={5} lg={5} md={5} sm={5} xs={5}>
             
              <p className="uploadbtn">
                <UploadButton />
              </p>
            </Col> */}
            <Col span={24}>
              {/* <p style={{ marginTop: '2%' }}>
                <img
                  src={UserLogo}
                  width={'20%'}
                  height={'20%'}
                  style={{ marginTop: '0%', borderRadius: '50%', border: '1px solid black' }}
                />{' '}
              </p> */}
              <p>
                <UserAddOutlined style={{ color: 'green', fontSize: '20px', marginRight: '5%' }} />
                <span style={{ color: 'black' }}> {userDetail?.UserName} </span>
              </p>
            </Col>
            {/* <Col xxl={24} xl={15} lg={18} md={17} sm={18}>
              <p className="">{userDetail?.UserName} </p>
            </Col> */}
          </Row>
        </a>
      </Dropdown>
    </>
  );
}

export default UserInfoButton;
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
