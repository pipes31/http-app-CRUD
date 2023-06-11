import userStore from "../../store/user-store";
import { renderTable } from "../render-table/render-table";
import "./render-buttons.css";

export const renderButtons = (element) => {
  const nextButton = document.createElement("button");
  nextButton.innerHTML = "Next >";

  const previousButton = document.createElement("button");
  previousButton.innerHTML = "< Previous";

  const currentPageLabel = document.createElement("span");
  currentPageLabel.id = "current-page";
  currentPageLabel.innerHTML = userStore.getCurrentPage();

  element.append(previousButton, currentPageLabel, nextButton);

  nextButton.addEventListener("click", async () => {
    await userStore.loadNextPage();
    currentPageLabel.innerText = userStore.getCurrentPage();
    renderTable(element);
  });

  previousButton.addEventListener("click", async () => {
    await userStore.loadPreviousPage();
    currentPageLabel.innerText = userStore.getCurrentPage();
    renderTable(element);
  });
};
