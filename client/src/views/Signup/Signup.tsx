// React & Router DOM
import React from "react";
import { Link } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../redux/global";
import { selectGlobal } from "../../redux/store";
// Utils
import { signup } from "../../utils/auth";
import useForm from "../../utils/hooks/useForm";
// Components
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { EmailIcon, KeyIcon } from "../../components/Icons/Icons";

const Signup = () => {
  const [values, handleChange] = useForm({
    email: "",
    password: "",
    name: "",
  });

  const { message } = useSelector(selectGlobal);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setMessage(""));
    signup(values.email, values.password, values.name);
  };

  return (
    <div className="w-[90%] md:w-auto lg:w-4/12 2xl:w-3/12 flex flex-col">
      <h1 className="mb-4 text-2xl font-medium">Welcome 👋</h1>
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
          <Input
            name="name"
            type="text"
            startIcon={
              <KeyIcon className="mr-2 w-7 h-7 stroke-current flex-none" />
            }
            placeholder="Password"
            value={values.name}
            onChange={handleChange}
          />
          <Button title="signup" type="submit" className="w-full" />
        </form>
        <p>
          Already got an account?{" "}
          <Link
            to="/login"
            className="font-medium underline hover:text-indicator global-transition"
          >
            Login
          </Link>
        </p>
      </div>
      <p className="mt-4 font-medium text-red-500">{message}</p>
    </div>
  );
};

export default Signup;
