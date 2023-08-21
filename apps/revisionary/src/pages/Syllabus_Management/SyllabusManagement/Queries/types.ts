
export interface DataType {
    subjectName: string;
    data: {
      key: number;
      classdivision: string;
      topiccode: number;
      subjectname: string;
      topicdescription: string;
      subTopics: SubTopic[];
    }[];
  }

  export  interface SubTopic {
    key: string;
    topic: string;
    subTopicCode: string;
    subTopicDescription: string;
  }
  export  interface Topic {
    key: string;
    classDivision: string;
    topicCode: string;
    subjectName: string;
    topicDescription: string;
    subTopics: SubTopic[];
  }
 
  export  interface Data {
    classdivision: string;
    subjectname: string;
    topiccode: number;
    topicdescription: string;
  }
