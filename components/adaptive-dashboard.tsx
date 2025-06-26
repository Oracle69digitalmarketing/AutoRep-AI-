"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Users, Target, MessageSquare, Zap, Calendar, DollarSign } from "lucide-react"
import { AIService, type UserProfile } from "@/lib/ai-service"

interface DashboardProps {
  userProfile: UserProfile
}

export function AdaptiveDashboard({ userProfile }: DashboardProps) {
  const [insights, setInsights] = useState<string>("")
  const [loading, setLoading] = useState(true)

  const template = AIService.getIndustryTemplate(userProfile.industry)

  useEffect(() => {
    const generateInsights = async () => {
      setLoading(true)
      const content = await AIService.generatePersonalizedContent(userProfile, "dashboard insights")
      setInsights(content)
      setLoading(false)
    }

    generateInsights()
  }, [userProfile])

  // Mock data that would be industry-specific
  const mockMetrics = {
    insurance: {
      leads: 156,
      conversion: 23,
      revenue: "₦2.4M",
      policies: 34,
    },
    realestate: {
      leads: 89,
      conversion: 18,
      revenue: "₦5.2M",
      properties: 12,
    },
    education: {
      leads: 234,
      conversion: 31,
      revenue: "₦1.8M",
      enrollments: 67,
    },
    loans: {
      leads: 123,
      conversion: 28,
      revenue: "₦3.1M",
      approvals: 45,
    },
    agriculture: {
      leads: 78,
      conversion: 35,
      revenue: "₦950K",
      farmers: 23,
    },
    ecommerce: {
      leads: 445,
      conversion: 12,
      revenue: "₦1.2M",
      orders: 156,
    },
  }

  const metrics = mockMetrics[userProfile.industry as keyof typeof mockMetrics] || mockMetrics.insurance

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{template.name} Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Optimized for {userProfile.language} • {userProfile.businessSize} business
          </p>
        </div>
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
          AI-Powered Insights
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.leads}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.conversion}%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.revenue}</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {userProfile.industry === "insurance"
                ? "Policies"
                : userProfile.industry === "realestate"
                  ? "Properties"
                  : userProfile.industry === "education"
                    ? "Enrollments"
                    : userProfile.industry === "loans"
                      ? "Approvals"
                      : userProfile.industry === "agriculture"
                        ? "Farmers"
                        : "Orders"}
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userProfile.industry === "insurance"
                ? metrics.policies
                : userProfile.industry === "realestate"
                  ? metrics.properties
                  : userProfile.industry === "education"
                    ? metrics.enrollments
                    : userProfile.industry === "loans"
                      ? metrics.approvals
                      : userProfile.industry === "agriculture"
                        ? metrics.farmers
                        : metrics.orders}
            </div>
            <p className="text-xs text-muted-foreground">+5 this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Industry-Specific KPIs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            Industry KPIs
          </CardTitle>
          <CardDescription>Key performance indicators for {template.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {template.kpis.map((kpi, index) => (
              <div key={kpi} className="flex items-center justify-between">
                <span className="text-sm font-medium">{kpi}</span>
                <div className="flex items-center gap-2">
                  <Progress value={65 + index * 8} className="w-20" />
                  <span className="text-sm text-muted-foreground">{65 + index * 8}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-emerald-600" />
            AI-Powered Insights
          </CardTitle>
          <CardDescription>Personalized recommendations for your {userProfile.industry} business</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed">{insights}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Industry-optimized actions for {template.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
              <MessageSquare className="h-5 w-5" />
              <span className="text-sm">Create Funnel</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
              <Users className="h-5 w-5" />
              <span className="text-sm">Import Leads</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
              <Calendar className="h-5 w-5" />
              <span className="text-sm">Schedule Follow-up</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
              <BarChart3 className="h-5 w-5" />
              <span className="text-sm">View Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
