import React, { useEffect } from "react";

export const useValieInput = (initValue, rules, classNameError) => {
  const [value, setValue] = React.useState(initValue);
  const [errorText, setErrorText] = React.useState("");
  const valid = useValidation(value, rules);
  const errorMessages = valid.errorMessage;
  const isValidate = valid.isButton;
  const inputClassName = valid.inputClassName;
  const [isFocus, setFocus] = React.useState(false);
  const [errorSpanClassName, setErrorSpanClassName] = React.useState("");

  React.useEffect(() => {
    if (errorMessages.length != 0) {
      const message = errorMessages[0];
      setErrorText(message);
    } else {
      setErrorText("");
    }
  }, [errorMessages.length]);

  React.useEffect(() => {
    if (!isFocus) {
      setErrorSpanClassName(`${classNameError}`);
    } else {
      setErrorSpanClassName(`${classNameError} ${classNameError}_active`);
    }
  }, [isFocus]);

  const onFocus = () => {
    setFocus(true);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return {
    value,
    handleChange,
    errorText,
    isValidate,
    onFocus,
    isFocus,
    inputClassName,
    errorSpanClassName,
  };
};

const useValidation = (value, validationRules) => {
  const [errorMessage, setErrorMessage] = React.useState([]);
  const [inputClassName, setInputClassName] = React.useState("");
  const [isMinLength, setMinLength] = React.useState(false);
  const [isMaxLength, setMaxLength] = React.useState(false);
  const [isEmail, setEmail] = React.useState(false);
  const [isButton, setButton] = React.useState(false);
  const [isEmpty, setEmpty] = React.useState(false);
  const [isValueEquality, setValueEquality] = React.useState(false);

  function addErrorMessage(textError) {
    if (errorMessage.indexOf(textError) === -1) {
      setErrorMessage((errorMessage) => [...errorMessage, textError]);
      setInputClassName("register__form-input register__form-input_error");
    }
  }

  function removeErrorMessage(textError) {
    setErrorMessage((errorMessage) =>
      errorMessage.filter((p) => p !== textError)
    );
    setInputClassName("register__form-input");
  }

  useEffect(() => {
    for (const valid in validationRules) {
      switch (valid) {
        case "isEmail":
          const reg =
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
          if (!reg.test(String(value).toLowerCase())) {
            setEmail(true);
            addErrorMessage("Введите E-mail адрес.");
          } else {
            setEmail(false);
            removeErrorMessage("Введите E-mail адрес.");
          }
          break;
        case "isValueEquality":
          if (value == validationRules[valid]) {
            setValueEquality(true);
            addErrorMessage(`Значение поля должно отличаться от предыдущего`);
          } else {
            setValueEquality(false);
            removeErrorMessage(
              `Значение поля должно отличаться от предыдущего`
            );
          }
          break;
        case "isMaxLength":
          if (value.length > validationRules[valid]) {
            setMaxLength(true);
            addErrorMessage(
              `Максимальное кол-во символов: ${validationRules[valid]}.`
            );
          } else {
            setMaxLength(false);
            removeErrorMessage(
              `Максимальное кол-во символов: ${validationRules[valid]}.`
            );
          }
          break;
        case "isMinLength":
          if (value.length < validationRules[valid]) {
            setMinLength(true);
            addErrorMessage(
              `Минимальное кол-во символов: ${validationRules[valid]}.`
            );
          } else {
            setMinLength(false);
            removeErrorMessage(
              `Минимальное кол-во символов: ${validationRules[valid]}.`
            );
          }
          break;
        case "isEmpty":
          if (value.length === 0) {
            setEmpty(true);
            addErrorMessage(`Поле обязательно к заполнению`);
          } else {
            setEmpty(false);
            removeErrorMessage(`Поле обязательно к заполнению`);
          }
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (isMaxLength || isMinLength || isEmail || isEmpty || isValueEquality) {
      setButton(true);
    } else {
      setButton(false);
    }
    /*  console.log(isMaxLength, isMinLength, isEmail, isEmpty, isValueEquality); */
  }, [isMaxLength, isMinLength, isEmail, isEmpty, isValueEquality]);

  return {
    isMaxLength,
    isMinLength,
    isEmail,
    isEmpty,
    isButton,
    errorMessage,
    inputClassName,
    isValueEquality,
  };
};
