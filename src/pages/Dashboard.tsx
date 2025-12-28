import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Search, TrendingUp, Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock data for dashboard
  const activeOpportunities = [
    {
      id: 1,
      title: "Cybersecurity Assessment Services",
      agency: "Department of Defense",
      deadline: "2025-01-15",
      status: "saved",
      setAside: "SDVOSB",
    },
    {
      id: 2,
      title: "IT Infrastructure Modernization",
      agency: "Veterans Affairs",
      deadline: "2025-01-20",
      status: "in_progress",
      setAside: "Small Business",
    },
    {
      id: 3,
      title: "Cloud Migration Services",
      agency: "General Services Administration",
      deadline: "2025-01-25",
      status: "saved",
      setAside: "WOSB",
    },
  ];

  const recentActivity = [
    { action: "Generated proposal", item: "Cybersecurity Assessment Services", date: "2 hours ago" },
    { action: "Saved opportunity", item: "IT Infrastructure Modernization", date: "5 hours ago" },
    { action: "Updated profile", item: "Added NAICS codes", date: "1 day ago" },
  ];

  const stats = [
    { label: "Active Opportunities", value: "12", icon: Search, color: "text-blue-600" },
    { label: "Proposals Generated", value: "8", icon: FileText, color: "text-green-600" },
    { label: "Upcoming Deadlines", value: "5", icon: Clock, color: "text-orange-600" },
    { label: "Success Rate", value: "35%", icon: TrendingUp, color: "text-purple-600" },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      saved: "outline",
      in_progress: "default",
      applied: "secondary",
      declined: "destructive",
    };
    return <Badge variant={variants[status] || "outline"}>{status.replace("_", " ")}</Badge>;
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SAM.gov Procurement Assistant</h1>
              <p className="text-sm text-gray-600">Welcome back! Here's your overview.</p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link to="/search">Search Opportunities</Link>
              </Button>
              <Button asChild>
                <Link to="/profile">Company Profile</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Opportunities */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
                <TabsTrigger value="proposals">Proposals</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Opportunities</CardTitle>
                    <CardDescription>Opportunities you're tracking</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {activeOpportunities.map((opp) => {
                      const daysLeft = getDaysUntilDeadline(opp.deadline);
                      return (
                        <div key={opp.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{opp.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{opp.agency}</p>
                            </div>
                            {getStatusBadge(opp.status)}
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1 text-gray-600">
                                <Calendar className="h-4 w-4" />
                                {daysLeft} days left
                              </span>
                              <Badge variant="secondary">{opp.setAside}</Badge>
                            </div>
                            <Button size="sm" variant="outline" asChild>
                              <Link to={`/opportunities/${opp.id}`}>View</Link>
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="deadlines" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Deadlines</CardTitle>
                    <CardDescription>Don't miss these submission dates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {activeOpportunities.map((opp) => {
                        const daysLeft = getDaysUntilDeadline(opp.deadline);
                        return (
                          <div key={opp.id} className="flex items-center justify-between py-3 border-b last:border-0">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{opp.title}</p>
                              <p className="text-xs text-gray-600">{opp.agency}</p>
                            </div>
                            <div className="text-right">
                              <p className={`text-sm font-semibold ${daysLeft <= 7 ? "text-red-600" : "text-gray-900"}`}>
                                {new Date(opp.deadline).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-gray-600">{daysLeft} days</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="proposals" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Proposals</CardTitle>
                    <CardDescription>Your generated proposals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                      <p className="text-gray-600">No proposals yet</p>
                      <Button className="mt-4" asChild>
                        <Link to="/proposals/generate">Generate First Proposal</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Activity & Alerts */}
          <div className="space-y-6">
            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-orange-50 border border-orange-200 rounded p-3">
                    <p className="text-sm font-medium text-orange-900">Action Required</p>
                    <p className="text-xs text-orange-700 mt-1">Complete your company profile to get better matches</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <p className="text-sm font-medium text-blue-900">New Opportunities</p>
                    <p className="text-xs text-blue-700 mt-1">5 new opportunities match your profile</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-600"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-600">{activity.item}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
