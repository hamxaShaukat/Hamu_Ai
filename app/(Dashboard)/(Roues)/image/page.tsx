"use client";
import Heading from "../../../../components/heading";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import Empty from "@/components/empty"
import Loader from "@/components/loader"
import { formSchema,amountOption,resolutionOption } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl
 } from "@/components/ui/form";
import Image from "next/image"
import { Button } from "@/components/ui/button";
import { Card,CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImageIcon,Download } from "lucide-react";
import {cn} from"@/lib/utils"
import { Select, SelectTrigger, SelectValue,SelectContent, SelectItem } from "@/components/ui/select";
export default function ImagePage() {
  const router = useRouter();
  const [images,setImage]=useState<string[]>([])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount:"1",
      resolution:"512x512"
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImage([]);

      const response = await axios.post("/api/image",values);
      console.log(values)
      const urls =response.data.map((image:{url:string})=>image.url);
      setImage(urls);

      form.reset();
    } catch (error: any) {
      console.log(error)
    } finally {
      router.refresh();
    }
  };
  return (
    <div>
      <Heading
        title="Image Generation"
        description="Welcome to my smartest model of AI fpr generating beautiful and cool images"
        iconColor="text-violet-700"
        bgColor="bg-violet-700/10"
        icon={ImageIcon}
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
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-tranperant"
                        disabled={isLoading}
                        placeholder="What image you want to generate? "
                        {...form.register("prompt")}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
              control = {form.control}
              name = "amount"
              render={({field})=>(
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                        defaultValue={field.value}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOption.map((option)=>(
                        <SelectItem
                        key={option.value}
                        value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
                )
              }
              />
              <FormField
              control = {form.control}
              name = "resolution"
              render={({field})=>(
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                        defaultValue={field.value}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOption.map((option)=>(
                        <SelectItem
                        key={option.value}
                        value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
                )
              }
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
            <div className="p-20">
              <Loader />
            </div>
          )}
          {images.length===0 && !isLoading && (
            <div>
              <Empty label="Nothing to show here"/>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images.map((src)=>(
              <Card
              key={src}
              className="rounded-lg overflow-hidden"
              >
                <div className="relative aspect-square">
                <Image
                alt="Image"
                fill
                src={src}
                />
                </div>
                <CardFooter className="p-2">
                  <Button
                  onClick={()=>window.open(src)}
                  variant="secondary"
                  className="w-full">
                    <Download className="h-4 w-4 mr-2"/>
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

