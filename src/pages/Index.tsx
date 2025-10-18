import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ChatInterface from "@/components/ChatInterface";
import ServiceCategories from "@/components/ServiceCategories";
import { MessageCircle, Shield, Clock, Users } from "lucide-react";
import heroImage from "@/assets/hero-government.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"chat" | "services">("services");

  const handleServiceSelect = (service: string) => {
    setActiveTab("chat");
    // Here you could pass the service to the chat component
  };

  const features = [
    {
      icon: MessageCircle,
      title: "24/7 AI Assistant",
      description: "Get instant answers to your government service questions anytime",
    },
    {
      icon: Shield,
      title: "Official Information",
      description: "Access verified and up-to-date government procedures and requirements",
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Skip long queues and get information instantly from home",
    },
    {
      icon: Users,
      title: "User-Friendly",
      description: "Simple interface designed for all Kenyan citizens",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background">
      {/* Header */}
      <header className="border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">eGov Kenya</h1>
                <p className="text-sm text-muted-foreground">Digital KRA Services</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={activeTab === "services" ? "default" : "outline"}
                onClick={() => setActiveTab("services")}
                size="sm"
              >
                Services
              </Button>
              <Button
                variant={activeTab === "chat" ? "default" : "outline"}
                onClick={() => setActiveTab("chat")}
                size="sm"
              >
                AI Assistant
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="relative overflow-hidden rounded-2xl mb-8">
            <img 
              src={heroImage} 
              alt="Kenya Government Digital Services" 
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-4xl font-bold mb-4">
                  Digital KRA Services
                </h2>
                <p className="text-xl opacity-90">
                  Access KRA services and government information instantly
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </section>

        {/* Main Content Area */}
        <section className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">
              {activeTab === "services" ? "Government Services" : "AI Assistant"}
            </h3>
            <p className="text-muted-foreground">
              {activeTab === "services" 
                ? "Browse available government services and get started quickly" 
                : "Chat with our AI assistant for personalized help with government services"
              }
            </p>
          </div>

          {activeTab === "services" ? (
            <ServiceCategories onServiceSelect={handleServiceSelect} />
          ) : (
            <div className="max-w-4xl mx-auto">
              <ChatInterface />
            </div>
          )}
        </section>

        {/* Information Section */}
        <section className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl">Need Real-Time KRA Data?</CardTitle>
              <CardDescription>
                This platform provides general guidance. For official transactions and real-time data access, 
                you'll need to connect to KRA's official APIs.
              </CardDescription>
            </CardHeader>
             
            <CardContent>
              <Button 
                variant="outline" 
                className="mr-4"
                onClick={() => window.open("https://developer.go.ke/")}
              >
                Learn About API Integration
              </Button>
            </CardContent> 
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8 bg-card/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 eGov Kenya Platform. Built for Kenyan Citizens.</p>
          <p className="text-sm mt-2">
            This is a demonstration platform. For official services, visit KRA.go.ke
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;