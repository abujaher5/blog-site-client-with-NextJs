import CreateBlogFrom from "@/components/modules/user/createBlog/CreateBlogFrom";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

const CreateBlogPage = async () => {
  const { data } = await blogService.getBlogPosts({}, { cache: "no-store" });

  return (
    <div>
      <CreateBlogFrom />
      {data.data.map((item: BlogPost) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
};

export default CreateBlogPage;
