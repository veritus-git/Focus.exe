---
description:  Ten dokument zawiera pełny kontekst projektu FocusOS. Przeznaczony jest dla agentów AI pracujących nad repozytorium, aby zapewnić spójność strukturalną, trzymanie się zasad gita i zrozumienie architektury systemu.
---

# FocusOS — Projekt i Architektura (Workflow)

> [!WARNING]
> **ZASADA NR 1 DLA KODERÓW AI:** Ten plik to tylko mapa. Przed wprowadzeniem jakichkolwiek zmian, ZAWSZE sprawdzaj aktualny stan plików w repozytorium przy użyciu swoich narzędzi (np. `view_file`, `grep_search`). Zawsze upewniaj się, jak dany kod wygląda *w tym momencie*, ponieważ dokumentacja opisowa z czasem się starzeje.

---

## 1. Workflow i Zarządzanie Wersjami (Git)

Projekt używa dwóch zdalnych repozytoriów (`github` i `gitea`). Zawsze upewnij się, że kod się buduje, zanim zrobisz commita.

**Zasady robienia commitów:**
1. Zawsze przed commitem uruchom build: `npm run build 2>&1`
2. Zawsze wypychaj na oba remote'y do gałęzi `main`.
3. Gotowy one-liner do użycia przy tool callu `run_command`:
   ```bash
   npm run build 2>&1 && git add . && git commit -m "Tytuł: Co zostało zrobione" && git push github main && git push gitea main
   ```

---

## 2. Architektura Systemu FocusOS

FocusOS to aplikacja udająca system operacyjny, stworzona by "zmuszać" (w trybie Kiosk) do nauki podstaw informatyki, programowania i matematyki.

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS, Zustand (state management), i18next (bilingual EN/PL), React Flow (drzewko umiejętności).

### Główne katalogi:
- `src/components/os/` — Elementy interfejsu systemu (Taskbar, Windows, PixelBot Mascot).
- `src/components/ui/` — Renderer Markdowna, komponenty stylizujące.
- `src/components/interactive/` — Interaktywne moduły zagnieżdżane w lekcjach (np. `BinaryCounter.tsx`, `LogicGates.tsx`).
- `src/features/` — Aplikacje działające w systemie (np. `skill-tree/`, `notes/`, `calculator/`).
- `src/store/` — Zastund stores (`useOSStore.ts` dla okien i trybu kiosk, `useSkillTreeStore.ts` dla postępów).
- `src/content/` — Zawartość merytoryczna (`courseIndex.ts` oraz pliki lekcji Markdown).
- `src/i18n/` — Słowniki wielojęzyczne `en.json` i `pl.json`.

---

## 3. Architektura Skill Tree

Drzewko Umiejętności to serce systemu. Zostało przebudowane z układu liniowego na złożoną, przypominającą mapę myśli strukturę opartą na 8 gałęziach.

### Zależności (Dependencies)
- **Level 0 (Korzeń):** `what-is-information` — od niego zaczyna się wszystko.
- **8 Gałęzi (Tracks):** Hardware, Programming, Internet, Math, AI, Cryptography, Audio, Engineering.
- Drzewko posiada system **Cross-Track Dependencies**. Przykładowo, "AI" wymaga zarówno podstaw programowania (z gałęzi Code) jak i wektorów (z gałęzi Math).
- Krawędzie (Edges) renderowane przez `React Flow` to gładkie krzywe Beziera (`default`).
- Persystencja: postęp gracza jest zapisywany w `localStorage` pod kluczem `focusos-skilltree-progress`. Istnieje wbudowana funkcja resetu (`resetProgress`).
- Odblokowywanie lekcji dzieje się automatycznie w `recalculateUnlocks`, kiedy WSZYSTKIE lekcje z tabeli `requires` są w stanie `completed`.

---

## 4.1 Dodawanie Nowych Lekcji (Procedura)

FocusOS w tej chwili ma 47 zdefiniowanych węzłów w `courseIndex.ts`, ale większość z nich to "Stuby" (zaślepki), widoczne jako "WKRÓTCE / COMING SOON".

Aby dodać fizyczną treść do stuba (lub dodać nową lekcję), postępuj zgodnie z tą procedurą:

1. **Stwórz pliki Markdown:**
   - Napisz treść w `src/content/lessons/en/nazwa-lekcji.md` (Angielski).
   - Napisz treść w `src/content/lessons/pl/nazwa-lekcji.md` (Polski).
2. **Zaimportuj je do `courseIndex.ts`:**
   ```typescript
   import mojaLekcjaEn from "./lessons/en/nazwa-lekcji.md?raw";
   import mojaLekcjaPl from "./lessons/pl/nazwa-lekcji.md?raw";
   ```
   *(Uwaga: musisz użyć suffiksu `?raw`, aby Vite załadował je jako czysty tekst).*
3. **Zastąp pusty string:**
   Znajdź dany obiekt w tablicy `TRACKS` i podmień `markdownPl: ""` na `markdownPl: mojaLekcjaPl` (to samo dla En). *Puste stringi oznaczają stuby — nie importuj nieistniejących plików, bo wywali to Vite Build.*
4. **Zaktualizuj i18n:**
   Zadbaj, by w `en.json` i `pl.json` istniały odpowiednie klucze dla `titleKey` i `descriptionKey`.

## 4.2 Dodawanie nowych lekcji (Treść)

WYTYCZNE DOTYCZĄCE TWORZENIA LEKCJI I KURSÓW:
Użytkownikiem aplikacji (i odbiorcą lekcji) jest uczeń w wieku 14-18-lat. Oczekuje on fascynującej, inżynieryjnej wiedzy, ale przekazanej w zupełnie inny sposób niż w szkole. Żadnych quizów a/b/c, żadnego "wkuwania" i żadnej suchej teorii.

Każda lekcja (plik Markdown) musi spełniać następujące zasady:

1. BUDOWANIE INTUICJI (Top-Down):
Zanim pokażesz jakikolwiek kod, definicję czy matematyczny wzór, musisz wytłumaczyć, PO CO to w ogóle istnieje. Użytkownik ma najpierw poczuć "Aha, o to w tym chodzi!", zanim zobaczy zawiłości techniczne. Zbuduj głęboką intuicję na dany temat.

2. HISTORIE I ANALOGIE:
Każdy temat to ma być swego rodzaju prezentacja. Używaj potężnych, zapadających w pamięć analogii i przykładów z realnego świata (np. jak dany koncept działa w grach wideo, jak używa tego SpaceX, jak to wygląda na przykładzie funkcjonowania restauracji). Lekcja ma być opowieścią.

3. ZROZUMIENIE PRZED MATEMATYKĄ:
Jeśli lekcja dotyczy trudnych zagadnień (np. algebra liniowa, równania różniczkowe, AI), użytkownik NIE BĘDZIE z tego liczył zadań na kartce. Ma być z tym tematem po prostu "familiar". Ma zrozumieć, co ten koncept fizycznie robi w przestrzeni i do czego się go aplikuje. Sama twarda teoria będzie dla niego później w szkole tylko "dociągnięciem", bo będzie już miał zbudowany fundament i zrozumienie problemu.

4. GŁĘBOKIE DETALE BEZ PRZEBODŹCOWANIA:
Nie ślizgaj się po powierzchni. Jeśli omawiasz temat (np. LLM, RAM), wejdź pod maskę i powiedz, co się tam fizycznie dzieje. Bądź szczegółowy, ale tłumacz to pasjonującym, przystępnym językiem. Oprzyj się na najnowszym researchu, nie zmyślaj faktów.

5. STRUKTURA I FORMATOWANIE:
- Używaj formatowania Markdown (nagłówki, pogrubienia kluczowych słów, bloki cytatów).
- Rozbijaj tekst na małe, łatwe do przyswojenia kawałki. 
- Nie używaj suchych bloków ciągłego tekstu.
- Zamiast chamskich quizów na koniec, dodawaj otwarte pytania typu "Food for thought" / "Pomyśl o tym...", które skłaniają do samodzielnego połączenia kropek.
- Możesz podejrzeć już istniejące lekcje, aby głebiej zrozumieć styl, formatowanie czy język używany w tym projekcie

---

## 5. Formatowanie Markdowna w Lekcjach

System używa specjalnego silnika (`MarkdownRenderer.tsx`), który dzieli plik Markdown na responsywne "strony" (slajdy).

### Podział na strony
Aby podzielić tekst, użyj znacznika (musi być w nowej linii):
```markdown
---PAGE---
```

### Interaktywne Komponenty
Lekcje wspierają wstrzykiwanie interaktywnych zadań z Reacta (z folderu `src/components/interactive/`). Aby to zrobić, użyj komentarza HTML:
```html
<!-- INTERACTIVE: nazwa-komponentu -->
```
*Przykład: `<!-- INTERACTIVE: binary-counter -->` odpali komponent `BinaryCounter.tsx`.*

### Key Insights (Przerywniki / Pop-upy)
Specjalne "żarówki" (Key Insights), wyświetlające krótką myśl na środku ekranu, pomiędzy tekstowymi stronami. Format blokowy to:
```markdown
> [!KEY] To jest bardzo ważna myśl, która pojawi się wycentrowana z dużym żółtym akcentem świetlnym na oddzielnej stronie.
```

---

## 6. Wskazówki dot. UI / UX

1. **Aesthetics (Glassmorphism & Cyberpunk-Retro):**
   - Projekt łączy pikselowe fonty (`font-pixel` / Chakra Petch) z nowoczesnymi blurem (`backdrop-blur`).
   - Używaj kolorów zaczerpniętych z Tailwind (szczególnie warianty `slate-900`/`slate-950` dla tła oraz mocne neony dla obramowań).
2. **Karty Popup w Drzewku:**
   - Karta wyświetla się po wybraniu noda, pozycjonowanie rozwiązane przez absolutny offset (`left: calc(50% - 150px)`).
   - Zoom na dany node posiada zabezpieczające 50ms opóźnienia, aby nie blokować Reactowych klatek (60FPS).
3. **Typography:**
   - `.font-pixel` ustala domyślny bazowy rem rozmiaru czcionki (dla przycisków, tytułów).
   - W treściach markdown upewnij się, że tekst "oddycha" — dużo światła i odpowiedni line-height.

Powodzenia w kodowaniu systemu FocusOS!
