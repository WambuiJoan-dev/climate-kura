import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { api } from '@/lib/api';
import { t } from '@/lib/i18n';
import { Leaf, Plus, Brain, MapPin, Camera } from 'lucide-react';

const Practices = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    plot_id: '',
    practice_type: 'agroforestry' as 'agroforestry' | 'cover_crop',
    quantity: '',
    media_uri: '',
    gps_coords: { lat: 0, lng: 0 }
  });

  const queryClient = useQueryClient();

  const logPracticeMutation = useMutation({
    mutationFn: api.logPractice,
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: `Practice logged with AI score: ${data.verifiability_score}%`,
      });
      setFormData({
        plot_id: '',
        practice_type: 'agroforestry',
        quantity: '',
        media_uri: '',
        gps_coords: { lat: 0, lng: 0 }
      });
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ['practices'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to log practice",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.plot_id || !formData.quantity) return;
    
    logPracticeMutation.mutate({
      ...formData,
      quantity: parseFloat(formData.quantity)
    });
  };

  // Mock recent practices data
  const recentPractices = [
    {
      id: '1',
      farmer_name: 'John Mwangi',
      plot_id: 'PLT-001',
      practice_type: 'agroforestry',
      quantity: 50,
      units: 'trees planted',
      date: '2024-01-15',
      ai_score: 87,
      status: 'pending',
      provisional_credits: 2.3
    },
    {
      id: '2', 
      farmer_name: 'Mary Wanjiku',
      plot_id: 'PLT-002',
      practice_type: 'cover_crop',
      quantity: 0.5,
      units: 'hectares',
      date: '2024-01-14',
      ai_score: 92,
      status: 'verified',
      provisional_credits: 1.8
    },
    {
      id: '3',
      farmer_name: 'Peter Kimani',
      plot_id: 'PLT-003',
      practice_type: 'agroforestry',
      quantity: 75,
      units: 'trees planted',
      date: '2024-01-13',
      ai_score: 78,
      status: 'pending',
      provisional_credits: 3.1
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            {t('practices')}
          </h1>
          <p className="text-muted-foreground">Log and track climate-smart farming activities</p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Log Practice
        </Button>
      </div>

      {/* Practice Form */}
      {showForm && (
        <Card className="shadow-soft max-w-2xl">
          <CardHeader className="bg-gradient-primary text-primary-foreground">
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5" />
              {t('logPractice')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="plot_id">Plot ID *</Label>
                  <Input
                    id="plot_id"
                    value={formData.plot_id}
                    onChange={(e) => setFormData({ ...formData, plot_id: e.target.value })}
                    placeholder="PLT-001"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="practice_type">{t('practiceType')} *</Label>
                  <Select 
                    value={formData.practice_type} 
                    onValueChange={(value: 'agroforestry' | 'cover_crop') => 
                      setFormData({ ...formData, practice_type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agroforestry">{t('agroforestry')}</SelectItem>
                      <SelectItem value="cover_crop">{t('coverCrop')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="quantity">{t('quantity')} *</Label>
                <Input
                  id="quantity"
                  type="number"
                  step="0.1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder={formData.practice_type === 'agroforestry' ? 'Number of trees' : 'Hectares covered'}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.practice_type === 'agroforestry' ? 'Number of trees planted' : 'Hectares of cover crop'}
                </p>
              </div>

              <div>
                <Label htmlFor="media_uri">Photo Evidence (Optional)</Label>
                <Input
                  id="media_uri"
                  value={formData.media_uri}
                  onChange={(e) => setFormData({ ...formData, media_uri: e.target.value })}
                  placeholder="Upload or provide image URL"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lat">GPS Latitude (Optional)</Label>
                  <Input
                    id="lat"
                    type="number"
                    step="0.000001"
                    value={formData.gps_coords.lat || ''}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      gps_coords: { ...formData.gps_coords, lat: parseFloat(e.target.value) || 0 }
                    })}
                    placeholder="-0.4167"
                  />
                </div>
                <div>
                  <Label htmlFor="lng">GPS Longitude (Optional)</Label>
                  <Input
                    id="lng"
                    type="number"
                    step="0.000001"
                    value={formData.gps_coords.lng || ''}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      gps_coords: { ...formData.gps_coords, lng: parseFloat(e.target.value) || 0 }
                    })}
                    placeholder="36.9500"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  disabled={logPracticeMutation.isPending}
                  className="flex-1"
                >
                  {logPracticeMutation.isPending ? 'Logging...' : t('submit')}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  {t('cancel')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Recent Practices */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Recent Practice Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPractices.map((practice) => (
              <div key={practice.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{practice.farmer_name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      Plot {practice.plot_id}
                    </p>
                  </div>
                  <Badge variant={practice.status === 'verified' ? 'default' : 'secondary'}>
                    {practice.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Practice</p>
                    <p className="font-medium capitalize">{practice.practice_type.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Quantity</p>
                    <p className="font-medium">{practice.quantity} {practice.units}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">AI Score</p>
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-primary" />
                      <span className="font-bold text-primary">{practice.ai_score}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Provisional Credits</p>
                    <p className="font-bold text-success">{practice.provisional_credits} tCO₂e</p>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
                  <span>Logged on {new Date(practice.date).toLocaleDateString()}</span>
                  {practice.status === 'pending' && (
                    <span className="text-warning">Awaiting verification</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Verification Info */}
      <Card className="shadow-soft bg-gradient-success text-success-foreground">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Brain className="h-8 w-8 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-2">AI-Powered Verification</h3>
              <p className="opacity-90 mb-4">
                Our AI system analyzes practice logs using satellite imagery, weather data, and historical patterns 
                to provide initial verifiability scores before human verification.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <strong>Satellite Analysis:</strong> Remote sensing validation
                </div>
                <div>
                  <strong>Pattern Recognition:</strong> Historical data comparison
                </div>
                <div>
                  <strong>Risk Assessment:</strong> Quality assurance scoring
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Practices;