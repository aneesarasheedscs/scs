import React from 'react';
import { red, green } from '@ant-design/colors';
import { Progress } from 'antd';
import { Link } from 'react-router-dom';
interface barData {
  id: number;
  title: string;

  progress: number;
}

interface CardWithProgressProps {
  cardData: barData;
}
const stepStyle = {
  height: '80px',
};
const Dashboard1: React.FC<CardWithProgressProps> = ({ cardData }) => {
  return (
    <div style={{ marginLeft: '170px', textAlign: 'left', marginTop: '10px' }}>
      <p style={{ lineHeight: '220%' }}>
        <Link to="/dashboardsubtopic" style={{ color: 'black' }}>
          {cardData.title}
        </Link>
      </p>

      <Progress
        percent={cardData.progress}
        strokeWidth={15}
        steps={10}
        size={[30, 15]}
        strokeColor={[green[10], green[7], red[5], green[5]]}
        style={stepStyle}
      />
    </div>
  );
};

export default Dashboard1;
