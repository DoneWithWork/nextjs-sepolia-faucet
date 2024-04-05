"use client";
import { useState } from "react";
import React from "react";
import { ToastFailure, ToastSuccess } from "./components/ToastContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const formSchema = z.object({
  address: z.string(),
});
const Page = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>, e: any) {
    e.preventDefault();
    try {
      const response = await fetch("api/getTestToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values }),
      });
      if (!response.ok) {
        ToastFailure({ message: `Error: ${response.statusText}` });
      }

      const data = await response.json();
      ToastSuccess({
        message: `Funds sent successfully. TXID: ${data.txnHash}`,
      });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        ToastFailure({ message: `Error: ${error.message}` });
      }
    }
  }
  const getFunds = async (e: any) => {};
  return (
    <div className="">
      <div className="flex flex-col items-center">
        <p className="text-4xl font-bold">Get FREE Sepolia Eth</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-7 w-[600px] flex flex-col mt-10"
          >
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Address" {...field} />
                  </FormControl>
                  <FormDescription>
                    Ensure you entered the right address
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Get Sepolia ETH</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
