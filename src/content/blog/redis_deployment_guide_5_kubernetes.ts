import { BlogPost } from '../index';
import content from '../markdown/redis_deployment_guide_5_kubernetes.md?raw';

export const blogPost: BlogPost = {
  slug: "redis-kubernetes-statefulset-operator-deep-dive",
  title: "Kubernetes Redis - StatefulSet vs Operator Deep Dive",
  subtitle: "Master Kubernetes-native Redis with advanced orchestration patterns for modern infrastructure",
  excerpt: "Complete guide to Redis on Kubernetes using StatefulSets and operators. Learn StatefulSet patterns, Redis Operators, HA setup, and backup automation.",
  content,
  publishDate: "2025-02-09",
  categories: ["Redis", "Kubernetes", "Cloud Native"],
  searchCategories: ["Redis", "Databases", "Kubernetes", "StatefulSet", "Operators", "Cloud Native"],
  coverImage: "/blog/blogImages/redis-kubernetes.png",
};

