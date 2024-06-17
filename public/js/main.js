document.addEventListener("DOMContentLoaded", function () {
  const orderForm = document.getElementById("orderForm");
  const orderModal = document.getElementById("orderModal");

  orderForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(orderForm);
    const data = Object.fromEntries(formData);
    await fetch("/api/pesan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          orderForm.reset();
          orderModal.style.display = "none";
        } else {
          alert("Terjadi kesalahan di Server! Hubungi Admin.");
        }
      });
  });
});
