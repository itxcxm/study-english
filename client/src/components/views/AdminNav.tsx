'use client';

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Users, MessageSquare, GraduationCap } from 'lucide-react';
import { cn } from "@/lib/utils";

export const AdminNav = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Admin Panel
          </span>
        </div>
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink 
                href="/admin" 
                className={cn(navigationMenuTriggerStyle(), "gap-2")}
              >
                <Users className="h-4 w-4" />
                Quản lý người dùng
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink 
                href="/admin/review" 
                className={cn(navigationMenuTriggerStyle(), "gap-2")}
              >
                <MessageSquare className="h-4 w-4" />
                Quản lý câu hỏi
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink 
                href="/admin/courses" 
                className={cn(navigationMenuTriggerStyle(), "gap-2")}
              >
                <GraduationCap className="h-4 w-4" />
                Quản lý khóa học
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

