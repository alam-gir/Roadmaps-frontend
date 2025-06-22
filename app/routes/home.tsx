import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { useLoginMutation } from "~/hooks/query/useAuth";
import { useEffect } from "react";
import { useUserProfile } from "~/hooks/query/useUser";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
    const {data: userProfile, isLoading, isError, error} = useUserProfile();


  console.log({
    isLoading, userProfile, isError , error
  });
  return <Welcome />;
}
