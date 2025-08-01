import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Edit, Trash2, ChefHat, UtensilsCrossed } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [kitchens, setKitchens] = useState<any[]>([]);
  const [dishes, setDishes] = useState<any[]>([]);

  const [newKitchen, setNewKitchen] = useState({ name: "", description: "" });
  const [newDish, setNewDish] = useState({
    name: "",
    kitchen: "",
    price: "",
    description: "",
    recipe: "",
  });
  const removeKitchen = (id: number) => {
    fetch(`http://localhost:8081/cozinha/api/cozinha/id=${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok && res.status !== 204) {
          throw new Error("Erro ao remover cozinha");
        }
        setKitchens(kitchens.filter((k) => k.id !== id));
        toast({ title: "Cozinha removida com sucesso!" });
      })
      .catch(() => {
        toast({ title: "Erro ao remover cozinha", variant: "destructive" });
      });
  };


  const toggleKitchenStatus = (id: number) => {
    setKitchens(kitchens.map(k =>
      k.id === id ? { ...k, active: !k.active } : k
    ));
  };

  const addKitchen = () => {
    if (newKitchen.name && newKitchen.description) {
      fetch("http://localhost:8081/cozinha/api/cozinha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newKitchen),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao criar cozinha");
          return res.text();
        })
        .then(() => {
          setNewKitchen({ name: "", description: "" });
          toast({ title: "Cozinha adicionada com sucesso!" });
          fetchKitchens();
        })
        .catch(() => {
          toast({ title: "Erro ao adicionar cozinha", variant: "destructive" });
        });
    }
  };

  const fetchKitchens = () => {
    fetch("http://localhost:8081/cozinha/api/cozinha")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((k: any) => ({
          id: k.kitchen_ID,
          name: k.name,
          description: k.description,
          active: true,
          plates: k.plates.map((p: any) => ({
            id: p.plate_ID,
            name: p.name,
            kitchen: k.name,
            price: p.price,
            active: p.available,
          })),
        }));
        setKitchens(formatted);
        setDishes(formatted.flatMap(k => k.plates));
      })
      .catch(() => {
        toast({ title: "Erro ao carregar cozinhas", variant: "destructive" });
      });
  };

  useEffect(() => {
    fetchKitchens();
  }, []);

  const addDish = () => {
    if (newDish.name && newDish.kitchen && newDish.price) {
      const selectedKitchen = kitchens.find(k => k.name === newDish.kitchen);
      if (!selectedKitchen) {
        toast({ title: "Cozinha não encontrada", variant: "destructive" });
        return;
      }

      const dishPayload = {
        name: newDish.name,
        description: newDish.description || "",
        recipe: newDish.recipe || "",
        price: parseFloat(newDish.price),
        kitchen_ID: selectedKitchen.id,
        ingredients: { "1": 10, "2": 20 }
      };

      fetch("http://localhost:8081/cozinha/api/prato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dishPayload),
      })
        .then(async (res) => {
          if (!res.ok) throw new Error("Erro ao criar prato");
          await res.text();
          return;
        })
        .then(() => {
          setNewDish({
            name: "",
            kitchen: "",
            price: "",
            description: "",
            recipe: "",
          });
          toast({ title: "Prato adicionado com sucesso!" });
          fetchKitchens(); 
        })
        .catch(() => {
          toast({ title: "Erro ao adicionar prato", variant: "destructive" });
        });
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

  useEffect(() => {
    fetch("http://localhost:8081/cozinha/api/cozinha")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((k: any) => ({
          id: k.kitchen_ID,
          name: k.name,
          description: k.description,
          active: true,
          plates: k.plates.map((p: any) => ({
            id: p.plate_ID,
            name: p.name,
            kitchen: k.name,
            price: p.price,
            active: p.available,
          }))
        }));

        setKitchens(formatted);
        const allPlates = formatted.flatMap(k => k.plates);
        setDishes(allPlates);
      })
      .catch(() => {
        toast({ title: "Erro ao carregar cozinhas", variant: "destructive" });
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="outline" onClick={() => navigate("/dashboard")} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Painel Administrativo</h1>
            <p className="text-gray-600">Gerencie funcionários, cozinhas e pratos</p>
          </div>
        </div>

        <Tabs defaultValue="kitchens" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="kitchens" className="flex items-center">
              <ChefHat className="w-4 h-4 mr-2" />
              Cozinhas
            </TabsTrigger>
            <TabsTrigger value="dishes" className="flex items-center">
              <UtensilsCrossed className="w-4 h-4 mr-2" />
              Pratos
            </TabsTrigger>
          </TabsList>

          {/* Cozinhas */}
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
                            <Button size="sm" variant="outline" onClick={() => toggleKitchenStatus(kitchen.id)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => removeKitchen(kitchen.id)} className="text-red-600 hover:text-red-700">
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
                      onChange={(e) => setNewKitchen({ ...newKitchen, name: e.target.value })}
                      placeholder="Ex: Cozinha Japonesa"
                    />
                  </div>
                  <div>
                    <Label htmlFor="kitchen-description">Descrição</Label>
                    <Input
                      id="kitchen-description"
                      value={newKitchen.description}
                      onChange={(e) => setNewKitchen({ ...newKitchen, description: e.target.value })}
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

          {/* Pratos */}
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
                            <Button size="sm" variant="outline" onClick={() => toggleDishStatus(dish.id)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => removeDish(dish.id)} className="text-red-600 hover:text-red-700">
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
                      onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                      placeholder="Ex: Salmão Grelhado"
                    />
                  </div>

                  <div>
                    <Label htmlFor="dish-description">Descrição</Label>
                    <Input
                      id="dish-description"
                      value={newDish.description}
                      onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                      placeholder="Descrição breve do prato"
                    />
                  </div>

                  <div>
                    <Label htmlFor="dish-recipe">Receita</Label>
                    <Input
                      id="dish-recipe"
                      value={newDish.recipe || ""}
                      onChange={(e) => setNewDish({ ...newDish, recipe: e.target.value })}
                      placeholder="Ex: Grelhado com molho de laranja"
                    />
                  </div>

                  <div>
                    <Label htmlFor="dish-kitchen">Cozinha</Label>
                    <select
                      id="dish-kitchen"
                      value={newDish.kitchen}
                      onChange={(e) => setNewDish({ ...newDish, kitchen: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Selecione a cozinha</option>
                      {kitchens.filter(k => k.active).map(k => (
                        <option key={k.id} value={k.name}>{k.name}</option>
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
                      onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
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
