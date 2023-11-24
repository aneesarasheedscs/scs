import React from 'react';
import { Col, Row, Tooltip } from 'antd';
import { formateDate } from '@tradePro/utils/formateDate';
import { round } from 'lodash';

const ToolTipToShowUserData: React.FC<{ UserInfoDataForTooltip: any; UserInfoTooltipVisible: boolean }> = (
  { UserInfoDataForTooltip, UserInfoTooltipVisible } // Use object destructuring here
) => {
  const { UserProfileImageUrl, UserName, date } = UserInfoDataForTooltip;

  console.log(UserInfoDataForTooltip);
  return (
    <Tooltip
      title={
        <div className="detail" style={{ display: 'flex' }}>
          <div>
            <img
              className=""
              style={{ height: '40px', width: '40px', borderRadius: '' }}
              src={UserProfileImageUrl}
              alt=""
            />
          </div>
          <div>
            <p style={{ padding: '0px 2px', margin: '0' }} className="">
              {UserName}
            </p>
            <p style={{ padding: '0px 2px', margin: '0' }} className="">
              {formateDate(date)}
            </p>
          </div>
        </div>
      }
      open={UserInfoTooltipVisible}
      trigger={['hover']}
    >
      <span>{/* Content that triggers the tooltip */}</span>
    </Tooltip>
  );
};

export default ToolTipToShowUserData;
