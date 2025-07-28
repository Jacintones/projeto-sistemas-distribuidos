
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Minus, Plus, Trash2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const navigate = useNavigate();
  const { tableId } = useParams();
  const { toast } = useToast();
  
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Pizza Margherita", price: 32.90, quantity: 1, image: "🍕" },
    { id: 7, name: "Burger Artesanal", price: 24.90, quantity: 2, image: "🍔" },
    { id: 10, name: "Refrigerante", price: 6.90, quantity: 3, image: "🥤" },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTax = () => getSubtotal() * 0.1; // 10% service fee
  const getTotal = () => getSubtotal() + getTax();

  const handleSendOrder = () => {
    toast({
      title: "Pedido enviado!",
      description: `Pedido da Mesa ${tableId} foi encaminhado para a cozinha.`,
    });
    setTimeout(() => {
      navigate("/orders");
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate(`/menu/${tableId}`)}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Cardápio
            </Button>
            <h1 className="text-3xl font-bold text-gray-800">Carrinho - Mesa {tableId}</h1>
          </div>
          
          <Card className="text-center p-12">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Carrinho Vazio</h2>
            <p className="text-gray-600 mb-6">Adicione itens do cardápio para começar o pedido</p>
            <Button 
              onClick={() => navigate(`/menu/${tableId}`)}
              className="restaurant-gradient text-white"
            >
              Ver Cardápio
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/menu/${tableId}`)}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Cardápio
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Carrinho - Mesa {tableId}</h1>
            <p className="text-gray-600">Revise seu pedido antes de enviar</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Itens do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{item.image}</div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-gray-600">R$ {item.price.toFixed(2)} cada</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <Badge variant="secondary" className="font-bold">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </Badge>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R$ {getSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxa de Serviço (10%):</span>
                    <span>R$ {getTax().toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>R$ {getTotal().toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Mesa: {tableId}</p>
                  <p>• Itens: {cartItems.length}</p>
                  <p>• Quantidade: {cartItems.reduce((total, item) => total + item.quantity, 0)}</p>
                </div>

                <Button 
                  onClick={handleSendOrder}
                  className="w-full restaurant-gradient text-white text-lg py-6"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Enviar Pedido
                </Button>

                <Button 
                  onClick={() => navigate(`/menu/${tableId}`)}
                  variant="outline"
                  className="w-full"
                >
                  Adicionar Mais Itens
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
