import { Card, Col, Row } from 'antd';
import { TPreBookingOrderDetailList } from '../type';
import AddItemsCards from '../table/ItemCards/addItemCards';
import AddItemTable from '../table/ItemCards/AddItemTable';

function MainEntry({ selectedItem, setSelectedItem }: TDynamicForm) {
  return (
    <Card style={{ boxShadow: '2px 4px 12px 1px gray' }}>
      <Row>
        <Col
          xxl={12}
          xl={24}
          lg={24}
          md={24}
          sm={24}
          xs={24}
          style={{
            overflowY: 'scroll',
            overflowX: 'hidden',
            height: '60vh',
            border: '1px solid grey',
            position: 'relative',
            borderRadius: 5,
          }}
        >
          <AddItemsCards setSelectedItem={setSelectedItem} selectedItem={selectedItem} />
        </Col>

        <Col
          xxl={12}
          xl={24}
          lg={24}
          md={24}
          sm={24}
          xs={24}
          style={{
            overflowY: 'scroll',
            overflowX: 'hidden',
            height: '60vh',
            border: '1px solid  grey',
            position: 'relative',
            borderRadius: 5,
          }}
        >
          <AddItemTable selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        </Col>
      </Row>
    </Card>
  );
}
type TDynamicForm = {
  selectedItem: TPreBookingOrderDetailList[];
  setSelectedItem: (ary: TPreBookingOrderDetailList[]) => void;
};
export default MainEntry;
