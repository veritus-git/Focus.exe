# How Does a Transformer Work — the Brain Behind ChatGPT?

## Before we start — why does this even exist?

In 2017, a team of researchers at Google published a paper titled **"Attention Is All You Need."** Eight pages that changed the world. That's not an exaggeration — this paper is the reason ChatGPT, Gemini, Claude, Copilot, image generators, and basically the entire AI revolution you see around you today exists.

But what's it actually about?

Previously, computers "read" text word by word, like a student slowly tracing their finger along a sentence. The problem? By the time they reached the end, **they'd forgotten the beginning**. The longer the text, the worse it got.

The Transformer is an architecture that lets a model **look at the entire text at once** and independently decide which words are important for which. It's as if instead of reading a book page by page, you could see an entire chapter simultaneously and instantly spot which parts refer to each other.

---

## Tokens — the atoms of language

Before a Transformer does anything, it must convert text into something a computer understands — numbers. This process is called **tokenization**.

The word "transformer" isn't one token. The tokenizer (e.g., BPE — Byte Pair Encoding) breaks it into pieces:
- `"trans"` → token 1234
- `"former"` → token 5678

Each token is an index in a massive dictionary (e.g., GPT-4 has ~100,000 tokens). A sentence becomes a sequence of numbers.

But numbers alone aren't enough. The model needs to know what they *mean*...

---

## Embeddings — words become arrows in space

Each token is converted into a **vector** — a list of several hundred (e.g., 768 or 4,096) numbers. This vector is the token's "address" in an enormous, multi-dimensional space.

Why is this genius? Because **similar words have close vectors**:
- The vector for "king" is close to the vector for "queen"
- The vector for "dog" is close to "cat"
- And "dog" is far from "algebra"

What's more, vectors can capture **relationships**:
```
king - man + woman ≈ queen
```

It's not magic — it's geometry in a space with several thousand dimensions. The model literally *places* each word in a cosmos and learns where everything should sit.

---

## Self-Attention — "what should I pay attention to right now?"

This is the heart of the Transformer. The mechanism that makes the model truly "understand" context.

Take this sentence:

> *"The cat sat on the mat because **it** was tired."*

The word **"it"** — what does it refer to? The cat? The mat? You know intuitively. But how is a computer supposed to know?

**Self-Attention** lets each token "ask" every other token: **"Hey, how relevant are you to me?"** And based on that, build a *modified representation* of itself, enriched with context.

Technically, here's how it works:

1. Each token creates three vectors:
   - **Query (Q)** — "What am I looking for?"
   - **Key (K)** — "What do I offer?"
   - **Value (V)** — "What information do I carry?"

2. The Query of one token is multiplied by the Key of every other token. The result is a **score** — the higher it is, the more "relevant" that token is.

3. The scores pass through **softmax** (they become values between 0 and 1 that sum to 1 — a probability distribution).

4. The resulting weights multiply the Values — the model gets a "weighted mix" of information from all tokens.

> **Analogy:** Imagine a room full of people. Self-Attention is the moment you look around and decide who to listen to more carefully. When you're talking about football, you "listen" more to the person in a sports jersey than the one discussing the weather. The model does exactly the same — for every word, separately.

---

## Multi-Head Attention — looking at text from many angles

One "gaze" isn't enough. The model uses **multiple attention heads** (e.g., 12, 32, and in GPT-4 — 96!) running in parallel.

Each head specializes in something different:
- One catches **syntax** (subject-verb relationships)
- Another catches **semantic relationships** (synonyms)
- Yet another catches **long-range dependencies** (a reference to something 500 tokens ago)

Results from all heads are combined, giving the model a **multi-dimensional understanding** of the text.

---

## Feed-Forward Network — "thinking over" what it saw

After Attention, each token passes through a simple **neural network** (two linear layers with activation). This is the moment the model "processes" the information gathered from Attention and creates deeper abstractions.

If Attention is *gathering information*, Feed-Forward is *thinking about it*.

---

## Layers — depth of thought

This entire process (Self-Attention → Feed-Forward) is **one Transformer layer**. But models have dozens of them:

| Model | Number of layers |
|-------|-----------------|
| GPT-2 | 12 |
| GPT-3 | 96 |
| Llama 3 70B | 80 |

Each successive layer builds **increasingly abstract understanding**:
- Layer 1: recognizes basic patterns (word endings, punctuation)
- Layer 20: understands syntax and grammatical relationships
- Layer 60: grasps intentions, sarcasm, implications
- Layer 96: combines multi-level concepts into a coherent response

---

## Generating text — one token at a time

How does the model "write"? The same way T9 guessed the next word on old phones.

The model receives the text so far and computes a **probability distribution** over the entire vocabulary (~100,000 tokens). Then it picks the token with the highest probability (or samples from the top-k — that's where "temperature" in settings comes from).

```
Input: "The capital of Poland is"
Model computes: Warsaw=0.94, Krakow=0.03, Berlin=0.001...
Output: "Warsaw"
```

Then that token is **appended** to the input and the model processes the whole thing again:

```
Input: "The capital of Poland is Warsaw"
Model computes: .=0.65, ,=0.2, and=0.05...
Output: "."
```

And so on, token by token. **Every sentence you see from ChatGPT was generated one piece at a time.** The model doesn't "see" its response from above — it builds it on the fly, like a musician improvising a solo.

---

## 🧠 Food for thought...

- The Transformer doesn't "understand" text in the human sense. No neuron "knows" what love or gravity is. And yet the model can discuss them with surprising depth. **Does understanding require consciousness, or is a good enough pattern sufficient?**

- The original "Attention Is All You Need" paper was rejected from one of the scientific conferences before it changed the entire AI world. A reviewer wrote that "there's nothing new here." Sometimes revolutions don't look revolutionary at the start.

- GPT-4 processes millions of tokens daily. Each of those tokens passes through ~96 layers, each with 96 Attention heads. That's **billions of matrix operations per second**. All of it just to append one word to a sentence.
