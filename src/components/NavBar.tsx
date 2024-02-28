import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { menus } from "@/constants/menus";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SignOut from "./SignOut";
import SignIn from "./SignIn";

export default async function NavBar() {
  const session = await getServerSession(authOptions);
  return (
    // <NavigationMenu>
    //   <NavigationMenuList>
    //     {menus.map((menu) => (
    //       <NavigationMenuItem key={menu.title}>
    //         <Link href="/gallery" legacyBehavior passHref>
    //           <NavigationMenuLink className={navigationMenuTriggerStyle()}>
    //             {}
    //           </NavigationMenuLink>
    //         </Link>
    //       </NavigationMenuItem>
    //     ))}
    //   </NavigationMenuList>
    // </NavigationMenu>
    <nav className="flex h-16 items-center justify-center uppercase">
      {/* <span>
        <Link href={menus[0].link}>ShutterScape</Link>
      </span> */}
      <ul className="flex gap-10 text-sm">
        {menus.map((menu) => (
          <li key={menu.title}>
            <Link href={menu.link}>{menu.title}</Link>
          </li>
        ))}
        {session ? <SignOut /> : <SignIn />}
      </ul>
    </nav>
  );
}
