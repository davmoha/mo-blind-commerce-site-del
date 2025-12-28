import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Calendar,
  DollarSign,
  MapPin,
  FileText,
  Download,
  Bookmark,
  BookmarkCheck,
  ArrowLeft,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const OpportunityDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  const [status, setStatus] = useState<"saved" | "in_progress" | "applied" | "declined">("saved");

  // Mock opportunity data
  const opportunity = {
    id: 1,
    title: "Cybersecurity Assessment Services for Department of Defense",
    agency: "Department of Defense",
    subAgency: "Defense Information Systems Agency",
    naics: "541512",
    setAside: "SDVOSB",
    postedDate: "2024-12-15",
    deadline: "2025-01-15",
    responseDeadline: "2025-01-15T17:00:00",
    awardAmount: "$500,000 - $2,000,000",
    contractType: "Firm Fixed Price",
    placeOfPerformance: "Washington, DC and surrounding areas",
    description:
      "The Department of Defense requires comprehensive cybersecurity assessment services to evaluate and enhance security posture across multiple facilities. This contract will involve penetration testing, vulnerability assessments, and security audits across various DoD installations.",
    requirements: [
      "Valid DoD Secret Clearance required for all personnel",
      "Minimum 5 years experience in cybersecurity assessments",
      "CISSP or equivalent certification required",
      "Experience with DoD security frameworks (RMF, NIST 800-53)",
      "Proven track record of similar contracts",
    ],
    evaluationCriteria: [
      "Technical approach and methodology (40%)",
      "Past performance and references (30%)",
      "Key personnel qualifications (20%)",
      "Price reasonableness (10%)",
    ],
    submissionGuidelines: [
      "Proposals must be submitted via SAM.gov portal",
      "Page limit: 50 pages (excluding resumes and past performance)",
      "Font: Times New Roman 12pt",
      "Margins: 1 inch on all sides",
      "Include SF-330 forms for all key personnel",
    ],
    contacts: [
      {
        name: "Jane Smith",
        role: "Contracting Officer",
        email: "jane.smith@dod.gov",
        phone: "(555) 123-4567",
      },
      {
        name: "John Doe",
        role: "Technical Point of Contact",
        email: "john.doe@dod.gov",
        phone: "(555) 987-6543",
      },
    ],
    documents: [
      { name: "Request for Proposal (RFP)", size: "2.5 MB", type: "PDF" },
      { name: "Statement of Work", size: "1.2 MB", type: "PDF" },
      { name: "Wage Determination", size: "500 KB", type: "PDF" },
      { name: "SF-330 Template", size: "200 KB", type: "DOCX" },
    ],
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Removed from saved" : "Saved",
      description: isSaved ? "Opportunity removed from your saved list" : "Opportunity added to your saved list",
    });
  };

  const handleGenerateProposal = () => {
    toast({
      title: "Generating Proposal",
      description: "Your proposal is being generated. This may take a few minutes.",
    });
  };

  const daysLeft = getDaysUntilDeadline(opportunity.deadline);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild>
              <Link to="/search">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Search
              </Link>
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSave}>
                {isSaved ? <BookmarkCheck className="h-4 w-4 mr-2" /> : <Bookmark className="h-4 w-4 mr-2" />}
                {isSaved ? "Saved" : "Save"}
              </Button>
              <Button onClick={handleGenerateProposal}>Generate Proposal</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Quick Info */}
            <Card>
              <CardHeader>
                <div className="space-y-4">
                  <div>
                    <CardTitle className="text-2xl mb-3">{opportunity.title}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-purple-100 text-purple-800">{opportunity.setAside}</Badge>
                      <Badge variant="outline">NAICS: {opportunity.naics}</Badge>
                      <Badge variant="secondary">{opportunity.contractType}</Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building2 className="h-4 w-4" />
                      <div>
                        <p className="font-medium text-gray-900">{opportunity.agency}</p>
                        <p className="text-xs">{opportunity.subAgency}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{opportunity.placeOfPerformance}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="h-4 w-4" />
                      <span>{opportunity.awardAmount}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Posted: {new Date(opportunity.postedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Deadline Warning */}
            {daysLeft <= 14 && (
              <div className={`p-4 rounded-lg border ${daysLeft <= 7 ? "bg-red-50 border-red-200" : "bg-orange-50 border-orange-200"}`}>
                <div className="flex items-start gap-3">
                  <AlertCircle className={`h-5 w-5 mt-0.5 ${daysLeft <= 7 ? "text-red-600" : "text-orange-600"}`} />
                  <div>
                    <p className={`font-medium ${daysLeft <= 7 ? "text-red-900" : "text-orange-900"}`}>
                      {daysLeft <= 7 ? "Urgent Deadline" : "Upcoming Deadline"}
                    </p>
                    <p className={`text-sm ${daysLeft <= 7 ? "text-red-700" : "text-orange-700"}`}>
                      Response due in {daysLeft} days on {new Date(opportunity.deadline).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="contacts">Contacts</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{opportunity.description}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Evaluation Criteria</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {opportunity.evaluationCriteria.map((criterion, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span className="text-gray-700">{criterion}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requirements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {opportunity.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Submission Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {opportunity.submissionGuidelines.map((guideline, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span className="text-gray-700">{guideline}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Documents</CardTitle>
                    <CardDescription>Download related documents and templates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {opportunity.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-gray-600" />
                            <div>
                              <p className="font-medium text-sm">{doc.name}</p>
                              <p className="text-xs text-gray-600">
                                {doc.type} • {doc.size}
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contacts" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Contacts</CardTitle>
                    <CardDescription>Points of contact for this opportunity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {opportunity.contacts.map((contact, index) => (
                        <div key={index}>
                          {index > 0 && <Separator className="my-4" />}
                          <div>
                            <p className="font-medium text-gray-900">{contact.name}</p>
                            <p className="text-sm text-gray-600 mb-2">{contact.role}</p>
                            <div className="space-y-1 text-sm">
                              <p className="text-gray-700">
                                <span className="font-medium">Email:</span> {contact.email}
                              </p>
                              <p className="text-gray-700">
                                <span className="font-medium">Phone:</span> {contact.phone}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Posted</p>
                    <p className="text-sm text-gray-600">{new Date(opportunity.postedDate).toLocaleDateString()}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Response Deadline</p>
                    <p className={`text-sm font-semibold ${daysLeft <= 7 ? "text-red-600" : "text-gray-900"}`}>
                      {new Date(opportunity.deadline).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{daysLeft} days remaining</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Your Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    variant={status === "saved" ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setStatus("saved")}
                  >
                    Saved
                  </Button>
                  <Button
                    variant={status === "in_progress" ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setStatus("in_progress")}
                  >
                    In Progress
                  </Button>
                  <Button
                    variant={status === "applied" ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setStatus("applied")}
                  >
                    Applied
                  </Button>
                  <Button
                    variant={status === "declined" ? "destructive" : "outline"}
                    className="w-full"
                    onClick={() => setStatus("declined")}
                  >
                    Declined
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" onClick={handleGenerateProposal}>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Proposal
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Add to Calendar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetail;
