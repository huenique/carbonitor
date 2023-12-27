import localforage from 'localforage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { APP_NAME, DB_STORE, SESSION_COOKIE_NAME } from '../config';
import { UserConstructor } from '../db';
import { useUser } from '../hooks/useUser';
import { getCookieSession } from '../utils/cookie';

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const validateUser = async () => {
      // We want to check if a session cookie exists, and if it does, use that.
      // Otherwise, we want to use the userId from the UserContext.
      const email = getCookieSession();

      // This is fine for now since we're not really validating the user's email address,
      // so if the user wants to set their email to "null" or "undefined", that's fine
      const targetUser = String(userId || email);

      try {
        const user = new UserConstructor(
          localforage.createInstance({
            name: APP_NAME,
            storeName: DB_STORE,
          })
        );
        const storedUser = await user.readUserData(targetUser);
        if (!storedUser) {
          console.error('User does not exist: ', userId);

          // Erase session cookie if target user does not exist. This is to prevent the user from
          // being stuck in a loop of being redirected to the login page.
          document.cookie = `${SESSION_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

          navigate('/auth');
        } else {
          setIsLoading(false);
        }
      } catch (err) {
        console.error(
          'Error accessing application storage. Please check your browser settings.',
          err
        );
        navigate('/auth');
      }
    };

    // Call the validateUser function
    validateUser();
  }, [navigate, userId]);

  if (isLoading) {
    // TODO: Add loading spinner
    return <div></div>;
  }

  return children;
}
