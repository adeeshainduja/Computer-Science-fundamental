// Topic 6: Backend Architecture & System Design
var topicBackend = window.topicBackend = {
  id: "backend",
  title: "Backend Architecture & System Design",
  shortTitle: "System Design",
  icon: "🏗️",
  badge: "High-Scale Systems",
  readingTime: "24 min read",
  description: "Learn how modern high-scale distributed systems are built: microservices, distributed caching with Redis, message streaming with Kafka, and fault tolerance.",
  learningObjectives: [
    "Compare REST, GraphQL, and gRPC communication paradigms",
    "Understand why Offset pagination fails on large datasets and how Cursor pagination fixes it",
    "Explore Monoliths vs. Microservices and how the Saga pattern manages distributed transactions",
    "Master distributed caching patterns (Cache-Aside, Write-Through) and avoid Stampedes and Avalanches",
    "Understand Apache Kafka partitions, consumer groups, offsets, and the Circuit Breaker resilience pattern"
  ],
  lessons: [
    {
      id: "backend-api-paradigms",
      title: "1. API Design & Communication Paradigms",
      subtitle: "REST vs. GraphQL vs. gRPC & pagination strategies",
      whatIsIt: "An **API (Application Programming Interface)** is the contract that defines how clients talk to backend servers, and how microservices communicate with one another. The three dominant styles are **REST** (resource-based over HTTP), **GraphQL** (flexible client queries), and **gRPC** (high-performance binary RPC over HTTP/2).",
      whyNeedIt: "Choosing the wrong API style can cripple mobile battery life through **Over-fetching** (downloading massive unneeded fields) or introduce severe network latency through **Under-fetching** (making 10 separate requests to render a single user profile page).",
      howItWorks: [
        "**REST:** Resource-based URLs (`/api/v1/orders`), standard HTTP verbs (`GET`, `POST`), text JSON. Great for public APIs and easy HTTP caching.",
        "**GraphQL:** A single endpoint (`/graphql`). The client specifies the exact fields it wants, eliminating over-fetching and under-fetching completely.",
        "**gRPC:** Uses **Protocol Buffers (Protobuf)** to serialize data into binary payloads over HTTP/2 multiplexed streams. **5x to 10x faster than REST**, making it the industry standard for internal microservice communication.",
        "**Offset Pagination (`LIMIT 20 OFFSET 1000000`):** Requires the database to read 1,000,020 rows and throw away the first 1,000,000! Very slow ($O(n)$) and prone to duplicate rows when items are inserted.",
        "**Cursor (Keyset) Pagination (`WHERE id > 'prod_9842' LIMIT 20`):** Seeks directly to the indexed key in **$O(\\log n)$** time. Consistent and instantaneous, perfect for infinite scrolling feeds."
      ],
      realWorldExample: "**Shopping for Groceries:**\n- **REST:** Asking a clerk for a 'Milk Box' and they hand you a pre-packed bundle containing milk, eggs, bread, and magazines (Over-fetching).\n- **GraphQL:** Handing the clerk a specific checklist: 'I want exactly 1 carton of almond milk and 2 apples'—they pack only those items.\n- **gRPC:** High-speed pneumatic vacuum tubes between stockroom workers passing coded binary canisters in milliseconds.",
      keyPoints: [
        "**REST vs. GraphQL vs. gRPC:** REST is standard JSON for public web APIs; GraphQL eliminates over/under-fetching with client schemas; gRPC maximizes microservice speed via binary Protobuf over HTTP/2.",
        "**Pagination Performance:** Offset pagination forces $O(n)$ full table scans at high offsets; Cursor pagination seeks directly by indexed key in $O(\\log n)$.",
        "**Network Efficiency:** Protobuf binary payloads are up to 70% smaller and 10x faster to serialize/deserialize than JSON strings."
      ],
      quiz: [
        {
          question: "Why is Cursor (Keyset) pagination dramatically faster than Offset pagination on tables with millions of rows?",
          options: [
            "It deletes old rows from disk",
            "It seeks directly using indexed columns in O(log n) instead of scanning and discarding skipped rows",
            "It stores the entire database in browser memory",
            "It only works on Monday mornings"
          ],
          correct: 1,
          explanation: "Cursor pagination directly jumps to the index location of the last seen item, preventing the database from scanning millions of unneeded preceding rows."
        },
        {
          question: "Which communication technology is the industry standard for low-latency internal microservice communication due to binary Protocol Buffers and HTTP/2 multiplexing?",
          options: ["SOAP XML", "gRPC", "REST with JSON", "HTML form posts"],
          correct: 1,
          explanation: "gRPC uses compact binary Protobuf serialization and HTTP/2 multiplexing, delivering 5-10x greater throughput and lower latency than JSON REST."
        }
      ]
    },
    {
      id: "backend-microservices-saga",
      title: "2. Architecture Styles & The Saga Pattern",
      subtitle: "Monolith vs. Microservices & distributed transactions",
      whatIsIt: "A **Monolith** bundles all business logic and database access into a single codebase and deployment. **Microservices** split the application into small, independent services, each owning its own private database. The **Saga Pattern** coordinates distributed transactions across multiple microservices without using slow distributed locks.",
      whyNeedIt: "Because each microservice has its own isolated database, you cannot run a traditional SQL `BEGIN ... COMMIT` across an Order Service and a Payment Service. If payment fails after stock was reserved, a Saga triggers **Compensating Transactions** (like an automatic refund) to keep data consistent.",
      howItWorks: [
        "**Martin Fowler's Rule:** *'Almost all successful microservice systems started as a monolith that grew too big.'* Starting with microservices too early creates a fragile **Distributed Monolith** with nightmare DevOps complexity.",
        "**Modular Monolith:** A single deployment, but with strictly enforced module boundaries in the code. Best of both worlds for 95% of applications!",
        "**Database-per-Service:** Microservices must never share a database directly; they communicate via APIs or asynchronous events.",
        "**Saga Choreography:** Decentralized; services emit events (e.g. over Kafka) and react independently.",
        "**Saga Orchestration:** A central coordinator service runs a state machine directing each service on what step to execute next."
      ],
      realWorldExample: "**Booking a Vacation Package:**\nIf the system books your Flight, books your Hotel, but then the Rental Car fails because all cars are sold out, a Saga automatically triggers **Compensating Actions** to cancel the hotel and refund the flight so you aren't left stranded!",
      keyPoints: [
        "**Database Isolation:** Microservices strictly enforce Database-per-Service to prevent hidden coupling.",
        "**Compensating Transactions:** Sagas handle rollbacks across independent microservices by triggering reverse actions.",
        "**Choreography vs. Orchestration:** Choreography is event-driven and decentralized; Orchestration uses a central coordinator workflow."
      ],
      quiz: [
        {
          question: "In the Saga pattern for microservices, what action is taken if a step in a multi-service transaction fails halfway through?",
          options: [
            "The database automatically locks until a human reboots it",
            "Compensating transactions are executed in reverse order to undo prior steps",
            "All microservice code is deleted",
            "The failure is quietly ignored"
          ],
          correct: 1,
          explanation: "Compensating transactions (such as issuing refunds or unreserving inventory) semantically undo earlier actions when a distributed transaction cannot finish."
        },
        {
          question: "What is Martin Fowler's fundamental guideline regarding adopting microservices?",
          options: [
            "Always build microservices on day one",
            "Microservices should always share a single MySQL database",
            "Start with a well-structured monolith and decompose into microservices only when team scale demands it",
            "Avoid using APIs between services"
          ],
          correct: 2,
          explanation: "Starting prematurely with microservices introduces distributed operational complexity before the problem domain is even understood."
        }
      ]
    },
    {
      id: "backend-caching-redis",
      title: "3. Caching Strategies & Redis Internals",
      subtitle: "Cache-Aside, Write-Through & avoiding Stampedes",
      whatIsIt: "**Caching** stores copies of frequently accessed data in fast in-memory storage (**Redis**) to serve subsequent requests in sub-milliseconds without touching the slow disk database.",
      whyNeedIt: "A relational database might handle 2,000 queries/second before CPU hits 100%. An in-memory Redis cluster can comfortably serve **500,000+ requests/second** with sub-millisecond latency, protecting your database during viral traffic spikes.",
      howItWorks: [
        "**Cache-Aside (Lazy Loading):** App checks Redis first. If Hit $\\rightarrow$ return data. If Miss $\\rightarrow$ query DB, write to Redis with a TTL, and return. On writes $\\rightarrow$ update DB and **delete (invalidate)** the cache key.",
        "**Write-Through:** App writes to cache, which writes synchronously to DB before returning.",
        "**Write-Back (Write-Behind):** App writes only to cache. An async queue flushes data in batches to DB later (ultra-fast, but risk of data loss on crash!).",
        "**Cache Stampede (Thundering Herd):** A popular hot key expires. Suddenly 50,000 concurrent requests hit the DB at once! **Fix:** Distributed Mutex Lock (Redis `SETNX`).",
        "**Cache Penetration:** Attacker queries non-existent IDs (`id = -9999`) to bypass cache and hit DB. **Fix:** Cache null values with short TTL or use a **Bloom Filter**.",
        "**Cache Avalanche:** Thousands of keys expire in the exact same second. **Fix:** Add random **Jitter** to TTLs (`TTL = 3600 + random(0, 300)`)."
      ],
      realWorldExample: "**A Bartender's Speed Rail:**\nThe most popular drinks (vodka, tequila) sit right on the bar counter (Cache). If someone orders an obscure vintage liqueur, the bartender walks into the back cellar to find it (Database), brings it to the bar, and leaves it within arm's reach for a while!",
      keyPoints: [
        "**Cache Invalidation:** Always delete cache keys on database updates in Cache-Aside rather than overwriting.",
        "**Stampede Defense:** Distributed locks (`SETNX`) guarantee only one thread recomputes an expired cache key.",
        "**Avalanche Defense:** Add randomized jitter to TTL expirations to prevent simultaneous database flooding."
      ],
      quiz: [
        {
          question: "In the Cache-Aside pattern, what should the application do when updating data in the database?",
          options: [
            "Update the DB and delete the corresponding cache key",
            "Update only the cache and never write to the DB",
            "Reboot the Redis server",
            "Clear all keys in memory"
          ],
          correct: 0,
          explanation: "Deleting (invalidating) the cache key forces the next read to fetch fresh DB data, avoiding race conditions that occur when trying to update the cache directly."
        },
        {
          question: "What technique prevents a Cache Avalanche where thousands of keys expire simultaneously and overwhelm the database?",
          options: [
            "Setting all TTLs to exactly 60 seconds",
            "Adding random TTL jitter so keys expire at slightly staggered times",
            "Disabling database indexes",
            "Increasing client timeout to 1 hour"
          ],
          correct: 1,
          explanation: "Adding random jitter (e.g., TTL = 3600s + rand(0, 300s)) smooths out expiration events so they don't hit the DB in one giant simultaneous tidal wave."
        }
      ]
    },
    {
      id: "backend-kafka-event-streaming",
      title: "4. Message Brokers & Apache Kafka",
      subtitle: "Topics, partitions, consumer groups & buffer leveling",
      whatIsIt: "**Apache Kafka** is a distributed, partitioned, replicated event streaming platform. Unlike traditional task queues (RabbitMQ) that delete messages once read, Kafka is an **immutable, append-only commit log** stored on disk.",
      whyNeedIt: "During a Black Friday flash sale, order volume might spike from 1,000 orders/sec to 100,000 orders/sec. Directly calling payment servers would crash them. Kafka acts as an elastic shock absorber—buffering the burst so worker services can consume at a steady, sustainable pace.",
      howItWorks: [
        "**Topics & Partitions:** A Topic is split into **Partitions**, which are the fundamental unit of parallelism in Kafka.",
        "**Message Ordering:** Kafka guarantees message ordering **only within a single partition**, never globally across the whole topic! Use a **Partition Key** (`customerId`) so all events for a customer land in the same partition in order.",
        "**Consumer Groups:** Multiple worker instances belong to a group. **Cardinal Rule:** Each partition can be consumed by at most **ONE consumer per consumer group**.",
        "**Dead Letter Queue (DLQ):** Poison-pill messages that crash consumers are routed to a DLQ so processing of other healthy messages continues uninterrupted."
      ],
      realWorldExample: "**Airport Baggage Carousel:**\nBaggage arrives on a continuous circular carousel (Kafka Topic). Passengers (Consumers) pick up their bags. Even after a bag is inspected, the luggage handling log permanently keeps a digital record of every bag that passed through.",
      keyPoints: [
        "**Immutable Commit Log:** Messages remain persisted on disk for retention periods, allowing replays.",
        "**Partition Order:** Order is strictly guaranteed within a partition, determined by the partition key.",
        "**Consumer Scale Limit:** Having more consumers than partitions in a group leaves extra consumers idle."
      ],
      quiz: [
        {
          question: "If a Kafka topic has 4 partitions and you assign 6 consumer instances in the same consumer group, how many consumers will actively read data?",
          options: [
            "All 6 consumers",
            "Only 4 consumers; 2 remain idle as standbys",
            "Only 1 consumer",
            "None, because Kafka will throw an error"
          ],
          correct: 1,
          explanation: "In Kafka, a partition can be processed by at most one consumer per consumer group at a time, so extra consumers remain idle standbys."
        },
        {
          question: "Across which boundary does Apache Kafka guarantee strict chronological message ordering?",
          options: [
            "Globally across the entire cluster",
            "Across all topics combined",
            "Only within an individual partition",
            "Only within the consumer's RAM"
          ],
          correct: 2,
          explanation: "Kafka strictly guarantees message ordering inside a single partition; to preserve sequence, messages sharing the same partition key land in the same partition."
        }
      ]
    },
    {
      id: "backend-resilience-circuit-breaker",
      title: "5. Scalability & The Circuit Breaker Pattern",
      subtitle: "Stateless architecture & preventing cascading outages",
      whatIsIt: "**Stateless Architecture** means application servers retain zero user session state in local memory, delegating all state to Redis or databases. The **Circuit Breaker Pattern** is an automatic electrical-style safety switch that detects downstream microservice failures and trips open to prevent cascading collapse.",
      whyNeedIt: "If a third-party SMS verification provider slows down from 50ms to 30 seconds, your backend threads quickly become exhausted waiting for responses. Soon, your entire server runs out of threads and crashes for all users (**Cascading Failure**).",
      howItWorks: [
        "**Stateless Horizontal Scaling:** Because servers hold no memory sessions, adding 10 more servers behind a Load Balancer instantly multiplies capacity.",
        "**Circuit Breaker States:**\n  - **Closed (Normal):** Everything is healthy. Requests flow through downstream.\n  - **Open (Tripped):** Failure rate breaches threshold (e.g. 50% failures). Requests are halted immediately, returning a **fast fallback response** without blocking threads!\n  - **Half-Open (Trial Probe):** After a cooldown (30s), lets a small batch of trial requests through. If successful $\\rightarrow$ resets to Closed; if failed $\\rightarrow$ re-opens."
      ],
      realWorldExample: "**Home Electrical Fuse Box:**\nIf a hairdryer shorts out and draws dangerous excess current, the circuit breaker in your basement instantly trips open to cut power to that room, preventing your entire house from catching fire!",
      keyPoints: [
        "**Stateless Horizontal Scaling:** Servers store no memory sessions, allowing any server to handle any request.",
        "**Fail-Fast Resilience:** Circuit Breakers trip Open to reject requests instantly and protect system threads.",
        "**Self-Healing:** Half-Open trial probes automatically test if downstream services have recovered."
      ],
      quiz: [
        {
          question: "When a Circuit Breaker enters the 'Open' state, what happens to incoming client requests?",
          options: [
            "They wait indefinitely until the server crashes",
            "They fail fast immediately with a fallback response without calling the failing downstream service",
            "They reboot the downstream microservice",
            "They are permanently discarded from network logs"
          ],
          correct: 1,
          explanation: "In the Open state, the circuit breaker halts calls downstream, instantly returning a fallback response to prevent thread starvation and server lockup."
        },
        {
          question: "Why are stateless application servers easier to scale horizontally than stateful servers?",
          options: [
            "They don't need CPU or network cards",
            "Any incoming request can be safely routed to any server instance without sticky sessions",
            "They do not use databases",
            "They only run on Linux"
          ],
          correct: 1,
          explanation: "Because no session state is trapped in local server memory, a load balancer can dispatch requests to any available worker without needing sticky session routing."
        }
      ]
    }
  ],
  flashcards: [
    {
      term: "Cache-Aside Pattern",
      category: "Caching",
      question: "How does the Cache-Aside pattern work?",
      answer: "The application checks the cache first. On a miss, it queries the database, writes the result to the cache with a TTL, and returns it. On writes, it updates the database and deletes the cache key.",
      tip: "App owns the coordination: read on miss, delete on write."
    },
    {
      term: "Circuit Breaker Pattern",
      category: "System Resilience",
      question: "What are the 3 states of a Circuit Breaker?",
      answer: "1. Closed (normal operations)\n2. Open (tripped due to errors; fails fast without calling downstream)\n3. Half-Open (sends trial probe traffic to test recovery).",
      tip: "Closed = Working. Open = Tripped / Safety on. Half-Open = Testing."
    },
    {
      term: "Kafka Partition Rule",
      category: "Event Streaming",
      question: "What happens if a Kafka topic has 3 partitions and a consumer group has 5 consumers?",
      answer: "3 consumers each read 1 partition. The remaining 2 consumers sit IDLE as hot standbys because each partition can be read by at most 1 consumer per group.",
      tip: "Consumers > Partitions means extra consumers are idle."
    },
    {
      term: "Cursor vs. Offset Pagination",
      category: "API Design",
      question: "Why is Cursor Pagination better than Offset Pagination?",
      answer: "Offset requires scanning all rows up to the offset (O(n) disk scan). Cursor uses an indexed key seek (O(log n)), ensuring instant constant performance on huge datasets.",
      tip: "Cursor remembers where you stopped rather than counting from zero."
    }
  ]
};
