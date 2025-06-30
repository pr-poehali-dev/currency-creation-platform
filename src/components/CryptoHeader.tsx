import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface CryptoHeaderProps {
  userRole: "creator" | "investor";
  onRoleSwitch: (role: "creator" | "investor") => void;
}

export default function CryptoHeader({
  userRole,
  onRoleSwitch,
}: CryptoHeaderProps) {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Coins" size={32} className="text-primary" />
              <h1 className="text-2xl font-heading font-bold text-gray-900">
                CryptoCreator
              </h1>
            </div>
            <Badge variant="outline" className="text-xs">
              BETA
            </Badge>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <Button
                variant={userRole === "creator" ? "default" : "ghost"}
                size="sm"
                onClick={() => onRoleSwitch("creator")}
                className="text-sm"
              >
                <Icon name="PlusCircle" size={16} className="mr-1" />
                Создатель
              </Button>
              <Button
                variant={userRole === "investor" ? "default" : "ghost"}
                size="sm"
                onClick={() => onRoleSwitch("investor")}
                className="text-sm"
              >
                <Icon name="TrendingUp" size={16} className="mr-1" />
                Инвестор
              </Button>
            </div>

            <Button variant="outline" size="sm">
              <Icon name="User" size={16} className="mr-1" />
              Профиль
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
