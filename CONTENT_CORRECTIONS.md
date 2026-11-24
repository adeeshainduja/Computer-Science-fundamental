# Content Technical Corrections & Modern Clarifications (CONTENT_CORRECTIONS.md)

This document records technical verifications, modern industry nuances, and corrections applied when transforming the original Computer Science study notes into the interactive learning platform.

---

## 1. Java Object-Oriented Programming & Design Principles

### Correction 1.1: Double-Checked Locking & `volatile` Memory Model
- **Original Context:** Explaining why the Singleton pattern requires `volatile` in Java.
- **Clarification / Correction:** Prior to Java 5, the Java Memory Model allowed instruction reordering where a reference to uninitialized heap memory could be assigned to `instance` before the constructor completed. Under JSR-133 (Java 5+), the `volatile` modifier establishes a strict **Happens-Before** relationship that prevents instruction reordering around reads and writes, guaranteeing that any thread reading a non-null reference sees a fully constructed object.
- **Modern Addition:** Mention that `enum` singletons provide JVM-level serialization and reflection protection out-of-the-box, though lazy initialization via Double-Checked Locking remains the standard architectural interview case.

### Correction 1.2: Interface Evolution (Java 8, 9, and Beyond)
- **Original Context:** Abstract Class vs. Interface comparison.
- **Clarification:** Historically, interfaces could only contain `public static final` constants and `public abstract` methods.
  - **Java 8:** Added `default` methods (for backward-compatible API evolution) and `static` methods.
  - **Java 9:** Added `private` and `private static` methods to share code between default methods without exposing helper methods to implementing classes.
  - **Crucial Distinction:** Interfaces still **cannot hold mutable instance state (instance fields)** or declare constructors. Abstract classes maintain instance fields and constructor state.

### Correction 1.3: Diamond Problem Conflict Resolution in Java
- **Original Context:** Multiple interface inheritance with conflicting default methods.
- **Clarification:** When a class implements two interfaces that provide conflicting `default` method signatures (`A.turnOn()` and `B.turnOn()`), Java does NOT guess. The compiler forces the implementing class to explicitly override the method and resolve the ambiguity using `InterfaceName.super.methodName()` syntax (e.g. `ElectricVehicle.super.start()`).

### Correction 1.4: Fragile Base Class & The Double-Counting Bug
- **Original Context:** Inheritance pitfalls and why engineers favor composition.
- **Clarification:** The classic Joshua Bloch example (`HashSet` subclass counting items added) demonstrates that if a base class's `addAll()` internally invokes `add()`, overriding both `add()` and `addAll()` in a subclass causes elements to be counted twice (e.g. expected 3, actual 6). Composition with explicit forwarding methods isolates the subclass from internal implementation changes in the base class.

---

## 2. Database Management Systems (DBMS)

### Correction 2.1: 3NF vs. BCNF (Boyce-Codd Normal Form)
- **Original Context:** Database Normalization rules.
- **Clarification:** For a relation to be in **Third Normal Form (3NF)**, for every functional dependency $X \rightarrow Y$, either:
  1. $X$ is a Super Key, OR
  2. $Y$ is a **Prime Attribute** (part of a candidate key).
  **BCNF** removes condition (2): *every determinant must be a candidate key*. If a table has overlapping candidate keys, it can be in 3NF while violating BCNF.

### Correction 2.2: B+ Tree vs. B Tree in Relational Storage
- **Original Context:** Clustered vs. Secondary Indexes.
- **Clarification:** Relational databases (InnoDB, PostgreSQL) use **B+ Trees** rather than classic B-Trees for disk storage because B+ Trees store all actual record pointers strictly in the leaf nodes, which are linked together in a bi-directional doubly linked list. This makes range scans (`BETWEEN '2026-01-01' AND '2026-01-31'`) instantaneous sequentially traversing leaf blocks without tree re-traversals.

---

## 3. Operating Systems & Concurrency

### Correction 3.1: Java Thread State Transitions & Virtual Threads
- **Original Context:** OS Threads vs. Java Threads.
- **Clarification:** Classic Java threads mapped 1:1 to OS kernel threads (`Platform Threads`). In modern Java (Java 21+ Project Loom), **Virtual Threads** run millions of lightweight user-mode threads scheduled by the JVM over a small pool of carrier OS threads (M:N scheduling), eliminating thread-per-request scaling limits for I/O-bound services.

### Correction 3.2: Mutex vs. Binary Semaphore
- **Original Context:** Mutual exclusion mechanisms.
- **Clarification:** A **Mutex** has an ownership concept: *only the thread that locked the Mutex can unlock it*. A **Binary Semaphore** has no ownership concept: *any thread can signal (release) a semaphore acquired by another thread*, making semaphores suitable for inter-thread signaling (producer-consumer) rather than pure critical section ownership.

---

## 4. Computer Networks & Web Protocols

### Correction 4.1: HTTP/2 vs. HTTP/3 Head-of-Line (HoL) Blocking
- **Original Context:** Protocol evolution from HTTP/1.1 to HTTP/3.
- **Clarification:** HTTP/2 solved *Application-Layer* HoL blocking through multiplexed binary frames over a single TCP connection. However, it introduced *Transport-Layer* HoL blocking: if a single TCP packet is dropped, TCP halts delivery of all multiplexed streams until that lost packet is retransmitted. HTTP/3 solves this by replacing TCP with **QUIC (over UDP)**, where each stream is isolated at the transport layer.

### Correction 4.2: 401 Unauthorized vs. 403 Forbidden
- **Original Context:** HTTP status code definitions.
- **Clarification:** The name "401 Unauthorized" is an RFC misnomer. In actual security architecture:
  - `401 Unauthorized` strictly means **Unauthenticated** (missing, invalid, or expired credentials; identity is unknown).
  - `403 Forbidden` strictly means **Unauthorized** (identity is authenticated and confirmed, but permissions/roles are insufficient).

---

## 5. Modern Frontend & JavaScript Engine

### Correction 5.1: Microtask vs. Macrotask Priority
- **Original Context:** JavaScript Event Loop.
- **Clarification:** Microtasks (`Promise.then()`, `queueMicrotask()`, `MutationObserver`) do not alternate with macrotasks. The event loop drains the microtask queue **completely to zero** after every single task and before the browser runs rendering/paint steps or picks the next macrotask (`setTimeout()`, `setInterval()`).

### Correction 5.2: React Reconciliation & Index Keys
- **Original Context:** Virtual DOM diffing.
- **Clarification:** Using array index as a `key` prop is safe ONLY when the list is purely static (never reordered, filtered, or inserted). In dynamic lists, index keys cause React to re-use existing DOM nodes and component state for the wrong data items when items are inserted at the start or sorted.

---

## 6. Web Security & System Architecture

### Correction 6.1: JWT Storage Vulnerabilities
- **Original Context:** Where to store JSON Web Tokens in single-page apps.
- **Clarification:** Storing access tokens in `localStorage` or `sessionStorage` exposes them to complete exfiltration via Cross-Site Scripting (XSS). The enterprise security standard is to store tokens in **`HttpOnly + Secure + SameSite=Lax/Strict` cookies**, which the browser protects from all JavaScript `document.cookie` access.

### Correction 6.2: Slow Adaptive Hashes vs. Fast Cryptographic Hashes
- **Original Context:** Password hashing algorithms.
- **Clarification:** Algorithms like MD5, SHA-1, and SHA-256 are designed for high-speed file checksums and are dangerous for password storage because GPUs can compute billions of guesses per second. Password storage requires **slow, memory-hard, adaptive hashes** with configurable work factors (Argon2id, Bcrypt, PBKDF2) and unique per-user salts.
