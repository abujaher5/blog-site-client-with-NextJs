"use client";

import { getBlogs } from "@/actions/blog.action";
import { useEffect, useState } from "react";

const AboutPage = () => {
  const [data, setData] = useState();
  const [error, setError] = useState<{ message: string } | null>(null);
  console.log(data);
  console.log(error);

  useEffect(() => {
    (async () => {
      const { data, error } = await getBlogs();
      setData(data);
      setError(error);
    })();
  }, []);

  return (
    <div>
      <h2>This is about page</h2>
    </div>
  );
};

export default AboutPage;
