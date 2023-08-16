import { Card, CardProps } from 'antd';
import React, { ReactNode } from 'react';

export function AntCard({ data, isError, isLoading, ...restProps }: TAntCard) {
  return <Card {...restProps}></Card>;
}

// type TAntCards = { label?: ReactNode } & CardProps;

type TAntCard = {
  data?: Array<any>;
  isError?: boolean;
  isLoading?: boolean;
} & CardProps;
// import { Card, CardProps } from 'antd';
// import React from 'react';

// type TAntCardProps = {
//   data?: any[];
//   isError?: boolean;
//   isLoading?: boolean;
//   customProp?: string; // Your custom prop
// } & CardProps;

// export function AntCard({ data, isError, isLoading, customProp, ...restProps }: TAntCardProps) {
//   return (
//     <Card {...restProps} loading={isLoading}>
//       {isError ? <div>Error loading data.</div> : renderCardContent(data)}
//       <div>{customProp}</div> {/* Rendering the custom prop */}
//     </Card>
//   );
// }

// function renderCardContent(data: any[] | undefined) {
//   return (
//     <div>
//       {/* Render your card content here */}
//       {data && data.map(item => <div key={item.item.syllabusAuthorityId}>
//       <p> {item.syllabusAuthorityCode}</p> 
//       <p> {item.syllabusAuthorityName}</p> 
      
//       </div>)}
//     </div>
//   );
// }
