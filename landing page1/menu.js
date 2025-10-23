document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
        "custom",
        "M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1"
    );

    const menuToggle = document.querySelector(".menu-toggle");
    const menus = document.querySelector(".menus");
    const menuContainer = document.querySelector(".menu-container");
    const menuItems = document.querySelectorAll(".menu-item");
    let isAnimating = false;

    gsap.set(menus, { 
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        pointerEvents: "none"
    });

    menuToggle.addEventListener("click", () => {
        if (isAnimating) return;

        isAnimating = true;
        
        if (menuToggle.classList.contains("closed")) {
            // Opening animation
            menuToggle.classList.remove("closed");
            menuToggle.classList.add("opened");

            gsap.to(menus, {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
                // duration: 1.2,
                ease: "custom",
                onStart: () => {
                    menus.style.pointerEvents = "all";
                },
                onComplete: () => {
                    isAnimating = false;
                    // gsap.to(".menu-container", { left: "0%", duration: 0.5, ease: "power2.out" });
                    menuContainer.style.left = "0%";
                    shuffleAll();
                    animateMenuItems(menuItems, "in");
                }
            });
        } else {
            // Closing animation
            menuToggle.classList.remove("opened");
            menuToggle.classList.add("closed");
            // gsap.to(".menu-container", { left: "-50%", duration: 0.5, ease: "power2.in" });
            menuContainer.style.left = "-50%";
            animateMenuItems(menuItems, "out");
            gsap.to(menus, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration: 1.2,
                ease: "custom",
                delay: 0.5,
                onStart: () => {
                    menus.style.pointerEvents = "none";
                },
                onComplete: () => {
                    gsap.set(menus, {
                        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
                    });
                    isAnimating = false;
                }
            });
        }
    });

    function animateMenuItems(items, direction) {
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.left = direction === "in" ? "0px" : "-100px";
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