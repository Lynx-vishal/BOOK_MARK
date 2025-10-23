
document.addEventListener("DOMContentLoaded", () => {
    const counter = document.querySelector(".counter p");
    const itemsArray = [];

    function generateItem() {
        const itemType = Math.random() > 0.5 ? "video" : "image";
        let container = document.createElement("div");
        let elementWidth = 700;

        if (itemType === "video") {
            const videoNumber = Math.floor(Math.random() * 5) + 1;
            container.innerHTML = `<div class="video-container">
                                        <video autoplay loop muted>
                                            <source src="./assets/vid-${videoNumber}.mp4" type="video/mp4"/>
                                        </video>
                                    </div>`;
        } else {
            const imgNumber = Math.floor(Math.random() * 8) + 1;
            container.innerHTML = `<div class="img-container">
                                        <img src="./assets/img-${imgNumber}.jpeg" alt=""/>
                                    </div>`;
        }

        const appendedElement = container.firstChild;
        document.querySelector(".items-container").appendChild(appendedElement);

        appendedElement.style.left = `${Math.random() * (window.innerWidth - elementWidth)}px`;
        appendedElement.style.top = `${Math.random() * window.innerHeight}px`;

        const randomRotation = Math.random() * 10 - 5;

        gsap.set(appendedElement, {
            scale: 0,
            rotation: randomRotation,
            transformOrigin: "center",
        });

        
        const t1 = gsap.timeline();
        const randomScale = Math.random() * 0.3 + 0.3;

        t1.to(appendedElement, {
            scale: randomScale,
            duration: 0.5,
            delay: 0.1,
        });

        t1.to(appendedElement, {
            y: () => `-=500`,
            opacity: 1,
            duration: 4,
            ease: "none",
        }, "<")
        .to(appendedElement, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                appendedElement.parentNode.removeChild(appendedElement);
                const index = itemsArray.indexOf(appendedElement);
                if (index > -1) {
                    itemsArray.splice(index, 1);
                }
            },
        }, "-=0.5");
    }

    // Function to increment the counter and trigger animations when it reaches 100%
    function startLoader() {
        let currentValue = 0;

        function updateCounter() {
            if (currentValue === 100) {
                // Trigger text animation and letter movement after 100%
                shuffleText("BOOKMARK", 20, () => {
                    setTimeout(() => {
                        moveLetters();
                    }, 500);
                });
                return;
            }

            currentValue += Math.floor(Math.random() * 10) + 1;
            currentValue = currentValue > 100 ? 100 : currentValue;

            // Display the updated counter value with percentages
            counter.innerHTML = currentValue
                .toString()
                .split("")
                .map((char) => `<span>${char}</span>`)
                .join("") + "<span>%</span>";

            // Set a random delay for the next update
            const delay = Math.floor(Math.random() * 200) + 100;
            setTimeout(updateCounter, delay);
        }

        updateCounter();
    }

    // Shuffle text function (shows random text, then displays "BOOKMARK")
    function shuffleText(finalText, duration, callback) {
        let i = 0;
        const shuffleInterval = setInterval(() => {
            if (i < duration) {
                // Generate random text during the shuffle animation
                counter.textContent = Math.random().toString(36).substring(2, 8);
                i++;
            } else {
                // Stop the shuffle and show "BOOKMARK" as the final text
                clearInterval(shuffleInterval);
                counter.innerHTML = finalText
                    .split("")
                    .map((letter, index) => `<span class="letter-${index}">${letter}</span>`)
                    .join("");
                if (callback) callback();
            }
        }, 100); // Shuffle interval
    }

    // Function to move letters after the shuffle
    function moveLetters() {
        const movements = [-100, -50, 100, -300, -90, 100, -200, -100]; // Set the movements for each letter

        // Increase the font size during the movement phase
        gsap.to(".counter p", {
            fontSize: "15vw",  // Increase the font size
            duration: 1,
            ease: "power3.out",
        });

        movements.forEach((move, index) => {
            gsap.to(`.letter-${index}`, {
                y: move,
                duration: 1,
                ease: "power3.out",
                delay: 0.5 + index * 0.2,  // Stagger the movements slightly
            });
        });

        // Pause for 10 seconds, generate images/videos, and then contract letters
        setTimeout(() => {
            // Generate images/videos every 2 seconds
            const generationInterval = setInterval(() => {
                generateItem();
            }, 1500);

            // Stop generating after 10 seconds
            setTimeout(() => {
                clearInterval(generationInterval);

                // Contract the letters back to their original position after 10 seconds
                movements.forEach((_, index) => {
                    gsap.to(`.letter-${index}`, {
                        y: 0,  // Move letters back to the original position
                        duration: 1,
                        ease: "power3.out",
                    });
                });

                // Reduce the font size back to normal
                gsap.to(".counter p", {
                    fontSize: "100px",  // Reduce the font size back to normal
                    duration: 1,
                    ease: "power3.out",
                });

                // gsap.to(".first-page", 2.5,{
                //     scale: 0,
                //     ease: "power4.inOut",
                //     delay: 2,
                // });
            }, 10000);  // Stop generating after 10 seconds
        }, 1000);  // Wait for the letter movement to finish before starting generation
        
    }

    // Start the loader once the DOM is loaded
    startLoader();
});



document.addEventListener("DOMContentLoaded", function () {
    const menuOpen = document.querySelector(".menu-open");
    const menuClose = document.querySelector(".menu-close");
    const menuContainer = document.querySelector(".menu-container");
    const menuItems = document.querySelectorAll(".menu-item");
    

    let isOpen = false;
    const defaultEase = "power4.inOut";

    gsap.set(".menu-logo img", { y: 50}); 
    gsap.set(".menu-link p", { y:40});
    gsap.set(".menu-sub-item P", { y:12 });
    gsap.set(["#img-2, #img-3, #img-4"], {top: "150%"});

    menuOpen.addEventListener("click", function (){
        if (isOpen) return;
        openMenu();
    });

    menuClose.addEventListener("click", function (){
        if (!isOpen) return;
        closeMenu();
    });

    menuItems.forEach((item) => {
        item.addEventListener("click", function () {
            if (!isOpen) return;
            closeMenu();
        });
    });

    const openMenu = () => {
        gsap.to(".menu", {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
            pointerEvents: "all",
            duration: 1.25,
            ease: defaultEase,
        });

        gsap.to(".hero", {
            top: "-50%",
            opacity: 0,
            duration: 1.25,
            ease: defaultEase,
        }); 

        gsap.to(".menu-logo img", {
            y: 0,
            duration: 1,
            delay: 0.75,
            ease: "power3.out",
        });

        gsap.to(".menu-link p", {
            y: 0,
            duration: 1,
            stagger: 0.075,
            delay: 1,
            ease: "power3.out",
        });

        gsap.to(".menu-sub-item p", {
            y: 0,
            duration: 0.075,
            stagger: 0.05,
            delay: 1,
            ease: "power3.out",
        });

        gsap.to(["#img-2, #img-3, #img-4"], {
            top: "50%",
            duration: 1.25,
            ease: defaultEase,
            stagger: 0.1,
            delay: 0.25,
           onComplete: () => {
            gsap.set(".hero", {top: "50%"});
            isOpen = ! isOpen;
           },
        });

        menuContainer.style.right = "0%";
        shuffleAll();
        animateMenuItems(menuItems, "in");
    };

    const closeMenu = () => {
        gsap.to(".menu", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            pointerEvents: "none",
            duration: 1.25,
            ease: defaultEase,
        });

        gsap.to(".menu-items", {
            top: "-300px",
            opacity: 0,
            duration: 1.25,
            ease: defaultEase,
        });

        gsap.to(".hero", {
            top: "0%",
            opacity: 1,
            duration: 1.25,
            ease: defaultEase,
            onComplete: () => {
                gsap.to(".menu", {
                    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                });
                gsap.set(".menu-logo img", { y:50});
                gsap.set(".menu-link p", { y:40});
                gsap.set(".menu-sub-item p", { y:12 });
                gsap.set(".menu-items", {opacity: 1, top: "0px"});
                gsap.set(["#img-2, #img-3, #img-4"], {top: "150%"});

                isOpen =!isOpen;
            },
        });

        // menuContainer.style.right = "-50%";
        // animateMenuItems(menuItems, "out");
    };

    function animateMenuItems(items, direction) {
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.right = direction === "in" ? "0px" : "-100px";
            }, index * 50);
        });
    }

    const link = new SplitType(".menu-item a", { types: "words, chars" });
    const span = new SplitType(".menu-item span", { types: "words, chars" });
    const menuTitle = new SplitType(".menu-title p", { types: "words, chars" }); 
    const menuContent = new SplitType(".menu-content p", { types: "words, chars" });

    const links = document.querySelectorAll(
        ".menu-item, .menu-sub-item .menu-title, .menu-sub-item .menu-content"
    );

    document.querySelectorAll(".menu-item").forEach((item) => {
        const linkElement = item.querySelector(".menu-item-link a");
        if (linkElement) {
            const width = linkElement.offsetWidth;
            item.querySelector(".menu-item-link .bg-hover").style.width =
                width + 30 + "px";
            const spanElement = item.querySelector("span");
            if (spanElement) {
                spanElement.style.left = width + 40 + "px";
            }
        }

        const chars = item.querySelectorAll("span .char");

        function colorChars(chars) {
            chars.forEach((char, index) => {
                setTimeout(() => {
                    char.classList.add("char-active");
                }, index * 50);
            });
        }

        function clearColorChars(chars) {
            chars.forEach((char) => {
                char.classList.remove("char-active");
            });
        }

        linkElement.addEventListener("mouseenter", () => {
            colorChars(chars);
        });

        linkElement.addEventListener("mouseleave", () => {
            clearColorChars(chars);
        });
    });

    links.forEach((link) => {
        link.addEventListener("mouseenter", (event) => {
            const targetElement = event.currentTarget.querySelector(
                ".menu-item-link a, .menu-title p, .menu-content p"
            );
            if (targetElement) {
                addShuffleEffect(targetElement);
            }

            const spanElement = link.querySelector("span");
            if (spanElement) {
                addShuffleEffect(spanElement);
            }
        });
    });

    function shuffleAll() {
        links.forEach((link) => {
            const targetElement = link.querySelector(
                ".menu-item-link a, .menu-title p, .menu-content p"
            );
            if (targetElement) {
                addShuffleEffect(targetElement);
            }
        });
    }

    
    function addShuffleEffect(element) {
        const chars = element.querySelectorAll(".char"); 
        const originalText = [...chars].map((char) => char.textContent);
        const shuffleInterval = 10;
        const resetDelay = 75;
        const additionalDelay = 150;

        chars.forEach((char, index) => {
            setTimeout(() => {
                const interval = setInterval(() => {
                    char.textContent = String.fromCharCode(
                        97 + Math.floor(Math.random() * 26)
                    );
                }, shuffleInterval);

                setTimeout(() => {
                    clearInterval(interval);
                    char.textContent = originalText[index]; 
                }, resetDelay + index * additionalDelay);
            }, index * shuffleInterval);
        });
    }
});

function showContent(contentId, event) {
    event.preventDefault();
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.removeAttribute('id');
    });

    const clickedMenuItem = event.currentTarget.parentElement.parentElement;
    clickedMenuItem.id = 'active';

    const sections = document.querySelectorAll('.home-content');
    sections.forEach(section => {
        section.classList.add('hidden');
    });

    document.getElementById(contentId).classList.remove('hidden');
}