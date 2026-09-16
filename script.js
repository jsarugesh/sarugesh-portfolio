// ========================================
// SARUGESH INTERACTIVE PORTFOLIO
// ========================================


// ========================================
// CHARACTER
// ========================================

const character =
    document.querySelector(".sarugesh-character");


// Character entrance

window.addEventListener("load", () => {

    if (character) {

        character.style.opacity = "0";

       character.style.transform = "translate(-50%, calc(-50% + 40px)) scale(0.95)";
        setTimeout(() => {

            character.style.transition =
                "opacity 1s ease, transform 1s ease";

            character.style.opacity = "1";

            character.style.transform = "translate(-50%, -50%) scale(1)";
        }, 300);

    }

});


// Character follows mouse

document.addEventListener("mousemove", (event) => {

    if (!character) return;

    const x =
        (event.clientX / window.innerWidth) - 0.5;

    const y =
        (event.clientY / window.innerHeight) - 0.5;

    const moveX = x * 12;
    const moveY = y * 8;

    character.style.setProperty(
        "--mouse-x",
        `${moveX}px`
    );

    character.style.setProperty(
        "--mouse-y",
        `${moveY}px`
    );

});


// Character hover

if (character) {

    character.addEventListener(
        "mouseenter",
        () => {

            character.style.filter =
                "drop-shadow(0 0 30px rgba(0, 170, 255, 0.8))";

        }
    );


    character.addEventListener(
        "mouseleave",
        () => {

            character.style.filter =
                "drop-shadow(0 0 15px rgba(0, 170, 255, 0.35))";

        }
    );

}



// ========================================
// TALKING SYSTEM
// ========================================

const talkButton =
    document.getElementById("talkButton");

const characterSpeech =
    document.getElementById("characterSpeech");

const talkingIndicator =
    document.querySelector(".talking-indicator");

const characterAudio =
    new Audio("audio/intro.mp3");

const speechText =
    "Hello! I'm Sarugesh. Welcome to my interactive portfolio!";



// ========================================
// MOUTH ANIMATION
// ========================================

const characterMouth =
    document.getElementById("characterMouth");


const mouthShapes = [

    "mouth-aei.png",
    "mouth-o.png",
    "mouth-u.png",
    "mouth-l.png",
    "mouth-fv.png",
    "mouth-mbp.png"

];


let mouthTimer = null;

let mouthIndex = 0;



function changeMouth() {

    if (!characterMouth) return;

    characterMouth.src =
        "images/" +
        mouthShapes[mouthIndex];

    mouthIndex++;

    if (
        mouthIndex >=
        mouthShapes.length
    ) {

        mouthIndex = 0;

    }

}



function startMouthAnimation() {

    if (mouthTimer) {

        clearInterval(mouthTimer);

    }

    mouthIndex = 0;

    mouthTimer =
        setInterval(() => {

            if (!characterAudio.paused) {

                changeMouth();

            }

        }, 150);

}



function stopMouthAnimation() {

    if (mouthTimer) {

        clearInterval(mouthTimer);

        mouthTimer = null;

    }

    if (characterMouth) {

        characterMouth.src =
            "images/mouth-neutral.png";

    }

}



// ========================================
// TALK BUTTON
// ========================================

if (talkButton) {

    talkButton.addEventListener(
        "click",
        () => {

            characterAudio.pause();

            characterAudio.currentTime = 0;


            if (characterSpeech) {

                characterSpeech.textContent =
                    speechText;

                characterSpeech.classList.add(
                    "show"
                );

            }


            if (talkingIndicator) {

                talkingIndicator.classList.add(
                    "active"
                );

            }


            startMouthAnimation();


            characterAudio
                .play()
                .catch((error) => {

                    console.error(
                        "Audio playback error:",
                        error
                    );

                    stopMouthAnimation();

                    if (talkingIndicator) {

                        talkingIndicator.classList.remove(
                            "active"
                        );

                    }

                });

        }
    );


    characterAudio.addEventListener(
        "ended",
        () => {

            if (talkingIndicator) {

                talkingIndicator.classList.remove(
                    "active"
                );

            }

            stopMouthAnimation();

        }
    );

}



// ========================================
// CONTACT FORM
// ========================================

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();


            if (
                !name ||
                !email ||
                !message
            ) {

                alert(
                    "Please fill in all the fields."
                );

                return;

            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(email)
            ) {

                alert(
                    "Please enter a valid email address."
                );

                return;

            }


            const submitButton =
                contactForm.querySelector(
                    ".contact-submit"
                );


            submitButton.disabled = true;

            submitButton.textContent =
                "Sending...";


            try {

                const response =
                    await fetch(
                        contactForm.action,
                        {
                            method: "POST",

                            body:
                                new FormData(
                                    contactForm
                                ),

                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                if (response.ok) {

                    alert(
                        "Thank you, " +
                        name +
                        "! Your message has been sent successfully."
                    );

                    contactForm.reset();

                } else {

                    alert(
                        "Sorry, your message could not be sent. Please try again."
                    );

                }

            } catch (error) {

                console.error(
                    "Form submission error:",
                    error
                );

                alert(
                    "Something went wrong. Please try again."
                );

            }


            submitButton.disabled = false;

            submitButton.textContent =
                "Send Message";

        }
    );


}
// ========================================
// HOME - TYPING ROLE ANIMATION
// ========================================

const typingText = document.getElementById("typingText");

const roles = [
    "Computer Science Engineering Student",
    "Software Developer",
    "Cybersecurity Enthusiast"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {

    if (!typingText) return;

    const currentRole = roles[roleIndex];

    if (!isDeleting) {

        typingText.textContent =
            currentRole.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentRole.length) {

            isDeleting = true;

            setTimeout(typeRole, 1800);

            return;
        }

    } else {

        typingText.textContent =
            currentRole.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            isDeleting = false;

            roleIndex++;

            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }
        }
    }

    const speed = isDeleting ? 50 : 90;

    setTimeout(typeRole, speed);
}

typeRole();
// ========================================
// SCROLL REVEAL ANIMATION
// ========================================

const revealElements = document.querySelectorAll(
    "#about, #skills, #education, #certifications, #projects, #resume, #contact"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});
// =============================
// PROJECT DETAILS POPUP
// =============================

document.addEventListener("DOMContentLoaded", () => {

    const projectModal = document.getElementById("projectModal");
    const projectModalClose = document.getElementById("projectModalClose");

    const modalProjectTitle =
        document.getElementById("modalProjectTitle");

    const modalProjectDescription =
        document.getElementById("modalProjectDescription");

    const modalProjectTech =
        document.getElementById("modalProjectTech");

    const modalProjectRole =
        document.getElementById("modalProjectRole");


    const projectDetails = {

        health: {
            title: "Health Monitoring System",

            description:
                "An IoT-based health monitoring system designed to track patient health parameters and display the collected information. The project uses ultrasonic, temperature and SpO2 sensors, along with buzzers, and maintains patient records using MongoDB.",

            technologies: [
                "IoT",
                "Java",
                "MongoDB",
                "HTML",
                "JavaScript"
            ],

            role:
                "Project Demonstration & Presentation"
        },


        cybersecurity: {
            title: "Cybersecurity Website",

            description:
                "An interactive cybersecurity website developed using modern web technologies to present cybersecurity-related information through an engaging web interface.",

            technologies: [
                "HTML",
                "CSS",
                "JavaScript"
            ],

            role:
                "Full Website Development"
        },


        ids: {
            title: "Intrusion Detection System",

            description:
                "A final-year cybersecurity project focused on an Intrusion Detection System. My contribution focuses on developing the backend services and implementing the interactive dashboard.",

            technologies: [
                "Java",
                "Spring Boot",
                "REST API",
                "Backend",
                "Dashboard",
                "Cybersecurity"
            ],

            role:
                "Backend & Dashboard Development"
        }

    };


    const detailButtons =
        document.querySelectorAll(".details-btn");


    detailButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const projectKey =
                button.dataset.project;

            const project =
                projectDetails[projectKey];

            if (!project) return;


            modalProjectTitle.textContent =
                project.title;

            modalProjectDescription.textContent =
                project.description;

            modalProjectRole.textContent =
                project.role;


            modalProjectTech.innerHTML = "";


            project.technologies.forEach((technology) => {

                const techTag =
                    document.createElement("span");

                techTag.textContent =
                    technology;

                modalProjectTech.appendChild(
                    techTag
                );

            });


            projectModal.classList.add("active");

        });

    });


    projectModalClose.addEventListener(
        "click",
        () => {

            projectModal.classList.remove("active");

        }
    );


    projectModal.addEventListener(
        "click",
        (event) => {

            if (event.target === projectModal) {

                projectModal.classList.remove(
                    "active"
                );

            }

        }
    );

});
// =============================
// ACTIVE NAVBAR LINK
// =============================

const sections = document.querySelectorAll(
    "#home, #about, #skills, #education, #certifications, #projects, #resume, #contact"
);

const navLinks = document.querySelectorAll(
    ".nav-links a"
);

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {
            link.classList.add("active");
        }

    });

});
// =============================
// BACK TO TOP BUTTON
// =============================

document.addEventListener("DOMContentLoaded", () => {

    const backToTop =
        document.getElementById("backToTop");

    if (!backToTop) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});
// =============================
// MOBILE MENU
// =============================

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.querySelector(".nav-links");

    if (!menuToggle || !navLinks) return;


    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });


    navLinks.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });

});
/* ============================= */
/* COPY EMAIL */
/* ============================= */

document.addEventListener("DOMContentLoaded", () => {

    const copyEmailBtn =
        document.getElementById("copyEmailBtn");

    if (!copyEmailBtn) return;

    copyEmailBtn.addEventListener("click", async () => {

        const email = "jsarugesh@gmail.com";

        try {

            await navigator.clipboard.writeText(email);

            copyEmailBtn.textContent =
                "✓ Email Copied!";

            setTimeout(() => {
                copyEmailBtn.textContent =
                    "📋 Copy Email";
            }, 2000);

        } catch (error) {

            console.error(
                "Failed to copy email:",
                error
            );

        }

    });

});