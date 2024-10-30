document.addEventListener("DOMContentLoaded", function() {
    var hour = new Date().getHours();
    var body = document.querySelector("body");

    if (hour >= 6 && hour < 10) {
        // Dimineață devreme: gradient mov-roz pal spre galben cald
        body.style.background = "linear-gradient(to right, #3a1c71,  #ffc87b)";
    } else if (hour >= 10 && hour < 15) {
        // Prânz: galben cald spre portocaliu
        body.style.background = "linear-gradient(to right, #ffc87b, #ff7e5f)";
    } else if (hour >= 15 && hour < 19) {
        // După-amiază: portocaliu plăcut spre albastru
        body.style.background = "linear-gradient(to right, #ff7e5f, #4facfe)";
    } else if (hour >= 19 && hour < 22) {
        // Seara: albastru mai intens spre mov
        body.style.background = "linear-gradient(to right, #4facfe, #3a1c71)";
    } else {
        // Noapte: mov închis
        body.style.background = "linear-gradient(to right, #3a1c71, #2c3e50)";
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var addTopicBtn = document.getElementById("addTopicBtn");
    var popupForm = document.getElementById("popupForm");
    var closeBtn = document.getElementsByClassName("close")[0];
    var cancelBtn = document.getElementById("cancelBtn");

    // Open the popup when the button is clicked
    addTopicBtn.onclick = function() {
        popupForm.style.display = "block";
    }

    // Close the popup when the close button is clicked
    closeBtn.onclick = function() {
        popupForm.style.display = "none";
    }

    // Close the popup when the cancel button is clicked
    cancelBtn.onclick = function() {
        popupForm.style.display = "none";
    }

    // Close the popup when clicking outside of the popup content
    window.onclick = function(event) {
        if (event.target == popupForm) {
            popupForm.style.display = "none";
        }
    }

    // Handle form submission
    document.getElementById("topicForm").onsubmit = function(event) {
        event.preventDefault();
        var topicName = document.getElementById("topicName").value;
        var topicDescription = document.getElementById("topicDescription").value;
        var topicPhoto = document.getElementById("topicPhoto").files[0];

        // Read the template file
        fetch('template.html')
            .then(response => response.text())
            .then(template => {
                // Replace placeholders with actual data
                var newPageContent = template
                    .replace(/{{topicName}}/g, topicName)
                    .replace(/{{topicDescription}}/g, topicDescription)
                    .replace(/{{topicPhoto}}/g, URL.createObjectURL(topicPhoto));

                // Create a new Blob with the new page content
                var blob = new Blob([newPageContent], { type: 'text/html' });
                var link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = topicName + '.html';
                link.click();

                // Close the popup
                popupForm.style.display = "none";
            });
    }
});