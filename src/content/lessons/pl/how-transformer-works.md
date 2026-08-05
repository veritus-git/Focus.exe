# Jak działa Transformer — mózg stojący za ChatGPT?

## Zanim zaczniemy — czemu w ogóle to istnieje?

W 2017 roku zespół badaczy z Google'a opublikował paper o tytule **"Attention Is All You Need"**. Osiem stron, które zmieniły świat. Nie jest to przesada — ten paper jest powodem, dla którego istnieje ChatGPT, Gemini, Claude, Copilot, generatory obrazów, i właściwie cała rewolucja AI, którą widzisz dziś dookoła.

Ale o co w tym chodzi?

Wcześniej komputery "czytały" tekst słowo po słowie, jak uczeń, który wolno przesuwa palec po zdaniu. Problem? Zanim dotarł do końca zdania, **zapominał początek**. Im dłuższy tekst, tym gorzej.

Transformer to architektura, która pozwala modelowi **patrzeć na cały tekst naraz** i samodzielnie decydować, które słowa są ważne dla których. To jakby zamiast czytać książkę strona po stronie, mógłbyś zobaczyć cały rozdział jednocześnie i od razu wyłapać, które fragmenty się do siebie odnoszą.

---

## Token — atom języka

Zanim Transformer cokolwiek zrobi, musi zamienić tekst na coś, co komputer rozumie — czyli liczby. Proces ten nazywa się **tokenizacją**.

Słowo "transformer" nie jest jednym tokenem. Tokenizer (np. BPE — Byte Pair Encoding) rozbija je na kawałki:
- `"trans"` → token 1234
- `"former"` → token 5678

Każdy token to indeks w ogromnym słowniku (np. GPT-4 ma ~100 000 tokenów). Zdanie zamienia się w ciąg liczb.

Ale same liczby to za mało. Model musi wiedzieć, co one *znaczą*...

---

## Embedding — słowa stają się strzałkami w przestrzeni

Każdy token zamieniany jest w **wektor** — listę kilkuset (np. 768 lub 4096) liczb. Ten wektor to "adres" tokenu w ogromnej, wielowymiarowej przestrzeni.

Dlaczego to genialne? Bo **podobne słowa mają bliskie wektory**:
- Wektor słowa "król" jest blisko wektora "królowa"
- Wektor "pies" jest blisko "kot"
- A "pies" jest daleko od "algebra"

Co więcej, wektory potrafią uchwycić **relacje**:
```
król - mężczyzna + kobieta ≈ królowa
```

To nie magia — to geometria w przestrzeni o kilku tysiącach wymiarów. Model dosłownie *umieszcza* każde słowo w kosmosie i uczy się, gdzie co powinno stać.

---

## Self-Attention — "na co powinienem teraz zwrócić uwagę?"

To jest serce Transformera. Mechanizm, który sprawia, że model naprawdę "rozumie" kontekst.

Weź zdanie:

> *"Kot siedział na macie, bo **był** zmęczony."*

Słowo **"był"** — do kogo się odnosi? Do kota, do maty? Ty wiesz intuicyjnie. Ale jak ma to wiedzieć komputer?

**Self-Attention** pozwala każdemu tokenowi "zapytać" wszystkie inne tokeny: **"Hej, jak bardzo jesteś dla mnie istotny?"** I na tej podstawie zbudować sobie *zmodyfikowaną reprezentację* siebie, wzbogaconą o kontekst.

Technicznie działa to tak:

1. Każdy token tworzy trzy wektory:
   - **Query (Q)** — "Czego szukam?"
   - **Key (K)** — "Co oferuję?"
   - **Value (V)** — "Jaką informację niosę?"

2. Query jednego tokenu jest mnożony z Key każdego innego tokenu. Wynik to **score** — im wyższy, tym bardziej ten token jest "istotny".

3. Score'y przechodzą przez **softmax** (zamieniają się na wartości 0-1, które sumują się do 1 — to rozkład prawdopodobieństwa).

4. Wynikowe wagi mnożą się z Value'ami — model dostaje "ważoną mieszankę" informacji od wszystkich tokenów.

> **Analogia:** Wyobraź sobie pokój pełen ludzi. Self-Attention to moment, gdy rozglądasz się i decydujesz, kogo słuchać uważniej. Gdy mówisz o piłce nożnej, "słuchasz" bardziej osoby w koszulce sportowej niż osoby rozmawiającej o pogodzie. Model robi to samo — dla każdego słowa osobno.

---

## Multi-Head Attention — patrzenie na tekst z wielu perspektyw

Jeden "wzrok" to za mało. Model używa **wielu głowic uwagi** (np. 12, 32, a w GPT-4 — 96!) działających równolegle.

Każda głowica specjalizuje się w czymś innym:
- Jedna łapie **składnię** (podmiot-orzeczenie)
- Inna łapie **relacje semantyczne** (synonimy)
- Jeszcze inna łapie **odległe zależności** (nawiązanie do czegoś sprzed 500 tokenów)

Wyniki z wszystkich głowic łączą się, dając modelowi **wielowymiarowe rozumienie** tekstu.

---

## Feed-Forward Network — "przemyślenie" tego, co zobaczył

Po Attention, każdy token przechodzi przez prostą **sieć neuronową** (dwie warstwy liniowe z aktywacją). To moment, gdy model "przetwarza" informacje zebrane z Attention i tworzy głębsze abstrakcje.

Jeśli Attention to *zbieranie informacji*, Feed-Forward to *myślenie nad nimi*.

---

## Warstwy — głębokość myślenia

Cały ten proces (Self-Attention → Feed-Forward) to **jedna warstwa Transformera**. Ale modele mają ich dziesiątki:

| Model | Liczba warstw |
|-------|-------------|
| GPT-2 | 12 |
| GPT-3 | 96 |
| Llama 3 70B | 80 |

Każda kolejna warstwa buduje **coraz bardziej abstrakcyjne rozumienie**:
- Warstwa 1: rozpoznaje podstawowe wzorce (końcówki słów, interpunkcja)
- Warstwa 20: rozumie składnię i relacje gramatyczne
- Warstwa 60: pojmuje intencje, sarkazm, implikacje
- Warstwa 96: łączy wielopoziomowe koncepty w spójną odpowiedź

---

## Generowanie tekstu — jeden token na raz

Jak model "pisze"? Tak samo jak zgadywanie następnego słowa w T9 na starym telefonie.

Model dostaje dotychczasowy tekst i oblicza **rozkład prawdopodobieństwa** nad całym słownikiem (~100 000 tokenów). Następnie wybiera token o najwyższym prawdopodobieństwie (albo losuje z top-k — stąd "temperatura" w ustawieniach).

```
Wejście: "Stolica Polski to"
Model oblicza: Warszawa=0.94, Kraków=0.03, Berlin=0.001...
Wynik: "Warszawa"
```

Potem ten token jest **doklejany** do wejścia i model przetwarza całość od nowa:

```
Wejście: "Stolica Polski to Warszawa"
Model oblicza: .=0.65, ,=0.2, i=0.05...
Wynik: "."
```

I tak dalej, token po tokenie. **Każde zdanie, które widzisz od ChatGPT, zostało wygenerowane jeden kawałek po drugim.** Model nie "widzi" swojej odpowiedzi z góry — buduje ją na bieżąco, jak muzyk improwizujący solo.

---

## 🧠 Pomyśl o tym...

- Transformer nie "rozumie" tekstu w ludzkim sensie. Żaden neuron nie "wie", czym jest miłość czy grawitacja. A mimo to model potrafi o nich rozmawiać z zaskakującą głębią. **Czy rozumienie wymaga świadomości, czy wystarczy wystarczająco dobry wzorzec?**

- Oryginalny paper "Attention Is All You Need" został odrzucony z jednej z konferencji naukowych, zanim zmienił cały świat AI. Recenzent napisał, że "to nic nowego". Czasem rewolucje nie wyglądają rewolucyjnie na początku.

- GPT-4 przetwarza miliony tokenów dziennie. Każdy z tych tokenów przechodzi przez ~96 warstw, każda z 96 głowicami Attention. To **miliardy operacji macierzowych na sekundę**. A wszystko to po to, żeby dopisać jedno słowo do zdania.
