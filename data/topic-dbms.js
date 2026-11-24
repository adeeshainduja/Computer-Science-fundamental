// Module 3: Database Management Systems (DBMS) & SQL
// Comprehensive Study Data with 3 Levels of Learning

var topicDBMS = window.topicDBMS = {
  id: "dbms",
  title: "Database Management Systems (DBMS) & SQL",
  icon: "🗄️",
  badge: "Module 03",
  description: "Master Relational Keys, Normalization (1NF-BCNF), ACID Transactions, Concurrency Isolation Levels, B+ Tree Indexing, SQL Optimization, and Distributed Scaling.",
  lessons: [
    {
      id: "keys-and-schema",
      title: "1. Relational Keys & Schema Design Hierarchy",
      level1: {
        intro: "In a relational database, data lives in tables with rows and columns. Keys are unique identification rules that prevent duplicate records and connect related tables without mixing up who owns what.",
        analogy: "Think of a company office building: Your National Identity Card number is unique across the entire country (Candidate Key). The company issues you an Employee Badge ID (Primary Key) to swipe through the front turnstile. Your badge can open doors, and project assignment logs record your Employee ID to know who worked on what task (Foreign Key).",
        svgDiagram: `<svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <rect x="20" y="20" width="660" height="200" rx="14" fill="#1e293b" stroke="#334155" stroke-width="2"/>
          <text x="50" y="55" fill="#94a3b8" font-family="system-ui" font-size="14" font-weight="700">SUPER KEYS (Any unique combination, e.g., {id, name}, {email, phone})</text>
          <rect x="50" y="70" width="600" height="130" rx="10" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
          <text x="75" y="100" fill="#38bdf8" font-family="system-ui" font-size="13" font-weight="700">CANDIDATE KEYS (Minimal Super Keys with no redundant columns: {id}, {email})</text>
          <rect x="75" y="115" width="260" height="70" rx="8" fill="#1e3a5f" stroke="#22c55e" stroke-width="2"/>
          <text x="95" y="145" fill="#4ade80" font-family="system-ui" font-size="14" font-weight="700">PRIMARY KEY</text>
          <text x="95" y="168" fill="#e2e8f0" font-family="system-ui" font-size="12">Selected unique identifier (No NULL)</text>
          <rect x="365" y="115" width="260" height="70" rx="8" fill="#312e81" stroke="#a855f7" stroke-width="2"/>
          <text x="385" y="145" fill="#c084fc" font-family="system-ui" font-size="14" font-weight="700">ALTERNATE KEYS</text>
          <text x="385" y="168" fill="#e2e8f0" font-family="system-ui" font-size="12">Remaining candidates ({email}, {NIC})</text>
        </svg>`
      },
      level2: {
        technicalExplanation: `A **Relational Key** is an attribute or set of attributes that satisfies uniqueness constraints on relation tuples.

### The Complete Keys Hierarchy:
1. **Super Key:** Any set of attributes that uniquely identifies a row. May include redundant fields (e.g., \`{user_id, email, full_name}\`).
2. **Candidate Key:** A minimal Super Key. Removing any attribute destroys its uniqueness property.
3. **Primary Key (PK):** The specific Candidate Key chosen by database architects as the primary identifier. Enforces \`UNIQUE\` and \`NOT NULL\` constraints, and builds the default **Clustered Index** in engines like MySQL InnoDB.
4. **Alternate Key:** Candidate Keys that were not selected as the Primary Key.
5. **Unique Key:** Enforces uniqueness across a column. Unlike Primary Keys, unique keys permit \`NULL\` values (in PostgreSQL/MySQL InnoDB, multiple \`NULL\` values are allowed because SQL standard evaluates \`NULL != NULL\`).
6. **Foreign Key (FK):** An attribute in a child table referencing the Primary Key of a parent table to guarantee **Referential Integrity**.
7. **Composite Key:** A Primary Key composed of two or more columns combined together.`,
        codeExamples: [
          {
            title: "SQL Schema: Enforcing Keys and Referential Integrity Actions",
            language: "sql",
            code: `-- Parent Table
CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    national_id VARCHAR(20) UNIQUE NOT NULL, -- Alternate Key
    email VARCHAR(100) UNIQUE NOT NULL,       -- Alternate Key
    full_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Child Table with Foreign Key Actions
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    -- If customer is deleted, restrict to protect historical finance data
    CONSTRAINT fk_customer
        FOREIGN KEY (customer_id) 
        REFERENCES customers(customer_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- Many-to-Many Junction Table with Composite Primary Key
CREATE TABLE order_items (
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL,
    -- Composite Primary Key
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE RESTRICT
);`
          }
        ],
        comparisonTable: {
          headers: ["Feature", "Primary Key", "Unique Key", "Foreign Key"],
          rows: [
            ["NULL Allowed?", "Strictly NO (NOT NULL)", "YES (Engine permits NULL)", "YES (Unless column defined NOT NULL)"],
            ["Count per Table", "Exactly 1", "Multiple allowed", "Multiple allowed"],
            ["Default Index", "Clustered Index (InnoDB)", "Non-Clustered (Secondary) Index", "Non-Clustered Index (Must index in Postgres)"],
            ["Core Purpose", "Identifies entity identity", "Enforces unique business constraints", "Maintains referential integrity between tables"]
          ]
        }
      },
      level3: {
        interviewQA: [
          {
            q: "What is the difference between a Candidate Key and a Primary Key?",
            shortA: "A Candidate Key is any minimal column set that can uniquely identify a row. The Primary Key is the single Candidate Key chosen by the database designer as the entity's official identifier.",
            deepA: "A table can possess multiple Candidate Keys (such as user_id, email, and passport_number). Each satisfies uniqueness and non-redundancy. The database architect picks one Candidate Key to be the table's Primary Key. The remaining Candidate Keys become Alternate Keys. In modern RDBMS like MySQL InnoDB, the chosen Primary Key physically organizes the clustered index tree on disk.",
            followUp: "Can a Primary Key have NULL values? No. Relational algebra dictates entity integrity, meaning a primary key must resolve to an exact entity."
          },
          {
            q: "What happens when you delete a row referenced by Foreign Keys under ON DELETE CASCADE vs RESTRICT?",
            shortA: "CASCADE automatically deletes all matching child rows in the referencing table. RESTRICT rejects the delete operation and throws an error if any child row references that parent row.",
            deepA: "Under CASCADE, deleting an Order automatically deletes all its OrderItems from the junction table. Under RESTRICT (or NO ACTION), if you attempt to delete a Customer who still has active Orders, the database engine aborts the transaction immediately with a foreign key constraint violation error, protecting your data from orphan records.",
            followUp: "When should you use SET NULL? Use SET NULL when child records should remain even if parent is deleted, such as setting employee.department_id = NULL if a department is dissolved."
          }
        ]
      }
    },
    {
      id: "normalization",
      title: "2. Normalization & High-Scale Denormalization",
      level1: {
        intro: "Normalization is the process of organizing table structures to eliminate duplicate data and avoid bugs when adding, updating, or deleting records.",
        analogy: "Imagine writing an author's phone number on every single book card in a library catalog of 10,000 books. If the author changes their phone number, you would have to find and update all 10,000 cards. If you miss one card, your library has conflicting information. Normalization moves author info to an Authors catalog and refers to it by Author ID.",
        svgDiagram: `<svg viewBox="0 0 700 180" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(10, 20)">
            <rect x="0" y="30" width="130" height="70" rx="8" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
            <text x="65" y="60" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="14" font-weight="700">1NF</text>
            <text x="65" y="80" text-anchor="middle" fill="#cbd5e1" font-family="system-ui" font-size="11">Atomic Values</text>
            <path d="M 130 65 L 170 65" stroke="#38bdf8" stroke-width="2"/>
            <rect x="170" y="30" width="130" height="70" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="235" y="60" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="14" font-weight="700">2NF</text>
            <text x="235" y="80" text-anchor="middle" fill="#cbd5e1" font-family="system-ui" font-size="11">No Partial Dep</text>
            <path d="M 300 65 L 340 65" stroke="#38bdf8" stroke-width="2"/>
            <rect x="340" y="30" width="130" height="70" rx="8" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
            <text x="405" y="60" text-anchor="middle" fill="#4ade80" font-family="system-ui" font-size="14" font-weight="700">3NF</text>
            <text x="405" y="80" text-anchor="middle" fill="#cbd5e1" font-family="system-ui" font-size="11">No Transitive Dep</text>
            <path d="M 470 65 L 510 65" stroke="#38bdf8" stroke-width="2"/>
            <rect x="510" y="30" width="150" height="70" rx="8" fill="#1e293b" stroke="#eab308" stroke-width="2"/>
            <text x="585" y="60" text-anchor="middle" fill="#facc15" font-family="system-ui" font-size="14" font-weight="700">BCNF (3.5NF)</text>
            <text x="585" y="80" text-anchor="middle" fill="#cbd5e1" font-family="system-ui" font-size="11">X must be Super Key</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### The 3 Classic Database Anomalies:
1. **Insertion Anomaly:** Cannot insert a new department without assigning an employee if \`emp_id\` is the Primary Key.
2. **Update Anomaly:** If department head changes, updating 500 employee records risks inconsistent data if one update fails.
3. **Deletion Anomaly:** Deleting the last employee of a project unintentionally destroys project metadata.

### The Normalization Ladder:
- **1NF (First Normal Form):** Every cell holds an atomic (indivisible) value. No comma-separated lists or arrays inside a column. Every record has a Primary Key.
- **2NF (Second Normal Form):** Must be in 1NF. **No Partial Dependency**: all non-key attributes must depend on the *entire* candidate key, not just part of a composite key.
- **3NF (Third Normal Form):** Must be in 2NF. **No Transitive Dependency**: non-key attributes must not depend on other non-key attributes ($A \\rightarrow B$ and $B \\rightarrow C$).
- **BCNF (Boyce-Codd Normal Form):** Stricter 3NF. For every functional dependency $X \\rightarrow Y$, $X$ must be a Super Key.

### Denormalization in High-Scale Systems:
In massive production systems (e.g., Netflix, Amazon), joins across 8 normalized tables cause high disk I/O and latency. **Denormalization** intentionally introduces controlled redundancy:
- **Historical Snapshot:** Storing \`product_price\` directly in \`order_items\` so future price edits don't alter past receipts.
- **Precomputed Totals:** Storing \`comment_count\` on a \`posts\` table instead of executing \`SELECT COUNT(*)\` across 5 million rows on every load.`,
        codeExamples: [
          {
            title: "Normalization Step-by-Step SQL Refactoring",
            language: "sql",
            code: `-- UNNORMALIZED TABLE (Violates 1NF, 2NF, 3NF):
-- StudentCourses(student_id, student_name, course_id, course_name, instructor_id, instructor_name)

-- STEP 1: 1NF & 2NF Decomposition
-- Separate Courses from Student Enrollments to eliminate partial dependency
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    instructor_id INT NOT NULL -- Still has transitive dependency to instructor_name!
);

-- STEP 2: 3NF Decomposition
-- Remove transitive dependency: course_id -> instructor_id -> instructor_name
CREATE TABLE instructors (
    instructor_id INT PRIMARY KEY,
    instructor_name VARCHAR(100) NOT NULL,
    office_room VARCHAR(20)
);

-- Refined courses table (now in 3NF)
ALTER TABLE courses ADD CONSTRAINT fk_instructor 
    FOREIGN KEY (instructor_id) REFERENCES instructors(instructor_id);

-- Junction table for Many-to-Many Enrollment
CREATE TABLE enrollments (
    student_id INT,
    course_id INT,
    grade VARCHAR(2),
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);`
          }
        ],
        badVsGood: {
          badTitle: "Over-Normalized Read Bottleneck",
          badCode: `-- Requires joining 6 tables just to render a shopping cart view:
SELECT o.id, c.name, a.city, p.title, p.price, m.merchant_name
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN addresses a ON c.address_id = a.id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
JOIN merchants m ON p.merchant_id = m.id
WHERE o.id = 1054;`,
          goodTitle: "Denormalized for Read Scale",
          goodCode: `-- Denormalized snapshot in order_items:
-- Stores exact title, unit price, and merchant at checkout time:
SELECT o.id, o.customer_name, oi.product_title, oi.unit_price, oi.quantity
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
WHERE o.id = 1054;
-- Blazing fast: Only 1 join instead of 5 joins!`
        }
      },
      level3: {
        interviewQA: [
          {
            q: "What is the difference between 3NF and BCNF?",
            shortA: "3NF allows a non-trivial dependency X -> Y if Y is a prime attribute (part of a candidate key). BCNF removes this exception: X must strictly be a Super Key for all functional dependencies.",
            deepA: "In 3NF, for any functional dependency X -> Y, either X is a super key OR Y is a prime attribute (part of a candidate key). BCNF is stricter: it eliminates the prime attribute exception and requires X to be a super key in ALL cases. BCNF anomalies occur when a table has multiple overlapping candidate keys.",
            followUp: "Why do most real-world databases stop at 3NF instead of BCNF? Because achieving BCNF can sometimes sacrifice dependency preservation, requiring expensive cross-table assertions to enforce business rules."
          }
        ]
      }
    },
    {
      id: "acid-transactions",
      title: "3. Transactions & ACID Properties (Under the Hood)",
      level1: {
        intro: "A database transaction is a group of SQL operations that must succeed together or fail together as a single unit.",
        analogy: "When you send $100 to a friend using an online bank app: Step 1 deducts $100 from your account, and Step 2 adds $100 to your friend's account. If the power cuts out after Step 1, the bank cannot leave your $100 lost in cyberspace. Either both steps complete, or both steps are reversed completely.",
        svgDiagram: `<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="30" width="140" height="120" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="70" y="65" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="16" font-weight="700">Atomicity</text>
            <text x="70" y="95" text-anchor="middle" fill="#cbd5e1" font-family="system-ui" font-size="12">All or Nothing</text>
            <text x="70" y="125" text-anchor="middle" fill="#64748b" font-family="system-ui" font-size="11">Undo Log</text>

            <rect x="170" y="30" width="140" height="120" rx="10" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
            <text x="240" y="65" text-anchor="middle" fill="#4ade80" font-family="system-ui" font-size="16" font-weight="700">Consistency</text>
            <text x="240" y="95" text-anchor="middle" fill="#cbd5e1" font-family="system-ui" font-size="12">Valid Invariants</text>
            <text x="240" y="125" text-anchor="middle" fill="#64748b" font-family="system-ui" font-size="11">Schema Rules</text>

            <rect x="340" y="30" width="140" height="120" rx="10" fill="#1e293b" stroke="#eab308" stroke-width="2"/>
            <text x="410" y="65" text-anchor="middle" fill="#facc15" font-family="system-ui" font-size="16" font-weight="700">Isolation</text>
            <text x="410" y="95" text-anchor="middle" fill="#cbd5e1" font-family="system-ui" font-size="12">Independent</text>
            <text x="410" y="125" text-anchor="middle" fill="#64748b" font-family="system-ui" font-size="11">MVCC / Locks</text>

            <rect x="510" y="30" width="140" height="120" rx="10" fill="#1e293b" stroke="#ec4899" stroke-width="2"/>
            <text x="580" y="65" text-anchor="middle" fill="#f472b6" font-family="system-ui" font-size="16" font-weight="700">Durability</text>
            <text x="580" y="95" text-anchor="middle" fill="#cbd5e1" font-family="system-ui" font-size="12">Survives Crash</text>
            <text x="580" y="125" text-anchor="middle" fill="#64748b" font-family="system-ui" font-size="11">WAL / Redo Log</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### ACID Properties Explained:
1. **Atomicity ("All or Nothing"):** Ensures every SQL statement in the transaction completes successfully. If any failure occurs, the engine performs a **ROLLBACK** using the **Undo Log** to restore pre-transaction state.
2. **Consistency (Preserving Invariants):** The database moves from one valid state to another valid state, upholding constraints, types, checks, and foreign keys.
3. **Isolation (Concurrent Execution):** Prevents concurrent transactions from seeing each other's half-finished, uncommitted data.
4. **Durability (Guaranteed Persistence):** Once \`COMMIT\` returns success, changes are permanently preserved on non-volatile storage, even if the database crashes 1 millisecond later.

### Under the Hood: Write-Ahead Logging (WAL) & Redo/Undo Logs:
Modifying disk data pages on every transaction commit causes severe **Random I/O Bottlenecks**.  
Modern database engines solve this with **Write-Ahead Logging (WAL)**:
- **Redo Log:** Writes modifications sequentially to an append-only log on disk before updating actual data files. Sequential disk I/O is up to 100x faster than random I/O.
- **Rule of WAL:** A data page cannot be written to disk until its corresponding redo log entry is flushed.
- **Undo Log:** Holds before-images of rows to reverse changes on rollback and enable MVCC snapshots for readers.`,
        codeExamples: [
          {
            title: "Financial Transfer Transaction in SQL with Savepoint",
            language: "sql",
            code: `START TRANSACTION;

-- Step 1: Verify sender has enough funds and deduct balance
UPDATE accounts 
SET balance = balance - 250.00 
WHERE account_id = 'ACC-101' AND balance >= 250.00;

-- Step 2: Credit recipient account
UPDATE accounts 
SET balance = balance + 250.00 
WHERE account_id = 'ACC-202';

-- Step 3: Record audit ledger
INSERT INTO transfer_logs (sender_id, receiver_id, amount, status)
VALUES ('ACC-101', 'ACC-202', 250.00, 'COMPLETED');

COMMIT; -- Changes flushed to WAL and made durable`
          }
        ]
      },
      level3: {
        interviewQA: [
          {
            q: "How does Write-Ahead Logging (WAL) ensure Durability without crippling disk write performance?",
            shortA: "WAL converts expensive random disk writes into fast sequential writes by recording changes to an append-only log before touching data pages.",
            deepA: "Flushing scattered B+ tree pages across a hard drive or SSD requires random I/O, which is slow. With WAL, whenever a transaction commits, the engine writes minimal change deltas (LSNs) sequentially to the end of the log file and calls fsync(). Because sequential write throughput is massive, commits finish in sub-milliseconds. In the event of a sudden power outage, the recovery process reads the WAL from the last checkpoint and replays committed transactions to data pages.",
            followUp: "What is a Checkpoint? A checkpoint flushes dirty memory pages to disk and truncates the WAL so recovery doesn't have to replay hours of logs."
          }
        ]
      }
    },
    {
      id: "concurrency-isolation",
      title: "4. Concurrency Control, Isolation Levels & Locking",
      level1: {
        intro: "When hundreds of users read and write to the same database at the same second, their queries can interfere with each other unless isolation rules are set.",
        analogy: "Imagine booking movie tickets. If two people look at Seat F12 at the same moment, both see it as 'Available'. Without isolation control, both click 'Pay' and the cinema accidentally sells the same seat twice!",
        svgDiagram: `<svg viewBox="0 0 700 210" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <rect x="20" y="20" width="660" height="170" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
          <text x="350" y="50" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="14" font-weight="700">CONCURRENCY ISOLATION SPECTRUM</text>
          <path d="M 50 110 L 650 110" stroke="#475569" stroke-width="4"/>
          <circle cx="90" cy="110" r="14" fill="#ef4444"/>
          <text x="90" y="145" text-anchor="middle" fill="#f87171" font-family="system-ui" font-size="11" font-weight="700">Read Uncommitted</text>
          <text x="90" y="162" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="10">Fastest / Dirty Reads</text>

          <circle cx="260" cy="110" r="14" fill="#f59e0b"/>
          <text x="260" y="145" text-anchor="middle" fill="#fbbf24" font-family="system-ui" font-size="11" font-weight="700">Read Committed</text>
          <text x="260" y="162" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="10">Postgres / Oracle Default</text>

          <circle cx="440" cy="110" r="14" fill="#3b82f6"/>
          <text x="440" y="145" text-anchor="middle" fill="#60a5fa" font-family="system-ui" font-size="11" font-weight="700">Repeatable Read</text>
          <text x="440" y="162" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="10">MySQL InnoDB Default</text>

          <circle cx="610" cy="110" r="14" fill="#10b981"/>
          <text x="610" y="145" text-anchor="middle" fill="#34d399" font-family="system-ui" font-size="11" font-weight="700">Serializable</text>
          <text x="610" y="162" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="10">Strict Safety / Slowest</text>
        </svg>`
      },
      level2: {
        technicalExplanation: `### The 4 Concurrency Anomalies:
1. **Dirty Read:** Transaction A updates a row without committing. Transaction B reads that value. Transaction A rolls back. Transaction B acted on data that never existed.
2. **Non-Repeatable Read (Fuzzy Read):** Transaction A reads a row. Transaction B updates that row and commits. Transaction A re-reads the row and gets different values.
3. **Phantom Read:** Transaction A queries a range (\`WHERE price > 50\`). Transaction B inserts a new item with price 75 and commits. Transaction A re-runs the range query and sees a new "phantom" row.
4. **Lost Update:** Two transactions concurrently update the same record based on an initial read, and the last write silently overwrites the first.

### SQL Isolation Levels Matrix:
| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read | Default RDBMS |
|---|:---:|:---:|:---:|---|
| **READ UNCOMMITTED** | Allowed | Allowed | Allowed | Almost never used |
| **READ COMMITTED** | Prevented | Allowed | Allowed | PostgreSQL, Oracle, SQL Server |
| **REPEATABLE READ** | Prevented | Prevented | Allowed* | MySQL InnoDB |
| **SERIALIZABLE** | Prevented | Prevented | Prevented | Financial ledgers |

*MySQL InnoDB Note: InnoDB uses **Next-Key Locking (Record + Gap locks)** with MVCC, preventing Phantom Reads even in \`REPEATABLE READ\` mode!

### Optimistic vs. Pessimistic Locking:
- **Pessimistic Locking (\`SELECT ... FOR UPDATE\`):** Locks rows immediately upon reading. Other transactions wait. Used in high-contention flash sales.
- **Optimistic Locking (\`version\` column):** Reads without locking. At update time, checks \`WHERE version = old_version\`. If 0 rows affected, retry or fail. Perfect for high-throughput web APIs.`,
        codeExamples: [
          {
            title: "Pessimistic Locking in SQL",
            language: "sql",
            code: `BEGIN;
-- Lock row exclusively; concurrent transactions calling FOR UPDATE will block and wait
SELECT stock_count FROM inventory 
WHERE product_id = 450 FOR UPDATE;

UPDATE inventory 
SET stock_count = stock_count - 1 
WHERE product_id = 450;

COMMIT; -- Lock released`
          },
          {
            title: "Optimistic Locking with Version Column",
            language: "sql",
            code: `-- Step 1: Read without locks
SELECT id, price, version FROM products WHERE id = 101;
-- Suppose price is 40.00 and version is 4

-- Step 2: Atomic update with version check
UPDATE products
SET price = 45.00, version = version + 1
WHERE id = 101 AND version = 4;

-- If rows affected == 1: Success!
-- If rows affected == 0: Another transaction updated the row first! Rollback or retry.`
          }
        ]
      },
      level3: {
        interviewQA: [
          {
            q: "How does Multi-Version Concurrency Control (MVCC) eliminate read-write contention?",
            shortA: "MVCC ensures readers never block writers, and writers never block readers by creating a new version of updated rows while keeping older versions in the Undo Log.",
            deepA: "In traditional 2-Phase Locking (2PL), reading a row required a shared read-lock that blocked concurrent writers. Under MVCC, when a writer modifies a row, it writes the new version and appends the old version to the Undo Log tagged with transaction IDs (xmin/xmax in Postgres, DB_TRX_ID/DB_ROLL_PTR in MySQL). When another transaction reads, it simply reads the snapshot version visible as of its transaction start time, without acquiring any locks.",
            followUp: "What is the vacuum process in PostgreSQL? Since MVCC leaves old row versions (dead tuples) in data pages, a background autovacuum process must reclaim that disk space."
          }
        ]
      }
    },
    {
      id: "indexing-bplus-trees",
      title: "5. Indexing & B+ Tree Architecture",
      level1: {
        intro: "An index in a database works exactly like the alphabetical index at the back of a 1,000-page textbook. Instead of reading every page from start to finish, you look up the keyword in the index and jump straight to the exact page.",
        analogy: "Without an index, finding a customer by email in a table of 10 million rows forces the computer to examine all 10 million rows one by one (Full Table Scan). With a B+ tree index, it finds the record in just 3 to 4 disk page hops!",
        svgDiagram: `<svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="250" y="10" width="160" height="40" rx="8" fill="#1e3a5f" stroke="#38bdf8" stroke-width="2"/>
            <text x="330" y="35" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="13" font-weight="700">Root: [ 50 | 100 ]</text>

            <path d="M 280 50 L 150 90" stroke="#64748b" stroke-width="2"/>
            <path d="M 330 50 L 330 90" stroke="#64748b" stroke-width="2"/>
            <path d="M 380 50 L 510 90" stroke="#64748b" stroke-width="2"/>

            <rect x="70" y="90" width="160" height="35" rx="6" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
            <text x="150" y="112" text-anchor="middle" fill="#cbd5e1" font-family="system-ui" font-size="12">[ 20 | 35 ]</text>
            <rect x="250" y="90" width="160" height="35" rx="6" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
            <text x="330" y="112" text-anchor="middle" fill="#cbd5e1" font-family="system-ui" font-size="12">[ 65 | 80 ]</text>
            <rect x="430" y="90" width="160" height="35" rx="6" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
            <text x="510" y="112" text-anchor="middle" fill="#cbd5e1" font-family="system-ui" font-size="12">[ 120 | 150 ]</text>

            <rect x="20" y="160" width="140" height="40" rx="6" fill="#064e3b" stroke="#22c55e" stroke-width="2"/>
            <text x="90" y="185" text-anchor="middle" fill="#4ade80" font-family="system-ui" font-size="12">Leaf [Data 1..20]</text>
            <rect x="180" y="160" width="140" height="40" rx="6" fill="#064e3b" stroke="#22c55e" stroke-width="2"/>
            <text x="250" y="185" text-anchor="middle" fill="#4ade80" font-family="system-ui" font-size="12">Leaf [Data 21..50]</text>
            <rect x="340" y="160" width="140" height="40" rx="6" fill="#064e3b" stroke="#22c55e" stroke-width="2"/>
            <text x="410" y="185" text-anchor="middle" fill="#4ade80" font-family="system-ui" font-size="12">Leaf [Data 51..100]</text>
            <rect x="500" y="160" width="140" height="40" rx="6" fill="#064e3b" stroke="#22c55e" stroke-width="2"/>
            <text x="570" y="185" text-anchor="middle" fill="#4ade80" font-family="system-ui" font-size="12">Leaf [Data 101..150]</text>

            <path d="M 160 180 L 180 180" stroke="#facc15" stroke-width="2"/>
            <path d="M 320 180 L 340 180" stroke="#facc15" stroke-width="2"/>
            <path d="M 480 180 L 500 180" stroke="#facc15" stroke-width="2"/>
            <text x="330" y="215" text-anchor="middle" fill="#facc15" font-family="system-ui" font-size="11" font-weight="700">Doubly Linked List connecting leaves enables O(log N) Range Queries!</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### Why Databases Prefer B+ Trees Over B-Trees and Hash Indexes:
1. **Hash Index Limitations:** While Hash Indexes provide $O(1)$ point lookups (\`WHERE id = 5\`), they cannot handle **Range Queries (\`WHERE age > 25\`)** or **Sorting (\`ORDER BY age\`)**.
2. **B+ Tree vs. Standard B-Tree:**
   - In a standard B-Tree, data pointers are saved inside internal nodes, eating up page space.
   - In a **B+ Tree**, internal nodes store **only keys and routing pointers**, maximizing the **Fan-Out** (thousands of child pointers in a single 16KB disk page). Tree height stays at 3 to 4 levels even for 100 million rows!
   - In a B+ Tree, all leaf nodes are connected via a **Doubly Linked List**. Range queries simply seek to the first leaf node in $O(\\log N)$ time, and then traverse horizontally along the linked list.

### Clustered Index vs. Non-Clustered (Secondary) Index:
- **Clustered Index:** Leaf nodes contain the **actual table row data**. The table rows are physically ordered on disk by this key. Only **one** clustered index per table (typically the Primary Key).
- **Secondary Index:** A separate B+ tree where leaf nodes store the indexed key plus the **Primary Key pointer**.
- **Secondary Index Lookup (Double Traversal / Bookmark Lookup):** When executing \`SELECT * FROM users WHERE email = 'test@example.com'\`, the engine traverses the \`email\` secondary index to find the user's Primary Key ID, then traverses the Clustered Index using that ID to fetch all table columns.
- **Covering Index:** An index that includes all requested query columns in its leaf nodes, eliminating the secondary clustered index lookup.

### The Leftmost Prefix Rule on Composite Indexes:
For an index on \`(country, city, zip_code)\`:
- \`WHERE country = 'LK' AND city = 'Colombo'\` $\\implies$ **Index Used!**
- \`WHERE country = 'LK'\` $\\implies$ **Index Used!**
- \`WHERE city = 'Colombo'\` $\\implies$ **INDEX IGNORED!** (Full Table Scan! Leftmost column is missing).
- \`WHERE country = 'LK' AND zip_code = '00100'\` $\\implies$ **Only \`country\` prefix used for index filtering!**`,
        codeExamples: [
          {
            title: "Creating Indexes & Analyzing Execution Plan with EXPLAIN",
            language: "sql",
            code: `-- Create composite index
CREATE INDEX idx_users_geo ON users (country, city, created_at);

-- Query 1: Uses Composite Index efficiently
EXPLAIN SELECT id, country, city FROM users 
WHERE country = 'US' AND city = 'San Francisco';
-- Output: type: 'ref', key: 'idx_users_geo', Extra: 'Using index' (Covering index!)

-- Query 2: Violates Leftmost Prefix Rule -> Triggers Full Table Scan
EXPLAIN SELECT * FROM users 
WHERE city = 'San Francisco';
-- Output: type: 'ALL' (Full Table Scan!), key: NULL`
          }
        ]
      },
      level3: {
        interviewQA: [
          {
            q: "Why are random UUIDv4 identifiers terrible as Clustered Primary Keys compared to Auto-Increment or UUIDv7?",
            shortA: "Random UUIDs insert scattered keys in random locations throughout the B+ tree, causing severe page splits, high disk fragmentation, and low buffer cache hit rates.",
            deepA: "A Clustered Index B+ tree maintains strict physical sort order by Primary Key. Auto-increment integers or time-ordered UUIDv7 append sequentially to the rightmost leaf page with zero page splits and 100% page fill efficiency. Random UUIDv4 strings land randomly inside existing leaf pages. When a 16KB leaf page is full, the engine must split it into two 8KB pages (Page Split), rebalance internal nodes, and trigger excessive random disk writes.",
            followUp: "What should you do if an application requires public UUIDs? Use an auto-increment or sequential BIGINT as the internal Clustered Primary Key, and place a secondary unique index on the UUID column."
          }
        ]
      }
    },
    {
      id: "sql-queries-execution",
      title: "6. Essential SQL Queries & Logical Processing Order",
      level1: {
        intro: "Writing a SQL query feels like writing English from top to bottom, but the database engine executes the clauses in a completely different logical order.",
        analogy: "When ordering at a restaurant, you read the menu items first (SELECT), but the kitchen must first find the raw ingredients in the pantry (FROM), filter out spoiled items (WHERE), cook them in batches (GROUP BY), plate them (SELECT), and finally deliver them to your table in order (ORDER BY).",
        svgDiagram: `<svg viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="10" y="10" width="140" height="40" rx="6" fill="#1e3a5f" stroke="#38bdf8" stroke-width="2"/>
            <text x="80" y="35" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="12" font-weight="700">1. FROM / JOIN</text>

            <rect x="180" y="10" width="140" height="40" rx="6" fill="#1e3a5f" stroke="#38bdf8" stroke-width="2"/>
            <text x="250" y="35" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="12" font-weight="700">2. WHERE</text>

            <rect x="350" y="10" width="140" height="40" rx="6" fill="#1e3a5f" stroke="#38bdf8" stroke-width="2"/>
            <text x="420" y="35" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="12" font-weight="700">3. GROUP BY</text>

            <rect x="520" y="10" width="140" height="40" rx="6" fill="#1e3a5f" stroke="#38bdf8" stroke-width="2"/>
            <text x="590" y="35" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="12" font-weight="700">4. HAVING</text>

            <rect x="100" y="90" width="140" height="40" rx="6" fill="#064e3b" stroke="#22c55e" stroke-width="2"/>
            <text x="170" y="115" text-anchor="middle" fill="#4ade80" font-family="system-ui" font-size="12" font-weight="700">5. SELECT</text>

            <rect x="270" y="90" width="140" height="40" rx="6" fill="#064e3b" stroke="#22c55e" stroke-width="2"/>
            <text x="340" y="115" text-anchor="middle" fill="#4ade80" font-family="system-ui" font-size="12" font-weight="700">6. DISTINCT</text>

            <rect x="440" y="90" width="140" height="40" rx="6" fill="#064e3b" stroke="#22c55e" stroke-width="2"/>
            <text x="510" y="115" text-anchor="middle" fill="#4ade80" font-family="system-ui" font-size="12" font-weight="700">7. ORDER BY</text>

            <rect x="270" y="160" width="160" height="40" rx="6" fill="#78350f" stroke="#f59e0b" stroke-width="2"/>
            <text x="350" y="185" text-anchor="middle" fill="#facc15" font-family="system-ui" font-size="12" font-weight="700">8. LIMIT / OFFSET</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### Logical Query Execution Order:
\`\`\`
1. FROM (+ JOIN / ON)  -- Identify and combine source tables
2. WHERE               -- Filter row records
3. GROUP BY            -- Aggregate groups
4. HAVING              -- Filter aggregated groups
5. SELECT              -- Project columns and evaluate expressions
6. DISTINCT            -- Remove duplicates
7. ORDER BY            -- Sort the final result set
8. LIMIT / OFFSET      -- Paginate output rows
\`\`\`

### Classic Gotcha:
Why can't you reference a column alias defined in \`SELECT\` inside the \`WHERE\` clause?  
**Answer:** Because the engine executes \`WHERE\` at **Step 2**, before \`SELECT\` aliases are created at **Step 5**! However, aliases are valid in \`ORDER BY\` because it runs at **Step 7** after \`SELECT\`.

### Key SQL Operations Compared:
- **\`UNION\` vs. \`UNION ALL\`:** \`UNION\` eliminates duplicate records by executing an expensive $O(N \\log N)$ sort. \`UNION ALL\` simply appends sets in $O(N)$ time. Always use \`UNION ALL\` unless duplicate purging is strictly required.
- **\`DELETE\` vs. \`TRUNCATE\` vs. \`DROP\`:**
  - \`DELETE\`: DML, deletes rows one by one, writes to Undo Log, supports \`WHERE\`, can be rolled back, slow.
  - \`TRUNCATE\`: DDL, deallocates data pages, resets auto-increment, cannot use \`WHERE\`, extremely fast.
  - \`DROP\`: DDL, removes data and table schema permanently.`,
        codeExamples: [
          {
            title: "Must-Know SQL Interview Queries",
            language: "sql",
            code: `-- 1. Find the Nth Highest Salary using DENSE_RANK() (Handles duplicate ties smoothly)
WITH RankedEmployees AS (
    SELECT 
        emp_id, 
        emp_name, 
        salary,
        DENSE_RANK() OVER (ORDER BY salary DESC) as salary_rank
    FROM employees
)
SELECT emp_id, emp_name, salary 
FROM RankedEmployees 
WHERE salary_rank = 2; -- Change to N for Nth highest

-- 2. Find and Delete Duplicate Records (Keeping the lowest ID)
-- Step A: Find duplicate emails
SELECT email, COUNT(*) 
FROM users 
GROUP BY email 
HAVING COUNT(*) > 1;

-- Step B: Delete duplicate rows keeping smallest user_id
DELETE u1 FROM users u1
INNER JOIN users u2 
ON u1.email = u2.email AND u1.user_id > u2.user_id;`
          }
        ]
      },
      level3: {
        interviewQA: [
          {
            q: "What is the difference between WHERE and HAVING in SQL?",
            shortA: "WHERE filters individual rows before grouping occurs. HAVING filters aggregated groups after GROUP BY is performed.",
            deepA: "WHERE evaluates conditions against table columns before the GROUP BY phase. Aggregate functions like SUM(), COUNT(), or AVG() cannot be evaluated in WHERE. In contrast, HAVING filters the aggregated buckets generated by GROUP BY. For optimal performance, always filter out as many rows as possible in WHERE before they reach GROUP BY.",
            followUp: "Can you use HAVING without GROUP BY? Yes. When used without GROUP BY, HAVING treats the entire table result set as a single aggregate group."
          }
        ]
      }
    },
    {
      id: "scaling-and-cap",
      title: "7. SQL vs. NoSQL, CAP Theorem & Distributed Scaling",
      level1: {
        intro: "As applications grow from 1,000 to 100 million users, single database servers become overloaded. Understanding when to pick SQL vs. NoSQL and how to scale databases is essential for modern software engineering.",
        analogy: "Vertical scaling (Scale Up) is like buying a bigger delivery truck with a larger engine—eventually you hit a physical limit. Horizontal scaling (Scale Out) is like hiring a fleet of 50 smaller vans working together across different city neighborhoods.",
        svgDiagram: `<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <polygon points="350,20 180,180 520,180" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
            <text x="350" y="55" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="14" font-weight="700">Consistency (C)</text>
            <text x="180" y="170" text-anchor="middle" fill="#22c55e" font-family="system-ui" font-size="14" font-weight="700">Availability (A)</text>
            <text x="520" y="170" text-anchor="middle" fill="#facc15" font-family="system-ui" font-size="14" font-weight="700">Partition Tolerance (P)</text>
            <text x="350" y="130" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="12">CAP Theorem</text>
            <text x="350" y="150" text-anchor="middle" fill="#e2e8f0" font-family="system-ui" font-size="11">Network partitions (P) are unavoidable,</text>
            <text x="350" y="165" text-anchor="middle" fill="#e2e8f0" font-family="system-ui" font-size="11">so you must choose: CP or AP!</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### SQL vs. NoSQL Comparison:
| Dimension | Relational (SQL) | NoSQL (Document, Key-Value, Columnar) |
|---|---|---|
| **Data Structure** | Predefined, rigid tabular schema | Flexible schema-free (JSON/BSON, Key-Value) |
| **ACID vs. BASE** | Strict ACID guarantees | BASE (Basically Available, Soft state, Eventual consistency) |
| **Joins** | Native, highly optimized multi-table joins | Discouraged; data is embedded or pre-denormalized |
| **Scaling Model** | Primarily Vertical Scaling (Read replicas for reads) | Horizontally Scalable out-of-the-box (Sharding) |

### The CAP Theorem Explained:
In any distributed data store, you can only guarantee **two out of three** properties:
1. **Consistency (C):** Every read receives the most recent write or an error.
2. **Availability (A):** Every non-failing node returns a response (without guarantee that it contains the newest write).
3. **Partition Tolerance (P):** The system continues to operate despite arbitrary network message losses or node network cuts.

**The Reality:** Network cuts and packet drops ($P$) are physical facts in distributed networks. Therefore, a distributed system must choose between **CP** (reject writes/reads to protect data consistency, e.g., MongoDB, Redis Cluster) or **AP** (keep answering with stale data to guarantee availability, e.g., Cassandra, DynamoDB).

### Database Scaling Techniques:
1. **Read Replicas (Primary-Replica Pattern):** Primary handles writes and streams binlogs asynchronously to replicas. Read queries are distributed across replicas.  
   *Trade-off:* **Replication Lag** (user creates a post on primary and refreshes replica page immediately, seeing missing data).
2. **Database Sharding:** Splitting a massive table across independent database servers based on a **Shard Key** (e.g., \`hash(user_id) % num_shards\`).  
   *Trade-off:* Cross-shard joins are slow and complex; distributed transactions require Two-Phase Commit (2PC).`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "What causes Replication Lag and how do you handle it in a backend application?",
            shortA: "Replication lag occurs because asynchronous log replication from the primary database to read replicas takes time over the network. Handle it by reading critical writes directly from the primary.",
            deepA: "When an application writes to the primary, the transaction commits once the local WAL is flushed, and replication streams the change asynchronously to read replicas. If network latency or heavy replica load creates a 200ms lag, a user who immediately redirects to a profile page might read stale data from a replica (Read-Your-Own-Writes problem). Solutions: 1) Route read requests for the specific updating user to the primary for 2 seconds after a write; 2) Pass the transaction Log Sequence Number (LSN) and make the replica wait until it catches up.",
            followUp: "What is synchronous replication? Synchronous replication requires at least one replica to acknowledge write persistence before committing, eliminating lag at the cost of slower write latency."
          }
        ]
      }
    },
    {
      id: "deep-dive-interview-qa",
      title: "8. Deep-Dive & Tricky DBMS Interview Questions",
      level1: {
        intro: "These 8 interview questions test real-world database engineering judgment, edge cases, and internals.",
        analogy: "Like an aircraft pilot understanding how aerodynamic turbulence affects wing flap hydraulics, senior engineers understand how database internals behave under extreme production load."
      },
      level2: {
        technicalExplanation: "Review each deep-dive question below. These represent actual technical interview scenarios from top tech companies."
      },
      level3: {
        interviewQA: [
          {
            q: "Why does SELECT COUNT(*) run slowly in MySQL InnoDB compared to MyISAM?",
            shortA: "MyISAM stored an exact row count in table metadata because it used table-level locks. InnoDB uses MVCC, meaning different concurrent transactions see different row counts, requiring an index scan.",
            deepA: "In MyISAM, only one write transaction could execute at a time, allowing the engine to maintain a cached row count in header metadata ($O(1)$). InnoDB supports Multi-Version Concurrency Control (MVCC). At any given moment, Transaction A might see 10,000 rows while uncommitted Transaction B sees 10,005 rows. Consequently, InnoDB must scan the smallest secondary index tree to count the rows visible to the specific transaction snapshot ($O(N)$)."
          },
          {
            q: "What is the N+1 Query Problem in ORMs and how do you fix it?",
            shortA: "It occurs when an ORM issues 1 query to fetch parent records, and then executes N additional individual queries to fetch children inside a loop. Fix it using JOIN FETCH or batch querying.",
            deepA: "If you fetch 100 Customers (\`SELECT * FROM customers\`), and then access \`customer.getOrders()\` in a Java/Hibernate loop, Hibernate fires 100 separate queries: \`SELECT * FROM orders WHERE customer_id = ?\`. Total: 101 database roundtrips! Fixes: 1) Eager loading with \`JOIN FETCH\` in JPQL; 2) Hibernate Batch Fetching (\`@BatchSize(size = 50)\`) which compiles child fetches into \`WHERE customer_id IN (...)\`."
          },
          {
            q: "How does Database Connection Pooling work (e.g., HikariCP) and why is it critical?",
            shortA: "Opening a database connection requires an expensive TCP handshake, TLS negotiation, authentication, and memory allocation. Connection pooling keeps pre-authenticated connections ready in memory.",
            deepA: "Creating a raw database connection takes 30-100ms of CPU and network roundtrips. Under 1,000 concurrent requests, creating connections on the fly will exhaust server sockets and crash the database. A connection pool like HikariCP maintains a warm pool of active connections. Threads borrow a connection in < 1ms, execute their query, and return it to the pool instead of closing it."
          },
          {
            q: "Hard Delete vs. Soft Delete: What are the hidden production trade-offs?",
            shortA: "Soft deletes set an is_deleted flag. They preserve audit history but break unique constraints, bloat indexes, slow down queries, and complicate GDPR compliance.",
            deepA: "While soft deletes protect against accidental data loss, they introduce severe architectural costs: 1) Every query must remember \`WHERE is_deleted = false\`; 2) Unique constraints break (if a user deletes their account, another user cannot sign up with that same email unless partial indexes are used); 3) Table and B+ tree sizes grow indefinitely, degrading cache efficiency; 4) Under GDPR 'Right to be Forgotten', keeping soft-deleted customer PII is illegal."
          },
          {
            q: "Why does NULL = NULL return NULL (UNKNOWN) instead of TRUE in SQL?",
            shortA: "SQL uses Three-Valued Logic (3VL): TRUE, FALSE, and UNKNOWN. NULL represents missing data, and two unknown values cannot be confirmed equal.",
            deepA: "In SQL relational algebra, NULL represents an unknown or absent value. If Person A's age is unknown (NULL) and Person B's age is unknown (NULL), the database cannot confirm they have the exact same age. Therefore, NULL = NULL evaluates to UNKNOWN (NULL). Because a WHERE clause only admits rows that evaluate strictly to TRUE, \`WHERE col = NULL\` always returns 0 rows. You must use \`IS NULL\` or \`IS NOT NULL\`."
          },
          {
            q: "How do you prevent Deadlocks in concurrent banking transfers between Account A and Account B?",
            shortA: "Enforce strict Deterministic Lock Ordering: always acquire locks in order of ascending account ID.",
            deepA: "If Transaction 1 transfers from A to B (locks A, waits for B) while Transaction 2 transfers from B to A (locks B, waits for A), a circular wait deadlock occurs. By ordering locks deterministically: \`Account first = fromId < toId ? fromAccount : toAccount;\` and \`Account second = fromId < toId ? toAccount : fromAccount;\`, both transactions will attempt to lock Account A first. Transaction 2 will wait before acquiring any lock, making deadlocks mathematically impossible."
          }
        ]
      }
    },
    {
      id: "quick-revision-cheat-sheet",
      title: "9. Two-Minute Pre-Interview Revision Cheat Sheet",
      level1: {
        intro: "Review this quick-reference cheat sheet right before walking into your technical interview room!"
      },
      level2: {
        technicalExplanation: `### Master DBMS Revision Cheat Sheet:

- **Keys Hierarchy:**
  - **Candidate Key:** Minimal Super Key (no redundant columns).
  - **Primary Key:** 1 per table, strictly \`NOT NULL\`, default Clustered Index.
  - **Unique Key:** Multiple allowed, permits \`NULL\`, secondary index.
- **Normalization:**
  - **1NF:** Atomic values, no repeating groups.
  - **2NF:** 1NF + No Partial Dependency (All non-keys depend on entire composite key).
  - **3NF:** 2NF + No Transitive Dependency (Non-keys don't depend on other non-keys).
  - **BCNF:** For every $X \\rightarrow Y$, $X$ must be a Super Key.
- **ACID:**
  - **A**tomicity: All or nothing (Undo Log).
  - **C**onsistency: Preserves schema rules and constraints.
  - **I**solation: Concurrency isolation (MVCC and Locks).
  - **D**urability: Persisted permanently (WAL / Redo Log).
- **Isolation Levels & Anomalies:**
  - \`Read Uncommitted\` $\\implies$ Allows Dirty Reads.
  - \`Read Committed\` $\\implies$ Prevents Dirty Reads; allows Non-Repeatable Reads.
  - \`Repeatable Read\` $\\implies$ Prevents Non-Repeatable Reads (MySQL InnoDB default).
  - \`Serializable\` $\\implies$ Prevents Phantom Reads; strict serial execution.
- **Locking:**
  - **Pessimistic:** \`SELECT ... FOR UPDATE\` (High contention).
  - **Optimistic:** \`WHERE version = old_version\` (Low contention, high read throughput).
- **Indexing & B+ Trees:**
  - B+ Tree leaf nodes store data and are linked via **Doubly Linked List** (Ideal for Range Scans).
  - **Clustered Index:** Stores actual table rows in leaf nodes (Only 1 per table).
  - **Composite Index Leftmost Prefix Rule:** Index on \`(A, B, C)\` is ignored if \`A\` is missing from query filter.
  - **Covering Index:** Index contains all selected columns $\\implies$ eliminates clustered index lookup.
- **Logical Query Execution Order:**
  \`FROM\` $\\rightarrow$ \`WHERE\` $\\rightarrow$ \`GROUP BY\` $\\rightarrow$ \`HAVING\` $\\rightarrow$ \`SELECT\` $\\rightarrow$ \`DISTINCT\` $\\rightarrow$ \`ORDER BY\` $\\rightarrow$ \`LIMIT\`.
- **CAP Theorem:** In distributed networks, network partitions ($P$) are unavoidable. You must pick **CP** (Consistency) or **AP** (Availability).`
      },
      level3: {
        interviewQA: []
      }
    }
  ],
  "flashcards": [
    {
      "term": "ACID Properties",
      "category": "Transactions",
      "question": "What does each letter of ACID guarantee in databases?",
      "answer": "Atomicity (all-or-nothing via Undo Log), Consistency (valid state transitions), Isolation (independent transactions via locking/MVCC), Durability (survives crashes via WAL/Redo Log).",
      "tip": "Atomicity = Undo, Durability = Redo."
    },
    {
      "term": "B+ Tree Leftmost Prefix Rule",
      "category": "Indexing",
      "question": "If you have an index on (dept_id, salary), will 'WHERE salary > 50000' use the index?",
      "answer": "No! Composite B+ tree indexes sort first by dept_id, then by salary. If the leftmost column (dept_id) is missing from the query filter, the engine must perform a full table scan.",
      "tip": "Leading index column must be present."
    },
    {
      "term": "Dirty Read vs. Non-Repeatable Read",
      "category": "Concurrency",
      "question": "What is the difference between a Dirty Read and a Non-Repeatable Read?",
      "answer": "Dirty Read: Reading uncommitted data from another transaction that might roll back. Non-Repeatable Read: Reading committed changes made by another transaction during your own transaction.",
      "tip": "Dirty = Uncommitted; Non-Repeatable = Committed."
    },
    {
      "term": "Clustered vs. Non-Clustered Index",
      "category": "Storage Internals",
      "question": "Why can a relational table have only ONE clustered index?",
      "answer": "The clustered index defines the physical sorting order of rows on disk. Physical rows can only be ordered on disk in one physical sequence at a time.",
      "tip": "One physical order = One clustered index."
    }
  ]
};
