import modalHtml from "./render-modal.html?raw";
import "./render-modal.css";
import { getUserById } from "../../use-cases/get-user-by-id";

let modal, form;
let loadedUser = {};
/**
 *
 * @param {String|Number} id
 */
//TODO: cargar usuario por Id
export const showModal = async (id) => {
  loadedUser = {};
  modal?.classList.remove("hide-modal");
  if (!id) return;

  const user = await getUserById(id);
  setFormValues(user);
};

export const hideModal = () => {
  modal?.classList.add("hide-modal");
  form?.reset();

  //Todo:Reset formulario
};

/**
 *
 * @param {User} user
 */
const setFormValues = (user) => {
  form.querySelector("[name=firstName]").value = user.firstName;
  form.querySelector("[name=lastName]").value = user.lastName;
  form.querySelector("[name=balance]").value = user.balance;
  form.querySelector("[name=isActive]").checked = user.isActive;
  loadedUser = user;
};

/**
 *
 * @param {HTMLDivElement} element
 * @param {(userLike)=>Promise<void>} callback
 * @returns
 */
export const renderModal = (element, callback) => {
  if (modal) return;

  modal = document.createElement("div");
  modal.innerHTML = modalHtml;
  modal.className = "modal-container hide-modal";

  form = modal.querySelector("form");

  modal.addEventListener("click", (event) => {
    if (event.target.className === "modal-container") {
      hideModal();
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const userLike = { ...loadedUser };

    if (!formData.get("isActive")) {
      formData.append("isActive", "off");
    }

    for (const [key, value] of formData) {
      if (key === "balance") {
        userLike[key] = +value; //La transforma en un valor numerico
        continue;
      }

      if (key === "isActive") {
        userLike[key] = value === "on" ? true : false;
        continue;
      }

      userLike[key] = value;
    }

    await callback(userLike);

    hideModal();
  });

  element.append(modal);
};
