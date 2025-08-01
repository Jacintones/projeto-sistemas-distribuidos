import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Clock, CheckCircle, XCircle, Users } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const statusMap = {
    CRIADO: "preparing",
    ENVIADO_COZINHA: "preparing",
    EM_PREPARO: "preparing",
    PRONTO: "ready",
    ENTREGUE: "delivered",
    PAGO: "delivered",
  };

  const reverseStatusMap = {
    preparing: "EM_PREPARO",
    ready: "PRONTO",
    delivered: "ENTREGUE",
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/comanda/api/comandas")
      .then((response) => {
        if (Array.isArray(response.data)) {
          const mappedOrders = response.data.map((order: any) => ({
            id: order.id,
            table: order.mesa?.numero || "-",
            waiter: order.garcomResponsavel,
            items: order.itens || [],
            time: new Date(order.criadoEm).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            waitTime: "--",
            total: 0.0,
            status: statusMap[order.status] || "unknown",
          }));
          setOrders(mappedOrders);
        } else {
          setOrders([]);
        }
        setLoading(false);
      })
      .catch(() => {
        toast.error("Erro ao carregar pedidos");
        setLoading(false);
      });
  }, []);

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    const statusToSend = reverseStatusMap[newStatus];
    if (!statusToSend) {
      toast.error("Status inválido para atualização.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8081/comanda/api/comandas/${orderId}/status`,
        JSON.stringify(statusToSend),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setOrders((orders) =>
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success("Status atualizado com sucesso");
    } catch (error) {
      toast.error("Erro ao atualizar status");
    }
  };

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
      case "ready":
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <XCircle className="w-4 h-4" />;
    }
  };

  const getOrderCounts = () => ({
    preparing: orders.filter((o) => o.status === "preparing").length,
    ready: orders.filter((o) => o.status === "ready").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
  });

  const counts = getOrderCounts();

  if (loading) return <div>Carregando pedidos...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="outline" onClick={() => navigate("/dashboard")} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Gestão de Pedidos</h1>
            <p className="text-gray-600">Acompanhe todos os pedidos em tempo real</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card><CardContent className="p-6 text-center"><div className="text-3xl font-bold text-yellow-600">{counts.preparing}</div><p className="text-gray-600">Preparando</p></CardContent></Card>
          <Card><CardContent className="p-6 text-center"><div className="text-3xl font-bold text-green-600">{counts.ready}</div><p className="text-gray-600">Prontos</p></CardContent></Card>
          <Card><CardContent className="p-6 text-center"><div className="text-3xl font-bold text-blue-600">{counts.delivered}</div><p className="text-gray-600">Entregues</p></CardContent></Card>
        </div>

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
                        <Users className="w-5 h-5 mr-2" /> Mesa {order.table}
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
                        {order.items.map((item: string, index: number) => (
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
                      <div className="flex gap-2 mt-4">
                        {order.status === "preparing" && (
                          <Button onClick={() => updateOrderStatus(order.id, "ready")} size="sm" className="bg-green-500 hover:bg-green-600 flex-1">
                            Marcar Pronto
                          </Button>
                        )}
                        {order.status === "ready" && (
                          <Button onClick={() => updateOrderStatus(order.id, "delivered")} size="sm" className="bg-blue-500 hover:bg-blue-600 flex-1">
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
        </Tabs>
      </div>
    </div>
  );
};

export default Orders;
