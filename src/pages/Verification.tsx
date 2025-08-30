import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { api, getAdminKey, setAdminKey } from '@/lib/api';
import { t } from '@/lib/i18n';
import { CheckCircle, X, Eye, Brain, MapPin, Camera, Key, AlertTriangle } from 'lucide-react';

const Verification = () => {
  const [adminKey, setAdminKeyState] = useState(getAdminKey() || '');
  const [showKeyInput, setShowKeyInput] = useState(!getAdminKey());
  
  const queryClient = useQueryClient();

  const saveAdminKey = () => {
    if (adminKey.trim()) {
      setAdminKey(adminKey.trim());
      setShowKeyInput(false);
      toast({
        title: "Admin Key Saved",
        description: "You can now verify practices",
      });
    }
  };

  const verifyEventMutation = useMutation({
    mutationFn: ({ eventId, action }: { eventId: string; action: 'approve' | 'reject' }) =>
      api.verifyEvent(eventId, action),
    onSuccess: (data, variables) => {
      toast({
        title: "Success!",
        description: `Practice ${variables.action}d successfully`,
      });
      queryClient.invalidateQueries({ queryKey: ['pending-events'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to verify practice. Check your admin key.",
        variant: "destructive",
      });
    }
  });

  // Mock pending events data
  const pendingEvents = [
    {
      id: '1',
      farmer_name: 'John Mwangi Kimani',
      plot_id: 'PLT-001',
      practice_type: 'agroforestry',
      quantity: 50,
      units: 'trees planted',
      date: '2024-01-15',
      ai_score: 87,
      provisional_credits: 2.3,
      media_uri: 'https://example.com/photo1.jpg',
      gps_coords: { lat: -0.4167, lng: 36.9500 },
      notes: 'Native tree species planted along farm boundaries'
    },
    {
      id: '2',
      farmer_name: 'Peter Kimani Ruto',
      plot_id: 'PLT-003',
      practice_type: 'cover_crop',
      quantity: 0.8,
      units: 'hectares',
      date: '2024-01-13',
      ai_score: 78,
      provisional_credits: 1.9,
      media_uri: null,
      gps_coords: { lat: -0.4200, lng: 36.9480 },
      notes: 'Leguminous cover crops established between maize rows'
    },
    {
      id: '3',
      farmer_name: 'Grace Nyawira Maina',
      plot_id: 'PLT-005',
      practice_type: 'agroforestry',
      quantity: 30,
      units: 'trees planted',
      date: '2024-01-12',
      ai_score: 94,
      provisional_credits: 1.4,
      media_uri: 'https://example.com/photo2.jpg',
      gps_coords: { lat: -0.4150, lng: 36.9520 },
      notes: 'Mixed fruit and timber trees integrated with coffee'
    }
  ];

  const handleVerify = (eventId: string, action: 'approve' | 'reject') => {
    verifyEventMutation.mutate({ eventId, action });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <CheckCircle className="h-8 w-8 text-primary" />
          {t('verification')}
        </h1>
        <p className="text-muted-foreground">Review and verify farmer practice submissions</p>
      </div>

      {/* Admin Key Section */}
      {showKeyInput ? (
        <Card className="shadow-soft border-warning">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <Key className="h-5 w-5" />
              Admin Access Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-warning text-sm">
              <AlertTriangle className="h-4 w-4" />
              <span>Enter your admin key to access verification functions</span>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="adminKey">Admin Key</Label>
                <Input
                  id="adminKey"
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKeyState(e.target.value)}
                  placeholder="Enter admin verification key"
                />
              </div>
              <Button onClick={saveAdminKey} className="mt-6">
                Authenticate
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-success text-sm">
            <CheckCircle className="h-4 w-4" />
            <span>Admin access authenticated</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setAdminKey('');
              setAdminKeyState('');
              setShowKeyInput(true);
            }}
          >
            Change Key
          </Button>
        </div>
      )}

      {/* Verification Queue */}
      {!showKeyInput && (
        <>
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Verification Queue ({pendingEvents.length} pending)
                </span>
                <Badge variant="secondary">{pendingEvents.length} items</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {pendingEvents.map((event) => (
                <div key={event.id} className="border border-border rounded-lg p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{event.farmer_name}</h3>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Plot {event.plot_id} • {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-primary" />
                      <span className="font-bold text-primary">{event.ai_score}% AI Score</span>
                    </div>
                  </div>

                  {/* Practice Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Practice Type</p>
                      <p className="font-medium capitalize">{event.practice_type.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Quantity</p>
                      <p className="font-medium">{event.quantity} {event.units}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Provisional Credits</p>
                      <p className="font-bold text-success">{event.provisional_credits} tCO₂e</p>
                    </div>
                  </div>

                  {/* GPS and Media */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.gps_coords && (
                      <div className="p-3 bg-card rounded border">
                        <p className="text-sm text-muted-foreground mb-1">GPS Coordinates</p>
                        <p className="font-mono text-sm">
                          {event.gps_coords.lat.toFixed(4)}, {event.gps_coords.lng.toFixed(4)}
                        </p>
                      </div>
                    )}
                    {event.media_uri && (
                      <div className="p-3 bg-card rounded border">
                        <p className="text-sm text-muted-foreground mb-1">Photo Evidence</p>
                        <div className="flex items-center gap-2">
                          <Camera className="h-4 w-4 text-primary" />
                          <Button variant="link" size="sm" className="p-0 h-auto">
                            <Eye className="h-3 w-3 mr-1" />
                            View Photo
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  {event.notes && (
                    <div className="p-3 bg-muted/30 rounded border-l-4 border-primary">
                      <p className="text-sm text-muted-foreground mb-1">Farmer Notes</p>
                      <p className="text-sm">{event.notes}</p>
                    </div>
                  )}

                  {/* AI Analysis */}
                  <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      AI Analysis Report
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Satellite Verification</p>
                        <p className="font-medium text-success">
                          {event.ai_score > 85 ? 'High confidence' : 
                           event.ai_score > 70 ? 'Medium confidence' : 'Low confidence'}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Pattern Match</p>
                        <p className="font-medium text-success">
                          {event.practice_type === 'agroforestry' ? 'Tree signatures detected' : 'Cover crop patterns visible'}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Risk Level</p>
                        <p className="font-medium text-success">
                          {event.ai_score > 90 ? 'Low' : event.ai_score > 75 ? 'Medium' : 'High'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <Button
                      onClick={() => handleVerify(event.id, 'approve')}
                      disabled={verifyEventMutation.isPending}
                      className="gap-2 bg-success hover:bg-success/90"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Approve ({event.provisional_credits} tCO₂e)
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleVerify(event.id, 'reject')}
                      disabled={verifyEventMutation.isPending}
                      className="gap-2"
                    >
                      <X className="h-4 w-4" />
                      Reject
                    </Button>
                    <Button variant="outline" className="gap-2 ml-auto">
                      <Eye className="h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </div>
              ))}

              {pendingEvents.length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">
                    No pending verifications
                  </h3>
                  <p className="text-muted-foreground">
                    All practice submissions have been reviewed
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default Verification;