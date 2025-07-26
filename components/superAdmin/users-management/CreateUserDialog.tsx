"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { createUserSchema, type CreateUserFormData } from "./validation";

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export default function CreateUserDialog({
  open,
  onOpenChange,
  className,
}: CreateUserDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "Admin",
    },
  });

  const onSubmit = async (data: CreateUserFormData) => {
    setIsSubmitting(true);
    try {
      console.log("📤 Form data sending:", {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        role: data.role,
      });

      const res = await fetch(
        "https://edu-track-4h4z.onrender.com/api/v1/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            phone: data.phone,
            role: data.role,
          }),
        }
      );

      const result = await res.json();
      console.log("📥 Response status:", res.status, result);

      if (!res.ok) {
        throw new Error(result?.error || "Registration failed");
      }

      console.log("✅ User created:", result);
      form.reset();
      onOpenChange(false);
    } catch (error: any) {
      console.error("❌ Error creating user:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          style={{
            fontFamily: "General Sans, sans-serif",
            color: "#fff",
            fontSize: 11,
            fontWeight: 500,
            borderRadius: 8,
            backgroundColor: "#191919",
          }}
          className={className}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px] p-10 gap-0">
        <DialogHeader className="px-8 pt-8 pb-6">
          <DialogTitle className="text-3xl font-bold text-center text-gray-900">
            Create New User
          </DialogTitle>
          <DialogDescription className="text-center text-gray-500 mt-2">
            Add and Save New User Information
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="px-8 pb-8">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="sarah@school.edu"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>SELECT ROLE</SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            {["Admin", "Viewer"].map((role) => (
                              <div
                                className="flex items-center space-x-3"
                                key={role}
                              >
                                <RadioGroupItem value={role} id={role} />
                                <Label htmlFor={role}>{role}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="rounded-full bg-white text-black border border-blue-950 hover:bg-gray-100 px-6 py-2 w-32"
              >
                CANCEL
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-blue-950 text-white hover:bg-blue-900 w-32"
              >
                {isSubmitting ? "SAVING..." : "SAVE"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
