import CreateBlogFromClient from "@/components/modules/user/createBlog/CreateBlogFormClient";
import CreateBlogFromServer from "@/components/modules/user/createBlog/CreateBlogFromServer";

import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

const CreateBlogPage = async () => {
  const { data } = await blogService.getBlogPosts({}, { cache: "no-store" });

  return (
    <div>
      {/* <CreateBlogFromServer /> */}
      <CreateBlogFromClient />
      {data.data.map((item: BlogPost) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
};

export default CreateBlogPage;
