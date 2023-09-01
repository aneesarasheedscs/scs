// import { EditFilled } from '@ant-design/icons';
// import { useRef, useState } from 'react';
// import { InputRef } from 'antd';
// import { ColumnType } from 'antd/es/table';
// import { DataType } from './SyllabusManagement/Queries/types';
// import { SubTopic } from './SyllabusManagement/Queries/types';
// import { Topic } from './SyllabusManagement/Queries/types';

// // interface DataType {
// //     subject: string;
// //     data: {
// //       key: number;
// //       classdivision: string;
// //       topiccode: number;
// //       subjectname: string;
// //       topicdescription: string;
// //       subTopics: SubTopic[];
// //     }[];
// //   }

// //   interface SubTopic {
// //     key: string;
// //     topic: string;
// //     subTopicCode: string;
// //     subTopicDescription: string;
// //   }
// //   interface Topic {
// //     key: string;
// //     classDivision: string;
// //     topicCode: string;
// //     subjectName: string;
// //     topicDescription: string;
// //     subTopics: SubTopic[];
// //   }

// //   interface Data {
// //     classdivision: string;
// //     subjectname: string;
// //     topiccode: number;
// //     topicdescription: string;
// //   }

// //   type DataIndex = keyof DataType | any;

// export const columns = (
//   handleSubTopicClick: (subTopics: any) => void,
//   handleTopicClick: (record: any) => void
// ): ColumnType<DataType | any>[] => [
//   {
//     title: 'Class Division',
//     dataIndex: 'classdivision',
//     key: 'classdivision',
//     width: '22%',
//     //   ...getColumnSearchProps("classdivision"),
//     sorter: (a: any, b: any) => a.classdivision.localeCompare(b.classdivision),
//     sortDirections: ['descend', 'ascend'],
//   },
//   {
//     title: 'Subject Name',
//     dataIndex: 'subjectname',
//     key: 'subjectname',
//     width: '22%',
//     //   ...getColumnSearchProps("subjectname"),
//     sorter: (a: any, b: any) => a.classdivision.length - b.classdivision.length,
//     sortDirections: ['descend', 'ascend'],
//   },
//   {
//     title: 'Topic Code',
//     dataIndex: 'topiccode',
//     key: 'topiccode',
//     width: '15%',
//   },
//   {
//     title: 'Topic Description',
//     dataIndex: 'topicdescription',
//     key: 'topicdescription',
//     width: '20%',
//     //   ...getColumnSearchProps("topicdescription"),
//     sorter: (a: any, b: any) => a.subjectname.length - b.subjectname.length,
//     sortDirections: ['descend', 'ascend'],
//   },
//   {
//     title: 'Subject Topics',
//     dataIndex: 'subTopics',
//     key: 'subTopics',
//     width: '20%',
//     render: (subTopics: SubTopic[], record: Topic) => (
//       <a
//         href="#"
//         onClick={() => {
//           handleSubTopicClick(subTopics);
//           handleTopicClick(record);
//           // setVisible(true);
//         }}
//       >
//         <div style={{ color: '#00a148' }}>View SubTopics</div>
//       </a>
//     ),
//   },
//   {
//     title: 'Action',
//     dataIndex: 'action',
//     key: 'action',
//     width: '20%',
//     render: () => (
//       <a>
//         <EditFilled
//           style={{
//             color: '#00a148',
//             textAlign: 'right',
//             marginLeft: '21%',
//             fontSize: '1.1rem',
//           }}
//         />
//       </a>
//     ),
//   },

//   // //     const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
//   // //     const [formVisible, setFormVisible] = useState(false);
//   // //     const [dataa, setData] = useState<Data[]>([]);
//   // //     const [visible, setVisible] = useState<boolean>(false);
//   // //     const [data1, setData1] = useState<SubTopic[]>([]);
//   // //     const [searchText, setSearchText] = useState("");
//   // //     const [searchedColumn, setSearchedColumn] = useState("");
//   // //   //   const searchInput = useRef<InputRef>);
//   // //     const [selectedTopic, setSelectedTopic] = useState<Topic>();
//   // //     const handleSubTopicClick = (subTopics: SubTopic[]) => {
//   // //       setData1(subTopics);
//   // //       setVisible(false);
//   // //     };
//   // //     const handleTopicClick = (topic: Topic) => {
//   // //       setSelectedTopic(topic);

//   // //     };
// ];
