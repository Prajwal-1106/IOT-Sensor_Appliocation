
import { orders, salesData } from './mockData';

// Interface for order data
export interface Order {
  id: string;
  clientId: string;
  date: string;
  status: string;
  items: Array<{
    sensorId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
}

// Interface for sales data
export interface SalesDataPoint {
  month: string;
  revenue: number;
  units: number;
}

// Sales Service for handling sales data
class SalesService {
  // Method to get all orders
  getAllOrders = (): Promise<Order[]> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        resolve([...orders]);
      }, 500);
    });
  };

  // Method to get order by ID
  getOrderById = (id: string): Promise<Order | null> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        const order = orders.find(o => o.id === id);
        resolve(order || null);
      }, 500);
    });
  };

  // Method to get orders by client ID
  getOrdersByClientId = (clientId: string): Promise<Order[]> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        const clientOrders = orders.filter(o => o.clientId === clientId);
        resolve(clientOrders);
      }, 500);
    });
  };

  // Method to get sales data for charts
  getSalesData = (): Promise<SalesDataPoint[]> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        resolve([...salesData]);
      }, 500);
    });
  };
}

export default new SalesService();
