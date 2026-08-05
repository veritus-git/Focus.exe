# Co dzieje się po wpisaniu adresu strony internetowej?

## Zanim zaczniemy — dlaczego to jest fascynujące?

Wpisujesz `youtube.com`, naciskasz Enter, i po ułamku sekundy widzisz stronę. Proste? Na powierzchni — tak. Pod spodem? To jest **jedna z najbardziej złożonych operacji**, jakie współczesna technologia wykonuje na co dzień. W tym ułamku sekundy twój komputer kontaktuje się z dziesiątkami serwerów na różnych kontynentach, szyfruje dane, buduje bezpieczny tunel, pobiera tysiące plików i renderuje je w pikselowy obraz na twoim ekranie.

To jest jak zamówienie pizzy, tyle że kurier musi najpierw znaleźć adres restauracji w książce telefonicznej (DNS), potem zbudować zamkniętą, pancerną rurę między tobą a restauracją (TLS), a potem przesyłać ci pizzę kawałek po kawałku (HTTP), a ty składasz ją w całość (renderowanie).

---

## Krok 1 — DNS: "Jak się tam dostać?"

Twój komputer nie wie, czym jest `youtube.com`. Rozumie tylko **adresy IP** — ciągi cyfr typu `142.250.185.206`. Musi więc zamienić nazwę na adres. To robi **DNS** (Domain Name System).

### Jak to wygląda krok po kroku:

1. **Cache przeglądarki** — Może Chrome już zna ten adres? Jeśli odwiedziłeś YouTube w ostatnich minutach, adres jest w pamięci podręcznej. Gotowe.

2. **Cache systemu operacyjnego** — Jeśli nie, pyta system. Windows/Linux też trzyma cache DNS.

3. **Router** — Jeśli system nie wie, pyta twój router domowy.

4. **Resolver ISP** — Router pyta serwer DNS twojego dostawcy internetu (np. Orange, Play).

5. **Serwery root** — Jeśli ISP nie wie, pyta jeden z **13 serwerów root DNS** (oznaczonych literami A-M), które kierują go dalej.

6. **Serwer TLD** — Serwer root mówi: "`.com`? Zapytaj serwer TLD odpowiedzialny za domenę `.com`."

7. **Serwer autorytatywny** — Serwer TLD mówi: "`youtube.com`? Zapytaj serwer autorytatywny Google'a." Ten ostatecznie odpowiada: **"142.250.185.206"**.

Cały ten proces trwa **20-100 milisekund**. Za każdym razem, gdy wpisujesz adres, twoje zapytanie potencjalnie okrąża pół globu.

> **Ciekawostka:** Tych 13 serwerów root to w rzeczywistości setki fizycznych maszyn rozsianych po świecie, działających pod jednym adresem IP dzięki technologii **Anycast**. Zapytanie trafia do tego, który jest najbliżej ciebie.

---

## Krok 2 — TCP: "Zbudujmy połączenie"

Masz adres IP. Teraz musisz **nawiązać rozmowę** z serwerem YouTube'a. Internet nie jest jak radio — nie krzyczysz w eter. Używasz **TCP** (Transmission Control Protocol), który gwarantuje, że dane dojdą w całości i w odpowiedniej kolejności.

TCP nawiązuje połączenie przez rytuał zwany **Three-Way Handshake** (uścisk dłoni w trzech krokach):

1. **SYN** — Twój komputer wysyła: "Hej, chcę pogadać!" (synchronizacja)
2. **SYN-ACK** — Serwer odpowiada: "OK, słyszę cię, też chcę pogadać!" (potwierdzenie + synchronizacja)
3. **ACK** — Twój komputer: "Super, zaczynamy!" (potwierdzenie)

Dopiero teraz możecie wymieniać dane. Ten uścisk dłoni trwa **jeden RTT** (Round Trip Time) — czas podróży pakietu tam i z powrotem. Do serwera w Europie to ~20ms. Do USA? ~100ms. Do Australii? ~300ms.

> **Analogia:** TCP to rozmowa telefoniczna — musisz się najpierw połączyć, obaj wiecie że drugi słucha, i jeśli coś nie dojdzie (szum na linii), zostanie powtórzone. Alternatywa — **UDP** — to jak wyrzucanie listów przez okno. Szybciej, ale nie wiesz czy doszły.

---

## Krok 3 — TLS: "Zaszyfrujmy wszystko"

Masz połączenie TCP, ale jest **nieszyfrowane**. Każdy na drodze (twój ISP, rząd, haker na kawiarni WiFi) mógłby czytać twoje dane. Dlatego następuje **TLS Handshake** — budowanie szyfrowanego tunelu.

1. **Client Hello** — Twoja przeglądarka mówi: "Umiem takie szyfry: AES-256, ChaCha20... Wybieraj."
2. **Server Hello** — Serwer wybiera szyfr i wysyła swój **certyfikat** (podpisany cyfrowo dowód tożsamości).
3. **Weryfikacja** — Przeglądarka sprawdza, czy certyfikat jest prawdziwy (podpisany przez zaufany urząd certyfikacji).
4. **Wymiana kluczy** — Obie strony generują wspólny **klucz sesyjny** za pomocą sprytnej matematyki (np. algorytm Diffie-Hellman), **bez przesyłania go jawnie!**
5. **Szyfrowana komunikacja** — Od teraz wszystko leci przez pancerny tunel.

> **Dlaczego to jest genialne:** Dzięki Diffie-Hellman dwie strony mogą uzgodnić tajny klucz, rozmawiając na oczach wszystkich, a nikt podsłuchujący nie jest w stanie go odgadnąć. To jeden z najpiękniejszych wynalazków kryptografii.

---

## Krok 4 — HTTP: "Daj mi tę stronę"

Tunel gotowy. Przeglądarka wysyła **HTTP Request** (żądanie):

```
GET / HTTP/2
Host: youtube.com
Accept: text/html
```

Tłumacząc: "Daj mi główną stronę YouTube'a, w formacie HTML."

Serwer odpowiada **HTTP Response**:

```
HTTP/2 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 512847

<!DOCTYPE html>
<html>...
```

Status `200` oznacza "wszystko OK". Inne kody, które pewnie znasz:
- **301** — Strona przeniesiona na inny adres
- **404** — Nie znaleziono (ten słynny)
- **500** — Serwer się wysypał

Ale to dopiero początek. Sam HTML to szkielet — przeglądarka widzi w nim odniesienia do **setek dodatkowych plików**: CSS (styl), JavaScript (logika), obrazy, fonty, filmy.

Każdy z nich wymaga **osobnego HTTP requesta**. Dlatego nowoczesne przeglądarki używają **HTTP/2**, który potrafi pobierać wiele plików jednocześnie przez jedno połączenie TCP (tzw. **multiplexing**).

---

## Krok 5 — Renderowanie: "Pokaż mi to na ekranie"

Przeglądarka ma HTML, CSS i JS. Teraz musi to zamienić w piksele.

1. **Parsowanie HTML** — Buduje **DOM** (Document Object Model) — drzewiastą strukturę elementów strony.
2. **Parsowanie CSS** — Buduje **CSSOM** — drzewo stylów.
3. **Render Tree** — Łączy DOM i CSSOM w jedno drzewo, usuwając niewidoczne elementy.
4. **Layout** — Oblicza pozycję i rozmiar każdego elementu na ekranie.
5. **Paint** — Rysuje piksele — kolory, tekst, cienie, gradienty.
6. **Composite** — Łączy warstwy (np. animowane elementy na osobnych warstwach GPU).

Cały ten proces od kliknięcia Enter do zobaczenia strony nazywa się **Time to First Paint** i w dobrze zoptymalizowanych stronach trwa **poniżej 500 milisekund**.

---

## 🧠 Pomyśl o tym...

- W ułamku sekundy między naciśnięciem Enter a zobaczeniem strony twoje dane pokonują **tysiące kilometrów**, przechodzą przez **dziesiątki routerów**, są **szyfrowane i deszyfrowane**, a twoja przeglądarka wykonuje **miliony operacji** na otrzymanym kodzie. A ty widzisz tylko ładną stronę. Cała ta złożoność jest celowo **niewidoczna**.

- DNS jest jednym z najstarszych i najważniejszych systemów internetu — i jednocześnie jednym z najbardziej podatnych na ataki. **DNS Spoofing** może podmienić adres IP, kierując cię na fałszywą stronę. Dlatego powstał **DNSSEC** — system podpisów cyfrowych dla DNS.

- HTTP/3 (najnowsza wersja) **nie używa już TCP**. Przeszedł na **QUIC** — protokół oparty na UDP z wbudowanym szyfrowaniem. Powód? Three-Way Handshake TCP + TLS Handshake to za dużo opóźnienia. QUIC łączy oba w jedno.
