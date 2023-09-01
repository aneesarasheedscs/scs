import React from 'react';
import { Progress } from 'antd';
interface CardData {
  id: number | string;
  title: string;
  progress: number;
}

interface CardWithProgressProps {
  cardData: CardData;
}

const CardWithProgress: React.FC<CardWithProgressProps> = ({ cardData }) => {
  return (
    <div style={{ textAlign: 'left', marginTop: '8px', lineHeight: '180%' }}>
      <p>{cardData.title}</p>
      <Progress percent={cardData.progress} showInfo={true} size={'small'} strokeColor={'#52c41a'} />
    </div>
  );
};

export default CardWithProgress;
