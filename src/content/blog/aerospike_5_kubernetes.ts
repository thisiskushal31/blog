import { BlogPost } from '../index';
import content from '../markdown/aerospike_5_kubernetes.md?raw';

export const blogPost: BlogPost = {
  slug: "aerospike-kubernetes-statefulset-deep-dive",
  title: "Blog 5: Kubernetes Aerospike - StatefulSet Deep Dive",
  subtitle: "Master Kubernetes-native Aerospike with advanced orchestration patterns for modern infrastructure",
  excerpt: "Complete guide to Aerospike on Kubernetes using StatefulSets. Learn StatefulSet patterns, HMA configuration in Kubernetes, HA setup, and backup automation.",
  content,
  publishDate: "2025-02-17",
  categories: ["Aerospike", "Kubernetes", "Cloud Native"],
  searchCategories: ["Aerospike", "Databases", "Kubernetes", "StatefulSet", "Cloud Native"],
  coverImage: "/blog/blogImages/aerospike-kubernetes.png",
};

