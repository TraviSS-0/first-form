import { useForm } from "react-hook-form";
import "./style.css";
import { useRef, useState } from "react";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FormValues = {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  email: string;
  pesel: string;
};

export default function App() {
  const schema: ZodType<FormValues> = z
    .object({
      firstName: z
        .string()
        .min(3, { message: "Imię musi składać się z minimum 3 liter!" }),
      lastName: z
        .string()
        .min(3, { message: "Nazwisko musi się składać z minimum 3 liter!" }),
      password: z
        .string()
        .min(6, { message: "Hasło musi się składać z minimum 6 znaków!" })
        .max(30, { message: "Hasło nie może być dłuże niż 30 znaków!" }),
      confirmPassword: z
        .string()
        .min(6, { message: "Hasło musi się składać z minimum 6 znaków!" })
        .max(30, { message: "Hasło nie może być dłuże niż 30 znaków!" }),
      email: z.string().email({ message: "Niepoprawny format email!" }),
      pesel: z
        .string()
        .length(11, { message: "Pesel się składa z 11 cyfr!" })
        .refine((value: string) => /^\d+$/.test(value), {
          message: "Pesel musi składać się z samych cyfr!",
        }),
    })

    .refine((data) => data.password === data.confirmPassword, {
      message: "Hasła do siebie nie pasują",
      path: ["confirmPassword"],
    });

  const submitData = (data: FormValues) => {
    const userFirstName = data.firstName;
    const userLastName = data.lastName;
    const userPassword = data.password;
    const userEmail = data.email;
    const userPesel = +data.pesel;

    console.log("Form submitted", data);
    console.log("User First Name:", userFirstName);
    console.log("User Last Name:", userLastName);
    console.log("User Password:", userPassword);
    console.log("User Email:", userEmail);
    console.log("User Pesel:", userPesel);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  return (
    <div className="main-flex">
      <h1>Formularz Obywatelski</h1>
      <form onSubmit={handleSubmit(submitData)} id="main-form">
        <input
          type="text"
          id="firstName"
          placeholder="Imię"
          {...register("firstName")}
        />
        {errors.firstName && <p>{errors.firstName?.message}</p>}
        <input
          type="text"
          id="lastName"
          placeholder="Nazwisko"
          {...register("lastName")}
        />
        {errors.lastName && <p>{errors.lastName?.message}</p>}
        <input
          type="text"
          id="password"
          placeholder="Hasło"
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <input
          type="text"
          id="confirmPassword"
          placeholder="Powtórz hasło"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        <input
          type="text"
          id="email"
          placeholder="Twój adres email"
          {...register("email")}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          type="text"
          id="pesel"
          placeholder="Pesel"
          {...register("pesel")}
        />
        {errors.pesel && <p>{errors.pesel.message}</p>}
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
}
