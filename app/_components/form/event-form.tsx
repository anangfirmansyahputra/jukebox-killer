"use client";

import { saveEvent } from "@/actions/event";
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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useServerAction } from "@/hooks/use-server-action";

import { cn } from "@/lib/utils";
import { Event } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FR, US } from "country-flag-icons/react/3x2";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name event must be at least 2 characters.",
  }),
  description: z.string(),
});

interface EventFormProps {
  event?: Event;
}

export function EventForm({ event }: EventFormProps) {
  const [language, setLanguage] = useState<string[]>(
    event ? event.languange.split(",") : ["en", "fr"]
  );
  const [runAction, iLoading] = useServerAction(saveEvent);
  const [isActive, setIsActive] = useState(event ? event.isActive : true);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: event
      ? {
          name: event.name || "",
          description: event.description || "",
        }
      : {
          name: "",
          description: "",
        },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (language.length === 0) return toast.error("Please select a language");

    const result = await runAction({
      name: values.name,
      description: values.description,
      isActive,
      language: language,
      id: event?.id,
    });

    if (result) {
      toast[result.success ? "success" : "error"](result.message);
      if (result.success) {
        router.push(`/admin/events`);
        router.refresh();
      }
    }
  }

  function handleLanguage(lang: string) {
    if (language.includes(lang)) {
      setLanguage(language.filter((l) => l !== lang));
    } else {
      setLanguage([...language, lang]);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 bg-white transition-colors shadow rounded-lg"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={iLoading}
                    placeholder="Enter your name"
                    {...field}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={iLoading}
                    placeholder="Enter your description"
                    className="bg-white"
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-white">
            <div className="space-y-0.5">
              <FormLabel>Active</FormLabel>
              <FormDescription>
                This event will be played when the switch is enabled
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={isActive}
                onCheckedChange={() => setIsActive(!isActive)}
              />
            </FormControl>
          </div>

          <div className="space-y-2">
            <Label>Language</Label>
            <div className="grid grid-cols-2 gap-3 max-w-[430px]">
              <div
                className={cn(
                  "bg-white p-3 rounded-lg shadow border border-white hover:shadow-lg transition-all duration-150 cursor-pointer",
                  language.includes("en") && "border-primary"
                )}
                onClick={() => handleLanguage("en")}
              >
                <US />
              </div>
              <div
                className={cn(
                  "bg-white p-3 rounded-lg shadow border border-white hover:shadow-lg transition-all duration-150 cursor-pointer",
                  language.includes("fr") && "border-primary"
                )}
                onClick={() => handleLanguage("fr")}
              >
                <FR />
              </div>
            </div>
          </div>

          <div className="space-x-2">
            <Button
              disabled={iLoading}
              onClick={() => router.push("/admin/events")}
              type="button"
              variant={"outline"}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={iLoading}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
