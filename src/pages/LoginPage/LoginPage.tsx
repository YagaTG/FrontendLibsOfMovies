import { useState } from "react";
import Button from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import "./style.scss";
import { useForm } from "react-hook-form";

import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import { ip } from "../../config.server";

type FormTypes = {
  login: string;
  password: string;
};

export default function LoginPage() {
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
    loginUser(data);
  };

  const loginUser = async ({ login, password }: FormTypes): Promise<void> => {
    await fetch(`http://${ip}:3500/api/loginUser`, {
      method: "post",
      credentials: "include",
      body: JSON.stringify({ login, password }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.id) {
          localStorage.setItem("userData", JSON.stringify(data));
          navigate("/movies");
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
          <h2 className="login-form__title">Авторизация</h2>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
        <Button
          text={"Проверить статус"}
          color={"black"}
          onClick={
            () =>
              fetch(`http://${ip}:3500/status`, {
                method: "GET",
                credentials: "include",
              })
            // axios
            //   .get("http://192.168.0.100:3500/status", {
            //     withCredentials: true,
            //   })
            //   .then((r) => console.log(r))
            //   .catch((err) => setError("Ошибка сервера"))
          }
        >
          {" "}
        </Button>
      </div>
    </>
  );
}
