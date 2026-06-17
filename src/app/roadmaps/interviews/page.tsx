import Link from "next/link";
import { Compass, ExternalLink, MessageSquare, ChevronRight } from "lucide-react";
import { TickerBar } from "@/components/ticker-bar";
import { SiteHeader } from "@/components/site-header";

export const dynamic = "force-dynamic";

// ── Types ──────────────────────────────────────────────────────────────────────
type Category = "Question Banks" | "Practice & Hands-on" | "Study Guides" | "Community" | "Mock Interviews";

interface PrepSite {
  title: string;
  url: string;
  description: string;
  category: Category;
  free: boolean;
  badge?: string;
}

// ── Topics ─────────────────────────────────────────────────────────────────────
const TOPICS = [
  "DevOps", "Kubernetes", "Docker", "AWS", "Azure", "Google Cloud",
  "Terraform", "Linux", "CI/CD", "Ansible", "Monitoring",
  "AI/ML", "Python", "Go", "Rust", "Java", "Node.js",
  "System Design", "Cybersecurity", "DevSecOps", "React", "TypeScript",
] as const;

type Topic = typeof TOPICS[number];

// ── Per-topic interview prep sites ────────────────────────────────────────────
const PREP_SITES: Record<Topic, PrepSite[]> = {

  "DevOps": [
    { category: "Question Banks",      free: true,  badge: "Top Pick", title: "DevOps Interview Questions – Edureka", url: "https://www.edureka.co/blog/interview-questions/top-devops-interview-questions-2016/", description: "200+ DevOps interview questions covering CI/CD, Docker, Kubernetes, Ansible, Chef, Puppet, and more — organized by topic and difficulty." },
    { category: "Question Banks",      free: true,  title: "DevOps Questions – InterviewBit", url: "https://www.interviewbit.com/devops-interview-questions/", description: "Curated list of frequently asked DevOps questions with detailed answers, covering tools, practices, and cultural concepts." },
    { category: "Question Banks",      free: true,  title: "DevOps Interview Questions – Guru99", url: "https://www.guru99.com/devops-interview-questions.html", description: "50+ questions with answers on DevOps concepts, methodologies, and popular tools like Jenkins, Git, and Docker." },
    { category: "Practice & Hands-on", free: true,  badge: "Hands-on", title: "KodeKloud DevOps Labs", url: "https://kodekloud.com/courses/devops-for-the-absolute-beginners/", description: "Browser-based labs where you practice DevOps tasks in real environments — no local setup needed. Perfect for building muscle memory before interviews." },
    { category: "Practice & Hands-on", free: true,  title: "DevOps Exercises – GitHub", url: "https://github.com/bregman-arie/devops-exercises", description: "2600+ DevOps exercises and questions with answers covering Linux, Jenkins, AWS, Kubernetes, Docker, Terraform, and more." },
    { category: "Study Guides",        free: true,  badge: "Official", title: "roadmap.sh/devops", url: "https://roadmap.sh/devops", description: "Visual interactive DevOps roadmap — know exactly what topics to prepare for at each stage of your career." },
    { category: "Study Guides",        free: true,  title: "The DevOps Handbook Summary", url: "https://itrevolution.com/the-devops-handbook/", description: "Essential concepts from the DevOps Handbook — the cultural and technical foundations every interviewer expects you to know." },
    { category: "Community",           free: true,  title: "r/devops – Interview Experiences", url: "https://www.reddit.com/r/devops/search/?q=interview&sort=top", description: "Real interview experiences shared by engineers at top companies — what was asked, how they prepared, and lessons learned." },
    { category: "Community",           free: true,  title: "DevOps Discord Communities", url: "https://discord.com/invite/devops", description: "Active DevOps Discord servers where you can discuss interview prep, share resources, and get peer feedback on your answers." },
    { category: "Mock Interviews",     free: false, title: "Pramp – DevOps Mock Interviews", url: "https://www.pramp.com/", description: "Free peer-to-peer mock interviews with other engineers. Practice answering DevOps scenarios under realistic interview pressure." },
  ],

  "Kubernetes": [
    { category: "Question Banks",      free: true,  badge: "Top Pick", title: "Kubernetes Interview Questions – Edureka", url: "https://www.edureka.co/blog/interview-questions/kubernetes-interview-questions/", description: "100+ Kubernetes questions covering architecture, Pods, Services, RBAC, networking, scaling, and real-world scenarios." },
    { category: "Question Banks",      free: true,  title: "K8s Questions – InterviewBit", url: "https://www.interviewbit.com/kubernetes-interview-questions/", description: "Comprehensive Kubernetes Q&A from beginner (what is a Pod?) to advanced (explain the scheduler, write a NetworkPolicy)." },
    { category: "Question Banks",      free: true,  title: "Kubernetes Q&A – JavaTpoint", url: "https://www.javatpoint.com/kubernetes-interview-questions", description: "Structured Kubernetes questions organized by topic — architecture, components, commands, and YAML configuration examples." },
    { category: "Practice & Hands-on", free: true,  badge: "Best for CKA", title: "Killer.sh – CKA Simulator", url: "https://killer.sh/cka", description: "The hardest Kubernetes practice exam online. Two free sessions come with CKA registration. Solving these builds real confidence." },
    { category: "Practice & Hands-on", free: true,  title: "CKAD Exercises – GitHub", url: "https://github.com/dgkanatsios/CKAD-exercises", description: "Practice exercises mirroring the CKAD exam format — create Pods, Services, NetworkPolicies under time pressure." },
    { category: "Practice & Hands-on", free: true,  title: "Play with Kubernetes", url: "https://labs.play-with-k8s.com/", description: "Free browser-based Kubernetes playground — spin up a multi-node cluster in seconds and practice `kubectl` commands." },
    { category: "Study Guides",        free: true,  badge: "Official", title: "Kubernetes Documentation", url: "https://kubernetes.io/docs/home/", description: "The official docs are your best study guide — interviewers often ask about specific Kubernetes concepts that are documented here." },
    { category: "Study Guides",        free: true,  title: "Kubernetes The Hard Way", url: "https://github.com/kelseyhightower/kubernetes-the-hard-way", description: "Bootstrap Kubernetes from scratch. Understanding what each component does at this level impresses interviewers significantly." },
    { category: "Community",           free: true,  title: "r/kubernetes – Interview Prep", url: "https://www.reddit.com/r/kubernetes/search/?q=interview&sort=top", description: "Real K8s interview experiences from engineers at FAANG, startups, and cloud companies. Great for knowing what to expect." },
    { category: "Mock Interviews",     free: false, title: "Interviewing.io – SRE/DevOps", url: "https://interviewing.io/", description: "Anonymous mock technical interviews with senior engineers from Google, Amazon, and other top companies. Get real feedback." },
  ],

  "Docker": [
    { category: "Question Banks",      free: true,  badge: "Top Pick", title: "Docker Interview Questions – Edureka", url: "https://www.edureka.co/blog/interview-questions/docker-interview-questions/", description: "100+ Docker questions covering images, containers, volumes, networking, Compose, and security — with detailed answers." },
    { category: "Question Banks",      free: true,  title: "Docker Q&A – InterviewBit", url: "https://www.interviewbit.com/docker-interview-questions/", description: "Docker questions from basics (image vs container) to advanced (overlay filesystem, BuildKit, multi-stage optimization)." },
    { category: "Practice & Hands-on", free: true,  badge: "Best Lab", title: "Play with Docker", url: "https://labs.play-with-docker.com/", description: "Free 4-hour Docker sandbox in the browser. Practice building images, writing Dockerfiles, and running compose stacks." },
    { category: "Practice & Hands-on", free: true,  title: "Docker Labs – GitHub", url: "https://github.com/collabnix/dockerlabs", description: "500+ Docker tutorials and hands-on labs from beginner to advanced. Practice the exact scenarios interviewers ask about." },
    { category: "Study Guides",        free: true,  badge: "Official", title: "Docker Official Docs", url: "https://docs.docker.com/", description: "The official Docker documentation — reference for Dockerfile syntax, networking, volumes, and security best practices." },
    { category: "Community",           free: true,  title: "r/docker – Interview Experiences", url: "https://www.reddit.com/r/docker/search/?q=interview&sort=top", description: "Real Docker interview experiences shared by engineers. Discover which topics come up most in interviews at different companies." },
  ],

  "AWS": [
    { category: "Question Banks",      free: true,  badge: "Top Pick", title: "AWS Interview Questions – Edureka", url: "https://www.edureka.co/blog/interview-questions/top-aws-interview-questions-solutions/", description: "200+ AWS questions covering EC2, S3, VPC, IAM, Lambda, RDS, EKS, and architecture design — organized by service and concept." },
    { category: "Question Banks",      free: true,  title: "AWS Q&A – InterviewBit", url: "https://www.interviewbit.com/aws-interview-questions/", description: "Frequently asked AWS interview questions from cloud engineer roles at top tech companies, with scenario-based questions." },
    { category: "Question Banks",      free: true,  title: "AWS Questions – TutorialsPoint", url: "https://www.tutorialspoint.com/amazon_web_services/amazon_web_services_interview_questions.htm", description: "Comprehensive AWS Q&A covering core services, pricing models, architecture patterns, and AWS certification topics." },
    { category: "Practice & Hands-on", free: true,  badge: "Official", title: "AWS Skill Builder – Free Labs", url: "https://skillbuilder.aws/", description: "Official AWS training platform with free hands-on labs, digital courses, and exam prep content for all AWS certifications." },
    { category: "Practice & Hands-on", free: false, title: "A Cloud Guru – AWS Labs", url: "https://acloudguru.com/", description: "Hundreds of AWS hands-on labs with real AWS sandboxes — practice without being billed. Used by millions of cloud engineers." },
    { category: "Practice & Hands-on", free: true,  title: "AWS Open Guide", url: "https://github.com/open-guides/og-aws", description: "Practical AWS guide with tips, gotchas, and best practices gathered by engineers who've used AWS at scale." },
    { category: "Study Guides",        free: true,  title: "AWS Well-Architected Framework", url: "https://aws.amazon.com/architecture/well-architected/", description: "The five pillars interviewers love to ask about: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization." },
    { category: "Study Guides",        free: false, title: "Tutorials Dojo – AWS Cheat Sheets", url: "https://tutorialsdojo.com/aws-cheat-sheets/", description: "The most popular AWS exam cheat sheets — concise summaries of every AWS service that help you answer interview questions quickly." },
    { category: "Community",           free: true,  title: "r/aws – Interview Experiences", url: "https://www.reddit.com/r/aws/search/?q=interview&sort=top", description: "Real AWS interview experiences at Amazon, top consulting firms, and startups — what questions were asked and how people prepared." },
    { category: "Mock Interviews",     free: false, title: "Exams Topics – AWS Practice Tests", url: "https://www.examtopics.com/exams/amazon/", description: "Practice exam questions for AWS certifications — great for testing your knowledge and identifying gaps before interviews." },
  ],

  "Azure": [
    { category: "Question Banks",      free: true,  badge: "Top Pick", title: "Azure Interview Questions – Edureka", url: "https://www.edureka.co/blog/interview-questions/azure-interview-questions/", description: "100+ Azure questions covering Azure AD, VMs, AKS, Functions, storage, networking, and DevOps integration scenarios." },
    { category: "Question Banks",      free: true,  title: "Azure Q&A – InterviewBit", url: "https://www.interviewbit.com/azure-interview-questions/", description: "Curated Azure questions from real interviews, covering core services, architecture, security, and hybrid cloud scenarios." },
    { category: "Practice & Hands-on", free: true,  badge: "Official", title: "Microsoft Learn – Free Labs", url: "https://learn.microsoft.com/en-us/training/", description: "Official Microsoft learning platform with hundreds of free hands-on modules and sandbox environments for all Azure services." },
    { category: "Study Guides",        free: true,  title: "Azure Architecture Center", url: "https://learn.microsoft.com/en-us/azure/architecture/", description: "Reference architectures and design patterns — interviewers expect you to design solutions using Azure's architectural best practices." },
    { category: "Community",           free: true,  title: "r/AZURE – Interview Experiences", url: "https://www.reddit.com/r/AZURE/search/?q=interview&sort=top", description: "Azure interview experiences shared by engineers, including Microsoft interviews. Covers what topics come up and how to prepare." },
  ],

  "Google Cloud": [
    { category: "Question Banks",      free: true,  badge: "Top Pick", title: "GCP Interview Questions – Edureka", url: "https://www.edureka.co/blog/interview-questions/gcp-interview-questions/", description: "100+ Google Cloud questions covering GKE, BigQuery, Cloud Run, IAM, networking, and architecture design patterns." },
    { category: "Question Banks",      free: true,  title: "GCP Q&A – InterviewBit", url: "https://www.interviewbit.com/google-cloud-interview-questions/", description: "GCP questions from real interviews at Google and cloud engineering roles, with answers covering services and architecture." },
    { category: "Practice & Hands-on", free: true,  badge: "Official", title: "Google Cloud Skills Boost", url: "https://cloudskillsboost.google/", description: "Official Google Cloud training with free credits for hands-on labs. Practice on real GCP infrastructure — used by millions." },
    { category: "Study Guides",        free: true,  title: "GCP Products Cheat Sheet", url: "https://googlecloudcheatsheet.withgoogle.com/", description: "Google's official cheat sheet mapping all GCP products to their use cases — essential for interview scenarios." },
    { category: "Community",           free: true,  title: "GCP Certification Study Group", url: "https://www.reddit.com/r/googlecloud/search/?q=interview&sort=top", description: "Real GCP interview experiences and certification tips from the community. Useful for understanding what interviewers focus on." },
  ],

  "Terraform": [
    { category: "Question Banks",      free: true,  badge: "Top Pick", title: "Terraform Interview Questions – Edureka", url: "https://www.edureka.co/blog/interview-questions/terraform-interview-questions/", description: "70+ Terraform questions covering state management, modules, workspaces, providers, lifecycle blocks, and team workflows." },
    { category: "Question Banks",      free: true,  title: "Terraform Q&A – InterviewBit", url: "https://www.interviewbit.com/terraform-interview-questions/", description: "Terraform questions from real infrastructure engineering interviews, covering IaC concepts and Terraform-specific features." },
    { category: "Practice & Hands-on", free: true,  badge: "Official", title: "HashiCorp Learn – Terraform Tutorials", url: "https://developer.hashicorp.com/terraform/tutorials", description: "Official HashiCorp tutorials with hands-on exercises across AWS, Azure, GCP, and Kubernetes. Build real infrastructure while learning." },
    { category: "Practice & Hands-on", free: true,  title: "Terraform Exercises – GitHub", url: "https://github.com/bregman-arie/devops-exercises#terraform", description: "Practice Terraform exercises with real-world scenarios — writing modules, managing state, and debugging common issues." },
    { category: "Study Guides",        free: true,  title: "Terraform Best Practices – Anton Babenko", url: "https://www.terraform-best-practices.com/", description: "Industry-standard Terraform best practices guide. Interviewers at senior levels expect you to know module structure and state management patterns." },
    { category: "Community",           free: true,  title: "r/Terraform – Interview Prep", url: "https://www.reddit.com/r/Terraform/search/?q=interview&sort=top", description: "Real Terraform interview experiences. Common questions: explain state locking, how do you manage multiple environments, difference between workspace and directory structure." },
  ],

  "Linux": [
    { category: "Question Banks",      free: true,  badge: "Top Pick", title: "Linux Interview Questions – Edureka", url: "https://www.edureka.co/blog/interview-questions/linux-interview-questions/", description: "100+ Linux questions covering filesystem, processes, networking, shell scripting, permissions, and systemd — asked at SRE and DevOps roles." },
    { category: "Question Banks",      free: true,  title: "Linux Q&A – InterviewBit", url: "https://www.interviewbit.com/linux-interview-questions/", description: "Linux interview questions covering both theory and practical commands. Includes shell scripting scenarios and process management." },
    { category: "Question Banks",      free: true,  title: "Linux Commands Q&A – TechBeamers", url: "https://www.techbeamers.com/linux-interview-questions-answers/", description: "Practical Linux interview questions focused on commands, scripting, and real sysadmin scenarios." },
    { category: "Practice & Hands-on", free: true,  badge: "Best Lab", title: "OverTheWire – Bandit", url: "https://overthewire.org/wargames/bandit/", description: "The best Linux skills game — solve increasingly difficult challenges by using Linux commands. Great for solidifying hands-on skills." },
    { category: "Practice & Hands-on", free: true,  title: "Linux Upskill Challenge", url: "https://linuxupskillchallenge.org/", description: "Free 20-day hands-on challenge to build practical Linux sysadmin skills. Covers exactly the topics that come up in DevOps interviews." },
    { category: "Study Guides",        free: true,  title: "The Linux Command Line (Free Book)", url: "https://linuxcommand.org/tlcl.php", description: "Complete free book covering everything from basic commands to shell scripting and system administration." },
    { category: "Community",           free: true,  title: "r/linuxadmin – Interview Experiences", url: "https://www.reddit.com/r/linuxadmin/search/?q=interview&sort=top", description: "Linux sysadmin interview experiences and tips from real engineers. Useful for understanding what SRE/DevOps interviewers focus on." },
  ],

  "CI/CD": [
    { category: "Question Banks",      free: true,  badge: "Top Pick", title: "CI/CD Interview Questions – Edureka", url: "https://www.edureka.co/blog/interview-questions/jenkins-interview-questions/", description: "100+ CI/CD and Jenkins questions covering pipelines, agents, plugins, Blue-Green/Canary deployments, and GitOps." },
    { category: "Question Banks",      free: true,  title: "CI/CD Q&A – InterviewBit", url: "https://www.interviewbit.com/jenkins-interview-questions/", description: "Jenkins and CI/CD pipeline interview questions with practical answers covering pipeline design and DevOps workflows." },
    { category: "Practice & Hands-on", free: true,  badge: "Best Lab", title: "GitHub Actions – GitHub Skills", url: "https://skills.github.com/", description: "Official GitHub learning lab with hands-on courses for GitHub Actions. Build real pipelines and get automated feedback." },
    { category: "Practice & Hands-on", free: true,  title: "GitLab CI/CD Playground", url: "https://gitlab.com/", description: "Create a free GitLab account and build real CI/CD pipelines. GitLab's free tier gives you 400 CI minutes per month." },
    { category: "Study Guides",        free: true,  title: "GitHub Actions Documentation", url: "https://docs.github.com/en/actions", description: "Official GitHub Actions docs — interviewers often ask about workflow syntax, secrets management, and reusable workflows." },
    { category: "Community",           free: true,  title: "r/devops – CI/CD Discussions", url: "https://www.reddit.com/r/devops/search/?q=cicd+interview&sort=top", description: "Real CI/CD interview discussions and experiences. Learn what companies like Netflix, Spotify, and startups ask about pipelines." },
  ],

  "Ansible": [
    { category: "Question Banks",      free: true,  badge: "Top Pick", title: "Ansible Interview Questions – Edureka", url: "https://www.edureka.co/blog/interview-questions/ansible-interview-questions/", description: "70+ Ansible questions covering playbooks, roles, variables, vault, inventory, and real-world automation scenarios." },
    { category: "Question Banks",      free: true,  title: "Ansible Q&A – InterviewBit", url: "https://www.interviewbit.com/ansible-interview-questions/", description: "Ansible interview questions from automation engineering roles — covering both beginner and advanced Ansible concepts." },
    { category: "Practice & Hands-on", free: true,  badge: "Official", title: "Red Hat Ansible Interactive Labs", url: "https://www.redhat.com/en/interactive-labs/ansible", description: "Official Red Hat browser-based Ansible labs. Practice writing playbooks, roles, and using Ansible Vault without any local setup." },
    { category: "Study Guides",        free: true,  title: "Ansible Documentation", url: "https://docs.ansible.com/", description: "Official Ansible docs — cover playbook syntax, module references, and best practices that interviewers expect you to know." },
    { category: "Community",           free: true,  title: "r/ansible – Interview Tips", url: "https://www.reddit.com/r/ansible/search/?q=interview&sort=top", description: "Ansible-specific interview tips and experiences. Useful for understanding what automation engineers are asked at different companies." },
  ],

  "Monitoring": [
    { category: "Question Banks",      free: true,  badge: "Top Pick", title: "Prometheus & Grafana Questions – Edureka", url: "https://www.edureka.co/blog/interview-questions/grafana-interview-questions/", description: "80+ monitoring interview questions covering Prometheus metrics, PromQL, Grafana dashboards, alerting, and observability concepts." },
    { category: "Question Banks",      free: true,  title: "Monitoring Q&A – InterviewBit", url: "https://www.interviewbit.com/monitoring-interview-questions/", description: "Monitoring and observability interview questions covering tools, SLIs/SLOs, alerting strategies, and incident response." },
    { category: "Practice & Hands-on", free: true,  badge: "Best Lab", title: "Grafana Play Environment", url: "https://play.grafana.org/", description: "Official Grafana playground with pre-built dashboards. Explore Loki, Tempo, and Prometheus to understand the full observability stack." },
    { category: "Practice & Hands-on", free: true,  title: "Prometheus Tutorials – Official", url: "https://prometheus.io/docs/tutorials/", description: "Hands-on Prometheus tutorials covering metrics collection, PromQL queries, and alerting rules — practice before your interview." },
    { category: "Study Guides",        free: true,  title: "Google SRE Book – Monitoring", url: "https://sre.google/sre-book/monitoring-distributed-systems/", description: "The definitive guide to monitoring distributed systems from Google SREs. SLIs, SLOs, and alerting philosophy covered in depth." },
    { category: "Community",           free: true,  title: "Grafana Community Forums", url: "https://community.grafana.com/", description: "Active community where engineers discuss monitoring setups, dashboards, and best practices — great for learning real-world patterns." },
  ],

  "AI/ML": [
    { category: "Question Banks",      free: true,  badge: "Top Pick", title: "ML Interview Questions – Edureka", url: "https://www.edureka.co/blog/interview-questions/machine-learning-interview-questions/", description: "200+ ML interview questions covering algorithms, math concepts, model evaluation, feature engineering, and deep learning." },
    { category: "Question Banks",      free: true,  title: "ML Q&A – InterviewBit", url: "https://www.interviewbit.com/machine-learning-interview-questions/", description: "Machine learning interview questions asked at Google, Amazon, Facebook, and AI startups — from basics to advanced topics." },
    { category: "Question Banks",      free: true,  title: "Deep Learning Questions – FullStack.cafe", url: "https://www.fullstack.cafe/blog/deep-learning-interview-questions", description: "Deep learning interview Q&A covering neural networks, CNNs, RNNs, transformers, and training optimization techniques." },
    { category: "Practice & Hands-on", free: true,  badge: "Best for ML", title: "Kaggle Learn + Competitions", url: "https://www.kaggle.com/learn", description: "Free ML courses + competitions. Having Kaggle notebook experience and a competition ranking is a strong differentiator in ML interviews." },
    { category: "Practice & Hands-on", free: true,  title: "LeetCode – ML Questions", url: "https://leetcode.com/tag/machine-learning/", description: "ML and data science focused problems on LeetCode. Many ML interviews include coding rounds alongside theory questions." },
    { category: "Study Guides",        free: true,  title: "ML Cheatsheets – Stanford", url: "https://github.com/afshinea/stanford-cs-229-machine-learning", description: "Stanford CS229 ML cheatsheets — concise summaries of algorithms, math, and concepts. Perfect for quick interview revision." },
    { category: "Study Guides",        free: false, title: "Ace the Data Science Interview", url: "https://acethedatascienceinterview.com/", description: "The most recommended book for DS/ML interviews covering SQL, statistics, ML theory, and product case studies." },
    { category: "Community",           free: true,  title: "r/MachineLearning – Interview Prep", url: "https://www.reddit.com/r/MachineLearning/search/?q=interview&sort=top", description: "Real ML interview experiences at DeepMind, OpenAI, Google Brain, and other top AI labs shared by engineers." },
    { category: "Mock Interviews",     free: false, title: "Interviewing.io – ML Rounds", url: "https://interviewing.io/machine-learning-interview", description: "Anonymous mock ML interviews with engineers from top AI companies. Get structured feedback on your answers and approach." },
  ],

  "Python": [
    { category: "Question Banks",      free: true,  badge: "Top Pick", title: "Python Interview Questions – Edureka", url: "https://www.edureka.co/blog/interview-questions/python-interview-questions/", description: "150+ Python interview questions covering OOP, data structures, decorators, generators, async, memory management, and Django/Flask." },
    { category: "Question Banks",      free: true,  title: "Python Q&A – InterviewBit", url: "https://www.interviewbit.com/python-interview-questions/", description: "Python questions from real software engineering interviews — GIL, memory model, built-in data structures, and coding problems." },
    { category: "Practice & Hands-on", free: true,  badge: "Best for Coding", title: "LeetCode – Python Track", url: "https://leetcode.com/problemset/?difficulty=EASY&page=1&topicSlugs=array", description: "The #1 platform for coding interview prep. Solve problems in Python and study others' solutions to learn Pythonic patterns." },
    { category: "Practice & Hands-on", free: true,  title: "HackerRank – Python Domain", url: "https://www.hackerrank.com/domains/python", description: "Python-specific challenges organized by topic — strings, regex, functional programming, OOP, and more." },
    { category: "Practice & Hands-on", free: true,  title: "Exercism – Python Track", url: "https://exercism.org/tracks/python", description: "130+ Python exercises with human mentorship. Great for deepening Python idioms beyond what LeetCode covers." },
    { category: "Study Guides",        free: true,  title: "Python Cheatsheet – gto76", url: "https://github.com/gto76/python-cheatsheet", description: "The most comprehensive Python cheatsheet. Review before interviews to refresh syntax, built-ins, and standard library." },
    { category: "Community",           free: true,  title: "r/learnpython – Interview Tips", url: "https://www.reddit.com/r/learnpython/search/?q=interview&sort=top", description: "Python interview tips from engineers at various companies. Great for understanding what Python-specific questions come up." },
    { category: "Mock Interviews",     free: false, title: "Pramp – Python Coding Interviews", url: "https://www.pramp.com/", description: "Free peer-to-peer Python coding mock interviews. Practice under real conditions with another engineer and get immediate feedback." },
  ],

  "Go": [
    { category: "Question Banks",      free: true,  badge: "Top Pick", title: "Go Interview Questions – Edureka", url: "https://www.edureka.co/blog/interview-questions/go-interview-questions/", description: "80+ Go interview questions covering goroutines, channels, interfaces, memory model, error handling, and Go runtime internals." },
    { category: "Question Banks",      free: true,  title: "Golang Q&A – InterviewBit", url: "https://www.interviewbit.com/golang-interview-questions/", description: "Go interview questions from real backend and cloud-native engineering interviews — concurrency, interfaces, and Go idioms." },
    { category: "Practice & Hands-on", free: true,  badge: "Official", title: "A Tour of Go", url: "https://go.dev/tour/", description: "Official interactive Go tour. Complete all exercises before your interview — interviewers expect you to have done this." },
    { category: "Practice & Hands-on", free: true,  title: "Go Exercises – Exercism", url: "https://exercism.org/tracks/go", description: "100+ Go exercises with mentor feedback. Practice idiomatic Go that will impress interviewers beyond just getting code to run." },
    { category: "Study Guides",        free: true,  title: "Effective Go", url: "https://go.dev/doc/effective_go", description: "Official guide to writing clear, idiomatic Go. Interviewers at Go-heavy companies (Cloudflare, Hashicorp, Uber) expect you to know this." },
    { category: "Community",           free: true,  title: "r/golang – Interview Experiences", url: "https://www.reddit.com/r/golang/search/?q=interview&sort=top", description: "Real Go interview experiences at companies like Cloudflare, HashiCorp, Uber, and Docker. Great for knowing what to focus on." },
  ],

  "Rust": [
    { category: "Question Banks",      free: true,  badge: "Top Pick", title: "Rust Interview Questions – GitHub", url: "https://github.com/crust-of-rust/interview-questions", description: "Curated Rust interview questions covering ownership, lifetimes, traits, async, and unsafe code — from real Rust engineering roles." },
    { category: "Question Banks",      free: true,  title: "Rust Q&A – InterviewBit", url: "https://www.interviewbit.com/rust-interview-questions/", description: "Rust interview questions from systems programming and embedded engineering interviews." },
    { category: "Practice & Hands-on", free: true,  badge: "Best for Rust", title: "Rustlings", url: "https://github.com/rust-lang/rustlings", description: "Official small exercises to get used to reading and writing Rust code. Complete all exercises before any Rust interview." },
    { category: "Practice & Hands-on", free: true,  title: "Exercism – Rust Track", url: "https://exercism.org/tracks/rust", description: "100+ Rust exercises with human mentorship. Practice lifetimes, traits, and iterators in ways that impress Rust interviewers." },
    { category: "Study Guides",        free: true,  title: "The Rust Book (Free Online)", url: "https://doc.rust-lang.org/book/", description: "The official Rust programming book — read chapters on ownership, lifetimes, and concurrency before any Rust interview." },
    { category: "Community",           free: true,  title: "r/rust – Interview Experiences", url: "https://www.reddit.com/r/rust/search/?q=interview&sort=top", description: "Rust interview experiences at Mozilla, Cloudflare, AWS, and blockchain companies. What ownership questions interviewers love to ask." },
  ],

  "Java": [
    { category: "Question Banks",      free: true,  badge: "Top Pick", title: "Java Interview Questions – Edureka", url: "https://www.edureka.co/blog/interview-questions/java-interview-questions/", description: "300+ Java questions covering OOP, JVM internals, collections, concurrency, Spring Boot, and system design." },
    { category: "Question Banks",      free: true,  title: "Java Q&A – InterviewBit", url: "https://www.interviewbit.com/java-interview-questions/", description: "Java questions asked at Amazon, Google, Microsoft, and Java-heavy enterprises — from basics to advanced multithreading." },
    { category: "Practice & Hands-on", free: true,  badge: "Best for Java", title: "LeetCode – Java Solutions", url: "https://leetcode.com/problemset/", description: "Solve data structures and algorithm problems in Java. Most Java engineering interviews require LeetCode-style coding rounds." },
    { category: "Practice & Hands-on", free: true,  title: "HackerRank – Java Domain", url: "https://www.hackerrank.com/domains/java", description: "Java-specific challenges covering OOP, collections, generics, lambdas, and design patterns." },
    { category: "Study Guides",        free: false, title: "Effective Java – Joshua Bloch", url: "https://www.oreilly.com/library/view/effective-java-3rd/9780134686097/", description: "The most important Java book for senior interviews. Interviewers at top companies expect knowledge of items like 'favor composition over inheritance'." },
    { category: "Community",           free: true,  title: "r/java – Interview Prep", url: "https://www.reddit.com/r/java/search/?q=interview&sort=top", description: "Real Java interview experiences at banks, FAANG, and enterprise companies. Useful for understanding what Spring/JVM questions come up." },
  ],

  "Node.js": [
    { category: "Question Banks",      free: true,  badge: "Top Pick", title: "Node.js Interview Questions – Edureka", url: "https://www.edureka.co/blog/interview-questions/top-node-js-interview-questions-2016/", description: "100+ Node.js questions covering event loop, streams, buffers, clustering, Express, and async patterns." },
    { category: "Question Banks",      free: true,  title: "Node.js Q&A – InterviewBit", url: "https://www.interviewbit.com/node-js-interview-questions/", description: "Node.js interview questions from real backend engineering interviews — event loop internals, performance, and API design." },
    { category: "Practice & Hands-on", free: true,  title: "Node.js Best Practices – GitHub", url: "https://github.com/goldbergyoni/nodebestpractices", description: "99k ⭐ repo of Node.js best practices. Know this before any senior Node.js interview — interviewers love testing production knowledge." },
    { category: "Study Guides",        free: true,  title: "Node.js Documentation", url: "https://nodejs.org/en/docs", description: "Official Node.js docs — especially the event loop, streams, and child_process sections that come up in advanced interviews." },
    { category: "Community",           free: true,  title: "r/node – Interview Experiences", url: "https://www.reddit.com/r/node/search/?q=interview&sort=top", description: "Real Node.js interview experiences at fintech, SaaS companies, and startups — what topics come up and how to prepare." },
  ],

  "System Design": [
    { category: "Question Banks",      free: true,  badge: "Top Pick", title: "System Design Questions – GreatFrontEnd", url: "https://www.greatfrontend.com/system-design", description: "Real system design interview questions from FAANG — URL shortener, WhatsApp, Instagram, YouTube, and more with structured solutions." },
    { category: "Question Banks",      free: true,  title: "System Design Q&A – InterviewBit", url: "https://www.interviewbit.com/system-design-interview-questions/", description: "Common system design questions with detailed architectural approaches — database choices, API design, scaling strategies." },
    { category: "Practice & Hands-on", free: true,  badge: "Best Resource", title: "System Design Primer – GitHub", url: "https://github.com/donnemartin/system-design-primer", description: "260k ⭐ — the most comprehensive system design study guide. Covers every core concept with diagrams and real-world examples." },
    { category: "Practice & Hands-on", free: true,  title: "ByteByteGo System Design 101", url: "https://github.com/ByteByteGoHq/system-design-101", description: "Visual system design explanations with diagrams. Complex concepts explained in easy-to-understand visuals — great for interview prep." },
    { category: "Study Guides",        free: false, title: "Designing Data-Intensive Applications", url: "https://dataintensive.net/", description: "The bible of distributed systems. Senior engineers are expected to have read this — databases, replication, consistency, and CAP theorem." },
    { category: "Study Guides",        free: false, title: "Grokking the System Design Interview", url: "https://www.designgurus.io/course/grokking-the-system-design-interview", description: "The most recommended paid course for system design interviews. Step-by-step walkthroughs of 20+ real interview problems." },
    { category: "Community",           free: true,  title: "r/ExperiencedDevs – System Design", url: "https://www.reddit.com/r/ExperiencedDevs/search/?q=system+design+interview&sort=top", description: "Senior engineers sharing system design interview experiences at FAANG and top tech companies — what to expect and how to structure answers." },
    { category: "Mock Interviews",     free: false, title: "Interviewing.io – System Design", url: "https://interviewing.io/", description: "Anonymous mock system design interviews with senior engineers from Google, Amazon, Uber, and other top companies. Real interview simulation." },
  ],

  "Cybersecurity": [
    { category: "Question Banks",      free: true,  badge: "Top Pick", title: "Cybersecurity Interview Questions – Edureka", url: "https://www.edureka.co/blog/interview-questions/cybersecurity-interview-questions/", description: "150+ security questions covering network security, cryptography, OWASP Top 10, penetration testing, and incident response." },
    { category: "Question Banks",      free: true,  title: "Security Q&A – InterviewBit", url: "https://www.interviewbit.com/cyber-security-interview-questions/", description: "Cybersecurity interview questions from SOC analyst, pentester, and security engineer roles at various companies." },
    { category: "Practice & Hands-on", free: true,  badge: "Best Platform", title: "TryHackMe – Free Rooms", url: "https://tryhackme.com/", description: "Browser-based cybersecurity labs covering pentesting, blue team skills, and CTF challenges. Having a TryHackMe profile impresses interviewers." },
    { category: "Practice & Hands-on", free: true,  title: "Hack The Box Academy", url: "https://academy.hackthebox.com/", description: "Professional cybersecurity training with real machine hacking challenges. Free tier available. HTB certifications are recognized by employers." },
    { category: "Practice & Hands-on", free: true,  title: "PicoCTF", url: "https://picoctf.org/", description: "Beginner-friendly CTF challenges from Carnegie Mellon University. Great starting point for building hands-on security skills." },
    { category: "Study Guides",        free: true,  title: "OWASP Testing Guide", url: "https://owasp.org/www-project-web-security-testing-guide/", description: "Comprehensive web application security testing methodology. Essential reading for application security engineer interviews." },
    { category: "Community",           free: true,  title: "r/netsec – Interview Prep", url: "https://www.reddit.com/r/netsec/search/?q=interview&sort=top", description: "Security interview experiences at tech companies, banks, and government agencies. What questions come up in blue/red team interviews." },
    { category: "Mock Interviews",     free: false, title: "TCM Security – Practical Courses", url: "https://academy.tcm-sec.com/", description: "Affordable practical cybersecurity courses by industry professionals. Practical Ethical Hacking course is one of the most recommended." },
  ],

  "DevSecOps": [
    { category: "Question Banks",      free: true,  badge: "Top Pick", title: "DevSecOps Interview Questions – Edureka", url: "https://www.edureka.co/blog/interview-questions/devsecops-interview-questions/", description: "80+ DevSecOps questions covering SAST, DAST, SCA, container security, secrets management, and compliance automation." },
    { category: "Question Banks",      free: true,  title: "DevSecOps Q&A – InterviewBit", url: "https://www.interviewbit.com/devsecops-interview-questions/", description: "DevSecOps interview questions from security engineering and platform security roles at tech companies." },
    { category: "Practice & Hands-on", free: true,  badge: "Best for SAST", title: "OWASP WebGoat", url: "https://owasp.org/www-project-webgoat/", description: "Deliberately insecure web app for learning security concepts. Practice finding and fixing vulnerabilities — great for DevSecOps interviews." },
    { category: "Study Guides",        free: true,  title: "OWASP DevSecOps Guideline", url: "https://owasp.org/www-project-devsecops-guideline/", description: "Official OWASP guide for integrating security into DevOps pipelines. Covers the exact topics asked in DevSecOps interviews." },
    { category: "Community",           free: true,  title: "r/devsecops – Interview Experiences", url: "https://www.reddit.com/r/devsecops/", description: "DevSecOps community discussions on interview prep, certifications, and what skills companies look for in security-focused DevOps roles." },
  ],

  "React": [
    { category: "Question Banks",      free: true,  badge: "Top Pick", title: "React Interview Questions – Edureka", url: "https://www.edureka.co/blog/interview-questions/react-interview-questions/", description: "150+ React questions covering hooks, state management, performance optimization, rendering patterns, and testing." },
    { category: "Question Banks",      free: true,  title: "React Q&A – GreatFrontEnd", url: "https://www.greatfrontend.com/questions/react", description: "React interview questions from frontend engineering interviews — React fundamentals, hooks, and common coding problems." },
    { category: "Practice & Hands-on", free: true,  badge: "Best Platform", title: "GreatFrontEnd – Practice Questions", url: "https://www.greatfrontend.com/", description: "The best frontend interview prep platform. Coding questions, UI component challenges, and system design for frontend engineers." },
    { category: "Practice & Hands-on", free: true,  title: "Frontend Mentor", url: "https://www.frontendmentor.io/", description: "Real-world React projects with professional designs. Build a portfolio while practicing the skills interviewers test." },
    { category: "Study Guides",        free: true,  title: "React Official Docs – react.dev", url: "https://react.dev/", description: "The new official React documentation with interactive examples. Interviewers expect you to know hooks, Suspense, and the new patterns." },
    { category: "Community",           free: true,  title: "r/reactjs – Interview Experiences", url: "https://www.reddit.com/r/reactjs/search/?q=interview&sort=top", description: "Real React interview experiences at startups and FAANG frontend teams. What hooks questions and system design questions come up." },
  ],

  "TypeScript": [
    { category: "Question Banks",      free: true,  badge: "Top Pick", title: "TypeScript Interview Questions – Edureka", url: "https://www.edureka.co/blog/interview-questions/typescript-interview-questions/", description: "100+ TypeScript questions covering type system, generics, utility types, decorators, and TypeScript with React/Node." },
    { category: "Question Banks",      free: true,  title: "TypeScript Q&A – InterviewBit", url: "https://www.interviewbit.com/typescript-interview-questions/", description: "TypeScript interview questions from real frontend and full-stack engineering interviews." },
    { category: "Practice & Hands-on", free: true,  badge: "Best for TS", title: "Type Challenges – GitHub", url: "https://github.com/type-challenges/type-challenges", description: "Collection of TypeScript type system challenges from easy to extreme. Completing these builds deep TypeScript expertise interviewers respect." },
    { category: "Practice & Hands-on", free: true,  title: "TypeScript Playground", url: "https://www.typescriptlang.org/play", description: "Official TypeScript playground — practice advanced types, debug type errors, and share snippets in interviews." },
    { category: "Study Guides",        free: true,  title: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/intro.html", description: "The official TypeScript handbook — cover generics, utility types, conditional types, and declaration merging before interviews." },
    { category: "Community",           free: true,  title: "r/typescript – Interview Tips", url: "https://www.reddit.com/r/typescript/search/?q=interview&sort=top", description: "TypeScript interview tips and experiences. What advanced type questions come up and how to structure answers." },
  ],
};

// ── Category config ────────────────────────────────────────────────────────────
const CATEGORIES: { key: Category; icon: string; color: string; bg: string }[] = [
  { key: "Question Banks",      icon: "📋", color: "text-blue-600 dark:text-blue-400",   bg: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800" },
  { key: "Practice & Hands-on", icon: "💻", color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-950/40 border-green-200 dark:border-green-800" },
  { key: "Study Guides",        icon: "📖", color: "text-violet-600 dark:text-violet-400",bg: "bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-800" },
  { key: "Community",           icon: "💬", color: "text-orange-600 dark:text-orange-400",bg: "bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800" },
  { key: "Mock Interviews",     icon: "🎤", color: "text-pink-600 dark:text-pink-400",   bg: "bg-pink-50 dark:bg-pink-950/40 border-pink-200 dark:border-pink-800" },
];

// ── Sub-nav ────────────────────────────────────────────────────────────────────
function SubNav() {
  return (
    <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-hide">
          {[
            { href: "/roadmaps",                label: "Roadmaps",      icon: "🗺️" },
            { href: "/roadmaps/learning",       label: "Learning",      icon: "📚" },
            { href: "/roadmaps/certifications", label: "Certifications",icon: "🏆" },
            { href: "/roadmaps/salaries",       label: "Salaries",      icon: "💰" },
            { href: "/roadmaps/interviews",     label: "Interview Prep",icon: "🎯" },
          ].map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={`inline-flex items-center gap-1.5 px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                href === "/roadmaps/interviews"
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

// ── Page ───────────────────────────────────────────────────────────────────────
export default async function InterviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic: rawTopic } = await searchParams;
  const activeTopic: Topic = (TOPICS.includes(rawTopic as Topic) ? rawTopic : "DevOps") as Topic;
  const sites = PREP_SITES[activeTopic] ?? [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <SiteHeader activePage="roadmaps" />

      <SubNav />
      <TickerBar />

      <main className="container mx-auto px-4 py-10 max-w-7xl">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-blue-200 dark:border-blue-800">
            <MessageSquare className="w-3.5 h-3.5" />
            Interview Prep · {TOPICS.length} Stacks · Curated Resources
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
            🎯 {activeTopic}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Interview Prep
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base">
            The best websites, platforms, and communities to prepare for {activeTopic} interviews — question banks, hands-on labs, study guides, and mock interviews.
          </p>
        </section>

        {/* ── Topic selector ────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-10 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          {TOPICS.map((t) => (
            <Link
              key={t}
              href={`/roadmaps/interviews?topic=${encodeURIComponent(t)}`}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                activeTopic === t
                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600"
              }`}
            >
              {t}
            </Link>
          ))}
        </div>

        {/* ── Resource sections by category ────────────────────────── */}
        <div className="space-y-10">
          {CATEGORIES.map(({ key, icon, color, bg }) => {
            const items = sites.filter((s) => s.category === key);
            if (items.length === 0) return null;
            return (
              <section key={key}>
                {/* Section header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm font-bold ${bg} ${color}`}>
                    <span>{icon}</span>{key}
                  </div>
                  <span className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                  <span className="text-xs text-slate-400">{items.length} resource{items.length > 1 ? "s" : ""}</span>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((site) => (
                    <a
                      key={site.url}
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all flex flex-col gap-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          {site.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">
                              {site.badge}
                            </span>
                          )}
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            site.free
                              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                              : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                          }`}>
                            {site.free ? "Free" : "Paid"}
                          </span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors shrink-0" />
                      </div>

                      <div>
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1 leading-snug">
                          {site.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                          {site.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* ── Quick links to other sections ────────────────────────── */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: "/roadmaps/learning",        icon: "📚", title: "Learning Resources", desc: "Docs, videos, courses, cheat sheets" },
            { href: "/roadmaps/certifications",  icon: "🏆", title: "Certifications",     desc: "AWS, K8s, GCP certs with fees" },
            { href: "/roadmaps/salaries",        icon: "💰", title: "Salary Insights",    desc: "Role-based salary data by region" },
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
            <Link href="/roadmaps/interviews" className="hover:text-blue-600 transition-colors">Interview Prep</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
