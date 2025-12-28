import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Download,
  Save,
  Edit,
  ArrowLeft,
  Sparkles,
  RefreshCw,
  Eye,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ProposalEditor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [proposalSections, setProposalSections] = useState({
    executiveSummary: `Tech Solutions Inc. is pleased to submit this proposal for Cybersecurity Assessment Services. As a Service-Disabled Veteran-Owned Small Business with over 10 years of experience in federal cybersecurity, we bring proven expertise and commitment to excellence.

Our team of certified professionals will conduct comprehensive security assessments across all DoD facilities, identifying vulnerabilities and providing actionable recommendations to enhance your security posture.`,
    technicalApproach: `Our technical approach follows a proven 4-phase methodology:

Phase 1: Discovery and Planning (Weeks 1-2)
- Conduct initial stakeholder meetings
- Review existing security documentation
- Define assessment scope and schedule
- Establish secure communication channels

Phase 2: Assessment Execution (Weeks 3-8)
- Perform network vulnerability assessments
- Conduct penetration testing
- Review security configurations
- Assess compliance with NIST 800-53 controls

Phase 3: Analysis and Reporting (Weeks 9-10)
- Analyze findings and prioritize risks
- Develop comprehensive assessment reports
- Create remediation roadmaps
- Present findings to stakeholders

Phase 4: Remediation Support (Weeks 11-12)
- Provide guidance on remediation activities
- Conduct follow-up assessments
- Deliver final documentation
- Knowledge transfer sessions`,
    pastPerformance: `Tech Solutions Inc. has successfully completed similar cybersecurity assessment contracts:

1. Department of Veterans Affairs - Network Security Assessment (2023)
   - Contract Value: $800,000
   - POC: John Smith, (555) 123-4567, john.smith@va.gov
   - Successfully assessed 15 facilities across 6 states
   - Identified and helped remediate 200+ vulnerabilities
   - Completed ahead of schedule with exceptional feedback

2. Department of Defense - Penetration Testing Services (2022)
   - Contract Value: $1.2M
   - POC: Sarah Johnson, (555) 987-6543, s.johnson@dod.gov
   - Conducted comprehensive penetration testing
   - Achieved 98% remediation rate
   - Awarded additional task orders based on performance`,
    keyPersonnel: `Our team consists of highly qualified cybersecurity professionals:

Project Manager: Michael Rodriguez, PMP, CISSP
- 15 years federal cybersecurity experience
- Former DoD security analyst
- Managed 20+ similar assessment projects

Lead Security Analyst: Jennifer Lee, CISSP, CEH, GPEN
- 12 years penetration testing experience
- DoD Secret Clearance
- Expert in NIST frameworks

Network Security Engineer: David Chen, CCNP Security, GIAC
- 10 years network security experience
- Specialized in DoD environments
- Published researcher in cybersecurity`,
    management: `Our project management approach ensures successful delivery:

Quality Assurance:
- Peer review of all assessment findings
- Third-party validation of critical vulnerabilities
- Regular quality audits throughout the project

Communication:
- Weekly status reports to contracting officer
- Bi-weekly stakeholder meetings
- 24/7 emergency communication protocol

Risk Management:
- Comprehensive risk register maintained
- Proactive mitigation strategies
- Escalation procedures for critical issues`,
    pricing: `COST BREAKDOWN

Labor Costs:
- Project Manager (500 hours @ $150/hr): $75,000
- Lead Security Analyst (800 hours @ $125/hr): $100,000
- Network Security Engineer (800 hours @ $110/hr): $88,000
- Additional Analysts (1200 hours @ $95/hr): $114,000

Total Labor: $377,000

Other Direct Costs:
- Travel: $25,000
- Tools & Software Licenses: $15,000
- Report Development: $8,000

Total ODC: $48,000

Subtotal: $425,000
G&A (8%): $34,000
Profit (10%): $42,500

TOTAL PRICE: $501,500`,
  });

  const handleSave = () => {
    toast({
      title: "Saved",
      description: "Your proposal has been saved successfully.",
    });
  };

  const handleExport = (format: "word" | "pdf") => {
    toast({
      title: "Exporting",
      description: `Generating ${format.toUpperCase()} file...`,
    });
  };

  const handleRegenerate = (section: string) => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Section Regenerated",
        description: "The section has been regenerated with updated content.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link to="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Cybersecurity Assessment Services - Proposal</h1>
                <p className="text-sm text-gray-600">Department of Defense • Due: Jan 15, 2025</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={() => handleExport("word")}>
                <Download className="h-4 w-4 mr-2" />
                Export Word
              </Button>
              <Button onClick={() => handleExport("pdf")}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-sm">Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-1">
                  {[
                    "Executive Summary",
                    "Technical Approach",
                    "Past Performance",
                    "Key Personnel",
                    "Management Plan",
                    "Pricing",
                  ].map((section) => (
                    <button
                      key={section}
                      className="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        const element = document.getElementById(section.toLowerCase().replace(/\s+/g, "-"));
                        element?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      {section}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Info Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">AI-Generated Content</p>
                  <p className="text-sm text-blue-700 mt-1">
                    This proposal was generated based on the RFP requirements and winning proposals in our repository. You can edit
                    any section or regenerate content as needed.
                  </p>
                </div>
              </div>
            </div>

            {/* Executive Summary */}
            <Card id="executive-summary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Executive Summary</CardTitle>
                    <CardDescription>High-level overview of your proposal</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleRegenerate("executive-summary")}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={proposalSections.executiveSummary}
                  onChange={(e) => setProposalSections({ ...proposalSections, executiveSummary: e.target.value })}
                  rows={6}
                  className="font-mono text-sm"
                />
              </CardContent>
            </Card>

            {/* Technical Approach */}
            <Card id="technical-approach">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Technical Approach</CardTitle>
                    <CardDescription>Your methodology and approach to the work</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleRegenerate("technical-approach")}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={proposalSections.technicalApproach}
                  onChange={(e) => setProposalSections({ ...proposalSections, technicalApproach: e.target.value })}
                  rows={20}
                  className="font-mono text-sm"
                />
              </CardContent>
            </Card>

            {/* Past Performance */}
            <Card id="past-performance">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Past Performance</CardTitle>
                    <CardDescription>Relevant experience and references</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleRegenerate("past-performance")}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={proposalSections.pastPerformance}
                  onChange={(e) => setProposalSections({ ...proposalSections, pastPerformance: e.target.value })}
                  rows={16}
                  className="font-mono text-sm"
                />
              </CardContent>
            </Card>

            {/* Key Personnel */}
            <Card id="key-personnel">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Key Personnel</CardTitle>
                    <CardDescription>Team members and qualifications</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleRegenerate("key-personnel")}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={proposalSections.keyPersonnel}
                  onChange={(e) => setProposalSections({ ...proposalSections, keyPersonnel: e.target.value })}
                  rows={14}
                  className="font-mono text-sm"
                />
              </CardContent>
            </Card>

            {/* Management Plan */}
            <Card id="management-plan">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Management Plan</CardTitle>
                    <CardDescription>How you'll manage the project</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleRegenerate("management-plan")}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={proposalSections.management}
                  onChange={(e) => setProposalSections({ ...proposalSections, management: e.target.value })}
                  rows={12}
                  className="font-mono text-sm"
                />
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card id="pricing">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Pricing</CardTitle>
                    <CardDescription>Cost breakdown and pricing structure</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleRegenerate("pricing")}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={proposalSections.pricing}
                  onChange={(e) => setProposalSections({ ...proposalSections, pricing: e.target.value })}
                  rows={16}
                  className="font-mono text-sm"
                />
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="flex-1" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button className="flex-1" variant="outline" onClick={() => handleExport("word")}>
                    <Download className="h-4 w-4 mr-2" />
                    Export to Word
                  </Button>
                  <Button className="flex-1" variant="outline" onClick={() => handleExport("pdf")}>
                    <Download className="h-4 w-4 mr-2" />
                    Export to PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalEditor;
