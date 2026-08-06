# Jak działa bit?

Już słyszałeś słowo "bit." Wiesz, że to zero lub jedynka. Ale pójdźmy głębiej — **jak to właściwie fizycznie działa?**

Bo bit to nie jest tylko koncept. To coś realnego. Coś, co istnieje w krzemie wewnątrz twojego komputera właśnie teraz, przełączając się miliard razy na sekundę.

---PAGE---

## Najmniejszy przełącznik na świecie

Wyobraź sobie włącznik światła w swoim pokoju. Ma dwie pozycje: **WŁĄCZONY** albo **WYŁĄCZONY**.

Teraz wyobraź sobie, że skurczyłeś ten przełącznik do **5 nanometrów** — około 10 000 razy cieńszego niż ludzki włos. To jest **tranzystor**. A twój komputer ma ich **miliardy**.

Każdy tranzystor to maleńka elektryczna brama:
- Gdy prąd płynie → to oznacza **1**
- Gdy prąd jest zablokowany → to oznacza **0**

To tyle. Żadnej magii. Każdy film, który oglądasz, każda gra, w którą grasz, każda wiadomość AI — to wszystko sprowadza się do miliardów tych mikroskopijnych przełączników przeskakujących z niesamowitą prędkością.

---PAGE---

## Dlaczego tylko dwa stany?

Możesz się zastanawiać — dlaczego nie trzy? Albo dziesięć? Po co ograniczać się do 0 i 1?

Odpowiedź: **niezawodność**.

Wyobraź sobie rozróżnianie 10 poziomów napięcia na przewodzie cieńszym niż wirus, z szumem elektrycznym wszędzie dookoła, przy 5 miliardach sprawdzeń na sekundę. Błędy byłyby ciągle.

Ale odróżnienie **"prąd płynie" od "prąd nie płynie"**? To proste. Nawet z szumem, nawet przy absurdalnych prędkościach, komputer potrafi odróżnić WŁĄCZONY od WYŁĄCZONEGO bez pomyłek.

> **Dlatego każdy komputer kiedykolwiek zbudowany używa systemu binarnego. Nie dlatego, że jest elegancki (choć jest). Bo fizyka tego wymaga.**

---PAGE---

> [!KEY] Bit to nie abstrakcyjna idea — to fizyczny tranzystor w twoim CPU, który albo przewodzi prąd (1), albo go blokuje (0). Twój procesor ma miliardy takich przełączników, każdy przeskakujący miliardy razy na sekundę.

---PAGE---

## Od jednego bita do prawdziwych liczb

Sam bit jest nudny — może reprezentować tylko dwie rzeczy: 0 lub 1. Tak lub nie.

Ale **połącz bity razem**, i nagle możesz reprezentować cokolwiek:

| Bity | Możliwe wartości | Co mogą reprezentować |
|------|-----------------|----------------------|
| 1 bit | 2 | Włącz/Wyłącz, Tak/Nie |
| 2 bity | 4 | 00, 01, 10, 11 |
| 4 bity | 16 | Jedna cyfra hex (0-F) |
| 8 bitów (1 bajt) | 256 | Jeden znak, jeden kanał koloru |
| 32 bity | 4 294 967 296 | Większość liczb w programowaniu |
| 64 bity | 18 trylionów | Rozmiar słowa współczesnego CPU |

Za każdym razem gdy dodajesz jeden bit, **podwajasz** liczbę rzeczy, które możesz reprezentować. To wykładniczy wzrost i dlatego komputery są takie potężne.

---PAGE---

## Jak twój CPU czyta bity

Twój CPU nie patrzy na bity pojedynczo. Połyka je w kawałkach zwanych **słowami** (words).

Współczesny procesor 64-bitowy czyta **64 bity naraz** — to 64 maleńkie przełączniki sprawdzane jednocześnie. Robi to mniej więcej **5 miliardów razy na sekundę** (to właśnie oznacza liczba "GHz").

Więc w jedną sekundę twój CPU przetwarza:
> **64 × 5 000 000 000 = 320 miliardów decyzji bitowych na sekundę.**

A to tylko JEDEN rdzeń. Twój CPU prawdopodobnie ma 8-16 rdzeni robiących to równolegle.

---PAGE---

## Fizyczna rzeczywistość

Coś, co rozwala głowę: wewnątrz procesora sygnały elektryczne podróżują z prędkością około **2/3 prędkości światła**. Przy 5 GHz, światło przebywa jedynie około **6 centymetrów** między każdym tyknięciem zegara.

To oznacza, że twój CPU musi być **fizycznie mały** — nie z wygody produkcyjnej, ale dlatego że **fizyka nie pozwoli sygnałom podróżować wystarczająco szybko** przez większy chip.

Dlatego producenci chipów ciągle zmniejszają tranzystory. Przy 3nm (jak najnowsze chipy Apple), tranzystory mają zaledwie około **15 atomów szerokości**. Zbliżamy się do samych granic fizyki.

---PAGE---

> [!KEY] Absolutnie wszystko, co robi twój komputer — od ładowania strony po renderowanie gry 3D — to miliardy tranzystorów przełączających się między 0 a 1 z niesamowitą prędkością. Nie ma osobnego "procesora wideo" czy "procesora tekstu." To wszystko te same bity, tylko inaczej interpretowane.

---PAGE---

## Do przemyślenia...

Skoro tranzystor może być tylko WŁĄCZONY lub WYŁĄCZONY... jak twój komputer wyświetla miliony kolorów? Jak odtwarza muzykę z płynnymi falami dźwiękowymi? Jak sieć neuronowa przechowuje dziesiętne wagi jak 0.7342?

Odpowiedź: **sprytne kodowanie**. Wiele bitów współpracujących ze sobą potrafi reprezentować dowolną liczbę, kolor czy falę dźwiękową — z dowolną potrzebną precyzją.

**To jest magia bita: najprostsza możliwa jednostka informacji, a mimo to wystarczająco potężna, by zbudować wszystko cyfrowe w naszym świecie.**

Następny krok: odkryj, jak łączenie bitów w sprytny sposób tworzy **Bramki Logiczne** — klocki, które pozwalają twojemu CPU naprawdę *obliczać* rzeczy.
