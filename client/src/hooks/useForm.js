import { useState } from "react"


export const useForm = (initialState = {}) => {

  const [values, setValues] = useState(initialState);

  // eslint-disable-next-line no-unused-vars
  const reset = (newState = initialState) => {
    setValues(newState);
  }

  const handleInputChange = ({target}) => {

    setValues({
      ...values,
      [target.name]: target.value
    })

  }

  return[values, handleInputChange,reset];

}
