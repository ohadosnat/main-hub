import { useState } from "react";

/**
 * Controls form fields by the `name` attribute. Useful for long forms.
 * @param initialValues - the form fields you have
 * @function `changeHandle` - targets the fields by the `name` attribute and if it's the `clearButton` element, it will clear the previous element's value(the input field).
 * @returns `object` with the fields values and a `onChange` handle that targets field's value by the element's `name` attribute.
 * @example
 * const [values, changeHandle] = useForm({
 *  email: "",
 *  password: ""
 * })
 */
const useForm = (initialValues: Record<string, string>): useFormReturnType => {
  const [values, setValues] = useState(initialValues);

  const changeHandle = (e: onChangeEventType) => {
    if (e.currentTarget.name === "clearButton") {
      const target = e.currentTarget.previousElementSibling as HTMLInputElement;
      setValues({ ...values, [target.name]: "" });
    } else
      setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
  };

  return [values, changeHandle];
};

export default useForm;
