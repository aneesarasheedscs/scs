import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { formateDate } from '@tradePro/utils/formateDate';
type UserInfo = {
  Image: string;
  Name: string;
  Date: Date | string;
};
const ToolTipToShowUserData: React.FC<{
  UserType: string;
  UserInfoDataForTooltip: any;
  UserInfoTooltipVisible: boolean;
}> = (
  { UserType, UserInfoDataForTooltip, UserInfoTooltipVisible } // Use object destructuring here
) => {
  const [User, setUser] = useState<UserInfo>(); // Use the correct type for UserInfo

  useEffect(() => {
    if (UserType === 'EntryUser') {
      setUser({
        Image: UserInfoDataForTooltip.EntryUserProfileImageUrl,
        Name: UserInfoDataForTooltip.EntryUserName,
        Date: UserInfoDataForTooltip.EntryDate,
      });
    } else if (UserType === 'ModifyUser') {
      setUser({
        Image: UserInfoDataForTooltip.ModifyUserProfileImageUrl,
        Name: UserInfoDataForTooltip.ModifyUserName,
        Date: UserInfoDataForTooltip.ModifyDate,
      });
    } else if (UserType === 'ApprovalUser') {
      setUser({
        Image: UserInfoDataForTooltip.ApprovalUserProfileImageUrl,
        Name: UserInfoDataForTooltip.ApprovalUserName,
        Date: UserInfoDataForTooltip.PostDate,
      });
    }
  }, [UserType]);

  console.log(UserInfoDataForTooltip);
  return (
    <Tooltip
      title={
        <div className="detail" style={{ display: 'flex' }}>
          <div>
            <img className="" style={{ height: '40px', width: '40px', borderRadius: '' }} src={User?.Image} alt="" />
          </div>
          <div>
            <p style={{ padding: '0px 2px', margin: '0' }} className="">
              {User?.Name}
            </p>
            <p style={{ padding: '0px 2px', margin: '0' }} className="">
              {User?.Date && formateDate(User.Date)}
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
