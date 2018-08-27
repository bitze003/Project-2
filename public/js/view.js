
$(document).ready(function () {

  var $newPitchInput = $("input.new-pitch");
  var $pitchContainer = $(".pitch-container");
  // event listeners
  $(document).on("click", "button.submit", insertPitch);
  $(document).on("click", "button.up-vote", upVote);
  $(document).on("click", "button.down-vote", downVote);


  var pitches = [];

  // start the show
  getPitches();

  function initializeRows(pitches) {
    $pitchContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < pitches.length; i++) {
      rowsToAdd.push(createNewRow(pitches[i]));
    }

    
    console.log(rowsToAdd);
    $pitchContainer.append(rowsToAdd);
  }

  function getPitches() {
    $.get("/api/pitches", function (data) {
      pitches = data;
      pitches.sort(
        function(a,b){
          return b.score - a.score
        }
      )
      initializeRows(pitches);
    });
  }

  function upVote(event) {
    event.stopPropagation();
    let updatedPitch = $(this).data();
    updatedPitch.score += 1;
    
    updatePitch(updatedPitch);
  }

  function downVote(event) {
    event.stopPropagation();
    let updatedPitch = $(this).data();
    updatedPitch.score -= 1;

    updatePitch(updatedPitch);
  }

  function updatePitch(pitch) {
    $.ajax({
      method: "PUT",
      url: "/api/pitches",
      data: pitch
    }).then(getPitches);
  }

  function createNewRow(pitch) {
    var $newInputRow = $(
      [
        "<li class='list-group-item pitch-item'>",
        "<span style='margin-right:10px;'>",
        pitch.score,
        "</span>",
        "<button class='up-vote btn btn-primary'><i class='fas fa-arrow-up'></i></button>",
        "<button class='down-vote btn btn-danger'><i class='fas fa-arrow-down'></i></button>",
        "<span>",
        pitch.text,
        "</span>",

        `<div class='comment-container'>
        <div class='commmentsAbove'>
        <div class='col-sm-12 col-sm-offset-2'>
        <br>
          <h6>Comments</h6>
          <hr>
          <div id='comments-area'></div>
        </div>

      <div class='row'>
        <div class='col-sm-12 col-sm-offset-2'>
          <p class='cool-font'>Name</p>
          <input class='form-control' type='text' id='author' placeholder='Enter Your Name'>
          <br>
          <p class='cool-font'>Comments</p>
          <textarea class='form-control' rows='3' id='comments-box' placeholder='Enter comments Here!'></textarea>
          <br>
          <button id='comments-submit' data-pass-id=${pitch.id} class='btn btn-lg pull-right'>Submit!</button>
        </div>
      </div>
      </div>
        </div>`,
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.up-vote").data("id", pitch.id);
    $newInputRow.find("button.up-vote").data("score", pitch.score);
    $newInputRow.find("button.down-vote").data("id", pitch.id);
    $newInputRow.find("button.down-vote").data("score", pitch.score);
    $newInputRow.data("pitch", pitch);
    
    return $newInputRow;
  }

  function insertPitch(event) {
    event.preventDefault();
    var pitch = {
      text: $newPitchInput.val().trim(),
      score: 0
    };

    $.post("/api/pitches", pitch, getPitches);
    $newPitchInput.val("");
  }
});

 //This is Where the comments code will begin
  //For each idea, users will be able to comment their thoughts
  //The code right below will open all the ideas and allow users to comment when clicked
  $(document).on("click", "li.pitch-item", function (event) {
    console.log("CLICKED" + " " + $(this));
    // console.log("CLICKED")
    // console.log(this);
    $(".comment-container").css("display", "block");
    // Make a newComments object
    // ($(this).attr("#data-pitchid"))
  });
