import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  Users, 
  MapPin, 
  Activity, 
  CheckCircle, 
  Package, 
  Settings,
  Info,
  Globe,
  Menu,
  X
} from 'lucide-react';
import { t, setLanguage, getLanguage, type Language } from '@/lib/i18n';

const navItems = [
  { path: '/', icon: Activity, label: 'dashboard' },
  { path: '/farmers', icon: Users, label: 'farmers' },
  { path: '/plots', icon: MapPin, label: 'plots' },
  { path: '/practices', icon: Leaf, label: 'practices' },
  { path: '/verification', icon: CheckCircle, label: 'verification' },
  { path: '/lots', icon: Package, label: 'lots' },
  { path: '/admin', icon: Settings, label: 'admin' },
  { path: '/about', icon: Info, label: 'about' },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setCurrentLanguage] = useState<Language>(getLanguage());

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'sw' : 'en';
    setLanguage(newLang);
    setCurrentLanguage(newLang);
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Leaf className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Climate Credits Kenya</h1>
              <p className="text-xs text-muted-foreground">Nyeri & Meru Regions</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={toggleLanguage}
              className="gap-2"
            >
              <Globe className="h-4 w-4" />
              {language.toUpperCase()}
            </Button>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
          <Card className="m-4 p-6">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                      isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {t(item.label as keyof typeof import('@/lib/i18n').translations.en)}
                  </Link>
                );
              })}
            </nav>
          </Card>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {t(item.label as keyof typeof import('@/lib/i18n').translations.en)}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;