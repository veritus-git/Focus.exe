# Jak działa procesor (CPU) od środka?

## Zanim zaczniemy — po co w ogóle procesor istnieje?

Wyobraź sobie restaurację. Masz kuchnię, masz kelnerów, masz stoły z zamówieniami. Ale jest jedna osoba, która *naprawdę* decyduje o wszystkim — **szef kuchni**. To on czyta zamówienie, decyduje co przygotować najpierw, koordynuje pracę całej kuchni i pilnuje, żeby wszystko wyszło na czas.

**CPU jest szefem kuchni twojego komputera.**

Każdy klik myszką, każda klatka animacji, każde sprawdzenie pisowni — to wszystko to "zamówienia", które lądują na jego stole. I on musi je ogarnąć. Miliardy takich zamówień. **Na sekundę.**

> [!KEY] CPU to jedyny element w komputerze, który naprawdę "robi rzeczy". Wszystko inne (RAM, SSD, GPU) to tylko jego narzędzia i asystenci.

---PAGE---

## Tranzystor — najmniejszy pracownik

Wszystko zaczyna się od czegoś absurdalnie prostego: **przełącznika**. Takiego samego, jakim włączasz światło w pokoju. Albo jest włączony (1), albo wyłączony (0).

Tyle że tranzystory w twoim CPU to nie są duże przełączniki na ścianie. Są **mniejsze niż wirus**. Procesor w twoim laptopie ma ich dosłownie **kilkanaście miliardów**. Apple M2 ma ich 20 miliardów. Na chipie wielkości paznokcia.

> **Fakt, który warto sobie uświadomić:** Gdybyś mógł powiększyć tranzystor do rozmiaru mrówki, to cały procesor miałby wielkość sporego miasta.

Te tranzystory nie myślą. Nie wiedzą, co robią. Jedyne co potrafią to: **być włączone lub wyłączone**. Ale kiedy połączysz je ze sobą w odpowiednie wzorce — tak zwane **bramki logiczne** — nagle potrafią dodawać, porównywać, przesuwać dane, a w końcu... uruchamiać Minecrafta.

> [!KEY] Cała potęga komputera wynika z jednej prostej rzeczy: miliardów malutkich przełączników, które mogą być albo 0, albo 1. Nic więcej.

---PAGE---

## Bramki logiczne — z niczego powstaje matematyka

Z tych prostych przełączników budujesz podstawowe "cegiełki":

- **AND** — wynik to 1 tylko wtedy, gdy *oba* wejścia to 1. Jak drzwi, które otworzysz dopiero jeśli masz *i* klucz *i* kartę.
- **OR** — wynik to 1, gdy *którekolwiek* wejście to 1. Jak alarm, który włączy się od ruchu *lub* od dźwięku.
- **NOT** — odwraca: 1 staje się 0 i na odwrót. Jak przełącznik światła.

Z tych trzech cegieł budujesz **wszystko**. Dosłownie. Sumator (dodawanie), komparator (porównywanie), multiplekser (wybieranie)... a z tych z kolei budujesz cały procesor.

> [!KEY] Z zaledwie trzech typów bramek (AND, OR, NOT) można zbudować KAŻDĄ operację, którą komputer kiedykolwiek wykona.

**Spróbuj sam — kliknij w inputy poniżej i zobacz jak działają bramki logiczne:**

<!-- INTERACTIVE: logic-gates -->

---PAGE---

## Cykl pobrania i wykonania — serce procesora bije

CPU robi w kółko jedną rzecz. Tę samą. Miliardy razy na sekundę. Nazywa się to **Fetch-Decode-Execute Cycle**:

### 1. Fetch (Pobierz)
CPU sięga do pamięci RAM i pobiera następną instrukcję. Każda instrukcja to po prostu ciąg zer i jedynek — na przykład `ADD R1, R2` (dodaj zawartość rejestru 1 do rejestru 2).

### 2. Decode (Zdekoduj)
CPU "czyta" tę instrukcję i rozpoznaje, co ma zrobić. To jak kelner, który patrzy na zamówienie i rozumie: "aha, stolik 4 chce pizzę margheritę".

### 3. Execute (Wykonaj)
CPU faktycznie wykonuje operację — dodaje dwie liczby, porównuje wartości, przesyła dane. Wynik ląduje w jednym z **rejestrów** (szybkie, malutkie komórki pamięci wewnątrz samego procesora).

I zaraz potem? **Od początku.** Fetch. Decode. Execute. Na procesorze 5 GHz ten cykl powtarza się **5 miliardów razy na sekundę**.

> [!KEY] CPU nie "myśli". On tylko w kółko pobiera instrukcję, rozszyfrowuje ją i wykonuje. Miliardy razy na sekundę. To WSZYSTKO co robi.

---PAGE---

## Rejestry — pamięć podręczna szefa

CPU nie lata po dane do RAMu za każdym razem — to byłoby jak szef kuchni, który biegnie do magazynu po każdą szczyptę soli. Zamiast tego ma **rejestry** — kilkadziesiąt malutkich "kieszeni" bezpośrednio w sobie, do których ma dostęp **natychmiast**.

Rejestry to najszybsza pamięć, jaka istnieje w twoim komputerze. Odczyt z rejestru trwa dosłownie **jeden cykl zegara** — mniej niż nanosekunda. Dla porównania:

| Pamięć | Czas dostępu | Analogia |
|--------|-------------|----------|
| Rejestr | ~0.3 ns | Kieszeń szefa |
| Cache L1 | ~1 ns | Blat roboczy |
| Cache L3 | ~10 ns | Szafka w kuchni |
| RAM | ~100 ns | Lodówka |
| SSD | ~100 000 ns | Piwnica |

> [!KEY] Im bliżej procesora pamięć, tym szybciej działa — ale tym mniej jej jest. Rejestr to nanosekundy, SSD to milisekundy. Różnica jest milionkrotna.

---PAGE---

## Pipeline — taśma produkcyjna w procesorze

Wyobraź sobie linię produkcyjną w fabryce. Zamiast jednej osoby, która składa cały produkt od A do Z, masz **stacje robocze**: jedna osoba montuje ramkę, następna wkłada ekran, następna przykręca baterię, następna pakuje.

Procesor robi to samo z instrukcjami. Zamiast czekać aż jedna instrukcja przejdzie cały cykl Fetch→Decode→Execute, **każda faza przetwarza inną instrukcję jednocześnie**:

```
Cykl 1:  [Fetch A]  [      ]  [        ]
Cykl 2:  [Fetch B]  [Dec A ]  [        ]
Cykl 3:  [Fetch C]  [Dec B ]  [Exec A  ]
Cykl 4:  [Fetch D]  [Dec C ]  [Exec B  ]
```

W cyklu 3 procesor jednocześnie pobiera instrukcję C, dekoduje B i wykonuje A. **Trzy instrukcje naraz, mimo że każda pojedyncza nadal zajmuje 3 cykle.**

Nowoczesne procesory (np. Intel 14th gen) mają pipeline o **20+ etapach**. To jak fabryka z dwudziestoma stacjami — przepustowość jest kosmiczna.

> [!KEY] Pipeline to powód, dla którego procesory są tak szybkie — nie dlatego, że jedna instrukcja jest szybka, ale dlatego, że WIELE instrukcji jest przetwarzanych jednocześnie.

---PAGE---

## Wielordzeniowość — klonowanie szefa kuchni

Wróćmy do restauracji. Masz jednego szefa kuchni, który jest genialny, ale zamówienia się piętrzą. Co robisz? **Zatrudniasz drugiego szefa kuchni z własną stacją roboczą.**

To właśnie jest rdzeń procesora. Procesor 8-rdzeniowy to **osiem niezależnych jednostek**, z których każda ma własne rejestry, własny pipeline, i przetwarza osobny strumień instrukcji. Razem potrafią ogarnąć osiem rzeczy jednocześnie.

Dlatego gry, które potrafią wykorzystać wiele rdzeni, działają dramatycznie lepiej niż te, które korzystają tylko z jednego.

---

## 🧠 Pomyśl o tym...

- Twój procesor wykonuje ~5 miliardów operacji na sekundę. Ale światło w tym czasie przebywa tylko ~30 cm. Sygnał elektryczny w procesorze musi pokonać dystanse rzędu milimetrów w ułamku nanosekundy — jesteśmy na fizycznym limicie tego, jak szybko informacja może się przemieszczać. **Co będzie, gdy nie da się iść szybciej?**

- Każdy program, który uruchamiasz — Spotify, Chrome, Discord — to z perspektywy CPU po prostu nieskończony strumień instrukcji typu "dodaj", "porównaj", "skopiuj". Nie ma żadnej magii. Nie ma "rozumienia". Tylko miliardy prostych operacji, które razem tworzą iluzję inteligencji.

- Współczesne CPU potrafią przewidzieć, którą gałąź `if/else` twój program wybierze, **zanim program to zrobi**. To się nazywa **Branch Prediction** i trafia z ~95% skutecznością. Procesory dosłownie *zgadują przyszłość*.
