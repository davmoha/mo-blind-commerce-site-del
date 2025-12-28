import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, MapPin, Phone, Mail, X, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CompanyProfile = () => {
  const { toast } = useToast();
  const [customTags, setCustomTags] = useState<string[]>(["Cybersecurity", "Cloud Computing", "AI/ML"]);
  const [newTag, setNewTag] = useState("");
  const [naicsCodes, setNaicsCodes] = useState<string[]>(["541512", "541519"]);
  const [newNaics, setNewNaics] = useState("");

  const [profile, setProfile] = useState({
    companyName: "Tech Solutions Inc.",
    dunsUei: "123456789",
    address: "123 Main Street, Suite 100",
    city: "Washington",
    state: "DC",
    zip: "20001",
    phone: "(555) 123-4567",
    email: "contact@techsolutions.com",
    website: "www.techsolutions.com",
    services: "IT Services, Cybersecurity Consulting, Cloud Migration",
    products: "Security Software, Monitoring Tools",
    classifications: {
      disabledVeteranOwned: true,
      womenOwned: false,
      minorityOwned: false,
      hubzone: false,
      eightA: false,
      smallBusiness: true,
    },
  });

  const handleAddTag = () => {
    if (newTag.trim() && !customTags.includes(newTag.trim())) {
      setCustomTags([...customTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setCustomTags(customTags.filter((t) => t !== tag));
  };

  const handleAddNaics = () => {
    if (newNaics.trim() && !naicsCodes.includes(newNaics.trim())) {
      setNaicsCodes([...naicsCodes, newNaics.trim()]);
      setNewNaics("");
    }
  };

  const handleRemoveNaics = (code: string) => {
    setNaicsCodes(naicsCodes.filter((c) => c !== code));
  };

  const handleSave = () => {
    toast({
      title: "Success",
      description: "Company profile saved successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
              <p className="text-sm text-gray-600">Manage your company information and preferences</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="classifications">Classifications</TabsTrigger>
            <TabsTrigger value="tags">Tags & Keywords</TabsTrigger>
          </TabsList>

          {/* Basic Information Tab */}
          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Company Details
                </CardTitle>
                <CardDescription>Basic information about your company</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={profile.companyName}
                      onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dunsUei">DUNS/UEI Number</Label>
                    <Input
                      id="dunsUei"
                      value={profile.dunsUei}
                      onChange={(e) => setProfile({ ...profile, dunsUei: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" value={profile.state} onChange={(e) => setProfile({ ...profile, state: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" value={profile.zip} onChange={(e) => setProfile({ ...profile, zip: e.target.value })} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone
                    </Label>
                    <Input id="phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" value={profile.website} onChange={(e) => setProfile({ ...profile, website: e.target.value })} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="services">Services Offered</Label>
                  <Textarea
                    id="services"
                    rows={3}
                    value={profile.services}
                    onChange={(e) => setProfile({ ...profile, services: e.target.value })}
                    placeholder="Describe the services your company offers"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="products">Products Offered</Label>
                  <Textarea
                    id="products"
                    rows={3}
                    value={profile.products}
                    onChange={(e) => setProfile({ ...profile, products: e.target.value })}
                    placeholder="Describe the products your company offers"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Classifications Tab */}
          <TabsContent value="classifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Classifications</CardTitle>
                <CardDescription>Select all certifications that apply to your business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="disabledVeteranOwned"
                      checked={profile.classifications.disabledVeteranOwned}
                      onCheckedChange={(checked) =>
                        setProfile({
                          ...profile,
                          classifications: { ...profile.classifications, disabledVeteranOwned: checked as boolean },
                        })
                      }
                    />
                    <label htmlFor="disabledVeteranOwned" className="text-sm font-medium leading-none cursor-pointer">
                      Service-Disabled Veteran-Owned Small Business (SDVOSB)
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="womenOwned"
                      checked={profile.classifications.womenOwned}
                      onCheckedChange={(checked) =>
                        setProfile({
                          ...profile,
                          classifications: { ...profile.classifications, womenOwned: checked as boolean },
                        })
                      }
                    />
                    <label htmlFor="womenOwned" className="text-sm font-medium leading-none cursor-pointer">
                      Women-Owned Small Business (WOSB)
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="minorityOwned"
                      checked={profile.classifications.minorityOwned}
                      onCheckedChange={(checked) =>
                        setProfile({
                          ...profile,
                          classifications: { ...profile.classifications, minorityOwned: checked as boolean },
                        })
                      }
                    />
                    <label htmlFor="minorityOwned" className="text-sm font-medium leading-none cursor-pointer">
                      Minority-Owned Business
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hubzone"
                      checked={profile.classifications.hubzone}
                      onCheckedChange={(checked) =>
                        setProfile({
                          ...profile,
                          classifications: { ...profile.classifications, hubzone: checked as boolean },
                        })
                      }
                    />
                    <label htmlFor="hubzone" className="text-sm font-medium leading-none cursor-pointer">
                      HubZone Certified
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="eightA"
                      checked={profile.classifications.eightA}
                      onCheckedChange={(checked) =>
                        setProfile({
                          ...profile,
                          classifications: { ...profile.classifications, eightA: checked as boolean },
                        })
                      }
                    />
                    <label htmlFor="eightA" className="text-sm font-medium leading-none cursor-pointer">
                      8(a) Business Development Program
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="smallBusiness"
                      checked={profile.classifications.smallBusiness}
                      onCheckedChange={(checked) =>
                        setProfile({
                          ...profile,
                          classifications: { ...profile.classifications, smallBusiness: checked as boolean },
                        })
                      }
                    />
                    <label htmlFor="smallBusiness" className="text-sm font-medium leading-none cursor-pointer">
                      Small Business
                    </label>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <p className="text-sm text-blue-900 font-medium">Why classifications matter</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Many federal contracts are set aside specifically for businesses with these certifications, increasing your chances of
                    winning contracts.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tags & Keywords Tab */}
          <TabsContent value="tags" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom Tags</CardTitle>
                <CardDescription>Add keywords to help match opportunities to your business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., Cybersecurity, AI, Cloud"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                  />
                  <Button onClick={handleAddTag} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {customTags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-red-600">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>NAICS Codes</CardTitle>
                <CardDescription>Add NAICS codes relevant to your business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., 541512"
                    value={newNaics}
                    onChange={(e) => setNewNaics(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddNaics()}
                  />
                  <Button onClick={handleAddNaics} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {naicsCodes.map((code, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      {code}
                      <button onClick={() => handleRemoveNaics(code)} className="ml-1 hover:text-red-600">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="bg-gray-50 border rounded-lg p-4">
                  <p className="text-sm font-medium">Common NAICS Codes:</p>
                  <ul className="text-xs text-gray-600 mt-2 space-y-1">
                    <li>541512 - Computer Systems Design Services</li>
                    <li>541519 - Other Computer Related Services</li>
                    <li>541690 - Other Scientific and Technical Consulting Services</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link to="/dashboard">Cancel</Link>
          </Button>
          <Button onClick={handleSave}>Save Profile</Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
