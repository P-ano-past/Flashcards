import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import UserRoutes from "../Utils/UserRoutes";
import RoleRoutes from "../Utils/RoleRoutes";
import type { UserProfile, Role } from "../Utils/types/api";

interface UserContextType {
  user: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await UserRoutes.getProfile();
        console.log(`res`, res);
        let rolesArray: Role[] = [];
        try {
          const roleRes = await RoleRoutes.getRole();

          rolesArray = roleRes?.roles?.length
            ? roleRes.roles
            : [
                {
                  id: "guest",
                  name: "guest",
                  description: "Default guest role",
                },
              ];
        } catch (roleError) {
          console.warn(
            "Failed to fetch roles, defaulting to guest.",
            roleError
          );
          rolesArray = [
            {
              id: "guest",
              name: "guest",
              description: "Default guest role",
            },
          ];
        }

        if (!res.roles || !res.roles.length) {
          try {
            await RoleRoutes.saveRole(rolesArray);
          } catch (saveError) {
            console.error("Failed to save roles to DB:", saveError);
          }
        }

        const userWithRoles: UserProfile = { ...res, roles: rolesArray };

        if (
          userWithRoles.roles.length &&
          !userWithRoles.roles.some((role) => role.name === "guest")
        ) {
          setUser(userWithRoles);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const isAuthenticated = !!user;

  return (
    <UserContext.Provider value={{ user, loading, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
