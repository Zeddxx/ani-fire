> [!NOTE]
> I appreciate users logging into their accounts, but at present, I haven't implemented any functionality specifically for logged-in users. I plan to implement this in the upcoming days, but I'm currently occupied with other tasks. Thank you for your understanding.

> This project is for educational purpose only and i am not making any revenew from this website.

<img src="/public/ani-fire-cover.png" alt="banner image"/>

<h1 align="center">
  <img src="/public/assets/nav.gif" alt="anifire logo" width="66" /> </br>
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
  🎉 Dive into the captivating world of anime without interruptions! Our website provides a seamless streaming experience, free from distracting advertisements. Enjoy your favorite anime series and movies with ease.
</p>



<details>
  <summary>
    Some screenshot here or can say the demo is here!
  </summary>
  <img src="/public/cover.png" alt="intro image" />
</details>

## Features

- General
  - Free ad-supported streaming service
  - User-friendly interface
  - Mobile responsive
  - Fast page load
  - Authentication
  - Profile picture uploader
  - update account
  - Toggle the theme mode (currently its only `Light`, `Dark` and `System`)
  - Toggle between sub and dub anime.
- Watch Page
  - Player
    - Hold and drag to forward or backward the video.
    - Quality setting
    - Hold to fast forward video by 3.0x speed
  - Watching History
    - User can easily dive into the recents episodes they were watching


## For local development
> [!CAUTION]
> If you want to self-host this app, please note that it is only allowed for personal use. Commercial use is not permitted, and including ads on your self-hosted site may result in actions such as site takedown.

- Clone the repository.
  ```bash
  git clone https://github.com/Zeddxx/ani-fire.git
  ```

- Install the npm or yarn or pnpm.
  ```bash
  npm install or yarn add
  ```

- Add the `.env` on root directory.
> [!TIP]
> path: root to anifire outside the app directory

```bash
## This should be a aniwatch api of ritesh repo (without last slash /)
NEXT_PUBLIC_ANIME_URL=

## Goto uploadthing signin and create an project and you will get.
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

## database should any postgresSql (prefered: supabase)
DATABASE_URL=

## Generate authsecret online or by using the ssl.
AUTH_SECRET=
```

## TODO'S
- [ ] Add Dashboard
- [x] User authentication.
- [x] Add commenting feature
  - [ ] Add nested comments.
- [ ] Implement admin dashboard functionality.
- [ ] Share buttons.
- [x] Added Dub functionality.
- [x] Episode next and previous button.
  - [ ] Theater mode
  - [ ] Focus mode.
- [ ] Store users wishlist anime into database.
- [ ] SEO implementation.

## Credits

- [ghostRitesh](https://github.com/ghoshRitesh12) for aniwatch api.
- [Aniwatch](https://aniwatch.to) for inspiring me.


