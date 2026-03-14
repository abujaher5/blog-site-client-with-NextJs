import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export const dynamicParams = false;
export async function generateStaticParams() {
  const { data } = await blogService.getBlogPosts();
  return data?.data?.map((blog: BlogPost) => ({ id: blog.id })).splice(0, 3);
}

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const { data } = await blogService.getBlogById(id);

  return (
    <div className="flex items-center justify-center flex-col space-x-10 mt-20">
      <h2>This is a dynamic page {id}..</h2>
      <h2>This is blog title : {data.title}..</h2>
      <h2>This is blog content : {data.content}..</h2>
    </div>
  );
};

export default BlogPage;
