// Module 9: Software Engineering Practices, Testing & DevOps
// Comprehensive Study Data with 3 Levels of Learning

var topicDevOps = window.topicDevOps = {
  id: "devops",
  title: "Software Engineering Practices, Testing & DevOps",
  icon: "🚀",
  badge: "Module 09",
  description: "Master Git Internals (Merge vs. Rebase, Reset vs. Revert), PR Reviews, Testing Pyramid (Mocks/Stubs, AAA Pattern), Agile Scrum, Docker Containers, and CI/CD Deployments.",
  lessons: [
    {
      id: "git-internals-workflows",
      title: "1. Version Control with Git Internals & Team Workflows",
      level1: {
        intro: "Git is a distributed version control system that tracks code changes and lets teams collaborate without overwriting each other's work.",
        analogy: "Git is like a video game save system with branching timelines: Every commit is a saved checkpoint. Working directory is your active gameplay. Staging area is selecting which items to put in your backpack before saving. Branches allow you to test alternate story endings without corrupting your main campaign save.",
        svgDiagram: `<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="660" height="170" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="330" y="45" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="14" font-weight="700">GIT ARCHITECTURE &amp; DATA FLOW</text>

            <rect x="25" y="70" width="135" height="105" rx="6" fill="#1e3a5f" stroke="#64748b"/>
            <text x="92" y="95" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="700">Working Tree</text>
            <text x="92" y="115" text-anchor="middle" fill="#cbd5e1" font-size="10">Modified files</text>
            <text x="92" y="135" text-anchor="middle" fill="#94a3b8" font-size="10">Local disk edits</text>

            <path d="M 160 115 L 180 115" stroke="#4ade80" stroke-width="2"/>
            <text x="170" y="105" text-anchor="middle" fill="#4ade80" font-size="9">add</text>

            <rect x="180" y="70" width="135" height="105" rx="6" fill="#1e3a5f" stroke="#facc15"/>
            <text x="247" y="95" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="700">Staging Area</text>
            <text x="247" y="115" text-anchor="middle" fill="#cbd5e1" font-size="10">The Index</text>
            <text x="247" y="135" text-anchor="middle" fill="#94a3b8" font-size="10">Ready to commit</text>

            <path d="M 315 115 L 335 115" stroke="#4ade80" stroke-width="2"/>
            <text x="325" y="105" text-anchor="middle" fill="#4ade80" font-size="9">commit</text>

            <rect x="335" y="70" width="135" height="105" rx="6" fill="#064e3b" stroke="#22c55e"/>
            <text x="402" y="95" text-anchor="middle" fill="#4ade80" font-size="12" font-weight="700">Local Repo</text>
            <text x="402" y="115" text-anchor="middle" fill="#cbd5e1" font-size="10">HEAD (.git)</text>
            <text x="402" y="135" text-anchor="middle" fill="#94a3b8" font-size="10">Permanent history</text>

            <path d="M 470 115 L 490 115" stroke="#4ade80" stroke-width="2"/>
            <text x="480" y="105" text-anchor="middle" fill="#4ade80" font-size="9">push</text>

            <rect x="490" y="70" width="145" height="105" rx="6" fill="#1e3a5f" stroke="#38bdf8"/>
            <text x="562" y="95" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="700">Remote Repo</text>
            <text x="562" y="115" text-anchor="middle" fill="#cbd5e1" font-size="10">GitHub / GitLab</text>
            <text x="562" y="135" text-anchor="middle" fill="#94a3b8" font-size="10">Team sync</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### git fetch vs. git pull:
$$\\text{git pull} = \\text{git fetch} + \\text{git merge}$$
- \`git fetch\`: Downloads commits from the remote repository to your local tracking branch (\`origin/main\`). Never alters your active working directory or local branch. Safe to review diffs before merging.
- \`git pull\`: Automatically fetches and immediately merges incoming commits into your checked-out branch, which can trigger surprise merge conflicts.

### git merge vs. git rebase:
- **\`git merge\`:** Non-linear history. Preserves complete branching history by creating a dedicated **Merge Commit**. Existing commit hashes are completely untouched.
- **\`git rebase\`:** Linear history. Replays feature commits onto the tip of the target branch, producing a clean straight-line commit history.
- **The Golden Rule of Rebasing:** **NEVER rebase commits that have already been pushed to a public shared branch (like main or develop)**! Rebase regenerates commit hashes; force-pushing a rebased shared branch desynchronizes teammates' clones and triggers severe conflict loops.

### Undoing Commits: git reset vs. git revert:
- **\`git reset\` (Local History Rewrite):** Moves the branch pointer backward.
  - \`--soft\`: Undoes commit, preserves changes staged in the Staging Area.
  - \`--mixed\` (default): Undoes commit, unstages files into Working Directory.
  - \`--hard\`: Destructive! Permanently erases commit, staging area, and local changes.
- **\`git revert\` (Production-Safe):** Appends a **brand new forward commit** that applies the exact inverse changes of the target commit. History is preserved; always use on shared branches!`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "When should you use git revert instead of git reset?",
            shortA: "Use git reset for local unpushed commits. Use git revert for commits already pushed to public shared branches (like main).",
            deepA: "git reset rewrites Git history by moving the branch HEAD pointer backwards. If those commits have already been pulled by teammates, their local repository trees will diverge, requiring painful force-pushes and causing duplicate commits. In contrast, git revert is non-destructive: it records a new forward commit whose patch is the exact inverse of the target commit. This safely rolls back code while preserving historical integrity across all distributed clones.",
            followUp: "What is Git Cherry-Pick? A command (git cherry-pick <hash>) that extracts a single specific commit from another branch and applies its changes directly onto your active branch."
          }
        ]
      }
    },
    {
      id: "code-reviews-clean-code",
      title: "2. Code Reviews & Clean Code Practices",
      level1: {
        intro: "Writing code that a computer understands is easy. Writing code that human teammates can read, maintain, and safely update months later is what makes a great software engineer.",
        analogy: "Code reviews are like a double-check by a co-pilot before an airplane takes off: it's not about catching someone doing something wrong, but ensuring passenger safety (system stability) by having a second pair of expert eyes inspect the checklist.",
        svgDiagram: `<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="150" height="150" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="75" y="45" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="700">1. Correctness</text>
            <text x="75" y="75" text-anchor="middle" fill="#cbd5e1" font-size="11">Business logic</text>
            <text x="75" y="100" text-anchor="middle" fill="#cbd5e1" font-size="11">Edge cases</text>
            <text x="75" y="125" text-anchor="middle" fill="#cbd5e1" font-size="11">Null checks</text>

            <rect x="170" y="20" width="150" height="150" rx="8" fill="#1e293b" stroke="#4ade80" stroke-width="2"/>
            <text x="245" y="45" text-anchor="middle" fill="#4ade80" font-size="13" font-weight="700">2. Readability</text>
            <text x="245" y="75" text-anchor="middle" fill="#cbd5e1" font-size="11">Guard clauses</text>
            <text x="245" y="100" text-anchor="middle" fill="#cbd5e1" font-size="11">Naming intent</text>
            <text x="245" y="125" text-anchor="middle" fill="#cbd5e1" font-size="11">Short functions</text>

            <rect x="340" y="20" width="150" height="150" rx="8" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
            <text x="415" y="45" text-anchor="middle" fill="#facc15" font-size="13" font-weight="700">3. Security</text>
            <text x="415" y="75" text-anchor="middle" fill="#cbd5e1" font-size="11">No hardcoded keys</text>
            <text x="415" y="100" text-anchor="middle" fill="#cbd5e1" font-size="11">SQLi prevention</text>
            <text x="415" y="125" text-anchor="middle" fill="#cbd5e1" font-size="11">Input validation</text>

            <rect x="510" y="20" width="150" height="150" rx="8" fill="#1e293b" stroke="#f472b6" stroke-width="2"/>
            <text x="585" y="45" text-anchor="middle" fill="#f472b6" font-size="13" font-weight="700">4. Tests &amp; DB</text>
            <text x="585" y="75" text-anchor="middle" fill="#cbd5e1" font-size="11">Unit test coverage</text>
            <text x="585" y="100" text-anchor="middle" fill="#cbd5e1" font-size="11">No N+1 queries</text>
            <text x="585" y="125" text-anchor="middle" fill="#cbd5e1" font-size="11">Indexed lookups</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### Senior Engineer PR Review Checklist:
1. **Correctness & Edge Cases:** Handles empty arrays, zero balances, \`null\` / \`undefined\` boundaries, and matches acceptance criteria.
2. **Readability & Guard Clauses:** Deeply nested \`if/else\` logic replaced with clean early return guard clauses.
3. **Error Handling & Observability:** Never swallow exceptions (\`catch(e) {}\` anti-pattern). Log meaningful structured error metadata.
4. **Security & Secrets:** Ensure no secrets or API keys are committed. Verify parameterized queries and authorization checks.
5. **Database & Performance:** Check that database queries are not executed inside loops (**N+1 Query Problem**), and query filter columns have supporting indexes.
6. **Automated Test Coverage:** Includes unit/integration tests verifying happy path and failure cases.

### Clean Code Principles:
- **DRY (Don't Repeat Yourself):** Extract duplicated code into reusable shared abstractions.
- **KISS (Keep It Simple, Stupid):** Avoid premature over-engineering. Pick the simplest clean design that satisfies requirements.
- **YAGNI (You Aren't Gonna Need It):** Never build speculative features or extra layers based on guesses of future requirements.
- **Eliminate Magic Numbers & Strings:** Replace raw values like \`if (status === 3)\` with descriptive named constants (\`ORDER_SHIPPED = 3\`).`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "What do you look for when conducting a Pull Request (PR) code review?",
            shortA: "I review for business logic correctness, edge case handling, clean readability (guard clauses), security vulnerabilities (no leaked secrets, SQLi), database query efficiency (avoiding N+1 queries), and automated test coverage.",
            deepA: "A senior code review assesses: 1) Architecture: Does it respect Single Responsibility, DRY, and domain boundaries? 2) Maintainability: Are functions short and self-documenting without deeply nested conditional blocks? 3) Resilience: Is exception handling structured or are errors silently swallowed? 4) Performance: Are there unindexed database scans or N+1 query loops? 5) Security: Are inputs validated and secrets excluded from version control? 6) Testing: Do automated tests cover both successful execution and negative edge-case failures?",
            followUp: "What is a Guard Clause? An early return statement at the start of a function that handles boundary invalid conditions immediately, flattening nested if/else blocks."
          }
        ]
      }
    },
    {
      id: "testing-pyramid-aaa",
      title: "3. Software Testing Fundamentals: The Testing Pyramid & AAA Pattern",
      level1: {
        intro: "Automated testing gives engineering teams the confidence to deploy code changes rapidly without breaking existing features. The Testing Pyramid guides how to balance test types for maximum speed and reliability.",
        analogy: "Building an automated test suite is like inspecting a new car: Unit tests verify that every spark plug, wire, and bolt works individually in a workshop. Integration tests check that the transmission connects smoothly to the engine. E2E tests are taking the car out for a test drive on the highway.",
        svgDiagram: `<svg viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <polygon points="350,20 180,180 520,180" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
            <polygon points="350,20 290,80 410,80" fill="#4c0519" stroke="#f43f5e"/>
            <text x="350" y="60" text-anchor="middle" fill="#fb7185" font-size="11" font-weight="700">E2E Tests (~10%)</text>
            <text x="350" y="73" text-anchor="middle" fill="#cbd5e1" font-size="9">Slow, Expensive (Playwright)</text>

            <polygon points="290,80 235,130 465,130 410,80" fill="#78350f" stroke="#f59e0b"/>
            <text x="350" y="105" text-anchor="middle" fill="#facc15" font-size="12" font-weight="700">Integration Tests (~20%)</text>
            <text x="350" y="122" text-anchor="middle" fill="#cbd5e1" font-size="10">DB &amp; Service Interactions</text>

            <polygon points="235,130 180,180 520,180 465,130" fill="#064e3b" stroke="#22c55e"/>
            <text x="350" y="155" text-anchor="middle" fill="#4ade80" font-size="13" font-weight="700">Unit Tests (~70%)</text>
            <text x="350" y="172" text-anchor="middle" fill="#cbd5e1" font-size="10">Fastest, Isolated, Highest ROI (JUnit/Jest)</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### The Testing Pyramid (Mike Cohn):
1. **Unit Tests (~70%):** Tests single functions or classes in complete isolation from external databases and networks. Runs in milliseconds; provides immediate developer feedback.
2. **Integration Tests (~20%):** Verifies that multiple components communicate properly (e.g. testing Spring Boot repository queries against a Dockerized test container database).
3. **End-to-End (E2E) Tests (~10%):** Drives a simulated browser (Playwright, Cypress) through complete user workflows. High maintenance cost and prone to flakiness.

### Test Doubles: Mocks vs. Stubs vs. Fakes:
- **Stub (State Verification):** Returns hardcoded, canned responses to method calls during a test.
- **Mock (Behavior Verification):** Verifies whether specific methods were actually invoked, with what parameters, and how many times (\`verify(mock, times(1)).charge(500.0)\`).
- **Fake:** A lightweight working in-memory implementation (e.g. H2 in-memory database).

### The AAA Pattern (Arrange, Act, Assert):
Standard structure for clean unit tests:
1. **Arrange:** Set up input test data, mocks, and expectations.
2. **Act:** Execute the single target method under test.
3. **Assert:** Verify output state and interaction expectations.`,
        codeExamples: [
          {
            title: "Clean Unit Test with JUnit 5 & Mockito (AAA Pattern)",
            language: "java",
            code: `@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private PaymentGateway paymentGatewayMock;

    @Mock
    private OrderRepository orderRepositoryMock;

    @InjectMocks
    private OrderService orderService; // Class under test

    @Test
    void shouldProcessOrderSuccessfullyWhenPaymentSucceeds() {
        // 1. ARRANGE: Set up inputs and stub mock behavior
        Order order = new Order("ORD-101", 500.0);
        when(paymentGatewayMock.charge(500.0)).thenReturn(true); // Stub

        // 2. ACT: Execute target method
        boolean isSuccess = orderService.processOrder(order);

        // 3. ASSERT: Verify output and mock interactions
        assertTrue(isSuccess, "Order processing should succeed");
        verify(paymentGatewayMock, times(1)).charge(500.0); // Behavior Verification
        verify(orderRepositoryMock, times(1)).save(order);
    }
}`
          }
        ]
      },
      level3: {
        interviewQA: [
          {
            q: "What is the exact difference between a Mock and a Stub in unit testing?",
            shortA: "A Stub is for State Verification (returns canned responses to calls). A Mock is for Behavior Verification (records and verifies whether methods were actually called).",
            deepA: "A Stub provides pre-programmed answers to method calls made during a test, allowing the code under test to proceed without executing real external dependencies. Stubs do not care whether you call them 0 times or 10 times. A Mock sets explicit expectations about interactions: it records which methods were called, with what arguments, and how many times, asserting that the expected collaboration took place (e.g. verify(emailService, times(1)).sendConfirmationEmail(user)).",
            followUp: "What is the Test-Driven Development (TDD) cycle? Red (write a failing unit test), Green (write the minimum code to pass the test), Refactor (clean up and optimize design while keeping tests green)."
          }
        ]
      }
    },
    {
      id: "agile-scrum-framework",
      title: "4. SDLC & Agile / Scrum Framework",
      level1: {
        intro: "Agile is the standard management framework modern software teams use to plan, build, and ship features iteratively in short 2-week cycles called Sprints.",
        analogy: "Waterfall is like building a space rocket: you spend 5 years designing, building, and assembling it before launch—if it fails at launch, all 5 years are lost. Agile is like driving a car with GPS: you make progress in short turns, recalculating and adjusting course based on live traffic updates every few miles.",
        svgDiagram: `<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="150" height="150" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="75" y="45" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="700">Sprint Planning</text>
            <text x="75" y="75" text-anchor="middle" fill="#cbd5e1" font-size="11">Sprint kickoff</text>
            <text x="75" y="100" text-anchor="middle" fill="#cbd5e1" font-size="11">Select backlog items</text>
            <text x="75" y="125" text-anchor="middle" fill="#cbd5e1" font-size="11">Commit Sprint Goal</text>

            <rect x="170" y="20" width="150" height="150" rx="8" fill="#1e293b" stroke="#4ade80" stroke-width="2"/>
            <text x="245" y="45" text-anchor="middle" fill="#4ade80" font-size="13" font-weight="700">Daily Stand-Up</text>
            <text x="245" y="75" text-anchor="middle" fill="#cbd5e1" font-size="11">15-minute sync</text>
            <text x="245" y="100" text-anchor="middle" fill="#cbd5e1" font-size="11">Yesterday / Today</text>
            <text x="245" y="125" text-anchor="middle" fill="#facc15" font-size="11">Surface blockers</text>

            <rect x="340" y="20" width="150" height="150" rx="8" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
            <text x="415" y="45" text-anchor="middle" fill="#facc15" font-size="13" font-weight="700">Sprint Review</text>
            <text x="415" y="75" text-anchor="middle" fill="#cbd5e1" font-size="11">End of sprint</text>
            <text x="415" y="100" text-anchor="middle" fill="#cbd5e1" font-size="11">Live demo to users</text>
            <text x="415" y="125" text-anchor="middle" fill="#cbd5e1" font-size="11">Gather feedback</text>

            <rect x="510" y="20" width="150" height="150" rx="8" fill="#1e293b" stroke="#a855f7" stroke-width="2"/>
            <text x="585" y="45" text-anchor="middle" fill="#c084fc" font-size="13" font-weight="700">Retrospective</text>
            <text x="585" y="75" text-anchor="middle" fill="#cbd5e1" font-size="11">Team reflection</text>
            <text x="585" y="100" text-anchor="middle" fill="#cbd5e1" font-size="11">What went well?</text>
            <text x="585" y="125" text-anchor="middle" fill="#4ade80" font-size="11">Continuous growth</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### The 3 Scrum Roles:
1. **Product Owner (PO):** Owns the business vision and prioritizes the Product Backlog. Decides **what to build**.
2. **Scrum Master:** Servant leader and coach. Facilitates ceremonies, removes impediments (blockers), and shields the team from external distractions.
3. **Development Team:** Self-organizing, cross-functional engineers who design, build, test, and ship working software increments.

### The 4 Scrum Ceremonies:
1. **Sprint Planning:** Team commits to backlog items for the upcoming sprint.
2. **Daily Stand-up (15 mins):** Answers: What did I do yesterday? What will I do today? Any blockers?
3. **Sprint Review (Demo):** Demonstrates working software increment to stakeholders.
4. **Sprint Retrospective:** Team inspects its own processes: What worked? What failed? Actionable adjustments for next sprint.

### Story Points & Fibonacci Estimation:
- **Story Points measure Effort, Complexity, and Risk, NOT raw hours!**
- Estimated via Planning Poker using Fibonacci numbers (\`1, 2, 3, 5, 8, 13, 21\`).
- **Why not hours?** A task taking a senior engineer 2 hours might take a junior engineer 8 hours, but its inherent complexity remains identical. Tracking story points establishes predictable team **Velocity**.`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "Why do Agile teams estimate tasks in Story Points (Fibonacci) rather than exact hours?",
            shortA: "Story Points estimate relative complexity, scope, and uncertainty rather than developer-specific hours, enabling consistent team velocity tracking regardless of who works on the task.",
            deepA: "Estimating in hours is notoriously inaccurate because humans are overly optimistic, and task completion speed varies drastically between junior and senior developers. However, the intrinsic complexity and risk of a feature remain constant for the entire team. Using Fibonacci numbers (1, 2, 3, 5, 8, 13) reflects that as tasks become larger, uncertainty scales exponentially. By tracking how many story points the team delivers across sprints, managers can forecast sprint velocity reliably.",
            followUp: "What is the Definition of Done (DoD)? A formal shared checklist of criteria (e.g. code reviewed, unit tests passing, deployed to staging, docs updated) that a story must satisfy to be declared complete."
          }
        ]
      }
    },
    {
      id: "docker-containerization",
      title: "5. Docker & Containerization Basics",
      level1: {
        intro: "Docker packages your code, runtime, and libraries into a portable container that runs identically on your laptop, a teammate's MacBook, and production cloud servers, solving the classic 'It works on my machine!' problem.",
        analogy: "A Virtual Machine is like building an entire physical house from the ground up with its own foundation, plumbing, and roof for every guest. A Docker container is like renting an apartment in a high-rise building: every apartment has its own locked private room, but they all share the building's central heating and plumbing (the shared OS kernel).",
        svgDiagram: `<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="310" height="170" rx="8" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
            <text x="155" y="45" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="700">VIRTUAL MACHINES (Heavy)</text>
            <rect x="20" y="60" width="80" height="30" rx="4" fill="#334155"/><text x="60" y="80" text-anchor="middle" fill="#fff" font-size="10">App 1</text>
            <rect x="115" y="60" width="80" height="30" rx="4" fill="#334155"/><text x="155" y="80" text-anchor="middle" fill="#fff" font-size="10">App 2</text>
            <rect x="210" y="60" width="80" height="30" rx="4" fill="#334155"/><text x="250" y="80" text-anchor="middle" fill="#fff" font-size="10">App 3</text>
            <rect x="20" y="100" width="270" height="30" rx="4" fill="#4c0519" stroke="#f43f5e"/><text x="155" y="120" text-anchor="middle" fill="#fb7185" font-size="11" font-weight="700">Guest OS per VM (GBs of RAM)</text>
            <rect x="20" y="140" width="270" height="30" rx="4" fill="#1e3a5f"/><text x="155" y="160" text-anchor="middle" fill="#38bdf8" font-size="11">Hypervisor Hardware Virtualization</text>

            <rect x="350" y="20" width="310" height="170" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="505" y="45" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="700">DOCKER CONTAINERS (Lightweight)</text>
            <rect x="370" y="60" width="80" height="30" rx="4" fill="#064e3b" stroke="#22c55e"/><text x="410" y="80" text-anchor="middle" fill="#4ade80" font-size="10">App 1</text>
            <rect x="465" y="60" width="80" height="30" rx="4" fill="#064e3b" stroke="#22c55e"/><text x="505" y="80" text-anchor="middle" fill="#4ade80" font-size="10">App 2</text>
            <rect x="560" y="60" width="80" height="30" rx="4" fill="#064e3b" stroke="#22c55e"/><text x="600" y="80" text-anchor="middle" fill="#4ade80" font-size="10">App 3</text>
            <rect x="370" y="100" width="270" height="30" rx="4" fill="#1e3a5f" stroke="#38bdf8"/><text x="505" y="120" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">Docker Engine (No Guest OS!)</text>
            <rect x="370" y="140" width="270" height="30" rx="4" fill="#0f172a"/><text x="505" y="160" text-anchor="middle" fill="#4ade80" font-size="11">Shared Host OS Kernel (MBs, Milliseconds)</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### VMs vs. Docker Containers:
- **Virtual Machines:** Each VM bundles an entire independent **Guest Operating System** running on a Hypervisor. Slow boot times (minutes) and massive disk footprint (Gigabytes).
- **Docker Containers:** Containers **share the Host OS Kernel** directly. They run as isolated processes using Linux **Namespaces** (isolation) and **Cgroups** (resource throttling). Boot time is in milliseconds; images are in Megabytes.

### Core Docker Components:
- **\`Dockerfile\`:** Recipe instructions to build an image.
- **Docker Image:** Immutable read-only template.
- **Docker Container:** Running instance of an image.
- **Docker Volumes:** Persistent storage mapped to host filesystem (prevents data loss when containers restart).
- **Docker Compose:** Tool for defining and running multi-container applications (e.g. App + DB + Redis) via a single YAML file.`,
        codeExamples: [
          {
            title: "Multi-Stage Dockerfile for Spring Boot / Java Applications",
            language: "dockerfile",
            code: `# Stage 1: Build the Application
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

# Stage 2: Minimal Runtime Image (Reduces image size from 800MB to 150MB)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]`
          }
        ]
      },
      level3: {
        interviewQA: [
          {
            q: "What happens to data inside a Docker container when that container is deleted, and how do you prevent data loss?",
            shortA: "Any data written to a container's writable layer is permanently deleted when the container is removed. Prevent loss using Docker Named Volumes or Bind Mounts.",
            deepA: "Docker containers use a copy-on-write storage driver where running changes are stored in an ephemeral writable container layer. When a container is removed (docker rm), this layer is completely erased. For stateful workloads like PostgreSQL or MongoDB, you must configure Docker Volumes (docker run -v my_data:/var/lib/postgresql/data), which map container storage directly to a dedicated persistent directory on the host filesystem that survives container restarts and upgrades.",
            followUp: "Why use Multi-Stage Docker builds? To separate the build environment (with heavy compilers and SDKs) from the final production runtime image, resulting in lightweight, secure images with small attack surfaces."
          }
        ]
      }
    },
    {
      id: "cicd-deployment-strategies",
      title: "6. CI/CD Pipelines & Zero-Downtime Deployment Strategies",
      level1: {
        intro: "CI/CD automates the testing and delivery of code so teams can deploy updates to production safely multiple times a day without causing downtime for users.",
        analogy: "A CI/CD pipeline is like a car factory quality-assurance assembly line: every part is laser-measured, stress-tested, and painted automatically before being cleared for the showroom floor. If a part fails an inspection, the assembly line pauses immediately.",
        svgDiagram: `<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="660" height="170" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="330" y="45" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="14" font-weight="700">ZERO-DOWNTIME DEPLOYMENT STRATEGIES</text>

            <rect x="30" y="70" width="180" height="100" rx="8" fill="#1e3a5f" stroke="#38bdf8"/>
            <text x="120" y="95" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="700">Rolling Deployment</text>
            <text x="120" y="115" text-anchor="middle" fill="#cbd5e1" font-size="10">Replaces 1 pod at a time</text>
            <text x="120" y="135" text-anchor="middle" fill="#4ade80" font-size="10">Zero extra hardware cost</text>
            <text x="120" y="155" text-anchor="middle" fill="#cbd5e1" font-size="10">Kubernetes default</text>

            <rect x="240" y="70" width="180" height="100" rx="8" fill="#1e3a5f" stroke="#22c55e"/>
            <text x="330" y="95" text-anchor="middle" fill="#4ade80" font-size="12" font-weight="700">Blue-Green</text>
            <text x="330" y="115" text-anchor="middle" fill="#cbd5e1" font-size="10">2 identical environments</text>
            <text x="330" y="135" text-anchor="middle" fill="#4ade80" font-size="10">Instant router cutover</text>
            <text x="330" y="155" text-anchor="middle" fill="#facc15" font-size="10">Instant rollback, 2x cost</text>

            <rect x="450" y="70" width="180" height="100" rx="8" fill="#1e3a5f" stroke="#facc15"/>
            <text x="540" y="95" text-anchor="middle" fill="#facc15" font-size="12" font-weight="700">Canary Deployment</text>
            <text x="540" y="115" text-anchor="middle" fill="#cbd5e1" font-size="10">Routes 5% live traffic</text>
            <text x="540" y="135" text-anchor="middle" fill="#cbd5e1" font-size="10">Monitors error rates</text>
            <text x="540" y="155" text-anchor="middle" fill="#4ade80" font-size="10">Safest for high scale</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### CI vs. CD (Delivery vs. Deployment):
- **Continuous Integration (CI):** Automates linting, building, and running test suites on every pull request to catch bugs early.
- **Continuous Delivery:** Automates packaging and deploying to a Staging environment; production release requires a **Manual Approval Click**.
- **Continuous Deployment:** Extends Continuous Delivery by deploying every green commit **directly into Live Production with zero human intervention**.

### Zero-Downtime Deployment Strategies:
1. **Rolling Deployment:** Gradually replaces instances of the old version with the new version one by one until 100% updated. No extra hardware cost; standard Kubernetes strategy.
2. **Blue-Green Deployment:** Maintains two identical production environments (Blue and Green). Version 2 is deployed to idle Green. Once health checks pass, the load balancer switches 100% traffic to Green instantly. Rollback is instantaneous (switch traffic back to Blue). Requires 2x infrastructure capacity.
3. **Canary Deployment:** Routes a tiny slice of live user traffic (e.g. 5%) to the new version. Telemetry and error rates are monitored before ramping traffic up to 100%. Safest strategy for high-scale platforms.`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "What is the difference between Continuous Delivery and Continuous Deployment?",
            shortA: "Continuous Delivery keeps software always ready for production with an automated pipeline, but requires a manual approval click to deploy. Continuous Deployment deploys automatically to production with zero manual intervention.",
            deepA: "In Continuous Delivery, every commit that passes automated linting, unit testing, and integration testing is automatically packaged as a container image and deployed to a staging environment. However, releasing to production requires a human decision gate (a manual click by a release manager). Continuous Deployment removes this manual gate completely: every commit that passes the automated CI test pipeline is deployed immediately and autonomously to live production users.",
            followUp: "What is a Canary Deployment? Releasing a new software version to a small, randomized fraction of real users (e.g. 2-5%), monitoring telemetry for latency or error spikes, and rolling back automatically if errors breach thresholds."
          }
        ]
      }
    },
    {
      id: "deep-dive-interview-qa",
      title: "7. Deep-Dive & Tricky DevOps / SE Interview Questions",
      level1: {
        intro: "These 7 interview questions test practical software engineering maturity, Git troubleshooting, and container architecture.",
        analogy: "Like an experienced airline pilot reviewing emergency cockpit flight manuals, senior engineers understand how to diagnose production pipelines and Git merge anomalies."
      },
      level2: {
        technicalExplanation: "Review each deep-dive question below. These represent actual technical interview scenarios from top tech companies."
      },
      level3: {
        interviewQA: [
          {
            q: "If an application has 100% Unit Test coverage, why can it still fail catastrophically in production?",
            shortA: "Unit tests test classes in total isolation using mocks. They cannot catch database type mismatches, connection pool exhaustion, network timeouts, or concurrency deadlocks.",
            deepA: "High unit test code coverage only proves that code paths execute without errors when external dependencies are replaced by predictable mocks. In real production environments, failures typically arise from integration and infrastructure boundaries: 1) Database schema type mismatches; 2) Connection pool starvation; 3) Distributed network timeouts; 4) Concurrency race conditions and deadlocks under heavy load; 5) Misconfigured environment secrets. Integration tests and staging smoke tests are essential."
          },
          {
            q: "What is a Git 'Detached HEAD' state and how do you recover from it?",
            shortA: "Detached HEAD means HEAD points directly to a commit hash rather than a named branch. Fix it by creating a new branch: git switch -c my-new-branch.",
            deepA: "Normally in Git, HEAD points to a named branch reference (e.g. refs/heads/main). When you run 'git checkout <commit-hash>', HEAD detaches and points directly to that commit object. If you make new commits while in a detached HEAD state, they do not belong to any branch. If you checkout another branch, those commits become orphaned and eligible for Git garbage collection. To preserve your work, create a new branch from that state: git switch -c fix-branch."
          },
          {
            q: "Why should you NEVER rebase a public branch that teammates have already pulled?",
            shortA: "Rebasing recalculates commit SHA hashes. Force-pushing a rebased shared branch desynchronizes teammates' clones, causing severe merge conflicts and duplicate commit histories.",
            deepA: "Git rebase works by taking commits and applying their diffs onto a new base, which assigns completely new SHA hashes to each replayed commit. If you rebase a shared branch (like develop or main) and force-push it, your teammates' local clones still reference the old commit hashes. When they pull or push, Git attempts to reconcile two different commit histories containing identical code changes under different hashes, triggering catastrophic merge conflicts and duplicate commit logs."
          }
        ]
      }
    },
    {
      id: "quick-revision-cheat-sheet",
      title: "8. Two-Minute Pre-Interview Revision Cheat Sheet",
      level1: {
        intro: "Review this quick-reference cheat sheet right before walking into your technical interview room!"
      },
      level2: {
        technicalExplanation: `### Master DevOps & Software Engineering Cheat Sheet:

- **Git Quick Reference:**
  - \`git pull\` = \`git fetch\` + \`git merge\`.
  - \`git merge\`: Preserves branching history, creates a merge commit.
  - \`git rebase\`: Creates linear history, rewrites commit hashes (Never rebase public shared branches!).
  - \`git reset\`: Rewrites local history. \`--soft\` preserves staged changes, \`--hard\` deletes all uncommitted edits.
  - \`git revert\`: Appends a new inverse commit. Safe for shared branches.
- **Testing Pyramid:** Unit Tests (70% - fast, isolated) $\\rightarrow$ Integration Tests (20% - DB & services) $\\rightarrow$ E2E Tests (10% - browser UI).
- **Test Doubles:** Stub = Canned data (State). Mock = Interaction verification (Behavior). Fake = Working in-memory replacement.
- **Scrum Ceremonies:** Sprint Planning $\\rightarrow$ Daily Stand-up (15 mins) $\\rightarrow$ Sprint Review (Demo) $\\rightarrow$ Retrospective (Continuous improvement).
- **Docker vs. VMs:** Docker shares Host OS Kernel, lightweight (MBs), starts in milliseconds. VMs run full Guest OS on Hypervisor, heavy (GBs), starts in minutes.
- **Deployment Strategies:**
  - **Rolling:** Gradually replaces instances. Zero extra hardware cost.
  - **Blue-Green:** Two parallel environments. Instant router switch and zero-downtime rollback.
  - **Canary:** Routes 5% of live traffic to the new version, validates telemetry, then rolls out to 100%.
- **Clean Code Mantras:** DRY (Don't Repeat Yourself), KISS (Keep It Simple), YAGNI (You Aren't Gonna Need It).`
      },
      level3: {
        interviewQA: []
      }
    }
  ],
  "flashcards": [
    {
      "term": "Golden Rule of Git Rebase",
      "category": "Git Internals",
      "question": "What is the Golden Rule of Git Rebase?",
      "answer": "Never rebase a branch that has been published/pushed to a shared public remote (like main or develop). Rebase rewrites commit SHA hashes, corrupting teammates' repositories.",
      "tip": "Rebase local feature branches only; never public shared branches."
    },
    {
      "term": "Mock vs. Stub",
      "category": "Testing Architecture",
      "question": "What is the difference between Mocking and Stubbing in unit tests?",
      "answer": "A Stub provides canned return values for state verification (when(repo.find(1)).thenReturn(user)). A Mock verifies interactions and behavior (verify(emailService, times(1)).sendWelcomeEmail()).",
      "tip": "Stub = provides data; Mock = verifies calls."
    },
    {
      "term": "Containers vs. Virtual Machines",
      "category": "DevOps & Containers",
      "question": "Why do Docker containers start in milliseconds while VMs take minutes?",
      "answer": "Containers share the host OS kernel and isolate user space using Linux cgroups and namespaces. VMs require booting an entire guest operating system on top of a hypervisor.",
      "tip": "Containers share host kernel; VMs boot guest OS."
    },
    {
      "term": "Blue-Green vs. Canary Deployment",
      "category": "Deployment Strategies",
      "question": "How does Blue-Green deployment differ from Canary deployment?",
      "answer": "Blue-Green runs two identical production environments and switches router traffic 100% all at once. Canary routes a tiny percentage (e.g. 5%) of live users to the new version to monitor metrics before full rollout.",
      "tip": "Blue-Green = 100% traffic flip; Canary = Gradual traffic percentage."
    }
  ]
};
