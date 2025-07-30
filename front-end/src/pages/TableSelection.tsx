import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users } from "lucide-react";

type Mesa = {
  id: number;
  numero: string;
  ocupada: boolean;
  assentos: number;
};

const TableSelection = () => {
  const navigate = useNavigate();
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTable, setNewTable] = useState<Mesa>({
    id: 0,
    numero: "",
    ocupada: false,
    assentos: 2,
  });

  useEffect(() => {
    const mesasIniciais = [
      { id: 1, numero: "1", ocupada: true, assentos: 4 },
      { id: 2, numero: "2", ocupada: false, assentos: 2 },
      { id: 3, numero: "3", ocupada: false, assentos: 6 },
      { id: 4, numero: "4", ocupada: true, assentos: 4 },
    ];
    setMesas(mesasIniciais); 
  }, []);

  const getStatusBadge = (mesa: Mesa) =>
    mesa.ocupada ? (
      <Badge className="bg-red-500">Ocupada</Badge>
    ) : (
      <Badge className="bg-green-500">Disponível</Badge>
    );

  const getTableStyle = (ocupada: boolean) =>
    ocupada
      ? "bg-red-100 border-red-300 cursor-not-allowed opacity-75"
      : "bg-green-100 border-green-300 hover:bg-green-200 hover:shadow-lg hover:-translate-y-1";

  const handleTableSelect = (mesa: Mesa) => {
    if (!mesa.ocupada) {
      navigate(`/menu/${mesa.id}`);
    }
  };

  const handleStatusToggle = (mesa: Mesa) => {
    const updatedMesa = { ...mesa, ocupada: !mesa.ocupada };
    setMesas((prevMesas) =>
      prevMesas.map((m) => (m.id === mesa.id ? updatedMesa : m))
    );
  };

  const handleAddTable = () => {
    const tableToAdd = { ...newTable };

    if (!newTable.numero || !newTable.assentos) return;

    // Simulando a adição da nova mesa diretamente no estado
    setMesas((prevMesas) => [
      ...prevMesas,
      { ...tableToAdd, id: prevMesas.length + 1 }, // Definindo id único
    ]);

    setShowAddForm(false);
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

        {/* Botão de Adicionar Mesa */}
        <Button
          className="mb-4 restaurant-gradient text-white"
          onClick={() => setShowAddForm(true)}
        >
          Adicionar Nova Mesa
        </Button>

        {/* Formulário de Adição de Mesa */}
        {showAddForm && (
          <Card className="mb-8 p-4">
            <CardHeader>
              <CardTitle>Adicionar Nova Mesa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="numero" className="block text-sm font-medium text-gray-600">
                    Número da Mesa
                  </label>
                  <input
                    type="text"
                    id="numero"
                    value={newTable.numero}
                    onChange={(e) => setNewTable({ ...newTable, numero: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="assentos" className="block text-sm font-medium text-gray-600">
                    Número de Assentos
                  </label>
                  <input
                    type="number"
                    id="assentos"
                    value={newTable.assentos}
                    onChange={(e) => setNewTable({ ...newTable, assentos: parseInt(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="ocupada" className="block text-sm font-medium text-gray-600">
                    Status
                  </label>
                  <select
                    id="ocupada"
                    value={newTable.ocupada ? "ocupada" : "disponivel"}
                    onChange={(e) => setNewTable({ ...newTable, ocupada: e.target.value === "ocupada" })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="disponivel">Disponível</option>
                    <option value="ocupada">Ocupada</option>
                  </select>
                </div>

                <Button
                  onClick={handleAddTable}
                  className="w-full restaurant-gradient text-white"
                >
                  Adicionar Mesa
                </Button>
                <Button
                  onClick={() => setShowAddForm(false)}
                  variant="outline"
                  className="w-full mt-2"
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Grid de mesas */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mesas.map((mesa) => (
            <Card
              key={mesa.id}
              onClick={() => handleTableSelect(mesa)}
              className={`transition-all duration-200 cursor-pointer ${getTableStyle(
                mesa.ocupada
              )}`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Mesa {mesa.numero}</CardTitle>
                  {getStatusBadge(mesa)}
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-1" />
                  <span className="text-sm">
                    {mesa.assentos} assento{mesa.assentos !== 1 && "s"}
                  </span>
                </div>
                <div className="mt-4">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation(); // Impede o clique do botão de acionar o onClick do card
                      handleStatusToggle(mesa);
                    }}
                    className="w-full"
                    variant={mesa.ocupada ? "outline" : "default"}
                  >
                    {mesa.ocupada ? "Marcar como Disponível" : "Marcar como Ocupada"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Resumo */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {mesas.filter((m) => !m.ocupada).length}
                </p>
                <p className="text-gray-600">Mesas Disponíveis</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">
                  {mesas.filter((m) => m.ocupada).length}
                </p>
                <p className="text-gray-600">Mesas Ocupadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TableSelection;
