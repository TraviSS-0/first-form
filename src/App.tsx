import { number, z } from "zod";
import { useForm } from "react-hook-form";
import "./style.css";
import { useRef, useState } from "react";
import { DevTool } from "@hookform/devtools";

export default function App() {
  // const [fname, setFName] = useState(z.string().parse(""));
  // const [lname, setLName] = useState(z.string().parse(""));
  // const [password, setPassword] = useState(z.string().parse(""));
  // const [confirmPassword, setConfirmPassword] = useState(z.string().parse(""));
  // const [email, setEmail] = useState(z.string().parse(""));
  // const [pesel, setPesel] = useState(z.string().parse("0"));

  type FormValues = {
    fname: string;
    lname: string;
    password: string;
    confirmpassword: string;
    email: string;
    pesel: number;
  };

  const form = useForm<FormValues>({
    defaultValues: {
      fname: "",
      lname: "",
      password: "",
      confirmpassword: "",
      email: "",
    },
  });
  const { register, control, handleSubmit, formState, watch } = form;
  const { errors } = formState;

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  return (
    <div className="main-flex">
      <h1>Formularz Obywatelski</h1>
      <form id="main-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <input
          type="text"
          id="fname"
          placeholder="Imię"
          {...register("fname", {
            required: "Imię jest wymagane",
          })}
        />
        <p>{errors.fname?.message}</p>
        <input
          type="text"
          id="lname"
          placeholder="Nazwisko"
          {...register("lname", {
            required: "Nazwisko jest wymagane",
          })}
        />
        <p>{errors.lname?.message}</p>
        <input
          type="text"
          id="password"
          placeholder="Hasło"
          {...register("password", {
            required: "Hasło jest wymagane",
            minLength: {
              value: 5,
              message: "Twoje hasło musi miec minimum 5 znaków długości",
            },
          })}
        />
        <p>{errors.password?.message}</p>
        <input
          type="text"
          id="confirmpassword"
          placeholder="Powtórz hasło"
          {...register("confirmpassword", {
            required: "Powtórzenie hasła jest wymagane",
            validate: (value) =>
              value === password.current || "Hasła się nie zgadzają",
          })}
        />
        <p>{errors.confirmpassword?.message}</p>
        <input
          type="text"
          id="email"
          placeholder="Twój adres email"
          {...register("email", {
            required: "Adres email jest wymagany",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email adress",
            },
          })}
        />
        <p>{errors.email?.message}</p>
        <input
          type="text"
          id="pesel"
          placeholder="Pesel"
          {...register("pesel", {
            required: "Pesel jest wymagany",
            pattern: {
              value: /^[0-9]+$/,
              message: "Pesel składa się z samych liczb",
            },
            minLength: {
              value: 11,
              message: "Pesel musi być długi na 11 znaków",
            },
            maxLength: {
              value: 11,
              message: "Pesel musi być długi na 11 znaków",
            },
          })}
        />
        <p>{errors.pesel?.message}</p>
        <button>Confirm</button>
      </form>
      <DevTool control={control} />
    </div>
  );
}

// naprawic animacje przyciska
