
import { toast } from "@/components/ui/use-toast";
import { users } from "./mockData";

// Interface for login credentials
export interface LoginCredentials {
  username: string;
  password: string;
}

// Interface for user data
export interface User {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'employee';
  email: string;
}

// Auth Service for handling authentication
class AuthService {
  // Method to log in a user
  login = (credentials: LoginCredentials): Promise<User | null> => {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        const user = users.find(
          u => u.username === credentials.username && u.password === credentials.password
        );
        
        if (user) {
          // Create user object without sensitive data
          const userData: User = {
            id: user.id,
            username: user.username,
            name: user.name,
            role: user.role as 'admin' | 'employee',
            email: user.email
          };
          
          // Store user data in local storage (in a real app, store a token)
          localStorage.setItem('user', JSON.stringify(userData));
          resolve(userData);
        } else {
          toast({
            title: "Login Failed",
            description: "Invalid username or password",
            variant: "destructive"
          });
          reject("Invalid username or password");
        }
      }, 1000);
    });
  };

  // Method to log out a user
  logout = (): Promise<void> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        localStorage.removeItem('user');
        resolve();
      }, 500);
    });
  };

  // Method to get current user
  getCurrentUser = (): User | null => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  };

  // Method to check if user is authenticated
  isAuthenticated = (): boolean => {
    return this.getCurrentUser() !== null;
  };

  // Method to check if user has admin role
  isAdmin = (): boolean => {
    const user = this.getCurrentUser();
    return user !== null && user.role === 'admin';
  };
}

export default new AuthService();
