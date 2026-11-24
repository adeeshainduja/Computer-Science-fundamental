// Topic 2: Data Structures & Algorithms (DSA)
var topicDSA = window.topicDSA = {
  "id": "dsa",
  "title": "Data Structures & Algorithms (DSA)",
  "shortTitle": "DSA & Problem Solving",
  "icon": "⚡",
  "badge": "Core Algorithmic Foundations",
  "readingTime": "45 min masterclass",
  "description": "Master computational problem-solving and algorithmic complexity: Big-O analysis, linear and non-linear data structures, HashMap internals, Java 8 Treeification, complete LRU Cache, Graph traversals, classic interview coding problems, and 8 deep-dive technical interview questions.",
  "learningObjectives": [
    "Analyze Time and Space complexities, Asymptotic Notations (O, Omega, Theta), and Amortized doubling",
    "Compare cache locality in contiguous Arrays vs. pointer fragmentation in Linked Lists",
    "Master HashMap internals: hash perturbation, bitwise indexing (n-1)&hash, and Java 8 Treeification",
    "Implement an enterprise LRU Cache in O(1) time using a HashMap and Doubly Linked List",
    "Understand Heap array index representation and Graph BFS vs. DFS trade-offs",
    "Apply Two Pointers, Sliding Window, and Floyd's Tortoise and Hare algorithmic patterns",
    "Study complete production Java solutions for Two Sum, Valid Parentheses, Longest Substring, Reverse Linked List, Cycle Detection, and Level-Order Traversal",
    "Confidently answer 8 deep-dive technical interview questions and consult the Master Big-O cheat sheet"
  ],
  "lessons": [
    {
      "id": "dsa-complexity",
      "title": "1. Complexity Analysis (Big-O Deep Dive)",
      "subtitle": "Time vs. Space, Asymptotic notations & Amortized analysis",
      "whatIsIt": "Complexity analysis measures how an algorithm's execution time and memory consumption scale as the input size $n$ approaches infinity. It characterizes algorithm efficiency independent of specific hardware or CPU clock speeds.",
      "whyNeedIt": "A nested loop $O(n^2)$ algorithm might run in 1 millisecond on 100 items, but on 1,000,000 items it takes **11.5 days**! In production distributed systems, choosing an $O(n \\log n)$ or $O(1)$ approach prevents server CPU exhaustion and catastrophic cascading outages.",
      "howItWorks": [
        "**Time Complexity:** Counts the number of elementary operations executed as a function of input size $n$.",
        "**Space Complexity:** Measures **Auxiliary Space** (temporary extra memory used during execution, excluding input storage) plus the recursion call stack.",
        "**Asymptotic Notations:**\n  - **Big-O ($O$):** Worst-case upper bound (guarantees the algorithm will run no slower than this).\n  - **Big-Omega ($\\Omega$):** Best-case lower bound.\n  - **Big-Theta ($\\Theta$):** Tight bound (when upper and lower bounds coincide).",
        "**Amortized Time Complexity:** The average time per operation over a sequence of operations. For example, in `ArrayList.add()`, occasionally copying $n$ elements to double capacity takes $O(n)$, but happens so rarely that the amortized cost per append remains strictly **$O(1)$**."
      ],
      "realWorldExample": "**Airport Security Check vs. Finding a Book in a Library:**\n- **$O(1)$ (Instant):** Looking up a word in a dictionary with thumb tabs directly.\n- **$O(\\log n)$ (Binary Search):** Searching a phone book by repeatedly opening the middle page.\n- **$O(n)$ (Linear Scan):** Scanning every boarding pass in a security line one by one.\n- **$O(n^2)$ (Quadratic Trap):** Comparing every student in an auditorium against every other student.",
      "diagram": "<svg viewBox=\"0 0 740 220\" class=\"responsive-svg\">\n        <rect x=\"20\" y=\"20\" width=\"700\" height=\"180\" rx=\"14\" fill=\"#1e293b\" stroke=\"#334155\" stroke-width=\"2\"/>\n        <line x1=\"80\" y1=\"170\" x2=\"680\" y2=\"170\" stroke=\"#475569\" stroke-width=\"2\"/>\n        <line x1=\"80\" y1=\"170\" x2=\"80\" y2=\"40\" stroke=\"#475569\" stroke-width=\"2\"/>\n        <text x=\"380\" y=\"195\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Input Size (n) ──►</text>\n        <text x=\"45\" y=\"100\" fill=\"#94a3b8\" font-size=\"11\" transform=\"rotate(-90 45 100)\" text-anchor=\"middle\">Operations ──►</text>\n        <path d=\"M 80 165 L 680 165\" stroke=\"#10b981\" stroke-width=\"2.5\"/>\n        <text x=\"690\" y=\"168\" fill=\"#34d399\" font-size=\"11\" font-weight=\"bold\">O(1)</text>\n        <path d=\"M 80 165 Q 250 155 680 140\" stroke=\"#38bdf8\" stroke-width=\"2.5\"/>\n        <text x=\"690\" y=\"143\" fill=\"#38bdf8\" font-size=\"11\" font-weight=\"bold\">O(log n)</text>\n        <path d=\"M 80 165 L 680 90\" stroke=\"#f59e0b\" stroke-width=\"2.5\"/>\n        <text x=\"690\" y=\"93\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\">O(n)</text>\n        <path d=\"M 80 165 Q 400 120 550 40\" stroke=\"#ef4444\" stroke-width=\"2.5\"/>\n        <text x=\"560\" y=\"45\" fill=\"#f87171\" font-size=\"11\" font-weight=\"bold\">O(n²)</text>\n      </svg>",
      "diagramCaption": "Growth rates of common complexities. O(1) and O(log n) scale flatly; O(n²) explodes exponentially as input size grows.",
      "technicalExplanation": "In rigorous complexity analysis, auxiliary space refers strictly to the additional memory allocated by an algorithm during execution, excluding the input data itself. For recursive algorithms, the <strong>Call Stack</strong> consumes $O(h)$ space where $h$ is the maximum recursion depth. If a function makes $n$ recursive calls (e.g. naive Fibonacci without memoization), the call stack consumes $O(n)$ memory and risks triggering a <code>StackOverflowError</code>.",
      "comparisonTable": {
        "headers": [
          "Big-O Complexity",
          "Name",
          "Operations for n = 1,000",
          "Operations for n = 1,000,000",
          "Real-World Example"
        ],
        "rows": [
          [
            "$O(1)$",
            "Constant",
            "1",
            "1",
            "HashMap lookup, Array index access"
          ],
          [
            "$O(\\log n)$",
            "Logarithmic",
            "10",
            "20",
            "Binary Search, Balanced BST lookup"
          ],
          [
            "$O(n)$",
            "Linear",
            "1,000",
            "1,000,000",
            "Iterating an array, Singly Linked List traversal"
          ],
          [
            "$O(n \\log n)$",
            "Linearithmic",
            "10,000",
            "20,000,000",
            "Merge Sort, Quick Sort (average), TimSort"
          ],
          [
            "$O(n^2)$",
            "Quadratic",
            "1,000,000",
            "1,000,000,000,000 (1 Trillion!)",
            "Nested loops, Bubble Sort"
          ],
          [
            "$O(2^n)$",
            "Exponential",
            "$10^{301}$ (Universe death)",
            "Impossible",
            "Naive recursive Fibonacci, Power set"
          ],
          [
            "$O(n!)$",
            "Factorial",
            "Impossible",
            "Impossible",
            "Traveling Salesperson Problem (Brute force)"
          ]
        ]
      },
      "keyPoints": [
        "**Worst-Case Focus:** Big-O provides a formal upper bound on operational growth.",
        "**Amortized O(1):** `ArrayList` dynamic resizing costs $O(n)$ occasionally during doubling, but amortizes to $O(1)$ across insertions.",
        "**Stack Space:** Recursive algorithms allocate stack frames; recursion depth defines auxiliary space."
      ],
      "interviewQA": [
        {
          "question": "Why does dynamic array resizing (like in Java ArrayList) have an amortized O(1) time complexity?",
          "shortAnswer": "Because array doubling happens with exponentially decreasing frequency. Appending n elements takes 2n total copying operations, meaning each append averages O(1) amortized work.",
          "detailedAnswer": "When an ArrayList of size 1 reaches capacity, it doubles to 2, 4, 8, 16... $2^k$. The total number of copies to insert $n$ elements is $1 + 2 + 4 + 8 + \\dots + n = 2n - 1$. Amortizing $2n$ copying steps across $n$ insertions yields $\\frac{2n}{n} = 2 = O(1)$ constant time per operation.",
          "followUps": [
            "What happens if an ArrayList expands by adding a fixed 10 elements instead of doubling?",
            "Answer: Resizing would occur every 10 elements, causing total copying work to scale quadratically to $O(n^2)$, degrading amortized time to $O(n)$!"
          ]
        }
      ],
      "quiz": [
        {
          "question": "If an algorithm's operation count is given by T(n) = 3n² + 50n + 1000, what is its Big-O time complexity?",
          "options": [
            "O(n)",
            "O(n²)",
            "O(n³)",
            "O(log n)"
          ],
          "correct": 1,
          "explanation": "In asymptotic analysis, lower-order terms (50n, 1000) and constant coefficients (3) are dropped as n approaches infinity, leaving O(n²)."
        }
      ]
    },
    {
      "id": "dsa-linear",
      "title": "2. Linear Data Structures & Memory Layout",
      "subtitle": "Arrays, Linked Lists, Stacks, Queues, Deque & cache locality",
      "whatIsIt": "Linear data structures organize elements sequentially in memory, where elements are attached one after another. The primary types are Arrays, Dynamic Arrays, Linked Lists, Stacks, Queues, and Double-Ended Queues (Deque).",
      "whyNeedIt": "Different linear data structures provide starkly different memory and operational trade-offs: Arrays offer instant $O(1)$ random access due to contiguous memory, while Linked Lists provide $O(1)$ node insertion/deletion without contiguous memory allocation constraints.",
      "howItWorks": [
        "**Arrays (Contiguous Block):** Elements sit in adjacent memory addresses. Element address = $\\text{base} + i \\times \\text{elementSize}$, enabling instant $O(1)$ index calculation. Maximizes CPU L1/L2 cache locality.",
        "**Linked Lists (Dispersed Nodes):** Nodes are scattered across the heap, connected via forward/backward pointers. Traversal requires sequential pointer following ($O(n)$). Poor cache locality.",
        "**Stack (LIFO):** Last-In, First-Out (`push`, `pop`, `peek`). Implemented via `ArrayDeque` for optimal performance.",
        "**Queue (FIFO):** First-In, First-Out (`offer`, `poll`, `peek`).",
        "**Deque (Double-Ended Queue):** Supports $O(1)$ insertions and removals at both ends."
      ],
      "realWorldExample": "**Train Cars vs. Scavenger Hunt:**\n- **Array:** A passenger train where carriages are physically welded together in order. To go to Car 4, you count 4 cars from the engine.\n- **Linked List:** A scavenger hunt where each clue contains a paper note with the GPS coordinates of the next clue. You cannot jump directly to Clue 5 without visiting Clues 1, 2, 3, and 4 first.",
      "diagram": "<svg viewBox=\"0 0 740 220\" class=\"responsive-svg\">\n        <rect x=\"20\" y=\"20\" width=\"700\" height=\"180\" rx=\"14\" fill=\"#1e293b\" stroke=\"#334155\" stroke-width=\"2\"/>\n        <text x=\"180\" y=\"50\" fill=\"#60a5fa\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">ARRAY: Contiguous Memory Layout</text>\n        <g transform=\"translate(40, 70)\">\n          <rect x=\"0\" y=\"0\" width=\"60\" height=\"40\" fill=\"#0f172a\" stroke=\"#3b82f6\" stroke-width=\"1.5\"/>\n          <text x=\"30\" y=\"25\" fill=\"#f8fafc\" font-size=\"12\" text-anchor=\"middle\">10</text>\n          <rect x=\"60\" y=\"0\" width=\"60\" height=\"40\" fill=\"#0f172a\" stroke=\"#3b82f6\" stroke-width=\"1.5\"/>\n          <text x=\"90\" y=\"25\" fill=\"#f8fafc\" font-size=\"12\" text-anchor=\"middle\">20</text>\n          <rect x=\"120\" y=\"0\" width=\"60\" height=\"40\" fill=\"#0f172a\" stroke=\"#3b82f6\" stroke-width=\"1.5\"/>\n          <text x=\"150\" y=\"25\" fill=\"#f8fafc\" font-size=\"12\" text-anchor=\"middle\">30</text>\n          <text x=\"90\" y=\"60\" fill=\"#94a3b8\" font-size=\"10\" text-anchor=\"middle\">L1 Cache Prefetching (O(1) Access)</text>\n        </g>\n        <text x=\"540\" y=\"50\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">LINKED LIST: Dispersed Heap Nodes</text>\n        <g transform=\"translate(380, 70)\">\n          <rect x=\"0\" y=\"0\" width=\"55\" height=\"35\" rx=\"4\" fill=\"#0f172a\" stroke=\"#10b981\" stroke-width=\"1.5\"/>\n          <text x=\"27\" y=\"22\" fill=\"#f8fafc\" font-size=\"11\" text-anchor=\"middle\">[10 | •]</text>\n          <line x1=\"55\" y1=\"18\" x2=\"90\" y2=\"18\" stroke=\"#10b981\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/>\n          <rect x=\"95\" y=\"0\" width=\"55\" height=\"35\" rx=\"4\" fill=\"#0f172a\" stroke=\"#10b981\" stroke-width=\"1.5\"/>\n          <text x=\"122\" y=\"22\" fill=\"#f8fafc\" font-size=\"11\" text-anchor=\"middle\">[20 | •]</text>\n          <line x1=\"150\" y1=\"18\" x2=\"185\" y2=\"18\" stroke=\"#10b981\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/>\n          <rect x=\"190\" y=\"0\" width=\"55\" height=\"35\" rx=\"4\" fill=\"#0f172a\" stroke=\"#10b981\" stroke-width=\"1.5\"/>\n          <text x=\"217\" y=\"22\" fill=\"#f8fafc\" font-size=\"11\" text-anchor=\"middle\">[30 | null]</text>\n          <text x=\"140\" y=\"60\" fill=\"#94a3b8\" font-size=\"10\" text-anchor=\"middle\">Pointers scattered in RAM (O(n) Traversal)</text>\n        </g>\n      </svg>",
      "diagramCaption": "Array memory is contiguous and CPU cache friendly. Linked List nodes reside at scattered heap addresses linked via pointers.",
      "technicalExplanation": "CPU architectures load data from RAM into ultra-fast L1/L2 caches in <strong>Cache Lines</strong> (typically 64 bytes). Because an array is contiguous in memory, reading <code>arr[0]</code> automatically loads <code>arr[1]</code> through <code>arr[15]</code> into the CPU cache for free (Spatial Locality). With linked lists, every node is allocated independently on the heap at unpredictable addresses, causing frequent <strong>CPU Cache Misses</strong> that stall the processor.",
      "comparisonTable": {
        "headers": [
          "Data Structure",
          "Access by Index",
          "Search Value",
          "Insert at Beginning",
          "Insert at End",
          "Delete by Value",
          "Memory Overhead"
        ],
        "rows": [
          [
            "**Static Array**",
            "$O(1)$",
            "$O(n)$",
            "$O(n)$",
            "$O(1)$ (if space)",
            "$O(n)$",
            "**None** (Zero pointer overhead)"
          ],
          [
            "**Dynamic Array (ArrayList)**",
            "$O(1)$",
            "$O(n)$",
            "$O(n)$",
            "$O(1)^*$ amortized",
            "$O(n)$",
            "Low (unused capacity buffer)"
          ],
          [
            "**Singly Linked List**",
            "$O(n)$",
            "$O(n)$",
            "$O(1)$",
            "$O(1)$ (with tail pointer)",
            "$O(n)$",
            "Medium (1 pointer per node)"
          ],
          [
            "**Doubly Linked List**",
            "$O(n)$",
            "$O(n)$",
            "$O(1)$",
            "$O(1)$",
            "$O(1)$ (given node reference)",
            "High (2 pointers per node)"
          ],
          [
            "**Stack (ArrayDeque)**",
            "$O(n)$",
            "$O(n)$",
            "$O(1)$ (push)",
            "$O(1)$",
            "$O(1)$ (pop)",
            "Low"
          ],
          [
            "**Queue (LinkedList)**",
            "$O(n)$",
            "$O(n)$",
            "$O(1)$ (offer)",
            "$O(1)$",
            "$O(1)$ (poll)",
            "Medium (Node wrapping)"
          ]
        ]
      },
      "keyPoints": [
        "**Cache Locality:** Arrays beat linked lists in real-world benchmarks due to CPU spatial prefetching.",
        "**Stack Implementation:** Always prefer `Deque<T> stack = new ArrayDeque<>()` over legacy `java.util.Stack` (which carries thread synchronization overhead).",
        "**Sentinel Nodes:** In linked list problems, using a dummy sentinel node eliminates edge cases when modifying the list head."
      ],
      "interviewQA": [
        {
          "question": "Why is ArrayDeque preferred over java.util.Stack in Java?",
          "shortAnswer": "java.util.Stack extends Vector, making all its methods synchronized. This introduces unnecessary lock contention in single-threaded environments. ArrayDeque is unsynchronized, faster, and cache-friendly.",
          "detailedAnswer": "In Java 1.0, Stack was built on Vector with synchronized methods. In modern Java, standard practice is to use `Deque<Integer> stack = new ArrayDeque<>()`. ArrayDeque uses a resizable circular array, avoids heap allocations for node wrappers, and provides significantly higher throughput than LinkedList or Vector.",
          "followUps": [
            "Can ArrayDeque store null elements?",
            "Answer: No! ArrayDeque explicitly forbids nulls to disambiguate from poll() returning null when empty."
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why do modern CPU architectures access array elements significantly faster than linked list elements?",
          "options": [
            "Arrays are stored on the GPU",
            "Contiguous memory layout allows CPU cache lines to prefetch subsequent array elements automatically",
            "Linked lists require internet access",
            "Arrays do not use RAM"
          ],
          "correct": 1,
          "explanation": "Spatial locality enables CPU hardware prefetchers to load entire contiguous array cache lines into L1/L2 cache, minimizing RAM access latency."
        }
      ]
    },
    {
      "id": "dsa-hashmap-lru",
      "title": "3. Hashing, HashMap Internals & The LRU Cache",
      "subtitle": "Bitwise indexing, collision resolution, Java 8 Treeification & O(1) LRU Cache",
      "whatIsIt": "A Hash Table maps keys to values using a mathematical hash function. Java's `HashMap` operates as an array of buckets (`Node<K, V>[] table`) with separate chaining collision resolution.",
      "whyNeedIt": "Hash tables provide average **$O(1)$ Time Complexity** for insertion, deletion, and lookup, making them the foundational backbone of databases, caching systems, and high-frequency algorithms.",
      "howItWorks": [
        "**Step 1: Compute `hashCode()`:** Invokes the object's 32-bit hash code.",
        "**Step 2: Hash Perturbation:** Bit-shifts and XORs high bits down: `(h = key.hashCode()) ^ (h >>> 16)`. Prevents collision clustering when capacity is small.",
        "**Step 3: Bitwise Indexing:** Computes bucket index via `(capacity - 1) & hash`. Because capacity is always a **Power of 2**, this bitwise AND produces the exact same result as modulo `% capacity` in a single CPU clock cycle!",
        "**Java 8 Treeification:** When a bucket's collision chain length reaches **$\\ge 8$** (`TREEIFY_THRESHOLD`) and total table capacity is **$\\ge 64$**, the linked list transforms into a balanced **Red-Black Tree**, reducing worst-case search from $O(n)$ to **$O(\\log n)$**!",
        "**Load Factor & Rehashing:** Default load factor is `0.75`. When `size > capacity * 0.75`, capacity doubles and all keys are rehashed."
      ],
      "realWorldExample": "**Post Office PO Boxes:**\nA post office has 1,000 numbered PO boxes. An incoming letter's zip code directly indicates which box to drop it into ($O(1)$). If two families share Box 42 (collision), a clipboard inside Box 42 lists their names sequentially.",
      "diagram": "<svg viewBox=\"0 0 740 220\" class=\"responsive-svg\">\n        <rect x=\"20\" y=\"20\" width=\"700\" height=\"180\" rx=\"14\" fill=\"#1e293b\" stroke=\"#334155\" stroke-width=\"2\"/>\n        <text x=\"370\" y=\"45\" fill=\"#f8fafc\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">HASHMAP INTERNAL LOOKUP FLOW</text>\n        <rect x=\"50\" y=\"65\" width=\"130\" height=\"40\" rx=\"6\" fill=\"#0f172a\" stroke=\"#3b82f6\" stroke-width=\"1.5\"/>\n        <text x=\"115\" y=\"85\" fill=\"#93c5fd\" font-size=\"11\" text-anchor=\"middle\">Key (\"apple\")</text>\n        <text x=\"115\" y=\"98\" fill=\"#64748b\" font-size=\"9\" text-anchor=\"middle\">hashCode()</text>\n        <line x1=\"180\" y1=\"85\" x2=\"220\" y2=\"85\" stroke=\"#94a3b8\" stroke-width=\"2\"/>\n        <rect x=\"220\" y=\"65\" width=\"140\" height=\"40\" rx=\"6\" fill=\"#0f172a\" stroke=\"#7c3aed\" stroke-width=\"1.5\"/>\n        <text x=\"290\" y=\"85\" fill=\"#c4b5fd\" font-size=\"11\" text-anchor=\"middle\">Bit-Shift Spread</text>\n        <text x=\"290\" y=\"98\" fill=\"#a78bfa\" font-size=\"9\" text-anchor=\"middle\">h ^ (h &gt;&gt;&gt; 16)</text>\n        <line x1=\"360\" y1=\"85\" x2=\"400\" y2=\"85\" stroke=\"#94a3b8\" stroke-width=\"2\"/>\n        <rect x=\"400\" y=\"65\" width=\"140\" height=\"40\" rx=\"6\" fill=\"#0f172a\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/>\n        <text x=\"470\" y=\"85\" fill=\"#fbbf24\" font-size=\"11\" text-anchor=\"middle\">Bitwise Index</text>\n        <text x=\"470\" y=\"98\" fill=\"#fcd34d\" font-size=\"9\" text-anchor=\"middle\">(cap - 1) &amp; hash</text>\n        <line x1=\"540\" y1=\"85\" x2=\"580\" y2=\"85\" stroke=\"#94a3b8\" stroke-width=\"2\"/>\n        <rect x=\"580\" y=\"55\" width=\"120\" height=\"60\" rx=\"6\" fill=\"#0f172a\" stroke=\"#10b981\" stroke-width=\"1.5\"/>\n        <text x=\"640\" y=\"80\" fill=\"#34d399\" font-size=\"11\" text-anchor=\"middle\">Bucket [4]</text>\n        <text x=\"640\" y=\"100\" fill=\"#6ee7b7\" font-size=\"10\" text-anchor=\"middle\">Node -&gt; Value</text>\n        <text x=\"370\" y=\"150\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Java 8 Optimization: Chain length &gt;= 8 converts to Red-Black Tree (O(log n) worst case)!</text>\n      </svg>",
      "diagramCaption": "Three internal steps: hashCode() calculation, bit-shift perturbation, and fast bitwise AND index resolution.",
      "technicalExplanation": "The <strong>equals() and hashCode() Contract</strong> is a frequent source of critical production bugs: (1) If two objects are equal via <code>equals()</code>, they MUST have the exact same <code>hashCode()</code>, (2) If you override <code>equals()</code>, you must override <code>hashCode()</code>. If violated, an object inserted into a HashMap cannot be retrieved via <code>map.get(new Key(...))</code> because Java looks in the wrong bucket!<br><br>The classic interview challenge is the <strong>LRU Cache</strong>, combining a <code>HashMap<K, Node></code> for $O(1)$ lookups with a <code>Doubly Linked List</code> of sentinel nodes for $O(1)$ evictions.",
      "codeBlocks": [
        {
          "title": "LRUCache.java (Complete O(1) Production Implementation)",
          "lang": "java",
          "code": "import java.util.HashMap;\nimport java.util.Map;\n\npublic class LRUCache {\n    private static class Node {\n        int key, value;\n        Node prev, next;\n        Node(int key, int value) {\n            this.key = key;\n            this.value = value;\n        }\n    }\n\n    private final int capacity;\n    private final Map<Integer, Node> map;\n    private final Node head; // Sentinel Head (Most Recently Used)\n    private final Node tail; // Sentinel Tail (Least Recently Used)\n\n    public LRUCache(int capacity) {\n        this.capacity = capacity;\n        this.map = new HashMap<>();\n        \n        // Sentinel nodes eliminate null boundary checks\n        head = new Node(-1, -1);\n        tail = new Node(-1, -1);\n        head.next = tail;\n        tail.prev = head;\n    }\n\n    public int get(int key) {\n        if (!map.containsKey(key)) return -1;\n        Node node = map.get(key);\n        moveToHead(node); // Accessed -> Mark as MRU\n        return node.value;\n    }\n\n    public void put(int key, int value) {\n        if (map.containsKey(key)) {\n            Node node = map.get(key);\n            node.value = value;\n            moveToHead(node);\n        } else {\n            if (map.size() >= capacity) {\n                // Evict LRU node right before sentinel tail\n                Node lru = tail.prev;\n                removeNode(lru);\n                map.remove(lru.key);\n            }\n            Node newNode = new Node(key, value);\n            map.put(key, newNode);\n            addToHead(newNode);\n        }\n    }\n\n    private void removeNode(Node node) {\n        node.prev.next = node.next;\n        node.next.prev = node.prev;\n    }\n\n    private void addToHead(Node node) {\n        node.next = head.next;\n        node.prev = head;\n        head.next.prev = node;\n        head.next = node;\n    }\n\n    private void moveToHead(Node node) {\n        removeNode(node);\n        addToHead(node);\n    }\n}",
          "explanation": "Sentinel head and tail nodes avoid null pointer checks when adding or removing elements at list boundaries."
        }
      ],
      "keyPoints": [
        "**Bitwise Index:** Uses `(n - 1) & hash` instead of `%` for single-cycle CPU speed.",
        "**Java 8 Treeification:** Bucket collision chains $\\ge 8$ convert to Red-Black Trees.",
        "**LRU Architecture:** Combines `HashMap` (for $O(1)$ search) with `Doubly Linked List` (for $O(1)$ head/tail reordering)."
      ],
      "interviewQA": [
        {
          "question": "What happens if you use a Mutable Object as a HashMap key and mutate it after insertion?",
          "shortAnswer": "The object's hashCode() changes, causing future get() calls to search in the wrong bucket. The original value becomes permanently unreachable, creating a silent Memory Leak.",
          "detailedAnswer": "When `map.put(key, value)` is called, the key's hash places it at Bucket X. If you alter a field inside `key`, its `hashCode()` recalculates to a new value. When you later invoke `map.get(key)`, HashMap computes the new hash and searches Bucket Y, which is empty (returns null). The entry still resides in Bucket X, trapped in memory.",
          "followUps": [
            "Why is String the most popular HashMap key in Java?",
            "Answer: Strings are immutable and cache their hashCode after first calculation, guaranteeing safety and speed."
          ]
        }
      ],
      "quiz": [
        {
          "question": "In Java 8, when does a HashMap bucket linked list convert into a balanced Red-Black Tree?",
          "options": [
            "Whenever capacity exceeds 16",
            "When the bucket collision chain length reaches 8 and total table capacity is at least 64",
            "Whenever load factor reaches 0.75",
            "Only on multi-core processors"
          ],
          "correct": 1,
          "explanation": "TREEIFY_THRESHOLD (8) and MIN_TREEIFY_CAPACITY (64) trigger treeification to defend against denial-of-service hash collision attacks."
        }
      ]
    },
    {
      "id": "dsa-trees-heaps-graphs",
      "title": "4. Non-Linear Structures: Trees, Heaps & Graphs",
      "subtitle": "BST invariants, tree traversals, binary heap indices & graph representations",
      "whatIsIt": "Non-linear data structures organize elements hierarchically or interconnectedly. Trees represent hierarchical parent-child relationships, Heaps maintain priority order, and Graphs represent arbitrary networks of vertices connected by edges.",
      "whyNeedIt": "Hierarchical data like file systems, DOM trees, organizational charts, routing algorithms, and Top-K priority queues cannot be represented cleanly in flat linear arrays.",
      "howItWorks": [
        "**Binary Search Tree (BST):** For every node, all keys in the left subtree are smaller (`<`), and all keys in the right subtree are greater (`>`). Average search is $O(\\log n)$; worst-case degenerates to $O(n)$ if inserted in sorted order.",
        "**Tree Traversals:**\n  - **Inorder (Left, Root, Right):** Produces elements in **sorted ascending order** for BSTs.\n  - **Preorder (Root, Left, Right):** Ideal for cloning or serializing trees.\n  - **Postorder (Left, Right, Root):** Ideal for bottom-up deletion or directory disk size calculation.\n  - **Level-Order (BFS):** Explores tree layer-by-layer using a Queue.",
        "**Binary Heap Array Mapping:** Stored compactly in an array without pointers! For node at index $i$:\n  - Left child = $2i + 1$\n  - Right child = $2i + 2$\n  - Parent = $(i - 1) / 2$",
        "**Graph Representations:**\n  - **Adjacency Matrix (`int[][]`):** $O(1)$ edge lookup, but consumes $O(V^2)$ space (wasteful for sparse graphs).\n  - **Adjacency List (`Map<V, List<V>>`):** Consumes $O(V + E)$ space, industry standard for sparse real-world graphs."
      ],
      "realWorldExample": "**Company Hierarchy & Priority Flight Boarding:**\n- **Tree:** The CEO is the root. Below are Vice Presidents, Directors, and Engineers.\n- **Heap:** A hospital emergency room triage where patients with critical injuries are treated first regardless of arrival time.\n- **Graph:** Facebook social network where users are vertices and friendships are undirected edges.",
      "diagram": "<svg viewBox=\"0 0 740 220\" class=\"responsive-svg\">\n        <rect x=\"20\" y=\"20\" width=\"700\" height=\"180\" rx=\"14\" fill=\"#1e293b\" stroke=\"#334155\" stroke-width=\"2\"/>\n        <text x=\"180\" y=\"45\" fill=\"#60a5fa\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">BINARY HEAP ARRAY MAPPING</text>\n        <g transform=\"translate(60, 65)\">\n          <circle cx=\"100\" cy=\"20\" r=\"18\" fill=\"#0f172a\" stroke=\"#3b82f6\" stroke-width=\"2\"/>\n          <text x=\"100\" y=\"25\" fill=\"#ffffff\" font-size=\"11\" text-anchor=\"middle\">50 [0]</text>\n          <line x1=\"88\" y1=\"35\" x2=\"60\" y2=\"60\" stroke=\"#94a3b8\" stroke-width=\"1.5\"/>\n          <circle cx=\"50\" cy=\"75\" r=\"18\" fill=\"#0f172a\" stroke=\"#3b82f6\" stroke-width=\"2\"/>\n          <text x=\"50\" y=\"80\" fill=\"#ffffff\" font-size=\"11\" text-anchor=\"middle\">30 [1]</text>\n          <line x1=\"112\" y1=\"35\" x2=\"140\" y2=\"60\" stroke=\"#94a3b8\" stroke-width=\"1.5\"/>\n          <circle cx=\"150\" cy=\"75\" r=\"18\" fill=\"#0f172a\" stroke=\"#3b82f6\" stroke-width=\"2\"/>\n          <text x=\"150\" y=\"80\" fill=\"#ffffff\" font-size=\"11\" text-anchor=\"middle\">20 [2]</text>\n          <text x=\"100\" y=\"125\" fill=\"#94a3b8\" font-size=\"10\" text-anchor=\"middle\">Parent = (i - 1)/2 | Left = 2i + 1</text>\n        </g>\n        <text x=\"540\" y=\"45\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">GRAPH: ADJACENCY LIST</text>\n        <g transform=\"translate(420, 65)\">\n          <text x=\"20\" y=\"25\" fill=\"#6ee7b7\" font-size=\"11\" font-family=\"monospace\">Node A ──► [B, C]</text>\n          <text x=\"20\" y=\"55\" fill=\"#6ee7b7\" font-size=\"11\" font-family=\"monospace\">Node B ──► [A, D]</text>\n          <text x=\"20\" y=\"85\" fill=\"#6ee7b7\" font-size=\"11\" font-family=\"monospace\">Node C ──► [A, D]</text>\n          <text x=\"20\" y=\"115\" fill=\"#6ee7b7\" font-size=\"11\" font-family=\"monospace\">Node D ──► [B, C]</text>\n        </g>\n      </svg>",
      "diagramCaption": "Binary heaps eliminate pointer overhead by mapping tree nodes into array indices. Graphs use Adjacency Lists to minimize memory.",
      "keyPoints": [
        "**Inorder on BST:** Always traverses keys in strictly ascending sorted order.",
        "**Heap Array Formula:** Index $i$ has children at $2i + 1$ and $2i + 2$, and parent at $(i - 1)/2$.",
        "**Top-K Pattern:** To find Top $K$ largest elements, maintain a **Min-Heap of size $K$** ($O(n \\log K)$ time)."
      ],
      "interviewQA": [
        {
          "question": "Why does finding the Top K largest elements in a stream of N numbers use a MIN-heap instead of a MAX-heap?",
          "shortAnswer": "A Min-Heap of size K keeps the Kth largest element at the root. Any incoming number smaller than the root is ignored; larger numbers replace the root, keeping space constrained to O(K).",
          "detailedAnswer": "If you used a Max-Heap, you would have to store all $N$ numbers ($O(N)$ space). With a Min-Heap of size $K$, the root is always the smallest among the top $K$. When a new number arrives: if it is larger than the root, pop the root and push the new number. Heap maintenance takes $O(\\log K)$ time, resulting in an optimal $O(N \\log K)$ overall runtime.",
          "followUps": [
            "What is the time complexity of building a heap from an array of N elements?",
            "Answer: O(N) using bottom-up sift-down, NOT O(N log N)."
          ]
        }
      ],
      "quiz": [
        {
          "question": "Given a 0-indexed binary heap array, what is the array index of the left child of the node at index 3?",
          "options": [
            "6",
            "7",
            "8",
            "5"
          ],
          "correct": 1,
          "explanation": "Left child formula is 2*i + 1. For i = 3: 2(3) + 1 = 7."
        }
      ]
    },
    {
      "id": "dsa-algorithms-sorting",
      "title": "5. Algorithmic Patterns & Sorting Comparisons",
      "subtitle": "Binary search loop invariants, sorting trade-offs & two-pointer patterns",
      "whatIsIt": "Core algorithmic patterns are reusable templates for solving computational problems. The most critical interview patterns are Binary Search, Two Pointers, Sliding Window, Fast & Slow Pointers, and divide-and-conquer sorting algorithms.",
      "whyNeedIt": "Interview questions test your ability to recognize these underlying patterns. Transforming a brute-force $O(n^2)$ two-pointer problem into a single-pass $O(n)$ solution is the primary benchmark of senior engineering competence.",
      "howItWorks": [
        "**Binary Search Invariant:** Search space is halved each step. Prevent integer overflow when computing mid via `mid = left + (right - left) / 2` instead of `(left + right) / 2`.",
        "**Two Pointers (Converging):** Used on sorted arrays. Left pointer at 0, right pointer at $n - 1$, moving toward each other based on comparison ($O(n)$ time).",
        "**Sliding Window:** Tracks contiguous subarrays. Expand the `right` pointer to add elements; contract the `left` pointer when window constraints are violated.",
        "**Sorting Algorithms Trade-Offs:**\n  - **Quick Sort:** $O(n \\log n)$ average, in-place, cache-friendly (used for primitives in Java).\n  - **Merge Sort:** Guaranteed $O(n \\log n)$, stable, but requires $O(n)$ auxiliary space.\n  - **TimSort:** Hybrid Merge/Insertion sort used in Java for objects (`String[]`), guarantees stability and $O(n)$ best-case on partially sorted data."
      ],
      "comparisonTable": {
        "headers": [
          "Sorting Algorithm",
          "Best Time",
          "Average Time",
          "Worst Time",
          "Space Complexity",
          "Stable?",
          "In-Place?"
        ],
        "rows": [
          [
            "**Merge Sort**",
            "$O(n \\log n)$",
            "$O(n \\log n)$",
            "$O(n \\log n)$",
            "$O(n)$",
            "**Yes**",
            "No"
          ],
          [
            "**Quick Sort**",
            "$O(n \\log n)$",
            "$O(n \\log n)$",
            "$O(n^2)$",
            "$O(\\log n)$",
            "No",
            "**Yes**"
          ],
          [
            "**Heap Sort**",
            "$O(n \\log n)$",
            "$O(n \\log n)$",
            "$O(n \\log n)$",
            "$O(1)$",
            "No",
            "**Yes**"
          ],
          [
            "**TimSort (Java Objects)**",
            "$O(n)$",
            "$O(n \\log n)$",
            "$O(n \\log n)$",
            "$O(n)$",
            "**Yes**",
            "No"
          ],
          [
            "**Insertion Sort**",
            "$O(n)$",
            "$O(n^2)$",
            "$O(n^2)$",
            "$O(1)$",
            "**Yes**",
            "**Yes**"
          ]
        ]
      },
      "keyPoints": [
        "**Integer Overflow:** Always compute mid as `left + (right - left) / 2`.",
        "**Stable Sorting:** A sort is stable if it preserves the original relative order of elements with equal keys.",
        "**Pattern Recognition:** 'Contiguous subarray' $\\rightarrow$ Sliding Window; 'Sorted array pair' $\\rightarrow$ Two Pointers."
      ],
      "interviewQA": [
        {
          "question": "Why does Java use Dual-Pivot Quicksort for primitives (int[]) but TimSort for objects (String[])?",
          "shortAnswer": "Primitives do not care about stability, so Dual-Pivot Quicksort maximizes raw CPU cache throughput in-place. Object sorting requires Stability to avoid scrambling prior sort criteria.",
          "detailedAnswer": "If you sort a list of Employees first by Name and then by Department, a stable sort guarantees that employees within the same department remain alphabetically sorted by name. Merge Sort / TimSort is stable. Quicksort is inherently unstable. Furthermore, TimSort runs in $O(n)$ time on already-sorted or nearly-sorted data by exploiting natural runs.",
          "followUps": [
            "What is an in-place sorting algorithm?",
            "Answer: An algorithm that transforms input without allocating auxiliary arrays (using at most O(log n) stack space)."
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why is mid = left + (right - left) / 2 preferred over mid = (left + right) / 2 in Binary Search?",
          "options": [
            "It executes in fewer CPU cycles",
            "It prevents integer overflow when left + right exceeds Integer.MAX_VALUE (2,147,483,647)",
            "It works on negative numbers only",
            "It enables floating point division"
          ],
          "correct": 1,
          "explanation": "In large arrays, left + right can exceed 2³¹ - 1, overflowing into a negative number and causing an ArrayIndexOutOfBoundsException."
        }
      ]
    },
    {
      "id": "dsa-classic-problems",
      "title": "6. Must-Know Classic Coding Problems (Full Java Code)",
      "subtitle": "Two Sum, Valid Parentheses, Longest Substring, Reverse List, Cycle Detection & Level Order",
      "whatIsIt": "A deep dive into the 6 most frequently asked technical coding problems across FAANG and enterprise software engineering internship interviews, with complete Java implementations and complexity analysis.",
      "whyNeedIt": "These 6 classic problems embody the fundamental patterns (Hash Lookup, Monotonic Stack, Sliding Window, Pointer Manipulation, Fast/Slow Pointers, and BFS) tested in 90% of live coding rounds.",
      "howItWorks": [
        "1. **Two Sum:** $O(n)$ one-pass HashMap storing `complement = target - nums[i]`.",
        "2. **Valid Parentheses:** $O(n)$ Stack pushing matching closing brackets on opening characters.",
        "3. **Longest Substring Without Repeating:** $O(n)$ Sliding Window with HashMap storing last seen indices.",
        "4. **Reverse Linked List:** $O(n)$ iterative 3-pointer (`prev`, `curr`, `next`) in-place reversal.",
        "5. **Detect Cycle (Floyd's Tortoise & Hare):** $O(n)$ time and $O(1)$ space using fast (2x) and slow (1x) pointers.",
        "6. **Binary Tree Level-Order Traversal:** $O(n)$ BFS using a Queue tracking `levelSize`."
      ],
      "codeBlocks": [
        {
          "title": "TwoSum.java (O(n) Time, O(n) Space)",
          "lang": "java",
          "code": "import java.util.HashMap;\nimport java.util.Map;\n\npublic class TwoSum {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        throw new IllegalArgumentException(\"No two sum solution\");\n    }\n}",
          "explanation": "By querying the map for the complement (target - current), we achieve O(1) lookups instead of an O(n²) nested loop."
        },
        {
          "title": "ValidParentheses.java (O(n) Time, O(n) Space)",
          "lang": "java",
          "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\npublic class ValidParentheses {\n    public boolean isValid(String s) {\n        Deque<Character> stack = new ArrayDeque<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') stack.push(')');\n            else if (c == '{') stack.push('}');\n            else if (c == '[') stack.push(']');\n            else {\n                if (stack.isEmpty() || stack.pop() != c) return false;\n            }\n        }\n        return stack.isEmpty();\n    }\n}",
          "explanation": "Clever pattern: push the expected CLOSING bracket onto the stack. When closing bracket arrives, verify stack.pop() == c."
        },
        {
          "title": "ReverseLinkedList.java (O(n) Time, O(1) Space)",
          "lang": "java",
          "code": "public class ReverseLinkedList {\n    public static class ListNode {\n        int val;\n        ListNode next;\n        ListNode(int val) { this.val = val; }\n    }\n\n    public ListNode reverseList(ListNode head) {\n        ListNode prev = null;\n        ListNode curr = head;\n        while (curr != null) {\n            ListNode nextTemp = curr.next; // 1. Save next\n            curr.next = prev;              // 2. Reverse pointer\n            prev = curr;                   // 3. Advance prev\n            curr = nextTemp;               // 4. Advance curr\n        }\n        return prev;\n    }\n}",
          "explanation": "Reverses pointers in place using 3 pointer variables without allocating new node memory."
        },
        {
          "title": "LinkedListCycle.java (Floyd's Tortoise & Hare - O(n) Time, O(1) Space)",
          "lang": "java",
          "code": "public class LinkedListCycle {\n    public static class ListNode {\n        int val;\n        ListNode next;\n        ListNode(int val) { this.val = val; }\n    }\n\n    public boolean hasCycle(ListNode head) {\n        if (head == null || head.next == null) return false;\n        ListNode slow = head;\n        ListNode fast = head;\n        while (fast != null && fast.next != null) {\n            slow = slow.next;         // 1 step\n            fast = fast.next.next;    // 2 steps\n            if (slow == fast) return true; // Collision confirms cycle!\n        }\n        return false;\n    }\n}",
          "explanation": "If a cycle exists, the fast pointer loops around and collides with the slow pointer, avoiding O(n) HashSet memory."
        }
      ],
      "keyPoints": [
        "**Two Sum:** HashMap trade-offs space for $O(n)$ time.",
        "**Parentheses:** ArrayDeque is the standard stack implementation.",
        "**Cycle Detection:** Floyd's algorithm achieves $O(1)$ space by leveraging speed differentials."
      ],
      "quiz": [
        {
          "question": "In Floyd's Cycle-Finding Algorithm, how much auxiliary space is consumed to detect a cycle in a linked list?",
          "options": [
            "O(n) space",
            "O(log n) space",
            "O(1) constant space",
            "O(n²) space"
          ],
          "correct": 2,
          "explanation": "Floyd's algorithm uses only two pointer references (slow and fast), requiring strict O(1) auxiliary space."
        }
      ]
    },
    {
      "id": "dsa-interview-qa",
      "title": "7. Deep-Dive Technical Interview Questions (The Full 8)",
      "subtitle": "Cache locality, mathematical proofs & algorithmic subtleties",
      "whatIsIt": "Comprehensive walkthrough of the top 8 tricky algorithmic interview questions covering JVM sort mechanisms, heap construction mathematical proofs, and graph traversal trade-offs.",
      "whyNeedIt": "Interviewers frequently pivot from coding into theoretical follow-ups. Knowing the underlying math and runtime decisions demonstrates senior architectural intuition.",
      "interviewQA": [
        {
          "question": "Q1: Why is Quick Sort often faster than Merge Sort for arrays in practice, despite its O(n²) worst case?",
          "shortAnswer": "Due to Cache Locality (in-place contiguous memory reads) and Zero Memory Allocation overhead (no auxiliary heap arrays).",
          "detailedAnswer": "Quick Sort partitions in-place, reading sequential memory that maximizes CPU L1/L2 cache prefetching. Merge Sort allocates auxiliary arrays of size O(n) on every merge, causing memory allocator overhead and frequent CPU cache misses. Modern dual-pivot implementations make worst-case O(n²) virtually impossible on real data."
        },
        {
          "question": "Q2: When should you choose BFS over DFS and vice versa?",
          "shortAnswer": "Choose BFS for shortest paths in unweighted graphs or level-by-level exploration. Choose DFS for exhaustive backtracking (sudoku, mazes), cycle detection, topological sorting, and memory-constrained deep trees.",
          "detailedAnswer": "BFS consumes O(b^d) memory where b is branching factor and d is depth (wide trees explode queue size). DFS consumes only O(d) call stack space, making it vastly more memory efficient for deep trees when finding any valid solution rather than the shortest path."
        },
        {
          "question": "Q3: Why shouldn't you use a Mutable Object as a HashMap key?",
          "shortAnswer": "Mutating key fields changes its hashCode(). Subsequent get() operations compute a new hash and look in the wrong bucket, making the entry permanently unreachable and leaking memory.",
          "detailedAnswer": "HashMap relies on hashCode() remaining stable throughout the object's presence in the map. If a field used in hashCode() is changed, the bucket index calculated on get() will not match the bucket where the node was inserted. The original node remains stranded on the heap."
        },
        {
          "question": "Q4: How do you implement a Queue using two Stacks? What is the amortized cost?",
          "shortAnswer": "Push to inStack. Pop from outStack. If outStack is empty, transfer all elements from inStack to outStack (reversing order). Amortized cost is O(1) per operation.",
          "detailedAnswer": "Every element is pushed to inStack once, transferred to outStack once, and popped from outStack once (3 operations per item). Across N elements, total operations are 3N, yielding an amortized time of 3N / N = O(1) constant time."
        },
        {
          "question": "Q5: Why is building a Heap from an array O(n) while inserting elements one-by-one is O(n log n)?",
          "shortAnswer": "Bottom-up buildHeap uses sift-down: half the nodes are leaves requiring 0 work. The summation of (nodes at height h * h) converges mathematically to O(n).",
          "detailedAnswer": "Inserting one by one inserts at leaves, forcing n/2 nodes to sift UP the full tree height log n (O(n log n)). Bottom-up heapify runs sift-down from the lowest internal nodes. Summing n/2^(h+1) * h for h=0 to log n converges to n * sum(h/2^h) = n * 2 = O(n)."
        },
        {
          "question": "Q6: Why is Binary Search on a Linked List O(n) even if sorted?",
          "shortAnswer": "Because linked lists do not support O(1) random access. Finding the middle node requires sequential pointer traversal in O(n/2) time.",
          "detailedAnswer": "Recurrence relation for binary search on an array is T(n) = T(n/2) + O(1) = O(log n). On a linked list, locating the midpoint takes O(n/2) pointer steps, giving T(n) = T(n/2) + O(n) which solves to O(n)."
        },
        {
          "question": "Q7: What is the mathematical proof for Floyd's Cycle Algorithm finding the cycle start node?",
          "shortAnswer": "Let L1 be head-to-cycle distance and d be cycle-start-to-collision distance. Since Fast travels twice as far as Slow: 2(L1 + d) = L1 + k*C + d => L1 = k*C - d. Resetting slow to head and moving both at 1 step guarantees they meet at the cycle start.",
          "detailedAnswer": "Slow travels L1 + d. Fast travels L1 + k*C + d. Because fast speed is 2x: 2(L1 + d) = L1 + k*C + d, simplifying to L1 = k*C - d. The remaining distance from collision point to cycle start is C - d. Therefore, a pointer starting at head (distance L1) and a pointer starting at collision point (distance C - d) moving at 1 step/iteration will collide exactly at the cycle entrance."
        },
        {
          "question": "Q8: How does Java's Arrays.sort() work internally?",
          "shortAnswer": "For primitives (int[]): Dual-Pivot Quicksort (fastest cache throughput). For objects (String[]): TimSort (hybrid Merge/Insertion sort guaranteeing stability).",
          "detailedAnswer": "Dual-pivot Quicksort partitions an array into 3 segments using 2 pivots, reducing comparison and assignment operations. TimSort analyzes data for natural sorted runs, merges runs using minimal memory, and guarantees O(n) best-case time when data is already sorted."
        }
      ],
      "keyPoints": [
        "**Cache Locality:** Explains why Quicksort outperforms Mergesort for arrays.",
        "**Queue with 2 Stacks:** Demonstrates amortized O(1) efficiency.",
        "**Floyd's Proof:** Remember L1 = k*C - d."
      ],
      "quiz": [
        {
          "question": "What is the time complexity of building a binary heap from an unsorted array of n elements using bottom-up heapify?",
          "options": [
            "O(n log n)",
            "O(n)",
            "O(log n)",
            "O(n²)"
          ],
          "correct": 1,
          "explanation": "Bottom-up heapify runs sift-down on internal nodes, mathematically converging to O(n) linear time."
        }
      ]
    },
    {
      "id": "dsa-cheat-sheet",
      "title": "8. Two-Minute Pre-Interview Revision Cheat Sheet",
      "subtitle": "Pattern recognition guide & master Big-O complexity tables",
      "whatIsIt": "High-density pattern recognition matrix and complexity reference table designed for rapid revision right before your technical interview.",
      "whyNeedIt": "Quickly maps problem clues (e.g. 'Top K', 'Contiguous Subarray') to the optimal data structure and algorithm.",
      "cheatSheet": {
        "items": [
          {
            "term": "Top K / Extreme Elements",
            "desc": "Use a **Min-Heap (PriorityQueue)** of size $K$ $\\implies O(n \\log K)$ time and $O(K)$ space."
          },
          {
            "term": "Contiguous Subarray Max/Min",
            "desc": "Use **Sliding Window** (expand right pointer, contract left when invalid)."
          },
          {
            "term": "Sorted Array Pair / Triplet",
            "desc": "Use **Two Pointers** (converging from left = 0 and right = n - 1) $\\implies O(n)$."
          },
          {
            "term": "Shortest Path in Unweighted Graph",
            "desc": "Use **Breadth-First Search (BFS)** with a Queue $\\implies O(V + E)$."
          },
          {
            "term": "Exhaustive Search / All Subsets",
            "desc": "Use **Backtracking (DFS)** (Choose $\\rightarrow$ Explore $\\rightarrow$ Unchoose)."
          },
          {
            "term": "Cycle in Linked List",
            "desc": "Use **Floyd's Tortoise and Hare** (slow 1x, fast 2x) $\\implies O(n)$ time, $O(1)$ space."
          },
          {
            "term": "Next Greater Element",
            "desc": "Use a **Monotonic Stack** $\\implies O(n)$ single-pass."
          },
          {
            "term": "Search in Rotated Sorted Array",
            "desc": "Use **Modified Binary Search** $\\implies O(\\log n)$."
          },
          {
            "term": "HashMap Internal Indexing",
            "desc": "Computes `(n - 1) & hash` in single CPU cycle; converts to Red-Black tree at chain length $\\ge 8$."
          },
          {
            "term": "LRU Cache Architecture",
            "desc": "Combines `HashMap<Key, Node>` for $O(1)$ lookup with `Doubly Linked List` for $O(1)$ MRU/LRU updates."
          }
        ]
      },
      "keyPoints": [
        "**Clue Mapping:** Link problem keywords directly to algorithmic patterns.",
        "**Space Invariant:** Strive for in-place pointer algorithms ($O(1)$ space) where feasible.",
        "**HashMap Contract:** Always override hashCode() whenever overriding equals()."
      ],
      "quiz": [
        {
          "question": "Which algorithmic pattern is optimal for finding the longest contiguous subarray with sum at most K in an array of positive integers?",
          "options": [
            "Binary Search",
            "Sliding Window",
            "Monotonic Stack",
            "Floyd's Cycle Algorithm"
          ],
          "correct": 1,
          "explanation": "Sliding Window is optimal for contiguous subarray problems, running in O(n) time."
        }
      ]
    }
  ],
  "flashcards": [
    {
      "term": "HashMap Bitwise Index Formula",
      "category": "Data Structures",
      "question": "Why does Java HashMap compute index using '(n - 1) & hash' instead of 'hash % n'?",
      "answer": "Because table capacity n is always a power of 2. For powers of 2, bitwise AND produces the exact same result as modulo division, but executes in a single CPU cycle.",
      "tip": "(capacity - 1) & hash == hash % capacity."
    },
    {
      "term": "Java 8 Treeification",
      "category": "HashMap Internals",
      "question": "When does a HashMap bucket linked list convert into a Red-Black Tree?",
      "answer": "When a bucket's collision chain length reaches >= 8 (TREEIFY_THRESHOLD) and total table capacity is >= 64, dropping worst-case lookup from O(n) to O(log n).",
      "tip": "Length >= 8 and Capacity >= 64."
    },
    {
      "term": "LRU Cache Architecture",
      "category": "System Design",
      "question": "What two data structures combine to build an O(1) LRU Cache?",
      "answer": "A HashMap (for O(1) key lookup) and a Doubly Linked List with sentinel head/tail nodes (for O(1) MRU promotion and LRU eviction).",
      "tip": "HashMap + Doubly Linked List."
    },
    {
      "term": "Floyd's Cycle-Finding",
      "category": "Algorithms",
      "question": "How does Floyd's Tortoise and Hare detect cycles in O(1) space?",
      "answer": "Slow pointer advances 1 node per step; fast pointer advances 2 nodes. If a cycle exists, the fast pointer loops around and collides with the slow pointer.",
      "tip": "Slow 1x, Fast 2x -> Collision = Cycle."
    }
  ]
};
