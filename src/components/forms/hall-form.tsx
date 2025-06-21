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
import { type Hall } from "@/lib/types";

const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  capacity: z.coerce.number().min(1, { message: "Capacity must be at least 1." }),
  availableTimes: z.string().min(1, { message: "Please enter at least one available time slot." }),
  equipment: z.string().min(1, { message: "Please enter at least one piece of equipment." }),
});

type HallFormProps = {
  onSubmit: (data: Hall) => void;
  defaultValues?: Partial<Hall>;
  onClose: () => void;
};

export function HallForm({ onSubmit, defaultValues, onClose }: HallFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        ...defaultValues,
        availableTimes: defaultValues?.availableTimes?.join(", "),
        equipment: defaultValues?.equipment?.join(", "),
    },
  });

  function handleFormSubmit(data: z.infer<typeof FormSchema>) {
    onSubmit({
      ...data,
      availableTimes: data.availableTimes.split(",").map(s => s.trim()),
      equipment: data.equipment.split(",").map(s => s.trim()),
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
              <FormLabel>Hall Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Turing Auditorium" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="availableTimes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Available Times (comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 9-10 AM, 1-2 PM" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="equipment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Equipment (comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Projector, Whiteboard" {...field} />
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
