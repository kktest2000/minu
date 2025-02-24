$(document).ready(function () {
    let tasks = $(".mail-choice"); // Get all checkboxes

    function displayTaskDetails(index) {
        $(".mail-contents").hide(); // Hide all task details
        $(".mail-contents").eq(index).show(); // Show only the most recently selected task

        $(".msg").removeClass("selected-bg");
        $(".msg").eq(index).addClass("selected-bg");
    }

    function updateTaskCounts() {
        let checkedCount = $(".inbox .mail-choice:checked").length;
        let totalTasks = $(".inbox .mail-choice").length;

        $("#completed-count").html(checkedCount); // Ensure completed count starts at 0
        $("#todo-count").html(totalTasks - checkedCount);
        $(".progress-bar").css("width", ((checkedCount / totalTasks) * 100) + "%");
        $(".progress-status").html(checkedCount + "/" + totalTasks);
    }

    // Ensure no task is pre-selected and counts are reset to zero
    tasks.prop("checked", false);
    $(".mail-contents").hide();
    $(".msg").removeClass("selected-bg");

    // Set completed count to zero at start
    $("#completed-count").html(0);
    $("#todo-count").html(tasks.length);

    // Remove any previous auto-selection animations
    $(".msg").off("animation");

    // Handle user selection
    tasks.on("change", function () {
        let index = tasks.index(this);

        if ($(this).prop("checked")) {
            displayTaskDetails(index); // Show the newly selected task
        } else {
            $(".mail-contents").eq(index).hide(); // Hide if unchecked
        }

        updateTaskCounts();
    });

    // Initial count update to reflect zero selections
    updateTaskCounts();
});
