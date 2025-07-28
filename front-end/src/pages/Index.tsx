
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChefHat, Users, ClipboardList, Settings } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect to login after a short delay to show the welcome screen
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen restaurant-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-12 text-center">
            <div className="mb-8">
              <ChefHat className="w-24 h-24 mx-auto text-orange-500 mb-4" />
              <h1 className="text-5xl font-bold text-gray-800 mb-4">
                RestaurantePRO
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Sistema Completo de Gestão para Restaurantes
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4">
                <Users className="w-12 h-12 mx-auto text-orange-500 mb-2" />
                <h3 className="font-semibold text-gray-800">Gestão de Mesas</h3>
                <p className="text-sm text-gray-600">Controle completo das mesas e pedidos</p>
              </div>
              <div className="text-center p-4">
                <ClipboardList className="w-12 h-12 mx-auto text-orange-500 mb-2" />
                <h3 className="font-semibold text-gray-800">Pedidos Digitais</h3>
                <p className="text-sm text-gray-600">Interface intuitiva para garçons</p>
              </div>
              <div className="text-center p-4">
                <Settings className="w-12 h-12 mx-auto text-orange-500 mb-2" />
                <h3 className="font-semibold text-gray-800">Administração</h3>
                <p className="text-sm text-gray-600">Gestão de funcionários e cardápio</p>
              </div>
            </div>

            <Button 
              onClick={() => navigate("/login")} 
              size="lg" 
              className="restaurant-gradient text-white px-8 py-3 text-lg hover:opacity-90 transition-opacity"
            >
              Começar Agora
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
