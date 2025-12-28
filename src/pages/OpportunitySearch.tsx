import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Search, DollarSign, Building2, MapPin, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const OpportunitySearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    setAside: "",
    postedDate: "",
    deadline: "",
  });

  // Mock opportunity data
  const opportunities = [
    {
      id: 1,
      title: "Cybersecurity Assessment Services for Department of Defense",
      agency: "Department of Defense",
      naics: "541512",
      setAside: "SDVOSB",
      postedDate: "2024-12-15",
      deadline: "2025-01-15",
      awardAmount: "$500,000 - $2,000,000",
      description:
        "The Department of Defense requires comprehensive cybersecurity assessment services to evaluate and enhance security posture across multiple facilities.",
      location: "Washington, DC",
    },
    {
      id: 2,
      title: "IT Infrastructure Modernization",
      agency: "Veterans Affairs",
      naics: "541519",
      setAside: "Small Business",
      postedDate: "2024-12-18",
      deadline: "2025-01-20",
      awardAmount: "$1,000,000 - $3,000,000",
      description: "Modernization of legacy IT infrastructure including hardware, software, and network components.",
      location: "Multiple Locations",
    },
    {
      id: 3,
      title: "Cloud Migration and Management Services",
      agency: "General Services Administration",
      naics: "541512",
      setAside: "WOSB",
      postedDate: "2024-12-20",
      deadline: "2025-01-25",
      awardAmount: "$750,000 - $1,500,000",
      description: "Migration of on-premise systems to cloud infrastructure with ongoing management and support.",
      location: "Remote",
    },
    {
      id: 4,
      title: "AI/ML Development for Data Analysis",
      agency: "Department of Energy",
      naics: "541519",
      setAside: "8(a)",
      postedDate: "2024-12-22",
      deadline: "2025-01-30",
      awardAmount: "$2,000,000 - $5,000,000",
      description: "Development of AI and machine learning solutions for advanced data analysis and predictive modeling.",
      location: "Remote / Hybrid",
    },
    {
      id: 5,
      title: "Network Security Implementation",
      agency: "Department of Homeland Security",
      naics: "541512",
      setAside: "Small Business",
      postedDate: "2024-12-23",
      deadline: "2025-02-01",
      awardAmount: "$800,000 - $1,800,000",
      description: "Implementation of advanced network security measures and continuous monitoring systems.",
      location: "Washington, DC",
    },
  ];

  const getDaysUntilDeadline = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const getSetAsideColor = (setAside: string) => {
    const colors: Record<string, string> = {
      SDVOSB: "bg-purple-100 text-purple-800",
      WOSB: "bg-pink-100 text-pink-800",
      "Small Business": "bg-blue-100 text-blue-800",
      "8(a)": "bg-green-100 text-green-800",
      HubZone: "bg-orange-100 text-orange-800",
    };
    return colors[setAside] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Search Opportunities</h1>
              <p className="text-sm text-gray-600">Find federal contracting opportunities that match your business</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
                <CardDescription>Refine your search</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Set-Aside Type */}
                <div className="space-y-2">
                  <Label>Set-Aside Type</Label>
                  <div className="space-y-2">
                    {["SDVOSB", "WOSB", "Small Business", "8(a)", "HubZone"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={type} />
                        <label htmlFor={type} className="text-sm cursor-pointer">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Posted Date */}
                <div className="space-y-2">
                  <Label htmlFor="postedDate">Posted Date</Label>
                  <Select value={selectedFilters.postedDate} onValueChange={(value) => setSelectedFilters({ ...selectedFilters, postedDate: value })}>
                    <SelectTrigger id="postedDate">
                      <SelectValue placeholder="Any time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This week</SelectItem>
                      <SelectItem value="month">This month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* NAICS Code */}
                <div className="space-y-2">
                  <Label htmlFor="naics">NAICS Code</Label>
                  <Input id="naics" placeholder="e.g., 541512" />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="City, State" />
                </div>

                {/* Award Amount */}
                <div className="space-y-2">
                  <Label>Award Amount</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Min" type="number" />
                    <Input placeholder="Max" type="number" />
                  </div>
                </div>

                <Button className="w-full">Apply Filters</Button>
                <Button variant="outline" className="w-full">
                  Clear All
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search Bar */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by keywords, agency, or NAICS code..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button>Search</Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Count */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{opportunities.length}</span> opportunities
              </p>
              <Select defaultValue="relevance">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="posted">Recently Posted</SelectItem>
                  <SelectItem value="amount">Award Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Opportunity Cards */}
            <div className="space-y-4">
              {opportunities.map((opp) => {
                const daysLeft = getDaysUntilDeadline(opp.deadline);
                return (
                  <Card key={opp.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">
                            <Link to={`/opportunities/${opp.id}`} className="hover:text-blue-600">
                              {opp.title}
                            </Link>
                          </CardTitle>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Building2 className="h-4 w-4" />
                              {opp.agency}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {opp.location}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Bookmark className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-700 mb-4">{opp.description}</p>
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <Badge className={getSetAsideColor(opp.setAside)}>{opp.setAside}</Badge>
                          <Badge variant="outline">NAICS: {opp.naics}</Badge>
                          <span className="flex items-center gap-1 text-sm text-gray-600">
                            <DollarSign className="h-4 w-4" />
                            {opp.awardAmount}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Deadline</p>
                            <p className={`text-sm font-semibold ${daysLeft <= 7 ? "text-red-600" : "text-gray-900"}`}>
                              {new Date(opp.deadline).toLocaleDateString()} ({daysLeft} days)
                            </p>
                          </div>
                          <Button asChild>
                            <Link to={`/opportunities/${opp.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunitySearch;
