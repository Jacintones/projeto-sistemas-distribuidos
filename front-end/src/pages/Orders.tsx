
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Clock, CheckCircle, XCircle, Users } from "lucide-react";

const Orders = () => {
  const navigate = useNavigate();
  
  const [orders, setOrders] = useState([
    {
      id: 1,
      table: 5,
      items: ["2x Pizza Margherita", "1x Coca-Cola"],
      status: "preparing",
      time: "15:30",
      total: 72.70,
      waitTime: "12 min"
    },
    {
      id: 2,
      table: 12,
      items: ["3x Burger Artesanal", "2x Batata Frita"],
      status: "ready",
      time: "15:25",
      total: 89.70,
      waitTime: "18 min"
    },
    {
      id: 3,
      table: 8,
      items: ["1x Lasanha Bolonhesa", "2x Refrigerante"],
      status: "delivered",
      time: "15:15",
      total: 42.30,
      waitTime: "25 min"
    },
    {
      id: 4,
      table: 3,
      items: ["1x Feijoada Completa", "1x Suco Natural"],
      status: "preparing",
      time: "15:35",
      total: 44.80,
      waitTime: "8 min"
    },
    {
      id: 5,
      table: 15,
      items: ["2x Chicken Burger", "3x Coca-Cola"],
      status: "ready",
      time: "15:20",
      total: 66.40,
      waitTime: "22 min"
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing": return "bg-yellow-500";
      case "ready": return "bg-green-500";
      case "delivered": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "preparing": return "Preparando";
      case "ready": return "Pronto";
      case "delivered": return "Entregue";
      default: return "Desconhecido";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "preparing": return <Clock className="w-4 h-4" />;
      case "ready": return <CheckCircle className="w-4 h-4" />;
      case "delivered": return <CheckCircle className="w-4 h-4" />;
      default: return <XCircle className="w-4 h-4" />;
    }
  };

  const updateOrderStatus = (orderId: number, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filterOrdersByStatus = (status: string) => {
    return orders.filter(order => order.status === status);
  };

  const getOrderCounts = () => {
    return {
      preparing: orders.filter(o => o.status === "preparing").length,
      ready: orders.filter(o => o.status === "ready").length,
      delivered: orders.filter(o => o.status === "delivered").length,
    };
  };

  const counts = getOrderCounts();

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
            <h1 className="text-3xl font-bold text-gray-800">Gestão de Pedidos</h1>
            <p className="text-gray-600">Acompanhe todos os pedidos em tempo real</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600">{counts.preparing}</div>
              <p className="text-gray-600">Preparando</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600">{counts.ready}</div>
              <p className="text-gray-600">Prontos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">{counts.delivered}</div>
              <p className="text-gray-600">Entregues</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">Todos ({orders.length})</TabsTrigger>
            <TabsTrigger value="preparing">Preparando ({counts.preparing})</TabsTrigger>
            <TabsTrigger value="ready">Prontos ({counts.ready})</TabsTrigger>
            <TabsTrigger value="delivered">Entregues ({counts.delivered})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((order) => (
                <Card key={order.id} className="card-hover">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        Mesa {order.table}
                      </CardTitle>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{getStatusText(order.status)}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-sm text-gray-600 mb-1">Itens:</p>
                        {order.items.map((item, index) => (
                          <p key={index} className="text-sm text-gray-800">• {item}</p>
                        ))}
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Horário:</span>
                        <span className="font-semibold">{order.time}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tempo:</span>
                        <span className="font-semibold">{order.waitTime}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total:</span>
                        <span className="font-bold text-lg">R$ {order.total.toFixed(2)}</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-4">
                        {order.status === "preparing" && (
                          <Button 
                            onClick={() => updateOrderStatus(order.id, "ready")}
                            size="sm" 
                            className="bg-green-500 hover:bg-green-600 flex-1"
                          >
                            Marcar Pronto
                          </Button>
                        )}
                        {order.status === "ready" && (
                          <Button 
                            onClick={() => updateOrderStatus(order.id, "delivered")}
                            size="sm" 
                            className="bg-blue-500 hover:bg-blue-600 flex-1"
                          >
                            Marcar Entregue
                          </Button>
                        )}
                        {order.status === "delivered" && (
                          <Badge variant="secondary" className="flex-1 justify-center py-2">
                            Concluído
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="preparing">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterOrdersByStatus("preparing").map((order) => (
                <Card key={order.id} className="card-hover border-yellow-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center text-yellow-700">
                      <Users className="w-5 h-5 mr-2" />
                      Mesa {order.table}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        {order.items.map((item, index) => (
                          <p key={index} className="text-sm text-gray-800">• {item}</p>
                        ))}
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tempo de preparo:</span>
                        <span className="font-bold text-yellow-600">{order.waitTime}</span>
                      </div>
                      <Button 
                        onClick={() => updateOrderStatus(order.id, "ready")}
                        className="w-full bg-green-500 hover:bg-green-600"
                      >
                        Marcar como Pronto
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ready">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterOrdersByStatus("ready").map((order) => (
                <Card key={order.id} className="card-hover border-green-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center text-green-700">
                      <Users className="w-5 h-5 mr-2" />
                      Mesa {order.table}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        {order.items.map((item, index) => (
                          <p key={index} className="text-sm text-gray-800">• {item}</p>
                        ))}
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Aguardando entrega:</span>
                        <span className="font-bold text-green-600">{order.waitTime}</span>
                      </div>
                      <Button 
                        onClick={() => updateOrderStatus(order.id, "delivered")}
                        className="w-full bg-blue-500 hover:bg-blue-600"
                      >
                        Marcar como Entregue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="delivered">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterOrdersByStatus("delivered").map((order) => (
                <Card key={order.id} className="border-blue-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center text-blue-700">
                      <Users className="w-5 h-5 mr-2" />
                      Mesa {order.table}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        {order.items.map((item, index) => (
                          <p key={index} className="text-sm text-gray-800">• {item}</p>
                        ))}
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Entregue em:</span>
                        <span className="font-bold">{order.time}</span>
                      </div>
                      <Badge variant="secondary" className="w-full justify-center py-2">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Pedido Concluído
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Orders;
