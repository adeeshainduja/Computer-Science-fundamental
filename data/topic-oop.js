// Topic 1: Object-Oriented Programming (OOP) & Design Principles
var topicOOP = window.topicOOP = {
  "id": "oop",
  "title": "Object-Oriented Programming (OOP) & Design Principles",
  "shortTitle": "OOP & Design",
  "icon": "🧩",
  "badge": "Core Software Architecture",
  "readingTime": "45 min masterclass",
  "description": "Master enterprise software engineering design from first principles: the 4 Pillars of OOP, Invariant Protection, Dynamic Method Dispatch, Abstract Classes vs. Interfaces, Object Relationships, the 5 SOLID Principles with Bad vs. Good Java code, 5 GoF Design Patterns, and 10 deep-dive technical interview questions.",
  "learningObjectives": [
    "Deeply understand Encapsulation as Invariant Protection, not just trivial getters/setters",
    "Differentiate Abstraction (Contracts) from Encapsulation (Data Shielding) and analyze trade-offs",
    "Trace Constructor Chaining, tight coupling, and the Fragile Base Class problem in Inheritance",
    "Master Polymorphism: Static vs. Dynamic Binding, Dynamic Method Dispatch, vtables, and Covariant Returns",
    "Compare Abstract Classes vs. Interfaces (State, Constructors, vtable vs. itable, Java 8/9 evolution, Diamond Problem)",
    "Analyze Object Relationships: Association, Aggregation, Composition, and why engineers favor Composition over Inheritance",
    "Implement and refactor all 5 SOLID Principles (SRP, OCP, LSP, ISP, DIP) with complete Bad vs. Good Java code",
    "Implement production-ready Singleton (Double-Checked Locking with volatile), Factory, Builder, Strategy, and Observer patterns",
    "Confidently answer 10 complex architectural interview questions with 30-second and deep technical answers"
  ],
  "lessons": [
    {
      "id": "oop-encapsulation",
      "title": "1. Encapsulation & Invariant Protection",
      "subtitle": "Data hiding, business rule validation & why public fields are dangerous",
      "whatIsIt": "Encapsulation is the fundamental OOP mechanism of bundling data fields and the methods that operate on that data into a single class, while strictly restricting direct external access to internal state using access modifiers (private, protected).",
      "whyNeedIt": "If class fields are public, any external code can mutate an object into an invalid state (e.g. setting bank balance to -$5,000 or user age to -20). This corrupted state is called a **broken invariant**. Encapsulation guarantees that internal state can only change through authorized methods that enforce business validation rules.",
      "howItWorks": [
        "**Private State:** Fields are marked `private` so outside classes cannot alter them directly.",
        "**Constructor Invariant Validation:** Constructors reject invalid arguments immediately (`throw new IllegalArgumentException()`), preventing corrupt objects from ever existing on the heap.",
        "**Controlled Mutation:** State-changing methods (`deposit()`, `withdraw()`) validate inputs before altering fields.",
        "**Controlled Read Access:** Public getters return primitive values or defensive copies of mutable objects, preventing external tampering."
      ],
      "realWorldExample": "**A Sealed Medicinal Capsule:**\nInside a medicinal capsule are precise chemical granules. The gelatin outer shell protects them from environmental contamination. Patients receive the medical benefit without touching, altering, or spilling the chemical powder directly. Similarly, in a `BankAccount`, balance changes must pass through validated methods.",
      "diagram": "<svg viewBox=\"0 0 740 220\" class=\"responsive-svg\">\n        <rect x=\"20\" y=\"20\" width=\"700\" height=\"180\" rx=\"14\" fill=\"#1e293b\" stroke=\"#334155\" stroke-width=\"2\"/>\n        <rect x=\"50\" y=\"50\" width=\"280\" height=\"120\" rx=\"10\" fill=\"#0f172a\" stroke=\"#ef4444\" stroke-width=\"2\" stroke-dasharray=\"4,4\"/>\n        <text x=\"190\" y=\"80\" fill=\"#f87171\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">WITHOUT ENCAPSULATION</text>\n        <text x=\"70\" y=\"108\" fill=\"#94a3b8\" font-size=\"12\" font-family=\"monospace\">public double balance;</text>\n        <text x=\"70\" y=\"132\" fill=\"#fca5a5\" font-size=\"12\">account.balance = -999999;</text>\n        <text x=\"70\" y=\"154\" fill=\"#ef4444\" font-size=\"11\">❌ Broken Invariant! Corrupt state!</text>\n        <rect x=\"390\" y=\"50\" width=\"310\" height=\"120\" rx=\"10\" fill=\"#0f172a\" stroke=\"#10b981\" stroke-width=\"2\"/>\n        <text x=\"545\" y=\"80\" fill=\"#34d399\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">WITH ENCAPSULATION</text>\n        <text x=\"410\" y=\"108\" fill=\"#94a3b8\" font-size=\"12\" font-family=\"monospace\">private double balance;</text>\n        <text x=\"410\" y=\"132\" fill=\"#6ee7b7\" font-size=\"12\">account.withdraw(500); // validated!</text>\n        <text x=\"410\" y=\"154\" fill=\"#10b981\" font-size=\"11\">✓ Invariant Protected: balance &gt;= 0</text>\n      </svg>",
      "diagramCaption": "Encapsulation builds a protective barrier around data fields, ensuring business invariants cannot be broken by unauthorized external code.",
      "technicalExplanation": "In professional software architecture, interviewers do not want to hear that Encapsulation is merely about writing getters and setters. Trivial getters and setters that expose mutable internal state break encapsulation just as easily as public fields! The true architectural objective is <strong>Invariant Protection</strong>: ensuring that all business axioms (e.g., account balance must never fall below an approved overdraft limit, order status must transition through valid states) remain strictly guaranteed throughout the object's entire lifecycle in memory.",
      "internalMechanisms": "When a field is marked <code>private</code>, the Java compiler enforces access restrictions at compile time. At runtime, memory layout stores private and public fields identically on the heap, but byte-code instructions emit <code>putfield</code> and <code>getfield</code> with access check assertions. Encapsulation also provides thread synchronization boundaries (using <code>synchronized</code> methods or locks) to protect invariant consistency across concurrent threads.",
      "codeBlocks": [
        {
          "title": "BankAccount.java (Production-Grade Invariant Protection)",
          "lang": "java",
          "code": "public class BankAccount {\n    // 1. Data Hiding: Private fields cannot be accessed directly from outside\n    private final String accountNumber;\n    private double balance;\n\n    public BankAccount(String accountNumber, double initialDeposit) {\n        if (accountNumber == null || accountNumber.isBlank()) {\n            throw new IllegalArgumentException(\"Account number cannot be empty\");\n        }\n        if (initialDeposit < 0) {\n            throw new IllegalArgumentException(\"Initial deposit cannot be negative\");\n        }\n        this.accountNumber = accountNumber;\n        this.balance = initialDeposit;\n    }\n\n    // 2. Invariant Protection: Business rules validate state before updates\n    public synchronized void deposit(double amount) {\n        if (amount <= 0) {\n            throw new IllegalArgumentException(\"Deposit amount must be positive\");\n        }\n        this.balance += amount;\n    }\n\n    public synchronized void withdraw(double amount) {\n        if (amount <= 0) {\n            throw new IllegalArgumentException(\"Withdrawal amount must be positive\");\n        }\n        if (amount > this.balance) {\n            throw new IllegalStateException(\"Insufficient funds! Current balance: \" + this.balance);\n        }\n        this.balance -= amount;\n    }\n\n    // Controlled Read-Only Access\n    public double getBalance() {\n        return this.balance;\n    }\n\n    public String getAccountNumber() {\n        return this.accountNumber;\n    }\n}",
          "explanation": "Notice how the constructor and mutation methods strictly prevent negative balances and empty account numbers. The fields cannot be modified without passing through business validation."
        }
      ],
      "simulation": {
        "id": "bank",
        "title": "BankAccount Invariant Protection Simulator",
        "description": "Test how Encapsulation protects the BankAccount invariant ($balance >= 0) against illegal transactions and unauthorized field modifications.",
        "buttons": [
          {
            "label": "Deposit $500",
            "action": "deposit"
          },
          {
            "label": "Withdraw $300 (Valid)",
            "action": "withdraw-valid"
          },
          {
            "label": "Withdraw -$100 (Invalid)",
            "action": "withdraw-invalid",
            "isDanger": true
          },
          {
            "label": "Direct Field Mutation (account.balance = -5000)",
            "action": "hack",
            "isDanger": true
          }
        ],
        "initialOutput": "Account initialized: Number = ACC-9842, Balance = $1,000.00. Ready to test invariants."
      },
      "keyPoints": [
        "**Primary Goal:** Encapsulation exists for **Invariant Protection**, not just boilerplate getters/setters.",
        "**Data Shielding:** Access modifiers (`private`, `protected`) restrict direct memory mutation.",
        "**Fail-Fast Validation:** Constructors and mutators throw `IllegalArgumentException` on invalid inputs.",
        "**Interview Keyphrase:** *\"Encapsulation bundles data and methods while restricting direct access to guarantee internal state consistency.\"*"
      ],
      "interviewQA": [
        {
          "question": "Is adding getters and setters to all private fields true encapsulation?",
          "shortAnswer": "No. Blindly generating public getters and setters for all fields is an anti-pattern known as an Anemic Domain Model. It exposes internal state and allows external code to control business logic.",
          "detailedAnswer": "If every field has a public setter, external callers can still mutate state arbitrarily, destroying invariant protection. True encapsulation means exposing meaningful domain behaviors (e.g. `withdraw()`, `promote()`, `cancelOrder()`) rather than raw property mutators. If an object is mutable, getters must return defensive copies to prevent external modification of internal collections or objects.",
          "followUps": [
            "How do immutable objects achieve encapsulation without setters?",
            "What is a defensive copy, and when should you return one from a getter?"
          ]
        }
      ],
      "quiz": [
        {
          "question": "What is the primary architectural purpose of Encapsulation in production software?",
          "options": [
            "To speed up CPU clock cycles",
            "To protect object invariants and ensure internal state consistency",
            "To eliminate the need for unit testing",
            "To automatically serialize objects to JSON"
          ],
          "correct": 1,
          "explanation": "Encapsulation safeguards business invariants by ensuring internal state can only be mutated through validated, authorized method channels."
        }
      ]
    },
    {
      "id": "oop-abstraction",
      "title": "2. Abstraction vs. Encapsulation & Contracts",
      "subtitle": "Hiding implementation complexity behind contracts & interfaces",
      "whatIsIt": "Abstraction is the process of exposing only the essential user-facing features of an entity (the contract / 'What it does') while completely hiding the complex, underlying implementation machinery (the 'How it does it') using Abstract Classes and Interfaces.",
      "whyNeedIt": "Without abstraction, client code would be tightly coupled to concrete implementation details (e.g. calling low-level Stripe REST API endpoints directly inside order checkout logic). If the payment vendor changes to PayPal or Adyen, the entire application breaks. Abstraction decouples the caller from the vendor.",
      "howItWorks": [
        "**Define the Contract:** Create an `interface` declaring abstract operations (e.g., `PaymentProcessor.processPayment(amount)`).",
        "**Implement Concrete Classes:** Different classes implement the contract in their own way (`StripePaymentProcessor`, `PayPalPaymentProcessor`).",
        "**Depend on Abstractions:** High-level services accept the interface type via Dependency Injection, ignoring the messy vendor SDK details."
      ],
      "realWorldExample": "**Driving a Motor Vehicle:**\nWhen driving a car, you interact with the steering wheel, accelerator pedal, and brake pedal (the Abstract Interface). You do NOT need to know how fuel injection valves spray gasoline inside the combustion chamber, or how the electronic transmission shifts gears (the Hidden Implementation). If you trade your gasoline car for an electric car, the accelerator pedal still accelerates the car!",
      "diagram": "<svg viewBox=\"0 0 740 220\" class=\"responsive-svg\">\n        <rect x=\"20\" y=\"20\" width=\"700\" height=\"180\" rx=\"14\" fill=\"#1e293b\" stroke=\"#334155\" stroke-width=\"2\"/>\n        <rect x=\"50\" y=\"55\" width=\"200\" height=\"110\" rx=\"8\" fill=\"#2563eb\" fill-opacity=\"0.2\" stroke=\"#3b82f6\" stroke-width=\"2\"/>\n        <text x=\"150\" y=\"85\" fill=\"#93c5fd\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">CLIENT LAYER</text>\n        <text x=\"150\" y=\"115\" fill=\"#ffffff\" font-size=\"12\" text-anchor=\"middle\">CheckoutService</text>\n        <text x=\"150\" y=\"140\" fill=\"#cbd5e1\" font-size=\"11\" text-anchor=\"middle\">calls process()</text>\n        <line x1=\"250\" y1=\"110\" x2=\"310\" y2=\"110\" stroke=\"#60a5fa\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/>\n        <rect x=\"310\" y=\"55\" width=\"200\" height=\"110\" rx=\"8\" fill=\"#7c3aed\" fill-opacity=\"0.2\" stroke=\"#8b5cf6\" stroke-width=\"2\"/>\n        <text x=\"410\" y=\"85\" fill=\"#c4b5fd\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">&lt;&lt;interface&gt;&gt;</text>\n        <text x=\"410\" y=\"115\" fill=\"#ffffff\" font-size=\"12\" text-anchor=\"middle\">PaymentProcessor</text>\n        <text x=\"410\" y=\"140\" fill=\"#cbd5e1\" font-size=\"11\" text-anchor=\"middle\">+process(double)</text>\n        <line x1=\"510\" y1=\"110\" x2=\"550\" y2=\"110\" stroke=\"#a78bfa\" stroke-width=\"2\"/>\n        <rect x=\"550\" y=\"45\" width=\"150\" height=\"60\" rx=\"6\" fill=\"#0f172a\" stroke=\"#10b981\" stroke-width=\"1.5\"/>\n        <text x=\"625\" y=\"70\" fill=\"#34d399\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">StripeProcessor</text>\n        <text x=\"625\" y=\"90\" fill=\"#94a3b8\" font-size=\"10\" text-anchor=\"middle\">HTTP / Stripe API</text>\n        <rect x=\"550\" y=\"115\" width=\"150\" height=\"60\" rx=\"6\" fill=\"#0f172a\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/>\n        <text x=\"625\" y=\"140\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">PayPalProcessor</text>\n        <text x=\"625\" y=\"160\" fill=\"#94a3b8\" font-size=\"10\" text-anchor=\"middle\">REST OAuth API</text>\n      </svg>",
      "diagramCaption": "Abstraction establishes clean interface boundaries. CheckoutService depends only on the PaymentProcessor interface, isolated from vendor-specific network implementations.",
      "technicalExplanation": "A favorite senior engineering interview trap is asking candidates to contrast Abstraction with Encapsulation. While both deal with 'hiding', their level of architectural design is completely different: Encapsulation is implemented at the <strong>implementation level</strong> (hiding internal fields and data layout using <code>private</code> to maintain consistency). Abstraction is executed at the <strong>design and contract level</strong> (hiding behavioral complexity behind <code>interface</code> definitions to achieve loose coupling).",
      "comparisonTable": {
        "headers": [
          "Dimension",
          "Encapsulation",
          "Abstraction"
        ],
        "rows": [
          [
            "**Core Focus**",
            "Data Shielding & Invariant Protection.",
            "Hiding implementation complexity & defining contracts."
          ],
          [
            "**Question Answered**",
            "*\"How is the object\\'s internal state kept safe and consistent?\"*",
            "*\"What operations can this entity perform from the caller\\'s view?\"*"
          ],
          [
            "**Mechanism**",
            "Access modifiers (`private`, `protected`), getters/setters, synchronized locks.",
            "Interfaces, abstract classes, abstract methods."
          ],
          [
            "**Architectural Scope**",
            "Implementation level (inside a single class).",
            "Design level (between collaborating services & modules)."
          ],
          [
            "**Mental Model**",
            "A padlock on a private vault.",
            "A user-friendly dashboard with buttons."
          ]
        ]
      },
      "codeBlocks": [
        {
          "title": "PaymentProcessor.java & Implementations (Clean Abstraction)",
          "lang": "java",
          "code": "// 1. The Abstract Contract: Defines WHAT needs to be done\npublic interface PaymentProcessor {\n    boolean process(double amount);\n}\n\n// 2. Concrete Implementation 1: Stripe\npublic class StripePaymentProcessor implements PaymentProcessor {\n    @Override\n    public boolean process(double amount) {\n        // Complex internal machinery: HTTP client, auth headers, retry policies\n        System.out.println(\"Connecting to Stripe API Gateway...\");\n        System.out.println(\"Processing credit card charge of $\" + amount);\n        return true;\n    }\n}\n\n// 3. Concrete Implementation 2: PayPal\npublic class PayPalPaymentProcessor implements PaymentProcessor {\n    @Override\n    public boolean process(double amount) {\n        System.out.println(\"Redirecting to PayPal OAuth sandbox...\");\n        System.out.println(\"Authorizing payment token for $\" + amount);\n        return true;\n    }\n}\n\n// 4. High-Level Consumer depends ONLY on the abstraction!\npublic class CheckoutService {\n    private final PaymentProcessor paymentProcessor;\n\n    // Injected via Constructor (Dependency Injection)\n    public CheckoutService(PaymentProcessor paymentProcessor) {\n        this.paymentProcessor = paymentProcessor;\n    }\n\n    public void completeOrder(double totalAmount) {\n        boolean success = paymentProcessor.process(totalAmount);\n        if (success) {\n            System.out.println(\"Order marked as PAID!\");\n        }\n    }\n}",
          "explanation": "CheckoutService does not know or care whether Stripe, PayPal, or a Mock test processor handles the payment. The interface abstracts away the network calls entirely."
        }
      ],
      "keyPoints": [
        "**Core Intent:** Abstraction focuses on **WHAT** an object does, hiding **HOW** it achieves it.",
        "**Abstraction vs. Encapsulation:** Abstraction = Contract & Interface; Encapsulation = Data Shielding & Invariant Protection.",
        "**Decoupling:** Enables Dependency Injection and easy mock testing in unit tests."
      ],
      "interviewQA": [
        {
          "question": "How would you explain the difference between Abstraction and Encapsulation to a junior developer?",
          "shortAnswer": "Encapsulation is data hiding at the code level to protect invariants (using private variables). Abstraction is complexity hiding at the architecture level using interfaces to establish contracts.",
          "detailedAnswer": "Think of your smartphone. Encapsulation is the physical water-resistant outer case that prevents you from touching the lithium-ion battery or short-circuiting the circuit board. Abstraction is the touchscreen operating system with icons (Camera, Phone, Messages) that allows you to take a photo without understanding the sensor's photoelectric pixel registers.",
          "followUps": [
            "Can a system have strong encapsulation without abstraction?",
            "How does abstraction enable the Open/Closed Principle (OCP)?"
          ]
        }
      ],
      "quiz": [
        {
          "question": "Which of the following statements accurately captures the difference between Abstraction and Encapsulation?",
          "options": [
            "Encapsulation is only for Java, while Abstraction is only for C++",
            "Encapsulation protects internal data consistency, while Abstraction hides complexity behind a contract",
            "Abstraction creates private variables, while Encapsulation creates interfaces",
            "There is no difference; they are identical concepts"
          ],
          "correct": 1,
          "explanation": "Encapsulation restricts direct access to internal state to protect invariants; Abstraction presents a simplified contract while hiding internal implementation mechanics."
        }
      ]
    },
    {
      "id": "oop-inheritance",
      "title": "3. Inheritance, Constructor Chaining & Pitfalls",
      "subtitle": "The IS-A relationship, super() mechanics & fragile base class dangers",
      "whatIsIt": "Inheritance is the mechanism by which a subclass (child) derives state and behavior from an existing superclass (parent) using the `extends` keyword, modeling a strict **IS-A** relationship (e.g., `SoftwareEngineer` IS-A `Employee`).",
      "whyNeedIt": "Inheritance allows sharing common attributes (e.g. `id`, `name`, `email`) and methods across related classes without duplicating code. However, overusing inheritance creates **Tight Coupling** and architectural fragility.",
      "howItWorks": [
        "**The `super()` Keyword:** The very first line of a child class constructor must call the parent constructor (`super(...)`), either explicitly or implicitly by the compiler.",
        "**Constructor Execution Order:** Parent constructors ALWAYS execute completely before the child constructor body runs. This ensures the base object state is fully initialized in memory before child fields are initialized.",
        "**Single Class Inheritance in Java:** Java does not allow a class to extend multiple classes (`class C extends A, B` is forbidden) to avoid state conflicts and the Diamond Problem."
      ],
      "realWorldExample": "**Company Organizational Hierarchy:**\nAn `Employee` superclass contains `id`, `name`, and `salary`. A `SoftwareEngineer` subclass inherits all these fields and adds specialized attributes like `githubUsername` and `programmingLanguages`. A `Manager` subclass inherits the same base fields and adds `teamSize`.",
      "diagram": "<svg viewBox=\"0 0 740 220\" class=\"responsive-svg\">\n        <rect x=\"20\" y=\"20\" width=\"700\" height=\"180\" rx=\"14\" fill=\"#1e293b\" stroke=\"#334155\" stroke-width=\"2\"/>\n        <rect x=\"260\" y=\"40\" width=\"220\" height=\"65\" rx=\"8\" fill=\"#0f172a\" stroke=\"#3b82f6\" stroke-width=\"2\"/>\n        <text x=\"370\" y=\"65\" fill=\"#93c5fd\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Superclass: Employee</text>\n        <text x=\"370\" y=\"85\" fill=\"#cbd5e1\" font-size=\"11\" text-anchor=\"middle\">- id, - name, - salary</text>\n        <line x1=\"370\" y1=\"105\" x2=\"370\" y2=\"135\" stroke=\"#94a3b8\" stroke-width=\"2\"/>\n        <polygon points=\"370,105 363,117 377,117\" fill=\"#94a3b8\"/>\n        <rect x=\"110\" y=\"135\" width=\"230\" height=\"55\" rx=\"8\" fill=\"#0f172a\" stroke=\"#10b981\" stroke-width=\"2\"/>\n        <text x=\"225\" y=\"157\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">SoftwareEngineer</text>\n        <text x=\"225\" y=\"175\" fill=\"#94a3b8\" font-size=\"10\" text-anchor=\"middle\">+ programmingLanguages</text>\n        <rect x=\"400\" y=\"135\" width=\"230\" height=\"55\" rx=\"8\" fill=\"#0f172a\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n        <text x=\"515\" y=\"157\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">EngineeringManager</text>\n        <text x=\"515\" y=\"175\" fill=\"#94a3b8\" font-size=\"10\" text-anchor=\"middle\">+ teamBudget, + directReports</text>\n      </svg>",
      "diagramCaption": "Constructor execution begins at Employee.super() before executing child initializers. Single class inheritance avoids multiple-state collisions.",
      "technicalExplanation": "When a subclass instance is instantiated via <code>new SoftwareEngineer(...)</code>, the JVM allocates a single contiguous block of heap memory sized to hold all fields declared across the entire inheritance hierarchy (both parent private fields and child fields). <strong>Constructor Chaining</strong> walks upward from child to parent up to <code>java.lang.Object</code>. If the parent does not declare a no-arg constructor and the child fails to call <code>super(args)</code>, the code will fail to compile.",
      "codeBlocks": [
        {
          "title": "Employee & SoftwareEngineer (Constructor Chaining)",
          "lang": "java",
          "code": "// Superclass\npublic class Employee {\n    private final String id;\n    private final String name;\n    protected double salary;\n\n    public Employee(String id, String name, double salary) {\n        System.out.println(\"1. Employee (Parent) constructor executing...\");\n        this.id = id;\n        this.name = name;\n        this.salary = salary;\n    }\n\n    public void work() {\n        System.out.println(name + \" is completing general organizational tasks.\");\n    }\n}\n\n// Subclass\npublic class SoftwareEngineer extends Employee {\n    private final String primaryLanguage;\n\n    public SoftwareEngineer(String id, String name, double salary, String primaryLanguage) {\n        // MANDATORY: Call superclass constructor first!\n        super(id, name, salary);\n        System.out.println(\"2. SoftwareEngineer (Child) constructor executing...\");\n        this.primaryLanguage = primaryLanguage;\n    }\n\n    @Override\n    public void work() {\n        // Option to invoke parent method via super.work()\n        super.work();\n        System.out.println(\"Writing production code in \" + primaryLanguage);\n    }\n}\n\n// Execution:\n// Output order:\n// 1. Employee (Parent) constructor executing...\n// 2. SoftwareEngineer (Child) constructor executing...",
          "explanation": "Notice the constructor execution order: Employee runs first, establishing the base state, followed by SoftwareEngineer."
        }
      ],
      "keyPoints": [
        "**Relationship:** Modeled strictly as an **IS-A** relationship (`Dog IS-A Animal`).",
        "**Constructor Chaining:** `super()` must be the very first statement in a subclass constructor.",
        "**Tight Coupling Risk:** Subclasses are intimately bound to superclass implementations, exposing them to the Fragile Base Class Problem."
      ],
      "interviewQA": [
        {
          "question": "What happens if a parent class does not have a default (no-argument) constructor, and the child constructor omits super()?",
          "shortAnswer": "A compile-time error occurs. The compiler automatically inserts `super();` if omitted, but since no zero-arg constructor exists in the parent, compilation fails.",
          "detailedAnswer": "In Java, if you define any parameterized constructor in a class, the compiler stops generating the default no-argument constructor. If a child class does not explicitly write `super(arg1, arg2);` as its first line, the compiler attempts to insert an invisible `super();`. Because no zero-arg constructor exists in the parent, the compiler throws: `Implicit super constructor Parent() is undefined for default constructor`.",
          "followUps": [
            "Can a constructor call both this() and super() in the same constructor?",
            "Answer: No! Both this() and super() must be the very first statement in a constructor, so they cannot be combined in the same constructor body."
          ]
        }
      ],
      "quiz": [
        {
          "question": "When instantiating a subclass in Java, in what order do constructors execute?",
          "options": [
            "Child constructor executes first, then parent constructor",
            "Parent constructor executes first, then child constructor",
            "They execute concurrently in parallel threads",
            "Only the child constructor executes"
          ],
          "correct": 1,
          "explanation": "Through constructor chaining via super(), parent constructors up to java.lang.Object execute completely before child constructor logic runs."
        }
      ]
    },
    {
      "id": "oop-polymorphism",
      "title": "4. Polymorphism, Dynamic Dispatch, vtable & Edge Cases",
      "subtitle": "Static vs. Dynamic binding, Virtual Method Tables & Covariant Returns",
      "whatIsIt": "Polymorphism (meaning 'many forms') allows objects of different concrete types to be treated through a common reference type, executing their own specialized behaviors when a method is invoked.",
      "whyNeedIt": "Polymorphism allows you to write extensible code that operates on base types (e.g. `List<Shape> shapes`) and tell every element to `draw()`. You can introduce 10 new shapes (`Circle`, `Triangle`, `Hexagon`) without modifying existing drawing loops.",
      "howItWorks": [
        "**Compile-Time Polymorphism (Static Binding):** Method Overloading (same method name, different parameter types within the same class). Resolved at compile time.",
        "**Runtime Polymorphism (Dynamic Binding):** Method Overriding (subclass provides a specific implementation of a method declared in the parent class with identical signature).",
        "**Dynamic Method Dispatch:** When a method is called on a reference (`Animal a = new Dog()`), Java inspects the **actual runtime object on the heap**, NOT the reference type, to determine which method to run.",
        "**The Virtual Method Table (vtable):** The JVM creates an internal array of function pointers (vtable) for each loaded class. Overridden methods overwrite their entry in the subclass vtable, enabling instantaneous $O(1)$ method resolution at runtime."
      ],
      "realWorldExample": "**Universal TV Remote Control:**\nA universal remote has a single 'Power' button. When pointed at a Sony TV, the TV turns on. When pointed at an Apple TV box, the streaming box wakes up. When pointed at an air conditioner, the compressor starts. The same command ('Power') produces different behaviors depending on the receiving device!",
      "diagram": "<svg viewBox=\"0 0 740 240\" class=\"responsive-svg\">\n        <rect x=\"20\" y=\"20\" width=\"700\" height=\"200\" rx=\"14\" fill=\"#1e293b\" stroke=\"#334155\" stroke-width=\"2\"/>\n        <rect x=\"50\" y=\"50\" width=\"220\" height=\"130\" rx=\"8\" fill=\"#0f172a\" stroke=\"#3b82f6\" stroke-width=\"2\"/>\n        <text x=\"160\" y=\"75\" fill=\"#93c5fd\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Stack (Reference Type)</text>\n        <text x=\"70\" y=\"110\" fill=\"#ffffff\" font-size=\"12\" font-family=\"monospace\">Animal a;</text>\n        <text x=\"70\" y=\"135\" fill=\"#94a3b8\" font-size=\"11\">Compile-Time Check</text>\n        <text x=\"70\" y=\"155\" fill=\"#60a5fa\" font-size=\"10\">Checks Animal.class methods</text>\n        <path d=\"M 270 110 L 410 110\" stroke=\"#f59e0b\" stroke-width=\"2\" marker-end=\"url(#arrow)\" stroke-dasharray=\"4,4\"/>\n        <rect x=\"420\" y=\"45\" width=\"270\" height=\"145\" rx=\"8\" fill=\"#0f172a\" stroke=\"#10b981\" stroke-width=\"2\"/>\n        <text x=\"555\" y=\"70\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Heap (Runtime Instance)</text>\n        <text x=\"440\" y=\"95\" fill=\"#6ee7b7\" font-size=\"12\" font-family=\"monospace\">new Dog()</text>\n        <text x=\"440\" y=\"125\" fill=\"#94a3b8\" font-size=\"11\">Dog vtable lookup:</text>\n        <text x=\"440\" y=\"145\" fill=\"#38bdf8\" font-size=\"11\" font-family=\"monospace\">makeSound() -&gt; Dog.makeSound()</text>\n        <text x=\"440\" y=\"170\" fill=\"#10b981\" font-size=\"11\">OUTPUT: \"Woof! Bark!\"</text>\n      </svg>",
      "diagramCaption": "Dynamic Method Dispatch: The compiler verifies methods using the Stack Reference type (Animal), but the JVM resolves execution at runtime via the Heap Object's vtable (Dog).",
      "technicalExplanation": "Two critical interview nuances must be mastered:<br>1. <strong>Static Method Hiding:</strong> If a subclass declares a static method with the exact same signature as a superclass static method, it is NOT overridden! It is <em>hidden</em>. Static methods belong to the class, not the instance, and resolution is bound at compile time based strictly on the reference type.<br>2. <strong>Covariant Return Types:</strong> Since Java 5, an overriding method in a subclass is allowed to return a <em>subtype</em> of the return type declared in the parent method.",
      "comparisonTable": {
        "headers": [
          "Feature",
          "Method Overloading",
          "Method Overriding"
        ],
        "rows": [
          [
            "**Polymorphism Type**",
            "Compile-Time (Static Polymorphism).",
            "Runtime (Dynamic Polymorphism)."
          ],
          [
            "**Resolution Time**",
            "Resolved at compile-time by method signature.",
            "Resolved at runtime by heap object vtable."
          ],
          [
            "**Method Signature**",
            "Same name, **different parameter list** (type or count).",
            "**Identical parameter list and return type** (or covariant)."
          ],
          [
            "**Class Location**",
            "Within the same class or inherited.",
            "Between Superclass and Subclass."
          ],
          [
            "**Return Type Role**",
            "Changing return type alone is **NOT allowed** (compiler error).",
            "Can be identical or a subtype (Covariant Return)."
          ],
          [
            "**Private/Static**",
            "Private and static methods **can** be overloaded.",
            "Private and static methods **CANNOT** be overridden."
          ]
        ]
      },
      "codeBlocks": [
        {
          "title": "DynamicDispatchDemo.java (Overriding vs Hiding & Covariant Returns)",
          "lang": "java",
          "code": "class Animal {\n    public void makeSound() {\n        System.out.println(\"Generic animal sound\");\n    }\n\n    // Static method\n    public static void identify() {\n        System.out.println(\"Animal class\");\n    }\n\n    // Base return type\n    public Animal create() {\n        return new Animal();\n    }\n}\n\nclass Dog extends Animal {\n    @Override\n    public void makeSound() {\n        System.out.println(\"Woof! Bark!\");\n    }\n\n    // Static Method Hiding (NOT overriding!)\n    public static void identify() {\n        System.out.println(\"Dog class\");\n    }\n\n    // Covariant Return Type: Returns Dog (subtype of Animal)!\n    @Override\n    public Dog create() {\n        return new Dog();\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Animal a = new Dog(); // Reference: Animal, Heap: Dog\n\n        a.makeSound(); // OUTPUT: \"Woof! Bark!\" (Dynamic Dispatch!)\n        a.identify();  // OUTPUT: \"Animal class\" (STATIC BINDING: based on Animal reference!)\n\n        Dog d = (Dog) a;\n        d.identify();  // OUTPUT: \"Dog class\" (bound to Dog reference!)\n    }\n}",
          "explanation": "Study a.identify() carefully: because identify() is static, Java binds it at compile-time to the Animal reference type, printing 'Animal class'. In contrast, a.makeSound() dynamically dispatches to Dog."
        }
      ],
      "simulation": {
        "id": "dispatch",
        "title": "Dynamic Method Dispatch vs. Static Method Hiding",
        "description": "Test how the JVM resolves instance method overriding versus static method hiding on an Animal a = new Dog() reference.",
        "buttons": [
          {
            "label": "Invoke Overridden Instance Method: a.makeSound()",
            "action": "overriding"
          },
          {
            "label": "Invoke Static Method: a.identify()",
            "action": "hiding"
          }
        ],
        "initialOutput": "Object instantiated: Animal a = new Dog(); Ready to test method resolution."
      },
      "keyPoints": [
        "**Dynamic Dispatch:** Resolves instance methods at runtime using the heap object's vtable.",
        "**Static Binding:** Overloading, private methods, final methods, and static methods are bound at compile time.",
        "**Static Method Hiding:** Static methods are hidden, never overridden.",
        "**Covariant Return:** Overriding methods may return a narrower subtype of the parent return type."
      ],
      "interviewQA": [
        {
          "question": "Can we overload a method in Java by changing ONLY the return type?",
          "shortAnswer": "No. The Java compiler identifies method signatures strictly by the method name and parameter types. The return type is not part of the method signature.",
          "detailedAnswer": "When calling a method like `calculate();`, the caller may choose not to assign the return value to a variable (e.g. `doSomething();`). If two methods had identical names and parameters but different return types (`int doSomething()` vs `double doSomething()`), the compiler could not determine which method to invoke. Thus, changing the return type alone produces a duplicate method compilation error.",
          "followUps": [
            "What is a Covariant Return Type, and when was it introduced?",
            "Answer: Introduced in Java 5, it permits an overriding method to return a subtype of the superclass method's return type."
          ]
        }
      ],
      "quiz": [
        {
          "question": "Given 'Animal a = new Dog();' where identify() is a static method in both classes, what does 'a.identify();' print?",
          "options": [
            "It prints Dog's identify() because Dog is the object on the heap",
            "It prints Animal's identify() because static methods bind at compile time to the reference type",
            "It throws a NullPointerException at runtime",
            "It produces a compilation error"
          ],
          "correct": 1,
          "explanation": "Static methods belong to classes, not instances. They are resolved at compile time using the reference type (Animal), resulting in static method hiding rather than dynamic dispatch."
        }
      ]
    },
    {
      "id": "oop-abstract-vs-interface",
      "title": "5. Abstract Class vs. Interface & The Diamond Problem",
      "subtitle": "Comparison matrix, Java 8/9 evolution, vtable vs. itable & architectural choices",
      "whatIsIt": "An **Abstract Class** is a partially implemented class that serves as a common base for closely related subclasses (IS-A). An **Interface** is a contract specifying capabilities (CAN-DO) that any class can implement regardless of its inheritance tree.",
      "whyNeedIt": "Software systems need both shared state/code reuse across tight families (Abstract Classes) and flexible, decoupled contracts for Dependency Injection across independent components (Interfaces).",
      "howItWorks": [
        "**Multiple Inheritance:** A Java class can implement multiple interfaces, but can extend only one class.",
        "**State / Fields:** Abstract classes can have private mutable instance fields; Interfaces can only declare `public static final` constants.",
        "**Constructors:** Abstract classes have constructors called via `super()`; Interfaces have no constructors.",
        "**Java 8 & 9 Interface Evolution:** Java 8 added `default` methods (for backward compatibility) and `static` methods. Java 9 added `private` helper methods.",
        "**The Diamond Problem:** When two interfaces provide conflicting `default` methods with the same signature, the compiler forces the implementing class to explicitly override the method and resolve the collision via `InterfaceName.super.method()`."
      ],
      "realWorldExample": "**Vehicle Blueprint vs. Driver's License Capabilities:**\n- **Abstract Class:** `Vehicle` defines common physical attributes like `engineNumber`, `fuelLevel`, and a constructor to initialize them.\n- **Interface:** `Flyable`, `ElectricPowered`, `AutonomousNavigating` represent capabilities that cars, drones, or boats can implement independently.",
      "diagram": "<svg viewBox=\"0 0 740 220\" class=\"responsive-svg\">\n    <rect x=\"20\" y=\"20\" width=\"700\" height=\"180\" rx=\"14\" fill=\"#1e293b\" stroke=\"#334155\" stroke-width=\"2\"/>\n    <rect x=\"120\" y=\"45\" width=\"200\" height=\"60\" rx=\"8\" fill=\"#0f172a\" stroke=\"#3b82f6\" stroke-width=\"2\"/>\n    <text x=\"220\" y=\"70\" fill=\"#60a5fa\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">interface CombustionEngine</text>\n    <text x=\"220\" y=\"90\" fill=\"#94a3b8\" font-size=\"10\" text-anchor=\"middle\">default void start()</text>\n    <rect x=\"420\" y=\"45\" width=\"200\" height=\"60\" rx=\"8\" fill=\"#0f172a\" stroke=\"#10b981\" stroke-width=\"2\"/>\n    <text x=\"520\" y=\"70\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">interface ElectricMotor</text>\n    <text x=\"520\" y=\"90\" fill=\"#94a3b8\" font-size=\"10\" text-anchor=\"middle\">default void start()</text>\n    <path d=\"M 220 105 L 370 145 M 520 105 L 370 145\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n    <rect x=\"270\" y=\"145\" width=\"200\" height=\"45\" rx=\"8\" fill=\"#7c3aed\" fill-opacity=\"0.3\" stroke=\"#a78bfa\" stroke-width=\"2\"/>\n    <text x=\"370\" y=\"165\" fill=\"#ffffff\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">class HybridCar</text>\n    <text x=\"370\" y=\"180\" fill=\"#fcd34d\" font-size=\"9\" text-anchor=\"middle\">Must explicitly override start()!</text>\n  </svg>",
      "diagramCaption": "Diamond Problem resolution: HybridCar must explicitly override start() and disambiguate between CombustionEngine.super.start() and ElectricMotor.super.start().",
      "technicalExplanation": "Under the hood, the JVM optimizes method dispatch differently for abstract classes and interfaces: method calls on abstract class references use <strong>vtable (Virtual Method Table)</strong> indexing, which is a direct array offset lookup in $O(1)$ time. Method calls on interface references use <strong>itable (Interface Table)</strong> dispatch, which requires a secondary indirection lookup because a class can implement multiple interfaces at arbitrary offsets. The HotSpot JIT compiler optimizes common itable call sites with Monomorphic Inline Caching.",
      "comparisonTable": {
        "headers": [
          "Feature",
          "Abstract Class",
          "Interface"
        ],
        "rows": [
          [
            "**Multiple Inheritance**",
            "**No.** A class can extend only one class.",
            "**Yes.** A class can implement multiple interfaces."
          ],
          [
            "**Instance Fields**",
            "Can have private, protected, volatile mutable fields.",
            "Only `public static final` constants. No instance state."
          ],
          [
            "**Constructors**",
            "**Yes.** Subclasses invoke them via `super()` to initialize base state.",
            "**No.** Interfaces cannot be instantiated directly or have constructors."
          ],
          [
            "**Methods Allowed**",
            "Abstract, concrete, static, final with any access modifier.",
            "Abstract, `default` (Java 8), `static` (Java 8), `private` (Java 9)."
          ],
          [
            "**Dispatch Mechanism**",
            "Direct **vtable** array offset lookup.",
            "**itable** table offset lookup (optimized via inline cache)."
          ],
          [
            "**Design Intent**",
            "**IS-A** identity and shared state base.",
            "**CAN-DO** capability or API behavioral contract."
          ]
        ]
      },
      "codeBlocks": [
        {
          "title": "HybridCar.java (Resolving Default Method Conflict)",
          "lang": "java",
          "code": "interface Engine {\n    default void start() {\n        System.out.println(\"Starting internal combustion engine...\");\n    }\n}\n\ninterface ElectricMotor {\n    default void start() {\n        System.out.println(\"Starting electric battery powertrain...\");\n    }\n}\n\npublic class HybridCar implements Engine, ElectricMotor {\n    @Override\n    public void start() {\n        // Option 1: Custom unified start sequence\n        System.out.println(\"Hybrid system self-test passed.\");\n\n        // Option 2: Explicitly invoke specific interface default methods\n        Engine.super.start();\n        ElectricMotor.super.start();\n    }\n\n    public static void main(String[] args) {\n        HybridCar prius = new HybridCar();\n        prius.start();\n    }\n}",
          "explanation": "Notice the exact syntax: InterfaceName.super.methodName(). Without this override, the code triggers a compilation error."
        }
      ],
      "keyPoints": [
        "**Choose Interface:** For decoupled API contracts, Dependency Injection, and CAN-DO roles.",
        "**Choose Abstract Class:** For closely related classes sharing instance fields, constructors, or Template Method pipelines.",
        "**Diamond Resolution:** Overriding class uses `InterfaceName.super.method()` syntax."
      ],
      "interviewQA": [
        {
          "question": "Why did Java 8 introduce default methods to interfaces if interfaces were meant to be pure contracts?",
          "shortAnswer": "To maintain Backward Compatibility while evolving core APIs like Collections to support Lambdas and Streams without breaking existing third-party code.",
          "detailedAnswer": "In Java 8, Oracle introduced the Streams API, requiring methods like `.stream()`, `.parallelStream()`, and `.forEach()` to be added to `java.util.Collection`. If interfaces were strictly abstract, every single library in the world implementing `Collection` would have failed to compile immediately! Default methods allowed the JDK authors to provide default fallback implementations, preserving backward binary compatibility.",
          "followUps": [
            "Can a default method override a method from java.lang.Object (like toString or equals)?",
            "Answer: No! Class implementations always take precedence over interface default methods ('Class Wins' rule)."
          ]
        }
      ],
      "quiz": [
        {
          "question": "If ClassC implements InterfaceA and InterfaceB, and both interfaces declare a default void compute() method, what happens?",
          "options": [
            "The JVM chooses InterfaceA at runtime based on alphabetical order",
            "The code fails to compile unless ClassC explicitly overrides compute()",
            "The JVM invokes both compute() methods sequentially",
            "ClassC crashes with a DiamondInheritanceException at runtime"
          ],
          "correct": 1,
          "explanation": "Java prevents default method ambiguity by forcing the implementing class to explicitly override the conflicting method at compile time."
        }
      ]
    },
    {
      "id": "oop-object-relationships",
      "title": "6. Object Relationships & Composition vs. Inheritance",
      "subtitle": "Association, Aggregation, Composition & the Fragile Base Class bug",
      "whatIsIt": "Object relationships model how classes collaborate in software. While Inheritance represents an **IS-A** relationship, object relationships represent **HAS-A** or **USES-A** connections categorized into **Association**, **Aggregation**, and **Composition**.",
      "whyNeedIt": "Inheritance breaks encapsulation across class boundaries because subclasses depend on the private internal implementation details of superclasses. This causes the **Fragile Base Class Problem**. Senior engineers favor Composition over Inheritance for loose coupling and runtime flexibility.",
      "howItWorks": [
        "**Association (Uses-A):** Loose peer-to-peer relationship where objects interact independently (e.g. `Doctor` and `Patient`). Neither object owns the other.",
        "**Aggregation (Has-A, Weak):** Whole/Part relationship with **Independent Lifecycles**. If the whole is destroyed, parts survive (e.g. `Department` and `Professor`).",
        "**Composition (Has-A, Strong):** Whole/Part relationship with **Dependent Lifecycles**. The parent strictly owns the child. If the parent is destroyed, the child is destroyed too (e.g. `Car` and `Engine`).",
        "**The Fragile Base Class Double-Counting Bug:** When a subclass overrides both `add()` and `addAll()`, and the base class's `addAll()` internally invokes `add()`, calling `addAll([1, 2, 3])` causes the count to be incremented twice (expected: 3, actual: 6!)"
      ],
      "realWorldExample": "**Hospital, Department & Surgeon:**\n- **Association:** A Surgeon treats a Patient (Uses-A). Both continue living independently.\n- **Aggregation:** A Hospital has a Surgery Department with Professors. If the hospital closes down, the professors find jobs elsewhere.\n- **Composition:** A Human has a physical Brain and Heart. If the human dies, the brain and heart cannot survive independently.",
      "diagram": "<svg viewBox=\"0 0 740 230\" class=\"responsive-svg\">\n    <rect x=\"20\" y=\"20\" width=\"700\" height=\"190\" rx=\"14\" fill=\"#1e293b\" stroke=\"#334155\" stroke-width=\"2\"/>\n    <text x=\"370\" y=\"45\" fill=\"#f8fafc\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">OBJECT RELATIONSHIP HIERARCHY</text>\n    <rect x=\"50\" y=\"70\" width=\"190\" height=\"110\" rx=\"8\" fill=\"#0f172a\" stroke=\"#3b82f6\" stroke-width=\"1.5\"/>\n    <text x=\"145\" y=\"95\" fill=\"#60a5fa\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Association (Uses-A)</text>\n    <text x=\"145\" y=\"125\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Independent Lifecycles</text>\n    <text x=\"145\" y=\"150\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">Doctor &lt;---&gt; Patient</text>\n    <rect x=\"275\" y=\"70\" width=\"190\" height=\"110\" rx=\"8\" fill=\"#0f172a\" stroke=\"#10b981\" stroke-width=\"1.5\"/>\n    <text x=\"370\" y=\"95\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Aggregation (Has-A)</text>\n    <text x=\"370\" y=\"125\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Weak Ownership</text>\n    <text x=\"370\" y=\"150\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">Dept &lt;&gt;--- Professor</text>\n    <rect x=\"500\" y=\"70\" width=\"190\" height=\"110\" rx=\"8\" fill=\"#0f172a\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/>\n    <text x=\"595\" y=\"95\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Composition (Has-A)</text>\n    <text x=\"595\" y=\"125\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Strict Co-Life Ownership</text>\n    <text x=\"595\" y=\"150\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">Car &lt;*&gt;--- Engine</text>\n  </svg>",
      "diagramCaption": "Association, Aggregation, and Composition vary by lifecycle dependency and ownership coupling strength.",
      "technicalExplanation": "Joshua Bloch's classic <em>Effective Java</em> item 'Favor Composition Over Inheritance' demonstrates how class inheritance exposes subclasses to bugs when superclass internal implementations change. In our code demonstration below, Developer B subclassed <code>SimpleList</code> to build <code>CountingList</code>. Unbeknownst to Developer B, <code>SimpleList.addAll()</code> was implemented by calling its own <code>this.add()</code> in a loop. Because of dynamic dispatch, calling <code>super.addAll()</code> re-enters <code>CountingList.add()</code>, incrementing count twice per element!",
      "codeBlocks": [
        {
          "title": "FragileBaseClassBug.java (The Double-Counting Demonstration)",
          "lang": "java",
          "code": "// Superclass written by Developer A\nclass SimpleList {\n    public void add(int item) {\n        // Appends single item to internal array\n    }\n\n    public void addAll(int[] items) {\n        for (int item : items) {\n            add(item); // CRITICAL: Base class calls its own add() method internally!\n        }\n    }\n}\n\n// Subclass written by Developer B\nclass BrokenCountingList extends SimpleList {\n    private int count = 0;\n\n    @Override\n    public void add(int item) {\n        count++;\n        super.add(item);\n    }\n\n    @Override\n    public void addAll(int[] items) {\n        count += items.length; // 1. Increments count by 3!\n        super.addAll(items);   // 2. BUG: super.addAll() internally calls add(), doubling count!\n    }\n\n    public int getCount() { return count; }\n}\n\n// Safe Composition-based Solution:\nclass SafeCountingList {\n    private final SimpleList internalList; // HAS-A Composition\n    private int count = 0;\n\n    public SafeCountingList(SimpleList internalList) {\n        this.internalList = internalList;\n    }\n\n    public void add(int item) {\n        count++;\n        internalList.add(item);\n    }\n\n    public void addAll(int[] items) {\n        count += items.length;\n        internalList.addAll(items); // Safe! Base class internal calls cannot touch our count!\n    }\n\n    public int getCount() { return count; }\n}",
          "explanation": "Tracing BrokenCountingList.addAll([1, 2, 3]): count += 3 makes count = 3. Then super.addAll() loops 3 times calling this.add(), which calls BrokenCountingList.add(), adding 3 more. Actual count = 6 instead of 3!"
        }
      ],
      "simulation": {
        "id": "fragile",
        "title": "Fragile Base Class Double-Counting Simulator",
        "description": "Witness the classic double-counting bug when adding 3 elements to an inherited list vs. a composed list.",
        "buttons": [
          {
            "label": "Run Broken Inheritance (CountingList.addAll)",
            "action": "inheritance",
            "isDanger": true
          },
          {
            "label": "Run Safe Composition (CountingList.addAll)",
            "action": "composition"
          }
        ],
        "initialOutput": "Test Case: addAll([10, 20, 30]) - 3 items to add. Expected result = 3."
      },
      "keyPoints": [
        "**GoF Rule:** *'Favor object composition over class inheritance.'*",
        "**Fragile Base Class:** Superclass internal changes silently break subclass invariants.",
        "**Loose Coupling:** Composition wraps dependencies as private fields, exposing only required methods."
      ],
      "interviewQA": [
        {
          "question": "What is the difference between Aggregation and Composition?",
          "shortAnswer": "Both represent 'HAS-A' relationships, but Aggregation has independent lifecycles (Department and Teacher), while Composition has strict dependent lifecycles (House and Rooms).",
          "detailedAnswer": "In Aggregation, the child object can exist independently of the container. If the University closes, the Professors continue existing. In Composition, the container completely owns the child's lifecycle. If a ChessGame object is garbage collected, all its ChessSquare and ChessPiece instances are destroyed with it.",
          "followUps": [
            "How do you implement Composition in Java code?",
            "Answer: Instantiate the child object directly inside the parent constructor or instantiate it as a private final field that cannot be injected or referenced from outside."
          ]
        }
      ],
      "quiz": [
        {
          "question": "Why did BrokenCountingList report a count of 6 instead of 3 when adding 3 items?",
          "options": [
            "The JVM has a mathematical bug with arrays",
            "The superclass addAll() internally invoked add(), which dynamically dispatched back to the child override",
            "Developer B forgot to write the constructor",
            "Static methods cannot be overridden"
          ],
          "correct": 1,
          "explanation": "Because SimpleList.addAll() internally calls this.add(), dynamic dispatch routed calls back to the subclass's overridden add() method, causing every item to be counted twice."
        }
      ]
    },
    {
      "id": "solid-srp",
      "title": "7. Single Responsibility Principle (SRP)",
      "subtitle": "One class, one responsibility & one single reason to change",
      "whatIsIt": "The Single Responsibility Principle (SRP) states that a class should have one, and only one, reason to change. Each class should focus exclusively on a single cohesive part of the software's functionality.",
      "whyNeedIt": "When a single class mixes business logic, database persistence, and PDF/HTML printing, changes to database schemas or tax rates risk breaking formatting or crashing printing logic. SRP isolates changes so modifications to one domain never ripple across others.",
      "howItWorks": [
        "**Identify Multiple Roles:** If a class computes totals, saves to MySQL, and formats PDF invoices, it has 3 distinct reasons to change.",
        "**Decompose into Focused Classes:** Separate into a pure Domain Entity (`Invoice`), a Persistence Repository (`InvoiceRepository`), and a Presentation Service (`InvoicePrinter`)."
      ],
      "realWorldExample": "**The Swiss Army Knife vs. Professional Chef Knife:**\nA Swiss Army knife has a blade, scissors, corkscrew, and magnifying glass. If the corkscrew hinge bends, the knife blade cannot close properly. A professional chef uses a dedicated chef's knife for slicing, a wine opener for bottles, and kitchen shears for poultry.",
      "diagram": "<svg viewBox=\"0 0 740 200\" class=\"responsive-svg\">\n    <rect x=\"20\" y=\"20\" width=\"700\" height=\"160\" rx=\"14\" fill=\"#1e293b\" stroke=\"#334155\" stroke-width=\"2\"/>\n    <rect x=\"50\" y=\"45\" width=\"230\" height=\"110\" rx=\"8\" fill=\"#0f172a\" stroke=\"#ef4444\" stroke-width=\"2\"/>\n    <text x=\"165\" y=\"70\" fill=\"#f87171\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">BAD (Violates SRP)</text>\n    <text x=\"65\" y=\"95\" fill=\"#fca5a5\" font-size=\"11\">class Invoice {</text>\n    <text x=\"80\" y=\"115\" fill=\"#94a3b8\" font-size=\"10\">calculateTax() // Reason 1</text>\n    <text x=\"80\" y=\"130\" fill=\"#94a3b8\" font-size=\"10\">saveToSQL()    // Reason 2</text>\n    <text x=\"80\" y=\"145\" fill=\"#94a3b8\" font-size=\"10\">printPDF()     // Reason 3</text>\n    <text x=\"320\" y=\"105\" fill=\"#60a5fa\" font-size=\"20\" font-weight=\"bold\">──►</text>\n    <rect x=\"380\" y=\"45\" width=\"310\" height=\"110\" rx=\"8\" fill=\"#0f172a\" stroke=\"#10b981\" stroke-width=\"2\"/>\n    <text x=\"535\" y=\"70\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">GOOD (Refactored SRP)</text>\n    <text x=\"400\" y=\"95\" fill=\"#6ee7b7\" font-size=\"11\">1. Invoice (Domain Logic)</text>\n    <text x=\"400\" y=\"120\" fill=\"#6ee7b7\" font-size=\"11\">2. InvoiceRepository (Persistence)</text>\n    <text x=\"400\" y=\"145\" fill=\"#6ee7b7\" font-size=\"11\">3. InvoicePrinter (Presentation)</text>\n  </svg>",
      "diagramCaption": "Separating concerns: Entity logic, database persistence, and presentation formatting are isolated into single-responsibility classes.",
      "technicalExplanation": "Robert C. Martin ('Uncle Bob') defines responsibility as <em>'a reason to change'</em>, which stems from the specific business actors demanding the change. Accounting and CFOs dictate tax rules; Database Administrators dictate schema updates; Designers dictate PDF formatting. When one class satisfies multiple actors, conflicting changes cause merge conflicts and regressions.",
      "badVsGood": {
        "badTitle": "Invoice Handling Business, DB, and Printing",
        "badCode": "public class Invoice {\n    private double amount;\n    public Invoice(double amount) { this.amount = amount; }\n\n    public double calculateTotal() {\n        return amount * 1.15; // Reason 1: Tax rules\n    }\n    public void saveToMySQL() {\n        System.out.println(\"Executing: INSERT INTO invoices...\"); // Reason 2: DB schema\n    }\n    public void printPDF() {\n        System.out.println(\"Formatting PDF layout...\"); // Reason 3: UI design\n    }\n}",
        "badWhy": "This class has 3 distinct reasons to change. If the database changes from MySQL to MongoDB, we risk breaking tax calculation logic.",
        "goodTitle": "Decoupled SRP Architecture",
        "goodCode": "// 1. Domain Entity: Only business logic\npublic class Invoice {\n    private final double amount;\n    public Invoice(double amount) { this.amount = amount; }\n    public double calculateTotal() { return amount * 1.15; }\n}\n\n// 2. Repository: Only persistence\npublic class InvoiceRepository {\n    public void save(Invoice invoice) {\n        System.out.println(\"Persisting invoice to database...\");\n    }\n}\n\n// 3. Printer: Only presentation\npublic class InvoicePrinter {\n    public void print(Invoice invoice) {\n        System.out.println(\"Rendering PDF: \" + invoice.calculateTotal());\n    }\n}",
        "goodWhy": "Each class has exactly one actor and one reason to change. Unit testing and database migrations are completely decoupled."
      },
      "keyPoints": [
        "**Core Mantra:** A class should have one, and only one, reason to change.",
        "**Actor Alignment:** Align class boundaries with the business stakeholders requesting changes.",
        "**Testing Benefit:** Pure domain entities can be unit tested without requiring database mocks."
      ],
      "interviewQA": [
        {
          "question": "How do you recognize when a class is violating the Single Responsibility Principle?",
          "shortAnswer": "Look for multiple disparate imports (e.g. SQL packages alongside PDF generators), giant classes with 500+ lines, or methods that touch different architectural layers.",
          "detailedAnswer": "Common symptoms include: (1) Mixing persistence logic (SQL/ORM) with business calculation, (2) Having to re-test the entire application when only a formatting change occurred, and (3) Merge conflicts when two developers work on different features within the same class.",
          "followUps": [
            "Does SRP mean a class should only have a single public method?",
            "Answer: No! A class can have many methods as long as they all collaborate toward a single cohesive responsibility."
          ]
        }
      ],
      "quiz": [
        {
          "question": "Which of the following classes demonstrates a violation of the Single Responsibility Principle?",
          "options": [
            "A UserRepository class that only performs CRUD operations on user tables",
            "An Order entity that calculates line item totals, writes to PostgreSQL, and emails receipts to customers",
            "A PasswordEncoder class that only hashes passwords using Bcrypt",
            "A TaxCalculator class that only calculates VAT rates"
          ],
          "correct": 1,
          "explanation": "An Order class handling calculation, database persistence, and email dispatching has 3 separate reasons to change, violating SRP."
        }
      ]
    },
    {
      "id": "solid-ocp",
      "title": "8. Open/Closed Principle (OCP)",
      "subtitle": "Open for extension, closed for modification",
      "whatIsIt": "The Open/Closed Principle (OCP) states that software entities (classes, modules, functions) should be open for extension, but closed for modification.",
      "whyNeedIt": "If adding a new customer discount type or payment provider requires opening up and modifying existing, tested, and working code using `if-else` or `switch` statements, you risk introducing regression bugs into already deployed features.",
      "howItWorks": [
        "**Abstract the Extension Point:** Define an interface for the variable behavior (e.g. `DiscountStrategy`).",
        "**Create Concrete Implementations:** Implement separate classes for each variant (`RegularDiscount`, `VipDiscount`, `StudentDiscount`).",
        "**Extend Without Modifying:** To add a `BlackFridayDiscount`, simply create a new class implementing the interface without touching `DiscountService`."
      ],
      "realWorldExample": "**Web Browser Plugins & Wall Power Outlets:**\nYour home electrical wall outlet has a fixed interface (2 or 3 prongs). When you buy a brand new electric toaster, you do not tear down your home's walls to rewire the house! You simply plug the toaster into the existing socket. The electrical grid is closed for modification, but open for extension.",
      "diagram": "<svg viewBox=\"0 0 740 200\" class=\"responsive-svg\">\n    <rect x=\"20\" y=\"20\" width=\"700\" height=\"160\" rx=\"14\" fill=\"#1e293b\" stroke=\"#334155\" stroke-width=\"2\"/>\n    <rect x=\"50\" y=\"45\" width=\"220\" height=\"110\" rx=\"8\" fill=\"#0f172a\" stroke=\"#ef4444\" stroke-width=\"1.5\"/>\n    <text x=\"160\" y=\"70\" fill=\"#f87171\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">BAD (Modifying Existing Code)</text>\n    <text x=\"65\" y=\"95\" fill=\"#fca5a5\" font-size=\"10\">if (type == \"VIP\") ...</text>\n    <text x=\"65\" y=\"115\" fill=\"#fca5a5\" font-size=\"10\">else if (type == \"STUDENT\") ...</text>\n    <text x=\"65\" y=\"135\" fill=\"#ef4444\" font-size=\"10\">⚠️ Modifying tested code breaks features!</text>\n    <text x=\"300\" y=\"105\" fill=\"#60a5fa\" font-size=\"20\" font-weight=\"bold\">──►</text>\n    <rect x=\"350\" y=\"45\" width=\"350\" height=\"110\" rx=\"8\" fill=\"#0f172a\" stroke=\"#10b981\" stroke-width=\"1.5\"/>\n    <text x=\"525\" y=\"70\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">GOOD (Open for Extension)</text>\n    <text x=\"370\" y=\"95\" fill=\"#6ee7b7\" font-size=\"11\">interface DiscountStrategy { apply() }</text>\n    <text x=\"370\" y=\"120\" fill=\"#cbd5e1\" font-size=\"10\">New class: BlackFridayDiscount implements Strategy</text>\n    <text x=\"370\" y=\"140\" fill=\"#10b981\" font-size=\"10\">✓ Existing classes remain 100% untouched!</text>\n  </svg>",
      "diagramCaption": "OCP: Add new behaviors by implementing interfaces, eliminating fragile if/else ladders in existing code.",
      "technicalExplanation": "Bertrand Meyer originally formulated OCP in 1988 using inheritance, but modern software architecture achieves OCP via Polymorphism and the Strategy Pattern. By depending on abstractions, new implementations can be introduced dynamically through configuration or dependency injection without recompiling or altering existing core business logic.",
      "badVsGood": {
        "badTitle": "DiscountCalculator with if/else ladder",
        "badCode": "public class DiscountCalculator {\n    public double calculate(String customerType, double amount) {\n        if (\"REGULAR\".equalsIgnoreCase(customerType)) {\n            return amount * 0.05;\n        } else if (\"VIP\".equalsIgnoreCase(customerType)) {\n            return amount * 0.20;\n        } else if (\"STUDENT\".equalsIgnoreCase(customerType)) { // Modified existing tested code!\n            return amount * 0.10;\n        }\n        return 0;\n    }\n}",
        "badWhy": "Every time business stakeholders add a new discount tier, this existing tested class must be opened, modified, recompiled, and re-tested.",
        "goodTitle": "Strategy-based OCP Architecture",
        "goodCode": "public interface DiscountStrategy {\n    double applyDiscount(double amount);\n}\n\npublic class RegularDiscount implements DiscountStrategy {\n    @Override public double applyDiscount(double amount) { return amount * 0.05; }\n}\n\npublic class VipDiscount implements DiscountStrategy {\n    @Override public double applyDiscount(double amount) { return amount * 0.20; }\n}\n\n// Adding new discount without modifying existing classes!\npublic class StudentDiscount implements DiscountStrategy {\n    @Override public double applyDiscount(double amount) { return amount * 0.10; }\n}\n\npublic class DiscountService {\n    public double compute(DiscountStrategy strategy, double amount) {\n        return strategy.applyDiscount(amount);\n    }\n}",
        "goodWhy": "Adding 50 new discount strategies is achieved by writing new classes. DiscountService remains closed for modification and immune to regression bugs."
      },
      "keyPoints": [
        "**Core Mantra:** Open for extension, closed for modification.",
        "**Design Pattern Fit:** OCP is the foundation of the **Strategy Pattern** and plugin architectures.",
        "**Risk Reduction:** Eliminates regressions in production code by avoiding edits to working files."
      ],
      "interviewQA": [
        {
          "question": "How do you achieve the Open/Closed Principle in Java?",
          "shortAnswer": "Using interfaces and abstract classes with polymorphism (e.g. Strategy Pattern) and Dependency Injection.",
          "detailedAnswer": "Instead of writing switch-case statements over type enumerations, declare an interface representing the operation. When new business variants arise, implement a new class. Wire the new implementation into the consumer service via dependency injection.",
          "followUps": [
            "What code smell frequently indicates a violation of OCP?",
            "Answer: Giant `switch` or `if-else if-else` ladders checking type strings or enums across the codebase."
          ]
        }
      ],
      "quiz": [
        {
          "question": "What is the primary danger of violating the Open/Closed Principle?",
          "options": [
            "It increases network latency between microservices",
            "Modifying existing working code risks introducing regression bugs into already tested features",
            "Java interfaces cannot be compiled without it",
            "It prevents garbage collection"
          ],
          "correct": 1,
          "explanation": "Editing existing code to add features risks breaking existing functionality; OCP avoids this by encouraging extension through new classes."
        }
      ]
    },
    {
      "id": "solid-lsp",
      "title": "9. Liskov Substitution Principle (LSP)",
      "subtitle": "Behavioral contracts, subtype substitutability & the classic Bird-Penguin trap",
      "whatIsIt": "The Liskov Substitution Principle (formulated by Barbara Liskov) states that subtypes must be substitutable for their base types without altering the correctness of the program.",
      "whyNeedIt": "If a subclass overrides a parent method by throwing an `UnsupportedOperationException` (e.g. `Penguin.fly()`), any client expecting a `Bird` and calling `.fly()` will crash at runtime. Violating LSP forces developers to pollute client code with defensive `instanceof` checks.",
      "howItWorks": [
        "**Behavioral Subtyping:** Inheritance is about **behavior**, not real-world taxonomy. Even if a penguin is biologically a bird, in code, if it cannot fly, it must not inherit a `.fly()` contract.",
        "**Refactor Hierarchy:** Segregate behaviors into smaller interfaces (e.g. `Flyable`). Subclasses only implement contracts they can fulfill."
      ],
      "realWorldExample": "**Square and Rectangle Geometry:**\nIn mathematics, a Square is a Rectangle. But in software, if a `Rectangle` class has `setWidth()` and `setHeight()`, setting `square.setWidth(10)` unexpectedly alters its height too! Code written for Rectangle breaks when passed a Square. That is an LSP violation.",
      "diagram": "<svg viewBox=\"0 0 740 200\" class=\"responsive-svg\">\n    <rect x=\"20\" y=\"20\" width=\"700\" height=\"160\" rx=\"14\" fill=\"#1e293b\" stroke=\"#334155\" stroke-width=\"2\"/>\n    <rect x=\"50\" y=\"45\" width=\"220\" height=\"110\" rx=\"8\" fill=\"#0f172a\" stroke=\"#ef4444\" stroke-width=\"1.5\"/>\n    <text x=\"160\" y=\"70\" fill=\"#f87171\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">BAD (Violates LSP)</text>\n    <text x=\"65\" y=\"95\" fill=\"#fca5a5\" font-size=\"11\">class Bird { fly() }</text>\n    <text x=\"65\" y=\"120\" fill=\"#fca5a5\" font-size=\"11\">class Penguin extends Bird {</text>\n    <text x=\"80\" y=\"140\" fill=\"#ef4444\" font-size=\"10\">fly() { throw Exception! }</text>\n    <text x=\"300\" y=\"105\" fill=\"#60a5fa\" font-size=\"20\" font-weight=\"bold\">──►</text>\n    <rect x=\"350\" y=\"45\" width=\"350\" height=\"110\" rx=\"8\" fill=\"#0f172a\" stroke=\"#10b981\" stroke-width=\"1.5\"/>\n    <text x=\"525\" y=\"70\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">GOOD (Preserves LSP)</text>\n    <text x=\"370\" y=\"95\" fill=\"#6ee7b7\" font-size=\"11\">abstract class Bird { eat() }</text>\n    <text x=\"370\" y=\"120\" fill=\"#cbd5e1\" font-size=\"10\">interface Flyable { fly() }</text>\n    <text x=\"370\" y=\"140\" fill=\"#10b981\" font-size=\"10\">Sparrow implements Flyable; Penguin extends Bird only!</text>\n  </svg>",
      "diagramCaption": "LSP: Subtypes must adhere to the behavioral contract. Segregating Flyable prevents runtime exceptions.",
      "technicalExplanation": "LSP imposes strict contract rules on subclasses: (1) <strong>Preconditions cannot be strengthened</strong> (the subclass cannot demand more stringent input requirements than the parent), (2) <strong>Postconditions cannot be weakened</strong> (the subclass cannot guarantee less than the parent), and (3) <strong>Invariants must be preserved</strong>. Throwing an unexpected checked/runtime exception where the base method promises successful execution violates the contract.",
      "badVsGood": {
        "badTitle": "Bird and Penguin throwing UnsupportedOperationException",
        "badCode": "public class Bird {\n    public void fly() { System.out.println(\"Flying in the sky\"); }\n}\n\npublic class Penguin extends Bird {\n    @Override\n    public void fly() {\n        // VIOLATES LSP: Subtype breaks client expectations!\n        throw new UnsupportedOperationException(\"Penguins cannot fly!\");\n    }\n}\n\npublic class Sanctuary {\n    public void exercise(Bird bird) {\n        bird.fly(); // CRASHES at runtime if passed a Penguin!\n    }\n}",
        "badWhy": "Client code expecting a Bird assumes calling fly() is safe. Penguin breaks this behavioral contract, causing runtime crashes.",
        "goodTitle": "Segregated Behavioral Hierarchy",
        "goodCode": "public abstract class Bird {\n    public abstract void eat();\n}\n\npublic interface Flyable {\n    void fly();\n}\n\npublic class Sparrow extends Bird implements Flyable {\n    @Override public void eat() { System.out.println(\"Eating worms\"); }\n    @Override public void fly() { System.out.println(\"Sparrow flying high\"); }\n}\n\npublic class Penguin extends Bird {\n    @Override public void eat() { System.out.println(\"Eating fish\"); }\n    // No fly() method forced upon Penguin!\n}",
        "goodWhy": "Subtypes can be substituted anywhere their base contracts are expected. Clients needing flying creatures accept Flyable, eliminating crashes."
      },
      "keyPoints": [
        "**Core Mantra:** Subtypes must be behaviorally substitutable for their base types.",
        "**Exception Warning:** Throwing `UnsupportedOperationException` in an overridden method is a dead giveaway of an LSP violation.",
        "**Code Smell:** Client code filled with `if (obj instanceof Penguin)` checks indicates broken LSP."
      ],
      "interviewQA": [
        {
          "question": "Why does the classic Square-extends-Rectangle example violate LSP?",
          "shortAnswer": "Because a Square forces width and height to remain equal. Calling setWidth() on a Square unexpectedly mutates its height, violating the independent dimensions contract of a Rectangle.",
          "detailedAnswer": "In math, all squares are rectangles. But in object modeling, behavior defines identity. A Rectangle has the behavioral invariant: 'setWidth(w) does not change height'. A Square cannot fulfill this postcondition without violating its own invariant (width == height). Thus, passing a Square into an algorithm designed for Rectangle can corrupt calculations (e.g. area calculations).",
          "followUps": [
            "How do you fix the Square-Rectangle problem in code?",
            "Answer: Make both inherit from an abstract `Shape` or `Quadrilateral` with an `area()` method, avoiding an inheritance relationship between Rectangle and Square."
          ]
        }
      ],
      "quiz": [
        {
          "question": "What is an unmistakable indicator of a Liskov Substitution Principle violation in Java?",
          "options": [
            "A class implements more than one interface",
            "An overridden method throws an UnsupportedOperationException",
            "A class has multiple constructors",
            "A class is marked final"
          ],
          "correct": 1,
          "explanation": "Throwing UnsupportedOperationException in an overridden method breaks the behavioral contract promised by the superclass, violating LSP."
        }
      ]
    },
    {
      "id": "solid-isp",
      "title": "10. Interface Segregation Principle (ISP)",
      "subtitle": "Role-specific interfaces & avoiding fat/polluted interface contracts",
      "whatIsIt": "The Interface Segregation Principle (ISP) states that clients should not be forced to depend upon interfaces they do not use.",
      "whyNeedIt": "When an interface becomes a 'Fat Interface' by bundling printer, scanner, and fax methods into one massive file, a basic home printer is forced to provide empty dummy implementations of `scan()` and `fax()`. Changes to fax specifications force recompilation of basic printer code.",
      "howItWorks": [
        "**Deconstruct Fat Interfaces:** Split large interfaces into small, cohesive, role-based contracts (`Printer`, `Scanner`, `Fax`).",
        "**Combine When Needed:** A high-end office printer implements all three interfaces (`implements Printer, Scanner, Fax`), while a simple printer implements only `Printer`."
      ],
      "realWorldExample": "**Modern USB-C vs. Bulky Legacy Multi-Cables:**\nInstead of forcing every device to carry a giant cable bundle with HDMI, VGA, DVI, Ethernet, and audio jacks permanently glued together, USB-C provides compact modular adapters so you only connect what you actually need.",
      "diagram": "<svg viewBox=\"0 0 740 200\" class=\"responsive-svg\">\n    <rect x=\"20\" y=\"20\" width=\"700\" height=\"160\" rx=\"14\" fill=\"#1e293b\" stroke=\"#334155\" stroke-width=\"2\"/>\n    <rect x=\"50\" y=\"45\" width=\"220\" height=\"110\" rx=\"8\" fill=\"#0f172a\" stroke=\"#ef4444\" stroke-width=\"1.5\"/>\n    <text x=\"160\" y=\"70\" fill=\"#f87171\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">FAT INTERFACE (Violates ISP)</text>\n    <text x=\"65\" y=\"95\" fill=\"#fca5a5\" font-size=\"10\">interface SmartDevice {</text>\n    <text x=\"80\" y=\"115\" fill=\"#94a3b8\" font-size=\"10\">print(), scan(), fax()</text>\n    <text x=\"65\" y=\"135\" fill=\"#ef4444\" font-size=\"9\">BasicPrinter forced to implement fax!</text>\n    <text x=\"300\" y=\"105\" fill=\"#60a5fa\" font-size=\"20\" font-weight=\"bold\">──►</text>\n    <rect x=\"350\" y=\"45\" width=\"350\" height=\"110\" rx=\"8\" fill=\"#0f172a\" stroke=\"#10b981\" stroke-width=\"1.5\"/>\n    <text x=\"525\" y=\"70\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">SEGREGATED INTERFACES (Clean ISP)</text>\n    <text x=\"370\" y=\"95\" fill=\"#6ee7b7\" font-size=\"10\">interface Printer { print() }</text>\n    <text x=\"370\" y=\"115\" fill=\"#6ee7b7\" font-size=\"10\">interface Scanner { scan() }</text>\n    <text x=\"370\" y=\"135\" fill=\"#6ee7b7\" font-size=\"10\">interface Fax { fax() }</text>\n  </svg>",
      "diagramCaption": "ISP: Role-specific interfaces allow clients to depend strictly on the capabilities they actually utilize.",
      "technicalExplanation": "Fat interfaces create accidental coupling: when a method signature changes in a fat interface, all implementing classes must be recompiled and redeployed, even if they never invoked that method. Breaking interfaces down increases cohesion and allows classes to satisfy multiple focused contracts simultaneously via Java's multiple interface implementation support.",
      "badVsGood": {
        "badTitle": "Fat SmartDevice Interface",
        "badCode": "public interface SmartDevice {\n    void print();\n    void scan();\n    void fax();\n}\n\npublic class BasicPrinter implements SmartDevice {\n    @Override public void print() { System.out.println(\"Printing document\"); }\n    @Override public void scan() {\n        // Dummy implementation / throw exception! Violates ISP!\n        throw new UnsupportedOperationException(\"No scanner hardware!\");\n    }\n    @Override public void fax() {\n        throw new UnsupportedOperationException(\"No fax modem!\");\n    }\n}",
        "badWhy": "BasicPrinter is polluted with methods it does not support, forcing dummy code and runtime exceptions.",
        "goodTitle": "Role-Segregated Interfaces",
        "goodCode": "public interface Printer { void print(); }\npublic interface Scanner { void scan(); }\npublic interface Fax { void fax(); }\n\n// Simple device implements only what it needs\npublic class BasicPrinter implements Printer {\n    @Override public void print() { System.out.println(\"Printing document\"); }\n}\n\n// Enterprise all-in-one implements all three interfaces\npublic class SuperMultiFunctionPrinter implements Printer, Scanner, Fax {\n    @Override public void print() { System.out.println(\"Printing...\"); }\n    @Override public void scan() { System.out.println(\"Scanning 600 DPI...\"); }\n    @Override public void fax() { System.out.println(\"Sending fax...\"); }\n}",
        "goodWhy": "Clients demanding only printing can accept a Printer reference, completely decoupled from scanning or faxing hardware."
      },
      "keyPoints": [
        "**Core Mantra:** Clients should never be forced to depend on methods they do not use.",
        "**Fat Interface Smell:** Interfaces with 15+ methods that implementing classes frequently leave empty or throw exceptions for.",
        "**Multiple Interfaces:** Combine multiple small interfaces using `implements InterfaceA, InterfaceB`."
      ],
      "interviewQA": [
        {
          "question": "How is the Interface Segregation Principle related to the Single Responsibility Principle?",
          "shortAnswer": "SRP applies to classes and modules (cohesion of implementation), while ISP applies to interfaces (cohesion of contracts).",
          "detailedAnswer": "A class might satisfy SRP (e.g. an EnterprisePrinter handles printing hardware operations), but if it implements a massive fat interface that bundles unrelated client needs together, it violates ISP. ISP ensures contracts remain focused on client needs rather than monolithic provider capabilities.",
          "followUps": [
            "Give an example of ISP from the Java standard library.",
            "Answer: In `java.util`, interfaces are granular: `Iterable`, `Collection`, `List`, `Set`, `Comparable`."
          ]
        }
      ],
      "quiz": [
        {
          "question": "What problem occurs when a codebase violates the Interface Segregation Principle?",
          "options": [
            "Classes are forced to provide dummy or exception-throwing implementations for unused methods",
            "Classes cannot be compiled in 64-bit JVMs",
            "Constructors cannot be chained",
            "Garbage collection is disabled"
          ],
          "correct": 0,
          "explanation": "Fat interfaces force implementing classes to implement irrelevant methods, resulting in empty stubs or UnsupportedOperationExceptions."
        }
      ]
    },
    {
      "id": "solid-dip",
      "title": "11. Dependency Inversion Principle (DIP)",
      "subtitle": "High-level modules, low-level details & DIP vs. DI vs. IoC",
      "whatIsIt": "The Dependency Inversion Principle (DIP) states that: (1) High-level modules should not depend on low-level modules; both should depend on abstractions, and (2) Abstractions should not depend on details; details should depend on abstractions.",
      "whyNeedIt": "If your `NotificationManager` directly instantiates `new EmailSender()`, you cannot switch to SMS notifications or inject a Mock Email Sender during unit tests without modifying and breaking the core notification manager.",
      "howItWorks": [
        "**Introduce Abstraction:** Create a `MessageSender` interface.",
        "**Low-Level Implements Abstraction:** `EmailSender` and `SmsSender` implement `MessageSender`.",
        "**Constructor Injection:** High-level `NotificationManager` receives `MessageSender` via its constructor, inverted from concrete to abstract.",
        "**DIP vs. DI vs. IoC Distinction:** DIP is the **Principle**; IoC is the **Paradigm**; DI is the concrete **Technique**."
      ],
      "realWorldExample": "**Lamp and Wall Socket:**\nYour desk lamp does not solder its electrical wires directly into your house's electrical breaker box! Both your desk lamp (high-level device) and the power grid (low-level provider) depend on an abstract standard: the electrical wall socket. You can unplug the lamp and plug in a laptop charger without rewiring your house.",
      "diagram": "<svg viewBox=\"0 0 740 220\" class=\"responsive-svg\">\n    <rect x=\"20\" y=\"20\" width=\"700\" height=\"180\" rx=\"14\" fill=\"#1e293b\" stroke=\"#334155\" stroke-width=\"2\"/>\n    <rect x=\"50\" y=\"50\" width=\"220\" height=\"110\" rx=\"8\" fill=\"#0f172a\" stroke=\"#ef4444\" stroke-width=\"1.5\"/>\n    <text x=\"160\" y=\"75\" fill=\"#f87171\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">TIGHT COUPLING (No DIP)</text>\n    <text x=\"70\" y=\"105\" fill=\"#fca5a5\" font-size=\"11\">NotificationManager</text>\n    <text x=\"70\" y=\"125\" fill=\"#94a3b8\" font-size=\"10\">new EmailSender()</text>\n    <text x=\"70\" y=\"145\" fill=\"#ef4444\" font-size=\"9\">Hardcoded to concrete email!</text>\n    <text x=\"300\" y=\"110\" fill=\"#60a5fa\" font-size=\"20\" font-weight=\"bold\">──►</text>\n    <rect x=\"350\" y=\"45\" width=\"350\" height=\"130\" rx=\"8\" fill=\"#0f172a\" stroke=\"#10b981\" stroke-width=\"1.5\"/>\n    <text x=\"525\" y=\"70\" fill=\"#34d399\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">DEPENDENCY INVERSION (Clean DIP)</text>\n    <text x=\"370\" y=\"95\" fill=\"#ffffff\" font-size=\"11\">NotificationManager</text>\n    <text x=\"370\" y=\"115\" fill=\"#60a5fa\" font-size=\"10\">depends on &lt;&lt;interface&gt;&gt; MessageSender</text>\n    <text x=\"370\" y=\"135\" fill=\"#cbd5e1\" font-size=\"10\">EmailSender &amp; SmsSender implement MessageSender</text>\n    <text x=\"370\" y=\"155\" fill=\"#10b981\" font-size=\"10\">✓ Injected via Constructor!</text>\n  </svg>",
      "diagramCaption": "DIP: Inverting control so high-level business managers depend upon an abstraction rather than instantiating concrete low-level services.",
      "technicalExplanation": "Senior engineers must articulate the precise relationship between DIP, IoC, and DI:<br>• <strong>DIP (Design Principle):</strong> High-level concept stating dependencies must point toward abstractions.<br>• <strong>IoC (Inversion of Control - Paradigm):</strong> Inverting the control flow where the lifecycle of objects is managed by an external framework/container (like Spring) rather than the application itself.<br>• <strong>DI (Dependency Injection - Technique):</strong> The mechanical pattern where dependencies are passed into an object (via Constructor, Setter, or Field) rather than created internally.",
      "badVsGood": {
        "badTitle": "Direct Instantiation Anti-Pattern",
        "badCode": "public class NotificationManager {\n    // TIGHT COUPLING: Hardcoded concrete dependency!\n    private EmailSender emailSender = new EmailSender();\n\n    public void sendAlert(String message) {\n        emailSender.send(message); // Cannot switch to SMS or Mock!\n    }\n}",
        "badWhy": "NotificationManager is rigidly glued to EmailSender. Unit testing without sending real emails is impossible.",
        "goodTitle": "Constructor-Injected Abstraction",
        "goodCode": "public interface MessageSender {\n    void send(String message);\n}\n\npublic class EmailSender implements MessageSender {\n    @Override public void send(String msg) { System.out.println(\"Email: \" + msg); }\n}\n\npublic class SmsSender implements MessageSender {\n    @Override public void send(String msg) { System.out.println(\"SMS: \" + msg); }\n}\n\npublic class NotificationManager {\n    private final MessageSender sender; // Inverted to interface\n\n    public NotificationManager(MessageSender sender) { // Injected!\n        this.sender = sender;\n    }\n\n    public void sendAlert(String message) {\n        sender.send(message);\n    }\n}",
        "goodWhy": "In production, inject EmailSender or SmsSender. In unit tests, inject a MockMessageSender to test without external network traffic."
      },
      "keyPoints": [
        "**Core Mantra:** Depend upon abstractions, not concrete details.",
        "**Triad Distinction:** DIP is the Principle; IoC is the Paradigm; DI is the Technique.",
        "**Testability:** Constructor injection allows passing Mockito mocks into classes during unit tests."
      ],
      "interviewQA": [
        {
          "question": "What is the difference between DIP, IoC, and Dependency Injection?",
          "shortAnswer": "DIP is the architectural principle, IoC is the broad design paradigm of delegating control to a container, and DI is the specific coding technique used to pass dependencies in.",
          "detailedAnswer": "Think of building a car. DIP is the architectural requirement that the steering wheel must connect through a standard steering column. IoC is the car assembly plant (the framework) that puts the parts together for you. DI is the mechanical act of sliding the bolt through the steering wheel into the column.",
          "followUps": [
            "Why is Constructor Injection preferred over Field Injection (@Autowired on fields)?",
            "Answer: Constructor injection guarantees immutability (final fields), prevents NullPointerExceptions, and allows instantiating the class in pure unit tests without Spring reflection."
          ]
        }
      ],
      "quiz": [
        {
          "question": "Which pattern is the most common technique used to implement the Dependency Inversion Principle?",
          "options": [
            "Constructor-based Dependency Injection",
            "Single-threaded event loop",
            "Static method chaining",
            "Catching NullPointerExceptions"
          ],
          "correct": 0,
          "explanation": "Constructor Injection passes abstractions into a class, fulfilling the Dependency Inversion Principle cleanly."
        }
      ]
    },
    {
      "id": "pattern-singleton",
      "title": "12. Singleton Pattern (Thread-Safe Double-Checked Locking)",
      "subtitle": "Instruction reordering, volatile memory barriers & reflection guards",
      "whatIsIt": "The Singleton Pattern ensures that a class has only one single instance across the entire application runtime and provides a global access point to that instance.",
      "whyNeedIt": "Certain shared resources like Database Connection Pools, Configuration Managers, and Logger instances must be coordinated globally to prevent resource exhaustion and conflicting state.",
      "howItWorks": [
        "**Private Constructor:** Prevents outside classes from using `new MyClass()`.",
        "**Private Static Volatile Field:** Holds the single instance.",
        "**Double-Checked Locking:** First check tests if `instance == null` without acquiring a lock (fast!). If null, synchronized block locks the class and performs a second null check before instantiation.",
        "**Why `volatile` is strictly required:** Prevents CPU/JIT **Instruction Reordering** (steps 1 -> 3 -> 2) so concurrent threads never read a half-initialized object."
      ],
      "realWorldExample": "**The Government President or Central Bank:**\nA country can have only one active President at a time. All administrative decrees must originate from that single recognized constitutional office.",
      "diagram": "<svg viewBox=\"0 0 740 220\" class=\"responsive-svg\">\n    <rect x=\"20\" y=\"20\" width=\"700\" height=\"180\" rx=\"14\" fill=\"#1e293b\" stroke=\"#334155\" stroke-width=\"2\"/>\n    <text x=\"370\" y=\"45\" fill=\"#f8fafc\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">DOUBLE-CHECKED LOCKING EXECUTION FLOW</text>\n    <rect x=\"50\" y=\"65\" width=\"180\" height=\"40\" rx=\"6\" fill=\"#0f172a\" stroke=\"#3b82f6\" stroke-width=\"1.5\"/>\n    <text x=\"140\" y=\"90\" fill=\"#93c5fd\" font-size=\"11\" text-anchor=\"middle\">Check 1: instance == null?</text>\n    <line x1=\"230\" y1=\"85\" x2=\"280\" y2=\"85\" stroke=\"#94a3b8\" stroke-width=\"2\"/>\n    <rect x=\"280\" y=\"65\" width=\"180\" height=\"40\" rx=\"6\" fill=\"#0f172a\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/>\n    <text x=\"370\" y=\"90\" fill=\"#fbbf24\" font-size=\"11\" text-anchor=\"middle\">synchronized (Class.class)</text>\n    <line x1=\"460\" y1=\"85\" x2=\"510\" y2=\"85\" stroke=\"#94a3b8\" stroke-width=\"2\"/>\n    <rect x=\"510\" y=\"65\" width=\"180\" height=\"40\" rx=\"6\" fill=\"#0f172a\" stroke=\"#10b981\" stroke-width=\"1.5\"/>\n    <text x=\"600\" y=\"90\" fill=\"#34d399\" font-size=\"11\" text-anchor=\"middle\">Check 2: instance == null?</text>\n    <rect x=\"200\" y=\"130\" width=\"340\" height=\"50\" rx=\"6\" fill=\"#7c3aed\" fill-opacity=\"0.3\" stroke=\"#a78bfa\" stroke-width=\"1.5\"/>\n    <text x=\"370\" y=\"152\" fill=\"#ffffff\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">volatile prevents Instruction Reordering!</text>\n    <text x=\"370\" y=\"168\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">Ensures memory write happens before reference publish</text>\n  </svg>",
      "diagramCaption": "Double-Checked Locking: Only acquires the monitor lock on initial creation. volatile creates a memory barrier against instruction reordering.",
      "technicalExplanation": "Object instantiation in the JVM consists of three operations:<br>1. Allocate heap memory.<br>2. Execute constructor to initialize fields.<br>3. Point `instance` reference to the memory block.<br>Because steps 2 and 3 have no data dependency, modern CPUs and JIT compilers can reorder them to <strong>1 -> 3 -> 2</strong>! Without <code>volatile</code>, Thread B could see <code>instance != null</code> (step 3 complete) while Thread A is still executing the constructor (step 2), exposing a partially initialized object to Thread B. <code>volatile</code> establishes a strict <strong>Happens-Before</strong> relationship.",
      "codeBlocks": [
        {
          "title": "DatabaseConnectionPool.java (Thread-Safe Production Singleton)",
          "lang": "java",
          "code": "public class DatabaseConnectionPool {\n    // 1. volatile keyword is MANDATORY to prevent instruction reordering!\n    private static volatile DatabaseConnectionPool instance;\n\n    // 2. Private constructor prevents instantiation via 'new'\n    private DatabaseConnectionPool() {\n        // Reflection attack guard:\n        if (instance != null) {\n            throw new RuntimeException(\"Use getInstance() method to access instance\");\n        }\n        System.out.println(\"Initializing Database Connection Pool...\");\n    }\n\n    // 3. Double-Checked Locking\n    public static DatabaseConnectionPool getInstance() {\n        if (instance == null) { // 1st Check (Fast: No lock!)\n            synchronized (DatabaseConnectionPool.class) {\n                if (instance == null) { // 2nd Check (Thread-safe inside lock)\n                    instance = new DatabaseConnectionPool();\n                }\n            }\n        }\n        return instance;\n    }\n}",
          "explanation": "Double-checked locking ensures that 99.999% of subsequent read requests skip the synchronized block entirely, achieving maximum multithreaded throughput."
        }
      ],
      "keyPoints": [
        "**Core Intent:** Guarantees exactly one instance with global access.",
        "**Why Volatile:** Prevents instruction reordering from exposing half-initialized objects.",
        "**Alternative:** In modern Java, `enum` singletons provide reflection and serialization protection automatically."
      ],
      "interviewQA": [
        {
          "question": "Why is volatile required in Double-Checked Locking in Java?",
          "shortAnswer": "To prevent the JVM and CPU from reordering instructions (1. Allocate memory, 2. Run constructor, 3. Assign pointer) which would allow a thread to observe a partially-initialized object.",
          "detailedAnswer": "In the absence of volatile, instruction reordering can reorder assignment before constructor execution (1 -> 3 -> 2). If Thread A is at step 3, Thread B can call `getInstance()`, observe `instance != null`, and begin reading field values before Thread A has finished writing default constructor values, causing catastrophic silent corruption.",
          "followUps": [
            "How can reflection break a private constructor singleton?",
            "Answer: `constructor.setAccessible(true)` can invoke private constructors. You defend against this by throwing a RuntimeException if `instance != null` inside the constructor."
          ]
        }
      ],
      "quiz": [
        {
          "question": "What danger does the volatile keyword neutralize in a Double-Checked Locking Singleton?",
          "options": [
            "Memory leaks during garbage collection",
            "Instruction reordering causing other threads to read partially-initialized objects",
            "OutOfMemoryError on heap expansion",
            "Slow network latency"
          ],
          "correct": 1,
          "explanation": "Volatile enforces a memory barrier preventing instruction reordering, guaranteeing full constructor completion before the object reference becomes visible."
        }
      ]
    },
    {
      "id": "pattern-factory",
      "title": "13. Factory Method Pattern",
      "subtitle": "Decoupling object creation, extensible factories & Simple vs. GoF Factory",
      "whatIsIt": "The Factory Method Pattern defines an interface or class responsible for creating objects, letting caller code receive an abstract product type without coupling to concrete classes.",
      "whyNeedIt": "If your business logic directly calls `new StripeGateway()`, supporting PayPal or Apple Pay requires modifying client code across multiple files. A Factory isolates instantiation logic into one location.",
      "howItWorks": [
        "**Product Interface:** Declare a common interface (`PaymentGateway`).",
        "**Concrete Products:** `StripeGateway`, `PayPalGateway` implement the interface.",
        "**Factory Class:** Provides a method (`PaymentGatewayFactory.createGateway(type)`) returning `PaymentGateway`."
      ],
      "realWorldExample": "**Bakery Cake Ordering:**\nYou walk into a bakery and order a 'Chocolate Cake'. You do not enter the kitchen to measure cocoa powder, whip eggs, or calibrate oven temperatures. The baker (Factory) produces and hands you a cake that satisfies the cake interface.",
      "codeBlocks": [
        {
          "title": "PaymentGatewayFactory.java",
          "lang": "java",
          "code": "public interface PaymentGateway {\n    void process(double amount);\n}\n\npublic class StripeGateway implements PaymentGateway {\n    @Override public void process(double amount) { System.out.println(\"Processing $\" + amount + \" via Stripe\"); }\n}\n\npublic class PayPalGateway implements PaymentGateway {\n    @Override public void process(double amount) { System.out.println(\"Processing $\" + amount + \" via PayPal\"); }\n}\n\npublic class PaymentGatewayFactory {\n    public static PaymentGateway getGateway(String paymentType) {\n        if (paymentType == null) throw new IllegalArgumentException(\"Type cannot be null\");\n        return switch (paymentType.toUpperCase()) {\n            case \"STRIPE\" -> new StripeGateway();\n            case \"PAYPAL\" -> new PayPalGateway();\n            default -> throw new IllegalArgumentException(\"Unknown provider: \" + paymentType);\n        };\n    }\n}",
          "explanation": "Clients call PaymentGatewayFactory.getGateway('STRIPE') without needing to know concrete class names or their setup procedures."
        }
      ],
      "keyPoints": [
        "**Core Intent:** Decouples object instantiation from business logic.",
        "**Simple Factory vs. GoF Factory:** Simple factory uses a static method with switch/case; GoF Factory Method uses inheritance with an abstract creator method.",
        "**OCP Collaboration:** Can be combined with Reflection or Spring Bean lookup to make the factory fully open for extension."
      ],
      "interviewQA": [
        {
          "question": "What is the difference between Simple Factory and Abstract Factory?",
          "shortAnswer": "A Factory Method creates ONE product. An Abstract Factory is a factory of factories that creates FAMILIES of related products (e.g. MacButton + MacCheckbox).",
          "detailedAnswer": "In Abstract Factory, you have multiple factory methods grouped together to produce compatible UI components (e.g., `createButton()`, `createScrollBar()`) guaranteed to match a specific theme without mixing Windows controls with Mac controls.",
          "followUps": [
            "When should you NOT use a Factory?",
            "Answer: When classes are simple, never change, and adding a factory creates unnecessary indirection (YAGNI)."
          ]
        }
      ],
      "quiz": [
        {
          "question": "What is the primary architectural benefit of using a Factory Method?",
          "options": [
            "It eliminates the need for constructors",
            "It decouples client business logic from concrete product class instantiations",
            "It speeds up CPU bytecode interpretation",
            "It prevents multithreaded race conditions"
          ],
          "correct": 1,
          "explanation": "Factories allow client code to work with abstract interfaces, isolating object instantiation in one dedicated place."
        }
      ]
    },
    {
      "id": "pattern-builder",
      "title": "14. Builder Pattern",
      "subtitle": "Fluent interface, method chaining & eliminating telescoping constructors",
      "whatIsIt": "The Builder Pattern separates the construction of a complex object from its representation, allowing the step-by-step creation of objects with many optional parameters using a fluent chaining API.",
      "whyNeedIt": "When an entity has 10+ fields (where only 2 are mandatory), constructors suffer from the **Telescoping Constructor Anti-Pattern** (`new HttpRequest(url, method, null, null, 5000, false, null)`). Callers easily mix up parameter positions, and readability is terrible.",
      "howItWorks": [
        "**Private Outer Constructor:** Prevents direct `new` creation.",
        "**Static Inner Builder Class:** Mirrors the outer fields and provides fluent setter methods that return `this`.",
        "**Terminal `.build()` Method:** Validates mandatory fields and instantiates the outer immutable object."
      ],
      "realWorldExample": "**Custom Burger Ordering at a Restaurant:**\nYou order a burger: 'Bun and Beef patty (mandatory), add Bacon, add Extra Cheese, no Pickles'. You do not order using a 15-item checkbox string; you assemble your custom burger step-by-step.",
      "codeBlocks": [
        {
          "title": "HttpRequest.java (Fluent Builder Pattern)",
          "lang": "java",
          "code": "public class HttpRequest {\n    private final String url;     // Mandatory\n    private final String method;  // Mandatory\n    private final String body;    // Optional\n    private final int timeout;    // Optional\n\n    private HttpRequest(Builder builder) {\n        this.url = builder.url;\n        this.method = builder.method;\n        this.body = builder.body;\n        this.timeout = builder.timeout;\n    }\n\n    public static class Builder {\n        private final String url;\n        private final String method;\n        private String body = \"\";\n        private int timeout = 3000; // default\n\n        public Builder(String url, String method) {\n            this.url = url;\n            this.method = method;\n        }\n\n        public Builder body(String body) {\n            this.body = body;\n            return this; // Fluent method chaining\n        }\n\n        public Builder timeout(int timeout) {\n            this.timeout = timeout;\n            return this;\n        }\n\n        public HttpRequest build() {\n            // Validation logic before object construction\n            if (url == null || url.isBlank()) throw new IllegalStateException(\"URL required\");\n            return new HttpRequest(this);\n        }\n    }\n}\n\n// Client Usage:\nHttpRequest request = new HttpRequest.Builder(\"https://api.github.com\", \"POST\")\n    .body(\"{\\\"title\\\": \\\"Bug Fix\\\"}\")\n    .timeout(5000)\n    .build();",
          "explanation": "Notice the fluent chaining: method calls return 'this' (the builder), culminating in the terminal build() invocation."
        }
      ],
      "keyPoints": [
        "**Core Intent:** Constructs complex immutable objects with optional fields cleanly.",
        "**Telescoping Antidote:** Eliminates constructors with 10+ confusing parameters.",
        "**Immutability:** Allows creating objects with `final` fields without needing mutable setters."
      ],
      "interviewQA": [
        {
          "question": "Why is the Builder pattern preferred over using a no-arg constructor followed by setters?",
          "shortAnswer": "Setters leave an object in a mutable and potentially incomplete/invalid state during construction. Builder produces a fully-validated, immutable object in one step.",
          "detailedAnswer": "If you use setters (`user.setName(); user.setAge();`), the object exists in an inconsistent intermediate state until all setters are called. Furthermore, anyone can mutate the object later in program flow. A Builder keeps fields private and final, guaranteeing immutability and thread safety.",
          "followUps": [
            "How does Lombok's @Builder annotation work?",
            "Answer: It automatically generates the static inner Builder class at compile time."
          ]
        }
      ],
      "quiz": [
        {
          "question": "What is the Telescoping Constructor Anti-Pattern?",
          "options": [
            "A constructor that calls itself recursively",
            "A series of overloaded constructors with increasingly long parameter lists filled with nulls",
            "A constructor that fails to call super()",
            "A private constructor"
          ],
          "correct": 1,
          "explanation": "Telescoping constructors overload many parameters where callers are forced to pass null for unused fields; Builder eliminates this."
        }
      ]
    },
    {
      "id": "pattern-strategy",
      "title": "15. Strategy Pattern",
      "subtitle": "Interchangeable algorithms, context delegation & runtime algorithm switching",
      "whatIsIt": "The Strategy Pattern defines a family of algorithms, encapsulates each one into a separate class, and makes them interchangeable at runtime. Strategy lets the algorithm vary independently from the clients that use it.",
      "whyNeedIt": "If a shopping cart has 4 payment options (Credit Card, PayPal, Crypto, Apple Pay), using giant `if-else` blocks couples checkout logic to all payment SDKs. Strategy delegates payment to an injected strategy.",
      "howItWorks": [
        "**Strategy Interface:** Defines common execution contract (`PaymentStrategy.pay(amount)`).",
        "**Concrete Strategies:** Implement specific algorithms (`CreditCardStrategy`, `CryptoStrategy`).",
        "**Context Class:** Holds a reference to a Strategy and delegates work to it (`ShoppingCart.checkout()`)."
      ],
      "realWorldExample": "**GPS Navigation Routing:**\nWhen traveling from point A to point B in Google Maps, you can choose: Driving (fastest highway), Walking (pedestrian trails), or Public Transit (trains/busses). The map route calculator switches algorithms based on your choice.",
      "codeBlocks": [
        {
          "title": "PaymentStrategyDemo.java",
          "lang": "java",
          "code": "public interface PaymentStrategy {\n    void pay(double amount);\n}\n\npublic class CreditCardStrategy implements PaymentStrategy {\n    private final String cardNumber;\n    public CreditCardStrategy(String cardNumber) { this.cardNumber = cardNumber; }\n    @Override public void pay(double amount) { System.out.println(\"Paid $\" + amount + \" with Card ending in \" + cardNumber.substring(12)); }\n}\n\npublic class CryptoStrategy implements PaymentStrategy {\n    private final String walletAddress;\n    public CryptoStrategy(String walletAddress) { this.walletAddress = walletAddress; }\n    @Override public void pay(double amount) { System.out.println(\"Paid $\" + amount + \" in BTC to wallet \" + walletAddress); }\n}\n\n// Context\npublic class ShoppingCart {\n    private PaymentStrategy paymentStrategy;\n\n    // Dynamically switch strategy at runtime!\n    public void setPaymentStrategy(PaymentStrategy strategy) {\n        this.paymentStrategy = strategy;\n    }\n\n    public void checkout(double total) {\n        if (paymentStrategy == null) throw new IllegalStateException(\"Payment method required\");\n        paymentStrategy.pay(total);\n    }\n}",
          "explanation": "Notice how ShoppingCart can change payment methods dynamically at runtime via setPaymentStrategy()."
        }
      ],
      "keyPoints": [
        "**Core Intent:** Encapsulates interchangeable algorithms behind a common contract.",
        "**Runtime Switching:** Algorithms can be swapped dynamically on the fly.",
        "**Eliminates Conditionals:** Replaces complex if/else ladders with polymorphism."
      ],
      "interviewQA": [
        {
          "question": "How does the Strategy Pattern differ from the State Pattern?",
          "shortAnswer": "In Strategy, the client usually configures the strategy once to perform an algorithm. In State, the context object transitions between states automatically as internal events occur.",
          "detailedAnswer": "While both share a similar class diagram (Context delegating to an Interface), their intent differs. Strategy is about interchangeable algorithms chosen by the client (e.g. Compression type, Sorting type). State is about an object altering its behavior when its internal state changes (e.g. Order in PENDING vs PAID vs SHIPPED).",
          "followUps": [
            "Is Java's Comparator<T> an example of Strategy?",
            "Answer: Yes! Collections.sort(list, comparator) takes a Comparator strategy to determine sort order."
          ]
        }
      ],
      "quiz": [
        {
          "question": "Which GoF design pattern allows swapping sorting algorithms (QuickSort, MergeSort) dynamically at runtime?",
          "options": [
            "Singleton Pattern",
            "Strategy Pattern",
            "Decorator Pattern",
            "Proxy Pattern"
          ],
          "correct": 1,
          "explanation": "The Strategy Pattern encapsulates interchangeable algorithms, allowing callers to switch strategies dynamically."
        }
      ]
    },
    {
      "id": "pattern-observer",
      "title": "16. Observer Pattern",
      "subtitle": "One-to-many publish/subscribe event broadcasting & decoupled subscribers",
      "whatIsIt": "The Observer Pattern defines a one-to-many dependency between objects so that when one object (the **Subject / Publisher**) changes state, all its dependents (the **Observers / Subscribers**) are notified and updated automatically.",
      "whyNeedIt": "Without Observer, subscribers would have to poll the publisher in a continuous loop (`hasNewVideoYet()?`), wasting CPU and network bandwidth. Observer allows event-driven push notifications.",
      "howItWorks": [
        "**Subject Interface:** `subscribe(Observer)`, `unsubscribe(Observer)`, `notifyObservers()`.",
        "**Observer Interface:** `update(String eventData)`.",
        "**Decoupled Delivery:** When an event occurs, the Subject loops through its list of registered observers and invokes `update()` on each."
      ],
      "realWorldExample": "**YouTube Channel Subscription:**\nYou subscribe to your favorite YouTube channel. You do not refresh the channel page every 10 seconds. When the creator uploads a new video, YouTube pushes a push notification to your phone automatically.",
      "diagram": "<svg viewBox=\"0 0 740 220\" class=\"responsive-svg\">\n    <rect x=\"20\" y=\"20\" width=\"700\" height=\"180\" rx=\"14\" fill=\"#1e293b\" stroke=\"#334155\" stroke-width=\"2\"/>\n    <rect x=\"50\" y=\"65\" width=\"200\" height=\"90\" rx=\"8\" fill=\"#0f172a\" stroke=\"#ef4444\" stroke-width=\"2\"/>\n    <text x=\"150\" y=\"95\" fill=\"#f87171\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Subject: YouTubeChannel</text>\n    <text x=\"150\" y=\"120\" fill=\"#94a3b8\" font-size=\"10\" text-anchor=\"middle\">+ uploadVideo(title)</text>\n    <text x=\"150\" y=\"140\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">loops over subscribers</text>\n    <path d=\"M 250 110 L 370 70 M 250 110 L 370 110 M 250 110 L 370 150\" stroke=\"#60a5fa\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/>\n    <rect x=\"380\" y=\"45\" width=\"310\" height=\"35\" rx=\"6\" fill=\"#0f172a\" stroke=\"#10b981\" stroke-width=\"1.5\"/>\n    <text x=\"535\" y=\"67\" fill=\"#34d399\" font-size=\"11\" text-anchor=\"middle\">Subscriber Alice: notified!</text>\n    <rect x=\"380\" y=\"92\" width=\"310\" height=\"35\" rx=\"6\" fill=\"#0f172a\" stroke=\"#10b981\" stroke-width=\"1.5\"/>\n    <text x=\"535\" y=\"114\" fill=\"#34d399\" font-size=\"11\" text-anchor=\"middle\">Subscriber Bob: notified!</text>\n    <rect x=\"380\" y=\"140\" width=\"310\" height=\"35\" rx=\"6\" fill=\"#0f172a\" stroke=\"#10b981\" stroke-width=\"1.5\"/>\n    <text x=\"535\" y=\"162\" fill=\"#34d399\" font-size=\"11\" text-anchor=\"middle\">Subscriber Charlie: notified!</text>\n  </svg>",
      "diagramCaption": "Observer Pattern: Subject broadcasts updates to all registered subscribers without coupling to their concrete implementations.",
      "codeBlocks": [
        {
          "title": "YouTubeObserverDemo.java",
          "lang": "java",
          "code": "import java.util.ArrayList;\nimport java.util.List;\n\npublic interface Observer {\n    void update(String videoTitle);\n}\n\npublic interface Subject {\n    void subscribe(Observer o);\n    void unsubscribe(Observer o);\n    void notifyObservers(String videoTitle);\n}\n\npublic class YouTubeChannel implements Subject {\n    private final String channelName;\n    private final List<Observer> subscribers = new ArrayList<>();\n\n    public YouTubeChannel(String name) { this.channelName = name; }\n\n    @Override public void subscribe(Observer o) { subscribers.add(o); }\n    @Override public void unsubscribe(Observer o) { subscribers.remove(o); }\n\n    @Override\n    public void notifyObservers(String videoTitle) {\n        for (Observer sub : subscribers) {\n            sub.update(videoTitle);\n        }\n    }\n\n    public void uploadVideo(String title) {\n        System.out.println(channelName + \" uploaded: \" + title);\n        notifyObservers(title);\n    }\n}\n\npublic class User implements Observer {\n    private final String username;\n    public User(String username) { this.username = username; }\n    @Override\n    public void update(String videoTitle) {\n        System.out.println(\"Notification to \" + username + \": New video - \" + videoTitle);\n    }\n}",
          "explanation": "Subscribers register with the channel. When uploadVideo is invoked, notifyObservers broadcasts updates to all active listeners."
        }
      ],
      "simulation": {
        "id": "observer",
        "title": "YouTube Channel Publish-Subscribe Simulator",
        "description": "Add or remove subscribers dynamically and broadcast video notifications to observe event propagation.",
        "buttons": [
          {
            "label": "Subscribe New User",
            "action": "add"
          },
          {
            "label": "Unsubscribe User",
            "action": "remove",
            "isDanger": true
          },
          {
            "label": "Upload Video & Broadcast",
            "action": "notify"
          }
        ],
        "initialOutput": "Channel 'TechMaster' created. Current Subscribers: Alice, Bob."
      },
      "keyPoints": [
        "**Core Intent:** One-to-many publish/subscribe event distribution.",
        "**Loose Coupling:** The subject stores an `Observer` interface list, knowing nothing of subscriber concrete implementations.",
        "**Memory Leak Risk:** Observers must unsubscribe when finished, or the subject keeps strong references in memory (Lapsed Listener Problem)."
      ],
      "interviewQA": [
        {
          "question": "What is the 'Lapsed Listener' problem in the Observer pattern, and how do you prevent it in Java?",
          "shortAnswer": "When subscribers forget to unsubscribe, the subject retains a strong reference to them, preventing garbage collection and causing severe memory leaks.",
          "detailedAnswer": "In long-lived subjects (e.g. ApplicationEventPublisher), holding strong references to short-lived UI components or listeners keeps those objects pinned in the heap. Solutions include: (1) Requiring explicit deregistration in cleanup methods (`destroy()` or `close()`), or (2) Using `WeakReference<Observer>` so garbage collection can reclaim listeners when no external references exist.",
          "followUps": [
            "How does Kafka differ from the GoF Observer pattern?",
            "Answer: Kafka is an asynchronous distributed commit log that persists events to disk with consumer offset tracking, whereas GoF Observer is an in-memory synchronous method invocation pattern."
          ]
        }
      ],
      "quiz": [
        {
          "question": "What is the primary memory leak risk associated with the Observer pattern in Java?",
          "options": [
            "Constructors cannot be garbage collected",
            "Subscribers forgetting to unsubscribe remain referenced by the Subject, preventing GC (Lapsed Listener problem)",
            "Interfaces allocate heap memory permanently",
            "Observer pattern disables Java virtual memory"
          ],
          "correct": 1,
          "explanation": "Because the subject holds strong references to all observers, failing to unsubscribe prevents garbage collection of listener instances."
        }
      ]
    },
    {
      "id": "oop-interview-qa",
      "title": "17. Deep-Dive Technical Interview Questions (The Full 10)",
      "subtitle": "Tricky edge cases, JVM memory mechanics & senior engineering follow-ups",
      "whatIsIt": "A curated collection of the top 10 most challenging and nuanced technical interview questions on OOP, Design Principles, and Java Architecture, complete with 30-second summary answers and deep technical breakdowns.",
      "whyNeedIt": "Technical interviewers at top tech firms do not ask for textbook definitions. They probe edge cases, JVM internals, memory models, and architectural trade-offs to assess your true technical depth.",
      "howItWorks": [
        "Review each question and internalize the 30-Second Elevator Pitch.",
        "Study the Deep Technical Explanation to understand the underlying JVM memory, bytecode, and architectural principles.",
        "Prepare for likely follow-up questions."
      ],
      "interviewQA": [
        {
          "question": "Q1: Can private or static methods be overridden in Java? Why or why not?",
          "shortAnswer": "No. Private methods are not inherited because they are not visible to subclasses. Static methods belong to classes and are bound at compile-time to the reference type (Static Method Hiding), not via dynamic dispatch.",
          "detailedAnswer": "Method overriding requires dynamic runtime polymorphism via the Virtual Method Table (vtable). Private methods are bound via `invokespecial` bytecode instruction at compile time. Static methods are bound via `invokestatic` based strictly on the reference type declared at compile time. Redefining a static method in a subclass is merely hiding, not overriding.",
          "followUps": [
            "Can a final method be overridden?",
            "Answer: No! The 'final' modifier forbids method overriding explicitly."
          ]
        },
        {
          "question": "Q2: Why does Java support multiple interface inheritance but not multiple class inheritance?",
          "shortAnswer": "To prevent the Diamond Problem and state ambiguity. Classes carry mutable instance fields; multiple class inheritance would cause conflicting member states in heap memory. Interfaces carry no instance state.",
          "detailedAnswer": "If class D extended class B and class C, and both inherited instance variable `int x` from A, class D would inherit duplicate conflicting state variables. Interfaces carry no instance fields. Even with Java 8 default methods, collisions are resolved by the compiler forcing class D to explicitly override the conflicting method.",
          "followUps": [
            "How does Java resolve default method conflicts?",
            "Answer: Using `InterfaceName.super.methodName()` syntax."
          ]
        },
        {
          "question": "Q3: What is the exact relationship between DIP, IoC, and Dependency Injection?",
          "shortAnswer": "DIP is the high-level design principle ('depend on abstractions'). IoC is the architectural paradigm ('inverting control flow to a container'). DI is the concrete coding technique ('injecting dependencies via constructor').",
          "detailedAnswer": "DIP dictates architectural direction. IoC inverts program execution (the framework calls your code, not vice versa). DI is the mechanism that achieves DIP and IoC by passing dependencies into constructors rather than having classes instantiate them via `new`.",
          "followUps": [
            "What is an IoC container?",
            "Answer: A framework engine (like Spring ApplicationContext) that instantiates, wires, and manages object lifecycles."
          ]
        },
        {
          "question": "Q4: Why must the instance variable be marked volatile in Double-Checked Locking Singleton?",
          "shortAnswer": "To prevent CPU and JIT compiler instruction reordering from exposing a partially-initialized object to other concurrent threads.",
          "detailedAnswer": "Object construction takes 3 steps: allocate memory (1), run constructor (2), assign reference (3). The compiler/CPU can reorder this to 1 -> 3 -> 2. Without volatile, Thread B can see `instance != null` at step 3 while Thread A is still executing step 2, reading corrupted state. Volatile enforces a Happens-Before memory barrier.",
          "followUps": [
            "Can an enum singleton be broken by reflection?",
            "Answer: No! JVM reflection explicitly throws an IllegalArgumentException when attempting to instantiate an Enum."
          ]
        },
        {
          "question": "Q5: Can an abstract class have a constructor? What is its purpose?",
          "shortAnswer": "Yes. Abstract class constructors cannot be called via 'new', but are executed via constructor chaining (`super()`) when concrete subclasses are instantiated to initialize shared base state.",
          "detailedAnswer": "An abstract class often has private or protected fields (e.g. `id`, `createdAt`) that require invariant validation during instantiation. The constructor enforces base invariant rules before child initializers execute.",
          "followUps": [
            "Can an interface have a constructor?",
            "Answer: No. Interfaces cannot hold instance state and cannot declare constructors."
          ]
        },
        {
          "question": "Q6: What is a Covariant Return Type in method overriding?",
          "shortAnswer": "A feature introduced in Java 5 that permits an overriding method in a subclass to return a narrower subtype of the return type declared in the parent method.",
          "detailedAnswer": "In Java 1.4, an overriding method had to match the return type exactly. Since Java 5, if `Parent.produce()` returns `Animal`, `Child.produce()` is allowed to return `Dog` (`Dog` is a covariant subtype of `Animal`), eliminating unnecessary type casting for callers.",
          "code": "class Parent { public Animal get() { return new Animal(); } }\nclass Child extends Parent { @Override public Dog get() { return new Dog(); } }"
        },
        {
          "question": "Q7: What is the difference between Shallow Copy and Deep Copy?",
          "shortAnswer": "Shallow copy duplicates the top-level object but copies references for internal objects (both share the same nested memory). Deep copy recursively clones all nested objects into new independent heap memory.",
          "detailedAnswer": "If object A holds a `List<Order>`, a shallow copy creates a new object B whose `orders` pointer refers to the exact same list as A. Mutating B's list mutates A's list! A deep copy instantiates a brand new List and copies each Order into new memory addresses.",
          "followUps": [
            "How is deep copy implemented in Java?",
            "Answer: Via copy constructors, serialization/deserialization, or libraries like Jackson/Gson."
          ]
        },
        {
          "question": "Q8: How does String Immutability in Java relate to OOP principles?",
          "shortAnswer": "String immutability represents pure Encapsulation and Invariant Protection. The class is final, the underlying char/byte array is private final, and no setters exist.",
          "detailedAnswer": "Immutability guarantees absolute thread safety without locks, enables String Pool caching to conserve heap memory, allows caching the hashCode value, and prevents security exploits when strings represent file paths or database URLs.",
          "followUps": [
            "Why is String declared final?",
            "Answer: To prevent subclasses from overriding methods and altering immutable behavior."
          ]
        },
        {
          "question": "Q9: What is the Fragile Base Class problem?",
          "shortAnswer": "An architectural hazard in inheritance where seemingly safe internal modifications to a superclass unexpectedly corrupt or break the behavior of derived subclasses.",
          "detailedAnswer": "Because inheritance exposes superclass implementation details to subclasses, subclasses often depend on implicit assumptions (such as whether `addAll()` calls `add()`). When the base class changes its internal implementation, subclasses break across the application. Solved by favoring Composition over Inheritance.",
          "followUps": [
            "How does composition solve the Fragile Base Class problem?",
            "Answer: By interacting strictly through public interfaces, shielding internal changes."
          ]
        },
        {
          "question": "Q10: When would a senior engineer intentionally avoid Design Patterns or violate SOLID?",
          "shortAnswer": "In simple throwaway scripts, short-lived prototypes, or ultra-low latency systems (HFT) where premature abstraction introduces needless complexity (YAGNI) or polymorphic vtable overhead.",
          "detailedAnswer": "Over-engineering with 15 interfaces for a 20-line script is an anti-pattern. Furthermore, in high-frequency trading (HFT), polymorphic virtual method dispatch (vtables) prevents compiler inlining and introduces CPU cache misses. Pragmatic engineers apply SOLID when complexity and team scale justify it, adhering to KISS and YAGNI.",
          "followUps": [
            "What does YAGNI stand for?",
            "Answer: You Aren't Gonna Need It!"
          ]
        }
      ],
      "keyPoints": [
        "**Deep Technical Precision:** Ground your interview answers in memory models, vtables, and bytecode.",
        "**Trade-Off Awareness:** Senior engineers recognize when patterns become premature over-engineering.",
        "**Core Mantra:** Understand the WHY behind every language rule."
      ],
      "quiz": [
        {
          "question": "What is a Covariant Return Type in Java?",
          "options": [
            "A method returning multiple values simultaneously",
            "An overriding subclass method returning a narrower subtype of the parent's return type",
            "A method returning a void primitive",
            "A method that cannot return null"
          ],
          "correct": 1,
          "explanation": "Covariant returns allow an overriding method to return a subtype of the return type declared in the superclass."
        }
      ]
    },
    {
      "id": "oop-cheat-sheet",
      "title": "18. Two-Minute Pre-Interview Revision Cheat Sheet",
      "subtitle": "High-density summary of all core concepts for rapid last-minute revision",
      "whatIsIt": "A high-density revision matrix designed for the final 2 minutes before stepping into your software engineering technical interview room.",
      "whyNeedIt": "Quickly refreshes your mental model on core definitions, SOLID mnemonics, and top design pattern intents.",
      "howItWorks": [
        "Scan the cheat sheet cards right before your interview.",
        "Recall key terms: Invariant Protection, Dynamic Dispatch, vtable, Fragile Base Class, Double-Checked Locking.",
        "Walk into your interview with confidence!"
      ],
      "cheatSheet": {
        "items": [
          {
            "term": "Encapsulation",
            "desc": "Bundling data + methods with **Invariant Protection**. Not just getters/setters."
          },
          {
            "term": "Abstraction",
            "desc": "Exposing 'What it does' (Contract/Interface) while hiding 'How it does it' (Implementation)."
          },
          {
            "term": "Inheritance vs Composition",
            "desc": "**Favor Composition over Inheritance**. Inheritance = Is-A (tight coupling, fragile base class). Composition = Has-A (loose coupling, runtime flexibility)."
          },
          {
            "term": "Polymorphism Dispatch",
            "desc": "Overloading = Compile-time static binding. Overriding = Runtime dynamic dispatch via heap object vtable. Static methods are hidden, not overridden!"
          },
          {
            "term": "Abstract Class vs Interface",
            "desc": "Abstract Class = Shared state, constructors, single inheritance. Interface = Stateless capability contract, multiple inheritance."
          },
          {
            "term": "Diamond Problem",
            "desc": "Conflicting default methods in Java 8 interfaces are resolved by explicitly overriding via `Interface.super.method()`."
          },
          {
            "term": "SOLID: S - SRP",
            "desc": "**Single Responsibility**: One class = One reason to change."
          },
          {
            "term": "SOLID: O - OCP",
            "desc": "**Open/Closed**: Open for extension, closed for modification via polymorphism."
          },
          {
            "term": "SOLID: L - LSP",
            "desc": "**Liskov Substitution**: Subtypes must be substitutable for base types without throwing unexpected exceptions."
          },
          {
            "term": "SOLID: I - ISP",
            "desc": "**Interface Segregation**: Don't force clients to implement fat interfaces they don't use."
          },
          {
            "term": "SOLID: D - DIP",
            "desc": "**Dependency Inversion**: High-level modules depend on Abstractions, not concrete details. DIP = Principle, IoC = Paradigm, DI = Technique."
          },
          {
            "term": "Singleton Pattern",
            "desc": "One instance globally. Use **Double-Checked Locking with volatile** to prevent instruction reordering."
          },
          {
            "term": "Factory Pattern",
            "desc": "Decouples object creation from business logic, returning abstract products."
          },
          {
            "term": "Builder Pattern",
            "desc": "Eliminates telescoping constructors with a fluent chaining API for complex immutable objects."
          },
          {
            "term": "Strategy Pattern",
            "desc": "Encapsulates interchangeable algorithms swapped dynamically at runtime."
          },
          {
            "term": "Observer Pattern",
            "desc": "One-to-many publish-subscribe event broadcasting to decoupled listeners."
          }
        ]
      },
      "keyPoints": [
        "**Fast Recall:** Memorize the 5 SOLID letters and their core rules.",
        "**Architecture Key:** Always mention Invariant Protection when asked about Encapsulation.",
        "**Design Patterns:** Know Singleton (volatile), Factory, Builder, Strategy, and Observer cold."
      ],
      "quiz": [
        {
          "question": "Which SOLID principle is directly addressed by using the Strategy Pattern?",
          "options": [
            "Open/Closed Principle (OCP)",
            "Interface Segregation Principle (ISP)",
            "Single Responsibility Principle only",
            "Liskov Substitution Principle only"
          ],
          "correct": 0,
          "explanation": "The Strategy Pattern allows extending algorithms with new classes without modifying existing client code, embodying the Open/Closed Principle."
        }
      ]
    }
  ],
  "flashcards": [
    {
      "term": "Encapsulation & Invariants",
      "category": "OOP Pillars",
      "question": "What is an Invariant in OOP?",
      "answer": "A business condition or rule that must always remain true for an object throughout its entire lifecycle (e.g., account balance >= 0). Encapsulation protects invariants from being broken.",
      "tip": "Encapsulation = Invariant Protection."
    },
    {
      "term": "vtable (Virtual Method Table)",
      "category": "JVM Internals",
      "question": "How does the JVM execute Dynamic Method Dispatch at runtime?",
      "answer": "Every loaded class has an internal vtable (array of function pointers). Subclass overrides replace parent entries. At runtime, the JVM looks up the method offset in the heap object's vtable in O(1) time.",
      "tip": "Heap object vtable determines the method pointer."
    },
    {
      "term": "Covariant Return Type",
      "category": "Polymorphism",
      "question": "Can an overriding subclass method return a different type than the parent method?",
      "answer": "Yes, but ONLY if the return type is a narrower subtype of the parent's return type (e.g. parent returns Animal, child returns Dog).",
      "tip": "Allowed since Java 5."
    },
    {
      "term": "Static Method Hiding",
      "category": "Polymorphism",
      "question": "Can static methods be overridden in Java?",
      "answer": "No. Static methods belong to classes and bind at compile-time to the reference type. Declaring the same static signature in a subclass hides the parent method, but does not override it.",
      "tip": "Static methods are hidden, not overridden."
    }
  ]
};
