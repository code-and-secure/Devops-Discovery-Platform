import Link from "next/link";
import {
  Compass, ExternalLink, BookOpen, Star, Command as GitHubIcon,
  Play, GraduationCap, FileCode, ScrollText, ChevronRight, Zap,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { TickerBar } from "@/components/ticker-bar";

export const dynamic = "force-dynamic";

// ── Curated learning resources per topic ──────────────────────────────────────
const TOPICS = [
  "DevOps", "Kubernetes", "Docker", "AWS", "Azure", "Google Cloud",
  "Terraform", "Linux", "CI/CD", "Ansible", "Monitoring", "Platform Eng.",
  "AI/ML", "MLOps", "Data Science", "LLM Engineering",
  "Python", "Go", "Rust", "Java", "Node.js", "System Design", "PostgreSQL",
  "React", "TypeScript", "Frontend", "Vue.js",
  "Cybersecurity", "DevSecOps", "Flutter", "Android",
] as const;

type Topic = typeof TOPICS[number];

interface DocResource    { title: string; url: string; note?: string }
interface VideoResource  { title: string; url: string; channel: string }
interface CourseResource { title: string; url: string; platform: string; price: string }
interface RepoResource   { title: string; url: string; description: string }
interface SheetResource  { title: string; url: string; format?: string }

interface TopicData {
  icon: string;
  docs: DocResource[];
  youtube: VideoResource[];
  courses: CourseResource[];
  repos: RepoResource[];
  cheatsheets: SheetResource[];
}

const LEARNING: Record<Topic, TopicData> = {
  "DevOps": {
    icon: "⚙️",
    docs: [
      { title: "roadmap.sh/devops", url: "https://roadmap.sh/devops", note: "Community visual roadmap" },
      { title: "12-Factor App", url: "https://12factor.net/", note: "Methodology for modern apps" },
      { title: "Google SRE Book", url: "https://sre.google/books/", note: "Free online by Google" },
    ],
    youtube: [
      { title: "DevOps Full Course 2026", url: "https://www.youtube.com/results?search_query=devops+full+course+2026+nana", channel: "TechWorld with Nana" },
      { title: "DevOps Roadmap for Beginners", url: "https://www.youtube.com/results?search_query=devops+roadmap+freecodecamp", channel: "freeCodeCamp" },
    ],
    courses: [
      { title: "Introduction to DevOps", url: "https://www.edx.org/learn/devops", platform: "edX", price: "Free audit" },
      { title: "DevOps Bootcamp (TechWorld Nana)", url: "https://www.techworld-with-nana.com/devops-bootcamp", platform: "Nana Academy", price: "Paid" },
      { title: "DevOps for Beginners – KodeKloud", url: "https://kodekloud.com/courses/devops-for-the-absolute-beginners/", platform: "KodeKloud", price: "Free" },
    ],
    repos: [
      { title: "bregman-arie/devops-exercises", url: "https://github.com/bregman-arie/devops-exercises", description: "2600+ DevOps questions & exercises with answers" },
      { title: "Tikam02/DevOps-Guide", url: "https://github.com/Tikam02/DevOps-Guide", description: "Comprehensive DevOps guide from basics to advanced" },
      { title: "wmariuss/awesome-devops", url: "https://github.com/wmariuss/awesome-devops", description: "Curated list of DevOps tools and resources" },
      { title: "MichaelCade/90DaysOfDevOps", url: "https://github.com/MichaelCade/90DaysOfDevOps", description: "90-day structured DevOps learning journey" },
    ],
    cheatsheets: [
      { title: "DevOps Cheatsheet – devhints.io", url: "https://devhints.io/", format: "Web" },
      { title: "Linux CLI Cheatsheet", url: "https://www.codecademy.com/learn/learn-the-command-line/modules/learn-the-command-line-navigation/cheatsheet", format: "Web" },
      { title: "DevOps Quick Reference", url: "https://quickref.me/", format: "Web" },
    ],
  },
  "Kubernetes": {
    icon: "☸️",
    docs: [
      { title: "kubernetes.io/docs", url: "https://kubernetes.io/docs/home/", note: "Official Kubernetes documentation" },
      { title: "roadmap.sh/kubernetes", url: "https://roadmap.sh/kubernetes", note: "Visual learning roadmap" },
      { title: "Kubernetes Patterns", url: "https://k8spatterns.io/", note: "Design patterns for containerized apps" },
    ],
    youtube: [
      { title: "Kubernetes Full Course", url: "https://www.youtube.com/results?search_query=kubernetes+full+course+nana", channel: "TechWorld with Nana" },
      { title: "Kubernetes Tutorial for Beginners", url: "https://www.youtube.com/results?search_query=kubernetes+tutorial+beginner+freecodecamp", channel: "freeCodeCamp" },
    ],
    courses: [
      { title: "Kubernetes for Beginners – KodeKloud", url: "https://kodekloud.com/courses/kubernetes-for-the-absolute-beginners-hands-on/", platform: "KodeKloud", price: "Free" },
      { title: "Kubernetes Fundamentals – Linux Foundation", url: "https://training.linuxfoundation.org/training/kubernetes-fundamentals/", platform: "Linux Foundation", price: "Paid" },
      { title: "Kubernetes on edX (LFS158)", url: "https://www.edx.org/learn/kubernetes/the-linux-foundation-introduction-to-kubernetes", platform: "edX", price: "Free audit" },
    ],
    repos: [
      { title: "kelseyhightower/kubernetes-the-hard-way", url: "https://github.com/kelseyhightower/kubernetes-the-hard-way", description: "Bootstrap Kubernetes the hard way on GCP" },
      { title: "kubernetes/examples", url: "https://github.com/kubernetes/examples", description: "Official Kubernetes app examples" },
      { title: "techiescamp/kubernetes-learning-path", url: "https://github.com/techiescamp/kubernetes-learning-path", description: "Curated Kubernetes learning path" },
      { title: "dgkanatsios/CKAD-exercises", url: "https://github.com/dgkanatsios/CKAD-exercises", description: "CKAD exam practice exercises" },
    ],
    cheatsheets: [
      { title: "kubectl Cheatsheet – Official", url: "https://kubernetes.io/docs/reference/kubectl/cheatsheet/", format: "Web" },
      { title: "Kubernetes Cheatsheet – QuickRef", url: "https://quickref.me/kubernetes.html", format: "Web" },
      { title: "K8s Cheatsheet – Devhints", url: "https://devhints.io/kubectl", format: "Web" },
    ],
  },
  "Docker": {
    icon: "🐳",
    docs: [
      { title: "docs.docker.com", url: "https://docs.docker.com/", note: "Official Docker documentation" },
      { title: "Docker Get Started", url: "https://docs.docker.com/get-started/", note: "Official beginner guide" },
      { title: "Docker Compose Docs", url: "https://docs.docker.com/compose/", note: "Multi-container orchestration" },
    ],
    youtube: [
      { title: "Docker Full Course", url: "https://www.youtube.com/results?search_query=docker+full+course+nana+2026", channel: "TechWorld with Nana" },
      { title: "Docker Tutorial for Beginners", url: "https://www.youtube.com/results?search_query=docker+tutorial+beginner+freecodecamp", channel: "freeCodeCamp" },
    ],
    courses: [
      { title: "Docker for Beginners – KodeKloud", url: "https://kodekloud.com/courses/docker-for-the-absolute-beginner/", platform: "KodeKloud", price: "Free" },
      { title: "Docker Mastery – Udemy", url: "https://www.udemy.com/course/docker-mastery/", platform: "Udemy", price: "Paid" },
      { title: "Play with Docker Classroom", url: "https://training.play-with-docker.com/", platform: "Docker", price: "Free" },
    ],
    repos: [
      { title: "collabnix/dockerlabs", url: "https://github.com/collabnix/dockerlabs", description: "500+ Docker labs and tutorials" },
      { title: "docker/awesome-compose", url: "https://github.com/docker/awesome-compose", description: "Official Docker Compose example apps" },
      { title: "wsargent/docker-cheat-sheet", url: "https://github.com/wsargent/docker-cheat-sheet", description: "Comprehensive Docker cheat sheet" },
    ],
    cheatsheets: [
      { title: "Docker CLI Cheatsheet – Official", url: "https://docs.docker.com/get-started/docker_cheatsheet.pdf", format: "PDF" },
      { title: "Docker Cheatsheet – QuickRef", url: "https://quickref.me/docker.html", format: "Web" },
      { title: "Docker Devhints", url: "https://devhints.io/docker", format: "Web" },
    ],
  },
  "AWS": {
    icon: "☁️",
    docs: [
      { title: "AWS Documentation", url: "https://docs.aws.amazon.com/", note: "Official AWS docs hub" },
      { title: "AWS Well-Architected", url: "https://aws.amazon.com/architecture/well-architected/", note: "Best practices framework" },
      { title: "roadmap.sh/aws", url: "https://roadmap.sh/aws", note: "Visual AWS learning roadmap" },
    ],
    youtube: [
      { title: "AWS Full Course", url: "https://www.youtube.com/results?search_query=aws+full+course+freecodecamp+2026", channel: "freeCodeCamp" },
      { title: "AWS Solutions Architect", url: "https://www.youtube.com/results?search_query=aws+solutions+architect+full+course", channel: "Stephane Maarek" },
    ],
    courses: [
      { title: "AWS Cloud Practitioner Essentials", url: "https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/", platform: "AWS", price: "Free" },
      { title: "AWS on Coursera", url: "https://www.coursera.org/aws", platform: "Coursera", price: "Free audit" },
      { title: "Ultimate AWS SAA-C03 – Udemy", url: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/", platform: "Udemy", price: "Paid" },
    ],
    repos: [
      { title: "open-guides/og-aws", url: "https://github.com/open-guides/og-aws", description: "Practical AWS guide — tips, gotchas, best practices" },
      { title: "donnemartin/awesome-aws", url: "https://github.com/donnemartin/awesome-aws", description: "Curated list of AWS resources" },
      { title: "acantril/aws-sa-associate-saac03", url: "https://github.com/acantril/aws-sa-associate-saac03", description: "AWS SAA-C03 exam course materials" },
    ],
    cheatsheets: [
      { title: "AWS CLI Cheatsheet", url: "https://www.bluematador.com/learn/aws-cli-cheatsheet", format: "Web" },
      { title: "AWS Services Cheatsheet", url: "https://quickref.me/aws.html", format: "Web" },
      { title: "AWS IAM Cheatsheet", url: "https://devhints.io/awscli", format: "Web" },
    ],
  },
  "Azure": {
    icon: "🔷",
    docs: [
      { title: "learn.microsoft.com/azure", url: "https://learn.microsoft.com/en-us/azure/", note: "Official Microsoft Azure docs" },
      { title: "Azure Architecture Center", url: "https://learn.microsoft.com/en-us/azure/architecture/", note: "Design patterns and best practices" },
      { title: "Azure CLI Reference", url: "https://learn.microsoft.com/en-us/cli/azure/reference-index", note: "Complete CLI command reference" },
    ],
    youtube: [
      { title: "Azure Full Course", url: "https://www.youtube.com/results?search_query=azure+full+course+2026+freecodecamp", channel: "freeCodeCamp" },
      { title: "Azure Fundamentals AZ-900", url: "https://www.youtube.com/results?search_query=azure+az-900+full+course", channel: "Microsoft Learn" },
    ],
    courses: [
      { title: "Azure Fundamentals – Microsoft Learn", url: "https://learn.microsoft.com/en-us/training/paths/azure-fundamentals/", platform: "Microsoft", price: "Free" },
      { title: "AZ-900 on Coursera", url: "https://www.coursera.org/learn/microsoft-azure-fundamentals-az-900", platform: "Coursera", price: "Free audit" },
      { title: "Azure Administrator – Udemy", url: "https://www.udemy.com/topic/microsoft-azure/", platform: "Udemy", price: "Paid" },
    ],
    repos: [
      { title: "MicrosoftDocs/azure-docs", url: "https://github.com/MicrosoftDocs/azure-docs", description: "Official Azure documentation source" },
      { title: "Azure/azure-quickstart-templates", url: "https://github.com/Azure/azure-quickstart-templates", description: "Azure ARM quickstart templates" },
      { title: "johnthebrit/CertificationMaterials", url: "https://github.com/johnthebrit/CertificationMaterials", description: "Azure certification study materials" },
    ],
    cheatsheets: [
      { title: "Azure CLI Cheatsheet", url: "https://learn.microsoft.com/en-us/cli/azure/", format: "Web" },
      { title: "Azure Cheatsheet – QuickRef", url: "https://quickref.me/", format: "Web" },
    ],
  },
  "Google Cloud": {
    icon: "🌩️",
    docs: [
      { title: "cloud.google.com/docs", url: "https://cloud.google.com/docs", note: "Official Google Cloud documentation" },
      { title: "Google Cloud Architecture", url: "https://cloud.google.com/architecture", note: "Architecture best practices" },
      { title: "GCP Training", url: "https://cloud.google.com/training", note: "Official Google Cloud training" },
    ],
    youtube: [
      { title: "GCP Full Course", url: "https://www.youtube.com/results?search_query=google+cloud+full+course+2026", channel: "freeCodeCamp" },
      { title: "GCP Associate Cloud Engineer", url: "https://www.youtube.com/results?search_query=gcp+associate+cloud+engineer+course", channel: "Google Cloud" },
    ],
    courses: [
      { title: "Google Cloud Fundamentals", url: "https://www.coursera.org/learn/gcp-fundamentals", platform: "Coursera / Google", price: "Free audit" },
      { title: "GCP Learning Path", url: "https://cloud.google.com/training/cloud-infrastructure", platform: "Google Cloud", price: "Free" },
      { title: "GCP Associate Prep – Udemy", url: "https://www.udemy.com/topic/google-cloud-professional/", platform: "Udemy", price: "Paid" },
    ],
    repos: [
      { title: "GoogleCloudPlatform/terraforming-gcp", url: "https://github.com/GoogleCloudPlatform/terraforming-gcp", description: "Terraform modules for GCP resources" },
      { title: "sathishvj/awesome-gcp-certifications", url: "https://github.com/sathishvj/awesome-gcp-certifications", description: "GCP certification study resources" },
      { title: "GoogleCloudPlatform/kubernetes-engine-samples", url: "https://github.com/GoogleCloudPlatform/kubernetes-engine-samples", description: "Official GKE sample workloads" },
    ],
    cheatsheets: [
      { title: "GCP gcloud CLI Reference", url: "https://cloud.google.com/sdk/gcloud/reference", format: "Web" },
      { title: "GCP Products Cheatsheet", url: "https://googlecloudcheatsheet.withgoogle.com/", format: "Web" },
    ],
  },
  "Terraform": {
    icon: "🏗️",
    docs: [
      { title: "developer.hashicorp.com/terraform", url: "https://developer.hashicorp.com/terraform/docs", note: "Official Terraform documentation" },
      { title: "Terraform Registry", url: "https://registry.terraform.io/", note: "Providers and modules" },
      { title: "roadmap.sh/terraform", url: "https://roadmap.sh/terraform", note: "Visual learning roadmap" },
    ],
    youtube: [
      { title: "Terraform Full Course", url: "https://www.youtube.com/results?search_query=terraform+full+course+nana+2026", channel: "TechWorld with Nana" },
      { title: "Terraform for Beginners", url: "https://www.youtube.com/results?search_query=terraform+beginner+freecodecamp", channel: "freeCodeCamp" },
    ],
    courses: [
      { title: "Terraform for Beginners – KodeKloud", url: "https://kodekloud.com/courses/terraform-for-beginners/", platform: "KodeKloud", price: "Free" },
      { title: "HashiCorp Learn: Terraform", url: "https://developer.hashicorp.com/terraform/tutorials", platform: "HashiCorp", price: "Free" },
      { title: "Terraform on Udemy", url: "https://www.udemy.com/course/terraform-beginner-to-advanced/", platform: "Udemy", price: "Paid" },
    ],
    repos: [
      { title: "bregman-arie/devops-exercises#terraform", url: "https://github.com/bregman-arie/devops-exercises#terraform", description: "Terraform-specific exercises" },
      { title: "gruntwork-io/terragrunt", url: "https://github.com/gruntwork-io/terragrunt", description: "Terraform wrapper for DRY configs" },
      { title: "antonbabenko/terraform-best-practices", url: "https://github.com/antonbabenko/terraform-best-practices", description: "Terraform best practices guide" },
    ],
    cheatsheets: [
      { title: "Terraform CLI Cheatsheet", url: "https://devhints.io/terraform", format: "Web" },
      { title: "Terraform Cheatsheet – QuickRef", url: "https://quickref.me/terraform.html", format: "Web" },
    ],
  },
  "Linux": {
    icon: "🐧",
    docs: [
      { title: "roadmap.sh/linux", url: "https://roadmap.sh/linux", note: "Linux learning roadmap" },
      { title: "The Linux Command Line (free book)", url: "https://linuxcommand.org/tlcl.php", note: "Full book by William Shotts" },
      { title: "Linux man pages online", url: "https://man7.org/linux/man-pages/", note: "Complete man pages reference" },
    ],
    youtube: [
      { title: "Linux Full Course", url: "https://www.youtube.com/results?search_query=linux+full+course+for+beginners+freecodecamp", channel: "freeCodeCamp" },
      { title: "Linux Administration", url: "https://www.youtube.com/results?search_query=linux+system+administration+full+course", channel: "NetworkChuck" },
    ],
    courses: [
      { title: "Linux Fundamentals – NDG/Cisco", url: "https://www.netacad.com/courses/os-it/ndg-linux-unhatched", platform: "Cisco NetAcad", price: "Free" },
      { title: "Introduction to Linux – edX (LFS101)", url: "https://www.edx.org/learn/linux/the-linux-foundation-introduction-to-linux", platform: "edX", price: "Free audit" },
      { title: "Linux Basics for Hackers", url: "https://nostarch.com/linuxbasicsforhackers", platform: "No Starch Press", price: "Paid" },
    ],
    repos: [
      { title: "learnbyexample/Command-line-text-processing", url: "https://github.com/learnbyexample/Command-line-text-processing", description: "Linux CLI text processing guide" },
      { title: "jlevy/the-art-of-command-line", url: "https://github.com/jlevy/the-art-of-command-line", description: "Master the command line — comprehensive" },
      { title: "awesome-lists/awesome-bash", url: "https://github.com/awesome-lists/awesome-bash", description: "Curated list of bash scripts and resources" },
    ],
    cheatsheets: [
      { title: "Linux Commands Cheatsheet", url: "https://quickref.me/linux.html", format: "Web" },
      { title: "Bash Cheatsheet – Devhints", url: "https://devhints.io/bash", format: "Web" },
      { title: "Linux Shortcuts & Commands", url: "https://www.thegeekstuff.com/2010/02/unix-less-command-10-tips-for-effective-navigation/", format: "Web" },
    ],
  },
  "CI/CD": {
    icon: "🔄",
    docs: [
      { title: "GitHub Actions Docs", url: "https://docs.github.com/en/actions", note: "Official GitHub Actions documentation" },
      { title: "GitLab CI/CD Docs", url: "https://docs.gitlab.com/ee/ci/", note: "GitLab pipeline documentation" },
      { title: "Jenkins Documentation", url: "https://www.jenkins.io/doc/", note: "Official Jenkins docs" },
    ],
    youtube: [
      { title: "GitHub Actions Full Course", url: "https://www.youtube.com/results?search_query=github+actions+full+course+2026", channel: "TechWorld with Nana" },
      { title: "CI/CD Pipeline Tutorial", url: "https://www.youtube.com/results?search_query=ci+cd+pipeline+tutorial+beginner", channel: "NetworkChuck" },
    ],
    courses: [
      { title: "GitHub Actions on GitHub Skills", url: "https://skills.github.com/", platform: "GitHub", price: "Free" },
      { title: "CI/CD with Jenkins – KodeKloud", url: "https://kodekloud.com/courses/jenkins/", platform: "KodeKloud", price: "Free" },
      { title: "GitLab CI/CD – Udemy", url: "https://www.udemy.com/course/gitlab-ci-pipelines-ci-cd-and-devops-for-beginners/", platform: "Udemy", price: "Paid" },
    ],
    repos: [
      { title: "actions/starter-workflows", url: "https://github.com/actions/starter-workflows", description: "Official GitHub Actions starter templates" },
      { title: "awesome-runners/awesome-github-actions", url: "https://github.com/sdras/awesome-actions", description: "Curated list of GitHub Actions" },
      { title: "jenkinsci/pipeline-examples", url: "https://github.com/jenkinsci/pipeline-examples", description: "Jenkins pipeline code examples" },
    ],
    cheatsheets: [
      { title: "GitHub Actions Cheatsheet", url: "https://devhints.io/github-actions", format: "Web" },
      { title: "GitHub Actions Workflow Syntax", url: "https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions", format: "Web" },
    ],
  },
  "Ansible": {
    icon: "📋",
    docs: [
      { title: "docs.ansible.com", url: "https://docs.ansible.com/ansible/latest/", note: "Official Ansible documentation" },
      { title: "Ansible Galaxy", url: "https://galaxy.ansible.com/", note: "Community roles and collections" },
    ],
    youtube: [
      { title: "Ansible Full Course", url: "https://www.youtube.com/results?search_query=ansible+full+course+nana+2026", channel: "TechWorld with Nana" },
      { title: "Ansible for Beginners", url: "https://www.youtube.com/results?search_query=ansible+beginner+freecodecamp", channel: "freeCodeCamp" },
    ],
    courses: [
      { title: "Ansible for Beginners – KodeKloud", url: "https://kodekloud.com/courses/ansible-for-the-absolute-beginners/", platform: "KodeKloud", price: "Free" },
      { title: "Red Hat Ansible Training", url: "https://www.redhat.com/en/services/training-and-certification/ansible-courses", platform: "Red Hat", price: "Paid" },
    ],
    repos: [
      { title: "ansible/ansible-examples", url: "https://github.com/ansible/ansible-examples", description: "Official Ansible example playbooks" },
      { title: "leucos/ansible-tuto", url: "https://github.com/leucos/ansible-tuto", description: "Step-by-step Ansible tutorial" },
    ],
    cheatsheets: [
      { title: "Ansible Cheatsheet – Devhints", url: "https://devhints.io/ansible", format: "Web" },
      { title: "Ansible QuickRef", url: "https://quickref.me/ansible.html", format: "Web" },
    ],
  },
  "Monitoring": {
    icon: "📊",
    docs: [
      { title: "Prometheus Docs", url: "https://prometheus.io/docs/introduction/overview/", note: "Official Prometheus documentation" },
      { title: "Grafana Docs", url: "https://grafana.com/docs/grafana/latest/", note: "Official Grafana documentation" },
      { title: "OpenTelemetry Docs", url: "https://opentelemetry.io/docs/", note: "Observability framework docs" },
    ],
    youtube: [
      { title: "Prometheus & Grafana Full Course", url: "https://www.youtube.com/results?search_query=prometheus+grafana+full+course+nana", channel: "TechWorld with Nana" },
      { title: "Monitoring with Prometheus", url: "https://www.youtube.com/results?search_query=prometheus+monitoring+tutorial+2026", channel: "That DevOps Guy" },
    ],
    courses: [
      { title: "Grafana Fundamentals", url: "https://grafana.com/tutorials/grafana-fundamentals/", platform: "Grafana", price: "Free" },
      { title: "Prometheus & Grafana – KodeKloud", url: "https://kodekloud.com/courses/kubernetes-challenges/", platform: "KodeKloud", price: "Free" },
    ],
    repos: [
      { title: "prometheus/prometheus", url: "https://github.com/prometheus/prometheus", description: "Official Prometheus monitoring system" },
      { title: "grafana/grafana", url: "https://github.com/grafana/grafana", description: "Open-source observability platform" },
      { title: "samber/awesome-prometheus-alerts", url: "https://github.com/samber/awesome-prometheus-alerts", description: "550+ Prometheus alerting rules" },
    ],
    cheatsheets: [
      { title: "PromQL Cheatsheet", url: "https://promlabs.com/promql-cheat-sheet/", format: "Web" },
      { title: "Grafana Dashboard Tips", url: "https://grafana.com/docs/grafana/latest/dashboards/", format: "Web" },
    ],
  },
  "Platform Eng.": {
    icon: "🧱",
    docs: [
      { title: "platformengineering.org", url: "https://platformengineering.org/", note: "Platform engineering community hub" },
      { title: "Backstage.io Docs", url: "https://backstage.io/docs/overview/what-is-backstage", note: "Official Backstage IDP docs" },
    ],
    youtube: [
      { title: "Platform Engineering Full Course", url: "https://www.youtube.com/results?search_query=platform+engineering+internal+developer+platform+2026", channel: "CNCF" },
    ],
    courses: [
      { title: "Platform Engineering on LinkedIn", url: "https://www.linkedin.com/learning/topics/platform-engineering", platform: "LinkedIn Learning", price: "Free trial" },
    ],
    repos: [
      { title: "backstage/backstage", url: "https://github.com/backstage/backstage", description: "Spotify's open-source developer portal" },
      { title: "InternalDeveloperPlatform/internaldeveloperplatform.org", url: "https://github.com/InternalDeveloperPlatform/internaldeveloperplatform.org", description: "Platform engineering reference" },
    ],
    cheatsheets: [
      { title: "Platform Engineering Glossary", url: "https://platformengineering.org/blog/what-is-platform-engineering", format: "Web" },
    ],
  },
  "AI/ML": {
    icon: "🤖",
    docs: [
      { title: "roadmap.sh/ai-data-scientist", url: "https://roadmap.sh/ai-data-scientist", note: "Visual AI/ML roadmap" },
      { title: "fast.ai", url: "https://www.fast.ai/", note: "Practical deep learning for coders" },
      { title: "Google ML Crash Course", url: "https://developers.google.com/machine-learning/crash-course", note: "Free ML course by Google" },
    ],
    youtube: [
      { title: "Machine Learning Full Course", url: "https://www.youtube.com/results?search_query=machine+learning+full+course+freecodecamp+2026", channel: "freeCodeCamp" },
      { title: "Deep Learning Specialization", url: "https://www.youtube.com/results?search_query=andrew+ng+deep+learning+full+course", channel: "Andrew Ng" },
    ],
    courses: [
      { title: "ML Specialization – Coursera (Andrew Ng)", url: "https://www.coursera.org/specializations/machine-learning-introduction", platform: "Coursera", price: "Free audit" },
      { title: "Fast.ai – Practical Deep Learning", url: "https://course.fast.ai/", platform: "fast.ai", price: "Free" },
      { title: "Google ML Crash Course", url: "https://developers.google.com/machine-learning/crash-course", platform: "Google", price: "Free" },
    ],
    repos: [
      { title: "ageron/handson-ml3", url: "https://github.com/ageron/handson-ml3", description: "Hands-on ML with Scikit-Learn, Keras & TensorFlow" },
      { title: "christophM/awesome-machine-learning", url: "https://github.com/josephmisiti/awesome-machine-learning", description: "Curated list of ML frameworks and resources" },
      { title: "eugeneyan/applied-ml", url: "https://github.com/eugeneyan/applied-ml", description: "ML papers and resources applied to real products" },
    ],
    cheatsheets: [
      { title: "Scikit-learn Cheatsheet", url: "https://scikit-learn.org/stable/tutorial/machine_learning_map/", format: "Web" },
      { title: "ML Cheatsheets", url: "https://ml-cheatsheet.readthedocs.io/", format: "Web" },
      { title: "Stanford CS229 Cheatsheets", url: "https://github.com/afshinea/stanford-cs-229-machine-learning", format: "GitHub" },
    ],
  },
  "MLOps": {
    icon: "🔬",
    docs: [
      { title: "roadmap.sh/mlops", url: "https://roadmap.sh/mlops", note: "Visual MLOps roadmap" },
      { title: "MLflow Docs", url: "https://mlflow.org/docs/latest/index.html", note: "MLflow experiment tracking docs" },
      { title: "Kubeflow Docs", url: "https://www.kubeflow.org/docs/", note: "ML workflows on Kubernetes" },
    ],
    youtube: [
      { title: "MLOps Full Course", url: "https://www.youtube.com/results?search_query=mlops+full+course+2026", channel: "freeCodeCamp" },
      { title: "MLOps Zoomcamp", url: "https://www.youtube.com/results?search_query=mlops+zoomcamp+datatalks", channel: "DataTalks.Club" },
    ],
    courses: [
      { title: "MLOps Specialization – Coursera", url: "https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops", platform: "Coursera", price: "Free audit" },
      { title: "MLOps Zoomcamp – DataTalks", url: "https://github.com/DataTalksClub/mlops-zoomcamp", platform: "DataTalks.Club", price: "Free" },
    ],
    repos: [
      { title: "DataTalksClub/mlops-zoomcamp", url: "https://github.com/DataTalksClub/mlops-zoomcamp", description: "Free 9-week MLOps course" },
      { title: "GokuMohandas/Made-With-ML", url: "https://github.com/GokuMohandas/Made-With-ML", description: "MLOps from experimentation to production" },
    ],
    cheatsheets: [
      { title: "MLflow Cheatsheet", url: "https://mlflow.org/docs/latest/tracking.html", format: "Web" },
    ],
  },
  "Data Science": {
    icon: "📈",
    docs: [
      { title: "pandas.pydata.org", url: "https://pandas.pydata.org/docs/", note: "Official pandas documentation" },
      { title: "scikit-learn.org", url: "https://scikit-learn.org/stable/user_guide.html", note: "Scikit-learn user guide" },
    ],
    youtube: [
      { title: "Data Science Full Course", url: "https://www.youtube.com/results?search_query=data+science+full+course+2026+freecodecamp", channel: "freeCodeCamp" },
      { title: "Python for Data Science", url: "https://www.youtube.com/results?search_query=python+data+science+full+course+kaggle", channel: "Kaggle" },
    ],
    courses: [
      { title: "Data Science Specialization – Coursera", url: "https://www.coursera.org/specializations/jhu-data-science", platform: "Coursera", price: "Free audit" },
      { title: "Kaggle Learn – Free Courses", url: "https://www.kaggle.com/learn", platform: "Kaggle", price: "Free" },
    ],
    repos: [
      { title: "jakevdp/PythonDataScienceHandbook", url: "https://github.com/jakevdp/PythonDataScienceHandbook", description: "Full Python Data Science Handbook (free)" },
      { title: "donnemartin/data-science-ipython-notebooks", url: "https://github.com/donnemartin/data-science-ipython-notebooks", description: "Data science Python notebooks" },
    ],
    cheatsheets: [
      { title: "Pandas Cheatsheet", url: "https://pandas.pydata.org/Pandas_Cheat_Sheet.pdf", format: "PDF" },
      { title: "NumPy Cheatsheet", url: "https://www.datacamp.com/cheat-sheet/numpy-cheat-sheet-data-analysis-in-python", format: "Web" },
    ],
  },
  "LLM Engineering": {
    icon: "💬",
    docs: [
      { title: "roadmap.sh/ai-engineer", url: "https://roadmap.sh/ai-engineer", note: "AI Engineer roadmap" },
      { title: "OpenAI API Docs", url: "https://platform.openai.com/docs/overview", note: "OpenAI API reference" },
      { title: "LangChain Docs", url: "https://python.langchain.com/docs/introduction/", note: "LangChain framework docs" },
    ],
    youtube: [
      { title: "LLM Engineering Full Course", url: "https://www.youtube.com/results?search_query=llm+engineering+full+course+2026", channel: "freeCodeCamp" },
      { title: "LangChain & RAG Tutorial", url: "https://www.youtube.com/results?search_query=langchain+rag+tutorial+2026", channel: "Tech with Tim" },
    ],
    courses: [
      { title: "LLM Zoomcamp – DataTalks", url: "https://github.com/DataTalksClub/llm-zoomcamp", platform: "DataTalks.Club", price: "Free" },
      { title: "LLM Engineering – Udemy", url: "https://www.udemy.com/course/llm-engineering-master-ai-and-large-language-models/", platform: "Udemy", price: "Paid" },
    ],
    repos: [
      { title: "DataTalksClub/llm-zoomcamp", url: "https://github.com/DataTalksClub/llm-zoomcamp", description: "Free LLM engineering course" },
      { title: "langchain-ai/langchain", url: "https://github.com/langchain-ai/langchain", description: "Building apps with LLMs" },
      { title: "microsoft/promptflow", url: "https://github.com/microsoft/promptflow", description: "Tools for building LLM-powered apps" },
    ],
    cheatsheets: [
      { title: "Prompt Engineering Guide", url: "https://www.promptingguide.ai/", format: "Web" },
      { title: "LangChain Expression Language Cheatsheet", url: "https://python.langchain.com/docs/expression_language/", format: "Web" },
    ],
  },
  "Python": {
    icon: "🐍",
    docs: [
      { title: "docs.python.org", url: "https://docs.python.org/3/", note: "Official Python 3 documentation" },
      { title: "roadmap.sh/python", url: "https://roadmap.sh/python", note: "Visual Python roadmap" },
      { title: "Real Python", url: "https://realpython.com/", note: "Tutorials, articles & courses" },
    ],
    youtube: [
      { title: "Python Full Course", url: "https://www.youtube.com/results?search_query=python+full+course+for+beginners+freecodecamp+2026", channel: "freeCodeCamp" },
      { title: "Python Intermediate Concepts", url: "https://www.youtube.com/results?search_query=python+intermediate+advanced+corey+schafer", channel: "Corey Schafer" },
    ],
    courses: [
      { title: "Python for Everybody – Coursera", url: "https://www.coursera.org/specializations/python", platform: "Coursera", price: "Free audit" },
      { title: "Automate the Boring Stuff", url: "https://automatetheboringstuff.com/", platform: "Free Book", price: "Free" },
      { title: "Python Bootcamp – Udemy", url: "https://www.udemy.com/course/complete-python-bootcamp/", platform: "Udemy", price: "Paid" },
    ],
    repos: [
      { title: "TheAlgorithms/Python", url: "https://github.com/TheAlgorithms/Python", description: "All algorithms in Python" },
      { title: "vinta/awesome-python", url: "https://github.com/vinta/awesome-python", description: "Curated list of Python frameworks" },
      { title: "trekhleb/learn-python", url: "https://github.com/trekhleb/learn-python", description: "Python scripts with explanations" },
    ],
    cheatsheets: [
      { title: "Python Cheatsheet – QuickRef", url: "https://quickref.me/python.html", format: "Web" },
      { title: "Python Cheatsheet – gto76", url: "https://github.com/gto76/python-cheatsheet", format: "GitHub" },
      { title: "Python Devhints", url: "https://devhints.io/python", format: "Web" },
    ],
  },
  "Go": {
    icon: "🏎️",
    docs: [
      { title: "go.dev/doc", url: "https://go.dev/doc/", note: "Official Go documentation" },
      { title: "roadmap.sh/golang", url: "https://roadmap.sh/golang", note: "Visual Go roadmap" },
      { title: "A Tour of Go", url: "https://go.dev/tour/", note: "Interactive Go tutorial" },
    ],
    youtube: [
      { title: "Go Full Course", url: "https://www.youtube.com/results?search_query=golang+full+course+freecodecamp+2026", channel: "freeCodeCamp" },
      { title: "Go Programming Tutorial", url: "https://www.youtube.com/results?search_query=golang+tutorial+beginner+2026", channel: "Tech With Tim" },
    ],
    courses: [
      { title: "Go by Example", url: "https://gobyexample.com/", platform: "Open Source", price: "Free" },
      { title: "Learn Go – Codecademy", url: "https://www.codecademy.com/learn/learn-go", platform: "Codecademy", price: "Free" },
      { title: "Go with Google on Coursera", url: "https://www.coursera.org/specializations/google-golang", platform: "Coursera", price: "Free audit" },
    ],
    repos: [
      { title: "tmrts/go-patterns", url: "https://github.com/tmrts/go-patterns", description: "Go design patterns and idioms" },
      { title: "avelino/awesome-go", url: "https://github.com/avelino/awesome-go", description: "Curated list of Go frameworks" },
      { title: "karanpratapsingh/learn-go", url: "https://github.com/karanpratapsingh/learn-go", description: "Complete Go learning guide" },
    ],
    cheatsheets: [
      { title: "Go Cheatsheet – Devhints", url: "https://devhints.io/go", format: "Web" },
      { title: "Go QuickRef", url: "https://quickref.me/golang.html", format: "Web" },
    ],
  },
  "Rust": {
    icon: "⚙️",
    docs: [
      { title: "doc.rust-lang.org/book", url: "https://doc.rust-lang.org/book/", note: "The Rust Programming Language (free book)" },
      { title: "roadmap.sh/rust", url: "https://roadmap.sh/rust", note: "Visual Rust roadmap" },
      { title: "Rust by Example", url: "https://doc.rust-lang.org/rust-by-example/", note: "Learn Rust through examples" },
    ],
    youtube: [
      { title: "Rust Full Course", url: "https://www.youtube.com/results?search_query=rust+programming+full+course+2026+freecodecamp", channel: "freeCodeCamp" },
      { title: "Rust for Beginners", url: "https://www.youtube.com/results?search_query=rust+beginner+tutorial+2026", channel: "Let's Get Rusty" },
    ],
    courses: [
      { title: "Rustlings (interactive exercises)", url: "https://github.com/rust-lang/rustlings", platform: "Open Source", price: "Free" },
      { title: "Rust on Exercism", url: "https://exercism.org/tracks/rust", platform: "Exercism", price: "Free" },
    ],
    repos: [
      { title: "rust-lang/rustlings", url: "https://github.com/rust-lang/rustlings", description: "Small exercises to learn Rust" },
      { title: "rust-unofficial/awesome-rust", url: "https://github.com/rust-unofficial/awesome-rust", description: "Curated list of Rust code and resources" },
      { title: "TheAlgorithms/Rust", url: "https://github.com/TheAlgorithms/Rust", description: "Algorithms implemented in Rust" },
    ],
    cheatsheets: [
      { title: "Rust Cheatsheet – QuickRef", url: "https://quickref.me/rust.html", format: "Web" },
      { title: "Rust Reference", url: "https://doc.rust-lang.org/reference/", format: "Web" },
    ],
  },
  "Java": {
    icon: "☕",
    docs: [
      { title: "docs.oracle.com/java", url: "https://docs.oracle.com/en/java/", note: "Official Java documentation" },
      { title: "roadmap.sh/java", url: "https://roadmap.sh/java", note: "Visual Java roadmap" },
      { title: "Spring Guides", url: "https://spring.io/guides", note: "Official Spring Framework guides" },
    ],
    youtube: [
      { title: "Java Full Course", url: "https://www.youtube.com/results?search_query=java+full+course+for+beginners+freecodecamp+2026", channel: "freeCodeCamp" },
      { title: "Spring Boot Tutorial", url: "https://www.youtube.com/results?search_query=spring+boot+full+course+2026+amigoscode", channel: "Amigoscode" },
    ],
    courses: [
      { title: "Java Programming – Udemy (Tim Buchalka)", url: "https://www.udemy.com/course/java-the-complete-java-developer-course/", platform: "Udemy", price: "Paid" },
      { title: "Java MOOC – University of Helsinki", url: "https://java-programming.mooc.fi/", platform: "MOOC.fi", price: "Free" },
      { title: "Java on Codecademy", url: "https://www.codecademy.com/learn/learn-java", platform: "Codecademy", price: "Free" },
    ],
    repos: [
      { title: "iluwatar/java-design-patterns", url: "https://github.com/iluwatar/java-design-patterns", description: "Java design patterns with examples" },
      { title: "TheAlgorithms/Java", url: "https://github.com/TheAlgorithms/Java", description: "Algorithms implemented in Java" },
      { title: "in28minutes/spring-microservices-v3", url: "https://github.com/in28minutes/spring-microservices-v3", description: "Spring Boot microservices course" },
    ],
    cheatsheets: [
      { title: "Java Cheatsheet – QuickRef", url: "https://quickref.me/java.html", format: "Web" },
      { title: "Java Devhints", url: "https://devhints.io/java", format: "Web" },
    ],
  },
  "Node.js": {
    icon: "💚",
    docs: [
      { title: "nodejs.org/docs", url: "https://nodejs.org/en/docs", note: "Official Node.js documentation" },
      { title: "roadmap.sh/nodejs", url: "https://roadmap.sh/nodejs", note: "Visual Node.js roadmap" },
      { title: "Express.js Guide", url: "https://expressjs.com/en/guide/routing.html", note: "Official Express.js docs" },
    ],
    youtube: [
      { title: "Node.js Full Course", url: "https://www.youtube.com/results?search_query=nodejs+full+course+freecodecamp+2026", channel: "freeCodeCamp" },
      { title: "Node.js Crash Course", url: "https://www.youtube.com/results?search_query=node+js+crash+course+traversy+2026", channel: "Traversy Media" },
    ],
    courses: [
      { title: "The Odin Project – Node.js Path", url: "https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs", platform: "The Odin Project", price: "Free" },
      { title: "Node.js on Codecademy", url: "https://www.codecademy.com/learn/learn-node-js", platform: "Codecademy", price: "Free" },
    ],
    repos: [
      { title: "goldbergyoni/nodebestpractices", url: "https://github.com/goldbergyoni/nodebestpractices", description: "Node.js best practices checklist (99k ⭐)" },
      { title: "sindresorhus/awesome-nodejs", url: "https://github.com/sindresorhus/awesome-nodejs", description: "Curated Node.js packages and resources" },
    ],
    cheatsheets: [
      { title: "Node.js Cheatsheet", url: "https://devhints.io/nodejs", format: "Web" },
      { title: "Express.js Cheatsheet", url: "https://devhints.io/express", format: "Web" },
    ],
  },
  "System Design": {
    icon: "🏛️",
    docs: [
      { title: "roadmap.sh/system-design", url: "https://roadmap.sh/system-design", note: "Visual system design roadmap" },
      { title: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", note: "Huge open-source study guide" },
    ],
    youtube: [
      { title: "System Design Full Course", url: "https://www.youtube.com/results?search_query=system+design+full+course+2026", channel: "freeCodeCamp" },
      { title: "System Design Interview", url: "https://www.youtube.com/results?search_query=system+design+interview+prep+2026", channel: "Gaurav Sen" },
    ],
    courses: [
      { title: "Grokking System Design – DesignGurus", url: "https://www.designgurus.io/course/grokking-the-system-design-interview", platform: "DesignGurus", price: "Paid" },
      { title: "System Design – Coursera", url: "https://www.coursera.org/learn/cloud-computing", platform: "Coursera", price: "Free audit" },
    ],
    repos: [
      { title: "donnemartin/system-design-primer", url: "https://github.com/donnemartin/system-design-primer", description: "System design interview prep (260k ⭐)" },
      { title: "ByteByteGoHq/system-design-101", url: "https://github.com/ByteByteGoHq/system-design-101", description: "Visual system design explanations" },
    ],
    cheatsheets: [
      { title: "System Design Cheatsheet", url: "https://github.com/Nitin96Bisht/System-Design/blob/master/README.md", format: "GitHub" },
    ],
  },
  "PostgreSQL": {
    icon: "🐘",
    docs: [
      { title: "postgresql.org/docs", url: "https://www.postgresql.org/docs/current/", note: "Official PostgreSQL documentation" },
      { title: "roadmap.sh/postgresql-dba", url: "https://roadmap.sh/postgresql-dba", note: "PostgreSQL DBA roadmap" },
    ],
    youtube: [
      { title: "PostgreSQL Full Course", url: "https://www.youtube.com/results?search_query=postgresql+full+course+freecodecamp+2026", channel: "freeCodeCamp" },
    ],
    courses: [
      { title: "PostgreSQL – Codecademy", url: "https://www.codecademy.com/learn/learn-sql", platform: "Codecademy", price: "Free" },
      { title: "pgExercises", url: "https://pgexercises.com/", platform: "pgExercises", price: "Free" },
    ],
    repos: [
      { title: "dhamaniasad/awesome-postgres", url: "https://github.com/dhamaniasad/awesome-postgres", description: "Curated list of PostgreSQL resources" },
      { title: "supabase/supabase", url: "https://github.com/supabase/supabase", description: "Open-source Firebase alternative (PostgreSQL)" },
    ],
    cheatsheets: [
      { title: "PostgreSQL Cheatsheet", url: "https://quickref.me/postgres.html", format: "Web" },
      { title: "psql Cheatsheet – Devhints", url: "https://devhints.io/postgresql", format: "Web" },
    ],
  },
  "React": {
    icon: "⚛️",
    docs: [
      { title: "react.dev", url: "https://react.dev/", note: "Official React documentation" },
      { title: "roadmap.sh/react", url: "https://roadmap.sh/react", note: "Visual React roadmap" },
    ],
    youtube: [
      { title: "React Full Course", url: "https://www.youtube.com/results?search_query=react+full+course+freecodecamp+2026", channel: "freeCodeCamp" },
      { title: "React with Dave Gray", url: "https://www.youtube.com/results?search_query=react+js+full+tutorial+dave+gray", channel: "Dave Gray" },
    ],
    courses: [
      { title: "React – The Odin Project", url: "https://www.theodinproject.com/paths/full-stack-javascript/courses/react", platform: "The Odin Project", price: "Free" },
      { title: "React – Scrimba", url: "https://scrimba.com/learn/learnreact", platform: "Scrimba", price: "Free" },
    ],
    repos: [
      { title: "enaqx/awesome-react", url: "https://github.com/enaqx/awesome-react", description: "Curated list of React resources" },
      { title: "streamich/react-use", url: "https://github.com/streamich/react-use", description: "React hooks library" },
    ],
    cheatsheets: [
      { title: "React Cheatsheet", url: "https://devhints.io/react", format: "Web" },
      { title: "React Hooks Cheatsheet", url: "https://react-hooks-cheatsheet.com/", format: "Web" },
    ],
  },
  "TypeScript": {
    icon: "🔷",
    docs: [
      { title: "typescriptlang.org/docs", url: "https://www.typescriptlang.org/docs/", note: "Official TypeScript docs" },
      { title: "roadmap.sh/typescript", url: "https://roadmap.sh/typescript", note: "Visual TypeScript roadmap" },
      { title: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/intro.html", note: "Complete language handbook" },
    ],
    youtube: [
      { title: "TypeScript Full Course", url: "https://www.youtube.com/results?search_query=typescript+full+course+freecodecamp+2026", channel: "freeCodeCamp" },
    ],
    courses: [
      { title: "TypeScript – Codecademy", url: "https://www.codecademy.com/learn/learn-typescript", platform: "Codecademy", price: "Free" },
      { title: "Execute Program – TypeScript", url: "https://www.executeprogram.com/courses/typescript", platform: "Execute Program", price: "Free trial" },
    ],
    repos: [
      { title: "type-challenges/type-challenges", url: "https://github.com/type-challenges/type-challenges", description: "TypeScript type system challenges" },
      { title: "dzharii/awesome-typescript", url: "https://github.com/dzharii/awesome-typescript", description: "Curated TypeScript resources" },
    ],
    cheatsheets: [
      { title: "TypeScript Cheatsheet", url: "https://devhints.io/typescript", format: "Web" },
      { title: "TypeScript QuickRef", url: "https://quickref.me/typescript.html", format: "Web" },
    ],
  },
  "Frontend": {
    icon: "🎨",
    docs: [
      { title: "roadmap.sh/frontend", url: "https://roadmap.sh/frontend", note: "Visual frontend roadmap" },
      { title: "MDN Web Docs", url: "https://developer.mozilla.org/", note: "HTML, CSS, JavaScript reference" },
      { title: "web.dev", url: "https://web.dev/learn", note: "Google's web development guides" },
    ],
    youtube: [
      { title: "Frontend Full Course", url: "https://www.youtube.com/results?search_query=frontend+web+development+full+course+2026+freecodecamp", channel: "freeCodeCamp" },
    ],
    courses: [
      { title: "The Odin Project", url: "https://www.theodinproject.com/", platform: "The Odin Project", price: "Free" },
      { title: "freeCodeCamp Responsive Web Design", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", platform: "freeCodeCamp", price: "Free" },
    ],
    repos: [
      { title: "thedaviddias/Front-End-Checklist", url: "https://github.com/thedaviddias/Front-End-Checklist", description: "Comprehensive frontend checklist" },
      { title: "nicedoc/everything-about-css", url: "https://github.com/AllThingsSmitty/css-protips", description: "CSS tips and tricks" },
    ],
    cheatsheets: [
      { title: "HTML Cheatsheet", url: "https://quickref.me/html.html", format: "Web" },
      { title: "CSS Cheatsheet", url: "https://quickref.me/css.html", format: "Web" },
      { title: "JavaScript Cheatsheet", url: "https://devhints.io/es6", format: "Web" },
    ],
  },
  "Vue.js": {
    icon: "💚",
    docs: [
      { title: "vuejs.org/guide", url: "https://vuejs.org/guide/introduction.html", note: "Official Vue.js documentation" },
      { title: "roadmap.sh/vue", url: "https://roadmap.sh/vue", note: "Visual Vue roadmap" },
    ],
    youtube: [
      { title: "Vue.js Full Course", url: "https://www.youtube.com/results?search_query=vuejs+full+course+freecodecamp+2026", channel: "freeCodeCamp" },
    ],
    courses: [
      { title: "Vue Mastery – Free", url: "https://www.vuemastery.com/courses/intro-to-vue-3/intro-to-vue3", platform: "Vue Mastery", price: "Free" },
      { title: "Vue.js – Codecademy", url: "https://www.codecademy.com/learn/learn-vue-js", platform: "Codecademy", price: "Free" },
    ],
    repos: [
      { title: "vuejs/awesome-vue", url: "https://github.com/vuejs/awesome-vue", description: "Curated Vue.js resources" },
    ],
    cheatsheets: [
      { title: "Vue Cheatsheet – Devhints", url: "https://devhints.io/vue", format: "Web" },
    ],
  },
  "Cybersecurity": {
    icon: "🔒",
    docs: [
      { title: "roadmap.sh/cyber-security", url: "https://roadmap.sh/cyber-security", note: "Visual cybersecurity roadmap" },
      { title: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/", note: "Top 10 web security risks" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", note: "Industry standard framework" },
    ],
    youtube: [
      { title: "Cybersecurity Full Course", url: "https://www.youtube.com/results?search_query=cybersecurity+full+course+2026+freecodecamp", channel: "freeCodeCamp" },
      { title: "Ethical Hacking Course", url: "https://www.youtube.com/results?search_query=ethical+hacking+full+course+freecodecamp", channel: "TCM Security" },
    ],
    courses: [
      { title: "Google Cybersecurity Certificate", url: "https://www.coursera.org/professional-certificates/google-cybersecurity", platform: "Coursera / Google", price: "Free audit" },
      { title: "TryHackMe – Free Rooms", url: "https://tryhackme.com/", platform: "TryHackMe", price: "Free" },
      { title: "Hack The Box Academy", url: "https://academy.hackthebox.com/", platform: "HTB", price: "Free tier" },
    ],
    repos: [
      { title: "apsdehal/awesome-ctf", url: "https://github.com/apsdehal/awesome-ctf", description: "Curated CTF frameworks and resources" },
      { title: "enaqx/awesome-pentest", url: "https://github.com/enaqx/awesome-pentest", description: "Penetration testing resources" },
      { title: "OWASP/CheatSheetSeries", url: "https://github.com/OWASP/CheatSheetSeries", description: "OWASP security cheat sheets" },
    ],
    cheatsheets: [
      { title: "OWASP Cheat Sheet Series", url: "https://cheatsheetseries.owasp.org/", format: "Web" },
      { title: "Nmap Cheatsheet", url: "https://quickref.me/nmap.html", format: "Web" },
    ],
  },
  "DevSecOps": {
    icon: "🛡️",
    docs: [
      { title: "OWASP DevSecOps Guideline", url: "https://owasp.org/www-project-devsecops-guideline/", note: "OWASP DevSecOps guide" },
      { title: "SAST/DAST Tools", url: "https://owasp.org/www-community/Source_Code_Analysis_Tools", note: "Security analysis tools list" },
    ],
    youtube: [
      { title: "DevSecOps Full Course", url: "https://www.youtube.com/results?search_query=devsecops+full+course+2026", channel: "TechWorld with Nana" },
    ],
    courses: [
      { title: "DevSecOps Foundations – LinkedIn", url: "https://www.linkedin.com/learning/devsecops-foundations", platform: "LinkedIn Learning", price: "Free trial" },
    ],
    repos: [
      { title: "TaptuIT/awesome-devsecops", url: "https://github.com/TaptuIT/awesome-devsecops", description: "Curated DevSecOps resources" },
      { title: "aquasecurity/trivy", url: "https://github.com/aquasecurity/trivy", description: "Container vulnerability scanner" },
    ],
    cheatsheets: [
      { title: "DevSecOps Quick Reference", url: "https://cheatsheetseries.owasp.org/cheatsheets/CI_CD_Security_Cheat_Sheet.html", format: "Web" },
    ],
  },
  "Flutter": {
    icon: "💙",
    docs: [
      { title: "docs.flutter.dev", url: "https://docs.flutter.dev/", note: "Official Flutter documentation" },
      { title: "roadmap.sh/flutter", url: "https://roadmap.sh/flutter", note: "Visual Flutter roadmap" },
      { title: "Dart Language Tour", url: "https://dart.dev/language", note: "Official Dart language guide" },
    ],
    youtube: [
      { title: "Flutter Full Course", url: "https://www.youtube.com/results?search_query=flutter+full+course+for+beginners+2026+freecodecamp", channel: "freeCodeCamp" },
    ],
    courses: [
      { title: "Flutter & Dart – Udemy (Angela Yu)", url: "https://www.udemy.com/course/flutter-bootcamp-with-dart/", platform: "Udemy", price: "Paid" },
      { title: "Flutter Codelabs", url: "https://docs.flutter.dev/codelabs", platform: "Flutter", price: "Free" },
    ],
    repos: [
      { title: "Solido/awesome-flutter", url: "https://github.com/Solido/awesome-flutter", description: "Curated Flutter resources and packages" },
    ],
    cheatsheets: [
      { title: "Flutter Widget Catalog", url: "https://docs.flutter.dev/ui/widgets", format: "Web" },
      { title: "Dart Cheatsheet", url: "https://dart.dev/guides/language/cheatsheet", format: "Web" },
    ],
  },
  "Android": {
    icon: "🤖",
    docs: [
      { title: "developer.android.com/docs", url: "https://developer.android.com/docs", note: "Official Android documentation" },
      { title: "roadmap.sh/android", url: "https://roadmap.sh/android", note: "Visual Android roadmap" },
      { title: "Jetpack Compose Docs", url: "https://developer.android.com/jetpack/compose/documentation", note: "Modern Android UI toolkit" },
    ],
    youtube: [
      { title: "Android Full Course", url: "https://www.youtube.com/results?search_query=android+development+full+course+2026+freecodecamp", channel: "freeCodeCamp" },
    ],
    courses: [
      { title: "Android Development – Google", url: "https://developer.android.com/courses", platform: "Google", price: "Free" },
      { title: "Android on Udacity", url: "https://www.udacity.com/course/developing-android-apps-with-kotlin--ud9012", platform: "Udacity", price: "Free" },
    ],
    repos: [
      { title: "nicklockwood/awesome-android", url: "https://github.com/JStumpp/awesome-android", description: "Curated Android resources" },
      { title: "android/architecture-samples", url: "https://github.com/android/architecture-samples", description: "Official Android architecture samples" },
    ],
    cheatsheets: [
      { title: "Kotlin Cheatsheet", url: "https://quickref.me/kotlin.html", format: "Web" },
      { title: "Android Studio Shortcuts", url: "https://developer.android.com/studio/intro/keyboard-shortcuts", format: "Web" },
    ],
  },
};

// ── Live GitHub repos fetch ────────────────────────────────────────────────────
async function fetchLiveRepos(topic: string) {
  try {
    const q = encodeURIComponent(topic.toLowerCase().replace(/[.\s/]+/g, "-") + " awesome tutorial");
    const res = await fetch(
      `https://api.github.com/search/repositories?q=${q}&sort=stars&order=desc&per_page=6`,
      { headers: { Accept: "application/vnd.github.v3+json" }, cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items ?? []).slice(0, 6).map((r: { full_name: string; html_url: string; description: string | null; stargazers_count: number }) => ({
      title: r.full_name,
      url: r.html_url,
      description: r.description ?? "",
      stars: r.stargazers_count,
    }));
  } catch { return []; }
}

// ── Sub-navigation component ───────────────────────────────────────────────────
function SubNav({ active }: { active: string }) {
  const links = [
    { href: "/roadmaps",               label: "Roadmaps",     icon: "🗺️" },
    { href: "/roadmaps/learning",      label: "Learning",     icon: "📚" },
    { href: "/roadmaps/certifications",label: "Certifications",icon: "🏆" },
    { href: "/roadmaps/salaries",      label: "Salaries",     icon: "💰" },
    { href: "/roadmaps/interviews",    label: "Interview Prep",icon: "🎯" },
  ];
  return (
    <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1">
          {links.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={`inline-flex items-center gap-1.5 px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                active === label
                  ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300"
              }`}
            >
              <span>{icon}</span>{label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Section components ─────────────────────────────────────────────────────────
function SectionHeader({ icon, title, count, color }: { icon: React.ReactNode; title: string; count?: number; color: string }) {
  return (
    <div className={`flex items-center gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800`}>
      <div className={`p-2 rounded-xl ${color}`}>{icon}</div>
      <h3 className="font-black text-slate-900 dark:text-white text-base">{title}</h3>
      {count !== undefined && (
        <span className="ml-auto text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{count}</span>
      )}
    </div>
  );
}

export default async function LearningPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic: rawTopic } = await searchParams;
  const activeTopic: Topic = (TOPICS.includes(rawTopic as Topic) ? rawTopic : "DevOps") as Topic;
  const data = LEARNING[activeTopic];
  const liveRepos = await fetchLiveRepos(activeTopic);

  // Merge curated + live repos (deduplicate by URL)
  const allRepos = [...data.repos];
  for (const r of liveRepos) {
    if (!allRepos.some((x) => x.url === r.url)) {
      allRepos.push({ title: r.title, url: r.url, description: r.description });
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter text-blue-600 dark:text-blue-400 group">
            <Compass className="w-7 h-7 group-hover:rotate-45 transition-transform duration-500" />
            <span>Stack<span className="text-slate-900 dark:text-white">Lens</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">Explore</Link>
            <Link href="/roadmaps" className="text-sm font-medium text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 pb-0.5">Roadmaps</Link>
            <Link href="/news" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">News</Link>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="https://github.com/code-and-secure?tab=repositories" target="_blank" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors p-2">
              <GitHubIcon className="w-5 h-5" />
            </a>
            <ThemeToggle />
            <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <SubNav active="Learning" />
      <TickerBar />

      <main className="container mx-auto px-4 py-10 max-w-7xl">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-blue-200 dark:border-blue-800">
            <BookOpen className="w-3.5 h-3.5" />
            Learning Resources Hub · {TOPICS.length} Topics
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
            {data.icon} {activeTopic}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Learning Resources
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base mb-0">
            Official docs · YouTube playlists · Free courses · GitHub repos · Cheat sheets — all in one place.
          </p>
        </section>

        {/* ── Topic selector ────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-10 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          {TOPICS.map((t) => (
            <Link
              key={t}
              href={`/roadmaps/learning?topic=${encodeURIComponent(t)}`}
              className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                activeTopic === t
                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600"
              }`}
            >
              <span>{LEARNING[t].icon}</span> {t}
            </Link>
          ))}
        </div>

        {/* ── Resource grid ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Official Docs */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <SectionHeader
              icon={<ScrollText className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
              title="Official Documentation"
              count={data.docs.length}
              color="bg-blue-50 dark:bg-blue-950/40"
            />
            <ul className="space-y-3">
              {data.docs.map((doc) => (
                <li key={doc.url}>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors border border-transparent hover:border-blue-100 dark:hover:border-blue-900"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0 mt-0.5">
                      <ScrollText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{doc.title}</p>
                      {doc.note && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{doc.note}</p>}
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors shrink-0 mt-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* YouTube Playlists */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <SectionHeader
              icon={<Play className="w-4 h-4 text-red-600" />}
              title="YouTube Playlists"
              count={data.youtube.length}
              color="bg-red-50 dark:bg-red-950/40"
            />
            <ul className="space-y-3">
              {data.youtube.map((vid) => (
                <li key={vid.url}>
                  <a
                    href={vid.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-900"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/40 flex items-center justify-center shrink-0 mt-0.5 text-base">
                      ▶️
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{vid.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">📺 {vid.channel}</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-red-500 transition-colors shrink-0 mt-1" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(activeTopic + " full course 2026")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 border border-slate-200 dark:border-slate-700"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                  Search more {activeTopic} videos on YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* Free Courses */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <SectionHeader
              icon={<GraduationCap className="w-4 h-4 text-green-600" />}
              title="Best Free Courses"
              count={data.courses.length}
              color="bg-green-50 dark:bg-green-950/40"
            />
            <ul className="space-y-3">
              {data.courses.map((course) => (
                <li key={course.url}>
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 p-3 rounded-xl hover:bg-green-50 dark:hover:bg-green-950/30 transition-colors border border-transparent hover:border-green-100 dark:hover:border-green-900"
                  >
                    <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center shrink-0 mt-0.5 text-base">
                      🎓
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{course.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-500 dark:text-slate-400">{course.platform}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          course.price === "Free" || course.price === "Free audit"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                            : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                        }`}>
                          {course.price}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-green-500 transition-colors shrink-0 mt-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cheat Sheets */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <SectionHeader
              icon={<FileCode className="w-4 h-4 text-violet-600" />}
              title="Cheat Sheets"
              count={data.cheatsheets.length}
              color="bg-violet-50 dark:bg-violet-950/40"
            />
            <ul className="space-y-3">
              {data.cheatsheets.map((sheet) => (
                <li key={sheet.url}>
                  <a
                    href={sheet.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 p-3 rounded-xl hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-colors border border-transparent hover:border-violet-100 dark:hover:border-violet-900"
                  >
                    <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center shrink-0 mt-0.5 text-base">
                      📋
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">{sheet.title}</p>
                      {sheet.format && <p className="text-xs text-slate-400 mt-0.5">{sheet.format}</p>}
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-violet-500 transition-colors shrink-0 mt-1" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`https://devhints.io/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                  More cheat sheets at devhints.io →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── GitHub Repositories (full width) ─────────────────────── */}
        <div className="mt-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          <SectionHeader
            icon={<Star className="w-4 h-4 text-yellow-500" />}
            title="GitHub Repositories"
            count={allRepos.length}
            color="bg-yellow-50 dark:bg-yellow-950/40"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {allRepos.slice(0, 9).map((repo) => (
              <a
                key={repo.url}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-yellow-300 dark:hover:border-yellow-700 hover:bg-yellow-50 dark:hover:bg-yellow-950/20 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-base">⭐</div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors truncate">{repo.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{repo.description}</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-yellow-500 transition-colors shrink-0 mt-0.5" />
              </a>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <a
              href={`https://github.com/search?q=${encodeURIComponent("awesome " + activeTopic.toLowerCase())}&type=repositories&sort=stars`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
              Search more {activeTopic} repositories on GitHub
            </a>
          </div>
        </div>

        {/* ── Quick links to other sections ────────────────────────── */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: "/roadmaps/certifications", icon: "🏆", title: "Certifications", desc: "AWS, K8s, GCP certs with fees & tips" },
            { href: "/roadmaps/salaries",        icon: "💰", title: "Salary Insights",  desc: "Role-based salary data by region" },
            { href: "/roadmaps/interviews",      icon: "🎯", title: "Interview Prep",  desc: "Top 50 questions per stack" },
          ].map(({ href, icon, title, desc }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-start gap-3 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all"
            >
              <span className="text-2xl">{icon}</span>
              <div>
                <p className="font-black text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 ml-auto self-center transition-colors" />
            </Link>
          ))}
        </div>

      </main>

      <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 py-10 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-blue-600 dark:text-blue-400">
            <Compass className="w-6 h-6" />
            <span>Stack<span className="text-slate-900 dark:text-white">Lens</span></span>
          </Link>
          <p className="text-slate-400 text-sm text-center">© {new Date().getFullYear()} StackLens. All rights reserved.</p>
          <div className="flex gap-4 text-sm text-slate-500">
            <Link href="/roadmaps" className="hover:text-blue-600 transition-colors">Roadmaps</Link>
            <Link href="/news" className="hover:text-blue-600 transition-colors">News</Link>
            <Link href="/roadmaps/learning" className="hover:text-blue-600 transition-colors">Learning</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
