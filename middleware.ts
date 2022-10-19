export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/create-post", "/create-community", "/saved"],
};
