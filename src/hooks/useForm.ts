import React, { useState } from "react";

type ChangeEventType =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

const useForm = <T extends {}>(initialState: T) => {
  const [values, setValues] = useState(initialState);
  const handleInputChange = (e: ChangeEventType) => {
    const { name, value } = e.target;
    setValues(task => ({ ...task, [name]: value }));
  };
  return { values, handleInputChange };
};

export default useForm;
