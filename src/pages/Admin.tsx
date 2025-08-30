import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { api, getAdminKey, setAdminKey } from '@/lib/api';
import { t } from '@/lib/i18n';
import { 
  Settings, 
  Key, 
  Banknote, 
  Users, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  DollarSign
} from 'lucide-react';

const Admin = () => {
  const [adminKey, setAdminKeyState] = useState(getAdminKey() || '');
  const [showKeyInput, setShowKeyInput] = useState(!getAdminKey());
  const [selectedLot, setSelectedLot] = useState('');
  
  const queryClient = useQueryClient();

  const saveAdminKey = () => {
    if (adminKey.trim()) {
      setAdminKey(adminKey.trim());
      setShowKeyInput(false);
      toast({
        title: "Admin Key Saved",
        description: "Admin functions are now available",
      });
    }
  };

  const runPayoutsMutation = useMutation({
    mutationFn: (lotId: string) => api.runPayouts(lotId),
    onSuccess: () => {
      toast({
        title: "Payouts Processed!",
        description: "Farmer payments have been distributed via M-Pesa",
      });
      setSelectedLot('');
      queryClient.invalidateQueries({ queryKey: ['payouts'] });
    },
    onError: (error) => {
      toast({
        title: "Payout Error",
        description: "Failed to process payouts. Check your admin key.",
        variant: "destructive",
      });
    }
  });

  // Mock data for admin dashboard
  const systemStats = {
    total_farmers: 1247,
    active_plots: 2856,
    pending_verifications: 12,
    total_credits_issued: 15847.3,
    total_payouts_pending: 234500, // KES
    lots_available: 3,
    lots_sold: 8
  };

  const soldLots = [
    {
      id: 'LOT-001',
      total_tco2e: 156.7,
      sale_price_total: 368245,
      farmers_count: 23,
      sold_date: '2024-01-12',
      payout_status: 'pending',
      buyer: 'EcoCarbon Solutions Ltd'
    },
    {
      id: 'LOT-003',
      total_tco2e: 234.1,
      sale_price_total: 585250,
      farmers_count: 34,
      sold_date: '2024-01-10',
      payout_status: 'completed',
      buyer: 'GreenTech Carbon Inc',
      payout_date: '2024-01-11'
    }
  ];

  const recentPayouts = [
    {
      lot_id: 'LOT-003',
      farmer_name: 'John Mwangi',
      credits: 5.2,
      payout_kes: 9100,
      status: 'completed',
      mpesa_ref: 'QA12K5L890'
    },
    {
      lot_id: 'LOT-003',
      farmer_name: 'Mary Wanjiku',
      credits: 3.8,
      payout_kes: 6650,
      status: 'completed',
      mpesa_ref: 'QA12K5L891'
    }
  ];

  const handleRunPayouts = (lotId: string) => {
    runPayoutsMutation.mutate(lotId);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Settings className="h-8 w-8 text-primary" />
          Admin Panel
        </h1>
        <p className="text-muted-foreground">System administration and payout management</p>
      </div>

      {/* Admin Key Section */}
      {showKeyInput ? (
        <Card className="shadow-soft border-warning max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <Key className="h-5 w-5" />
              Admin Authentication Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="adminKey">Admin Key</Label>
                <Input
                  id="adminKey"
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKeyState(e.target.value)}
                  placeholder="Enter admin key"
                />
              </div>
              <Button onClick={saveAdminKey} className="mt-6">
                Login
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* System Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Farmers</p>
                    <p className="text-2xl font-bold text-primary">{systemStats.total_farmers.toLocaleString()}</p>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Credits Issued</p>
                    <p className="text-2xl font-bold text-success">{systemStats.total_credits_issued.toLocaleString()} tCO₂e</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Payouts</p>
                    <p className="text-2xl font-bold text-warning">KES {systemStats.total_payouts_pending.toLocaleString()}</p>
                  </div>
                  <Banknote className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Verifications</p>
                    <p className="text-2xl font-bold text-destructive">{systemStats.pending_verifications}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-destructive" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payout Management */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Banknote className="h-5 w-5" />
                Payout Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Sold Lots Requiring Payouts */}
                <div>
                  <h3 className="font-medium mb-3">Sold Lots Requiring Payouts</h3>
                  <div className="space-y-3">
                    {soldLots.filter(lot => lot.payout_status === 'pending').map((lot) => (
                      <div key={lot.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{lot.id}</h4>
                            <p className="text-sm text-muted-foreground">
                              Sold to {lot.buyer} on {new Date(lot.sold_date).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant="destructive">Payout Pending</Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                          <div>
                            <p className="text-muted-foreground">Credits Sold</p>
                            <p className="font-medium">{lot.total_tco2e} tCO₂e</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Sale Total</p>
                            <p className="font-medium">KES {lot.sale_price_total.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Farmers</p>
                            <p className="font-medium">{lot.farmers_count} farmers</p>
                          </div>
                        </div>
                        
                        <Button
                          onClick={() => handleRunPayouts(lot.id)}
                          disabled={runPayoutsMutation.isPending}
                          className="gap-2"
                        >
                          <DollarSign className="h-4 w-4" />
                          {runPayoutsMutation.isPending ? 'Processing...' : 'Run Payouts'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Completed Payouts */}
                <div>
                  <h3 className="font-medium mb-3">Recent Completed Payouts</h3>
                  <div className="space-y-2">
                    {recentPayouts.map((payout, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium">{payout.farmer_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {payout.credits} tCO₂e from {payout.lot_id}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">KES {payout.payout_kes.toLocaleString()}</p>
                          <div className="flex items-center gap-1 text-sm text-success">
                            <CheckCircle className="h-3 w-3" />
                            <span>M-Pesa: {payout.mpesa_ref}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Admin Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>System Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  System Configuration
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  User Management
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analytics Dashboard
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Platform Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">API Status</span>
                  <Badge variant="default">Healthy</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">M-Pesa Integration</span>
                  <Badge variant="default">Connected</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">AI Verification</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">USSD Gateway</span>
                  <Badge variant="default">Online</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Platform Splits & Settings */}
          <Card className="shadow-soft bg-gradient-primary text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Settings className="h-8 w-8 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Platform Configuration</h3>
                  <p className="opacity-90 mb-4">
                    Current platform split: 85% to farmers, 10% to cooperatives, 5% to platform operations
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <strong>Farmer Share:</strong> 85% of carbon credit revenue
                    </div>
                    <div>
                      <strong>Cooperative Fee:</strong> 10% for aggregation services
                    </div>
                    <div>
                      <strong>Platform Fee:</strong> 5% for technology & operations
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default Admin;