import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Plus, Leaf, Users } from 'lucide-react';
import { t } from '@/lib/i18n';

const Plots = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    farmer_id: '',
    county: 'Nyeri',
    soil_class: '',
    centroid: { lat: '', lng: '' },
    boundary_geojson: null
  });

  // Mock plots data
  const plots = [
    {
      id: 'PLT-001',
      farmer_name: 'John Mwangi Kimani',
      farmer_id: 'FAR-001',
      county: 'Nyeri',
      soil_class: 'Nitisol',
      area_hectares: 0.8,
      centroid: { lat: -0.4167, lng: 36.9500 },
      practices_count: 3,
      total_credits: 12.5,
      status: 'active'
    },
    {
      id: 'PLT-002',
      farmer_name: 'Mary Wanjiku Ndung\'u',
      farmer_id: 'FAR-002',
      county: 'Meru',
      soil_class: 'Ferralsol',
      area_hectares: 0.5,
      centroid: { lat: -0.4200, lng: 36.9480 },
      practices_count: 2,
      total_credits: 7.3,
      status: 'active'
    },
    {
      id: 'PLT-003',
      farmer_name: 'Peter Kimutai Ruto',
      farmer_id: 'FAR-003',
      county: 'Nyeri',
      soil_class: 'Andosol',
      area_hectares: 1.2,
      centroid: { lat: -0.4150, lng: 36.9520 },
      practices_count: 4,
      total_credits: 18.9,
      status: 'active'
    }
  ];

  const counties = ['Nyeri', 'Meru'];
  const soilClasses = ['Nitisol', 'Ferralsol', 'Andosol', 'Acrisol', 'Cambisol'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle plot creation
    console.log('Creating plot:', formData);
    setShowForm(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <MapPin className="h-8 w-8 text-primary" />
            {t('plots')}
          </h1>
          <p className="text-muted-foreground">Manage agricultural plots and land boundaries</p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Plot
        </Button>
      </div>

      {/* Plot Form */}
      {showForm && (
        <Card className="shadow-soft max-w-2xl">
          <CardHeader className="bg-gradient-primary text-primary-foreground">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {t('plotSetup')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="farmer_id">Farmer ID *</Label>
                <Input
                  id="farmer_id"
                  value={formData.farmer_id}
                  onChange={(e) => setFormData({ ...formData, farmer_id: e.target.value })}
                  placeholder="FAR-001"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="county">{t('county')}</Label>
                  <Select 
                    value={formData.county} 
                    onValueChange={(value) => setFormData({ ...formData, county: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {counties.map(county => (
                        <SelectItem key={county} value={county}>{county}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="soil_class">{t('soilClass')}</Label>
                  <Select 
                    value={formData.soil_class} 
                    onValueChange={(value) => setFormData({ ...formData, soil_class: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      {soilClasses.map(soil => (
                        <SelectItem key={soil} value={soil}>{soil}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lat">Latitude (Center Point)</Label>
                  <Input
                    id="lat"
                    type="number"
                    step="0.000001"
                    value={formData.centroid.lat}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      centroid: { ...formData.centroid, lat: e.target.value }
                    })}
                    placeholder="-0.4167"
                  />
                </div>
                <div>
                  <Label htmlFor="lng">Longitude (Center Point)</Label>
                  <Input
                    id="lng"
                    type="number"
                    step="0.000001"
                    value={formData.centroid.lng}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      centroid: { ...formData.centroid, lng: e.target.value }
                    })}
                    placeholder="36.9500"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Create Plot
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Plots Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {plots.map((plot) => (
          <Card key={plot.id} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{plot.id}</CardTitle>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {plot.farmer_name}
                  </p>
                </div>
                <Badge variant="outline">{plot.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Location Info */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">County</p>
                  <p className="font-medium">{plot.county}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Area</p>
                  <p className="font-medium">{plot.area_hectares} ha</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Soil Type</p>
                  <p className="font-medium">{plot.soil_class}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Practices</p>
                  <p className="font-medium">{plot.practices_count}</p>
                </div>
              </div>

              {/* GPS Coordinates */}
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">GPS Center Point</p>
                <p className="font-mono text-sm">
                  {plot.centroid.lat.toFixed(4)}, {plot.centroid.lng.toFixed(4)}
                </p>
              </div>

              {/* Credits Summary */}
              <div className="pt-3 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Credits</span>
                  <span className="text-lg font-bold text-primary">{plot.total_credits} tCO₂e</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <MapPin className="h-3 w-3" />
                  View Map
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <Leaf className="h-3 w-3" />
                  Practices
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {plots.length === 0 && (
        <Card className="shadow-soft">
          <CardContent className="p-12 text-center">
            <MapPin className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">No plots registered</h3>
            <p className="text-muted-foreground mb-4">
              Start by setting up your first agricultural plot
            </p>
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add First Plot
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Info Card */}
      <Card className="shadow-soft bg-gradient-success text-success-foreground">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <MapPin className="h-8 w-8 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Plot Management</h3>
              <p className="opacity-90 mb-4">
                Accurate plot boundaries and soil data help optimize carbon credit calculations 
                and ensure proper practice verification across Nyeri and Meru regions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>GPS Mapping:</strong> Precise plot boundaries for verification
                </div>
                <div>
                  <strong>Soil Classification:</strong> Optimized practice recommendations
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Plots;