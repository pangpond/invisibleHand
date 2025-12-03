import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { GM_xmlhttpRequest } from '$';
import { PanelRightOpen, PanelRightClose, RefreshCw, AlertCircle, Users, Activity, CreditCard } from 'lucide-react';

const CONFIG = {
  API_URL: 'https://jsonplaceholder.typicode.com/users',
  PANE_TITLE: 'Dashboard',
  AUTO_LOAD: true,
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePane = () => setIsOpen(!isOpen);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    setData([]);

    GM_xmlhttpRequest({
      method: 'GET',
      url: CONFIG.API_URL,
      onload: (response) => {
        if (response.status === 200) {
          try {
            const parsedData = JSON.parse(response.responseText);
            setData(Array.isArray(parsedData) ? parsedData : [parsedData]);
          } catch (e) {
            setError('Failed to parse JSON data.');
            console.error(e);
          }
        } else {
          setError(`API Error: ${response.status} ${response.statusText}`);
        }
        setLoading(false);
      },
      onerror: (err) => {
        setError('Network error occurred.');
        console.error(err);
        setLoading(false);
      },
    });
  };

  useEffect(() => {
    if (CONFIG.AUTO_LOAD) {
      fetchData();
    }
  }, []);

  // Calculate metrics
  const totalUsers = data.length;
  const activeCompanies = new Set(data.map(u => u.company?.name)).size;

  return (
    <>
      {/* Floating Toggle Button */}
      <div
        className={`
          fixed top-1/2 right-0 -translate-y-1/2 z-[2147483647]
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}
        `}
      >
        <Button
          onClick={togglePane}
          variant="secondary"
          size="icon"
          className="rounded-l-xl rounded-r-none h-12 w-10 shadow-lg border-l border-y border-border/50 bg-background/80 backdrop-blur-sm hover:bg-accent/80"
        >
          <PanelRightOpen className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>

      {/* Glassmorphic Side Pane */}
      <div
        id="sp-pane"
        className={`
          fixed top-0 right-0
          w-[500px] h-screen
          bg-background/95 backdrop-blur-xl
          z-[2147483647] shadow-2xl
          transition-transform duration-300 ease-out
          flex flex-col border-l border-border/50
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="p-6 pb-4 flex justify-between items-center bg-background/40">
          <div className="flex items-center gap-4">
             <Avatar className="h-9 w-9">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            <div>
              <h2 className="text-lg font-semibold tracking-tight">{CONFIG.PANE_TITLE}</h2>
              <p className="text-xs text-muted-foreground">Welcome back, User</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <Button
                variant="outline"
                size="icon"
                onClick={fetchData}
                disabled={loading}
                className="h-8 w-8"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            <Button variant="ghost" size="icon" onClick={togglePane} className="h-8 w-8 rounded-full hover:bg-muted/50">
              <PanelRightClose className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-muted/5 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>Analytics</TabsTrigger>
              <TabsTrigger value="reports" disabled>Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {/* Metrics Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Users
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalUsers}</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Companies
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{activeCompanies}</div>
                    <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                 <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                      +201 since last hour
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Sales / Data List */}
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    You have {totalUsers} items in your list.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {error && (
                        <div className="flex items-center gap-3 text-destructive p-4 bg-destructive/5 border border-destructive/10 rounded-lg text-sm">
                        <AlertCircle className="h-4 w-4" />
                        {error}
                        </div>
                    )}

                    {!loading && !error && data.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-20 text-muted-foreground space-y-2">
                            <p className="text-sm italic">No data available</p>
                        </div>
                    )}

                    {data.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.username || index}`} alt="Avatar" />
                          <AvatarFallback>{(item.name || 'U').substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">{item.name || 'Unknown'}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.email || 'no-email@example.com'}
                          </p>
                        </div>
                        <div className="ml-auto font-medium">
                          {item.company?.name ? `+${(Math.random() * 1000).toFixed(2)}` : 'N/A'}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/40 bg-background/40 text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                Invisible Hand Dashboard
            </p>
        </div>
      </div>
    </>
  );
}

export default App;
