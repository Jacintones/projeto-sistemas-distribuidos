
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Edit, Trash2, Users, ChefHat, UtensilsCrossed } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Staff Management
  const [staff, setStaff] = useState([
    { id: 1, name: "João Silva", role: "Gerente", email: "joao@restaurante.com", status: "active" },
    { id: 2, name: "Maria Santos", role: "Garçonete", email: "maria@restaurante.com", status: "active" },
    { id: 3, name: "Pedro Costa", role: "Cozinheiro", email: "pedro@restaurante.com", status: "active" },
    { id: 4, name: "Ana Lima", role: "Garçonete", email: "ana@restaurante.com", status: "inactive" },
  ]);

  const [newStaff, setNewStaff] = useState({ name: "", role: "", email: "" });

  // Kitchen Management
  const [kitchens, setKitchens] = useState([
    { id: 1, name: "Cozinha Italiana", description: "Pizzas, massas e risotos", active: true },
    { id: 2, name: "Cozinha Regional", description: "Pratos típicos brasileiros", active: true },
    { id: 3, name: "Hamburgueria", description: "Hambúrgueres artesanais", active: true },
    { id: 4, name: "Cozinha Asiática", description: "Pratos orientais", active: false },
  ]);

  const [newKitchen, setNewKitchen] = useState({ name: "", description: "" });

  // Dishes Management
  const [dishes, setDishes] = useState([
    { id: 1, name: "Pizza Margherita", kitchen: "Cozinha Italiana", price: 32.90, active: true },
    { id: 2, name: "Lasanha Bolonhesa", kitchen: "Cozinha Italiana", price: 28.50, active: true },
    { id: 3, name: "Feijoada Completa", kitchen: "Cozinha Regional", price: 35.90, active: true },
    { id: 4, name: "Burger Artesanal", kitchen: "Hamburgueria", price: 24.90, active: false },
  ]);

  const [newDish, setNewDish] = useState({ name: "", kitchen: "", price: "", description: "" });

  // Staff Functions
  const addStaff = () => {
    if (newStaff.name && newStaff.role && newStaff.email) {
      setStaff([...staff, { ...newStaff, id: Date.now(), status: "active" }]);
      setNewStaff({ name: "", role: "", email: "" });
      toast({ title: "Funcionário adicionado com sucesso!" });
    }
  };

  const removeStaff = (id: number) => {
    setStaff(staff.filter(s => s.id !== id));
    toast({ title: "Funcionário removido!" });
  };

  const toggleStaffStatus = (id: number) => {
    setStaff(staff.map(s => 
      s.id === id ? { ...s, status: s.status === "active" ? "inactive" : "active" } : s
    ));
  };

  // Kitchen Functions
  const addKitchen = () => {
    if (newKitchen.name && newKitchen.description) {
      setKitchens([...kitchens, { ...newKitchen, id: Date.now(), active: true }]);
      setNewKitchen({ name: "", description: "" });
      toast({ title: "Cozinha adicionada com sucesso!" });
    }
  };

  const removeKitchen = (id: number) => {
    setKitchens(kitchens.filter(k => k.id !== id));
    toast({ title: "Cozinha removida!" });
  };

  const toggleKitchenStatus = (id: number) => {
    setKitchens(kitchens.map(k => 
      k.id === id ? { ...k, active: !k.active } : k
    ));
  };

  // Dish Functions
  const addDish = () => {
    if (newDish.name && newDish.kitchen && newDish.price) {
      setDishes([...dishes, { 
        ...newDish, 
        id: Date.now(), 
        price: parseFloat(newDish.price),
        active: true 
      }]);
      setNewDish({ name: "", kitchen: "", price: "", description: "" });
      toast({ title: "Prato adicionado com sucesso!" });
    }
  };

  const removeDish = (id: number) => {
    setDishes(dishes.filter(d => d.id !== id));
    toast({ title: "Prato removido!" });
  };

  const toggleDishStatus = (id: number) => {
    setDishes(dishes.map(d => 
      d.id === id ? { ...d, active: !d.active } : d
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/dashboard")}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Painel Administrativo</h1>
            <p className="text-gray-600">Gerencie funcionários, cozinhas e pratos</p>
          </div>
        </div>

        <Tabs defaultValue="staff" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="staff" className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Funcionários
            </TabsTrigger>
            <TabsTrigger value="kitchens" className="flex items-center">
              <ChefHat className="w-4 h-4 mr-2" />
              Cozinhas
            </TabsTrigger>
            <TabsTrigger value="dishes" className="flex items-center">
              <UtensilsCrossed className="w-4 h-4 mr-2" />
              Pratos
            </TabsTrigger>
          </TabsList>

          {/* Staff Management */}
          <TabsContent value="staff">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Lista de Funcionários</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {staff.map((employee) => (
                        <div key={employee.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h3 className="font-semibold text-gray-800">{employee.name}</h3>
                            <p className="text-sm text-gray-600">{employee.role}</p>
                            <p className="text-sm text-gray-500">{employee.email}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={employee.status === "active" ? "default" : "secondary"}>
                              {employee.status === "active" ? "Ativo" : "Inativo"}
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleStaffStatus(employee.id)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeStaff(employee.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Adicionar Funcionário</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="staff-name">Nome</Label>
                    <Input
                      id="staff-name"
                      value={newStaff.name}
                      onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                      placeholder="Nome completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="staff-role">Cargo</Label>
                    <Input
                      id="staff-role"
                      value={newStaff.role}
                      onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                      placeholder="Ex: Garçom, Cozinheiro"
                    />
                  </div>
                  <div>
                    <Label htmlFor="staff-email">Email</Label>
                    <Input
                      id="staff-email"
                      type="email"
                      value={newStaff.email}
                      onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <Button onClick={addStaff} className="w-full restaurant-gradient text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Funcionário
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Kitchen Management */}
          <TabsContent value="kitchens">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Cozinhas Disponíveis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {kitchens.map((kitchen) => (
                        <div key={kitchen.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h3 className="font-semibold text-gray-800">{kitchen.name}</h3>
                            <p className="text-sm text-gray-600">{kitchen.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={kitchen.active ? "default" : "secondary"}>
                              {kitchen.active ? "Ativa" : "Inativa"}
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleKitchenStatus(kitchen.id)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeKitchen(kitchen.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Adicionar Cozinha</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="kitchen-name">Nome da Cozinha</Label>
                    <Input
                      id="kitchen-name"
                      value={newKitchen.name}
                      onChange={(e) => setNewKitchen({...newKitchen, name: e.target.value})}
                      placeholder="Ex: Cozinha Japonesa"
                    />
                  </div>
                  <div>
                    <Label htmlFor="kitchen-description">Descrição</Label>
                    <Input
                      id="kitchen-description"
                      value={newKitchen.description}
                      onChange={(e) => setNewKitchen({...newKitchen, description: e.target.value})}
                      placeholder="Descreva os tipos de pratos"
                    />
                  </div>
                  <Button onClick={addKitchen} className="w-full restaurant-gradient text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Cozinha
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Dishes Management */}
          <TabsContent value="dishes">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Pratos do Cardápio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dishes.map((dish) => (
                        <div key={dish.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h3 className="font-semibold text-gray-800">{dish.name}</h3>
                            <p className="text-sm text-gray-600">{dish.kitchen}</p>
                            <p className="text-lg font-bold text-orange-600">R$ {dish.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={dish.active ? "default" : "secondary"}>
                              {dish.active ? "Ativo" : "Inativo"}
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleDishStatus(dish.id)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeDish(dish.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Adicionar Prato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="dish-name">Nome do Prato</Label>
                    <Input
                      id="dish-name"
                      value={newDish.name}
                      onChange={(e) => setNewDish({...newDish, name: e.target.value})}
                      placeholder="Ex: Salmão Grelhado"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dish-kitchen">Cozinha</Label>
                    <select
                      id="dish-kitchen"
                      value={newDish.kitchen}
                      onChange={(e) => setNewDish({...newDish, kitchen: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Selecione a cozinha</option>
                      {kitchens.filter(k => k.active).map(kitchen => (
                        <option key={kitchen.id} value={kitchen.name}>{kitchen.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="dish-price">Preço (R$)</Label>
                    <Input
                      id="dish-price"
                      type="number"
                      step="0.01"
                      value={newDish.price}
                      onChange={(e) => setNewDish({...newDish, price: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                  <Button onClick={addDish} className="w-full restaurant-gradient text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Prato
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
