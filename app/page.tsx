"use client";
import { FormEvent, useState } from "react";
import React from "react";
import { ToastFailure, ToastSuccess } from "./components/ToastContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

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
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loading, SetLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!executeRecaptcha) {
      console.log("not available to execute recaptcha");
      return ToastFailure({ message: "Recaptcha not available" });
    }
    SetLoading(true);
    const gRecaptchaToken = await executeRecaptcha("inquirySubmit");
    try {
      const response = await fetch("api/getTestToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values, token: gRecaptchaToken }),
      });
      const data = await response.json();
      if (!response.ok) {
        SetLoading(false);
        return ToastFailure({ message: `Error: ${data.error}` });
      }
      SetLoading(false);
      return ToastSuccess({
        message: `Funds sent successfully. TXID: ${data.txnHash}`,
      });
    } catch (error) {
      console.log(error);
      SetLoading(false);
      if (error instanceof Error) {
        ToastFailure({ message: `Error: ${error.message}` });
      }
    }
  }

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
            {loading && (
              <p className="text-2xl font-bold text-blue-400">
                Sending transation...
              </p>
            )}
            <Button type="submit" disabled={loading}>
              Get Sepolia ETH
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
