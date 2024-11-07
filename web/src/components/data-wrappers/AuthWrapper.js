import useSWR from "swr";
import {StoreUtil, AuthUtil} from "@synergy-project-t/utils";
import { useEffect } from "react";
import AuthGuard from "./AuthGuard";
import { getContactNumbers, getUserProfile } from "@synergy-project-t/utils/user";

// This wrapper ensures that auth revalidation is consistently running throughout the app
const AuthWrapper = ({children}) => {

  const { userAuth, setUserAuth, removeUserAuth, setUserInfo, setLocations, setContactNumbers } = StoreUtil.useUserAuthStore((state) => state);
  const { id: userAuthId, email: userAuthEmail } = userAuth;

  const { data: authData, error: authError, isLoading: authIsLoading } = useSWR(
    userAuthId && [
      "http://localhost:5000", //baseUrl (fetcher function param 1)
      userAuthId, //user 'id' from the database (fetcher function param 2)
      "AUTH_WRAPPER_GET_USER_AUTH" //string to serve as unique key for this SWR call (ignored by the fetcher function)
    ],
    AuthUtil.getUserAuth
  );

  useEffect(() => {
    if (!authIsLoading) {
      if (authData?.email) {
        if (authData.email !== userAuthEmail) {
          setUserAuth(authData);
        }
        else {
          // do nothing
        }
      }
      else if (authError) {
        removeUserAuth();
      }
    }
  }, [
    JSON.stringify(authData), //authData,
    JSON.stringify(authError),
    authIsLoading
  ]);

  useEffect(() => {
    if(userAuth.id) {
      initializeUserData()
    }
  }, [userAuth]);

  const initializeUserData = async () => {
    const baseUrl = "http://localhost:5000";
   const [{ user, locations }, contacts] = await Promise.all([getUserProfile([baseUrl, userAuth.id]), getContactNumbers(baseUrl)])
   setUserInfo(user);
   setLocations(locations)
   setContactNumbers(contacts)
  };

  return (<>
    <AuthGuard>
      {children}
    </AuthGuard>
  </>);
};

export default AuthWrapper;