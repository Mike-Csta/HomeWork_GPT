# HomeWork GPT

Aplikacja do Rozwiązywania Zadań Domowych to mobilna aplikacja napisana w React Native, która pomaga użytkownikom w rozwiązaniu zadań domowych. Użytkownik robi zdjęcie zadania, które następnie jest analizowane za pomocą Google Cloud Vision API (OCR), a wynik jest przekazywany do chatbotu opartego na GPT, który zwraca odpowiedź.

> mega prosta aplikacja, miałem fajny pomysł ale porzuciłem ze wzgldu na mature i projekty komercyjne

## Funkcje

* Umożliwia zrobienie zdjęcia zadania domowego.
* Analizuje zdjęcie za pomocą Google Cloud Vision API (OCR) do rozpoznawania tekstu.
* Przekazuje rozpoznany tekst do chatbotu GPT.
* Wyświetla odpowiedź chatbotu GPT w formie czatu.

## Technologie

* React Native
* Google Cloud Vision API
* GPT (Chatbot)

> wogule to jest powalone jak to sie ze sobą komunikuje bo jak to pisałem to nie istniało jeszcze api gpt więc musiałem szukać obejścia żeby korzystać dosłownie z chatu gpt xD

## Jak uruchomić

Aby uruchomić tę aplikację, musisz mieć zainstalowany Node.js oraz npm (Node Package Manager). Poniżej znajduje się przewodnik, jak uruchomić aplikację:

1. **Sklonuj repozytorium**

   Użyj git do sklonowania tego repozytorium na swój komputer lokalny. Otwórz terminal i wpisz następujące polecenie:

  ```bash
   git clone https://github.com/Mike-Csta/HomeWork_GPT.git
```

2. **Przejdź do katalogu projektu**

   Po sklonowaniu repozytorium, użyj polecenia `cd` do przejścia do katalogu projektu:

   ```bash
   cd nazwa_projektu
   ```

   Zmień `nazwa_projektu` na nazwę katalogu, do którego sklonowałeś projekt.

3. **Zainstaluj zależności**

   Teraz, kiedy jesteś w katalogu projektu, musisz zainstalować wszystkie zależności za pomocą npm. Wpisz następujące polecenie:

   ```bash
   npm install
   ```

   Może to chwilę potrwać. npm pobierze wszystkie zależności wymagane do uruchomienia twojego projektu.

4. **Uruchom aplikację**

   Po zainstalowaniu zależności, możesz uruchomić aplikację. Wpisz następujące polecenie:

   ```bash
   npm start
   ```

  5 **Pobierz expo go na telefon i zeskanuj kod qr**
