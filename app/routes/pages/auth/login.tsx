import { Link } from "react-router";
import LoginForm from "~/components/auth/login-form";

function Login() {
  return (
    <div className="h-screen w-screen bg-transparent">
      <div className="h-full w-full lg:max-w-2xl p-4 mx-auto flex flex-col items-center justify-center gap-6">
        {/* HEADER */}
        <div className="space-y-4">
          <h1 className="text-center text-accent text-2xl lg:text-4xl font-semibold">
            Hey, Welcome to Roadmap
          </h1>
          <p className="text-justify lg:text-center">
            Login yourself to see and interect with our roadmaps.
          </p>
        </div>

        <div>
          <LoginForm />
        </div>

        {/* FOOTER */}
        <div className="w-full">
          <p className="text-justify lg:text-center">
            Hey, Don't have any account created yet? Let's{" "}
            <Link to={"/signup"} className="text-primary">
              create an account
            </Link>{" "}
            an explore.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
