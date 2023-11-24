import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { AntButton } from '../button/AntButton';
import { MenuOutlined } from '@ant-design/icons';
import { filter, includes, map, size } from 'lodash';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Alert, Checkbox, Col, Popover, Tooltip } from 'antd';

const CheckboxGroup = Checkbox.Group;

function ColumnChooser({
  columns,
  disabled,
  handleColumnSelection,
  options = { show: true, enabled: true },
}: TColumnChooser) {
  if (!options?.show) return null;

  const [plainOptions, setPlainOptions] = useState<any[]>([]);
  const [checkedList, setCheckedList] = useState<any[]>(plainOptions);

  useEffect(() => {
    if (size(columns) > 0) {
      const list = map(columns, 'title');
      setPlainOptions(list);
      setCheckedList(list);
    }
  }, [columns]);

  useEffect(() => {
    const selectedColumns = filter(columns, (col) => includes(checkedList, col?.title));
    handleColumnSelection(selectedColumns);
  }, [checkedList]);

  const checkAll = size(plainOptions) === size(checkedList);
  const indeterminate = size(checkedList) > 0 && size(checkedList) < size(plainOptions);

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  const content = (
    <div style={{ width: 180 }}>
      <div style={{ marginBottom: 20 }}>
        <b>
          <Alert message="Column Chooser" description="" />
        </b>
      </div>
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        Select all
      </Checkbox>
      <div style={{ marginBottom: 15 }} />
      <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
    </div>
  );

  return (
    <Col>
      <Tooltip arrow title="Column chooser">
        <Popover arrow content={content} trigger="click" placement="bottomLeft">
          <AntButton type="default" icon={<MenuOutlined />} disabled={disabled || !options?.enabled} />
        </Popover>
      </Tooltip>
    </Col>
  );
}

type TColumnChooser = {
  disabled?: boolean;
  columns?: ColumnsType<any>;
  options?: { enabled?: boolean; show?: boolean };
  handleColumnSelection: (selectedCols: any[]) => void;
};

export default ColumnChooser;
