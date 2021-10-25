import { useSelector } from "react-redux";
import Button from "../components/Button/Button";
import { selectGlobal, selectUser } from "../redux/store";
import { login, logout, signup } from "../utils/auth";

const TestingZone = () => {
  const user = useSelector(selectUser);
  const { message, isLoading } = useSelector(selectGlobal);

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
      {isLoading ? (
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
                <Button title="spotify login" />
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
