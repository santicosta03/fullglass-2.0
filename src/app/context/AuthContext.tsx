import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { apiFetch } from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  cuit: string;
  role: "ADMIN" | "USER" | "CLIENT";
  status: "active" | "inactive";
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  cuit: string;
  password: string;
  confirmPassword: string;
}

interface AuthResponse {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: User;
}

interface BackendUser {
  email: string;
  name: string;
  phone: string;
  cuit: string;
  role: "ADMIN" | "USER" | "CLIENT";
  active: boolean;
}

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  updateUserRole: (
    userId: string,
    role: "ADMIN" | "USER" | "CLIENT"
  ) => Promise<void>;
  toggleUserStatus: (userId: string) => void;
  deleteUser: (userId: string) => void;
  loadUsers: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const formatBackendUser = (u: BackendUser): User => ({
  id: u.email,
  name: u.name,
  email: u.email,
  phone: u.phone,
  cuit: u.cuit,
  role: u.role,
  status: u.active ? "active" : "inactive",
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const loadUsers = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) return;

    try {
      const usersData: BackendUser[] = await apiFetch("/auth/users");
      setUsers(usersData.map(formatBackendUser));
    } catch (error) {
      console.error("Error cargando usuarios:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    const loadCurrentUser = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) return;

      try {
        const currentUserData: BackendUser = await apiFetch("/auth/me");
        setUser(formatBackendUser(currentUserData));
        await loadUsers();
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        setUsers([]);
      }
    };

    loadCurrentUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data: AuthResponse = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const token = data.accessToken || data.token;

      if (!token) return false;

      localStorage.setItem("accessToken", token);

      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      const currentUserData: BackendUser = await apiFetch("/auth/me");
      setUser(formatBackendUser(currentUserData));

      await loadUsers();

      return true;
    } catch {
      return false;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response: AuthResponse = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const token = response.accessToken || response.token;

      if (token) {
        localStorage.setItem("accessToken", token);

        const currentUserData: BackendUser = await apiFetch("/auth/me");
        setUser(formatBackendUser(currentUserData));

        await loadUsers();
      }

      if (response.refreshToken) {
        localStorage.setItem("refreshToken", response.refreshToken);
      }

      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        await apiFetch("/auth/logout", {
          method: "POST",
          body: JSON.stringify({ refreshToken }),
        });
      }
    } catch {
      // aunque falle el backend, cerramos sesión en frontend
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setUsers([]);
  };

  const updateProfile = async (data: Partial<User>) => {
    const updatedUserData: BackendUser = await apiFetch("/auth/me", {
      method: "PUT",
      body: JSON.stringify(data),
    });

    const updatedUser = formatBackendUser(updatedUserData);
    setUser(updatedUser);

    setUsers((prev) =>
      prev.map((u) => (u.email === updatedUser.email ? updatedUser : u))
    );
  };

  const updateUserRole = async (
    userId: string,
    role: "ADMIN" | "USER" | "CLIENT"
  ) => {
    const selectedUser = users.find((u) => u.id === userId);

    if (!selectedUser) {
      throw new Error("Usuario no encontrado");
    }

    await apiFetch("/auth/role-assignment", {
      method: "PUT",
      body: JSON.stringify({
        email: selectedUser.email,
        role,
      }),
    });

    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role } : u))
    );

    if (user?.id === userId) {
      setUser({ ...user, role });
    }
  };

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u
      )
    );
  };

  const deleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        login,
        register,
        logout,
        updateProfile,
        updateUserRole,
        toggleUserStatus,
        deleteUser,
        loadUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}