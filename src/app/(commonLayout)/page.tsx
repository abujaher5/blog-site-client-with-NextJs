import { Button } from "@/components/ui/button";
import { userService } from "@/services/user.service";

export default async function Home() {
  const { data } = await userService.getSession();
  console.log("session form home page", data);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Button variant={"outline"}>Click Me</Button>
    </div>
  );
}
