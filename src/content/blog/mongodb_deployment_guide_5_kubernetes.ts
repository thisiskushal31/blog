import { BlogPost } from '../index';
import content from '../markdown/mongodb_deployment_guide_5_kubernetes.md?raw';

export const blogPost: BlogPost = {
  slug: "mongodb-kubernetes-statefulset-operator-deep-dive",
  title: "Kubernetes MongoDB - StatefulSet vs Operator Deep Dive",
  subtitle: "Master Kubernetes-native MongoDB with advanced orchestration patterns for modern infrastructure",
  excerpt: "Complete guide to MongoDB on Kubernetes using StatefulSets and operators. Learn StatefulSet patterns, MongoDB Operators, HA setup, and backup automation.",
  content,
  publishDate: "2025-02-01",
  categories: ["MongoDB", "Kubernetes", "Cloud Native"],
  searchCategories: ["MongoDB", "Databases", "Kubernetes", "StatefulSet", "Operators", "Cloud Native"],
  coverImage: "/blog/blogImages/mongodb-deployment-guide.png",
};

