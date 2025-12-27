import { BlogPost } from '../index';
import content from '../markdown/postgresql_deployment_guide_5_kubernetes.md?raw';

export const blogPost: BlogPost = {
  slug: "postgresql-kubernetes-statefulset-operator-deep-dive",
  title: "Kubernetes PostgreSQL - StatefulSet vs Operator Deep Dive",
  subtitle: "Master Kubernetes-native PostgreSQL with advanced orchestration patterns for modern infrastructure",
  excerpt: "Complete guide to PostgreSQL on Kubernetes using StatefulSets and operators. Learn StatefulSet patterns, PostgreSQL Operators (Crunchy, CloudNativePG), HA setup, and backup automation.",
  content,
  publishDate: "2025-01-24",
  categories: ["PostgreSQL", "Kubernetes", "Cloud Native"],
  searchCategories: ["PostgreSQL", "Databases", "Kubernetes", "StatefulSet", "Operators", "Cloud Native"],
  coverImage: "/blog/blogImages/postgresql-deployment-guide.png",
};

