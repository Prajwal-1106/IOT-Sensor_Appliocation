
import { clients } from './mockData';
import { toast } from "@/components/ui/use-toast";

// Interface for client data
export interface Client {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
}

// Client Service for handling client data
class ClientService {
  // Method to get all clients
  getAllClients = (): Promise<Client[]> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        resolve([...clients]);
      }, 500);
    });
  };

  // Method to get client by ID
  getClientById = (id: string): Promise<Client | null> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        const client = clients.find(c => c.id === id);
        resolve(client || null);
      }, 500);
    });
  };

  // Method to add a new client
  addClient = (client: Omit<Client, 'id'>): Promise<Client> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        // Generate a new ID
        const newId = `C${String(clients.length + 1).padStart(3, '0')}`;
        
        const newClient: Client = {
          ...client,
          id: newId
        };
        
        // In a real app, this would be an API call
        clients.push(newClient);
        
        toast({
          title: "Client Added",
          description: `${newClient.name} has been added as a client.`
        });
        
        resolve(newClient);
      }, 1000);
    });
  };

  // Method to update a client
  updateClient = (id: string, updates: Partial<Client>): Promise<Client | null> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        const index = clients.findIndex(c => c.id === id);
        
        if (index !== -1) {
          // Update the client
          const updatedClient = {
            ...clients[index],
            ...updates
          };
          
          // In a real app, this would be an API call
          clients[index] = updatedClient;
          
          toast({
            title: "Client Updated",
            description: `${updatedClient.name}'s information has been updated.`
          });
          
          resolve(updatedClient);
        } else {
          toast({
            title: "Update Failed",
            description: "Client not found.",
            variant: "destructive"
          });
          
          resolve(null);
        }
      }, 1000);
    });
  };

  // Method to delete a client
  deleteClient = (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        const index = clients.findIndex(c => c.id === id);
        
        if (index !== -1) {
          const clientName = clients[index].name;
          
          // In a real app, this would be an API call
          clients.splice(index, 1);
          
          toast({
            title: "Client Deleted",
            description: `${clientName} has been removed from clients.`
          });
          
          resolve(true);
        } else {
          toast({
            title: "Delete Failed",
            description: "Client not found.",
            variant: "destructive"
          });
          
          resolve(false);
        }
      }, 1000);
    });
  };
}

export default new ClientService();
