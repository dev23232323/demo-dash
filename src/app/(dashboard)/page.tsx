import UserList from "@/components/pages/page-users/user-list";
import { Suspense } from "react";

export default function UsersPage() {
  return (
    <Suspense fallback={"loading..."}>
      <UserList />
    </Suspense>
  );
}
