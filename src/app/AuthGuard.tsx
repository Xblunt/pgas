"use client";

import { useEffect, ReactNode, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useStores } from "@/hooks/useStores";
import { AuthService } from "@/services";
import Loader from "@/components/loader";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, ROOT } from "@/services/axios/ApiClient";

interface Props {
  children: ReactNode;
}

const AuthGuard: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { authStore } = useStores();
  const authService = AuthService.getInstance();
  const [isChecking, setIsChecking] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      const publicPaths = ['/auth'];
      const isPublicPath = publicPaths.includes(pathname);
      
      if (isPublicPath) {
        if (authStore.token) {
          const targetRoute = authStore.isRoot ? "/admin/raiting" : "/user";
          router.replace(targetRoute);
          return;
        }
        
        setIsChecking(false);
        return;
      }

      const localStorageToken = localStorage.getItem(ACCESS_TOKEN_KEY);
      const localStorageRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      const localStorageIsRoot = localStorage.getItem(ROOT) === "true";

      if ((localStorageToken || localStorageRefreshToken) && 
          (!authStore.token && !authStore.refreshToken)) {
        
        if (localStorageToken) {
          authStore.setToken(localStorageToken);
        }
        if (localStorageRefreshToken) {
          authStore.setRefreshToken(localStorageRefreshToken);
        }
        if (localStorageIsRoot !== undefined) {
          authStore.setRoot(localStorageIsRoot);
        }
      }

      if (authStore.refreshToken && !authStore.token) {
        try {
          await authService.refreshTokens();
        } catch (error) {
          authStore.setToken();
          authStore.setRefreshToken();
          authStore.setRoot(false);
          
          router.replace("/auth");
          return;
        }
      }

      if (!authStore.token && !authStore.refreshToken) {
        authStore.setToken();
        authStore.setRefreshToken();
        authStore.setRoot(false);
        
        router.replace("/auth");
        return;
      }

      if (pathname === "/") {
        const targetRoute = authStore.isRoot ? "/admin/raiting" : "/user";
        router.replace(targetRoute);
        return;
      }

      const adminPaths = ['/admin'];
      const isAdminPath = adminPaths.some(path => pathname.startsWith(path));
      
      if (isAdminPath && !authStore.isRoot) {
        router.replace("/user");
        return;
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [authStore.token, authStore.refreshToken, authStore.isRoot, router, pathname]);

  if (isChecking) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AuthGuard;