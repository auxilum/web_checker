document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("upload");

  fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Get first sheet
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert sheet to JSON
      const tableData = XLSX.utils.sheet_to_json(sheet);

      // Filter JSON by desired parameters
      const filteredData = tableData.map((row) => ({
        sifra: row.ARTNO,
        name: row.ARTNAME_UNICODE,
        price: row.PRICE1,
      }));

      /*    // Compare each row with API
          for (const row of filteredData) {
            const apiData = await fetchProductBySifra(row.ARTNO);
            const resultRow = compareRow(row, apiData);
            addRowToTable(resultRow);
          } */

      console.log("Parsed Data:", filteredData);
      alert("Check console for parsed data.");
    };

    reader.readAsArrayBuffer(file);
  });

  /* // Mock function — replace with real API call
      async function fetchProductBySifra(sifra) {
        try {
          const response = await fetch(`https://your-api.com/products/${sifra}`);
          if (!response.ok) return null;
          return await response.json(); // should return {sifra, name, price}
        } catch (e) {
          console.error("API error for sifra:", sifra);
          return null;
        }
      }

    function compareRow(local, remote) {
  if (!remote) {
    return { ...local, status: "Missing in API" };
  }

  const nameMatch = local.name === remote.name;
  const priceMatch = Number(local.price) === Number(remote.price);

  if (nameMatch && priceMatch) {
    return { ...local, status: "Match" };
  }

  let status = "";
  if (!nameMatch) status += "Name mismatch; ";
  if (!priceMatch) status += `Price mismatch (API: ${remote.price})`;
  return { ...local, status: status.trim() };
}
 */
});
