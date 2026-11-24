// Topic 5: Computer Networks & Web Protocols
var topicNetworks = window.topicNetworks = {
  id: "networks",
  title: "Computer Networks & Web Protocols",
  shortTitle: "Networks & Web",
  icon: "🌐",
  badge: "Internet Fundamentals",
  readingTime: "21 min read",
  description: "Learn how the internet truly functions: OSI layers, TCP vs. UDP, HTTP evolution, TLS encryption, CORS, and real-time communication.",
  learningObjectives: [
    "Understand the 7 Layers of the OSI model and the real-world TCP/IP model",
    "Master the TCP 3-Way Handshake, reliability guarantees, and why UDP is used for gaming",
    "Discover how HTTPS encrypts traffic using a hybrid TLS handshake",
    "Understand Safe vs. Idempotent HTTP methods and crucial status codes (401 vs. 403)",
    "Trace what happens from typing a URL to page render, and demystify CORS errors"
  ],
  lessons: [
    {
      id: "net-osi-tcpip",
      title: "1. Network Models: OSI vs. TCP/IP",
      subtitle: "The 7 layers of communication & packet encapsulation",
      whatIsIt: "Network models provide a standardized framework explaining how digital information travels from an application on your phone across physical cables and radio waves to a server thousands of miles away. The **OSI Model** has 7 theoretical layers, while the practical internet operates on the **TCP/IP 4-Layer Model**.",
      whyNeedIt: "Without layered standardization, software developers would have to rewrite their entire website code every time someone invented a new Wi-Fi router or fiber optic cable. Layering ensures that web browsers only care about HTTP, leaving the messy cable voltages to lower layers.",
      howItWorks: [
        "**The 7 OSI Layers (Top to Bottom):**\n  7. **Application:** End-user interaction (HTTP, DNS, SSH).\n  6. **Presentation:** Formatting, encryption, compression (TLS, JSON).\n  5. **Session:** Maintains connections (Sockets, RPC).\n  4. **Transport:** End-to-end delivery & port numbers (TCP, UDP).\n  3. **Network:** Routing packets across IP addresses (Routers, IPv4/IPv6).\n  2. **Data Link:** Hardware node-to-node frame delivery (Switches, MAC addresses).\n  1. **Physical:** Raw binary bits across physical wires, fiber optics, or radio waves.",
        "**Encapsulation (Sender):** As data moves down layers, each layer wraps the payload with its own **Header** (Data $\\rightarrow$ Segment $\\rightarrow$ Packet $\\rightarrow$ Frame $\\rightarrow$ Bits).",
        "**Decapsulation (Receiver):** The destination strips headers off layer by layer to read the original message."
      ],
      realWorldExample: "**Sending an International Postal Letter:**\n- **Application:** You write a birthday message on a paper card.\n- **Presentation:** You translate it into English.\n- **Session:** You verify the recipient's current home address.\n- **Transport:** You put it into a sturdy envelope.\n- **Network:** The post office adds the global Country & Zip Code (IP address).\n- **Data Link:** The local delivery van reads the street number (MAC address).\n- **Physical:** The airplane and delivery truck physically moving the paper across the ocean.",
      diagram: `
        <svg viewBox="0 0 740 250" class="responsive-svg" aria-label="OSI 7 Layers vs TCP/IP Diagram">
          <!-- OSI 7 Layers -->
          <g transform="translate(40, 20)">
            <text x="120" y="15" font-size="13" font-weight="bold" text-anchor="middle" fill="#3b82f6">OSI 7-Layer Model</text>
            <rect x="0" y="25" width="240" height="24" rx="4" fill="#3b82f6" fill-opacity="0.2"/>
            <text x="120" y="42" font-size="11" text-anchor="middle">7. Application (HTTP, DNS)</text>
            <rect x="0" y="52" width="240" height="24" rx="4" fill="#3b82f6" fill-opacity="0.2"/>
            <text x="120" y="69" font-size="11" text-anchor="middle">6. Presentation (TLS, JSON)</text>
            <rect x="0" y="79" width="240" height="24" rx="4" fill="#3b82f6" fill-opacity="0.2"/>
            <text x="120" y="96" font-size="11" text-anchor="middle">5. Session (Sockets)</text>
            <rect x="0" y="106" width="240" height="24" rx="4" fill="#10b981" fill-opacity="0.2"/>
            <text x="120" y="123" font-size="11" text-anchor="middle">4. Transport (TCP, UDP - Ports)</text>
            <rect x="0" y="133" width="240" height="24" rx="4" fill="#f59e0b" fill-opacity="0.2"/>
            <text x="120" y="150" font-size="11" text-anchor="middle">3. Network (IP Addresses)</text>
            <rect x="0" y="160" width="240" height="24" rx="4" fill="#8b5cf6" fill-opacity="0.2"/>
            <text x="120" y="177" font-size="11" text-anchor="middle">2. Data Link (MAC Addresses)</text>
            <rect x="0" y="187" width="240" height="24" rx="4" fill="#ec4899" fill-opacity="0.2"/>
            <text x="120" y="204" font-size="11" text-anchor="middle">1. Physical (Wires, Bits 0/1)</text>
          </g>

          <!-- Mapping Arrows -->
          <line x1="300" y1="75" x2="420" y2="75" stroke="var(--border-color)" stroke-width="2" stroke-dasharray="4,4"/>
          <line x1="300" y1="130" x2="420" y2="130" stroke="var(--border-color)" stroke-width="2" stroke-dasharray="4,4"/>
          <line x1="300" y1="160" x2="420" y2="160" stroke="var(--border-color)" stroke-width="2" stroke-dasharray="4,4"/>
          <line x1="300" y1="205" x2="420" y2="205" stroke="var(--border-color)" stroke-width="2" stroke-dasharray="4,4"/>

          <!-- TCP/IP 4 Layers -->
          <g transform="translate(440, 20)">
            <text x="120" y="15" font-size="13" font-weight="bold" text-anchor="middle" fill="#10b981">TCP/IP 4-Layer Model</text>
            <rect x="0" y="25" width="240" height="78" rx="6" fill="#3b82f6" fill-opacity="0.15" stroke="#3b82f6"/>
            <text x="120" y="65" font-size="12" font-weight="bold" text-anchor="middle">Application Layer</text>
            <rect x="0" y="106" width="240" height="24" rx="4" fill="#10b981" fill-opacity="0.2" stroke="#10b981"/>
            <text x="120" y="123" font-size="11" font-weight="bold" text-anchor="middle">Transport Layer (TCP/UDP)</text>
            <rect x="0" y="133" width="240" height="24" rx="4" fill="#f59e0b" fill-opacity="0.2" stroke="#f59e0b"/>
            <text x="120" y="150" font-size="11" font-weight="bold" text-anchor="middle">Internet Layer (IP)</text>
            <rect x="0" y="160" width="240" height="51" rx="6" fill="#8b5cf6" fill-opacity="0.15" stroke="#8b5cf6"/>
            <text x="120" y="190" font-size="12" font-weight="bold" text-anchor="middle">Network Access / Link</text>
          </g>
        </svg>
      `,
      diagramCaption: "In production, the top 3 OSI layers merge into a single Application layer in the practical TCP/IP architecture that powers the modern internet.",
      keyPoints: [
        "**Mnemonic for OSI (Top-to-Bottom):** **A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing.",
        "**Transport Layer (Layer 4):** Uses **Port Numbers** to deliver data to a specific app process (e.g. Port 80 for HTTP).",
        "**Network Layer (Layer 3):** Uses **IP Addresses** and routers to move packets globally.",
        "**Data Link Layer (Layer 2):** Uses **MAC Addresses** and switches on the local LAN."
      ],
      deepDive: {
        title: "Deep Dive: PDU (Protocol Data Unit) Names",
        content: "Every layer gives its wrapped package a special name: Layer 7–5 is called **Data**, Layer 4 (Transport) is called a **Segment** in TCP or a **Datagram** in UDP, Layer 3 (Network) is called a **Packet**, Layer 2 (Data Link) is called a **Frame**, and Layer 1 (Physical) consists of raw electrical/optical **Bits**."
      },
      quiz: [
        {
          question: "Which layer of the OSI model is responsible for routing packets across different global networks using IP addresses?",
          options: ["Data Link Layer", "Transport Layer", "Network Layer", "Physical Layer"],
          correct: 2,
          explanation: "The Network Layer (Layer 3) handles logical addressing with IP addresses and packet routing across routers."
        }
      ]
    },
    {
      id: "net-tcp-udp",
      title: "2. Transport Layer: TCP vs. UDP",
      subtitle: "3-way handshake, reliability guarantees & speed trade-offs",
      whatIsIt: "The Transport Layer handles process-to-process communication. **TCP (Transmission Control Protocol)** is connection-oriented, guaranteed, and reliable. **UDP (User Datagram Protocol)** is connectionless, lightweight, and fast with no delivery guarantees.",
      whyNeedIt: "If you download a banking statement or an application update, every single byte must arrive 100% intact (TCP). If you are playing an online action game or streaming live audio, waiting for lost packets would cause jarring lag; you care more about speed than a few dropped pixels (UDP).",
      howItWorks: [
        "**TCP 3-Way Handshake:** Before sending data, Client and Server synchronize: (1) `SYN` $\\rightarrow$ (2) `SYN-ACK` $\\rightarrow$ (3) `ACK`. Connection established!",
        "**TCP Reliability:** Every packet has a Sequence Number. Lost packets are automatically retransmitted. Packets arriving out of order are reassembled correctly.",
        "**TCP Flow & Congestion Control:** Adjusts transmission speed based on receiver buffer size and network congestion.",
        "**UDP (Fire and Forget):** No handshake, no acknowledgments, no ordering, fixed 8-byte header. Packets are fired directly into the network."
      ],
      realWorldExample: "**Registered Postal Mail vs. Live Radio Broadcast:**\n- **TCP:** Registered certified mail. You must sign for delivery. If lost, the post office investigates and resends it until you confirm receipt.\n- **UDP:** A live FM radio broadcast. If static interrupts 1 second of audio while driving through a tunnel, the radio station doesn't pause and replay those 2 seconds; it keeps broadcasting live!",
      keyPoints: [
        "**TCP 3-Way Handshake:** `SYN` -> `SYN-ACK` -> `ACK` establishes reliable sequence tracking.",
        "**Reliability vs. Speed:** TCP ensures 100% loss-free, ordered byte delivery; UDP sacrifices guarantees for ultra-low latency.",
        "**Header Overhead:** TCP has a 20-byte minimum header; UDP has a tiny, fixed 8-byte header."
      ],
      quiz: [
        {
          question: "Which transport protocol guarantees that all packets arrive in the correct sequence without loss?",
          options: ["UDP", "TCP", "ICMP", "ARP"],
          correct: 1,
          explanation: "TCP is connection-oriented and tracks sequence numbers to guarantee packet delivery and correct ordering."
        },
        {
          question: "Why do online multiplayer games and live audio streams frequently choose UDP instead of TCP?",
          options: [
            "UDP encrypts all data automatically",
            "UDP requires no IP address",
            "Speed is prioritized over retransmitting lost packets that would cause lag",
            "UDP can store packets permanently on disk"
          ],
          correct: 2,
          explanation: "Real-time voice and gaming cannot wait for delayed packet retransmissions; freshness and low latency matter far more than a dropped packet."
        }
      ]
    },
    {
      id: "net-http-tls",
      title: "3. HTTP, HTTPS & The TLS Handshake",
      subtitle: "HTTP evolution (1.1 to 3) & hybrid cryptography",
      whatIsIt: "**HTTP (Hypertext Transfer Protocol)** is the language web browsers and servers use to exchange web pages and JSON APIs. **HTTPS (HTTP Secure)** runs HTTP over an encrypted **TLS (Transport Layer Security)** connection, encrypting communication so eavesdroppers cannot steal passwords.",
      whyNeedIt: "Plain HTTP transmits passwords and cookies in unencrypted clear text. Anyone on public airport Wi-Fi could read your login credentials using a packet sniffer. HTTPS keeps web traffic mathematically scrambled.",
      howItWorks: [
        "**HTTP/1.1 (1997):** Text-based. Suffers from **Head-of-Line (HoL) Blocking** where one slow request stalls subsequent requests over a TCP connection.",
        "**HTTP/2 (2015):** Binary framing. Allows **Multiplexing** (multiple concurrent requests interleaved over a single TCP connection) and HPACK header compression.",
        "**HTTP/3 (2022):** Runs over **QUIC (UDP)**. Eliminates TCP transport-level Head-of-Line blocking completely and enables ultra-fast 0-RTT reconnects.",
        "**The Hybrid TLS Handshake:** Uses **Asymmetric Encryption** (RSA / ECC) to safely exchange a temporary secret key, then switches to lightning-fast **Symmetric Encryption** (AES-GCM) for encrypting all real data!"
      ],
      realWorldExample: "**Sending a Padlocked Box with Two Keys:**\nAsymmetric encryption is like an open padlock you give to anyone. Anyone can snap it shut to lock a box, but only your private key can open it. Once you use that secure box to agree on a secret 4-digit code (Symmetric Key), you talk through a fast cipher for the rest of the day!",
      keyPoints: [
        "**HTTP/1.1 vs. HTTP/2:** HTTP/2 multiplexes multiple requests concurrently over a single TCP stream using binary frames.",
        "**HTTP/3 Innovation:** Replaces TCP with UDP-based QUIC to completely eradicate connection-level Head-of-Line blocking.",
        "**Hybrid Cryptography:** Asymmetric encryption securely exchanges session keys; symmetric encryption swiftly scrambles payloads."
      ],
      quiz: [
        {
          question: "Which version of HTTP runs over QUIC (UDP) to completely eliminate TCP Head-of-Line blocking?",
          options: ["HTTP/1.0", "HTTP/1.1", "HTTP/2", "HTTP/3"],
          correct: 3,
          explanation: "HTTP/3 runs on top of QUIC (based on UDP), preventing a single lost packet from stalling other multiplexed streams."
        },
        {
          question: "How does the TLS handshake achieve both strong security and lightning-fast speed?",
          options: [
            "It uses slow asymmetric RSA for all data",
            "It uses hybrid encryption: asymmetric to exchange keys, then fast symmetric AES for data",
            "It disables encryption after the first 100 bytes",
            "It only encrypts HTTP headers"
          ],
          correct: 1,
          explanation: "Hybrid encryption leverages asymmetric cryptography to establish trust and securely exchange a session key, then uses fast symmetric ciphers for all subsequent data."
        }
      ]
    },
    {
      id: "net-methods-status-codes",
      title: "4. HTTP Methods, Idempotency & Status Codes",
      subtitle: "Safe vs. Idempotent APIs & critical status codes (401 vs 403)",
      whatIsIt: "HTTP defines standardized **Methods (Verbs)** indicating the desired action on a resource, and **Status Codes** communicating the result. A method is **Idempotent** if making 1 request or 1,000 identical requests leaves the server in the exact same state.",
      whyNeedIt: "If an unstable mobile internet connection causes a user to tap 'Pay Now' 3 times, an **Idempotent API** ensures the customer is charged exactly once rather than 3 times.",
      howItWorks: [
        "**Safe Methods:** Only read data without making changes (`GET`, `HEAD`, `OPTIONS`).",
        "**Idempotent Methods:** Multiple identical calls have the same outcome (`GET`, `PUT`, `DELETE`).",
        "**Non-Idempotent:** Each call creates a new record or side effect (`POST`).",
        "**Status Code Ranges:**\n  - **2xx (Success):** `200 OK`, `201 Created`, `204 No Content`.\n  - **3xx (Redirect):** `301 Moved Permanently`, `304 Not Modified`.\n  - **4xx (Client Errors):** `400 Bad Request`, `401 Unauthorized` (Unauthenticated), `403 Forbidden` (No permission), `404 Not Found`.\n  - **5xx (Server Errors):** `500 Internal Error`, `502 Bad Gateway` (Backend crashed), `504 Gateway Timeout` (Backend hanging)."
      ],
      realWorldExample: "**The Elevator Button:**\nPressing the '5th Floor' button once tells the elevator to go to floor 5. Pressing it 20 times in a row still sends the elevator to floor 5 with no extra side effects. That elevator button is **Idempotent**!",
      keyPoints: [
        "**Safe vs. Idempotent:** All safe methods are idempotent (e.g. GET), but not all idempotent methods are safe (e.g. DELETE alters state, but repeated calls don't change the outcome).",
        "**POST is Non-Idempotent:** Repeated POST requests can result in duplicate orders or charges unless safeguarded by an Idempotency-Key.",
        "**401 vs. 403:** 401 = Missing or invalid credentials; 403 = Authenticated, but lacking permissions."
      ],
      quiz: [
        {
          question: "If pressing an API button 10 times produces the exact same server state as pressing it once, what property does this API possess?",
          options: ["Polymorphism", "Idempotency", "Asynchrony", "Encapsulation"],
          correct: 1,
          explanation: "Idempotency means repeated identical requests have the exact same effect on the server as a single request."
        },
        {
          question: "A user enters the correct password but tries to delete an admin account without admin privileges. What HTTP status code should the server return?",
          options: ["401 Unauthorized", "403 Forbidden", "404 Not Found", "500 Internal Server Error"],
          correct: 1,
          explanation: "403 Forbidden indicates the server knows who the user is (they are authenticated), but they lack the permissions for that action."
        }
      ]
    },
    {
      id: "net-browser-web-mechanics",
      title: "5. Browser Mechanics, CORS & Storage",
      subtitle: "URL-to-render lifecycle, Same-Origin Policy & cookies",
      whatIsIt: "When you type `https://www.google.com` into your browser, a multi-step pipeline kicks off: **DNS Resolution**, **TCP Handshake**, **TLS Handshake**, **HTTP Request**, and **Critical Rendering Path**. Browsers enforce the **Same-Origin Policy (SOP)**, and backend servers configure **CORS (Cross-Origin Resource Sharing)** to permit secure cross-domain requests.",
      whyNeedIt: "Without the Same-Origin Policy, any random shady website you visit could run background JavaScript to fetch your private Gmail emails or bank transfers using your saved browser login cookies.",
      howItWorks: [
        "**DNS Resolution:** Translates domain name `google.com` into an IP address `142.250.190.46` via Browser Cache $\\rightarrow$ OS Cache $\\rightarrow$ ISP Recursive Resolver $\\rightarrow$ Authoritative DNS.",
        "**CORS (Cross-Origin Resource Sharing):** Browsers block scripts from reading API responses from a different origin (domain/port) unless the server returns `Access-Control-Allow-Origin: *`.",
        "**Cookie Security Flags:**\n  - `HttpOnly`: JavaScript cannot read the cookie (stops XSS token theft).\n  - `Secure`: Cookie only sent across HTTPS.\n  - `SameSite=Lax/Strict`: Prevents Cross-Site Request Forgery (CSRF).",
        "**Real-Time: SSE vs. WebSockets:**\n  - **SSE (Server-Sent Events):** Unidirectional stream from server to client over standard HTTP (ideal for ChatGPT token streaming).\n  - **WebSockets:** Full-duplex bidirectional communication over a single TCP connection (ideal for chat apps and multiplayer gaming)."
      ],
      realWorldExample: "**Why Postman works but Browser throws a CORS error?**\nPostman is a developer testing tool with no ambient user cookies or DOM environment. It doesn't enforce browser security policies. The browser, however, actively shields the user by blocking unauthorized cross-origin responses.",
      keyPoints: [
        "**DNS Hierarchy:** Resolves domain names recursively down to Authoritative Name Servers.",
        "**CORS is Client-Enforced:** Browsers block responses from unapproved foreign origins to protect user credentials.",
        "**SSE vs. WebSockets:** SSE is unidirectional server-to-client streaming over HTTP; WebSockets provide full-duplex two-way communication."
      ],
      quiz: [
        {
          question: "Which cookie security attribute prevents malicious JavaScript from reading session tokens during an XSS attack?",
          options: ["SameSite=None", "HttpOnly", "Path=/", "Max-Age=3600"],
          correct: 1,
          explanation: "HttpOnly cookies are inaccessible to JavaScript via document.cookie, shielding session tokens from XSS theft."
        },
        {
          question: "Why does a curl or Postman command succeed against an API while a web browser running frontend JavaScript encounters a CORS error?",
          options: [
            "Postman uses satellite internet",
            "CORS is a browser security mechanism enforced by the client browser, not by CLI tools",
            "Postman encrypts all requests with AES-512",
            "CORS only applies to mobile phones"
          ],
          correct: 1,
          explanation: "CORS is enforced strictly by web browsers to protect end-users from malicious cross-origin DOM and script attacks."
        }
      ]
    }
  ],
  flashcards: [
    {
      term: "TCP 3-Way Handshake",
      category: "Transport Layer",
      question: "What are the 3 steps of a TCP Handshake?",
      answer: "1. SYN (Client synchronizes)\n2. SYN-ACK (Server acknowledges and synchronizes)\n3. ACK (Client acknowledges, connection ESTABLISHED).",
      tip: "SYN -> SYN-ACK -> ACK."
    },
    {
      term: "401 vs. 403 HTTP Codes",
      category: "HTTP Status Codes",
      question: "What is the exact difference between 401 Unauthorized and 403 Forbidden?",
      answer: "401 means Unauthenticated ('Who are you? Missing or expired credentials'). 403 means Forbidden / Permission Denied ('I know who you are, but you do not have permission').",
      tip: "401: Please login. 403: Logged in, but access forbidden!"
    },
    {
      term: "Idempotent HTTP Method",
      category: "API Design",
      question: "What makes an HTTP method Idempotent?",
      answer: "Making 1 request or 1,000 identical requests leaves the server in the exact same state (GET, PUT, DELETE are idempotent; POST is not).",
      tip: "f(f(x)) = f(x)."
    },
    {
      term: "HttpOnly Cookie Flag",
      category: "Web Security",
      question: "What does the HttpOnly cookie flag do?",
      answer: "Prevents client-side JavaScript (document.cookie) from reading the cookie, completely blocking session token theft via XSS attacks.",
      tip: "Shields your session token from malicious scripts."
    }
  ]
};
