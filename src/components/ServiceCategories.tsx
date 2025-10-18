import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CreditCard, Building, Users, Shield, Calculator } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Tax Returns",
    description: "File individual and corporate tax returns",
    color: "bg-primary",
  },
  {
    icon: CreditCard,
    title: "PIN Registration",
    description: "Register for KRA Personal Identification Number",
    color: "bg-secondary",
  },
  {
    icon: Shield,
    title: "Compliance Certificate",
    description: "Obtain tax compliance certificates",
    color: "bg-kenya-green",
  },
  {
    icon: Calculator,
    title: "Tax Calculator",
    description: "Calculate taxes and penalties",
    color: "bg-gov-blue",
  },
  {
    icon: Building,
    title: "Business Registration",
    description: "Register your business with government",
    color: "bg-primary",
  },
  {
    icon: Users,
    title: "NSSF & NHIF",
    description: "Social security and health insurance",
    color: "bg-secondary",
  },
];

interface ServiceCategoriesProps {
  onServiceSelect: (service: string) => void;
}

export default function ServiceCategories({ onServiceSelect }: ServiceCategoriesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <Card 
            key={index} 
            className="hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            onClick={() => onServiceSelect(service.title)}
          >
            <CardHeader className="text-center pb-4">
              <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">{service.title}</CardTitle>
              <CardDescription className="text-sm">
                {service.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button 
                variant="outline" 
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}