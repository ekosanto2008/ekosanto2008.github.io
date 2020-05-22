const base_url = "https://www.thesportsdb.com/api/v1/json/1/";
const league = "search_all_teams.php?l=English%20Premier%20League";
const table = "lookuptable.php?l=4328&s=1819";
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json
function getTeams() {
  if ('caches' in window) {
    caches.match(base_url + league).then(function(response) {
      if (response) {
        response.json().then(function (data) {
          var teamsHTML = "";
          data.teams.forEach(function(team) {
            teamsHTML += `
              <div class="card medium">
                <a href="./teamdetail.html?id=${team.idTeam}">
                  <div class="card-image waves-effect waves-block waves-light height:">
                    <img src="${team.strTeamLogo}" />
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate"><b>${team.strTeam}</b></span>
                  <p>since : ${team.intFormedYear}</p>
                  <p>Stadium : ${team.strStadium}</p>
                  <p><i class="fab fa-facebook"></i> ${team.strFacebook}</p>
                  <p><i class="fab fa-twitter"></i> ${team.strTwitter}</p>
                  <p><i class="fab fa-instagram"></i> ${team.strInstagram}</p>
                </div>
              </div>
            `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("leagues").innerHTML = teamsHTML;
        })
      }
    })
  }
  fetch(base_url + league)
    .then(status)
    .then(json)
    .then(function(data) {
      var teamsHTML = "";
          data.teams.forEach(function(team) {
            teamsHTML += `
              <div class="card medium">
                <a href="./teamdetail.html?id=${team.idTeam}&teamdetail=true">
                  <div class="card-image waves-effect waves-block waves-light height:">
                    <img src="${team.strTeamLogo}" />
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate"><b>${team.strTeam}</b></span>
                  <p>since : ${team.intFormedYear}</p>
                  <p>Stadium : ${team.strStadium}</p>
                  <p><i class="fab fa-facebook"></i> ${team.strFacebook}</p>
                  <p><i class="fab fa-twitter"></i> ${team.strTwitter}</p>
                  <p><i class="fab fa-instagram"></i> ${team.strInstagram}</p>
                </div>
              </div>
            `;
          });
           // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("leagues").innerHTML = teamsHTML;
  })
  .catch(error);
}

function getTeamById() {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(base_url + "lookupteam.php?id=" + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            // .... kode lain disembunyikan agar lebih ringkas
            var teamsHTML = `
              <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                  <img src="${data.teams[0].strTeamBadge}"/>
                </div>
                <div class="card-content">
                  <span class="card-title">${data.teams[0].strTeam}</span>
                  <p>${data.teams[0].strDescriptionEN}</p>
                </div>
              </div>
            `;
            document.getElementById("body-content").innerHTML = teamsHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }
    fetch(base_url + "lookupteam.php?id=" + idParam)
      .then(status)
      .then(json)
      .then(function(data) {
        // ... kode lain disembunyikan agar lebih ringkas 
        var teamsHTML = `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${data.teams[0].strTeamBadge}"/>
            </div>
            <div class="card-content">
              <span class="card-title">${data.teams[0].strTeam}</span>
              <p>${data.teams[0].strDescriptionEN}</p>
            </div>
          </div>
        `;
        document.getElementById("body-content").innerHTML = teamsHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getSavedTeams() {
  getAll().then(function(teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    var teamsHTML = "";
    teams.forEach(function(team) {
      // var description = team.strDescriptionEN.substring(0,100);
      teamsHTML += `
                  <div class="card">
                    <a href="./teamdetail.html?id=${team.idTeam}&favorite=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${team.strTeamBadge}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${team.strTeam}</span>
                      <p>${team.strDescriptionEN}</p>
                    </div>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("favorites").innerHTML = teamsHTML;
  });
}

function getSavedTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  
  getById(idParam).then(function(team) {
    itemHTML = '';
    var itemHTML = `
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="${team.strTeamBadge}" />
      </div>
      <div class="card-content">
        <span class="card-title">${team.strTeam}</span>
        ${snarkdown(team.strDescriptionEN)}<br>
      </div>
    </div>
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = itemHTML;
  });
}

function getStanding() {
  if ('caches' in window) {
    caches.match(base_url + table).then(function(response) {
      if (response) {
        response.json().then(function (data) {
          var teamsHTML = "";
          data.table.forEach(function(team) {
            teamsHTML += `
              <tr>
                <td>${team.name}</td>
                <td>${team.win}</td>
                <td>${team.draw}</td>
                <td>${team.loss}</td>
                <td>${team.total}</td>
              </tr>
            `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("standings").innerHTML = teamsHTML;
        })
      }
    })
  }
  fetch(base_url + table)
    .then(status)
    .then(json)
    .then(function(data) {
      var teamsHTML = "";
          data.table.forEach(function(team) {
            teamsHTML += `
            <tr>
              <td>${team.name}</td>
              <td>${team.win}</td>
              <td>${team.draw}</td>
              <td>${team.loss}</td>
              <td>${team.total}</td>
            </tr>
            `;
          });
           // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("standings").innerHTML = teamsHTML;
  })
  .catch(error);
}