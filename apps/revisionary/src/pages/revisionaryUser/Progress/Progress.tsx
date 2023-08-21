// import { ReactNode } from 'react';
// import { Button, ButtonProps } from 'antd';
// import {Card , CardProps} from 'antd'

// export function ({ ...restProps }) {
//   return (
//     <Card  {...restProps}>
    
//     </Card>
//   );
// }

 
import React from "react";
import { Progress } from "antd";
interface CardData {
    id: number;
    title: string;
    // content: string;
    progress: number; // Progress value (0 to 100)
  } // Assuming you have this interface defined

interface CardWithProgressProps {
  cardData: CardData;
}

const CardWithProgress: React.FC<CardWithProgressProps> = ({ cardData }) => {
  return (
    <div style={{marginLeft:'80px', textAlign:'left', marginTop:'10px'}} >
      
      <p  style={{display:'flex',justifyContent:'left'}} >{cardData.title}</p>
      {/* <p></p> */}
      <Progress percent={cardData.progress} showInfo={false} size={"small"} strokeColor={'#52c41a'}/>
    </div>
  );
};

export default CardWithProgress;