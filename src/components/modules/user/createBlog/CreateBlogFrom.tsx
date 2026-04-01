import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";
import { revalidateTag, updateTag } from "next/cache";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = env.API_URL;

const CreateBlogFrom = () => {
  const createBlog = async (formData: FormData) => {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tags = formData.get("tags") as string;

    const blogData = {
      title,
      content,
      tags: tags
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
    };

    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(blogData),
    });
    // if (res.status) {
    //   redirect("/user-dashboard/create-blog?success");
    // }

    if (res.ok) {
      revalidateTag("blogPosts", "max");
      // updateTag("blogPosts")
    }
  };
  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader className="text-center uppercase">
          <CardTitle>Create Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="createBlog-form" action={createBlog}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Blog Title</FieldLabel>
                <Input
                  id="title"
                  placeholder="Blog Title"
                  required
                  type="text"
                  name="title"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="content">Content</FieldLabel>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Write your blog.."
                  required
                />
              </Field>
              <Field>
                <FieldLabel>Tags</FieldLabel>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="React.js , Next.js "
                />
              </Field>
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

export default CreateBlogFrom;
