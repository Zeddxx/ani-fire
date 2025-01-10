"use client";

import { login } from "@/actions/login";
import { register as registerUser } from "@/actions/register";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoginSchema, RegisterSchema } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQueryState } from "nuqs";

type AuthFormState = "login" | "register";

export default function AuthModal() {
  const [error, setError] = useState<string | undefined>("");
  const [type, setType] = useState<AuthFormState>("login");

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isPending, startTransition] = useTransition();

  const [auth, setAuth] = useQueryState("auth", {
    clearOnDefault: true,
    defaultValue: "",
  });

  const {
    handleSubmit: handleLogin,
    formState: { errors: loginErrors },
    register: registerLogin,
    reset: resetLogin,
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit: handleRegister,
    formState: { errors: registerErrors },
    register,
    reset: resetRegisterForm,
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onLoginSubmit = handleLogin(async (values) => {
    startTransition(() => {
      login(values).then((res) => {
        if (res?.error) {
          resetLogin();
          setError(res.error);
        } else {
          console.log("true");
        }
      });
    });
  });

  useEffect(() => {
    if (auth) {
      setIsOpen(true);
      setType(auth as AuthFormState);
    }
  }, [auth, isOpen]);

  const onRegisterSubmit = handleRegister(async (values) => {
    startTransition(() => {
      registerUser(values).then((res) => {
        if (res.error) {
          resetRegisterForm();
          setError(res.error);
        } else {
          console.log("User created!");
        }
      });
    });
  });

  function renderForm() {
    switch (type) {
      case "login":
        return (
          <>
            <form
              onSubmit={onLoginSubmit}
              className="flex w-full flex-col gap-3"
            >
              <label className="space-y-1">
                <p className="">Your Email</p>
                <Input
                  data-error={!!loginErrors.email as boolean}
                  placeholder="anifire@example.com"
                  className="h-12 bg-primary-100 text-white data-[error=true]:bg-red-50 data-[error=true]:text-red-500 data-[error=true]:outline-red-500"
                  {...registerLogin("email")}
                />
                {loginErrors.email && (
                  <p className="text-sm text-red-500">
                    {loginErrors.email.message}
                  </p>
                )}
              </label>
              <label className="space-y-1">
                <p className="">Your Password</p>
                <Input
                  data-error={!!loginErrors.password as boolean}
                  placeholder="*******"
                  type="password"
                  className="h-12 bg-primary-100 text-white data-[error=true]:bg-red-50 data-[error=true]:text-red-500 data-[error=true]:outline-red-500"
                  {...registerLogin("password")}
                />
                {loginErrors.password && (
                  <p className="text-sm text-red-500">
                    {loginErrors.password.message}
                  </p>
                )}
              </label>
              <Button
                disabled={isPending}
                type="submit"
                variant="secondary"
                className="mt-3 h-11 w-full text-base"
              >
                Login
              </Button>
            </form>

            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <span
                onClick={() => setType("register")}
                data-disabled={isPending as boolean}
                className="cursor-pointer text-secondary underline data-[disabled=true]:pointer-events-none"
              >
                Register.
              </span>
            </p>
          </>
        );
      case "register":
        return (
          <>
            <form
              onSubmit={onRegisterSubmit}
              className="flex w-full flex-col gap-3"
            >
              <label className="space-y-1">
                <p className="">Username</p>
                <Input
                  data-error={!!registerErrors.email as boolean}
                  placeholder="John weak"
                  className="h-12 bg-primary-100 text-white data-[error=true]:bg-red-50 data-[error=true]:text-red-500 data-[error=true]:outline-red-500"
                  {...register("username")}
                />
                {registerErrors.email && (
                  <p className="text-sm text-red-500">
                    {registerErrors.email.message}
                  </p>
                )}
              </label>
              <label className="space-y-1">
                <p className="">Your Email</p>
                <Input
                  data-error={!!registerErrors.email as boolean}
                  placeholder="anifire@example.com"
                  className="h-12 bg-primary-100 text-white data-[error=true]:bg-red-50 data-[error=true]:text-red-500 data-[error=true]:outline-red-500"
                  {...register("email")}
                />
                {registerErrors.email && (
                  <p className="text-sm text-red-500">
                    {registerErrors.email.message}
                  </p>
                )}
              </label>
              <label className="space-y-1">
                <p className="">Your Password</p>
                <Input
                  data-error={!!registerErrors.password as boolean}
                  placeholder="*******"
                  type="password"
                  className="h-12 bg-primary-100 text-white data-[error=true]:bg-red-50 data-[error=true]:text-red-500 data-[error=true]:outline-red-500"
                  {...register("password")}
                />
                {registerErrors.password && (
                  <p className="text-sm text-red-500">
                    {registerErrors.password.message}
                  </p>
                )}
              </label>
              <Button
                disabled={isPending}
                type="submit"
                variant="secondary"
                className="mt-3 h-11 w-full text-base"
              >
                Register
              </Button>
            </form>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <span
                data-disabled={isPending as boolean}
                onClick={() => setType("login")}
                className="cursor-pointer text-secondary underline data-[disabled=true]:pointer-events-none"
              >
                Login.
              </span>
            </p>
          </>
        );
    }
  }
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) setAuth("");
      }}
    >
      <DialogTrigger asChild>
        <Button variant="secondary" disabled className="px-7 font-medium">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl">
            {Type[type as string]?.title}
          </DialogTitle>
          <DialogDescription>
            {Type[type as string]?.description}
          </DialogDescription>
        </DialogHeader>

        {renderForm()}
      </DialogContent>
    </Dialog>
  );
}

const Type: {
  [key: string]: {
    title: string;
    description: string;
  };
} = {
  login: {
    title: "Login",
    description: "Login to anifire and Get started!",
  },
  register: {
    title: "Register",
    description: "Create new account and Get Started!",
  },
};
