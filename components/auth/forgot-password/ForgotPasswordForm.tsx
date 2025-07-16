"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { toast } from "sonner";

const formSchema = z.object({
 email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

export const ForgotPasswordForm = () => {
 const form = useForm<FormValues>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   email: "",
  },
 });

 const onSubmit = async (values: FormValues) => {
  try {
   const res = await fetch("/api/v1/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
   });

   const data = await res.json();

   if (res.ok) {
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
  <div className="w-full max-w-md">
   <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
    Forgot Password
   </h2>

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
     href="/auth/login"
     className="text-green-600 hover:text-green-700 font-medium"
    >
     Login here
    </a>
   </p>
  </div>
 );
};
