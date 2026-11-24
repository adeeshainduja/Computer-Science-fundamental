// Topic 4: Operating Systems & Concurrency
var topicOS = window.topicOS = {
  id: "os",
  title: "Operating Systems & Concurrency",
  shortTitle: "OS & Concurrency",
  icon: "⚙️",
  badge: "Low-Level Systems",
  readingTime: "19 min read",
  description: "Explore the core software running your computer: processes, threads, context switching, synchronization, deadlocks, and virtual memory.",
  learningObjectives: [
    "Understand the exact difference between Processes and Threads under the hood",
    "Discover how CPUs multitask using Context Switching and Scheduling",
    "Master Concurrency issues: Race Conditions, Mutexes, and Semaphores",
    "Learn the 4 conditions required for Deadlock and how to break them",
    "Understand Virtual Memory, Paging, Page Faults, and Thrashing"
  ],
  lessons: [
    {
      id: "os-processes-threads",
      title: "1. Processes vs. Threads (Under the Hood)",
      subtitle: "Memory layout, PCB & context switching overhead",
      whatIsIt: "A **Process** is an independent running program allocated its own isolated memory address space by the Operating System (e.g. running Google Chrome). A **Thread** is a lightweight unit of execution *inside* a process. Multiple threads inside the same process **share the same memory heap and code**, but each maintains its own private execution stack.",
      whyNeedIt: "If your browser ran on a single thread, clicking a button to download a large video would freeze your entire browser tab—you wouldn't even be able to type or scroll. Multithreading allows a program to download in the background while keeping the user interface completely responsive.",
      howItWorks: [
        "**Process Memory Layout:** Divided into 4 distinct regions:\n  - **Text Segment:** Compiled machine code instructions.\n  - **Data Segment:** Global and static variables.\n  - **Heap:** Dynamically allocated memory created at runtime (`new Object()`).\n  - **Stack:** Local variables and function call frames (grows downward).",
        "**Process Isolation:** Process A cannot touch Process B's memory. If Chrome crashes, it won't crash Spotify.",
        "**Thread Shared Memory:** All threads in Chrome share the same Heap. If Thread 1 updates a variable in the Heap, Thread 2 can see it instantly.",
        "**Context Switching:** When the CPU switches from running Process A to Process B, it must save all CPU registers, flush memory caches, and reload Process B's memory table. This causes measurable CPU overhead."
      ],
      realWorldExample: "**A Restaurant Kitchen:**\n- **The Process** is the entire restaurant building, with its private kitchen, pantry, and refrigerator (Isolated Memory).\n- **Threads** are the individual chefs working inside the kitchen. They share the same counter, pots, and ingredients (Shared Heap), but each chef has their own personal notepad tracking their current recipe step (Private Stack).",
      diagram: `
        <svg viewBox="0 0 740 240" class="responsive-svg" aria-label="Process vs Thread Memory Diagram">
          <g transform="translate(40, 20)">
            <rect width="300" height="200" rx="12" fill="var(--card-bg)" stroke="#3b82f6" stroke-width="2"/>
            <text x="150" y="28" font-size="14" font-weight="bold" text-anchor="middle" fill="#3b82f6">Process Memory (Isolated)</text>
            <rect x="20" y="45" width="260" height="30" rx="4" fill="#3b82f6" fill-opacity="0.15"/>
            <text x="150" y="65" font-size="11" text-anchor="middle">Code / Text Segment</text>
            <rect x="20" y="80" width="260" height="30" rx="4" fill="#3b82f6" fill-opacity="0.15"/>
            <text x="150" y="100" font-size="11" text-anchor="middle">Data Segment (Globals)</text>
            <rect x="20" y="115" width="260" height="70" rx="6" fill="#10b981" fill-opacity="0.2" stroke="#10b981"/>
            <text x="150" y="145" font-size="13" font-weight="bold" text-anchor="middle" fill="#10b981">Shared Heap Memory</text>
            <text x="150" y="168" font-size="10" text-anchor="middle" fill="var(--text-secondary)">Accessible by all threads in process</text>
          </g>

          <g transform="translate(400, 20)">
            <rect width="300" height="200" rx="12" fill="var(--card-bg)" stroke="#8b5cf6" stroke-width="2"/>
            <text x="150" y="28" font-size="14" font-weight="bold" text-anchor="middle" fill="#8b5cf6">Threads Inside Process</text>
            <rect x="20" y="50" width="120" height="120" rx="8" fill="var(--bg-subtle)" stroke="#8b5cf6"/>
            <text x="80" y="75" font-size="12" font-weight="bold" text-anchor="middle">Thread 1 🧵</text>
            <rect x="30" y="90" width="100" height="60" rx="4" fill="#8b5cf6" fill-opacity="0.2"/>
            <text x="80" y="115" font-size="10" text-anchor="middle">Private Stack</text>
            <text x="80" y="135" font-size="9" text-anchor="middle">Registers / PC</text>

            <rect x="160" y="50" width="120" height="120" rx="8" fill="var(--bg-subtle)" stroke="#8b5cf6"/>
            <text x="220" y="75" font-size="12" font-weight="bold" text-anchor="middle">Thread 2 🧵</text>
            <rect x="170" y="90" width="100" height="60" rx="4" fill="#8b5cf6" fill-opacity="0.2"/>
            <text x="220" y="115" font-size="10" text-anchor="middle">Private Stack</text>
            <text x="220" y="135" font-size="9" text-anchor="middle">Registers / PC</text>
          </g>
        </svg>
      `,
      diagramCaption: "A Process has isolated memory containing code, globals, and heap. Multiple threads live inside that process, sharing the heap while keeping their own private call stacks.",
      keyPoints: [
        "**Process:** Heavyweight, isolated memory, communication via IPC (Inter-Process Communication).",
        "**Thread:** Lightweight, shares memory heap with peer threads, fast communication.",
        "Creating a thread is **10x-100x cheaper** than creating a new operating system process.",
        "**Context Switching:** Saving state of an old thread/process and loading state of a new one."
      ],
      deepDive: {
        title: "Deep Dive: Why do Threads have private Stacks?",
        content: "If two threads shared the same call stack, function calls would get completely scrambled! Thread 1 calling `calculateTax()` would push return addresses over Thread 2's `saveUser()` stack frame. Every thread must maintain its own private Stack and Program Counter (PC) so it knows exactly which line of code it is executing independently."
      },
      quiz: [
        {
          question: "What do multiple threads within the same process share?",
          options: [
            "Their private CPU registers",
            "Their individual call stacks",
            "The memory Heap and Code segment",
            "Nothing at all (complete isolation)"
          ],
          correct: 2,
          explanation: "Threads inside the same process share the process's Heap memory and Code, while maintaining their own private Stack and registers."
        }
      ]
    },
    {
      id: "os-concurrency-synchronization",
      title: "2. Concurrency, Race Conditions & Locks",
      subtitle: "Critical sections, Mutex vs. Semaphore & Java tools",
      whatIsIt: "**Concurrency** is the ability of different parts of a program to execute out-of-order or in partial order without affecting the final outcome. A **Race Condition** happens when multiple threads access and modify shared data simultaneously, causing unpredictable bugs depending on which thread finishes first.",
      whyNeedIt: "If two people withdraw $100 from an ATM at the exact same millisecond using the same bank account with a $100 balance, both threads might check `balance >= 100` before either one deducts it. The bank dispenses $200! Synchronization locks prevent concurrent writes from destroying data.",
      howItWorks: [
        "**Critical Section:** The piece of code where shared data is accessed and modified (e.g. `balance = balance - amount`).",
        "**Mutex (Mutual Exclusion):** A locking mechanism where only **one thread** can hold the key at a time. Other threads must wait until the lock is released.",
        "**Semaphore (Signaling Token Counter):** Maintains a counter of permits. Allows a specified number $N$ of threads to access a resource concurrently (e.g. limiting database connections to 10).",
        "**Java `volatile`:** Guarantees that writes to a variable are flushed directly to main RAM immediately, preventing threads from reading stale CPU cache values.",
        "**Java Atomic Classes (`AtomicInteger`):** Uses hardware-level **CAS (Compare-And-Swap)** instructions for lock-free, ultra-fast thread safety."
      ],
      realWorldExample: "**Bathroom Lock vs. Bouncer:**\n- **Mutex:** A single-occupancy airplane restroom. When someone enters, they lock the door. Everyone else must wait outside until the occupant unlocks and exits.\n- **Counting Semaphore:** A nightclub with a strict capacity limit of 50 guests. The bouncer counts people entering and leaving, letting new guests in only when someone leaves.",
      diagram: `
        <svg viewBox="0 0 740 230" class="responsive-svg" aria-label="Mutex vs Semaphore Diagram">
          <g transform="translate(40, 20)">
            <rect width="300" height="180" rx="12" fill="var(--card-bg)" stroke="#ef4444" stroke-width="2"/>
            <text x="150" y="30" font-size="14" font-weight="bold" text-anchor="middle" fill="#ef4444">Mutex (1 Thread Only)</text>
            <circle cx="150" cy="70" r="22" fill="#ef4444" fill-opacity="0.15"/>
            <text x="150" y="77" font-size="20" text-anchor="middle">🔒</text>
            <rect x="40" y="110" width="220" height="35" rx="6" fill="var(--bg-subtle)"/>
            <text x="150" y="132" font-size="11" text-anchor="middle" fill="var(--text-primary)">Thread 1 holds lock</text>
            <text x="150" y="170" font-size="10" text-anchor="middle" fill="var(--text-secondary)">Thread 2 & 3 blocked outside</text>
          </g>

          <g transform="translate(400, 20)">
            <rect width="300" height="180" rx="12" fill="var(--card-bg)" stroke="#10b981" stroke-width="2"/>
            <text x="150" y="30" font-size="14" font-weight="bold" text-anchor="middle" fill="#10b981">Counting Semaphore (N Slots)</text>
            <circle cx="150" cy="70" r="22" fill="#10b981" fill-opacity="0.15"/>
            <text x="150" y="77" font-size="16" font-weight="bold" text-anchor="middle" fill="#10b981">Slots: 3</text>
            <rect x="40" y="110" width="220" height="35" rx="6" fill="var(--bg-subtle)"/>
            <text x="150" y="132" font-size="11" text-anchor="middle" fill="var(--text-primary)">3 concurrent threads active</text>
            <text x="150" y="170" font-size="10" text-anchor="middle" fill="var(--text-secondary)">Thread 4 waits for a slot to free</text>
          </g>
        </svg>
      `,
      diagramCaption: "A Mutex allows only one thread inside the critical section. A Semaphore allows up to N threads simultaneously.",
      keyPoints: [
        "A **Race Condition** occurs when multiple threads read/write shared state concurrently with no synchronization.",
        "A **Mutex** is ownership-based: only the thread that locked it can unlock it.",
        "A **Semaphore** is signaling-based: any thread can release or signal a permit.",
        "In Java, `synchronized` creates a monitor lock; `volatile` prevents CPU cache visibility bugs."
      ],
      deepDive: {
        title: "Deep Dive: Compare-And-Swap (CAS) Lock-Free Operations",
        content: "Acquiring an OS mutex requires a context switch into kernel mode, which costs hundreds of CPU clock cycles. High-performance classes like `AtomicInteger` avoid this using CPU hardware instruction `CMPXCHG` (Compare-And-Swap). It says: *'If memory address X still equals 5, change it to 6. If another thread changed it to 7, retry in a tight loop.'* This achieves thread safety with zero locking overhead!"
      },
      quiz: [
        {
          question: "What is the primary difference between a Mutex and a Counting Semaphore?",
          options: [
            "A Mutex is faster than a Semaphore",
            "A Mutex allows only 1 thread to access a resource, while a Semaphore allows up to N threads",
            "Semaphores only work on Linux systems",
            "Mutexes do not work with multi-core CPUs"
          ],
          correct: 1,
          explanation: "A Mutex allows strictly 1 thread (mutual exclusion). A Counting Semaphore maintains a counter of permits allowing N threads concurrently."
        }
      ]
    },
    {
      id: "os-deadlocks-memory",
      title: "3. Deadlocks & Virtual Memory",
      subtitle: "The 4 deadlock conditions, paging & thrashing",
      whatIsIt: "A **Deadlock** is a frozen state where two or more threads are permanently blocked, each waiting for a lock held by the other. **Virtual Memory** is an operating system illusion that gives each process the impression that it has access to a huge, private contiguous memory space, even if physical RAM is tiny.",
      whyNeedIt: "Deadlocks freeze production backend servers completely, requiring a restart. Virtual memory prevents programs from crashing when physical RAM fills up, swapping inactive data to disk storage.",
      howItWorks: [
        "**The 4 Coffman Conditions for Deadlock:**\n  1. **Mutual Exclusion:** Resources cannot be shared.\n  2. **Hold and Wait:** A thread holding Resource A waits for Resource B.\n  3. **No Preemption:** Resources cannot be forcibly taken away.\n  4. **Circular Wait:** Thread 1 waits for Thread 2, which waits for Thread 1.",
        "**Breaking Deadlocks:** Always acquire locks in a **strict global order** (Lock A then Lock B across all code).",
        "**Paging:** Virtual memory is split into fixed chunks called **Pages** (typically 4 KB). Physical RAM is divided into matching **Frames**.",
        "**Page Fault:** Occurs when a program tries to access a page not currently loaded in physical RAM. The OS pauses the thread, loads the page from disk, and resumes.",
        "**Thrashing:** When physical RAM is too full, the OS spends 99% of its time swapping pages between RAM and disk instead of executing real code."
      ],
      realWorldExample: "**Traffic Gridlock at an Intersection:**\nFour cars enter a four-way intersection simultaneously. Car A waits for Car B to move, Car B waits for Car C, Car C waits for Car D, and Car D waits for Car A. Nobody can move forward, and nobody can reverse. That is a **Deadlock**!",
      diagram: `
        <svg viewBox="0 0 740 220" class="responsive-svg" aria-label="Circular Wait Deadlock Diagram">
          <g transform="translate(100, 20)">
            <!-- Thread 1 -->
            <rect x="40" y="40" width="120" height="40" rx="8" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" stroke-width="2"/>
            <text x="100" y="65" font-size="12" font-weight="bold" text-anchor="middle" fill="var(--text-primary)">Thread 1 🧵</text>

            <!-- Resource A -->
            <rect x="240" y="40" width="120" height="40" rx="8" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="2"/>
            <text x="300" y="65" font-size="12" font-weight="bold" text-anchor="middle" fill="var(--text-primary)">Resource A 🔒</text>

            <!-- Resource B -->
            <rect x="40" y="130" width="120" height="40" rx="8" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="2"/>
            <text x="100" y="155" font-size="12" font-weight="bold" text-anchor="middle" fill="var(--text-primary)">Resource B 🔒</text>

            <!-- Thread 2 -->
            <rect x="240" y="130" width="120" height="40" rx="8" fill="#8b5cf6" fill-opacity="0.2" stroke="#8b5cf6" stroke-width="2"/>
            <text x="300" y="155" font-size="12" font-weight="bold" text-anchor="middle" fill="var(--text-primary)">Thread 2 🧵</text>

            <!-- Arrows forming circular deadlock -->
            <line x1="160" y1="55" x2="240" y2="55" stroke="#10b981" stroke-width="2"/>
            <text x="200" y="48" font-size="10" text-anchor="middle" fill="#10b981">Holds</text>

            <line x1="300" y1="130" x2="300" y2="80" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4"/>
            <text x="330" y="110" font-size="10" fill="#ef4444">Waits for</text>

            <line x1="240" y1="150" x2="160" y2="150" stroke="#10b981" stroke-width="2"/>
            <text x="200" y="168" font-size="10" text-anchor="middle" fill="#10b981">Holds</text>

            <line x1="100" y1="80" x2="100" y2="130" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4"/>
            <text x="70" y="110" font-size="10" fill="#ef4444">Waits for</text>
          </g>
          <text x="370" y="205" font-size="12" font-weight="bold" text-anchor="middle" fill="#ef4444">Circular Wait Condition = Permanent Freeze!</text>
        </svg>
      `,
      diagramCaption: "Circular Wait causes deadlocks: Thread 1 holds Resource A and waits for B, while Thread 2 holds Resource B and waits for A.",
      keyPoints: [
        "A **Deadlock** requires all 4 Coffman conditions to be true simultaneously.",
        "Prevent deadlocks by breaking **Circular Wait** (always acquire multiple locks in identical order).",
        "**Virtual Memory** isolates processes and allows systems to run programs larger than physical RAM.",
        "A **Page Fault** is a normal hardware interrupt that loads missing pages from disk into RAM.",
        "**Thrashing** happens when RAM is so starved that the OS spends all its time swapping pages."
      ],
      deepDive: {
        title: "Deep Dive: The Translation Lookaside Buffer (TLB)",
        content: "Translating a Virtual Memory Address into a Physical RAM Address requires looking up a multi-level Page Table in RAM, which would double memory access times! To keep systems fast, the CPU includes an ultra-fast hardware cache called the **TLB (Translation Lookaside Buffer)** that caches the most recent virtual-to-physical address translations with sub-nanosecond lookups."
      },
      quiz: [
        {
          question: "Which of the following is the most practical way software engineers prevent deadlocks in multi-threaded programs?",
          options: [
            "Never use more than one thread",
            "Always acquire multiple locks in a strict, uniform global order",
            "Increase physical computer RAM",
            "Turn off virtual memory paging"
          ],
          correct: 1,
          explanation: "Enforcing a strict global lock acquisition order (e.g. always acquire Lock A before Lock B) breaks the Circular Wait condition and prevents deadlocks."
        }
      ]
    }
  ],
  flashcards: [
    {
      term: "Process vs. Thread",
      category: "Operating Systems",
      question: "What is the key difference between a Process and a Thread?",
      answer: "A Process has its own isolated memory address space. Threads live inside a process and share its Heap memory while keeping private Stacks.",
      tip: "Process = The house. Threads = The people living inside sharing the kitchen."
    },
    {
      term: "Race Condition",
      category: "Concurrency",
      question: "What is a Race Condition?",
      answer: "A bug occurring when multiple concurrent threads read and write shared data without synchronization, causing unpredictable results.",
      tip: "Two people trying to claim the last seat on a flight at the exact same millisecond."
    },
    {
      term: "Deadlock",
      category: "Concurrency",
      question: "What is a Deadlock and the 4 Coffman conditions?",
      answer: "A freeze where threads wait on each other in a circle. Requires: Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait.",
      tip: "Traffic gridlock at a 4-way stop."
    },
    {
      term: "Virtual Memory",
      category: "Memory Management",
      question: "What is Virtual Memory and Paging?",
      answer: "An OS technique dividing memory into fixed pages, allowing programs to run in isolated virtual address spaces larger than physical RAM.",
      tip: "Apps think they own all 64GB of RAM, while OS maps pages behind the scenes."
    }
  ]
};
