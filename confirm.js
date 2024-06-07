const confirmEl = document.querySelector(".confirm-modal"),
  tittleEl = document.querySelector(".tittle"),
  closeEl = document.querySelector(".modal-btn"),
  contentEl = document.querySelector(".confirm-content"),
  btnOk = document.querySelector(".accept"),
  btnCancel = document.querySelector(".cancel");

class ShowConfirm {
  constructor(tittle, content, ok, cancel) {
    this.tittle = tittle;
    this.content = content;
    this.ok = ok;
    this.cancel = cancel;
  }

  trigger(callbackfnt) {
    tittleEl.textContent = this.tittle;
    contentEl.textContent = this.content;
    btnOk.innerText = this.ok;
    btnCancel.innerText = this.cancel;

    confirmEl.classList.remove("close-modal");
    closeEl.addEventListener("click", this.closeModal);
    btnCancel.addEventListener("click", this.closeModal);

    btnOk.addEventListener("click", () => {
      callbackfnt();
      this.closeModal();
    });
  }

  closeModal() {
    confirmEl.classList.add("close-modal");
  }
}

const deleteThisTask = new ShowConfirm(
  "Delete this Task",
  "You are about to delete a task",
  "Delete",
  "cancel"
);

const deleteAllTask = new ShowConfirm(
  "Delete all Task",
  "You are about to delete all tasks",
  "Delete",
  "cancel"
);
