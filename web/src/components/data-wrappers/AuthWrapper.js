import useSWR from "swr";
import {StoreUtil, AuthUtil} from "@synergy-project-t/utils";
import { useEffect } from "react";
import AuthGuard from "./AuthGuard";
import { getUserProfile } from "@synergy-project-t/utils/user";

// This wrapper ensures that auth revalidation is consistently running throughout the app
const AuthWrapper = ({children}) => {

  const { userAuth, setUserAuth, removeUserAuth, setUserInfo, setLocations } = StoreUtil.useUserAuthStore((state) => state);
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
   const { user, locations } = await getUserProfile(["http://localhost:5000", userAuth.id])
   setUserInfo(user);
   setLocations(locations)
  };

  return (<>
    <AuthGuard>
      {children}
    </AuthGuard>
  </>);
};

export default AuthWrapper;