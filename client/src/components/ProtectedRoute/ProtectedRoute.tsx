import { Redirect, Route, RouteProps } from "react-router";

interface Props extends RouteProps {
  isAuthenticated: boolean;
  redirectPath: string;
}

const ProtectedRoute = ({ isAuthenticated, redirectPath, ...props }: Props) => {
  if (!isAuthenticated) return <Route {...props} />;

  return <Redirect to={{ pathname: redirectPath }} />;
};

export default ProtectedRoute;
