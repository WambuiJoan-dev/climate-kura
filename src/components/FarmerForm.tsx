import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { api } from '@/lib/api';
import { t } from '@/lib/i18n';
import { Users } from 'lucide-react';

interface FarmerFormProps {
  onSuccess?: (farmer: any) => void;
}

const FarmerForm = ({ onSuccess }: FarmerFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    coop_name: ''
  });

  const queryClient = useQueryClient();

  const createFarmerMutation = useMutation({
    mutationFn: api.createFarmer,
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: "Farmer registered successfully",
      });
      setFormData({ name: '', phone: '', coop_name: '' });
      queryClient.invalidateQueries({ queryKey: ['farmers'] });
      onSuccess?.(data);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to register farmer",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    const submitData = {
      name: formData.name,
      phone: formData.phone,
      ...(formData.coop_name && { coop_name: formData.coop_name })
    };
    
    createFarmerMutation.mutate(submitData);
  };

  return (
    <Card className="shadow-soft">
      <CardHeader className="bg-gradient-primary text-primary-foreground">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          {t('onboardFarmer')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">{t('farmerName')} *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter farmer's full name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone">{t('phone')} *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+254 700 000 000"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="coop_name">{t('cooperative')}</Label>
            <Input
              id="coop_name"
              value={formData.coop_name}
              onChange={(e) => setFormData({ ...formData, coop_name: e.target.value })}
              placeholder="Optional cooperative name"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={createFarmerMutation.isPending}
          >
            {createFarmerMutation.isPending ? 'Registering...' : t('submit')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FarmerForm;