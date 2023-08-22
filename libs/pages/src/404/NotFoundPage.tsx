import { Result } from 'antd';
import { AntButton } from '@scs/ui';
import { useNavigate } from 'react-router-dom';

export function NotFoundPage() {
  const navigate = useNavigate();
  const handleClick = () => navigate(-1);

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<AntButton fullWidth={false} label="Back Home" onClick={handleClick} />}
    />
  );
}
