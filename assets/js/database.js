document.addEventListener("DOMContentLoaded", function () {
  let database = [];

  // Load and parse the CSV database, then display cards
  async function loadDatabase() {
    const response = await fetch("assets/uploads/database.csv");
    const text = await response.text();

    // Decode as UTF-8 to handle special characters
    const utf8decoder = new TextDecoder("utf-8");
    const decodedText = utf8decoder.decode(new TextEncoder().encode(text));
    const rows = decodedText.trim().split("\n").slice(1); // Skip header

    database = rows
      .map((row) => {
        const columns = parseCSVRow(row);
        if (columns.length < 5) return null;
        return {
          date: columns[0].trim(),
          authors: decodeEntities(columns[1].trim()),
          title: decodeEntities(columns[2].trim()),
          venue: decodeEntities(columns[3].trim()),
          link: columns[4].trim(),
        };
      })
      .filter((item) => item !== null);

    displayCards();
  }

  // Parse a single CSV row, handling quoted fields and commas
  function parseCSVRow(row) {
    const result = [];
    let current = "";
    let insideQuotes = false;
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      if (char === '"' && row[i + 1] === '"') {
        current += '"';
        i++;
      } else if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === "," && !insideQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  }

  // Render publication cards from the database array
  function displayCards() {
    let container = document.getElementById("database-cards");
    container.innerHTML = "";
    database.forEach((item) => {
      let doiURL = item.link.trim();
      let hasDOI = doiURL !== "" && doiURL !== "-" && /^https?:\/\//.test(doiURL);
      let isVenueEmpty = !item.venue || item.venue.trim() === "";
      let card = document.createElement("div");
      card.className = "database-card";
      if (hasDOI) {
        card.addEventListener("click", () => window.open(doiURL, "_blank"));
      }
      // Remove only the first and last double quotes if present
      let cleanTitle = item.title.replace(/^"(.*)"$/, "$1");
      // Highlight "Vickery, M." in authors
      let highlightedAuthors = item.authors.replace(
        /Vickery, M\./g,
        '<span style="font-weight: 600;">Vickery, M.</span>'
      );
      let flagHTML = "";
      if (hasDOI) {
        flagHTML = `<div class="doi-flag">Access Paper</div>`;
      }
      // Venue text or "Manuscript In Progress"
      let venueText = isVenueEmpty ? "Manuscript In Progress" : item.venue;
      card.innerHTML = `
        <div class="card-header">
          <div class="card-year"><strong>${item.date}</strong></div>
          ${flagHTML}
        </div>
        <div class="card-title">${cleanTitle}</div>
        <div class="card-authors">${highlightedAuthors}</div>
        <div class="card-venue">${venueText}</div>
      `;
      container.appendChild(card);
    });
  }

  // Decode HTML entities for special characters
  function decodeEntities(encodedString) {
    let textarea = document.createElement("textarea");
    textarea.innerHTML = encodedString;
    return textarea.value;
  }

  // Initialize database loading
  loadDatabase();
});

  function decodeEntities(encodedString) {
    let textarea = document.createElement("textarea");
    textarea.innerHTML = encodedString;
    return textarea.value;
  }

  // Initialize
  loadDatabase();