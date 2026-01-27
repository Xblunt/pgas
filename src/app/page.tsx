"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { access } from "fs";

export default observer(function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth");
  }, [router]);

  return null;
});