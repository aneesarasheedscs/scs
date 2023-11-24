import { SearchOutlined, EditFilled } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Card, Col, Divider, Input, Layout, Modal, Pagination, Row, Space, Table, message } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import React, { useRef, useState } from 'react';
// import Cards from "./Cards";

// import { useGetTopics } from "./queries/index";
import './style.scss';
import { AntButton } from '@scs/ui';
import Cards from './Cards';
import Modal2 from './Modal2';
import Modal1 from './Modal';
import './types';

interface SubTopic {
  key: string;
  topic: string;
  subTopicCode: string;
  subTopicDescription: string;
}
interface Topic {
  key: string;
  classDivision: string;
  topicCode: string;
  subjectName: string;
  topicDescription: string;
  subTopics: SubTopic[];
}

interface Data {
  classdivision: string;
  subjectname: string;
  topiccode: number;
  topicdescription: string;
}

interface DataType {
  subject: string;
  data: {
    key: number;
    classdivision: string;
    topiccode: number;
    subjectname: string;
    topicdescription: string;
    subTopics: SubTopic[];
  }[];
}

const SubjectTopics: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [dataa, setData] = useState<Data[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [data1, setData1] = useState<SubTopic[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  /*           Use Get Topics             */

  // const { data, isLoading, isError } = useGetTopics1();

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error loading data</div>;
  // }

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

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
  };

  const handleSubTopicClick = (subTopics: SubTopic[]) => {
    setData1(subTopics);
    setVisible(false);
  };

  const handleAddData = (newData: Data) => {
    setData([...dataa, newData]);
    console.log(newData);
  };

  const handleSaveAndAddMore = (newData: Data) => {
    setData([...dataa, newData]);
    console.log(newData);
  };
  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<any | DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 80, background: '#00a148' }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 80, border: '1px solid #00a148', color: '#00a148' }}
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
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
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

  type DataIndex = keyof DataType | any;

  //     const data: DataType[] = [
  //    {
  //     subjectName: "English",
  //     data: [
  //       {
  //         key: 1,
  //         subjectname: "English",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Bioenergetics",
  //         subTopics: [
  //           {
  //             key: "1-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-001",
  //             subTopicDescription: "Subtopic on linear equations",
  //           },
  //           {
  //             key: "1-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-002",
  //             subTopicDescription: "Subtopic on quadratic equations",
  //           },
  //         ],
  //         topiccode: 1,
  //       },
  //       {
  //         key: 2,
  //         subjectname: "English",
  //         classdivision: "O-Level Paper 2",
  //         topicdescription: "Pollution",
  //         subTopics: [
  //           {
  //             key: "2-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-003",
  //             subTopicDescription: "Subtopic on cells",
  //           },
  //           {
  //             key: "2-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-004",
  //             subTopicDescription: "Subtopic on genetics",
  //           },
  //         ],
  //         topiccode: 2,
  //       },
  //       {
  //         key: 3,
  //         subjectname: "English",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Button",
  //         subTopics: [
  //           {
  //             key: "2-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-003",
  //             subTopicDescription: "Subtopic on cells",
  //           },
  //           {
  //             key: "2-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-004",
  //             subTopicDescription: "Subtopic on genetics",
  //           },
  //         ],
  //         topiccode: 3,
  //       },
  //       {
  //         key: 4,
  //         subjectname: "English",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Environment",
  //         subTopics: [
  //           {
  //             key: "2-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-003",
  //             subTopicDescription: "Subtopic on cells",
  //           },
  //           {
  //             key: "2-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-004",
  //             subTopicDescription: "Subtopic on genetics",
  //           },
  //         ],
  //         topiccode: 4,
  //       },
  //       {
  //         key: 5,
  //         subjectname: "English",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Population",
  //         subTopics: [
  //           {
  //             key: "2-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-003",
  //             subTopicDescription: "Subtopic on cells",
  //           },
  //           {
  //             key: "2-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-004",
  //             subTopicDescription: "Subtopic on genetics",
  //           },
  //         ],
  //         topiccode: 5,
  //       },
  //     ],
  //   },
  //   {
  //     subjectName: "Urdu",
  //     data: [
  //       {
  //         key: 1,
  //         subjectname: "Urdu",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Bioenergetics",
  //         subTopics: [
  //           {
  //             key: "1-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-001",
  //             subTopicDescription: "Subtopic on linear equations",
  //           },
  //           {
  //             key: "1-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-002",
  //             subTopicDescription: "Subtopic on quadratic equations",
  //           },
  //         ],
  //         topiccode: 1,
  //       },
  //       {
  //         key: 2,
  //         subjectname: "Urdu",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Pollution",
  //         subTopics: [
  //           {
  //             key: "1-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-001",
  //             subTopicDescription: "Subtopic on linear equations",
  //           },
  //           {
  //             key: "1-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-002",
  //             subTopicDescription: "Subtopic on quadratic equations",
  //           },
  //         ],
  //         topiccode: 2,
  //       },
  //       {
  //         key: 3,
  //         subjectname: "Urdu",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Button",

  //         subTopics: [
  //           {
  //             key: "1-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-001",
  //             subTopicDescription: "Subtopic on linear equations",
  //           },
  //           {
  //             key: "1-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-002",
  //             subTopicDescription: "Subtopic on quadratic equations",
  //           },
  //         ],
  //         topiccode: 3,
  //       },
  //       {
  //         key: 4,
  //         subjectname: "Urdu",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Environment",
  //         subTopics: [
  //           {
  //             key: "1-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-001",
  //             subTopicDescription: "Subtopic on linear equations",
  //           },
  //           {
  //             key: "1-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-002",
  //             subTopicDescription: "Subtopic on quadratic equations",
  //           },
  //         ],
  //         topiccode: 4,
  //       },
  //       {
  //         key: 5,
  //         subjectname: "Urdu",
  //         classdivision: "O-Level PFaper 1",
  //         topicdescription: "Population",
  //         subTopics: [
  //           {
  //             key: "1-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-001",
  //             subTopicDescription: "Subtopic on linear equations",
  //           },
  //           {
  //             key: "1-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-002",
  //             subTopicDescription: "Subtopic on quadratic equations",
  //           },
  //         ],
  //         topiccode: 5,
  //       },
  //     ],
  //   },
  //   {
  //     subjectName: "Math",
  //     data: [
  //       {
  //         key: 1,
  //         subjectname: "Math",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Bioenergetics",
  //         subTopics: [
  //           {
  //             key: "1-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-001",
  //             subTopicDescription: "Subtopic on linear equations",
  //           },
  //           {
  //             key: "1-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-002",
  //             subTopicDescription: "Subtopic on quadratic equations",
  //           },
  //         ],
  //         topiccode: 1,
  //       },
  //       {
  //         key: 2,
  //         subjectname: "Math",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Pollution",
  //         subTopics: [
  //           {
  //             key: "1-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-001",
  //             subTopicDescription: "Subtopic on linear equations",
  //           },
  //           {
  //             key: "1-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-002",
  //             subTopicDescription: "Subtopic on quadratic equations",
  //           },
  //         ],
  //         topiccode: 2,
  //       },
  //       {
  //         key: 3,
  //         subjectname: "Math",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Button",
  //         subTopics: [
  //           {
  //             key: "1-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-001",
  //             subTopicDescription: "Subtopic on linear equations",
  //           },
  //           {
  //             key: "1-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-002",
  //             subTopicDescription: "Subtopic on quadratic equations",
  //           },
  //         ],
  //         topiccode: 3,
  //       },
  //       {
  //         key: 4,
  //         subjectname: "Math",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Environment",
  //         subTopics: [
  //           {
  //             key: "1-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-001",
  //             subTopicDescription: "Subtopic on linear equations",
  //           },
  //           {
  //             key: "1-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-002",
  //             subTopicDescription: "Subtopic on quadratic equations",
  //           },
  //         ],
  //         topiccode: 4,
  //       },
  //       {
  //         key: 5,
  //         subjectname: "Math",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Population",
  //         subTopics: [
  //           {
  //             key: "1-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-001",
  //             subTopicDescription: "Subtopic on linear equations",
  //           },
  //           {
  //             key: "1-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-002",
  //             subTopicDescription: "Subtopic on quadratic equations",
  //           },
  //         ],
  //         topiccode: 5,
  //       },
  //     ],
  //   },
  //   {
  //     subjectName: "Chemistry",
  //     data: [
  //       {
  //         key: 1,
  //         subjectname: "Chemistry",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Bioenergetics",
  //         subTopics: [
  //           {
  //             key: "1-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-001",
  //             subTopicDescription: "Subtopic on linear equations",
  //           },
  //           {
  //             key: "1-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-002",
  //             subTopicDescription: "Subtopic on quadratic equations",
  //           },
  //         ],
  //         topiccode: 1,
  //       },
  //       {
  //         key: 2,
  //         subjectname: "Chemistry",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Pollution",
  //         subTopics: [
  //           {
  //             key: "1-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-001",
  //             subTopicDescription: "Subtopic on linear equations",
  //           },
  //           {
  //             key: "1-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-002",
  //             subTopicDescription: "Subtopic on quadratic equations",
  //           },
  //         ],
  //         topiccode: 2,
  //       },
  //       {
  //         key: 3,
  //         subjectname: "Chemistry",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Button",
  //         subTopics: [
  //           {
  //             key: "1-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-001",
  //             subTopicDescription: "Subtopic on linear equations",
  //           },
  //           {
  //             key: "1-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-002",
  //             subTopicDescription: "Subtopic on quadratic equations",
  //           },
  //         ],
  //         topiccode: 3,
  //       },
  //       {
  //         key: 4,
  //         subjectname: "Chemistry",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Environment",
  //         subTopics: [
  //           {
  //             key: "1-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-001",
  //             subTopicDescription: "Subtopic on linear equations",
  //           },
  //           {
  //             key: "1-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-002",
  //             subTopicDescription: "Subtopic on quadratic equations",
  //           },
  //         ],
  //         topiccode: 4,
  //       },
  //       {
  //         key: 5,
  //         subjectname: "Chemistry",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Population",
  //         subTopics: [
  //           {
  //             key: "1-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-001",
  //             subTopicDescription: "Subtopic on linear equations",
  //           },
  //           {
  //             key: "1-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-002",
  //             subTopicDescription: "Subtopic on quadratic equations",
  //           },
  //         ],
  //         topiccode: 5,
  //       },
  //     ],
  //   },
  //   {
  //     subjectName: "Biology",
  //     data: [
  //       {
  //         key: 1,
  //         subjectname: "Biology",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Bioenergetics",
  //         subTopics: [
  //           {
  //             key: "1-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-001",
  //             subTopicDescription: "Subtopic on linear equations",
  //           },
  //           {
  //             key: "1-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-002",
  //             subTopicDescription: "Subtopic on quadratic equations",
  //           },
  //         ],
  //         topiccode: 1,
  //       },
  //       {
  //         key: 2,
  //         subjectname: "Biology",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Pollution",
  //         subTopics: [
  //           {
  //             key: "1-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-001",
  //             subTopicDescription: "Subtopic on linear equations",
  //           },
  //           {
  //             key: "1-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-002",
  //             subTopicDescription: "Subtopic on quadratic equations",
  //           },
  //         ],
  //         topiccode: 2,
  //       },
  //       {
  //         key: 3,
  //         subjectname: "Biology",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Button",
  //         subTopics: [
  //           {
  //             key: "1-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-001",
  //             subTopicDescription: "Subtopic on linear equations",
  //           },
  //           {
  //             key: "1-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-002",
  //             subTopicDescription: "Subtopic on quadratic equations",
  //           },
  //         ],
  //         topiccode: 3,
  //       },
  //       {
  //         key: 4,
  //         subjectname: "Biology",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Environment",
  //         subTopics: [
  //           {
  //             key: "1-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-001",
  //             subTopicDescription: "Subtopic on linear equations",
  //           },
  //           {
  //             key: "1-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-002",
  //             subTopicDescription: "Subtopic on quadratic equations",
  //           },
  //         ],
  //         topiccode: 4,
  //       },
  //       {
  //         key: 5,
  //         subjectname: "Biology",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Population",
  //         subTopics: [
  //           {
  //             key: "1-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-001",
  //             subTopicDescription: "Subtopic on linear equations",
  //           },
  //           {
  //             key: "1-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-002",
  //             subTopicDescription: "Subtopic on quadratic equations",
  //           },
  //         ],
  //         topiccode: 5,
  //       },
  //     ],
  //   },
  //   {
  //     subjectName: "Physics",
  //     data: [
  //       {
  //         key: 1,
  //         subjectname: "Physics",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Bioenergetics",
  //         subTopics: [
  //           {
  //             key: "1-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-001",
  //             subTopicDescription: "Subtopic on linear equations",
  //           },
  //           {
  //             key: "1-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-002",
  //             subTopicDescription: "Subtopic on quadratic equations",
  //           },
  //         ],
  //         topiccode: 1,
  //       },
  //       {
  //         key: 2,
  //         subjectname: "Physics",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Pollution",
  //         subTopics: [
  //           {
  //             key: "1-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-001",
  //             subTopicDescription: "Subtopic on linear equations",
  //           },
  //           {
  //             key: "1-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-002",
  //             subTopicDescription: "Subtopic on quadratic equations",
  //           },
  //         ],
  //         topiccode: 2,
  //       },
  //       {
  //         key: 3,
  //         subjectname: "Physics",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Button",
  //         subTopics: [
  //           {
  //             key: "1-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-001",
  //             subTopicDescription: "Subtopic on linear equations",
  //           },
  //           {
  //             key: "1-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-002",
  //             subTopicDescription: "Subtopic on quadratic equations",
  //           },
  //         ],
  //         topiccode: 3,
  //       },
  //       {
  //         key: 4,
  //         subjectname: "Physics",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Environment",
  //         subTopics: [
  //           {
  //             key: "1-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-001",
  //             subTopicDescription: "Subtopic on linear equations",
  //           },
  //           {
  //             key: "1-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-002",
  //             subTopicDescription: "Subtopic on quadratic equations",
  //           },
  //         ],
  //         topiccode: 4,
  //       },
  //       {
  //         key: 5,
  //         subjectname: "Physics",
  //         classdivision: "O-Level Paper 1",
  //         topicdescription: "Population",
  //         subTopics: [
  //           {
  //             key: "1-1",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-001",
  //             subTopicDescription: "Subtopic on linear equations",
  //           },
  //           {
  //             key: "1-2",
  //             topic: "Cell biology",
  //             subTopicCode: "STC-002",
  //             subTopicDescription: "Subtopic on quadratic equations",
  //           },
  //         ],
  //         topiccode: 5,
  //       },
  //     ],
  //   },
  // ];

  // const columns: ColumnsType<any | DataType> = [
  //   {
  //     title: "Class Division",
  //     dataIndex: "classdivision",
  //     key: "classdivision",
  //     width: "22%",
  //     ...getColumnSearchProps("classdivision"),
  //     sorter: (a, b) => a.classdivision.length - b.classdivision.length,
  //     sortDirections: ["descend", "ascend"],
  //   },
  //   {
  //     title: "Subject Name",
  //     dataIndex: "subjectname",
  //     key: "subjectname",
  //     width: "22%",
  //     ...getColumnSearchProps("subjectname"),
  //     sorter: (a, b) => a.classdivision.length - b.classdivision.length,
  //     sortDirections: ["descend", "ascend"],
  //   },
  //   {
  //     title: "Topic Code",
  //     dataIndex: "topiccode",
  //     key: "topiccode",
  //     width: "15%",
  //   },
  //   {
  //     title: "Topic Description",
  //     dataIndex: "topicdescription",
  //     key: "topicdescription",
  //     width: "20%",
  //     ...getColumnSearchProps("topicdescription"),
  //     sorter: (a, b) => a.subjectname.length - b.subjectname.length,
  //     sortDirections: ["descend", "ascend"],
  //   },
  //   {
  //     title: "Subject Topics",
  //     dataIndex: "subTopics",
  //     key: "subTopics",
  //     width: "20%",
  //     render: (subTopics: SubTopic[] , record: Topic) => (
  //       <a
  //         href="#"
  //         onClick={() => {
  //           handleSubTopicClick(subTopics);
  //           handleTopicClick(record);
  //           setVisible(true);
  //         }}
  //       >
  //         <div style={{ color: "#00a148" }}>
  //          View SubTopics
  //         </div>
  //       </a>
  //     ),
  //   },
  //   {
  //     title: "Action",
  //     dataIndex: "action",
  //     key: "action",
  //     width: "20%",
  //     render: () => (
  //       <a>
  //         <EditFilled
  //           style={{
  //             color: "#00a148",
  //             textAlign: "right",
  //             marginLeft: "21%",
  //             fontSize: "1.1rem",
  //           }}
  //         />
  //       </a>
  //     ),
  //   },
  // ];
  let data: any;
  const selectedSubjectData = data?.data?.apiData.find((subject: DataType) => subject.subject === selectedSubject);

  //   const selectedSubjectData = data.find(
  //   (subject) => subject.subject === selectedSubject
  // );
  return (
    <div className="maincard" style={{ width: '100%', height: 'auto' }}>
      <Card
        style={{
          width: '100%',
          height: 'auto',
          zIndex: 1,
          marginLeft: '260px',
          marginTop: '40px',
          background: 'rgb(250, 250, 250)',
          boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
        }}
      >
        <h1 className="h3" style={{ marginLeft: '0%', marginTop: '1%' }}>
          Subject Topics
        </h1>
        <Divider style={{ width: '70%' }} />
        {/* <Cards
          subjects={data?.data?.apiData.map((subject:any) => ({ subject: subject.subject }))}
          onSelectSubject={(subject) => setSelectedSubject(subject)}
        /> */}

        {/* <Cards
          subjects={data.map((subject) => ({ subject: subject.subject }))}
          onSelectSubject={(subject) => setSelectedSubject(subject)}
        /> */}

        {selectedSubjectData && (
          <Card className="tablecard">
            <p className="topic">Topics</p>
            <div style={{ padding: '20px', marginLeft: '92%', marginTop: '-2%' }}>
              <AntButton
                label="Add"
                style={{ background: '#00a148' }}
                type="primary"
                onClick={() => setFormVisible(true)}
              ></AntButton>

              <Modal1
                visible={formVisible}
                onCancel={() => setFormVisible(false)}
                onSave={(newData) => {
                  handleAddData(newData);
                  setFormVisible(false);
                }}
                onSaveAndAddMore={(newData) => {
                  handleSaveAndAddMore(newData);
                  console.log(newData);
                }}
              />
            </div>

            <Table
              // columns={columns(handleTopicClick)}
              dataSource={selectedSubjectData.data?.data?.apiData}
              // columns={columns(handleSubTopicClick, handleTopicClick)}
              // dataSource={selectedSubjectData.data}
              pagination={false}
            />
            <br></br>
            <br></br>
            <br></br>

            {selectedTopic && (
              <Card style={{ border: '1px solid #00a148' }}>
                <p className="topic1">Sub-Topics</p>
                <AntButton
                  label="Add"
                  style={{ background: '#00a148', marginLeft: '93.8%', marginBottom: '2%' }}
                  type="primary"
                  onClick={() => setFormVisible(true)}
                />

                <Modal2
                  visible={formVisible}
                  onCancel={() => setFormVisible(false)}
                  onSave={(newData) => {
                    handleAddData(newData);
                    setFormVisible(false);
                  }}
                  onSaveAndAddMore={(newData) => {
                    handleSaveAndAddMore(newData);
                    console.log(newData);
                  }}
                />
                <Table
                  dataSource={selectedTopic.subTopics}
                  columns={[
                    {
                      title: 'Sub-Topic',
                      dataIndex: 'topic',
                      key: 'topic',
                      width: '25%',
                      ...getColumnSearchProps('topic'),
                      sorter: (a, b) => a.topic.length - b.topic.length,
                      sortDirections: ['descend', 'ascend'],
                    },
                    {
                      title: 'SubTopic Code',
                      dataIndex: 'subTopicCode',
                      key: 'subTopicCode',
                      width: '25%',
                      ...getColumnSearchProps('subTopicCode'),
                    },
                    {
                      title: 'SubTopic Description',
                      dataIndex: 'subTopicDescription',
                      key: 'subTopicDescription',
                      width: '25%',
                      ...getColumnSearchProps('subTopicDescription'),
                      sorter: (a, b) => a.subTopicDescription.length - b.subTopicDescription.length,
                      sortDirections: ['descend', 'ascend'],
                    },
                    {
                      title: 'Action',
                      dataIndex: 'action',
                      key: 'action',
                      width: '10%',
                      render: () => (
                        <a>
                          <EditFilled
                            style={{
                              color: '#00a148',
                              textAlign: 'right',
                              marginLeft: '21%',
                              fontSize: '1.1rem',
                            }}
                          />
                        </a>
                      ),
                    },
                  ]}
                  pagination={false}
                />
              </Card>
            )}
          </Card>
        )}
      </Card>
    </div>
  );
};
export default SubjectTopics;
