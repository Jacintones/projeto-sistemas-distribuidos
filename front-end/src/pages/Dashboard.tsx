
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, ClipboardList, DollarSign, Clock, Plus, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { title: "Mesas Ocupadas", value: "12/20", icon: Users, color: "bg-blue-500" },
    { title: "Pedidos Ativos", value: "24", icon: ClipboardList, color: "bg-green-500" },
    { title: "Faturamento Hoje", value: "R$ 2.847", icon: DollarSign, color: "bg-orange-500" },
    { title: "Tempo Médio", value: "18 min", icon: Clock, color: "bg-purple-500" },
  ];

  const recentOrders = [
    { table: "Mesa 5", items: "2 Pizzas, 1 Salada", status: "Preparando", time: "5 min" },
    { table: "Mesa 12", items: "3 Hambúrguers", status: "Pronto", time: "2 min" },
    { table: "Mesa 8", items: "1 Lasanha, 2 Bebidas", status: "Entregue", time: "15 min" },
  ];

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
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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
                      <Badge variant={order.status === "Pronto" ? "default" : "secondary"}>
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
                <Button 
                  onClick={() => navigate("/tables")} 
                  className="h-20 flex-col"
                  variant="outline"
                >
                  <Users className="w-8 h-8 mb-2" />
                  Selecionar Mesa
                </Button>
                <Button 
                  onClick={() => navigate("/orders")} 
                  className="h-20 flex-col"
                  variant="outline"
                >
                  <ClipboardList className="w-8 h-8 mb-2" />
                  Ver Pedidos
                </Button>
                <Button 
                  onClick={() => navigate("/admin")} 
                  className="h-20 flex-col"
                  variant="outline"
                >
                  <Settings className="w-8 h-8 mb-2" />
                  Configurações
                </Button>
                <Button 
                  onClick={() => navigate("/login")} 
                  className="h-20 flex-col"
                  variant="outline"
                >
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
