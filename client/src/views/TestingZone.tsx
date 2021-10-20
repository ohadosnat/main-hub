import { useSelector } from "react-redux";
import Button from "../components/Button/Button";
import { selectUser } from "../redux/store";
import useAuth from "../utils/hooks/useAuth";

const TestingZone = () => {
  const user = useSelector(selectUser);
  const { login, logout, signup, message, loading } = useAuth();

  const fakeSignup = () => {
    const email = "ohadtest@gmail.com";
    const password = "123456789";
    signup(email, password, "ohad");
  };
  const fakeLogin = () => {
    const email = "ohadtest@gmail.com";
    const password = "123456789";
    login(email, password);
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <p className="font-medium text-lg">
        🧪 Heyoo welcome to the testing zone! 🧪
      </p>
      {loading ? (
        <LoadingState />
      ) : (
        <>
          {message && <p>{message}</p>}
          {user.uid ? (
            <>
              <p>Welcome {user.name}</p>
              <Button title="logout" onClick={() => logout()} />
              {user.spotify.isLogged ? (
                <p>you are logged in to your spotify account!</p>
              ) : (
                <Button title="spotify login" onClick={() => logout()} />
              )}
            </>
          ) : (
            <>
              <Button title="signup" onClick={fakeSignup} />
              <Button title="login" onClick={fakeLogin} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TestingZone;

const LoadingState = () => {
  return <p>Loading...</p>;
};
