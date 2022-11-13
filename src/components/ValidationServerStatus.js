import React from "react";

const useValidationServerStatus = (status) => {
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    switch (status) {
      case 403:
        if (status === 403) setMessage("Нет прав доступа");
        break;
      case 401:
        if (status === 401) setMessage("Неверный логин или пароль");
        break;
      case 400:
        if (status === 400) setMessage("Неправильный, некорректный запрос");
        break;
      case 409:
        if (status === 409) setMessage("Email уже существует");
        break;
      case 200:
        if (status === 200) setMessage("");
        break;
      case 500:
        if (status === 500) setMessage("Ошибка сервера");
        break;
    }
  });

  return message;
};

export default useValidationServerStatus;
