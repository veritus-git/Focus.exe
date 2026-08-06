# Logic Gates

You already understand that a computer is simply billions of tiny switches (transistors) that can be either on (1) or off (0).

But wait... how do you take the simple fact of electricity flowing or not flowing, and turn it into **mathematical addition**? Or image recognition by AI?

The secret isn't in the switches themselves. The secret is in **how we connect them together**.

---PAGE---

## Imagine Hydraulics

Instead of electricity, imagine for a moment thick pipes with flowing water and mechanical valves.

Imagine you install two valves on a single pipe, **one right after the other**. 
Water will flow out the end of the pipe ONLY if you open valve A **AND** open valve B. If you open just one — the water stops at the second valve.

Now let's do something different: let's run two pipes **in parallel** and join them at the end.
Now the water will flow out the end if you open valve A **OR** valve B (or both).

Congratulations, you've just invented **Logic Gates**. They are circuits that take input signals and, based on their arrangement, make a physical "decision" on the output.

---PAGE---

## The Big Three of Logic

Everything, absolutely every process in your smartphone or PC, relies on hundreds of millions of combinations of just three basic "gates" (circuits made of transistors):

1. **AND Gate:**
   Lets current through (1) ONLY if all its inputs are 1.
   *Real-life application:* Launching a nuclear missile. General A (key 1) **AND** General B (key 2) must turn their keys simultaneously. Otherwise, the rocket doesn't launch (0).

2. **OR Gate:**
   Lets current through (1) if AT LEAST one input is 1.
   *Real-life application:* A car's interior dome light. It turns on when you open the left door **OR** the right door.

3. **NOT Gate:**
   The rebel. It simply inverts the signal. If you feed it a 1, it spits out a 0. If you feed it a 0, it spits out a 1.
   *Real-life application:* The twilight sensor on street lamps. When the sun is shining (1), the street is NOT lit (0). When there is no sun (0), the lamp lights up (1).

---PAGE---

## Try it yourself!

Click the inputs of these gates and watch how the current (or lack thereof) flows to the very end of the circuit. See how the output behaves.

<!-- INTERACTIVE: logic-gates-simulator -->

See? A single gate on its own is pretty trivial. But what happens if we take the current coming out of an AND gate, feed it directly into an OR gate, and then invert it at the end with a NOT gate? 

Suddenly, out of dumb electricity, we create a circuit that can check a complex condition, for example: *"Allow cash withdrawal from the ATM, IF (Pin_Correct AND Card_Valid) AND NOT (Empty_Bank_Account)"*. 

All of this happens purely physically!

---PAGE---

## The LEGO Bricks of the Digital Universe

This is where true engineering genius begins. 
If you connect an AND gate and slap a NOT gate at the end of it, you get what's called a **NAND (Not-AND)** gate.

Why is this so crucial in human history? Because engineers discovered that by using **ONLY millions of identical NAND gates**, you can build any other gate, and consequently — every single component of a computer. Memory, calculators, processors.

The Apollo Guidance Computer (AGC) that took humanity to the Moon was built almost entirely out of thousands of identical NOR gates (which act similarly to NAND). There were no "specialized graphics processors" there — just masterfully woven webs consisting of "ORs" and "NOTs".

---PAGE---

> [!KEY] Logic gates are the physical bridge that connects mindless electricity with mathematics and human logic. They allow us to "teach" a piece of silicon to make decisions based on strict rules.

---PAGE---

## Food for Thought

We have circuits that can make logical decisions (AND, OR, NOT). But how do we force electricity to actually **add numbers together**?

Imagine that by using a few logic gates (mainly XOR and AND gates), you can build a circuit called a *Half-Adder*. You throw two currents representing digits into it (like 1 and 1), the current flows through the maze of gates, and magically, the number 2 (binary 10) pops out the other side. 

It is millions of these *Half-Adders* connected together that form the ALU in your processor — the Arithmetic Logic Unit. Math inside a computer is really just water (electricity) finding its way through a very, very clever hydraulic maze.