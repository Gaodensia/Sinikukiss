document.addEventListener("DOMContentLoaded", function () {
  const openModalBtn = document.getElementById("openModalBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const orderModal = document.getElementById("orderModal");
  const tanggalInput = document.getElementById("tanggal");
  const decreaseBtn = document.getElementById("decreaseBtn");
  const increaseBtn = document.getElementById("increaseBtn");
  const quantityInput = document.getElementById("quantity");

  // curr date
  const currDate = new Date().toISOString().split("T")[0];
  tanggalInput.value = currDate;

  openModalBtn.addEventListener("click", () => {
    orderModal.style.display = "flex";
  });

  const closeModal = () => {
    orderModal.style.display = "none";
  };

  closeModalBtn.addEventListener("click", closeModal);

  window.addEventListener("click", (event) => {
    if (event.target === orderModal) {
      closeModal();
    }
  });

  // Increase quantity
  increaseBtn.addEventListener("click", () => {
    let quantity = parseInt(quantityInput.value, 10);
    quantityInput.value = quantity + 1;
  });

  // Decrease quantity
  decreaseBtn.addEventListener("click", () => {
    let quantity = parseInt(quantityInput.value, 10);
    if (quantity > 1) {
      quantityInput.value = quantity - 1;
    }
  });
});
