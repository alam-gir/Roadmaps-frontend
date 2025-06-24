import { Navigate, Outlet } from "react-router";
import FullScreenLoading from "~/components/loading/full-screen-loading";
import { useUserProfile } from "~/hooks/query/useUser";

function EnsureNotLoggedin() {
  const { isLoading, data } = useUserProfile();

  if (isLoading) <FullScreenLoading />;

  // if not logged in redirect to login.
  if (data?.success)
    return <Navigate to={"/"} replace />;

  // if logged in but not verified then redirect to verify-email
  if (data && data.success && !data.data.isEmailVerified)
    return <Navigate to={"/verify-email"} replace />;

  return <Outlet />;
}

export default EnsureNotLoggedin