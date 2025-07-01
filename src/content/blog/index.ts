
import { blogPost as implementingGitopsWithArgocd } from './implementing-gitops-with-argocd';
import { blogPost as securingCicdPipelineBestPractices } from './securing-cicd-pipeline-best-practices';
import { blogPost as monitoringKubernetesAtScaleWithPrometheus } from './monitoring-kubernetes-at-scale-with-prometheus';
import { blogPost as infrastructureAsCodeTerraformVsPulumi } from './infrastructure-as-code-terraform-vs-pulumi';
import { blogPost as buildingResilientMicroservicesWithIstio } from './building-resilient-microservices-with-istio';

export interface BlogPost {
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  publishDate: string;
  readTime: string;
  categories: string[];
  featured?: boolean;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
  };
}

export const blogPosts: BlogPost[] = [
  implementingGitopsWithArgocd,
  securingCicdPipelineBestPractices,
  monitoringKubernetesAtScaleWithPrometheus,
  infrastructureAsCodeTerraformVsPulumi,
  buildingResilientMicroservicesWithIstio,
];
