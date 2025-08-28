import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, LogOut, Package, Shield } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      const { error } = await signOut();
      if (error) {
        toast({
          title: "Error",
          description: "Gagal logout. Silakan coba lagi.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Logout berhasil",
          description: "Anda telah berhasil logout"
        });
      }
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Link to="/auth">
          <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10">
            Login
          </Button>
        </Link>
        <Link to="/upload">
          <Button size="sm" className="bg-primary hover:bg-primary/80 font-bold">
            Pesan Sekarang
          </Button>
        </Link>
      </div>
    );
  }

  const userInitials = user.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : user.email?.substring(0, 2).toUpperCase() || 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name || user.email} />
            <AvatarFallback className="bg-primary text-primary-foreground font-bold">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-card/90 backdrop-blur-md border-white/10" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium text-sm">
              {user.user_metadata?.full_name || 'User'}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator className="bg-white/10" />
        
        <DropdownMenuItem asChild className="hover:bg-white/5">
          <Link to="/profile" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Profil Saya</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild className="hover:bg-white/5">
          <Link to="/orders" className="flex items-center">
            <Package className="mr-2 h-4 w-4" />
            <span>Pesanan Saya</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild className="hover:bg-white/5">
          <Link to="/admin" className="flex items-center">
            <Shield className="mr-2 h-4 w-4" />
            <span>Panel Admin</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild className="hover:bg-white/5">
          <Link to="/settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Pengaturan</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-white/10" />
        
        <DropdownMenuItem 
          className="hover:bg-red-500/10 text-red-400 hover:text-red-300 cursor-pointer"
          onClick={handleSignOut}
          disabled={isLoggingOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;