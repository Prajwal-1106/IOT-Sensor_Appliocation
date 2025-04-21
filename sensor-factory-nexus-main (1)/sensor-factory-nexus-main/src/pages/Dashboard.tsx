
import React, { useEffect, useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  AlertTriangle,
  TrendingUp
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AuthService from '@/services/AuthService';
import SalesService, { SalesDataPoint } from '@/services/SalesService';
import { maintenanceAlerts } from '@/services/mockData';

const StatCard = ({ title, value, icon, description, className }: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  className?: string;
}) => (
  <Card className={className}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </CardContent>
  </Card>
);

const Dashboard: React.FC = () => {
  const [salesData, setSalesData] = useState<SalesDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const user = AuthService.getCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await SalesService.getSalesData();
        setSalesData(data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="animate-fade-in space-y-6 pt-14">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Welcome back, {user?.name || 'User'}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Inventory"
          value="665"
          icon={<Package className="h-4 w-4 text-muted-foreground" />}
          description="+2.5% from last month"
        />
        <StatCard
          title="Active Orders"
          value="12"
          icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
          description="4 pending, 8 processing"
        />
        <StatCard
          title="Total Clients"
          value="24"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          description="2 new this month"
        />
        <StatCard
          title="Monthly Revenue"
          value="$28,900"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          description="+18% from last month"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly revenue and unit sales</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <p>Loading chart data...</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={salesData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#0EA5E9"
                    fill="#0EA5E9"
                    fillOpacity={0.3}
                    name="Revenue ($)"
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="units"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.3}
                    name="Units Sold"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Maintenance issues requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maintenanceAlerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className="flex items-start space-x-4">
                  <AlertTriangle className={`h-5 w-5 ${alert.resolved ? 'text-gray-400' : 'text-amber-500'}`} />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {alert.type}: {alert.sensorId}
                    </p>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(alert.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Best performing sensors this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-9 h-9 bg-industrial-blue rounded-full flex items-center justify-center text-white">
                    <TrendingUp size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Temperature Sensor T-100</p>
                    <p className="text-xs text-muted-foreground">125 in stock</p>
                  </div>
                </div>
                <p className="text-sm font-medium">85 units</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-9 h-9 bg-industrial-blue rounded-full flex items-center justify-center text-white">
                    <TrendingUp size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Humidity Sensor H-200</p>
                    <p className="text-xs text-muted-foreground">85 in stock</p>
                  </div>
                </div>
                <p className="text-sm font-medium">62 units</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-9 h-9 bg-industrial-blue rounded-full flex items-center justify-center text-white">
                    <TrendingUp size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Motion Sensor M-300</p>
                    <p className="text-xs text-muted-foreground">210 in stock</p>
                  </div>
                </div>
                <p className="text-sm font-medium">54 units</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 mt-1 rounded-full bg-green-500"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">New Order Received</p>
                  <p className="text-sm text-muted-foreground">From SmartBuildings Inc</p>
                  <p className="text-xs text-muted-foreground">Today, 10:32 AM</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 mt-1 rounded-full bg-blue-500"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Inventory Updated</p>
                  <p className="text-sm text-muted-foreground">50 new Temperature Sensors added</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 3:45 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 mt-1 rounded-full bg-amber-500"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Low Stock Alert</p>
                  <p className="text-sm text-muted-foreground">Pressure Sensor P-400 (5 remaining)</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 9:12 AM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
