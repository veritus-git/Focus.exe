# Czym jest informacja?

Zanim zanurzymy się w procesory, sztuczną inteligencję czy kryptografię — musimy odpowiedzieć na jedno fundamentalne pytanie, które łączy **absolutnie wszystko** w cyfrowym świecie[cite: 2].

## Czym w ogóle JEST informacja?

Wyobraź sobie, że stoisz w kompletnie ciemnym pokoju. Ktoś naciska przełącznik. Światło jest albo **włączone**, albo **wyłączone**. To wszystko. Dwa stany. Dwie możliwości[cite: 2].

To pojedyncze "włączone lub wyłączone" — to **bit**[cite: 2]. Najmniejszy możliwy kawałek informacji we wszechświecie[cite: 2].

Ale pomyśl o tym z innej strony. Zanim ktoś kliknął ten przełącznik, nie wiedziałeś, czy będzie jasno, czy ciemno. Twoja niepewność wynosiła dokładnie 50/50. Kiedy światło się zapaliło, ta niepewność zniknęła. 

Informacja to nic innego jak **redukcja niepewności**. Kiedy dowiadujesz się czegoś, czego wcześniej nie wiedziałeś, otrzymujesz informację. W świecie komputerów tę porcję usuniętej niepewności mierzymy właśnie w bitach.

*Właśnie teraz, kiedy czytasz to zdanie, Twój ekran wyświetla miliony takich maleńkich sygnałów włącz/wyłącz. Każdy piksel, każda litera, każdy kolor — wszystko sprowadza się do astronomicznej liczby bitów przetwarzanych niesamowicie szybko.*[cite: 2]

---PAGE---

## Wszystko to tylko liczby

Oto coś, co może lekko zburzyć Twój światopogląd: wewnątrz komputera nie ma czegoś takiego jak "plik dźwiękowy" czy "plik graficzny". Komputer jest ślepy i głuchy. Rozumie tylko jedną rzecz: **liczby**.

- **Zdjęcie?** Miliony maleńkich kwadracików (pikseli). Każdy piksel to tak naprawdę tylko 3 liczby — ile w nim jest koloru czerwonego, zielonego i niebieskiego. Wartości od 0 do 255.
- **Piosenka?** Twój komputer mierzy ciśnienie powietrza (falę dźwiękową) 44 100 razy w ciągu każdej sekundy, a każdy pomiar zapisuje jako liczbę[cite: 2]. Odtwarzając muzykę, po prostu wypluwa te liczby do głośnika.
- **Ten tekst?** Każda litera to z góry ustalona liczba. A = 65. B = 66. Spacja = 32[cite: 2].
- **Gra wideo?** Twoja pozycja na mapie (X, Y, Z), Twoje punkty życia, a nawet kierunek wiatru to liczby aktualizowane 60 razy na sekundę[cite: 2].

Nie ma w tym żadnej magii. Wewnątrz maszyny nie ma specjalnego "materiału wideo". Na samym dnie tego wszystkiego, te miliardy liczb zbudowane są wyłącznie z bitów — zer i jedynek[cite: 2].

---PAGE---

## Dlaczego zera i jedynki?

Wielu ludzi myśli, że zera i jedynki to jakiś genialny, czysty system matematyczny wymyślony po to, żeby było "cyfrowo". Prawda jest znacznie bardziej brutalna. Używamy ich z powodu fizyki i wszechobecnego szumu.

Tranzystor — mikroskopijny przełącznik wewnątrz Twojego procesora — ma dwa stany: **prąd płynie** lub **prąd nie płynie**. Włączony lub wyłączony. 1 lub 0[cite: 2].

Wyobraź sobie, że chcemy zbudować komputer, który rozróżnia 10 różnych wartości zamiast dwóch. Musielibyśmy używać 10 różnych poziomów napięcia prądu (np. 1 Volt to jedynka, 2 Volty to dwójka... 9 Voltów to dziewiątka). 

Brzmi prosto, ale w prawdziwym świecie kable się nagrzewają, obok działają inne urządzenia elektromagnetyczne, a zasilacz czasem podaje lekko wyższe napięcie. Jeśli kabel odczyta 2.2 Volta zamiast 2.0... komputer nie wie, czy to "dwójka", która dostała szumu, czy "trójka", której zabrakło prądu. System się sypie.

Ale jeśli mamy tylko "JEST PRĄD" i "NIE MA PRĄDU"? To niesamowicie łatwe do sprawdzenia. Nawet jeśli sygnał jest zaszumiony, komputer natychmiast wie, z czym ma do czynienia. To fizyczna niezawodność podyktowała użycie jedynek i zer.

---PAGE---

## Kontekst nadaje sens

Pojedyncze zero lub jedynka nic nie znaczy. Jak komputer wie, że seria 8 bitów (np. 01000001) oznacza literę "A", a nie ciemnoczerwony piksel albo instrukcję dla głośnika?

Odpowiedzią jest **kontekst**.

Jeśli otworzysz plik tekstowy, procesor wie: "Aha, ładuję aplikację Notatnik, więc wszystkie bity, które teraz dostanę, mam traktować jak litery alfabetu". 
Jeśli otworzysz to samo 01000001 w Photoshopie, program powie: "To jest program graficzny, więc potraktuję te bity jako informację o odcieniu czerwieni".

To programy i rozszerzenia plików nadają bitom znaczenie. Same w sobie, bity są tylko ślepym impulsem elektrycznym.

---PAGE---

## Spróbuj sam!

Oto prawdziwy licznik binarny. Klikaj bity, żeby przełączać je między 0 a 1, i obserwuj jak zmienia się liczba dziesiętna[cite: 2]:

<!-- INTERACTIVE: binary-counter -->

Zauważyłeś coś? Za pomocą zaledwie **8 bitów** (jednego bajta) możesz reprezentować dowolną liczbę od 0 do 255. To wystarczy do zakodowania każdej litery alfabetu, każdej podstawowej wartości koloru, każdej prostej instrukcji[cite: 2].

Z 32 bitami możesz liczyć do ponad **4 miliardów**. Z 64 bitami ta liczba wynosi ponad 18 trylionów. Właśnie tak komputery budują nieskończoność z dwóch stanów.

---PAGE---

> [!KEY] Wszystko co widzisz na ekranie — tekst, zdjęcia, filmy, gry — to ogromna ilość zer i jedynek, które Twój komputer czyta NIESAMOWICIE szybko. To właśnie jest informacja: zorganizowane i zinterpretowane bity[cite: 2].

---PAGE---

## Stąd wszystko się rozgałęzia

Teraz, gdy rozumiesz czym jest informacja, możesz pójść w **dowolnym kierunku**[cite: 2]:

- **🧠 Hardware** — Jak komputer fizycznie przetwarza te bity? Czym są bramki logiczne? Jak z prądu zrobić kalkulator?
- **💻 Programowanie** — Jak powiedzieć komputerowi, co ma zrobić z tymi liczbami?
- **🌐 Internet** — Jak te miliardy bitów potrafią w ułamku sekundy okrążyć kulę ziemską światłowodami na dnie oceanu?
- **🤖 AI** — W jaki sposób maszyna potrafi "nauczyć się" odróżniać bity tworzące zdjęcie psa od zdjęcia kota?
- **🔐 Kryptografia** — Jak za pomocą matematyki zapętlić i wymieszać bity tak, żeby nikt inny nie mógł ich odczytać?

**Wybierz ścieżkę, która Cię fascynuje. Na tym drzewku nie ma "złej kolejności" — jest tylko Twoja ciekawość.**[cite: 2]