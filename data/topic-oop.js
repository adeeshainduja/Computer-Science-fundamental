// Topic 1: Object-Oriented Programming (OOP) & Design Principles
var topicOOP = window.topicOOP = {
  id: "oop",
  title: "Object-Oriented Programming & Design",
  shortTitle: "OOP & Design",
  icon: "🧩",
  badge: "Core Architecture",
  readingTime: "18 min read",
  description: "Learn how modern software is built using objects, reusable blueprints, the 4 fundamental pillars, SOLID design principles, and classic design patterns.",
  learningObjectives: [
    "Understand classes, objects, and state vs. behavior in simple terms",
    "Master the 4 Pillars of OOP: Encapsulation, Abstraction, Inheritance, and Polymorphism",
    "Learn why Composition is often better than Inheritance",
    "Understand SOLID principles using everyday analogies and clean examples",
    "Explore essential Design Patterns: Singleton, Factory, Builder, Observer, and Strategy"
  ],
  lessons: [
    {
      id: "oop-intro-pillars",
      title: "1. The 4 Pillars of OOP",
      subtitle: "Encapsulation, Abstraction, Inheritance & Polymorphism",
      whatIsIt: "Object-Oriented Programming (OOP) is a way of organizing code by bundling data (information) and methods (actions) together into entities called **Objects**. Objects are created using blueprints called **Classes**. The four core pillars that make OOP powerful are **Encapsulation**, **Abstraction**, **Inheritance**, and **Polymorphism**.",
      whyNeedIt: "Without OOP, programs quickly become messy spaghetti code where any function can tamper with any variable. OOP gives code structure, safety, and reusability, allowing teams to build complex software like banking apps or games without breaking things when adding new features.",
      howItWorks: [
        "**Classes & Objects:** A **Class** is the blueprint (like an architectural drawing of a house), while an **Object** is the actual house built from that blueprint with real rooms and paint colors.",
        "**Encapsulation (Data Shielding):** Bundles fields inside a class and marks them `private`. The outside world can only read or change data through controlled `public` methods (getters/setters). This prevents invalid values (e.g. setting an account balance to -$5,000).",
        "**Abstraction (Hiding Complexity):** Shows only essential features while hiding the messy internal machinery. When you push the gas pedal in a car, you don't need to know how fuel injection valves spray gasoline inside the engine.",
        "**Inheritance (Code Reuse):** Allows a child class (`ElectricCar`) to inherit all the properties and methods of a parent class (`Vehicle`), avoiding repetitive copy-pasting.",
        "**Polymorphism (Many Forms):** Allows different classes to respond to the same command in their own unique way. If you tell a `Dog` and a `Cat` to `makeSound()`, the dog barks and the cat meows."
      ],
      realWorldExample: "**Your Smartphone:**\n- **Encapsulation:** The internal battery and motherboard are sealed inside a glass case. You can only interact through buttons and the touchscreen.\n- **Abstraction:** When you tap 'Take Photo', the phone focuses lenses and calculates sensor exposure automatically. You only see the camera button.\n- **Inheritance:** An `iPhone 15 Pro` inherits all core features from `Smartphone`, but adds special telephoto lenses.\n- **Polymorphism:** Tapping the 'Power Button' locks an idle phone, turns off the flashlight if active, or displays a slide-to-power-off prompt when held.",
      diagram: `
        <svg viewBox="0 0 760 300" class="responsive-svg" aria-label="The 4 Pillars of OOP Diagram">
          <rect x="10" y="10" width="170" height="260" rx="16" fill="var(--card-bg)" stroke="#3b82f6" stroke-width="2"/>
          <circle cx="95" cy="55" r="28" fill="#3b82f6" fill-opacity="0.15"/>
          <text x="95" y="63" font-size="24" text-anchor="middle" fill="#3b82f6">🛡️</text>
          <text x="95" y="110" font-size="16" font-weight="bold" text-anchor="middle" fill="var(--text-primary)">Encapsulation</text>
          <text x="95" y="135" font-size="12" text-anchor="middle" fill="var(--text-secondary)">Data Shielding</text>
          <rect x="25" y="160" width="140" height="90" rx="8" fill="var(--bg-subtle)"/>
          <text x="95" y="185" font-size="11" text-anchor="middle" fill="var(--text-primary)">Private Fields 🔒</text>
          <text x="95" y="205" font-size="11" text-anchor="middle" fill="var(--text-secondary)">+ Getters & Setters</text>
          <text x="95" y="230" font-size="10" text-anchor="middle" fill="#10b981">Prevents Bad Data</text>

          <rect x="200" y="10" width="170" height="260" rx="16" fill="var(--card-bg)" stroke="#8b5cf6" stroke-width="2"/>
          <circle cx="285" cy="55" r="28" fill="#8b5cf6" fill-opacity="0.15"/>
          <text x="285" y="63" font-size="24" text-anchor="middle" fill="#8b5cf6">🎛️</text>
          <text x="285" y="110" font-size="16" font-weight="bold" text-anchor="middle" fill="var(--text-primary)">Abstraction</text>
          <text x="285" y="135" font-size="12" text-anchor="middle" fill="var(--text-secondary)">Hide Complexity</text>
          <rect x="215" y="160" width="140" height="90" rx="8" fill="var(--bg-subtle)"/>
          <text x="285" y="185" font-size="11" text-anchor="middle" fill="var(--text-primary)">Simple Interface 🔘</text>
          <text x="285" y="205" font-size="11" text-anchor="middle" fill="var(--text-secondary)">Hides messy internal</text>
          <text x="285" y="230" font-size="10" text-anchor="middle" fill="#8b5cf6">Easy to Use</text>

          <rect x="390" y="10" width="170" height="260" rx="16" fill="var(--card-bg)" stroke="#ec4899" stroke-width="2"/>
          <circle cx="475" cy="55" r="28" fill="#ec4899" fill-opacity="0.15"/>
          <text x="475" y="63" font-size="24" text-anchor="middle" fill="#ec4899">🧬</text>
          <text x="475" y="110" font-size="16" font-weight="bold" text-anchor="middle" fill="var(--text-primary)">Inheritance</text>
          <text x="475" y="135" font-size="12" text-anchor="middle" fill="var(--text-secondary)">Code Reuse</text>
          <rect x="405" y="160" width="140" height="90" rx="8" fill="var(--bg-subtle)"/>
          <text x="475" y="185" font-size="11" text-anchor="middle" fill="var(--text-primary)">Parent Class ⬆️</text>
          <text x="475" y="205" font-size="11" text-anchor="middle" fill="var(--text-secondary)">Child inherits logic</text>
          <text x="475" y="230" font-size="10" text-anchor="middle" fill="#ec4899">Zero Copy-Paste</text>

          <rect x="580" y="10" width="170" height="260" rx="16" fill="var(--card-bg)" stroke="#f59e0b" stroke-width="2"/>
          <circle cx="665" cy="55" r="28" fill="#f59e0b" fill-opacity="0.15"/>
          <text x="665" y="63" font-size="24" text-anchor="middle" fill="#f59e0b">🎭</text>
          <text x="665" y="110" font-size="16" font-weight="bold" text-anchor="middle" fill="var(--text-primary)">Polymorphism</text>
          <text x="665" y="135" font-size="12" text-anchor="middle" fill="var(--text-secondary)">Many Forms</text>
          <rect x="595" y="160" width="140" height="90" rx="8" fill="var(--bg-subtle)"/>
          <text x="665" y="185" font-size="11" text-anchor="middle" fill="var(--text-primary)">Same Method Name</text>
          <text x="665" y="205" font-size="11" text-anchor="middle" fill="var(--text-secondary)">Unique Behavior 🐕🐈</text>
          <text x="665" y="230" font-size="10" text-anchor="middle" fill="#f59e0b">Dynamic Binding</text>
        </svg>
      `,
      diagramCaption: "The 4 Pillars of OOP work together like the outer shell (Encapsulation), dashboard buttons (Abstraction), vehicle family tree (Inheritance), and universal pedals (Polymorphism) of a modern car.",
      keyPoints: [
        "**Classes** are blueprints; **Objects** are living instances in memory.",
        "**Encapsulation** protects object integrity by making variables `private` and exposing safe `public` methods.",
        "**Abstraction** simplifies systems by hiding complex implementation details behind a clean interface.",
        "**Inheritance** creates 'Is-A' relationships so child classes can reuse parent code.",
        "**Polymorphism** allows one general function call (like `render()`) to execute differently for different objects (Button, Image, Text)."
      ],
      deepDive: {
        title: "Deep Dive: Method Overloading vs. Overriding",
        content: "In technical terms, **Compile-time Polymorphism** (Overloading) happens when multiple methods in the same class share the same name but have different parameter lists (e.g. `add(int a, int b)` vs `add(double a, double b)`). The compiler chooses which one to run before the program starts.<br><br>**Runtime Polymorphism** (Overriding) happens when a child class rewrites a method inherited from a parent class using the `@Override` annotation. The Java Virtual Machine decides which method to run dynamically at runtime depending on the actual object stored in memory."
      },
      quiz: [
        {
          question: "Which OOP pillar protects an object's internal variables from being changed to invalid values directly?",
          options: ["Inheritance", "Encapsulation", "Polymorphism", "Abstraction"],
          correct: 1,
          explanation: "Encapsulation marks fields private and only permits validated changes through methods like getters and setters."
        },
        {
          question: "A TV remote control has buttons like 'Volume Up' and 'Power'. You don't need to know how the infrared circuits work inside. Which OOP concept is this?",
          options: ["Abstraction", "Inheritance", "Polymorphism", "Coupling"],
          correct: 0,
          explanation: "Abstraction hides messy internal circuitry behind clean, simple, understandable user controls."
        }
      ]
    },
    {
      id: "oop-abstract-composition",
      title: "2. Abstract Classes, Interfaces & Composition",
      subtitle: "Designing flexible contracts & 'Has-A' vs 'Is-A'",
      whatIsIt: "An **Interface** is a pure contract that tells a class *what* it must do, but not *how* to do it. An **Abstract Class** is a partially built blueprint that can provide some working methods while leaving other methods for subclasses to complete. **Composition** means building complex objects by combining smaller, independent parts ('Has-A') rather than inheriting from a huge ancestor tree ('Is-A').",
      whyNeedIt: "In real-world software, requirements change constantly. If you rely too heavily on rigid inheritance trees, changing a parent class can break dozens of child classes. Modern software engineers follow the golden rule: **'Favor Composition over Inheritance'** to build flexible, modular code.",
      howItWorks: [
        "**Interface (The Universal Contract):** Contains method signatures with no state. A class can implement multiple interfaces (e.g. a `SmartWatch` implements `TimeTracker`, `HeartRateMonitor`, and `BluetoothDevice`).",
        "**Abstract Class (The Incomplete Blueprint):** Cannot be instantiated directly. Use it when child classes share a significant amount of identical code, but must implement specific abstract methods on their own.",
        "**'Is-A' (Inheritance):** A `Sparrow` **is a** `Bird`. This links them permanently.",
        "**'Has-A' (Composition):** A `Car` **has an** `Engine`. If the engine needs to switch from Petrol to Electric, you simply swap the engine object without redesigning the entire car!"
      ],
      realWorldExample: "**PC Building vs. Monolithic Device:**\n- If you buy an all-in-one laptop where RAM, CPU, and graphics are permanently soldered to the motherboard, that's rigid tight coupling.\n- If you build a Desktop PC using **Composition**, your PC **has a** graphics card, **has a** power supply, and **has a** storage drive. You can upgrade the graphics card whenever you want without buying a new monitor or case!",
      diagram: `
        <svg viewBox="0 0 740 220" class="responsive-svg" aria-label="Composition vs Inheritance Diagram">
          <g transform="translate(10, 10)">
            <rect width="340" height="200" rx="12" fill="var(--card-bg)" stroke="#ef4444" stroke-width="2"/>
            <text x="170" y="30" font-size="14" font-weight="bold" text-anchor="middle" fill="#ef4444">Inheritance ('Is-A') - Rigid</text>
            <rect x="110" y="50" width="120" height="36" rx="6" fill="#ef4444" fill-opacity="0.2"/>
            <text x="170" y="73" font-size="12" font-weight="bold" text-anchor="middle" fill="var(--text-primary)">Vehicle</text>
            <line x1="170" y1="86" x2="170" y2="120" stroke="#ef4444" stroke-width="2"/>
            <rect x="40" y="120" width="110" height="36" rx="6" fill="var(--bg-subtle)"/>
            <text x="95" y="143" font-size="11" text-anchor="middle" fill="var(--text-primary)">Car</text>
            <rect x="190" y="120" width="110" height="36" rx="6" fill="var(--bg-subtle)"/>
            <text x="245" y="143" font-size="11" text-anchor="middle" fill="var(--text-primary)">Boat</text>
            <text x="170" y="185" font-size="11" text-anchor="middle" fill="var(--text-secondary)">Tightly coupled; hard to change</text>
          </g>

          <g transform="translate(390, 10)">
            <rect width="340" height="200" rx="12" fill="var(--card-bg)" stroke="#10b981" stroke-width="2"/>
            <text x="170" y="30" font-size="14" font-weight="bold" text-anchor="middle" fill="#10b981">Composition ('Has-A') - Flexible</text>
            <rect x="40" y="50" width="100" height="40" rx="6" fill="#10b981" fill-opacity="0.2"/>
            <text x="90" y="75" font-size="12" font-weight="bold" text-anchor="middle" fill="var(--text-primary)">Car</text>
            <line x1="140" y1="70" x2="190" y2="70" stroke="#10b981" stroke-width="2"/>
            <text x="165" y="65" font-size="10" text-anchor="middle" fill="#10b981">has a</text>
            <rect x="200" y="50" width="110" height="40" rx="6" fill="var(--bg-subtle)"/>
            <text x="255" y="75" font-size="11" text-anchor="middle" fill="var(--text-primary)">Engine ⚙️</text>
            <rect x="200" y="105" width="110" height="35" rx="6" fill="var(--bg-subtle)"/>
            <text x="255" y="127" font-size="11" text-anchor="middle" fill="var(--text-primary)">GPS Unit 🛰️</text>
            <text x="170" y="185" font-size="11" text-anchor="middle" fill="var(--text-secondary)">Swap parts at runtime with zero breakage!</text>
          </g>
        </svg>
      `,
      diagramCaption: "Composition connects small interchangeable pieces together like LEGO bricks, making software easy to test, maintain, and upgrade.",
      keyPoints: [
        "**Interfaces** define behaviors (*what to do*); classes provide the implementation (*how to do it*).",
        "A class can inherit from only one parent class, but can implement **multiple interfaces**.",
        "**Inheritance ('Is-A')** binds classes tightly; changes in the parent ripple down to all children.",
        "**Composition ('Has-A')** allows components to be swapped or configured dynamically at runtime."
      ],
      deepDive: {
        title: "Deep Dive: The Diamond Problem in Java",
        content: "If class `D` could inherit from both class `B` and class `C`, and both classes implemented a method `doWork()`, which version should `D` execute? This confusion is known as the **Diamond Problem**. Java avoids this by forbidding multiple class inheritance. However, starting with Java 8, interfaces can provide `default` methods. If a class implements two interfaces with identical default methods, the compiler forces you to explicitly override and disambiguate which one to call."
      },
      quiz: [
        {
          question: "Why do modern software engineers generally prefer Composition over Inheritance?",
          options: [
            "Composition makes code run faster at the hardware level",
            "Composition allows swapping parts dynamically without breaking parent-child trees",
            "Inheritance is not supported in modern programming languages",
            "Composition eliminates the need for unit tests"
          ],
          correct: 1,
          explanation: "Composition reduces tight coupling. You can replace components (like swapping an ElectricEngine for a GasEngine) without rewriting the entire Car class."
        }
      ]
    },
    {
      id: "oop-solid-principles",
      title: "3. SOLID Design Principles",
      subtitle: "5 rules to make software clean, flexible, and robust",
      whatIsIt: "**SOLID** is an acronym for 5 design principles introduced by Robert C. Martin (Uncle Bob). These principles are guidelines that help software engineers write clean, maintainable, easy-to-extend, and bug-resistant software.",
      whyNeedIt: "When projects grow, bad code becomes fragile—fixing a bug in the shopping cart accidentally breaks the user profile. Following SOLID keeps modules decoupled so changes in one area do not cause unexpected side effects across the system.",
      howItWorks: [
        "**S — Single Responsibility Principle (SRP):** A class should have only **one reason to change**. A class named `Invoice` should only handle invoice calculations, not saving invoices to a database or sending PDF emails.",
        "**O — Open/Closed Principle (OCP):** Software entities should be **Open for extension, but Closed for modification**. You should be able to add a new payment method (like Crypto) by creating a new class rather than rewriting existing payment processing code.",
        "**L — Liskov Substitution Principle (LSP):** Subclasses should be substitutable for their parent classes without breaking the program. If `Penguin` inherits from `Bird`, but calling `penguin.fly()` crashes the application, LSP is violated!",
        "**I — Interface Segregation Principle (ISP):** Clients should not be forced to depend on interfaces they do not use. Prefer small, focused interfaces over one giant, bloated interface.",
        "**D — Dependency Inversion Principle (DIP):** High-level business logic should not depend on low-level technical details; both should depend on **Abstractions (Interfaces)**."
      ],
      realWorldExample: "**The Swiss Army Knife vs. Precision Tools:**\nIf one blade on a Swiss Army knife snaps, you have to replace the whole knife. The **Single Responsibility Principle** says give a chef a dedicated chef's knife, a bread knife, and scissors. If the bread knife gets dull, you sharpen only that tool without replacing the entire kitchen!",
      diagram: `
        <svg viewBox="0 0 740 230" class="responsive-svg" aria-label="SOLID Principles Diagram">
          <g transform="translate(10, 20)">
            <rect width="130" height="180" rx="10" fill="var(--card-bg)" stroke="#3b82f6" stroke-width="2"/>
            <text x="65" y="45" font-size="28" font-weight="bold" text-anchor="middle" fill="#3b82f6">S</text>
            <text x="65" y="75" font-size="12" font-weight="bold" text-anchor="middle" fill="var(--text-primary)">Single Resp.</text>
            <text x="65" y="105" font-size="11" text-anchor="middle" fill="var(--text-secondary)">One job per class</text>
            <circle cx="65" cy="140" r="18" fill="#3b82f6" fill-opacity="0.15"/>
            <text x="65" y="146" font-size="16" text-anchor="middle">🎯</text>
          </g>
          <g transform="translate(155, 20)">
            <rect width="130" height="180" rx="10" fill="var(--card-bg)" stroke="#10b981" stroke-width="2"/>
            <text x="65" y="45" font-size="28" font-weight="bold" text-anchor="middle" fill="#10b981">O</text>
            <text x="65" y="75" font-size="12" font-weight="bold" text-anchor="middle" fill="var(--text-primary)">Open/Closed</text>
            <text x="65" y="105" font-size="11" text-anchor="middle" fill="var(--text-secondary)">Extend, don't edit</text>
            <circle cx="65" cy="140" r="18" fill="#10b981" fill-opacity="0.15"/>
            <text x="65" y="146" font-size="16" text-anchor="middle">🔌</text>
          </g>
          <g transform="translate(300, 20)">
            <rect width="130" height="180" rx="10" fill="var(--card-bg)" stroke="#8b5cf6" stroke-width="2"/>
            <text x="65" y="45" font-size="28" font-weight="bold" text-anchor="middle" fill="#8b5cf6">L</text>
            <text x="65" y="75" font-size="12" font-weight="bold" text-anchor="middle" fill="var(--text-primary)">Liskov Sub.</text>
            <text x="65" y="105" font-size="11" text-anchor="middle" fill="var(--text-secondary)">Safe replacement</text>
            <circle cx="65" cy="140" r="18" fill="#8b5cf6" fill-opacity="0.15"/>
            <text x="65" y="146" font-size="16" text-anchor="middle">🔄</text>
          </g>
          <g transform="translate(445, 20)">
            <rect width="130" height="180" rx="10" fill="var(--card-bg)" stroke="#f59e0b" stroke-width="2"/>
            <text x="65" y="45" font-size="28" font-weight="bold" text-anchor="middle" fill="#f59e0b">I</text>
            <text x="65" y="75" font-size="12" font-weight="bold" text-anchor="middle" fill="var(--text-primary)">Interface Seg.</text>
            <text x="65" y="105" font-size="11" text-anchor="middle" fill="var(--text-secondary)">Small interfaces</text>
            <circle cx="65" cy="140" r="18" fill="#f59e0b" fill-opacity="0.15"/>
            <text x="65" y="146" font-size="16" text-anchor="middle">✂️</text>
          </g>
          <g transform="translate(590, 20)">
            <rect width="130" height="180" rx="10" fill="var(--card-bg)" stroke="#ec4899" stroke-width="2"/>
            <text x="65" y="45" font-size="28" font-weight="bold" text-anchor="middle" fill="#ec4899">D</text>
            <text x="65" y="75" font-size="12" font-weight="bold" text-anchor="middle" fill="var(--text-primary)">Dependency Inv.</text>
            <text x="65" y="105" font-size="11" text-anchor="middle" fill="var(--text-secondary)">Rely on contracts</text>
            <circle cx="65" cy="140" r="18" fill="#ec4899" fill-opacity="0.15"/>
            <text x="65" y="146" font-size="16" text-anchor="middle">⚡</text>
          </g>
        </svg>
      `,
      diagramCaption: "SOLID principles ensure that adding a new feature is as easy as plugging a new charger into a standardized wall socket.",
      keyPoints: [
        "**S (Single Responsibility):** Keep classes focused on one task.",
        "**O (Open/Closed):** Add features by adding new classes, not modifying working old ones.",
        "**L (Liskov Substitution):** Subtypes must behave predictably like their parent type.",
        "**I (Interface Segregation):** Don't force classes to implement methods they don't need.",
        "**D (Dependency Inversion):** Inject dependencies via interfaces rather than instantiating hardcoded concrete classes."
      ],
      deepDive: {
        title: "Deep Dive: Dependency Injection (DI) in Practice",
        content: "Without Dependency Inversion, a `PaymentService` class creates its own `PayPalClient` inside its constructor: `this.client = new PayPalClient()`. If you ever want to switch to Stripe or use a Fake client during unit tests, you have to edit the code of `PaymentService`. With Dependency Injection, the service accepts any `PaymentGateway` interface in its constructor: `public PaymentService(PaymentGateway gateway)`. Now you can pass PayPal, Stripe, or a TestMock freely!"
      },
      quiz: [
        {
          question: "A developer modifies an existing 500-line OrderProcessor class every time a new shipping company is added. Which SOLID principle is being violated?",
          options: ["Open/Closed Principle", "Single Responsibility Principle", "Interface Segregation Principle", "Both A and B"],
          correct: 3,
          explanation: "It violates SRP (it does too many things) and OCP (we should extend by adding new shipping classes rather than modifying the working processor)."
        }
      ]
    },
    {
      id: "oop-design-patterns",
      title: "4. Essential Design Patterns",
      subtitle: "Singleton, Factory, Builder, Observer & Strategy",
      whatIsIt: "**Design Patterns** are battle-tested, reusable solutions to commonly occurring software design problems. They are not code you copy and paste; they are standardized architectural templates that software engineers recognize and apply.",
      whyNeedIt: "Instead of reinventing the wheel when you need a single shared database connection or a flexible way to switch algorithms, design patterns provide trusted blueprints that make your code easy for other engineers to understand and maintain.",
      howItWorks: [
        "**Singleton (One and Only One):** Ensures a class has only one instance throughout the lifetime of the application, and provides a global access point to it (e.g., Database Connection Pool).",
        "**Factory Method (The Creator):** Defines an interface for creating objects, but lets subclasses decide which exact class to instantiate.",
        "**Builder (Complex Construction):** Separates the construction of a complex object with dozens of optional fields from its representation (e.g. `User.builder().name('Alice').age(24).build()`).",
        "**Observer (Event Broadcasting):** A 'Subject' maintains a list of subscribers. When an event occurs, it notifies all subscribers automatically (e.g. YouTube notification when a creator uploads a video).",
        "**Strategy (Interchangeable Algorithms):** Defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime (e.g. switching navigation routes between Driving, Walking, or Transit)."
      ],
      realWorldExample: "**YouTube Subscriptions (The Observer Pattern):**\nWhen you subscribe to a channel and click the bell icon, you become an **Observer**. The channel is the **Subject**. Whenever a new video drops, YouTube notifies all 100,000 subscribers automatically without the channel needing to know your personal home address or phone number!",
      diagram: `
        <svg viewBox="0 0 740 220" class="responsive-svg" aria-label="Observer Pattern Diagram">
          <rect x="20" y="40" width="180" height="140" rx="12" fill="var(--card-bg)" stroke="#3b82f6" stroke-width="2"/>
          <circle cx="110" cy="80" r="24" fill="#3b82f6" fill-opacity="0.15"/>
          <text x="110" y="87" font-size="20" text-anchor="middle">📢</text>
          <text x="110" y="125" font-size="14" font-weight="bold" text-anchor="middle" fill="var(--text-primary)">Subject</text>
          <text x="110" y="145" font-size="11" text-anchor="middle" fill="var(--text-secondary)">YouTube Channel</text>

          <line x1="200" y1="70" x2="350" y2="40" stroke="#10b981" stroke-width="2" stroke-dasharray="4,4"/>
          <line x1="200" y1="110" x2="350" y2="110" stroke="#10b981" stroke-width="2" stroke-dasharray="4,4"/>
          <line x1="200" y1="150" x2="350" y2="180" stroke="#10b981" stroke-width="2" stroke-dasharray="4,4"/>
          <text x="275" y="95" font-size="11" font-weight="bold" fill="#10b981">notify()</text>

          <rect x="360" y="20" width="160" height="45" rx="8" fill="var(--bg-subtle)" stroke="var(--border-color)"/>
          <text x="440" y="47" font-size="12" text-anchor="middle" fill="var(--text-primary)">📱 User App</text>
          <rect x="360" y="85" width="160" height="45" rx="8" fill="var(--bg-subtle)" stroke="var(--border-color)"/>
          <text x="440" y="112" font-size="12" text-anchor="middle" fill="var(--text-primary)">📧 Email Worker</text>
          <rect x="360" y="155" width="160" height="45" rx="8" fill="var(--bg-subtle)" stroke="var(--border-color)"/>
          <text x="440" y="182" font-size="12" text-anchor="middle" fill="var(--text-primary)">🔔 Smart Watch</text>
        </svg>
      `,
      diagramCaption: "The Observer pattern allows one broadcaster to notify many independent listeners without knowing their internal code.",
      keyPoints: [
        "**Singleton** ensures only one instance exists globally (use with caution in multi-threaded systems).",
        "**Factory** hides the instantiation logic of objects behind a simple creation method.",
        "**Builder** makes objects with multiple optional parameters clean and readable.",
        "**Observer** is the backbone of event-driven systems and UI frameworks.",
        "**Strategy** lets you swap sorting, tax calculations, or pathfinding algorithms dynamically."
      ],
      deepDive: {
        title: "Deep Dive: Thread-Safe Double-Checked Locking Singleton",
        content: "In Java, a naive Singleton can create two instances if two threads enter `getInstance()` simultaneously. The production-ready solution uses `private static volatile Singleton instance;` and synchronizes only during initialization: `synchronized (Singleton.class) { if (instance == null) instance = new Singleton(); }`. The `volatile` keyword ensures that changes made by one thread are immediately visible to all other threads."
      },
      quiz: [
        {
          question: "Which design pattern is best suited when an object has 10 optional parameters, preventing messy constructors with 10 arguments?",
          options: ["Singleton Pattern", "Builder Pattern", "Adapter Pattern", "Observer Pattern"],
          correct: 1,
          explanation: "The Builder pattern allows you to construct complex objects step by step with readable chaining methods."
        }
      ]
    }
  ],
  flashcards: [
    {
      term: "Encapsulation",
      category: "OOP Pillars",
      question: "What is Encapsulation?",
      answer: "Bundling fields and methods into a single class, keeping fields private and exposing only safe public methods to protect data integrity.",
      tip: "Think of a medicine capsule sealing the ingredients safely inside."
    },
    {
      term: "Polymorphism",
      category: "OOP Pillars",
      question: "What is Polymorphism?",
      answer: "The ability of different objects to respond to the same method call in their own specialized way (Compile-time via Overloading, Runtime via Overriding).",
      tip: "One command ('Speak'), many different sounds (Bark, Meow)."
    },
    {
      term: "Single Responsibility Principle",
      category: "SOLID",
      question: "What is the Single Responsibility Principle (SRP)?",
      answer: "A class should have only one reason to change, meaning it should focus entirely on a single specific job or business concern.",
      tip: "A toaster should toast bread, not make coffee."
    },
    {
      term: "Observer Pattern",
      category: "Design Patterns",
      question: "What is the Observer Pattern?",
      answer: "A behavioral pattern where a subject automatically broadcasts updates to a list of subscribed observer objects whenever its state changes.",
      tip: "Think of YouTube subscribers getting notified of a new upload."
    }
  ]
};
