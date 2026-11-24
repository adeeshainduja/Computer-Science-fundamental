// Module 8: Web Security Fundamentals
// Comprehensive Study Data with 3 Levels of Learning

var topicSecurity = window.topicSecurity = {
  id: "security",
  title: "Web Security Fundamentals",
  icon: "🛡️",
  badge: "Module 08",
  description: "Master AuthN vs. AuthZ, JWT Internals, OAuth 2.0 & PKCE, OWASP Top 10 (SQLi, XSS, CSRF, IDOR, SSRF), Bcrypt Password Hashing, and Security Headers.",
  lessons: [
    {
      id: "authn-vs-authz-idor",
      title: "1. Authentication (AuthN), Authorization (AuthZ) & IDOR / BOLA",
      level1: {
        intro: "Every secure web application has two distinct security checkpoints: Authentication checks your passport to verify who you are, while Authorization checks your boarding pass to see if you are allowed in First Class.",
        analogy: "Authentication is like the security guard at an apartment complex checking your driver's license at the gate (Confirming your identity). Authorization is your apartment room key: it opens only your specific door (Apartment 304), not your neighbor's door (Apartment 305).",
        svgDiagram: `<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="660" height="170" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="330" y="45" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="14" font-weight="700">AUTH VERIFICATION PIPELINE</text>

            <rect x="40" y="70" width="260" height="100" rx="8" fill="#1e3a5f" stroke="#38bdf8"/>
            <text x="170" y="95" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="700">1. Authentication (AuthN)</text>
            <text x="170" y="115" text-anchor="middle" fill="#cbd5e1" font-size="11">"Who are you?"</text>
            <text x="170" y="135" text-anchor="middle" fill="#94a3b8" font-size="10">Checks password / JWT signature</text>
            <text x="170" y="155" text-anchor="middle" fill="#ef4444" font-size="10" font-weight="700">Fails with: 401 Unauthorized</text>

            <path d="M 300 120 L 360 120" stroke="#4ade80" stroke-width="3"/>
            <text x="330" y="112" text-anchor="middle" fill="#4ade80" font-size="10">Pass</text>

            <rect x="360" y="70" width="260" height="100" rx="8" fill="#1e3a5f" stroke="#a855f7"/>
            <text x="490" y="95" text-anchor="middle" fill="#c084fc" font-size="13" font-weight="700">2. Authorization (AuthZ)</text>
            <text x="490" y="115" text-anchor="middle" fill="#cbd5e1" font-size="11">"Are you allowed to do this?"</text>
            <text x="490" y="135" text-anchor="middle" fill="#94a3b8" font-size="10">Checks user roles &amp; ownership</text>
            <text x="490" y="155" text-anchor="middle" fill="#ef4444" font-size="10" font-weight="700">Fails with: 403 Forbidden</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### AuthN vs. AuthZ Breakdown:
- **Authentication (AuthN):** Verifying identity. Mechanism: Passwords, OTP, JWT signature validation. Failure returns **\`401 Unauthorized\`** (Unauthenticated).
- **Authorization (AuthZ):** Verifying permissions. Mechanism: Roles, Scopes, Access Control Lists (ACLs). Failure returns **\`403 Forbidden\`** (Identity is valid, but permission denied).

### RBAC vs. ABAC & Principle of Least Privilege:
- **RBAC (Role-Based Access Control):** Users are assigned static roles (\`ADMIN\`, \`USER\`). Suffers from role explosion in complex enterprise environments.
- **ABAC (Attribute-Based Access Control):** Grants access dynamically based on rich attributes (User department, resource tenant ID, time of day, IP geolocation).
- **Principle of Least Privilege (PoLP):** Every user and service must only hold the minimal permissions necessary to do its job.

### IDOR (Insecure Direct Object Reference) / BOLA:
The #1 threat in modern APIs. Occurs when an application directly accepts a database primary key from the user URL (\`/api/invoices/102\`) without verifying whether that specific invoice belongs to the authenticated user.`,
        codeExamples: [
          {
            title: "Vulnerable vs. Secure Endpoint: Preventing IDOR / BOLA",
            language: "javascript",
            code: `// ❌ VULNERABLE: Checks authentication, but misses resource ownership!
app.get('/api/invoices/:id', authenticateToken, async (req, res) => {
  const invoice = await db.invoices.findById(req.params.id);
  if (!invoice) return res.status(404).json({ error: "Not found" });
  res.json(invoice); // LEAKS OTHER USERS' INVOICES!
});

// ✅ SECURE: Enforces strict data ownership at query time!
app.get('/api/invoices/:id', authenticateToken, async (req, res) => {
  const invoice = await db.invoices.findOne({
    where: {
      id: req.params.id,
      userId: req.user.id // Binds query directly to caller's verified ID!
    }
  });
  if (!invoice) return res.status(404).json({ error: "Invoice not found" });
  res.json(invoice);
});`
          }
        ]
      },
      level3: {
        interviewQA: [
          {
            q: "What is the difference between 401 Unauthorized and 403 Forbidden?",
            shortA: "401 means Unauthenticated (identity unknown). 403 means Forbidden / Unauthorized (identity known, but permission denied).",
            deepA: "A 401 status indicates that credentials are missing, invalid, or expired. The server usually attaches a WWW-Authenticate header challenging the client to supply valid credentials. A 403 status indicates that authentication succeeded, but the user does not have permission to access the resource (e.g., a customer trying to access an administrative billing dashboard). Supplying the same credentials again will not resolve a 403.",
            followUp: "What is BOLA / IDOR? Broken Object Level Authorization: an attacker changes an ID parameter in an API call (e.g. /invoices/50 -> /invoices/51) to view or modify someone else's data because the backend fails to check tenant ownership."
          }
        ]
      }
    },
    {
      id: "session-vs-jwt",
      title: "2. Session-Based Auth vs. Token-Based Auth (JWT Deep Dive)",
      level1: {
        intro: "Web apps need a way to remember who you are after you log in. Traditional websites use server-stored Sessions, while modern distributed APIs use cryptographically signed JSON Web Tokens (JWTs).",
        analogy: "A Session is like a hotel room key card: The hotel computer keeps a database record matching your key card number to Room 304. A JWT is like a sealed, signed diplomatic passport: Any airport border officer can inspect your photo, name, and official security stamp to verify you without calling your home government's office.",
        svgDiagram: `<svg viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="660" height="180" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="330" y="45" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="14" font-weight="700">ANATOMY OF A JSON WEB TOKEN (JWT)</text>

            <rect x="25" y="70" width="190" height="110" rx="8" fill="#1e3a5f" stroke="#ef4444" stroke-width="2"/>
            <text x="120" y="95" text-anchor="middle" fill="#f87171" font-size="13" font-weight="700">1. HEADER</text>
            <text x="120" y="120" text-anchor="middle" fill="#cbd5e1" font-size="10">Algorithm &amp; Token Type</text>
            <text x="120" y="140" text-anchor="middle" fill="#94a3b8" font-size="10">{ "alg": "HS256" }</text>
            <text x="120" y="160" text-anchor="middle" fill="#ef4444" font-size="10">Base64URL Encoded</text>

            <rect x="235" y="70" width="190" height="110" rx="8" fill="#1e3a5f" stroke="#a855f7" stroke-width="2"/>
            <text x="330" y="95" text-anchor="middle" fill="#c084fc" font-size="13" font-weight="700">2. PAYLOAD</text>
            <text x="330" y="120" text-anchor="middle" fill="#cbd5e1" font-size="10">Claims &amp; User Metadata</text>
            <text x="330" y="140" text-anchor="middle" fill="#94a3b8" font-size="10">{ "sub": "123", "role": "ADMIN" }</text>
            <text x="330" y="160" text-anchor="middle" fill="#facc15" font-size="10">NOT ENCRYPTED! Plaintext</text>

            <rect x="445" y="70" width="190" height="110" rx="8" fill="#1e3a5f" stroke="#22c55e" stroke-width="2"/>
            <text x="540" y="95" text-anchor="middle" fill="#4ade80" font-size="13" font-weight="700">3. SIGNATURE</text>
            <text x="540" y="120" text-anchor="middle" fill="#cbd5e1" font-size="10">HMAC-SHA256 Hash</text>
            <text x="540" y="140" text-anchor="middle" fill="#94a3b8" font-size="10">Header + Payload + Secret</text>
            <text x="540" y="160" text-anchor="middle" fill="#4ade80" font-size="10">Tamper-Proof Guarantee</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### Stateful Sessions vs. Stateless JWTs:
- **Stateful Sessions:** Server creates a session in Redis and returns a \`sessionId\` cookie. Scalability requires shared session caching. Revocation is instantaneous (delete from Redis).
- **Stateless JWTs:** Server signs a token containing user claims and returns it. Any microservice can verify the signature locally without querying a database. Highly scalable, but token revocation is difficult before expiration.

### Anatomy of a JWT:
$$\\text{JWT} = \\text{Header} \\ . \\ \\text{Payload} \\ . \\ \\text{Signature}$$
- **Crucial Rule:** The payload is **NOT ENCRYPTED**! It is merely Base64URL encoded. Anyone can decode and inspect the claims. Never store passwords, credit card numbers, or confidential keys inside a JWT payload.
- **The Signature:** Guarantees **Data Integrity**. If an attacker tampers with the payload (e.g. changing \`"role": "USER"\` to \`"role": "ADMIN"\`), the signature check fails on the server because the attacker lacks the private secret key.

### Where to Store Tokens Safely:
- **\`localStorage\`:** **CRITICAL RISK!** Vulnerable to **Cross-Site Scripting (XSS)**. Any injected JavaScript can call \`localStorage.getItem("token")\` and steal it.
- **\`HttpOnly + Secure + SameSite=Lax/Strict\` Cookie:** **Best Practice**. JavaScript is blocked from reading the cookie, stopping XSS token theft completely!

### Access Tokens & Refresh Token Rotation (RTR):
- **Access Token:** Short lifespan (**10-15 minutes**). Used for API requests.
- **Refresh Token:** Long lifespan (**7-30 days**). Stored in an \`HttpOnly\` cookie. Used exclusively to obtain fresh access tokens.
- **Rotation (RTR):** When a refresh token is used, it is invalidated and replaced with a new one. If an attacker attempts to reuse an old refresh token, the server detects a breach and revokes all sessions for that user immediately.`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "Can anyone read the payload of a JWT without knowing the server's secret key?",
            shortA: "Yes. The payload is only Base64URL encoded, not encrypted. The secret key is only used to generate and verify the signature.",
            deepA: "A standard JWT is a signed token, not an encrypted token (unless using JWE - JSON Web Encryption). The payload is plain JSON encoded into Base64URL strings. Anyone who intercepts the token can paste it into jwt.io or run atob() to inspect all claims. The server's secret key is required only to verify the HMAC-SHA256 signature, ensuring that no malicious third party modified the payload contents.",
            followUp: "How do you immediately log out or revoke a stateless JWT before its expiration? Maintain a token blacklist in Redis storing the token ID (jti) with a TTL matching its remaining lifespan, and check Redis during authentication."
          }
        ]
      }
    },
    {
      id: "oauth-pkce",
      title: "3. OAuth 2.0 & OpenID Connect (OIDC) Essentials",
      level1: {
        intro: "OAuth 2.0 allows you to grant an app access to your data without giving it your password (like letting a calendar app read your Google Calendar). OpenID Connect (OIDC) builds on OAuth to let you log in using 'Sign in with Google'.",
        analogy: "OAuth 2.0 is like giving a valet key to a parking attendant: the key allows them to drive your car slowly into a parking spot, but does not allow them to open the locked glovebox or trunk. OpenID Connect is like showing your photo ID to the valet so they know who you are.",
        svgDiagram: `<svg viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="660" height="180" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="330" y="45" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="14" font-weight="700">AUTHORIZATION CODE FLOW WITH PKCE (Proof Key for Code Exchange)</text>

            <rect x="30" y="70" width="180" height="110" rx="8" fill="#1e3a5f" stroke="#38bdf8"/>
            <text x="120" y="95" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="700">Client (SPA / Mobile)</text>
            <text x="120" y="115" text-anchor="middle" fill="#cbd5e1" font-size="10">Generates code_verifier</text>
            <text x="120" y="135" text-anchor="middle" fill="#cbd5e1" font-size="10">Derives code_challenge</text>
            <text x="120" y="160" text-anchor="middle" fill="#4ade80" font-size="10">No hardcoded secret!</text>

            <path d="M 210 95 L 450 95" stroke="#38bdf8" stroke-width="2"/>
            <text x="330" y="88" text-anchor="middle" fill="#38bdf8" font-size="10">1. Auth Request + code_challenge</text>

            <rect x="450" y="70" width="180" height="110" rx="8" fill="#1e3a5f" stroke="#22c55e"/>
            <text x="540" y="95" text-anchor="middle" fill="#4ade80" font-size="12" font-weight="700">Auth Server (Google)</text>
            <text x="540" y="115" text-anchor="middle" fill="#cbd5e1" font-size="10">User logs in &amp; consents</text>
            <text x="540" y="135" text-anchor="middle" fill="#cbd5e1" font-size="10">Returns auth_code</text>
            <text x="540" y="160" text-anchor="middle" fill="#facc15" font-size="10">Verifies verifier on swap</text>

            <path d="M 450 135 L 210 135" stroke="#facc15" stroke-width="2"/>
            <text x="330" y="128" text-anchor="middle" fill="#facc15" font-size="10">2. Returns authorization_code</text>

            <path d="M 210 165 L 450 165" stroke="#4ade80" stroke-width="2"/>
            <text x="330" y="158" text-anchor="middle" fill="#4ade80" font-size="10">3. Swap auth_code + code_verifier for Tokens</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### OAuth 2.0 vs. OpenID Connect (OIDC):
- **OAuth 2.0:** A **Delegated Authorization** framework. Grants permissions to third-party apps without sharing user credentials. Issues **Access Tokens**.
- **OpenID Connect (OIDC):** An **Authentication** layer built on top of OAuth 2.0. Powers "Sign in with Google". Issues an **ID Token (JWT)** containing verified user profile data.

### The 4 OAuth 2.0 Roles:
1. **Resource Owner:** The end-user who owns the data.
2. **Client:** The application requesting access (React SPA, mobile app).
3. **Authorization Server:** Authenticates user and issues tokens (Auth0, Google).
4. **Resource Server:** The backend API hosting the protected data.

### Authorization Code Flow with PKCE (Proof Key for Code Exchange):
Single Page Applications (SPAs) and mobile apps cannot safely hide a \`client_secret\` (they are Public Clients). **PKCE** eliminates client secrets:
1. Client generates a random secret **\`code_verifier\`** and hashes it into a **\`code_challenge\`** using SHA-256.
2. Client starts login sending the \`code_challenge\`.
3. User approves; Authorization server returns an \`authorization_code\`.
4. Client exchanges the \`authorization_code\` along with the raw \`code_verifier\`.
5. Server hashes the \`code_verifier\` and verifies it matches the original challenge before returning tokens. Even if an attacker intercepts the authorization code, they cannot exchange it without the verifier!`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "What is the difference between OAuth 2.0 and OpenID Connect (OIDC)?",
            shortA: "OAuth 2.0 handles Authorization (delegated access via Access Tokens). OpenID Connect handles Authentication (identity verification via ID Tokens).",
            deepA: "OAuth 2.0 was designed solely for authorization: allowing a third-party application to act on behalf of a user without seeing their password (e.g. letting Buffer post to Twitter). However, developers misused access tokens to identify users. OpenID Connect (OIDC) was standardized as an identity layer on top of OAuth 2.0. It adds an ID Token (a signed JWT containing claims like sub, email, name) and a /userinfo endpoint, enabling standardized Single Sign-On (SSO).",
            followUp: "Why was the Implicit Grant deprecated in OAuth 2.0? The Implicit flow returned access tokens directly in the URL hash fragment, exposing tokens to browser history, referrer headers, and malicious browser extensions. Replaced by Auth Code + PKCE."
          }
        ]
      }
    },
    {
      id: "owasp-vulnerabilities",
      title: "4. OWASP Top Vulnerabilities: SQLi, XSS, CSRF & SSRF",
      level1: {
        intro: "The Open Web Application Security Project (OWASP) documents the most critical security vulnerabilities found in real-world web applications. Understanding attack vectors and clean defensive code is mandatory for every engineer.",
        analogy: "SQL Injection is like filling out a government form and writing 'DELETE ALL RECORDS' in the Name box: if the clerk blindly executes your writing as an order instead of reading it as a name, the office is ruined. Parameterized queries make sure the clerk treats your writing as data only.",
        svgDiagram: `<svg viewBox="0 0 700 210" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="660" height="170" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="330" y="45" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="14" font-weight="700">CORE OWASP WEB VULNERABILITIES</text>

            <rect x="25" y="70" width="135" height="105" rx="6" fill="#1e3a5f" stroke="#ef4444"/>
            <text x="92" y="95" text-anchor="middle" fill="#f87171" font-size="12" font-weight="700">SQL Injection</text>
            <text x="92" y="115" text-anchor="middle" fill="#cbd5e1" font-size="10">String Concatenation</text>
            <text x="92" y="135" text-anchor="middle" fill="#4ade80" font-size="10" font-weight="700">Fix: Prepared Stmts</text>

            <rect x="180" y="70" width="135" height="105" rx="6" fill="#1e3a5f" stroke="#f59e0b"/>
            <text x="247" y="95" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="700">XSS</text>
            <text x="247" y="115" text-anchor="middle" fill="#cbd5e1" font-size="10">Malicious Injected JS</text>
            <text x="247" y="135" text-anchor="middle" fill="#4ade80" font-size="10" font-weight="700">Fix: Escaping &amp; CSP</text>

            <rect x="335" y="70" width="135" height="105" rx="6" fill="#1e3a5f" stroke="#a855f7"/>
            <text x="402" y="95" text-anchor="middle" fill="#c084fc" font-size="12" font-weight="700">CSRF</text>
            <text x="402" y="115" text-anchor="middle" fill="#cbd5e1" font-size="10">Ambient Cookie Forgery</text>
            <text x="402" y="135" text-anchor="middle" fill="#4ade80" font-size="10" font-weight="700">Fix: SameSite Cookie</text>

            <rect x="490" y="70" width="145" height="105" rx="6" fill="#1e3a5f" stroke="#38bdf8"/>
            <text x="562" y="95" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="700">SSRF</text>
            <text x="562" y="115" text-anchor="middle" fill="#cbd5e1" font-size="10">Server Hits Private IP</text>
            <text x="562" y="135" text-anchor="middle" fill="#4ade80" font-size="10" font-weight="700">Fix: Egress Filtering</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### 1. SQL Injection (SQLi):
Occurs when untrusted user input is directly concatenated into a SQL statement. The database engine executes injected commands:
\`\`\`sql
-- Attacker enters: ' OR '1'='1
SELECT * FROM users WHERE email = '' OR '1'='1' AND password = 'xxx';
\`\`\`
- **The Absolute Defense: Parameterized Queries (Prepared Statements):** The SQL command is pre-compiled into an execution plan **before user values are bound**. Input is treated strictly as raw data, never executable syntax.

### 2. Cross-Site Scripting (XSS):
Injects malicious JavaScript into pages viewed by other users:
- **Stored XSS:** Malicious script is saved in the database (e.g. comments). Executes whenever any user views the post.
- **Reflected XSS:** Script payload is reflected off URL query parameters.
- **DOM-Based XSS:** Client-side JavaScript unsafely modifies DOM (\`element.innerHTML = location.hash\`).
- **Defenses:** \`HttpOnly\` cookies (stops token theft), output HTML encoding, and **Content Security Policy (CSP)**.

### 3. Cross-Site Request Forgery (CSRF):
Tricks an authenticated victim's browser into submitting an unauthorized request to a bank or API. Because browsers attach cookies automatically to cross-site requests (**Ambient Credentials**), the server treats the request as legitimate.
- **Defenses:** **\`SameSite=Lax/Strict\`** cookie flags, Anti-CSRF Synchronizer Tokens, and custom \`Authorization: Bearer\` headers.

### 4. Server-Side Request Forgery (SSRF):
Tricks a backend server into requesting internal private services (e.g. fetching AWS Instance Metadata at \`http://169.254.169.254/latest/meta-data/\` to steal IAM roles). Defense: Block private IP ranges at egress firewalls.`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "What is the core difference between XSS and CSRF?",
            shortA: "In XSS, an attacker executes malicious JavaScript on the victim's browser (user trusts site). In CSRF, an attacker tricks the browser into sending ambient cookies to the server (server trusts browser).",
            deepA: "In a Cross-Site Scripting (XSS) attack, the vulnerability lies in unsanitized user output: the attacker injects arbitrary JavaScript that runs within the victim's browser context, enabling token theft, keylogging, and DOM manipulation. In Cross-Site Request Forgery (CSRF), no script runs on the target site. The attacker exploits the browser's automatic inclusion of session cookies on cross-origin requests by hosting a hidden form on an external site that submits state-changing actions to the victim's authenticated bank.",
            followUp: "How does Content Security Policy (CSP) mitigate XSS? CSP is an HTTP response header that restricts the domains and sources from which the browser is allowed to execute JavaScript, blocking inline scripts and unauthorized external script injection."
          }
        ]
      }
    },
    {
      id: "cryptography-password-hashing",
      title: "5. Cryptography Fundamentals & Password Hashing",
      level1: {
        intro: "Cryptography is the science of keeping data secure. Understanding the difference between encoding, hashing, and encryption is essential for every developer handling user passwords and sensitive records.",
        analogy: "Encoding is like writing a sentence in Morse code: anyone who knows Morse code can read it back. Hashing is like blending fruit into a smoothie: you can never un-blend the smoothie back into a whole apple. Encryption is like locking cash inside a steel safe: only someone with the secret combination key can open it.",
        svgDiagram: `<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="200" height="150" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="100" y="45" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="700">ENCODING</text>
            <text x="100" y="75" text-anchor="middle" fill="#cbd5e1" font-size="11">Reversible (NO KEY)</text>
            <text x="100" y="100" text-anchor="middle" fill="#cbd5e1" font-size="11">Safe data transmission</text>
            <text x="100" y="125" text-anchor="middle" fill="#94a3b8" font-size="10">Base64, URL Encoding</text>

            <rect x="230" y="20" width="200" height="150" rx="8" fill="#1e3a5f" stroke="#a855f7" stroke-width="2"/>
            <text x="330" y="45" text-anchor="middle" fill="#c084fc" font-size="13" font-weight="700">HASHING</text>
            <text x="330" y="75" text-anchor="middle" fill="#cbd5e1" font-size="11">One-Way Irreversible</text>
            <text x="330" y="100" text-anchor="middle" fill="#cbd5e1" font-size="11">Verifies data integrity</text>
            <text x="330" y="125" text-anchor="middle" fill="#4ade80" font-size="10">Bcrypt, Argon2, SHA-256</text>

            <rect x="460" y="20" width="200" height="150" rx="8" fill="#064e3b" stroke="#22c55e" stroke-width="2"/>
            <text x="560" y="45" text-anchor="middle" fill="#4ade80" font-size="13" font-weight="700">ENCRYPTION</text>
            <text x="560" y="75" text-anchor="middle" fill="#cbd5e1" font-size="11">Reversible WITH KEY</text>
            <text x="560" y="100" text-anchor="middle" fill="#cbd5e1" font-size="11">Ensures confidentiality</text>
            <text x="560" y="125" text-anchor="middle" fill="#4ade80" font-size="10">AES-256, RSA, ECC</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### Why Fast Hashes (SHA-256) Fail for Password Storage:
SHA-256 was engineered for high-throughput data integrity checks. Modern GPUs can calculate **billions of SHA-256 hashes per second**. If a database dump leaks, attackers can crack millions of passwords in minutes using brute-force and precomputed **Rainbow Tables**.

### The Solution: Cryptographic Salt + Adaptive Slow Hashes (Bcrypt / Argon2):
1. **Cryptographic Salt:** A unique random string appended to each password prior to hashing:
   $$\\text{Hash} = \\text{Algorithm}(\\text{Password} + \\text{Salt})$$
   Two users sharing the exact same password produce completely distinct hashes, completely neutralizing precomputed Rainbow Tables.
2. **Adaptive Slow Hashes (Bcrypt, Argon2):** Configured with an adjustable **Work Factor (Cost Factor)**. Intentionally takes 100-250ms of CPU time per hash. A human logging in never notices a 200ms delay, but an attacker guessing passwords is throttled to 5 guesses/second per core, making brute force mathematically impossible.

### Symmetric vs. Asymmetric Encryption:
- **Symmetric (AES-256-GCM):** Uses a single shared key for encryption and decryption. Blazing fast, hardware-accelerated. Used for database and file encryption.
- **Asymmetric (RSA / ECC):** Uses a **Public Key** to encrypt and a **Private Key** to decrypt. Solves key distribution, but computationally 100x slower. Used in TLS handshakes and digital signatures.`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "Why shouldn't you use SHA-256 to store user passwords in a database?",
            shortA: "SHA-256 is designed to be extremely fast. Attackers using GPUs can calculate billions of SHA-256 hashes per second to brute-force passwords. Passwords require salted, adaptive slow hashes like Bcrypt or Argon2.",
            deepA: "Cryptographic hash functions like SHA-256 and MD5 are built for high throughput. When an attacker acquires a leaked password database, modern specialized GPU rigs can compute billions of SHA-256 hashes per second, cracking short or dictionary passwords in minutes using Rainbow Tables. Password storage requires slow, memory-hard adaptive hashing algorithms (Bcrypt, Argon2, PBKDF2) with random salts and configurable cost factors that intentionally consume ~200ms of CPU time per hash, rendering large-scale brute force computationally prohibitive.",
            followUp: "What is Argon2? The winner of the Password Hashing Competition (PHC). It provides memory-hard protection against dedicated ASIC and GPU cracking hardware."
          }
        ]
      }
    },
    {
      id: "api-security-headers",
      title: "6. API Security Defense & HTTP Security Headers",
      level1: {
        intro: "Security is defense in depth. HTTP Security Headers are simple server configuration directives that turn on powerful browser-level protection against clickjacking, MIME-sniffing, and SSL downgrade attacks.",
        analogy: "Security headers are like the warning labels and safety locks on a home medicine cabinet: they tell the browser 'Do not allow child tampering, do not open without a key, and do not accept unverified containers'.",
        svgDiagram: `<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="310" height="150" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="155" y="45" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="700">Strict-Transport-Security (HSTS)</text>
            <text x="155" y="75" text-anchor="middle" fill="#cbd5e1" font-size="11">Forces browsers to use HTTPS only</text>
            <text x="155" y="100" text-anchor="middle" fill="#cbd5e1" font-size="11">Blocks SSL Stripping attacks</text>
            <text x="155" y="130" text-anchor="middle" fill="#4ade80" font-size="10">max-age=31536000; includeSubDomains</text>

            <rect x="350" y="20" width="310" height="150" rx="8" fill="#1e293b" stroke="#a855f7" stroke-width="2"/>
            <text x="505" y="45" text-anchor="middle" fill="#c084fc" font-size="13" font-weight="700">X-Frame-Options: DENY</text>
            <text x="505" y="75" text-anchor="middle" fill="#cbd5e1" font-size="11">Prohibits rendering page in &lt;iframe&gt;</text>
            <text x="505" y="100" text-anchor="middle" fill="#cbd5e1" font-size="11">Neutralizes Clickjacking attacks</text>
            <text x="505" y="130" text-anchor="middle" fill="#4ade80" font-size="10">CSP equivalent: frame-ancestors 'none'</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### Must-Know HTTP Security Headers:
1. **\`Strict-Transport-Security\` (HSTS):** Enforces HTTPS strictly for all future visits. Prevents Man-In-The-Middle SSL Stripping attacks.
2. **\`Content-Security-Policy\` (CSP):** Whitelists approved origins for script, image, and style execution (\`default-src 'self'\`). Strongest defense against XSS.
3. **\`X-Frame-Options: DENY\`:** Blocks embedding the website inside an \`<iframe>\`, completely neutralizing **Clickjacking**.
4. **\`X-Content-Type-Options: nosniff\`:** Blocks browsers from MIME-type sniffing, preventing executable scripts disguised as images from running.

### Input Validation & Secrets Hygiene:
- **Allowlists > Denylists:** Always validate against strict approved patterns (e.g. alphanumeric strings) rather than attempting to filter bad words.
- **Secrets Management:** Never commit API secrets or private keys to Git. Inject secrets using environment variables or secret vaults (AWS Secrets Manager, HashiCorp Vault).`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "What is Clickjacking and how do HTTP headers prevent it?",
            shortA: "Clickjacking embeds a legitimate site inside an invisible iframe to trick users into clicking buttons. Prevent it using X-Frame-Options: DENY or CSP frame-ancestors.",
            deepA: "In a Clickjacking attack, an attacker places an authentic website (such as an authenticated bank transfer screen) inside a transparent, hidden iframe positioned directly over an enticing link on a malicious website (like a 'Claim Free Gift' button). When the victim clicks, they inadvertently trigger the action inside the hidden bank iframe. Sending the HTTP header 'X-Frame-Options: DENY' or 'Content-Security-Policy: frame-ancestors 'none'' instructs the browser never to render the page inside a frame, completely blocking the attack.",
            followUp: "What is a Replay Attack and how do Nonces prevent it? An attacker intercepts a valid request packet and resends it to duplicate the transaction. Nonces (single-use random numbers) ensure each request is valid only once."
          }
        ]
      }
    },
    {
      id: "deep-dive-interview-qa",
      title: "7. Deep-Dive & Tricky Web Security Interview Questions",
      level1: {
        intro: "These 7 interview questions test practical security architecture, cryptographic edge cases, and attack defense reasoning.",
        analogy: "Like a white-hat penetration tester inspecting an enterprise perimeter, senior engineers understand how subtle implementation flaws become catastrophic security breaches."
      },
      level2: {
        technicalExplanation: "Review each deep-dive question below. These represent actual technical interview scenarios from top tech companies."
      },
      level3: {
        interviewQA: [
          {
            q: "If an API uses 'Authorization: Bearer <token>' headers instead of cookies, is it vulnerable to CSRF?",
            shortA: "No. Browsers never automatically attach custom Authorization headers to cross-site requests, making token-based header APIs immune to CSRF.",
            deepA: "CSRF exploits the browser's automatic behavior of attaching stored ambient credentials (cookies) to cross-origin requests. Because browsers do not automatically attach custom HTTP headers like 'Authorization: Bearer <jwt>', a malicious third-party site executing a background fetch cannot supply the token unless it explicitly reads it via JavaScript—which the browser's Same-Origin Policy forbids. However, storing that token in localStorage makes the application vulnerable to XSS token theft.",
            followUp: "Why is 'rolling your own cryptography' considered dangerous? Standard cryptographic algorithms have undergone decades of rigorous cryptanalysis. Custom algorithms almost always contain subtle mathematical flaws, timing vulnerabilities, or entropy weaknesses."
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
        technicalExplanation: `### Master Web Security Revision Cheat Sheet:

- **AuthN vs. AuthZ:** AuthN = Who are you? (\`401 Unauthorized\`). AuthZ = What permissions do you have? (\`403 Forbidden\`).
- **JWT Anatomy:** \`Header.Payload.Signature\`. The payload is Base64URL encoded (NOT encrypted!). Signature guarantees integrity.
- **Token Storage:** Never store sensitive tokens in \`localStorage\` (vulnerable to XSS). Store in **\`HttpOnly + Secure + SameSite=Lax/Strict\` Cookies**.
- **OAuth 2.0 vs. OIDC:** OAuth 2.0 = Authorization (Access Tokens). OIDC = Authentication (ID Tokens). Modern SPAs use Authorization Code Flow with **PKCE**.
- **SQL Injection:** Never concatenate strings into queries. Always use **Parameterized Queries (Prepared Statements)**.
- **XSS vs. CSRF:**
  - **XSS:** Malicious JS runs on victim browser. (Defenses: \`HttpOnly\` cookies, output encoding, Content Security Policy).
  - **CSRF:** Attacker tricks browser into sending ambient cookies. (Defenses: \`SameSite\` cookies, Anti-CSRF tokens).
- **IDOR / BOLA:** Exposing DB IDs without checking user tenant ownership. Always enforce \`WHERE id = :id AND userId = :currentUserId\`.
- **Password Hashing:** Never use MD5 or fast SHA-256. Always use **Salted Adaptive Hashes: Bcrypt or Argon2** with an appropriate cost factor.
- **Security Headers:**
  - \`HSTS\`: Enforces HTTPS only.
  - \`CSP\`: Restricts script execution sources (stops XSS).
  - \`X-Frame-Options: DENY\`: Prevents Clickjacking.`
      },
      level3: {
        interviewQA: []
      }
    }
  ],
  "flashcards": [
    {
      "term": "IDOR / BOLA Vulnerability",
      "category": "Authorization Flaws",
      "question": "What is IDOR (Insecure Direct Object Reference) and how is it fixed?",
      "answer": "IDOR occurs when an API trusts a client-supplied object ID (e.g. GET /invoices/1042) without verifying if the requesting user actually owns that resource. Fix: Always scope queries by authenticated session: WHERE id = :id AND user_id = :sessionUserId.",
      "tip": "Never trust client IDs without tenancy checks."
    },
    {
      "term": "HttpOnly Cookies vs. LocalStorage",
      "category": "Token Security",
      "question": "Why should JWT refresh tokens be stored in HttpOnly Cookies rather than LocalStorage?",
      "answer": "LocalStorage is accessible to any JavaScript running on the origin. If an attacker injects a script via XSS, they can steal tokens from LocalStorage. HttpOnly cookies cannot be accessed by JavaScript document.cookie API.",
      "tip": "HttpOnly blocks JS token theft via XSS."
    },
    {
      "term": "Bcrypt / Argon2 vs. SHA-256",
      "category": "Cryptography",
      "question": "Why is SHA-256 dangerous for password storage even if salted?",
      "answer": "SHA-256 is designed to be computationally fast (billions of hashes/sec on GPUs), allowing attackers to brute-force billions of guesses per second. Bcrypt and Argon2 are intentionally slow, memory-hard adaptive hashing algorithms.",
      "tip": "Passwords require slow, salted, memory-hard hashes."
    },
    {
      "term": "CSRF vs. XSS",
      "category": "Web Exploits",
      "question": "What is the key difference in attacker execution between XSS and CSRF?",
      "answer": "XSS executes malicious code inside the victim's browser context to steal credentials or manipulate UI. CSRF tricks the victim's browser into submitting an unauthorized request with ambient cookies without executing code.",
      "tip": "XSS = Code injection; CSRF = Unauthorized request dispatch."
    }
  ]
};
