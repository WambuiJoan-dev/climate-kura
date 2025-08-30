import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, Users, CheckCircle, Package, TrendingUp } from 'lucide-react';
import { t } from '@/lib/i18n';

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          {t('dashboard')}
        </h1>
        <p className="text-muted-foreground">
          EcoVision Carbon Flow - Smallholder Carbon Platform
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Farmers</p>
                <p className="text-2xl font-bold text-primary">1,247</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Plots</p>
                <p className="text-2xl font-bold text-success">2,856</p>
              </div>
              <Leaf className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Verified Credits</p>
                <p className="text-2xl font-bold text-accent">3,421 tCO₂e</p>
              </div>
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Lots</p>
                <p className="text-2xl font-bold text-warning">12</p>
              </div>
              <Package className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Practices
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { farmer: 'John Mwangi', practice: 'Agroforestry', credits: '2.3 tCO₂e', status: 'pending' },
              { farmer: 'Mary Wanjiku', practice: 'Cover Cropping', credits: '1.8 tCO₂e', status: 'verified' },
              { farmer: 'Peter Kimani', practice: 'Agroforestry', credits: '3.1 tCO₂e', status: 'pending' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">{item.farmer}</p>
                  <p className="text-sm text-muted-foreground">{item.practice}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{item.credits}</p>
                  <Badge variant={item.status === 'verified' ? 'default' : 'secondary'}>
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Available Credit Lots
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { id: 'LOT-001', credits: '156.7 tCO₂e', price: 'KES 2,350/tCO₂e', buyers: 3 },
              { id: 'LOT-002', credits: '89.2 tCO₂e', price: 'KES 2,200/tCO₂e', buyers: 1 },
              { id: 'LOT-003', credits: '234.1 tCO₂e', price: 'KES 2,500/tCO₂e', buyers: 5 },
            ].map((lot, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">{lot.id}</p>
                  <p className="text-sm text-muted-foreground">{lot.credits}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{lot.price}</p>
                  <p className="text-xs text-muted-foreground">{lot.buyers} interested buyers</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-soft bg-gradient-primary text-primary-foreground">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg bg-white/10">
            <Users className="h-8 w-8 mx-auto mb-2" />
            <p className="font-medium">Register Farmer</p>
            <p className="text-sm opacity-90">Add new smallholders</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/10">
            <Leaf className="h-8 w-8 mx-auto mb-2" />
            <p className="font-medium">Log Practice</p>
            <p className="text-sm opacity-90">Record climate activities</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/10">
            <CheckCircle className="h-8 w-8 mx-auto mb-2" />
            <p className="font-medium">Verify Credits</p>
            <p className="text-sm opacity-90">Review pending submissions</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;