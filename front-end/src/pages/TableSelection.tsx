
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Clock } from "lucide-react";

const TableSelection = () => {
  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  const tables = [
    { id: 1, seats: 2, status: "available", orderTime: null },
    { id: 2, seats: 4, status: "occupied", orderTime: "15 min" },
    { id: 3, seats: 6, status: "available", orderTime: null },
    { id: 4, seats: 2, status: "occupied", orderTime: "32 min" },
    { id: 5, seats: 4, status: "available", orderTime: null },
    { id: 6, seats: 8, status: "reserved", orderTime: "19:30" },
    { id: 7, seats: 2, status: "available", orderTime: null },
    { id: 8, seats: 4, status: "occupied", orderTime: "8 min" },
    { id: 9, seats: 6, status: "available", orderTime: null },
    { id: 10, seats: 4, status: "available", orderTime: null },
    { id: 11, seats: 2, status: "occupied", orderTime: "25 min" },
    { id: 12, seats: 8, status: "available", orderTime: null },
  ];

  const getTableColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 border-green-300 hover:bg-green-200";
      case "occupied": return "bg-red-100 border-red-300";
      case "reserved": return "bg-yellow-100 border-yellow-300";
      default: return "bg-gray-100 border-gray-300";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available": return <Badge className="bg-green-500">Disponível</Badge>;
      case "occupied": return <Badge className="bg-red-500">Ocupada</Badge>;
      case "reserved": return <Badge className="bg-yellow-500">Reservada</Badge>;
      default: return <Badge>Desconhecido</Badge>;
    }
  };

  const handleTableSelect = (tableId: number, status: string) => {
    if (status === "available") {
      setSelectedTable(tableId);
      navigate(`/menu/${tableId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/dashboard")}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Selecionar Mesa</h1>
            <p className="text-gray-600">Escolha uma mesa para fazer o pedido</p>
          </div>
        </div>

        {/* Legend */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                <span className="text-sm">Disponível</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                <span className="text-sm">Ocupada</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                <span className="text-sm">Reservada</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tables Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tables.map((table) => (
            <Card
              key={table.id}
              className={`cursor-pointer transition-all duration-200 ${getTableColor(table.status)} ${
                table.status === "available" ? "hover:shadow-lg hover:-translate-y-1" : "cursor-not-allowed opacity-75"
              }`}
              onClick={() => handleTableSelect(table.id, table.status)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Mesa {table.id}</CardTitle>
                  {getStatusBadge(table.status)}
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    <span className="text-sm">{table.seats} lugares</span>
                  </div>
                  {table.orderTime && (
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{table.orderTime}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {tables.filter(t => t.status === "available").length}
                </p>
                <p className="text-gray-600">Mesas Disponíveis</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">
                  {tables.filter(t => t.status === "occupied").length}
                </p>
                <p className="text-gray-600">Mesas Ocupadas</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">
                  {tables.filter(t => t.status === "reserved").length}
                </p>
                <p className="text-gray-600">Mesas Reservadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TableSelection;
