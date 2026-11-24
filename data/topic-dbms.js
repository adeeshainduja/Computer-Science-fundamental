// Topic 3: Database Management Systems (DBMS)
var topicDBMS = window.topicDBMS = {
  id: "dbms",
  title: "Database Management Systems",
  shortTitle: "DBMS & SQL",
  icon: "🗄️",
  badge: "Data Storage",
  readingTime: "20 min read",
  description: "Understand relational databases, keys, normalization, ACID transaction guarantees, B+ Tree indexing, and SQL vs. NoSQL tradeoffs.",
  learningObjectives: [
    "Understand Primary Keys, Foreign Keys, and relational database relationships",
    "Master the rules of Normalization from 1NF to BCNF with clean analogies",
    "Deep dive into ACID properties (Atomicity, Consistency, Isolation, Durability)",
    "Discover how B+ Tree indexes speed up queries from slow full-table scans to fast tree lookups",
    "Compare SQL vs. NoSQL and understand the CAP Theorem"
  ],
  lessons: [
    {
      id: "dbms-keys-normalization",
      title: "1. Relational Keys & Normalization",
      subtitle: "Schema design, primary keys & eliminating duplicate data",
      whatIsIt: "A **Relational Database** organizes data into tables consisting of rows (records) and columns (attributes). **Keys** are special columns that uniquely identify each row or link tables together. **Normalization** is the systematic process of organizing tables to eliminate redundant (duplicate) data and prevent update anomalies.",
      whyNeedIt: "If you store a customer's address in 50 different order rows, updating their address requires updating all 50 rows. If one update fails, your database becomes corrupted with conflicting information. Normalization ensures each piece of fact is stored in **one and only one place**.",
      howItWorks: [
        "**Primary Key (PK):** A unique, non-null column that identifies each row (e.g., `user_id = 101`).",
        "**Foreign Key (FK):** A column in one table that points to the Primary Key of another table, creating a relational link (e.g., `order.customer_id` points to `customer.id`).",
        "**1NF (First Normal Form):** Every cell must contain a single atomic value (no comma-separated lists like `'red, green, blue'`).",
        "**2NF (Second Normal Form):** Must be in 1NF, and all non-key columns must depend on the *entire* primary key (no partial dependencies on composite keys).",
        "**3NF (Third Normal Form):** Must be in 2NF, and non-key columns must not depend on other non-key columns (no transitive dependencies like `zip_code` determining `city`)."
      ],
      realWorldExample: "**Online Shopping System (Amazon):**\nInstead of putting the customer's full name, shipping address, credit card number, product description, and manufacturer details into a single massive spreadsheet, you create separate clean tables: `Customers`, `Orders`, `Products`, and `Suppliers`, linking them using Foreign Keys (`customer_id`, `product_id`).",
      diagram: `
        <svg viewBox="0 0 740 220" class="responsive-svg" aria-label="Relational Schema Linkage Diagram">
          <!-- Customers Table -->
          <g transform="translate(40, 20)">
            <rect width="220" height="160" rx="8" fill="var(--card-bg)" stroke="#3b82f6" stroke-width="2"/>
            <path d="M 0 0 L 220 0 L 220 35 L 0 35 Z" fill="#3b82f6"/>
            <text x="110" y="23" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">CUSTOMERS (Table)</text>
            <text x="15" y="65" font-size="12" font-weight="bold" fill="#f59e0b">PK  id (INT)</text>
            <text x="15" y="95" font-size="12" fill="var(--text-primary)">    name (VARCHAR)</text>
            <text x="15" y="125" font-size="12" fill="var(--text-primary)">    email (VARCHAR)</text>
          </g>

          <!-- Connecting Line -->
          <path d="M 260 65 C 330 65, 350 95, 420 95" fill="none" stroke="#10b981" stroke-width="2.5" stroke-dasharray="4,4"/>
          <text x="340" y="70" font-size="11" font-weight="bold" fill="#10b981">1 : Many Link</text>

          <!-- Orders Table -->
          <g transform="translate(420, 20)">
            <rect width="240" height="160" rx="8" fill="var(--card-bg)" stroke="#10b981" stroke-width="2"/>
            <path d="M 0 0 L 240 0 L 240 35 L 0 35 Z" fill="#10b981"/>
            <text x="120" y="23" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">ORDERS (Table)</text>
            <text x="15" y="65" font-size="12" font-weight="bold" fill="#f59e0b">PK  order_id (INT)</text>
            <text x="15" y="95" font-size="12" font-weight="bold" fill="#3b82f6">FK  customer_id ──► links PK</text>
            <text x="15" y="125" font-size="12" fill="var(--text-primary)">    total_amount (DECIMAL)</text>
            <text x="15" y="150" font-size="12" fill="var(--text-primary)">    created_at (TIMESTAMP)</text>
          </g>
        </svg>
      `,
      diagramCaption: "A Foreign Key in the Orders table links back to the Primary Key in the Customers table, preventing customer details from being duplicated on every order.",
      keyPoints: [
        "**Primary Key:** Unique and cannot be null; identifies each row.",
        "**Foreign Key:** Enforces **Referential Integrity** between related tables.",
        "**Normalization** prevents update, insertion, and deletion anomalies.",
        "The mantra of 3NF: *'Every column must depend on the key, the whole key, and nothing but the key, so help me Codd.'*"
      ],
      deepDive: {
        title: "Deep Dive: When to Denormalize?",
        content: "While 3NF is great for transaction processing (OLTP), joining 10 normalized tables together can slow down high-speed analytical dashboards. In analytical data warehouses (OLAP) and high-scale read-heavy web apps, engineers often intentionally **Denormalize** (storing redundant pre-computed data) to avoid slow SQL JOINs at the cost of extra disk space."
      },
      quiz: [
        {
          question: "If an Employee table contains a column 'phone_numbers' with values like '0771234567, 0719876543' in a single cell, which Normal Form is violated?",
          options: ["First Normal Form (1NF)", "Second Normal Form (2NF)", "Third Normal Form (3NF)", "Boyce-Codd Normal Form (BCNF)"],
          correct: 0,
          explanation: "1NF requires that all values in a column must be atomic (single values). Storing comma-separated lists violates 1NF."
        }
      ]
    },
    {
      id: "dbms-acid-transactions",
      title: "2. ACID Properties & Transaction Isolation",
      subtitle: "Bank-grade data reliability & isolation levels",
      whatIsIt: "A **Database Transaction** is a sequence of one or more database operations treated as a single, indivisible unit of work. **ACID** is an acronym for four critical properties that guarantee database transactions are processed reliably, even during server crashes or power failures.",
      whyNeedIt: "Imagine transferring $100 from Alice to Bob. The bank must deduct $100 from Alice and add $100 to Bob. If the server crashes after deducting from Alice but before adding to Bob, Alice loses $100 and Bob gets nothing! ACID guarantees this nightmare never happens.",
      howItWorks: [
        "**A — Atomicity (All or Nothing):** Either all operations in the transaction succeed, or the entire transaction is rolled back as if nothing ever happened.",
        "**C — Consistency (Rules Enforced):** The database moves from one valid state to another valid state, obeying all schema constraints, foreign keys, and triggers.",
        "**I — Isolation (No Interference):** Concurrent transactions executing simultaneously do not interfere with one another.",
        "**D — Durability (Saved Forever):** Once a transaction commits, its changes are written to permanent non-volatile storage (Write-Ahead Log) and will survive even an immediate power outage.",
        "**Isolation Levels:** Protect against **Dirty Reads** (reading uncommitted data), **Non-Repeatable Reads** (data modified midway), and **Phantom Reads** (new rows inserted)."
      ],
      realWorldExample: "**ATM Cash Withdrawal:**\nWhen an ATM dispenses $500: (1) Your bank balance decreases by $500, (2) Cash is physically dispensed, (3) A receipt record is logged. If the machine runs out of cash mid-transaction, **Atomicity** automatically cancels the balance deduction so you aren't charged for money you didn't receive!",
      diagram: `
        <svg viewBox="0 0 740 220" class="responsive-svg" aria-label="ACID Properties Diagram">
          <g transform="translate(15, 20)">
            <rect width="150" height="170" rx="10" fill="var(--card-bg)" stroke="#3b82f6" stroke-width="2"/>
            <text x="75" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="#3b82f6">A</text>
            <text x="75" y="70" font-size="13" font-weight="bold" text-anchor="middle" fill="var(--text-primary)">Atomicity</text>
            <text x="75" y="100" font-size="11" text-anchor="middle" fill="var(--text-secondary)">All or Nothing</text>
            <text x="75" y="135" font-size="10" text-anchor="middle" fill="#10b981">Automatic Rollback</text>
          </g>

          <g transform="translate(195, 20)">
            <rect width="150" height="170" rx="10" fill="var(--card-bg)" stroke="#10b981" stroke-width="2"/>
            <text x="75" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="#10b981">C</text>
            <text x="75" y="70" font-size="13" font-weight="bold" text-anchor="middle" fill="var(--text-primary)">Consistency</text>
            <text x="75" y="100" font-size="11" text-anchor="middle" fill="var(--text-secondary)">Follows Rules</text>
            <text x="75" y="135" font-size="10" text-anchor="middle" fill="#10b981">Constraints Checked</text>
          </g>

          <g transform="translate(375, 20)">
            <rect width="150" height="170" rx="10" fill="var(--card-bg)" stroke="#8b5cf6" stroke-width="2"/>
            <text x="75" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="#8b5cf6">I</text>
            <text x="75" y="70" font-size="13" font-weight="bold" text-anchor="middle" fill="var(--text-primary)">Isolation</text>
            <text x="75" y="100" font-size="11" text-anchor="middle" fill="var(--text-secondary)">No Crosstalk</text>
            <text x="75" y="135" font-size="10" text-anchor="middle" fill="#8b5cf6">4 Isolation Levels</text>
          </g>

          <g transform="translate(555, 20)">
            <rect width="150" height="170" rx="10" fill="var(--card-bg)" stroke="#ec4899" stroke-width="2"/>
            <text x="75" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="#ec4899">D</text>
            <text x="75" y="70" font-size="13" font-weight="bold" text-anchor="middle" fill="var(--text-primary)">Durability</text>
            <text x="75" y="100" font-size="11" text-anchor="middle" fill="var(--text-secondary)">Survives Crashes</text>
            <text x="75" y="135" font-size="10" text-anchor="middle" fill="#ec4899">Write-Ahead Log</text>
          </g>
        </svg>
      `,
      diagramCaption: "ACID guarantees that your data stays mathematically correct even when thousands of users click buttons simultaneously during server crashes.",
      keyPoints: [
        "**Atomicity:** Transactions are indivisible; fails trigger full rollbacks.",
        "**Durability:** Committed data is saved to disk via WAL (Write-Ahead Logging).",
        "**Isolation Levels:** Read Uncommitted $\\rightarrow$ Read Committed $\\rightarrow$ Repeatable Read $\\rightarrow$ Serializable.",
        "Higher isolation guarantees safety, but reduces concurrent system throughput."
      ],
      deepDive: {
        title: "Deep Dive: Dirty Reads vs. Phantom Reads",
        content: "A **Dirty Read** happens when Transaction A reads data modified by Transaction B that has not been committed yet; if B rolls back, A holds bogus data. A **Phantom Read** happens when Transaction A runs `SELECT count(*) WHERE age > 30`, and midway through, Transaction B inserts a new 35-year-old user. When A runs the count again, an unexpected extra row appears like a phantom!"
      },
      quiz: [
        {
          question: "Which transaction property guarantees that committed changes survive a sudden datacenter power failure?",
          options: ["Atomicity", "Consistency", "Isolation", "Durability"],
          correct: 3,
          explanation: "Durability guarantees that once a transaction commits, its writes are flushed to non-volatile disk/WAL and survive power outages."
        }
      ]
    },
    {
      id: "dbms-indexing-bplus",
      title: "3. Database Indexing & B+ Trees",
      subtitle: "Why indexes turn slow full-table scans into instant lookups",
      whatIsIt: "A **Database Index** is a specialized auxiliary data structure (almost always a **B+ Tree**) that allows the database engine to find specific rows in $O(\\log n)$ time instead of scanning every single row on disk ($O(n)$ full table scan).",
      whyNeedIt: "In a table with 10,000,000 users, running `SELECT * FROM users WHERE email = 'alice@gmail.com'` without an index forces the database to read all 10 million rows from slow disk storage (taking 5-10 seconds). With a B+ tree index, it finds Alice in just 3-4 disk block hops (under 5 milliseconds)!",
      howItWorks: [
        "**The B+ Tree Structure:** A balanced, wide, multi-way search tree. Root and internal nodes store only keys to direct traffic. **All actual data records (or record pointers) reside exclusively in the leaf nodes**.",
        "**Linked Leaf Nodes:** All leaf nodes are linked horizontally in a doubly-linked list. This makes **Range Queries** (`WHERE age BETWEEN 20 AND 30`) blazing fast!",
        "**Clustered Index:** Defines the physical sorting order of rows on disk (usually the Primary Key). A table can have **only ONE Clustered Index**.",
        "**Non-Clustered (Secondary) Index:** A separate index structure whose leaf nodes point back to the Clustered Index key (requires a second lookup called a Bookmark Lookup)."
      ],
      realWorldExample: "**The Index at the Back of a Textbook:**\nIf you want to read about 'Photosynthesis' in a 1,000-page biology textbook, you don't read page 1 to 1,000. You flip to the alphabetical **Index** at the back, see 'Photosynthesis: page 482', and jump directly to page 482!",
      diagram: `
        <svg viewBox="0 0 740 230" class="responsive-svg" aria-label="B+ Tree Index Architecture Diagram">
          <!-- Root Node -->
          <g transform="translate(270, 20)">
            <rect width="200" height="35" rx="6" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" stroke-width="2"/>
            <text x="100" y="22" font-size="12" font-weight="bold" text-anchor="middle" fill="var(--text-primary)">Root Node: [ 30 | 70 ]</text>
          </g>

          <!-- Branch Lines -->
          <line x1="320" y1="55" x2="160" y2="95" stroke="#3b82f6" stroke-width="2"/>
          <line x1="370" y1="55" x2="370" y2="95" stroke="#3b82f6" stroke-width="2"/>
          <line x1="420" y1="55" x2="580" y2="95" stroke="#3b82f6" stroke-width="2"/>

          <!-- Internal Nodes -->
          <g transform="translate(60, 95)">
            <rect width="180" height="30" rx="4" fill="var(--bg-subtle)" stroke="var(--border-color)"/>
            <text x="90" y="20" font-size="11" text-anchor="middle">Keys &lt; 30</text>
          </g>
          <g transform="translate(280, 95)">
            <rect width="180" height="30" rx="4" fill="var(--bg-subtle)" stroke="var(--border-color)"/>
            <text x="90" y="20" font-size="11" text-anchor="middle">30 &lt;= Keys &lt; 70</text>
          </g>
          <g transform="translate(500, 95)">
            <rect width="180" height="30" rx="4" fill="var(--bg-subtle)" stroke="var(--border-color)"/>
            <text x="90" y="20" font-size="11" text-anchor="middle">Keys &gt;= 70</text>
          </g>

          <!-- Leaf Nodes Linked List -->
          <g transform="translate(40, 160)">
            <rect width="140" height="35" rx="4" fill="#10b981" fill-opacity="0.2" stroke="#10b981"/>
            <text x="70" y="22" font-size="11" font-weight="bold" text-anchor="middle">[10, 20] ──►</text>
          </g>
          <g transform="translate(210, 160)">
            <rect width="140" height="35" rx="4" fill="#10b981" fill-opacity="0.2" stroke="#10b981"/>
            <text x="70" y="22" font-size="11" font-weight="bold" text-anchor="middle">[30, 45, 60] ──►</text>
          </g>
          <g transform="translate(380, 160)">
            <rect width="140" height="35" rx="4" fill="#10b981" fill-opacity="0.2" stroke="#10b981"/>
            <text x="70" y="22" font-size="11" font-weight="bold" text-anchor="middle">[70, 85, 99]</text>
          </g>
          <text x="370" y="215" font-size="11" text-anchor="middle" fill="#10b981">Doubly-Linked Leaf Nodes: Perfect for Range Scans!</text>
        </svg>
      `,
      diagramCaption: "B+ Trees keep all data in the leaves, connected by pointers. Searching any item in millions of records takes only 3 to 4 quick block lookups.",
      keyPoints: [
        "Indexes speed up `SELECT` and `WHERE` queries significantly.",
        "**The Trade-off:** Indexes slow down `INSERT`, `UPDATE`, and `DELETE` because the B+ tree must rebalance on writes.",
        "A **Composite Index** on `(first_name, last_name)` only works if your query filters by `first_name` (Leftmost Prefix Rule).",
        "Use `EXPLAIN ANALYZE` in SQL to verify whether queries use an Index Scan or a slow Sequential Scan."
      ],
      deepDive: {
        title: "Deep Dive: Why B+ Trees instead of B-Trees?",
        content: "In a standard B-Tree, keys and row pointers are stored in all internal nodes. In a **B+ Tree**, internal nodes store ONLY key routing numbers, while all data sits in leaf nodes. This means internal nodes are tiny, allowing thousands of keys to fit into a single 4KB OS memory block (massive branching factor of 100 to 1,000). A B+ tree can index 100,000,000 records with a tree height of only 3 levels!"
      },
      quiz: [
        {
          question: "Why can a relational database table have only ONE Clustered Index?",
          options: [
            "SQL standards limit tables to one index only",
            "A clustered index physically sorts table rows on disk, and data can only be sorted in one physical order",
            "B+ Trees cannot handle more than one index",
            "Having more than one index would corrupt the database engine"
          ],
          correct: 1,
          explanation: "Because the Clustered Index defines the actual physical storage order of rows on disk, a table can only be physically sorted one way."
        }
      ]
    }
  ],
  flashcards: [
    {
      term: "Primary Key",
      category: "Schema Design",
      question: "What is a Primary Key?",
      answer: "A column (or combination of columns) that uniquely identifies each row in a table. It cannot contain null values.",
      tip: "Like your unique National ID or Passport Number."
    },
    {
      term: "Atomicity",
      category: "ACID",
      question: "What does Atomicity mean in database transactions?",
      answer: "All operations within a transaction either completely succeed or completely fail together ('All or Nothing').",
      tip: "No partial transfers: either both sides succeed or neither does."
    },
    {
      term: "B+ Tree Index",
      category: "Indexing",
      question: "Why do relational databases use B+ Tree indexes?",
      answer: "They maintain sorted keys with linked leaf nodes, enabling O(log n) point searches and fast range scans across disk blocks.",
      tip: "Like the alphabetized index at the back of a huge textbook."
    },
    {
      term: "CAP Theorem",
      category: "Distributed Databases",
      question: "What is the CAP Theorem?",
      answer: "A distributed system can guarantee at most two out of three properties simultaneously: Consistency, Availability, and Partition Tolerance.",
      tip: "During network splits (P), you must choose either Consistency (CP) or Availability (AP)."
    }
  ]
};
