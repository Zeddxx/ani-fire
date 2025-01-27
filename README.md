> [!IMPORTANT]
> As of now, this project is marked as completed and will only receive minor changes, as I am busy with other work. If there are any fellow maintainers who can help improve this project further, please reach out to me. Peace out 🕊️

<h1 align="center">
  <img align="center" src="/public/anifire-icon.png" alt="anifire logo" width="66" /> </br>
  Anifire: Anime streaming website
</h1>

<p align="center">
  <i>
 This project is in development as for now.
</i>
  <br />
  <br />
  <img src="https://img.shields.io/badge/NextJs-Typescript-blue" alt="typescrpt badge" />
  <img src="https://img.shields.io/badge/NextAuth%20Credentials-8A2BE2" alt="next-auth" />
  <img src="https://img.shields.io/badge/Supabase-386641" alt="supabase" />
  <br/>
  <img src="https://img.shields.io/badge/react%20tanstack%20query-E63946" alt="tanstack" />
</p>

<h2 align="center">
  Introduction
</h2>
<p align="center">
  Welcome to the Awesome Anime Website, your go-to destination for watching anime without any annoying ads. This project is created for educational purposes only.</br >
  🎉 Dive into the captivating world of anime without interruptions! This website provides a seamless streaming experience, free from distracting advertisements. Enjoy your favorite anime series and movies with ease.
</p>

## Features

- Next.js app router with TypeScript for easier adaptation and faster learning for beginners.
- Explore a vast anime library without any popups or ads.
- Get information while hovering over anime images (using popovers).
- Minimal design to keep the application lightweight.
- SEO implementation that allows users to search "AniFire" on Google and find the site.
- Google Images can scrape images and videos from the AniFire website.
- Toggle between subbed and dubbed anime without page reloading (using Zustand for state management).
- Improved error handling (as of the latest update).
- Users can watch their favorite shows without interruption.
- Auto skip intro and outro options on player.
- Watch history feature to make it easier for users to pick up where they left off (using Zustand with storage persistence).
- Continue watching anime from where you left off (stored in localStorage).
- Responsive design that works on all screen sizes (using TailwindCSS to simplify styling—because I love TailwindCSS).
- Reusable components (I've created many components using ShadCN, not all of them, but enough to save time—don’t worry, I know how to build them from scratch 😅).
- Since I’m working solo on this project, implementing new features takes some time (would love if someone could help).

## Where Used What (Libraries):

- **Next.js**:

  - The entire application is wrapped with Next.js (using the `app/` router) and TypeScript.
  - **Why use Next.js instead of Vite-ReactJS or CRA (Create React App)?**: While Vite and CRA are great choices, I chose Next.js for its built-in features like server-side rendering (SSR) and static site generation (SSG). Another key reason is to leverage `next-auth` for authentication and its seamless integration with React.

- **TailwindCSS**:

  - My relationship with TailwindCSS has deepened ❤️ (One-sided love).
  - While I prefer using Tailwind for its utility-first approach, I can still work with plain CSS, SCSS, or frameworks like Bootstrap when needed.

- **Zustand (for application state management)**:

  - Zustand provides a simple and lightweight state management solution without requiring the wrapping of the entire application in providers (like React Context does). It allows for global state management in a very intuitive way.
  - **Persist state on `localStorage`**:
    - For:
      - Storing the user’s watch history, including video progress and playback timeline.
      - Storing UI preferences like sidebar menu toggle states.
      - Storing player settings such as "Skip Intro," "Skip Outro," and "Auto Next" options.

- **TanStack Query** (formerly React Query):

  - TanStack Query is a data-fetching library that allows for efficient and powerful data synchronization with the server, offering features like caching, pagination, and automatic re-fetching.
  - Used `useMutation` for making changes to data (e.g., on paginated data or API requests) like search results, categories, and genres.
  - Mostly used `useQuery` for fetching data efficiently and caching the results to minimize unnecessary API calls.
  - Also used `useQueries` to fetch data from multiple APIs simultaneously (such as fetching carousel data and scheduled anime data).

- **ShadCN UI Components**:

  - ShadCN is a utility-first, highly customizable set of React UI components designed to improve development speed and consistency. It provides ready-made components like buttons, modals, etc.

- **ArtPlayer**:

  - ArtPlayer is a highly customizable HTML5 video player designed for streaming media. It is used as the core player for AniFire to stream anime episodes without interruptions and offer a smooth playback experience.

- **React Icons**:

  - React Icons is a library that provides a collection of SVG icons that are customizable and easy to use within React applications. These are used to display various icons in the AniFire UI.

- **Prettier Formatter**:
  - Prettier is an opinionated code formatter that helps maintain consistent code formatting throughout the project, making the code easier to read and ensuring consistency across developers' contributions.

## For local development

- Clone the repository.

  ```bash
  git clone https://github.com/Zeddxx/ani-fire.git
  ```

- Install the npm or yarn or pnpm.

  ```bash
  npm install or yarn add or pnpm install
  ```

- Add the `.env` on root directory.
  > [!TIP]
  > path: root to anifire outside the app directory

```bash
## This should be a aniwatch api of ritesh repo (without last slash /)
NEXT_PUBLIC_BASE_ANIME_URL=E.G -> base_url/api/v2/hianime
```

## TODO'S

- [ ] Add Dashboard
- [ ] User authentication.
- [ ] Add commenting feature
  - [ ] Add nested comments.
- [ ] Implement admin dashboard functionality.
- [ ] Share buttons.
- [ ] Added Dub functionality.
- [x] Episode next and previous button.
  - [ ] Theater mode
  - [ ] Focus mode.
- [ ] Store users wishlist anime into database.
- [ ] SEO implementation.

## Credits

- [ghostRitesh](https://github.com/ghoshRitesh12) for aniwatch api.
- [HiAnime](https://hianime.to) 👋.
