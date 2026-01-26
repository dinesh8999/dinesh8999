import fs from "fs";

const USERNAME = "Naveenpanaganti";

async function run() {
  const profileRes = await fetch(`https://api.github.com/users/${USERNAME}`);
  const profile = await profileRes.json();

  const reposRes = await fetch(profile.repos_url);
  const repos = await reposRes.json();

  const stars = repos.reduce(
    (total, repo) => total + repo.stargazers_count,
    0
  );

  let readme = fs.readFileSync("README.md", "utf8");

  readme = readme
    .replace("{{USERNAME}}", USERNAME)
    .replace("{{REPOS}}", profile.public_repos)
    .replace("{{FOLLOWERS}}", profile.followers)
    .replace("{{STARS}}", stars)
    .replace("{{UPDATED}}", new Date().toUTCString());

  fs.writeFileSync("README.md", readme);
}

run();
