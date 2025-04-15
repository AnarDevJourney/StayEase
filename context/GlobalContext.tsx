"use client";
import getUnreadMessageCount from "@/app/actions/getUnreadMessagesCount";
import { useSession } from "next-auth/react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface GlobalContextType {
  unreadCount: number;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
}

// Creating context
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

// Creating Provider
export function GlobalProvider({ children }: GlobalProviderProps) {
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      getUnreadMessageCount().then((res) => {
        if (res.count) setUnreadCount(res.count);
      });
    }
  }, [session]);

  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
}

// Custom hook
export function useGlobalContext(): GlobalContextType {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
}
