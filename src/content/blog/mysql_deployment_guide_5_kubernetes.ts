import { BlogPost } from '../index';
import content from '../markdown/mysql_deployment_guide_5_kubernetes.md?raw';

export const blogPost: BlogPost = {
  slug: "mysql-kubernetes-statefulset-operator-deep-dive",
  title: "Kubernetes MySQL - StatefulSet vs Operator Deep Dive",
  subtitle: "Master Kubernetes-native MySQL with advanced orchestration patterns",
  excerpt: "Complete guide to MySQL on Kubernetes covering StatefulSets, persistent volumes, MySQL operators (Percona, Vitess), Helm charts, Pod disruption budgets, and high availability with Group Replication. Includes official Kubernetes and MySQL operator documentation.",
  content,
  publishDate: "2025-01-15",
  categories: ["MySQL", "Kubernetes", "Cloud-Native"],
  searchCategories: ["MySQL", "Kubernetes", "Cloud-Native", "StatefulSet", "Operators"],
  coverImage: "/blog/blogImages/mysql-kubernetes.png",
};

