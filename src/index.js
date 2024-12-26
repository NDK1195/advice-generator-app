const adviceId = document.getElementById("advice-id");
const adviceText = document.getElementById("advice-text");
const btnGenerate = document.getElementById("btn-generate");

let state = {
  isLoading: false,
  adviceId: "",
  adviceText: "",
};

function render() {
  adviceId.textContent = state.adviceId;

  if (state.isLoading) {
    adviceText.textContent = "Getting advice...";
  } else {
    adviceText.textContent = state.adviceText;
  }
}

function updateState(newState) {
  state = { ...state, ...newState };
  render();
}

async function fetchAdvice() {
  updateState({ isLoading: true });

  try {
    const response = await fetch("https://api.adviceslip.com/advice", {
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch advice");
    }
    const data = await response.json();
    console.log(data);

    updateState({
      adviceId: data.slip.id,
      adviceText: data.slip.advice,
      isLoading: false,
    });
  } catch (error) {
    console.log(error);
  }

  render();
}

document.addEventListener("DOMContentLoaded", fetchAdvice);
btnGenerate.addEventListener("click", fetchAdvice);
