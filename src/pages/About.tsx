import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  Smartphone, 
  Brain, 
  CreditCard, 
  Users, 
  MapPin,
  Phone,
  CheckCircle,
  TrendingUp,
  Info
} from 'lucide-react';
import { t } from '@/lib/i18n';

const About = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Info className="h-8 w-8 text-primary" />
          {t('about')}
        </h1>
        <p className="text-muted-foreground">
          EcoVision Carbon Flow - Empowering Smallholder Farmers
        </p>
      </div>

      {/* Platform Overview */}
      <Card className="shadow-soft bg-gradient-primary text-primary-foreground">
        <CardHeader>
          <CardTitle className="text-xl">Platform Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg leading-relaxed">
            Hybrid mobile + USSD platform guiding climate-smart farming, AI/remote-sensing MRV, 
            converts to carbon credits, pays via M-Pesa
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5" />
              <span>Focus Areas: Nyeri & Meru Counties</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5" />
              <span>Target: Smallholder Farmers</span>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5" />
              <span>Payments: M-Pesa Integration</span>
            </div>
            <div className="flex items-center gap-3">
              <Brain className="h-5 w-5" />
              <span>Verification: AI + Remote Sensing</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Climate Practices */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5" />
            Climate-Smart Practices in MVP
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                <Leaf className="h-5 w-5 text-success" />
              </div>
              <div>
                <h3 className="font-semibold">Agroforestry</h3>
                <p className="text-sm text-muted-foreground">
                  Integrating trees with crops for carbon sequestration
                </p>
              </div>
            </div>
            <div className="ml-13 space-y-1 text-sm">
              <p>• Tree planting in agricultural plots</p>
              <p>• Boundary and intercrop tree systems</p>
              <p>• Native species prioritization</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Leaf className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Cover Cropping</h3>
                <p className="text-sm text-muted-foreground">
                  Soil health improvement and carbon storage
                </p>
              </div>
            </div>
            <div className="ml-13 space-y-1 text-sm">
              <p>• Leguminous cover crops</p>
              <p>• Soil organic matter enhancement</p>
              <p>• Erosion prevention measures</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Flow */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Platform Data Flow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                step: 1,
                title: 'Onboard',
                icon: Users,
                description: 'Farmer registration & plot setup'
              },
              {
                step: 2,
                title: 'Practice Log',
                icon: Leaf,
                description: 'Record climate-smart activities'
              },
              {
                step: 3,
                title: 'AI MRV',
                icon: Brain,
                description: 'AI verification & scoring'
              },
              {
                step: 4,
                title: 'Verification',
                icon: CheckCircle,
                description: 'Admin review & approval'
              }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">Step {item.step}</Badge>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 p-4 rounded-lg bg-muted/50">
            <h4 className="font-medium mb-2">Additional Steps:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>5. Pooling:</strong> Aggregate verified credits into tradeable lots
              </div>
              <div>
                <strong>6. Buyer Purchase:</strong> Carbon credit marketplace transactions
              </div>
              <div>
                <strong>7. Payouts:</strong> M-Pesa payments to farmers
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* USSD Integration */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            USSD Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            <Smartphone className="h-6 w-6 text-primary mt-1" />
            <div>
              <p className="font-medium mb-2">Short Code Workflow</p>
              <p className="text-muted-foreground mb-4">
                Farmers can access basic functionality via USSD for feature phones and areas with limited internet.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm">
                <p>*384*25# - EcoVision Carbon Flow</p>
                <p className="mt-2 text-muted-foreground">
                  1. Check my credits<br />
                  2. Log new practice<br />
                  3. View payments<br />
                  4. Get support
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Stack */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Technical Implementation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-3">Frontend</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• React + TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• React Router</li>
                <li>• React Query</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Backend</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Flask API</li>
                <li>• AI/ML Verification</li>
                <li>• Remote Sensing MRV</li>
                <li>• USSD Integration</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Integrations</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• M-Pesa Payments</li>
                <li>• Satellite Imagery</li>
                <li>• SMS/USSD Gateway</li>
                <li>• Carbon Markets</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;