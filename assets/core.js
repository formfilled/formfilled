function displayIncompletes(map) {
  var html = "";
  for (const row of map) {
    var classC = !row[3] ? "error" : "warning";
    var thisHtml = "<article class='card'><header><h3>" + row[1] + "</h3><a href='https://docs.google.com/a/daybreakmetro.com/forms/d/e/1FAIpQLScJP_12FJ-dIu9nKhZPfx_0xPAl4LsQxmrDUldNH_kVdaXdGw/viewform?entry.1541790301=" + row[1] + "&entry.236861005' class='button " + classC + "' target='_blank'>CR Form</a></header></article>";
    //console.log("\n\nthisHtml");
    //console.log(thisHtml);
    html += thisHtml;
  }
  //console.log(html);
  document.getElementById("caseList").innerHTML = html;
}
