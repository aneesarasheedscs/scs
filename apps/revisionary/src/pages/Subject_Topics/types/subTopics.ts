export type TSubTopicsData = {
    subTopicId: number;
    subTopicNo: string;
    subTopicDescription: string;
    unitTopicDescription: string;
  };
  
  export type TSubTopicFormDataOnAdd = {
    subTopicNo: string;
    unitTopicId: number;
    subTopicDescription: string;
  };
  
  export type TSubTopicFormDataOnUpdate = {
    rowVersion: number;
    subTopicNo: string;
    subTopicId: number;
    unitTopicId: number;
    subTopicDescription: string;
  };
  