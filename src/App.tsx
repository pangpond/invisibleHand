import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GradiantButton } from "@/components/ui/gradiant-button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import travellerData from "./data/traveller.json";
import {
  PanelRightOpen,
  PanelRightClose,
  RefreshCw,
  Users,
  Activity,
  CreditCard,
  CalendarCheck,
  Hotel,
  BedDouble,
} from "lucide-react";

const CONFIG = {
  PANE_TITLE: "Pre Check-In Dashboard",
};

const buttonOuterClass =
  "relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium text-pretty text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 shadow-lg hover:shadow-purple-500/50 border border-input text-decoration-none";
const buttonInnerClass =
  "relative px-5 py-2 transition-all ease-in duration-75 bg-white rounded-md text-decoration-none";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [data] = useState<any[]>(travellerData);

  const togglePane = () => setIsOpen((prev) => !prev);

  const handlePass = (item: any) => {
    const fieldMap = {
      "traveller-given_names": item.passport?.given_names,
      "traveller-surname": item.passport?.surname,
      "traveller-email": item.contact?.email,
      "traveller-mobile": item.contact?.mobile,
      "traveller-document_type": item.passport?.document_type,
      "traveller-issuing_state": item.passport?.issuing_state,
      "traveller-passport_number": item.passport?.passport_number,
      "traveller-nationality": item.passport?.nationality,
      "traveller-date_of_birth": item.passport?.date_of_birth,
      "traveller-sex": item.passport?.sex,
      "traveller-date_of_expiry": item.passport?.date_of_expiry,
      "traveller-raw_mrz": item.passport?.raw_mrz,
      "traveller-confidence": item.passport?.confidence,
      "traveller-response_ms": item.passport?.response_ms,
      "traveller-face_s3_url": item.passport?.face_s3_url,
      "traveller-register_status": item.passport?.register_status,
    };

    Object.entries(fieldMap).forEach(([id, value]) => {
      const element = document.getElementById(id) as HTMLInputElement;
      if (element) {
        element.value = value || "";
        element.dispatchEvent(new Event("input", { bubbles: true }));
        element.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
  };

  // Calculate metrics
  const totalUsers = data.length;
  // const activeCompanies = new Set(data.map((u) => u.company?.name)).size;

  return (
    <>
      {/* Glassmorphic Side Pane */}
      <div
        id="sp-pane"
        className={`
          fixed top-0
          w-[500px] h-screen
          bg-[#f8fafc]
          z-[2147483647] shadow-2xl
          transition-all duration-300 ease-out
          flex flex-col border-l border-border/50 pointer-events-auto
          ${isOpen ? "right-0" : "-right-[500px]"}
        `}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 p-10 pb-8 flex justify-between items-center bg-background/50 backdrop-blur-md border-b border-border/50">
          <div className="flex items-center gap-8">
            <Avatar className="h-16 w-16 ring-4 ring-background shadow-xl">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="text-4xl">CN</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 from-10% via-pink-500 to-purple-500 to-90%">
                  {CONFIG.PANE_TITLE}
                </span>
              </h2>
              <p className="text-medium text-muted-foreground font-medium">
                Welcome back, User
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              disabled
              className="h-12 w-12 rounded-full hover:bg-muted/50 text-gray-400"
            >
              <RefreshCw className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePane}
              className="h-12 w-12 rounded-full hover:bg-muted/50 text-gray-400"
            >
              <PanelRightClose className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 pt-48 bg-muted/5 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
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
                    <Users className="h-10 w-10 text-brand" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-extrabold tracking-tight">
                      {totalUsers}
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 font-medium">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                    <CardTitle className="text-2xl font-semibold text-muted-foreground">
                      Active
                    </CardTitle>
                    <Hotel className="h-10 w-10 text-brand" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-extrabold tracking-tight">
                      --
                      {/* {activeCompanies} */}
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 font-medium">
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                    <CardTitle className="text-2xl font-semibold text-muted-foreground">
                      Past
                    </CardTitle>
                    <BedDouble className="h-10 w-10 text-brand" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-extrabold tracking-tight">
                      +12,234
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 font-medium">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                    <CardTitle className="text-2xl font-semibold text-muted-foreground">
                      Today
                    </CardTitle>
                    <CalendarCheck className="h-10 w-10 text-brand" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-extrabold tracking-tight">
                      +573
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 font-medium">
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
                    {data.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-40 text-muted-foreground space-y-4">
                        <p className="text-2xl italic font-medium">
                          No data available
                        </p>
                      </div>
                    )}

                    {data.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center p-4 rounded-2xl hover:bg-muted/60 transition-colors border border-neutral-200 mb-3"
                      >
                        <Avatar className="h-12 w-12 ring-4 ring-border">
                          <AvatarImage
                            src={item.passport?.face_s3_url}
                            alt="Avatar"
                          />
                          <AvatarFallback className="text-2xl font-bold">
                            {(item.passport?.given_names || "U")
                              .substring(0, 1)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-8 space-y-3">
                          <p className="text-medium font-bold leading-none text-foreground">
                            {item.passport?.given_names}{" "}
                            {item.passport?.surname}
                          </p>
                          <p className="text-medium text-muted-foreground font-medium">
                            {item.contact?.email || "no-email@example.com"}
                          </p>
                        </div>
                        <div className="ml-auto flex items-center gap-4">
                          {window.location.href ===
                            import.meta.env.VITE_CHECKIN_URI && (
                            <a
                              onClick={() => handlePass(item)}
                              className={buttonOuterClass}
                            >
                              <span className={buttonInnerClass}>Pass</span>
                            </a>
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

      {/* Floating Toggle Button */}
      <div
        className={`
          fixed top-1/2 right-0 -translate-y-1/2 z-[2147483647]
          transition-all duration-300 ease-in-out pointer-events-auto
          ${
            isOpen
              ? "translate-x-full opacity-100"
              : "translate-x-0 opacity-100"
          }
        `}
      >
        <Button
          onClick={togglePane}
          variant="secondary"
          size="icon"
          className="rounded-l-3xl rounded-r-none h-20 w-20 shadow-2xl border-l border-y border-border/50 bg-background/90  hover:bg-accent/90"
        >
          <PanelRightOpen className="h-8 w-8 text-brand" />
        </Button>
      </div>
    </>
  );
}

export default App;
