import { Link } from 'react-router'
import SignupForm from '~/components/auth/signup-form'

function Signup() {
  return (
    <div className="h-screen w-screen bg-transparent">
      <div className="h-full w-full lg:max-w-2xl p-4 mx-auto flex flex-col items-center justify-center gap-6">
        {/* HEADER */}
        <div className="space-y-4">
          <h1 className="text-center text-accent text-2xl lg:text-4xl font-semibold">
            Hey, Welcome to Roadmap
          </h1>
          <p className="text-justify lg:text-center">
            Create an account to login and interaction with our upcoming and new features and perticipate in discussion.
          </p>
        </div>

        <div>
          <SignupForm />
        </div>

        {/* FOOTER */}
        <div className="w-full">
          <p className="text-justify lg:text-center">
            Hey, Already have an account? Let's{" "}
            <Link to={"/login"} className="text-primary">
              login
            </Link>{" "}
            and explore.{" "}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup