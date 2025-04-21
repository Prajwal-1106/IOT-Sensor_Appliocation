
// Define the sensor status type
export type SensorStatus = 'Online' | 'Offline' | 'Maintenance';

// Interface for deployed sensors
export interface DeployedSensor {
  id: string;
  location: string;
  client: string;
  status: SensorStatus;
  lastCommunication: string;
  runtimeHours: number;
  dataPoints: (number | string)[];
}

class SensorService {
  // Get all deployed sensors
  async getAllDeployedSensors(): Promise<DeployedSensor[]> {
    // Simulate API call with delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // This would be replaced by actual API call in production
        const deployedSensors = [
          {
            id: 'SENS-001',
            location: 'Factory Floor A',
            client: 'TechManufacturing Inc.',
            status: 'Online' as SensorStatus,
            lastCommunication: '2025-04-18T08:30:00',
            runtimeHours: 1420,
            dataPoints: [23, 24, 25, 26, 25, 24, 23, 24, 26, 27]
          },
          {
            id: 'SENS-002',
            location: 'Warehouse B',
            client: 'LogisticsPlus',
            status: 'Offline' as SensorStatus,
            lastCommunication: '2025-04-17T16:45:00',
            runtimeHours: 890,
            dataPoints: [18, 17, 16, 'ERR', 'ERR', 'ERR', 'ERR', 'ERR']
          },
          {
            id: 'SENS-003',
            location: 'Server Room',
            client: 'DataCorp',
            status: 'Maintenance' as SensorStatus,
            lastCommunication: '2025-04-18T03:15:00',
            runtimeHours: 2105,
            dataPoints: [19, 19, 20, 21, 22, 23, 22, 21, 20, 19]
          },
          {
            id: 'SENS-004',
            location: 'Office Building',
            client: 'ModernWork Inc.',
            status: 'Online' as SensorStatus,
            lastCommunication: '2025-04-18T09:10:00',
            runtimeHours: 560,
            dataPoints: [21, 21, 22, 22, 23, 23, 22, 22, 21, 21]
          },
          {
            id: 'SENS-005',
            location: 'Cold Storage',
            client: 'FreshGoods Ltd.',
            status: 'Online' as SensorStatus,
            lastCommunication: '2025-04-18T09:05:00',
            runtimeHours: 1890,
            dataPoints: [2, 3, 2, 1, 0, 1, 2, 1, 0, -1]
          }
        ];
        resolve(deployedSensors);
      }, 800);
    });
  }

  // Update sensor status
  async updateSensorStatus(sensorId: string, newStatus: SensorStatus): Promise<DeployedSensor> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // This would be replaced by actual API call in production
        const updatedSensor = {
          id: sensorId,
          location: 'Factory Floor A',
          client: 'TechManufacturing Inc.',
          status: newStatus,
          lastCommunication: new Date().toISOString(),
          runtimeHours: 1420,
          dataPoints: [23, 24, 25, 26, 25, 24, 23, 24, 26, 27]
        };
        resolve(updatedSensor);
      }, 500);
    });
  }
}

export default new SensorService();
