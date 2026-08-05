# What Happens After Typing a URL?

## Before we start — why is this fascinating?

You type `youtube.com`, press Enter, and within a fraction of a second you see the page. Simple? On the surface — yes. Under the hood? It's **one of the most complex operations** modern technology performs daily. In that fraction of a second, your computer contacts dozens of servers across different continents, encrypts data, builds a secure tunnel, downloads thousands of files, and renders them into a pixel image on your screen.

It's like ordering a pizza, except the courier first has to find the restaurant's address in a phone book (DNS), then build a sealed, armored pipe between you and the restaurant (TLS), then send you the pizza piece by piece (HTTP), and you assemble it yourself (rendering).

---

## Step 1 — DNS: "How do I get there?"

Your computer has no idea what `youtube.com` is. It only understands **IP addresses** — strings of numbers like `142.250.185.206`. So it needs to convert the name to an address. That's what **DNS** (Domain Name System) does.

### How it works step by step:

1. **Browser cache** — Maybe Chrome already knows this address? If you visited YouTube in the last few minutes, the address is in the cache. Done.

2. **OS cache** — If not, it asks the operating system. Windows/Linux also maintains a DNS cache.

3. **Router** — If the OS doesn't know, it asks your home router.

4. **ISP Resolver** — The router asks your internet provider's DNS server.

5. **Root servers** — If the ISP doesn't know, it asks one of the **13 root DNS servers** (labeled A through M), which direct it further.

6. **TLD server** — The root server says: "`.com`? Ask the TLD server responsible for the `.com` domain."

7. **Authoritative server** — The TLD server says: "`youtube.com`? Ask Google's authoritative server." That one finally responds: **"142.250.185.206"**.

This entire process takes **20-100 milliseconds**. Every time you type an address, your query potentially circles half the globe.

> **Fun fact:** Those 13 root servers are actually hundreds of physical machines scattered around the world, operating under one IP address thanks to **Anycast** technology. Your query reaches whichever one is closest to you.

---

## Step 2 — TCP: "Let's build a connection"

You have the IP address. Now you need to **start a conversation** with YouTube's server. The internet isn't like radio — you don't shout into the void. You use **TCP** (Transmission Control Protocol), which guarantees that data arrives complete and in the right order.

TCP establishes a connection through a ritual called the **Three-Way Handshake**:

1. **SYN** — Your computer sends: "Hey, I want to talk!" (synchronize)
2. **SYN-ACK** — The server responds: "OK, I hear you, I want to talk too!" (acknowledge + synchronize)
3. **ACK** — Your computer: "Great, let's go!" (acknowledge)

Only now can you exchange data. This handshake takes **one RTT** (Round Trip Time) — the time for a packet to travel there and back. To a European server it's ~20ms. To the US? ~100ms. To Australia? ~300ms.

> **Analogy:** TCP is like a phone call — you first connect, both parties know the other is listening, and if something doesn't come through (static on the line), it gets repeated. The alternative — **UDP** — is like tossing letters out the window. Faster, but you don't know if they arrived.

---

## Step 3 — TLS: "Let's encrypt everything"

You have a TCP connection, but it's **unencrypted**. Anyone along the way (your ISP, the government, a hacker on the café WiFi) could read your data. That's why the **TLS Handshake** happens — building an encrypted tunnel.

1. **Client Hello** — Your browser says: "I know these ciphers: AES-256, ChaCha20... Pick one."
2. **Server Hello** — The server picks a cipher and sends its **certificate** (a digitally signed proof of identity).
3. **Verification** — The browser checks if the certificate is real (signed by a trusted certificate authority).
4. **Key exchange** — Both sides generate a shared **session key** using clever math (e.g., the Diffie-Hellman algorithm), **without ever transmitting it in plain text!**
5. **Encrypted communication** — From now on, everything travels through an armored tunnel.

> **Why this is genius:** Thanks to Diffie-Hellman, two parties can agree on a secret key while talking in front of everyone, and no eavesdropper can figure it out. It's one of the most elegant inventions in cryptography.

---

## Step 4 — HTTP: "Give me that page"

The tunnel is ready. The browser sends an **HTTP Request**:

```
GET / HTTP/2
Host: youtube.com
Accept: text/html
```

Translation: "Give me the main YouTube page, in HTML format."

The server responds with an **HTTP Response**:

```
HTTP/2 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 512847

<!DOCTYPE html>
<html>...
```

Status `200` means "all good." Other codes you probably know:
- **301** — Page moved to a different address
- **404** — Not found (the famous one)
- **500** — Server crashed

But that's just the beginning. The HTML itself is a skeleton — the browser sees references to **hundreds of additional files**: CSS (styling), JavaScript (logic), images, fonts, videos.

Each one requires a **separate HTTP request**. That's why modern browsers use **HTTP/2**, which can download multiple files simultaneously over a single TCP connection (called **multiplexing**).

---

## Step 5 — Rendering: "Show me this on screen"

The browser has HTML, CSS, and JS. Now it needs to turn them into pixels.

1. **HTML Parsing** — Builds the **DOM** (Document Object Model) — a tree structure of page elements.
2. **CSS Parsing** — Builds the **CSSOM** — a style tree.
3. **Render Tree** — Combines DOM and CSSOM into one tree, removing invisible elements.
4. **Layout** — Calculates the position and size of every element on screen.
5. **Paint** — Draws pixels — colors, text, shadows, gradients.
6. **Composite** — Combines layers (e.g., animated elements on separate GPU layers).

The entire process from pressing Enter to seeing the page is called **Time to First Paint** and on well-optimized sites takes **under 500 milliseconds**.

---

## 🧠 Food for thought...

- In the fraction of a second between pressing Enter and seeing the page, your data travels **thousands of kilometers**, passes through **dozens of routers**, is **encrypted and decrypted**, and your browser performs **millions of operations** on the received code. And you just see a nice page. All this complexity is intentionally **invisible**.

- DNS is one of the oldest and most critical internet systems — and simultaneously one of the most vulnerable to attack. **DNS Spoofing** can replace an IP address, redirecting you to a fake site. That's why **DNSSEC** was created — a digital signature system for DNS.

- HTTP/3 (the latest version) **no longer uses TCP**. It switched to **QUIC** — a protocol based on UDP with built-in encryption. The reason? TCP's Three-Way Handshake + TLS Handshake is too much latency. QUIC combines both into one.
