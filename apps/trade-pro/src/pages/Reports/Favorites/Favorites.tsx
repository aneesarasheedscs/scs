import { map } from 'lodash';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { StarFilled } from '@ant-design/icons';
import { TableLoader } from '@tradePro/components';
import { Card, Col, Row, Space, theme } from 'antd';
import { useGetDeleteFavouiteScreens, useGetFavouiteScreens } from '../query';

function Favorites() {
  const { data: favoriteScreens, isSuccess, isLoading } = useGetFavouiteScreens();
  const [ScreenName, setScreenName] = useState<string>();
  const { data } = useGetDeleteFavouiteScreens(false, ScreenName);
  const handleDeleteFavoritScreen = (screenTitle?: string) => {
    console.log('ScreenTitle', screenTitle);
    const formattedScreenName = screenTitle?.replace(/\s/g, '');
    setScreenName(formattedScreenName);
  };
  console.log(ScreenName);
  const navigate = useNavigate();
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const favoriteScreensfiltered = favoriteScreens?.data?.Data?.Result?.filter((item: any) => item.ModuleTypeId === 2);

  return (
    <>
      {isLoading ? (
        <div>
          <TableLoader numberOfSkeletons={3} />
        </div>
      ) : (
        <Space style={{}}>
          <Row gutter={[4, 4]} style={{ width: '100%' }}>
            {map(favoriteScreensfiltered, (item) => {
              const path = item.ScreenTitle?.toLowerCase()?.replace(/ /g, '-');
              return (
                <Col xs={24} xxl={8} xl={8} sm={12} md={12} lg={12}>
                  <Card
                    hoverable
                    bordered={false}
                    className="favorites_cards"
                    style={{ borderBottom: '1px solid lightgray', borderRadius: '0px', height: '5rem' }}
                    cover={
                      <>
                        <h4
                          style={{
                            color: `${colorPrimary}`,
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '0.5%',
                          }}
                        >
                          <span onClick={() => navigate(`/${path}`)}>{item.ScreenTitle}</span>{' '}
                          <StarFilled
                            onClick={() => handleDeleteFavoritScreen(item.ScreenTitle)}
                            style={{ color: '#FFAF0C', fontSize: '18px' }}
                          />
                        </h4>
                        <p style={{ color: 'gray' }}>{item.ScreenDescription}</p>
                      </>
                    }
                  ></Card>
                </Col>
              );
            })}
          </Row>
        </Space>
      )}
    </>
  );
}

export default Favorites;
