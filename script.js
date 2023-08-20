let userBags = [];
let selectedBag = null;
let randomBag = null;
let value = 0;
let id = null,
  count = 0;

const bagsAvailable = [
  { id: 1, label: "Bag 1", value: 500 },
  { id: 2, label: "Bag 2", value: 1500 },
  { id: 3, label: "Bag 3", value: 2500 },
  { id: 4, label: "Bag 4", value: 3500 },
  { id: 5, label: "Bag 5", value: 4500 },
  { id: 6, label: "Bag 6", value: 5500 },
  { id: 7, label: "Bag 7", value: 6500 },
  { id: 8, label: "Bag 8", value: 7500 },
  { id: 9, label: "Bag 9", value: 8500 },
  { id: 10, label: "Bag 10", value: 9500 },
  { id: 11, label: "Bag 11", value: 15000 },
  { id: 12, label: "Bag 12", value: 100000 },
  { id: 13, label: "Bag 13", value: 150000 },
  { id: 14, label: "Bag 14", value: 175000 },
  { id: 15, label: "Bag 15", value: 190000 },
  { id: 16, label: "Bag 16", value: 200000 },
];

const gameHeading = document.getElementById("game-heading");

// Create a GSAP animation timeline
const tl = gsap.timeline();

tl.fromTo(
  gameHeading,
  { opacity: 0, y: -20 },
  { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
);

function R(min, max) {
  return min + Math.random() * (max - min);
}

function confetti() {
  var total = 100; // How many divs to be created
  var maxAnimationTime = 30; //Stop animation after x seconds
  var container = document.getElementById("confettiWrapper"),
    w = window.innerWidth,
    h = 400;

  // w = window.innerWidth , h = window.innerHeight;

  TweenMax.set("#confettiWrapper", {
    perspective: 600,
  });
  TweenMax.set("#confettiWrapper", {
    xPercent: "-50%",
    yPercent: "-50%",
  });

  for (i = 0; i < total; i++) {
    //Create divs and assign color classes
    var Div = document.createElement("div");
    TweenLite.set(Div, {
      attr: {
        class: "confetti",
      },
      x: R(-80, w),
      y: R(-200, -150),
      z: R(-200, 200),
    });
    container.appendChild(Div);
    // Add classes based on index ranges
    if (i >= 0 && i < 10) {
      Div.classList.add("red");
    } else if (i >= 10 && i < 20) {
      Div.classList.add("blue");
    } else if (i >= 30 && i < 40) {
      Div.classList.add("pink");
    } else if (i >= 50 && i < 60) {
      Div.classList.add("yellow");
    } else if (i >= 70 && i < 80) {
      Div.classList.add("green");
    }
    animm(Div);
  }

  function animm(elm) {
    var tlConfetti = new TimelineMax({ repeat: -1 });
    tlConfetti.timeScale(1.5); // Adjust speed. Higher number is faster
    tlConfetti
      .to(
        elm,
        R(6, 15),
        {
          y: h + 100,
          opacity: R(0.2, 0.9),
          scale: R(2, 0.25),
          ease: Linear.easeNone,
          repeat: -1,
        },
        "-=2"
      )
      .to(
        elm,
        R(4, 8),
        {
          x: "+=100",
          rotationZ: R(0, 180),
          yoyo: true,
          ease: Sine.easeInOut,
        },
        "-=10"
      )
      .to(
        elm,
        R(2, 8),
        {
          rotationX: R(0, 360),
          rotationY: R(0, 360),
          yoyo: true,
          ease: Sine.easeInOut,
          repeat: -1,
        },
        "-=8"
      );

    TweenMax.delayedCall(maxAnimationTime, stopAnimation);

    function stopAnimation() {
      tlConfetti.pause();
    }
  }
}
function R(min, max) {
  return min + Math.random() * (max - min);
}

document.addEventListener("DOMContentLoaded", function () {
  const nameCard = document.getElementById("name-card");
  const startButton = document.getElementById("start-button");

  const mainScreen = document.getElementById("main-screen");
  const logoutButton = document.getElementById("logout-button");
  const gamerNameInput = document.getElementById("gamer-name");
  const displayName = document.getElementById("user-name");

  // Handle logout button click
  logoutButton.addEventListener("click", function () {
    document.getElementById("label").style.display = "none";
    document.getElementById("winner_modal").style.display = "none";
    document.getElementById("bagsContainer").style.display = "none";
    document.getElementById("choosed_bag_container").style.display = "none";
    document.getElementById("random_bag_container").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("confettiWrapper").style.display ="none";

    mainScreen.style.display = "none";
    nameCard.style.display = "block";
    document.getElementById("game-heading").style.display = "block";
    document.getElementById("selection_heading").style.display = "none";
    gamerNameInput.value = ""; // Clear the input field
  });

  document.addEventListener("DOMContentLoaded", function () {
    const bags = document.querySelectorAll(".bag");

    gsap.fromTo(bags, { scale: 0 }, { scale: 1, duration: 0.5, stagger: 0.2 });

    bags.forEach((bag) => {
      bag.addEventListener("click", function () {
        // Add the 'pop' class for the popping animation
        this.classList.add("pop");

        // Remove the 'pop' class after the animation completes
        setTimeout(() => {
          this.classList.remove("pop");
        }, 300);
      });

      // Randomly delay the initial animation for each bag
      const randomDelay = Math.random() * 2 + 0.5; // Random delay between 0.5s and 2.5s
      setTimeout(() => {
        bag.style.animation = "shake 0.4s ease-in-out infinite";
      }, randomDelay * 1000);
    });
  });

  startButton.addEventListener("click", function () {
    if (gamerNameInput.value.length === 0) {
      document.getElementById("error").innerHTML = "Please enter name";
    } else {
      document.getElementById("game-heading").style.display = "none";

      const enteredName = gamerNameInput.value;

      if (enteredName.trim() !== "") {
        displayName.innerHTML = enteredName;
        nameCard.style.display = "none";
        mainScreen.style.display = "block";
      }
      showBagsContainer();
    }
  });
});

document.getElementById("Bag 1").addEventListener("click", selectBag);
document.getElementById("Bag 2").addEventListener("click", selectBag);
document.getElementById("Bag 3").addEventListener("click", selectBag);
document.getElementById("Bag 4").addEventListener("click", selectBag);
document.getElementById("Bag 5").addEventListener("click", selectBag);
document.getElementById("Bag 6").addEventListener("click", selectBag);
document.getElementById("Bag 7").addEventListener("click", selectBag);
document.getElementById("Bag 8").addEventListener("click", selectBag);
document.getElementById("Bag 9").addEventListener("click", selectBag);
document.getElementById("Bag 10").addEventListener("click", selectBag);
document.getElementById("Bag 11").addEventListener("click", selectBag);
document.getElementById("Bag 12").addEventListener("click", selectBag);
document.getElementById("Bag 13").addEventListener("click", selectBag);
document.getElementById("Bag 14").addEventListener("click", selectBag);
document.getElementById("Bag 15").addEventListener("click", selectBag);
document.getElementById("Bag 16").addEventListener("click", selectBag);

const musicPlayer = document.getElementById("winningMusic");
const selectionPlayer = document.getElementById("selectionMusic");

const modal = document.getElementById("modal");
document
  .getElementById("switchYes")
  .addEventListener("click", () => handleSwitchChoice("yes"));
document
  .getElementById("switchNo")
  .addEventListener("click", () => handleSwitchChoice("no"));

const winnerModal = document.getElementById("winner_modal");
document
  .getElementById("yesRestart")
  .addEventListener("click", () => restartGame());

function getRandomBag(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function showBagsContainer() {
  document.getElementById("selection_heading").style.display = "block";
  document.getElementById("bagsContainer").style.display = "flex";
  document.getElementById("label").style.display = "block";
  document.getElementById("switch_containers").style.display = "none";
}

function startGame() {
  showBagsContainer();
}

function showModal() {
  gsap.to(".modal-content", { top: "50%", duration: 0.3, ease: "ease.out" });

  document.getElementById("selected_bag").innerHTML =
    userBags && userBags.length ? userBags[0].label : "";
  document.getElementById("random_bag").innerHTML = randomBag.label;
  document.getElementById("switch_containers").style.display = "flex";
  document.getElementById("random_bag_container").style.display = "block";
  document.getElementById("choosed_bag_container").style.display = "block";
  document.getElementById("question").style.display = "block";
  const selectedBag = document.getElementById("choosed_bag_container");
  const random = document.getElementById("random_bag_container");

  gsap.fromTo(
    selectedBag,
    { scale: 0 },
    { scale: 1, duration: 0.5, stagger: 0.2 }
  );
  gsap.fromTo(random, { scale: 0 }, { scale: 1, duration: 0.5, stagger: 0.2 });
}

function showWinnerModal() {
  winnerModal.classList.add("show");
  winnerModal.style.display = "block";
  document.getElementById("switch_containers").style.display = "none";
  document.getElementById("random_bag_container").style.display = "none";
  document.getElementById("choosed_bag_container").style.display = "none";
  document.getElementById("question").style.display = "none";
  document.getElementById("amount").innerHTML = `R ${value}`;
}

function hideWinnerModal() {
  winnerModal.classList.remove("show");
  winnerModal.style.display = "none";
}

function handleSwitchChoice(choice) {
  if (choice === "yes") {
    userBags = randomBag;
    value = userBags.value;
    document.getElementById("label").innerHTML = `Balance : R ${value}`;
    musicPlayer.play();
    showWinnerModal();
    document.getElementById("confettiWrapper").style.display ="block";
    confetti();
  } else {
    value = userBags[0].value;
    document.getElementById("label").display = "block";
    document.getElementById("label").innerHTML = `Your bag : R ${value}`;
    musicPlayer.play();
    showWinnerModal();
    document.getElementById("confettiWrapper").style.display ="block";
    confetti();
  }
}

function selectBag(event) {
  selectionPlayer.play();
  const selectedBag = event.target.closest(".bag").id;

  for (let i = 0; i < bagsAvailable.length; i++) {
    if (selectedBag === bagsAvailable[i].label) {
      id = i;
      userBags.push(bagsAvailable[i]);
    }
  }

  let remaningBags = bagsAvailable.filter((curr) => curr.id !== userBags[0].id);

  randomBag = getRandomBag(remaningBags);
  document.getElementById("bagsContainer").style.display = "none";
  document.getElementById("selection_heading").style.display = "none";
  showModal();
}

function restartGame() {
  hideWinnerModal();
  musicPlayer.pause();
  bags = [];
  selectedBag = null;
  randomBag = null;
  userBags = [];
  document.getElementById("label").innerHTML = `Balance: R 0`;
  document.getElementById("bagsContainer").style.display = "flex";
  document.getElementById("bagsContainer").style.marginTop = "50px";
  document.getElementById("game-heading").style.display = "none";
  document.getElementById("selection_heading").style.display = "block";
  document.getElementById("choosed_bag_container").style.display = "none";
  document.getElementById("random_bag_container").style.display = "none";
  document.getElementById("question").style.display = "none";
  document.getElementById("name-card").style.display = "none";
  document.getElementById("switch_containers").style.display = "none";
  document.getElementById("confettiWrapper").style.display ="none";
}
