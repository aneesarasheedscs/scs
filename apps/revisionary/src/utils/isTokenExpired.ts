import dayjs from 'dayjs';

export function isTokenExpired(): boolean {
  const userDetail: any = localStorage.getItem('loggedInUserDetail');

  const currentTime = dayjs();
  const expirationTime = dayjs(userDetail['.expires'], { utc: true });

  return currentTime.isAfter(expirationTime);
}
