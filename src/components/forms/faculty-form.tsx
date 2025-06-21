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
import { type Faculty } from "@/lib/types";

const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  department: z.string().min(2, { message: "Department must be at least 2 characters." }),
  preferredHalls: z.string().min(1, { message: "Please enter at least one preferred hall." }),
  preferredTimeSlots: z.string().min(1, { message: "Please enter at least one preferred time slot." }),
  maxClasses: z.coerce.number().min(1, { message: "Max classes must be at least 1." }),
});

type FacultyFormProps = {
  onSubmit: (data: Faculty) => void;
  defaultValues?: Partial<Faculty>;
  onClose: () => void;
};

export function FacultyForm({ onSubmit, defaultValues, onClose }: FacultyFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...defaultValues,
      preferredHalls: defaultValues?.preferredHalls?.join(", "),
      preferredTimeSlots: defaultValues?.preferredTimeSlots?.join(", "),
    },
  });

  function handleFormSubmit(data: z.infer<typeof FormSchema>) {
    onSubmit({
      ...data,
      preferredHalls: data.preferredHalls.split(",").map(s => s.trim()),
      preferredTimeSlots: data.preferredTimeSlots.split(",").map(s => s.trim()),
    });
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Faculty Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Dr. Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Computer Science" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preferredHalls"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Halls (comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Hall A, Hall B" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preferredTimeSlots"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Time Slots (comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 9-10 AM, 1-2 PM" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxClasses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Classes</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
}
