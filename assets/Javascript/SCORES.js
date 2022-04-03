function printHighscores() {
    //getting the high scores
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
    // high scores from high to low
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      // line times for the scores list
      var liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score;
  
      // show scores
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liTag);
    });
  }
  
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = clearHighscores;
  
  // show high scores 
  printHighscores();