"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { usePathname, useRouter } from "next/navigation";
type AuthContextType = {
  currentUser: User | null;
  loading: boolean;
  logout: () => Promise<void>;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/login" || pathname.startsWith("/login/");
  const isDashboardPage =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  useEffect(() => {
    const supabase = createClient();
    let active = true;
    let authEventVersion = 0;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      authEventVersion += 1;
      if (!active) return;
      setCurrentUser(session?.user ?? null);
      setLoading(false);
    });
    const initialAuthEventVersion = authEventVersion;
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (!active || authEventVersion !== initialAuthEventVersion) return;
        if (error) console.error("Could not restore Supabase session:", error);
        setCurrentUser(data.session?.user ?? null);
        setLoading(false);
      } catch (error) {
        if (!active || authEventVersion !== initialAuthEventVersion) return;
        console.error("Could not restore Supabase session:", error);
        setCurrentUser(null);
        setLoading(false);
      }
    };
    void checkSession();
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (loading) return;
    if (currentUser && isLoginPage) {
      router.replace("/dashboard");
    } else if (!currentUser && isDashboardPage) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [currentUser, isDashboardPage, isLoginPage, loading, pathname, router]);

  const logout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setCurrentUser(null);
    router.replace("/login");
    router.refresh();
  };
  if (loading || (isDashboardPage && !currentUser)) {
    return (
      <main
        className="flex min-h-screen items-center justify-center"
        role="status"
        aria-live="polite"
      >
        Checking your session…
      </main>
    );
  }
  return (
    <AuthContext.Provider value={{ currentUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
