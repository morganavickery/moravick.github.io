document.addEventListener("DOMContentLoaded", function () {
  let database = [];

  async function loadDatabase() {
    const response = await fetch("assets/uploads/database.csv");
    const text = await response.text();

    // Ensure text is read as UTF-8 (Handling Special Characters)
    const utf8decoder = new TextDecoder("utf-8");
    const decodedText = utf8decoder.decode(new TextEncoder().encode(text));

    const rows = decodedText.trim().split("\n").slice(1); // Skip header row

    database = rows
      .map((row) => {
        const columns = parseCSVRow(row);

        if (columns.length < 5) return null; // Ensure all 5 fields are present

        return {
          date: columns[0].trim(),
          authors: decodeEntities(columns[1].trim()), // Decode special characters
          title: decodeEntities(columns[2].trim()),
          venue: decodeEntities(columns[3].trim()),
          link: columns[4].trim(),
        };
      })
      .filter((item) => item !== null);

    displayCards();
  }

  function parseCSVRow(row) {
    const result = [];
    let current = "";
    let insideQuotes = false;

    for (let i = 0; i < row.length; i++) {
      const char = row[i];

      if (char === '"' && row[i + 1] === '"') {
        current += '"'; // Handle escaped quotes (e.g., `""`)
        i++; // Skip next quote
      } else if (char === '"') {
        insideQuotes = !insideQuotes; // Toggle insideQuotes flag
      } else if (char === "," && !insideQuotes) {
        result.push(current.trim()); // Add column when outside quotes
        current = "";
      } else {
        current += char;
      }
    }

    result.push(current.trim()); // Add last column
    return result;
  }

  // Display Cards Dynamically
  function displayCards() {
    let container = document.getElementById("database-cards");
    container.innerHTML = ""; // Clear previous entries

    database.forEach((item) => {
      let doiURL = item.link.trim();
      let hasDOI =
        doiURL !== "" && doiURL !== "-" && /^https?:\/\//.test(doiURL);

      let card = document.createElement("div");
      card.className = "database-card";

      if (hasDOI) {
        card.addEventListener("click", () => window.open(doiURL, "_blank"));
      }

      // Remove only the first and last double quotes if they exist
      let cleanTitle = item.title.replace(/^"(.*)"$/, "$1");

      card.innerHTML = `
            <div class="card-header">
                <div class="card-year"><strong>${item.date}</strong></div>
                ${hasDOI ? `<div class="doi-flag">Access Paper</div>` : ""}
            </div>
            <div class="card-authors">${item.authors}</div>
            <div class="card-title">${cleanTitle}</div>
            <div class="card-venue">${item.venue}</div>
        `;

      container.appendChild(card);
    });
  }

  function decodeEntities(encodedString) {
    let textarea = document.createElement("textarea");
    textarea.innerHTML = encodedString;
    return textarea.value;
  }

  // Initialize
  loadDatabase();
});


