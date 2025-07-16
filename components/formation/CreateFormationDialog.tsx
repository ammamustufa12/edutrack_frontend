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

// Define FormationStatus type
type FormationStatus = "Active" | "Inactive";

// Form schema using Zod
const createFormationSchema = z.object({
  formation_name: z.string().min(1, "Name is required"),
  from_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  level: z.string().min(1, "Level is required"),
  status: z.enum(["Active", "Inactive"]),
});

type CreateFormationFormData = z.infer<typeof createFormationSchema>;

export default function CreateFormationDialog() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateFormationFormData>({
    resolver: zodResolver(createFormationSchema),
    defaultValues: {
      formation_name: "",
      from_date: "",
      end_date: "",
      level: "",
      status: "Active",
    },
  });

  const onSubmit = async (data: CreateFormationFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("https://edu-track-4h4z.onrender.com/api/v1/formations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result?.error || "Failed to create formation");

      console.log("✅ Formation created:", result);
      form.reset();
      setOpen(false);
    } catch (error: any) {
      console.error("❌ Error creating formation:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black text-white text-sm font-medium rounded-md">
          <Plus className="w-4 h-4 mr-2" />
          Create New Formation
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Create New Formation
          </DialogTitle>
          <DialogDescription className="text-center text-gray-500 mt-1">
            Fill the required details to create a formation.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <FormField
              control={form.control}
              name="formation_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter formation name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="from_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter level (e.g., CP, CE1)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center gap-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="rounded-full"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-blue-950 text-white hover:bg-blue-900"
              >
                {isSubmitting ? "Saving..." : "Save Formation"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
