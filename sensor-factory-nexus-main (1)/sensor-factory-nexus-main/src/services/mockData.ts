
// Mock data for IoT Sensor Factory application

// Sensor Types
export const SENSOR_TYPES = [
  'Temperature', 
  'Humidity', 
  'Motion', 
  'Pressure', 
  'Light', 
  'Sound', 
  'Gas', 
  'Water'
];

// Sensor Status
export const SENSOR_STATUS = ['Online', 'Offline', 'Maintenance'];

// Order Status
export const ORDER_STATUS = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

// Mock Sensors
export const sensors = [
  { 
    id: 'S001', 
    name: 'Temperature Sensor T-100', 
    type: 'Temperature',
    price: 49.99,
    stock: 125,
    description: 'High-precision temperature sensor with range -40°C to 125°C',
    lastUpdated: '2023-06-15'
  },
  { 
    id: 'S002', 
    name: 'Humidity Sensor H-200', 
    type: 'Humidity',
    price: 39.99,
    stock: 85,
    description: 'Reliable humidity sensor with 0-100% RH range and ±2% accuracy',
    lastUpdated: '2023-07-02'
  },
  { 
    id: 'S003', 
    name: 'Motion Sensor M-300', 
    type: 'Motion',
    price: 29.99,
    stock: 210,
    description: 'PIR motion sensor with 5m range and adjustable sensitivity',
    lastUpdated: '2023-05-28'
  },
  { 
    id: 'S004', 
    name: 'Pressure Sensor P-400', 
    type: 'Pressure',
    price: 59.99,
    stock: 65,
    description: 'Industrial pressure sensor with 0-10 bar range',
    lastUpdated: '2023-07-14'
  },
  { 
    id: 'S005', 
    name: 'Light Sensor L-500', 
    type: 'Light',
    price: 19.99,
    stock: 180,
    description: 'Light intensity sensor with ambient light rejection',
    lastUpdated: '2023-06-30'
  },
];

// Mock Deployed Sensors
export const deployedSensors = [
  {
    id: 'DS001',
    sensorId: 'S001',
    location: 'Building A - Floor 1',
    client: 'Acme Industries',
    status: 'Online',
    lastCommunication: '2023-07-20T14:23:45',
    runtimeHours: 2456,
    dataPoints: [22.5, 22.7, 22.9, 23.0, 22.8, 22.6, 22.4]
  },
  {
    id: 'DS002',
    sensorId: 'S002',
    location: 'Building B - Floor 2',
    client: 'TechCorp',
    status: 'Online',
    lastCommunication: '2023-07-20T14:35:12',
    runtimeHours: 1845,
    dataPoints: [58, 57, 56, 58, 60, 62, 61]
  },
  {
    id: 'DS003',
    sensorId: 'S003',
    location: 'Warehouse C - Section 5',
    client: 'Global Logistics',
    status: 'Offline',
    lastCommunication: '2023-07-19T09:15:33',
    runtimeHours: 3512,
    dataPoints: [0, 1, 0, 0, 0, 0, 0]
  },
  {
    id: 'DS004',
    sensorId: 'S001',
    location: 'Office D - Room 101',
    client: 'SmartBuildings Inc',
    status: 'Maintenance',
    lastCommunication: '2023-07-18T11:42:09',
    runtimeHours: 5231,
    dataPoints: [24.5, 24.8, 25.1, 25.0, 'ERR', 'ERR', 'ERR']
  },
];

// Mock Clients
export const clients = [
  {
    id: 'C001',
    name: 'Acme Industries',
    contact: 'John Smith',
    email: 'john.smith@acme.com',
    phone: '555-123-4567',
    address: '123 Industrial Ave, Tech City, TC 12345'
  },
  {
    id: 'C002',
    name: 'TechCorp',
    contact: 'Emily Johnson',
    email: 'emily.j@techcorp.com',
    phone: '555-987-6543',
    address: '456 Innovation Blvd, Smart Town, ST 67890'
  },
  {
    id: 'C003',
    name: 'Global Logistics',
    contact: 'Michael Chen',
    email: 'm.chen@globallogistics.com',
    phone: '555-456-7890',
    address: '789 Shipping Lane, Port City, PC 34567'
  },
  {
    id: 'C004',
    name: 'SmartBuildings Inc',
    contact: 'Laura Garcia',
    email: 'laura@smartbuildings.com',
    phone: '555-234-5678',
    address: '321 Automation Road, Future City, FC 89012'
  },
];

// Mock Orders
export const orders = [
  {
    id: 'O001',
    clientId: 'C001',
    date: '2023-07-01',
    status: 'Delivered',
    items: [
      { sensorId: 'S001', quantity: 10, price: 49.99 },
      { sensorId: 'S003', quantity: 5, price: 29.99 }
    ],
    total: 649.85
  },
  {
    id: 'O002',
    clientId: 'C002',
    date: '2023-07-10',
    status: 'Shipped',
    items: [
      { sensorId: 'S002', quantity: 15, price: 39.99 },
      { sensorId: 'S005', quantity: 20, price: 19.99 }
    ],
    total: 999.65
  },
  {
    id: 'O003',
    clientId: 'C003',
    date: '2023-07-15',
    status: 'Processing',
    items: [
      { sensorId: 'S001', quantity: 8, price: 49.99 },
      { sensorId: 'S004', quantity: 12, price: 59.99 }
    ],
    total: 1119.80
  },
  {
    id: 'O004',
    clientId: 'C004',
    date: '2023-07-18',
    status: 'Pending',
    items: [
      { sensorId: 'S002', quantity: 10, price: 39.99 },
      { sensorId: 'S003', quantity: 10, price: 29.99 }
    ],
    total: 699.80
  },
];

// Mock Sales Data
export const salesData = [
  { month: 'Jan', revenue: 15420, units: 312 },
  { month: 'Feb', revenue: 18500, units: 350 },
  { month: 'Mar', revenue: 22300, units: 410 },
  { month: 'Apr', revenue: 21200, units: 390 },
  { month: 'May', revenue: 19800, units: 370 },
  { month: 'Jun', revenue: 24500, units: 450 },
  { month: 'Jul', revenue: 28900, units: 510 },
];

// Mock Maintenance Alerts
export const maintenanceAlerts = [
  {
    id: 'MA001',
    sensorId: 'DS004',
    type: 'Error',
    message: 'Sensor reading errors detected',
    date: '2023-07-18T11:45:22',
    resolved: false
  },
  {
    id: 'MA002',
    sensorId: 'DS003',
    type: 'Offline',
    message: 'Sensor went offline unexpectedly',
    date: '2023-07-19T09:18:05',
    resolved: false
  },
  {
    id: 'MA003',
    sensorId: 'DS001',
    type: 'Maintenance',
    message: 'Routine maintenance required (>2000 hours)',
    date: '2023-07-15T16:32:47',
    resolved: true
  },
];

// Mock Users
export const users = [
  {
    id: 'U001',
    username: 'admin',
    password: 'admin123', // In a real app, this would be hashed
    name: 'Admin User',
    role: 'admin',
    email: 'admin@sensorFactory.com'
  },
  {
    id: 'U002',
    username: 'employee',
    password: 'emp123', // In a real app, this would be hashed
    name: 'John Employee',
    role: 'employee',
    email: 'john@sensorFactory.com'
  }
];
