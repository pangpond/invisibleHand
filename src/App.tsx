import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { GM_xmlhttpRequest } from "$";
import {
  PanelRightOpen,
  PanelRightClose,
  RefreshCw,
  AlertCircle,
  Users,
  Activity,
  CreditCard,
  CalendarCheck,
  Hotel,
  BedDouble,
} from "lucide-react";

const CONFIG = {
  API_URL: "https://dummyjson.com/users?limit=10",
  PANE_TITLE: "Pre Check-In Dashboard",
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
      method: "GET",
      url: CONFIG.API_URL,
      onload: (response) => {
        if (response.status === 200) {
          try {
            const parsedData = JSON.parse(response.responseText);
            // Handle dummyjson structure { users: [...] }
            const users =
              parsedData.users ||
              (Array.isArray(parsedData) ? parsedData : [parsedData]);
            setData(users);
          } catch (e) {
            setError("Failed to parse JSON data.");
            console.error(e);
          }
        } else {
          setError(`API Error: ${response.status} ${response.statusText}`);
        }
        setLoading(false);
      },
      onerror: (err) => {
        setError("Network error occurred.");
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
  const activeCompanies = new Set(data.map((u) => u.company?.name)).size;

  return (
    <>
      {/* Floating Toggle Button */}
      <div
        className={`
          fixed top-1/2 right-0 -translate-y-1/2 z-[2147483647]
          transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"}
        `}
      >
        <Button
          onClick={togglePane}
          variant="secondary"
          size="icon"
          className="rounded-l-3xl rounded-r-none h-24 w-20 shadow-2xl border-l border-y border-border/50 bg-background/90 backdrop-blur-md hover:bg-accent/90"
        >
          <PanelRightOpen className="h-12 w-12 text-brand" />
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
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="p-10 pb-8 flex justify-between items-center bg-background/60 backdrop-blur-md">
          <div className="flex items-center gap-8">
            <Avatar className="h-32 w-32 ring-4 ring-background shadow-xl">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="text-4xl">CN</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h2 className="text-5xl font-bold tracking-tight text-foreground">
                {CONFIG.PANE_TITLE}
              </h2>
              <p className="text-2xl text-muted-foreground font-medium">
                Welcome back, User
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={fetchData}
              disabled={loading}
              className="h-20 w-20 rounded-full hover:bg-muted/50"
            >
              <RefreshCw
                className={`h-10 w-10 ${loading ? "animate-spin" : ""}`}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePane}
              className="h-20 w-20 rounded-full hover:bg-muted/50"
            >
              <PanelRightClose className="h-10 w-10" />
            </Button>
          </div>
        </div>

        <Separator />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-muted/5 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {/* Metrics Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                    <CardTitle className="text-2xl font-semibold text-muted-foreground">
                      Total
                    </CardTitle>
                    <Users className="h-12 w-12 text-brand" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-6xl font-extrabold tracking-tight">
                      {totalUsers}
                    </div>
                    <p className="text-xl text-muted-foreground mt-3 font-medium">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                    <CardTitle className="text-2xl font-semibold text-muted-foreground">
                      Active
                    </CardTitle>
                    <Hotel className="h-12 w-12 text-brand" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-6xl font-extrabold tracking-tight">
                      {activeCompanies}
                    </div>
                    <p className="text-xl text-muted-foreground mt-3 font-medium">
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                    <CardTitle className="text-2xl font-semibold text-muted-foreground">
                      Past
                    </CardTitle>
                    <BedDouble className="h-12 w-12 text-brand" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-6xl font-extrabold tracking-tight">
                      +12,234
                    </div>
                    <p className="text-xl text-muted-foreground mt-3 font-medium">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                    <CardTitle className="text-2xl font-semibold text-muted-foreground">
                      Today
                    </CardTitle>
                    <CalendarCheck className="h-12 w-12 text-brand" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-6xl font-extrabold tracking-tight">
                      +573
                    </div>
                    <p className="text-xl text-muted-foreground mt-3 font-medium">
                      +201 since last hour
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Sales / Data List */}
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent</CardTitle>
                  <CardDescription>
                    You have {totalUsers} items in your list.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {error && (
                      <div className="flex items-center gap-4 text-destructive p-6 bg-destructive/5 border border-destructive/10 rounded-xl text-xl font-medium">
                        <AlertCircle className="h-8 w-8" />
                        {error}
                      </div>
                    )}

                    {!loading && !error && data.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-40 text-muted-foreground space-y-4">
                        <p className="text-2xl italic font-medium">
                          No data available
                        </p>
                      </div>
                    )}

                    {data.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center p-4 rounded-2xl hover:bg-emerald-200/50 transition-colors border border-neutral-200"
                      >
                        <Avatar className="h-24 w-24 ring-4 ring-border">
                          <AvatarImage src={item.image} alt="Avatar" />
                          <AvatarFallback className="text-3xl font-bold">
                            {(item.firstName || "U")
                              .substring(0, 1)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-8 space-y-3">
                          <p className="text-2xl font-bold leading-none text-foreground">
                            {item.firstName} {item.lastName}
                          </p>
                          <p className="text-xl text-muted-foreground font-medium">
                            {item.email || "no-email@example.com"}
                          </p>
                          <div className="font-bold text-2xl text-foreground">
                            {`+$${(item.id * 123.45).toFixed(2)}`}
                          </div>
                        </div>
                        <div className="ml-auto flex items-center gap-4">
                          {window.location.href ===
                            "https://ns.local/comanche" && (
                            <Button className="bg-brand !text-white hover:bg-brand/90">
                              Action
                            </Button>
                          )}
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
        <div className="p-6 border-t border-border/40 bg-background/40 text-center">
          <p className="text-sm text-muted-foreground uppercase tracking-[0.2em] font-bold">
            Invisible Hand Dashboard
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
