type CurrentlyWatching = {
  episodeId: string;
  title: string;
  poster: string;
  episodeNumber: number;
};

export default function useLocalStorage() {
  function getAnimeWatched(): CurrentlyWatching[] | null {
    if (typeof window !== "undefined") {
      const watched = localStorage.getItem("watched");
      if (watched !== null) {
        return JSON.parse(watched);
      }
    }
    return null;
  }

  function setAnimeWatch({
    episodeId,
    episodeNumber,
    poster,
    title,
  }: CurrentlyWatching): void {
    if (typeof window !== "undefined") {
      const watched = localStorage.getItem("watched");
      let toSave: CurrentlyWatching[] = [];

      if (watched !== null) {
        // Parse the existing watched data
        toSave = JSON.parse(watched);

        // Remove the existing entry with the same title, if any
        toSave = toSave.filter((item) => item.title !== title);

        // Add the new entry
        toSave.push({ episodeId, episodeNumber, poster, title });
      } else {
        // If there is no existing watched data, create a new array with the current entry
        toSave.push({ episodeId, episodeNumber, poster, title });
      }

      // Save the updated array back to local storage
      localStorage.setItem("watched", JSON.stringify(toSave));
    }
  }

  function deleteAnime(id: string) {
    if (typeof window !== "undefined") {
      const watched = localStorage.getItem("watched");

      if (watched !== null) {
        const toRemove: CurrentlyWatching[] = JSON.parse(watched);

        // remove the entry
        const updatedAnime = toRemove.filter((item) => item.episodeId !== id);

        localStorage.setItem("watched", JSON.stringify(updatedAnime));
      }
    }
  }

  return {
    getAnimeWatched,
    setAnimeWatch,
    deleteAnime,
  };
}
