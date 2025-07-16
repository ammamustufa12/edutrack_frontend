"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "../shared/PasswordInput";
import { ToggleCheckbox } from "../shared/ToggleCheckbox";

const formSchema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    agree: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

interface SignupFormProps {
  onSuccess?: () => void;
}

export const SignupForm = ({ onSuccess }: SignupFormProps) => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agree: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      // const res = await fetch("http://localhost:5000/api/v1/auth/register", {
            const res = await fetch("https://edu-track-4h4z.onrender.com/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.fullName,
          email: values.email,
          password: values.password,
          role: "user",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Registration failed");
      }

      toast.success("Registration successful! Please log in.");
      onSuccess?.();
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
    }
  };

  return (
    <div className="w-full max-w-lg space-y-8 mx-auto">
      <div className="space-y-2 text-center">
        <img
          src="/images/logo_edu_track.png"
          alt="Company Logo"
          className="h-32 mx-auto"
        />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  style={{
                    fontFamily: "General Sans, sans-serif",
                    color: "#333333",
                    fontSize: 13,
                  }}
                >
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    style={{
                      fontFamily: "General Sans, sans-serif",
                      color: "#333333",
                      fontSize: 15,
                    }}
                    className="h-12 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-blue-500 w-full"
                    placeholder="Enter your full name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  style={{
                    fontFamily: "General Sans, sans-serif",
                    color: "#333333",
                    fontSize: 13,
                  }}
                >
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    style={{
                      fontFamily: "General Sans, sans-serif",
                      color: "#333333",
                      fontSize: 15,
                    }}
                    className="h-12 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-blue-500 w-full"
                    placeholder="Enter your email"
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
                <FormLabel
                  style={{
                    fontFamily: "General Sans, sans-serif",
                    color: "#333333",
                    fontSize: 13,
                  }}
                >
                  Password
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Create a password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  style={{
                    fontFamily: "General Sans, sans-serif",
                    color: "#333333",
                    fontSize: 13,
                  }}
                >
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Confirm your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Terms Agreement */}
          <FormField
            control={form.control}
            name="agree"
            render={({ field }) => (
              <ToggleCheckbox
                id="agree"
                checked={field.value}
                onChange={field.onChange}
                label="I agree to the terms and conditions"
              />
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full h-12 bg-blue-950 rounded-full hover:bg-blue-900 text-white font-medium transition-colors"
            style={{
              fontFamily: "General Sans, sans-serif",
              fontSize: 18,
              color: "#fff",
            }}
          >
            {form.formState.isSubmitting ? "Signing Up..." : "SIGN UP"}
          </Button>
        </form>
      </Form>

      {/* Login Redirect */}
      <div
        className="text-center text-sm text-gray-600"
        style={{
          fontFamily: "General Sans, sans-serif",
          color: "#1A1A1A",
          fontSize: 15,
        }}
      >
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="text-green-600 hover:text-green-700 font-medium transition-colors"
          style={{
            fontFamily: "General Sans, sans-serif",
            color: "#5FC167",
            fontSize: 15,
          }}
          disabled={form.formState.isSubmitting}
        >
          Login here
        </button>
      </div>
    </div>
  );
};
