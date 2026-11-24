// Module 6: Backend Architecture & System Design
// Comprehensive Study Data with 3 Levels of Learning

var topicBackend = window.topicBackend = {
  id: "backend",
  title: "Backend Architecture & System Design",
  icon: "🏗️",
  badge: "Module 06",
  description: "Master REST/gRPC/GraphQL, Keyset Pagination, Modular Monoliths vs. Microservices, Saga Pattern, Redis Caching, Apache Kafka, Circuit Breakers, and System Design.",
  lessons: [
    {
      id: "api-design-paradigms",
      title: "1. API Design & Communication Paradigms (REST vs. GraphQL vs. gRPC)",
      level1: {
        intro: "An API is the front door of your backend service. How you design endpoints and choose between REST, GraphQL, or gRPC determines the speed, flexibility, and maintainability of your entire system.",
        analogy: "REST is like ordering from a fixed fast-food combo menu (Combo #1 gives you burger and fries, whether you want fries or not). GraphQL is like a build-your-own salad bar (you tell the chef the exact ingredients you want in one bowl). gRPC is like a pneumatic tube in a bank drive-through (ultra-fast, binary capsule sent directly between internal branch offices).",
        svgDiagram: `<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="200" height="160" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="100" y="45" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="14" font-weight="700">REST (Resource-Based)</text>
            <text x="100" y="70" text-anchor="middle" fill="#cbd5e1" font-size="11">JSON over HTTP/1.1 or HTTP/2</text>
            <text x="100" y="95" text-anchor="middle" fill="#cbd5e1" font-size="11">Multiple endpoints (/users, /orders)</text>
            <text x="100" y="120" text-anchor="middle" fill="#cbd5e1" font-size="11">Prone to over/under-fetching</text>
            <text x="100" y="150" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="700">Best for: Public APIs &amp; CRUD</text>

            <rect x="230" y="20" width="200" height="160" rx="10" fill="#1e293b" stroke="#eab308" stroke-width="2"/>
            <text x="330" y="45" text-anchor="middle" fill="#facc15" font-family="system-ui" font-size="14" font-weight="700">GraphQL (Query-Based)</text>
            <text x="330" y="70" text-anchor="middle" fill="#cbd5e1" font-size="11">Single POST /graphql endpoint</text>
            <text x="330" y="95" text-anchor="middle" fill="#cbd5e1" font-size="11">Client requests exact fields</text>
            <text x="330" y="120" text-anchor="middle" fill="#cbd5e1" font-size="11">Zero over/under-fetching</text>
            <text x="330" y="150" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="700">Best for: Complex Mobile UIs</text>

            <rect x="460" y="20" width="200" height="160" rx="10" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
            <text x="560" y="45" text-anchor="middle" fill="#4ade80" font-family="system-ui" font-size="14" font-weight="700">gRPC (RPC-Based)</text>
            <text x="560" y="70" text-anchor="middle" fill="#cbd5e1" font-size="11">Protocol Buffers over HTTP/2</text>
            <text x="560" y="95" text-anchor="middle" fill="#cbd5e1" font-size="11">Strict binary serialization</text>
            <text x="560" y="120" text-anchor="middle" fill="#cbd5e1" font-size="11">5x-10x faster than REST</text>
            <text x="560" y="150" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="700">Best for: Internal Microservices</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### RESTful API Design Standards:
1. **Nouns, Not Verbs:** Use \`GET /api/v1/orders\` instead of \`/getOrders\`.
2. **Plural Resource Names:** Keep endpoints consistent (\`/users\`, \`/products\`).
3. **Hierarchical Relationships:** \`GET /api/v1/orders/102/items\` represents sub-resources cleanly.
4. **Correct HTTP Methods:** \`GET\` (Read), \`POST\` (Create), \`PUT\` (Replace), \`PATCH\` (Partial Update), \`DELETE\` (Remove).

### Pagination: Offset-Based vs. Cursor-Based:
- **Offset Pagination (\`LIMIT 20 OFFSET 100000\`):** Scans 100,020 records from disk into RAM before discarding the first 100,000 ($O(N)$ disk I/O). Prone to **Row Slippage** (insertions cause duplicate rows across pages).
- **Cursor-Based (Keyset) Pagination (\`WHERE id > 'last_seen_id' LIMIT 20\`):** The database uses the B+ Tree index on the primary key to jump directly to the target record in **$O(\\log N)$ Time Complexity**. Constant ultra-low latency regardless of table size. Ideal for infinite scrolling feeds.

### Rate Limiting Algorithms:
- **Token Bucket (Stripe/AWS standard):** Tokens refill at steady rate $R$; bursts allowed if bucket has capacity.
- **Leaky Bucket:** Requests enter a queue and leak out at a strictly constant rate, smoothing traffic spikes.
- **Sliding Window Counter (Redis):** Uses Redis Sorted Sets (\`ZREMRANGEBYSCORE\`) to count timestamps within a rolling window. Eliminates edge-boundary traffic burst exploits.`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "Why does OFFSET pagination collapse at scale and how does Cursor Pagination fix it?",
            shortA: "OFFSET N forces the database to read N rows from disk into memory and discard them (O(N) cost). Cursor pagination seeks directly to the indexed key in O(log N) time.",
            deepA: "When executing SELECT * FROM orders ORDER BY id LIMIT 20 OFFSET 500000, the database engine must traverse 500,020 index or data page entries, allocate buffer memory, and throw away the first 500,000 rows. This creates severe disk I/O and query latency. Cursor-based pagination replaces OFFSET with a WHERE clause: WHERE id > 500000 LIMIT 20. Because the id column is indexed by a B+ Tree, the engine performs an O(log N) tree search directly to key 500000 and reads the next 20 rows sequentially. It also eliminates data duplication caused by concurrent row inserts.",
            followUp: "When is Offset pagination still acceptable? For small tables (< 5,000 rows) or internal administrative dashboards that strictly require jumping to arbitrary page numbers (e.g., 'Go to Page 15')."
          }
        ]
      }
    },
    {
      id: "architecture-styles-saga",
      title: "2. Architecture Styles: Monolith vs. Microservices & The Saga Pattern",
      level1: {
        intro: "How you organize your software systems across servers and databases determines how fast your engineering team can ship features and how resilient the app is to crashes.",
        analogy: "A Monolith is like a Swiss Army Knife: everything is in one tool. If you lose the knife, you lose everything. Microservices are like a specialized toolbox: separate hammer, pliers, and screwdriver. If the hammer breaks, you can still use the pliers, but carrying the heavy toolbox requires coordination.",
        svgDiagram: `<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="660" height="170" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
            <text x="330" y="45" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="14" font-weight="700">THE SAGA PATTERN (Distributed Transactions with Compensating Rollbacks)</text>

            <rect x="30" y="70" width="160" height="90" rx="8" fill="#1e3a5f" stroke="#38bdf8"/>
            <text x="110" y="95" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="700">1. Order Service</text>
            <text x="110" y="115" text-anchor="middle" fill="#cbd5e1" font-size="10">Create Order (PENDING)</text>
            <text x="110" y="145" text-anchor="middle" fill="#ef4444" font-size="10">Compensate: Cancel Order</text>

            <path d="M 190 100 L 250 100" stroke="#4ade80" stroke-width="2"/>

            <rect x="250" y="70" width="160" height="90" rx="8" fill="#1e3a5f" stroke="#38bdf8"/>
            <text x="330" y="95" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="700">2. Payment Service</text>
            <text x="330" y="115" text-anchor="middle" fill="#cbd5e1" font-size="10">Charge Card ($100)</text>
            <text x="330" y="145" text-anchor="middle" fill="#ef4444" font-size="10">Compensate: Refund $100</text>

            <path d="M 410 100 L 470 100" stroke="#ef4444" stroke-width="2"/>

            <rect x="470" y="70" width="160" height="90" rx="8" fill="#4c0519" stroke="#ef4444"/>
            <text x="550" y="95" text-anchor="middle" fill="#f87171" font-size="12" font-weight="700">3. Inventory Service</text>
            <text x="550" y="115" text-anchor="middle" fill="#fca5a5" font-size="10">Out of Stock! (FAILS)</text>
            <text x="550" y="145" text-anchor="middle" fill="#f87171" font-size="10">Triggers Rollback Chain!</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### Architecture Styles Compared:
- **Monolith:** Single codebase, single deployable artifact, single database. Direct in-memory function calls. Simple deployment and local testing.
- **Modular Monolith:** Single deployable application, but strictly partitioned into independent domain modules with explicit Java interface boundaries. Best starting architecture for 95% of engineering projects.
- **Microservices:** Independently deployable services with private databases (**Database-per-Service**). Inter-service communication occurs across the network via REST, gRPC, or Kafka.

### Martin Fowler's MonolithFirst Principle:
Prematurely adopting microservices before understanding core business bounded contexts leads to a **Distributed Monolith**—the worst of both worlds (tight coupling combined with network latency, distributed transactions, and operational complexity).

### The Saga Pattern (Distributed Transactions Without 2PC):
In microservices, databases are isolated, making traditional ACID transactions across services impossible. A **Saga** organizes a distributed transaction as a sequence of local transactions:
- **Happy Path:** Service A commits local transaction $\\rightarrow$ publishes event $\\rightarrow$ Service B commits local transaction $\\rightarrow$ publishes event $\\rightarrow$ Service C commits.
- **Failure Path & Compensating Transactions:** If Service C fails (e.g. inventory out of stock), the Saga triggers **Compensating Transactions** backward: Service B executes a **Refund Transaction**, and Service A updates the order status to **Cancelled**, achieving **Eventual Consistency**.
- **Choreography vs. Orchestration:**
  - **Choreography:** Decentralized event pub/sub over Kafka.
  - **Orchestration:** Centralized coordinator (state machine) directs services on what step to execute next.`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "How does the Saga Pattern handle failures in distributed microservice transactions?",
            shortA: "Instead of locking tables across services, each service executes a local transaction. If a step fails, the system executes backward Compensating Transactions to reverse prior local changes.",
            deepA: "In a microservices architecture adhering to the Database-per-Service rule, Two-Phase Commit (2PC) distributed locking is avoided because it causes high latency and availability bottlenecks. The Saga pattern breaks the global transaction into a chain of independent local ACID transactions. If Step 3 (Inventory deduction) fails, compensating events are dispatched backwards: the Payment service issues a refund, and the Order service marks the order cancelled. Compensating actions must be idempotent to handle network retry duplicates safely.",
            followUp: "What is the Outbox Pattern? To ensure a local database commit and its corresponding Kafka event publish occur atomically without dual-write failures, events are written into an 'outbox' table in the same local DB transaction, and polled by a background process (or Debezium CDC) into Kafka."
          }
        ]
      }
    },
    {
      id: "caching-redis-internals",
      title: "3. Caching Strategies & Redis Internals",
      level1: {
        intro: "Reading data from hard drives or querying complex SQL joins takes tens of milliseconds. In-memory caching with Redis serves data in under 1 millisecond, dramatically boosting backend performance.",
        analogy: "A database is like the library archive basement: millions of books, but walking downstairs to find one takes 10 minutes. A cache is like the stack of 5 favorite books on your study desk: you can grab them in 2 seconds.",
        svgDiagram: `<svg viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="660" height="180" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="330" y="45" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="14" font-weight="700">CACHE-ASIDE PATTERN (Read Path vs. Write Path)</text>

            <rect x="40" y="65" width="160" height="110" rx="8" fill="#1e3a5f" stroke="#38bdf8"/>
            <text x="120" y="90" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="700">App Server</text>
            <text x="120" y="115" text-anchor="middle" fill="#cbd5e1" font-size="10">1. Check Cache</text>
            <text x="120" y="135" text-anchor="middle" fill="#cbd5e1" font-size="10">2. If Miss: Query DB</text>
            <text x="120" y="155" text-anchor="middle" fill="#cbd5e1" font-size="10">3. Write to Cache</text>

            <path d="M 200 95 L 340 95" stroke="#4ade80" stroke-width="2"/>
            <text x="270" y="90" text-anchor="middle" fill="#4ade80" font-size="10">Cache Hit (&lt; 2ms)</text>

            <rect x="340" y="65" width="130" height="110" rx="8" fill="#064e3b" stroke="#22c55e"/>
            <text x="405" y="90" text-anchor="middle" fill="#4ade80" font-size="13" font-weight="700">Redis Cache</text>
            <text x="405" y="115" text-anchor="middle" fill="#cbd5e1" font-size="10">RAM Key-Value</text>
            <text x="405" y="140" text-anchor="middle" fill="#facc15" font-size="10">TTL Eviction</text>

            <path d="M 200 145 L 490 145" stroke="#f59e0b" stroke-width="2"/>
            <text x="345" y="140" text-anchor="middle" fill="#f59e0b" font-size="10">Cache Miss (Read DB)</text>

            <rect x="490" y="65" width="130" height="110" rx="8" fill="#78350f" stroke="#f59e0b"/>
            <text x="555" y="90" text-anchor="middle" fill="#fbbf24" font-size="13" font-weight="700">Database</text>
            <text x="555" y="115" text-anchor="middle" fill="#cbd5e1" font-size="10">Disk I/O</text>
            <text x="555" y="140" text-anchor="middle" fill="#cbd5e1" font-size="10">Source of Truth</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### Core Caching Patterns:
1. **Cache-Aside (Lazy Loading - Industry Default):**
   - **Read:** App reads Redis $\\rightarrow$ on miss, reads DB $\\rightarrow$ writes to Redis with TTL.
   - **Write:** App updates DB first, then **Deletes (Invalidates)** the cache key in Redis.
   - *Why Delete instead of Update?* Updating in-flight cache values risks race conditions with out-of-order writes. Deleting ensures the next read fetches a clean source of truth.
2. **Write-Through:** Updates are written synchronously to cache and database at the same time. Higher write latency, but strict consistency.
3. **Write-Back (Write-Behind):** Updates are written only to cache (instant 200 OK); queued and flushed in batches to database asynchronously. Ultra-high write throughput, but risks data loss on cache crashes.

### 3 Classic Production Cache Failures & Fixes:
1. **Cache Stampede (Thundering Herd):** A popular key expires, causing 50,000 concurrent requests to miss and hit the database simultaneously.  
   *Fix:* **Distributed Mutex Lock (Redis \`SETNX\`)**. Only 1 request queries the DB; others wait for the cache to warm.
2. **Cache Penetration:** Attackers query nonexistent IDs (\`id = -9999\`), constantly bypassing the cache to hammer the database.  
   *Fix:* **Bloom Filter** (probabilistically rejects non-existent keys in memory) or cache \`null\` values with a short 60s TTL.
3. **Cache Avalanche:** Thousands of keys are created with the exact same 3,600-second TTL and expire at the exact same second, overwhelming the DB.  
   *Fix:* **TTL Jitter** (add random variance: $\\text{TTL} = 3600 + \\text{random}(0, 300)$).`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "Why should you delete a cache key instead of updating it when database records change?",
            shortA: "Updating the cache directly causes race conditions where an older write can overwrite a newer write. Deleting the key guarantees the next read fetches the fresh database state.",
            deepA: "Suppose Thread A updates price to $100 and Thread B updates price to $105. Due to network jitter or thread scheduling, Thread B writes to DB first, then Thread A writes to DB. If both try to update the cache directly, Thread A might update Redis last, leaving the cache showing stale $100 while the DB holds $105. By deleting the key upon database write, the cache remains empty until a subsequent read lazily re-populates it from the committed database transaction.",
            followUp: "What is a Bloom Filter? A space-efficient probabilistic data structure that answers whether an element is definitely not in a set or possibly in a set, with zero false negatives."
          }
        ]
      }
    },
    {
      id: "message-brokers-kafka",
      title: "4. Message Brokers, Event Streaming & Apache Kafka",
      level1: {
        intro: "Synchronous HTTP calls force systems to wait for each other. Message brokers like Apache Kafka allow services to communicate asynchronously by publishing events into durable, high-speed streaming logs.",
        analogy: "A traditional HTTP API is like ordering food at a counter where you must stand still waiting until the food is cooked. A Message Broker is like being handed a buzzing pager: you sit down, chat with friends, and pick up your meal when the buzzer sounds.",
        svgDiagram: `<svg viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="660" height="180" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="330" y="45" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="14" font-weight="700">KAFKA TOPIC PARTITIONING &amp; CONSUMER GROUPS</text>

            <rect x="30" y="70" width="220" height="110" rx="8" fill="#1e3a5f" stroke="#38bdf8"/>
            <text x="140" y="95" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="700">Topic: "orders"</text>
            <text x="140" y="120" text-anchor="middle" fill="#cbd5e1" font-size="11">Partition 0: [0][1][2]...</text>
            <text x="140" y="140" text-anchor="middle" fill="#cbd5e1" font-size="11">Partition 1: [0][1][2]...</text>
            <text x="140" y="160" text-anchor="middle" fill="#cbd5e1" font-size="11">Partition 2: [0][1][2]...</text>

            <path d="M 250 120 L 400 95" stroke="#4ade80" stroke-width="2"/>
            <path d="M 250 140 L 400 130" stroke="#4ade80" stroke-width="2"/>
            <path d="M 250 160 L 400 165" stroke="#4ade80" stroke-width="2"/>

            <rect x="400" y="65" width="230" height="120" rx="8" fill="#064e3b" stroke="#22c55e"/>
            <text x="515" y="85" text-anchor="middle" fill="#4ade80" font-size="12" font-weight="700">Consumer Group A</text>
            <text x="515" y="105" text-anchor="middle" fill="#cbd5e1" font-size="10">Consumer 1 ──► Reads Part 0</text>
            <text x="515" y="125" text-anchor="middle" fill="#cbd5e1" font-size="10">Consumer 2 ──► Reads Part 1</text>
            <text x="515" y="145" text-anchor="middle" fill="#cbd5e1" font-size="10">Consumer 3 ──► Reads Part 2</text>
            <text x="515" y="168" text-anchor="middle" fill="#f87171" font-size="10">Consumer 4 ──► IDLE (Standby)</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### Task Queues (RabbitMQ) vs. Event Streaming (Kafka):
- **RabbitMQ:** Smart broker, dumb consumer. Deletes messages immediately upon ACK. Excellent for complex task routing, but no event replay.
- **Apache Kafka:** Dumb broker, smart consumer. **Immutable, partitioned append-only log**. Retains messages on disk for days. Consumers track their own **Offsets**. Supports full event replay anytime.

### Kafka Architecture Fundamentals:
- **Topic:** Category to which records are published.
- **Partition:** Fundamental unit of scalability. Each partition is an ordered sequence of records.
- **Partition Key:** Ordering is **only guaranteed within a single partition**. Messages published with the same Key (\`hash(key) % num_partitions\`) always land in the same partition, guaranteeing ordered processing for that specific customer or order.
- **Consumer Group Rules:**
  1. Each partition is consumed by **at most ONE consumer** in the same group.
  2. If Consumers > Partitions, extra consumers sit completely **IDLE** (acting as hot standbys).
- **Producer Acknowledgments (\`acks\`):**
  - \`acks=0\`: Fire-and-forget; maximum speed, data loss risk.
  - \`acks=1\`: Leader broker writes to local log.
  - \`acks=all\` (-1): Leader waits until all **In-Sync Replicas (ISR)** write to disk before returning ACK (Strongest durability).`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "What happens if a Kafka consumer crashes before committing its offset?",
            shortA: "Kafka triggers a rebalance and reassigns the partition to another consumer, which re-reads from the last committed offset, reprocessing the message (At-Least-Once delivery).",
            deepA: "Because the crashed consumer never successfully called commitSync() or commitAsync(), the partition offset pointer on the broker was not updated. The replacement consumer reads the uncommitted message and processes it a second time. This means Kafka guarantees At-Least-Once delivery. To achieve end-to-end exactly-once semantics, backend consumers must implement the Idempotent Consumer Pattern: verify whether the incoming messageId or transaction ID was already processed in a database ledger table before applying business changes.",
            followUp: "What is a Dead Letter Queue (DLQ)? A separate queue where poisonous, unparseable messages are diverted after repeated retry failures so live partition processing is not blocked."
          }
        ]
      }
    },
    {
      id: "scalability-resilience-circuit-breaker",
      title: "5. Scalability, Load Balancing & The Circuit Breaker Pattern",
      level1: {
        intro: "Building software that works for 10 users is easy. Making it survive 10 million users requires horizontal scaling, load balancing, and fault tolerance patterns that prevent single failures from taking down the whole system.",
        analogy: "A Circuit Breaker in software works exactly like the electrical circuit breaker in your home: If a toaster short-circuits, the breaker trips immediately to cut the power, preventing the entire house from catching fire.",
        svgDiagram: `<svg viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="660" height="180" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="330" y="45" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="14" font-weight="700">CIRCUIT BREAKER STATE MACHINE</text>

            <circle cx="120" cy="115" r="45" fill="#064e3b" stroke="#22c55e" stroke-width="2"/>
            <text x="120" y="112" text-anchor="middle" fill="#4ade80" font-size="12" font-weight="700">CLOSED</text>
            <text x="120" y="128" text-anchor="middle" fill="#cbd5e1" font-size="10">Normal Flow</text>

            <path d="M 165 95 L 305 95" stroke="#ef4444" stroke-width="2"/>
            <text x="235" y="85" text-anchor="middle" fill="#ef4444" font-size="10">Failures &gt; 50%</text>

            <circle cx="350" cy="115" r="45" fill="#4c0519" stroke="#ef4444" stroke-width="2"/>
            <text x="350" y="112" text-anchor="middle" fill="#f87171" font-size="12" font-weight="700">OPEN</text>
            <text x="350" y="128" text-anchor="middle" fill="#cbd5e1" font-size="10">Fail Fast (No calls)</text>

            <path d="M 395 115 L 535 115" stroke="#facc15" stroke-width="2"/>
            <text x="465" y="105" text-anchor="middle" fill="#facc15" font-size="10">Sleep Timeout</text>

            <circle cx="580" cy="115" r="45" fill="#78350f" stroke="#f59e0b" stroke-width="2"/>
            <text x="580" y="112" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="700">HALF-OPEN</text>
            <text x="580" y="128" text-anchor="middle" fill="#cbd5e1" font-size="10">Trial Probes</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### The Golden Rule of Scalability: Stateless Servers!
To scale horizontally across dozens of servers behind a Load Balancer, **application servers must be completely stateless**. User sessions must not live in local JVM memory. Sessions are stored in a **Shared Redis Cluster** or encapsulated in **Stateless Cryptographic JWTs**.

### Load Balancing: Layer 4 vs. Layer 7:
- **Layer 4 (L4):** Operates at Transport Layer (TCP/UDP). Ultra-fast packet routing based purely on IP and Ports (e.g. AWS Network Load Balancer).
- **Layer 7 (L7):** Operates at Application Layer (HTTP/HTTPS). Inspects URI paths, cookies, and HTTP headers to route to specific microservices (e.g. AWS Application Load Balancer, Nginx).

### The Circuit Breaker Pattern (Resilience4j / Netflix Hystrix):
Prevents cascading failures when downstream services lag or fail:
1. **Closed (Normal):** All requests pass through. The circuit monitors error rates.
2. **Open (Tripped):** When error rate breaches threshold (e.g., > 50% failures over 10s), the circuit trips to Open. Outbound calls are halted immediately; callers receive an instant fallback response without tying up threads.
3. **Half-Open (Testing Recovery):** After a sleep interval (e.g., 30s), a trial probe batch is let through. If they succeed, the circuit resets to **Closed**; if they fail, it reopens.`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "How does the Circuit Breaker pattern prevent cascading system outages?",
            shortA: "It halts outbound network calls to a failing downstream dependency immediately, returning instant fallback responses to prevent upstream thread pool exhaustion.",
            deepA: "In a microservices architecture, if Service C slows down from 20ms to 10 seconds, upstream Service B's worker threads will stay blocked waiting for responses. Under moderate load, Service B quickly exhausts its own thread pool, causing Service A to fail as well (Cascading Failure). A Circuit Breaker monitors failure rates: once errors cross a threshold, it trips to OPEN, instantly short-circuiting calls and returning fallback data. This protects Service B's threads, allowing it to remain responsive for other non-dependent operations.",
            followUp: "Why must retries use Exponential Backoff with Jitter? Retrying immediately with a fixed interval causes thousands of clients to retry simultaneously in synchronized lockstep, creating a self-inflicted Thundering Herd DDoS on the recovering server."
          }
        ]
      }
    },
    {
      id: "mini-system-designs",
      title: "6. Mini System Design Walkthroughs: TinyURL & Async Image Pipeline",
      level1: {
        intro: "In technical internship interviews, you may be asked to design a real-world system from scratch. Here are step-by-step walkthroughs for two classic questions.",
        analogy: "Designing a system is like planning city roads: you calculate how many cars will drive through (capacity math), build highways for heavy traffic (load balancers & caching), and install bypass roads for industrial delivery trucks (async background message queues)."
      },
      level2: {
        technicalExplanation: `### System 1: Design a URL Shortener (TinyURL):
- **Core Requirements:** Convert long URLs into compact 7-character URLs (e.g. \`https://tiny.url/x7B29aQ\`). High availability and sub-20ms redirection.
- **Math & Capacity Estimation:**
  - 100M new URLs/month $\\implies \\approx 40$ writes/sec.
  - Read-heavy (100:1 ratio) $\\implies 4,000$ redirects/sec.
- **Base62 Encoding:** Characters \`[0-9, a-z, A-Z]\` ($62$ characters). A 7-character short URL yields $62^7 \\approx 3.5 \\text{ Trillion}$ combinations! Convert auto-incrementing 64-bit IDs to Base62 to eliminate collisions.
- **Architecture Flow:** Client $\\rightarrow$ Load Balancer $\\rightarrow$ API Cluster $\\rightarrow$ Redis Cache-Aside $\\rightarrow$ Database (SQL table with index on \`short_code\`).
- **301 vs 302 Redirection:** \`301\` is cached by browsers (faster, but loses analytics); \`302\` hits the server on every click (enabling click tracking).

### System 2: Asynchronous Image Processing Pipeline:
- **Challenge:** User uploads an 8MB photo; resizing to thumbnail, mobile, and web resolutions is CPU-heavy and freezes HTTP endpoints if done synchronously.
- **Architecture Solution:**
  1. Client requests a **Pre-Signed S3 Upload URL** from the API server.
  2. Client uploads the binary image directly to AWS S3 (bypassing app servers completely, saving bandwidth and RAM).
  3. S3 triggers an event to **Apache Kafka / SQS**.
  4. A scalable pool of background worker nodes consumes the event, resizes images, and stores thumbnails in a processed bucket.
  5. Workers emit a completion event, and the client is notified in real time via **WebSockets** or polling.`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "Why use direct S3 upload with Pre-Signed URLs instead of uploading files through backend application servers?",
            shortA: "Direct upload bypasses backend servers, eliminating network bandwidth bottlenecks, CPU memory buffering, and connection thread exhaustion on the API tier.",
            deepA: "Uploading large files (e.g. 50MB videos) through backend servers forces the application process to buffer file chunks in memory, tie up worker threads for tens of seconds, and consume massive server bandwidth. Pre-signed URLs delegate the raw file transfer directly to cloud object storage (Amazon S3), which is purpose-built for high-throughput uploads. The backend API only handles a lightweight authentication check to sign the URL, keeping application threads free for fast CRUD requests."
          }
        ]
      }
    },
    {
      id: "deep-dive-interview-qa",
      title: "7. Deep-Dive & Tricky Backend Interview Questions",
      level1: {
        intro: "These 6 interview questions test senior-level architectural intuition, distributed systems edge cases, and production reliability.",
        analogy: "Like a structural engineer stress-testing a skyscraper against earthquakes and hurricane winds, senior architects design systems to withstand sudden server crashes and network partitions."
      },
      level2: {
        technicalExplanation: "Review each deep-dive question below. These represent actual technical interview scenarios from top tech companies."
      },
      level3: {
        interviewQA: [
          {
            q: "What is Consistent Hashing and why is it essential for distributed caching and database sharding?",
            shortA: "Consistent Hashing maps servers and keys onto a circular hash ring. When a server node is added or removed, only K/N keys are remapped instead of invalidating the entire cluster.",
            deepA: "Under standard modulo hashing (hash(key) % N), changing the number of servers N completely disrupts the mapping for almost 100% of keys, causing a catastrophic cluster-wide cache miss. Consistent Hashing places both server nodes and keys on a virtual 360-degree hash ring. Each key is stored on the first server node encountered clockwise. When a node is added or removed, only a small fraction (K/N) of keys move to adjacent nodes, keeping the rest of the cluster's cache warm."
          },
          {
            q: "Why is sharing a single database between two microservices considered an Anti-Pattern?",
            shortA: "It breaks service isolation: schema updates by one team break the other service, and a runaway query in one service can exhaust DB resources and take down both.",
            deepA: "The Shared Database Anti-Pattern couples microservices at the storage layer. Independent deployments become impossible because changes to a database table or column require synchronized coordination between teams. Furthermore, it creates resource contention: an unindexed analytical query executed by Service A can peg database CPU at 100%, starving Service B's transactional queries. Each microservice must strictly own its private database."
          },
          {
            q: "What is Database Connection Pool Starvation and how does an external API call trigger it?",
            shortA: "Holding a database transaction open while making a slow external HTTP call ties up pooled database connections, rapidly causing connection pool exhaustion and server crash.",
            deepA: "Backend servers maintain a finite pool of open database connections (e.g., HikariCP pool of 10 connections). If a request method opens an ACID transaction and then makes a synchronous HTTP call to an external payment provider that lags for 5 seconds, that database connection sits locked and idle. Under moderate concurrent traffic, all 10 pooled connections quickly become tied up waiting on external network I/O, causing all subsequent queries to fail with connection acquisition timeouts."
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
        technicalExplanation: `### Master Backend Architecture Cheat Sheet:

- **REST Best Practices:** Plural nouns (\`/orders\`), proper HTTP verbs (\`GET\`, \`POST\`, \`PUT\`, \`PATCH\`, \`DELETE\`), standard status codes, stateless handlers.
- **Pagination:** Offset (\`LIMIT / OFFSET\`) scales poorly ($O(N)$ scanning cost and row slippage). Cursor (\`WHERE id > cursor\`) scales cleanly ($O(\\log N)$ via B+ Tree index).
- **Caching Patterns:**
  - **Cache-Aside:** Application checks cache $\\rightarrow$ on miss, reads DB $\\rightarrow$ populates cache.
  - **Stampede Fix:** Distributed Mutex Lock (\`SETNX\`).
  - **Penetration Fix:** Cache null values or deploy a Bloom Filter.
  - **Avalanche Fix:** Apply TTL Jitter (randomized expiration offsets).
- **Kafka Fundamentals:**
  - Topics are partitioned (ordering guaranteed **only within a single partition**).
  - Each partition is read by **at most one consumer per consumer group**.
  - If Consumers $>$ Partitions $\\implies$ Excess consumers remain **IDLE**.
  - \`acks=all\` provides strongest durability (leader + all ISR nodes commit).
- **Architecture:**
  - Monolith $\\rightarrow$ Modular Monolith $\\rightarrow$ Microservices.
  - Microservices enforce Database-per-Service; handle distributed transactions via **Saga Pattern**.
- **Resilience:**
  - Circuit Breaker states: **Closed** (Normal) $\\rightarrow$ **Open** (Fast fallback) $\\rightarrow$ **Half-Open** (Trial probe).
  - Retries must always incorporate **Exponential Backoff with Jitter**.
- **Scaling Rule:** Application servers **MUST BE STATELESS**. Delegate all session state to Redis or stateless JWTs.`
      },
      level3: {
        interviewQA: []
      }
    }
  ],
  "flashcards": [
    {
      "term": "Cache-Aside Pattern",
      "category": "Caching Architecture",
      "question": "How does the Cache-Aside pattern work during a read request?",
      "answer": "1. Check cache. If found (hit), return data. 2. If missing (miss), query primary database. 3. Write retrieved data into cache with a TTL. 4. Return data to client.",
      "tip": "App manages cache population on miss."
    },
    {
      "term": "Kafka Consumer Group Idle Rule",
      "category": "Message Streaming",
      "question": "If a Kafka topic has 4 partitions and a consumer group has 6 instances, what happens?",
      "answer": "Each partition can be assigned to only ONE consumer in a group at a time. Exactly 4 consumers will each read 1 partition; the remaining 2 consumers will sit idle as standby spares.",
      "tip": "Consumers > Partitions = Idle consumers."
    },
    {
      "term": "Keyset vs. Offset Pagination",
      "category": "Database Design",
      "question": "Why is 'LIMIT 20 OFFSET 100000' disastrous for database performance?",
      "answer": "The database must scan and sort all 100,020 rows in memory before discarding the first 100,000. Keyset pagination ('WHERE id > last_seen_id LIMIT 20') uses an index seek in O(log N) time.",
      "tip": "Offset scans all discarded rows; Keyset seeks via index."
    },
    {
      "term": "Circuit Breaker States",
      "category": "Microservices Resilience",
      "question": "What are the 3 states of a Circuit Breaker and their transitions?",
      "answer": "CLOSED (Normal calls pass), OPEN (Fails fast without calling failing downstream service), HALF-OPEN (Sends trial probe calls to test if service has recovered).",
      "tip": "Closed -> Open -> Half-Open -> Closed."
    }
  ]
};
