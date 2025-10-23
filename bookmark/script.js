import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);

const CustomEase = CustomEase.create("custom", ".87,0,.13,1");
const counter = document.getElementById("counter");

gsap.set(".video-container",{
    scale:0,
    rotation:-20,
});
gsap.to(".overlay-content", {
    clipPath: "polygon(0% 45%, 25% 45%, 25% 55%, 0% 55%)",
    duration: 1.5,
    ease: CustomEase,
    delay: 1,
});

gsap.to(".overlay-content", {
    clipPath: "polygon(0% 45%, 100% 45%, 100% 55%, 0% 55%)",
    duration: 2,
    ease: CustomEase,
    delay: 3,


    onStart: () => {
        gsap.to(".progress-bar",{
            width: "100vw",
            duration: 2,
            ease: CustomEase,
        });

        gsap.to(counter, {
            innerHTML: 100,
            duration: 2,
            ease: CustomEase,
            snap: {innerHTML: 1},
        });
    },

});

gsap.to(".overlay-content", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 1,
    ease: CustomEase,
    delay: 5,

    onStart: () => {
        gsap.to(".video-container",{
            scale: 1,
            rotation: 0,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.25,
            ease: CustomEase,
        });

        gsap.to(".progress-bar", {
            opacity: 0,
            duration: 0.3,
        });
    },
});






// document.addEventListener("DOMContentLoaded", () => {
//     const counter = document.querySelector(".counter p");
    
//     function startLoader() {
//         let currentValue = 0;

//         function updateCounter() {
//             if (currentValue === 100) {
//                 shuffleText("LYNX", 20, () => {
//                     setTimeout(() => {
//                         moveLetters();
//                     }, 500);
//                 });
//                 return;
//             }

//             currentValue += Math.floor(Math.random() * 10) + 1;
//             currentValue = currentValue > 100 ? 100 : currentValue;
//             counter.innerHTML = currentValue
//                 .toString()
//                 .split("")
//                 .map((char) => `<span>${char}</span>`)
//                 .join("") + "<span>%</span>";
//             const delay = Math.floor(Math.random() * 200) + 100;
//             setTimeout(updateCounter, delay);
//         }

//         updateCounter();
//     }

//     function shuffleText(finalText, duration, callback) {
//         let i = 0;
//         const shuffleInterval = setInterval(() => {
//             if (i < duration) {
//                 counter.textContent = Math.random().toString(36).substring(2, 8);
//                 i++;
//             } else { 
//                 clearInterval(shuffleInterval);
//                 counter.innerHTML = finalText
//                     .split("")
//                     .map((letter, index) => `<span class="letter-${index}">${letter}</span>`)
//                     .join("");
//                 if (callback) callback();
//             }
//         }, 100); 
//     }
//     startLoader();
// });