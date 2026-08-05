# How Does a CPU Work From the Inside?

## Before we start — why does a CPU even exist?

Imagine a restaurant. You have a kitchen, waiters, and tables with orders piling up. But there's one person who *really* decides everything — the **head chef**. He reads the order, decides what to prepare first, coordinates the entire kitchen, and makes sure everything comes out on time.

**The CPU is the head chef of your computer.**

Every mouse click, every animation frame, every spell-check — these are all "orders" that land on his table. And he has to handle them. Billions of such orders. **Every single second.**

> [!KEY] The CPU is the only component in your computer that actually "does things." Everything else (RAM, SSD, GPU) are just its tools and assistants.

---PAGE---

## The Transistor — the tiniest worker

Everything starts from something absurdly simple: **a switch**. The same kind you use to turn on the lights. It's either on (1) or off (0).

Except the transistors in your CPU aren't big switches on a wall. They're **smaller than a virus**. The processor in your laptop literally has **tens of billions** of them. Apple M2 has 20 billion. On a chip the size of your thumbnail.

> **A fact worth absorbing:** If you could enlarge a single transistor to the size of an ant, the entire CPU would be the size of a mid-sized city.

These transistors don't think. They don't know what they're doing. All they can do is: **be on or off**. But when you wire them together in specific patterns — so-called **logic gates** — suddenly they can add, compare, shift data around, and eventually... run Minecraft.

> [!KEY] All of computing power comes from one simple thing: billions of tiny switches that can be either 0 or 1. Nothing more.

---PAGE---

## Logic Gates — math from nothing

From these simple switches you build fundamental "bricks":

- **AND** — output is 1 only when *both* inputs are 1. Like a door that only opens when you have *both* a key *and* a keycard.
- **OR** — output is 1 when *any* input is 1. Like an alarm that triggers from movement *or* sound.
- **NOT** — flips the value: 1 becomes 0 and vice versa. Like a light switch.

From these three bricks you build **everything**. Literally. Adders (addition), comparators (comparison), multiplexers (selection)... and from those you build the entire processor.

> [!KEY] From just three types of gates (AND, OR, NOT) you can build EVERY operation a computer will ever perform.

**Try it yourself — click the inputs below and see how logic gates work:**

<!-- INTERACTIVE: logic-gates -->

---PAGE---

## The Fetch-Decode-Execute Cycle — the heartbeat

The CPU does the same thing over and over. Billions of times per second. It's called the **Fetch-Decode-Execute Cycle**:

### 1. Fetch
The CPU reaches into RAM and grabs the next instruction. Each instruction is just a string of zeros and ones — for example `ADD R1, R2` (add the contents of register 1 to register 2).

### 2. Decode
The CPU "reads" this instruction and figures out what to do. Like a waiter who looks at the ticket and understands: "ah, table 4 wants a margherita pizza."

### 3. Execute
The CPU actually performs the operation — adds two numbers, compares values, moves data. The result goes into one of the **registers** (fast, tiny memory cells inside the CPU itself).

And then? **Back to the top.** Fetch. Decode. Execute. On a 5 GHz processor, this cycle repeats **5 billion times per second**.

> [!KEY] A CPU doesn't "think." It just keeps fetching an instruction, decoding it, and executing it. Billions of times per second. That's ALL it does.

---PAGE---

## Registers — the chef's pockets

The CPU doesn't run to RAM for data every single time — that would be like the head chef sprinting to the warehouse for every pinch of salt. Instead, it has **registers** — a few dozen tiny "pockets" directly inside itself, accessible **instantly**.

Registers are the fastest memory in your entire computer. Reading a register takes literally **one clock cycle** — less than a nanosecond. For comparison:

| Memory | Access time | Analogy |
|--------|------------|---------|
| Register | ~0.3 ns | Chef's pocket |
| Cache L1 | ~1 ns | Prep counter |
| Cache L3 | ~10 ns | Kitchen cabinet |
| RAM | ~100 ns | Fridge |
| SSD | ~100,000 ns | Basement storage |

> [!KEY] The closer memory is to the CPU, the faster it works — but the less of it there is. Registers are nanoseconds, SSD is milliseconds. That's a million-fold difference.

---PAGE---

## The Pipeline — an assembly line inside your processor

Imagine a factory production line. Instead of one person assembling the entire product from A to Z, you have **workstations**: one person mounts the frame, the next inserts the screen, the next screws in the battery, the next packages it.

The CPU does the same thing with instructions. Instead of waiting for one instruction to go through the entire Fetch→Decode→Execute cycle, **each phase processes a different instruction simultaneously**:

```
Cycle 1:  [Fetch A]  [      ]  [        ]
Cycle 2:  [Fetch B]  [Dec A ]  [        ]
Cycle 3:  [Fetch C]  [Dec B ]  [Exec A  ]
Cycle 4:  [Fetch D]  [Dec C ]  [Exec B  ]
```

In cycle 3, the processor simultaneously fetches instruction C, decodes B, and executes A. **Three instructions at once, even though each individual one still takes 3 cycles.**

Modern processors (e.g., Intel 14th gen) have pipelines with **20+ stages**. Like a factory with twenty workstations — the throughput is astronomical.

> [!KEY] Pipelining is WHY processors are so fast — not because one instruction is fast, but because MANY instructions are processed simultaneously.

---PAGE---

## Multi-core — cloning the head chef

Back to the restaurant. You have one brilliant head chef, but orders are piling up. What do you do? **Hire a second head chef with their own workstation.**

That's exactly what a processor core is. An 8-core CPU is **eight independent units**, each with its own registers, its own pipeline, processing a separate stream of instructions. Together they can handle eight things simultaneously.

That's why games that can utilize multiple cores run dramatically better than those stuck on one.

---

## 🧠 Food for thought...

- Your CPU performs ~5 billion operations per second. But light only travels ~30 cm in that time. The electrical signal inside the CPU must cross distances on the order of millimeters in fractions of a nanosecond — we're at the physical limit of how fast information can travel. **What happens when we can't go faster?**

- Every program you launch — Spotify, Chrome, Discord — from the CPU's perspective is just an endless stream of instructions like "add," "compare," "copy." There's no magic. No "understanding." Just billions of simple operations that together create the illusion of intelligence.

- Modern CPUs can predict which branch of an `if/else` your program will take, **before the program does it**. This is called **Branch Prediction** and it's accurate ~95% of the time. Processors literally *guess the future*.
