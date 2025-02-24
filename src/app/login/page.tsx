import { LoginForm } from "@/components/login-form";
import { SignupForm } from "@/components/signup-form";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full items-center justify-cente p-4 pt-0 sm:p-6 sm:pt-0 md:p-10">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
          <Tabs
            defaultValue="login"
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Create Account</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="signup">
              <SignupForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
