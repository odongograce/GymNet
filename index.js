document.addEventListener("DOMContentLoaded", () => {
    const contactUs = document.getElementById("contact-form");
    contactUs.addEventListener("submit", handlesContactForm);

    function handlesContactForm(e) {
        e.preventDefault();
        const fullname = document.getElementById("name").value
        const email = document.getElementById("email").value
        const message = document.getElementById("message").value

        const contactUsData = { fullname, email, message };


        fetch("http://localhost:3000/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contactUsData)
        })
            .then(() => {
                alert("Message received, we will get back to you!");
                contactUs.reset();
            })
    }

    function gettingContactUsDetails() {
        fetch("http://localhost:3000/contacts")
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
    }
    gettingContactUsDetails();

    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.addEventListener("mouseover", () => {
            card.style.border = "3px solid gold";
        });
        card.addEventListener("mouseout", () => {
            card.style.border = "none";
        });
         card.addEventListener("dblclick", () => {
            card.style.backgroundColor = "#f0f8ff";
        });
    });

  
    const workoutPlan = document.getElementById("workout-form");
    const workoutDescription = document.getElementById("workout-description");

    workoutPlan.addEventListener("submit", handlesWorkoutForm);

    function handlesWorkoutForm(e) {
        e.preventDefault();

        const gender = document.getElementById("gender").value;
        const equipment = document.getElementById("equipment").value;
        const goal = document.getElementById("goal").value;
        const mood = document.getElementById("mood").value;


        fetch("http://localhost:3000/workouts")
            .then(response => response.json())
            .then(data => {
                const workout = data.find(wkout =>
                    wkout.gender.toLowerCase() === gender.toLowerCase() &&
                    wkout.equipment.toLowerCase() === equipment.toLowerCase() &&
                    wkout.goal.toLowerCase() === goal.toLowerCase() &&
                    wkout.mood.toLowerCase() === mood.toLowerCase()

                );
                workoutDescription.innerHTML = "";

                if (workout) {
                    let content = "<h4>Exercises:</h4><ul>";
                    workout.exercises.forEach(ex => {
                        content += `<li>${ex}</li>`;
                    });
                    content += "</ul>";

                    workoutDescription.innerHTML = content;
                } else {
                    workoutDescription.innerHTML = `<p>No workout plan found for your selection.</p>`;
                }


                console.log(data);
            })

    }

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        if (scrollY > 300) {
            console.log("User scrolled down 300px");
        }
    });

   
});