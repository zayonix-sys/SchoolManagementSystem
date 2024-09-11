import { useState, useEffect } from "react";
// import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "next-auth/react";
// import { useRouter } from "next/router";

export const useAuth = () => {
  const [auth, setAuth] = useState<boolean>(false);
//   const router = useRouter();

//   useEffect(() => {
//     // Ensure the code runs only on the client-side
//     if (typeof window !== "undefined") {
//       const token = localStorage.getItem("authToken");
//       if (token) {
//         setAuth(true);
//       }
//     }
//   }, []);

//   const logIn = async (email: string, password: string) => {
//     const response = await nextAuthSignIn("credentials", {
//       email,
//       password,
//       redirect: false, // Handle redirects manually
//     });

//     if (response?.ok) {
//       // Ensure window is available before using localStorage
//       if (typeof window !== "undefined") {
//         localStorage.setItem("authToken", "sample-token"); // Replace with actual token
//         setAuth(true);
//         // Use router.push inside useEffect to avoid the NextRouter issue
//         router.push("/campuses");
//       }
//     } else if (response?.error) {
//       throw new Error(response?.error);
//     }
//   };

//   const logOut = () => {
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("authToken");
//       setAuth(false);
//       nextAuthSignOut();
//       router.push("/"); // Redirect to login page
//     }
//   };

  return { auth, 
    // logIn, logOut 
};
};
