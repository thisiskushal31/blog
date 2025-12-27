# Blog Writing Master Prompt & Style Guide

**Purpose:** This document ensures all blog posts maintain consistent tone, format, and style regardless of content topic.

---

## Core Principles

### 1. Personal Blog Voice
- **Always use first-person singular:** "I", "my", "me" - never "we", "our", "us", "team"
- This is a **personal blog**, not a company blog
- Write as if you're sharing your experience and knowledge directly with the reader

### 2. Manager-Friendly Tone
- Write for **technical non-functional managers** and **engineering leaders**
- Focus on **strategic decision-making**, not just implementation details
- Balance technical depth with business context
- Use clear, accessible language while maintaining technical accuracy

### 3. Reader-Focused Language
- Address the reader as "you" (not "they" or "users")
- Use "your" when referring to the reader's situation
- Make it conversational but professional

---

## Standard Blog Post Structure

### Required Elements (in order):

#### 1. Title
```
# [Descriptive Title That Clearly States the Topic]
```

#### 2. Subtitle (Italic)
```
*[Brief, compelling description of what the reader will learn]*
```

#### 3. Horizontal Rule (for non-hub posts)
```
---
```

#### 4. Introduction Section
- **Hook:** Start with a relatable problem or decision point
- **Context:** Explain why this topic matters
- **Value proposition:** What the reader will gain
- **Personal touch:** Optional - share a brief personal experience if relevant

**Example:**
```
## Introduction

Choosing between [option A] and [option B] is one of the most critical [context] decisions you'll make. This decision impacts [key factors]. Whether you're [scenario 1] or [scenario 2], this guide provides [what you'll get].

The wrong decision can [consequences]. The right decision [benefits].
```

#### 5. TL;DR Section (Required)
Always include this section with these exact fields:

```
## TL;DR

- **What:** [One-sentence description of the blog post]
- **When to use:** [When should someone read this]
- **Reading time:** [X-Y minutes]
- **Implementation time:** [Time to implement, or "N/A" if decision framework]
- **Key takeaway:** [Main insight in one sentence]
- **Skip if:** [When this post isn't relevant]
```

#### 6. "What You'll Master" Section (Required)
Bullet list of key learning outcomes:

```
**What You'll Master:**
- [Learning outcome 1]
- [Learning outcome 2]
- [Learning outcome 3]
- [Learning outcome 4]
```

#### 7. Main Content Sections
- Use clear, descriptive H2 headings
- Break down complex topics into digestible sections
- Use H3 for subsections
- Include practical examples and code snippets where relevant

#### 8. Deep Dive Links (When Applicable)
Use this format for linking to technical documentation:

```
> 💡 **Need [topic] details?** Explore my [Database Name] [Topic] Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/[path]) for [what they'll find].
```

**Important:** Always use "my" not "our" when referring to documentation.

#### 9. Fact-Checking & Verification Section (Required at end)
```
---

**Fact-Checking & Verification:** This blog post contains pricing estimates, technical specifications, and best practices based on publicly available documentation and industry research. All pricing information should be verified with official [provider] pricing calculators and documentation. Technical capabilities and features may vary by region and provider. For the most current and accurate information, please consult:
- [Official documentation link 1]
- [Official documentation link 2]
- [Additional resources if relevant]
```

#### 10. Next in Series / Related Content (For series posts)
```
---

## Next in the Series

Now that you understand [current topic], dive deeper into [next topic]:

- **[Blog X: Next Topic](link)** - [Brief description]
- **[Blog Y: Another Topic](link)** - [Brief description]
```

---

## Hub Post Structure (Series Index)

### Additional Elements for Hub Posts:

#### 1. Welcome Section
```
## Welcome to [Database Name] Deployment Guide

[Engaging introduction that sets context and explains the series value]
```

#### 2. "What Makes This Series Different" Section
```
**What Makes This Series Different:**
- [Unique value proposition 1]
- [Unique value proposition 2]
- [Unique value proposition 3]
- [Unique value proposition 4]
```

#### 3. "What You'll Master" Section
List of skills/knowledge gained from the series

#### 4. "Choose Your Learning Path" Section
Organized by:
- **By Goal** (e.g., Cost optimization, Performance, Simplicity)
- **By Team Size** (Small, Medium, Large)
- **By Experience Level** (Beginner, Intermediate, Advanced)

#### 5. "Complete Blog Series" Section
For each blog in the series:
```
### [Blog X: Title](link)
**🎯 Focus:** [Focus area]

[Brief description]

**Technical Coverage:**
- [Coverage point 1]
- [Coverage point 2]

**Ideal For:** [Target audience]
**Prerequisites:** [Required knowledge]
```

#### 6. Deep Dive Technical Resources
```
## Deep Dive Technical Resources

For comprehensive technical deep dives on [database] and database concepts, explore my [Databases Deep Dive documentation](https://thisiskushal31.github.io/dochub/#/databases/README.md):
```

---

## Language & Style Guidelines

### DO Use:
- ✅ "I've been there—[relatable scenario]" (for personal connection)
- ✅ "You'll learn..." / "You'll master..." / "You'll gain..."
- ✅ "This guide shows you..." / "This series helps you..."
- ✅ "I've managed..." / "I've seen..." / "In my experience..."
- ✅ "Explore my [documentation]" / "Check out my [resource]"
- ✅ Direct, actionable language: "Choose X when..." / "Use Y for..."
- ✅ Clear comparisons: "X is better for... while Y excels at..."

### DON'T Use:
- ❌ "We" / "our" / "us" / "team" (unless referring to the reader's team)
- ❌ "Our blog" / "our documentation" / "our series" → Use "my blog" / "my documentation" / "this series"
- ❌ "Let's" → Use "I'll" or "You can"
- ❌ Corporate/company language
- ❌ Passive voice when active is clearer
- ❌ Jargon without explanation

### When Referring to Reader's Team:
- ✅ "Your team" / "your organization" / "your company" (this is fine - it's about the reader)
- ✅ "If your team has..." / "When your organization needs..."

---

## Formatting Standards

### Headers
- H1: Only for main title
- H2: Major sections (##)
- H3: Subsections (###)
- H4: Sub-subsections (####) - use sparingly

### Lists
- Use bullet points for features, benefits, considerations
- Use numbered lists for step-by-step processes
- Use checkmarks (✅) for positive points, X (❌) for negatives when comparing

### Code Blocks
- Always include language identifier: ```bash, ```yaml, ```json, etc.
- Add brief comments explaining what the code does
- Include context before code blocks

### Emphasis
- **Bold** for key terms, important points, section headers in lists
- *Italic* for subtitles, emphasis, or quotes
- `Code formatting` for technical terms, commands, configuration values

### Links
- Format: `[Link Text](URL)`
- Always use full URLs for external links
- Use descriptive link text (not "click here")

---

## Content Tone Examples

### Good (Personal, Manager-Friendly):
```
I've been there—staring at replica set status at 2 AM, wondering why your writes are failing. Whether you're a developer setting up your first document database or an architect designing petabyte-scale systems, this series breaks down complex MongoDB deployment decisions into clear, actionable guidance that actually works in production.
```

### Bad (Too Corporate):
```
Our team has extensive experience with MongoDB deployments. We've helped numerous organizations optimize their database infrastructure. Our comprehensive guide covers all deployment strategies.
```

### Good (Strategic Focus):
```
The wrong decision can cost you hundreds of thousands of dollars over three years, create operational headaches that drain your engineering team, or limit your ability to innovate. The right decision aligns with your business objectives, team capabilities, and growth trajectory.
```

### Bad (Too Technical):
```
MongoDB replica sets provide high availability through automatic failover mechanisms. The oplog maintains a rolling record of all write operations, enabling secondary nodes to replicate changes from the primary.
```

---

## Common Phrases & Templates

### Opening Hooks:
- "Choosing between [X] and [Y] is one of the most critical [context] decisions you'll make."
- "I've been there—[relatable 2 AM scenario]."
- "Building [X] doesn't have to be overwhelming."

### Transitions:
- "Now that you understand [X], let's dive into [Y]..."
- "With [X] mastered, you're ready for [Y]..."
- "This is just the beginning. In [next section], I'll cover..."

### Comparisons:
- "X is better for [scenario], while Y excels at [different scenario]."
- "Choose X when [condition], choose Y when [different condition]."

### Deep Dive Links:
- "> 💡 **Need [topic] details?** Explore my [Database] [Topic] Deep Dive..."
- "> 💡 **Understanding [concept]?** Check out my [Resource]..."
- "> 💡 **Want [specific info]?** See my [Resource]..."

---

## Quality Checklist

Before publishing, ensure:

- [ ] Title is clear and descriptive
- [ ] Subtitle explains value proposition
- [ ] TL;DR section is complete with all fields
- [ ] "What You'll Master" section included
- [ ] Introduction hooks the reader
- [ ] All instances of "our/we/us" changed to "my/I"
- [ ] Personal voice maintained throughout
- [ ] Manager-friendly tone (strategic + technical balance)
- [ ] Fact-checking section at the end
- [ ] Deep dive links use "my" not "our"
- [ ] Code examples are clear and commented
- [ ] All links work and use descriptive text
- [ ] Consistent formatting throughout
- [ ] No corporate/team language
- [ ] Reader addressed as "you" consistently

---

## Series-Specific Patterns

### Deployment Guide Series (8 posts):
1. **Hub Post (0):** Series overview and navigation
2. **Blog 1:** Cloud vs Self-Managed Strategic Framework
3. **Blog 2:** Cloud-Managed Deep Dive
4. **Blog 3:** Self-Managed Production Guide
5. **Blog 4:** Docker Deployment
6. **Blog 5:** Kubernetes Deployment
7. **Blog 6:** Local Development
8. **Blog 7:** Performance Optimization
9. **Blog 8:** Decision Matrix

Each follows the standard structure above, with content tailored to the specific topic.

---

## Final Notes

- **Consistency is key:** Every blog post should feel like it's written by the same person
- **Personal but professional:** Share experience without oversharing
- **Strategic focus:** Always connect technical details to business outcomes
- **Actionable:** Every post should help the reader make a decision or take action
- **Respectful:** Acknowledge different team sizes, budgets, and constraints

---

**Remember:** This is YOUR personal blog. Write as if you're having a conversation with a colleague who needs your expertise. Be helpful, be clear, be strategic, and be yourself.

