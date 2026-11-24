// Module 5: Computer Networks & Web Protocols
// Comprehensive Study Data with 3 Levels of Learning

var topicNetworks = window.topicNetworks = {
  id: "networks",
  title: "Computer Networks & Web Protocols",
  icon: "🌐",
  badge: "Module 05",
  description: "Master OSI vs. TCP/IP Models, TCP 3-Way Handshake, HTTP/1.1 to HTTP/3 QUIC, TLS Encryption, Idempotent APIs, CORS, and Real-Time WebSockets/SSE.",
  lessons: [
    {
      id: "network-models",
      title: "1. Network Models: OSI 7-Layer vs. TCP/IP Architecture",
      level1: {
        intro: "Computers talk to each other across the global internet by passing data through standardized protocol layers. The OSI model is the theoretical 7-layer design, while TCP/IP is the practical 4-layer model that actually runs the modern internet.",
        analogy: "Sending an email is like mailing a physical letter: You write your message on paper (Application), put it in an envelope with an address label (Network/IP), hand it to the postal delivery truck that drives on physical highways (Physical wires), and the recipient opens the envelope layer by layer to read your letter.",
        svgDiagram: `<svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="0" width="300" height="200" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="150" y="25" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="13" font-weight="700">OSI 7-LAYER REFERENCE MODEL</text>
            <rect x="20" y="38" width="260" height="18" rx="4" fill="#334155"/><text x="150" y="52" text-anchor="middle" fill="#e2e8f0" font-size="10">7. Application (HTTP, DNS)</text>
            <rect x="20" y="60" width="260" height="18" rx="4" fill="#334155"/><text x="150" y="74" text-anchor="middle" fill="#e2e8f0" font-size="10">6. Presentation (TLS, JSON)</text>
            <rect x="20" y="82" width="260" height="18" rx="4" fill="#334155"/><text x="150" y="96" text-anchor="middle" fill="#e2e8f0" font-size="10">5. Session (Sockets, RPC)</text>
            <rect x="20" y="104" width="260" height="18" rx="4" fill="#1e3a5f" stroke="#38bdf8"/><text x="150" y="118" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="700">4. Transport (TCP, UDP Segments)</text>
            <rect x="20" y="126" width="260" height="18" rx="4" fill="#064e3b" stroke="#22c55e"/><text x="150" y="140" text-anchor="middle" fill="#4ade80" font-size="10" font-weight="700">3. Network (IP Packets / Routers)</text>
            <rect x="20" y="148" width="260" height="18" rx="4" fill="#78350f" stroke="#f59e0b"/><text x="150" y="162" text-anchor="middle" fill="#facc15" font-size="10" font-weight="700">2. Data Link (Frames / MAC)</text>
            <rect x="20" y="170" width="260" height="18" rx="4" fill="#4c0519" stroke="#f43f5e"/><text x="150" y="184" text-anchor="middle" fill="#fb7185" font-size="10" font-weight="700">1. Physical (Raw Bits 0101)</text>

            <rect x="360" y="0" width="300" height="200" rx="10" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
            <text x="510" y="25" text-anchor="middle" fill="#4ade80" font-family="system-ui" font-size="13" font-weight="700">TCP/IP 4-LAYER INTERNET MODEL</text>
            <rect x="380" y="38" width="260" height="62" rx="6" fill="#1e3a5f" stroke="#38bdf8"/><text x="510" y="74" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">Application Layer (HTTP, DNS, SSH, TLS)</text>
            <rect x="380" y="104" width="260" height="26" rx="4" fill="#1e3a5f" stroke="#38bdf8"/><text x="510" y="122" text-anchor="middle" fill="#e2e8f0" font-size="11">Transport Layer (TCP, UDP)</text>
            <rect x="380" y="134" width="260" height="26" rx="4" fill="#064e3b" stroke="#22c55e"/><text x="510" y="152" text-anchor="middle" fill="#4ade80" font-size="11">Internet Layer (IP, ICMP)</text>
            <rect x="380" y="164" width="260" height="26" rx="4" fill="#78350f" stroke="#f59e0b"/><text x="510" y="182" text-anchor="middle" fill="#facc15" font-size="11">Link Layer (Ethernet, Wi-Fi)</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### The 7 Layers of the OSI Model:
1. **Application (Layer 7):** Network services directly accessed by software applications (**HTTP**, **HTTPS**, **DNS**, **SSH**, **SMTP**). PDU: **Data**.
2. **Presentation (Layer 6):** Data translation, formatting, compression, and encryption/decryption (**TLS**, **JSON**, **Base64**). PDU: **Data**.
3. **Session (Layer 5):** Establishes, manages, and terminates application communication sessions (**RPC**, **Sockets**). PDU: **Data**.
4. **Transport (Layer 4):** End-to-end process-to-process delivery using **Port Numbers**, error detection, and flow control (**TCP**, **UDP**). PDU: **Segment** (TCP) / **Datagram** (UDP).
5. **Network (Layer 3):** Logical addressing (**IP Addresses**) and packet routing across networks via **Routers**. PDU: **Packet**.
6. **Data Link (Layer 2):** Node-to-node hop delivery, physical hardware addressing (**MAC Address**), and error detection (**CRC**) via **Switches**. PDU: **Frame**.
7. **Physical (Layer 1):** Transmission of raw binary bitstreams across physical transmission media (fiber optic, copper Ethernet cables, radio Wi-Fi). PDU: **Bits**.

### Data Encapsulation & Decapsulation:
- **Encapsulation (Sender):** When data travels down the stack, each layer wraps the payload with its specific **Header** (e.g., Application Data $\\rightarrow$ TCP Segment w/ Ports $\\rightarrow$ IP Packet w/ IPs $\\rightarrow$ Ethernet Frame w/ MACs $\\rightarrow$ Physical Bits).
- **Decapsulation (Receiver):** As bits arrive at the receiving network card, each layer strips off its corresponding header, processes the instructions, and passes the unwrapped payload up to the next layer.`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "What is the difference between a Packet, a Segment, and a Frame?",
            shortA: "They are Protocol Data Units (PDUs) at different network layers: Segment is Layer 4 (Transport), Packet is Layer 3 (Network), and Frame is Layer 2 (Data Link).",
            deepA: "A Segment is formed at the Transport Layer (Layer 4) by adding source and destination port numbers and TCP sequence numbers to application data. A Packet is formed at the Network Layer (Layer 3) by encapsulating the segment inside source and destination IP addresses. A Frame is formed at the Data Link Layer (Layer 2) by encapsulating the packet inside source and destination hardware MAC addresses and appending a CRC trailer for error detection.",
            followUp: "At which layer do Routers operate compared to standard Network Switches? Routers operate at Layer 3 (Network) inspecting IP addresses to route packets. Standard Switches operate at Layer 2 (Data Link) inspecting MAC addresses to forward frames."
          }
        ]
      }
    },
    {
      id: "tcp-vs-udp",
      title: "2. Transport Layer: TCP vs. UDP Internals",
      level1: {
        intro: "The Transport Layer uses port numbers to deliver data to the correct program on your computer. It offers two main protocols: TCP (reliable and ordered, like registered postal mail) and UDP (fast and fire-and-forget, like live radio broadcasting).",
        analogy: "TCP is like a recorded phone call: You say 'Hello', wait for the other person to say 'Hello, I can hear you', and check that every sentence was heard before continuing. UDP is like a megaphone in a soccer stadium: You shout announcements quickly; if a spectator sneezes and misses three words, you don't repeat yourself—the game keeps playing.",
        svgDiagram: `<svg viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="660" height="180" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
            <text x="330" y="45" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="14" font-weight="700">TCP THREE-WAY HANDSHAKE (Connection Establishment)</text>

            <rect x="50" y="65" width="160" height="120" rx="8" fill="#1e3a5f" stroke="#38bdf8" stroke-width="2"/>
            <text x="130" y="90" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="700">CLIENT</text>
            <text x="130" y="115" text-anchor="middle" fill="#cbd5e1" font-size="11">SYN_SENT</text>
            <text x="130" y="165" text-anchor="middle" fill="#4ade80" font-size="12" font-weight="700">ESTABLISHED</text>

            <rect x="450" y="65" width="160" height="120" rx="8" fill="#1e3a5f" stroke="#22c55e" stroke-width="2"/>
            <text x="530" y="90" text-anchor="middle" fill="#4ade80" font-size="13" font-weight="700">SERVER</text>
            <text x="530" y="115" text-anchor="middle" fill="#cbd5e1" font-size="11">LISTEN / SYN_RCVD</text>
            <text x="530" y="165" text-anchor="middle" fill="#4ade80" font-size="12" font-weight="700">ESTABLISHED</text>

            <path d="M 210 95 L 450 95" stroke="#38bdf8" stroke-width="2"/>
            <text x="330" y="90" text-anchor="middle" fill="#38bdf8" font-size="10">1. SYN (seq = x)</text>

            <path d="M 450 125 L 210 125" stroke="#facc15" stroke-width="2"/>
            <text x="330" y="120" text-anchor="middle" fill="#facc15" font-size="10">2. SYN-ACK (seq = y, ack = x + 1)</text>

            <path d="M 210 155 L 450 155" stroke="#4ade80" stroke-width="2"/>
            <text x="330" y="150" text-anchor="middle" fill="#4ade80" font-size="10">3. ACK (ack = y + 1)</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### TCP vs. UDP Comparison:
| Feature | TCP (Transmission Control Protocol) | UDP (User Datagram Protocol) |
|---|---|---|
| **Connection Type** | **Connection-Oriented** (3-Way Handshake) | **Connectionless** (Fire-and-forget) |
| **Reliability** | **Guaranteed Delivery** (Automatic retransmissions via ACKs) | **Best-Effort Delivery** (Packets can drop or arrive out of order) |
| **Ordering** | **Guaranteed In-Order** (Sequence numbers reconstruct stream) | **No Ordering** (Delivered as they arrive) |
| **Header Size** | **20 - 60 Bytes** (Heavyweight: seq, ack, window size, flags) | **8 Bytes Fixed** (Lightweight: Ports, Length, Checksum) |
| **Speed & Latency** | Slower (Handshake, ACK tracking, congestion throttles) | **Blazing Fast & Low Latency** (Minimal CPU overhead) |
| **Flow & Congestion** | **Yes** (Sliding Window & AIMD Congestion Control) | **No** (Transmits data as fast as application supplies it) |

### TCP Connection Teardown (Four-Way Handshake):
Because TCP is **Full-Duplex** (both directions can send data independently), closing requires a 4-step exchange:
1. Client sends \`FIN\` (seq = u).
2. Server responds with \`ACK\` (ack = u + 1) — server can still transmit remaining outbound data!
3. Server finishes and sends its own \`FIN\` (seq = v).
4. Client responds with final \`ACK\` (ack = v + 1) and enters **TIME_WAIT** state.

### The TIME_WAIT State & Port Exhaustion Danger:
After sending the final ACK, the client stays in **TIME_WAIT for 2 * MSL (Maximum Segment Lifetime, 60–120 seconds)**.  
**Why?** If the final ACK was lost in the network, the server will retransmit its FIN. If the client had closed immediately, it would reject the packet with an RST error, causing an unclean connection failure.  
**Production Danger:** In high-throughput microservices opening thousands of short-lived connections without connection pooling, sockets get stuck in \`TIME_WAIT\`, exhausting the OS ephemeral port range (1024-65535) and triggering \`java.net.BindException: Address already in use\`.`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "Why does TCP use a Three-Way Handshake instead of a Two-Way Handshake?",
            shortA: "A two-way handshake cannot reliably synchronize sequence numbers in both directions or prevent delayed duplicate SYN packets from creating zombie connections.",
            deepA: "TCP is a bidirectional (full-duplex) protocol. Both client and server must independently select a random Initial Sequence Number (ISN) and obtain explicit confirmation that the other side received and acknowledged it. With only two packets (SYN -> ACK), the server could never know if the client actually received its sequence number. Furthermore, if an old delayed SYN packet from an aborted session arrives at the server, a 2-way handshake would immediately open a phantom connection on the server, wasting memory and sockets.",
            followUp: "What is SYN Flood attack? An attacker sends thousands of spoofed SYN packets without ever completing the 3rd ACK step, exhausting the server's SYN backlog queue. Mitigated using SYN Cookies."
          }
        ]
      }
    },
    {
      id: "http-https-tls",
      title: "3. HTTP, HTTPS & TLS 1.3 Handshake",
      level1: {
        intro: "HTTP is the language of the web. HTTPS adds an encryption shield (TLS) so hackers on the same Wi-Fi network cannot read your passwords, credit cards, or private messages.",
        analogy: "Sending plain HTTP is like sending a postcard through the mail: Every mail carrier, sorting office worker, and neighbor can read what is written on it. HTTPS is like locking your message inside a titanium lockbox that only the intended recipient has the matching key to open.",
        svgDiagram: `<svg viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="660" height="180" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="330" y="45" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="14" font-weight="700">HTTPS HYBRID CRYPTOGRAPHY ARCHITECTURE</text>

            <rect x="40" y="65" width="260" height="110" rx="8" fill="#1e3a5f" stroke="#a855f7" stroke-width="2"/>
            <text x="170" y="90" text-anchor="middle" fill="#c084fc" font-size="13" font-weight="700">ASYMMETRIC ENCRYPTION</text>
            <text x="170" y="112" text-anchor="middle" fill="#cbd5e1" font-size="11">Used ONLY during TLS Handshake</text>
            <text x="170" y="132" text-anchor="middle" fill="#94a3b8" font-size="10">Public Key (Encrypt) + Private Key (Decrypt)</text>
            <text x="170" y="152" text-anchor="middle" fill="#e2e8f0" font-size="11">Authenticates server &amp; exchanges Session Key</text>

            <path d="M 300 120 L 360 120" stroke="#facc15" stroke-width="3"/>
            <text x="330" y="112" text-anchor="middle" fill="#facc15" font-size="10" font-weight="700">Yields</text>

            <rect x="360" y="65" width="260" height="110" rx="8" fill="#064e3b" stroke="#22c55e" stroke-width="2"/>
            <text x="490" y="90" text-anchor="middle" fill="#4ade80" font-size="13" font-weight="700">SYMMETRIC ENCRYPTION</text>
            <text x="490" y="112" text-anchor="middle" fill="#cbd5e1" font-size="11">Used for ALL Application Data Transfer</text>
            <text x="490" y="132" text-anchor="middle" fill="#94a3b8" font-size="10">Single Shared Secret Session Key (AES-GCM)</text>
            <text x="490" y="152" text-anchor="middle" fill="#e2e8f0" font-size="11">Hardware-accelerated and lightning fast!</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### HTTP Evolution: HTTP/1.1 vs. HTTP/2 vs. HTTP/3:
| Feature | HTTP/1.1 (1997) | HTTP/2 (2015) | HTTP/3 (2022) |
|---|---|---|---|
| **Transport Layer** | **TCP** | **TCP** | **QUIC (over UDP)** |
| **Format** | Plain Text Strings | **Binary Framing** (Frames & Streams) | **Binary QUIC Packets** |
| **Multiplexing** | No (Head-of-Line Blocking; browsers open 6 parallel TCP connections) | **Yes** (Multiplexed streams over 1 TCP connection) | **Yes** (True transport-level multiplexing) |
| **Header Compression** | None (Redundant headers repeated) | **HPACK** compression table | **QPACK** (Optimized for out-of-order UDP) |
| **Head-of-Line Blocking** | Present at HTTP application layer | Fixed at application layer, **but still exists at TCP layer** (1 dropped packet halts all streams) | **Completely Eliminated!** (Dropped packet in stream 1 never stalls stream 2) |
| **Handshake Latency** | TCP (1-RTT) + TLS (1-2 RTT) = 2-3 RTT | TCP (1-RTT) + TLS 1.3 (1-RTT) = 2 RTT | QUIC + TLS 1.3 = **1 RTT (0-RTT on resumption)** |

### Why HTTPS Uses Hybrid Cryptography:
1. **Asymmetric Encryption (RSA / ECC):** Uses a Public Key to encrypt and Private Key to decrypt. Highly secure for identity authentication, but **computationally slow and CPU-heavy**.
2. **Symmetric Encryption (AES-GCM):** Uses a single shared secret key for both encryption and decryption. **Extremely fast and hardware-accelerated by modern CPUs**, but the secret key cannot be transmitted safely over an open public network.
3. **The Solution:** HTTPS uses **Asymmetric Encryption only during the handshake** to authenticate the server certificate and securely exchange a random **Symmetric Session Key**. Once established, all bulk HTTP data transfer switches to blazing-fast **Symmetric Encryption**.`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "Why does HTTP/2 still suffer from Head-of-Line (HoL) Blocking, and how does HTTP/3 fix it?",
            shortA: "HTTP/2 multiplexes streams over a single TCP connection, but TCP treats all data as one continuous byte stream. If one packet drops, TCP freezes all streams. HTTP/3 uses QUIC over UDP where streams are independent.",
            deepA: "In HTTP/2, all multiplexed HTTP request/response streams travel through a single underlying TCP connection. TCP guarantees strictly ordered byte streams. If a single TCP segment is lost or corrupted in transit, the receiving OS TCP stack pauses delivery of ALL subsequent data until the lost segment is retransmitted and acknowledged. In HTTP/3, the transport layer is replaced by QUIC running over UDP. QUIC handles stream multiplexing natively: each stream is transmitted as independent UDP datagrams. If packet loss hits Stream 1, only Stream 1 waits for retransmission; Streams 2, 3, and 4 continue processing without any delay.",
            followUp: "What is 0-RTT Connection Resumption in TLS 1.3 / HTTP/3? When a client reconnects to a previously visited server, it encrypts the initial application payload using cached session parameters, sending data in the very first packet with zero roundtrip delay."
          }
        ]
      }
    },
    {
      id: "http-methods-idempotency",
      title: "4. HTTP Methods, Idempotency & Status Codes",
      level1: {
        intro: "HTTP methods describe the action you want the server to perform (read, create, replace, delete). Idempotency ensures that accidental duplicate requests (like tapping 'Pay Now' twice) do not charge your credit card twice.",
        analogy: "An elevator button is Idempotent: If you press the 'Floor 5' button once, the elevator takes you to Floor 5. If you press it 10 times in a row, the elevator still takes you to Floor 5. An elevator button that adds $10 to your maintenance bill every time you tap it is Non-Idempotent.",
        svgDiagram: `<svg viewBox="0 0 700 210" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="660" height="170" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
            <text x="330" y="45" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="14" font-weight="700">HTTP STATUS CODE FAMILIES</text>
            <rect x="25" y="70" width="105" height="95" rx="8" fill="#1e3a5f" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="77" y="95" text-anchor="middle" fill="#38bdf8" font-size="14" font-weight="700">1xx</text>
            <text x="77" y="120" text-anchor="middle" fill="#cbd5e1" font-size="11">Informational</text>
            <text x="77" y="145" text-anchor="middle" fill="#94a3b8" font-size="10">101 Switching</text>

            <rect x="150" y="70" width="105" height="95" rx="8" fill="#064e3b" stroke="#22c55e" stroke-width="1.5"/>
            <text x="202" y="95" text-anchor="middle" fill="#4ade80" font-size="14" font-weight="700">2xx</text>
            <text x="202" y="120" text-anchor="middle" fill="#cbd5e1" font-size="11">Success</text>
            <text x="202" y="145" text-anchor="middle" fill="#94a3b8" font-size="10">200, 201, 204</text>

            <rect x="275" y="70" width="105" height="95" rx="8" fill="#78350f" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="327" y="95" text-anchor="middle" fill="#fbbf24" font-size="14" font-weight="700">3xx</text>
            <text x="327" y="120" text-anchor="middle" fill="#cbd5e1" font-size="11">Redirection</text>
            <text x="327" y="145" text-anchor="middle" fill="#94a3b8" font-size="10">301, 302, 304</text>

            <rect x="400" y="70" width="115" height="95" rx="8" fill="#7f1d1d" stroke="#ef4444" stroke-width="1.5"/>
            <text x="457" y="95" text-anchor="middle" fill="#f87171" font-size="14" font-weight="700">4xx</text>
            <text x="457" y="120" text-anchor="middle" fill="#cbd5e1" font-size="11">Client Error</text>
            <text x="457" y="145" text-anchor="middle" fill="#94a3b8" font-size="10">401, 403, 404, 409</text>

            <rect x="535" y="70" width="105" height="95" rx="8" fill="#4c0519" stroke="#f43f5e" stroke-width="1.5"/>
            <text x="587" y="95" text-anchor="middle" fill="#fb7185" font-size="14" font-weight="700">5xx</text>
            <text x="587" y="120" text-anchor="middle" fill="#cbd5e1" font-size="11">Server Error</text>
            <text x="587" y="145" text-anchor="middle" fill="#94a3b8" font-size="10">500, 502, 504</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### Safe vs. Idempotent Methods:
- **Safe Methods:** Do not alter server state. Read-only (\`GET\`, \`HEAD\`, \`OPTIONS\`).
- **Idempotent Methods:** Calling the endpoint 1 time produces the exact same server side-effects as calling it 100 times ($f(f(x)) = f(x)$).

| Method | Safe? | Idempotent? | Role |
|---|:---:|:---:|---|
| **GET** | **Yes** | **Yes** | Retrieve resource |
| **PUT** | No | **Yes** | Replace resource completely or create at exact URI |
| **DELETE** | No | **Yes** | Remove resource (first call deletes; subsequent calls return 404 or 204, leaving state unchanged) |
| **POST** | No | **NO** | Creates a new resource or triggers processing (each call creates another row) |
| **PATCH** | No | Generally NO | Partial update (e.g., \`{"increment": 1}\` changes state each call) |

### The Idempotency-Key Pattern for Payment Processing:
1. Client generates a unique UUID: \`Idempotency-Key: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d\`.
2. Server checks Redis:
   - **Key absent:** Acquires lock, charges payment gateway, stores response in Redis (24-hour TTL), and returns \`201 Created\`.
   - **Key present:** Skips payment execution completely and **returns the cached response immediately**!
3. Database level: An \`idempotency_key UNIQUE\` constraint guarantees duplicate inserts fail at the database transaction layer.

### Must-Know Status Code Differences:
- **401 Unauthorized vs. 403 Forbidden:**
  - \`401\`: **Unauthenticated** ("I don't know who you are"). Missing/invalid token. Client can log in and retry.
  - \`403\`: **Forbidden / Unauthorized** ("I know who you are, but you do not have permission"). Logging in again will not help.
- **502 Bad Gateway vs. 504 Gateway Timeout:**
  - \`502\`: A reverse proxy (Nginx) received an invalid response or connection crash from the upstream application server.
  - \`504\`: The reverse proxy timed out waiting for the upstream server to respond (e.g., an unindexed slow SQL query hanging).`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "What is the exact practical difference between 401 Unauthorized and 403 Forbidden?",
            shortA: "401 means Unauthenticated (identity unknown; please provide valid credentials). 403 means Unauthorized (identity known, but access is denied).",
            deepA: "A 401 Unauthorized response indicates missing, invalid, or expired credentials (like an expired JWT or bad API key). The server includes a WWW-Authenticate header challenging the client to authenticate. A 403 Forbidden response indicates that the client has been authenticated successfully, but their RBAC roles or permissions do not allow them to perform the requested operation (e.g., a customer trying to access an administrative endpoint). Re-submitting the same credentials will not change the outcome.",
            followUp: "What is 422 Unprocessable Entity? The syntax of the JSON payload is completely valid, but business validation failed (e.g., negative balance or invalid birthdate)."
          }
        ]
      }
    },
    {
      id: "browser-mechanics-cors",
      title: "5. Browser Mechanics, URL Lifecycle & CORS Deep Dive",
      level1: {
        intro: "Typing a URL into a browser kicks off a multi-step sequence involving DNS lookups, TCP handshakes, TLS security, and the browser rendering engine.",
        analogy: "CORS is like a security guard stationed at the front entrance of your web browser. If your browser visits Website A, the guard prevents background JavaScript on Website A from secretly reading private financial data from your bank on Website B unless Website B explicitly gives written permission.",
        svgDiagram: `<svg viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="660" height="180" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="330" y="45" text-anchor="middle" fill="#38bdf8" font-family="system-ui" font-size="14" font-weight="700">URL TO RENDER LIFECYCLE (6 KEY PHASES)</text>

            <rect x="20" y="65" width="95" height="110" rx="6" fill="#1e3a5f" stroke="#64748b"/>
            <text x="67" y="90" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">1. DNS</text>
            <text x="67" y="115" text-anchor="middle" fill="#cbd5e1" font-size="9">Browser Cache</text>
            <text x="67" y="130" text-anchor="middle" fill="#cbd5e1" font-size="9">OS Cache</text>
            <text x="67" y="145" text-anchor="middle" fill="#cbd5e1" font-size="9">Recursive DNS</text>

            <rect x="125" y="65" width="95" height="110" rx="6" fill="#1e3a5f" stroke="#64748b"/>
            <text x="172" y="90" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">2. TCP</text>
            <text x="172" y="115" text-anchor="middle" fill="#cbd5e1" font-size="9">Port 443</text>
            <text x="172" y="130" text-anchor="middle" fill="#cbd5e1" font-size="9">SYN / ACK</text>
            <text x="172" y="145" text-anchor="middle" fill="#cbd5e1" font-size="9">3-Way Setup</text>

            <rect x="230" y="65" width="95" height="110" rx="6" fill="#1e3a5f" stroke="#64748b"/>
            <text x="277" y="90" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">3. TLS</text>
            <text x="277" y="115" text-anchor="middle" fill="#cbd5e1" font-size="9">Cert Verify</text>
            <text x="277" y="130" text-anchor="middle" fill="#cbd5e1" font-size="9">Cipher Suite</text>
            <text x="277" y="145" text-anchor="middle" fill="#cbd5e1" font-size="9">Session Key</text>

            <rect x="335" y="65" width="95" height="110" rx="6" fill="#1e3a5f" stroke="#64748b"/>
            <text x="382" y="90" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">4. HTTP</text>
            <text x="382" y="115" text-anchor="middle" fill="#cbd5e1" font-size="9">GET /</text>
            <text x="382" y="130" text-anchor="middle" fill="#cbd5e1" font-size="9">Nginx Reverse</text>
            <text x="382" y="145" text-anchor="middle" fill="#cbd5e1" font-size="9">200 HTML</text>

            <rect x="440" y="65" width="95" height="110" rx="6" fill="#1e3a5f" stroke="#64748b"/>
            <text x="487" y="90" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="700">5. DOM/CSS</text>
            <text x="487" y="115" text-anchor="middle" fill="#cbd5e1" font-size="9">DOM Tree</text>
            <text x="487" y="130" text-anchor="middle" fill="#cbd5e1" font-size="9">CSSOM Tree</text>
            <text x="487" y="145" text-anchor="middle" fill="#cbd5e1" font-size="9">Render Tree</text>

            <rect x="545" y="65" width="95" height="110" rx="6" fill="#064e3b" stroke="#22c55e"/>
            <text x="592" y="90" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="700">6. PAINT</text>
            <text x="592" y="115" text-anchor="middle" fill="#cbd5e1" font-size="9">Layout Reflow</text>
            <text x="592" y="130" text-anchor="middle" fill="#cbd5e1" font-size="9">GPU Paint</text>
            <text x="592" y="145" text-anchor="middle" fill="#4ade80" font-size="9" font-weight="700">Pixels on Screen</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### URL Navigation 6-Step Pipeline:
1. **URL Parsing & HSTS Check:** Parses protocol, domain, and port. Checks HTTP Strict Transport Security (HSTS) cache to enforce HTTPS.
2. **Recursive DNS Resolution:** Resolves domain to IP: Browser cache $\\rightarrow$ OS cache (\`hosts\`) $\\rightarrow$ Local Router cache $\\rightarrow$ ISP Recursive Resolver (queries Root \`.\` $\\rightarrow$ TLD \`.com\` $\\rightarrow$ Authoritative Name Server).
3. **TCP 3-Way Handshake:** Establishes connection on port 443 (\`SYN\`, \`SYN-ACK\`, \`ACK\`).
4. **TLS Handshake:** Server sends SSL certificate. Browser validates signature against trusted OS Root CAs and negotiates symmetric session keys.
5. **HTTP Request & Response:** Browser sends \`HTTP/2 GET /\`. Reverse proxy terminates TLS, routes to backend application, and streams back HTML.
6. **Critical Rendering Path:** Constructs **DOM** and **CSSOM**, combines them into the **Render Tree**, computes geometry (**Layout/Reflow**), and paints pixels to GPU buffers (**Paint & Compositing**).

### CORS (Cross-Origin Resource Sharing) Deep Dive:
- **Origin Definition:** $\\text{Origin} = \\text{Scheme} + \\text{Domain} + \\text{Port}$. Changing any of the three constitutes a cross-origin request.
- **Why CORS Errors Happen:** CORS is an in-browser security boundary enforced by the **Same-Origin Policy (SOP)**. When JavaScript issues a non-simple request (e.g. \`POST\` with \`application/json\` or \`Authorization\` headers), the browser sends an **\`OPTIONS\` Preflight Request**.
- **Backend CORS Fix Headers:**
  - \`Access-Control-Allow-Origin: https://frontend.com\`
  - \`Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS\`
  - \`Access-Control-Allow-Headers: Content-Type, Authorization\`
  - \`Access-Control-Allow-Credentials: true\`

### Cookie Security Flags:
- **\`HttpOnly\`:** Prevents client-side JavaScript (\`document.cookie\`) from reading the cookie. **Stops session token theft via XSS!**
- **\`Secure\`:** Cookie is sent strictly over encrypted HTTPS connections.
- **\`SameSite=Lax/Strict\`:** Dictates cross-site cookie transmission to **prevent CSRF attacks**.`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "Why does a CORS error occur in a browser, but the exact same request succeeds in Postman or cURL?",
            shortA: "CORS is enforced exclusively by web browsers to protect users from malicious scripts under the Same-Origin Policy. Postman and cURL are developer tools that do not enforce browser SOP.",
            deepA: "Cross-Origin Resource Sharing (CORS) is purely a browser-side security feature. When JavaScript in a browser executes a fetch request across origins, the server actually receives and answers the request. However, when the browser inspects the response headers and finds that the server did not explicitly provide an Access-Control-Allow-Origin header granting access to that origin, the browser blocks JavaScript from reading the response and logs a CORS error. Postman and cURL are backend HTTP clients with no DOM, no stored user sessions, and no cross-site script execution risk, so they never enforce SOP.",
            followUp: "What is a Simple Request in CORS? A simple request uses GET, HEAD, or POST with standard content types (e.g. application/x-www-form-urlencoded, text/plain) and no custom headers, allowing the browser to skip the OPTIONS preflight."
          }
        ]
      }
    },
    {
      id: "real-time-protocols",
      title: "6. Real-Time Communication & Infrastructure Basics",
      level1: {
        intro: "Traditional web browsing is request-and-response: you click a link and the server returns a page. Real-time apps like chat, live sports scores, and collaborative whiteboards need continuous, two-way communication.",
        analogy: "Short Polling is like asking your parents 'Are we there yet?' every 30 seconds on a road trip. Server-Sent Events (SSE) is like listening to live news on the car radio—the station broadcasts continuously to you. WebSockets is like a live telephone phone call where both you and your friend can talk and listen at the exact same time without hanging up.",
        svgDiagram: `<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" class="concept-svg">
          <g transform="translate(20, 20)">
            <rect x="0" y="20" width="660" height="170" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
            <text x="330" y="45" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="14" font-weight="700">REAL-TIME WEB PROTOCOLS COMPARISON</text>

            <rect x="30" y="65" width="280" height="110" rx="8" fill="#1e3a5f" stroke="#38bdf8" stroke-width="2"/>
            <text x="170" y="90" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="700">SERVER-SENT EVENTS (SSE)</text>
            <text x="170" y="112" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="700">Unidirectional (Server -> Client)</text>
            <text x="170" y="132" text-anchor="middle" fill="#cbd5e1" font-size="10">Runs over standard HTTP/1.1 or HTTP/2</text>
            <text x="170" y="152" text-anchor="middle" fill="#94a3b8" font-size="10">Best for: Live Stock Tickers, AI Token Streaming</text>

            <rect x="350" y="65" width="280" height="110" rx="8" fill="#1e3a5f" stroke="#22c55e" stroke-width="2"/>
            <text x="490" y="90" text-anchor="middle" fill="#4ade80" font-size="13" font-weight="700">WEBSOCKETS (ws://, wss://)</text>
            <text x="490" y="112" text-anchor="middle" fill="#facc15" font-size="11" font-weight="700">Full-Duplex (Bidirectional)</text>
            <text x="490" y="132" text-anchor="middle" fill="#cbd5e1" font-size="10">Persistent TCP connection with 2-byte framing</text>
            <text x="490" y="152" text-anchor="middle" fill="#94a3b8" font-size="10">Best for: Chat Apps, Multiplayer Games, Figma</text>
          </g>
        </svg>`
      },
      level2: {
        technicalExplanation: `### Real-Time Protocol Matrix:
| Model | Protocol | Direction | Framing Overhead | Best Use Cases |
|---|---|---|---|---|
| **Short Polling** | Standard HTTP | Half-Duplex | Very High (Repeated handshakes & headers) | Simple dashboards with slow update frequencies |
| **Long Polling** | Standard HTTP | Half-Duplex | Moderate (Holds connection until data ready) | Fallback when WebSockets are blocked by proxies |
| **Server-Sent Events (SSE)** | HTTP/1.1 or HTTP/2 | **Unidirectional (Server $\\rightarrow$ Client)** | **Very Low** (Single HTTP connection, lightweight text framing, auto-reconnect) | **Live Stock Tickers, Sports Scoreboards, ChatGPT / AI Token Streaming** |
| **WebSockets** | \`ws://\` / \`wss://\` (TCP) | **Full-Duplex (Bidirectional)** | **Extremely Low** (2-byte framing overhead after initial HTTP upgrade) | **Real-Time Chat (Slack), Multiplayer Gaming, Collaborative Whiteboards** |

### Forward Proxy vs. Reverse Proxy (Nginx) vs. CDN:
- **Forward Proxy (Protects/Hides Clients):** Sits in front of client devices. Hides client IPs, enforces corporate firewalls, and enables VPN access.
- **Reverse Proxy (Protects/Hides Servers):** Sits in front of backend servers. Handles **Load Balancing**, **SSL Termination**, Caching, Rate Limiting, and DDoS mitigation.
- **Content Delivery Network (CDN):** A global distributed network of edge cache servers (Cloudflare, CloudFront) that cache static assets close to end users.`,
        codeExamples: []
      },
      level3: {
        interviewQA: [
          {
            q: "Why do AI models like ChatGPT and Gemini stream responses using SSE instead of WebSockets?",
            shortA: "Because AI token generation is strictly unidirectional (Server to Client). SSE runs natively over standard HTTP without requiring custom WebSocket infrastructure or connection upgrades.",
            deepA: "In LLM generation, the client sends a single prompt, and the server generates tokens sequentially over several seconds. Because data flows in only one direction (Server -> Client), full-duplex WebSockets are architectural overkill. Server-Sent Events (SSE) operate over standard HTTP/1.1 or HTTP/2 using Content-Type: text/event-stream. SSE benefits from standard HTTP caching, built-in browser automatic reconnection, HTTP/2 multiplexing, and seamless traversal of corporate firewalls without requiring specialized WebSocket connection state management on load balancers.",
            followUp: "How does WebSocket upgrade work? The client sends an HTTP GET with headers: 'Upgrade: websocket' and 'Connection: Upgrade'. If accepted, the server responds with '101 Switching Protocols' and switches the socket to raw WebSocket frames."
          }
        ]
      }
    },
    {
      id: "deep-dive-interview-qa",
      title: "7. Deep-Dive & Tricky Networks Interview Questions",
      level1: {
        intro: "These 8 interview questions test real-world networking diagnostics, architecture tradeoffs, and edge cases.",
        analogy: "Like a telecommunications engineer diagnosing fiber line packet loss, senior software engineers understand what happens to packets beneath the web application layer."
      },
      level2: {
        technicalExplanation: "Review each deep-dive question below. These represent actual technical interview scenarios from top tech companies."
      },
      level3: {
        interviewQA: [
          {
            q: "Why does DNS default to UDP Port 53, and when does it fall back to TCP?",
            shortA: "DNS uses UDP for fast single-packet resolution without handshake overhead. It falls back to TCP when response payloads exceed 512 bytes (or for zone transfers).",
            deepA: "A standard DNS query requires only one request packet and one response packet. Using UDP avoids the overhead of a 3-way handshake, saving roundtrip latency. However, historical UDP DNS messages have a 512-byte limit. If a DNS response exceeds 512 bytes (such as DNSSEC signatures, large TXT records, or AXFR zone transfers), the server sets the TC (Truncation) bit. The client then re-issues the query over TCP Port 53 to guarantee reliable delivery of the full payload."
          },
          {
            q: "What is Anycast Routing and why do CDNs and DNS providers rely on it?",
            shortA: "Anycast assigns the exact same IP address to multiple physical servers globally. BGP routes user requests to the nearest edge node.",
            deepA: "Under standard Unicast routing, an IP address maps to one physical server. With Anycast routing, multiple geographically distributed data centers advertise the exact same IP address (e.g., Cloudflare's 1.1.1.1 or Google's 8.8.8.8) using Border Gateway Protocol (BGP). Internet routers automatically forward packets along the topologically shortest BGP path to the nearest edge server, slashing latency and naturally dispersing DDoS attack traffic across hundreds of edge locations."
          },
          {
            q: "What is the TCP TIME_WAIT state and what is the risk of having too many sockets stuck in TIME_WAIT?",
            shortA: "TIME_WAIT lasts 2*MSL to ensure final ACKs arrive and old delayed packets die. Too many TIME_WAIT sockets cause ephemeral port exhaustion.",
            deepA: "When an active TCP close occurs, the socket remains in TIME_WAIT for 2*MSL (60-120s). This guarantees the remote server received the final ACK and prevents old packets from colliding with newly spawned connections on the same port. If a backend service issues thousands of outbound HTTP requests without connection pooling, the OS ephemeral port pool (1024-65535) becomes exhausted, causing subsequent connections to fail with 'Address already in use'."
          },
          {
            q: "How does a Reverse Proxy differ from a dedicated Load Balancer?",
            shortA: "A load balancer focuses on distributing traffic across servers. A reverse proxy is a broader gateway that also performs SSL termination, caching, rate limiting, and compression.",
            deepA: "A dedicated Load Balancer (like AWS NLB) focuses strictly on routing traffic efficiently across backend worker pools at Layer 4 (TCP) or Layer 7 (HTTP). A Reverse Proxy (like Nginx) acts as a front-facing server gateway: in addition to load balancing, it handles SSL/TLS termination, static asset caching, request path rewriting, compression (Gzip/Brotli), and rate limiting."
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
        technicalExplanation: `### Master Networks Revision Cheat Sheet:

- **OSI 7 Layers:** Physical (Bits) $\\rightarrow$ Data Link (Frames/MAC) $\\rightarrow$ Network (Packets/IP) $\\rightarrow$ Transport (Segments/TCP-UDP) $\\rightarrow$ Session $\\rightarrow$ Presentation (TLS/JSON) $\\rightarrow$ Application (HTTP).
- **TCP vs. UDP:**
  - **TCP:** Connection-oriented, Guaranteed delivery, In-order byte stream, 3-Way Handshake (\`SYN\` $\\rightarrow$ \`SYN-ACK\` $\\rightarrow$ \`ACK\`), Flow & Congestion Control.
  - **UDP:** Connectionless, Best-effort, Unordered, Extremely fast, 8-byte fixed header.
- **HTTP Evolution:**
  - **HTTP/1.1:** Text-based, persistent connections (\`Keep-Alive\`), application-level Head-of-Line blocking.
  - **HTTP/2:** Binary framing, multiplexed streams over 1 TCP connection, HPACK compression.
  - **HTTP/3:** QUIC over UDP, eliminates TCP transport-level Head-of-Line blocking, 0-RTT resumption.
- **Idempotency Rules:**
  - **Safe Methods:** \`GET\`, \`HEAD\`, \`OPTIONS\` (Zero side-effects).
  - **Idempotent Methods:** \`GET\`, \`PUT\`, \`DELETE\` (Multiple identical calls leave server in the exact same state).
  - **Non-Idempotent:** \`POST\` (Creates new resources; repeated calls create duplicate rows).
- **Status Codes:**
  - \`201\` Created vs. \`204\` No Content (Success with empty body).
  - \`301\` Permanent Redirect vs. \`302\` Temporary Redirect.
  - \`401\` Unauthorized (Unauthenticated) vs. \`403\` Forbidden (Authenticated, but permission denied).
  - \`502\` Bad Gateway (Backend crashed/unresponsive) vs. \`504\` Gateway Timeout (Backend took too long).
- **CORS:** Browser-enforced security boundary based on the Same-Origin Policy. Resolved by the backend supplying \`Access-Control-Allow-Origin\` headers; non-simple requests trigger an \`OPTIONS\` preflight.
- **Cookie Flags:**
  - \`HttpOnly\`: Blocks JavaScript access (protects session tokens against XSS).
  - \`Secure\`: Transmitted only over HTTPS.
  - \`SameSite=Lax/Strict\`: Prevents Cross-Site Request Forgery (CSRF).
- **Real-Time Protocols:**
  - **SSE:** Unidirectional Server $\\rightarrow$ Client stream over HTTP (ideal for AI token streaming and live financial tickers).
  - **WebSockets:** Full-duplex bidirectional stream over a persistent TCP connection (ideal for chat apps and multiplayer gaming).`
      },
      level3: {
        interviewQA: []
      }
    }
  ],
  "flashcards": [
    {
      "term": "TCP 3-Way Handshake",
      "category": "Transport Layer",
      "question": "What are the three packets exchanged to establish a TCP connection?",
      "answer": "1. SYN (Client synchronizes initial sequence number). 2. SYN-ACK (Server acknowledges client and sends its own sequence number). 3. ACK (Client acknowledges server sequence number).",
      "tip": "SYN -> SYN-ACK -> ACK."
    },
    {
      "term": "TIME_WAIT State",
      "category": "TCP Internals",
      "question": "Why does the closing TCP endpoint enter TIME_WAIT for 2*MSL?",
      "answer": "To ensure the final ACK arrives reliably (retransmitting if lost) and to prevent old delayed packets from colliding with a new connection reusing the same 4-tuple socket.",
      "tip": "2*MSL prevents ghost packets & port collisions."
    },
    {
      "term": "HTTP Idempotency",
      "category": "Web Protocols",
      "question": "Which HTTP methods are idempotent, and why does it matter?",
      "answer": "GET, PUT, DELETE, HEAD, and OPTIONS are idempotent. Executing them multiple times has the exact same server side-effect as executing them once. POST and PATCH are non-idempotent.",
      "tip": "PUT/DELETE = Idempotent; POST = Non-idempotent."
    },
    {
      "term": "CORS Preflight (OPTIONS)",
      "category": "Browser Security",
      "question": "When does a browser send an HTTP OPTIONS Preflight request?",
      "answer": "Before cross-origin requests that use non-simple HTTP methods (PUT, DELETE, PATCH) or custom headers (like Authorization, Content-Type: application/json) to check if the server permits them.",
      "tip": "OPTIONS checks cross-origin permissions first."
    }
  ]
};
