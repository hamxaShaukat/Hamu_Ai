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
import { useProModel } from "@/hooks/use-pro-model";
import { VideoIcon } from "lucide-react";
import {cn} from"@/lib/utils"
export default function VideoPage() {
    const proModel = useProModel();
  const router = useRouter();
  const [video, setVideo] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);
      const response = await axios.post("/api/video",values);
      setVideo(response.data[0])
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
        title="Video Generation"
        description="Welcome to my smartest model of AI for generating Video"
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
        icon={VideoIcon}
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
                        placeholder="write your imaginated title? "
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
          {!video && !isLoading && (
            <div>
              <Empty label="Nothing to show here"/>
            </div>
          )}
          {video && (
            <video controls className="w-full aspect-video mt-8 rounded-lg border bg-black">
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </div>
  );
}

