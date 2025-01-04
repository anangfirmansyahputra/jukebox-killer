import React from "react";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="bg-gradient-to-tr from-primary/30 to-primary-foreground/30 h-screen w-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
