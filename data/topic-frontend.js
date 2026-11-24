// Module 7: JavaScript, TypeScript & Modern Frontend Architecture
// Comprehensive Study Data with 3 Levels of Learning

var topicFrontend = window.topicFrontend = {
  id: "frontend",
  title: "JavaScript, TypeScript & Modern Frontend",
  icon: "⚡",
  badge: "Module 07",
  description: "Master the Event Loop (Microtasks vs. Macrotasks), Closures, TypeScript Types, React Virtual DOM Reconciliation, Hooks Memoization, Next.js (CSR/SSR/SSG/ISR), and Web Vitals.",
  lessons: [
    {
      id: "event-loop-runtime",
      title: "1. JavaScript Runtime & The Event Loop Deep Dive",
      level1: {
        intro: "JavaScript is single-threaded, meaning it has only one Call Stack and can do one thing at a time. The Event Loop is the secret mechanism that allows JavaScript to perform non-blocking asynchronous operations like network calls and timers without freezing the user interface.",
        analogy: "Think of a busy short-order chef (The Call Stack): The chef cooks one dish at a time. Long-baking items go into the automatic oven (Web APIs). When a baked pie is done, the oven places it on the VIP counter (Microtask Queue) or the regular counter (Macrotask Queue). Whenever the chef finishes their current frying pan, the manager (Event Loop) serves ALL VIP orders first, before serving one regular order.",
        svgDiagram: `<svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="0" width="220" height="200" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="110" y="30" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="14" font-weight="700">CALL STACK (V8)</text>
            <rect x="20" y="50" width="180" height="30" rx="4" fill="#3b82f6"/><text x="110" y="70" text-anchor="middle" fill="#fff" font-size="11">console.log("Done")</text>
            <rect x="20" y="90" width="180" height="30" rx="4" fill="#1e3a5f" stroke="#38bdf8"/><text x="110" y="110" text-anchor="middle" fill="#cbd5e1" font-size="11">fetchUserData()</text>
            <rect x="20" y="130" width="180" height="30" rx="4" fill="#1e3a5f" stroke="#38bdf8"/><text x="110" y="150" text-anchor="middle" fill="#cbd5e1" font-size="11">main()</text>

            <rect x="250" y="0" width="160" height="85" rx="8" fill="#1e293b" stroke="#64748b"/>
            <text x="330" y="25" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="700">WEB APIs (Browser)</text>
            <text x="330" y="45" text-anchor="middle" fill="#cbd5e1" font-size="10">setTimeout / Interval</text>
            <text x="330" y="62" text-anchor="middle" fill="#cbd5e1" font-size="10">fetch() / DOM Events</text>

            <circle cx="330" cy="145" r="38" fill="#1e3a5f" stroke="#facc15" stroke-width="2"/>
            <text x="330" y="142" text-anchor="middle" fill="#facc15" font-size="11" font-weight="700">EVENT</text>
            <text x="330" y="158" text-anchor="middle" fill="#facc15" font-size="11" font-weight="700">LOOP</text>

            <rect x="440" y="0" width="220" height="90" rx="8" fill="#064e3b" stroke="#22c55e" stroke-width="2"/>
            <text x="550" y="25" text-anchor="middle" fill="#4ade80" font-size="12" font-weight="700">MICROTASK QUEUE (High Priority)</text>
            <text x="550" y="45" text-anchor="middle" fill="#cbd5e1" font-size="10">Promise.then() / queueMicrotask</text>
            <text x="550" y="65" text-anchor="middle" fill="#facc15" font-size="10" font-weight="700">Drained COMPLETELY every cycle!</text>

            <rect x="440" y="110" width="220" height="90" rx="8" fill="#78350f" stroke="#f59e0b" stroke-width="2"/>
            <text x="550" y="135" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="700">MACROTASK QUEUE (Normal)</text>
            <text x="550" y="155" text-anchor="middle" fill="#cbd5e1" font-size="10">setTimeout / setInterval / I/O</text>
            <text x="550" y="175" text-anchor="middle" fill="#cbd5e1" font-size="10">Pulls exactly ONE task per cycle</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### The Golden Execution Order of the Event Loop:
1. Execute all synchronous code on the **Call Stack** until it is completely empty.
2. Check the **Microtask Queue**. Execute tasks one by one until the Microtask Queue is **completely drained (0 remaining items)**. If a microtask enqueues another microtask, it also executes in this same pass!
3. Render browser UI updates (Repaint/Reflow) if scheduled.
4. Pull **exactly ONE (1) task** from the **Macrotask Queue** onto the Call Stack and execute it.
5. Return to Step 2 to drain microtasks again!

### Microtask vs. Macrotask Breakdown:
- **Microtasks:** \`Promise.then()\`, \`.catch()\`, \`.finally()\`, \`queueMicrotask()\`, and Node.js \`process.nextTick()\`.
- **Macrotasks:** \`setTimeout()\`, \`setInterval()\`, \`setImmediate()\` (Node.js), I/O events, and DOM event listeners.

### The 4 Promise Combinators:
- **\`Promise.all([p1, p2])\`:** Fast-fails if any single promise rejects. Resolves only when all succeed.
- **\`Promise.allSettled([p1, p2])\`:** Never rejects! Waits for all promises to settle (returns \`{status, value/reason}\`).
- **\`Promise.race([p1, p2])\`:** The first settled promise wins (whether resolved or rejected).
- **\`Promise.any([p1, p2])\`:** Returns the first fulfilled (successful) promise. Rejects only if all fail (\`AggregateError\`).`,
        codeExamples: [
          {
            title: "Tricky Output Prediction: Microtasks vs. Macrotasks",
            language: "javascript",
            code: `console.log("1 - Sync Start");

setTimeout(() => {
  console.log("2 - setTimeout (Macro)");
}, 0);

Promise.resolve().then(() => {
  console.log("3 - Promise Microtask 1");
}).then(() => {
  console.log("4 - Promise Microtask 2");
});

console.log("5 - Sync End");

// PREDICTED CONSOLE OUTPUT:
// 1 - Sync Start
// 5 - Sync End
// 3 - Promise Microtask 1
// 4 - Promise Microtask 2
// 2 - setTimeout (Macro)`
          }
        ]
      },
      level3: {
        interviewQA: [
          {
            q: "Why does the callback inside new Promise() execute synchronously while .then() executes asynchronously?",
            shortA: "The Promise constructor executor function runs immediately on the Call Stack during instantiation. Only the resolved .then() callback is enqueued into the Microtask Queue.",
            deepA: "When you write 'new Promise((resolve, reject) => { console.log('A'); resolve(); })', the function passed to the constructor is called the executor. The JavaScript engine executes the executor synchronously on the Call Stack right at the point of instantiation. However, attaching a .then(callback) handler registers an asynchronous microtask observer. When resolve() is invoked, the engine enqueues that callback onto the Microtask Queue to be run after the current synchronous Call Stack clears.",
            followUp: "Can microtasks starve the Event Loop? Yes. If a microtask recursively enqueues another microtask, the Event Loop gets trapped continuously draining the Microtask Queue, completely blocking macrotasks and browser UI repaints (freezing the page)."
          }
        ]
      }
    },
    {
      id: "core-js-mechanics",
      title: "2. Core JavaScript Mechanics: Hoisting, Closures & 'this'",
      level1: {
        intro: "Understanding how JavaScript handles variable scoping, function closures, and object bindings is what separates junior copy-pasters from senior engineers.",
        analogy: "A Closure is like a student who graduates from high school (the outer function exits): even though they no longer attend the school, they still keep the contact numbers of their favorite teachers in their backpack (the lexical environment).",
        svgDiagram: `<svg viewBox="0 0 700 210" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="660" height="170" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="330" y="45" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="14" font-weight="700">CLOSURE LEXICAL ENVIRONMENT RETENTION</text>

            <rect x="40" y="70" width="240" height="95" rx="8" fill="#1e3a5f" stroke="#64748b"/>
            <text x="160" y="95" text-anchor="middle" fill="#cbd5e1" font-size="12" font-weight="700">Outer Function: createAccount()</text>
            <text x="160" y="120" text-anchor="middle" fill="#facc15" font-size="11">let balance = 1000; (Private Variable)</text>
            <text x="160" y="145" text-anchor="middle" fill="#94a3b8" font-size="10">Function finishes &amp; pops off Stack!</text>

            <path d="M 280 115 L 380 115" stroke="#4ade80" stroke-width="2"/>
            <text x="330" y="105" text-anchor="middle" fill="#4ade80" font-size="10">Retains Pointer</text>

            <rect x="380" y="70" width="240" height="95" rx="8" fill="#064e3b" stroke="#22c55e"/>
            <text x="500" y="95" text-anchor="middle" fill="#4ade80" font-size="12" font-weight="700">Inner Function: getBalance()</text>
            <text x="500" y="120" text-anchor="middle" fill="#cbd5e1" font-size="11">Accesses outer 'balance' variable</text>
            <text x="500" y="145" text-anchor="middle" fill="#4ade80" font-size="10">True Data Encapsulation!</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### Variable Declaration: var vs. let vs. const:
- **\`var\`:** Function-scoped, hoisted and initialized to \`undefined\`, permits unsafe re-declarations.
- **\`let\`:** Block-scoped (\`{}\`), hoisted but **Uninitialized** (trapped in the **Temporal Dead Zone - TDZ** until the declaration line is reached).
- **\`const\`:** Block-scoped, trapped in TDZ, enforces immutable reference assignment (cannot be reassigned).

### The Classic Loop Trap: \`var\` vs. \`let\`:
\`\`\`javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// PRINTS: 3, 3, 3 (Because var has a single shared binding across the entire loop)

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// PRINTS: 0, 1, 2 (let creates a fresh block-scoped binding for every iteration!)
\`\`\`

### \`this\` Binding Rules:
- **Regular Functions:** \`this\` is determined dynamically by **how the function is called** (implicit binding from calling object).
- **Arrow Functions:** Do not have their own \`this\`. They inherit \`this\` **lexically** from the surrounding scope where they were written.
- **Explicit Binding:** \`.call(thisArg, a, b)\`, \`.apply(thisArg, [a, b])\`, and \`.bind(thisArg)\` (returns a permanently bound function).

### Shallow Copy vs. Deep Copy:
- **Shallow Copy (\`{...obj}\`, \`Object.assign\`):** Copies primitive fields, but shares memory references for nested objects and arrays.
- **Deep Copy (\`structuredClone(obj)\`):** Standard modern web API that clones all nested layers into an independent memory graph. Avoid \`JSON.parse(JSON.stringify(obj))\` because it drops functions, ignores \`undefined\`, and crashes on circular references.`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "What is a Closure and what are its primary practical use cases?",
            shortA: "A closure is a function bundled with its lexical environment, allowing it to remember and access variables from its outer scope even after the outer function has returned.",
            deepA: "When an outer function returns in JavaScript, its execution context frame is popped from the Call Stack. However, if an inner function retains references to variables declared in that outer scope, the JavaScript engine stores those variables in Heap Memory rather than deallocating them. The inner function maintains a persistent link to that scope (its Closure). Primary use cases: 1) Data encapsulation and private variables (e.g. factory functions); 2) Function currying and partial application; 3) Event handlers and callback state retention.",
            followUp: "Can closures cause memory leaks? Yes. If long-lived objects or global DOM event listeners hold closures referencing large data structures that are no longer needed, the Garbage Collector cannot reclaim that memory."
          }
        ]
      }
    },
    {
      id: "typescript-essentials",
      title: "3. TypeScript Essentials for Modern Web Apps",
      level1: {
        intro: "JavaScript is dynamically typed, meaning a typo can crash your app in production. TypeScript catches bugs at compile time by adding strict, explicit type contracts.",
        analogy: "JavaScript is like building furniture without instructions: you can attach any screw anywhere, but the chair might collapse when someone sits on it. TypeScript is like an engineered blueprint: it won't let you assemble the parts unless every screw matches the exact specifications.",
        svgDiagram: `<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="310" height="150" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="155" y="45" text-anchor="middle" fill="#38bdf8" font-size="14" font-weight="700">interface (Object Shapes)</text>
            <text x="155" y="75" text-anchor="middle" fill="#cbd5e1" font-size="11">Declaration Merging supported</text>
            <text x="155" y="100" text-anchor="middle" fill="#cbd5e1" font-size="11">Extends syntax: interface B extends A</text>
            <text x="155" y="130" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="700">Best for: Component Props &amp; Domain Models</text>

            <rect x="350" y="20" width="310" height="150" rx="8" fill="#1e293b" stroke="#a855f7" stroke-width="2"/>
            <text x="505" y="45" text-anchor="middle" fill="#c084fc" font-size="14" font-weight="700">type Alias (Flexible Types)</text>
            <text x="505" y="75" text-anchor="middle" fill="#cbd5e1" font-size="11">Supports Union types: "A" | "B"</text>
            <text x="505" y="100" text-anchor="middle" fill="#cbd5e1" font-size="11">Primitives, Tuples, Intersections (&amp;)</text>
            <text x="505" y="130" text-anchor="middle" fill="#c084fc" font-size="11" font-weight="700">Best for: Unions, Utility Types, State</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### interface vs. type Alias:
- **\`interface\`:** Designed for defining object contracts. Supports **Declaration Merging** (multiple interface declarations with identical names automatically combine their fields—ideal for extending third-party libraries).
- **\`type\`:** More versatile. Can represent union types (\`type Status = "PENDING" | "PAID"\`), primitives, tuples, and mapped types. Does not support declaration merging.
- **Rule of Thumb:** Use \`interface\` for React component props and domain objects; use \`type\` for unions and utility computations.

### any vs. unknown vs. never:
- **\`any\` (Unsafe):** Completely disables type checking. Defeats the safety purpose of TypeScript.
- **\`unknown\` (Type-Safe Alternative):** Accepts any value, but TypeScript blocks all property access and method calls until you perform **Type Narrowing (Type Guards)**:
  \`\`\`typescript
  function handle(data: unknown) {
    if (typeof data === "string") console.log(data.toUpperCase()); // Safe!
  }
  \`\`\`
- **\`never\`:** Represents a value that can never occur (e.g. exhaustive switch statement default cases).

### Generics & Built-In Utility Types:
- \`Partial<T>\`: Makes all properties optional (ideal for PATCH request payloads).
- \`Pick<T, K>\`: Selects a subset of properties from type \`T\`.
- \`Omit<T, K>\`: Removes specific properties from type \`T\`.
- \`Record<K, V>\`: Defines a type-safe key-value hash map.`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "What is the difference between any and unknown in TypeScript?",
            shortA: "any turns off the compiler type checker entirely, while unknown is a type-safe top type that requires explicit type narrowing before you can access properties or invoke methods.",
            deepA: "Both 'any' and 'unknown' can be assigned any value. However, with 'any', you can call non-existent methods (data.foo.bar()), and the compiler will silently pass, causing runtime crashes in production. With 'unknown', the compiler strictly forbids calling any method or accessing any property. You must first prove to TypeScript what the type is using runtime checks (typeof, instanceof, or custom type guard predicates like 'val is User').",
            followUp: "What is a Discriminated Union? A union of types that share a common literal tag property (e.g. { type: 'SUCCESS', data } | { type: 'ERROR', error }), enabling complete type narrowing in switch statements."
          }
        ]
      }
    },
    {
      id: "react-internals-reconciliation",
      title: "4. React Internals, Virtual DOM & Reconciliation",
      level1: {
        intro: "React makes web apps fast by avoiding slow direct updates to the browser's Real DOM. Instead, it compares lightweight in-memory representations (Virtual DOM) and applies only the exact minimal changes required.",
        analogy: "Imagine an architect making blueprint adjustments: instead of demolishing and rebuilding an entire brick wall every time you want to add a window, the architect marks the exact window location on the blueprint and instructs the construction workers to carve out only that single opening.",
        svgDiagram: `<svg viewBox="0 0 700 210" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="660" height="170" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="330" y="45" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="14" font-weight="700">REACT VIRTUAL DOM RECONCILIATION PIPELINE</text>

            <rect x="30" y="70" width="160" height="90" rx="8" fill="#1e3a5f" stroke="#38bdf8"/>
            <text x="110" y="95" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="700">1. State Update</text>
            <text x="110" y="120" text-anchor="middle" fill="#cbd5e1" font-size="10">Component state changes</text>
            <text x="110" y="140" text-anchor="middle" fill="#cbd5e1" font-size="10">New VDOM generated</text>

            <path d="M 190 115 L 250 115" stroke="#facc15" stroke-width="2"/>

            <rect x="250" y="70" width="160" height="90" rx="8" fill="#1e3a5f" stroke="#facc15"/>
            <text x="330" y="95" text-anchor="middle" fill="#facc15" font-size="12" font-weight="700">2. Diffing (Fiber)</text>
            <text x="330" y="120" text-anchor="middle" fill="#cbd5e1" font-size="10">Compares new vs old VDOM</text>
            <text x="330" y="140" text-anchor="middle" fill="#4ade80" font-size="10" font-weight="700">O(N) Heuristic Algorithm</text>

            <path d="M 410 115 L 470 115" stroke="#4ade80" stroke-width="2"/>

            <rect x="470" y="70" width="160" height="90" rx="8" fill="#064e3b" stroke="#22c55e"/>
            <text x="550" y="95" text-anchor="middle" fill="#4ade80" font-size="12" font-weight="700">3. Real DOM Patch</text>
            <text x="550" y="120" text-anchor="middle" fill="#cbd5e1" font-size="10">Batched minimal updates</text>
            <text x="550" y="140" text-anchor="middle" fill="#cbd5e1" font-size="10">Reflow &amp; Repaint minimized</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### Why Real DOM Updates are Slow:
Real DOM nodes have hundreds of properties. Modifying them causes the browser engine to perform **Layout (Reflow)**—recalculating physical screen coordinates—and **Repaint**.

### Virtual DOM & Reconciliation (Diffing Heuristics):
The VDOM is a lightweight in-memory JavaScript object tree. Instead of using an $O(N^3)$ general tree diffing algorithm, React applies two heuristics to run diffing in **$O(N)$ Linear Time**:
1. Two elements of different types (e.g. swapping \`<div>\` for \`<span>\`) will produce completely different subtrees. React destroys the old subtree and builds the new one from scratch.
2. The developer can hint at element stability across renders using **\`key\` props**.

### Why Using Array Index as Key is an Anti-Pattern:
\`\`\`jsx
// ANTI-PATTERN:
{todos.map((item, index) => <TodoItem key={index} item={item} />)}
\`\`\`
If you prepend an item to the list, the item previously at index 0 moves to index 1. Because React matches keys by index, it assumes the component at index 0 simply updated its props rather than shifted positions. Uncontrolled component state (like active form text inputs or checkboxes) remains glued to the index rather than the data item, causing visual bugs!`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "What actually triggers a component re-render in React?",
            shortA: "A component re-renders ONLY when its own State updates, when its Parent component re-renders, or when a Context value it consumes changes.",
            deepA: "A React component re-renders for exactly three reasons: 1) Its own state updater is called (setState); 2) Its parent component re-renders (by default, parent rendering cascades recursively down the child tree unless memoized with React.memo); 3) A React Context it consumes updates. Mutating local variables (let count = 0; count++) never triggers a render because React does not track raw variables, and they are re-initialized on every render cycle.",
            followUp: "What is React Fiber? The rewrite of React's reconciliation engine that enables incremental rendering—the ability to pause, prioritize, and resume work during browser idle periods."
          }
        ]
      }
    },
    {
      id: "react-hooks-optimization",
      title: "5. React Hooks & Performance Optimization",
      level1: {
        intro: "Hooks allow functional components to manage local state, execute side effects, and optimize rendering speed. Misunderstanding hook rules leads to stale closures and performance degradation.",
        analogy: "React.memo, useMemo, and useCallback are like packing a lunchbox before leaving home: instead of stopping at an expensive restaurant to buy food every single afternoon (recomputing on every render), you eat the lunch you already prepared unless your diet requirements change (dependency array updates).",
        svgDiagram: `<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="200" height="150" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="100" y="45" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="700">React.memo</text>
            <text x="100" y="75" text-anchor="middle" fill="#cbd5e1" font-size="11">Wraps a Component</text>
            <text x="100" y="100" text-anchor="middle" fill="#cbd5e1" font-size="11">Skips render if props</text>
            <text x="100" y="120" text-anchor="middle" fill="#cbd5e1" font-size="11">are shallowly equal</text>

            <rect x="230" y="20" width="200" height="150" rx="8" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
            <text x="330" y="45" text-anchor="middle" fill="#4ade80" font-size="13" font-weight="700">useMemo</text>
            <text x="330" y="75" text-anchor="middle" fill="#cbd5e1" font-size="11">Caches a RETURN VALUE</text>
            <text x="330" y="100" text-anchor="middle" fill="#cbd5e1" font-size="11">from an expensive math</text>
            <text x="330" y="120" text-anchor="middle" fill="#cbd5e1" font-size="11">or filtering calculation</text>

            <rect x="460" y="20" width="200" height="150" rx="8" fill="#1e293b" stroke="#facc15" stroke-width="2"/>
            <text x="560" y="45" text-anchor="middle" fill="#facc15" font-size="13" font-weight="700">useCallback</text>
            <text x="560" y="75" text-anchor="middle" fill="#cbd5e1" font-size="11">Caches a FUNCTION REF</text>
            <text x="560" y="100" text-anchor="middle" fill="#cbd5e1" font-size="11">Prevents breaking memo</text>
            <text x="560" y="120" text-anchor="middle" fill="#cbd5e1" font-size="11">on child components</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### Referential Equality & The Memoization Triad:
In JavaScript, \`{} !== {}\` and \`(() => {}) !== (() => {})\`. Every time a component renders, all internal functions receive brand new memory references. Passing an unmemoized inline arrow function breaks \`React.memo\` on children!
- **\`React.memo(Component)\`:** Higher-Order Component that skips re-rendering if incoming props are shallowly identical.
- **\`useMemo(() => computeHeavyMath(items), [items])\`:** Caches the **Calculated Result Value**.
- **\`useCallback(fn, deps)\`:** Caches the **Function Reference itself**.

### Preventing Network Race Conditions with useEffect Cleanups:
\`\`\`javascript
useEffect(() => {
  const controller = new AbortController();

  async function loadData() {
    try {
      const res = await fetch(\`/api/user/\${userId}\`, { signal: controller.signal });
      const data = await res.json();
      setUser(data);
    } catch (err) {
      if (err.name !== "AbortError") console.error(err);
    }
  }

  loadData();
  // Cleanup aborts active network request if userId changes before fetch finishes!
  return () => controller.abort();
}, [userId]);
\`\`\`

### useRef vs. useState:
\`useRef\` returns \`{ current: value }\`. Mutating \`ref.current\` **does not trigger a re-render**. Used for direct DOM element references and mutable variables that persist across renders without causing UI recalculations.`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "What is a Stale Closure in React and how do you resolve it?",
            shortA: "A stale closure occurs when an effect or callback captures state from an older render frame. Fix it using functional state updates or correct dependencies.",
            deepA: "In React, functions inside components capture variables from the specific render cycle in which they were created. If a setInterval callback calls setCount(count + 1) without including count in the useEffect dependency array, the closure keeps referencing count = 0 forever, leaving the counter permanently stuck at 1. The fix is to use functional state updates: setCount(prev => prev + 1), which reads the latest pending state from React's internal queue regardless of closure age.",
            followUp: "Why does calling setState 3 times in a row only increment count by 1? Because React batches state updates within an event tick, evaluating setCount(0 + 1) three times against the same render snapshot."
          }
        ]
      }
    },
    {
      id: "nextjs-rendering-strategies",
      title: "6. Next.js & Modern Rendering Strategies (CSR vs. SSR vs. SSG vs. ISR)",
      level1: {
        intro: "Traditional React delivers an empty HTML file that runs in the user's browser (CSR). Modern frameworks like Next.js render HTML on the server to boost SEO rankings and initial load speed.",
        analogy: "CSR is like being mailed the raw ingredients of a pizza with an oven—you have to bake it yourself before eating. SSG is like buying a pre-baked frozen pizza that is ready instantly. SSR is like a chef cooking a fresh custom pizza for you the exact moment you place the order.",
        svgDiagram: `<svg viewBox="0 0 700 210" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="660" height="170" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="330" y="45" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="14" font-weight="700">NEXT.JS RENDERING ARCHITECTURES</text>

            <rect x="25" y="65" width="135" height="110" rx="6" fill="#1e3a5f" stroke="#64748b"/>
            <text x="92" y="90" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="700">CSR</text>
            <text x="92" y="112" text-anchor="middle" fill="#cbd5e1" font-size="10">Client-Side Render</text>
            <text x="92" y="132" text-anchor="middle" fill="#ef4444" font-size="10">Poor SEO</text>
            <text x="92" y="152" text-anchor="middle" fill="#cbd5e1" font-size="10">Admin Portals</text>

            <rect x="180" y="65" width="135" height="110" rx="6" fill="#1e3a5f" stroke="#64748b"/>
            <text x="247" y="90" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="700">SSR</text>
            <text x="247" y="112" text-anchor="middle" fill="#cbd5e1" font-size="10">Server-Side Render</text>
            <text x="247" y="132" text-anchor="middle" fill="#4ade80" font-size="10">Great SEO</text>
            <text x="247" y="152" text-anchor="middle" fill="#cbd5e1" font-size="10">Dynamic Feeds</text>

            <rect x="335" y="65" width="145" height="110" rx="6" fill="#064e3b" stroke="#22c55e"/>
            <text x="407" y="90" text-anchor="middle" fill="#4ade80" font-size="12" font-weight="700">SSG</text>
            <text x="407" y="112" text-anchor="middle" fill="#cbd5e1" font-size="10">Static Generation</text>
            <text x="407" y="132" text-anchor="middle" fill="#4ade80" font-size="10">Ultra-Fast CDN</text>
            <text x="407" y="152" text-anchor="middle" fill="#cbd5e1" font-size="10">Blogs &amp; Docs</text>

            <rect x="500" y="65" width="135" height="110" rx="6" fill="#78350f" stroke="#f59e0b"/>
            <text x="567" y="90" text-anchor="middle" fill="#facc15" font-size="12" font-weight="700">ISR</text>
            <text x="567" y="112" text-anchor="middle" fill="#cbd5e1" font-size="10">Incremental Static</text>
            <text x="567" y="132" text-anchor="middle" fill="#4ade80" font-size="10">Auto-Revalidates</text>
            <text x="567" y="152" text-anchor="middle" fill="#cbd5e1" font-size="10">Large Catalogs</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### Rendering Strategies Comparison:
| Strategy | Where Rendered? | TTFB | SEO Quality | Best For |
|---|---|---|:---:|---|
| **CSR (Client-Side Rendering)** | In Browser | Slow blank screen | Poor | Authenticated dashboards, SaaS tools |
| **SSR (Server-Side Rendering)** | Server on each request | Moderate | **Excellent** | Personalized real-time feeds, dynamic e-commerce |
| **SSG (Static Site Generation)** | At build time (\`next build\`) | **Ultra-Fast (CDN)** | **Excellent** | Marketing landing pages, documentation |
| **ISR (Incremental Static Regeneration)** | Background revalidation | **Ultra-Fast (CDN)** | **Excellent** | Multi-million item e-commerce catalogs |

### Hydration & Hydration Mismatch Errors:
- **Hydration:** The process where client JavaScript takes over server-rendered static HTML, attaching event listeners and React state.
- **Hydration Mismatch:** Occurs when the server HTML differs from the initial client render pass (e.g. rendering \`typeof window !== "undefined"\`, \`Date.now()\`, or \`localStorage\` directly in JSX). Fix by moving browser-only reads into \`useEffect()\`.

### Next.js React Server Components (RSC):
In Next.js App Router, components are **Server Components by default**. They execute strictly on the server with direct database/filesystem access and contribute **0 KB to the client JavaScript bundle**. Add \`"use client"\` only for components requiring hooks (\`useState\`) or browser interactions (\`onClick\`).`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "What is Hydration in modern web frameworks and what causes Hydration Mismatch errors?",
            shortA: "Hydration attaches event listeners to pre-rendered HTML. Mismatch errors happen when server-rendered HTML differs from the client's first render output.",
            deepA: "When Next.js pre-renders a page on the server, it outputs a static HTML string. When the browser receives this HTML and downloads the React bundle, React parses the existing DOM nodes and attaches event listeners and state hooks—this is Hydration. If the HTML structure generated on the client differs from what the server delivered (due to things like Math.random(), server vs. client timezone differences in Date formatting, or accessing window/localStorage during render), React throws a Hydration Mismatch error and is forced to recreate the DOM.",
            followUp: "When should you mark a component with 'use client'? Only when it requires browser event listeners (onClick), React state or lifecycle hooks (useState, useEffect), or browser APIs (window, navigator)."
          }
        ]
      }
    },
    {
      id: "performance-web-vitals",
      title: "7. Frontend Performance: Debouncing, Throttling & Web Vitals",
      level1: {
        intro: "High-performance websites feel instant to touch, scroll smoothly at 60 FPS, and don't lag when searching. Debouncing and throttling reduce excessive computation on rapid browser events.",
        analogy: "Debouncing is like an elevator door: every time someone walks in, the timer resets and the door waits 5 seconds before closing. Throttling is like an amusement park rollercoaster that departs every 10 minutes, regardless of how many people are waiting in line.",
        svgDiagram: `<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="310" height="150" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="155" y="45" text-anchor="middle" fill="#38bdf8" font-size="14" font-weight="700">DEBOUNCE</text>
            <text x="155" y="75" text-anchor="middle" fill="#cbd5e1" font-size="11">Waits for a pause in events</text>
            <text x="155" y="100" text-anchor="middle" fill="#cbd5e1" font-size="11">Executes 1 time after user stops typing</text>
            <text x="155" y="130" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="700">Best for: Search Autocomplete &amp; Drafts</text>

            <rect x="350" y="20" width="310" height="150" rx="8" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
            <text x="505" y="45" text-anchor="middle" fill="#4ade80" font-size="14" font-weight="700">THROTTLE</text>
            <text x="505" y="75" text-anchor="middle" fill="#cbd5e1" font-size="11">Executes at steady periodic intervals</text>
            <text x="505" y="100" text-anchor="middle" fill="#cbd5e1" font-size="11">Runs at most once every N milliseconds</text>
            <text x="505" y="130" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="700">Best for: Window Resize &amp; Infinite Scroll</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### Debounce vs. Throttle Implementation:
- **Debounce:** Resets the countdown timer on every single invocation. Only fires when events pause for the duration.
- **Throttle:** Ensures the target function runs at most once every $N$ milliseconds.

### Core Web Vitals (Key Google SEO Performance Standards):
1. **LCP (Largest Contentful Paint):** Measures load performance (time until the largest image or text block renders). **Target: < 2.5 seconds**.
2. **INP (Interaction to Next Paint):** Measures page responsiveness (latency from user tap/click to visual screen update). **Target: < 200 milliseconds**.
3. **CLS (Cumulative Layout Shift):** Measures visual stability (elements moving unexpectedly during load). **Target: < 0.1**.`,
        codeExamples: [
          {
            title: "Production Debounce and Throttle Utility Functions",
            language: "javascript",
            code: `// 1. Debounce Implementation
function debounce(fn, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 2. Throttle Implementation
function throttle(fn, limit) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}`
          }
        ]
      },
      level3: {
        interviewQA: [
          {
            q: "What is Code Splitting and how does React.lazy + Suspense optimize bundle sizes?",
            shortA: "Code splitting divides a massive single bundle into smaller chunks that load on demand, reducing initial JavaScript download size and speeding up LCP.",
            deepA: "Without code splitting, a browser must download the entire single-page application JavaScript bundle—including heavy admin pages, charts, and modal code—before rendering the landing page. By wrapping route components in React.lazy(() => import('./AnalyticsDashboard')) with a Suspense fallback, the bundler (Webpack/Vite) creates independent split chunks. The browser downloads the analytics chunk only when the user actually navigates to that route, dramatically slashing initial page load time.",
            followUp: "What is Cumulative Layout Shift (CLS)? A Core Web Vitals metric tracking unexpected visual movement of elements on screen, commonly caused by images missing explicit width/height attributes or dynamically injected banner ads."
          }
        ]
      }
    },
    {
      id: "deep-dive-interview-qa",
      title: "8. Deep-Dive & Tricky Frontend Interview Questions",
      level1: {
        intro: "These 8 interview questions test real-world frontend engineering judgment, JavaScript runtime quirks, and React internals.",
        analogy: "Like a Formula 1 pit crew understanding aerodynamic drag and tire pressure, senior frontend engineers understand how V8 memory frames and browser rendering pipelines behave under heavy interaction."
      },
      level2: {
        technicalExplanation: "Review each deep-dive question below. These represent actual technical interview scenarios from top tech companies."
      },
      level3: {
        interviewQA: [
          {
            q: "Why are developers prohibited from calling React Hooks inside conditional statements (if/else) or loops?",
            shortA: "React tracks hook state using an internal linked list. Hooks must execute in the exact same order every render to maintain correct state pointer alignment.",
            deepA: "React does not track useState or useEffect variables by name; it maintains an ordered internal Hooks Linked List for each component. On subsequent renders, React walks this linked list sequentially to assign state values. Calling a hook conditionally throws off the index pointer, causing subsequent hooks to receive mismatched data from prior states and corrupting component memory."
          },
          {
            q: "What is the difference between Object.freeze() and const in JavaScript?",
            shortA: "const prevents reassignment of the variable identifier. Object.freeze() makes an object's properties shallowly immutable.",
            deepA: "Declaring 'const obj = { age: 20 }' prevents reassigning 'obj = 5', but you can still freely mutate obj.age = 25. Calling 'Object.freeze(obj)' makes the object's properties shallowly immutable, throwing an error in strict mode if you try to add, modify, or delete a property. However, it does not freeze nested objects."
          },
          {
            q: "What are Event Bubbling and Event Capturing and what does event.stopPropagation() do?",
            shortA: "Events travel down from Window to the target (Capturing), fire on the target, then bubble back up to Window (Bubbling). stopPropagation() halts this traversal.",
            deepA: "When an event occurs on a DOM element, it traverses through three phases: 1) Capturing phase (travels from Window down the ancestor tree); 2) Target phase; 3) Bubbling phase (travels upwards from the target back to Window). Calling event.stopPropagation() prevents the event from propagating further along the tree, stopping ancestor listener handlers from firing."
          },
          {
            q: "Why does typeof null === 'object' in JavaScript?",
            shortA: "It is an unfixable 1995 historical bug where null's binary pointer matched the 000 type tag used for objects.",
            deepA: "In the original 1995 JavaScript V8 implementation, values were stored with a 32-bit unit containing a type tag in the lowest 3 bits. The tag for objects was 000. Because null was represented as a NULL pointer (0x00), its lowest bits matched 000, causing typeof to return 'object'. TC39 decided against fixing it because doing so would break millions of legacy websites worldwide."
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
        technicalExplanation: `### Master Frontend Revision Cheat Sheet:

- **Event Loop Order:** Call Stack (Sync) $\\rightarrow$ Microtasks (ALL Promises / \`queueMicrotask\`) $\\rightarrow$ Browser Repaint $\\rightarrow$ Macrotask (ONE \`setTimeout\` / \`setInterval\`).
- **Variable Scoping:**
  - \`var\`: Function scope, hoisted with \`undefined\`, permits re-declarations.
  - \`let\`: Block scope, Temporal Dead Zone (uninitialized), mutable.
  - \`const\`: Block scope, Temporal Dead Zone, immutable reference.
- **Closures:** Inner functions retain access to outer lexical scope even after outer function returns.
- **\`this\` Binding:** Regular functions bind \`this\` dynamically at call-site. Arrow functions bind \`this\` lexically from enclosing scope.
- **React Rendering:**
  - Re-renders occur **only** on State updates, Parent renders, or Context changes.
  - Never mutate state directly—always return new memory references (\`[...arr]\`, \`{...obj}\`).
  - List keys must be unique, stable IDs—never use array indices.
- **Hooks Quick Reference:**
  - \`useState\`: Local state (use \`setX(prev => prev + 1)\` for batch safety).
  - \`useEffect\`: Side effects (always return cleanup to prevent memory leaks).
  - \`useRef\`: Direct DOM access or mutable values without re-renders.
  - \`useMemo\`: Caches computed values.
  - \`useCallback\`: Caches function references.
- **Next.js Rendering Strategies:**
  - **CSR:** Blank HTML shell; client JS renders UI (dashboards).
  - **SSR:** Server builds HTML on each request (personalized real-time pages).
  - **SSG:** Pre-rendered HTML at build time (blogs, documentation).
  - **ISR:** Static HTML regenerated periodically in the background.
- **Debounce vs. Throttle:**
  - **Debounce:** Executes after a pause in events (search bar autocomplete).
  - **Throttle:** Executes at most once every $N$ milliseconds (scroll and resize listeners).
- **Core Web Vitals:** LCP $< 2.5\\text{s}$, INP $< 200\\text{ms}$, CLS $< 0.1$.`
      },
      level3: {
        interviewQA: []
      }
    }
  ],
  "flashcards": [
    {
      "term": "Microtasks vs. Macrotasks",
      "category": "Event Loop Internals",
      "question": "In what order does the JS Event Loop execute Promise.then() vs. setTimeout()?",
      "answer": "Promise callbacks enter the Microtask Queue. setTimeout callbacks enter the Macrotask Queue. The Event Loop completely drains the ENTIRE Microtask Queue after every single synchronous turn before picking the next macrotask.",
      "tip": "Microtasks (Promises) ALWAYS run before Macrotasks (Timers)."
    },
    {
      "term": "Temporal Dead Zone (TDZ)",
      "category": "JavaScript Core",
      "question": "What is the TDZ and how does it differ from 'var' hoisting?",
      "answer": "let and const variables are hoisted to the top of their block scope, but remain uninitialized. Accessing them before their declaration line throws a ReferenceError. 'var' is initialized to undefined.",
      "tip": "TDZ = Hoisted but uninitialized; throws ReferenceError."
    },
    {
      "term": "useCallback vs. useMemo",
      "category": "React Optimization",
      "question": "What is the key difference between useCallback and useMemo?",
      "answer": "useMemo caches the result of invoking a calculation function: useMemo(() => compute(), [deps]). useCallback caches the function instance itself: useCallback(() => handle(), [deps]) to maintain referential equality.",
      "tip": "useMemo = cached value; useCallback = cached function reference."
    },
    {
      "term": "Array Index as React Key Anti-Pattern",
      "category": "Virtual DOM",
      "question": "Why is using array index as a list item 'key' dangerous in React?",
      "answer": "If items are prepended, inserted, or sorted, item indices change. React assumes the component at index 0 hasn't changed its identity and reuses existing DOM nodes and state, causing visual and form input bugs.",
      "tip": "Never use index as key on dynamic lists."
    }
  ]
};
