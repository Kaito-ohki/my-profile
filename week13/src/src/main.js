    import "./style.css";

    let count = 0;

    const countText = document.querySelector("#count");
    const plusButton = document.querySelector("#plus");
    const minusButton = document.querySelector("#minus");
    const resetButton = document.querySelector("#reset");

    plusButton.addEventListener("click", () => {
    count = count + 1;
    countText.textContent = count;
    });

    minusButton.addEventListener("click", () => {
    count = count - 1;
    countText.textContent = count;
    });

    resetButton.addEventListener("click", () => {
    count = 0;
    countText.textContent = count;
    });