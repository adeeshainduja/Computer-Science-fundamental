// Module 4: Operating Systems & Concurrency
// Comprehensive Study Data with 3 Levels of Learning

var topicOS = window.topicOS = {
  id: "os",
  title: "Operating Systems & Concurrency",
  icon: "⚙️",
  badge: "Module 04",
  description: "Master Processes, Threads, Concurrency vs. Parallelism, Mutex/Semaphores, Race Conditions, Deadlocks, Virtual Memory, Paging, and CPU Scheduling.",
  lessons: [
    {
      id: "processes-vs-threads",
      title: "1. Processes vs. Threads (Under the Hood)",
      level1: {
        intro: "An operating system manages the physical computer hardware (CPU, RAM, Disks) to run our software programs. The two foundational building blocks of execution are Processes and Threads.",
        analogy: "Think of an entire restaurant kitchen as a Process: It has its own dedicated building, refrigerator, pantry, and cooking tools (Address Space and File Descriptors). The chefs working inside the kitchen at the same time are Threads: They all share the same refrigerator and cutting boards, but each chef has their own notepad in their pocket (Call Stack) to remember their personal recipe steps.",
        svgDiagram: `<svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <rect x="20" y="20" width="660" height="200" rx="14" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
          <text x="45" y="50" fill="#38bdf8" font-family="system-ui" font-size="14" font-weight="700">PROCESS (Isolated Virtual Address Space)</text>
          
          <rect x="45" y="65" width="610" height="45" rx="8" fill="#0f172a" stroke="#64748b" stroke-width="1.5"/>
          <text x="65" y="92" fill="#94a3b8" font-family="system-ui" font-size="12" font-weight="700">SHARED: Heap Memory (Objects), Code/Text, Global Data, File Descriptors, Sockets</text>
          
          <g transform="translate(45, 125)">
            <rect x="0" y="0" width="290" height="80" rx="8" fill="#1e3a5f" stroke="#22c55e" stroke-width="2"/>
            <text x="20" y="25" fill="#4ade80" font-family="system-ui" font-size="13" font-weight="700">THREAD 1 (Lightweight Worker)</text>
            <text x="20" y="48" fill="#e2e8f0" font-family="system-ui" font-size="11">Private Call Stack (Local variables)</text>
            <text x="20" y="65" fill="#94a3b8" font-family="system-ui" font-size="11">Program Counter (PC) &amp; CPU Registers</text>
          </g>

          <g transform="translate(365, 125)">
            <rect x="0" y="0" width="290" height="80" rx="8" fill="#1e3a5f" stroke="#a855f7" stroke-width="2"/>
            <text x="20" y="25" fill="#c084fc" font-family="system-ui" font-size="13" font-weight="700">THREAD 2 (Lightweight Worker)</text>
            <text x="20" y="48" fill="#e2e8f0" font-family="system-ui" font-size="11">Private Call Stack (Local variables)</text>
            <text x="20" y="65" fill="#94a3b8" font-family="system-ui" font-size="11">Program Counter (PC) &amp; CPU Registers</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### Architectural Breakdown:
1. **Process:** An independent program in execution. The OS provisions an **Isolated Virtual Address Space**, page tables, open file descriptors, and environment variables. Processes cannot read or write each other's memory directly without specialized OS Inter-Process Communication (IPC).
2. **Thread (Lightweight Process):** The smallest dispatchable unit of execution scheduled by the CPU within a process. All threads inside the same process share the parent's Heap, Global Variables, Code Segment, and File Descriptors.
3. **Context Switching Cost Comparison:**
   - **Process Context Switch (Heavyweight):** The OS kernel saves CPU registers in the **Process Control Block (PCB)**, switches the page table directory pointer (CR3 register), and flushes the **Translation Lookaside Buffer (TLB)** cache. CPU L1/L2 data caches become invalid for the incoming process, triggering expensive cache misses. Takes several microseconds (thousands of CPU cycles).
   - **Thread Context Switch (Lightweight):** Because threads share the same virtual address space, **no page table switch or TLB flush occurs!** The CPU only saves active registers, Stack Pointer, and Program Counter in the **Thread Control Block (TCB)**. It is roughly **10x faster** than a process switch.

### Inter-Process Communication (IPC):
- **Shared Memory:** The OS maps a shared RAM page into both address spaces. Fastest IPC; requires developers to coordinate with semaphores.
- **Message Passing:** Unix domain sockets, Pipes (\`cat file | grep "error"\`), and TCP/IP sockets across network boundaries.`,
        codeExamples: [],
        comparisonTable: {
          headers: ["Attribute", "Process", "Thread"],
          rows: [
            ["Memory Space", "Completely isolated virtual address space", "Shares Heap, Code, and Globals with sibling threads"],
            ["Call Stack", "Separate stack per process", "Each thread has its own private Call Stack & Program Counter"],
            ["Creation Cost", "Heavyweight (Forking duplicates tables & descriptors)", "Lightweight (10x-50x faster creation)"],
            ["Context Switch", "Flushes TLB, swaps page tables, invalidates caches (Slow)", "Swaps registers and stack pointer only; keeps TLB & caches hot (Fast)"],
            ["Crash Impact", "One process crashing does not crash other processes", "An unhandled segmentation fault crashes the entire parent process"]
          ]
        }
      },
      level3: {
        interviewQA: [
          {
            q: "Why is a Thread Context Switch significantly faster than a Process Context Switch?",
            shortA: "Because all threads in a process share the same virtual address space, a thread context switch does not swap page tables or flush the CPU Translation Lookaside Buffer (TLB).",
            deepA: "In a process context switch, the OS must switch the memory page table directory (e.g., loading a new address into the x86 CR3 register). This forces a complete invalidation of the Translation Lookaside Buffer (TLB), which caches virtual-to-physical address mappings. Subsequent memory accesses incur hardware page table walks and CPU cache misses. In a thread context switch, the virtual address space remains identical, so the TLB remains valid and CPU L1/L2 caches stay warm. The kernel only swaps the registers, stack pointer, and program counter via the Thread Control Block (TCB).",
            followUp: "What is the difference between User-Level Threads (ULT) and Kernel-Level Threads (KLT)? User-level threads are scheduled by a user-space runtime library without kernel awareness (M:N model). Kernel-level threads are scheduled directly by the OS kernel (1:1 model, standard in modern JVMs and Linux pthreads)."
          }
        ]
      }
    },
    {
      id: "concurrency-vs-parallelism",
      title: "2. Concurrency vs. Parallelism & I/O Models",
      level1: {
        intro: "Concurrency and Parallelism sound identical in conversational English, but they refer to completely different architectural properties in computer science.",
        analogy: "Imagine an office coffee maker: Concurrency is two lines of people taking turns using a single coffee machine (interleaving access to one core). Parallelism is having two separate coffee machines running simultaneously side-by-side with two people brewing coffee at the exact same physical millisecond.",
        svgDiagram: `<svg viewBox="0 0 700 210" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="0" width="310" height="170" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="155" y="30" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="14" font-weight="700">CONCURRENCY (Single Core)</text>
            <text x="155" y="55" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="11">Time-Slicing &amp; Interleaved Execution</text>
            <rect x="25" y="80" width="60" height="30" rx="4" fill="#3b82f6"/>
            <text x="55" y="100" text-anchor="middle" fill="#fff" font-size="11">Task A</text>
            <rect x="90" y="80" width="60" height="30" rx="4" fill="#10b981"/>
            <text x="120" y="100" text-anchor="middle" fill="#fff" font-size="11">Task B</text>
            <rect x="155" y="80" width="60" height="30" rx="4" fill="#3b82f6"/>
            <text x="185" y="100" text-anchor="middle" fill="#fff" font-size="11">Task A</text>
            <rect x="220" y="80" width="60" height="30" rx="4" fill="#10b981"/>
            <text x="250" y="100" text-anchor="middle" fill="#fff" font-size="11">Task B</text>
            <text x="155" y="145" text-anchor="middle" fill="#cbd5e1" font-size="11">Structure for dealing with many things</text>
          </g>

          <g transform="translate(370, 20)">
            <rect x="0" y="0" width="310" height="170" rx="10" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
            <text x="155" y="30" text-anchor="middle" fill="#4ade80" font-family="system-ui" font-size="14" font-weight="700">PARALLELISM (Multi-Core)</text>
            <text x="155" y="55" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="11">True Simultaneous Execution</text>
            <rect x="30" y="75" width="250" height="25" rx="4" fill="#3b82f6"/>
            <text x="155" y="92" text-anchor="middle" fill="#fff" font-size="11">Core 0: Task A Running Continuously</text>
            <rect x="30" y="110" width="250" height="25" rx="4" fill="#10b981"/>
            <text x="155" y="127" text-anchor="middle" fill="#fff" font-size="11">Core 1: Task B Running Continuously</text>
            <text x="155" y="155" text-anchor="middle" fill="#cbd5e1" font-size="11">Simultaneous execution at same instant</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### Concurrency vs. Parallelism:
- **Concurrency:** Managing multiple tasks making progress over overlapping time periods. Can be achieved on a **Single CPU Core** via **Time-Slicing** (rapidly switching between tasks).
- **Parallelism:** Executing multiple computations simultaneously at the exact same physical millisecond. Requires **Multiple Physical CPU Cores**.

### Synchronous vs. Asynchronous & Blocking vs. Non-Blocking I/O:
- **Synchronous:** The caller waits for the invoked function to return a value before continuing.
- **Asynchronous:** The caller receives an immediate handle (Promise / Future / Callback) and continues executing other instructions while work finishes in the background.
- **Blocking I/O:** The operating system puts the thread into a **WAITING / BLOCKED** state and yields the CPU core until disk or network data arrives.
- **Non-Blocking I/O (e.g., Linux epoll):** The system call returns immediately with status \`EWOULDBLOCK\` if data is not ready. The thread never sleeps and can perform other tasks.

### Thread Pool Sizing Mathematics:
1. **CPU-Bound Tasks (Image processing, cryptography, ML inference):**
   $$N_{\\text{threads}} = N_{\\text{CPU}} + 1$$
   *(The +1 thread allows the CPU core to keep computing if a minor page fault occurs. Adding 500 threads on an 8-core CPU for CPU-bound tasks destroys throughput through context-switch thrashing).*
2. **I/O-Bound Tasks (Database queries, HTTP calls, disk reads):**
   $$N_{\\text{threads}} = N_{\\text{CPU}} \\times \\left(1 + \\frac{\\text{Wait Time}}{\\text{Compute Time}}\\right)$$
   *Example:* If computation takes 10ms and database wait time is 90ms ($W/C = 9$), on an 8-core CPU:
   $$N_{\\text{threads}} = 8 \\times (1 + 9) = 80 \\text{ threads}$$`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "How do you calculate the optimal thread pool size for a backend web service?",
            shortA: "For CPU-bound tasks, use N_CPU + 1 threads. For I/O-bound tasks, use N_CPU * (1 + Wait_Time / Compute_Time).",
            deepA: "CPU-bound tasks saturate CPU execution units; allocating more threads than physical cores introduces excessive context switching without improving speed. For I/O-bound services (like Spring Boot microservices calling PostgreSQL), threads spend the majority of their lifecycle blocked waiting on socket I/O. By calculating the ratio of I/O wait time to compute time, you size the pool so that when Thread 1 blocks waiting on a database query, Thread 2 immediately utilizes the vacant CPU core.",
            followUp: "How do Java 21 Virtual Threads (Project Loom) change this? Virtual threads are managed in user-space by the JVM. Because they consume negligible memory (~1KB) and unmount automatically on blocking I/O, you no longer need complex thread pool sizing formulas—you can simply spawn 100,000 virtual threads."
          }
        ]
      }
    },
    {
      id: "thread-synchronization",
      title: "3. Thread Synchronization, Race Conditions & Locks",
      level1: {
        intro: "When multiple threads modify the same variable in memory at the exact same time, their updates can collide and corrupt your application's data. Synchronization prevents these collisions.",
        analogy: "Imagine an office whiteboard showing the company bank balance ($1,000). Two accountants look at the board at the same second. Both want to add $500. Both read $1,000, do the math in their head ($1,500), and write $1,500 on the board. The true balance should be $2,000, but one accountant's update was completely erased because they didn't take turns at the board!",
        svgDiagram: `<svg viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="660" height="170" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
            <text x="330" y="45" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="14" font-weight="700">THE BROKEN count++ RACE CONDITION (Read-Modify-Write)</text>

            <rect x="30" y="70" width="180" height="100" rx="8" fill="#1e3a5f" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="120" y="95" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="700">Thread 1</text>
            <text x="120" y="120" text-anchor="middle" fill="#cbd5e1" font-size="11">1. READ count (0)</text>
            <text x="120" y="140" text-anchor="middle" fill="#cbd5e1" font-size="11">2. ADD 1 (reg = 1)</text>
            <text x="120" y="160" text-anchor="middle" fill="#ef4444" font-size="11">3. WRITE count = 1</text>

            <rect x="250" y="70" width="160" height="100" rx="8" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="330" y="95" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="700">Shared RAM</text>
            <text x="330" y="130" text-anchor="middle" fill="#f87171" font-size="18" font-weight="700">count = 1</text>
            <text x="330" y="155" text-anchor="middle" fill="#94a3b8" font-size="11">(Lost Update! Expected 2)</text>

            <rect x="450" y="70" width="180" height="100" rx="8" fill="#1e3a5f" stroke="#22c55e" stroke-width="1.5"/>
            <text x="540" y="95" text-anchor="middle" fill="#4ade80" font-size="12" font-weight="700">Thread 2</text>
            <text x="540" y="120" text-anchor="middle" fill="#cbd5e1" font-size="11">1. READ count (0)</text>
            <text x="540" y="140" text-anchor="middle" fill="#cbd5e1" font-size="11">2. ADD 1 (reg = 1)</text>
            <text x="540" y="160" text-anchor="middle" fill="#ef4444" font-size="11">3. WRITE count = 1</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### The Broken count++ Race Condition:
In Java, \`count++\` is not a single atomic machine instruction. Under the hood at the assembly level, it decomposes into **3 distinct operations (Read-Modify-Write)**:
1. \`LOAD count from memory into CPU register\`
2. \`ADD 1 to register value\`
3. \`STORE register value back into memory\`
If Thread 1 and Thread 2 execute concurrently, both read 0 before either stores the updated value. Both write 1, and one increment is permanently lost!

### Synchronization Tools:
1. **Intrinsic Monitor (\`synchronized\`):** Mutual exclusion lock. Entering acquires the lock; exiting automatically releases it even on uncaught exceptions.
2. **Lock-Free Atomic Classes (\`AtomicInteger\`):** Uses CPU hardware-level **Compare-And-Swap (CAS)** instructions (\`CMPXCHG\` on x86). Lock-free and avoids thread suspension overhead.
3. **Mutex vs. Binary Semaphore:**
   - **Mutex has Ownership:** Only the specific thread that acquired the lock is permitted to release it. Supports recursive locking (Reentrancy) and Priority Inheritance.
   - **Binary Semaphore has NO Ownership:** Thread A can acquire a permit, and Thread B can release it! Semaphores are fundamentally **Signaling Primitives** for inter-thread coordination.
4. **The \`volatile\` Keyword:**
   - Guarantees **Memory Visibility** (writes flush immediately to main RAM; reads bypass CPU caches).
   - Enforces **Happens-Before Relationship** (prevents compiler/CPU instruction reordering).
   - **Crucial Rule:** \`volatile\` **DOES NOT guarantee Atomicity!** \`count++\` is still thread-unsafe under \`volatile\`.`,
        codeExamples: [
          {
            title: "Race Condition Demonstration and Safe Fixes in Java",
            language: "java",
            code: `import java.util.concurrent.atomic.AtomicInteger;

// 1. Thread-Unsafe Implementation (RACE CONDITION)
class UnsafeCounter {
    private int count = 0;
    public void increment() { count++; } // Read-Modify-Write vulnerability!
    public int getCount() { return count; }
}

// 2. Fix via Intrinsic Lock (Synchronized)
class SynchronizedCounter {
    private int count = 0;
    public synchronized void increment() { count++; }
    public synchronized int getCount() { return count; }
}

// 3. Fix via Hardware Compare-And-Swap (Lock-Free & Blazing Fast)
class AtomicCounter {
    private final AtomicInteger count = new AtomicInteger(0);
    public void increment() {
        count.incrementAndGet(); // Atomic CPU-level CAS instruction
    }
    public int getCount() { return count.get(); }
}`
          }
        ]
      },
      level3: {
        interviewQA: [
          {
            q: "What is the difference between a Mutex and a Semaphore?",
            shortA: "A Mutex has an owner—only the thread that locked it can unlock it. A Semaphore has no ownership and acts as a signaling mechanism where any thread can release a permit.",
            deepA: "A Mutex provides exclusive mutual exclusion for a critical section. Because it tracks thread ownership, it supports reentrant locking and priority inheritance protocols. A Semaphore maintains an integer counter of permits. A worker thread can call semaphore.acquire() to wait for a job, and a producer thread can call semaphore.release() to signal that a job is ready, even though the producer never called acquire().",
            followUp: "Can a Mutex cause Priority Inversion? Yes. If a low-priority thread holds a Mutex needed by a high-priority thread, a medium-priority thread can starve both unless the OS implements Priority Inheritance."
          }
        ]
      }
    },
    {
      id: "deadlocks",
      title: "4. Deadlocks, Livelocks & Starvation",
      level1: {
        intro: "A Deadlock occurs when two or more threads are permanently frozen, each waiting for a lock held by the other, resulting in an indefinite standstill.",
        analogy: "Picture two polite people meeting on a narrow single-lane bridge driving from opposite directions. Neither driver agrees to reverse. Both sit in their cars with arms crossed waiting for the other to back up. Neither makes progress forever.",
        svgDiagram: `<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="660" height="170" rx="10" fill="#1e293b" stroke="#ef4444" stroke-width="2"/>
            <text x="330" y="45" text-anchor="middle" fill="#f87171" font-family="system-ui" font-size="14" font-weight="700">CIRCULAR WAIT DEADLOCK</text>

            <rect x="50" y="70" width="200" height="60" rx="8" fill="#1e3a5f" stroke="#38bdf8" stroke-width="2"/>
            <text x="150" y="95" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="700">Thread 1</text>
            <text x="150" y="115" text-anchor="middle" fill="#cbd5e1" font-size="11">Holds Lock A</text>

            <rect x="410" y="70" width="200" height="60" rx="8" fill="#1e3a5f" stroke="#a855f7" stroke-width="2"/>
            <text x="510" y="95" text-anchor="middle" fill="#c084fc" font-size="13" font-weight="700">Thread 2</text>
            <text x="510" y="115" text-anchor="middle" fill="#cbd5e1" font-size="11">Holds Lock B</text>

            <path d="M 250 85 L 410 85" stroke="#ef4444" stroke-width="2" stroke-dasharray="5,5"/>
            <text x="330" y="78" text-anchor="middle" fill="#f87171" font-size="11">Thread 1 requests Lock B (BLOCKED!)</text>

            <path d="M 410 115 L 250 115" stroke="#ef4444" stroke-width="2" stroke-dasharray="5,5"/>
            <text x="330" y="135" text-anchor="middle" fill="#f87171" font-size="11">Thread 2 requests Lock A (BLOCKED!)</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### Coffman's 4 Necessary Conditions:
All **4 conditions must hold simultaneously** for a deadlock to exist:
1. **Mutual Exclusion:** At least one resource is held in non-shareable mode.
2. **Hold and Wait:** A thread holds a resource while actively waiting for another resource held by someone else.
3. **No Preemption:** Resources cannot be forcibly revoked from a thread; they can only be released voluntarily.
4. **Circular Wait:** A circular chain of threads exists such that each thread waits for a resource held by the next ($T_1 \\rightarrow T_2 \\rightarrow \\dots \\rightarrow T_1$).

### Deadlock Strategies:
1. **Prevention (Deterministic Lock Ordering):** Eliminate the Circular Wait condition by enforcing a strict global lock acquisition hierarchy (Always acquire Lock A before Lock B).
2. **Avoidance (Banker's Algorithm):** OS dynamically simulates future resource requests and only allocates if the system remains in a **Safe State**.
3. **Detection & Recovery:** Build a **Resource Allocation Graph (RAG)**, detect cycles, and terminate a victim thread to break the deadlock.
4. **The Ostrich Algorithm:** Ignore rare deadlocks and reboot if frozen. Standard general-purpose OS kernels use this pragmatic trade-off.

### Deadlock vs. Livelock vs. Starvation:
- **Deadlock:** Threads are in **BLOCKED** state. CPU utilization is 0%. No progress.
- **Livelock:** Threads are in **RUNNING** state. CPU utilization can be 100%. State changes continuously, but zero meaningful work completes (e.g., two people stepping side-to-side repeatedly in a hallway).
- **Starvation:** A thread is ready to run but is perpetually denied CPU or resources because higher-priority threads dominate.`,
        codeExamples: [
          {
            title: "Deadlock Prevention via Deterministic Lock Ordering in Java",
            language: "java",
            code: `public class BankTransferService {
    // Deadlock-Safe Transfer Method
    public void transfer(Account from, Account to, double amount) {
        // Enforce Deterministic Lock Ordering based on unique ID:
        Account firstLock = from.getId() < to.getId() ? from : to;
        Account secondLock = from.getId() < to.getId() ? to : from;

        synchronized (firstLock) {
            synchronized (secondLock) {
                // Both threads will attempt to acquire the smaller ID lock first.
                // Circular wait condition is mathematically eliminated!
                if (from.getBalance() >= amount) {
                    from.withdraw(amount);
                    to.deposit(amount);
                }
            }
        }
    }
}`
          }
        ]
      },
      level3: {
        interviewQA: [
          {
            q: "How do you detect and resolve a Deadlock in production?",
            shortA: "Detect using JVM thread dumps (jcmd or jstack). Resolve by killing the deadlocked thread or breaking the circular wait via global deterministic lock ordering.",
            deepA: "In production, generate a thread dump using \`jstack <pid>\` or \`jcmd <pid> Thread.dump_to_file\`. The JVM analyzes the monitor wait graphs and prints: \`Found 1 deadlock\` along with the exact thread IDs and code line numbers. In code, prevent deadlocks using: 1) Deterministic lock ordering; 2) \`Lock.tryLock(timeout)\` so threads timeout and release acquired locks instead of blocking forever.",
            followUp: "What is Lock Striping? Used in ConcurrentHashMap: instead of a single lock on the whole table, the array is partitioned into multiple segments with separate locks, increasing concurrent write throughput."
          }
        ]
      }
    },
    {
      id: "memory-management",
      title: "5. Memory Management, Virtual Memory & JVM GC",
      level1: {
        intro: "Computers have physical RAM chips where active data resides. Operating systems provide Virtual Memory so every program thinks it has a huge, private memory space, while the JVM manages object lifecycles automatically.",
        analogy: "Stack memory is like your desk workspace where you keep immediate pens and papers while working—clean and fast. Heap memory is like the large office storage warehouse where all company furniture is kept. When the warehouse gets cluttered, the cleaning crew (Garbage Collector) sweeps away discarded furniture.",
        svgDiagram: `<svg viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="310" height="170" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="155" y="45" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="14" font-weight="700">STACK MEMORY</text>
            <text x="155" y="70" text-anchor="middle" fill="#cbd5e1" font-size="11">Thread-Private (Isolated per thread)</text>
            <text x="155" y="95" text-anchor="middle" fill="#cbd5e1" font-size="11">Stores local primitive variables &amp; references</text>
            <text x="155" y="120" text-anchor="middle" fill="#cbd5e1" font-size="11">Fast LIFO allocation (Stack Pointer CPU register)</text>
            <text x="155" y="145" text-anchor="middle" fill="#cbd5e1" font-size="11">Freed automatically upon method exit</text>
            <text x="155" y="170" text-anchor="middle" fill="#ef4444" font-size="11">Error: StackOverflowError</text>
          </g>

          <g transform="translate(370, 20)">
            <rect x="0" y="20" width="310" height="170" rx="10" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
            <text x="155" y="45" text-anchor="middle" fill="#4ade80" font-family="system-ui" font-size="14" font-weight="700">HEAP MEMORY</text>
            <text x="155" y="70" text-anchor="middle" fill="#cbd5e1" font-size="11">Shared across all threads in the process</text>
            <text x="155" y="95" text-anchor="middle" fill="#cbd5e1" font-size="11">Stores all dynamically allocated objects ('new')</text>
            <text x="155" y="120" text-anchor="middle" fill="#cbd5e1" font-size="11">Complex memory allocation; managed by GC</text>
            <text x="155" y="145" text-anchor="middle" fill="#cbd5e1" font-size="11">Reclaimed asynchronously by Garbage Collector</text>
            <text x="155" y="170" text-anchor="middle" fill="#ef4444" font-size="11">Error: OutOfMemoryError (OOM)</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### Virtual Memory, Paging & Thrashing:
1. **Virtual Memory:** Gives each process the abstraction of a vast, contiguous address space while physical RAM frames are shared.
2. **Paging:** Memory is partitioned into fixed-size blocks called **Pages** (typically 4KB). The hardware **Memory Management Unit (MMU)** uses a Page Table to translate virtual addresses to physical RAM frames.
3. **Page Fault:** Triggered when the CPU accesses a virtual page that is not currently resident in physical RAM. The OS kernel traps the CPU, fetches the missing page from disk swap space into RAM, updates the page table, and resumes execution.
4. **Thrashing:** When active processes require more RAM than physically exists (**Working Set > Physical RAM**), the OS spends nearly 100% of its CPU time constantly swapping pages to and from disk. CPU useful throughput drops to zero!

### JVM Generational Garbage Collection:
- **Weak Generational Hypothesis:** Most allocated objects die shortly after creation.
- **Young Generation:** Composed of **Eden** and Survivor spaces (**S0**, **S1**). Minor GC collects dead short-lived objects rapidly.
- **Old Generation (Tenured):** Holds long-lived objects promoted from survivor spaces. Collected during Major/Full GC, causing **Stop-the-World (STW)** pauses.
- **How Memory Leaks Occur in Java:** If an unused object remains strongly referenced by an active **GC Root** (Thread stack, static collections, unclosed streams, \`ThreadLocal\` in thread pools), the Garbage Collector cannot reclaim it.`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "Can a Memory Leak happen in a garbage-collected language like Java?",
            shortA: "Yes. An object is considered leaked if the application no longer needs it, but it remains strongly referenced by a GC Root, preventing the GC from collecting it.",
            deepA: "Common Java memory leak causes: 1) Unbounded static collections (e.g., static Map acting as a cache without eviction); 2) Unclosed database connections or file streams; 3) Lingering ThreadLocal variables in reusable thread pools; 4) Non-static inner classes holding an implicit reference to an outer enclosing class instance.",
            followUp: "How do you detect memory leaks in Java? Generate a heap dump with jcmd <pid> GC.heap_dump and analyze unreachable object retention trees with Eclipse Memory Analyzer (MAT)."
          }
        ]
      }
    },
    {
      id: "cpu-scheduling-kernel",
      title: "6. CPU Scheduling & Kernel Basics",
      level1: {
        intro: "The CPU is the central brain of the computer. The OS kernel decides which tasks get to use the CPU and protects the computer hardware from faulty user code.",
        analogy: "User Mode and Kernel Mode are like a bank teller versus the bank vault manager. The customer (User Mode) can only talk through the glass window and request a withdrawal. Only the authorized bank manager (Kernel Mode) has the physical key to enter the vault and touch the gold bullion.",
        svgDiagram: `<svg viewBox="0 0 700 210" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="10" width="660" height="55" rx="8" fill="#1e3a5f" stroke="#38bdf8" stroke-width="2"/>
            <text x="330" y="35" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="13" font-weight="700">USER MODE (Ring 3) - Restricted Privileges</text>
            <text x="330" y="52" text-anchor="middle" fill="#94a3b8" font-size="11">Standard applications run here. Direct hardware &amp; physical RAM access is blocked.</text>

            <path d="M 330 65 L 330 115" stroke="#facc15" stroke-width="3" stroke-dasharray="4,4"/>
            <text x="330" y="93" text-anchor="middle" fill="#facc15" font-size="11" font-weight="700">SYSTEM CALL (Trap / Software Interrupt)</text>

            <rect x="0" y="115" width="660" height="55" rx="8" fill="#064e3b" stroke="#22c55e" stroke-width="2"/>
            <text x="330" y="140" text-anchor="middle" fill="#4ade80" font-family="system-ui" font-size="13" font-weight="700">KERNEL MODE (Ring 0) - Unrestricted Hardware Access</text>
            <text x="330" y="157" text-anchor="middle" fill="#cbd5e1" font-size="11">OS Kernel executes device drivers, memory mappings, and physical hardware I/O.</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### Dual-Mode Operation:
1. **User Mode (Ring 3):** Normal applications execute here. Direct access to hardware registers, disk I/O, and physical RAM is forbidden.
2. **Kernel Mode (Ring 0):** The OS kernel runs with full hardware privileges.
3. **System Call:** When an application requires disk read (\`read()\`), network transfer (\`send()\`), or process creation (\`fork()\`), it triggers a software interrupt (**Trap**). The CPU hardware switches the mode bit from User (1) to Kernel (0), runs the kernel handler, and switches back.

### CPU Scheduling Algorithms:
- **First-Come, First-Served (FCFS):** Non-preemptive. Prone to the **Convoy Effect** (short tasks stuck waiting behind a massive CPU-bound task).
- **Shortest Job First (SJF):** Schedules the job with smallest CPU burst first. Optimal average waiting time, but future burst time is impossible to predict accurately.
- **Round Robin (RR):** Preemptive. Allocates a fixed **Time Quantum ($q$)** cyclically to ready tasks.
  - If $q$ is too large $\\implies$ degrades to FCFS.
  - If $q$ is too small $\\implies$ excessive context switching overhead destroys throughput.
- **Priority Inversion Problem:** A low-priority thread holds a lock needed by a high-priority thread, but an intermediate medium-priority thread preempts the low-priority thread—blocking the high-priority thread!  
  *Solution:* **Priority Inheritance Protocol** (temporarily boosts the low-priority thread's priority to match the high-priority thread until the lock is released).`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "What is Priority Inversion and how do operating systems prevent it?",
            shortA: "Priority Inversion occurs when a medium-priority task delays a high-priority task by preempting a low-priority task holding a shared lock. OS kernels fix it using Priority Inheritance.",
            deepA: "Consider 3 threads: Low (L), Medium (M), and High (H). L acquires a shared lock. H wakes up, needs that lock, and blocks. Now M wakes up. Because M's priority is higher than L and M does not need the lock, M preempts L and runs on the CPU. Consequently, H is indirectly blocked waiting for M, inverting priority! The Mars Pathfinder rover nearly failed due to this exact bug. The fix is Priority Inheritance: while H waits on L's lock, the OS kernel temporarily raises L's priority to match H, ensuring L finishes quickly and releases the lock.",
            followUp: "What is the Convoy Effect in FCFS scheduling? A CPU-bound process holds the CPU for a long burst, causing all subsequent quick I/O-bound processes to back up in the ready queue."
          }
        ]
      }
    },
    {
      id: "deep-dive-interview-qa",
      title: "7. Deep-Dive & Tricky OS / Concurrency Interview Questions",
      level1: {
        intro: "These 7 interview questions test practical systems-level intuition on OS kernels, hardware caches, and concurrency edge cases.",
        analogy: "Like an automotive race engineer understanding gear ratios and tire temperature under high torque, senior engineers understand how CPU caches and OS threads behave under heavy production loads."
      },
      level2: {
        technicalExplanation: "Review each deep-dive question below. These represent actual technical interview scenarios from top tech companies."
      },
      level3: {
        interviewQA: [
          {
            q: "How does single-threaded Node.js handle tens of thousands of concurrent requests without blocking?",
            shortA: "Node.js runs single-threaded JavaScript, but offloads all I/O operations to the OS kernel via non-blocking I/O event demultiplexing (epoll/kqueue) and the libuv event loop.",
            deepA: "Node.js uses a single execution thread for application code, but it is backed by the libuv library and the operating system kernel. When an incoming network connection or file read starts, Node.js registers the socket descriptor with the OS kernel's event demultiplexer (epoll on Linux, kqueue on macOS) and returns immediately to the Event Loop. When the OS kernel finishes reading data, it fires a completion event, placing the JavaScript callback in the Event Loop queue to be processed non-blockingly."
          },
          {
            q: "Can a Deadlock occur in a single-threaded program?",
            shortA: "Yes, if a single thread attempts to acquire a non-reentrant lock it already holds, or if it synchronously awaits a task in a single-threaded executor.",
            deepA: "Two classic examples: 1) Non-Reentrant Mutex: A thread locks a non-reentrant lock, then calls an internal helper method that tries to acquire that same lock. The thread blocks waiting for itself forever. 2) Single-Thread Executor: A thread submits a Callable to a single-threaded ExecutorService and immediately calls future.get(). Because the only worker thread in the pool is currently blocked on future.get(), it can never execute the submitted Callable."
          },
          {
            q: "What is False Sharing in multi-threaded CPU architectures?",
            shortA: "False Sharing occurs when two threads on different CPU cores modify distinct variables that happen to share the same 64-byte hardware cache line, causing constant cache invalidations.",
            deepA: "CPUs cache RAM in 64-byte blocks called Cache Lines. If Thread 1 updates variable A and Thread 2 updates variable B, and both A and B reside within the same 64-byte chunk of memory, Core 1's write forces Core 2's L1 cache to invalidate its cache line under the MESI cache coherence protocol. Even though there is no logical code conflict, throughput collapses. Fix: Pad variables or use Java's @Contended annotation to ensure variables sit on distinct cache lines."
          },
          {
            q: "What is the difference between Thread.sleep(), Thread.yield(), and Object.wait()?",
            shortA: "sleep() pauses execution while retaining locks. yield() hints to give up CPU while retaining locks. wait() releases the object monitor lock and waits for notify().",
            deepA: "Thread.sleep(ms) pauses execution for a specified duration without releasing acquired intrinsic locks. Thread.yield() advises the OS CPU scheduler that the current thread is willing to yield its remaining time quantum, but retains all locks. Object.wait() can only be called from inside a synchronized block: it immediately releases the object monitor lock and enters the wait set until another thread invokes notify() or notifyAll()."
          },
          {
            q: "What is a Zombie Process vs. an Orphan Process?",
            shortA: "A Zombie process has terminated but its exit status has not yet been read by its parent via wait(). An Orphan process is still running after its parent process terminated.",
            deepA: "When a process finishes execution via exit(), the OS deallocates its memory and files, but retains an entry in the Process Table containing its exit code. If the parent fails to call wait() or waitpid(), the process becomes a Zombie. If a parent terminates before its child finishes, the child becomes an Orphan. In Linux, orphan processes are automatically adopted by PID 1 (init / systemd), which regularly calls wait() to clean them up."
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
        technicalExplanation: `### Master OS & Concurrency Cheat Sheet:

- **Process vs. Thread:**
  - **Process:** Isolated address space, heavy context switch (flushes TLB, swaps page tables).
  - **Thread:** Shared Heap & Code, private Stack & PC, fast context switch (no TLB flush).
- **Concurrency vs. Parallelism:**
  - **Concurrency:** Interleaving tasks on 1+ cores (dealing with many things).
  - **Parallelism:** Simultaneous execution on multi-core hardware (doing many things).
- **Thread Pool Sizing:**
  - **CPU-Bound:** $N_{\\text{CPU}} + 1$.
  - **I/O-Bound:** $N_{\\text{CPU}} \\times (1 + \\text{Wait}/\\text{Compute})$.
- **Coffman's 4 Deadlock Conditions:**
  1. Mutual Exclusion
  2. Hold and Wait
  3. No Preemption
  4. Circular Wait *(Break via Deterministic Lock Ordering!)*
- **Mutex vs. Semaphore:**
  - **Mutex:** Ownership (only locker can unlock).
  - **Semaphore:** No ownership; signaling primitive across threads.
- **\`volatile\`:** Guarantees Visibility & Prevents Reordering. DOES NOT guarantee Atomicity (\`count++\` is unsafe).
- **Stack vs. Heap:**
  - **Stack:** Thread-private, LIFO, local primitives/references, \`StackOverflowError\`.
  - **Heap:** Shared across threads, GC managed, objects, \`OutOfMemoryError\`.
- **Page Fault vs. Thrashing:**
  - **Page Fault:** Virtual page not in RAM; kernel fetches from disk swap space.
  - **Thrashing:** Working set exceeds physical RAM; system spends 100% time swapping; CPU throughput drops to zero.
- **Dual Mode Operation:** User Mode (Ring 3 - restricted) vs. Kernel Mode (Ring 0 - unrestricted hardware access). Switched via System Call Traps.`
      },
      level3: {
        interviewQA: []
      }
    }
  ],
  "flashcards": [
    {
      "term": "Context Switching Cost",
      "category": "CPU & Memory",
      "question": "Why is a process context switch much more expensive than a thread context switch?",
      "answer": "A process switch must flush the CPU's Translation Lookaside Buffer (TLB) and reload the virtual memory page table. A thread switch stays in the same address space, leaving the TLB intact.",
      "tip": "Process switch = TLB flush. Thread switch = TLB kept."
    },
    {
      "term": "Volatile vs. Synchronized",
      "category": "Concurrency",
      "question": "Does Java's 'volatile' keyword make count++ thread-safe?",
      "answer": "No! Volatile only guarantees visibility (reading/writing to main memory) and prevents reordering. count++ is 3 separate instructions (read, increment, write). You need AtomicInteger or synchronized for atomicity.",
      "tip": "Volatile = Visibility only; NOT atomicity."
    },
    {
      "term": "Deadlock & Coffman Conditions",
      "category": "Synchronization",
      "question": "What is the single best way to prevent deadlocks in production code?",
      "answer": "Enforce Deterministic Lock Ordering. Always acquire locks in a globally defined, consistent sequence (e.g. sorted by account ID) to break Coffman's Circular Wait condition.",
      "tip": "Lock in global alphabetical/ID order."
    },
    {
      "term": "Thrashing",
      "category": "Virtual Memory",
      "question": "What is OS Thrashing and what causes it?",
      "answer": "Thrashing occurs when active working memory exceeds physical RAM. The OS spends virtually 100% of its CPU time swapping pages in and out of disk rather than executing application code.",
      "tip": "Page fault loop causes CPU utilization collapse."
    }
  ]
};
