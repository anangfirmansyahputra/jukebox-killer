"use client";

import { loginAdmin } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useServerAction } from "@/hooks/use-server-action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function LoginForm() {
  const [runAction, isLoading] = useServerAction(loginAdmin);
  const router = useRouter();

  const handleLogin = async (formData: FormData) => {
    const result = await runAction(formData);

    if (result) {
      toast[result.success ? "success" : "error"](result.message);

      if (result.success) {
        router.push(`/admin/live`);
      }
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login to Jukebox Killer</CardTitle>
        <CardDescription>Please enter your credentials</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleLogin}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input name="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter your email"
                name="password"
                type="password"
              />
            </div>
          </div>
          <div className="mt-5">
            <Button disabled={isLoading} className="w-full" type="submit">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
