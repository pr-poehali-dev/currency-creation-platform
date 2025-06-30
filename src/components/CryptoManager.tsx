import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  totalSupply: number;
  currentPrice: number;
  availableAmount: number;
  creator: string;
  marketCap: number;
  change24h: number;
}

interface CryptoManagerProps {
  userRole: "creator" | "investor";
}

const mockCryptos: Cryptocurrency[] = [
  {
    id: "1",
    name: "DiamondCoin",
    symbol: "DMD",
    totalSupply: 1000000,
    currentPrice: 0.05,
    availableAmount: 750000,
    creator: "Алексей К.",
    marketCap: 50000,
    change24h: 12.5,
  },
  {
    id: "2",
    name: "SpaceCoin",
    symbol: "SPC",
    totalSupply: 500000,
    currentPrice: 0.08,
    availableAmount: 300000,
    creator: "Мария В.",
    marketCap: 40000,
    change24h: -3.2,
  },
  {
    id: "3",
    name: "EcoCoin",
    symbol: "ECO",
    totalSupply: 2000000,
    currentPrice: 0.02,
    availableAmount: 1800000,
    creator: "Дмитрий С.",
    marketCap: 40000,
    change24h: 8.7,
  },
];

export default function CryptoManager({ userRole }: CryptoManagerProps) {
  const [cryptos, setCryptos] = useState<Cryptocurrency[]>(mockCryptos);
  const [newCrypto, setNewCrypto] = useState({
    name: "",
    symbol: "",
    totalSupply: "",
    initialPrice: "",
  });

  const handleCreateCrypto = () => {
    if (
      !newCrypto.name ||
      !newCrypto.symbol ||
      !newCrypto.totalSupply ||
      !newCrypto.initialPrice
    ) {
      return;
    }

    const crypto: Cryptocurrency = {
      id: Date.now().toString(),
      name: newCrypto.name,
      symbol: newCrypto.symbol.toUpperCase(),
      totalSupply: parseInt(newCrypto.totalSupply),
      currentPrice: parseFloat(newCrypto.initialPrice),
      availableAmount: parseInt(newCrypto.totalSupply),
      creator: "Вы",
      marketCap:
        parseInt(newCrypto.totalSupply) * parseFloat(newCrypto.initialPrice),
      change24h: 0,
    };

    setCryptos([crypto, ...cryptos]);
    setNewCrypto({ name: "", symbol: "", totalSupply: "", initialPrice: "" });
  };

  if (userRole === "creator") {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center">
              <Icon name="PlusCircle" size={24} className="mr-2 text-primary" />
              Создать новую криптовалюту
            </CardTitle>
            <CardDescription>
              Настройте параметры вашей виртуальной валюты
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Название валюты</Label>
                <Input
                  id="name"
                  placeholder="Например: DiamondCoin"
                  value={newCrypto.name}
                  onChange={(e) =>
                    setNewCrypto({ ...newCrypto, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="symbol">Символ (3-4 буквы)</Label>
                <Input
                  id="symbol"
                  placeholder="DMD"
                  maxLength={4}
                  value={newCrypto.symbol}
                  onChange={(e) =>
                    setNewCrypto({
                      ...newCrypto,
                      symbol: e.target.value.toUpperCase(),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supply">Общее количество</Label>
                <Input
                  id="supply"
                  type="number"
                  placeholder="1000000"
                  value={newCrypto.totalSupply}
                  onChange={(e) =>
                    setNewCrypto({ ...newCrypto, totalSupply: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Начальная цена ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="0.05"
                  value={newCrypto.initialPrice}
                  onChange={(e) =>
                    setNewCrypto({ ...newCrypto, initialPrice: e.target.value })
                  }
                />
              </div>
            </div>
            <Button
              onClick={handleCreateCrypto}
              className="w-full font-heading"
            >
              <Icon name="Rocket" size={16} className="mr-2" />
              Запустить криптовалюту
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Мои криптовалюты</CardTitle>
            <CardDescription>Управляйте созданными валютами</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cryptos
                .filter((crypto) => crypto.creator === "Вы")
                .map((crypto) => (
                  <div
                    key={crypto.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold text-sm">
                          {crypto.symbol}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">{crypto.name}</h3>
                        <p className="text-sm text-gray-500">
                          Капитализация: ${crypto.marketCap.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">
                        ${crypto.currentPrice}
                      </p>
                      <p className="text-sm text-gray-500">
                        {crypto.availableAmount.toLocaleString()} доступно
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-heading flex items-center">
            <Icon name="TrendingUp" size={24} className="mr-2 text-primary" />
            Доступные криптовалюты
          </CardTitle>
          <CardDescription>
            Покупайте и продавайте виртуальные валюты
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cryptos.map((crypto) => (
              <div
                key={crypto.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">
                      {crypto.symbol}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{crypto.name}</h3>
                    <p className="text-sm text-gray-500">
                      Создатель: {crypto.creator}
                    </p>
                    <p className="text-xs text-gray-400">
                      {crypto.availableAmount.toLocaleString()} из{" "}
                      {crypto.totalSupply.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-xl font-bold">${crypto.currentPrice}</p>
                    <div className="flex items-center space-x-1">
                      <Badge
                        variant={
                          crypto.change24h >= 0 ? "default" : "destructive"
                        }
                        className="text-xs"
                      >
                        <Icon
                          name={
                            crypto.change24h >= 0
                              ? "TrendingUp"
                              : "TrendingDown"
                          }
                          size={12}
                          className="mr-1"
                        />
                        {crypto.change24h >= 0 ? "+" : ""}
                        {crypto.change24h}%
                      </Badge>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" className="font-heading">
                      <Icon name="ShoppingCart" size={14} className="mr-1" />
                      Купить
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-heading"
                    >
                      Продать
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-heading flex items-center">
            <Icon name="Wallet" size={24} className="mr-2 text-primary" />
            Мой портфель
          </CardTitle>
          <CardDescription>Ваши инвестиции и баланс</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-primary/5 rounded-lg">
              <p className="text-sm text-gray-600">Общий баланс</p>
              <p className="text-2xl font-bold text-primary">$1,247.83</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Прибыль за 24ч</p>
              <p className="text-2xl font-bold text-green-600">+$89.21</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Активных позиций</p>
              <p className="text-2xl font-bold text-blue-600">3</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
