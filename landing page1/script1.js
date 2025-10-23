document.addEventListener("DOMContentLoaded", () => {
    const counter = document.querySelector(".counter");
    const loader = document.querySelector(".loader");
    // const elementsToAnimate = document.querySelectorAll(
    //     "p:not(.intro), .logo p"
    // );

    let animationsInitialized = false;

    // Function to shuffle text with "BOOKMARK" as the final text
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
                // counter.textContent = finalText;
                counter.innerHTML = finalText.split("").map((letter, index) => `<span class="letter-${index}">${letter}</span>`).join("");
                if (callback) callback();
                
            }
        }, 100); // Interval of 100ms
    }

    // function removeLetters() {
    //     let text = counter.innerHTML;
    //     const removeInterval = setInterval(() => {
    //         if (text.length > 0) {
    //             text = text.substring(0, text.length - 1);
    //             counter.innerHTML = text;
    //         }else {
    //             clearInterval(removeInterval);
    //             if (!animationsInitialized) {
    //                 animateElements();
    //                 animateIntroTag();
    //             }
    //             fadeOutLoader();
    //         }
    //     }, 100); // Interval of 100ms
    // }

    function removeLetters() {
        const letters = counter.querySelectorAll("span");
        let index = 0;
        const removeInterval = setInterval(() => {
            if (index < letters.length) {
                letters[index].style.display = "none"; // Hide each letter one by one
                index++;
            } else {
                clearInterval(removeInterval);
                fadeOutLoader(); // Once all letters are removed, you can fade out the loader or trigger the next step
            }
        }, 100); // Interval of 100ms to remove each letter
    }

    // Function to animate elements
    function animateElements() {
        if (animationsInitialized) return;
        animationsInitialized = true;

        // elementsToAnimate.forEach((element) => {
        //     let originalText = element.textContent;
        //     let index = 0;

        //     const shuffleElement = setInterval(() => {
        //         if (index < originalText.length) {
        //             let shuffledText = "";
        //             for (let i = 0; i <= index; i++) {
        //                 shuffledText +=
        //                     i < index ? originalText[i] : Math.random().toString(36)[2];
        //             }
        //             element.textContent =
        //                 shuffledText + originalText.substring(index + 1);
        //             index++;
        //         } else {
        //             clearInterval(shuffleElement);
        //             element.textContent = originalText;
        //         }
        //     }, 100);
        // });
    }

   /**
    * The `moveLetters` function uses GreenSock Animation Platform (GSAP) to animate the movement of
    * letters by applying specified y-axis movements with staggered delays.
    */
    function moveLetters() {
        const movements = [-100, 300, 150, -300, -90, 100, -200, -100]; // Set the movements for each letter

        movements.forEach((move, index) => {
            gsap.to(`.letter-${index}`, {
                y: move,
                duration: 1,
                ease: "power3.out",
                delay: 0.5 + index * 0.2,  // Stagger the movements slightly
            });
        });

        // return letter movement
        setTimeout(() => {
            movements.forEach((_, index) => {
                gsap.to(`.letter-${index}`, {
                    y: 0,  
                    duration: 1,
                    ease: "power3.out",
                });
            });

            // setTimeout(removeLetters, 2000); //wating time
        },6000); //delay time
    }

    // you can add another function according to you html

    // GSAP animation for counter to go up to 100%, then show "BOOKMARK"
    gsap.to(counter, {
        innerHTML: 100 +"%",
        duration: 3, // Duration of 3 seconds
        snap: "innerHTML",
        ease: "none",
        onComplete: () => {
            // After the counter reaches 100%, shuffle the text and show "BOOKMARK"
            setTimeout(() =>
                shuffleText("BOOKMARK", 20, () => { // Ensure "BOOKMARK" is the final text
                    setTimeout(() => {
                        moveLetters();
                    //     animateElements(); // Trigger element animations
                     
                    }, 500);
                    // setTimeout(removeLetters, 500);
                }),
                500 // Delay the shuffle for 500ms after reaching 100%
            );
        },
    });

    gsap.from(".circles", 2, {
        top: "-100%",
        ease: "elastic.out",
        delay: 0.5,
    });

    gsap.to(".circle-inner", 1, {
        width:"75px",
        height: "75px",
        ease: "power4.inOut",
        delay:2,
    });

    gsap.to(".circle-inner-rotator", 1,{
        scale: 1,
        ease: "power4.inOut",
        delay: 2.5
    });

    gsap.to(".circles", 1.5, {
        rotation: 360,
        ease: "power4.inOut",
        delay:3,
    });

    gsap.to(".block", 0.75, {
        display: "block",
        height: "200px",
        ease: "power4.inOut",
        delay:4,
    });

    gsap.to(".block", 0.75, {
        width: "800px",
        ease: "power4.inOut",
        delay:4.5,
    });
// container gsap
    gsap.to(".block", 1.5, {
        width: "0px",
        ease: "power4.inOut",
        delay:5.5,
    });

    gsap.to(".block", 1.5, {
        width: "0px",
        ease: "power4.inOut",
        delay:7.5,
    });

    gsap.to(".circles", 1.5, {
        rotation: 0,
        ease: "power4.inOut",
        delay:8,
    });

    // gsap.to(".loader", 2.5,{
    //     scale: 0,
    //     ease: "power4.inOut",
    //     delay: 7,
    // })
// container gsap
    // if i want another animation except loder
    // function fadeOutLoader(){
    //     gsap.to(loader,{
    //         opacity:0,
    //         PointerEvents:"none",
    //         duration: 1,
    //         onComplete: () => {
    //             animateMasks();
    //         }
    //     })
    // }
    

    
});
