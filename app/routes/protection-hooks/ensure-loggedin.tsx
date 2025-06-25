import { Navigate, Outlet } from "react-router";
import FullScreenLoading from "~/components/loading/full-screen-loading";
import { useUserProfile } from "~/hooks/query/useUser";

function EnsureLoggedin() {
  const { isLoading, data, isError } = useUserProfile();

  if (isLoading) return <FullScreenLoading />;

  // if not logged in redirect to login.
  if (isError || !data || !data.success)
    return <Navigate to={"/login"} replace />;

  // if logged in but not verified then redirect to verify-email
  if (data && data.success && !data.data.isEmailVerified)
    return <Navigate to={"/verify-email"} replace />;

  return <Outlet />;
}

export default EnsureLoggedin;
