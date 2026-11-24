// Topic 8: Web Security Fundamentals
var topicSecurity = window.topicSecurity = {
  id: "security",
  title: "Web Security Fundamentals",
  shortTitle: "Web Security",
  icon: "🔒",
  badge: "Application Defense",
  readingTime: "22 min read",
  description: "Learn how hackers attack applications and how software engineers protect them: AuthN vs. AuthZ, JWTs, OAuth 2.0 with PKCE, OWASP Top 10, and modern cryptography.",
  learningObjectives: [
    "Differentiate Authentication (AuthN) from Authorization (AuthZ) and understand 401 vs. 403",
    "Discover how JWTs work under the hood and why tokens must NEVER be stored in `localStorage`",
    "Understand OAuth 2.0 vs. OpenID Connect and the modern PKCE security flow",
    "Explore OWASP Top attacks: SQL Injection, XSS, CSRF, and IDOR with secure code defenses",
    "Learn why SHA-256 fails for passwords and why salted adaptive hashes (Bcrypt, Argon2) are required"
  ],
  lessons: [
    {
      id: "sec-authn-authz-jwt",
      title: "1. Authentication, Authorization & JWTs",
      subtitle: "AuthN vs. AuthZ, token anatomy & safe storage",
      whatIsIt: "**Authentication (AuthN)** verifies *who you are* (like showing your passport). **Authorization (AuthZ)** verifies *what you are allowed to do* (like whether your boarding pass lets you enter first class). A **JWT (JSON Web Token)** is a compact, URL-safe token used to transmit verifiable claims between parties.",
      whyNeedIt: "Without proper authentication and authorization checks on every API endpoint, malicious users could view or modify other users' sensitive private data simply by tweaking numbers in a URL (**IDOR / BOLA vulnerability**).",
      howItWorks: [
        "**401 Unauthorized:** Actually means *Unauthenticated* ('Who are you? Please log in with valid credentials').",
        "**403 Forbidden:** Means *Unauthorized* ('I know who you are, but you do not have permission to view this resource').",
        "**JWT Anatomy (`Header.Payload.Signature`):**\n  - **Header:** Algorithm used (`HS256`).\n  - **Payload:** User claims (`sub`, `name`, `role`). **IMPORTANT: The payload is NOT encrypted!** It is only Base64URL encoded; anyone can read it! Never store secrets inside it.\n  - **Signature:** Cryptographically signed using the server's private secret key to guarantee tamper-proofing.",
        "**Where to Store Tokens:** **NEVER store tokens in `localStorage`** because any injected XSS script can read them. Store them in **`HttpOnly + Secure + SameSite=Lax` Cookies** which JavaScript is physically prohibited from reading!",
        "**Refresh Token Rotation (RTR):** Every time a refresh token is used, it is destroyed and replaced. If a stolen token is reused, the server detects a breach and invalidates all user sessions immediately."
      ],
      realWorldExample: "**Airport Passport Control & Boarding Pass:**\n- **Authentication:** The immigration officer checks your physical Passport (AuthN confirms your identity).\n- **Authorization:** The airline gate agent scans your Boarding Pass to verify you paid for Seat 14B and have permission to board Flight 402 (AuthZ).",
      keyPoints: [
        "**AuthN vs. AuthZ:** 401 indicates unauthenticated identity; 403 indicates insufficient privileges.",
        "**JWT Payload is Public:** JWT claims are only Base64URL encoded; never store secrets inside a token payload.",
        "**Secure Storage:** Store session tokens in `HttpOnly + Secure + SameSite=Lax` cookies to prevent XSS script access."
      ],
      quiz: [
        {
          question: "Is the JSON payload inside a standard JWT encrypted?",
          options: [
            "Yes, with AES-256",
            "No, it is only Base64URL encoded and readable by anyone",
            "Yes, with RSA",
            "Only on mobile phones"
          ],
          correct: 1,
          explanation: "JWT payloads are merely Base64URL encoded strings; anyone can decode and read them. The cryptographic signature only validates that the payload has not been tampered with."
        },
        {
          question: "Where is the most secure place to store session authentication tokens in a web browser to prevent XSS theft?",
          options: [
            "localStorage",
            "sessionStorage",
            "HttpOnly, Secure Cookies",
            "A global JavaScript variable"
          ],
          correct: 2,
          explanation: "Cookies configured with HttpOnly cannot be read or stolen by JavaScript via document.cookie, neutralizing token theft via XSS."
        }
      ]
    },
    {
      id: "sec-oauth-pkce",
      title: "2. OAuth 2.0 & OpenID Connect (OIDC)",
      subtitle: "Delegated access, 'Sign in with Google' & PKCE security",
      whatIsIt: "**OAuth 2.0** is an open authorization standard that lets a third-party application access user data (like your Google Drive files) without you giving the application your Google password. **OpenID Connect (OIDC)** is an authentication identity layer built on top of OAuth 2.0 that provides 'Sign in with Google' profile details via an `ID Token`.",
      whyNeedIt: "In the early days of the web, if a printing service wanted to print your photo album, you had to literally type your Yahoo password into their site! OAuth 2.0 replaced this dangerous practice with secure, delegated **Scoped Access Tokens**.",
      howItWorks: [
        "**The 4 Roles:** Resource Owner (You), Client (Spotify/Photo App), Authorization Server (Google/Auth0), and Resource Server (Google Drive API).",
        "**Authorization Code Flow with PKCE:** Mobile and Single Page Apps cannot keep a client secret safe. **PKCE (Proof Key for Code Exchange)** generates a dynamic `code_verifier` in memory and hashes it into a `code_challenge`. Even if a hacker intercepts the temporary authorization code, they cannot exchange it for tokens without the raw verifier!"
      ],
      realWorldExample: "**Hotel Valet Key:**\nWhen you give your car to a hotel valet, you hand them a special **Valet Key** (Access Token). The valet key can start the engine and drive the car 50 meters into the parking lot, but it physically cannot open the locked glovebox or trunk (Scoped Permissions).",
      keyPoints: [
        "**Delegated Permissions:** OAuth 2.0 issues scoped access tokens instead of sharing user passwords.",
        "**OIDC Identity:** OpenID Connect introduces an ID Token containing verified user identity profile data.",
        "**PKCE Protection:** Proof Key for Code Exchange secures authorization flows on public clients without needing embedded client secrets."
      ],
      quiz: [
        {
          question: "Why was PKCE (Proof Key for Code Exchange) introduced into the OAuth 2.0 standard?",
          options: [
            "To speed up database queries",
            "To securely protect mobile apps and Single Page Apps that cannot keep a client secret confidential",
            "To replace passwords with fingerprints",
            "To eliminate the need for HTTPS"
          ],
          correct: 1,
          explanation: "Public clients like mobile apps and browser SPAs cannot securely store secret keys in their code; PKCE uses dynamic one-time cryptographic verifiers instead."
        },
        {
          question: "Which protocol is designed specifically to provide user identity authentication on top of OAuth 2.0 (e.g., 'Sign in with Google')?",
          options: ["OpenID Connect (OIDC)", "SAML 1.0", "SOAP", "Kerberos"],
          correct: 0,
          explanation: "OpenID Connect (OIDC) extends OAuth 2.0 by introducing an ID Token containing verified user identity profile claims."
        }
      ]
    },
    {
      id: "sec-owasp-top-defenses",
      title: "3. OWASP Top Attacks & Defenses",
      subtitle: "SQL Injection, XSS, CSRF, IDOR & Mass Assignment",
      whatIsIt: "The **OWASP Top 10** is an industry-standard list of the most critical security vulnerabilities found in web applications. The most common threats are **SQL Injection (SQLi)**, **Cross-Site Scripting (XSS)**, **Cross-Site Request Forgery (CSRF)**, and **Insecure Direct Object References (IDOR)**.",
      whyNeedIt: "A single unpatched SQL injection or XSS flaw can allow cybercriminals to dump your entire customer database, compromise administrator accounts, or steal financial records.",
      howItWorks: [
        "**SQL Injection:** Attacker enters `' OR '1'='1` into a login form to alter SQL syntax. **Defense:** Always use **Parameterized Queries (Prepared Statements)** where user input is strictly treated as pure data literals, never executable code.",
        "**XSS (Cross-Site Scripting):** Attacker injects malicious `<script>` tags into comments or profile bios. When other users view the page, the script executes in their browser to steal cookies. **Defense:** `HttpOnly` cookies, output encoding, and **Content Security Policy (CSP)**.",
        "**CSRF (Cross-Site Request Forgery):** Attacker lures a victim to a malicious site that triggers background POST requests to the victim's bank using saved ambient cookies. **Defense:** `SameSite=Lax/Strict` cookies and **Anti-CSRF Tokens**.",
        "**IDOR (Insecure Direct Object Reference):** Attacker changes `/api/invoices/101` to `/api/invoices/102` to view another user's invoice. **Defense:** Always verify data ownership in database queries (`WHERE id = :id AND userId = :currentUserId`)."
      ],
      realWorldExample: "**The Vampire Rule (CSRF Defense):**\nIn folklore, a vampire cannot enter your home unless invited. A browser with `SameSite=Strict` cookies will never allow external websites to sneak cookies into your private banking requests unless you directly clicked a top-level link yourself!",
      keyPoints: [
        "**Parameterized Queries:** Fully eradicate SQL injection by isolating SQL syntax from data variables.",
        "**XSS Neutralization:** Combine `HttpOnly` cookie flags with strict Content Security Policy (CSP) headers.",
        "**CSRF Defense:** Set `SameSite=Lax` or `Strict` on cookies and validate anti-CSRF tokens on state-changing requests.",
        "**IDOR Checks:** Always enforce user authorization checks on object keys at the database query level."
      ],
      quiz: [
        {
          question: "How do Parameterized Queries (Prepared Statements) completely stop SQL Injection attacks?",
          options: [
            "They encrypt the database disk with BitLocker",
            "The database pre-compiles the SQL command structure first, treating user input strictly as literal data rather than executable code",
            "They filter out all quote characters using regex",
            "They run queries on a backup server"
          ],
          correct: 1,
          explanation: "By separating query syntax from parameter values, user input cannot alter the execution logic of the database query."
        },
        {
          question: "An attacker modifies the URL from `/orders/42` to `/orders/43` and can see another user's invoice. What security flaw is this?",
          options: [
            "Cross-Site Scripting (XSS)",
            "Insecure Direct Object Reference (IDOR)",
            "Denial of Service (DoS)",
            "Man-in-the-Middle (MitM)"
          ],
          correct: 1,
          explanation: "IDOR (or Broken Object-Level Authorization) occurs when the backend retrieves records by identifier without checking whether the authenticated user owns that record."
        }
      ]
    },
    {
      id: "sec-cryptography-hashing",
      title: "4. Cryptography, Hashing & Passwords",
      subtitle: "Why SHA-256 fails for passwords, salts & adaptive Bcrypt",
      whatIsIt: "**Encoding** transforms data for safe transmission (reversible). **Hashing** produces a one-way mathematical fingerprint of data (irreversible). **Encryption** scrambles data so only holders of a secret key can decrypt it.",
      whyNeedIt: "If a database leak occurs and you stored passwords in plain text or with fast hashes like MD5/SHA-256, attackers can crack millions of passwords within minutes using modern graphics cards (GPUs) and pre-computed **Rainbow Tables**.",
      howItWorks: [
        "**Why SHA-256 Fails for Passwords:** SHA-256 is engineered to be **extremely fast**. A modern GPU can compute **billions** of SHA-256 guesses per second, making brute-force cracking trivially easy.",
        "**Cryptographic Salt:** Appending a unique random string to each password before hashing (`hash(password + salt)`). Ensures that two users with the exact same password produce completely distinct hashes, destroying Rainbow Table attacks.",
        "**Adaptive Slow Hashes (Bcrypt, Argon2):** Configured with an adjustable **Work Factor** that forces the CPU to perform thousands of iterations. It takes ~200ms per check—unnoticeable to a logging-in user, but slows down an attacker's brute-force guessing to a crawl!",
        "**Symmetric (AES-256) vs. Asymmetric (RSA/ECC):** Symmetric uses 1 shared key (fast, great for databases). Asymmetric uses a Public/Private keypair (solves key exchange challenges)."
      ],
      realWorldExample: "**Meat Grinder vs. Keypad Safe:**\n- **Hashing** is like running meat through a meat grinder into sausage. You can never turn the sausage back into a steak (One-way).\n- **Encryption** is locking a watch inside a keypad safe. Anyone with the 4-digit combination can open it and pull out the exact original watch (Two-way with key).",
      keyPoints: [
        "**One-Way Hashing:** Hashes cannot be mathematically reversed; passwords should only be verified, never decrypted.",
        "**Salts Defeat Rainbow Tables:** Per-user salts guarantee identical passwords yield different hashes.",
        "**Adaptive Work Factors:** Bcrypt and Argon2 slow down offline GPU cracking through adjustable computational complexity."
      ],
      quiz: [
        {
          question: "Why should you NEVER use fast cryptographic hashes like SHA-256 or MD5 for hashing user passwords?",
          options: [
            "SHA-256 produces random errors",
            "Modern GPUs can compute billions of SHA-256 hashes per second, making brute-force cracking trivially fast",
            "SHA-256 cannot be stored in SQL",
            "SHA-256 is an encryption cipher, not a hash"
          ],
          correct: 1,
          explanation: "SHA-256 is designed for high-speed file checksums; its speed allows attackers with GPUs to brute-force billions of password candidates in seconds."
        },
        {
          question: "What is the primary security purpose of adding a unique 'Salt' to a password before hashing it?",
          options: [
            "To make the password longer so it looks neat",
            "To ensure identical passwords generate completely different hashes, destroying Rainbow Table attacks",
            "To encrypt the database connection",
            "To bypass the login page"
          ],
          correct: 1,
          explanation: "A unique salt ensures that two users with the same password have distinct hash outputs, neutralizing pre-computed lookup tables (Rainbow Tables)."
        }
      ]
    }
  ],
  flashcards: [
    {
      term: "Is a JWT Encrypted?",
      category: "JWT Security",
      question: "Is the payload inside a standard JWT encrypted?",
      answer: "NO! The payload is merely Base64URL encoded. Anyone can decode and read it. The signature only proves it has not been tampered with.",
      tip: "Never store credit cards or passwords in a JWT payload."
    },
    {
      term: "SQL Injection Defense",
      category: "OWASP",
      question: "How do Parameterized Queries neutralize SQL Injection 100%?",
      answer: "The database pre-compiles the SQL query template first. User inputs are injected strictly as literal string values, never as executable SQL commands.",
      tip: "Always use prepared statements ($1, ?), never string concatenation."
    },
    {
      term: "Salt in Password Hashing",
      category: "Cryptography",
      question: "What is a Salt and why is it used?",
      answer: "A unique random string appended to each password before hashing. Prevents attackers from using precomputed Rainbow Tables to crack identical passwords.",
      tip: "Every user gets their own unique salt."
    },
    {
      term: "CSRF vs. XSS",
      category: "Web Security",
      question: "What is the difference between XSS and CSRF?",
      answer: "XSS executes malicious JavaScript inside the victim's browser to steal tokens. CSRF tricks the victim's browser into submitting forged requests using existing cookies.",
      tip: "XSS: Runs script. CSRF: Forges request."
    }
  ]
};
