"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
const userSchema = z.object({
  username: z.string().email({ message: "Your email is invalid." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

type UserFormValues = z.infer<typeof userSchema>;

const LogInForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const togglePasswordType = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
  });

  const handleError = () => {
    if (Object.keys(errors).length > 0) {
      toast.error("Please correct the errors in the form.");
    }
  };

  const onSubmit: SubmitHandler<UserFormValues> = async (data) => {
    //     try {
    //       setIsPending(true); // Set pending state to true

    //       const response = await Login({
    //         userName: data.username,
    //         password: data.password,
    //       });
    // log
    //       if (response.success) {
    //         toast.success(`${data.username} logged in successfully!`);
    //         reset();
    //       } else {
    //         toast.error(response.message || "Something went wrong");
    //       }
    //     } catch (error) {
    //       toast.error("Request Failed");
    //     } finally {
    //       setIsPending(false); // Reset pending state
    //     }
    console.log(data);
  };

  return (
    <div className="w-full py-10">
      <form onSubmit={handleSubmit(onSubmit, handleError)}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Input
              type="text"
              placeholder="username"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-destructive">{errors.username.message}</p>
            )}
          </div>
          <div className="col-span-2">
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-destructive">{errors.password.message}</p>
            )}
          </div>
          <div className="col-span-2">
            <Button type="submit">Submit Form</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LogInForm;
