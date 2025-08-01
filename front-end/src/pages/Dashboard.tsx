import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, ClipboardList, DollarSign, Clock, Plus, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [comandas, setComandas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8081/comanda/api/comandas")
      .then((res) => setComandas(res.data || []))
      .catch(() => setComandas([]))
      .finally(() => setLoading(false));
  }, []);

  const recentOrders = comandas.slice(0, 3).map((c) => ({
    table: `Mesa ${c.mesa?.numero || "?"}`,
    items: (c.itens || []).join(", "),
    status: c.status,
    time: `${Math.round((new Date().getTime() - new Date(c.criadoEm).getTime()) / 60000)} min`,
  }));

  if (loading) return <div className="p-4 text-gray-600">Carregando dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600">Visão geral do restaurante</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate("/admin")} variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Admin
            </Button>
            <Button onClick={() => navigate("/tables")} className="restaurant-gradient text-white">
              <Plus className="w-4 h-4 mr-2" />
              Novo Pedido
            </Button>
            <Button onClick={() => navigate("/entregas")} className="restaurant-gradient text-white">
              <Plus className="w-4 h-4 mr-2" />
              Fazer entrega
            </Button>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ClipboardList className="w-5 h-5 mr-2" />
                Pedidos Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800">{order.table}</p>
                      <p className="text-sm text-gray-600">{order.items}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={order.status === "PRONTO" ? "default" : "secondary"}>
                        {order.status}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{order.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={() => navigate("/tables")} className="h-20 flex-col" variant="outline">
                  <Users className="w-8 h-8 mb-2" />
                  Selecionar Mesa
                </Button>
                <Button onClick={() => navigate("/orders")} className="h-20 flex-col" variant="outline">
                  <ClipboardList className="w-8 h-8 mb-2" />
                  Ver Pedidos
                </Button>
                <Button onClick={() => navigate("/admin")} className="h-20 flex-col" variant="outline">
                  <Settings className="w-8 h-8 mb-2" />
                  Configurações
                </Button>
                <Button onClick={() => navigate("/login")} className="h-20 flex-col" variant="outline">
                  <Users className="w-8 h-8 mb-2" />
                  Sair
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
