// ==UserScript==
// @name        New script - webfx.com
// @namespace   Violentmonkey Scripts
// @match       http://kelio:8089/*
// @grant       none
// @version     1.0
// @author      -
// @description 02/09/2021, 08:37:46
// ==/UserScript==

async function main() {
  document.querySelectorAll('link[rel="stylesheet"]').forEach((el) => {
    el.remove();
  });

  // <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">

  document.body.classList.add("bg-gray-100");

  // const tailwindCSS = document.createElement("link")
  // tailwindCSS.setAttribute("href", "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css")
  // tailwindCSS.setAttribute("rel", "stylesheet")
  // tailwindCSS.setAttribute("type", "text/css")
  // document.head.append(tailwindCSS)

  const reconnect = document.querySelector("[href='/open']");
  if (reconnect) {
    reconnect.click();
    return;
  }

  const logo = document.querySelector(
    "#formAction > div:nth-child(4) > div.banniere_title > center > table > tbody > tr > td:nth-child(1) > img",
  );
  logo.classList.add(
    "mx-2",
    "backdrop-blur",
    "backdrop-filter",
    "p-4",
    "rounded",
    "shadow-sm",
    "border",
  );
  const logoClient = document.querySelector(".logo_client");
  logoClient.classList.add("mx-2", "backdrop-blur", "border", "rounded", "shadow-sm", "px-4");

  const dateTable = document.querySelector(
    "#formAction > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td > table:nth-child(7) > tbody > tr:nth-child(2) > td:nth-child(1) > table",
  );
  if (dateTable) {
    dateTable.removeAttribute("class");
    dateTable.classList.add("styled-table", "bg-white", "table-auto");
  }

  const title = document.createElement("h1");
  title.innerText = "Historique des badgeages";
  title.classList.add("text-lg", "font-bold", "mt-2");

  const dateTableSel = document.querySelector(
    "#formAction > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td > table:nth-child(7) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td > table",
  );
  if (dateTableSel) {
    dateTableSel.classList.add("styled-table", "bg-white", "table-auto");
  }

  const cumulTable = document.querySelector(
    "#formAction > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td > table.bordered",
  );
  if (cumulTable) {
    cumulTable.classList.add("styled-table", "bg-white", "table-auto");
  }

  const detailCumulTable = document.querySelector(
    "#formAction > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td > table.bordered",
  );
  if (detailCumulTable) {
    detailCumulTable.classList.add("styled-table", "bg-white", "table-auto");
  }

  const messageBadgeageOld = document.querySelector(".badgeuseVirtuelle li");
  const messageBadgeage = document.createElement("p");
  messageBadgeage.classList.add("mt-2");
  if (messageBadgeageOld) {
    messageBadgeage.textContent = messageBadgeageOld.textContent;
  }

  const old = document.body.querySelectorAll("*");
  const oldContainer = document.createElement("section");
  oldContainer.classList.add(
    "shadow-sm",
    "container",
    "flex",
    "flex-wrap",
    "justify-center",
    "p-4",
    "bg-white",
    "mt-2",
    "mx-auto",
    "rounded-2xl",
    "backdrop-filter",
    "backdrop-blur",
  );
  oldContainer.classList.add("old");
  const toMove = document.querySelectorAll("#formAction, #msgWait, #barreTitre");

  for (let i = 0; i < old.length; i++) {
    const el = old[i];
    el.removeAttribute("style");
    // el.removeAttribute("class")
    // el.removeAttribute("id");
    el.removeAttribute("width");
    el.removeAttribute("height");
    el.removeAttribute("align");
    el.removeAttribute("bgcolor");
  }

  toMove.forEach((move) => {
    oldContainer.append(move);
  });

  console.info("ViolentMonkey", "style reset");

  const btnClasses = [
    "rounded-lg",
    "border-opacity-50",
    "shadow-sm",
    "px-3",
    "py-2",
    "m-2",
    "font-sans",
    "text-white",
    "hover:shadow-lg",
    "transition-all",
    "outline-none",
    "backdrop-blur-lg",
    "backdrop-filter",
  ];

  const badgeur = document.createElement("button");
  if (badgeur) {
    badgeur.innerText = "Badger 👆";
    badgeur.classList.add(
      ...btnClasses,
      "mx-auto",
      "block",
      "bg-gradient-to-r",
      "from-yellow-100",
      "to-yellow-300",
      "hover:from-yellow-200",
      "hover:to-yellow-300",
      "focus:from-yellow-300",
      "focus:to-yellow-400",
      "text-5xl",
      "py-10",
      "px-10",
      "rounded-3xl",
      "backdrop-blur",
      "backdrop-filter",
    );
    badgeur.classList.remove("text-white");
    badgeur.addEventListener("click", () => {
      fcDoAction("BADGER_ES");
      console.info("Badgeage");
    });
  }

  const pageBadgeur = document.createElement("button");
  pageBadgeur.innerText = "Badgeur 💳";
  pageBadgeur.classList.add(
    ...btnClasses,
    "bg-gradient-to-r",
    "from-blue-400",
    "to-blue-500",
    "hover:from-blue-500",
    "hover:to-blue-600",
    "focus:from-blue-600",
    "focus:to-blue-700",
  );
  pageBadgeur.addEventListener("click", () => {
    fcChangeAppli(1, "null");
    console.info("page badgeur");
  });

  const pageResult = document.createElement("button");
  pageResult.innerText = "Temps Badgeages ⏲";
  pageResult.classList.add(
    ...btnClasses,
    "bg-gradient-to-r",
    "from-blue-400",
    "to-blue-500",
    "hover:from-blue-500",
    "hover:to-blue-600",
    "focus:from-blue-600",
    "focus:to-blue-700",
  );
  pageResult.addEventListener("click", () => {
    fcChangeAppli(3, "null");
    console.info("page result");
  });

  const detailCumul = document.createElement("button");

  detailCumul.innerText = "Détails Cumuls 🧮";
  detailCumul.classList.add(
    ...btnClasses,
    "bg-gradient-to-r",
    "from-blue-400",
    "to-blue-500",
    "hover:from-blue-500",
    "hover:to-blue-600",
    "focus:from-blue-600",
    "focus:to-blue-700",
  );
  detailCumul.addEventListener("click", () => {
    fcAfficherDetailCumuls();
    console.info("page cumuls");
  });

  const displayOld = document.createElement("button");
  displayOld.innerText = "👁️";
  displayOld.title = "cacher le conteneur 'old'";
  displayOld.classList.add(
    ...btnClasses,
    "bg-gradient-to-r",
    "from-red-400",
    "to-red-500",
    "hover:from-red-500",
    "hover:to-red-600",
    "focus:from-red-600",
    "focus:to-red-700",
  );
  displayOld.addEventListener("click", () => {
    oldContainer.classList.toggle("show");
  });

  const main = document.createElement("main");
  const buttonContainer = document.createElement("section");
  const content = document.createElement("section");
  main.classList.add("justify-center", "m-2");
  buttonContainer.classList.add(
    "buttons",
    "shadow-sm",
    "container",
    "flex",
    "flex-wrap",
    "justify-center",
    "p-4",
    "bg-white",
    "mx-auto",
    "backdrop-blur",
    "backdrop-filter",
    "rounded-2xl",
    "relative",
  );
  content.classList.add(
    "content",
    "shadow-sm",
    "container",
    "p-4",
    "bg-white",
    "mt-2",
    "mx-auto",
    "overflow-x-auto",
    "backdrop-blur",
    "backdrop-filter",
    "rounded-2xl",
  );

  document.body.append(main);
  main.append(buttonContainer, content);
  const logosContainer = document.createElement("section");
  logosContainer.append(logoClient, logo);
  logosContainer.classList.add("flex", "flex-wrap");
  buttonContainer.append(logosContainer, displayOld, pageBadgeur, pageResult);
  content.append(badgeur);
  if (dateTable && dateTableSel) {
    content.append(document.createElement("hr"), title, dateTable, dateTableSel);
    buttonContainer.append(detailCumul);
  }
  if (cumulTable) {
    content.append(cumulTable);
  }

  if (detailCumulTable) {
    content.append(detailCumulTable);
  }

  if (messageBadgeageOld) {
    const hr = document.createElement("hr");
    content.append(hr, messageBadgeage);
  }

  const hr = document.createElement("hr");
  hr.classList.add("my-2");
  content.append(hr, logosContainer);

  main.append(oldContainer);
}

main();
