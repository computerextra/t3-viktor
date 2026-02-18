import { useState, useEffect, Suspense } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useTitle } from "@/hooks/use-title";
import { GithubIcon } from "lucide-react";

export const Route = createFileRoute("/login")({
  beforeLoad: ({ context }) => {
    // Redirect if already authenticated
    if (context.session) {
      throw redirect({ to: "/" });
    }
  },
  component: Login,
});

function Login() {
  useTitle("Anmelden");
  const [csrfToken, setCsrfToken] = useState<string>("");

  useEffect(() => {
    fetch("/api/auth/csrf")
      .then((res) => res.json())
      .then((data) => setCsrfToken(data.csrfToken));
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Anmelden</h1>

      <div className="space-y-4">
        <form action="/api/auth/signin/github" method="POST">
          <input type="hidden" name="csrfToken" value={csrfToken} />
          <input type="hidden" name="callbackUrl" value="/" />
          <button
            type="submit"
            className="cursor-pointer py-2 px-4 max-w-md flex justify-center items-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            <GithubIcon />
            Mit GitHub Anmelden
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Du wirst zu GitHub weitergeleitet.
        </p>
      </div>
    </div>
  );
}
