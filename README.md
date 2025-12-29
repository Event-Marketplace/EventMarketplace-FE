# Event Marketplace - frontend

Frontend aplikacji Event Marketplace zbudowany w Next.js. Umożliwia zarządzanie wydarzeniami, zapisy uczestników oraz obsługę paneli: Administratora, Organizatora i Uczestnika.

---

## Project Status

Projekt w trakcie rozwoju - funkcjonalności są dodawane iteracyjnie. Trwają prace nad zarządzaniem wydarzeniami z poziomu administratora.

---

## Features

- Rejestracja i logowanie użytkowników
- Obsługa ról: Admin, Organizer, Member
- Panel organizatora
- Panel admina (w trakcie)
- Obsługa JWT (access + refresh)
- SSR / CSR rendering

---

## Tech Stack

- Next.js
- React 19
- TypeScript
- Tailwind CSS / Styled Components
- Axios / Fetch API
- SSR / CSR
- Redux (auth)

---

## Architecture

Podział na:
-  pages / app
-  components
-  services (komunikacja z API)
-  hooks

- Centralna obsługa autoryzacji
- Interceptory requestów HTTP

---

## Backend Integration

- Komunikacja REST API
- JWT przekazywane w nagłówkach
- Automatyczne odświeżanie tokenów
- Refresh Token trzymany w cookies (`HttpOnly`) w celu zwiększenia bezpieczeństwa

---

## UX/UI

- Responsywny interfejs
- Role-based navigation
- Prosty, czytelny layout

## Future Improvements

- Lepsze error handling
- Performance optimizations
- Testy E2E
