// "use client";

// import { useEffect, ReactNode, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { useStores } from "@/hooks/useStores";
// import { AuthService } from "@/services";
// import Loader from "@/components/loader";
// import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, ROOT } from "@/services/axios/ApiClient";

// interface Props {
//   children: ReactNode;
// }

// const AuthGuard: React.FC<Props> = ({ children }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { authStore } = useStores();
//   const authService = AuthService.getInstance();
//   const [isChecking, setIsChecking] = useState<boolean>(true);

//   useEffect(() => {
//     const checkAuth = async () => {
//       const publicPaths = ['/auth'];
//       const isPublicPath = publicPaths.includes(pathname);
      
//       if (isPublicPath) {
//         if (authStore.token) {
//           const localStorageIsRoot = localStorage.getItem(ROOT) === "true";
//           const targetRoute = localStorageIsRoot ? "/admin/rating" : "/user";
//           router.replace(targetRoute);
//           return;
//         }
        
//         setIsChecking(false);
//         return;
//       }

//       const localStorageToken = localStorage.getItem(ACCESS_TOKEN_KEY);
//       const localStorageRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
//       const localStorageIsRoot = localStorage.getItem(ROOT) === "true";

//       if ((localStorageToken || localStorageRefreshToken) && 
//           (!authStore.token && !authStore.refreshToken)) {
        
//         if (localStorageToken) {
//           authStore.setToken(localStorageToken);
//         }
//         if (localStorageRefreshToken) {
//           authStore.setRefreshToken(localStorageRefreshToken);
//         }
//       }

//       if (authStore.refreshToken && !authStore.token) {
//         try {
//           await authService.refreshTokens();
//         } catch (error) {
//           authStore.setToken();
//           authStore.setRefreshToken();
          
//           router.replace("/auth");
//           return;
//         }
//       }

//       if (!authStore.token && !authStore.refreshToken) {
//         authStore.setToken();
//         authStore.setRefreshToken();
        
//         router.replace("/auth");
//         return;
//       }

//       if (pathname === "/") {
//         const localStorageIsRoot = localStorage.getItem(ROOT) === "true";
//         const targetRoute = localStorageIsRoot ? "/admin/rating" : "/user";
//         router.replace(targetRoute);
//         return;
//       }

//       const adminPaths = ['/admin'];
//       const isAdminPath = adminPaths.some(path => pathname.startsWith(path));
      
//       if (isAdminPath && !localStorageIsRoot) {
//         router.replace("/user");
//         return;
//       }

//       setIsChecking(false);
//     };

//     checkAuth();
//   }, [authStore.token, authStore.refreshToken, router, pathname]);

//   if (isChecking) {
//     return <Loader />;
//   }

//   return <>{children}</>;
// };

// export default AuthGuard;

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
      const accessToken = authStore.token || localStorage.getItem(ACCESS_TOKEN_KEY);
      const refreshToken = authStore.refreshToken || localStorage.getItem(REFRESH_TOKEN_KEY);
      const isRoot = localStorage.getItem(ROOT) === "true";

      if (pathname === "/auth") {
        if (accessToken) {
          const targetRoute = isRoot ? "/admin/rating" : "/user";
          router.replace(targetRoute);
          return;
        }
        setIsChecking(false);
        return;
      }

      if (!accessToken && !refreshToken) {
        authStore.setToken();
        authStore.setRefreshToken();
        router.replace("/auth");
        return;
      }

      if (refreshToken && !accessToken) {
        try {
          await authService.refreshTokens();
          setTimeout(() => checkAuth(), 0);
          return;
        } catch (error) {
          authStore.setToken();
          authStore.setRefreshToken();
          router.replace("/auth");
          return;
        }
      }

      if (accessToken) {
        const allowedRootPaths = ["/admin/rating", "/admin/category", "/profile"];
        const allowedUserPaths = ["/user", "/profile"];

        if (isRoot) {
          const isAllowedRootPath = allowedRootPaths.some(path => pathname.startsWith(path));
          
          if (!isAllowedRootPath) {
            router.replace("/admin/rating");
            return;
          }
        } 
        else {
          const isAllowedUserPath = allowedUserPaths.some(path => pathname.startsWith(path));
          
          if (!isAllowedUserPath) {
            router.replace("/user");
            return;
          }
          
          if (pathname.startsWith("/admin")) {
            router.replace("/user");
            return;
          }
        }
      }

      if (pathname === "/") {
        const targetRoute = isRoot ? "/admin/rating" : "/user";
        router.replace(targetRoute);
        return;
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [authStore.token, authStore.refreshToken, router, pathname]);

  if (isChecking) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AuthGuard;