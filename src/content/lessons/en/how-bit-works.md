# How Does a Bit Work?

You've already heard the word "bit". You know it's a zero or a one. But let's go deeper — **how does this actually work physically?**

Because a bit isn't just a concept from a textbook. It's something very real. Something that physically exists in the silicon inside your computer right at this exact second, turning on and off billions of times per second.

---PAGE---

## The Smallest Switch in the World

Imagine a light switch in your room. It has two positions: **ON** or **OFF**.

Now imagine shrinking that switch down to a size of **5 nanometers** — it is about 10,000 times thinner than a human hair. That is a **transistor**. And your computer has billions of them.

Each transistor is a microscopic electrical gate:
- When current flows through it → it means **1**
- When current is blocked → it means **0**

That's it. No magic. Every YouTube video, every mouse movement, every AI response — it all boils down to billions of these switches changing states at an unimaginable pace.

---PAGE---

## From One Bit to the Real World

One bit on its own is incredibly boring. It can only mean 0 or 1. Yes or no. True or false.

But what happens when you start **grouping bits together**? The magic of exponential growth kicks in:

| Number of Bits | Possible Combinations | What it can represent? |
|----------------|-----------------------|------------------------|
| 1 bit          | 2                     | On/Off, Yes/No |
| 2 bits         | 4                     | 00, 01, 10, 11 (e.g., 4 compass directions) |
| 8 bits (1 byte)| 256                   | A single keyboard character (e.g., 'A') |
| 16 bits        | 65,536                | An animation frame, old audio format |
| 32 bits        | 4,294,967,296         | Most precise calculations, colors in games |
| 64 bits        | 18 quintillion        | Modern CPU standard |

With every bit you add, you double the amount of information. This is why computers became so powerful so fast.

---PAGE---

## How Your CPU Swallows Bits

A processor doesn't look at bits one by one — it would die of boredom. It swallows them in massive chunks called **Words**.

A modern 64-bit processor reads **64 bits at once** — meaning it checks the state of 64 microscopic switches in the exact same fraction of a second.

How often does it do this? If your CPU runs at 5 GHz, it means its "heart" beats **5 billion times per second**.
In just one second, a CPU core makes around **320 billion decisions**. And remember, your computer today probably has 8 to 16 of these cores working simultaneously.

---PAGE---

## Colliding with the Wall of Physics

Now for something that will fry your brain: inside the processor, electrical signals travel at about **2/3 the speed of light**. At 5 GHz, a signal has so little time to travel (between one clock tick and the next) that it can only cover a maximum of a **few centimeters**.

This is why processors MUST be small. If a processor were the size of a table, the computer wouldn't work at today's speeds — the information simply wouldn't arrive from one end to the other in time! The speed of light is literally a speed limit for our technology.

And what happens when we shrink transistors down to 2-3 nanometers (the width of a dozen atoms)? We hit quantum mechanics. Electrons start teleporting through closed switches (known as quantum tunneling). We are literally fighting the physical boundaries of the universe.

---PAGE---

> [!KEY] Absolutely everything a computer does — from rendering lighting in a game to running a calculator — is just operations on billions of transistors switching between 0 and 1. There is no separate chip that "understands video" and one that "understands text". It's all just different interpretations of the same bits.

---PAGE---

## Food for Thought

If a transistor can only be ON or OFF... how does a computer manage to create a smooth sound wave? How does artificial intelligence "weigh" parameters using fractions like 0.7342 when it only has zeros and ones to work with?

The answer is: **clever encoding**. By combining thousands of bits and adding a little math, we can trick reality and use "digital blocks" to perfectly simulate the smooth, analog world.

Next stop: discover how cleverly arranging these switches next to each other creates **Logic Gates** — the foundation that turns a computer from a mere electricity storage unit into a machine that actually *thinks*.