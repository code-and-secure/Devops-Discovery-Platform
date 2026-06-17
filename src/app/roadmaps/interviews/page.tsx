import Link from "next/link";
import { Compass, Command as GitHubIcon, MessageSquare, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { TickerBar } from "@/components/ticker-bar";

export const dynamic = "force-dynamic";

// ── Types ──────────────────────────────────────────────────────────────────────
type Difficulty = "Basic" | "Intermediate" | "Advanced";

interface QA {
  q: string;
  a: string;
  difficulty: Difficulty;
}

// ── Topics ─────────────────────────────────────────────────────────────────────
const TOPICS = [
  "DevOps", "Kubernetes", "Docker", "AWS", "Azure", "Google Cloud",
  "Terraform", "Linux", "CI/CD", "Ansible", "Monitoring",
  "AI/ML", "Python", "Go", "Rust", "Java", "Node.js",
  "System Design", "Cybersecurity", "DevSecOps",
] as const;

type Topic = typeof TOPICS[number];

// ── Interview Q&A data ─────────────────────────────────────────────────────────
const INTERVIEW_DATA: Record<Topic, QA[]> = {

  // ────────────────────────────────────────────────────────── DevOps ──────────
  "DevOps": [
    { difficulty: "Basic", q: "What is DevOps and why is it important?", a: "DevOps is a cultural and engineering practice that unifies software development (Dev) and IT operations (Ops). It aims to shorten the development lifecycle and deliver features, fixes, and updates frequently in close alignment with business objectives. It improves collaboration, reduces silos, enables faster feedback, and increases deployment frequency while maintaining stability." },
    { difficulty: "Basic", q: "What is the difference between Continuous Integration, Continuous Delivery, and Continuous Deployment?", a: "CI (Continuous Integration) automatically builds and tests code on every commit. CD (Continuous Delivery) ensures the code is always in a deployable state — a human approves the release. Continuous Deployment goes one step further: every passing build is automatically deployed to production without manual approval." },
    { difficulty: "Basic", q: "What is infrastructure as code (IaC)?", a: "IaC is the practice of managing and provisioning infrastructure through machine-readable configuration files instead of manual processes. Tools like Terraform, Pulumi, and AWS CloudFormation let you version, review, and apply infrastructure changes the same way you treat application code." },
    { difficulty: "Basic", q: "What is a microservices architecture?", a: "Microservices is an architectural pattern where an application is broken into small, independently deployable services that communicate over APIs. Each service owns its own data store and can be scaled, deployed, and updated independently. Benefits include fault isolation, independent scaling, and technology flexibility." },
    { difficulty: "Basic", q: "What is a container and how does it differ from a virtual machine?", a: "A container is a lightweight, portable unit that packages an application with its runtime dependencies. Containers share the host OS kernel, making them much lighter than VMs. A VM includes a full guest OS on top of a hypervisor. Containers start in milliseconds, VMs take minutes. Docker is the most popular container runtime." },
    { difficulty: "Basic", q: "What is a CI/CD pipeline?", a: "A CI/CD pipeline is an automated sequence of steps — source, build, test, deploy — that carries code from a developer's commit to production. It typically includes unit tests, integration tests, security scans, artifact builds, and deployment stages. Tools include GitHub Actions, Jenkins, GitLab CI, and CircleCI." },
    { difficulty: "Basic", q: "What is version control and why is it critical in DevOps?", a: "Version control (e.g., Git) tracks changes to code over time, allowing teams to collaborate, revert mistakes, and branch for features. In DevOps it is the single source of truth — everything from application code to infrastructure configs and pipeline definitions lives in Git (GitOps)." },
    { difficulty: "Basic", q: "What are the key DevOps metrics?", a: "The four DORA metrics are: Deployment Frequency (how often you deploy), Lead Time for Changes (time from commit to production), Mean Time to Recovery (MTTR — time to restore after failure), and Change Failure Rate (% of deployments causing incidents). These measure both speed and stability." },
    { difficulty: "Basic", q: "What is Blue-Green deployment?", a: "Blue-Green is a release strategy with two identical production environments. 'Blue' runs the current version, 'Green' has the new version. Traffic is switched from Blue to Green all at once. If something goes wrong, you switch back instantly. It eliminates downtime and risk but doubles infrastructure cost." },
    { difficulty: "Basic", q: "What is a canary release?", a: "A canary release gradually rolls out a new version to a small subset of users (e.g., 5%) before releasing to everyone. If metrics (error rate, latency) look good, the rollout continues. If not, traffic shifts back. It reduces blast radius compared to an all-at-once release." },
    { difficulty: "Intermediate", q: "What is GitOps and how does it differ from traditional DevOps?", a: "GitOps uses Git as the single source of truth for declarative infrastructure and application state. An operator (like ArgoCD or Flux) continuously reconciles the cluster state to match what's in Git. Differences from traditional DevOps: changes happen via pull requests (not CLI commands), the cluster pulls config instead of a pipeline pushing it, and there's a full audit trail of every change." },
    { difficulty: "Intermediate", q: "Explain the concept of immutable infrastructure.", a: "In immutable infrastructure, servers are never modified after deployment. Instead of patching a running server, you build a new image, test it, and replace the old server. This eliminates configuration drift, makes rollbacks trivial (just deploy the previous image), and improves consistency. AMIs, Docker images, and Packer artifacts are common implementations." },
    { difficulty: "Intermediate", q: "What is service mesh and when would you use it?", a: "A service mesh (Istio, Linkerd) is an infrastructure layer for handling service-to-service communication. It provides traffic management (retries, circuit breaking, canary), mTLS encryption between services, and observability (tracing, metrics) without changing application code. Use it when you have many microservices and need consistent security and observability across them." },
    { difficulty: "Intermediate", q: "What is the 12-Factor App methodology?", a: "12-Factor is a methodology for building cloud-native apps covering: Codebase (one repo), Dependencies (explicitly declared), Config (stored in environment), Backing services (treat as attached resources), Build/Release/Run (strict separation), Processes (stateless), Port binding, Concurrency, Disposability (fast startup/shutdown), Dev/Prod parity, Logs (treat as streams), Admin processes. It makes apps portable and scalable." },
    { difficulty: "Intermediate", q: "How do you handle secrets in a DevOps pipeline?", a: "Never hardcode secrets in code or pipelines. Options: use a secrets manager (HashiCorp Vault, AWS Secrets Manager, Azure Key Vault) and inject at runtime, use CI/CD environment variable vaults (GitHub Encrypted Secrets, GitLab CI Variables), or use Kubernetes secrets (backed by Vault for encryption at rest). Rotate secrets regularly and audit access." },
    { difficulty: "Intermediate", q: "What is observability and how does it differ from monitoring?", a: "Monitoring tracks known failure modes through predefined metrics and alerts. Observability is the ability to understand the internal state of a system from its external outputs — logs, metrics, and traces (the three pillars). Observability handles unknown unknowns; you can ask arbitrary questions about system behavior without deploying new instrumentation." },
    { difficulty: "Intermediate", q: "What is a rolling deployment and when would you choose it over Blue-Green?", a: "A rolling deployment gradually replaces instances of the old version with the new version, one by one (or in batches). Unlike Blue-Green, it doesn't require double infrastructure. Choose rolling when cost is a concern and you can tolerate briefly running mixed versions. Choose Blue-Green when you need instant rollback and can afford duplicate infrastructure." },
    { difficulty: "Intermediate", q: "Explain shift-left in DevOps.", a: "Shift-left means moving quality, security, and testing earlier in the development lifecycle — to the 'left' of the pipeline. Instead of testing and security reviews after code is written, they happen during development (IDE linting, pre-commit hooks, PR-level SAST scans). This reduces the cost of fixing bugs and vulnerabilities, which grows exponentially the later they're found." },
    { difficulty: "Intermediate", q: "What is feature flagging and how does it support DevOps practices?", a: "Feature flags (feature toggles) allow code to be deployed to production but kept inactive until explicitly enabled. This decouples deployment from release. You can deploy continuously, test in production with a subset of users, and roll back instantly by toggling a flag — no redeployment needed. Tools include LaunchDarkly, Unleash, and Flagsmith." },
    { difficulty: "Intermediate", q: "What is mean time to recovery (MTTR) and how do you improve it?", a: "MTTR is the average time to restore service after a failure. To improve it: invest in observability (faster detection), runbooks and automation (faster diagnosis), chaos engineering (rehearse failure recovery), feature flags (instant rollback), and post-mortems (eliminate recurring causes). Lower MTTR is a better predictor of organizational performance than lower change failure rate." },
    { difficulty: "Advanced", q: "How would you design a zero-downtime deployment strategy for a stateful application?", a: "Stateful apps (databases, caches) are harder than stateless. Strategy: 1) Use connection draining to finish in-flight requests before taking an instance out of rotation. 2) Run schema migrations as backward-compatible steps (add columns before removing old ones — expand/contract pattern). 3) Use read replicas to redirect reads during maintenance. 4) Use PodDisruptionBudgets in Kubernetes to prevent all replicas going down at once. 5) Test failover in staging regularly." },
    { difficulty: "Advanced", q: "Explain the CAP theorem and its implications for distributed systems.", a: "CAP theorem states a distributed system can only guarantee two of: Consistency (every read gets the latest write), Availability (every request gets a response), and Partition tolerance (system works despite network partitions). Since partitions are inevitable in distributed systems, the real choice is CP (consistent but may reject requests during partition — e.g., HBase) vs AP (available but may serve stale data — e.g., Cassandra, DynamoDB in eventual mode)." },
    { difficulty: "Advanced", q: "How do you implement chaos engineering in production?", a: "Chaos engineering deliberately injects failures to find weaknesses before they cause incidents. Steps: 1) Define steady state (normal metrics). 2) Hypothesize what happens when X fails. 3) Run controlled experiments (kill a pod, throttle CPU, inject network latency via tools like Chaos Monkey, Litmus, Gremlin). 4) Observe if steady state is maintained. 5) Fix weaknesses found. Start in staging, move to production during low-traffic windows, and expand blast radius gradually." },
    { difficulty: "Advanced", q: "What is the difference between SRE and DevOps?", a: "DevOps is a philosophy and cultural practice. SRE (Site Reliability Engineering, created at Google) is a specific implementation of DevOps using software engineering to solve operations problems. SRE introduces concrete practices: error budgets (if reliability > SLO, spend budget on features; if < SLO, stop releases and fix), SLIs/SLOs/SLAs, toil reduction through automation, and blameless post-mortems. SRE is 'what' DevOps looks like with engineers doing the work." },
    { difficulty: "Advanced", q: "How would you build a multi-region active-active deployment?", a: "Active-active means traffic is served from multiple regions simultaneously. Requirements: 1) Global load balancer (AWS Route53 latency routing, Cloudflare) to route users to nearest region. 2) Data replication — use a globally distributed database (CockroachDB, DynamoDB Global Tables, Spanner) or eventual consistency with conflict resolution. 3) Stateless services so any region can handle any request. 4) Circuit breakers to shed traffic from a failing region. 5) Regular failover drills. Main challenge is data consistency across regions." },
  ],

  // ──────────────────────────────────────────────────────── Kubernetes ─────────
  "Kubernetes": [
    { difficulty: "Basic", q: "What is Kubernetes and what problem does it solve?", a: "Kubernetes (K8s) is an open-source container orchestration system. It solves the problem of running containers at scale: scheduling containers onto nodes, restarting failed containers, scaling replicas up/down, load balancing traffic, rolling out updates, and managing configuration and secrets. Without K8s, you'd manage all this manually across potentially thousands of containers." },
    { difficulty: "Basic", q: "What is a Pod in Kubernetes?", a: "A Pod is the smallest deployable unit in Kubernetes. It encapsulates one or more containers that share the same network namespace (same IP address and port space), storage volumes, and lifecycle. Containers in a Pod communicate via localhost. Most Pods run a single container; multi-container Pods use sidecar patterns (e.g., a logging agent alongside the main app)." },
    { difficulty: "Basic", q: "What is the difference between a Deployment and a StatefulSet?", a: "A Deployment manages stateless applications — pods are interchangeable, get random names, and can be replaced without concern for order. A StatefulSet manages stateful apps (databases, Kafka) — pods get stable, ordered names (pod-0, pod-1), have persistent volume claims that follow them, and are created/deleted in order. Use StatefulSets for anything that needs stable identity or persistent storage." },
    { difficulty: "Basic", q: "What is a Service in Kubernetes and what are the types?", a: "A Service provides a stable IP and DNS name for a set of Pods (selected by labels). Types: ClusterIP (default — internal only), NodePort (exposes on a static port on each node), LoadBalancer (provisions a cloud load balancer), and ExternalName (maps to an external DNS name). Services enable discovery and load balancing between microservices." },
    { difficulty: "Basic", q: "What is a ConfigMap and when would you use it?", a: "A ConfigMap stores non-sensitive configuration data as key-value pairs. Pods consume it as environment variables, command-line args, or mounted files. Use it to decouple configuration from container images — e.g., store database hostnames, feature flags, or app settings. For sensitive data (passwords, tokens), use Secrets instead." },
    { difficulty: "Basic", q: "What is a Namespace and why use it?", a: "Namespaces are virtual clusters within a physical Kubernetes cluster. They scope resources (Pods, Services, etc.) and enable multi-tenancy. Common patterns: separate namespaces per team, per environment (dev/staging/prod), or per application. Resource quotas and RBAC policies can be applied at the namespace level to enforce isolation." },
    { difficulty: "Basic", q: "What is a liveness probe vs a readiness probe?", a: "Liveness probe: checks if the container is still alive. If it fails, Kubernetes restarts the container. Use for detecting deadlocks or corrupted internal state. Readiness probe: checks if the container is ready to serve traffic. If it fails, Kubernetes removes the Pod from the Service's endpoints but does not restart it. Use during startup or when the app is temporarily overloaded." },
    { difficulty: "Basic", q: "What is Helm and what problem does it solve?", a: "Helm is the package manager for Kubernetes. It bundles Kubernetes manifests into reusable, versioned packages called Charts. Helm solves the problem of templating — instead of duplicating 10 YAML files per environment, you write one Chart with variables. It also handles release management: install, upgrade, rollback, and uninstall with a single command." },
    { difficulty: "Basic", q: "What is a DaemonSet?", a: "A DaemonSet ensures that one Pod runs on every node (or a subset matching a selector). It's used for node-level concerns: log collectors (Fluentd, Filebeat), monitoring agents (Prometheus Node Exporter), networking plugins (Calico, Weave), and storage daemons. When a new node joins the cluster, the DaemonSet automatically schedules the Pod on it." },
    { difficulty: "Basic", q: "What are resource requests and limits?", a: "Requests tell the scheduler how much CPU/memory a container needs — it uses this to find a suitable node. Limits cap how much the container can consume. If a container exceeds its memory limit, it's OOM-killed and restarted. If it exceeds CPU limit, it's throttled but not killed. Always set both to enable proper scheduling and prevent noisy neighbors from starving other Pods." },
    { difficulty: "Intermediate", q: "Explain how Kubernetes networking works — how do Pods communicate?", a: "Kubernetes requires every Pod to have a unique IP and all Pods to communicate without NAT. This is implemented by a CNI plugin (Calico, Flannel, Cilium). Pod-to-Pod: directly via IP if on the same node; CNI encapsulates/routes traffic between nodes. Pod-to-Service: kube-proxy (or eBPF with Cilium) programs iptables/ipvs rules to translate the Service ClusterIP to a Pod IP. DNS (CoreDNS) resolves service names to ClusterIPs." },
    { difficulty: "Intermediate", q: "What is RBAC in Kubernetes?", a: "Role-Based Access Control controls who can do what to which resources. Key objects: Role (namespace-scoped permissions), ClusterRole (cluster-wide permissions), RoleBinding (binds a Role to users/serviceaccounts in a namespace), ClusterRoleBinding (cluster-wide binding). Best practice: grant least privilege, use ServiceAccounts for Pod identity, audit bindings regularly. Example: give a CI/CD service account only the right to update Deployments in a specific namespace." },
    { difficulty: "Intermediate", q: "What is a Horizontal Pod Autoscaler (HPA)?", a: "HPA automatically scales the number of Pod replicas based on observed metrics (CPU, memory, or custom metrics via the Metrics API). It queries the metrics-server every 15 seconds, computes desired replicas = ceil(current replicas × current metric / target metric), and adjusts. For custom metrics (requests-per-second, queue depth), use KEDA which can scale to zero. Always set min and max replica bounds." },
    { difficulty: "Intermediate", q: "What is a PersistentVolume (PV) and PersistentVolumeClaim (PVC)?", a: "A PV is a piece of storage provisioned by an admin or dynamically by a StorageClass (e.g., an EBS volume). A PVC is a request for storage by a user — specifies size and access mode (ReadWriteOnce, ReadOnlyMany, ReadWriteMany). Kubernetes binds a PVC to a matching PV. StatefulSets use volumeClaimTemplates to create a PVC per Pod, giving each replica its own persistent storage." },
    { difficulty: "Intermediate", q: "What is a NetworkPolicy and how does it work?", a: "NetworkPolicy is a Kubernetes object that controls ingress and egress traffic to/from Pods using label selectors. By default all Pod-to-Pod traffic is allowed. A NetworkPolicy restricts this: e.g., allow only Pods with label 'tier: backend' to receive traffic from Pods with 'tier: frontend'. Requires a CNI that supports NetworkPolicy (Calico, Cilium — Flannel does not). Implement default-deny policies and explicitly allow only what's needed." },
    { difficulty: "Intermediate", q: "How do rolling updates work in Kubernetes?", a: "A Deployment's rolling update strategy replaces old Pods with new ones incrementally. `maxUnavailable` controls how many Pods can be down during the update (default 25%). `maxSurge` controls how many extra Pods can exist during the update (default 25%). Kubernetes creates new pods, waits for them to be ready, then terminates old ones. If readiness probes fail on new pods, the rollout stalls and you can run `kubectl rollout undo`." },
    { difficulty: "Intermediate", q: "What is etcd and what happens if it fails?", a: "etcd is the distributed key-value store that is Kubernetes' brain — it stores all cluster state (Pods, Nodes, Secrets, etc.). The API server reads/writes exclusively from etcd. If etcd becomes unavailable: no new Pods can be scheduled, no config changes can be applied, but already-running Pods continue running (kubelet is autonomous). Backup etcd regularly with `etcdctl snapshot save` and store in durable storage." },
    { difficulty: "Intermediate", q: "What is a sidecar container pattern?", a: "A sidecar is a secondary container in the same Pod that augments the main container without modifying it. Common sidecars: Envoy proxy (service mesh), log shipper (Filebeat), secret rotation agent, token refresher. The containers share the same network and can share volumes. This promotes separation of concerns — your app doesn't need to implement logging, mTLS, or service discovery itself." },
    { difficulty: "Intermediate", q: "How do you do zero-downtime deployments in Kubernetes?", a: "Key steps: 1) Set readiness probes so Kubernetes only routes traffic to ready pods. 2) Use `terminationGracePeriodSeconds` to give pods time to finish in-flight requests before shutdown. 3) Handle SIGTERM in your app to stop accepting new requests and drain connections. 4) Set `maxUnavailable: 0` in rolling update strategy. 5) Use PodDisruptionBudgets to prevent too many pods going down during node maintenance." },
    { difficulty: "Advanced", q: "How does the Kubernetes scheduler work?", a: "The scheduler watches for unscheduled Pods and assigns them to Nodes in two phases: Filtering (eliminate nodes that don't meet requirements — resource requests, node selectors, affinity/anti-affinity, taints/tolerations) and Scoring (rank remaining nodes by factors like resource balance, data locality, spreading). The highest-scoring node is selected. You can influence scheduling with nodeAffinity, podAffinity, topologySpreadConstraints, and taints." },
    { difficulty: "Advanced", q: "What is a Kubernetes Operator and when would you build one?", a: "An Operator is a custom controller that encodes operational knowledge about a specific application. It watches Custom Resources (CRDs) and reconciles the actual state to the desired state. Build an Operator when you have a stateful application with complex operational logic that standard Kubernetes objects can't handle — e.g., automated backup/restore, failover, cluster expansion for databases. The Operator SDK and Kubebuilder simplify development." },
    { difficulty: "Advanced", q: "What is the difference between requests and limits, and what happens when you only set limits?", a: "If you only set limits (no requests), Kubernetes sets requests equal to limits. This means the scheduler won't place the pod unless a node has exactly that much free — you get poor bin-packing. The QoS class becomes Guaranteed (best for latency) but worst for resource utilization. Best practice: set requests to typical usage (p50), limits to burst capacity. This gives Burstable QoS — good balance of efficiency and protection." },
    { difficulty: "Advanced", q: "How would you troubleshoot a Pod stuck in CrashLoopBackOff?", a: "1) `kubectl describe pod <name>` — check Events for OOMKilled, image pull errors, liveness probe failures. 2) `kubectl logs <pod> --previous` — get logs from the crashed container. 3) Check exit code: 137 = OOMKilled (increase memory limit), 1 = app error (check logs), 2 = misuse of shell builtin. 4) Temporarily override command with `sleep infinity` to debug inside container. 5) Check if dependencies (ConfigMaps, Secrets, Services) are available. 6) Check init containers." },
    { difficulty: "Advanced", q: "Explain Kubernetes RBAC best practices for a multi-team cluster.", a: "1) One namespace per team/application. 2) Create ServiceAccounts per app — never use the default SA. 3) Use Roles (not ClusterRoles) where possible to minimize blast radius. 4) Grant CI/CD service accounts only the minimum needed (e.g., update deployments, not delete). 5) Use Open Policy Agent/Gatekeeper to enforce policies (no latest tag, resource limits required). 6) Audit bindings with `kubectl get rolebindings --all-namespaces`. 7) Use impersonation (`--as`) for testing permissions." },
    { difficulty: "Advanced", q: "What is Cilium and how does it improve on traditional CNI/kube-proxy?", a: "Cilium is a CNI plugin that uses eBPF (extended Berkeley Packet Filter) to implement networking and security. Instead of iptables rules (which scale poorly at thousands of services), Cilium programs the kernel directly. Benefits: 10x better performance for Services, L7-aware NetworkPolicies (filter by HTTP path/method, not just IP/port), built-in Hubble observability (flow logs between pods), transparent encryption, and multi-cluster networking. Replaces kube-proxy entirely in kube-proxy-replacement mode." },
  ],

  // ─────────────────────────────────────────────────────────── Docker ──────────
  "Docker": [
    { difficulty: "Basic", q: "What is Docker and what problem does it solve?", a: "Docker is a platform for building, shipping, and running containerized applications. It solves the 'works on my machine' problem by packaging the app and all its dependencies into a portable container image. The same image runs identically on a developer's laptop, CI server, and production regardless of the underlying OS." },
    { difficulty: "Basic", q: "What is the difference between a Docker image and a container?", a: "An image is a read-only, layered filesystem snapshot — a blueprint. A container is a running instance of an image with a writable layer on top. Multiple containers can share the same image. Images are built with `docker build`, pushed to registries, and pulled on other machines. Containers are ephemeral; stop them and the writable layer is lost (use volumes for persistence)." },
    { difficulty: "Basic", q: "What is a Dockerfile and what are the key instructions?", a: "A Dockerfile is a text file with instructions to build an image. Key instructions: FROM (base image), RUN (execute command during build), COPY/ADD (copy files into image), WORKDIR (set working directory), EXPOSE (document port), ENV (set environment variable), CMD (default command when container starts), ENTRYPOINT (fixed executable), and ARG (build-time variable)." },
    { difficulty: "Basic", q: "What is Docker Compose and when would you use it?", a: "Docker Compose defines and runs multi-container applications using a YAML file. You declare services, networks, and volumes in `docker-compose.yml` and start everything with `docker compose up`. Use it for local development environments with multiple services (app + database + cache). It's not designed for production orchestration at scale — use Kubernetes for that." },
    { difficulty: "Basic", q: "What are Docker volumes and why are they needed?", a: "Containers are ephemeral — when a container stops, its writable layer is lost. Volumes provide persistent storage that outlives containers. Types: named volumes (managed by Docker, stored in `/var/lib/docker/volumes/`), bind mounts (mount a host directory into the container), and tmpfs mounts (in-memory, not persisted). Use volumes for databases, uploaded files, and any data that must survive container restarts." },
    { difficulty: "Basic", q: "What is Docker networking? Explain the bridge network.", a: "Docker creates virtual networks. The bridge network (default for standalone containers) creates an internal network; containers on the same bridge can communicate by IP. For name-based discovery, use user-defined bridge networks. Other network types: host (share host's network stack), none (no networking), overlay (multi-host networking in Swarm/K8s). Docker Compose creates a user-defined bridge automatically for each project." },
    { difficulty: "Intermediate", q: "What is a multi-stage build and why is it important?", a: "Multi-stage builds use multiple FROM statements in one Dockerfile. Early stages compile code (using large build tools). The final stage copies only the compiled artifact into a minimal base image, discarding the build tools. Result: dramatically smaller production images. Example: compile a Go binary in a `golang:1.22` stage, copy the binary to `scratch` or `alpine` — final image is ~5MB instead of ~800MB." },
    { difficulty: "Intermediate", q: "How do Docker image layers work and why does layer caching matter?", a: "Each Dockerfile instruction creates a read-only layer. Docker caches layers — if a layer's instruction and its context haven't changed, Docker reuses the cached layer. This makes builds fast. Best practice: put instructions that change rarely (installing OS packages) early, and instructions that change often (COPY your source code) late. Never cache-bust by placing `COPY . .` before `RUN npm install`." },
    { difficulty: "Intermediate", q: "What is the difference between CMD and ENTRYPOINT?", a: "ENTRYPOINT defines the executable that always runs — it's the 'what' (e.g., `ENTRYPOINT [\"nginx\"]`). CMD provides default arguments to ENTRYPOINT, or a default command if no ENTRYPOINT is set. ENTRYPOINT is not overridden by `docker run` arguments; CMD is. Use ENTRYPOINT for containers that always run the same program, CMD for defaults that users might override. Common pattern: `ENTRYPOINT [\"python\"]` + `CMD [\"app.py\"]`." },
    { difficulty: "Intermediate", q: "How do you reduce Docker image size?", a: "1) Use minimal base images (alpine, distroless, scratch). 2) Multi-stage builds to discard build tools. 3) Combine RUN instructions into one to reduce layers. 4) Clear package manager caches (`apt-get clean && rm -rf /var/lib/apt/lists/*`). 5) Use `.dockerignore` to exclude node_modules, .git, test files. 6) Don't install unnecessary packages (`--no-install-recommends`). 7) Use specific tags, not `latest`." },
    { difficulty: "Intermediate", q: "What are Docker security best practices?", a: "1) Run as non-root user (`USER appuser` in Dockerfile). 2) Use read-only filesystem (`--read-only` flag). 3) Drop all Linux capabilities and add only what's needed (`--cap-drop all --cap-add NET_BIND_SERVICE`). 4) Don't store secrets in images or env vars — use secrets managers. 5) Scan images with Trivy or Snyk. 6) Use distroless or scratch base images (minimal attack surface). 7) Never use privileged mode in production." },
    { difficulty: "Advanced", q: "Explain how Docker's overlay filesystem works.", a: "Docker uses overlay2 storage driver by default. Each image layer is a directory on the host. When a container starts, the overlay filesystem merges all image layers (read-only) into a unified view, with a writable container layer on top (copy-on-write). When a container writes to a file that exists in a lower layer, the file is copied up to the writable layer first, then modified. This is why writes are slightly slower than native, and why large files modified frequently should be on volumes." },
    { difficulty: "Advanced", q: "How do you implement health checks in Docker?", a: "Use the HEALTHCHECK instruction in Dockerfile: `HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD curl -f http://localhost/health || exit 1`. Docker runs this command periodically. Statuses: starting, healthy, unhealthy. Docker Swarm and some orchestrators restart unhealthy containers. In Kubernetes, use liveness/readiness probes instead of Docker healthchecks as K8s manages this at the Pod level." },
    { difficulty: "Advanced", q: "What is BuildKit and how does it improve Docker builds?", a: "BuildKit is the next-generation build engine (default since Docker 23). Improvements: parallel execution of independent build stages, better caching (cache mounts for package managers persist between builds), secret mounts (secrets available during build but not baked into the image), SSH forwarding (access private repos during build), and improved output with structured progress. Enable with `DOCKER_BUILDKIT=1` on older versions." },
    { difficulty: "Advanced", q: "How would you debug a container that starts and immediately exits?", a: "1) `docker ps -a` to see the container and its exit code. 2) `docker logs <container>` to see output. 3) `docker inspect <container>` to check the actual command, env, and exit code. 4) Run interactively overriding the command: `docker run -it --entrypoint sh <image>` to get a shell. 5) Check exit code: 0 = normal exit (CMD finished), 1 = app error, 126 = permission denied, 127 = command not found, 137 = OOM killed." },
  ],

  // ──────────────────────────────────────────────────────────────── AWS ────────
  "AWS": [
    { difficulty: "Basic", q: "What is the difference between EC2, ECS, and EKS?", a: "EC2 is virtual machines — you manage the OS, runtime, and scaling. ECS (Elastic Container Service) is AWS's container orchestrator — you run Docker containers without managing Kubernetes. EKS (Elastic Kubernetes Service) is managed Kubernetes — AWS handles the control plane, you manage worker nodes or use Fargate. Choose EC2 for full control, ECS for simpler containerized apps on AWS, EKS for Kubernetes workloads." },
    { difficulty: "Basic", q: "What is the difference between S3 and EBS?", a: "S3 (Simple Storage Service) is object storage — files, images, backups, static websites. Accessed via HTTP API. Unlimited capacity, 11 nines durability, no attachment to an instance. EBS (Elastic Block Store) is block storage — behaves like a hard drive attached to one EC2 instance (except io2 multi-attach). Used for OS volumes and databases. EBS must be in the same AZ as the instance. For shared file storage, use EFS." },
    { difficulty: "Basic", q: "What is IAM and what are its core components?", a: "IAM (Identity and Access Management) controls who can do what in AWS. Core components: Users (human identities with long-term credentials), Groups (collection of users sharing policies), Roles (temporary credentials assumed by services, EC2 instances, or Lambda — no long-term keys), Policies (JSON documents defining Allow/Deny on Actions and Resources), and Conditions (restrict by IP, MFA, time). Key principle: least privilege — grant only what's needed." },
    { difficulty: "Basic", q: "What is a VPC and what problem does it solve?", a: "A VPC (Virtual Private Cloud) is a logically isolated network in AWS where you deploy resources. It solves the problem of network isolation and security. Key components: subnets (public for internet-facing resources, private for databases), Route Tables (control traffic routing), Internet Gateway (enables internet access for public subnets), NAT Gateway (lets private subnets reach the internet without being reachable from it), and Security Groups (stateful firewalls per resource)." },
    { difficulty: "Basic", q: "What is the difference between a Security Group and a NACL?", a: "Security Groups (SG) are stateful firewalls attached to resources (EC2, RDS). Stateful means if you allow inbound port 80, return traffic is automatically allowed. Rules are allow-only; no explicit deny. NACLs (Network Access Control Lists) are stateless firewalls attached to subnets. You must allow both inbound and outbound for each connection. NACLs support explicit deny and evaluate rules in order. Use SGs as the primary control; use NACLs for subnet-level blocking (e.g., blocking a specific IP range)." },
    { difficulty: "Basic", q: "What is Lambda and when would you use it?", a: "Lambda is AWS's serverless compute service — you upload code (function), and AWS runs it in response to triggers (API Gateway, S3 events, SQS messages, CloudWatch Events). No servers to manage; you pay per invocation and duration (ms). Use Lambda for event-driven processing, lightweight APIs, scheduled tasks, and unpredictable traffic. Avoid for long-running processes (15-min limit), high-frequency sustained loads (EC2/containers are cheaper), or tasks needing custom runtimes/large dependencies." },
    { difficulty: "Basic", q: "What is the difference between vertical and horizontal scaling?", a: "Vertical scaling (scale up) means adding more resources to the same instance — bigger CPU, more RAM. It has limits and usually requires downtime. Horizontal scaling (scale out) means adding more instances. AWS Auto Scaling Groups do this automatically based on CloudWatch metrics. Horizontal scaling is the cloud-native approach — design stateless apps so any instance can handle any request." },
    { difficulty: "Intermediate", q: "What is CloudFormation and how does it compare to Terraform?", a: "CloudFormation is AWS's native IaC service — you define stacks in JSON/YAML and AWS provisions resources. It integrates natively with all AWS services and supports drift detection and change sets. Terraform is cloud-agnostic, works with 500+ providers, has a larger ecosystem, and better state management. CloudFormation: better for AWS-only shops who want deep AWS integration. Terraform: better for multi-cloud or teams that value the broader open-source ecosystem." },
    { difficulty: "Intermediate", q: "Explain S3 storage classes and lifecycle policies.", a: "S3 classes: Standard (frequent access), Intelligent-Tiering (auto-moves between tiers), Standard-IA (infrequent access, retrieval fee), One Zone-IA (cheaper, one AZ), Glacier Instant Retrieval (archives, ms access), Glacier Flexible Retrieval (minutes to hours), Glacier Deep Archive (cheapest, 12h retrieval). Lifecycle policies automatically transition objects between classes or delete them after N days. Example: move logs to Glacier after 30 days, delete after 365." },
    { difficulty: "Intermediate", q: "What is RDS Multi-AZ and how does failover work?", a: "Multi-AZ creates a synchronous standby replica in a different AZ. Writes are committed to both before acknowledged (synchronous replication = zero data loss). If the primary fails, AWS automatically updates the DNS endpoint to point to the standby (typically 1-2 min failover). Your app reconnects to the same endpoint. Multi-AZ is for HA, not read scaling — use Read Replicas for that. Aurora Multi-AZ is different: it uses shared storage across 3 AZs with sub-second failover." },
    { difficulty: "Intermediate", q: "What is an Application Load Balancer vs Network Load Balancer?", a: "ALB (Layer 7) understands HTTP/HTTPS. It can route based on path (/api → API service, / → frontend), host header, query string, or HTTP method. Supports WebSockets, HTTP/2, gRPC. Use for web apps and microservices. NLB (Layer 4) operates at TCP/UDP level. Ultra-high performance (millions of requests/sec), preserves client IP, supports static IPs. Use for non-HTTP traffic, gaming, IoT, or when you need extreme low latency." },
    { difficulty: "Intermediate", q: "How does AWS handle DDoS protection?", a: "AWS Shield Standard: automatically protects all AWS customers against common Layer 3/4 attacks (SYN floods, UDP reflection) at no cost. Shield Advanced: paid service adding protection against larger attacks, cost protection (waives surge charges), 24/7 DDoS Response Team, Layer 7 (application) attack visibility, and integration with WAF. Also use CloudFront to absorb attacks at edge, WAF to block malicious patterns, and Auto Scaling to absorb volumetric traffic." },
    { difficulty: "Advanced", q: "How would you design a highly available three-tier application on AWS?", a: "Web tier: ALB across 2+ AZs, EC2 Auto Scaling Group in public subnets (or CloudFront + S3 for static). App tier: EC2 ASG or ECS in private subnets, scaled by CPU/SQS queue depth. Data tier: RDS Multi-AZ or Aurora, ElastiCache (Redis) for session/cache, S3 for objects. Cross-cutting: Route53 for DNS/health routing, WAF on ALB/CloudFront, CloudWatch for monitoring, secrets in AWS Secrets Manager, IAM roles (no hardcoded creds). Deploy across 3 AZs minimum. Use ACM for TLS." },
    { difficulty: "Advanced", q: "What is the AWS Shared Responsibility Model?", a: "AWS is responsible for security 'of' the cloud — physical infrastructure, hardware, host OS for managed services, network, and hypervisor. The customer is responsible for security 'in' the cloud — OS patching on EC2, application security, data encryption, network configuration (Security Groups, NACLs), IAM configuration, and everything inside the VPC. For managed services (RDS, Lambda), AWS takes more responsibility (OS, patches) — your responsibility shrinks." },
    { difficulty: "Advanced", q: "How would you reduce AWS costs on a large deployment?", a: "1) Right-size instances (use Compute Optimizer recommendations). 2) Use Reserved Instances or Savings Plans for predictable workloads (up to 72% savings). 3) Spot Instances for fault-tolerant batch/CI jobs. 4) Auto Scaling to scale down during off-hours. 5) S3 lifecycle policies to archive/delete old data. 6) Use CloudFront to reduce origin data transfer costs. 7) Delete unattached EBS volumes and unused EIPs. 8) Use AWS Cost Explorer and set billing alarms. 9) Transfer data within regions when possible (cross-region is expensive)." },
  ],

  // ─────────────────────────────────────────────────────────────── Azure ───────
  "Azure": [
    { difficulty: "Basic", q: "What is Azure Resource Manager (ARM)?", a: "ARM is the deployment and management layer for Azure. All resource operations (create, update, delete) go through ARM, which handles authentication, authorization, and routing to the appropriate resource provider. ARM Templates (JSON/Bicep) let you declare resources as code. ARM groups resources into Resource Groups — logical containers with shared lifecycle, RBAC, and tagging." },
    { difficulty: "Basic", q: "What is the difference between Azure AD and on-premises AD?", a: "Azure AD (now Entra ID) is a cloud identity provider managing users, apps, and SSO across cloud services. It uses REST-based protocols (OAuth 2.0, OIDC, SAML) vs. on-prem AD's Kerberos/LDAP. Azure AD doesn't have Group Policy or traditional AD OU structure. For hybrid environments, Azure AD Connect syncs on-prem AD identities to the cloud. Azure AD DS provides domain join and group policies for cloud VMs." },
    { difficulty: "Basic", q: "What is Azure Blob Storage and what are access tiers?", a: "Blob Storage is Azure's object storage for unstructured data. Access tiers: Hot (frequent access, highest storage cost, lowest access cost), Cool (infrequent access, lower storage cost, higher access cost, minimum 30-day retention), Cold (rarely accessed, minimum 90-day), and Archive (offline, cheapest storage, hours to rehydrate, 180-day minimum). Use Lifecycle Management policies to auto-tier blobs based on age." },
    { difficulty: "Intermediate", q: "What is Azure Kubernetes Service (AKS) and how is it managed?", a: "AKS is Azure's managed Kubernetes service. Azure manages the control plane (API server, etcd, scheduler) at no cost — you pay only for worker nodes. AKS integrates with Azure AD for RBAC, Azure CNI or kubenet for networking, Azure Monitor and Container Insights for observability, and Azure Container Registry (ACR) for images. Node pools let you mix VM SKUs. Use Cluster Autoscaler for node-level scaling and HPA for pod-level scaling." },
    { difficulty: "Intermediate", q: "What is the difference between Azure Functions and Azure Logic Apps?", a: "Azure Functions is code-first serverless compute — you write functions in C#, Python, JS, etc. for custom logic. Logic Apps is a no-code/low-code workflow automation service with 400+ connectors for integrating services (Office 365, Salesforce, SAP). Use Functions for complex business logic and custom integrations; use Logic Apps for orchestrating SaaS services without writing code." },
    { difficulty: "Advanced", q: "How would you implement zero-trust network architecture in Azure?", a: "Zero-trust assumes no implicit trust. Implementation: 1) Azure AD Conditional Access — require MFA, compliant device, and specific locations for access. 2) Private Endpoints for PaaS services — remove public internet access. 3) Azure Firewall Premium + NSGs for micro-segmentation. 4) Azure Defender for workload protection. 5) Just-in-Time VM access to eliminate persistent open ports. 6) Azure Policy to enforce security baselines. 7) Service Endpoints or Private Link for service-to-service communication within the network." },
  ],

  // ──────────────────────────────────────────────────────── Google Cloud ───────
  "Google Cloud": [
    { difficulty: "Basic", q: "What is the GCP resource hierarchy?", a: "GCP organizes resources in a hierarchy: Organization (top level, maps to a company's domain) → Folders (group projects by department or environment) → Projects (core unit, contains all resources, has its own billing and APIs) → Resources (VMs, buckets, databases). IAM policies set at a higher level are inherited downward. Organization-level policies take precedence over project-level." },
    { difficulty: "Basic", q: "What is BigQuery and when would you use it?", a: "BigQuery is GCP's fully managed, serverless data warehouse. It's columnar, distributed, and can query terabytes in seconds using SQL. Use it for analytics on large datasets — business intelligence, ad hoc analysis, ML feature engineering. It separates compute and storage, charging per TB queried (or flat-rate). Integrates with Looker Studio for visualization, Vertex AI for ML, and Dataflow for ETL." },
    { difficulty: "Intermediate", q: "What is Google Kubernetes Engine (GKE) Autopilot?", a: "GKE Autopilot is a fully managed Kubernetes mode where Google manages nodes, node pools, and the control plane. You only define Pods — GCP provisions the right nodes automatically. You pay per Pod resource request rather than per node. Benefits: no node management overhead, automatic security hardening, built-in best practices enforced. Trade-off: less control over node configuration (no privileged containers, no custom node images)." },
    { difficulty: "Advanced", q: "What is Anthos and what problem does it solve?", a: "Anthos is Google's hybrid and multi-cloud platform. It extends GKE to on-premises (via Anthos clusters on bare metal or VMware) and other clouds (AWS, Azure). Core components: Config Management (GitOps with ACM), Service Mesh (Managed Istio via Anthos Service Mesh), Policy Controller (OPA Gatekeeper), and Connect (communicates between on-prem and GCP). It solves the problem of managing workloads consistently across environments with unified policy, observability, and GitOps." },
  ],

  // ─────────────────────────────────────────────────────────── Terraform ───────
  "Terraform": [
    { difficulty: "Basic", q: "What is Terraform state and why is it important?", a: "Terraform state is a JSON file (`terraform.tfstate`) that maps your configuration to real infrastructure. It tracks resource IDs, metadata, and dependencies. Without state, Terraform can't know what already exists. In teams, store state remotely (S3 + DynamoDB for locking, or Terraform Cloud) so everyone works from the same state. Never edit state manually — use `terraform state` subcommands." },
    { difficulty: "Basic", q: "What is the difference between terraform plan and terraform apply?", a: "`terraform plan` shows what changes Terraform WILL make (add, change, destroy) without making them. It's a dry run — always run it before apply and review the output. `terraform apply` executes those changes after confirmation. In CI/CD, save the plan to a file (`terraform plan -out=tfplan`) and apply that exact plan (`terraform apply tfplan`) to prevent race conditions between plan and apply." },
    { difficulty: "Basic", q: "What is a Terraform module?", a: "A module is a reusable, encapsulated set of Terraform resources in a directory. The root module is your main configuration. Child modules are called with a `module` block and a `source` argument (local path, Git URL, or Terraform Registry). Modules promote DRY infrastructure — write a VPC module once, call it 3 times for dev/staging/prod with different variables. Published modules are on registry.terraform.io." },
    { difficulty: "Intermediate", q: "What is terraform import and when do you use it?", a: "`terraform import <resource_type.name> <id>` imports an existing real resource into Terraform state without recreating it. Use it when you have infrastructure created manually or by another tool that you want to bring under Terraform management. After importing, you must manually write the corresponding configuration block — Terraform won't generate it (though `terraform plan -generate-config-out` does in 1.5+). Always verify with `terraform plan` after import to ensure config matches state." },
    { difficulty: "Intermediate", q: "How do you manage multiple environments in Terraform?", a: "Options: 1) Workspaces — `terraform workspace new staging` creates isolated state per workspace with the same config. Good for similar envs, but config separation is harder. 2) Directory structure — separate `envs/dev`, `envs/prod` directories each calling shared modules with different variables. Recommended for significant env differences. 3) Terragrunt — wrapper that adds DRY config, remote state management, and dependency ordering across modules." },
    { difficulty: "Advanced", q: "How does Terraform handle dependency ordering?", a: "Terraform builds a dependency graph from resource references. If resource B references `aws_vpc.main.id`, Terraform knows to create the VPC before B. Explicit dependencies can be declared with `depends_on` for cases where the dependency isn't visible in the config (e.g., a resource that needs an IAM policy attached before it's usable). `terraform graph` outputs the DOT format graph for visualization. Parallel creation happens for independent resources." },
    { difficulty: "Advanced", q: "What is the terraform lifecycle block and what are its options?", a: "`lifecycle` is a meta-argument for fine-grained resource control. `create_before_destroy = true` creates the replacement before destroying the old resource (avoids downtime). `prevent_destroy = true` blocks `terraform destroy` on this resource (good for production databases). `ignore_changes = [tags]` tells Terraform to ignore drift in specific attributes (e.g., tags managed by another system). `replace_triggered_by` forces replacement when another resource changes." },
  ],

  // ──────────────────────────────────────────────────────────────── Linux ──────
  "Linux": [
    { difficulty: "Basic", q: "What is the difference between a process and a thread?", a: "A process is an independent program instance with its own memory space, file descriptors, and PID. A thread is a unit of execution within a process — threads share the process's memory and resources. Creating a thread is cheaper than forking a process. In Linux, both are created with `clone()` — the difference is which resources are shared. `ps` shows processes; `ps -T` shows threads." },
    { difficulty: "Basic", q: "What are inodes in Linux?", a: "An inode is a data structure storing file metadata: permissions, owner, size, timestamps, and pointers to data blocks — but NOT the filename. The filename lives in the directory entry, which maps a name to an inode number. Each filesystem has a fixed number of inodes at creation. `df -i` shows inode usage. You can run out of inodes (no new files possible) even with free disk space, e.g., when millions of tiny files exist." },
    { difficulty: "Basic", q: "What is the difference between hard links and soft links?", a: "A hard link is another directory entry pointing to the same inode (same data). Deleting one link doesn't affect the file — it only disappears when all hard links are removed. Can't cross filesystems. A soft link (symlink) is a file whose content is a path to another file. It breaks if the target is deleted (dangling symlink). Soft links can cross filesystems and point to directories." },
    { difficulty: "Basic", q: "What are the file permission bits in Linux?", a: "Each file has three permission sets: owner, group, others — each with read (r=4), write (w=2), execute (x=1). `chmod 755` = owner rwx (7), group rx (5), others rx (5). Special bits: setuid (execute as file owner, 4xxx), setgid (execute as file group, 2xxx), sticky bit (only owner can delete in a directory, 1xxx — used on /tmp). `ls -l` shows permissions as `-rwxr-xr-x`." },
    { difficulty: "Intermediate", q: "How does systemd work and how do you manage services?", a: "systemd is the init system (PID 1) and service manager on most modern Linux distros. It manages units (services, sockets, timers, mounts). Key commands: `systemctl start/stop/restart/reload <service>`, `systemctl enable/disable` (enable auto-start at boot), `systemctl status <service>` (shows status + last logs), `journalctl -u <service>` (full logs), `systemctl list-units --state=failed`. Unit files live in `/etc/systemd/system/`." },
    { difficulty: "Intermediate", q: "What is the difference between load average and CPU utilization?", a: "CPU utilization is the percentage of time the CPU is doing work. Load average is the average number of processes in a runnable OR uninterruptible sleep state over 1, 5, 15 minutes. Load average includes both CPU-waiting processes and I/O-waiting processes. A high load average with low CPU utilization means you have an I/O bottleneck. On a 4-core system, a load of 4.0 means 100% utilization — above that, processes are queuing." },
    { difficulty: "Advanced", q: "Explain the Linux boot process.", a: "1) BIOS/UEFI: POST, finds bootable device. 2) Bootloader (GRUB): loaded from MBR/EFI partition, loads kernel and initramfs into RAM. 3) Kernel: initializes hardware, mounts initramfs as temporary root. 4) Initramfs: contains drivers to mount the real root filesystem (e.g., LVM, encrypted disk drivers). 5) Kernel mounts real root filesystem (from initramfs instructions). 6) systemd (PID 1) starts, reads targets, starts services in dependency order. 7) Reaches the target (graphical.target or multi-user.target)." },
    { difficulty: "Advanced", q: "How do you troubleshoot high memory usage on a Linux server?", a: "`free -h` for overview (check actual free vs buffer/cache — cache is reclaimable). `top`/`htop` sorted by %MEM. `ps aux --sort=-%mem | head -20` for top consumers. `cat /proc/meminfo` for details. If there's OOM activity: `dmesg | grep -i 'out of memory'` or `journalctl -k | grep -i oom`. `vmstat 1` to watch swap usage over time. `smem -r -k` for accurate per-process memory including shared. If swap is in use, identify which processes are swapping with `/proc/<pid>/status` (VmSwap)." },
  ],

  // ──────────────────────────────────────────────────────────────── CI/CD ──────
  "CI/CD": [
    { difficulty: "Basic", q: "What is the difference between a pipeline trigger and a schedule?", a: "A trigger fires the pipeline in response to an event — a git push, a pull request, a tag, or a webhook from another system. A schedule runs the pipeline on a cron expression regardless of code changes (e.g., nightly builds or security scans). Triggers are reactive; schedules are time-based. Most pipelines use both — trigger on PR for fast feedback, schedule nightly for longer test suites." },
    { difficulty: "Basic", q: "What is an artifact in the context of CI/CD?", a: "An artifact is the output of a build — a compiled binary, Docker image, npm package, test report, or Helm chart. CI pipelines produce artifacts that CD pipelines deploy. Artifacts are stored in artifact registries (AWS ECR, Docker Hub, JFrog Artifactory, GitHub Packages). Versioning artifacts (by Git SHA or semver) enables reproducible deployments and rollbacks — you always know exactly what code is in production." },
    { difficulty: "Intermediate", q: "How do you handle database migrations in a CI/CD pipeline?", a: "Run migrations before deploying the new app version (in a separate pipeline step or init container). Migrations must be backward-compatible with the OLD code (expand/contract pattern): first add new columns/tables without removing old ones, deploy new app, then remove old columns in a subsequent migration. Never run migrations that break the currently-running app version. Use migration tools (Flyway, Liquibase, Alembic) for version tracking and rollback scripts." },
    { difficulty: "Intermediate", q: "What is a deployment gate and why is it important?", a: "A deployment gate is an automated check that must pass before a pipeline stage proceeds. Examples: smoke tests passing, error rate below 1%, approval from a team lead, security scan results clean, performance benchmark met. Gates prevent bad code from reaching critical environments. In tools like Azure DevOps, gates can query external services (Datadog, ServiceNow) to determine if it's safe to proceed." },
    { difficulty: "Advanced", q: "How do you implement GitOps with ArgoCD?", a: "ArgoCD continuously syncs Kubernetes cluster state to a Git repository. Setup: 1) Define desired state in Git (Helm charts, Kustomize, raw YAML). 2) Install ArgoCD in the cluster. 3) Create an Application CR pointing to the repo and target cluster/namespace. 4) ArgoCD detects drift between desired (Git) and actual (cluster) state and can auto-sync or alert. 5) For promotions, open a PR to update the image tag in the env's directory. 6) Use App of Apps pattern for multiple applications." },
    { difficulty: "Advanced", q: "How do you secure secrets in GitHub Actions?", a: "1) Store secrets in GitHub Encrypted Secrets (Settings → Secrets) — they're masked in logs. 2) Never echo secrets or save to files in the runner. 3) Use OIDC (OpenID Connect) with cloud providers: GitHub can get a short-lived AWS/Azure/GCP token without storing cloud credentials as secrets (`aws-actions/configure-aws-credentials` with `role-to-assume`). 4) For Vault: use `vault-action` to fetch secrets at runtime. 5) Restrict secret access to specific environments with environment protection rules requiring approvals." },
  ],

  // ──────────────────────────────────────────────────────────────── Ansible ────
  "Ansible": [
    { difficulty: "Basic", q: "What is the difference between a playbook and a role?", a: "A playbook is a YAML file defining plays — which hosts to target and which tasks to run. A role is a standardized, reusable structure (tasks/, handlers/, templates/, vars/, defaults/) for organizing related automation. Roles are called from playbooks. Use roles for reusable components (install nginx, configure PostgreSQL); use playbooks to compose roles into a deployment workflow." },
    { difficulty: "Basic", q: "What is idempotency in Ansible?", a: "Idempotency means running a playbook multiple times produces the same result as running it once. Ansible modules are designed to check current state before making changes — if a package is already installed, the `apt` module does nothing. True idempotency requires writing tasks that check before acting. This makes Ansible safe to re-run for configuration enforcement and drift remediation." },
    { difficulty: "Intermediate", q: "What is Ansible Vault and how do you use it?", a: "Ansible Vault encrypts sensitive data (passwords, keys) in YAML files using AES-256. Encrypt a file: `ansible-vault encrypt vars/secrets.yml`. Encrypt a single value inline: `ansible-vault encrypt_string 'mypassword' --name 'db_pass'`. When running a playbook: `ansible-playbook site.yml --ask-vault-pass` or `--vault-password-file ~/.vault_pass`. Store the vault password in CI/CD secrets, not in the repo." },
    { difficulty: "Advanced", q: "How does Ansible handle parallelism and how do you tune it?", a: "Ansible runs tasks on multiple hosts in parallel. The `forks` setting (default 5 in `ansible.cfg`) controls how many hosts are managed simultaneously. For large inventories, increase forks: `[defaults] forks = 50`. The `serial` keyword in a play limits how many hosts run at once (for rolling deployments: `serial: 10%`). The `async` and `poll` keywords let you kick off long tasks without waiting, then poll for completion. Use `strategy: free` to let hosts run independently rather than in lockstep." },
  ],

  // ─────────────────────────────────────────────────────────── Monitoring ──────
  "Monitoring": [
    { difficulty: "Basic", q: "What are the three pillars of observability?", a: "Logs: time-stamped records of discrete events (error messages, audit trails). Metrics: numeric measurements over time (CPU %, request rate, latency percentiles). Traces: records of a request's journey through distributed services, with timing for each service hop. Together they answer: what happened (logs), how much/how fast (metrics), and where time was spent (traces). Tools: ELK/Loki for logs, Prometheus for metrics, Jaeger/Tempo for traces." },
    { difficulty: "Basic", q: "What is a Prometheus metric type? Explain each.", a: "Counter: monotonically increasing value, resets on restart (e.g., total HTTP requests). Gauge: value that can go up or down (e.g., current memory usage, concurrent connections). Histogram: samples observations into buckets, calculates sum and count — used for latency/request size distributions. Summary: similar to histogram but calculates quantiles on the client side. Histograms are preferred in Prometheus because they support aggregation across instances; summaries don't." },
    { difficulty: "Intermediate", q: "What is an SLI, SLO, and SLA?", a: "SLI (Service Level Indicator): a quantitative measure of service behavior — e.g., the proportion of HTTP requests returning 2xx in < 300ms. SLO (Service Level Objective): the target value for an SLI — e.g., 99.9% of requests succeed in < 300ms over 30 days. SLA (Service Level Agreement): a contractual commitment to an SLO with consequences for breach (refunds, penalties). Internal teams use SLOs; SLAs are external contracts with customers." },
    { difficulty: "Advanced", q: "How do you implement distributed tracing with OpenTelemetry?", a: "OpenTelemetry (OTel) is the open standard for instrumentation. Steps: 1) Add OTel SDK to each service (auto-instrumentation available for common frameworks). 2) Configure an OTel Collector (agent or gateway mode) to receive, process, and export telemetry. 3) Export to a backend (Jaeger, Zipkin, Grafana Tempo). 4) Propagate trace context via HTTP headers (W3C Trace Context standard). 5) View traces in the UI showing spans across services. Use sampling (e.g., 10% of requests) to control volume and cost." },
  ],

  // ──────────────────────────────────────────────────────────────── AI/ML ──────
  "AI/ML": [
    { difficulty: "Basic", q: "What is the difference between supervised, unsupervised, and reinforcement learning?", a: "Supervised learning: model learns from labeled data (input → known output). Examples: classification, regression. Unsupervised learning: model finds patterns in unlabeled data. Examples: clustering (K-means), dimensionality reduction (PCA), anomaly detection. Reinforcement learning: an agent learns by interacting with an environment and receiving rewards/penalties. Examples: game playing (AlphaGo), robotics, recommendation systems." },
    { difficulty: "Basic", q: "What is overfitting and how do you prevent it?", a: "Overfitting is when a model learns the training data too well, including noise, and performs poorly on new data (high variance). Prevention: more training data, regularization (L1/L2, dropout), cross-validation, early stopping, simpler model architecture, data augmentation, and ensemble methods. The train/validation/test split reveals overfitting — if train accuracy >> validation accuracy, the model is overfitting." },
    { difficulty: "Intermediate", q: "What is the bias-variance tradeoff?", a: "Bias: error from incorrect assumptions in the model — underfitting (model too simple, misses patterns). Variance: error from sensitivity to training data fluctuations — overfitting (model too complex, memorizes noise). Reducing bias typically increases variance and vice versa. Ideal: find the sweet spot with enough complexity to learn real patterns but not noise. Regularization, ensemble methods (bagging reduces variance, boosting reduces bias) help manage this tradeoff." },
    { difficulty: "Intermediate", q: "Explain the transformer architecture.", a: "The transformer (Attention Is All You Need, 2017) uses self-attention to relate all positions in a sequence to each other — unlike RNNs which process sequentially. Key components: Multi-head Self-Attention (learns which parts of input to focus on), Feed-Forward Networks, Positional Encoding (injects position info since attention is permutation-invariant), Layer Normalization, and Residual connections. Transformers scale well and underpin all modern LLMs (GPT, BERT, LLaMA)." },
    { difficulty: "Advanced", q: "What is RAG (Retrieval-Augmented Generation) and when would you use it?", a: "RAG combines a retrieval system with a generative LLM. Instead of relying solely on training data (which may be outdated), RAG retrieves relevant documents from a knowledge base at inference time and passes them as context to the LLM. Steps: 1) Embed documents into a vector store (Pinecone, Weaviate, pgvector). 2) At query time, embed the question and retrieve top-k similar documents. 3) Pass documents + question to LLM to generate a grounded answer. Use RAG when you need up-to-date information, domain-specific knowledge, or cite sources." },
  ],

  // ──────────────────────────────────────────────────────────────── Python ─────
  "Python": [
    { difficulty: "Basic", q: "What is the difference between a list and a tuple?", a: "Lists are mutable (you can add, remove, and change elements), defined with `[]`. Tuples are immutable (can't change after creation), defined with `()`. Tuples are slightly faster for iteration and use less memory. Use tuples for data that shouldn't change (coordinates, RGB values, dictionary keys). Use lists for collections you'll modify. Immutability makes tuples hashable — you can use them as dict keys." },
    { difficulty: "Basic", q: "What is a Python decorator and how does it work?", a: "A decorator is a function that wraps another function to extend its behavior without modifying it. It's syntactic sugar for `func = decorator(func)`. Example: `@timer` wraps a function to measure execution time. Decorators are used for logging, authentication, caching (`@lru_cache`), and retry logic. They work because functions are first-class objects in Python — you can pass them as arguments and return them." },
    { difficulty: "Basic", q: "What is the GIL and how does it affect multithreading?", a: "The Global Interpreter Lock (GIL) is a mutex that allows only one thread to execute Python bytecode at a time, even on multi-core systems. For CPU-bound tasks, threads don't truly run in parallel — use `multiprocessing` instead (separate processes, each with their own GIL). For I/O-bound tasks, the GIL is released during I/O waits, so threading and async/await work well. The GIL is being made optional in Python 3.13+ (PEP 703)." },
    { difficulty: "Intermediate", q: "What is the difference between asyncio, threading, and multiprocessing?", a: "asyncio: single-threaded cooperative concurrency using an event loop and coroutines (`async/await`). Ideal for I/O-bound tasks with many concurrent connections (web servers, API clients). Threading: multiple threads in one process, share memory, GIL limits CPU parallelism. Good for I/O-bound tasks. Multiprocessing: multiple processes, each with separate memory. True CPU parallelism. Good for CPU-bound tasks (data processing, ML). asyncio > threading for high-concurrency I/O; multiprocessing for CPU." },
    { difficulty: "Intermediate", q: "How does Python's garbage collection work?", a: "Python uses reference counting as the primary GC — every object tracks how many references point to it; when count hits 0, it's immediately freed. To handle circular references (A → B → A), Python has a cyclic garbage collector (gc module) that runs periodically to detect and collect cycles. The gc module has three generations (0, 1, 2) — objects that survive a collection are promoted to the next generation which is collected less frequently." },
    { difficulty: "Advanced", q: "What are Python's memory management internals?", a: "Python uses PyMalloc, a custom allocator built on top of the OS allocator, optimized for small objects. Small objects (< 512 bytes) are allocated from pools (blocks of 4KB) managed by arenas (256KB). This reduces fragmentation and system call overhead. Large objects go directly to malloc. The `sys.getsizeof()` function returns an object's size. Use `tracemalloc` to track memory allocation across your code to find memory leaks." },
  ],

  // ────────────────────────────────────────────────────────────────── Go ───────
  "Go": [
    { difficulty: "Basic", q: "What are goroutines and how do they differ from threads?", a: "Goroutines are lightweight, user-space threads managed by the Go runtime — not OS threads. They start with a 2KB stack (vs ~1MB for OS threads) that grows dynamically. The Go scheduler multiplexes goroutines onto OS threads (M:N threading). You can run millions of goroutines concurrently. Goroutines communicate via channels (CSP model), not shared memory. Start a goroutine with `go func()`." },
    { difficulty: "Basic", q: "What are channels in Go and what are the types?", a: "Channels are typed conduits for communication between goroutines — they implement the CSP model ('share memory by communicating'). Unbuffered channel: `make(chan int)` — sender blocks until receiver is ready (synchronous handoff). Buffered channel: `make(chan int, 10)` — sender blocks only when buffer is full. Use channels for synchronization and data passing. Use `select` to handle multiple channels. Close channels with `close(ch)` to signal no more values." },
    { difficulty: "Intermediate", q: "What is Go's interface system and how does implicit implementation work?", a: "In Go, interfaces are satisfied implicitly — a type implements an interface if it has all the interface's methods (no `implements` keyword). This enables duck typing with static type safety. Any type can satisfy any interface without knowing it exists. This promotes loose coupling — write a function that accepts `io.Reader` and it works with files, network connections, strings, etc. The empty interface `interface{}` (or `any` in Go 1.18+) accepts any value." },
    { difficulty: "Advanced", q: "How does Go handle error handling and what are best practices?", a: "Go uses explicit error returns — functions return `(result, error)`. No exceptions. Best practices: 1) Always check errors — never `_` ignore them in production code. 2) Wrap errors with context: `fmt.Errorf(\"parsing config: %w\", err)` (the `%w` makes it unwrappable with `errors.Is`/`errors.As`). 3) Create sentinel errors: `var ErrNotFound = errors.New(\"not found\")`. 4) Return early on error (guard clauses). 5) In main(), use `log.Fatal` for unrecoverable errors." },
  ],

  // ──────────────────────────────────────────────────────────────── Rust ───────
  "Rust": [
    { difficulty: "Basic", q: "What is ownership in Rust?", a: "Ownership is Rust's memory management system without garbage collection. Rules: 1) Each value has exactly one owner. 2) When the owner goes out of scope, the value is dropped (freed). 3) You can transfer ownership (move) or lend it (borrow). No dangling pointers, no double frees — enforced at compile time. Example: `let s2 = s1;` moves s1 into s2; s1 is no longer valid. This eliminates a whole class of memory safety bugs without runtime cost." },
    { difficulty: "Basic", q: "What is the difference between borrowing and moving in Rust?", a: "Moving transfers ownership — the original variable is no longer valid. `let b = a;` moves a into b. Borrowing creates a reference without transferring ownership. `&T` is an immutable borrow (many allowed simultaneously). `&mut T` is a mutable borrow (only one allowed, and no immutable borrows can coexist). The borrow checker enforces these rules at compile time, preventing data races and use-after-free bugs." },
    { difficulty: "Advanced", q: "What are lifetimes in Rust and why are they needed?", a: "Lifetimes are annotations that tell the compiler how long references are valid. They prevent dangling references. Most lifetimes are inferred (lifetime elision). You need to annotate explicitly when a function returns a reference: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str` — the returned reference lives as long as the shorter of x and y. Lifetimes are a zero-cost abstraction — they exist only at compile time and produce no runtime overhead." },
  ],

  // ──────────────────────────────────────────────────────────────── Java ───────
  "Java": [
    { difficulty: "Basic", q: "What is the difference between JDK, JRE, and JVM?", a: "JVM (Java Virtual Machine): runs Java bytecode, provides platform independence, manages memory (GC). JRE (Java Runtime Environment): JVM + standard libraries — needed to run Java apps. JDK (Java Development Kit): JRE + compiler (javac) + developer tools (debugger, profiler) — needed to develop Java apps. To run: need JRE. To develop: need JDK." },
    { difficulty: "Intermediate", q: "How does Java garbage collection work?", a: "Java GC automatically reclaims memory. Heap is divided into: Young Generation (Eden + 2 Survivor spaces — most objects die young, GC is fast Minor GC), Old Generation (long-lived objects — GC is slower Major/Full GC), and Metaspace (class metadata, off-heap). GC algorithms: Serial (single-threaded), Parallel (throughput), G1GC (default since Java 9, balances throughput/latency), ZGC and Shenandoah (low-latency, < 10ms pauses). Tune with `-Xmx`, `-Xms`, and GC flags." },
    { difficulty: "Advanced", q: "What is the difference between HashMap and ConcurrentHashMap?", a: "HashMap is not thread-safe — concurrent reads/writes cause data corruption or infinite loops. ConcurrentHashMap is thread-safe: it uses segment-level locking (Java 7) or CAS + fine-grained bin-level synchronization (Java 8+). It allows multiple reads and concurrent writes to different segments without blocking. `putIfAbsent`, `computeIfAbsent`, and `merge` are atomic. Use ConcurrentHashMap for multi-threaded access; Collections.synchronizedMap() is slower (locks the whole map)." },
  ],

  // ──────────────────────────────────────────────────────────────── Node.js ────
  "Node.js": [
    { difficulty: "Basic", q: "What is the Node.js event loop?", a: "The event loop is the core of Node.js's non-blocking I/O model. Despite JavaScript being single-threaded, the event loop allows Node to perform non-blocking I/O by offloading operations to the OS kernel (or libuv thread pool). Phases: timers (setTimeout/setInterval), pending callbacks, idle/prepare, poll (I/O callbacks), check (setImmediate), close callbacks. Between phases, microtasks (Promises, process.nextTick) are drained. Never block the event loop with CPU-heavy sync code." },
    { difficulty: "Intermediate", q: "What is the difference between process.nextTick and setImmediate?", a: "`process.nextTick` fires after the current operation completes but BEFORE the event loop continues to the next phase — it runs in the 'next tick queue', which is drained completely before moving on. `setImmediate` fires in the check phase of the NEXT iteration of the event loop. `process.nextTick` has higher priority. Excessive use of `process.nextTick` can starve the event loop (I/O callbacks never get to run)." },
    { difficulty: "Advanced", q: "How do you handle CPU-intensive tasks in Node.js without blocking the event loop?", a: "Options: 1) Worker Threads (`worker_threads` module) — run JS in separate threads with shared memory via SharedArrayBuffer and message passing. Best for CPU-intensive JS tasks. 2) Child Processes (`child_process.fork`) — spawn separate Node processes, communicate via IPC. More isolation, higher overhead. 3) Native addons (N-API) — write C++ to offload CPU work to the thread pool. 4) Queue heavy work to separate services (Redis + Bull queue, RabbitMQ). 5) Cluster module to fork multiple processes using all CPU cores." },
  ],

  // ─────────────────────────────────────────────────────────── System Design ───
  "System Design": [
    { difficulty: "Basic", q: "How would you design a URL shortener like bit.ly?", a: "Requirements: generate short codes, redirect to original URL, analytics. Design: 1) Generate a unique 6-char base62 code (UUID hashed, or counter encoded in base62). 2) Store mapping in a database (id, short_code, original_url, created_at, click_count). 3) Cache hot URLs in Redis (TTL-based). 4) Use a CDN/GeoDNS for global redirect speed. 5) Handle redirects with 301 (permanent, cached) or 302 (temporary, counts tracked). Scale: reads >> writes so optimize for read path with caching." },
    { difficulty: "Intermediate", q: "How would you design a rate limiter?", a: "Algorithms: Token Bucket (allows bursting — tokens refill at a rate, each request costs one token), Sliding Window Log (accurate, memory-heavy), Fixed Window Counter (simple, boundary problem), Sliding Window Counter (hybrid, approximate). Implementation: use Redis with atomic operations (INCR + EXPIRE for fixed window, sorted sets for sliding window log). Store per user_id or per IP. Return 429 Too Many Requests with Retry-After header when limit exceeded. Distribute with a central Redis cluster for multi-node deployments." },
    { difficulty: "Advanced", q: "How would you design YouTube / a video streaming platform?", a: "Upload: client → upload service → S3. Transcoding: S3 event triggers worker (ECS/Lambda) → FFmpeg transcodes to multiple resolutions (360p, 720p, 1080p) → store in S3. CDN: videos served from CloudFront, segment video into 2-10s chunks (HLS/DASH) for adaptive bitrate. Metadata: PostgreSQL for video metadata, Elasticsearch for search. Recommendations: ML model updated offline, Redis for real-time trending. Comments: Cassandra (write-heavy, wide rows). Scale: separate read/write paths, event-driven architecture with Kafka for view counts and notifications." },
    { difficulty: "Advanced", q: "How would you design a distributed message queue like Kafka?", a: "Core concepts: Topics (categories) → Partitions (ordered, immutable log, parallelism unit) → Offsets (position in partition). Producers write to partitions (round-robin or by key). Consumers in a Consumer Group each own partitions — add consumers to scale up (max=# partitions). Brokers store data with replication (ISR — in-sync replicas). Leader per partition handles reads/writes. Retention: time-based or size-based. Delivery guarantees: at-least-once (ack after write), exactly-once (transactions + idempotent producers). Use cases: event streaming, decoupling services, log aggregation." },
  ],

  // ────────────────────────────────────────────────────────── Cybersecurity ────
  "Cybersecurity": [
    { difficulty: "Basic", q: "What is the difference between authentication and authorization?", a: "Authentication (AuthN) verifies identity — 'who are you?' (username/password, MFA, certificate, biometric). Authorization (AuthZ) determines what the authenticated identity is allowed to do — 'what can you access?' (RBAC, ABAC, ACLs). You can't authorize without first authenticating. Example: login is authentication; reading but not deleting a file is authorization. OAuth 2.0 handles authorization; OIDC adds authentication on top." },
    { difficulty: "Basic", q: "What is SQL injection and how do you prevent it?", a: "SQL injection is when an attacker inserts malicious SQL into input fields that gets executed by the database. Example: `username = ' OR '1'='1` bypasses login. Prevention: always use parameterized queries / prepared statements (never string concatenation), use an ORM, input validation (whitelist), principle of least privilege for DB users, and WAF. Parameterized queries are the only reliable fix — the DB treats input as data, never as code." },
    { difficulty: "Intermediate", q: "What is the OWASP Top 10?", a: "The OWASP Top 10 (2021) is the most critical web security risks: 1) Broken Access Control, 2) Cryptographic Failures, 3) Injection (SQL, XSS, etc.), 4) Insecure Design, 5) Security Misconfiguration, 6) Vulnerable & Outdated Components, 7) Identification & Authentication Failures, 8) Software & Data Integrity Failures (SolarWinds-type attacks), 9) Security Logging & Monitoring Failures, 10) Server-Side Request Forgery (SSRF). It's the industry standard baseline for web app security." },
    { difficulty: "Advanced", q: "How does mTLS work and when would you use it?", a: "Mutual TLS (mTLS) is TLS where both client and server present certificates. Normal TLS: server proves identity to client. mTLS: both sides verify each other. Process: TLS handshake where server sends cert, client verifies it, client sends its cert, server verifies it. Use in: service mesh (Istio auto-issues certs to all pods), API authentication for machine-to-machine communication, zero-trust internal networks. Certificate management is the main complexity — use a service like cert-manager or Vault PKI to issue and rotate certs automatically." },
  ],

  // ─────────────────────────────────────────────────────────────── DevSecOps ───
  "DevSecOps": [
    { difficulty: "Basic", q: "What is SAST vs DAST?", a: "SAST (Static Application Security Testing) analyzes source code or bytecode without running the app — finds vulnerabilities early in development (SQL injection patterns, insecure crypto usage). Tools: SonarQube, Semgrep, Checkmarx. DAST (Dynamic Application Security Testing) tests a running application by sending malicious inputs and analyzing responses — finds runtime vulnerabilities (XSS, auth bypasses). Tools: OWASP ZAP, Burp Suite. Use SAST in CI on every PR; DAST against a staging environment." },
    { difficulty: "Intermediate", q: "What is supply chain security and how do you address it?", a: "Supply chain attacks compromise software before it reaches users — e.g., SolarWinds (malicious build process), Log4Shell (vulnerable dependency). Defenses: 1) Pin dependency versions and verify checksums. 2) Use Sigstore/cosign to sign and verify container images. 3) Generate SBOMs (Software Bill of Materials — CycloneDX, SPDX) listing all dependencies. 4) Scan dependencies for CVEs (Snyk, Dependabot, Trivy). 5) Secure your build pipeline (no untrusted plugins, signed commits, build provenance with SLSA framework)." },
    { difficulty: "Advanced", q: "What is the SLSA framework?", a: "SLSA (Supply-chain Levels for Software Artifacts) is a security framework for supply chain integrity with 4 levels. L1: Build process documented. L2: Build service generates provenance (signed attestation of what produced the artifact). L3: Source and build platforms meet specific security requirements (no manual changes to build, 2-person rule for changes). L4: Highest — hermetic builds, reproducible builds. Each level is a superset of the previous. Pair with Sigstore (cosign, Rekor transparency log) for signing and verifying." },
  ],
};

// ── Difficulty colors ──────────────────────────────────────────────────────────
const DIFF_COLOR: Record<Difficulty, string> = {
  Basic:        "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
  Intermediate: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
  Advanced:     "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
};

// ── Sub-nav ────────────────────────────────────────────────────────────────────
function SubNav() {
  const links = [
    { href: "/roadmaps",                label: "Roadmaps",      icon: "🗺️" },
    { href: "/roadmaps/learning",       label: "Learning",      icon: "📚" },
    { href: "/roadmaps/certifications", label: "Certifications",icon: "🏆" },
    { href: "/roadmaps/salaries",       label: "Salaries",      icon: "💰" },
    { href: "/roadmaps/interviews",     label: "Interview Prep",icon: "🎯" },
  ];
  return (
    <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-hide">
          {links.map(({ href, label, icon }) => (
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
  searchParams: Promise<{ topic?: string; diff?: string }>;
}) {
  const { topic: rawTopic, diff: rawDiff } = await searchParams;
  const activeTopic: Topic = (TOPICS.includes(rawTopic as Topic) ? rawTopic : "DevOps") as Topic;
  const activeDiff = (["Basic", "Intermediate", "Advanced"].includes(rawDiff ?? "") ? rawDiff : "All") as Difficulty | "All";

  const allQA = INTERVIEW_DATA[activeTopic] ?? [];
  const filtered = activeDiff === "All" ? allQA : allQA.filter((q) => q.difficulty === activeDiff);

  const counts = {
    All:          allQA.length,
    Basic:        allQA.filter((q) => q.difficulty === "Basic").length,
    Intermediate: allQA.filter((q) => q.difficulty === "Intermediate").length,
    Advanced:     allQA.filter((q) => q.difficulty === "Advanced").length,
  };

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

      <SubNav />
      <TickerBar />

      <main className="container mx-auto px-4 py-10 max-w-7xl">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-blue-200 dark:border-blue-800">
            <MessageSquare className="w-3.5 h-3.5" />
            Interview Prep · {TOPICS.length} Stacks · {allQA.length} Questions
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
            🎯 {activeTopic}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Interview Questions
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base">
            Real interview questions asked at top tech companies — with detailed answers. Filter by difficulty.
          </p>
        </section>

        {/* ── Topic selector ────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-6 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          {TOPICS.map((t) => (
            <Link
              key={t}
              href={`/roadmaps/interviews?topic=${encodeURIComponent(t)}&diff=${activeDiff}`}
              className={`inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                activeTopic === t
                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600"
              }`}
            >
              {t}
            </Link>
          ))}
        </div>

        {/* ── Difficulty filter + stats ─────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {(["All", "Basic", "Intermediate", "Advanced"] as const).map((d) => (
            <Link
              key={d}
              href={`/roadmaps/interviews?topic=${encodeURIComponent(activeTopic)}&diff=${d}`}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                activeDiff === d
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-md"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-700"
              }`}
            >
              {d}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                activeDiff === d ? "bg-white/20 text-white dark:bg-black/20 dark:text-slate-900" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
              }`}>
                {counts[d]}
              </span>
            </Link>
          ))}
          <span className="ml-auto text-xs text-slate-400 hidden sm:block">
            Click any question to reveal the answer
          </span>
        </div>

        {/* ── Questions accordion ───────────────────────────────────── */}
        <div className="space-y-3">
          {filtered.map((item, i) => (
            <details
              key={i}
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
            >
              <summary className="flex items-start gap-4 p-5 cursor-pointer list-none select-none [&::-webkit-details-marker]:hidden">
                <span className="shrink-0 w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-black mt-0.5">
                  {i + 1}
                </span>
                <span className="flex-1 font-semibold text-slate-900 dark:text-white text-sm leading-relaxed pr-4">
                  {item.q}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`hidden sm:inline text-[10px] font-bold px-2 py-0.5 rounded-full ${DIFF_COLOR[item.difficulty]}`}>
                    {item.difficulty}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform duration-200 shrink-0" />
                </div>
              </summary>

              <div className="px-5 pb-5 pt-0">
                <div className="ml-11 pl-4 border-l-2 border-blue-200 dark:border-blue-800">
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            </details>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
              <p className="text-slate-400 text-sm">No questions for this filter. Try &ldquo;All&rdquo; difficulty.</p>
            </div>
          )}
        </div>

        {/* ── Quick links ───────────────────────────────────────────── */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
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
