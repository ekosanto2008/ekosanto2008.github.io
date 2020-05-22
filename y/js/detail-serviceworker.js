// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(function() {
          console.log("Pendaftaran ServiceWorker berhasil");
        })
        .catch(function() {
          console.log("Pendaftaran ServiceWorker gagal");
        });
    });
  } else {
    console.log("ServiceWorker belum didukung browser ini.");
  }


  document.addEventListener("DOMContentLoaded", function() {

    var urlParams = new URLSearchParams(window.location.search);
    var idT = urlParams.get("id");
    var isFromSaved = urlParams.get("favorite");
    var btnSave = document.getElementById("save");
    var btnDel = document.getElementById("delete");
    if (isFromSaved) {
      // Hide fab jika dimuat dari indexed db
      btnSave.style.display = 'none';
      
      // ambil artikel lalu tampilkan
      getSavedTeamById();

      btnDel.onclick = function() {
        console.log("Tombol delete di klik.");
        M.toast({html: 'Team berhasil dihapus !'})
        deleteTeam(idT);
        window.location.replace("index.html#home");
      }
    } else {
      btnDel.style.display = 'none';
      var item = getTeamById();
    }
    btnSave.onclick = function() {
      console.log("Tombol FAB di klik.");
      M.toast({html: 'Team berhasil ditambahkan ke favorite !'});
      item.then(function(team) {
        saveForLater(team);
      });
    };

  });