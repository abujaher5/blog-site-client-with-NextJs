"use client";

import { createBlogPost } from "@/actions/blog.action";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

const blogSchema = z.object({
  title: z
    .string()
    .min(3, "Title Must Be At Least 3 Characters..")
    .max(200, "Title Must Be Less Than 200 Characters.."),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters..")
    .max(5000, "Content must be less than 5000 characters.."),
  tags: z.string(),
});

const CreateBlogFromClient = () => {
  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      tags: "",
    },
    validators: {
      onSubmit: blogSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating blog.....");
      const blogData = {
        title: value.title,
        content: value.content,
        tags: value.tags
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== ""),
      };
      console.log(blogData);

      try {
        const res = await createBlogPost(blogData);
        if (res.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }
        toast.success("Post Created Successfully", { id: toastId });
      } catch (error) {
        toast.error("Something went wrong ", { id: toastId });
      }
    },
  });

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader className="text-center uppercase">
          <CardTitle>Create Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            id="createBlog-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                name="title"
                children={(field) => {
                  const isInValid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInValid}>
                      <FieldLabel htmlFor={field.name}>Blog Title</FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Blog Title"
                      />

                      {isInValid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="content"
                children={(field) => {
                  const isInValid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInValid}>
                      <FieldLabel htmlFor={field.name}>Content</FieldLabel>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Write your blog content."
                      />
                      {isInValid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              ></form.Field>

              <form.Field
                name="tags"
                children={(field) => {
                  const isInValid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInValid}>
                      <FieldLabel htmlFor={field.name}>Tags</FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Tags"
                      />

                      {isInValid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full" form="createBlog-form" type="submit">
            Create Blog
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateBlogFromClient;
