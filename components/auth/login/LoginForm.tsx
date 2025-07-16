"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "../shared/PasswordInput";
import { Input } from "@/components/ui/input";
import { RememberMeCheckbox } from "../shared/RemeberMeCheckbox";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (values: Omit<FormValues, "rememberMe">) => {
      // const response = await fetch("http://localhost:5000/api/v1/auth/login", {
      const response = await fetch("https://edu-track-4h4z.onrender.com/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        const user = data.user;

        // ✅ Save user ID and role in localStorage
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userRole", user.role);

        toast.success("✅ Login successful");
        onSuccess?.();

        // ✅ Redirect based on role
        switch (user.role) {
          case "super_admin":
            router.push("/dashboard/super-admin");
            break;
          case "admin":
            router.push("/dashboard/admin");
            break;
          case "user":
            router.push("/dashboard/user");
            break;
          default:
            router.push("/dashboard");
        }
      } else {
        throw new Error(data.error || "Invalid credentials");
      }
    },
    onError: (error: Error) => {
      toast.error(`❌ ${error.message || "Login failed"}`);
    },
  });

  const onSubmit = (values: FormValues) => {
    loginMutation.mutate({
      email: values.email,
      password: values.password,
    });
  };

  const isLoading = loginMutation.isPending;

  return (
    <div className="w-full max-w-lg space-y-8">
      <div className="space-y-2 text-center">
        <img
          src="/images/logo_edu_track.png"
          alt="Company Logo"
          className="h-32 mx-auto"
        />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel style={{ fontFamily: "General Sans, sans-serif", color: "#333333",fontSize:13 }} className="text-gray-700 font-medium">Email</FormLabel>
                <FormControl>
                  <Input
                  style={{ fontFamily: "General Sans, sans-serif", color: "#333333",fontSize:15 }}
                    placeholder="Enter Email or phone number"
                    className="h-12 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-blue-500 w-full"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
              <FormLabel style={{ fontFamily: "General Sans, sans-serif", color: "#333333",fontSize:13 }} className="text-gray-700 font-medium">Password</FormLabel>
               
                <FormControl>
                  <PasswordInput
                    placeholder="Enter your password"
                    disabled={isLoading}
                    {...field}
                    
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <RememberMeCheckbox
                  checked={field.value}
                  onChange={field.onChange}
                  disabled={isLoading}
                />
              )}
            />
            <button
               
     style={{ fontFamily: "General Sans, sans-serif", color: "#1A1A1A",fontSize:13 }}
              type="button"
              onClick={() => router.push("/auth/forgot-password")}
              className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
              disabled={isLoading}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <Button
             style={{ fontFamily: "General Sans, sans-serif", color: "#fff",fontSize:18 }} 
            type="submit"
            className="w-full h-12 bg-blue-950 rounded-full hover:bg-blue-900 text-white font-medium transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "SIGN IN"}
          </Button>
        </form>
      </Form>

      {/* Signup Link */}
      <div 
     style={{ fontFamily: "General Sans, sans-serif", color: "#1A1A1A",fontSize:15 }} className="text-center text-sm text-gray-600">
        Do not have an account?{" "}
        <button
        
     style={{ fontFamily: "General Sans, sans-serif", color: "##5FC167",fontSize:15 }}
          type="button"
          onClick={() => router.push("/signup")}
          className="text-green-600 hover:text-green-700 font-medium transition-colors"
          disabled={isLoading}
        >
          Create a Company Account
        </button>
      </div>
    </div>
  );
};
