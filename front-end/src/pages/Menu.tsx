import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, ShoppingCart, ChefHat } from "lucide-react";

const BASE_URL = "http://localhost:8081";

const Menu = () => {
  const navigate = useNavigate();
  const { tableId } = useParams();
  const [cart, setCart] = useState<any[]>([]);
  const [menuData, setMenuData] = useState<Record<string, any[]>>({});

  const addToCart = (item: any) => {
    setCart([...cart, { ...item, quantity: 1, tableId }]);
  };

  const getTotalItems = () => cart.length;

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`${BASE_URL}/cozinha/api/cozinha`);
        const data = await res.json();

        const formatted = data.reduce((acc: Record<string, any[]>, kitchen: any) => {
          acc[kitchen.name] = kitchen.plates.map((plate: any) => ({
            id: plate.plate_ID,
            name: plate.name,
            price: plate.price,
            description: plate.description,
            image: "🍽️",
          }));
          return acc;
        }, {});

        setMenuData(formatted);
      } catch (error) {
        console.error("Erro ao buscar cardápio:", error);
      }
    };

    fetchMenu();
  }, []);

  const kitchenNames = Object.keys(menuData);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="outline" onClick={() => navigate("/tables")} className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Cardápio - Mesa {tableId}</h1>
              <p className="text-gray-600">Selecione os itens para o pedido</p>
            </div>
          </div>
          <Button
            onClick={() => navigate(`/cart/${tableId}`, { state: { cart } })}
            className="restaurant-gradient text-white relative"
            disabled={cart.length === 0}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Carrinho ({getTotalItems()})
          </Button>

        </div>

        {kitchenNames.length > 0 ? (
          <Tabs defaultValue={kitchenNames[0]} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              {kitchenNames.map((kitchen) => (
                <TabsTrigger key={kitchen} value={kitchen} className="flex items-center">
                  <ChefHat className="w-4 h-4 mr-2" />
                  {kitchen}
                </TabsTrigger>
              ))}
            </TabsList>

            {kitchenNames.map((kitchen) => (
              <TabsContent key={kitchen} value={kitchen}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuData[kitchen].map((item) => (
                    <Card key={item.id} className="card-hover">
                      <CardHeader className="pb-4 text-center">
                        <div className="text-6xl mb-2">{item.image}</div>
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-lg font-bold">
                            R$ {item.price.toFixed(2)}
                          </Badge>
                          <Button
                            onClick={() => addToCart(item)}
                            size="sm"
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Adicionar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <p className="text-center text-gray-500 mt-10">Nenhuma cozinha disponível no momento.</p>
        )}

        {cart.length > 0 && (
          <div className="fixed bottom-6 right-6 md:hidden">
            <Button
              onClick={() => navigate(`/cart/${tableId}`)}
              className="restaurant-gradient text-white rounded-full w-16 h-16 shadow-lg"
            >
              <ShoppingCart className="w-6 h-6" />
              <Badge className="absolute -top-2 -right-2 bg-red-500">{getTotalItems()}</Badge>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
