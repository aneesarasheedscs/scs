import { map } from 'lodash';
import { ColumnsType } from 'antd/es/table';
import { AntButton } from '../button/AntButton';
import { MenuOutlined } from '@ant-design/icons';
import { Checkbox, Col, Popover, Row, Tooltip } from 'antd';

const CheckboxGroup = Checkbox.Group;

function ColumnChooser({ columns, isColumnChooserEnabled }: TColumnChooser) {
  if (!isColumnChooserEnabled) return null;

  const content = (
    <div style={{ width: 200 }}>
      <Checkbox>Select all</Checkbox>
      <div style={{ marginBottom: 15 }} />
      <CheckboxGroup>
        <Row>
          {map(columns, ({ title }, index) => (
            <Col key={index} xs={24}>
              <Checkbox>{title as string}</Checkbox>
            </Col>
          ))}
        </Row>
      </CheckboxGroup>
    </div>
  );

  return (
    <Col>
      <Tooltip arrow title="Column chooser">
        <Popover arrow content={content} trigger="click" placement="bottomLeft">
          <AntButton type="default" icon={<MenuOutlined />} />
        </Popover>
      </Tooltip>
    </Col>
  );
}

type TColumnChooser = { columns?: ColumnsType<any>; isColumnChooserEnabled: boolean };

export default ColumnChooser;
