import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const BASE_URL = "http://localhost:8081";

const statusEntregaTraduzido: { [key: number]: string } = {
    0: "Pendente",
    1: "Em rota",
    2: "Entregue",
    3: "Cancelada",
};
const statusClasses: Record<number, string> = {
    0: "bg-yellow-100 border-yellow-400",   // Pendente
    1: "bg-blue-100 border-blue-400",       // Em rota
    2: "bg-green-100 border-green-400",     // Entregue
    3: "bg-red-100 border-red-400",         // Cancelada
};

export default function CadastroEntregas() {
    const [nomeMotoboy, setNomeMotoboy] = useState("");
    const [placaMotoboy, setPlacaMotoboy] = useState("");

    const [enderecoEntrega, setEnderecoEntrega] = useState("");
    const [nomeCliente, setNomeCliente] = useState("");
    const [telefoneCliente, setTelefoneCliente] = useState("");
    const [idMotoboy, setIdMotoboy] = useState("");

    const [motoboys, setMotoboys] = useState<{ id: number; nome: string }[]>([]);
    const [entregas, setEntregas] = useState<any[]>([]);

    const carregarMotoboys = async () => {
        try {
            const res = await fetch(`${BASE_URL}/entrega/api/motoboys/ativos`);
            const data = await res.json();
            setMotoboys(data);
        } catch (err) {
            toast.error("Erro ao carregar motoboys ativos.");
        }
    };

    const carregarEntregas = async () => {
        try {
            const res = await fetch(`${BASE_URL}/entrega/api/entregas`);
            const data = await res.json();
            setEntregas(data);
        } catch (err) {
            toast.error("Erro ao carregar entregas.");
        }
    };

    useEffect(() => {
        carregarMotoboys();
        carregarEntregas();
    }, []);

    const cadastrarMotoboy = async () => {
        try {
            const res = await fetch(`${BASE_URL}/entrega/api/motoboys`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome: nomeMotoboy, placaMoto: placaMotoboy }),
            });

            if (res.ok) {
                toast.success("Motoboy cadastrado com sucesso!");
                setNomeMotoboy("");
                setPlacaMotoboy("");
                carregarMotoboys();
            } else {
                toast.error("Erro ao cadastrar motoboy.");
            }
        } catch (err) {
            toast.error("Erro: " + err);
        }
    };

    const cadastrarEntrega = async () => {
        try {
            const res = await fetch(`${BASE_URL}/entrega/api/entregas`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nomeCliente,
                    endereco: enderecoEntrega,
                    telefone: telefoneCliente,
                    motoboyId: Number(idMotoboy),
                }),
            });

            if (res.ok) {
                toast.success("Entrega cadastrada com sucesso!");
                setEnderecoEntrega("");
                setNomeCliente("");
                setTelefoneCliente("");
                setIdMotoboy("");
                carregarEntregas();
            } else {
                toast.error("Erro ao cadastrar entrega.");
            }
        } catch (err) {
            toast.error("Erro: " + err);
        }
    };


    return (
        <div className="min-h-screen py-16 px-6 max-w-screen-xl mx-auto">
            <h1 className="text-3xl font-extrabold text-left text-gray-800 mb-6">Gestão de Entregas</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-8 lg:col-span-2">
                    <Card className="shadow-xl rounded-2xl border border-gray-200">
                        <CardHeader className="bg-white rounded-t-2xl border-b border-gray-200">
                            <CardTitle className="text-xl font-bold text-gray-800">Cadastrar Motoboy</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                            <Input placeholder="Nome" value={nomeMotoboy} onChange={(e) => setNomeMotoboy(e.target.value)} />
                            <Input placeholder="Placa da Moto" value={placaMotoboy} onChange={(e) => setPlacaMotoboy(e.target.value)} />
                            <div className="md:col-span-2 text-right">
                                <Button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold" onClick={cadastrarMotoboy}>
                                    Cadastrar Motoboy
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-xl rounded-2xl border border-gray-200">
                        <CardHeader className="bg-white rounded-t-2xl border-b border-gray-200">
                            <CardTitle className="text-xl font-bold text-gray-800">Cadastrar Entrega</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                            <Input placeholder="Nome do Cliente" value={nomeCliente} onChange={(e) => setNomeCliente(e.target.value)} />
                            <Input placeholder="Telefone do Cliente" value={telefoneCliente} onChange={(e) => setTelefoneCliente(e.target.value)} />
                            <Input placeholder="Endereço da Entrega" value={enderecoEntrega} onChange={(e) => setEnderecoEntrega(e.target.value)} className="md:col-span-2" />
                            <select
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
                                value={idMotoboy}
                                onChange={(e) => setIdMotoboy(e.target.value)}
                            >
                                <option value="">Selecione um motoboy</option>
                                {motoboys.map((moto) => (
                                    <option key={moto.id} value={moto.id}>
                                        {moto.nome}
                                    </option>
                                ))}
                            </select>
                            <div className="md:col-span-2 text-right">
                                <Button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold" onClick={cadastrarEntrega}>
                                    Cadastrar Entrega
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card className="shadow-xl rounded-2xl border border-gray-200 h-full">
                        <CardHeader className="bg-white rounded-t-2xl border-b border-gray-200">
                            <CardTitle className="text-xl font-bold text-gray-800">Entregas Cadastradas</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4 overflow-y-auto max-h-[500px]">
                            {entregas.map((entrega, idx) => {
                                const isPendente = entrega.status === 0;

                                const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
                                    const novoStatus = Number(e.target.value);
                                    try {
                                        const res = await fetch(`${BASE_URL}/api/entregas/${entrega.id}/status`, {
                                            method: "PUT",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ status: novoStatus }),
                                        });

                                        if (res.ok) {
                                            toast.success("Status atualizado com sucesso!");
                                            carregarEntregas();
                                        } else {
                                            toast.error("Erro ao atualizar status.");
                                        }
                                    } catch (err) {
                                        toast.error("Erro: " + err);
                                    }
                                };

                                return (
                                    <div
                                        key={idx}
                                        className={`p-4 border rounded-lg shadow-sm ${statusClasses[entrega.status] || 'bg-white border-gray-300'}`}
                                    >
                                        <p className="font-medium text-gray-700">Cliente: {entrega.nomeCliente}</p>
                                        <p className="text-sm text-gray-600">Endereço: {entrega.endereco}</p>
                                        <p className="text-sm text-gray-600">Telefone: {entrega.telefone}</p>
                                        <p className="text-sm text-gray-600">Motoboy: {entrega.motoboyNome || 'N/A'}</p>
                                        <p className="text-sm text-gray-600">
                                            Status: {statusEntregaTraduzido[entrega.status] || entrega.status}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Solicitada em: {new Date(entrega.dataSolicitada).toLocaleString()}
                                        </p>

                                        <div className="mt-3">
                                            <label className="text-sm text-gray-700 mr-2">Alterar status:</label>
                                            <select
                                                className="p-2 border rounded-md text-sm"
                                                value={entrega.status}
                                                onChange={handleStatusChange}
                                            >
                                                {Object.entries(statusEntregaTraduzido).map(([key, label]) => (
                                                    <option key={key} value={key}>
                                                        {label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}