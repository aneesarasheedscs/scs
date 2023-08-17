import { Card, CardProps } from 'antd';
import React from 'react';

type TAntCard = {
  data?: Array<any>;
  isError?: boolean;
  isLoading?: boolean;
} & CardProps;

export function AntCard({ data, isError, isLoading, children, ...restProps }: TAntCard) {
  return (
    <Card {...restProps}>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading data</p>
      ) : (
        <>{children}</>
      )}
    </Card>
  );
}