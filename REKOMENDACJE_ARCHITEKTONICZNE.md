# Rekomendacje architektoniczne i SEO dla projektu CoffeeBlog

Data: 24.07.2024

## Wprowadzenie

Ten dokument zawiera zbiór rekomendacji mających na celu ulepszenie architektury, optymalizację pod kątem wyszukiwarek (SEO) oraz przygotowanie projektu na przyszły rozwój, w tym planowane wdrożenie kursów online.

## Podsumowanie audytu

Projekt jest zbudowany na frameworku Astro z renderowaniem po stronie serwera (SSR), co stanowi doskonałą bazę technologiczną. Jednak audyt wykazał kilka krytycznych obszarów, które wymagają natychmiastowej interwencji, aby w pełni wykorzystać potencjał SEO i zapewnić skalowalność.

## Kluczowe problemy

1.  **Niespójna implementacja SEO:** Zaawansowane metadane (Open Graph, JSON-LD) są obecne tylko w layoucie dla artykułów (`ArticleLayout.astro`), podczas gdy podstawowy layout (`BasicLayout.astro`) jest ich pozbawiony.
2.  **Krytyczny błąd konfiguracyjny:** Plik `astro.config.mjs` zawiera deweloperski adres URL (`http://localhost:4321`), co uniemożliwia poprawne generowanie kanonicznych URL i mapy strony w środowisku produkcyjnym.
3.  **Brak kluczowych narzędzi SEO:** W projekcie brakuje automatycznie generowanej mapy strony (`sitemap.xml`) oraz kanału RSS, co utrudnia indeksowanie nowych treści przez wyszukiwarki.
4.  **Brak optymalizacji zasobów:** Obrazy nie są kompresowane ani serwowane w nowoczesnych formatach (WebP/AVIF), co negatywnie wpływa na szybkość ładowania strony – kluczowy czynnik rankingowy.

## Rekomendowane działania

### 1. Centralizacja logiki SEO

**Cel:** Zapewnienie spójnej i zaawansowanej optymalizacji SEO na każdej podstronie.

**Zadania:**

-   **Stworzenie komponentu `src/components/Seo.astro`:**
    -   Komponent będzie przyjmował właściwości (props) takie jak `title`, `description`, `image`, `canonicalURL`, `type` (np. `website`, `article`).
    -   Wewnątrz komponentu zostanie zaimplementowana cała logika generowania metatagów:
        -   Podstawowe tagi (`<title>`, `<meta name="description">`).
        -   Link kanoniczny (`<link rel="canonical">`).
        -   Metadane Open Graph (dla Facebooka, LinkedIn itp.).
        -   Metadane Twitter Cards.
        -   Dane strukturalne (JSON-LD) w oparciu o przekazany `type` (np. `WebSite`, `BlogPosting`, `Course`).
        -   Kompletny zestaw ikon (favicon, apple-touch-icon).

### 2. Aktualizacja konfiguracji i dodanie integracji

**Cel:** Poprawa indeksowania i dostępności treści.

**Zadania:**

-   **Modyfikacja `astro.config.mjs`:**
    -   Należy zaktualizować pole `site` na rzeczywisty, produkcyjny adres URL witryny.
    -   `site: 'https://twoja-domena.pl', // <-- DO ZMIANY`
-   **Instalacja i konfiguracja integracji Astro:**
    -   `@astrojs/sitemap`: Do automatycznego generowania pliku `sitemap.xml`.
    -   `@astrojs/rss`: Do stworzenia kanału RSS dla artykułów, co ułatwi użytkownikom subskrypcję treści.
    -   `@astrojs/image`: Do wdrożenia optymalizacji obrazów.

### 3. Optymalizacja obrazów

**Cel:** Znaczące przyspieszenie czasu ładowania strony.

**Zadania:**

-   **Wdrożenie `@astrojs/image`:**
    -   Po instalacji integracji, należy zastąpić standardowe tagi `<img>` komponentami `<Image>` lub `<Picture>` z Astro.
    -   Pozwoli to na automatyczną kompresję, zmianę rozmiarów i serwowanie obrazów w nowoczesnych formatach (WebP, AVIF) dla przeglądarek, które je wspierają.

### 4. Refaktoryzacja layoutów

**Cel:** Uproszczenie kodu i zapewnienie jego łatwiejszego utrzymania.

**Zadania:**

-   **Aktualizacja `src/layouts/BasicLayout.astro` i `src/layouts/ArticleLayout.astro`:**
    -   Usunięcie całej dotychczasowej logiki z sekcji `<head>`.
    -   Zaimportowanie i użycie nowego komponentu `Seo.astro`, przekazując do niego odpowiednie dane (props) ze strony.
    -   Dzięki temu oba layouty staną się znacznie "lżejsze", a cała logika SEO będzie zarządzana z jednego miejsca.

## Podsumowanie korzyści

Wdrożenie powyższych rekomendacji przyniesie następujące korzyści:

-   **Znacząca poprawa SEO:** Dzięki spójnej implementacji metadanych, mapie strony i optymalizacji zasobów.
-   **Lepsza wydajność:** Skrócenie czasu ładowania dzięki optymalizacji obrazów.
-   **Wyższa jakość kodu:** Lepsza organizacja, mniejsza duplikacja i łatwiejsze zarządzanie projektem.
-   **Przygotowanie na przyszłość:** Solidna architektura, która ułatwi dodawanie nowych funkcjonalności, takich jak kursy, bez konieczności przepisywania istniejącej logiki.
