// Topic 7: JavaScript, TypeScript & Modern Frontend Architecture
var topicFrontend = window.topicFrontend = {
  id: "frontend",
  title: "JavaScript, TypeScript & Modern Frontend",
  shortTitle: "Frontend Architecture",
  icon: "⚡",
  badge: "Web Engineering",
  readingTime: "25 min read",
  description: "Master modern web development: Event Loop internals, closures, TypeScript typing, React Virtual DOM, hooks memoization, and Next.js rendering.",
  learningObjectives: [
    "Trace the JavaScript Event Loop: Call Stack, Web APIs, Microtask vs. Macrotask queues",
    "Understand Hoisting, the Temporal Dead Zone (TDZ), and how Closures work",
    "Master TypeScript: `interface` vs. `type`, `unknown` vs. `any`, and Generics",
    "Learn React internals: Virtual DOM Diffing, Reconciliation, and why array index keys break UI",
    "Explore Next.js rendering: CSR, SSR, SSG, ISR, React Server Components, and Debouncing"
  ],
  lessons: [
    {
      id: "fe-event-loop",
      title: "1. The JavaScript Event Loop & Asynchronous Runtime",
      subtitle: "Call Stack, Web APIs, Microtasks vs. Macrotasks",
      whatIsIt: "JavaScript is a **Single-Threaded** language with a single Call Stack. It can only execute one statement at a time. The **Event Loop** is the mechanism built into the browser and Node.js that enables non-blocking asynchronous concurrency by managing task queues.",
      whyNeedIt: "If JavaScript waited synchronously for a 2-second network fetch before doing anything else, the browser tab would completely freeze—you couldn't click buttons or scroll. The Event Loop delegates slow tasks to background browser Web APIs so the main UI thread stays buttery smooth.",
      howItWorks: [
        "**Call Stack:** Executes synchronous functions in LIFO order.",
        "**Web APIs (Browser Threads):** Handles `fetch()`, `setTimeout()`, and DOM events in the background.",
        "**Microtask Queue (High Priority):** Holds `Promise.then()`, `queueMicrotask()`. **Drained completely to 0** as soon as the Call Stack is empty!",
        "**Macrotask Queue (Normal Priority):** Holds `setTimeout()`, `setInterval()`, and I/O. The Event Loop pulls **only 1 task at a time** after all microtasks are drained.",
        "**Execution Order:** Sync Code $\\rightarrow$ All Microtasks $\\rightarrow$ Browser Repaint $\\rightarrow$ One Macrotask $\\rightarrow$ Repeat."
      ],
      realWorldExample: "**The Fast Food Drive-Through:**\nThe single cashier at the window (Call Stack) takes your order. Instead of making you park and wait at the window while your burger cooks (blocking), they hand the ticket to the kitchen (Web API) and immediately take the next customer's order. When your burger is ready, it enters the pickup queue!",
      keyPoints: [
        "**Single Threaded:** JavaScript executes one operation at a time on its Call Stack.",
        "**Microtask Precedence:** `Promise.then` and `queueMicrotask` take top priority and are fully drained before any macrotask runs.",
        "**Macrotask Batching:** Timers (`setTimeout`) and I/O tasks run one per event loop cycle after microtasks finish."
      ],
      quiz: [
        {
          question: "What is the output order of: console.log(1); setTimeout(() => console.log(2), 0); Promise.resolve().then(() => console.log(3)); console.log(4);?",
          options: ["1, 2, 3, 4", "1, 4, 3, 2", "1, 4, 2, 3", "2, 3, 1, 4"],
          correct: 1,
          explanation: "Synchronous code runs first (1, 4), then the microtask queue empties (3), and finally the macrotask executes (2)."
        },
        {
          question: "Which task queue has the highest priority and is completely emptied before the next macrotask is processed?",
          options: ["Macrotask Queue", "Microtask Queue", "Animation Frame Queue", "Timer Queue"],
          correct: 1,
          explanation: "The microtask queue (containing resolved promises) is always completely drained to zero before the browser picks the next macrotask."
        }
      ]
    },
    {
      id: "fe-closures-hoisting",
      title: "2. Closures, Hoisting & `this` Mechanics",
      subtitle: "Lexical scope, Temporal Dead Zone & the loop trap",
      whatIsIt: "A **Closure** is the ability of an inner function to remember and access variables from its outer enclosing function even after that outer function has returned and popped off the stack. **Hoisting** is the JavaScript engine's behavior of reserving variable and function declarations in memory before executing code.",
      whyNeedIt: "Closures enable **Data Privacy** (creating private variables that outside code cannot tamper with) and power factory functions, event handlers, and React hooks like `useState`.",
      howItWorks: [
        "**`var`:** Function-scoped, hoisted and initialized with `undefined` (causes bugs!).",
        "**`let` & `const`:** Block-scoped `{}`. Hoisted but uninitialized—accessing them before their declaration line throws a **Temporal Dead Zone (TDZ)** `ReferenceError`.",
        "**The Loop Trap (`var` vs `let`):** A `for (var i = 0; i < 3; i++)` loop shares one single global `i`. If you call `setTimeout`, all iterations print `3`. Using `let` creates a brand new binding for `i` in each loop cycle, printing `0, 1, 2` correctly!",
        "**Arrow Functions vs. Regular Functions:** Regular functions bind `this` dynamically at call-time. Arrow functions inherit `this` **lexically** from their enclosing outer scope."
      ],
      realWorldExample: "**A Backpack You Carry Everywhere (Closure):**\nWhen a function is born, it packs a backpack containing all variables available in its surrounding room (Lexical Scope). Wherever that function travels later in your program, it can still unzip its backpack and use those variables!",
      keyPoints: [
        "**Lexical Scope:** Functions retain access to variables where they were declared, not where they are called.",
        "**Temporal Dead Zone (TDZ):** `let` and `const` cannot be referenced prior to declaration without triggering a `ReferenceError`.",
        "**Lexical `this`:** Arrow functions do not bind their own `this`; they capture `this` from the outer lexical environment."
      ],
      quiz: [
        {
          question: "What error occurs if you try to log a `let` or `const` variable before its line of declaration?",
          options: [
            "TypeError",
            "ReferenceError: Cannot access before initialization (Temporal Dead Zone)",
            "SyntaxError",
            "It logs undefined silently"
          ],
          correct: 1,
          explanation: "Accessing a let/const variable inside its Temporal Dead Zone (TDZ) before the declaration runs throws a ReferenceError."
        },
        {
          question: "How does an arrow function determine the value of `this`?",
          options: [
            "It binds this to the window object always",
            "It binds this to the button that was clicked",
            "It inherits this lexically from its surrounding outer scope",
            "It creates a new random this value"
          ],
          correct: 2,
          explanation: "Arrow functions do not have their own this binding; they capture the this value of the enclosing lexical context."
        }
      ]
    },
    {
      id: "fe-typescript-essentials",
      title: "3. TypeScript Essentials for Clean Code",
      subtitle: "`interface` vs. `type`, `unknown` vs. `any` & Generics",
      whatIsIt: "**TypeScript** is a statically typed superset of JavaScript that compiles down to plain JavaScript. It checks code types during development and compilation, catching errors before your software ever runs in production.",
      whyNeedIt: "In raw JavaScript, typos like `user.adress` instead of `user.address` fail silently at runtime. TypeScript immediately underlines the mistake in red in your editor, saving hours of frustrating debugging.",
      howItWorks: [
        "**`interface`:** Best for object shapes and component props. Supports declaration merging (adding properties to third-party types).",
        "**`type` Alias:** Best for union types (`type Status = 'PENDING' | 'SUCCESS'`), primitives, and complex utility transformations.",
        "**`any` (Dangerous):** Disables the type checker entirely. Avoid using it!",
        "**`unknown` (Type-Safe):** Accepts any value, but TypeScript forces you to write a **Type Guard** (`if (typeof x === 'string')`) before allowing you to use methods on it.",
        "**Generics (`<T>`):** Reusable type templates (e.g. `interface ApiResponse<T> { data: T; status: number; }`)."
      ],
      realWorldExample: "**Car Parts Quality Inspector:**\nIn JavaScript, you can try plugging a rectangular wooden block into a circular metal pipe, and the car crashes down the highway. TypeScript acts as a strict factory inspector with exact shape molds: if the plug doesn't match the socket, the car is never allowed to leave the factory!",
      keyPoints: [
        "**Type Safety:** `unknown` requires narrowing guards before use, whereas `any` completely disables compiler safety.",
        "**Interfaces vs. Types:** Use `interface` for extensible object models and `type` for unions, primitives, and mapped types.",
        "**Generics:** `<T>` allows creating reusable, type-safe data wrappers and components."
      ],
      quiz: [
        {
          question: "Why is `unknown` preferred over `any` when handling untrusted data like external API responses?",
          options: [
            "unknown makes the file size smaller",
            "TypeScript forces you to verify the data type with a type guard before using it",
            "unknown runs faster in the browser",
            "any is deprecated in TypeScript"
          ],
          correct: 1,
          explanation: "With unknown, the TypeScript compiler requires you to check and narrow the type (e.g. typeof x === 'string') before accessing properties, preventing runtime errors."
        },
        {
          question: "Which TypeScript feature allows you to define reusable functions and classes that work across various types while retaining complete type safety?",
          options: ["Type Assertions", "Generics (<T>)", "Enums", "Any casting"],
          correct: 1,
          explanation: "Generics (<T>) allow components and functions to accept and enforce types dynamically without abandoning compiler type checks."
        }
      ]
    },
    {
      id: "fe-react-internals-hooks",
      title: "4. React Internals, Virtual DOM & Hooks",
      subtitle: "Reconciliation, array index traps & memoization",
      whatIsIt: "**React** is a declarative UI library. Instead of manually mutating the slow browser Real DOM, React maintains a lightweight in-memory **Virtual DOM (VDOM)** tree. When state changes, React computes the minimal difference (**Diffing / Reconciliation**) and updates the real screen efficiently.",
      whyNeedIt: "Directly updating DOM elements causes expensive browser Reflows and Repaints. React batches updates and patches only the specific DOM nodes that actually changed.",
      howItWorks: [
        "**The Array Index `key` Trap:** Never use array index as a `key` prop in dynamic lists (`todos.map((t, index) => ...)`). If you insert an item at the beginning, all index numbers shift, causing React to associate uncontrolled state (like input text and checkboxes) with the wrong items!",
        "**Re-Render Triggers:** A component re-renders ONLY when: (1) its State changes, (2) its Parent re-renders, or (3) a Context value it consumes changes.",
        "**`useState` Batching:** State updates within the same tick are batched into a single render. Use the functional form `setCount(prev => prev + 1)` for reliable increments.",
        "**`useEffect` Cleanups:** Always return a cleanup function (e.g. `return () => clearInterval(timer)`) to prevent dangerous memory leaks.",
        "**Memoization:**\n  - `React.memo(Component)`: Skips child re-render if props haven't changed.\n  - `useMemo(() => calculation, [deps])`: Caches a computed value.\n  - `useCallback(fn, [deps])`: Caches a function memory reference between renders."
      ],
      realWorldExample: "**Blueprints vs. Physical Brick Wall:**\nIf you want to repaint one brick on a brick wall, you don't demolish the entire wall and rebuild it (Real DOM). You mark the change on an architectural paper drawing (Virtual DOM), see that only 1 brick changed, and send a worker with a single paintbrush to touch up that one brick!",
      keyPoints: [
        "**Stable Keys:** Always supply unique, stable IDs as list keys to prevent state desynchronization in dynamic lists.",
        "**Render Optimization:** Use `useMemo` for heavy calculations and `useCallback` to maintain reference equality for props passed to memoized children.",
        "**Effect Cleanups:** Always clean up event listeners, timers, and subscriptions in `useEffect` return blocks."
      ],
      quiz: [
        {
          question: "Why is using array indexes as `key` attributes in dynamic React lists considered an anti-pattern?",
          options: [
            "React will refuse to compile the code",
            "Adding or reordering items shifts index numbers, causing React to mismatch component state like input fields",
            "It slows down internet connection speeds",
            "It consumes 100% CPU on mobile phones"
          ],
          correct: 1,
          explanation: "Because index keys change when items are added, deleted, or reordered, React confuses which DOM elements match which state, creating visual bugs in inputs and checkboxes."
        },
        {
          question: "What is the primary difference between `useMemo` and `useCallback`?",
          options: [
            "useMemo is for CSS; useCallback is for HTML",
            "useMemo caches a computed value, while useCallback caches a function definition",
            "useCallback runs on the server; useMemo runs on the client",
            "There is no difference"
          ],
          correct: 1,
          explanation: "useMemo caches the evaluated result of a function, whereas useCallback preserves the reference identity of the callback function across re-renders."
        }
      ]
    },
    {
      id: "fe-nextjs-rendering-performance",
      title: "5. Next.js Rendering & Frontend Performance",
      subtitle: "CSR vs. SSR vs. SSG vs. ISR & Debouncing",
      whatIsIt: "Modern web frameworks like **Next.js** provide hybrid rendering strategies depending on SEO and performance needs: **CSR** (Client-Side Rendering), **SSR** (Server-Side Rendering), **SSG** (Static Site Generation), and **ISR** (Incremental Static Regeneration).",
      whyNeedIt: "A traditional React SPA sends a blank HTML file; search engines and social media crawlers cannot see your content, hurting Google SEO rankings. Pre-rendering pages on the server ensures instant loading and perfect SEO.",
      howItWorks: [
        "**CSR:** Browser downloads empty HTML and a huge JS bundle, then builds UI on the client (good for private dashboards).",
        "**SSR:** Server generates dynamic HTML on every incoming request (good for live inventory/prices).",
        "**SSG:** Pages are compiled to pure static HTML at build time and served globally from CDNs in 20ms (good for blogs and docs).",
        "**ISR:** Static pages regenerate in the background periodically (e.g. every 60s) without rebuilding the entire website.",
        "**Debouncing vs. Throttling:**\n  - **Debounce:** Waits until the user pauses typing for 300ms before triggering a search API.\n  - **Throttle:** Executes a function at most once every 100ms during continuous events like scrolling."
      ],
      realWorldExample: "**Elevator Door (Debounce):**\nThe elevator door doesn't close immediately. Every time someone enters, the sensor timer resets. It only closes and moves once people stop entering for 3 full seconds!",
      keyPoints: [
        "**Static vs. Dynamic:** SSG compiles at build time for max speed; SSR compiles on request for real-time freshness; ISR combines both.",
        "**Debounce vs. Throttle:** Debouncing waits for a pause in actions; Throttling enforces a maximum frequency.",
        "**SEO Optimization:** Server-side rendered pages provide full HTML upfront to web crawlers and social media preview bots."
      ],
      quiz: [
        {
          question: "Which Next.js rendering pattern pre-renders pages into static HTML at build time while allowing background regeneration after a configured time interval?",
          options: [
            "Client-Side Rendering (CSR)",
            "Server-Side Rendering (SSR)",
            "Incremental Static Regeneration (ISR)",
            "Manual Refreshing"
          ],
          correct: 2,
          explanation: "ISR (Incremental Static Regeneration) provides the speed of static CDN hosting combined with background page revalidation without rebuilding the whole site."
        },
        {
          question: "When implementing live search autocomplete, what optimization ensures the API is only called once the user pauses typing for 300ms?",
          options: ["Throttling", "Debouncing", "Polling", "Memoization"],
          correct: 1,
          explanation: "Debouncing resets the timer on each keystroke and only fires the callback after the user stops typing for the specified delay period."
        }
      ]
    }
  ],
  flashcards: [
    {
      term: "Event Loop Priority",
      category: "JavaScript",
      question: "Which queue has higher priority: Microtasks or Macrotasks?",
      answer: "Microtasks (Promise.then, queueMicrotask). The Event Loop drains the Microtask queue completely until empty before executing a single Macrotask.",
      tip: "Promises jump to the front of the line before setTimeout."
    },
    {
      term: "Closure",
      category: "JavaScript",
      question: "What is a Closure in JavaScript?",
      answer: "An inner function that retains access to variables from its outer enclosing lexical scope even after the outer function has finished executing.",
      tip: "A function carrying a backpack of its home variables."
    },
    {
      term: "useMemo vs. useCallback",
      category: "React",
      question: "What is the difference between useMemo and useCallback?",
      answer: "useMemo caches the calculated RESULT of a function (a value). useCallback caches the FUNCTION DEFINITION itself (its memory reference).",
      tip: "useMemo for Values; useCallback for Functions."
    },
    {
      term: "Debouncing",
      category: "Performance",
      question: "What is Debouncing?",
      answer: "Delaying execution until a specific period of inactivity has elapsed. Commonly used for search bar autocomplete as the user types.",
      tip: "Waiting for the typing to pause before calling the server."
    }
  ]
};
