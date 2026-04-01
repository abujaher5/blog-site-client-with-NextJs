import { redirect } from "next/navigation";

const UserDashboard = () => {
  return redirect("/user-dashboard/create-blog");
};

export default UserDashboard;
