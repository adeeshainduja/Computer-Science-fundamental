// Topic 2: Data Structures & Algorithms (DSA)
var topicDSA = window.topicDSA = {
  id: "dsa",
  title: "Data Structures & Algorithms",
  shortTitle: "DSA",
  icon: "⚡",
  badge: "Problem Solving",
  readingTime: "22 min read",
  description: "Master the building blocks of computing: Big-O complexity, arrays, linked lists, hash tables, trees, graphs, sorting, and core problem-solving patterns.",
  learningObjectives: [
    "Understand Big-O Time and Space Complexity with simple intuitive math",
    "Compare linear structures: Arrays, Dynamic Arrays, Linked Lists, Stacks, and Queues",
    "Discover how Hash Tables achieve O(1) lightning-fast lookups and handle collisions",
    "Explore Trees, Heaps, and Graphs with visual traversals",
    "Master essential patterns: Binary Search, Two Pointers, and Sliding Window"
  ],
  lessons: [
    {
      id: "dsa-big-o",
      title: "1. Big-O Complexity Analysis",
      subtitle: "Measuring speed and memory as data grows to infinity",
      whatIsIt: "**Big-O notation** is a mathematical language programmers use to describe how the running time or memory usage of an algorithm scales as the input size ($n$) grows larger. It does not measure speed in seconds; it measures the **rate of growth of operations**.",
      whyNeedIt: "A slow algorithm might seem fast when testing with 10 items, but completely freeze the server when dealing with 1,000,000 users. Big-O helps you choose the most efficient solution before writing a single line of production code.",
      howItWorks: [
        "**O(1) — Constant Time:** Takes the exact same time whether you have 5 items or 5 billion items (e.g. looking up an array index `arr[0]`).",
        "**O(log n) — Logarithmic Time:** Cuts the problem in half at every step (e.g. Binary Search in a sorted dictionary). Extremely fast!",
        "**O(n) — Linear Time:** Time grows in direct proportion to input size (e.g. looking through a deck of cards one by one to find the Ace).",
        "**O(n log n) — Linearithmic:** The standard efficiency ceiling for general comparison sorting algorithms (Merge Sort, Quick Sort).",
        "**O(n²) — Quadratic Time:** Nested loops where every item is compared to every other item (e.g. Bubble Sort). Becomes very sluggish on large datasets."
      ],
      realWorldExample: "**Looking up a name in a physical Phonebook:**\n- **O(n):** Starting at page 1 and reading every single name one by one until you find 'Zack'. Very slow!\n- **O(log n):** Opening the phonebook in the middle, seeing 'M', throwing away the first half, opening the remaining half at 'T', and repeating. You find 'Zack' in just a few page flips even among 1,000,000 names!",
      diagram: `
        <svg viewBox="0 0 740 280" class="responsive-svg" aria-label="Big-O Complexity Graph">
          <line x1="60" y1="240" x2="700" y2="240" stroke="var(--border-color)" stroke-width="2"/>
          <line x1="60" y1="240" x2="60" y2="20" stroke="var(--border-color)" stroke-width="2"/>
          <text x="380" y="270" font-size="12" text-anchor="middle" fill="var(--text-secondary)">Elements / Input Size (n) ──►</text>
          <text x="25" y="130" font-size="12" text-anchor="middle" transform="rotate(-90 25 130)" fill="var(--text-secondary)">Operations / Time ──►</text>

          <!-- O(1) Line -->
          <line x1="60" y1="230" x2="700" y2="230" stroke="#10b981" stroke-width="3"/>
          <text x="660" y="222" font-size="12" font-weight="bold" fill="#10b981">O(1) - Excellent</text>

          <!-- O(log n) Line -->
          <path d="M 60 230 Q 200 200, 700 170" fill="none" stroke="#06b6d4" stroke-width="3"/>
          <text x="650" y="160" font-size="12" font-weight="bold" fill="#06b6d4">O(log n) - Good</text>

          <!-- O(n) Line -->
          <line x1="60" y1="230" x2="700" y2="90" stroke="#f59e0b" stroke-width="3"/>
          <text x="640" y="80" font-size="12" font-weight="bold" fill="#f59e0b">O(n) - Fair</text>

          <!-- O(n^2) Curve -->
          <path d="M 60 230 Q 180 210, 320 20" fill="none" stroke="#ef4444" stroke-width="3"/>
          <text x="325" y="35" font-size="12" font-weight="bold" fill="#ef4444">O(n²) - Terrible!</text>
        </svg>
      `,
      diagramCaption: "As data size grows toward millions, O(1) and O(log n) stay practically flat, while O(n²) shoots up like a rocket, causing servers to crash.",
      keyPoints: [
        "Big-O measures the **worst-case scenario** (upper bound) of algorithm growth.",
        "Always drop constants and non-dominant terms ($O(3n + 50) \\implies O(n)$).",
        "**Space Complexity** measures extra memory used (Auxiliary Space + Call Stack frames).",
        "Amortized time measures the average cost per operation over a sequence of actions (like ArrayList resizing)."
      ],
      deepDive: {
        title: "Deep Dive: Dynamic Array Amortized O(1) Insertion",
        content: "A standard array has a fixed capacity. When an `ArrayList` in Java fills up, it allocates a new array of double the size ($2 \\times$), copies all old elements over ($O(n)$ copy cost), and inserts the new item. While that single resize operation is expensive, it happens so rarely that spread across $n$ insertions, the average cost per insertion remains **Amortized O(1)**!"
      },
      quiz: [
        {
          question: "If an algorithm searches an array of 1,000,000 sorted items and takes at most ~20 comparisons, what is its time complexity?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          correct: 1,
          explanation: "Binary Search is O(log n). Since 2²⁰ ≈ 1,000,000, it takes only 20 comparisons to find any element in 1 million sorted items."
        }
      ]
    },
    {
      id: "dsa-linear-structures",
      title: "2. Linear Data Structures",
      subtitle: "Arrays, Linked Lists, Stacks & Queues",
      whatIsIt: "**Linear Data Structures** organize elements sequentially in a single line, where each element is attached to its previous and next neighbors. The most common linear structures are **Arrays**, **Linked Lists**, **Stacks**, and **Queues**.",
      whyNeedIt: "Different tasks require different memory access patterns. If you need instant random lookups by number, an array is unbeatable. If you need frequent insertions in the middle without shifting data, a linked list is superior.",
      howItWorks: [
        "**Array:** Contiguous block of memory slots. Direct random access via index in **O(1)** (`arr[4]`). Inserting or deleting at the front requires shifting all items (**O(n)**).",
        "**Linked List:** A sequence of 'Nodes' scattered in memory where each node holds data and a pointer to the next node. Inserting at the head is instant (**O(1)**), but finding the 50th item requires walking from the start (**O(n)**).",
        "**Stack (LIFO - Last In, First Out):** Like a stack of dinner plates. You push items onto the top and pop them off the top in **O(1)**.",
        "**Queue (FIFO - First In, First Out):** Like a line at a movie theater. The first person to join the queue is the first served (**O(1)** enqueue and dequeue)."
      ],
      realWorldExample: "**Browser History & Print Jobs:**\n- **Stack:** Your browser's 'Back' button uses a Stack. Every page you visit is pushed on top. Clicking 'Back' pops the most recent page off first.\n- **Queue:** A shared office printer uses a Queue. Documents print strictly in the order they were submitted.",
      diagram: `
        <svg viewBox="0 0 740 240" class="responsive-svg" aria-label="Linear Data Structures Comparison">
          <!-- Array -->
          <g transform="translate(10, 20)">
            <text x="80" y="20" font-size="13" font-weight="bold" fill="var(--text-primary)">Array (Contiguous)</text>
            <rect x="0" y="35" width="40" height="40" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6"/>
            <text x="20" y="60" text-anchor="middle" font-size="12">10</text>
            <rect x="40" y="35" width="40" height="40" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6"/>
            <text x="60" y="60" text-anchor="middle" font-size="12">20</text>
            <rect x="80" y="35" width="40" height="40" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6"/>
            <text x="100" y="60" text-anchor="middle" font-size="12">30</text>
            <rect x="120" y="35" width="40" height="40" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6"/>
            <text x="140" y="60" text-anchor="middle" font-size="12">40</text>
            <text x="80" y="95" font-size="10" text-anchor="middle" fill="#10b981">Index lookup: O(1)</text>
          </g>

          <!-- Linked List -->
          <g transform="translate(200, 20)">
            <text x="120" y="20" font-size="13" font-weight="bold" fill="var(--text-primary)">Linked List (Pointers)</text>
            <rect x="0" y="35" width="45" height="40" rx="4" fill="var(--bg-subtle)" stroke="#8b5cf6"/>
            <text x="22" y="60" text-anchor="middle" font-size="12">A</text>
            <line x1="45" y1="55" x2="70" y2="55" stroke="#8b5cf6" stroke-width="2"/>
            <rect x="70" y="35" width="45" height="40" rx="4" fill="var(--bg-subtle)" stroke="#8b5cf6"/>
            <text x="92" y="60" text-anchor="middle" font-size="12">B</text>
            <line x1="115" y1="55" x2="140" y2="55" stroke="#8b5cf6" stroke-width="2"/>
            <rect x="140" y="35" width="45" height="40" rx="4" fill="var(--bg-subtle)" stroke="#8b5cf6"/>
            <text x="162" y="60" text-anchor="middle" font-size="12">C</text>
            <text x="100" y="95" font-size="10" text-anchor="middle" fill="#8b5cf6">Insert at Head: O(1)</text>
          </g>

          <!-- Stack & Queue -->
          <g transform="translate(430, 20)">
            <text x="60" y="20" font-size="13" font-weight="bold" fill="var(--text-primary)">Stack (LIFO)</text>
            <rect x="20" y="35" width="80" height="24" rx="4" fill="#ec4899" fill-opacity="0.2" stroke="#ec4899"/>
            <text x="60" y="52" text-anchor="middle" font-size="11">Top [Plate 3]</text>
            <rect x="20" y="62" width="80" height="24" rx="4" fill="#ec4899" fill-opacity="0.2" stroke="#ec4899"/>
            <text x="60" y="79" text-anchor="middle" font-size="11">Plate 2</text>
            <rect x="20" y="89" width="80" height="24" rx="4" fill="#ec4899" fill-opacity="0.2" stroke="#ec4899"/>
            <text x="60" y="106" text-anchor="middle" font-size="11">Plate 1</text>
          </g>

          <g transform="translate(580, 20)">
            <text x="70" y="20" font-size="13" font-weight="bold" fill="var(--text-primary)">Queue (FIFO)</text>
            <line x1="10" y1="50" x2="130" y2="50" stroke="var(--border-color)" stroke-width="2"/>
            <line x1="10" y1="85" x2="130" y2="85" stroke="var(--border-color)" stroke-width="2"/>
            <circle cx="30" cy="67" r="12" fill="#10b981"/>
            <text x="30" y="71" text-anchor="middle" fill="#fff" font-size="10">1st</text>
            <circle cx="70" cy="67" r="12" fill="#f59e0b"/>
            <text x="70" y="71" text-anchor="middle" fill="#fff" font-size="10">2nd</text>
            <circle cx="110" cy="67" r="12" fill="#3b82f6"/>
            <text x="110" y="71" text-anchor="middle" fill="#fff" font-size="10">3rd</text>
            <text x="70" y="115" font-size="10" text-anchor="middle" fill="var(--text-secondary)">Exit ◄── Queue ◄── Enter</text>
          </g>
        </svg>
      `,
      diagramCaption: "Arrays store items side-by-side in memory, Linked Lists use pointer links, Stacks operate like a plate dispenser, and Queues work like a checkout line.",
      keyPoints: [
        "**Array access by index:** $O(1)$ constant time.",
        "**Array insert/delete at start:** $O(n)$ due to shifting elements.",
        "**Linked List insert at head:** $O(1)$ constant time.",
        "**Stack:** LIFO (Last In, First Out) with $O(1)$ `push()` and `pop()`.",
        "**Queue:** FIFO (First In, First Out) with $O(1)$ `enqueue()` and `dequeue()`."
      ],
      deepDive: {
        title: "Deep Dive: Array Cache Locality vs. Linked List Misses",
        content: "Modern CPUs load memory in chunks called **Cache Lines** (typically 64 bytes). Because array elements are stored right next to each other in RAM (Contiguous), loading `arr[0]` automatically pulls `arr[1]` through `arr[7]` into high-speed CPU L1 cache. In contrast, linked list nodes are scattered across random heap memory addresses, causing frequent **CPU cache misses** that make linked lists slower in practical benchmarks."
      },
      quiz: [
        {
          question: "Which data structure is best for checking if parentheses are balanced in mathematical code like '((a + b) * (c - d))'?",
          options: ["Queue", "Stack", "Binary Tree", "Dynamic Array"],
          correct: 1,
          explanation: "A Stack is ideal: push every open '(' onto the stack, and pop one off whenever you see a closing ')'. If the stack is empty at the end, it's balanced!"
        }
      ]
    },
    {
      id: "dsa-hashmaps",
      title: "3. Hash Tables & HashMaps Under the Hood",
      subtitle: "Achieving instantaneous O(1) lookups & handling collisions",
      whatIsIt: "A **Hash Table** (or `HashMap` in Java) is a data structure that maps **Keys** to **Values**. It uses a mathematical formula called a **Hash Function** to convert any key (like a username 'alice') into an array index where the value is stored.",
      whyNeedIt: "Searching a list of 1,000,000 users one by one takes $O(n)$ time. A Hash Table allows you to find 'alice' in **$O(1)$ constant time**—almost instantly—regardless of whether the table contains 10 or 10 million items!",
      howItWorks: [
        "**Hash Function:** Converts key `'john'` into an integer (e.g. `hash('john') = 48291`).",
        "**Index Calculation:** Fits the hash into the internal array length using modulo: `index = hash % array.length`.",
        "**Hash Collision:** Because there are infinite possible strings but a finite array size, two different keys might produce the exact same bucket index!",
        "**Separate Chaining (Java HashMap):** Each array bucket holds a Linked List (or Red-Black Tree in Java 8+). If a collision occurs, the new item is simply added to that bucket's list.",
        "**Load Factor:** When the table is 75% full (default load factor = 0.75), it automatically doubles its internal bucket array size and rehashes all items."
      ],
      realWorldExample: "**Coat Check at a Theater:**\nWhen you check your winter jacket, the attendant hands you a ticket with a number `#42` and hangs your coat on hook `#42`. When you return, you show ticket `#42`. The attendant doesn't look at all 500 coats; they walk directly to hook `#42` and hand you your coat in 2 seconds!",
      diagram: `
        <svg viewBox="0 0 740 250" class="responsive-svg" aria-label="HashMap Architecture Diagram">
          <!-- Keys -->
          <rect x="20" y="40" width="100" height="35" rx="6" fill="var(--bg-subtle)" stroke="var(--border-color)"/>
          <text x="70" y="62" font-size="12" text-anchor="middle" fill="var(--text-primary)">Key: "alice"</text>
          <rect x="20" y="100" width="100" height="35" rx="6" fill="var(--bg-subtle)" stroke="var(--border-color)"/>
          <text x="70" y="122" font-size="12" text-anchor="middle" fill="var(--text-primary)">Key: "bob"</text>
          <rect x="20" y="160" width="100" height="35" rx="6" fill="var(--bg-subtle)" stroke="var(--border-color)"/>
          <text x="70" y="182" font-size="12" text-anchor="middle" fill="var(--text-primary)">Key: "charlie"</text>

          <!-- Hash Function -->
          <rect x="170" y="70" width="120" height="90" rx="10" fill="#3b82f6" fill-opacity="0.15" stroke="#3b82f6" stroke-width="2"/>
          <text x="230" y="105" font-size="13" font-weight="bold" text-anchor="middle" fill="#3b82f6">Hash Function</text>
          <text x="230" y="125" font-size="11" text-anchor="middle" fill="var(--text-secondary)">hashCode() % 16</text>

          <!-- Arrows -->
          <line x1="120" y1="58" x2="170" y2="90" stroke="#3b82f6" stroke-width="2"/>
          <line x1="120" y1="118" x2="170" y2="115" stroke="#3b82f6" stroke-width="2"/>
          <line x1="120" y1="178" x2="170" y2="140" stroke="#3b82f6" stroke-width="2"/>

          <!-- Buckets Array -->
          <g transform="translate(340, 20)">
            <text x="50" y="15" font-size="12" font-weight="bold" fill="var(--text-primary)">Bucket Array</text>
            <rect x="0" y="25" width="100" height="30" fill="var(--card-bg)" stroke="var(--border-color)"/>
            <text x="50" y="45" font-size="11" text-anchor="middle">Bucket [0]</text>
            <rect x="0" y="55" width="100" height="30" fill="#10b981" fill-opacity="0.2" stroke="#10b981"/>
            <text x="50" y="75" font-size="11" text-anchor="middle">Bucket [1] 🎯</text>
            <rect x="0" y="85" width="100" height="30" fill="var(--card-bg)" stroke="var(--border-color)"/>
            <text x="50" y="105" font-size="11" text-anchor="middle">Bucket [2]</text>
            <rect x="0" y="115" width="100" height="30" fill="#f59e0b" fill-opacity="0.2" stroke="#f59e0b"/>
            <text x="50" y="135" font-size="11" text-anchor="middle">Bucket [3] 💥</text>
            <rect x="0" y="145" width="100" height="30" fill="var(--card-bg)" stroke="var(--border-color)"/>
            <text x="50" y="165" font-size="11" text-anchor="middle">Bucket [4]</text>
          </g>

          <!-- Chaining Node -->
          <g transform="translate(480, 115)">
            <rect x="0" y="0" width="100" height="30" rx="4" fill="var(--bg-subtle)" stroke="#f59e0b"/>
            <text x="50" y="20" font-size="10" text-anchor="middle">("bob", 28)</text>
            <line x1="100" y1="15" x2="130" y2="15" stroke="#f59e0b" stroke-width="2"/>
            <rect x="130" y="0" width="100" height="30" rx="4" fill="var(--bg-subtle)" stroke="#f59e0b"/>
            <text x="180" y="20" font-size="10" text-anchor="middle">("charlie", 35)</text>
            <text x="90" y="50" font-size="10" fill="#f59e0b">Collision Handled via Chaining!</text>
          </g>
        </svg>
      `,
      diagramCaption: "A Hash Table maps keys through a hash function directly to an index. When two keys collide at Bucket [3], they form a small linked list.",
      keyPoints: [
        "**HashMap lookups, inserts, and deletes:** Average case **$O(1)$**, worst case $O(n)$ if all keys collide.",
        "**Collisions** happen when different keys produce the same bucket index.",
        "Java 8+ converts a bucket's linked list into a **Red-Black Tree** once it exceeds 8 items (TREEIFY_THRESHOLD), reducing worst-case lookups to $O(\\log n)$.",
        "If you override `equals()`, you must also override `hashCode()` to maintain the Java contract."
      ],
      deepDive: {
        title: "Deep Dive: The equals() and hashCode() Contract in Java",
        content: "If two objects are equal according to `equals()`, they **must produce the exact same `hashCode()`**. If you fail to override both, inserting an object as a key into a `HashMap` and then looking it up with an identical object will fail, because the lookup will calculate a completely different bucket index and return `null`!"
      },
      quiz: [
        {
          question: "What is the average time complexity of finding a value by its key in a properly balanced HashMap?",
          options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
          correct: 2,
          explanation: "HashMaps provide average O(1) constant time lookups because the key is directly converted into an index."
        }
      ]
    },
    {
      id: "dsa-trees-graphs",
      title: "4. Non-Linear Structures: Trees & Graphs",
      subtitle: "Hierarchical data, binary search trees & networks",
      whatIsIt: "**Non-Linear Data Structures** store elements in multi-level relationships where one element can connect to multiple other elements. A **Tree** is a hierarchical structure with a root and children (no loops). A **Graph** is a generalized network of nodes (vertices) connected by edges (links), which can have loops.",
      whyNeedIt: "Real-world relationships are rarely linear lines. Files and folders on your computer form a **Tree**. Social networks (followers and friendships), Google Maps roads, and the World Wide Web are all massive **Graphs**.",
      howItWorks: [
        "**Binary Tree:** Each node has at most two children: Left and Right.",
        "**Binary Search Tree (BST):** All values in the left subtree are smaller than the node, and all values in the right subtree are larger. This allows $O(\\log n)$ searching!",
        "**Tree Traversals:**\n- **Inorder (Left, Root, Right):** Visits a BST in sorted ascending order!\n- **Preorder (Root, Left, Right):** Great for cloning a tree.\n- **Level-Order (BFS):** Visits nodes level by level using a Queue.",
        "**Heap / Priority Queue:** A specialized complete tree where the parent is always greater than (Max-Heap) or smaller than (Min-Heap) its children. Finding the maximum item is instant **O(1)**.",
        "**Graph Search:**\n- **DFS (Depth-First Search):** Explores as deep as possible along each branch before backtracking (uses a Stack or recursion).\n- **BFS (Breadth-First Search):** Explores all immediate neighbors first (uses a Queue). Guarantees the **shortest path** in unweighted graphs!"
      ],
      realWorldExample: "**Google Maps vs. Your Company Org Chart:**\n- **Tree:** The CEO is the root node, Vice Presidents are children, and team leads branch underneath. Nobody can be their own boss's boss (No cycles).\n- **Graph:** Cities connected by highways. You can drive from New York to Philadelphia to Washington and back to New York (Cycles exist).",
      diagram: `
        <svg viewBox="0 0 740 240" class="responsive-svg" aria-label="Binary Search Tree Diagram">
          <!-- BST Nodes -->
          <g transform="translate(140, 20)">
            <text x="100" y="10" font-size="13" font-weight="bold" text-anchor="middle" fill="var(--text-primary)">Binary Search Tree (BST)</text>

            <!-- Lines -->
            <line x1="100" y1="40" x2="50" y2="90" stroke="#3b82f6" stroke-width="2"/>
            <line x1="100" y1="40" x2="150" y2="90" stroke="#3b82f6" stroke-width="2"/>
            <line x1="50" y1="90" x2="25" y2="140" stroke="#3b82f6" stroke-width="2"/>
            <line x1="50" y1="90" x2="75" y2="140" stroke="#3b82f6" stroke-width="2"/>
            <line x1="150" y1="90" x2="175" y2="140" stroke="#3b82f6" stroke-width="2"/>

            <!-- Root 50 -->
            <circle cx="100" cy="40" r="18" fill="#3b82f6"/>
            <text x="100" y="45" font-size="12" font-weight="bold" text-anchor="middle" fill="#fff">50</text>

            <!-- 20 & 80 -->
            <circle cx="50" cy="90" r="16" fill="#10b981"/>
            <text x="50" y="95" font-size="11" font-weight="bold" text-anchor="middle" fill="#fff">20</text>
            <circle cx="150" cy="90" r="16" fill="#8b5cf6"/>
            <text x="150" y="95" font-size="11" font-weight="bold" text-anchor="middle" fill="#fff">80</text>

            <!-- Leaves: 10, 30, 95 -->
            <circle cx="25" cy="140" r="14" fill="var(--bg-subtle)" stroke="var(--border-color)"/>
            <text x="25" y="144" font-size="10" text-anchor="middle">10</text>
            <circle cx="75" cy="140" r="14" fill="var(--bg-subtle)" stroke="var(--border-color)"/>
            <text x="75" y="144" font-size="10" text-anchor="middle">30</text>
            <circle cx="175" cy="140" r="14" fill="var(--bg-subtle)" stroke="var(--border-color)"/>
            <text x="175" y="144" font-size="10" text-anchor="middle">95</text>
            <text x="100" y="190" font-size="11" text-anchor="middle" fill="#10b981">Left &lt; Root &lt; Right Rule</text>
          </g>

          <!-- Graph Representation -->
          <g transform="translate(450, 20)">
            <text x="100" y="10" font-size="13" font-weight="bold" text-anchor="middle" fill="var(--text-primary)">Social Network Graph</text>
            <line x1="50" y1="50" x2="150" y2="50" stroke="#f59e0b" stroke-width="2"/>
            <line x1="150" y1="50" x2="120" y2="130" stroke="#f59e0b" stroke-width="2"/>
            <line x1="120" y1="130" x2="50" y2="50" stroke="#f59e0b" stroke-width="2"/>
            <line x1="50" y1="50" x2="40" y2="130" stroke="#f59e0b" stroke-width="2"/>

            <circle cx="50" cy="50" r="16" fill="#f59e0b"/>
            <text x="50" y="55" font-size="11" text-anchor="middle" fill="#fff">User A</text>
            <circle cx="150" cy="50" r="16" fill="#f59e0b"/>
            <text x="150" y="55" font-size="11" text-anchor="middle" fill="#fff">User B</text>
            <circle cx="120" cy="130" r="16" fill="#f59e0b"/>
            <text x="120" y="135" font-size="11" text-anchor="middle" fill="#fff">User C</text>
            <circle cx="40" cy="130" r="16" fill="#f59e0b"/>
            <text x="40" y="135" font-size="11" text-anchor="middle" fill="#fff">User D</text>
            <text x="100" y="190" font-size="11" text-anchor="middle" fill="var(--text-secondary)">Cycles and mesh connections allowed</text>
          </g>
        </svg>
      `,
      diagramCaption: "Binary Search Trees strictly maintain smaller keys on the left and larger keys on the right. Graphs model complex networks with cycles.",
      keyPoints: [
        "In a **BST**, search, insert, and delete take average $O(\\log n)$ time.",
        "**Inorder traversal** on a BST produces numbers in ascending order.",
        "A **Min-Heap** finds the minimum element in instant $O(1)$ time; insert/delete takes $O(\\log n)$.",
        "**BFS (Breadth-First Search)** uses a Queue and finds the shortest path in unweighted graphs.",
        "**DFS (Depth-First Search)** uses recursion or a Stack to explore deeply."
      ],
      deepDive: {
        title: "Deep Dive: Balanced Trees (AVL & Red-Black)",
        content: "If you insert already sorted numbers (1, 2, 3, 4, 5) into a naive BST, the tree degrades into a straight linked list with terrible $O(n)$ search performance! Self-balancing trees like **Red-Black Trees** and **AVL Trees** automatically perform tree rotations upon insertions to guarantee that tree height stays strictly logarithmic ($O(\\log n)$)."
      },
      quiz: [
        {
          question: "Which graph traversal algorithm guarantees finding the shortest path between two points on an unweighted subway map?",
          options: ["Depth-First Search (DFS)", "Breadth-First Search (BFS)", "Inorder Traversal", "Preorder Traversal"],
          correct: 1,
          explanation: "BFS explores nodes layer by layer, guaranteeing the minimum number of edge hops to reach the destination in an unweighted graph."
        }
      ]
    }
  ],
  flashcards: [
    {
      term: "Big-O Notation",
      category: "Algorithms",
      question: "What is Big-O Notation?",
      answer: "A mathematical notation describing the limiting behavior and growth rate of an algorithm's time or space requirements as input size grows.",
      tip: "Focuses on the worst-case scenario, ignoring constants."
    },
    {
      term: "Hash Collision",
      category: "Data Structures",
      question: "What is a Hash Collision?",
      answer: "When two different keys produce the exact same index in a hash table's bucket array. Solved using Separate Chaining or Open Addressing.",
      tip: "Two people assigned the same locker number."
    },
    {
      term: "Stack vs. Queue",
      category: "Data Structures",
      question: "What is the difference between a Stack and a Queue?",
      answer: "A Stack is LIFO (Last In, First Out like a stack of plates). A Queue is FIFO (First In, First Out like a supermarket checkout line).",
      tip: "Stack: Push/Pop. Queue: Enqueue/Dequeue."
    },
    {
      term: "Binary Search",
      category: "Algorithms",
      question: "What is Binary Search and its complexity?",
      answer: "An algorithm that repeatedly divides a sorted collection in half to find a target value in O(log n) time.",
      tip: "Only works on sorted data!"
    }
  ]
};
