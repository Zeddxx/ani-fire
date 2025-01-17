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

- General
  - [x] Free ad-supported streaming service.
  - [x] User-friendly interface.
  - [x] Mobile responsive.
  - [ ] Toggle between sub and dub anime.
- Watch Page
  - Player
    - [x] Quality setting
    - [x] Hold to fast forward video by 3.0x speed
  - Watching History
    - [x] User can easily dive into the recents episodes they were watching

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
