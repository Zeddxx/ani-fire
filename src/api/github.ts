export async function fetchGithubStars() {
  const response = await fetch("https://api.github.com/repos/Zeddxx/ani-fire", {
    method: "GET",
  });
  const data = await response.json();
  return data;
}
