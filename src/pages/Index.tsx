import { useState } from "react";
import CryptoHeader from "@/components/CryptoHeader";
import CryptoManager from "@/components/CryptoManager";

const Index = () => {
  const [userRole, setUserRole] = useState<"creator" | "investor">("creator");

  return (
    <div className="min-h-screen bg-gray-50">
      <CryptoHeader userRole={userRole} onRoleSwitch={setUserRole} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            {userRole === "creator" ? "Панель создателя" : "Панель инвестора"}
          </h2>
          <p className="text-gray-600">
            {userRole === "creator"
              ? "Создавайте и управляйте своими криптовалютами"
              : "Инвестируйте в перспективные виртуальные валюты"}
          </p>
        </div>

        <CryptoManager userRole={userRole} />
      </main>
    </div>
  );
};

export default Index;
