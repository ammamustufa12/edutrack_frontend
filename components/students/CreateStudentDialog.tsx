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
import { Plus } from "lucide-react";
import { z } from "zod";

const createStudentSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  emroll: z.string().min(1, "Enrollment number is required"),
  birthdate: z.string().min(1, "Birthdate is required"),
  level: z.string().min(1, "Grade level is required"),
  parent1: z.string().min(1, "Parent 1 name is required"),
  parent2: z.string().optional(),
});

type CreateStudentFormData = z.infer<typeof createStudentSchema>;

type Student = {
  id: number | string; // adjust according to your API
  firstname: string;
  lastname: string;
  emroll: string;
  birthdate: string;
  level: string;
  parent1: string;
  parent2?: string;
};

export default function CreateStudentDialog({
  open,
  onOpenChange,
  className,
  onStudentCreated, // NEW callback
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  onStudentCreated?: (student: Student) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateStudentFormData>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      emroll: "",
      birthdate: "",
      level: "",
      parent1: "",
      parent2: "",
    },
  });

  const onSubmit = async (data: CreateStudentFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("https://edu-track-4h4z.onrender.com/api/v1/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.error || "Failed to create student");
      }

      console.log("✅ Student created:", result);

      // Call parent callback to update list instantly
      if (onStudentCreated) {
        onStudentCreated(result.student || result); // adjust according to your API response
      }

      form.reset();
      onOpenChange(false);
    } catch (error: any) {
      console.error("❌ Error:", error.message);
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
          className={className}
          style={{
            fontFamily: "General Sans, sans-serif",
            color: "#fff",
            fontSize: 11,
            fontWeight: 500,
            borderRadius: 8,
            backgroundColor: "#191919",
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Student
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px] p-10 gap-0">
        <DialogHeader className="px-8 pt-8 pb-6">
          <DialogTitle className="text-3xl font-bold text-center text-gray-900">
            Create New Student
          </DialogTitle>
          <DialogDescription className="text-center text-gray-500 mt-2">
            Fill in the student details
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="px-8 pb-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {/* firstname */}
              <FormField
                control={form.control}
                name="firstname"
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
              {/* lastname */}
              <FormField
                control={form.control}
                name="lastname"
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

            <div className="grid grid-cols-2 gap-4">
              {/* enrollment */}
              <FormField
                control={form.control}
                name="emroll"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enrollment Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 230045" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              {/* birthdate */}
              <FormField
                control={form.control}
                name="birthdate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birthdate</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            {/* level */}
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade Level</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Grade 6" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              {/* parent1 */}
              <FormField
                control={form.control}
                name="parent1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent 1 Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter first parent name" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              {/* parent2 */}
              <FormField
                control={form.control}
                name="parent2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent 2 Name (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter second parent name" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
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
