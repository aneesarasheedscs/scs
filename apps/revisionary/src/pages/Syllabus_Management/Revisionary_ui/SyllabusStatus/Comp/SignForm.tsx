import React from 'react';
import logo from '../Images/revisionary.jpg';
import pic from '../Images/picto.jpg';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import SignupForm from './SignupForm';
import './style2.scss';
import { useTranslation } from 'react-i18next';

const SignForm: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="loginform">
      <div className="partone">
        <img src={pic} className="pic" />
        <div className="content1">
          <img src={logo} className="logo" />
          <h2 style={{ marginTop: '20%' }}>{t('welcome_to')}</h2>
          <h1 style={{ marginTop: '3%' }}>{t('revisionary')}</h1>
          <p
            style={{
              marginTop: '8%',
              fontSize: '13px',
              fontFamily: 'cursive',
              fontWeight: 'bold',
              letterSpacing: '2px',
              lineHeight: '20px',
            }}
          >
            {t('we_are_glad_to_see_you_again_get_access_to_your_orders_wishlist_and_recommendations')}
          </p>
          <p className="p1" style={{ marginTop: '18%', fontSize: '16px', marginBottom: '5%' }}>
            {t('dont_have_an_account?')}
          </p>
          <Typography.Link
            className="link"
            style={{
              textDecoration: 'none',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              letterSpacing: '1px',
            }}
          >
            {t('register')}
          </Typography.Link>
        </div>
      </div>

      <div className="login">
        <div className="login-inner">
          <Typography.Title style={{ fontSize: '35px', fontWeight: 'bold', marginTop: '8%' }}>
            {t('sign_up')}
          </Typography.Title>
          <p style={{ fontSize: '16px', fontWeight: 'bold', color: 'gray' }}>
            {t('already_have_an_account?')}
            <Link to="/loginform" style={{ textDecoration: 'none', color: 'blue' }}>
              &nbsp;{t('sign_in')}
            </Link>
          </p>

          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default SignForm;
