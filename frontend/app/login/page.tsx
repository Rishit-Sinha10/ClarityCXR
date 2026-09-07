import { cn } from "@/lib/utils";
import { GoogleSignInButton } from "@/components/google";
import { GithubSignInButton } from "@/components/github";

export default function LoginPage() {
  return <LoginForm />;
}

export function LoginForm({
  from,
  className,
  ...props
}: React.ComponentProps<"div"> & { from?: string }) {
  return (
    <div
      className={cn(
        "min-h-screen w-full bg-background lg:grid lg:grid-cols-2",
        className,
      )}
      {...props}
    >
      <div className="relative hidden min-h-screen overflow-hidden bg-muted lg:block">
        {" "}
        <img
          src="/image.png"
          alt="Healthcare"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-10 left-10 max-w-lg text-white">
          <p className="font-display text-4xl leading-tight tracking-tight">
            Intelligence for
            <br />
            <span className="italic">better healthcare.</span>
          </p>
        </div>
      </div>

      {/* Right Auth */}
      <div className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-10 text-center">
            <h1 className="font-display text-2xl font-medium tracking-tight">
              ClarityCXR
            </h1>

            <h2 className="mt-8 text-2xl font-medium tracking-tight">
              Welcome back
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to continue to your account.
            </p>
          </div>

          <div className="grid gap-3">
            <GoogleSignInButton
              redirectTo={from}
              className="h-12 w-full rounded-md"
            />

            <GithubSignInButton
              redirectTo={from}
              className="h-12 w-full rounded-md"
            />
          </div>

          <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground">
            By continuing, you agree to ClarityCXR&apos;s terms and privacy
            policy.
          </p>
        </div>
      </div>
    </div>
  );
}
