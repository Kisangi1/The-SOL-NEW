'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useUser, useClerk } from "@clerk/nextjs"
import { ChevronDown, ChevronRight, Home, LogOut, Menu, Settings, X, PenTool,  UserCircle, Package, BookOpen, FileText,Plane  } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function Component({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useUser()
  const { signOut } = useClerk()
  const [showLogoutDialog, setShowLogoutDialog] = React.useState(false)
  const [openCollapsibles, setOpenCollapsibles] = React.useState<Record<string, boolean>>({})

  const navItems = [
    { href: "/management-portal/dashboard", icon: Home, label: "Dashboard" },
    { 
      icon: BookOpen, 
      label: "Bookings",
      children: [
        { href: "/management-portal/manage-bookings", label: "Bookings", icon: Package },
      ]
    },
    { 
      icon: Plane , 
      label: "Destinations",
      children: [
        { href: "/management-portal/create-destinations", label: "Create Destinations", icon: FileText },
        { href: "/management-portal/manage-destinations", label: "Manage Destinations", icon: Settings },
      ]
    },
    { 
      icon: Package, 
      label: "Packages",
      children: [
        { href: "/management-portal/create-packages", label: "Create Packages", icon: FileText },
        { href: "/management-portal/manage-packages", label: "Manage Packages", icon: Settings },
      ]
    },
    { 
      icon: PenTool, 
      label: "Blogs",
      children: [
        { href: "/management-portal/create-blogs", label: "Create Blogs", icon: FileText },
        { href: "/management-portal/manage-blogs", label: "Manage Blogs", icon: Settings },
      ]
    },
  ]

  const handleLogout = () => {
    setShowLogoutDialog(true)
  }

  const confirmLogout = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const toggleCollapsible = (label: string) => {
    setOpenCollapsibles(prev => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to logout? You&apos;ll need to sign in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmLogout} className="bg-red-600 hover:bg-red-700">
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="fixed top-4 left-4 z-30 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-background"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-all duration-300 ease-in-out bg-background border-r shadow-lg
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 text-primary">
            <div className="flex items-center space-x-2">
              <h2 className="text-md font-bold">The Sol Of African</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-primary-foreground"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <nav className="flex-1 p-4 space-y-1 mb-2 overflow-y-auto">
            {navItems.map((item, index) => {
              if (item.children) {
                return (
                  <Collapsible
                    key={index}
                    open={openCollapsibles[item.label]}
                    onOpenChange={() => toggleCollapsible(item.label)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between mb-1"
                      >
                        <div className="flex items-center">
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.label}
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${openCollapsibles[item.label] ? 'rotate-90' : ''}`} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-6 space-y-1">
                      {item.children.map((child, childIndex) => (
                        <Link key={childIndex} href={child.href} onClick={() => setIsOpen(false)}>
                          <Button
                            variant={pathname === child.href ? "secondary" : "ghost"}
                            className="w-full justify-start mb-1"
                          >
                            {child.icon && <child.icon className="mr-2 h-4 w-4" />}
                            {child.label}
                          </Button>
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                )
              }

              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start mb-1"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t mt-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <Avatar className="mr-2 h-8 w-8">
                    <AvatarImage src={user?.imageUrl} alt={user?.fullName || 'Admin'} />
                    <AvatarFallback>{user?.firstName?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="font-medium text-sm">{user?.fullName || 'Admin'}</span>
                    <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                      {user?.primaryEmailAddress?.emailAddress || ''}
                    </span>
                  </div>
                  <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/management-portal/user-profile">
                  <DropdownMenuItem>
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/management-portal/settings">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  )
}