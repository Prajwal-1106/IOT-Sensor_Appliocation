
import { sensors, SENSOR_TYPES } from './mockData';
import { toast } from "@/components/ui/use-toast";

// Interface for sensor data
export interface Sensor {
  id: string;
  name: string;
  type: string;
  price: number;
  stock: number;
  description: string;
  lastUpdated: string;
}

// Inventory Service for handling sensor inventory
class InventoryService {
  // Method to get all sensors
  getAllSensors = (): Promise<Sensor[]> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        resolve([...sensors]);
      }, 500);
    });
  };

  // Method to get sensor by ID
  getSensorById = (id: string): Promise<Sensor | null> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        const sensor = sensors.find(s => s.id === id);
        resolve(sensor || null);
      }, 500);
    });
  };

  // Method to get all sensor types
  getSensorTypes = (): Promise<string[]> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        resolve([...SENSOR_TYPES]);
      }, 500);
    });
  };

  // Method to add a new sensor
  addSensor = (sensor: Omit<Sensor, 'id'>): Promise<Sensor> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        // Generate a new ID
        const newId = `S${String(sensors.length + 1).padStart(3, '0')}`;
        
        const newSensor: Sensor = {
          ...sensor,
          id: newId,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
        
        // In a real app, this would be an API call
        sensors.push(newSensor);
        
        toast({
          title: "Sensor Added",
          description: `${newSensor.name} has been added to inventory.`
        });
        
        resolve(newSensor);
      }, 1000);
    });
  };

  // Method to update a sensor
  updateSensor = (id: string, updates: Partial<Sensor>): Promise<Sensor | null> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        const index = sensors.findIndex(s => s.id === id);
        
        if (index !== -1) {
          // Update the sensor
          const updatedSensor = {
            ...sensors[index],
            ...updates,
            lastUpdated: new Date().toISOString().split('T')[0]
          };
          
          // In a real app, this would be an API call
          sensors[index] = updatedSensor;
          
          toast({
            title: "Sensor Updated",
            description: `${updatedSensor.name} has been updated.`
          });
          
          resolve(updatedSensor);
        } else {
          toast({
            title: "Update Failed",
            description: "Sensor not found.",
            variant: "destructive"
          });
          
          resolve(null);
        }
      }, 1000);
    });
  };

  // Method to delete a sensor
  deleteSensor = (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        const index = sensors.findIndex(s => s.id === id);
        
        if (index !== -1) {
          const sensorName = sensors[index].name;
          
          // In a real app, this would be an API call
          sensors.splice(index, 1);
          
          toast({
            title: "Sensor Deleted",
            description: `${sensorName} has been removed from inventory.`
          });
          
          resolve(true);
        } else {
          toast({
            title: "Delete Failed",
            description: "Sensor not found.",
            variant: "destructive"
          });
          
          resolve(false);
        }
      }, 1000);
    });
  };
}

export default new InventoryService();
