$(document).ready(function () {
    let tasks = $(".mail-choice"); // Get all checkboxes

    // Ensure no task is pre-selected or displayed on page load
    tasks.prop("checked", false);
    $(".mail-contents").hide();
    $(".msg").removeClass("selected-bg");

    function displayTaskDetails(index) {
        $(".mail-contents").hide(); // Hide all task details
        $(".mail-contents").eq(index).show(); // Show only the most recent selection

        $(".msg").removeClass("selected-bg");
        $(".msg").eq(index).addClass("selected-bg");
    }

    function updateTaskCounts() {
        let checkedCount = $(".inbox .mail-choice:checked").length;
        let totalTasks = $(".inbox .mail-choice").length;

        $("#completed-count").html(checkedCount);
        $("#todo-count").html(totalTasks - checkedCount);
        $(".progress-bar").css("width", ((checkedCount / totalTasks) * 100) + "%");
        $(".progress-status").html(checkedCount + "/" + totalTasks);
    }

    // Ensure all checkboxes are unchecked and no tasks are displayed initially
    $(".mail-choice").prop("checked", false);
    $(".mail-contents").hide(); // Hide all task details
    $(".msg").removeClass("selected-bg");

    // Remove any auto-selection animation by ensuring no timers are running
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
});
