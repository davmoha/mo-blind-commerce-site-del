import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, Clock, CheckCircle, Download, Edit, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ProposalList = () => {
  // Mock proposal data
  const proposals = [
    {
      id: 1,
      title: "Cybersecurity Assessment Services",
      opportunity: "Department of Defense",
      status: "draft",
      createdAt: "2024-12-20",
      updatedAt: "2024-12-28",
      deadline: "2025-01-15",
      progress: 85,
    },
    {
      id: 2,
      title: "IT Infrastructure Modernization",
      opportunity: "Veterans Affairs",
      status: "review",
      createdAt: "2024-12-18",
      updatedAt: "2024-12-27",
      deadline: "2025-01-20",
      progress: 100,
    },
    {
      id: 3,
      title: "Cloud Migration Services",
      opportunity: "General Services Administration",
      status: "submitted",
      createdAt: "2024-12-15",
      updatedAt: "2024-12-25",
      deadline: "2025-01-25",
      progress: 100,
    },
  ];

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: "default" | "secondary" | "outline" | "destructive"; label: string; color: string }> = {
      draft: { variant: "outline", label: "Draft", color: "text-gray-600" },
      review: { variant: "secondary", label: "In Review", color: "text-blue-600" },
      submitted: { variant: "default", label: "Submitted", color: "text-green-600" },
    };
    const { variant, label } = config[status] || config.draft;
    return <Badge variant={variant}>{label}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "review":
        return <Clock className="h-5 w-5 text-blue-600" />;
      default:
        return <Edit className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Proposals</h1>
              <p className="text-sm text-gray-600">View and manage your generated proposals</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Proposals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{proposals.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{proposals.filter((p) => p.status === "draft").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">In Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{proposals.filter((p) => p.status === "review").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Submitted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{proposals.filter((p) => p.status === "submitted").length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Proposals List */}
        <div className="space-y-4">
          {proposals.map((proposal) => (
            <Card key={proposal.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      {getStatusIcon(proposal.status)}
                    </div>
                    <div>
                      <CardTitle className="text-lg mb-1">{proposal.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mb-2">
                        {proposal.opportunity}
                      </CardDescription>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>Created: {new Date(proposal.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>Updated: {new Date(proposal.updatedAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>Deadline: {new Date(proposal.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(proposal.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Completion</span>
                      <span className="font-medium">{proposal.progress}%</span>
                    </div>
                    <Progress value={proposal.progress} className="h-2" />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {proposal.status === "draft" && (
                      <Button asChild>
                        <Link to={`/proposals/${proposal.id}/edit`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Continue Editing
                        </Link>
                      </Button>
                    )}
                    {proposal.status === "review" && (
                      <Button asChild>
                        <Link to={`/proposals/${proposal.id}/edit`}>
                          <FileText className="h-4 w-4 mr-2" />
                          Review Proposal
                        </Link>
                      </Button>
                    )}
                    {proposal.status === "submitted" && (
                      <Button variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        View Proposal
                      </Button>
                    )}
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State (when no proposals) */}
        {proposals.length === 0 && (
          <Card>
            <CardContent className="py-16">
              <div className="text-center">
                <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No proposals yet</h3>
                <p className="text-gray-600 mb-6">Start by finding an opportunity and generating your first proposal</p>
                <Button asChild>
                  <Link to="/search">Search Opportunities</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProposalList;
