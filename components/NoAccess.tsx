import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Logo from "./Logo";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const NoAccess = ({details="Please sign in to continue shopping & spacial offers."}: {details?: string}) => {
  
  return (
    <div
      className="flex bg-gray-100 items-center justify-center 
         p-4 py-12 md:py-34 rounded-lg border h-[85vh] border-shop_light_blue/20"
    >
      <Card className="w-full max-w-md p-5">
        <CardHeader className="flex flex-col items-center">
          <Logo className="w-full" />
          <CardTitle className="text-center text-2xl font-bold">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="text-center font-sans font-medium text-darkColor/80">
               {details}
            </p>
            <SignInButton forceRedirectUrl="/cart" mode="modal">
          <Button className="w-full" size="lg">
            Sign In
          </Button>

        </SignInButton>
        </CardContent>
          <CardFooter className="flex flex-col space-y-2">
           <div className="text-sm text-muted-foreground text-center">
            Don&apos;t have an account?
           </div>
           <SignUpButton mode="modal">
            <Button variant="outline" className="w-full" size="lg">
                Create an account
            </Button>
           </SignUpButton>
          </CardFooter>
      </Card>
    </div>
  );
};

export default NoAccess;
