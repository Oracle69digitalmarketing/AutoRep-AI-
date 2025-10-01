import { generateText, streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export interface UserProfile {
  industry: string
  experienceLevel: "beginner" | "intermediate" | "expert"
  businessSize: "individual" | "small" | "medium" | "large"
  goals: string[]
  language: "english" | "pidgin" | "yoruba" | "hausa"
  location: string
}

export interface IndustryTemplate {
  name: string
  keywords: string[]
  funnelSteps: string[]
  kpis: string[]
  messaging: Record<string, string>
  leadQualifiers: string[]
}

const industryTemplates: Record<string, IndustryTemplate> = {
  insurance: {
    name: "Insurance Agent",
    keywords: ["insurance", "policy", "coverage", "premium", "claim", "retirement", "life insurance"],
    funnelSteps: ["Income Assessment", "Risk Evaluation", "Policy Recommendation", "Premium Calculation"],
    kpis: ["Policy Conversion Rate", "Premium Volume", "Client Retention", "Claims Ratio"],
    messaging: {
      english: "Protect your future with comprehensive insurance coverage",
      pidgin: "Make sure say your future dey safe with proper insurance",
      yoruba: "Daabobo ojo iwaju re pelu idaabobo insurance to peye",
      hausa: "Ka kare makomar ka da cikakken kariya",
    },
    leadQualifiers: ["Monthly Income", "Family Size", "Current Coverage", "Risk Tolerance"],
  },
  realestate: {
    name: "Real Estate Agent",
    keywords: ["property", "house", "land", "rent", "buy", "mortgage", "location"],
    funnelSteps: ["Budget Assessment", "Location Preference", "Property Matching", "Site Visit Booking"],
    kpis: ["Property Views", "Site Visits", "Sales Conversion", "Average Deal Size"],
    messaging: {
      english: "Find your dream property in prime locations",
      pidgin: "Find the house wey go make you happy for good location",
      yoruba: "Wa ile ala re ni agbegbe to dara ju",
      hausa: "Nemo gidan da kake so a wurare masu kyau",
    },
    leadQualifiers: ["Budget Range", "Preferred Location", "Property Type", "Timeline"],
  },
  education: {
    name: "School Marketer",
    keywords: ["school", "education", "student", "curriculum", "tuition", "admission"],
    funnelSteps: ["Child Age Assessment", "Educational Goals", "Curriculum Match", "School Tour Booking"],
    kpis: ["Enrollment Rate", "Student Retention", "Parent Satisfaction", "Referral Rate"],
    messaging: {
      english: "Give your child the best educational foundation",
      pidgin: "Give your pikin the best education wey go help am",
      yoruba: "Fun omo re ni ipile eko to dara ju",
      hausa: "Ka bada wa yaron ka mafi kyawun ilimi",
    },
    leadQualifiers: ["Child Age", "Current School", "Academic Goals", "Budget"],
  },
  loans: {
    name: "Loan Officer",
    keywords: ["loan", "credit", "finance", "business", "capital", "interest", "repayment"],
    funnelSteps: ["Credit Assessment", "Income Verification", "Loan Structuring", "Application Processing"],
    kpis: ["Approval Rate", "Default Rate", "Loan Volume", "Processing Time"],
    messaging: {
      english: "Access quick funding for your business growth",
      pidgin: "Get money quick quick to grow your business",
      yoruba: "Gba owo ni kiakia lati mu ise re dara si",
      hausa: "Samu kudi da sauri don ci gaban kasuwanci",
    },
    leadQualifiers: ["Business Type", "Monthly Revenue", "Credit History", "Loan Purpose"],
  },
  agriculture: {
    name: "Agric Extension",
    keywords: ["farming", "crops", "fertilizer", "seeds", "harvest", "equipment"],
    funnelSteps: ["Farm Size Assessment", "Crop Selection", "Input Calculation", "Seasonal Planning"],
    kpis: ["Yield Improvement", "Input Efficiency", "Farmer Adoption", "Seasonal Revenue"],
    messaging: {
      english: "Boost your farm productivity with modern techniques",
      pidgin: "Make your farm produce plenty plenty with new method",
      yoruba: "Je ki oko re so eso pupo pelu ona tuntun",
      hausa: "Ka kara yawan amfanin gonar ka da sabbin hanyoyi",
    },
    leadQualifiers: ["Farm Size", "Crop Type", "Current Yield", "Season"],
  },
  ecommerce: {
    name: "Ecommerce Affiliate",
    keywords: ["product", "sale", "discount", "shopping", "delivery", "payment"],
    funnelSteps: ["Product Interest", "Price Comparison", "Discount Application", "Purchase Decision"],
    kpis: ["Conversion Rate", "Average Order Value", "Return Rate", "Customer Lifetime Value"],
    messaging: {
      english: "Get the best deals on quality products",
      pidgin: "Buy quality things for better price",
      yoruba: "Ra nkan to dara fun owo to ku",
      hausa: "Sayi kayayyaki masu kyau da arha",
    },
    leadQualifiers: ["Product Interest", "Budget Range", "Purchase Timeline", "Payment Method"],
  },
}

export class AIService {
  static async detectUserRole(userInput: string, context?: any): Promise<UserProfile> {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        Analyze this user input and determine their likely business role/industry:
        "${userInput}"
        
        Context: ${JSON.stringify(context || {})}
        
        Available industries: ${Object.keys(industryTemplates).join(", ")}
        
        Return a JSON object with:
        - industry (one of the available industries)
        - experienceLevel (beginner/intermediate/expert)
        - businessSize (individual/small/medium/large)
        - goals (array of likely goals)
        - language (english/pidgin/yoruba/hausa based on input style)
        - location (if mentioned or inferred)
      `,
    })

    try {
      return JSON.parse(text)
    } catch {
      // Fallback if parsing fails
      return {
        industry: "insurance",
        experienceLevel: "beginner",
        businessSize: "individual",
        goals: ["increase sales"],
        language: "english",
        location: "Nigeria",
      }
    }
  }

  static async generatePersonalizedContent(profile: UserProfile, contentType: string): Promise<string> {
    const template = industryTemplates[profile.industry]

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        Generate ${contentType} content for a ${template.name} in ${profile.language}.
        
        User Profile:
        - Industry: ${profile.industry}
        - Experience: ${profile.experienceLevel}
        - Business Size: ${profile.businessSize}
        - Goals: ${profile.goals.join(", ")}
        - Location: ${profile.location}
        
        Industry Context:
        - Key messaging: ${template.messaging[profile.language]}
        - KPIs: ${template.kpis.join(", ")}
        - Lead qualifiers: ${template.leadQualifiers.join(", ")}
        
        Make it culturally appropriate for Nigerian ${profile.language} speakers.
        Keep it professional but conversational.
      `,
    })

    return text
  }

  static async generateAdaptiveFunnel(profile: UserProfile): Promise<any> {
    const template = industryTemplates[profile.industry]

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        Create a lead capture funnel for a ${template.name}.
        
        Profile: ${JSON.stringify(profile)}
        Template steps: ${template.funnelSteps.join(" -> ")}
        Lead qualifiers: ${template.leadQualifiers.join(", ")}
        
        Return JSON with:
        - steps: array of funnel steps with titles and descriptions
        - questions: array of qualifying questions for each step
        - triggers: behavioral triggers for each step
        - followups: automated follow-up sequences
        
        Optimize for ${profile.language} language and ${profile.experienceLevel} experience level.
      `,
    })

    try {
      return JSON.parse(text)
    } catch {
      return {
        steps: template.funnelSteps.map((step) => ({
          title: step,
          description: `Optimized ${step} for ${profile.industry}`,
        })),
        questions: template.leadQualifiers,
        triggers: ["page_visit", "form_interaction", "time_spent"],
        followups: ["immediate_response", "24h_follow_up", "weekly_nurture"],
      }
    }
  }

  static getIndustryTemplate(industry: string): IndustryTemplate {
    return industryTemplates[industry] || industryTemplates.insurance
  }

  static async streamChatResponse(message: string, profile: UserProfile) {
    const template = industryTemplates[profile.industry]

    return streamText({
      model: openai("gpt-4o"),
      prompt: `
        You are an AI assistant for ${template.name} specializing in ${profile.industry}.
        
        User Profile: ${JSON.stringify(profile)}
        Industry messaging: ${template.messaging[profile.language]}
        
        User message: "${message}"
        
        Respond in ${profile.language} with industry-specific advice.
        Be helpful, professional, and culturally appropriate for Nigerian context.
        Focus on ${template.kpis.join(", ")} as key success metrics.
      `,
    })
  }
}
