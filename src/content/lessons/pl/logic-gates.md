# Bramki Logiczne: Jak krzem uczy się myśleć

Wiesz już, że komputer to w rzeczywistości gigantyczna farma przełączników. Wiesz, że tranzystory włączają się i wyłączają miliardy razy na sekundę, reprezentując zera i jedynki. 

Ale z samego faktu, że "gdzieś płynie prąd", nie powstaje jeszcze kalkulator. Prąd sam w sobie nie wie, co to znaczy "dwa plus dwa". Nie wie, jak wygląda kot na zdjęciu. Prąd po prostu płynie z punktu A do punktu B.

Więc w jaki sposób zmuszamy ślepe siły fizyki do rozwiązywania problemów matematycznych? Sekret nie leży w samych przełącznikach. Sekret leży w tym, **w jaki sposób połączymy je ze sobą**.

---PAGE---

## Wyobraź sobie hydraulikę

Zamiast niewidzialnego prądu, wyobraź sobie przez chwilę grube rury, w których płynie woda, oraz zwykłe mechaniczne zawory (które reprezentują nasze tranzystory).

Wyobraź sobie, że instalujesz dwa zawory na jednej, prostej rurze — **jeden zaraz za drugim**. 
Aby woda poleciała na samym końcu rury, musisz otworzyć zawór A **ORAZ** otworzyć zawór B. Jeśli otworzysz tylko jeden z nich, woda zatrzyma się w połowie drogi. 

Teraz zróbmy coś innego: poprowadźmy dwie rury **równolegle** obok siebie, zamontujmy na nich po jednym zaworze, a na koniec połączmy je w jedną wspólną rurę wylotową.
W tym przypadku woda poleci na końcu, jeśli otworzysz zawór A **LUB** zawór B. Wystarczy otworzyć jakikolwiek, aby woda dotarła do celu.

Gratulacje. Używając rur i wody, właśnie wynalazłeś **Bramki Logiczne**. To specyficzne układy przełączników, które na podstawie tego, jakie sygnały do nich wchodzą, podejmują fizyczną "decyzję" o tym, co wyjdzie na końcu.

---PAGE---

## Wielka Trójka Logiki

Wszystko, absolutnie każdy proces w Twoim smartfonie czy pececie, opiera się na setkach milionów kombinacji zaledwie trzech podstawowych "bramek" zrobionych z krzemu. Ich zachowanie zapisujemy w tzw. Tabelach Prawdy.

**1. Bramka AND (I)**
Wypuszcza prąd (1) TYLKO wtedy, gdy wszystkie jej wejścia to 1.
*Zastosowanie w życiu:* Odpalenie wyrzutni rakiet. Generał A (Klucz 1) ORAZ Generał B (Klucz 2) muszą przekręcić klucze jednocześnie. Jeśli tylko jeden przekręci klucz (1 i 0), rakieta nie wystartuje (Wynik: 0).

| Wejście A | Wejście B | Wynik (Wyjście) |
|-----------|-----------|-----------------|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**2. Bramka OR (LUB)**
Wypuszcza prąd (1), gdy PRZYNAJMNIEJ jedno wejście to 1.
*Zastosowanie w życiu:* Oświetlenie wewnątrz auta. Żarówka na suficie zapala się, gdy otworzysz lewe drzwi LUB prawe drzwi. Wystarczy jeden sygnał.

| Wejście A | Wejście B | Wynik (Wyjście) |
|-----------|-----------|-----------------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

**3. Bramka NOT (NIE)**
Zwana inwerterem. To buntownik, który ma tylko jedno wejście. Zawsze odwraca sygnał na przeciwny.
*Zastosowanie w życiu:* Czujnik zmierzchu przy lampach ulicznych. Kiedy słońce świeci (1), ulica NIE jest podświetlona (0). Kiedy nie ma słońca (0), lampa świeci (1).

---PAGE---

## Magiczny klocek: Bramka XOR

Mając AND, OR i NOT, możemy układać je w bardziej skomplikowane pajęczyny. Z ich połączenia powstaje bramka, która jest absolutnie kluczowa dla działania całego komputerowego świata. Nazywa się **eXclusive OR (XOR)**, czyli "Ekskluzywne LUB".

Działa jak zasada "albo-albo, ale nigdy oba naraz". Sygnał z niej wypłynie tylko wtedy, gdy jej wejścia są RÓŻNE.

| Wejście A | Wejście B | Wynik (Wyjście) |
|-----------|-----------|-----------------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

Dlaczego 1 i 1 daje tutaj 0? Pomyśl o przełącznikach światła na klatce schodowej. Jeden jest na dole, drugi na górze, a sterują tą samą żarówką. Jeśli oba przełączniki są w dół (0 i 0), światło zgaszone. Jeśli klikniesz jeden do góry (1 i 0), zapala się. Ale jeśli na górze ktoś też kliknie swój przełącznik do góry (1 i 1), światło znowu zgaśnie. To jest fizyczna bramka XOR w Twoim domu.

Dlaczego bramka XOR to komputerowy święty Graal? Zobaczysz to za chwilę.

---PAGE---

## Spróbuj sam!

Zanim przejdziemy do matematyki, zobacz na własne oczy, jak prąd przepływa przez te układy. Poklikaj wejścia bramek i obserwuj, jak układ logiczny decyduje o wyniku na samym końcu.

<!-- INTERACTIVE: logic-gates-simulator -->

Widzisz? Pojedyncza bramka jest dość banalna. Ale co się stanie, jeśli prąd, który wychodzi z bramki AND, puścimy od razu do wejścia bramki OR, a na koniec odwrócimy go przez NOT? 
Nagle z "głupiego" prądu tworzymy fizyczny układ, który potrafi sprawdzić złożony warunek z życia, np.: *"Pozwól wypłacić gotówkę, JEŚLI (Pin jest poprawny AND Karta jest ważna) AND NOT (Brak środków na koncie)"*.

Zauważ: tu nie ma żadnego "kodu" w sensie programistycznym. To wszystko dzieje się całkowicie sprzętowo!

---PAGE---

## Sumator: Moment, w którym prąd staje się matematyką

Znamy już logikę, ale komputery muszą liczyć liczby. Jak wymusić na ślepym układzie elektrycznym dodanie 1 + 1, tak by wypluł wynik 2?

Musimy połączyć naszą magiczną bramkę **XOR** z bramką **AND**. Taki układ nazywamy Półsumatorem (Half-Adder).

Wpuśćmy w taki układ dwa prądy oznaczające bity 1 i 1. 
Spójrz na tabelę XOR wyżej. Co robi XOR, gdy dostanie dwie jedynki? Zderzają się one ze sobą i wynik to 0. Mamy pierwszą cyfrę wyniku.
Ale przecież w matematyce 1 + 1 to 2! Gdzie podziała się ta wartość?
W matematyce pisemnej, gdy brakuje nam miejsca, przenosimy jedynkę do następnej kolumny. I tu wkracza bramka AND. Została podłączona obok, do tych samych prądów początkowych. Bramka AND widzi dwie jedynki i mówi: "Okej, oba wejścia to 1, więc wypuszczam 1 jako sygnał PRZENIESIENIA (Carry)".

Układ łączy wynik z bramki XOR (0) oraz wynik z bramki AND (1). Odczytujemy je od lewej do prawej i co dostajemy? Liczbę binarną **10**.
A "10" w systemie binarnym to po prostu cyfra dwa! 

Gratulacje. Używając dwóch połączonych bramek, prąd wszedł do układu i zupełnie bez świadomości wykonał fizyczne równanie 1 + 1 = 2.

---PAGE---

> [!KEY] Bramki logiczne to fizyczny most, który łączy bezmyślną elektryczność z ludzką matematyką. Komputer nie "myśli". On po prostu przepuszcza prąd przez genialnie zaprojektowane labirynty (Sumatory), z których woda zawsze wypływa po odpowiedniej stronie, dając nam gotowy wynik obliczeń.

---PAGE---

## Food for Thought

Miliony połączonych Sumatorów tworzą w Twoim procesorze tzw. ALU (Jednostkę Arytmetyczno-Logiczną) — serce wykonujące wszystkie obliczenia we wszechświecie gier, programów i AI.

Ale kalkulator to nie wszystko. Kiedy komputer coś policzy, musi umieć zapisać ten wynik na później. Bramki logiczne potrafią przepuszczać prąd, ale jak sprawić, by zatrzymały go w sobie i go "zapamiętały"?
Jak użyć bramek, by stworzyć układ, który zapamięta informację, nawet gdy przestaniemy dostarczać mu nowy sygnał? 

Odpowiedzią na to są układy zwane "Przerzutnikami" (Flip-Flops). Wchodzimy w fascynujący świat Pamięci RAM i tego, jak fizycznie "zapisujemy" dane na krzemie.