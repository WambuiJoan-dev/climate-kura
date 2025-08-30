import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import FarmerForm from '@/components/FarmerForm';
import { Users, Search, Plus, Wallet } from 'lucide-react';
import { t } from '@/lib/i18n';

const Farmers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Mock data - replace with real API call
  const farmers = [
    {
      id: '1',
      name: 'John Mwangi Kimani',
      phone: '+254 712 345 678',
      coop_name: 'Nyeri Coffee Farmers',
      county: 'Nyeri',
      plots_count: 2,
      total_credits: 12.5,
      verified_credits: 8.2,
      status: 'active'
    },
    {
      id: '2',
      name: 'Mary Wanjiku Ndung\'u',
      phone: '+254 723 456 789',
      coop_name: 'Meru Tea Growers',
      county: 'Meru',
      plots_count: 1,
      total_credits: 7.3,
      verified_credits: 7.3,
      status: 'active'
    },
    {
      id: '3',
      name: 'Peter Kimutai Ruto',
      phone: '+254 734 567 890',
      coop_name: null,
      county: 'Nyeri',
      plots_count: 3,
      total_credits: 18.9,
      verified_credits: 15.1,
      status: 'active'
    }
  ];

  const filteredFarmers = farmers.filter(farmer =>
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.phone.includes(searchTerm) ||
    (farmer.coop_name?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            {t('farmers')}
          </h1>
          <p className="text-muted-foreground">Manage smallholder farmers in Nyeri & Meru</p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Farmer
        </Button>
      </div>

      {/* New Farmer Form */}
      {showForm && (
        <div className="max-w-md">
          <FarmerForm onSuccess={() => setShowForm(false)} />
        </div>
      )}

      {/* Search */}
      <Card className="shadow-soft">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search farmers by name, phone, or cooperative..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Farmers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFarmers.map((farmer) => (
          <Card key={farmer.id} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{farmer.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{farmer.phone}</p>
                </div>
                <Badge variant="outline">{farmer.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {farmer.coop_name && (
                <div>
                  <p className="text-xs text-muted-foreground">Cooperative</p>
                  <p className="text-sm font-medium">{farmer.coop_name}</p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">County</p>
                  <p className="font-medium">{farmer.county}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Plots</p>
                  <p className="font-medium">{farmer.plots_count}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Credits</span>
                  <span className="text-sm font-bold text-primary">{farmer.total_credits} tCO₂e</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Verified</span>
                  <span className="text-sm font-bold text-success">{farmer.verified_credits} tCO₂e</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full gap-2 mt-3"
              >
                <Wallet className="h-4 w-4" />
                View Wallet
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFarmers.length === 0 && (
        <Card className="shadow-soft">
          <CardContent className="p-12 text-center">
            <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">No farmers found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first farmer'}
            </p>
            {!searchTerm && (
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add First Farmer
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Farmers;