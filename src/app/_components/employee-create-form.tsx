"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

const FormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  tel: z.string(),
  email: z.string(),
  manager: z.string(),
  status: z.enum(["Active", "Inactive"]),
});

export function CreateForm() {
  const router = useRouter();
  const createEmployee = api.employee.createEmployee.useMutation(); // Define function
  const { data: managers } = api.employee.getManagers.useQuery();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      tel: "",
      email: "",
      manager: "",
      status: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await createEmployee.mutateAsync(data);
      router.push("/employees");
    } catch (error) {
      console.error("Failed to create employee:", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-6 p-8"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="name"
                  {...field}
                  className="w-2/3"
                  required
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Surname</FormLabel>
              <FormControl>
                <Input
                  placeholder="surname"
                  {...field}
                  className="w-2/3"
                  required
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tel"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Telephone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="telephone number"
                  {...field}
                  className="w-2/3"
                  required
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="email"
                  {...field}
                  className="w-2/3"
                  required
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="manager"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Manager</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                required
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {managers?.map((manager) => (
                    <SelectItem key={manager.manager} value={manager.manager}>
                      {manager.manager}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                required
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
