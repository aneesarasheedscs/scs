import React, { useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Table, Input, Form, Button, message, Card, Divider, Space, Select } from 'antd';
import { EditFilled, RedoOutlined, SearchOutlined } from '@ant-design/icons';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import './Table.css';
import { AntButton } from '@scs/ui';

const { Option } = Select;
interface CardData {
  id: number;
  publisher: string;
  code: string;
  subname: string;
}
type DataIndex = keyof CardData;
const Table2: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (value: any) => {
    setSelectedOption(value);
  };

  const [cards, setCards] = useState<CardData[]>([]);
  const [newCard, setNewCard] = useState<CardData>({
    id: 1,
    publisher: '',
    code: '',
    subname: '',
  });

  const handleAddCard = () => {
    if (newCard.publisher.trim() === '') {
      return message.error('Please Enter publisher');
    }
    if (newCard.code.trim() === '') {
      return message.error('Please Enter code');
    }
    if (newCard.subname.trim() === '') {
      return message.error('Please Enter subName');
    } else {
      message.success('Success');
    }
    setCards((prevCards) => [...prevCards, { ...newCard, id: Date.now() }]);
    setNewCard({
      id: Date.now() + 1,
      publisher: '',
      code: '',
      subname: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof CardData) => {
    const { value } = e.target;
    setNewCard((prevCard) => ({ ...prevCard, [field]: value }));
  };
  const [form] = Form.useForm();
  const handleCancel = (values: any) => {
    console.log('Form values:', values);
    form.resetFields();
  };
  // const [form] = Form.useForm();
  // const handleCancel = () => {

  //   form.resetFields();
  // };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<CardData> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          className="success"
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 80, background: '#00A148' }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 80, border: '1px solid #00A148', color: '#00A148' }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined className="search" style={{ color: filtered ? '#1677FF' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  const columns: ColumnsType<CardData> = [
    {
      title: 'publisher',
      dataIndex: 'publisher',
      key: 'publisher',
      ...getColumnSearchProps('publisher'),
      sorter: (a, b) => a.publisher.length - b.publisher.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'code',
      dataIndex: 'code',
      key: 'code',
      ...getColumnSearchProps('code'),
      sorter: (a, b) => a.code.length - b.code.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'subname',
      dataIndex: 'subname',
      key: 'subname',
      ...getColumnSearchProps('subname'),
      sorter: (a, b) => a.subname.length - b.subname.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'action',
      dataIndex: 'action',
      key: 'action',
      width: '20%,',
      render: () => (
        <a>
          <EditFilled
            style={{
              color: '#00A148',
              textAlign: 'right',
              // marginLeft: "27%",
              fontSize: '1.1rem',
            }}
          />
        </a>
      ),
    },
  ];

  const [showDropdown, setShowDropdown] = useState(false);
  const options = ['Option 1', 'Option 2', 'Option 3'];

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  return (
    <div style={{ width: '100%' }}>
      <Card
        style={{
          width: '100%',
          marginLeft: '390px',
          marginTop: '40px',
          background: 'rgb(250, 250, 250)',
          boxShadow:
            'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
        }}
      >
        <h1 className="h1">Subject List</h1>
        <Divider />
        <Form form={form} style={{ marginLeft: '60px' }}>
          <Form.Item>
            <Input
              size="large"
              placeholder="Syllabus Authority/Publisher"
              onChange={(e) => handleChange(e, 'publisher')}
              style={{ width: '80%', textAlign: 'start', marginLeft: 50 }}
            />
          </Form.Item>
          <Form.Item>
            <Input
              size="large"
              placeholder="Subject Code"
              onChange={(e) => handleChange(e, 'subname')}
              style={{
                width: '38%',
                textAlign: 'start',
                position: 'relative',
                top: '-10px',
                right: '-48px',
              }}
            />
          </Form.Item>
          <Form.Item>
            <Input
              size="large"
              placeholder="Class"
              style={{
                width: '35.5%',
                textAlign: 'start',
                position: 'relative',
                top: '-74px',
                marginLeft: '50%',
              }}
            />
          </Form.Item>
          <Form.Item>
            <Input
              size="large"
              placeholder="Subject Category"
              onChange={(e) => handleChange(e, 'code')}
              style={{
                width: '35.5%',
                textAlign: 'start',
                position: 'relative',
                top: '-78px',
                marginLeft: '50%',
              }}
            />
          </Form.Item>

          <Form.Item>
            <Input
              size="large"
              placeholder="Subject Name"
              style={{
                width: '38%',
                textAlign: 'start',
                position: 'relative',
                top: '-142px',
                right: '-48px',
              }}
            />
          </Form.Item>

          <Form.Item>
            <AntButton
              size="large"
              type="primary"
              onClick={handleAddCard}
              style={{
                color: 'white',
                background: '#00a148',
                position: 'relative',
                top: '-150px',
                right: '-35.6%',
                width: '10%',
              }}
              label="Add"
            />
          </Form.Item>
          <Form.Item>
            <AntButton
              onClick={handleCancel}
              size={'large'}
              style={{
                background: 'white',
                position: 'relative',
                top: '-214px',
                left: '50.5%',
                width: '10%',
                border: '1px solid #00a148',
              }}
              label={<RedoOutlined style={{ color: '#00a148' }} />}
            />
          </Form.Item>
        </Form>
        <Card
          style={{
            width: '100%',
            marginTop: '-210px',
            background: 'rgb(250, 250, 250)',
            boxShadow:
              'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
          }}
        >
          <Table dataSource={cards} columns={columns} />
        </Card>
      </Card>
    </div>
   );
};

export default Table2;
