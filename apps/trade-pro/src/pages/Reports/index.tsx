import { Card, Col, Divider, Row, theme } from 'antd';
import './style.scss';
import Search from 'antd/es/input/Search';
import Favorites from './Favorites/Favorites';
import FilteredReports from './FilteredReports';
import { useGetMenu } from './query';

function Reports() {
  const onSearch = (value: string) => console.log(value);
  const { data, isError, refetch, isSuccess, isLoading } = useGetMenu();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  return (
    <>
      <Row gutter={10} className="reports">
        <Col span={24}>
          <Card className="reports_cards">
            <h2 style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-1%' }}>
              Reports
              <Search
                placeholder="search"
                onSearch={onSearch}
                style={{ width: 300, boxShadow: `1px 1px 5px 0px  ${colorPrimary}` }}
              />
            </h2>
            <Divider />
            <Row gutter={[10, 0]} style={{ width: '100%' }}>
              <Col span={24}>
                <Card
                  className="favourites"
                  cover={
                    <>
                      <h2>Favorites</h2>
                      <Divider style={{ marginTop: '0.5%', marginBottom: '0%' }} />
                      <Favorites />
                    </>
                  }
                ></Card>
              </Col>
              <Col span={24}>
                <Card
                  bordered={false}
                  cover={
                    <>
                      <FilteredReports data={data} isSuccess={isSuccess} isLoading={isLoading} />
                    </>
                  }
                ></Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Reports;
