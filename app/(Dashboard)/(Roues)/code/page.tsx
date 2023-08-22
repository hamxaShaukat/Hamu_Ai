"use client";
import Heading from "../../../../components/heading";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import Empty from "@/components/empty"
import Loader from "@/components/loader"
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl
 } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { Code } from "lucide-react";
import {cn} from"@/lib/utils"
import { useProModel } from "@/hooks/use-pro-model";

import UserAvatar from "@/components/user-avator"
import BotAvatar from "@/components/bot-avatar"
import ReactMarkdown from "react-markdown"
export default function CodePage() {
  const proModel = useProModel();

  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];
      console.log('newMessages:', newMessages); // Add this line
      const response = await axios.post("/api/code", {
        messages: newMessages,
      });
      console.log('response.data:', response.data); // Add this line
      setMessages((current) => [...current, userMessage, response.data]);
      form.reset();
    } catch (error: any) {
      if(error?.response?.status ===403){
        proModel.onOpen();
      }
    } finally {
      router.refresh();
    }
  };
  return (
    <div>
      <Heading
        title="Code generation"
        description="Welcome to my smartest model of AI for generating code"
        iconColor="text-emerald-600"
        bgColor="bg-emerald-700/10"
        icon={Code}
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
              rounded-lg
              border
              w-full
              p-4
              px-3
              md:px-6
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-2
              "
            >
              <FormField
                name="Prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-tranperant"
                        disabled={isLoading}
                        placeholder="Generate any code using descriptive text..."
                        {...form.register("prompt")}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length===0 && !isLoading && (
            <div>
              <Empty label="Nothing to show here"/>
            </div>
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div
              key={message.content}
              className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg",message.role==="user"?"bg-white border border-black/10":"bg-muted")}>
                {message.role ==="user"?<UserAvatar/>:<BotAvatar/>}
                <ReactMarkdown
                components={{
                  pre:({node,...props}) => (
                    <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                    <pre {...props}/>
                    </div>
                  ),
                  code:({node,...props}) => (
                    <code className="bg-black/10 rounded-lg p-1" {...props} />
                  )
                }}
                className="text-sm overflow-hidden leading-7"
                >
                {message.content || ""}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
