import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
  // Auth routes, only logged out users can access
  layout("./routes/protection-hooks/ensure-not-loggedin.tsx", [
    route("/login", "./routes/pages/auth/login.tsx"),
    route("/signup", "./routes/pages/auth/signup.tsx"),
  ]),

  // Protected routes, only logged in users can access
  layout("./routes/protection-hooks/ensure-loggedin.tsx", [
    route("/verify-email", "./routes/pages/auth/verify-email.tsx"),

    route("/", "./routes/pages/home.tsx"),
    route("/profile", "./routes/pages/profile.tsx"),
  ]),

  // Catch other, which is mean to be not found
  route("*", "./routes/pages/not-found.tsx"),
] satisfies RouteConfig;
