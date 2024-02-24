import { map } from 'lodash';
import Cookies from 'js-cookie';
import { Col, Row, Select, Space } from 'antd';
import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Us, Sa, Cn, Fr, Jp, Kr, Es, Pk } from 'react-flags-select';

const { Option } = Select;

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages: Array<TLanguages> = [
    { value: 'en', label: 'English', flag: <Us /> },
    { value: 'es', label: 'Español', flag: <Es /> },
    { value: 'ar', label: 'العربية', flag: <Sa /> },
    { value: 'zh', label: '中国人', flag: <Cn /> },
    { value: 'fr', label: 'Français', flag: <Fr /> },
    { value: 'ja', label: '日本語', flag: <Jp /> },
    { value: 'ko', label: '한국인', flag: <Kr /> },
    { value: 'ur', label: 'اردو', flag: <Pk /> },
  ];

  const currentLocale = Cookies.get('i18next') || 'en';
  const [language, setLanguage] = useState(currentLocale);

  const handleChangeLocale = (value: any) => {
    setLanguage(value);
    i18n.changeLanguage(value);
  };

  return (
    <Select
      size="large"
      value={language}
      bordered={false}
      defaultValue={language}
      style={{
        width: '100%',
        borderLeft: '1px solid lightblue',
        height: '70%',
        top: '-3px',
        left: '0px',
      }}
      onChange={handleChangeLocale}
    >
      {map(languages, ({ value, label, flag }) => (
        <Option key={value} value={value} label={label}>
          <Row gutter={12} style={{ minWidth: 95 }}>
            <Col style={{ marginTop: 2 }}>{flag}</Col>
            <Col>{label}</Col>
          </Row>
        </Option>
      ))}
    </Select>
  );
}

type TLanguages = {
  value: string;
  label: string;
  flag: ReactNode;
};
