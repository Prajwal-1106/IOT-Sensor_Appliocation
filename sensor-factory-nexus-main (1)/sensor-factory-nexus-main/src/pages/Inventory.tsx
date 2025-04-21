
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  PackageOpen
} from 'lucide-react';
import InventoryService, { Sensor } from '@/services/InventoryService';

const Inventory: React.FC = () => {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [sensorTypes, setSensorTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  
  // New sensor form
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');

  // Edit sensor form
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSensor, setEditingSensor] = useState<Sensor | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sensorsData, typesData] = await Promise.all([
          InventoryService.getAllSensors(),
          InventoryService.getSensorTypes()
        ]);
        setSensors(sensorsData);
        setSensorTypes(typesData);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredSensors = sensors.filter(sensor => {
    const matchesSearch = sensor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sensor.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || sensor.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleAddSensor = async () => {
    try {
      const newSensor = await InventoryService.addSensor({
        name,
        type,
        price: parseFloat(price),
        stock: parseInt(stock),
        description,
        lastUpdated: new Date().toISOString().split('T')[0]
      });
      
      setSensors([...sensors, newSensor]);
      resetForm();
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Error adding sensor:', error);
    }
  };

  const handleEditSensor = async () => {
    if (!editingSensor) return;
    
    try {
      const updatedSensor = await InventoryService.updateSensor(editingSensor.id, {
        name: editingSensor.name,
        type: editingSensor.type,
        price: editingSensor.price,
        stock: editingSensor.stock,
        description: editingSensor.description
      });
      
      if (updatedSensor) {
        setSensors(
          sensors.map(sensor => sensor.id === updatedSensor.id ? updatedSensor : sensor)
        );
        setIsEditDialogOpen(false);
      }
    } catch (error) {
      console.error('Error updating sensor:', error);
    }
  };

  const handleDeleteSensor = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this sensor?')) {
      try {
        const success = await InventoryService.deleteSensor(id);
        if (success) {
          setSensors(sensors.filter(sensor => sensor.id !== id));
        }
      } catch (error) {
        console.error('Error deleting sensor:', error);
      }
    }
  };

  const resetForm = () => {
    setName('');
    setType('');
    setPrice('');
    setStock('');
    setDescription('');
  };

  return (
    <div className="animate-fade-in space-y-6 pt-14">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Sensor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Sensor</DialogTitle>
              <DialogDescription>
                Enter the details for the new sensor product.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {sensorTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price ($)
                </Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">
                  Stock
                </Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSensor}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sensor Inventory</CardTitle>
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
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {sensorTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-60">
              <p>Loading inventory data...</p>
            </div>
          ) : filteredSensors.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-60 text-center">
              <PackageOpen className="h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="font-medium text-lg">No sensors found</h3>
              <p className="text-muted-foreground">
                {searchTerm || selectedType !== 'all'
                  ? "Try adjusting your search or filter criteria"
                  : "Add a new sensor to get started"}
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSensors.map((sensor) => (
                    <TableRow key={sensor.id}>
                      <TableCell>{sensor.id}</TableCell>
                      <TableCell className="font-medium">{sensor.name}</TableCell>
                      <TableCell>{sensor.type}</TableCell>
                      <TableCell>${sensor.price.toFixed(2)}</TableCell>
                      <TableCell>{sensor.stock}</TableCell>
                      <TableCell>{sensor.lastUpdated}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setEditingSensor(sensor);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDeleteSensor(sensor.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Sensor Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Sensor</DialogTitle>
            <DialogDescription>
              Update the sensor details.
            </DialogDescription>
          </DialogHeader>
          {editingSensor && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={editingSensor.name}
                  onChange={(e) => setEditingSensor({...editingSensor, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-type" className="text-right">
                  Type
                </Label>
                <Select 
                  value={editingSensor.type} 
                  onValueChange={(value) => setEditingSensor({...editingSensor, type: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sensorTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-price" className="text-right">
                  Price ($)
                </Label>
                <Input
                  id="edit-price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={editingSensor.price}
                  onChange={(e) => setEditingSensor({...editingSensor, price: parseFloat(e.target.value)})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-stock" className="text-right">
                  Stock
                </Label>
                <Input
                  id="edit-stock"
                  type="number"
                  min="0"
                  value={editingSensor.stock}
                  onChange={(e) => setEditingSensor({...editingSensor, stock: parseInt(e.target.value)})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Input
                  id="edit-description"
                  value={editingSensor.description}
                  onChange={(e) => setEditingSensor({...editingSensor, description: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSensor}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Inventory;
