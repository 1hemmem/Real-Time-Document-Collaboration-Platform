import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { createClient } from "../utils/supabase/server";
import ProfileButton from "./ProfileButton";

const NavBar = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const isLoggedIn = !error && data?.user;

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <NavigationMenu className="container mx-auto">
        <NavigationMenuList className="flex items-center justify-between h-14 px-4 sm:px-8">
          {/* Left Section: Links */}
          <div className="flex items-center space-x-4">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} font-medium text-foreground hover:text-primary`}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/playground" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} font-medium text-foreground hover:text-primary`}
                >
                  Playground
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </div>

          {/* Right Section: Profile or Sign In */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <NavigationMenuItem>
                <ProfileButton />
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem>
                <Link href="/login" legacyBehavior passHref>
                  <Button variant="outline" className="font-medium">
                    Sign in
                  </Button>
                </Link>
              </NavigationMenuItem>
            )}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavBar;
