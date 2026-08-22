/* ==========================================================================
   Abir Al Zubayer  Portfolio
   Project data: single source of truth for the Projects section (index.html)
   and for every case-study page rendered by project.html?p=<slug>.

   Content is transcribed from the repository's own project documents:
     Featured_Projects/Cloud_Cost_Optimizer.txt
     Featured_Projects/cloud_watch_monotoring.txt
     Recent_Work/AWS EKS Platform.txt
     Recent_Work/GitOps_delivery.txt
     Recent_Work/Developer_Platform.txt
     All case studies/Production Jenkins_Agent.txt
     All case studies/jenkins_slac_notifications.txt
     All case studies/azure_cloud_service.txt
     All case studies/azure_applications.txt
     All case studies/terraform.txt
     All case studies/cloud_database_migrations.txt
     All case studies/productions_problem.txt
     All case studies/Argocd_GitOps_delivery.txt

   These documents describe designed / proposed architectures, so the copy
   below uses design language and every illustrative figure is labelled as
   such. Nothing here claims a measured production result that the source
   documents do not support.

   Block types consumed by assets/js/project-detail.js:
     { t: 'p',      v: 'html' }                  paragraph
     { t: 'h',      v: 'text' }                  sub-heading
     { t: 'quote',  v: 'text' }                  pull quote
     { t: 'list',   v: ['html', ...] }           bulleted list
     { t: 'flow',   v: ['Step', ...] }           left-to-right step chain
     { t: 'dia',    label: 'text', v: 'ascii' }  monospace diagram
     { t: 'grid',   v: [{ h, p }, ...] }         feature cards
     { t: 'groups', v: [{ h, v: [...] }, ...] }  labelled chip groups
     { t: 'stats',  v: [{ k, v }, ...] }         figure tiles
     { t: 'note',   v: 'text' }                  honesty / scope caveat
   ========================================================================== */

(function () {
  'use strict';

  var SECTION_TITLES = {
    overview: 'Project Overview',
    challenge: 'Problem &amp; Challenge',
    solution: 'Solution Approach',
    architecture: 'Architecture &amp; Infrastructure',
    devops: 'DevOps &amp; Cloud Implementation',
    features: 'Key Features',
    stack: 'Technologies &amp; Tools',
    outcomes: 'Results &amp; Outcomes'
  };

  /* ---------------------------------------------------------------- 1 of 5 */
  var cloudCostOptimizer = {
    slug: 'cloud-cost-optimizer',
    name: 'Cloud Cost Optimizer',
    cardTitle: 'Cloud Cost Optimizer',
    group: 'featured',
    groupLabel: 'Featured Project',
    source: 'Featured_Projects/Cloud_Cost_Optimizer.txt',
    tagline:
      'A cloud financial management platform designed to turn raw AWS billing and utilisation data into safe, reviewable cost reductions.',
    goal:
      'Reduce cloud infrastructure costs without compromising application performance, availability, or scalability.',
    card: {
      kicker: 'FinOps Platform',
      readTime: '7 min read',
      date: 'October 24, 2023',
      excerpt:
        'Maps AWS spend to teams, finds idle and oversized resources, and routes every change through Terraform review.',
      tint: 'var(--tint-cream)',
      accent: '#d98f00',
      chips: ['AWS Cost Explorer', 'Terraform', 'Amazon ECS', 'FastAPI'],
      img: {
        base: 'assets/img/projects/featured-1',
        w: 1400,
        h: 933,
        alt: 'Cloud cost optimizer dashboard illustration'
      }
    },
    hero: {
      base: 'assets/img/projects/featured-1',
      w: 1400,
      h: 933,
      alt: 'Isometric illustration of a cloud cost analytics dashboard'
    },
    meta: [
      { label: 'Discipline', value: 'Cloud FinOps' },
      { label: 'Cloud', value: 'AWS' },
      { label: 'Runtime', value: 'Amazon ECS' },
      { label: 'Provisioning', value: 'Terraform' }
    ],
    tags: [
      'AWS Cost Explorer',
      'CloudWatch',
      'Terraform',
      'Amazon ECS',
      'Amazon ECR',
      'AWS Lambda',
      'EventBridge',
      'IAM',
      'Secrets Manager',
      'Python / FastAPI',
      'PostgreSQL',
      'Next.js',
      'GitHub Actions OIDC'
    ],
    sections: [
      {
        id: 'overview',
        blocks: [
          {
            t: 'p',
            v: '<strong>Cloud Cost Optimizer</strong> is a cloud-financial-management platform designed to help engineering teams monitor, analyse, and reduce infrastructure costs across AWS environments.'
          },
          {
            t: 'p',
            v: 'The platform continuously collects cloud usage and billing data, identifies unnecessary spending, detects underutilised resources, and produces actionable optimisation recommendations. It combines <strong>AWS Cost Explorer, CloudWatch metrics, resource inventory, Terraform, and automated optimisation workflows</strong> to turn raw cloud spending into measurable cost-saving opportunities.'
          },
          { t: 'quote', v: 'Reduce cloud infrastructure costs without compromising application performance, availability, or scalability.' }
        ]
      },
      {
        id: 'challenge',
        blocks: [
          {
            t: 'p',
            v: 'Cloud bills grow quietly. Spend arrives as one consolidated invoice, while the resources responsible for it are spread across accounts, regions, and teams. The design addresses a specific set of recurring problems:'
          },
          {
            t: 'list',
            v: [
              '<strong>No ownership of spend.</strong> A monthly total exists, but nothing maps a line item back to the application, environment, or team that caused it.',
              '<strong>Idle resources keep billing.</strong> Unattached EBS volumes, unused Elastic IPs, stale snapshots, forgotten development environments, and unused load balancers cost money while providing no value.',
              '<strong>Over-provisioned infrastructure.</strong> Instances and databases are sized for a worst case that never arrives, and nobody has the utilisation history to argue for a smaller size safely.',
              '<strong>Kubernetes requests drift from reality.</strong> CPU and memory requests are set once and never revisited, so nodes are paid for capacity that pods never use.',
              '<strong>Cost spikes are noticed late.</strong> An autoscaling change or a new service can raise spend for weeks before anyone reads the invoice.',
              '<strong>Optimisation itself is risky.</strong> Manually resizing production resources to save money is exactly how availability incidents start.'
            ]
          }
        ]
      },
      {
        id: 'solution',
        blocks: [
          {
            t: 'p',
            v: 'The platform treats cost as an engineering signal rather than a finance report. Billing data, CloudWatch utilisation, and resource inventory are collected on a schedule, joined into a single model, and analysed by three independent engines cost analysis, rightsizing, and anomaly detection before anything reaches a human as a recommendation.'
          },
          {
            t: 'p',
            v: 'The critical design decision is that <strong>the platform never mutates infrastructure directly</strong>. Approved recommendations are translated into Terraform changes and opened as GitHub pull requests, so every cost optimisation inherits the same review, plan, and audit trail as any other infrastructure change.'
          },
          { t: 'h', v: 'The FinOps loop' },
          {
            t: 'flow',
            v: ['Measure', 'Analyse', 'Recommend', 'Approve', 'Implement', 'Verify', 'Repeat']
          },
          {
            t: 'p',
            v: 'Each stage has an explicit owner: the platform measures, analyses, and recommends; engineering or FinOps approves; Terraform and CI/CD implement; and the next collection cycle verifies whether the saving actually materialised.'
          },
          {
            t: 'p',
            v: 'Rightsizing deliberately errs on the safe side. Recommendations weigh CPU, memory, network, and disk utilisation, request volume, historical workload, and <strong>peak</strong> utilisation not only averages so the engine avoids aggressive suggestions that would trade cost for a performance regression.'
          }
        ]
      },
      {
        id: 'architecture',
        blocks: [
          {
            t: 'p',
            v: 'Data flows in one direction: from AWS APIs, through collection and analysis, into recommendations that surface in an API and dashboard.'
          },
          {
            t: 'dia',
            label: 'Platform data flow',
            v: [
              '                     ┌─────────────────────┐',
              '                     │     AWS Accounts    │',
              '                     │                     │',
              '                     │ EC2 / ECS / EKS     │',
              '                     │ RDS / S3 / EBS      │',
              '                     │ Lambda / VPC        │',
              '                     └──────────┬──────────┘',
              '                                ▼',
              '                     ┌─────────────────────┐',
              '                     │ AWS Cost Explorer   │',
              '                     │ CloudWatch          │',
              '                     │ Resource APIs       │',
              '                     └──────────┬──────────┘',
              '                                ▼',
              '                     ┌─────────────────────┐',
              '                     │ Data Collection     │',
              '                     │ Lambda / ECS        │',
              '                     │ Scheduled Jobs      │',
              '                     └──────────┬──────────┘',
              '                                ▼',
              '                     ┌─────────────────────┐',
              '                     │ Cost Processing     │',
              '                     │ & Analysis Engine   │',
              '                     └──────────┬──────────┘',
              '             ┌──────────────────┼──────────────────┐',
              '             ▼                  ▼                  ▼',
              '      Cost Analyzer       Rightsizing       Anomaly Detection',
              '             │                  │                  │',
              '             └──────────────────┼──────────────────┘',
              '                                ▼',
              '                     ┌─────────────────────┐',
              '                     │ Recommendation      │',
              '                     │ Engine              │',
              '                     └──────────┬──────────┘',
              '                                ▼',
              '                     ┌─────────────────────┐',
              '                     │ Cost Optimizer API  │',
              '                     └──────────┬──────────┘',
              '                                ▼',
              '                     ┌─────────────────────┐',
              '                     │ Web Dashboard       │',
              '                     │ Cost / Savings      │',
              '                     │ Resources           │',
              '                     │ Recommendations     │',
              '                     │ Forecast            │',
              '                     └─────────────────────┘'
            ].join('\n')
          },
          { t: 'h', v: 'Infrastructure' },
          {
            t: 'p',
            v: 'The entire platform is provisioned through Terraform, with a module per concern and one directory per environment so dev, staging, and production stay structurally identical.'
          },
          {
            t: 'dia',
            label: 'Terraform-managed resources',
            v: [
              'Terraform',
              '   │',
              '   ├── VPC',
              '   ├── ECS',
              '   ├── ALB',
              '   ├── ECR',
              '   ├── RDS',
              '   ├── IAM',
              '   ├── CloudWatch',
              '   ├── Secrets Manager',
              '   ├── S3',
              '   └── EventBridge',
              '',
              'environments/',
              '├── dev/',
              '├── staging/',
              '└── production/'
            ].join('\n')
          },
          { t: 'h', v: 'Cost attribution model' },
          {
            t: 'p',
            v: 'Every analysed resource is resolved along a single attribution chain, which is what makes per-team and per-environment reporting possible:'
          },
          { t: 'flow', v: ['Resource', 'Application', 'Environment', 'Team', 'Monthly Cost'] }
        ]
      },
      {
        id: 'devops',
        blocks: [
          {
            t: 'p',
            v: 'The API and dashboard are containerised and deployed to Amazon ECS through GitHub Actions, with PostgreSQL holding the cost analytics model.'
          },
          {
            t: 'dia',
            label: 'Build and deploy path',
            v: [
              'Developer',
              '    │',
              '    ▼',
              'GitHub',
              '    │',
              '    ▼',
              'GitHub Actions',
              '    │',
              '    ├── Unit Tests',
              '    ├── Security Scan',
              '    ├── Docker Build',
              '    ├── Trivy Scan',
              '    └── Push Image',
              '             │',
              '             ▼',
              '            ECR',
              '             │',
              '             ▼',
              '            ECS',
              '             │',
              '       ┌─────┴─────┐',
              '       │           │',
              '      API       Dashboard',
              '       │',
              '       ▼',
              '   PostgreSQL',
              '       │',
              '       ▼',
              '  Cost Analytics'
            ].join('\n')
          },
          { t: 'h', v: 'Pipeline gates' },
          {
            t: 'flow',
            v: [
              'Lint',
              'Unit Tests',
              'Security Scan',
              'Docker Build',
              'Trivy Scan',
              'Push to ECR',
              'Terraform Plan',
              'Approval',
              'Terraform Apply',
              'ECS Deploy'
            ]
          },
          { t: 'h', v: 'Security model' },
          {
            t: 'p',
            v: 'Read and write paths are separated at the IAM level. The analysis role can only describe and read; a second, tightly scoped role performs optimisation actions.'
          },
          {
            t: 'dia',
            label: 'Least-privilege read role',
            v: [
              'Cost Optimizer',
              '      │',
              '      ▼',
              '   IAM Role',
              '      │',
              '      ├── Cost Explorer Read',
              '      ├── CloudWatch Read',
              '      ├── EC2 Describe',
              '      ├── ECS Describe',
              '      ├── RDS Describe',
              '      └── S3 Read'
            ].join('\n')
          },
          {
            t: 'list',
            v: [
              'Least-privilege IAM roles instead of long-lived AWS access keys.',
              'A separate, tightly controlled role for any optimisation action.',
              'OAuth / OIDC authentication with role-based access control across Admin, FinOps, DevOps, and Viewer roles.',
              'Credentials held in AWS Secrets Manager, scoped per environment.',
              '<strong>No static AWS credentials inside GitHub Actions</strong> the pipeline authenticates through GitHub OIDC.'
            ]
          }
        ]
      },
      {
        id: 'features',
        blocks: [
          {
            t: 'grid',
            v: [
              {
                h: 'Multi-account cost visibility',
                p: 'Centralised view across AWS accounts with production, staging, and development separated, plus account, service, and region breakdowns and daily, weekly, and monthly trends.'
              },
              {
                h: 'AWS resource cost analysis',
                p: 'Attributes spend to the infrastructure causing it across EC2, ECS, EKS, RDS, NAT Gateway, load balancers, EBS, S3, CloudWatch, Lambda, Elastic IPs, and VPC resources.'
              },
              {
                h: 'Idle resource detection',
                p: 'Flags resources that cost money while providing little value idle instances, unused Elastic IPs, unattached volumes, old snapshots, unused load balancers, and forgotten environments.'
              },
              {
                h: 'Rightsizing engine',
                p: 'Recommends better instance sizes from utilisation history, weighing peak usage as well as averages so recommendations stay safe for production workloads.'
              },
              {
                h: 'Cost anomaly detection',
                p: 'Compares daily spend against a historical baseline and alerts engineering when a service deviates, with likely causes such as task-count changes or data transfer growth.'
              },
              {
                h: 'Kubernetes cost optimisation',
                p: 'Extends analysis into EKS with namespace and deployment cost, node utilisation, and CPU/memory requested versus actually used to surface over-provisioned workloads.'
              },
              {
                h: 'Approval-gated automation',
                p: 'Recommendations can become actions, but only through an explicit approval step followed by a Terraform change, a pull request, and CI/CD validation.'
              },
              {
                h: 'Terraform integration',
                p: 'Optimisations are expressed as infrastructure-as-code changes rather than direct API mutations, keeping drift out of the estate and history in Git.'
              },
              {
                h: 'Cost forecasting',
                p: 'Projects next-month spend from historical usage alongside budget utilisation, expected growth, potential savings, and realised savings.'
              }
            ]
          },
          { t: 'h', v: 'What a recommendation looks like' },
          {
            t: 'dia',
            label: 'Example rightsizing output',
            v: [
              'Current:',
              'EC2 t3.large',
              '$60/month',
              'CPU utilization: 8%',
              '',
              'Recommendation:',
              'EC2 t3.medium',
              '$30/month',
              '',
              'Estimated saving:',
              '$30/month'
            ].join('\n')
          },
          {
            t: 'note',
            v: 'Figures in this example are illustrative values from the project specification, used to show the shape of a recommendation rather than to report a realised saving.'
          }
        ]
      },
      {
        id: 'stack',
        blocks: [
          {
            t: 'groups',
            v: [
              {
                h: 'Cloud',
                v: ['AWS', 'EC2', 'ECS', 'EKS', 'RDS', 'S3', 'CloudWatch', 'Cost Explorer', 'Lambda', 'EventBridge', 'IAM', 'VPC', 'ECR', 'Secrets Manager']
              },
              { h: 'Infrastructure', v: ['Terraform', 'Terraform Modules', 'AWS Provider'] },
              { h: 'Containers', v: ['Docker', 'Docker Compose', 'Amazon ECS'] },
              { h: 'CI/CD', v: ['GitHub Actions', 'GitHub OIDC', 'Amazon ECR'] },
              { h: 'Security', v: ['IAM', 'AWS Secrets Manager', 'Trivy', 'OIDC'] },
              { h: 'Backend', v: ['Python / FastAPI', 'PostgreSQL', 'Redis'] },
              { h: 'Frontend', v: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts'] },
              { h: 'Monitoring', v: ['CloudWatch', 'Prometheus', 'Grafana'] }
            ]
          }
        ]
      },
      {
        id: 'outcomes',
        blocks: [
          {
            t: 'p',
            v: 'The platform demonstrates how DevOps teams can move beyond simply <em>deploying</em> infrastructure and start actively managing its efficiency, reliability, and financial impact.'
          },
          {
            t: 'quote',
            v: 'See where your cloud money goes → identify waste → simulate savings → safely implement changes → measure the actual savings.'
          },
          { t: 'h', v: 'Design outcomes' },
          {
            t: 'list',
            v: [
              'Spend is attributable to a team and an environment instead of arriving as a single monthly total.',
              'Idle and oversized resources are surfaced continuously rather than during an occasional cost review.',
              'Every optimisation lands as a reviewed Terraform change, so the estate never drifts away from its code.',
              'A what-if simulator lets engineers compare optimisation scenarios before committing to any of them.',
              'Realised savings are measured on the next collection cycle, closing the FinOps loop.'
            ]
          },
          { t: 'h', v: 'Reference dashboard metrics' },
          {
            t: 'stats',
            v: [
              { k: 'Total cloud spend', v: '$4,280 / mo' },
              { k: 'Potential savings', v: '$920 / mo' },
              { k: 'Realised savings', v: '$640 / mo' },
              { k: 'Optimisation rate', v: '21.5%' },
              { k: 'Idle resources', v: '17' },
              { k: 'Rightsizing opportunities', v: '24' }
            ]
          },
          {
            t: 'note',
            v: 'These are the example dashboard values defined in the project specification to show which business-level metrics the platform reports. They are reference figures for the design, not measured results from a production deployment.'
          }
        ]
      }
    ]
  };

  /* ---------------------------------------------------------------- 2 of 5 */
  var cloudwatchGitops = {
    slug: 'cloudwatch-monitoring-gitops',
    name: 'CloudWatch Monitoring &amp; GitOps Platform',
    cardTitle: 'CloudWatch Monitoring',
    group: 'featured',
    groupLabel: 'Featured Project',
    source: 'Featured_Projects/cloud_watch_monotoring.txt',
    tagline:
      'Unified AWS and Kubernetes observability wired directly into an Argo CD delivery loop, so every deployment is watched by the metrics it affects.',
    goal: 'Monitor everything, deploy safely, detect problems quickly, and recover automatically.',
    card: {
      kicker: 'Observability &amp; GitOps',
      readTime: '7 min read',
      date: 'October 24, 2023',
      excerpt:
        'CloudWatch, Prometheus, Grafana, and Alertmanager joined to an Argo CD GitOps deployment loop.',
      tint: 'var(--tint-lilac)',
      accent: '#7c3aed',
      chips: ['CloudWatch', 'Prometheus', 'Grafana', 'Argo CD'],
      img: {
        base: 'assets/img/work/work-1',
        w: 1000,
        h: 667,
        alt: 'Kubernetes monitoring and observability stack illustration'
      }
    },
    hero: {
      base: 'assets/img/work/work-1',
      w: 1000,
      h: 667,
      alt: 'Isometric illustration of a Kubernetes cluster with monitoring dashboards'
    },
    meta: [
      { label: 'Discipline', value: 'Observability' },
      { label: 'Cloud', value: 'AWS / Amazon EKS' },
      { label: 'Delivery', value: 'Argo CD GitOps' },
      { label: 'Provisioning', value: 'Terraform' }
    ],
    tags: [
      'Amazon EKS',
      'CloudWatch',
      'Container Insights',
      'Prometheus',
      'Grafana',
      'Alertmanager',
      'Loki',
      'Argo CD',
      'Argo Rollouts',
      'Helm',
      'Terraform',
      'GitHub Actions',
      'Trivy',
      'Amazon ECR'
    ],
    sections: [
      {
        id: 'overview',
        blocks: [
          {
            t: 'p',
            v: '<strong>CloudWatch Monitoring &amp; GitOps Platform</strong> is a production-grade DevOps observability and deployment platform that combines <strong>AWS CloudWatch, Prometheus, Grafana, Kubernetes, Argo CD, GitHub Actions, and Terraform</strong> into a single monitoring and GitOps workflow.'
          },
          {
            t: 'p',
            v: 'It provides real-time visibility into cloud infrastructure, containers, Kubernetes workloads, applications, logs, metrics, alerts, and deployments. At the same time, <strong>Argo CD continuously synchronises Kubernetes infrastructure and applications from Git</strong>, creating a fully automated GitOps deployment model.'
          },
          { t: 'quote', v: 'Monitor everything, deploy safely, detect problems quickly, and recover automatically.' }
        ]
      },
      {
        id: 'challenge',
        blocks: [
          {
            t: 'p',
            v: 'Monitoring and deployment are usually built as separate systems by separate people, which leaves a gap exactly where incidents happen in the minutes after a release. The design targets that gap:'
          },
          {
            t: 'list',
            v: [
              '<strong>Split visibility.</strong> AWS metrics live in CloudWatch and Kubernetes metrics live in Prometheus, so answering "is this the node or the pod?" means correlating two consoles by hand.',
              '<strong>Alerts without context.</strong> An alert that says <em>CPU = 92%</em> tells an on-call engineer nothing about which service, how many pods, or what changed.',
              '<strong>Deployments applied by hand.</strong> Running <code>kubectl apply</code> from a laptop leaves no reviewable record of what production is supposed to look like.',
              '<strong>No link between a release and its metrics.</strong> A deployment finishes "successfully" while error rate and latency quietly degrade, because nothing evaluates the release against live signals.',
              '<strong>Slow root cause.</strong> Logs, metrics, cluster state, and deployment history sit in four places, so investigation starts with gathering rather than diagnosing.',
              '<strong>Configuration drift.</strong> Manual fixes applied during an incident are never reflected back into Git, so the next deployment reintroduces the original problem.'
            ]
          }
        ]
      },
      {
        id: 'solution',
        blocks: [
          {
            t: 'p',
            v: 'The platform makes Git the deployment control plane and observability the acceptance test for every change. CI builds and validates; Argo CD decides what runs; Prometheus and CloudWatch decide whether it stays.'
          },
          { t: 'h', v: 'Two responsibilities, cleanly separated' },
          {
            t: 'list',
            v: [
              '<strong>CI = build and validate.</strong> GitHub Actions tests, scans, builds, and pushes an image to ECR, then updates an image tag in Git.',
              '<strong>CD = Argo CD GitOps.</strong> Argo CD compares the desired state in Git against the actual cluster state and reconciles the difference.'
            ]
          },
          {
            t: 'p',
            v: 'Because the desired state is a Git commit, drift becomes a detectable condition rather than an invisible one, and rollback becomes a revert rather than an improvised command.'
          },
          { t: 'h', v: 'Correlated signals instead of isolated numbers' },
          {
            t: 'dia',
            label: 'CloudWatch and Prometheus correlation',
            v: [
              'AWS EC2 CPU',
              '     │',
              '     ▼',
              'High CPU',
              '     │',
              '     ├───────────────┐',
              '     │               │',
              '     ▼               ▼',
              'Node Metrics     Pod Metrics',
              '     │               │',
              '     └───────┬───────┘',
              '             ▼',
              '       Application',
              '          Errors',
              '             │',
              '             ▼',
              '        Root Cause'
            ].join('\n')
          },
          {
            t: 'p',
            v: 'Instead of reporting <em>CPU = 92%</em>, the platform can report that node CPU rose to 92% because API pods increased CPU consumption following deployment <code>v2.8.4</code> a statement an engineer can act on immediately.'
          }
        ]
      },
      {
        id: 'architecture',
        blocks: [
          {
            t: 'p',
            v: 'A single GitHub repository feeds two paths: GitHub Actions builds images into ECR, while Argo CD synchronises Kubernetes state. Everything that runs then reports into a shared observability layer.'
          },
          {
            t: 'dia',
            label: 'Platform architecture',
            v: [
              '                         ┌─────────────────────────┐',
              '                         │       Developer         │',
              '                         └────────────┬────────────┘',
              '                                      ▼',
              '                              ┌───────────────┐',
              '                              │    GitHub     │',
              '                              │  App + Helm   │',
              '                              │  Kubernetes   │',
              '                              └───────┬───────┘',
              '                         ┌────────────┴────────────┐',
              '                         ▼                         ▼',
              '                  GitHub Actions              Argo CD',
              '                         │                         │',
              '                         │                  GitOps Sync',
              '                         ▼                         │',
              '                       ECR                         │',
              '                         │                         │',
              '                         ▼                         ▼',
              '                    AWS ECS/ECR              Kubernetes',
              '                                                 │',
              '                              ┌──────────────────┼─────────────────┐',
              '                              ▼                  ▼                 ▼',
              '                           Services            Pods              Ingress',
              '                              │                  │                 │',
              '                              └──────────────────┼─────────────────┘',
              '                                                 ▼',
              '                                      ┌─────────────────────┐',
              '                                      │    Observability    │',
              '                                      ├─────────────────────┤',
              '                                      │ CloudWatch          │',
              '                                      │ Prometheus          │',
              '                                      │ Grafana             │',
              '                                      │ Alertmanager        │',
              '                                      │ Loki                │',
              '                                      └──────────┬──────────┘',
              '                                                 ▼',
              '                                      ┌─────────────────────┐',
              '                                      │ Monitoring Dashboard│',
              '                                      └─────────────────────┘'
            ].join('\n')
          },
          { t: 'h', v: 'GitOps repository layout' },
          {
            t: 'dia',
            label: 'Desired state in Git',
            v: [
              'gitops/',
              '│',
              '├── apps/',
              '│   ├── web/',
              '│   │   ├── deployment.yaml',
              '│   │   ├── service.yaml',
              '│   │   └── ingress.yaml',
              '│   ├── api/',
              '│   └── worker/',
              '│',
              '├── infrastructure/',
              '│   ├── ingress/',
              '│   ├── monitoring/',
              '│   ├── cert-manager/',
              '│   └── external-secrets/',
              '│',
              '├── argocd/',
              '│   ├── applications/',
              '│   └── projects/',
              '│',
              '└── environments/',
              '    ├── dev/',
              '    ├── staging/',
              '    └── production/'
            ].join('\n')
          },
          { t: 'h', v: 'High availability' },
          {
            t: 'dia',
            label: 'Multi-AZ production topology',
            v: [
              '                    Internet',
              '                       │',
              '                       ▼',
              '                      ALB',
              '                       │',
              '             ┌─────────┴─────────┐',
              '             ▼                   ▼',
              '          AZ-1                  AZ-2',
              '             │                   │',
              '        EKS Nodes            EKS Nodes',
              '             │                   │',
              '        ┌────┴────┐         ┌────┴────┐',
              '        │         │         │         │',
              '       API       WEB       API       WEB'
            ].join('\n')
          },
          { t: 'h', v: 'Infrastructure as code' },
          {
            t: 'p',
            v: 'Terraform provisions the VPC, EKS, IAM, ECR, RDS, ALB, CloudWatch, S3, security groups, and networking and also the monitoring configuration itself: CloudWatch dashboards, alarms, log groups, and IAM roles.'
          }
        ]
      },
      {
        id: 'devops',
        blocks: [
          {
            t: 'p',
            v: 'A production deployment never touches the cluster directly. The image tag in Git is the only thing that changes.'
          },
          {
            t: 'dia',
            label: 'Automatic deployment flow',
            v: [
              'Developer',
              '    │',
              '    ▼',
              'Push Code',
              '    │',
              '    ▼',
              'GitHub Actions',
              '    │',
              '    ├── Test',
              '    ├── Build',
              '    ├── Security Scan',
              '    └── Docker Build',
              '            │',
              '            ▼',
              '           ECR',
              '            │',
              '            ▼',
              'Update Image Tag',
              '            │',
              '            ▼',
              'GitOps Repository',
              '            │',
              '            ▼',
              '          Argo CD',
              '            │',
              '            ▼',
              '      Kubernetes Sync',
              '            │',
              '            ▼',
              '        New Version'
            ].join('\n')
          },
          { t: 'h', v: 'Deployment health verification' },
          {
            t: 'dia',
            label: 'Every release is evaluated against live metrics',
            v: [
              'Argo CD',
              '   │',
              '   ▼',
              'Deployment',
              '   │',
              '   ▼',
              'Prometheus',
              '   │',
              '   ├── Error Rate',
              '   ├── Latency',
              '   ├── CPU',
              '   └── Memory',
              '   │',
              '   ▼',
              'Health Evaluation',
              '   │',
              '   ├── Healthy   → Continue',
              '   │',
              '   └── Unhealthy → Rollback'
            ].join('\n')
          },
          { t: 'h', v: 'Alert routing' },
          {
            t: 'dia',
            label: 'Alertmanager severity routing',
            v: [
              'Prometheus',
              '     │',
              '     ▼',
              'Alertmanager',
              '     │',
              '     ├── Critical ──► Slack',
              '     │',
              '     ├── Warning ───► Email',
              '     │',
              '     └── Info ──────► Dashboard'
            ].join('\n')
          },
          { t: 'h', v: 'Security controls' },
          {
            t: 'groups',
            v: [
              { h: 'AWS', v: ['IAM least privilege', 'IAM roles', 'GitHub OIDC', 'Private subnets', 'Security groups', 'Secrets Manager'] },
              { h: 'Kubernetes', v: ['RBAC', 'NetworkPolicies', 'Pod Security Standards', 'Service accounts', 'Secrets management'] },
              { h: 'CI/CD', v: ['Trivy container scanning', 'Dependency scanning', 'Secret scanning', 'GitHub OIDC', 'No static AWS keys'] }
            ]
          }
        ]
      },
      {
        id: 'features',
        blocks: [
          {
            t: 'grid',
            v: [
              {
                h: 'AWS infrastructure monitoring',
                p: 'CloudWatch covers EC2, ECS, RDS, ALB, Lambda, S3, EBS, NAT Gateway, Logs, and Container Insights, tracking metrics such as TargetResponseTime, HTTPCode_Target_5XX, and FreeStorageSpace.'
              },
              {
                h: 'Centralised log groups',
                p: 'Application and infrastructure logs collect into structured CloudWatch log groups per service and environment, with search, error filtering, and retention policies.'
              },
              {
                h: 'Kubernetes workload monitoring',
                p: 'Node and pod CPU and memory alongside the signals that actually page an engineer: restarts, pending and failed pods, CrashLoopBackOff, OOMKilled, and replica health.'
              },
              {
                h: 'Application metrics',
                p: 'Prometheus scrapes application exporters for http_requests_total, http_request_duration_seconds, database_connections, queue_depth, and application_errors_total.'
              },
              {
                h: 'Grafana dashboards',
                p: 'A single visualisation layer for infrastructure and application health, from cluster-level utilisation down to per-pod status.'
              },
              {
                h: 'Argo CD application management',
                p: 'Each application is an Argo CD Application exposing sync status, health status, deployment history, Git revision, resource status, and events.'
              },
              {
                h: 'Progressive deployment',
                p: 'Argo Rollouts adds canary and blue/green strategies 10% of traffic, evaluate, then 50%, then 100%, or roll back on error.'
              },
              {
                h: 'Contextual alerting',
                p: 'Alerts carry service, duration, affected pod count, error rate, the recent deployment, a likely cause, and a recommended action rather than a bare threshold breach.'
              },
              {
                h: 'Incident workflow',
                p: 'A threshold breach opens an incident that links straight to CloudWatch Logs, Grafana, Prometheus, Kubernetes, and Argo CD, then closes through a Git commit and an Argo CD sync.'
              },
              {
                h: 'Disaster recovery by design',
                p: 'Manifests, Terraform definitions, Argo CD applications, and monitoring configuration all live as code, with database backups, S3 versioning, and images in ECR.'
              }
            ]
          },
          { t: 'h', v: 'What a useful alert contains' },
          {
            t: 'dia',
            label: 'Example contextual alert',
            v: [
              'HIGH CPU ALERT',
              '',
              'Service:            production-api',
              'CPU:                94%',
              'Duration:           8 minutes',
              'Pods:               3 / 5 affected',
              'Error Rate:         6.2%',
              'Recent Deployment:  v2.8.4',
              '',
              'Possible Cause:',
              'Increased traffic after deployment.',
              '',
              'Recommended Action:',
              'Inspect deployment v2.8.4 and scale API replicas.'
            ].join('\n')
          },
          {
            t: 'note',
            v: 'The values above are an illustrative alert payload from the project specification, included to show the level of context each alert is designed to carry.'
          }
        ]
      },
      {
        id: 'stack',
        blocks: [
          {
            t: 'groups',
            v: [
              {
                h: 'AWS',
                v: ['Amazon EKS', 'Amazon ECR', 'CloudWatch', 'Container Insights', 'ALB', 'RDS PostgreSQL', 'S3', 'IAM', 'VPC', 'Secrets Manager']
              },
              { h: 'Kubernetes', v: ['Kubernetes', 'Helm', 'Ingress', 'RBAC', 'NetworkPolicy'] },
              { h: 'GitOps', v: ['Argo CD', 'Argo Rollouts', 'GitHub'] },
              { h: 'Monitoring', v: ['Prometheus', 'Grafana', 'Alertmanager', 'CloudWatch', 'Loki'] },
              { h: 'Infrastructure', v: ['Terraform'] },
              { h: 'CI/CD', v: ['GitHub Actions', 'Docker', 'Trivy', 'Amazon ECR'] }
            ]
          }
        ]
      },
      {
        id: 'outcomes',
        blocks: [
          {
            t: 'p',
            v: 'The architecture implements a single continuous path from code to confidence: <strong>Infrastructure as Code → CI → Container Security → GitOps → Kubernetes → Observability → Alerting → Automated Recovery</strong>.'
          },
          {
            t: 'quote',
            v: 'Every infrastructure change is traceable through Git, every deployment is managed by Argo CD, and every application and infrastructure component is continuously monitored.'
          },
          { t: 'h', v: 'Design outcomes' },
          {
            t: 'list',
            v: [
              'Infrastructure and Kubernetes signals are correlated, so investigation starts from a root cause rather than a console tour.',
              'Deployment history is a Git history reviewable, attributable, and revertible.',
              'Drift between Git and the cluster is a reported condition that Argo CD can reconcile automatically.',
              'Releases are evaluated against error rate, latency, CPU, and memory before they are promoted.',
              'Recovery is a documented flow: Terraform recreates infrastructure, Argo CD restores applications, backups restore data.'
            ]
          }
        ]
      }
    ]
  };

  /* ---------------------------------------------------------------- 3 of 5 */
  var eksPlatform = {
    slug: 'aws-eks-platform',
    name: 'AWS EKS Platform',
    cardTitle: 'AWS EKS Platform',
    group: 'recent',
    groupLabel: 'Recent Work',
    source: 'Recent_Work/AWS EKS Platform.txt',
    tagline:
      'A reusable, multi-AZ Kubernetes foundation on Amazon EKS with GitOps delivery, layered autoscaling, and self-service application onboarding.',
    goal: 'Build a secure, scalable, observable, and self-service Kubernetes platform on AWS.',
    card: {
      kicker: 'Platform Engineering',
      readTime: '8 min read',
      date: 'Date: 12.24.2023',
      excerpt:
        'Terraform-provisioned EKS across three Availability Zones, with Karpenter, IRSA, Argo CD, and full observability.',
      chips: ['Amazon EKS', 'Terraform', 'Karpenter', 'Argo CD'],
      img: {
        base: 'assets/img/work/work-3',
        w: 1000,
        h: 667,
        alt: 'AWS EKS platform illustration'
      }
    },
    hero: {
      base: 'assets/img/work/work-3',
      w: 1000,
      h: 667,
      alt: 'Isometric illustration of an AWS Kubernetes platform'
    },
    meta: [
      { label: 'Discipline', value: 'Platform Engineering' },
      { label: 'Cloud', value: 'AWS / Amazon EKS' },
      { label: 'Delivery', value: 'Argo CD GitOps' },
      { label: 'Provisioning', value: 'Terraform' }
    ],
    tags: [
      'Amazon EKS',
      'Terraform',
      'Karpenter',
      'HPA',
      'KEDA',
      'Argo CD',
      'Argo Rollouts',
      'Helm',
      'IRSA',
      'External Secrets Operator',
      'AWS Load Balancer Controller',
      'EBS / EFS CSI',
      'RDS PostgreSQL',
      'Prometheus',
      'Grafana',
      'CloudWatch'
    ],
    sections: [
      {
        id: 'overview',
        blocks: [
          {
            t: 'p',
            v: '<strong>AWS EKS Platform</strong> is a production-grade Kubernetes platform built on <strong>Amazon Elastic Kubernetes Service</strong> for running containerised applications with high availability, automated scaling, secure networking, observability, and GitOps-based application delivery.'
          },
          {
            t: 'p',
            v: 'It is designed as a reusable foundation: development teams deploy applications onto it without having to manage the underlying Kubernetes infrastructure themselves.'
          },
          { t: 'quote', v: 'Build a secure, scalable, observable, and self-service Kubernetes platform on AWS.' }
        ]
      },
      {
        id: 'challenge',
        blocks: [
          {
            t: 'p',
            v: 'Kubernetes is straightforward to install and difficult to operate. Without a platform layer, each team ends up solving the same infrastructure problems differently:'
          },
          {
            t: 'list',
            v: [
              '<strong>Every team rebuilds the plumbing.</strong> Networking, ingress, TLS, secrets, storage, autoscaling, and monitoring get reinvented per project, inconsistently.',
              '<strong>Developers need production cluster access.</strong> Deploying by hand means handing out credentials to the environment that matters most.',
              '<strong>Capacity is either wasted or short.</strong> Statically sized node groups pay for headroom that idles, then run out exactly when traffic arrives.',
              '<strong>Secrets end up in manifests.</strong> Without a managed path from a secret store into the cluster, credentials get committed to Git.',
              '<strong>Static AWS keys inside containers.</strong> Long-lived access keys are copied into workloads because per-pod IAM is not wired up.',
              '<strong>Single-AZ fragility.</strong> Workloads scheduled without spread or disruption budgets fail together when one zone or node goes away.',
              '<strong>Environments diverge.</strong> Dev, staging, and production drift apart until a release behaves differently in each one.'
            ]
          }
        ]
      },
      {
        id: 'solution',
        blocks: [
          {
            t: 'p',
            v: 'The platform answers each of those with a default that teams inherit rather than build. Terraform provisions the entire AWS footprint from modules, so the platform can be recreated from code. Argo CD owns what runs inside the cluster. Karpenter, HPA, and KEDA handle capacity at three different layers. IRSA and External Secrets remove static credentials entirely.'
          },
          { t: 'h', v: 'Layered autoscaling' },
          {
            t: 'dia',
            label: 'Traffic scales pods; pods scale nodes',
            v: [
              '                    Application Traffic',
              '                           │',
              '                           ▼',
              '                     HPA / KEDA',
              '                           │',
              '                           ▼',
              '                      More Pods',
              '                           │',
              '                           ▼',
              '                    Cluster Capacity',
              '                           │',
              '                           ▼',
              '                       Karpenter',
              '                           │',
              '                           ▼',
              '                      More EC2 Nodes'
            ].join('\n')
          },
          {
            t: 'p',
            v: 'HPA scales on CPU, memory, and custom metrics; KEDA scales on event-driven signals such as SQS queue length, Kafka lag, RabbitMQ, or Prometheus queries. Karpenter then provisions the EC2 capacity those pods need and consolidates nodes back down when demand falls.'
          },
          { t: 'h', v: 'Self-service, not tickets' },
          {
            t: 'p',
            v: 'A developer starting a new application fills in a template rather than writing Kubernetes primitives. That template generates the Deployment, Service, Ingress, HPA, ServiceAccount, and monitoring wiring, commits it to the GitOps repository, and Argo CD does the rest which is what turns an EKS cluster into an internal developer platform.'
          },
          { t: 'flow', v: ['Application Template', 'GitHub Repository', 'GitOps', 'Argo CD', 'EKS'] }
        ]
      },
      {
        id: 'architecture',
        blocks: [
          {
            t: 'dia',
            label: 'Platform architecture',
            v: [
              '                         ┌──────────────────────┐',
              '                         │      Developers      │',
              '                         └──────────┬───────────┘',
              '                                    ▼',
              '                         ┌──────────────────────┐',
              '                         │       GitHub         │',
              '                         │ Application + GitOps │',
              '                         └──────────┬───────────┘',
              '                    ┌───────────────┴────────────────┐',
              '                    ▼                                ▼',
              '             GitHub Actions                      Argo CD',
              '                    │                                │',
              '                    ▼                                │',
              '                   ECR                               │',
              '                    │                                │',
              '                    └───────────────┬────────────────┘',
              '                                    ▼',
              '                         ┌──────────────────────┐',
              '                         │       AWS EKS        │',
              '                         │ Kubernetes Control   │',
              '                         │ Plane                │',
              '                         └──────────┬───────────┘',
              '              ┌─────────────────────┼──────────────────────┐',
              '              ▼                     ▼                      ▼',
              '          Managed Nodes         Karpenter              Add-ons',
              '              │                     │                      │',
              '       ┌──────┼──────┐              │              ┌──────┼──────┐',
              '       ▼      ▼      ▼              ▼              ▼      ▼      ▼',
              '      Web    API   Worker       EC2 Capacity     CoreDNS  CNI  CSI',
              '                                    │',
              '                                    ▼',
              '                         ┌──────────────────────┐',
              '                         │    AWS Services      │',
              '                         ├──────────────────────┤',
              '                         │ RDS                  │',
              '                         │ S3                   │',
              '                         │ Secrets Manager      │',
              '                         │ CloudWatch           │',
              '                         │ ALB                  │',
              '                         └──────────────────────┘'
            ].join('\n')
          },
          { t: 'h', v: 'Network design' },
          {
            t: 'dia',
            label: 'Multi-AZ VPC with private worker nodes',
            v: [
              '                         Internet',
              '                            │',
              '                            ▼',
              '                       Internet Gateway',
              '                            │',
              '                ┌───────────┴───────────┐',
              '                ▼                       ▼',
              '             Public                  Public',
              '             Subnet                  Subnet',
              '                │                       │',
              '             ALB / NAT              ALB / NAT',
              '                │                       │',
              '                └───────────┬───────────┘',
              '                            ▼',
              '                     Private Subnets',
              '              ┌─────────────┼─────────────┐',
              '              ▼             ▼             ▼',
              '           EKS Node       EKS Node      EKS Node',
              '            AZ-1           AZ-2           AZ-3'
            ].join('\n')
          },
          {
            t: 'list',
            v: [
              'Public subnets carry load balancers and NAT only; worker nodes stay private.',
              'A private RDS subnet group keeps databases off any public path.',
              'NAT Gateways provide controlled outbound traffic, with VPC endpoints where appropriate.',
              'Security groups and network ACLs bound traffic at the AWS layer before Kubernetes policy applies.'
            ]
          },
          { t: 'h', v: 'Infrastructure as code' },
          {
            t: 'dia',
            label: 'Terraform module and environment layout',
            v: [
              'terraform/',
              '│',
              '├── modules/',
              '│   ├── vpc/',
              '│   ├── eks/',
              '│   ├── iam/',
              '│   ├── ecr/',
              '│   ├── rds/',
              '│   ├── monitoring/',
              '│   └── security/',
              '│',
              '└── environments/',
              '    ├── dev/',
              '    ├── staging/',
              '    └── production/'
            ].join('\n')
          },
          {
            t: 'p',
            v: 'Terraform manages the VPC, subnets, NAT gateways, route tables, EKS, IAM, security groups, ECR, RDS, CloudWatch, KMS, S3, load balancers, and EKS add-ons so the platform can be recreated from code.'
          },
          { t: 'h', v: 'Namespace isolation' },
          {
            t: 'dia',
            label: 'Cluster namespaces',
            v: [
              'EKS Cluster',
              '│',
              '├── platform-system',
              '├── monitoring',
              '├── ingress',
              '├── external-secrets',
              '├── development',
              '├── staging',
              '└── production'
            ].join('\n')
          }
        ]
      },
      {
        id: 'devops',
        blocks: [
          {
            t: 'p',
            v: 'CI proves the image; GitOps decides where it runs. Developers never need direct access to a production cluster.'
          },
          {
            t: 'dia',
            label: 'CI/CD architecture',
            v: [
              'Git Push',
              '   │',
              '   ▼',
              'GitHub Actions',
              '   │',
              '   ├── Unit Tests',
              '   ├── Lint',
              '   ├── Dependency Scan',
              '   ├── Docker Build',
              '   ├── Trivy Scan',
              '   └── Push ECR',
              '          │',
              '          ▼',
              '     GitOps Update',
              '          │',
              '          ▼',
              '        Argo CD',
              '          │',
              '          ▼',
              '         EKS',
              '          │',
              '          ▼',
              '     Health Checks',
              '          │',
              '          ├── Healthy → Complete',
              '          │',
              '          └── Failed  → Rollback'
            ].join('\n')
          },
          { t: 'h', v: 'Identity without static keys' },
          {
            t: 'dia',
            label: 'IAM Roles for Service Accounts (IRSA)',
            v: [
              'Pod                        Example scopes',
              ' │                         ─────────────────────',
              ' ▼                         API Pod',
              'Kubernetes ServiceAccount    └── S3 Read/Write',
              ' │',
              ' ▼                         Worker Pod',
              'IAM Role                     └── SQS Send/Receive',
              ' │',
              ' ▼                         Monitoring Pod',
              'AWS API                      └── CloudWatch Read'
            ].join('\n')
          },
          {
            t: 'p',
            v: 'Each workload assumes only the IAM role it needs, so no static AWS access keys are required inside containers. Application credentials follow a parallel path: AWS Secrets Manager → External Secrets Operator → Kubernetes Secret → application.'
          },
          { t: 'h', v: 'Defence in depth' },
          {
            t: 'groups',
            v: [
              { h: 'AWS', v: ['IAM least privilege', 'Security groups', 'Private subnets', 'KMS encryption', 'Secrets Manager', 'CloudTrail', 'GuardDuty', 'AWS WAF'] },
              { h: 'Kubernetes', v: ['RBAC', 'NetworkPolicy', 'Pod Security Standards', 'Non-root containers', 'Resource limits', 'Read-only filesystem'] },
              { h: 'Containers', v: ['Trivy', 'ECR image scanning', 'SBOM', 'Dependency scanning', 'Secret scanning'] }
            ]
          },
          { t: 'h', v: 'Reliability posture' },
          {
            t: 'p',
            v: 'Production workloads run multiple replicas with pod anti-affinity, topology spread constraints, PodDisruptionBudgets, readiness, liveness, and startup probes, and rolling updates. A six-replica API deployment spreads two pods per Availability Zone, so a node or zone loss is a rescheduling event rather than an outage.'
          },
          {
            t: 'dia',
            label: 'Disaster recovery flow',
            v: [
              'Infrastructure Failure',
              '        │',
              '        ▼',
              'Terraform ──► Recreate AWS Infrastructure ──► Create EKS',
              '                                                 │',
              '                                                 ▼',
              '                                     Install Platform Add-ons',
              '                                                 │',
              '                                                 ▼',
              '                                              Argo CD',
              '                                                 │',
              '                                                 ▼',
              '                                       Restore Applications',
              '                                                 │',
              '                                                 ▼',
              '                                        Connect RDS / S3',
              '                                                 │',
              '                                                 ▼',
              '                                       Production Restored'
            ].join('\n')
          }
        ]
      },
      {
        id: 'features',
        blocks: [
          {
            t: 'grid',
            v: [
              {
                h: 'Managed node groups',
                p: 'Separate system and application node groups give predictable baseline capacity, each with its own instance types, capacity type, labels, taints, and scaling limits.'
              },
              {
                h: 'Karpenter provisioning',
                p: 'Pending pods drive just-in-time EC2 provisioning with better instance selection, then consolidation removes unused nodes as demand falls.'
              },
              {
                h: 'HPA and KEDA scaling',
                p: 'Horizontal Pod Autoscaler covers CPU, memory, and custom metrics; KEDA adds event-driven scaling from SQS, Kafka, RabbitMQ, and Prometheus.'
              },
              {
                h: 'ALB ingress with host routing',
                p: 'The AWS Load Balancer Controller maps Kubernetes Ingress to real ALBs with TLS, HTTP to HTTPS redirect, host and path routing, and WAF integration.'
              },
              {
                h: 'Automated TLS',
                p: 'Route 53 and ACM terminate HTTPS at the ALB, with certificate renewal handled by AWS rather than by an operator.'
              },
              {
                h: 'Block and shared storage',
                p: 'The EBS CSI driver backs PersistentVolumeClaims for block storage, while EFS serves workloads that need a shared filesystem across pods.'
              },
              {
                h: 'Managed databases',
                p: 'Application databases sit outside the cluster on Amazon RDS PostgreSQL with Multi-AZ, automated backups, encryption, monitoring, and point-in-time recovery.'
              },
              {
                h: 'Centralised secrets',
                p: 'External Secrets Operator syncs AWS Secrets Manager values into Kubernetes Secrets, so database credentials and API keys never enter Git.'
              },
              {
                h: 'Network policies',
                p: 'Namespace-level policies allow only the paths a workload needs web to api, api to RDS and Redis, worker to SQS and block everything else.'
              },
              {
                h: 'Managed add-on set',
                p: 'VPC CNI, CoreDNS, kube-proxy, EBS CSI, AWS Load Balancer Controller, Karpenter, External Secrets, Metrics Server, Prometheus, Grafana, Argo CD, and Argo Rollouts, installed through Terraform, Helm, and Argo CD.'
              },
              {
                h: 'Cost controls',
                p: 'Karpenter consolidation, Spot capacity, right-sized node groups, HPA, pod requests and limits, scheduled scaling, and EBS lifecycle management.'
              },
              {
                h: 'Self-service onboarding',
                p: 'Application templates generate Deployment, Service, Ingress, HPA, ServiceAccount, and monitoring resources so a new service ships without hand-written Kubernetes YAML.'
              }
            ]
          }
        ]
      },
      {
        id: 'stack',
        blocks: [
          {
            t: 'groups',
            v: [
              {
                h: 'Cloud',
                v: ['AWS', 'Amazon EKS', 'Amazon ECR', 'VPC', 'ALB', 'RDS PostgreSQL', 'S3', 'IAM', 'Secrets Manager', 'CloudWatch', 'KMS', 'WAF', 'Route 53']
              },
              { h: 'Kubernetes', v: ['Kubernetes', 'Helm', 'Karpenter', 'HPA', 'KEDA', 'RBAC', 'NetworkPolicy', 'PodDisruptionBudget'] },
              { h: 'GitOps', v: ['Argo CD', 'Argo Rollouts', 'GitHub'] },
              { h: 'Infrastructure', v: ['Terraform'] },
              { h: 'CI/CD', v: ['GitHub Actions', 'Docker', 'Trivy'] },
              { h: 'Observability', v: ['Prometheus', 'Grafana', 'Alertmanager', 'CloudWatch', 'Loki'] }
            ]
          }
        ]
      },
      {
        id: 'outcomes',
        blocks: [
          {
            t: 'p',
            v: 'The platform composes into a single provisioning and delivery chain: <strong>Terraform → AWS VPC → EKS → Karpenter → Kubernetes → Argo CD → GitHub Actions → ECR → Prometheus → Grafana → CloudWatch</strong>.'
          },
          {
            t: 'quote',
            v: 'Developers should focus on applications. The platform should handle infrastructure, deployment, scaling, security, and observability.'
          },
          { t: 'h', v: 'Design outcomes' },
          {
            t: 'list',
            v: [
              'A reusable Kubernetes foundation, rather than a cluster configured once by hand.',
              'Automated infrastructure provisioning that can rebuild the platform from code after a failure.',
              'GitOps delivery that removes the need for developer access to production clusters.',
              'Dynamic node scaling and workload autoscaling working together instead of competing.',
              'Centralised secrets and per-pod IAM, with no static AWS keys inside containers.',
              'Multi-AZ workload placement with disruption budgets, so node and zone loss is survivable.'
            ]
          },
          { t: 'h', v: 'Reference platform dashboard' },
          {
            t: 'dia',
            label: 'Example cluster health view',
            v: [
              '┌────────────────────────────────────────────────────────┐',
              '│                    EKS PLATFORM                        │',
              '├────────────┬────────────┬────────────┬────────────────┤',
              '│ Nodes      │ Pods       │ CPU        │ Memory         │',
              '│ 12         │ 148        │ 47%        │ 61%            │',
              '├────────────┴────────────┴────────────┴────────────────┤',
              '│ Cluster Health                                         │',
              '│                                                        │',
              '│ Control Plane       ● Healthy                          │',
              '│ Node Groups         ● Healthy                          │',
              '│ Karpenter           ● Healthy                          │',
              '│ CoreDNS             ● Healthy                          │',
              '│ ALB Controller      ● Healthy                          │',
              '│ EBS CSI             ● Healthy                          │',
              '│ Argo CD             ● Healthy                          │',
              '├────────────────────────────────────────────────────────┤',
              '│ Workloads                                              │',
              '│                                                        │',
              '│ Production API      ● 6/6 Pods                         │',
              '│ Production Web      ● 4/4 Pods                         │',
              '│ Worker              ● 3/3 Pods                         │',
              '└────────────────────────────────────────────────────────┘'
            ].join('\n')
          },
          {
            t: 'note',
            v: 'This dashboard is an example view from the platform design, showing which signals the platform surfaces. The numbers are illustrative rather than measurements from a running cluster.'
          }
        ]
      }
    ]
  };

  /* ---------------------------------------------------------------- 4 of 5 */
  var gitopsDelivery = {
    slug: 'gitops-delivery-platform',
    name: 'GitOps Delivery Platform',
    cardTitle: 'GitOps Delivery',
    group: 'recent',
    groupLabel: 'Recent Work',
    source: 'Recent_Work/GitOps_delivery.txt',
    tagline:
      'Git as the deployment control plane: build once, store immutably, deploy through Git, and let Argo CD reconcile continuously.',
    goal: 'Build once → Store immutably → Deploy through Git → Continuously reconcile.',
    card: {
      kicker: 'Continuous Delivery',
      readTime: '7 min read',
      date: 'Date: 12.24.2023',
      excerpt:
        'Immutable images, PR-based promotion, canary analysis, and automated rollback driven entirely from Git.',
      chips: ['Argo CD', 'Argo Rollouts', 'Helm', 'GitHub Actions'],
      img: {
        base: 'assets/img/work/work-2',
        w: 1000,
        h: 667,
        alt: 'GitOps continuous delivery illustration'
      }
    },
    hero: {
      base: 'assets/img/work/work-2',
      w: 1000,
      h: 667,
      alt: 'Isometric illustration of a GitOps continuous delivery pipeline'
    },
    meta: [
      { label: 'Discipline', value: 'Continuous Delivery' },
      { label: 'Cloud', value: 'AWS / Amazon EKS' },
      { label: 'Control plane', value: 'Git + Argo CD' },
      { label: 'Provisioning', value: 'Terraform' }
    ],
    tags: [
      'Argo CD',
      'ApplicationSet',
      'Argo Rollouts',
      'Kubernetes',
      'Helm',
      'Kustomize',
      'GitHub Actions',
      'GitHub OIDC',
      'Docker',
      'Trivy',
      'Amazon ECR',
      'Terraform',
      'External Secrets Operator',
      'Prometheus'
    ],
    sections: [
      {
        id: 'overview',
        blocks: [
          {
            t: 'p',
            v: '<strong>GitOps Delivery Platform</strong> is a production-grade continuous delivery platform that automates application deployments to Kubernetes using <strong>Git as the single source of truth</strong>.'
          },
          {
            t: 'p',
            v: 'It separates application development from deployment operations. Developers push application code to GitHub, CI builds and secures the container image, and the GitOps pipeline updates the desired Kubernetes state. <strong>Argo CD</strong> continuously detects the change and safely synchronises it to the cluster.'
          },
          { t: 'quote', v: 'Build once → Store immutably → Deploy through Git → Continuously reconcile.' }
        ]
      },
      {
        id: 'challenge',
        blocks: [
          {
            t: 'p',
            v: 'Traditional deployment workflows depend on someone running commands at the right moment:'
          },
          {
            t: 'dia',
            label: 'The manual path',
            v: ['Developer', '   ↓', 'Build Docker Image', '   ↓', 'kubectl apply', '   ↓', 'Kubernetes'].join('\n')
          },
          { t: 'p', v: 'That creates a specific and well-known set of problems:' },
          {
            t: 'list',
            v: [
              'Manual deployments',
              'Configuration drift',
              'Poor auditability',
              'Difficult rollback',
              'Environment inconsistencies',
              'Production access requirements',
              'Deployment mistakes',
              'No clear deployment history'
            ]
          },
          {
            t: 'p',
            v: 'The GitOps approach reroutes the same work through a reviewable, reproducible path and Git becomes the deployment control plane.'
          },
          {
            t: 'flow',
            v: ['Developer', 'Git Push', 'CI Pipeline', 'Container Registry', 'GitOps Repository', 'Argo CD', 'Kubernetes']
          }
        ]
      },
      {
        id: 'solution',
        blocks: [
          {
            t: 'p',
            v: 'The platform splits responsibility along a clean line. The application repository holds application code and a CI workflow, and nothing else it does <strong>not</strong> directly control production Kubernetes resources. A separate GitOps repository holds the desired deployment state, and Argo CD is the only thing that writes to the cluster.'
          },
          { t: 'h', v: 'Immutable images, never <code>latest</code>' },
          {
            t: 'p',
            v: 'Deployments reference a content-addressed tag rather than a moving one, so the GitOps repository records exactly which image should run:'
          },
          {
            t: 'dia',
            label: 'Pinned image reference in Git',
            v: [
              'image:',
              '  repository: 759626151611.dkr.ecr.us-east-1.amazonaws.com/my-app',
              '  tag: sha-9f31a72'
            ].join('\n')
          },
          {
            t: 'p',
            v: 'Every deployment is therefore reproducible: the same commit produces the same running state.'
          },
          { t: 'h', v: 'Controlled environment promotion' },
          {
            t: 'dia',
            label: 'One version, three environments, one approval gate',
            v: [
              'v2.4.1',
              '  │',
              '  ├── Development ──► Automatically deployed',
              '  │',
              '  ├── Staging ───────► Automatically deployed',
              '  │',
              '  └── Production ────► Manual approval'
            ].join('\n')
          },
          {
            t: 'p',
            v: 'Development and staging deploy automatically once tests pass. Production requires an explicit approval, which arrives as a pull request review on the GitOps repository rather than as a message in a chat channel.'
          },
          { t: 'h', v: 'A clear separation of layers' },
          {
            t: 'p',
            v: 'Terraform manages cloud infrastructure; Argo CD manages Kubernetes workloads. Keeping those two concerns in separate tools with separate lifecycles is one of the platform’s core architectural principles.'
          }
        ]
      },
      {
        id: 'architecture',
        blocks: [
          {
            t: 'dia',
            label: 'Core architecture',
            v: [
              '                         ┌─────────────────────┐',
              '                         │      Developer      │',
              '                         └──────────┬──────────┘',
              '                                    ▼',
              '                         ┌─────────────────────┐',
              '                         │       GitHub        │',
              '                         │   Application Repo  │',
              '                         └──────────┬──────────┘',
              '                                    ▼',
              '                         ┌─────────────────────┐',
              '                         │   GitHub Actions    │',
              '                         ├─────────────────────┤',
              '                         │ Test                │',
              '                         │ Security Scan       │',
              '                         │ Docker Build        │',
              '                         │ Image Scan          │',
              '                         └──────────┬──────────┘',
              '                                    ▼',
              '                         ┌─────────────────────┐',
              '                         │     Amazon ECR      │',
              '                         │  Immutable Images   │',
              '                         └──────────┬──────────┘',
              '                                    ▼',
              '                         ┌─────────────────────┐',
              '                         │  GitOps Repository  │',
              '                         │                     │',
              '                         │ Helm / Kustomize    │',
              '                         │ Environment Config  │',
              '                         └──────────┬──────────┘',
              '                                    ▼',
              '                         ┌─────────────────────┐',
              '                         │      Argo CD        │',
              '                         │                     │',
              '                         │ Desired vs Actual   │',
              '                         │ State Reconciliation│',
              '                         └──────────┬──────────┘',
              '                                    ▼',
              '                         ┌─────────────────────┐',
              '                         │     Kubernetes      │',
              '                         │ Dev / Staging / Prod│',
              '                         └─────────────────────┘'
            ].join('\n')
          },
          { t: 'h', v: 'GitOps repository layout' },
          {
            t: 'dia',
            label: 'Source of truth for deployment state',
            v: [
              'gitops/',
              '│',
              '├── applications/',
              '│   ├── web/',
              '│   ├── api/',
              '│   └── worker/',
              '│',
              '├── environments/',
              '│   ├── development/',
              '│   ├── staging/',
              '│   └── production/',
              '│',
              '├── infrastructure/',
              '│   ├── ingress/',
              '│   ├── monitoring/',
              '│   ├── cert-manager/',
              '│   └── external-secrets/',
              '│',
              '└── argocd/',
              '    ├── projects/',
              '    ├── applications/',
              '    └── applicationsets/'
            ].join('\n')
          },
          { t: 'h', v: 'Packaging strategy' },
          {
            t: 'p',
            v: 'Applications are packaged with Helm a chart plus per-environment values files which removes duplicated Kubernetes manifests. Kustomize is supported as an alternative through a base and per-environment overlays. Both are demonstrated, but one should be selected as the primary strategy for a given platform.'
          },
          {
            t: 'dia',
            label: 'Helm chart with per-environment values',
            v: [
              'helm/',
              '└── my-app/',
              '    ├── Chart.yaml',
              '    ├── values.yaml',
              '    ├── values-dev.yaml',
              '    ├── values-staging.yaml',
              '    ├── values-production.yaml',
              '    └── templates/',
              '        ├── deployment.yaml',
              '        ├── service.yaml',
              '        ├── ingress.yaml',
              '        └── hpa.yaml'
            ].join('\n')
          },
          { t: 'h', v: 'Infrastructure layer' },
          {
            t: 'p',
            v: 'Terraform provisions the VPC, EKS, IAM, ECR, RDS, ALB, Route 53, CloudWatch, Secrets Manager, and S3 that the delivery platform runs on.'
          }
        ]
      },
      {
        id: 'devops',
        blocks: [
          {
            t: 'p',
            v: 'The pipeline fails fast and early. A build never reaches ECR if tests fail, linting fails, dependency vulnerabilities exceed policy, the Docker build fails, or the container security scan fails.'
          },
          {
            t: 'dia',
            label: 'Full CI/CD workflow',
            v: [
              '                       DEVELOPER',
              '                           │',
              '                           ▼',
              '                     GitHub Push',
              '                           │',
              '                           ▼',
              '                  ┌──────────────────┐',
              '                  │  GitHub Actions  │',
              '                  ├──────────────────┤',
              '                  │ Test             │',
              '                  │ Lint             │',
              '                  │ Security Scan    │',
              '                  │ Docker Build     │',
              '                  │ Trivy Scan       │',
              '                  └────────┬─────────┘',
              '                           ▼',
              '                          ECR',
              '                           │',
              '                           ▼',
              '                    Image Published',
              '                           │',
              '                           ▼',
              '                    GitOps Update',
              '                           │',
              '                           ▼',
              '                     Pull Request',
              '                           │',
              '                    ┌──────┴──────┐',
              '                    ▼             ▼',
              '                  Review        Tests',
              '                    │             │',
              '                    └──────┬──────┘',
              '                           ▼',
              '                         Merge',
              '                           │',
              '                           ▼',
              '                       Argo CD',
              '                           │',
              '                           ▼',
              '                     Kubernetes',
              '                           │',
              '                           ▼',
              '                    Argo Rollouts',
              '                           │',
              '                           ▼',
              '                  Metrics Evaluation',
              '                           │',
              '                ┌──────────┴──────────┐',
              '                ▼                     ▼',
              '             Healthy                Failed',
              '                │                     │',
              '                ▼                     ▼',
              '             Promote               Rollback'
            ].join('\n')
          },
          { t: 'h', v: 'Progressive delivery' },
          {
            t: 'dia',
            label: 'Canary release with health analysis',
            v: [
              '                    Load Balancer',
              '                          │',
              '                ┌─────────┴─────────┐',
              '                ▼                   ▼',
              '          Stable v2.5          Canary v2.6',
              '              90%                  10%',
              '                                    │',
              '                                    ▼',
              '                             Health Analysis',
              '                                    │',
              '                           ┌────────┴────────┐',
              '                           ▼                 ▼',
              '                         Healthy           Failed',
              '                           │                 │',
              '                           ▼                 ▼',
              '                        Increase          Rollback',
              '                        Traffic'
            ].join('\n')
          },
          {
            t: 'p',
            v: 'Argo Rollouts evaluates error rate, HTTP 5xx, latency, CPU, memory, and request success rate at each step. A healthy canary widens from 90/10 to 50% and then 100%; an unhealthy one is rolled back to the previous version without anyone running <code>kubectl rollout undo</code>.'
          },
          { t: 'h', v: 'Security controls' },
          {
            t: 'groups',
            v: [
              { h: 'CI', v: ['Trivy filesystem scanning', 'Trivy container scanning', 'Dependency scanning', 'Secret scanning', 'SBOM generation'] },
              { h: 'AWS', v: ['IAM least privilege', 'GitHub OIDC', 'No static AWS credentials', 'ECR image scanning', 'Private ECR repositories'] },
              { h: 'Kubernetes', v: ['RBAC', 'NetworkPolicy', 'Pod Security Standards', 'Non-root containers', 'Read-only filesystem', 'Resource limits'] }
            ]
          },
          {
            t: 'p',
            v: 'Secrets are never committed. Git holds a secret <em>reference</em>; External Secrets Operator resolves it from AWS Secrets Manager into a Kubernetes Secret at runtime.'
          }
        ]
      },
      {
        id: 'features',
        blocks: [
          {
            t: 'grid',
            v: [
              {
                h: 'Immutable image tags',
                p: 'Deployments pin a version or commit SHA rather than a floating tag, so the running state is always reproducible from Git.'
              },
              {
                h: 'ApplicationSet scaling',
                p: 'Instead of hand-creating dozens of Argo CD Applications, ApplicationSet generates them across every application and environment combination.'
              },
              {
                h: 'Helm and Kustomize',
                p: 'A chart with per-environment values files, or a base with per-environment overlays either way, environment configuration stops being copied manifests.'
              },
              {
                h: 'Pull-request deployment',
                p: 'Production changes arrive through a PR, giving peer review, an audit trail, change history, an approval workflow, and an easy rollback path.'
              },
              {
                h: 'Automated image update',
                p: 'A new build opens a GitOps pull request that changes only the image tag, which is what triggers the deployment.'
              },
              {
                h: 'Canary and blue/green',
                p: 'Argo Rollouts shifts a small slice of traffic to the new version, analyses it, and only then promotes or rolls back automatically.'
              },
              {
                h: 'Metrics-aware rollback',
                p: 'Prometheus error rate, latency, CPU, and memory feed the promotion decision, so a bad release is caught by data rather than by a user report.'
              },
              {
                h: 'Drift detection',
                p: 'When the cluster diverges from Git replicas changed by hand, for example Argo CD reports OutOfSync with the reason, and can restore the Git-defined state.'
              },
              {
                h: 'Traceable release history',
                p: 'Each release records its commit, environment, deploy time, duration, status, and who or what deployed it, including the reason for any rollback.'
              },
              {
                h: 'Git-based disaster recovery',
                p: 'Because desired state lives in Git, a destroyed cluster is rebuilt by Terraform, re-bootstrapped with Argo CD, and repopulated from the GitOps repository.'
              }
            ]
          },
          { t: 'h', v: 'Deployment history, as recorded' },
          {
            t: 'dia',
            label: 'Example release log',
            v: [
              'v2.8.1',
              '├── Commit: 8af31d2',
              '├── Environment: Production',
              '├── Deployed: 10:42 UTC',
              '├── Duration: 3m 21s',
              '├── Status: Successful',
              '└── Deployed by: GitOps',
              '',
              'v2.8.0',
              '├── Commit: 7bc92a1',
              '├── Environment: Production',
              '├── Status: Rolled Back',
              '└── Reason: High HTTP 5xx'
            ].join('\n')
          },
          {
            t: 'note',
            v: 'Versions, commit hashes, and timings above are illustrative entries from the project specification, included to show what the platform records for every release.'
          }
        ]
      },
      {
        id: 'stack',
        blocks: [
          {
            t: 'groups',
            v: [
              { h: 'Cloud', v: ['AWS', 'EKS', 'ECR', 'VPC', 'ALB', 'RDS', 'S3', 'IAM', 'Secrets Manager', 'CloudWatch'] },
              { h: 'GitOps', v: ['Argo CD', 'Argo Rollouts', 'ApplicationSet'] },
              { h: 'Kubernetes', v: ['Kubernetes', 'Helm', 'Kustomize', 'Ingress', 'RBAC', 'NetworkPolicy'] },
              { h: 'CI/CD', v: ['GitHub Actions', 'Docker', 'Trivy', 'ECR'] },
              { h: 'Infrastructure', v: ['Terraform'] },
              { h: 'Observability', v: ['Prometheus', 'Grafana', 'Alertmanager', 'CloudWatch'] }
            ]
          }
        ]
      },
      {
        id: 'outcomes',
        blocks: [
          {
            t: 'p',
            v: 'The platform turns application releases into a controlled, auditable workflow: <strong>Code → CI → Security Scan → Container → ECR → GitOps PR → Argo CD → Kubernetes → Canary → Observability → Promotion / Rollback</strong>.'
          },
          {
            t: 'p',
            v: 'Instead of engineers manually deploying applications to production, Git defines the desired state and Argo CD continuously reconciles the cluster with that state.'
          },
          { t: 'h', v: 'Design outcomes' },
          {
            t: 'stats',
            v: [
              { k: 'Deployment', v: 'Automated' },
              { k: 'Change record', v: 'Auditable' },
              { k: 'Releases', v: 'Reproducible' },
              { k: 'Credentials', v: 'Secure' },
              { k: 'Rollouts', v: 'Observable' },
              { k: 'Drift', v: 'Self-healing' }
            ]
          },
          {
            t: 'list',
            v: [
              'Nobody needs production cluster credentials to ship a release.',
              'Every production change has a reviewer, a commit, and a revert path.',
              'The same artefact promotes through development, staging, and production unchanged.',
              'A failing release is detected from live metrics and rolled back without human intervention.',
              'Manual changes to the cluster are reported as drift instead of silently persisting.'
            ]
          }
        ]
      }
    ]
  };

  /* ---------------------------------------------------------------- 5 of 5 */
  var ecsPlatform = {
    slug: 'multi-app-ecs-platform',
    name: 'Multi-Application AWS ECS Deployment Platform',
    cardTitle: 'Multi-App ECS Platform',
    group: 'recent',
    groupLabel: 'Recent Work',
    source: 'Recent_Work/Developer_Platform.txt',
    tagline:
      'One shared, Terraform-managed ECS platform hosting many independent applications behind a single load-balancing layer with an honest account of what "zero downtime" can and cannot mean.',
    goal:
      'Host multiple applications without creating a completely separate AWS infrastructure stack for every application.',
    card: {
      kicker: 'Shared Platform',
      readTime: '8 min read',
      date: 'Date: 12.24.2023',
      excerpt:
        'A shared ECS platform where each application onboards as data, deploys through OIDC, and rolls out without intentional downtime.',
      chips: ['Amazon ECS', 'Terraform', 'ALB + ACM', 'GitHub OIDC'],
      img: {
        base: 'assets/img/projects/featured-2',
        w: 1400,
        h: 933,
        alt: 'Internal developer platform illustration'
      }
    },
    hero: {
      base: 'assets/img/projects/featured-2',
      w: 1400,
      h: 933,
      alt: 'Isometric illustration of a multi-application deployment platform'
    },
    meta: [
      { label: 'Discipline', value: 'Platform Engineering' },
      { label: 'Cloud', value: 'AWS' },
      { label: 'Runtime', value: 'Amazon ECS on EC2' },
      { label: 'Provisioning', value: 'Terraform' }
    ],
    tags: [
      'Terraform',
      'Amazon ECS',
      'Amazon EC2',
      'Amazon ECR',
      'Application Load Balancer',
      'AWS ACM',
      'Cloudflare DNS',
      'GitHub Actions',
      'GitHub OIDC',
      'IAM',
      'CloudWatch',
      'Amazon S3',
      'Docker'
    ],
    sections: [
      {
        id: 'overview',
        blocks: [
          {
            t: 'p',
            v: 'This project describes a production-grade AWS platform for running <strong>multiple independent applications on a shared Amazon ECS platform</strong>, provisioned entirely with Terraform and deployed through GitHub Actions using GitHub OIDC.'
          },
          {
            t: 'p',
            v: 'The design philosophy is a division of labour between tools: <strong>infrastructure is created by Terraform, application images are built by GitHub Actions, images are stored in ECR, and ECS runs each application independently behind a shared load-balancing layer.</strong>'
          },
          {
            t: 'quote',
            v: 'Host multiple applications without creating a completely separate AWS infrastructure stack for every application.'
          },
          {
            t: 'note',
            v: 'This is a proposed target architecture documented end to end, including its failure scenarios and its limitations, rather than a report on an already-running production estate.'
          }
        ]
      },
      {
        id: 'challenge',
        blocks: [
          {
            t: 'p',
            v: 'The common pattern for hosting several applications is to give each one its own server and its own deployment ritual:'
          },
          {
            t: 'dia',
            label: 'A stack per application',
            v: [
              'Application 1        Application 2        Application 3',
              '     ↓                    ↓                    ↓',
              'EC2 + Docker         EC2 + Docker         EC2 + Docker'
            ].join('\n')
          },
          { t: 'p', v: 'That approach carries a predictable set of costs:' },
          {
            t: 'list',
            v: [
              '<strong>Duplicated infrastructure.</strong> Every application brings its own load balancer, certificate, DNS wiring, logging, and IAM setup, configured slightly differently each time.',
              '<strong>Nothing replaces a failed container.</strong> With Docker on a bare instance, a crashed container stays down until someone notices.',
              '<strong>Deployments interrupt service.</strong> Stopping the old container before the new one is healthy produces a visible gap for users.',
              '<strong>Long-lived AWS keys in CI.</strong> Static access keys stored as repository secrets are the default, and they never expire on their own.',
              '<strong>Onboarding is a project.</strong> Adding an application means hand-writing infrastructure rather than declaring a configuration.',
              '<strong>No shared operational baseline.</strong> Health checks, logging, and TLS quality depend on who set that particular application up.'
            ]
          }
        ]
      },
      {
        id: 'solution',
        blocks: [
          {
            t: 'p',
            v: 'A single ECS cluster runs every application as its own ECS service. One Application Load Balancer fronts them all and routes by hostname to a per-application target group. ECS not a person becomes responsible for scheduling and replacing application containers.'
          },
          {
            t: 'dia',
            label: 'Shared platform, independent applications',
            v: [
              '                         Internet',
              '                            │',
              '                            ▼',
              '                       Cloudflare',
              '                            │',
              '                            ▼',
              '                    Application Load',
              '                       Balancer',
              '                            │',
              '              ┌─────────────┼─────────────┐',
              '              ▼             ▼             ▼',
              '          App 1 Target   App 2 Target   App 3 Target',
              '              │             │             │',
              '              └─────────────┼─────────────┘',
              '                            ▼',
              '                       ECS Cluster',
              '                    ┌───────────────┐',
              '                    ▼               ▼',
              '                 EC2 #1          EC2 #2',
              '                 ECS Host        ECS Host',
              '                    │               │',
              '             ┌──────┼───────┐ ┌─────┼──────┐',
              '             ▼      ▼       ▼ ▼     ▼      ▼',
              '            App1   App2   App3 App1  App2 App3'
            ].join('\n')
          },
          { t: 'h', v: 'Applications become data' },
          {
            t: 'p',
            v: 'Onboarding an application is a Terraform variable, not a new module. A definition declares what the platform needs to know, and Terraform generates the required AWS resources by iterating over the map:'
          },
          {
            t: 'dia',
            label: 'Application definition',
            v: [
              'application:',
              '    name',
              '    domain',
              '    image',
              '    container_port',
              '    cpu',
              '    memory',
              '    desired_count',
              '    health_check_path',
              '    environment',
              '    secrets'
            ].join('\n')
          },
          {
            t: 'p',
            v: 'This makes the infrastructure data-driven: instead of writing resources for <code>app-one</code>, <code>app-two</code>, and <code>app-three</code> separately, one module generates them all from their definitions.'
          },
          { t: 'h', v: 'How rolling deployment avoids a gap' },
          {
            t: 'p',
            v: 'The mechanism is deliberately unglamorous multiple healthy tasks, ALB health checks, ECS rolling deployment, and the right deployment configuration:'
          },
          {
            t: 'dia',
            label: 'Deployment configuration',
            v: ['minimum healthy percentage = 100', 'maximum percentage       = 200'].join('\n')
          },
          {
            t: 'p',
            v: 'With a desired count of two, ECS starts tasks 3 and 4 before stopping tasks 1 and 2. The ALB only sends traffic to healthy targets, so traffic moves to the new version once it passes health checks, and the old tasks are then removed. At no point should ECS intentionally remove all healthy tasks before the replacement becomes healthy.'
          },
          {
            t: 'note',
            v: 'Zero downtime does not mean absolute zero downtime. No infrastructure can honestly guarantee absolute zero downtime under every failure condition. The realistic target this design commits to is: no intentional downtime during normal application deployments, and high availability during individual task or instance failures.'
          }
        ]
      },
      {
        id: 'architecture',
        blocks: [
          {
            t: 'dia',
            label: 'Final target architecture',
            v: [
              '                              INTERNET',
              '                                  │',
              '                                  ▼',
              '                              CLOUDFLARE',
              '                                  │',
              '                                  ▼',
              '                           AWS APPLICATION',
              '                           LOAD BALANCER',
              '                             HTTPS :443',
              '                                  │',
              '                         ACM TLS Certificate',
              '                                  │',
              '                ┌─────────────────┼─────────────────┐',
              '                ▼                 ▼                 ▼',
              '             App A             App B             App C',
              '          Target Group       Target Group       Target Group',
              '                │                 │                 │',
              '                └─────────────────┼─────────────────┘',
              '                                  ▼',
              '                           ECS CLUSTER',
              '                                  │',
              '                         Capacity Provider',
              '                                  │',
              '                          Auto Scaling Group',
              '                                  │',
              '                    ┌─────────────┴─────────────┐',
              '                    ▼                           ▼',
              '                 ECS EC2 #1                  ECS EC2 #2',
              '                    │                           │',
              '              ┌─────┼─────┐               ┌─────┼─────┐',
              '              ▼     ▼     ▼               ▼     ▼     ▼',
              '             AppA  AppB  AppC            AppA  AppB  AppC',
              '',
              '                          APPLICATION DATA',
              '                                  │',
              '                    ┌─────────────┼─────────────┐',
              '                    ▼             ▼             ▼',
              '                 Database A    Database B    Database C',
              '                    │             │             │',
              '                    └─────────────┼─────────────┘',
              '                                  ▼',
              '                            Backup System',
              '                                  │',
              '                                  ▼',
              '                             Backup EC2',
              '                                  │',
              '                                  ▼',
              '                              Amazon S3'
            ].join('\n')
          },
          { t: 'h', v: 'Supporting infrastructure' },
          {
            t: 'dia',
            label: 'Certificates, logging, and identity',
            v: [
              '                  AWS',
              '                   │',
              '       ┌───────────┼────────────┐',
              '       ▼           ▼            ▼',
              '      ACM        CloudWatch    IAM',
              '       │           │',
              '       ▼           ▼',
              '     HTTPS       Logs/Metrics'
            ].join('\n')
          },
          { t: 'h', v: 'Placement and capacity' },
          {
            t: 'list',
            v: [
              'Two ECS EC2 hosts, managed by an Auto Scaling Group through a capacity provider, so instance replacement is automatic.',
              'A placement strategy spreads each application’s tasks across both instances rather than stacking them on one.',
              'Every application runs on both hosts, so losing one instance degrades capacity rather than removing a service.',
              'Application databases are separated per application, with a dedicated backup path to S3.'
            ]
          },
          { t: 'h', v: 'Terraform-owned resources' },
          {
            t: 'p',
            v: 'Terraform provisions the VPC and networking, Internet Gateway, ALB and listeners, host-based routing rules, ECS cluster and services, EC2 capacity, ECR repositories, IAM roles and policies, ACM certificates with DNS validation, Cloudflare DNS records, and CloudWatch log groups with outputs exposing the values applications and pipelines need.'
          }
        ]
      },
      {
        id: 'devops',
        blocks: [
          {
            t: 'p',
            v: 'Infrastructure and application deployment are separated on purpose. Terraform runs when the platform changes; GitHub Actions runs when an application changes. A routine application release never touches Terraform.'
          },
          {
            t: 'dia',
            label: 'Application delivery path',
            v: [
              'GitHub',
              '   │  Private Repository',
              '   ▼',
              'GitHub Actions',
              '   │  OIDC Authentication',
              '   ▼',
              'AWS IAM Role',
              '   │',
              '   ▼',
              'Amazon ECR',
              '   │  Docker Images',
              '   ▼',
              'Amazon ECS',
              '   │',
              '   ├── App 1 ECS Service',
              '   ├── App 2 ECS Service',
              '   ├── App 3 ECS Service',
              '   └── App N ECS Service',
              '            │',
              '            ▼',
              '     Application Load Balancer',
              '            │',
              '            ▼',
              '        Cloudflare DNS',
              '            │',
              '            ▼',
              '          Internet'
            ].join('\n')
          },
          { t: 'h', v: 'Why OIDC rather than static keys' },
          {
            t: 'p',
            v: 'GitHub Actions assumes an AWS IAM role through GitHub OIDC, using an IAM trust relationship scoped to the specific repository. There are no long-lived AWS access keys stored as repository secrets, and no credentials to rotate or leak.'
          },
          { t: 'h', v: 'Health checks are the contract' },
          {
            t: 'p',
            v: 'Each application exposes a health check path that the ALB polls. That single endpoint decides whether a new task receives traffic, whether a deployment proceeds, and whether an unhealthy task is replaced which makes health check design a first-class part of onboarding rather than an afterthought.'
          },
          { t: 'h', v: 'Documented failure scenarios' },
          {
            t: 'grid',
            v: [
              { h: 'Docker build failure', p: 'The pipeline stops before anything reaches ECR. Production continues running the previous image.' },
              { h: 'ECR push failure', p: 'No new image exists, so ECS is never asked to deploy one. The running service is unaffected.' },
              { h: 'New ECS task fails', p: 'The new task never becomes healthy, so the ALB never routes to it and the old tasks keep serving traffic.' },
              { h: 'EC2 instance failure', p: 'The Auto Scaling Group replaces the instance and ECS reschedules its tasks onto healthy capacity.' },
              { h: 'ALB health check failure', p: 'The target is removed from rotation and replaced, rather than continuing to receive requests it cannot serve.' },
              { h: 'Database failure', p: 'Recovery relies on the documented backup path a dedicated backup server with retention, and copies in Amazon S3.' }
            ]
          },
          { t: 'h', v: 'Operational baseline' },
          {
            t: 'list',
            v: [
              'Application logs stream to CloudWatch log groups per application and environment.',
              'ACM certificates validate through DNS and renew automatically.',
              'Cloudflare fronts the ALB for DNS, with Terraform managing the records.',
              'Secrets and environment configuration are injected per task definition rather than baked into images.',
              'Database backups run on a schedule with a defined retention window and off-instance copies in S3.'
            ]
          }
        ]
      },
      {
        id: 'features',
        blocks: [
          {
            t: 'grid',
            v: [
              {
                h: 'Shared ALB, host-based routing',
                p: 'One load balancer and one ACM certificate serve every application, with listener rules routing each hostname to its own target group.'
              },
              {
                h: 'Independent ECS services',
                p: 'Each application scales, deploys, and fails on its own schedule; a bad release in one service does not stop the others.'
              },
              {
                h: 'Rolling deployment without intentional downtime',
                p: 'Minimum healthy 100% and maximum 200% let ECS bring new tasks up and prove them healthy before old tasks are removed.'
              },
              {
                h: 'Task spread across instances',
                p: 'A placement strategy distributes each application across both ECS hosts so no single instance is a single point of failure for a service.'
              },
              {
                h: 'Immutable image tags',
                p: 'Images are built once, tagged immutably, and stored in ECR, so the deployed artefact is always identifiable.'
              },
              {
                h: 'Keyless CI/CD',
                p: 'GitHub Actions authenticates to AWS through OIDC against a repository-scoped IAM role no static AWS credentials anywhere in the pipeline.'
              },
              {
                h: 'Data-driven onboarding',
                p: 'A new application is a Terraform map entry with a domain, port, CPU, memory, task count, and health check path.'
              },
              {
                h: 'Automated TLS and DNS',
                p: 'ACM issues and renews certificates through DNS validation, while Terraform manages the Cloudflare records that point at the ALB.'
              },
              {
                h: 'Per-application logging',
                p: 'CloudWatch log groups are created per application and environment, so investigation starts in the right place.'
              },
              {
                h: 'Backup and recovery path',
                p: 'A dedicated backup server captures database backups with a retention policy, and copies land in Amazon S3 for off-instance durability.'
              }
            ]
          },
          { t: 'h', v: 'Example multi-app configuration' },
          {
            t: 'dia',
            label: 'Terraform iterates over application definitions',
            v: [
              'applications = {',
              '  app1 = {',
              '    domain          = "app1.example.com"',
              '    container_port  = 3000',
              '    cpu             = 512',
              '    memory          = 1024',
              '    desired_count   = 2',
              '    health_check    = "/health"',
              '  }',
              '',
              '  api = {',
              '    domain          = "api.example.com"',
              '    container_port  = 5000',
              '    cpu             = 1024',
              '    memory          = 2048',
              '    desired_count   = 2',
              '    health_check    = "/health"',
              '  }',
              '}'
            ].join('\n')
          }
        ]
      },
      {
        id: 'stack',
        blocks: [
          {
            t: 'groups',
            v: [
              { h: 'Cloud', v: ['AWS', 'Amazon ECS', 'Amazon EC2', 'Amazon ECR', 'Application Load Balancer', 'AWS ACM', 'CloudWatch', 'Amazon S3', 'IAM', 'VPC'] },
              { h: 'Infrastructure', v: ['Terraform', 'Terraform Modules', 'Auto Scaling Group', 'Capacity Provider'] },
              { h: 'Containers', v: ['Docker', 'ECS Task Definitions', 'ECR Image Tagging'] },
              { h: 'CI/CD', v: ['GitHub Actions', 'GitHub OIDC', 'Private GitHub Repository'] },
              { h: 'Networking &amp; DNS', v: ['Cloudflare DNS', 'Host-based routing', 'Security groups', 'HTTPS / TLS'] },
              { h: 'Operations', v: ['CloudWatch Logs', 'CloudWatch Metrics', 'Database backups', 'S3 backup storage'] }
            ]
          }
        ]
      },
      {
        id: 'outcomes',
        blocks: [
          {
            t: 'p',
            v: 'The result is <strong>a Terraform-managed, multi-application Amazon ECS platform running on highly available EC2 capacity, fronted by an Application Load Balancer and ACM-managed HTTPS, integrated with Cloudflare DNS, and deployed through GitHub Actions using secure GitHub OIDC authentication.</strong>'
          },
          {
            t: 'quote',
            v: 'The infrastructure becomes a platform rather than a one-time deployment.'
          },
          { t: 'h', v: 'Four principles the design is measured against' },
          {
            t: 'grid',
            v: [
              { h: 'Infrastructure as Code', p: 'Every AWS resource is defined in Terraform, so the platform is reviewable, repeatable, and recoverable from code.' },
              { h: 'Immutable application deployment', p: 'Images are built once and deployed by tag, so what runs in production is exactly what CI produced.' },
              { h: 'Secure CI/CD', p: 'GitHub OIDC replaces static AWS credentials, scoped to a single repository and role.' },
              { h: 'High availability', p: 'Multiple tasks per application across multiple instances, with ALB health checks deciding what receives traffic.' }
            ]
          },
          { t: 'h', v: 'Design outcomes' },
          {
            t: 'list',
            v: [
              'Onboarding a new application means declaring a configuration, not building infrastructure.',
              'Applications share a load-balancing, TLS, logging, and identity baseline instead of each inventing one.',
              'Normal deployments carry no intentional downtime, and failed releases never receive traffic.',
              'Instance and task failures are absorbed by the Auto Scaling Group and ECS rather than by an on-call engineer.',
              'The CI/CD path holds no long-lived AWS credentials at any point.'
            ]
          },
          {
            t: 'note',
            v: 'The source specification is explicit about its own limits: absolute zero downtime cannot be honestly guaranteed under every failure condition, and several improvements private ECS instances, Secrets Manager integration, separate per-environment accounts, and automated rollback are documented as recommended next steps rather than as delivered work.'
          }
        ]
      }
    ]
  };

  /* --------------------------------------------------------------- 6 of 12 */
  var jenkinsAgentPlatform = {
    slug: 'production-jenkins-agent',
    name: 'Production Jenkins Agent &amp; CI/CD',
    cardTitle: 'Production Jenkins Agent',
    group: 'case',
    groupLabel: 'Case Study',
    source: 'All case studies/Production Jenkins_Agent.txt',
    tagline:
      'A production Jenkins platform built around dedicated build agents, Docker and BuildKit integration, controlled permissions, and pipelines with explicit failure boundaries.',
    goal:
      'Move beyond a basic Jenkins setup and build a scalable, isolated, and reliable CI/CD environment capable of handling containerised application builds without overloading the Jenkins controller.',
    hero: {
      base: 'assets/img/knowledge/knowledge-1',
      w: 612,
      h: 459,
      alt: 'Illustration of a Jenkins and Docker continuous integration pipeline'
    },
    meta: [
      { label: 'Discipline', value: 'CI/CD Platform Engineering' },
      { label: 'Automation', value: 'Jenkins' },
      { label: 'Builds', value: 'Docker Buildx / BuildKit' },
      { label: 'Delivery', value: 'Container Registry' }
    ],
    tags: [
      'Jenkins',
      'Jenkins Agents',
      'Docker',
      'Docker Buildx',
      'BuildKit',
      'GitHub',
      'CI/CD',
      'Linux',
      'Docker Registry',
      'Pipeline as Code',
      'Shell',
      'YAML'
    ],
    sections: [
      {
        id: 'overview',
        blocks: [
          {
            t: 'p',
            v: 'Designed and optimised a production-ready <strong>Jenkins CI/CD platform</strong> with dedicated build agents, Docker and BuildKit integration, secure permissions, and reliable pipeline execution.'
          },
          {
            t: 'p',
            v: 'The goal was to move beyond a basic Jenkins setup and build a <strong>scalable, isolated, and reliable CI/CD environment</strong> capable of handling containerised application builds without overloading the Jenkins controller.'
          },
          {
            t: 'quote',
            v: 'The Jenkins controller handles orchestration while dedicated agents perform resource-intensive workloads.'
          }
        ]
      },
      {
        id: 'challenge',
        blocks: [
          {
            t: 'p',
            v: 'A production Jenkins environment becomes unreliable when the controller is responsible for everything from pipeline orchestration to Docker builds. The recurring problems were:'
          },
          {
            t: 'list',
            v: [
              'Jenkins controller resource contention.',
              'Unreliable or incorrectly labelled build agents.',
              'Docker socket permission issues.',
              'Slow container builds.',
              'Build failures caused by inconsistent environments.',
              'BuildKit configuration and connectivity problems.',
              'Poor separation between controller and workload execution.',
              'Pipeline failures that were difficult to diagnose.',
              'Excessive resource consumption during parallel builds.'
            ]
          }
        ]
      },
      {
        id: 'architecture',
        blocks: [
          {
            t: 'p',
            v: 'Work moves in one direction, and the controller never performs the build itself:'
          },
          {
            t: 'flow',
            v: [
              'GitHub',
              'Jenkins Controller',
              'Dedicated Build Agent',
              'BuildKit',
              'Docker Image',
              'Registry',
              'Deployment'
            ]
          },
          { t: 'h', v: 'Core components' },
          {
            t: 'list',
            v: [
              '<strong>Jenkins Controller</strong> pipeline orchestration and job management.',
              '<strong>Jenkins Build Agents</strong> isolated execution environments.',
              '<strong>Docker CLI</strong> container image management.',
              '<strong>Docker Buildx</strong> advanced container builds.',
              '<strong>BuildKit</strong> faster and more efficient image building.',
              '<strong>GitHub</strong> source-code management and webhook integration.',
              '<strong>Container Registry</strong> image storage and versioning.',
              '<strong>Jenkins Pipeline</strong> the automated CI/CD workflow itself.'
            ]
          },
          {
            t: 'dia',
            label: 'Example CI/CD flow',
            v: [
              'Developer',
              '   │',
              '   ▼',
              'GitHub',
              '   │',
              '   ▼',
              'Jenkins Controller',
              '   │',
              '   ├── Validate',
              '   ├── Test',
              '   └── Select Build Agent',
              '           │',
              '           ▼',
              '     Jenkins Build Agent',
              '           │',
              '           ├── Docker',
              '           ├── Buildx',
              '           └── BuildKit',
              '           │',
              '           ▼',
              '      Build Docker Image',
              '           │',
              '           ▼',
              '      Security Scan',
              '           │',
              '           ▼',
              '      Container Registry',
              '           │',
              '           ▼',
              '        Deployment'
            ].join('\n')
          }
        ]
      },
      {
        id: 'solution',
        blocks: [
          { t: 'h', v: 'Dedicated Jenkins agents' },
          {
            t: 'p',
            v: 'Created dedicated agents for CI workloads instead of running builds directly on the Jenkins controller, which let Jenkins scale build capacity independently of orchestration.'
          },
          {
            t: 'list',
            v: [
              'Agent labels.',
              'Executor limits.',
              'Resource allocation.',
              'Workspace isolation.',
              'Agent connectivity.',
              'Build-specific environments.'
            ]
          },
          { t: 'h', v: 'Docker and BuildKit integration' },
          {
            t: 'p',
            v: 'Integrated Docker tooling into the build environment and configured BuildKit and Buildx for modern container builds. The build architecture supported:'
          },
          {
            t: 'list',
            v: [
              'Docker image builds.',
              'Buildx.',
              'BuildKit.',
              'Layer caching.',
              'Parallel build operations.',
              'Multi-stage Dockerfiles.',
              'Registry authentication.',
              'Image tagging.'
            ]
          },
          { t: 'h', v: 'Pipeline reliability' },
          {
            t: 'p',
            v: 'Pipelines were built with clear stages, so a failure identifies itself by the boundary it stops at:'
          },
          {
            t: 'flow',
            v: ['Checkout', 'Validate', 'Test', 'Security Scan', 'Build', 'Push', 'Deploy']
          },
          {
            t: 'list',
            v: [
              'Explicit agent selection.',
              'Environment validation.',
              'Build timeouts.',
              'Cleanup steps.',
              'Artifact handling.',
              'Failure diagnostics.',
              'Docker image verification.',
              'Workspace cleanup.'
            ]
          }
        ]
      },
      {
        id: 'devops',
        blocks: [
          { t: 'h', v: 'Jenkins permissions and security' },
          {
            t: 'p',
            v: 'Resolved the permission problems that sit between Jenkins, Docker, and the underlying host the class of problem usually worked around rather than fixed.'
          },
          {
            t: 'list',
            v: [
              'Least-privilege access.',
              'Docker socket permissions.',
              'Jenkins user and group configuration.',
              'Credential isolation.',
              'Registry authentication.',
              'Secret management.',
              '<strong>No hard-coded credentials in pipelines.</strong>'
            ]
          },
          { t: 'h', v: 'Build optimisation' },
          {
            t: 'list',
            v: [
              'Docker layer caching.',
              'BuildKit.',
              'Efficient Dockerfile layer ordering.',
              'Multi-stage builds.',
              'Reduced build context.',
              'Dependency caching.',
              'Reusable build environments.',
              'Workspace cleanup.'
            ]
          },
          { t: 'h', v: 'Real-world problems solved' },
          {
            t: 'grid',
            v: [
              {
                h: 'Jenkins agent label failure',
                p: 'Pipelines requested a buildx-agent, but Jenkins could not find an available agent with that label. Standardised agent labels and pipeline declarations so workloads were scheduled onto the correct build environment.'
              },
              {
                h: 'Docker permission denied',
                p: 'The agent could execute Docker commands, but Docker returned permission errors when accessing the daemon. Reviewed the Jenkins runtime user, Docker group membership, socket ownership, and agent execution environment to establish controlled Docker access.'
              },
              {
                h: 'BuildKit connectivity',
                p: 'BuildKit was available as a separate service, but builds were unreliable when the builder endpoint was misconfigured. Created a consistent builder configuration and validated connectivity before running production builds.'
              },
              {
                h: 'Controller overload',
                p: 'Large Docker builds running directly on Jenkins reduced controller responsiveness. Moved resource-intensive workloads to dedicated agents while keeping the controller focused on orchestration.'
              }
            ]
          }
        ]
      },
      {
        id: 'stack',
        blocks: [
          {
            t: 'groups',
            v: [
              { h: 'CI/CD', v: ['Jenkins', 'Jenkins Agents', 'Jenkins Pipeline', 'Pipeline as Code'] },
              { h: 'Containers', v: ['Docker', 'Docker Buildx', 'BuildKit', 'Docker Registry'] },
              { h: 'Source', v: ['GitHub', 'Webhooks'] },
              { h: 'Platform', v: ['Linux', 'Shell', 'YAML'] }
            ]
          }
        ]
      },
      {
        id: 'outcomes',
        blocks: [
          {
            t: 'p',
            v: 'The resulting architecture provided a cleaner separation between <strong>CI orchestration and build execution</strong>, making Jenkins easier to operate and scale.'
          },
          { t: 'h', v: 'Key outcomes' },
          {
            t: 'list',
            v: [
              'More reliable Jenkins pipelines.',
              'Isolated build workloads.',
              'Faster Docker image builds.',
              'Better resource utilisation.',
              'Improved build reproducibility.',
              'Reduced controller workload.',
              'Stronger credential and permission controls.',
              'Easier troubleshooting and maintenance.',
              'A better foundation for parallel CI/CD workloads.'
            ]
          },
          {
            t: 'p',
            v: 'For teams running Docker-based applications, the architecture provides a practical foundation for reliable builds, faster delivery, controlled infrastructure access, and future CI/CD scaling.'
          },
          {
            t: 'note',
            v: 'The outcomes above are the qualitative results described in the source document. It records no benchmark figures for build duration or resource usage, so none are quoted here.'
          }
        ]
      }
    ]
  };

  /* --------------------------------------------------------------- 7 of 12 */
  var jenkinsSlackNotifications = {
    slug: 'jenkins-slack-notifications',
    name: 'Jenkins + Slack Notifications',
    cardTitle: 'Jenkins + Slack Notifications',
    group: 'case',
    groupLabel: 'Case Study',
    source: 'All case studies/jenkins_slac_notifications.txt',
    tagline:
      'An automated Jenkins-to-Slack notification layer that turns pipeline events into structured, actionable delivery and incident messages.',
    goal: 'Make CI/CD activity visible, actionable, and easier to troubleshoot.',
    hero: {
      base: 'assets/img/work/work-2',
      w: 1000,
      h: 667,
      alt: 'Illustration of a continuous delivery loop with code, Git, and container stages'
    },
    meta: [
      { label: 'Discipline', value: 'CI/CD Observability' },
      { label: 'Automation', value: 'Jenkins Pipeline' },
      { label: 'Notifications', value: 'Slack' },
      { label: 'Secrets', value: 'Jenkins Credentials' }
    ],
    tags: [
      'Jenkins',
      'Jenkins Pipeline',
      'Slack',
      'GitHub',
      'Docker',
      'CI/CD',
      'Webhooks',
      'Linux',
      'Secrets Management',
      'AWS'
    ],
    sections: [
      {
        id: 'overview',
        blocks: [
          {
            t: 'p',
            v: 'Built an automated <strong>Jenkins and Slack notification system</strong> that keeps development and operations teams informed about CI/CD activity in real time.'
          },
          {
            t: 'p',
            v: 'Instead of requiring engineers to continuously monitor Jenkins, the pipeline automatically sends structured Slack messages when builds start, succeed, fail, or complete deployments.'
          },
          {
            t: 'quote',
            v: 'Jenkins acts as the automation engine while Slack becomes the team’s real-time delivery and incident communication layer.'
          }
        ]
      },
      {
        id: 'challenge',
        blocks: [
          {
            t: 'p',
            v: 'Without automated notifications, teams often discover deployment problems only after checking Jenkins manually. The common problems were:'
          },
          {
            t: 'list',
            v: [
              'Developers unaware that a deployment failed.',
              'Delayed response to production build failures.',
              'No centralised CI/CD communication.',
              'Engineers repeatedly checking Jenkins dashboards.',
              'Important build information buried inside Jenkins logs.',
              'Difficult-to-track deployment status.'
            ]
          }
        ]
      },
      {
        id: 'architecture',
        blocks: [
          {
            t: 'flow',
            v: ['GitHub', 'Jenkins', 'CI/CD Pipeline', 'Build / Test', 'Deployment', 'Slack']
          },
          { t: 'h', v: 'Core components' },
          {
            t: 'list',
            v: [
              '<strong>Jenkins</strong> CI/CD orchestration.',
              '<strong>GitHub</strong> source-code repository.',
              '<strong>Jenkins Pipeline</strong> the automated workflow.',
              '<strong>Slack</strong> team notifications.',
              '<strong>Docker</strong> application build environment.',
              '<strong>AWS / cloud infrastructure</strong> deployment target.'
            ]
          },
          {
            t: 'dia',
            label: 'Production notification flow',
            v: [
              '                GitHub',
              '                   │',
              '                   ▼',
              '              Jenkins',
              '                   │',
              '        ┌──────────┴──────────┐',
              '        ▼                     ▼',
              '      Build                 Tests',
              '        │                     │',
              '        └──────────┬──────────┘',
              '                   ▼',
              '             Security Scan',
              '                   │',
              '                   ▼',
              '              Deployment',
              '                   │',
              '          ┌────────┴────────┐',
              '          ▼                 ▼',
              '       SUCCESS            FAILURE',
              '          │                 │',
              '          └────────┬────────┘',
              '                   ▼',
              '              Slack Channel',
              '                   │',
              '                   ▼',
              '            Engineering Team'
            ].join('\n')
          }
        ]
      },
      {
        id: 'solution',
        blocks: [
          { t: 'h', v: 'Automated build notifications' },
          {
            t: 'p',
            v: 'Jenkins pipelines were configured to report the pipeline state at each meaningful point, so engineers do not need to open Jenkins to know where a release is.'
          },
          {
            t: 'flow',
            v: [
              'Build Started',
              'Code Checkout',
              'Tests',
              'Docker Build',
              'Security Scan',
              'Deployment',
              'Build Result',
              'Slack Notification'
            ]
          },
          { t: 'h', v: 'Success and failure alerts' },
          {
            t: 'p',
            v: 'Separate notification paths were created for successful and failed pipelines, so a failure is not just another message in the channel.'
          },
          {
            t: 'dia',
            label: 'Success notification',
            v: [
              '✅ Deployment Successful',
              '',
              'Application: Production API',
              'Branch: main',
              'Build: #184',
              'Commit: 8f42c1a',
              'Environment: Production',
              'Duration: 4m 21s'
            ].join('\n')
          },
          {
            t: 'dia',
            label: 'Failure notification',
            v: [
              '🚨 Deployment Failed',
              '',
              'Application: Production API',
              'Build: #185',
              'Branch: main',
              'Stage: Docker Build',
              'Status: FAILED',
              '',
              'Check Jenkins for build logs.'
            ].join('\n')
          },
          {
            t: 'note',
            v: 'The two messages above are the example payload formats defined in the source document. The application name, build numbers, commit hash, and duration are illustrative values that show the shape of a notification, not figures from a measured release.'
          },
          { t: 'h', v: 'Deployment notifications' },
          {
            t: 'p',
            v: 'Deployment-specific messages let the team distinguish between states that a single “deployed” message would flatten:'
          },
          {
            t: 'list',
            v: [
              'Build completed.',
              'Image pushed.',
              'Staging deployed.',
              'Production deployment started.',
              'Production deployment completed.',
              'Deployment failed.'
            ]
          }
        ]
      },
      {
        id: 'devops',
        blocks: [
          { t: 'h', v: 'Jenkins pipeline integration' },
          {
            t: 'p',
            v: 'Notifications were integrated into the pipeline itself rather than left to manual communication, so they are triggered automatically by the pipeline result.'
          },
          {
            t: 'dia',
            label: 'Simplified pipeline shape',
            v: [
              'pipeline {',
              '    stages {',
              '        stage(\'Build\') {',
              '            steps {',
              '                // Build application',
              '            }',
              '        }',
              '',
              '        stage(\'Test\') {',
              '            steps {',
              '                // Run tests',
              '            }',
              '        }',
              '',
              '        stage(\'Deploy\') {',
              '            steps {',
              '                // Deploy application',
              '            }',
              '        }',
              '    }',
              '',
              '    post {',
              '        success {',
              '            // Send Slack success notification',
              '        }',
              '',
              '        failure {',
              '            // Send Slack failure notification',
              '        }',
              '',
              '        always {',
              '            // Pipeline cleanup',
              '        }',
              '    }',
              '}'
            ].join('\n')
          },
          { t: 'h', v: 'Failure-aware communication' },
          {
            t: 'p',
            v: 'Not every pipeline event deserves the same level of attention, so notifications were designed around operational importance. This reduces channel noise while making sure important failures are still seen:'
          },
          {
            t: 'list',
            v: [
              'Build started <strong>informational</strong>.',
              'Build successful <strong>success</strong>.',
              'Test failed <strong>warning / failure</strong>.',
              'Docker build failed <strong>failure</strong>.',
              'Security scan failed <strong>security alert</strong>.',
              'Deployment started <strong>informational</strong>.',
              'Deployment successful <strong>success</strong>.',
              'Production deployment failed <strong>critical alert</strong>.'
            ]
          },
          { t: 'h', v: 'Secure Slack integration' },
          {
            t: 'p',
            v: 'The integration was configured without exposing Slack credentials in source code:'
          },
          {
            t: 'list',
            v: [
              'Jenkins credentials store.',
              'Secret and token protection.',
              'No hard-coded webhook credentials.',
              'Restricted Jenkins credential access.',
              'Pipeline-based secret injection.',
              'Separation between notification configuration and application code.'
            ]
          }
        ]
      },
      {
        id: 'stack',
        blocks: [
          {
            t: 'groups',
            v: [
              { h: 'CI/CD', v: ['Jenkins', 'Jenkins Pipeline', 'CI/CD'] },
              { h: 'Communication', v: ['Slack', 'Webhooks'] },
              { h: 'Source', v: ['GitHub'] },
              { h: 'Build', v: ['Docker'] },
              { h: 'Security', v: ['Secrets Management'] },
              { h: 'Platform', v: ['Linux', 'AWS'] }
            ]
          }
        ]
      },
      {
        id: 'outcomes',
        blocks: [
          {
            t: 'p',
            v: 'The integration turned Slack into a lightweight <strong>CI/CD operational dashboard</strong>.'
          },
          { t: 'h', v: 'Key outcomes' },
          {
            t: 'list',
            v: [
              'Real-time deployment visibility.',
              'Faster failure awareness.',
              'Reduced manual Jenkins monitoring.',
              'Better team communication.',
              'Clear deployment history.',
              'Faster incident response.',
              'Secure notification credentials.',
              'Consistent CI/CD communication.'
            ]
          },
          { t: 'h', v: 'Real-world case study' },
          {
            t: 'p',
            v: 'A production deployment failed during the Docker image build. Because Jenkins was running the pipeline in the background, the deployment team did not immediately know. The pipeline was configured to detect the failed stage and publish a Slack alert containing the application name, environment, branch, build number, failed stage, commit information, and Jenkins build reference.'
          },
          {
            t: 'flow',
            v: ['What failed', 'Where it failed', 'Which deployment', 'Where to investigate']
          },
          {
            t: 'p',
            v: 'The team could answer all four questions from the alert itself, which reduced the time between failure and engineer response.'
          },
          {
            t: 'note',
            v: 'The source document describes this improvement qualitatively it reports no before-and-after response-time measurement, so none is quoted here.'
          }
        ]
      }
    ]
  };

  /* --------------------------------------------------------------- 8 of 12 */
  var azureCloudServices = {
    slug: 'azure-cloud-services',
    name: 'Azure Cloud Services &amp; Production Operations',
    cardTitle: 'Azure Cloud Services',
    group: 'case',
    groupLabel: 'Case Study',
    source: 'All case studies/azure_cloud_service.txt',
    tagline:
      'A production Azure platform covering infrastructure, networking, identity, container delivery, monitoring, and day-to-day operations.',
    goal:
      'Build a secure and maintainable Azure environment where services communicate only through explicitly permitted paths and every production problem has a repeatable investigation route.',
    hero: {
      base: 'assets/img/projects/featured-2',
      w: 1400,
      h: 933,
      alt: 'Isometric illustration of a cloud platform services grid with a delivery pipeline'
    },
    meta: [
      { label: 'Discipline', value: 'Cloud Platform Engineering' },
      { label: 'Cloud', value: 'Microsoft Azure' },
      { label: 'Identity', value: 'Microsoft Entra ID' },
      { label: 'Provisioning', value: 'Terraform' }
    ],
    tags: [
      'Microsoft Azure',
      'Azure Container Registry',
      'Azure VNet',
      'NSG',
      'Microsoft Entra ID',
      'Managed Identity',
      'Azure Key Vault',
      'Azure Monitor',
      'Log Analytics',
      'Azure Storage',
      'Azure Database Services',
      'Docker',
      'Terraform',
      'GitHub Actions',
      'CI/CD'
    ],
    sections: [
      {
        id: 'overview',
        blocks: [
          {
            t: 'p',
            v: 'Designed and operated production-ready <strong>Microsoft Azure cloud infrastructure</strong> for containerised applications, APIs, databases, and supporting services.'
          },
          {
            t: 'p',
            v: 'The focus was on building a secure and maintainable Azure environment covering <strong>infrastructure, networking, identity, container delivery, monitoring, and day-to-day production operations</strong>.'
          },
          { t: 'h', v: 'The platform objective' },
          {
            t: 'flow',
            v: [
              'Secure Infrastructure',
              'Automated Delivery',
              'Reliable Services',
              'Centralized Monitoring',
              'Operational Control'
            ]
          }
        ]
      },
      {
        id: 'challenge',
        blocks: [
          {
            t: 'p',
            v: 'Growing applications often accumulate Azure resources without a consistent platform strategy. The typical operational challenges were:'
          },
          {
            t: 'list',
            v: [
              'Manually configured Azure resources.',
              'Complex networking between services.',
              'Container deployment inconsistencies.',
              'Poor separation between environments.',
              'Over-permissioned identities.',
              'Difficult troubleshooting.',
              'Missing centralised logs.',
              'Production configuration drift.',
              'Unclear resource ownership.',
              'Limited deployment visibility.'
            ]
          }
        ]
      },
      {
        id: 'architecture',
        blocks: [
          {
            t: 'dia',
            label: 'Azure platform architecture',
            v: [
              '                         Internet',
              '                            │',
              '                            ▼',
              '                     Azure DNS / Domain',
              '                            │',
              '                            ▼',
              '                  Application Gateway',
              '                       / Front Door',
              '                            │',
              '                            ▼',
              '                    Azure Virtual Network',
              '              ┌─────────────┴─────────────┐',
              '              │                           │',
              '        Public / Edge                Private Network',
              '              │                           │',
              '              ▼                           ▼',
              '        Application                Container Platform',
              '        Services                       │',
              '                                      │',
              '                           ┌──────────┴──────────┐',
              '                           ▼                     ▼',
              '                     Azure Services          Database',
              '                           │',
              '              ┌────────────┼────────────┐',
              '              ▼            ▼            ▼',
              '            ACR         Key Vault    Storage',
              '              │',
              '              ▼',
              '        Container Images',
              '',
              '                    Azure Monitor',
              '                         │',
              '                         ▼',
              '                  Logs / Metrics'
            ].join('\n')
          },
          { t: 'h', v: 'Core Azure services' },
          {
            t: 'list',
            v: [
              '<strong>Azure Container Registry (ACR)</strong> private container image registry.',
              '<strong>Azure Virtual Network</strong> network isolation.',
              '<strong>Azure Subnets</strong> workload segmentation.',
              '<strong>Azure NSG</strong> network access control.',
              '<strong>Azure Key Vault</strong> secret and credential management.',
              '<strong>Azure Monitor</strong> infrastructure monitoring.',
              '<strong>Log Analytics</strong> centralised logs.',
              '<strong>Azure Storage</strong> application and infrastructure storage.',
              '<strong>Azure Database Services</strong> managed database workloads.',
              '<strong>Azure Identity / Entra ID</strong> authentication and authorisation.',
              '<strong>Azure Compute / Container Services</strong> application workloads.'
            ]
          },
          { t: 'h', v: 'Network segmentation' },
          {
            t: 'p',
            v: 'Networking was designed around isolation and controlled traffic flow, with separate subnets for application workloads, database services, private endpoints, platform services, and management components. Controls are applied through:'
          },
          {
            t: 'list',
            v: [
              'Network Security Groups.',
              'Subnet-level segmentation.',
              'Private connectivity.',
              'Restricted inbound traffic.',
              'Controlled outbound access.'
            ]
          },
          {
            t: 'quote',
            v: 'The goal is to ensure that services communicate only through explicitly permitted paths.'
          }
        ]
      },
      {
        id: 'solution',
        blocks: [
          { t: 'h', v: 'Infrastructure as Code' },
          {
            t: 'p',
            v: 'Infrastructure as Code principles make the Azure environments reproducible and easier to maintain, organised around reusable modules:'
          },
          {
            t: 'dia',
            label: 'Module layout',
            v: [
              'azure-infrastructure/',
              '├── modules/',
              '│   ├── network/',
              '│   ├── container-registry/',
              '│   ├── identity/',
              '│   ├── monitoring/',
              '│   ├── storage/',
              '│   └── compute/',
              '│',
              '└── environments/',
              '    ├── development/',
              '    ├── staging/',
              '    └── production/'
            ].join('\n')
          },
          {
            t: 'p',
            v: 'Environments can be created consistently while keeping environment-specific configuration separate.'
          },
          { t: 'h', v: 'Environment strategy' },
          {
            t: 'dia',
            label: 'Resource separation by environment',
            v: [
              'Azure',
              '│',
              '├── Development',
              '│   ├── Application',
              '│   ├── ACR',
              '│   └── Monitoring',
              '│',
              '├── Staging',
              '│   ├── Application',
              '│   ├── ACR',
              '│   └── Monitoring',
              '│',
              '└── Production',
              '    ├── Application',
              '    ├── ACR',
              '    └── Monitoring'
            ].join('\n')
          },
          {
            t: 'p',
            v: 'This reduces accidental cross-environment changes and provides clearer operational boundaries.'
          }
        ]
      },
      {
        id: 'devops',
        blocks: [
          { t: 'h', v: 'Container delivery through ACR' },
          {
            t: 'flow',
            v: [
              'Developer',
              'GitHub',
              'CI/CD',
              'Docker Build',
              'Security Scan',
              'Azure Container Registry',
              'Azure Container Platform',
              'Application'
            ]
          },
          {
            t: 'p',
            v: 'Images are tagged using traceable versions such as <code>application:commit-sha</code> and <code>application:release-version</code>, which provides a direct relationship between the source-code version and the deployed container.'
          },
          { t: 'h', v: 'Identity and access management' },
          {
            t: 'p',
            v: 'Azure identity controls use <strong>Microsoft Entra ID</strong> and managed identities where appropriate. Instead of embedding credentials inside applications:'
          },
          { t: 'flow', v: ['Application', 'Managed Identity', 'Azure Resource'] },
          {
            t: 'p',
            v: 'This reduces the need for long-lived credentials and simplifies secure service-to-service authentication. Azure Key Vault holds database credentials, API keys, certificates, application secrets, and connection strings, which the application reads through controlled identity permissions rather than from the Git repository.'
          },
          { t: 'h', v: 'Monitoring and observability' },
          {
            t: 'p',
            v: 'Centralised monitoring is built around <strong>Azure Monitor and Log Analytics</strong>, covering application performance, CPU and memory, container health, network activity, HTTP failures, infrastructure events, authentication failures, deployment issues, and application logs.'
          },
          {
            t: 'dia',
            label: 'Operational signal flow',
            v: [
              'Azure Resources',
              '      │',
              '      ▼',
              'Azure Monitor',
              '      │',
              '      ▼',
              'Log Analytics',
              '      │',
              '      ├── Metrics',
              '      ├── Logs',
              '      ├── Alerts',
              '      └── Diagnostics',
              '             │',
              '             ▼',
              '       Engineering Team'
            ].join('\n')
          },
          { t: 'h', v: 'CI/CD integration' },
          {
            t: 'flow',
            v: [
              'GitHub',
              'GitHub Actions',
              'Docker Build',
              'Security Scan',
              'Azure Authentication',
              'Push Image → ACR',
              'Update Application',
              'Health Check',
              'Azure Monitor'
            ]
          },
          { t: 'h', v: 'Security model' },
          {
            t: 'p',
            v: 'Defence in depth was applied across the platform rather than added after deployment:'
          },
          {
            t: 'groups',
            v: [
              { h: 'Identity', v: ['Entra ID', 'Managed identities', 'RBAC', 'Least-privilege permissions'] },
              { h: 'Network', v: ['VNet isolation', 'NSGs', 'Private connectivity', 'Restricted ingress'] },
              {
                h: 'Application',
                v: ['Private container registry', 'Secret management', 'Image scanning', 'Versioned deployments']
              },
              { h: 'Operations', v: ['Centralized logging', 'Monitoring', 'Alerts', 'Auditability'] }
            ]
          }
        ]
      },
      {
        id: 'features',
        title: 'Production Operations',
        blocks: [
          {
            t: 'p',
            v: 'The platform was designed to support real production operational workflows, not just an initial deployment.'
          },
          { t: 'h', v: 'Deployment operations' },
          {
            t: 'list',
            v: [
              'Container image versioning.',
              'Automated deployments.',
              'Environment separation.',
              'Deployment verification.',
              'Rollback procedures.'
            ]
          },
          { t: 'h', v: 'Incident operations' },
          { t: 'p', v: 'When an application becomes unhealthy, the investigation follows a fixed route:' },
          {
            t: 'flow',
            v: [
              'Application Issue',
              'Azure Monitor',
              'Alert',
              'Log Investigation',
              'Identify Root Cause',
              'Remediation',
              'Health Verification'
            ]
          },
          {
            t: 'p',
            v: 'This creates a repeatable troubleshooting process rather than relying on manual investigation.'
          },
          { t: 'h', v: 'Real-world case study' },
          {
            t: 'p',
            v: 'A containerised application running in Azure experienced intermittent failures after a deployment. The team needed to determine whether the cause was application code, container startup, network connectivity, database access, resource limits, or identity permissions six candidates with no signal to separate them.'
          },
          {
            t: 'p',
            v: 'Centralising the operational signals through Azure monitoring and structuring the deployment environment around isolated resources turned that guesswork into an ordered path:'
          },
          {
            t: 'dia',
            label: 'Investigation path',
            v: [
              'Deployment',
              '    ↓',
              'Container Health',
              '    ↓',
              'Application Logs',
              '    ↓',
              'Azure Metrics',
              '    ↓',
              'Network / Identity Checks',
              '    ↓',
              'Root Cause',
              '    ↓',
              'Fix',
              '    ↓',
              'Deployment Verification'
            ].join('\n')
          }
        ]
      },
      {
        id: 'stack',
        blocks: [
          {
            t: 'groups',
            v: [
              { h: 'Cloud', v: ['Microsoft Azure', 'Azure Compute / Container Services', 'Azure Database Services'] },
              { h: 'Networking', v: ['Azure VNet', 'Subnets', 'NSG'] },
              { h: 'Identity &amp; secrets', v: ['Microsoft Entra ID', 'Managed Identity', 'Azure Key Vault', 'RBAC'] },
              { h: 'Delivery', v: ['Azure Container Registry', 'Docker', 'GitHub Actions', 'CI/CD'] },
              { h: 'Provisioning', v: ['Terraform'] },
              { h: 'Observability', v: ['Azure Monitor', 'Log Analytics', 'Azure Storage'] }
            ]
          }
        ]
      },
      {
        id: 'outcomes',
        blocks: [
          { t: 'p', v: 'The Azure platform provides:' },
          {
            t: 'list',
            v: [
              'Secure cloud infrastructure.',
              'Private container image management.',
              'Reproducible environments.',
              'Controlled identity access.',
              'Network segmentation.',
              'Centralised monitoring.',
              'Production troubleshooting.',
              'Automated container delivery.',
              'Better operational visibility.',
              'Reduced manual configuration.'
            ]
          },
          {
            t: 'p',
            v: 'For businesses already running workloads on Azure or migrating from traditional infrastructure this provides a foundation for <strong>secure, automated, observable, and maintainable cloud operations</strong>.'
          },
          {
            t: 'note',
            v: 'The source document records these results qualitatively. It contains no measured availability, latency, or cost figures, so none are quoted here.'
          }
        ]
      }
    ]
  };

  /* --------------------------------------------------------------- 9 of 12 */
  var azureApplicationDeployment = {
    slug: 'azure-application-deployment',
    name: 'Azure Application Deployment',
    cardTitle: 'Azure Application Deployment',
    group: 'case',
    groupLabel: 'Case Study',
    source: 'All case studies/azure_applications.txt',
    tagline:
      'An automated Azure delivery pipeline that carries application code from Git commit to a verified production container deployment.',
    goal:
      'Eliminate manual deployment steps so every release is repeatable, traceable, and verified by a health check before it is called a success.',
    hero: {
      base: 'assets/img/knowledge/knowledge-2',
      w: 612,
      h: 459,
      alt: 'Illustration of a container build and release pipeline from code to running image'
    },
    meta: [
      { label: 'Discipline', value: 'Release Automation' },
      { label: 'Cloud', value: 'Microsoft Azure' },
      { label: 'CI/CD', value: 'GitHub Actions' },
      { label: 'Authentication', value: 'Entra ID / OIDC' }
    ],
    tags: [
      'Azure',
      'Azure Container Registry',
      'Azure Container Services',
      'Terraform',
      'Docker',
      'GitHub Actions',
      'Microsoft Entra ID',
      'OIDC',
      'Azure Key Vault',
      'Azure Monitor',
      'Log Analytics',
      'VNet',
      'NSG',
      'CI/CD'
    ],
    sections: [
      {
        id: 'overview',
        blocks: [
          {
            t: 'p',
            v: 'Built an automated <strong>Azure application deployment pipeline</strong> that takes application code from Git commit to a production-ready container deployment.'
          },
          {
            t: 'p',
            v: 'The workflow combines <strong>CI/CD, Docker, Azure Container Registry, Infrastructure as Code, secure Azure authentication, and deployment verification</strong> into one repeatable delivery process.'
          },
          { t: 'h', v: 'The objective' },
          {
            t: 'flow',
            v: [
              'Code Push',
              'Build',
              'Test',
              'Containerize',
              'Scan',
              'Push to ACR',
              'Provision Infrastructure',
              'Deploy',
              'Verify'
            ]
          }
        ]
      },
      {
        id: 'challenge',
        blocks: [
          {
            t: 'p',
            v: 'Manual Azure deployments introduce operational risk and make releases difficult to reproduce. The recurring problems were:'
          },
          {
            t: 'list',
            v: [
              'Manual application builds.',
              'Inconsistent Docker images.',
              'Manually pushing containers to registries.',
              'Configuration differences between environments.',
              'Manual infrastructure provisioning.',
              'Long-lived cloud credentials.',
              'Deployments without health verification.',
              'Difficult rollback procedures.',
              'Limited deployment visibility.'
            ]
          }
        ]
      },
      {
        id: 'architecture',
        blocks: [
          {
            t: 'dia',
            label: 'Delivery architecture',
            v: [
              '                         Developer',
              '                             │',
              '                             ▼',
              '                          GitHub',
              '                             │',
              '                             ▼',
              '                       CI/CD Pipeline',
              '              ┌──────────────┴──────────────┐',
              '              ▼                             ▼',
              '        Application Build              Automated Tests',
              '              │                             │',
              '              └──────────────┬──────────────┘',
              '                             ▼',
              '                       Docker Build',
              '                             │',
              '                             ▼',
              '                       Security Scan',
              '                             │',
              '                             ▼',
              '                 Azure Container Registry',
              '                             │',
              '                             ▼',
              '                  Terraform / Infrastructure',
              '                             │',
              '                             ▼',
              '                   Azure Application Service',
              '                             │',
              '                             ▼',
              '                       Health Check',
              '                             │',
              '                             ▼',
              '                     Production Traffic'
            ].join('\n')
          },
          { t: 'h', v: 'Core components' },
          {
            t: 'list',
            v: [
              '<strong>GitHub</strong> source code.',
              '<strong>GitHub Actions</strong> CI/CD automation.',
              '<strong>Docker</strong> application containerisation.',
              '<strong>Azure Container Registry</strong> private image registry.',
              '<strong>Terraform</strong> infrastructure provisioning.',
              '<strong>Azure Compute / Container Platform</strong> application runtime.',
              '<strong>Microsoft Entra ID / OIDC</strong> secure authentication.',
              '<strong>Azure Key Vault</strong> secrets management.',
              '<strong>Azure Monitor</strong> deployment and application monitoring.'
            ]
          }
        ]
      },
      {
        id: 'solution',
        blocks: [
          { t: 'h', v: 'A pipeline with clear failure boundaries' },
          {
            t: 'flow',
            v: [
              'Checkout',
              'Install Dependencies',
              'Lint / Test',
              'Docker Build',
              'Security Scan',
              'Azure Authentication',
              'Push Image → ACR',
              'Provision Infrastructure',
              'Deploy Application',
              'Health Verification'
            ]
          },
          {
            t: 'p',
            v: 'Each stage provides a clear failure boundary, which is what makes the pipeline troubleshootable a failed run identifies itself by where it stopped.'
          },
          { t: 'h', v: 'Automated application build' },
          {
            t: 'p',
            v: 'The pipeline builds the application whenever changes are pushed to the configured branch. Build validation can include dependency installation, unit tests, linting, application compilation, and production build validation. <strong>A deployment does not proceed when required validation stages fail.</strong>'
          },
          { t: 'h', v: 'Docker containerisation' },
          {
            t: 'p',
            v: 'Applications were packaged into reproducible Docker images, with the containerisation work focused on:'
          },
          {
            t: 'list',
            v: [
              'Multi-stage builds.',
              'Minimal runtime images.',
              'Dependency optimisation.',
              'Non-root execution where appropriate.',
              'Environment-based configuration.',
              'Small build contexts.',
              'Predictable startup behaviour.'
            ]
          },
          {
            t: 'flow',
            v: [
              'Source Code',
              'Dockerfile',
              'Docker Build',
              'Security Scan',
              'Versioned Image',
              'Azure Container Registry'
            ]
          },
          { t: 'h', v: 'Image versioning' },
          {
            t: 'p',
            v: 'Immutable image references are used rather than relying exclusively on <code>latest</code> for example <code>my-app:8f42c1a</code> and <code>my-app:release-2026.08.22</code>. That gives a traceable chain from <strong>Git commit → container image → Azure deployment</strong>, and makes rollback significantly safer.'
          },
          {
            t: 'note',
            v: 'The two image tags above are the illustrative examples given in the source document, shown to explain the tagging scheme rather than to reference a specific release.'
          }
        ]
      },
      {
        id: 'devops',
        blocks: [
          { t: 'h', v: 'Azure Container Registry' },
          {
            t: 'p',
            v: 'ACR is the centralised private registry for application images, with access controlled through Azure identity and permissions rather than by exposing the registry publicly.'
          },
          {
            t: 'flow',
            v: [
              'GitHub Actions',
              'Azure Authentication',
              'ACR Login',
              'Push Image',
              'ACR Repository',
              'Azure Application Platform'
            ]
          },
          { t: 'h', v: 'Infrastructure provisioning' },
          {
            t: 'dia',
            label: 'Terraform layout',
            v: [
              'terraform/',
              '├── modules/',
              '│   ├── networking/',
              '│   ├── registry/',
              '│   ├── compute/',
              '│   ├── identity/',
              '│   └── monitoring/',
              '│',
              '└── environments/',
              '    ├── dev/',
              '    ├── staging/',
              '    └── production/'
            ].join('\n')
          },
          {
            t: 'p',
            v: 'Terraform can provision and configure resource groups, virtual networks, subnets, Network Security Groups, Azure Container Registry, application hosting, managed identities, Key Vault, and monitoring resources.'
          },
          { t: 'h', v: 'Secure Azure authentication' },
          {
            t: 'p',
            v: 'CI/CD authentication uses identity-based access rather than permanent Azure credentials stored in GitHub:'
          },
          { t: 'flow', v: ['GitHub Actions', 'OIDC Token', 'Microsoft Entra ID', 'Azure Role', 'Azure Resources'] },
          {
            t: 'p',
            v: 'This reduces the security risk associated with long-lived cloud access keys. Azure Key Vault keeps database credentials, API keys, certificates, application secrets, and connection strings outside the source repository, and the application reads them through controlled identity permissions.'
          },
          { t: 'h', v: 'Environment management' },
          {
            t: 'dia',
            label: 'Per-environment deployment targets',
            v: [
              '                 Application',
              '                      │',
              '          ┌───────────┼───────────┐',
              '          ▼           ▼           ▼',
              '         Dev       Staging      Production',
              '          │           │           │',
              '         ACR         ACR         ACR',
              '          │           │           │',
              '       Azure        Azure        Azure',
              '      Services     Services     Services'
            ].join('\n')
          },
          {
            t: 'p',
            v: 'Environment-specific settings can include container image, CPU and memory, scaling configuration, environment variables, network configuration, secrets, database endpoints, and monitoring settings.'
          },
          { t: 'h', v: 'Deployment verification' },
          {
            t: 'p',
            v: 'A successful container push does not automatically mean a successful deployment, so the pipeline verifies the application after deploying it:'
          },
          {
            t: 'flow',
            v: [
              'Deploy',
              'Wait for Application',
              'Container Health',
              'HTTP Health Check',
              'Service Availability',
              'Deployment Result'
            ]
          },
          {
            t: 'p',
            v: 'This prevents a pipeline from reporting success when the container technically started but the application is unhealthy.'
          },
          { t: 'h', v: 'Failure handling' },
          {
            t: 'dia',
            label: 'Fail-fast boundaries',
            v: [
              'Docker Build',
              '     │',
              '     ├── FAIL → Stop Deployment',
              '     │',
              '     ▼',
              'Security Scan',
              '     │',
              '     ├── FAIL → Stop Deployment',
              '     │',
              '     ▼',
              'Push to ACR',
              '     │',
              '     ├── FAIL → Stop Deployment',
              '     │',
              '     ▼',
              'Deploy',
              '     │',
              '     ├── FAIL → Deployment Failure',
              '     │',
              '     ▼',
              'Health Check',
              '     │',
              '     ├── FAIL → Alert / Rollback Strategy',
              '     │',
              '     ▼',
              'SUCCESS'
            ].join('\n')
          }
        ]
      },
      {
        id: 'features',
        title: 'From Manual Release to Automated Delivery',
        blocks: [
          {
            t: 'p',
            v: 'An application was being deployed manually to Azure. The process required engineers to build the application, build a Docker image, log in to Azure, push the image, update the application, and then check whether the deployment worked six manual steps, every release, in the right order.'
          },
          { t: 'p', v: 'This created inconsistent releases and increased the chance of human error. The delivery process was automated end to end:' },
          {
            t: 'flow',
            v: [
              'Developer Push',
              'GitHub Actions',
              'Test',
              'Docker Build',
              'Security Scan',
              'ACR',
              'Azure Infrastructure',
              'Application Deployment',
              'Health Check'
            ]
          },
          {
            t: 'p',
            v: 'Application releases became <strong>repeatable, traceable, and significantly less dependent on manual intervention</strong>.'
          },
          { t: 'h', v: 'Production operations' },
          {
            t: 'p',
            v: 'After deployment, Azure monitoring provides visibility into application health, container status, CPU and memory, application logs, HTTP errors, infrastructure events, and deployment failures closing the loop into a complete operational lifecycle:'
          },
          { t: 'flow', v: ['Build', 'Deploy', 'Monitor', 'Diagnose', 'Improve'] }
        ]
      },
      {
        id: 'stack',
        blocks: [
          {
            t: 'groups',
            v: [
              { h: 'CI/CD', v: ['GitHub Actions', 'CI/CD'] },
              { h: 'Containers', v: ['Docker', 'Azure Container Registry', 'Azure Container Services'] },
              { h: 'Provisioning', v: ['Terraform'] },
              { h: 'Identity &amp; secrets', v: ['Microsoft Entra ID', 'OIDC', 'Azure Key Vault'] },
              { h: 'Networking', v: ['VNet', 'NSG'] },
              { h: 'Observability', v: ['Azure Monitor', 'Log Analytics'] }
            ]
          }
        ]
      },
      {
        id: 'outcomes',
        blocks: [
          { t: 'p', v: 'The automated deployment platform provides:' },
          {
            t: 'list',
            v: [
              'Repeatable application releases.',
              'Automated Docker builds.',
              'Secure ACR image management.',
              'Infrastructure as Code.',
              'Automated Azure provisioning.',
              'Identity-based authentication.',
              'Environment separation.',
              'Health-based deployment verification.',
              'Centralised monitoring.',
              'Reduced manual deployment work.'
            ]
          },
          {
            t: 'p',
            v: 'For teams deploying modern applications on Azure, this provides a <strong>repeatable, secure, and production-oriented deployment process</strong> that reduces manual work and makes every release easier to track and troubleshoot.'
          },
          {
            t: 'note',
            v: 'The source document reports these outcomes qualitatively it records no deployment-frequency or lead-time measurements, so none are quoted here.'
          }
        ]
      }
    ]
  };

  var terraformPlatform = {
    slug: 'terraform-infrastructure-as-code',
    name: 'Infrastructure as Code with Terraform',
    cardTitle: 'Terraform Infrastructure',
    group: 'case',
    groupLabel: 'Case Study',
    source: 'All case studies/terraform.txt',
    tagline:
      'A reusable Infrastructure as Code (IaC) platform using Terraform to provision and manage AWS and Azure infrastructure.',
    goal:
      'Replace manual cloud-console configuration with a zero-touch infrastructure model where environments can be created, updated, reviewed, and destroyed through code.',
    hero: {
      base: 'assets/img/knowledge/knowledge-3',
      w: 612,
      h: 459,
      alt: 'Illustration of Terraform infrastructure as code architecture'
    },
    meta: [
      { label: 'Discipline', value: 'Infrastructure as Code' },
      { label: 'Cloud', value: 'AWS & Azure' },
      { label: 'Tooling', value: 'Terraform' },
      { label: 'CI/CD', value: 'GitHub Actions' }
    ],
    tags: [
      'Terraform',
      'AWS',
      'Azure',
      'HCL',
      'GitHub Actions',
      'S3',
      'IAM',
      'VPC',
      'ECS',
      'EKS',
      'RDS',
      'ECR'
    ],
    sections: [
      {
        id: 'overview',
        blocks: [
          {
            t: 'p',
            v: 'Designed a reusable <strong>Infrastructure as Code (IaC) platform using Terraform</strong> to provision and manage AWS and Azure infrastructure through version-controlled, automated, and repeatable workflows.'
          },
          {
            t: 'p',
            v: 'The platform replaces manual cloud-console configuration with a <strong>zero-touch infrastructure model</strong> where environments can be created, updated, reviewed, and destroyed through code.'
          },
          { t: 'flow', v: ['Code', 'Plan', 'Review', 'Apply', 'Validate', 'Operate'] }
        ]
      },
      {
        id: 'challenge',
        blocks: [
          {
            t: 'p',
            v: 'Manually managing cloud infrastructure creates operational and security problems as environments grow. Common issues included:'
          },
          {
            t: 'list',
            v: [
              'Inconsistent infrastructure between environments.',
              'Manual AWS/Azure configuration.',
              'Configuration drift.',
              'Repeated resource definitions.',
              'Difficult infrastructure changes.',
              'Unsafe production modifications.',
              'Poor state management.',
              'No standardized environment structure.'
            ]
          }
        ]
      },
      {
        id: 'architecture',
        blocks: [
          {
            t: 'dia',
            label: 'Terraform Architecture',
            v: [
              '                       GitHub',
              '                          │',
              '                          ▼',
              '                  Terraform Repository',
              '                          │',
              '                          ▼',
              '                    CI/CD Pipeline',
              '                          │',
              '             ┌────────────┴────────────┐',
              '             ▼                         ▼',
              '        terraform fmt             terraform validate',
              '             │                         │',
              '             └────────────┬────────────┘',
              '                          ▼',
              '                   Terraform Plan',
              '                          │',
              '                          ▼',
              '                    Code Review',
              '                          │',
              '                          ▼',
              '                  Terraform Apply',
              '                          │',
              '             ┌────────────┴────────────┐',
              '             ▼                         ▼',
              '            AWS                       Azure',
              '             │                         │',
              '       ┌─────┴─────┐             ┌─────┴─────┐',
              '       ▼           ▼             ▼           ▼',
              '      VPC         ECS           VNet        ACR',
              '      EKS         RDS           IAM         Compute'
            ].join('\n')
          },
          { t: 'h', v: 'Core Principles' },
          {
            t: 'list',
            v: [
              '<strong>Reusable modules</strong>',
              '<strong>Environment isolation</strong>',
              '<strong>Remote state</strong>',
              '<strong>State locking</strong>',
              '<strong>Least-privilege access</strong>',
              '<strong>Version control</strong>',
              '<strong>Automated validation</strong>',
              '<strong>Plan-before-apply</strong>',
              '<strong>Drift detection</strong>'
            ]
          }
        ]
      },
      {
        id: 'devops',
        blocks: [
          { t: 'h', v: 'Modular Terraform Architecture' },
          {
            t: 'dia',
            label: 'Module layout',
            v: [
              'terraform/',
              '├── modules/',
              '│   ├── networking/',
              '│   ├── compute/',
              '│   ├── kubernetes/',
              '│   ├── database/',
              '│   ├── container-registry/',
              '│   └── iam/',
              '│',
              '└── environments/',
              '    ├── development/',
              '    ├── staging/',
              '    └── production/'
            ].join('\n')
          },
          { t: 'h', v: 'Secure Terraform State' },
          {
            t: 'p',
            v: 'Terraform state is one of the most important components of a production IaC system. Designed remote state management rather than keeping sensitive state files on developer machines.'
          },
          { t: 'flow', v: ['Terraform', 'S3 Remote State', 'State Locking', 'Shared Team Environment'] },
          { t: 'h', v: 'CI/CD Integration' },
          {
            t: 'flow',
            v: [
              'Pull Request',
              'Terraform Format',
              'Terraform Validate',
              'Terraform Plan',
              'Code Review',
              'Approval',
              'Terraform Apply'
            ]
          }
        ]
      },
      {
        id: 'features',
        blocks: [
          { t: 'h', v: 'Zero-Touch Provisioning' },
          {
            t: 'p',
            v: 'The platform supports automated environment creation. Instead of manually creating dozens of resources through the cloud console, the infrastructure can be created consistently from the repository.'
          },
          { t: 'h', v: 'Infrastructure Drift Detection' },
          {
            t: 'p',
            v: 'Terraform state and actual cloud resources were treated as separate states that must remain synchronized. Unexpected infrastructure changes can be identified through Terraform planning and controlled back into the codebase.'
          },
          { t: 'h', v: 'Real-World Case Study' },
          {
            t: 'p',
            v: 'A cloud environment contained infrastructure that had been manually configured over time, making reproducing the environment difficult. Reverse-engineered the required infrastructure into reusable Terraform modules. The environment became reproducible and significantly easier to maintain.'
          }
        ]
      },
      {
        id: 'stack',
        blocks: [
          {
            t: 'groups',
            v: [
              { h: 'Infrastructure as Code', v: ['Terraform', 'HCL'] },
              { h: 'Cloud Platforms', v: ['AWS', 'Microsoft Azure'] },
              { h: 'AWS Services', v: ['VPC', 'ECS', 'EKS', 'RDS', 'ECR', 'S3', 'IAM', 'CloudWatch'] },
              { h: 'Azure Services', v: ['VNet', 'ACR', 'Azure Storage', 'Azure Monitor', 'RBAC'] },
              { h: 'CI/CD', v: ['GitHub Actions'] }
            ]
          }
        ]
      },
      {
        id: 'outcomes',
        blocks: [
          { t: 'p', v: 'The Terraform platform provides:' },
          {
            t: 'list',
            v: [
              'Repeatable infrastructure.',
              'Modular architecture.',
              'Zero-touch provisioning.',
              'Secure remote state and environment isolation.',
              'Infrastructure version control.',
              'Automated validation and controlled production changes.',
              'Reduced configuration drift.'
            ]
          },
          {
            t: 'p',
            v: 'For teams managing multiple AWS or Azure environments, this approach transforms infrastructure from manually configured cloud resources into a <strong>version-controlled, reproducible, auditable, and scalable engineering system</strong>.'
          }
        ]
      }
    ]
  };

  var projects = [
    cloudCostOptimizer,
    cloudwatchGitops,
    eksPlatform,
    gitopsDelivery,
    ecsPlatform,
    jenkinsAgentPlatform,
    jenkinsSlackNotifications,
    azureCloudServices,
    azureApplicationDeployment,
    terraformPlatform
  ];

  /* Fill in the shared section titles so every case study uses the same
     headings and the same table-of-contents order. */
  projects.forEach(function (project) {
    project.sections.forEach(function (section) {
      section.title = section.title || SECTION_TITLES[section.id] || section.id;
    });
  });

  window.PORTFOLIO_PROJECTS = projects;

  window.PORTFOLIO_PROJECT_BY_SLUG = projects.reduce(function (map, project) {
    map[project.slug] = project;
    return map;
  }, {});
})();
