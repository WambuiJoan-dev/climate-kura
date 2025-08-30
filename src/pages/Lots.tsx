import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { api } from '@/lib/api';
import { t } from '@/lib/i18n';
import { Package, ShoppingCart, Plus, Eye, CreditCard, Users, Banknote } from 'lucide-react';

const Lots = () => {
  const [showPoolForm, setShowPoolForm] = useState(false);
  const [poolThreshold, setPoolThreshold] = useState('');
  const [selectedLot, setSelectedLot] = useState<any>(null);
  const [buyerData, setBuyerData] = useState({
    name: '',
    email: '',
    company: '',
    price_per_tco2e_kes: ''
  });

  const queryClient = useQueryClient();

  const poolCreditsMutation = useMutation({
    mutationFn: api.poolCredits,
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Credits pooled successfully",
      });
      setShowPoolForm(false);
      queryClient.invalidateQueries({ queryKey: ['lots'] });
    },
  });

  const purchaseCreditsMutation = useMutation({
    mutationFn: api.purchaseCredits,
    onSuccess: () => {
      toast({
        title: "Purchase Successful!",
        description: "Carbon credits purchased successfully",
      });
      setBuyerData({ name: '', email: '', company: '', price_per_tco2e_kes: '' });
      setSelectedLot(null);
      queryClient.invalidateQueries({ queryKey: ['lots'] });
    },
  });

  // Mock lots data
  const lots = [
    {
      id: 'LOT-001',
      total_tco2e: 156.7,
      price_per_tco2e_kes: 2350,
      farmers_count: 23,
      plots_count: 31,
      creation_date: '2024-01-10',
      status: 'available',
      interested_buyers: 3,
      practices: { agroforestry: 89.2, cover_crop: 67.5 },
      counties: { Nyeri: 98.3, Meru: 58.4 }
    },
    {
      id: 'LOT-002',
      total_tco2e: 89.2,
      price_per_tco2e_kes: 2200,
      farmers_count: 15,
      plots_count: 18,
      creation_date: '2024-01-08',
      status: 'available',
      interested_buyers: 1,
      practices: { agroforestry: 54.3, cover_crop: 34.9 },
      counties: { Nyeri: 45.2, Meru: 44.0 }
    },
    {
      id: 'LOT-003',
      total_tco2e: 234.1,
      price_per_tco2e_kes: 2500,
      farmers_count: 34,
      plots_count: 42,
      creation_date: '2024-01-05',
      status: 'sold',
      interested_buyers: 0,
      practices: { agroforestry: 145.6, cover_crop: 88.5 },
      counties: { Nyeri: 156.7, Meru: 77.4 },
      buyer: 'EcoCarbon Solutions Ltd',
      sold_date: '2024-01-12'
    }
  ];

  const handlePurchase = (lot: any) => {
    if (!buyerData.name || !buyerData.email || !buyerData.company) return;

    purchaseCreditsMutation.mutate({
      lot_id: lot.id,
      buyer: {
        name: buyerData.name,
        email: buyerData.email,
        company: buyerData.company
      },
      ...(buyerData.price_per_tco2e_kes && { 
        price_per_tco2e_kes: parseFloat(buyerData.price_per_tco2e_kes) 
      })
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Package className="h-8 w-8 text-primary" />
            Credit Lots
          </h1>
          <p className="text-muted-foreground">Carbon credit marketplace and pooling</p>
        </div>
        <Button 
          onClick={() => setShowPoolForm(true)}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Pool Credits
        </Button>
      </div>

      {/* Pool Credits Form */}
      {showPoolForm && (
        <Card className="shadow-soft max-w-md">
          <CardHeader className="bg-gradient-primary text-primary-foreground">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Pool Verified Credits
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={(e) => {
              e.preventDefault();
              const thresholdData = poolThreshold ? { threshold_tco2e: parseFloat(poolThreshold) } : {};
              poolCreditsMutation.mutate(thresholdData);
            }} className="space-y-4">
              <div>
                <Label htmlFor="threshold">Minimum Threshold (tCO₂e)</Label>
                <Input
                  id="threshold"
                  type="number"
                  step="0.1"
                  value={poolThreshold}
                  onChange={(e) => setPoolThreshold(e.target.value)}
                  placeholder="100.0"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Minimum verified credits required to create a lot
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  disabled={poolCreditsMutation.isPending}
                  className="flex-1"
                >
                  {poolCreditsMutation.isPending ? 'Pooling...' : 'Create Lot'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowPoolForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Lots Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {lots.map((lot) => (
          <Card key={lot.id} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{lot.id}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Created {new Date(lot.creation_date).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant={lot.status === 'available' ? 'default' : 'secondary'}>
                  {lot.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Main Stats */}
              <div className="text-center p-4 bg-gradient-primary text-primary-foreground rounded-lg">
                <p className="text-3xl font-bold">{lot.total_tco2e} tCO₂e</p>
                <p className="text-sm opacity-90">Total Carbon Credits</p>
                <p className="text-lg font-semibold mt-2">
                  KES {lot.price_per_tco2e_kes.toLocaleString()}/tCO₂e
                </p>
              </div>

              {/* Composition */}
              <div className="space-y-3">
                <h4 className="font-medium">Credit Composition</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Farmers</p>
                    <p className="font-medium flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {lot.farmers_count}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Plots</p>
                    <p className="font-medium">{lot.plots_count}</p>
                  </div>
                </div>

                {/* Practice Breakdown */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">By Practice Type</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Agroforestry</span>
                      <span className="font-medium">{lot.practices.agroforestry} tCO₂e</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Cover Cropping</span>
                      <span className="font-medium">{lot.practices.cover_crop} tCO₂e</span>
                    </div>
                  </div>
                </div>

                {/* Regional Breakdown */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">By Region</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Nyeri County</span>
                      <span className="font-medium">{lot.counties.Nyeri} tCO₂e</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Meru County</span>
                      <span className="font-medium">{lot.counties.Meru} tCO₂e</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buyer Interest */}
              {lot.status === 'available' && lot.interested_buyers > 0 && (
                <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
                  <p className="text-sm text-warning">
                    {lot.interested_buyers} interested buyer{lot.interested_buyers > 1 ? 's' : ''}
                  </p>
                </div>
              )}

              {/* Sold Information */}
              {lot.status === 'sold' && lot.buyer && (
                <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                  <p className="text-sm text-success font-medium">Sold to {lot.buyer}</p>
                  <p className="text-xs text-success/80">
                    {lot.sold_date && `on ${new Date(lot.sold_date).toLocaleDateString()}`}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-border">
                {lot.status === 'available' ? (
                  <>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="flex-1 gap-2">
                          <ShoppingCart className="h-4 w-4" />
                          Purchase
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Purchase Credits - {lot.id}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <p className="font-semibold">{lot.total_tco2e} tCO₂e</p>
                            <p className="text-sm text-muted-foreground">
                              @ KES {lot.price_per_tco2e_kes.toLocaleString()}/tCO₂e
                            </p>
                            <p className="text-lg font-bold text-primary">
                              Total: KES {(lot.total_tco2e * lot.price_per_tco2e_kes).toLocaleString()}
                            </p>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="buyer_name">Buyer Name *</Label>
                              <Input
                                id="buyer_name"
                                value={buyerData.name}
                                onChange={(e) => setBuyerData({ ...buyerData, name: e.target.value })}
                                placeholder="John Smith"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="buyer_email">Email *</Label>
                              <Input
                                id="buyer_email"
                                type="email"
                                value={buyerData.email}
                                onChange={(e) => setBuyerData({ ...buyerData, email: e.target.value })}
                                placeholder="john@company.com"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="buyer_company">Company *</Label>
                              <Input
                                id="buyer_company"
                                value={buyerData.company}
                                onChange={(e) => setBuyerData({ ...buyerData, company: e.target.value })}
                                placeholder="EcoCarbon Solutions Ltd"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="custom_price">Custom Price (KES/tCO₂e)</Label>
                              <Input
                                id="custom_price"
                                type="number"
                                value={buyerData.price_per_tco2e_kes}
                                onChange={(e) => setBuyerData({ ...buyerData, price_per_tco2e_kes: e.target.value })}
                                placeholder={`Default: ${lot.price_per_tco2e_kes}`}
                              />
                            </div>
                          </div>

                          <Button
                            onClick={() => handlePurchase(lot)}
                            disabled={purchaseCreditsMutation.isPending}
                            className="w-full gap-2"
                          >
                            <CreditCard className="h-4 w-4" />
                            {purchaseCreditsMutation.isPending ? 'Processing...' : 'Confirm Purchase'}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" className="gap-2">
                      <Eye className="h-4 w-4" />
                      Details
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" className="w-full gap-2">
                    <Eye className="h-4 w-4" />
                    View Receipt
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Marketplace Info */}
      <Card className="shadow-soft bg-gradient-success text-success-foreground">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Package className="h-8 w-8 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Carbon Credit Marketplace</h3>
              <p className="opacity-90 mb-4">
                Verified carbon credits from Nyeri and Meru smallholder farmers. 
                All credits backed by AI-verified climate-smart practices and third-party validation.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <strong>Verified Practices:</strong> Agroforestry & Cover Cropping
                </div>
                <div>
                  <strong>Quality Assurance:</strong> AI + Human Verification
                </div>
                <div>
                  <strong>Impact:</strong> Direct farmer payments via M-Pesa
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Lots;