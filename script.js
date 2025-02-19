$(document).ready(function () {
    let tasks = $(".mail-choice"); // Get all checkboxes
    let currentIndex = 0; // Start from first task

    function selectTasksWithAnimation(index = 0) {
        if (index >= tasks.length) {
            return; // Stop if all tasks are selected
        }

        let task = tasks.eq(index);
        task.prop("checked", true).trigger("change");

        updateTaskCounts(); // Update left panel dynamically
        displayLastTask(index); // Ensure last task is displayed

        setTimeout(() => {
            selectTasksWithAnimation(index + 1);
        }, 500); // Animate every 500ms
    }

    function displayLastTask(lastIndex) {
        $(".mail-contents").each(function (i) {
            if (i === lastIndex) {
                $(this).css({
                    "display": "block",
                    "transform": "scale(1.1)",
                    "transition": "transform 0.3s ease-in-out",
                });

                setTimeout(() => {
                    $(this).css("transform", "scale(1)");
                }, 300);
            } else {
                $(this).css("display", "none");
            }
        });

        // Ensure the last checkbox remains visually selected
        $(".msg").removeClass("selected-bg");
        $(".msg").eq(lastIndex).addClass("selected-bg");
    }

    function updateTaskCounts() {
        let checkedCount = $(".inbox .mail-choice:checked").length;
        let totalTasks = $(".inbox .mail-choice").length;

        $("#completed-count").html(checkedCount);
        $("#todo-count").html(totalTasks - checkedCount);
        $(".progress-bar").css("width", ((checkedCount / totalTasks) * 100) + "%");
        $(".progress-status").html(checkedCount + "/" + totalTasks);
    }

    // Automatically start selecting tasks one by one with animation
    setTimeout(() => {
        selectTasksWithAnimation();
    }, 1000);
});
