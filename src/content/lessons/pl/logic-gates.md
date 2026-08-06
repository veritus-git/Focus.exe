# Bramki Logiczne

Zrozumiałeś już, że komputer to po prostu miliardy małych przełączników (tranzystorów), które mogą być włączone (1) lub wyłączone (0).

Ale zaraz... jak z samego faktu, że gdzieś płynie lub nie płynie prąd, zrobić **dodawanie matematyczne**? Albo rozpoznawanie obrazu przez AI?

Sekret nie leży w samych przełącznikach. Sekret leży w tym, **w jaki sposób połączymy je ze sobą**.

---PAGE---

## Wyobraź sobie hydraulikę

Zamiast prądu, wyobraź sobie przez chwilę grube rury, w których płynie woda, oraz mechaniczne zawory.

Wyobraź sobie, że instalujesz dwa zawory na jednej rurze, **jeden za drugim**. 
Woda poleci na samym końcu rury TYLKO wtedy, gdy otworzysz zawór A **ORAZ** otworzysz zawór B. Jeśli otworzysz tylko jeden — woda zatrzyma się na drugim.

Teraz zróbmy coś innego: poprowadźmy dwie rury **równolegle** i połączmy je na końcu.
Teraz woda poleci na końcu, jeśli otworzysz zawór A **LUB** zawór B (albo oba naraz).

Gratulacje, właśnie wynalazłeś **Bramki Logiczne**. To układy, które biorą sygnały wejściowe i na podstawie ich ułożenia podejmują fizyczną "decyzję" na wyjściu.

---PAGE---

## Wielka Trójka Logiki

Wszystko, absolutnie każdy proces w Twoim smartfonie czy pececie, opiera się na setkach milionów kombinacji zaledwie trzech podstawowych "bramek" (układów z tranzystorów):

1. **Bramka AND (I):**
   Wypuszcza prąd (1) TYLKO wtedy, gdy wszystkie jej wejścia to 1.
   *Zastosowanie w życiu:* Odpalenie wyrzutni rakiet. Generał A (kluczyk 1) **AND** Generał B (kluczyk 2) muszą przekręcić klucze jednocześnie. Inaczej rakieta nie startuje (0).

2. **Bramka OR (LUB):**
   Wypuszcza prąd (1), gdy PRZYNAJMNIEJ jedno wejście to 1.
   *Zastosowanie w życiu:* Oświetlenie wewnątrz auta. Zapala się, gdy otworzysz lewe drzwi **OR** prawe drzwi. 

3. **Bramka NOT (NIE):**
   Buntownik. Po prostu odwraca sygnał. Jeśli dasz jej 1, wypluje 0. Jeśli dasz 0, wypluje 1.
   *Zastosowanie w życiu:* Czujnik zmierzchu przy lampach ulicznych. Kiedy słońce świeci (1), ulica NIE jest podświetlona (0). Kiedy nie ma słońca (0), lampa świeci (1).

---PAGE---

## Spróbuj sam!

Poklikaj wejścia tych bramek i zobacz, jak prąd (lub jego brak) przepływa na sam koniec układu. Zobacz jak zachowuje się wynik.

<!-- INTERACTIVE: logic-gates-simulator -->

Widzisz? Sama, pojedyncza bramka jest dość banalna. Ale co się stanie, jeśli prąd, który wychodzi z bramki AND, puścimy od razu do wejścia bramki OR, a na koniec odwrócimy go przez NOT? 

Nagle z głupiego prądu tworzymy układ, który potrafi sprawdzić złożony warunek, np.: *"Pozwól wypłacić gotówkę z bankomatu, JEŚLI (Pin_Poprawny AND Karta_Wazna) AND NOT(Brak_Środków_Na_Koncie)"*. 

To wszystko dzieje się czysto fizycznie!

---PAGE---

## Klocki LEGO Wszechświata Cyfrowego

Tu zaczyna się prawdziwy inżynieryjny geniusz. 
Jeśli połączysz bramkę AND i dodasz na jej końcu bramkę NOT, powstanie tzw. bramka **NAND (Not-AND)**.

Dlaczego to tak ważne w historii ludzkości? Ponieważ inżynierowie odkryli, że używając **WYŁĄCZNIE milionów identycznych bramek NAND**, jesteś w stanie zbudować każdą inną bramkę, a co za tym idzie — każdy podzespół komputera. Pamięć, kalkulator, procesor.

Komputer pokładowy w statku misji Apollo 11, który zaniósł ludzi na Księżyc (AGC), był zbudowany niemal w całości z tysięcy identycznych bramek typu NOR (działających podobnie do NAND). Nie było tam żadnych "specjalistycznych procesorów graficznych" — po prostu mistrzowsko splecione pajęczyny, składające się z "LUB" i "NIE".

---PAGE---

> [!KEY] Bramki logiczne to fizyczny most, który łączy bezmyślny prąd elektryczny z matematyką i ludzką logiką. Pozwalają one "nauczyć" kawałek krzemu podejmowania decyzji na podstawie ścisłych reguł.

---PAGE---

## Food for Thought

Mamy układy, które potrafią podejmować decyzje logiczne (TAK, NIE, LUB). Ale w jaki sposób zmusić prąd, żeby zaczął **dodawać do siebie liczby**?

Wyobraź sobie, że używając kilku bramek logicznych (głównie tzw. bramki XOR i AND), można zbudować układ nazywany *Półsumatorem* (Half-Adder). Wrzucasz w niego dwa prądy oznaczające cyfry (np. 1 i 1), prąd płynie przez labirynt bramek i w magiczny sposób z drugiej strony wyskakuje liczba 2 (binarne 10). 

To właśnie miliony połączonych ze sobą *Półsumatorów* tworzą w Twoim procesorze ALU — Jednostkę Arytmetyczno-Logiczną. Matematyka w komputerze to tak naprawdę woda (prąd) znaleziona w bardzo, bardzo sprytnym hydraulicznym labiryncie.