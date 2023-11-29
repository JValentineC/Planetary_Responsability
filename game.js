const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");
const progressElement = document.getElementById("progress-bar");
let visitedNodes = [];
let state = {};

function startGame() {
  state = {};
  showTextNode(1);
}



function updateProgress() {
  const totalNodes = textNodes.length;
  const progress = (visitedNodes.length / totalNodes) * 100;
  progressElement.style.width = `${progress}%`;
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  if (!visitedNodes.includes(textNodeIndex)) {
    visitedNodes.push(textNodeIndex);
    updateProgress();
  }

  textElement.classList.add('enlarged-text2');

textElement.classList.toggle('enlarged-text' , [1, 20, 21, 22, 23, 24, 30, 31, 32, 33, 34, 40, 41, 42, 43, 44, 50, 51, 52, 53, 54, 60, 61, 62, 63, 64].includes(textNodeIndex));


  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  const existingImage = document.getElementById("dynamic-image");
  if (existingImage) {
    existingImage.remove();
  }

  const imgElement = document.createElement("img");
  imgElement.id = "dynamic-image";
  imgElement.src = `images/${textNodeIndex}.jpg`;
  imgElement.alt = `Image for text node ${textNodeIndex}`;
  optionButtonsElement.appendChild(imgElement);

  const containerDiv = document.querySelector(".container");
  containerDiv.style.backgroundImage = `url('images/${textNodeIndex}.jpg')`;

  const img = new Image();
  img.onload = function () {
    const aspectRatio = this.width / this.height;
  
    if (aspectRatio > 1) {
      // Image is landscape
      containerDiv.style.backgroundSize = "auto 100%";
      containerDiv.style.borderRadius = "20% / 10%";
    } else if (aspectRatio < 1) {
      // Image is portrait
      containerDiv.style.backgroundSize = "contain";
      containerDiv.style.backgroundPosition = "center";
      containerDiv.style.borderRadius = "10% / 50%";
    } else {
      // Image is square
      containerDiv.style.backgroundSize = "contain";
      containerDiv.style.backgroundPosition = "center";
      containerDiv.style.borderRadius = "30px"; // reset to original border radius for square images
    }
  };
  
  // Start loading the image
  img.src = `images/${textNodeIndex}.jpg`;

  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

const textNodes = [
  {
    id: 1,
    text: "Mission is to create impactful innovation.",
    options: [
      {
        text: "Join Mission",
        nextText: 2,
      },
    ],
  },
  {
    id: 2,
    text: "Choose your gift?",
    options: [
      {
        text: "Resilience",
        nextText: 4,
      },
      {
        text: "Creativity",
        nextText: 3,
      },
      {
        text: "Intelligence",
        nextText: 5,
      },
      {
        text: "Humility",
        nextText: 6,
      },
      {
        text: "Mental Fortitude",
        nextText: 7,
      },
      {
        text: "Exit",
        nextText: -1,
      },
    ],
  },
  {
    id: 3,
    text: "Creativity, Great choice! Quick choose how you will utilize this Gift!",
    options: [
      {
        text: "Explore new ideas and perspectives, by reading, watching, listening, or experiencing different types of content, such as books, movies, podcasts, or art.",
        nextText: 20,
      },
      {
        text: "Experiment and play, by trying new things, making changes, or combining different elements, such as colors, shapes, sounds, or words.",
        nextText: 21,
      },
      {
        text: "• Express yourself, by writing, drawing, singing, dancing, or any other form of artistic or creative expression.",
        nextText: 22,
      },{
        text: "Collaborate and brainstorm, by working with others, sharing your ideas, and listening to their ideas.",
        nextText: 23,
      },
      {
        text: "Relax and have fun, by doing something that you enjoy, that makes you laugh, or that calms you down.",
        nextText: 24,
      },
      {
        text: "Return to other gifts.",
        nextText: 2,
      },
    ],
  },
  {
    id: 4,
    text: "Resilience, Great choice! Quick choose how you will utilize this Gift!",
    options: [
      {
        text: "Challenge yourself to do something that is difficult or unfamiliar, such as learning a new skill, taking a risk, or facing a fear.",
        nextText: 30,
      },      {
        text: "Practice gratitude and optimism, by writing down or saying out loud the things that you are thankful for, and the things that you hope for.",
        nextText: 31,
      },      {
        text: "Seek feedback and learn from failure, by asking others for their opinions and suggestions, and by reflecting on my mistakes and how i can avoid them in the future.",
        nextText: 32,
      },      {
        text: "Build a support network, by reaching out to my friends, family, mentors, or colleagues, and by offering my help and encouragement to others.",
        nextText: 33,
      },      {
        text: "Take care of myself, by eating well, sleeping enough, drawing regularly, and doing things that make me happy.",
        nextText: 34,
      },
      {
        text: "Return to other gifts.",
        nextText: 2,
      },
    ],
  },
  {
    id: 5,
    text: "Intellegence, Great choice! Quick choose how you will utilize this Gift!",
    options: [
      {
        text: "Learn something new, by taking a course, reading a book, watching a video, or attending a workshop.",
        nextText: 40,
      },      {
        text: "Solve problems and puzzles, by playing games, doing quizzes, or completing challenges.",
        nextText: 41,
      },      {
        text: "Ask questions and seek answers, by being curious, inquisitive, and eager to learn.",
        nextText: 42,
      },      {
        text: "Teach and explain, by sharing your knowledge, skills, and information with others, and by helping them to learn and understand.",
        nextText: 43,
      },      {
        text: "Review and reflect, by revising, summarizing, or evaluating what you have learned, and by thinking about how you can use it, improve it, or connect it to other things.",
        nextText: 44,
      },
      {
        text: "Return to other gifts.",
        nextText: 2,
      },
    ],
  },
  {
    id: 6,
    text: "Humility, Great choice! Quick choose how you will utilize this Gift!",
    options: [
      {
        text: "Recognize and appreciate your strengths and weaknesses, by being honest, realistic, and self-aware.",
        nextText: 50,
      },      {
        text: "Recognize and appreciate others’ strengths and contributions, by being respectful, supportive, and grateful.",
        nextText: 51,
      },      {
        text: "Seek and accept feedback and guidance, by being open, receptive, and willing to learn.",
        nextText: 52,
      },      {
        text: "Admit and apologize for your mistakes and faults, by being accountable, responsible, and sincere.",
        nextText: 53,
      },      {
        text: "Serve and help others, by being generous, compassionate, and altruistic.",
        nextText: 54,
      },      
      {
        text: "Return to other gifts.",
        nextText: 2,
      },
    ],
  },
  {
    id: 7,
    text: "Mental Fortitude, Great choice! Quick choose how you will utilize this Gift!",
    options: [
      {
        text: "Set and pursue your goals, by being clear, specific, and ambitious.",
        nextText: 60,
      },      {
        text: "Manage and overcome your stress, by being calm, positive, and resilient.",
        nextText: 61,
      },      {
        text: "Control and regulate your emotions, by being aware, mindful, and balanced.",
        nextText: 62,
      },      {
        text: "Face and conquer your fears, by being brave, confident, and courageous.",
        nextText: 63,
      },      {
        text: "Persist and endure, by being determined, disciplined, and committed.",
        nextText: 64,
      },
      {
        text: "Return to other gifts.",
        nextText: 2,
      },
    ],
  },
  {
    id: 20,
    text: "This will help me to expand my knowledge, imagination, and curiosity.",
    options: [
      {
        text: "Back",
        nextText: 3,
      },
    ],
  },
  {
    id: 21,
    text: "This will help you to discover new possibilities, solutions, and products.",
    options: [
      {
        text: "Back",
        nextText: 3,
      },
    ],
  },
  {
    id: 22,
    text: "This will help you to communicate your thoughts, feelings, and emotions, and to create something unique and original.",
    options: [
      {
        text: "Back",
        nextText: 3,
      },
    ],
  },
  {
    id: 23,
    text: "This will help you to generate more and better ideas, and to learn from others’ creativity.",
    options: [
      {
        text: "Back",
        nextText: 3,
      },
    ],
  },
  {
    id: 24,
    text: "This will help you to reduce stress, boost your mood, and stimulate your creativity.",
    options: [
      {
        text: "Back",
        nextText: 3,
      },
    ],
  },
  {
    id: 30,
    text: "This will help me to grow, improve, and overcome obstacles.",
    options: [
      {
        text: "Back",
        nextText: 4,
      },
    ],
  },
  {
    id: 31,
    text: "This will help me to appreciate what i have, and to look forward to the future.",
    options: [
      {
        text: "Back",
        nextText: 4,
      },
    ],
  },
  {
    id: 32,
    text: "This will help me to improve my performance, and to adapt to changing situations.",
    options: [
      {
        text: "Back",
        nextText: 4,
      },
    ],
  },
  {
    id: 33,
    text: "This will help me to feel connected, supported, and valued.",
    options: [
      {
        text: "Back",
        nextText: 4,
      },
    ],
  },
  {
    id: 34,
    text: "This will help me to stay healthy, energized, and resilient.",
    options: [
      {
        text: "Back",
        nextText: 4,
      },
    ],
  },
  {
    id: 40,
    text: "This will help you to acquire new knowledge, skills, and information.",
    options: [
      {
        text: "Back",
        nextText: 5,
      },
    ],
  },
  {
    id: 41,
    text: "This will help you to apply your knowledge, skills, and information, and to improve your logic, reasoning, and analysis.",
    options: [
      {
        text: "Back",
        nextText: 5,
      },
    ],
  },
  {
    id: 42,
    text: "This will help you to understand, explore, and discover new things, and to expand your horizons.",
    options: [
      {
        text: "Back",
        nextText: 5,
      },
    ],
  },
  {
    id: 43,
    text: "This will help you to consolidate your learning, and to enhance your communication and presentation skills.",
    options: [
      {
        text: "Back",
        nextText: 5,
      },
    ],
  },
  {
    id: 44,
    text: "This will help you to deepen your learning, and to synthesize and integrate your knowledge, skills, and information.",
    options: [
      {
        text: "Back",
        nextText: 5,
      },
    ],
  },
  {
    id: 52,
    text: "This will help you to improve yourself, and to benefit from others’ wisdom and experience.",
    options: [
      {
        text: "Back",
        nextText: 6,
      },
    ],
  },
  {
    id: 50,
    text: "This will help you to view yourself accurately, and to acknowledge your limitations and areas for improvement.",
    options: [
      {
        text: "Back",
        nextText: 6,
      },
    ],
  },
  {
    id: 51,
    text: "This will help you to view others positively, and to value their abilities and achievements.",
    options: [
      {
        text: "Back",
        nextText: 6,
      },
    ],
  },
  {
    id: 53,
    text: "This will help you to correct yourself, and to repair your relationships with others.",
    options: [
      {
        text: "Back",
        nextText: 6,
      },
    ],
  },
  {
    id: 54,
    text: "This will help you to contribute to the greater good, and to put others’ needs before your own.",
    options: [
      {
        text: "Back",
        nextText: 6,
      },
    ],
  },
  {
    id: 60,
    text: "This will help you to focus, plan, and achieve what you want.",
    options: [
      {
        text: "Back",
        nextText: 7,
      },
    ],
  },
  {
    id: 61,
    text: "This will help you to cope, adapt, and bounce back from challenges and difficulties.",
    options: [
      {
        text: "Back",
        nextText: 7,
      },
    ],
  },
  {
    id: 62,
    text: "This will help you to express, understand, and deal with your feelings and moods.",
    options: [
      {
        text: "Back",
        nextText: 7,
      },
    ],
  },
  {
    id: 63,
    text: "This will help you to overcome your insecurities, doubts, and anxieties.",
    options: [
      {
        text: "Back",
        nextText: 7,
      },
    ],
  },
  {
    id: 64,
    text: "This will help you to persevere, work hard, and never give up.",
    options: [
      {
        text: "Back",
        nextText: 7,
      },
    ],
  },

];

startGame();