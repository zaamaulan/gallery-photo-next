"use client";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { menus } from "@/constants/menus";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

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
    <nav className="hidden h-10 items-center justify-center md:flex md:h-32">
      {/* <span>
          <Link href={menus[0].link}>ShutterScape</Link>
        </span> */}
      <ul className="flex gap-10 text-base">
        {menus.map((menu) => (
          <li key={menu.title}>
            <Link href={menu.link}>{menu.title}</Link>
          </li>
        ))}
        {/* {session ? <SignOut /> : <SignIn />} */}
      </ul>
    </nav>
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
