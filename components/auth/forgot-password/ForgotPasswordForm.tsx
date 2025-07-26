"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

export const ForgotPasswordForm = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!API_BASE_URL) {
      toast.error("API base URL is not configured.");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Password reset link sent to your email!");
        form.reset();
      } else {
        toast.error(data.error || "Failed to send reset email.");
      }
    } catch (error) {
      toast.error("Something went wrong, try again later.");
    }
  };

  return (
    <div className="w-full max-w-lg space-y-8 mx-auto">
      <div className="space-y-2 text-center">
        <h2 style={{ fontFamily: "General Sans, sans-serif", color: "#333333",fontSize:25 }} className="text-3xl font-bold text-gray-800">Forgot Password</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                     style={{ fontFamily: "General Sans, sans-serif", color: "#333333",fontSize:15 }}
                    placeholder="Enter your registered email"
                    className="h-12 rounded-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            style={{ fontFamily: "General Sans, sans-serif", color: "#fff",fontSize:13 }}
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full h-12 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors"
          >
            {form.formState.isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </Form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Remembered your password?{" "}
        <a
          href="/login"
          className="text-green-600 hover:text-green-700 font-medium"
        >
          Login here
        </a>
      </p>
    </div>
  );
};
