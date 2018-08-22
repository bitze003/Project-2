$(document).ready(function() {
    var $newPitchInput = $("input.new-pitch");
    var $pitchContainer = $(".pitch-container");
    // event listeners
    $(document).on("click", "button.submit", insertPitch);
    // $(document).on("click", "button.up-vote", editPitch);
    // $(document).on("click", "button.down-vote", editPitch);

    var pitches = [];

    // start the show
    getPitches();

    function initializeRows(pitches) {
        $pitchContainer.empty();
        var rowsToAdd = [];
        for (var i = 0; i < pitches.length; i++) {
            rowsToAdd.push(createNewRow(pitches[i]));
        }
        $pitchContainer.prepend(rowsToAdd);
    }

    function getPitches() {
        $.get("/api/pitches", function (data) {
            pitches = data;
            initializeRows(pitches);
        });
    }

    // function editPitch() {
    //     if(this.class)
    // }

    function createNewRow(pitch) {
        var $newInputRow = $(
            [
                "<li class='list-group-item pitch-item'>",
                "<button class='up-vote btn btn-primary'><i class='fas fa-arrow-up'></i></button>",
                "<button class='down-vote btn btn-danger'><i class='fas fa-arrow-down'></i></button>",
                "<span>",
                pitch.text,
                "</span>",
                "</li>"
            ].join("")
        );

        $newInputRow.find("button.up-vote").data("id", pitch.id);
        $newInputRow.find("button.down-vote").data("id", pitch.id);
        // $newInputRow.data("todo", todo);
        // if (todo.complete) {
        //     $newInputRow.find("span").css("text-decoration", "line-through");
        // }
        return $newInputRow;
    }

    function insertPitch(event) {
        event.preventDefault();
        var pitch = {
            text: $newPitchInput.val().trim(),
            score: 0
        };

        $.post("/api/pitches", pitch);

        $newPitchInput.val("");
    }
});