import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { AntButton } from '../button/AntButton';
import { GroupOutlined } from '@ant-design/icons';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Alert, Checkbox, Col, Popover, Tooltip } from 'antd';
import { filter, forEach, includes, map, omit, size } from 'lodash';

const CheckboxGroup = Checkbox.Group;

function GroupByColumns({
  data,
  columns,
  disabled,
  handleDataGrouping,
  options = { show: true, enabled: true },
}: TGroupByColumns) {
  if (!options?.show) return null;

  const [plainOptions, setPlainOptions] = useState<any[]>([]);
  const [checkedList, setCheckedList] = useState<any[]>([]);

  useEffect(() => {
    if (size(columns) > 0) {
      const list = map(columns, 'title');
      setPlainOptions(list);
    }
  }, [columns]);

  useEffect(() => {
    const selectedColumns = filter(columns, (col) => includes(checkedList, col?.title));

    if (data && size(data) > 0) {
      const result = handleGrouping(data, selectedColumns);
      handleDataGrouping(result);
    }
  }, [checkedList]);

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const handleGrouping = (data: any[], columns: any[]): any => {
    if (size(columns) === 0) {
      return data;
    }

    const column = columns[0];
    const groupedData: any = {};

    forEach(data, (item) => {
      const groupKey = item[column?.dataIndex]?.toString();
      if (!groupedData?.[groupKey]) {
        groupedData[groupKey] = [];
      }
      groupedData[groupKey].push(omit(item, column?.dataIndex));
    });

    const result = Object.keys(groupedData).map((groupKey) => ({
      key: groupKey,
      children: handleGrouping(groupedData?.[groupKey], columns?.slice(1)),
      name: `${column.title}: ${groupKey}`,
    }));

    return result;
  };

  const content = (
    <div style={{ width: 180 }}>
      <div style={{ marginBottom: 20 }}>
        <b>
          <Alert message="Group Data" description="" />
        </b>
      </div>
      <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
    </div>
  );

  return (
    <Col>
      <Tooltip arrow title="Group data by Columns">
        <Popover arrow content={content} trigger="click" placement="bottomLeft">
          <AntButton type="default" icon={<GroupOutlined />} disabled={disabled || !options?.enabled} />
        </Popover>
      </Tooltip>
    </Col>
  );
}

type TGroupByColumns = {
  data?: any[];
  disabled?: boolean;
  columns?: ColumnsType<any>;
  options?: { enabled?: boolean; show?: boolean };
  handleDataGrouping: (groupedData: any[]) => void;
};

export default GroupByColumns;
