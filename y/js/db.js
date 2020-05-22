var dbPromised = idb.open("football", 3, function(upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("teams", {
      keyPath: "idTeam"
    });
    articlesObjectStore.createIndex("strTeam", "strTeam", { unique: false });
  });

  function saveForLater(team) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        console.log(team);
        store.put(team.teams[0]);
        return tx.complete;
      }).then(function() {
        console.log("Team berhasil di simpan.");
      }).catch(function() {
        console.error('Team gagal disimpan.');
      });

  }

  function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("teams", "readonly");
          var store = tx.objectStore("teams");
          return store.getAll();
        })
        .then(function(teams) {
          resolve(teams);
        });
    });
  }

  function getById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("teams", "readonly");
          var store = tx.objectStore("teams");
          return store.get(id);
        })
        .then(function(team) {
          resolve(team);
        });
    });
  }

function deleteTeam(idT) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction('teams', 'readwrite');
        var store = tx.objectStore('teams');
        store.delete(idT);
        return tx.complete;
      })
      .then(function() {
        console.log('Item has been deleted');
      });
}