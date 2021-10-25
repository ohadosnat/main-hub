import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { EmailIcon, KeyIcon } from "../../components/Icons/Icons";
import Input from "../../components/Input/Input";
import { setMessage } from "../../redux/global";
import { selectGlobal } from "../../redux/store";
import { login } from "../../utils/auth";
import useForm from "../../utils/hooks/useForm";

const Login = () => {
  const [values, handleChange] = useForm({
    email: "",
    password: "",
  });

  const { message } = useSelector(selectGlobal);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setMessage(""));
    login(values.email, values.password);
  };

  return (
    <div className="w-[90%] md:w-auto lg:w-4/12 2xl:w-3/12 flex flex-col">
      <h1 className="mb-4 text-2xl font-medium">Welcome back 👋</h1>
      <div className="w-full bg-box py-5 px-5 rounded-xl">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="space-y-5 w-full mb-4"
        >
          <Input
            name="email"
            type="email"
            startIcon={
              <EmailIcon className="mr-2 w-7 h-7 stroke-current flex-none" />
            }
            placeholder="Email Address"
            value={values.email}
            onChange={handleChange}
          />
          <Input
            name="password"
            type="password"
            startIcon={
              <KeyIcon className="mr-2 w-7 h-7 stroke-current flex-none" />
            }
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
          />
          <Button title="Login" type="submit" className="w-full" />
        </form>
        <p>
          New?{" "}
          <Link
            to="/signup"
            className="font-medium underline hover:text-indicator global-transition"
          >
            Create a new account
          </Link>
        </p>
      </div>
      <p className="mt-4 font-medium text-red-500">{message}</p>
    </div>
  );
};

export default Login;
