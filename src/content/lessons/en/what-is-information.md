# What is Information?

Before we dive into processors, artificial intelligence, or cryptography — we need to answer one fundamental question that connects **absolutely everything** in the digital world[cite: 2].

## What even IS information?

Imagine you're standing in a completely dark room. Someone flips a light switch. The light is either **on** or **off**. That's it. Two states. Two possibilities[cite: 2].

That single "on or off" — is a **bit**[cite: 2]. The smallest possible piece of information in the universe[cite: 2].

But think about it from another angle. Before someone flipped that switch, you didn't know if it would be bright or dark. Your uncertainty was exactly 50/50. When the light came on, that uncertainty vanished.

Information is nothing more than the **reduction of uncertainty**. When you learn something you didn't know before, you receive information. In the computer world, we measure this amount of removed uncertainty in bits.

*Right now, as you read this sentence, your screen is displaying millions of these tiny on/off signals. Every pixel, every letter, every color — all of it boils down to an astronomical number of bits being processed incredibly fast.*[cite: 2]

---PAGE---

## Everything is just numbers

Here's something that might slightly shatter your worldview: inside a computer, there is no such thing as an "audio file" or an "image file". The computer is blind and deaf. It only understands one thing: **numbers**.

- **A photo?** Millions of tiny squares (pixels). Each pixel is actually just 3 numbers — how much red, green, and blue color it contains. Values range from 0 to 255.
- **A song?** Your computer measures the air pressure (sound wave) 44,100 times every single second, and records each measurement as a number[cite: 2]. When playing music, it simply spits those numbers back to the speaker.
- **This text?** Every letter is a predetermined number. A = 65. B = 66. Space = 32[cite: 2].
- **A video game?** Your position on the map (X, Y, Z), your health points, and even the wind direction are just numbers updated 60 times a second[cite: 2].

There is no magic. There is no special "video material" inside the machine. At the very bottom of it all, these billions of numbers are built exclusively from bits — zeros and ones[cite: 2].

---PAGE---

## Why zeros and ones?

Many people think that zeros and ones are some brilliant, pure mathematical system invented just to make things "digital". The truth is much more brutal. We use them because of physics and omnipresent noise.

A transistor — the microscopic switch inside your processor — has two states: **current flows** or **current doesn't flow**. On or off. 1 or 0[cite: 2].

Imagine we want to build a computer that distinguishes 10 different values instead of two. We would have to use 10 different voltage levels (e.g., 1 Volt is a one, 2 Volts is a two... 9 Volts is a nine).

Sounds simple, but in the real world, cables heat up, other electromagnetic devices operate nearby, and power supplies sometimes deliver slightly higher voltage. If a cable reads 2.2 Volts instead of 2.0... the computer doesn't know if it's a "two" that got noisy, or a "three" that lacked power. The system crashes.

But if we only have "CURRENT IS FLOWING" and "NO CURRENT"? That's incredibly easy to check. Even if the signal is noisy, the computer immediately knows what it's dealing with. It was physical reliability that dictated the use of ones and zeros.

---PAGE---

## Context gives meaning

A single zero or one means nothing. How does the computer know that a series of 8 bits (e.g., 01000001) means the letter "A", and not a dark red pixel or an instruction for the speaker?

The answer is **context**.

If you open a text file, the processor knows: "Ah, I'm loading the Notepad application, so all the bits I receive now should be treated as letters of the alphabet".
If you open that exact same 01000001 in Photoshop, the program will say: "This is a graphics software, so I will treat these bits as information about a shade of red".

Programs and file extensions give bits their meaning. On their own, bits are just blind electrical impulses.

---PAGE---

## Try it yourself!

Here's a real binary counter. Click the bits to flip them between 0 and 1, and watch how the decimal number changes[cite: 2]:

<!-- INTERACTIVE: binary-counter -->

Notice something? With just **8 bits** (one byte), you can represent any number from 0 to 255. That's enough to encode every letter of the alphabet, every basic color value, every simple instruction[cite: 2].

With 32 bits, you can count to over **4 billion**. With 64 bits, that number is over 18 quintillion. This is exactly how computers build infinity out of two states.

---PAGE---

> [!KEY] Everything you see on your screen — text, photos, videos, games — is an enormous amount of zeros and ones that your computer reads INCREDIBLY fast. That's all information is: organized and interpreted bits[cite: 2].

---PAGE---

## From here, everything branches out

Now that you understand what information is, you can go in **any direction**[cite: 2]:

- **🧠 Hardware** — How does a computer physically process these bits? What are logic gates? How do you make a calculator out of electricity?
- **💻 Programming** — How do we tell the computer what to do with these numbers?
- **🌐 Internet** — How can billions of bits travel around the globe in a fraction of a second through fiber optics at the bottom of the ocean?
- **🤖 AI** — How can a machine "learn" to distinguish the bits making up a photo of a dog from a photo of a cat?
- **🔐 Cryptography** — How do we use math to loop and scramble bits so that no one else can read them?

**Pick a branch that excites you. There's no "right order" — only YOUR curiosity.**[cite: 2]