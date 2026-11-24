// Topic 9: Software Engineering Practices, Testing & DevOps
var topicDevOps = window.topicDevOps = {
  id: "devops",
  title: "Software Engineering, Testing & DevOps",
  shortTitle: "DevOps & Testing",
  icon: "🚀",
  badge: "Engineering Workflow",
  readingTime: "23 min read",
  description: "Master modern software engineering culture: Git workflows, senior code review checklists, automated testing pyramids, Scrum agile frameworks, Docker, and CI/CD pipelines.",
  learningObjectives: [
    "Understand Git internal snapshot architecture and master `merge` vs. `rebase` vs. `revert`",
    "Learn what senior engineers look for in Pull Request code reviews and clean code principles (DRY, KISS, YAGNI)",
    "Master the Testing Pyramid and understand Test Doubles: Mocks vs. Stubs vs. Fakes",
    "Explore the Agile Scrum framework: Roles, 4 Ceremonies, and Story Point estimation",
    "Discover Docker containers vs. VMs, Docker Compose, and zero-downtime deployment strategies (Blue-Green, Canary)"
  ],
  lessons: [
    {
      id: "devops-git-workflows",
      title: "1. Version Control with Git (Team Workflows)",
      subtitle: "`merge` vs. `rebase`, `reset` vs. `revert` & the Golden Rule",
      whatIsIt: "**Git** is a Distributed Version Control System (DVCS) that records changes to code over time by capturing file system **Snapshots** on every commit. Every developer holds a complete copy of the project history locally.",
      whyNeedIt: "In a team of 10 engineers building the same software, Git prevents developers from overwriting each other's work and allows teams to rollback broken releases instantly.",
      howItWorks: [
        "**`git fetch` vs. `git pull`:** `git pull = git fetch + git merge`. `fetch` downloads new commits from GitHub into your tracking branch without touching your working directory; `pull` merges them immediately into your active branch.",
        "**`git merge` vs. `git rebase`:** Merge preserves non-linear history with an explicit **Merge Commit**. Rebase replays your commits one-by-one on top of the base branch, producing a **clean linear timeline**.",
        "**The Golden Rule of Rebasing:** **NEVER rebase commits that have already been pushed to a public/shared branch (like `main`)!** Rebase rewrites commit SHA hashes; rebasing a shared branch causes chaotic merge conflicts for all teammates.",
        "**`git reset` vs. `git revert`:**\n  - `git reset`: Moves the branch pointer backward, rewriting local history (destructive). Use ONLY for local unpushed work!\n  - `git revert`: Creates a **new forward commit that applies the exact inverse changes**. Completely safe for public branches!"
      ],
      realWorldExample: "**Time Machine vs. An Apology Letter:**\n- **`git reset`** is like stepping into a time machine to erase a mistake from history. If nobody saw you make the mistake (local unpushed code), it's fine.\n- **`git revert`** is like publishing a formal newspaper correction acknowledging the error and fixing it. The history remains honest and intact for everyone reading the public record.",
      keyPoints: [
        "**Pull Mechanics:** `git pull` is the combination of `git fetch` (downloading commits) and `git merge` (integrating into local branch).",
        "**Golden Rule of Rebasing:** Never rebase commits that have already been pushed to a public or shared branch.",
        "**Reset vs. Revert:** `reset` rewrites history backwards (local only); `revert` creates a new forward inverse commit (safe for team branches)."
      ],
      quiz: [
        {
          question: "What is the 'Golden Rule' of Git Rebasing?",
          options: [
            "Always rebase before pushing to main",
            "Never rebase commits that have already been pushed to a public or shared branch",
            "Rebase every 5 minutes",
            "Rebase deletes all your unit tests"
          ],
          correct: 1,
          explanation: "Rebasing rewrites commit SHA hashes; rebasing a shared branch forces conflicting divergence on all teammates."
        },
        {
          question: "If you pushed a broken commit to a public team branch and need to undo it safely without rewriting public history, which command should you use?",
          options: [
            "git reset --hard",
            "git revert <commit-hash>",
            "git push --force",
            "rm -rf .git"
          ],
          correct: 1,
          explanation: "git revert creates a brand new forward commit that applies the exact inverse changes, keeping public branch history intact and transparent."
        }
      ]
    },
    {
      id: "devops-code-reviews-clean-code",
      title: "2. Code Reviews & Clean Code Practices",
      subtitle: "What senior engineers inspect in PRs & core design mantras",
      whatIsIt: "A **Code Review (Pull Request / PR Review)** is a peer review process where engineers inspect proposed code changes before merging them into production. **Clean Code** is code that is easy to read, simple to understand, and straightforward to change.",
      whyNeedIt: "Studies show that engineers spend **80% of their time reading existing code** and only 20% writing new code. Writing clean, reviewed code drastically reduces long-term software maintenance costs and prevents bugs from slipping into production.",
      howItWorks: [
        "**What Seniors Check in a PR:**\n  1. **Correctness:** Does it satisfy requirements and handle edge cases (`null`, empty lists)?\n  2. **Readability:** Are variable names clear and functions short (20-30 lines)? Are nested `if/else` ladders replaced with **Guard Clauses**?\n  3. **Security:** Are there SQL injections, XSS vulnerabilities, or committed `.env` secrets?\n  4. **Performance:** Are database queries running inside loops (**N+1 query problem**)?\n  5. **Testing:** Are unit and integration tests included?",
        "**Clean Code Mantras:**\n  - **DRY (Don't Repeat Yourself):** Avoid duplicate copy-pasted code; extract shared helpers.\n  - **KISS (Keep It Simple, Stupid):** Avoid premature over-engineering; build the simplest solution that works.\n  - **YAGNI (You Aren't Gonna Need It):** Don't build speculative features for imaginary future requirements."
      ],
      realWorldExample: "**Proofreading an Architectural Blueprint:**\nBefore builders pour concrete, master architects review the blueprints to check if doorways are wide enough, emergency exits aren't blocked by pipes, and structural weight is distributed safely. A PR review is that exact safety check!",
      keyPoints: [
        "**PR Focus Areas:** Check correctness, readability, security flaws, N+1 query loops, and automated test coverage.",
        "**Core Mantras:** DRY avoids code duplication, KISS ensures simplicity, and YAGNI rejects premature speculative features.",
        "**Guard Clauses:** Exit early with edge case checks to avoid deeply nested if/else pyramids."
      ],
      quiz: [
        {
          question: "What clean code principle advises software engineers against building speculative features for hypothetical future requirements?",
          options: [
            "DRY (Don't Repeat Yourself)",
            "KISS (Keep It Simple)",
            "YAGNI (You Aren't Gonna Need It)",
            "SOLID"
          ],
          correct: 2,
          explanation: "YAGNI stands for 'You Aren't Gonna Need It'—stating you should only implement features when actually needed, not in advance."
        },
        {
          question: "During a Pull Request review, an engineer discovers a database query executed inside a loop over 500 items. What performance anti-pattern is this?",
          options: [
            "Race Condition",
            "N+1 Query Problem",
            "Deadlock",
            "Memory Leak"
          ],
          correct: 1,
          explanation: "The N+1 query problem executes one initial query plus N additional queries inside a loop, resulting in 501 slow database round trips instead of 1 bulk query."
        }
      ]
    },
    {
      id: "devops-testing-pyramid",
      title: "3. Software Testing & The Testing Pyramid",
      subtitle: "Unit, Integration, E2E tests & Mocks vs. Stubs",
      whatIsIt: "Automated software testing verifies that code works correctly without human manual testing. The **Testing Pyramid** outlines the optimal balance of tests in a project: many fast **Unit Tests** at the bottom, fewer **Integration Tests** in the middle, and a minimal layer of **End-to-End (E2E) Tests** at the top.",
      whyNeedIt: "Relying purely on manual clicking or slow E2E tests means tests take hours to run and frequently fail due to network hiccups. A balanced testing pyramid runs hundreds of tests in seconds on every single code commit.",
      howItWorks: [
        "**Unit Tests (~70%):** Tests single functions or classes in complete isolation from databases or networks. Runs in milliseconds.",
        "**Integration Tests (~20%):** Verifies that multiple components collaborate properly (e.g. testing an Order Service against a real test database).",
        "**End-to-End (E2E) Tests (~10%):** Simulates a real user driving a browser UI (Cypress, Playwright). Slow, brittle, and expensive to maintain.",
        "**Test Doubles:**\n  - **Stub:** Returns canned, hardcoded responses to method calls (State verification).\n  - **Mock:** Pre-programmed to verify that specific methods were actually called with expected arguments (Behavior verification: `verify(emailService, times(1)).send()`).\n  - **Fake:** A working lightweight in-memory replacement (like an H2 in-memory database).",
        "**The AAA Pattern:** Structure every test cleanly: **Arrange** (set up inputs/mocks) $\\rightarrow$ **Act** (invoke method) $\\rightarrow$ **Assert** (verify results)."
      ],
      realWorldExample: "**Testing a Car Before Delivery:**\n- **Unit Test:** Testing each spark plug and fuel pump individually on a laboratory workbench.\n- **Integration Test:** Putting the engine, transmission, and driveshaft together on a test stand to verify they turn in sync.\n- **E2E Test:** A test driver driving the assembled car on a test track in rainy weather.",
      keyPoints: [
        "**Testing Pyramid Ratio:** ~70% fast Unit tests, ~20% Integration tests, and ~10% comprehensive E2E tests.",
        "**Mocks vs. Stubs:** Stubs supply canned answers for state checks; Mocks track method invocations for behavioral checks.",
        "**AAA Structure:** Arrange test data, Act on the function, Assert expectations."
      ],
      quiz: [
        {
          question: "In unit testing, what is the primary difference between a Stub and a Mock?",
          options: [
            "Stubs are written in Java, Mocks in Python",
            "A Stub returns canned data responses, while a Mock verifies that specific methods were invoked with expected arguments",
            "Mocks run faster than Stubs",
            "Stubs test databases only"
          ],
          correct: 1,
          explanation: "Stubs supply hardcoded data for state testing, while Mocks record and assert behavioral interactions (such as verifying emailService.send() was invoked)."
        },
        {
          question: "According to the Testing Pyramid, which test category should form the largest foundation of your automated test suite?",
          options: [
            "End-to-End (E2E) Tests",
            "Manual Quality Assurance Tests",
            "Fast Unit Tests",
            "Load and Stress Tests"
          ],
          correct: 2,
          explanation: "Unit tests are fast, isolated, and cheap to run, forming roughly 70% of a healthy automated test suite."
        }
      ]
    },
    {
      id: "devops-agile-scrum",
      title: "4. SDLC & The Agile Scrum Framework",
      subtitle: "Sprints, the 3 roles, 4 ceremonies & Story Points",
      whatIsIt: "**Agile** is an iterative software development approach that delivers working software increments in short 1- to 4-week cycles called **Sprints**. **Scrum** is the most popular framework implementing Agile principles.",
      whyNeedIt: "In traditional **Waterfall**, requirements were frozen for 12 months; by the time the software was finished, market needs had changed and the product was obsolete. Agile allows teams to adapt to client feedback every single sprint.",
      howItWorks: [
        "**The 3 Scrum Roles:**\n  - **Product Owner (PO):** Owns business value and prioritizes the Product Backlog ('What to build').\n  - **Scrum Master (SM):** Agile coach; facilitates meetings and removes team roadblocks ('Blockers').\n  - **Developers:** Self-organizing engineers who design, code, test, and ship the product.",
        "**The 4 Scrum Ceremonies:**\n  1. **Sprint Planning:** Commit to user stories for the upcoming sprint.\n  2. **Daily Stand-up (15 min):** What did I do yesterday? What will I do today? Any blockers?\n  3. **Sprint Review (Demo):** Showcase working software to stakeholders.\n  4. **Sprint Retrospective:** Internal team reflection: What went well? What went wrong? What can we improve next sprint?",
        "**Story Points (Fibonacci: 1, 2, 3, 5, 8, 13):** Measures relative **Complexity and Effort, NOT exact hours**! A task's complexity remains identical whether tackled by a senior or a junior engineer."
      ],
      realWorldExample: "**Building an Electric Car:**\n- **Waterfall:** Building the chassis in month 3, battery in month 6, wheels in month 9, and turning the key on month 12. If the battery doesn't fit, you fail.\n- **Agile:** Building a functional Skateboard in Sprint 1, a Scooter in Sprint 2, a Bicycle in Sprint 3, and a Car in Sprint 4. The customer has a working vehicle from day 1!",
      keyPoints: [
        "**The 3 Roles:** Product Owner prioritizes value, Scrum Master removes impediments, Developers build and test.",
        "**The 4 Ceremonies:** Planning, Daily Stand-up, Sprint Review demo, and Retrospective continuous improvement.",
        "**Relative Story Points:** Quantifies task complexity and risk using Fibonacci numbers rather than arbitrary hours."
      ],
      quiz: [
        {
          question: "In the Scrum agile framework, what is the primary responsibility of the Product Owner?",
          options: [
            "Writing all Java backend code",
            "Managing server infrastructure and Kubernetes",
            "Prioritizing the Product Backlog and defining what delivers the most business value",
            "Leading the daily stand-up meeting"
          ],
          correct: 2,
          explanation: "The Product Owner represents business stakeholders, deciding what features are built and prioritizing user stories in the backlog."
        },
        {
          question: "What do Story Points represent in agile estimation using Fibonacci sequences?",
          options: [
            "The exact number of hours a task will take",
            "The dollar cost of the feature",
            "Relative complexity, effort, and uncertainty of the task",
            "The number of lines of code to write"
          ],
          correct: 2,
          explanation: "Story points quantify relative effort and complexity compared to baseline stories, remaining consistent regardless of developer seniority."
        }
      ]
    },
    {
      id: "devops-docker-cicd",
      title: "5. Docker Containers & CI/CD Pipelines",
      subtitle: "Containers vs. VMs & zero-downtime deployment strategies",
      whatIsIt: "**Docker** packages an application along with all its runtime dependencies, libraries, and configs into a lightweight, standalone container. **CI/CD** automates the building, testing, and deployment of software to production servers.",
      whyNeedIt: "Eliminates the infamous excuse: *'It works on my machine, why is it failing in production?'* Docker ensures your app runs in the exact identical environment on a MacBook, a Linux server, or AWS Cloud.",
      howItWorks: [
        "**VMs vs. Docker Containers:**\n  - **Virtual Machines:** Heavy (GBs). Each VM runs a complete guest operating system on top of a hypervisor. Takes minutes to boot.\n  - **Docker Containers:** Ultra-lightweight (MBs). Containers **share the host OS kernel** directly. Starts in milliseconds like a normal process!",
        "**Continuous Integration (CI):** Code is automatically linted, compiled, and tested on every Pull Request.",
        "**Continuous Delivery vs. Deployment:** Delivery prepares code for release with a single manual click; Deployment automatically deploys every passed commit straight to live users with zero human approval.",
        "**Zero-Downtime Deployment Strategies:**\n  - **Rolling:** Gradually replaces old container instances with new ones (Kubernetes default; low resource cost).\n  - **Blue-Green:** Keeps two identical environments; router flips 100% traffic instantly from Blue to Green. Instant zero-downtime rollback!\n  - **Canary:** Routes 5% of live users to the new version, monitors error rates, and rolls out to 100% if healthy."
      ],
      realWorldExample: "**Shipping Containers in Global Trade:**\nBefore standardized shipping containers, loading cargo onto ships took days because barrels, boxes, and sacks had different shapes. Standardized ISO shipping containers fit onto any cargo ship, train, or semi-truck in the world without repackaging. Docker containers do the exact same thing for software!",
      keyPoints: [
        "**Kernel Sharing:** Docker containers share the host kernel for millisecond startup times and tiny footprints.",
        "**CI/CD Automation:** CI validates builds and tests on every commit; CD automates release staging and deployment.",
        "**Blue-Green Switching:** Provides immediate zero-downtime cutover and instant rollback capabilities."
      ],
      quiz: [
        {
          question: "Why do Docker containers start in milliseconds and use significantly less memory than Virtual Machines?",
          options: [
            "Containers do not use memory",
            "Containers share the host operating system kernel instead of booting a full guest OS",
            "Containers only run on Apple silicon",
            "Containers compress files using ZIP"
          ],
          correct: 1,
          explanation: "Because containers run as isolated processes on the host kernel without booting a virtual BIOS and guest operating system, they launch almost instantaneously."
        },
        {
          question: "Which zero-downtime deployment strategy maintains two identical production environments and flips 100% of router traffic to the new version once verified?",
          options: [
            "Rolling Deployment",
            "Blue-Green Deployment",
            "Cold Reboot Deployment",
            "Big Bang Deployment"
          ],
          correct: 1,
          explanation: "Blue-Green deployment provisions a parallel Green environment; after health checks pass, router traffic flips instantly from Blue to Green with zero user downtime."
        }
      ]
    }
  ],
  flashcards: [
    {
      term: "The Golden Rule of Rebasing",
      category: "Git",
      question: "What is the Golden Rule of Git Rebasing?",
      answer: "Never rebase commits that have already been pushed to a public or shared branch (like main). Rebase rewrites commit history and causes severe conflicts for teammates.",
      tip: "Only rebase local, unpushed feature branches."
    },
    {
      term: "Mock vs. Stub",
      category: "Testing",
      question: "What is the difference between a Mock and a Stub?",
      answer: "A Stub returns canned, hardcoded data (state verification). A Mock verifies behavioral expectations (verifying that a method was called with exact parameters).",
      tip: "Stub = Data answers. Mock = Behavior surveillance."
    },
    {
      term: "Blue-Green Deployment",
      category: "DevOps",
      question: "How does Blue-Green Deployment achieve zero downtime?",
      answer: "It maintains two identical production environments (Blue and Green). When Green is ready with the new release, the router flips traffic over instantly. Rollback is instantaneous.",
      tip: "Two complete parallel environments; flick of a switch."
    },
    {
      term: "Docker vs. Virtual Machines",
      category: "Containerization",
      question: "Why are Docker containers lighter and faster than Virtual Machines?",
      answer: "Containers share the host operating system kernel instead of booting a full guest OS, running as lightweight isolated processes in milliseconds.",
      tip: "Containers share the kernel; VMs run separate operating systems."
    }
  ]
};
