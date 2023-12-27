import { SESSION_COOKIE_NAME } from '../config';

export const getCookieSession = (): string | undefined => {
  const cookieSession = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${SESSION_COOKIE_NAME}=`));

  return cookieSession?.split('=')[1] ?? cookieSession;
};
