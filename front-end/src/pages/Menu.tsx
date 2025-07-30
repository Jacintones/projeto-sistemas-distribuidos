
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, ShoppingCart, ChefHat } from "lucide-react";

const Menu = () => {
  const navigate = useNavigate();
  const { tableId } = useParams();
  const [cart, setCart] = useState<any[]>([]);

  const menuData = {
    "Cozinha Italiana": [
      { id: 1, name: "Pizza Margherita", price: 32.90, description: "Molho de tomate, mussarela, manjericão fresco", image: "🍕" },
      { id: 2, name: "Lasanha Bolonhesa", price: 28.50, description: "Massa, molho bolonhesa, queijo gratinado", image: "🍝" },
      { id: 3, name: "Risotto de Camarão", price: 42.90, description: "Arroz arbóreo, camarões, vinho branco", image: "🍚" },
    ],
    "Cozinha Regional": [
      { id: 4, name: "Feijoada Completa", price: 35.90, description: "Feijão preto, carnes variadas, acompanhamentos", image: "🍲" },
      { id: 5, name: "Picanha Grelhada", price: 48.90, description: "300g de picanha, arroz, feijão, vinagrete", image: "🥩" },
      { id: 6, name: "Moqueca de Peixe", price: 38.90, description: "Peixe fresco, leite de coco, dendê, pirão", image: "🐟" },
    ],
    "Hamburgueria": [
      { id: 7, name: "Burger Artesanal", price: 24.90, description: "180g de carne, queijo, alface, tomate, batata", image: "🍔" },
      { id: 8, name: "Chicken Burger", price: 22.90, description: "Frango grelhado, maionese especial, salada", image: "🍗" },
      { id: 9, name: "Veggie Burger", price: 21.90, description: "Hambúrguer vegetal, queijo, vegetais frescos", image: "🥗" },
    ],
    "Bebidas": [
      { id: 10, name: "Refrigerante", price: 6.90, description: "Coca-Cola, Guaraná, Sprite - 350ml", image: "🥤" },
      { id: 11, name: "Suco Natural", price: 8.90, description: "Laranja, Acerola, Maracujá - 400ml", image: "🧃" },
      { id: 12, name: "Água Mineral", price: 4.90, description: "Com ou sem gás - 500ml", image: "💧" },
    ],
  };

  const addToCart = (item: any) => {
    setCart([...cart, { ...item, quantity: 1, tableId }]);
  };

  const getTotalItems = () => cart.length;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button 
              variant="outline" 
              onClick={() => navigate("/tables")}
              className="mr-4"z
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Cardápio - Mesa {tableId}</h1>
              <p className="text-gray-600">Selecione os itens para o pedido</p>
            </div>
          </div>
          <Button 
            onClick={() => navigate(`/cart/${tableId}`)}
            className="restaurant-gradient text-white relative"
            disabled={cart.length === 0}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Carrinho ({getTotalItems()})
          </Button>
        </div>

        {/* Menu Tabs */}
        <Tabs defaultValue="Cozinha Italiana" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            {Object.keys(menuData).map((kitchen) => (
              <TabsTrigger key={kitchen} value={kitchen} className="flex items-center">
                <ChefHat className="w-4 h-4 mr-2" />
                {kitchen}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(menuData).map(([kitchen, items]) => (
            <TabsContent key={kitchen} value={kitchen}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <Card key={item.id} className="card-hover">
                    <CardHeader className="pb-4">
                      <div className="text-center mb-4">
                        <div className="text-6xl mb-2">{item.image}</div>
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                      </div>
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

        {/* Floating Cart Button for Mobile */}
        {cart.length > 0 && (
          <div className="fixed bottom-6 right-6 md:hidden">
            <Button
              onClick={() => navigate(`/cart/${tableId}`)}
              className="restaurant-gradient text-white rounded-full w-16 h-16 shadow-lg"
            >
              <ShoppingCart className="w-6 h-6" />
              <Badge className="absolute -top-2 -right-2 bg-red-500">
                {getTotalItems()}
              </Badge>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
