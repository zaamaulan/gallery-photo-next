"use client";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { menus } from "@/constants/menus";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "./ui/separator";
import Image from "next/image";

// const components = [
//   {
//     title: "My Photos",
//     href: "/gallery/my-photos",
//     description: "Take a journey through your uploaded images and rediscover your cherished snapshots.",
//   },
//   {
//     title: "Favorites",
//     href: "/gallery/favorites",
//     description: "Explore your favorite photos and relive your most memorable moments.",
//   },
//   {
//     title: "Albums",
//     href: "/gallery/albums",
//     description: "Organize your photos into albums and easily navigate through your collections.",
//   },
//   {
//     title: "Recent Uploads",
//     href: "/gallery/recent-uploads",
//     description: "View your most recent photo uploads and stay up-to-date with your latest memories.",
//   },
// ];

export default function NavBar({ session }: { session: any }) {
  return (
    // <NavigationMenu className="mx-auto">
    //   <NavigationMenuList>
    //     <NavigationMenuItem>
    //       <NavigationMenuTrigger>Gallery</NavigationMenuTrigger>
    //       <NavigationMenuContent className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
    //         {components.map((component) => (
    //           <Link
    //             href={component.href}
    //             key={component.title}
    //             legacyBehavior
    //             passHref
    //           >
    //             <NavigationMenuLink
    //               className={cn(
    //                 "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
    //                 // navigationMenuTriggerStyle(),
    //               )}
    //             >
    //               <div className="text-sm font-medium leading-none">
    //                 {component.title}
    //               </div>
    //               <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
    //                 {component.description}
    //               </p>
    //             </NavigationMenuLink>
    //           </Link>
    //         ))}
    //       </NavigationMenuContent>
    //     </NavigationMenuItem>
    //     <NavigationMenuItem>
    //       <Link href="/contact" legacyBehavior passHref>
    //         <NavigationMenuLink className={navigationMenuTriggerStyle()}>
    //           Contact
    //         </NavigationMenuLink>
    //       </Link>
    //     </NavigationMenuItem>
    //     <NavigationMenuItem>
    //       <Link href="/about" legacyBehavior passHref>
    //         <NavigationMenuLink className={navigationMenuTriggerStyle()}>
    //           About
    //         </NavigationMenuLink>
    //       </Link>
    //     </NavigationMenuItem>
    //   </NavigationMenuList>
    // </NavigationMenu>
    <>
      <nav className="hidden h-10 items-center justify-center md:flex md:h-32">
        <ul className="flex gap-10 text-base">
          {menus.map((menu) => (
            <li key={menu.title}>
              <Link href={menu.link}>{menu.title}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <Sheet>
        <SheetTrigger className="md:hidden">
          <Image
            src={"/assets/icons/menu.svg"}
            width={22}
            height={22}
            alt="menu icon"
          ></Image>
        </SheetTrigger>
        <SheetContent side={"left"} className="space-y-4">
          <SheetHeader className="text-left">
            <SheetTitle className="text-xl">ShutterScape</SheetTitle>
            <SheetDescription>
              Unleash Your Creativity with ShutterScape
            </SheetDescription>
          </SheetHeader>
          <Separator />
          <SheetFooter>
            <nav>
              <ul className="flex flex-col gap-4 text-lg">
                {menus.map((menu) => (
                  <li key={menu.title}>
                    <SheetClose asChild>
                      <Link href={menu.link}>{menu.title}</Link>
                    </SheetClose>
                  </li>
                ))}
                {/* {session ? <SignOut /> : <SignIn />} */}
              </ul>
            </nav>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

// const ListItem = React.forwardRef<
//   React.ElementRef<"a">,
//   React.ComponentPropsWithoutRef<"a">
// >(({ className, title, children, ...props }, ref) => {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <a
//           ref={ref}
//           className={cn(
//             "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//             className,
//           )}
//           {...props}
//         >
//           <div className="text-sm font-medium leading-none">{title}</div>
//           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//             {children}
//           </p>
//         </a>
//       </NavigationMenuLink>
//     </li>
//   );
// });
// ListItem.displayName = "ListItem";
