
import React, { useEffect, useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  RefreshCw,
  Cpu
} from 'lucide-react';
import SensorService, { DeployedSensor, SensorStatus } from '@/services/SensorService';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Sensors: React.FC = () => {
  const [sensors, setSensors] = useState<DeployedSensor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedSensor, setSelectedSensor] = useState<DeployedSensor | null>(null);

  useEffect(() => {
    fetchSensors();
  }, []);

  const fetchSensors = async () => {
    try {
      setLoading(true);
      const sensorsData = await SensorService.getAllDeployedSensors();
      setSensors(sensorsData);
      
      if (sensorsData.length > 0 && !selectedSensor) {
        setSelectedSensor(sensorsData[0]);
      }
    } catch (error) {
      console.error('Error fetching sensors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSensors = sensors.filter(sensor => {
    const matchesSearch = 
      sensor.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sensor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sensor.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sensor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (sensorId: string, newStatus: SensorStatus) => {
    try {
      const updatedSensor = await SensorService.updateSensorStatus(sensorId, newStatus);
      if (updatedSensor) {
        setSensors(sensors.map(sensor => 
          sensor.id === updatedSensor.id ? updatedSensor : sensor
        ));
        
        if (selectedSensor && selectedSensor.id === updatedSensor.id) {
          setSelectedSensor(updatedSensor);
        }
      }
    } catch (error) {
      console.error('Error updating sensor status:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Online':
        return 'bg-green-500';
      case 'Offline':
        return 'bg-red-500';
      case 'Maintenance':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Online':
        return 'default';
      case 'Offline':
        return 'destructive';
      case 'Maintenance':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  const getSensorData = (dataPoints: (number | string)[]) => {
    return dataPoints.map((value, index) => ({
      time: index,
      value: typeof value === 'string' ? null : value
    }));
  };

  return (
    <div className="animate-fade-in space-y-6 pt-14">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Sensor Deployment Monitoring</h1>
        <Button onClick={fetchSensors}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Data
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Deployed Sensors</CardTitle>
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search sensors..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Offline">Offline</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-60">
                <p>Loading sensor data...</p>
              </div>
            ) : filteredSensors.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-60 text-center">
                <Cpu className="h-10 w-10 text-muted-foreground mb-2" />
                <h3 className="font-medium text-lg">No sensors found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sensor ID</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Comm.</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSensors.map((sensor) => (
                      <TableRow 
                        key={sensor.id} 
                        className={selectedSensor?.id === sensor.id ? "bg-muted/50" : ""}
                        onClick={() => setSelectedSensor(sensor)}
                      >
                        <TableCell className="font-medium">{sensor.id}</TableCell>
                        <TableCell>{sensor.location}</TableCell>
                        <TableCell>{sensor.client}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(sensor.status) as any}>
                            {sensor.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(sensor.lastCommunication)}</TableCell>
                        <TableCell>
                          <Select 
                            value={sensor.status} 
                            onValueChange={(value) => handleStatusChange(sensor.id, value as SensorStatus)}
                          >
                            <SelectTrigger className="w-24 h-7">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Online">Online</SelectItem>
                              <SelectItem value="Offline">Offline</SelectItem>
                              <SelectItem value="Maintenance">Maintenance</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sensor Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedSensor ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(selectedSensor.status)}`}></div>
                  <h3 className="text-lg font-medium">{selectedSensor.id}</h3>
                </div>
                
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-muted-foreground">Location:</div>
                    <div className="text-sm font-medium">{selectedSensor.location}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-muted-foreground">Client:</div>
                    <div className="text-sm font-medium">{selectedSensor.client}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-muted-foreground">Status:</div>
                    <div className="text-sm font-medium">
                      <Badge variant={getStatusBadgeVariant(selectedSensor.status) as any}>
                        {selectedSensor.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-muted-foreground">Last Communication:</div>
                    <div className="text-sm font-medium">{formatDate(selectedSensor.lastCommunication)}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-muted-foreground">Runtime:</div>
                    <div className="text-sm font-medium">{selectedSensor.runtimeHours} hours</div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-2">Recent Data</h4>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={getSensorData(selectedSensor.dataPoints)}
                        margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#0EA5E9"
                          activeDot={{ r: 8 }}
                          connectNulls
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  {selectedSensor.dataPoints.includes('ERR') && (
                    <p className="text-xs text-red-500 mt-2">
                      Error detected in sensor readings
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-60 text-center">
                <Cpu className="h-10 w-10 text-muted-foreground mb-2" />
                <h3 className="font-medium">No sensor selected</h3>
                <p className="text-sm text-muted-foreground">
                  Select a sensor to view details
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Sensors;
