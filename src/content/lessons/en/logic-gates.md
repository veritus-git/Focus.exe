# Logic Gates: How Silicon Learns to Think

You already know that a computer is essentially a gigantic farm of switches. You know that transistors turn on and off billions of times a second, representing zeros and ones.

But the mere fact that "electricity is flowing somewhere" does not create a calculator. Electricity by itself doesn't know what "two plus two" means. It doesn't know what a cat in a photo looks like. Current simply flows from point A to point B.

So how do we force the blind forces of physics to solve mathematical problems? The secret does not lie in the switches themselves. The secret is in **how we connect them together**.

---PAGE---

## Imagine Hydraulics

Instead of invisible electricity, imagine for a moment thick pipes with flowing water, and standard mechanical valves (which represent our transistors).

Imagine you install two valves on a single, straight pipe — **one right after the other**.
In order for water to flow out the very end of the pipe, you must open valve A **AND** open valve B. If you open only one of them, the water will stop halfway.

Now let's do something different: let's run two pipes **in parallel**, install one valve on each, and finally join them into one common output pipe.
In this case, water will flow out the end if you open valve A **OR** valve B. You only need to open any one of them for the water to reach its destination.

Congratulations. Using pipes and water, you have just invented **Logic Gates**. They are specific arrangements of switches that, based on the signals entering them, make a physical "decision" about what comes out the other end.

---PAGE---

## The Big Three of Logic

Everything, absolutely every process in your smartphone or PC, relies on hundreds of millions of combinations of just three basic "gates" made of silicon. We record their behavior in what we call Truth Tables.

**1. AND Gate**
It lets current pass (1) ONLY if all its inputs are 1.
*Real-life application:* Launching a nuclear missile. General A (Key 1) AND General B (Key 2) must turn their keys simultaneously. If only one turns the key (1 and 0), the rocket will not launch (Result: 0).

| Input A | Input B | Result (Output) |
|---------|---------|-----------------|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**2. OR Gate**
It lets current pass (1) if AT LEAST one input is 1.
*Real-life application:* A car's interior dome light. The bulb on the ceiling lights up when you open the left door OR the right door. A single signal is enough.

| Input A | Input B | Result (Output) |
|---------|---------|-----------------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

**3. NOT Gate**
Known as an inverter. It is the rebel that only has one input. It always flips the signal to its opposite.
*Real-life application:* The twilight sensor on street lamps. When the sun is shining (1), the street is NOT lit (0). When there is no sun (0), the lamp lights up (1).

---PAGE---

## The Magic Brick: XOR Gate

Having AND, OR, and NOT, we can arrange them into more complex webs. From their combination emerges a gate that is absolutely crucial for the operation of the entire computer world. It is called **eXclusive OR (XOR)**.

It operates on an "either-or, but never both" rule. A signal will only flow out of it if its inputs are DIFFERENT.

| Input A | Input B | Result (Output) |
|---------|---------|-----------------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

Why does 1 and 1 give 0 here? Think of the light switches in a two-story staircase. One is downstairs, the other is upstairs, and they control the same light bulb. If both switches are down (0 and 0), the light is off. If you click one up (1 and 0), it turns on. But if someone upstairs also clicks their switch up (1 and 1), the light turns off again. That is a physical XOR gate inside your house.

Why is the XOR gate the Holy Grail of computers? You will see in a moment.

---PAGE---

## Try it yourself!

Before we move on to math, see for yourself how current flows through these circuits. Click the inputs of the gates and watch how the logic circuit decides the final result.

<!-- INTERACTIVE: logic-gates-simulator -->

See? A single gate is quite trivial. But what happens if we take the current coming out of an AND gate, feed it directly into an OR gate's input, and finally invert it through a NOT gate?
Suddenly, from "dumb" current we create a physical circuit that can check a complex real-life condition, e.g.: *"Allow cash withdrawal, IF (PIN is correct AND Card is valid) AND NOT (Insufficient funds)"*.

Notice: there is no "code" here in a programming sense. This all happens purely in hardware!

---PAGE---

## The Adder: The Moment Current Becomes Math

We understand logic, but computers have to calculate numbers. How do we force a blind electrical circuit to add 1 + 1 so that it spits out the result 2?

We must connect our magical **XOR** gate with an **AND** gate. Such a circuit is called a Half-Adder.

Let's feed this circuit two currents representing the bits 1 and 1.
Look at the XOR table above. What does XOR do when it gets two ones? They collide with each other and the result is 0. We have the first digit of the result.
But wait, in math 1 + 1 is 2! Where did that value go?
In handwritten math, when we run out of room, we carry a one to the next column. This is where the AND gate steps in. It is connected right next to it, using the same initial currents. The AND gate sees two ones and says: "Okay, both inputs are 1, so I will output a 1 as a CARRY signal".

The circuit combines the result from the XOR gate (0) and the result from the AND gate (1). We read them from left to right and what do we get? The binary number **10**.
And "10" in the binary system is simply the digit two!

Congratulations. Using two connected gates, current entered the circuit and, completely unconsciously, performed the physical equation 1 + 1 = 2.

---PAGE---

> [!KEY] Logic gates are the physical bridge connecting mindless electricity with human mathematics. A computer does not "think". It simply passes current through brilliantly designed mazes (Adders) from which water always flows out on the correct side, giving us the final result of calculations.

---PAGE---

## Food for Thought

Millions of connected Adders create what is known as the ALU (Arithmetic Logic Unit) inside your processor — the heart performing all calculations in the universe of games, software, and AI.

But a calculator isn't everything. Once a computer calculates something, it must be able to save that result for later. Logic gates can let current through, but how do we make them trap the current inside and "remember" it?
How do we use gates to create a circuit that remembers information, even when we stop providing it with a new signal?

The answer to this are circuits called "Flip-Flops". We are entering the fascinating world of RAM memory and how we physically "write" data onto silicon.