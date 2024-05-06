import { useState } from "react";
import Button from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import "./style.scss";
import { useForm } from "react-hook-form";

import axios from "axios";
import { useNavigate } from "react-router-dom";

type FormTypes = {
  mail: string;
  login: string;
  password: string;
};

export default function RegisterPage() {
  const navigate = useNavigate();

  const form = useForm<FormTypes>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const [error, setError] = useState<null | string>(null);
  const onSubmit = (data: FormTypes) => {
    console.log("Form Submitted");
    console.log(data);
    registerUser(data);
  };
  const ip = "192.168.0.101"
  const registerUser = async ({
    mail,
    login,
    password,
  }: FormTypes): Promise<void> => {
    await fetch(`http://${ip}:3500/api/registerUser`, {
      method: "post",
      credentials: "include",
      body: JSON.stringify({mail, login, password }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.message) {
          // localStorage.setItem("userData", JSON.stringify(data));
          navigate("/login");
        } else {
          throw new Error("Error");
        }
      })
      .catch((err) => setError("Ошибка сервера"));

    // axios
    //   .post("http://192.168.0.100:3500/api/loginUser", {
    //     login,
    //     password,
    //   }, {withCredentials: true})
    //   .then((r) => console.log(r))
    //   .catch((err) => setError("Ошибка сервера"));
    // console.log(await res.json())
    // document.cookie = "123";
  };

  return (
    <>
      <div className="modal">
        <div className="login-form">
          <h2 className="login-form__title">Регистрация</h2>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form__field">
              <Input
                placeholder={"Электронная почта"}
                register={register}
                name={"mail"}
                validation={{
                  required: "Поле дожно быть заполнено",
                  validate: (formValue) => {
                    return !!formValue.trim() || "Поле не должно быть пустым";
                  },
                }}
              ></Input>
              <p className="input__error">{errors.mail?.message}</p>
            </div>
            <div className="form__field">
              <Input
                placeholder={"Имя пользователя"}
                register={register}
                name={"login"}
                validation={{
                  required: "Поле дожно быть заполнено",
                  validate: (formValue) => {
                    return !!formValue.trim() || "Поле не должно быть пустым";
                  },
                }}
              ></Input>
              <p className="input__error">{errors.login?.message}</p>
            </div>
            <div className="form__field">
              <Input
                placeholder={"Пароль"}
                register={register}
                name={"password"}
                type={"password"}
                validation={{
                  required: "Поле дожно быть заполнено",
                  validate: (formValue) => {
                    return !!formValue.trim() || "Поле не должно быть пустым";
                  },
                }}
              ></Input>
              <p className="input__error">{errors.password?.message}</p>
            </div>

            <Button text={"Войти"} color={"black"}></Button>
          </form>
          <span>запомнить меня</span>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
}
