document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("orderForm");
  const modal = document.getElementById("editModal");
  const table = document.querySelector("#order-data tbody");
  const closeBtn = document.getElementById("closeBtn");
  const decreaseBtn = document.getElementById("decreaseBtn");
  const increaseBtn = document.getElementById("increaseBtn");
  const quantityInput = document.getElementById("quantity");

  const fetchOrder = async () => {
    await fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        table.innerHTML = "";

        data.forEach((order, index) => {
          let date = new Date(order.tanggal);
          date.setDate(date.getDate() - 1);

          const tr = document.createElement("tr");
          tr.innerHTML = `
          <td>${index + 1}</td>
          <td>${order.nama}</td>
          <td>${order.nohp}</td>
          <td>
            ${date.toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </td>
          <td>${order.alamat}</td>
          <td>${order.jeniscookies}</td>
          <td>${order.qty}</td>
          <td>
            <button class="edit" id="editBtn" data-id="${
              order.id
            }">Edit</button>
            <button class="delete" id="deleteBtn" data-id="${
              order.id
            }">Delete</button>
          </td>
        `;
          table.appendChild(tr);
        });
      });

    document.querySelectorAll("#editBtn").forEach((btn) => {
      btn.addEventListener("click", editBtnHandler);
    });

    document.querySelectorAll("#deleteBtn").forEach((btn) => {
      btn.addEventListener("click", deleteBtnHandler);
    });
  };

  fetchOrder();

  const editBtnHandler = async (e) => {
    await fetch(`/api/orders/${e.target.dataset.id}`)
      .then((res) => res.json())
      .then((order) => {
        form.nama.value = order.nama;
        form.nohp.value = order.nohp;
        form.tanggal.value = order.tanggal.split("T")[0];
        form.alamat.value = order.alamat;
        form.jeniscookies.value = order.jeniscookies;
        form.qty.value = order.qty;
        form.dataset.id = order.id;
        modal.style.display = "block";
      });
  };

  const deleteBtnHandler = async (e) => {
    await fetch(`/api/delete/${e.target.dataset.id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          fetchOrder();
        }
      });
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    await fetch(`/api/update/${e.target.dataset.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          fetchOrder();
          form.reset();
          modal.style.display = "none";
        } else {
          alert("Terjadi kesalahan di Server! Hubungi Admin.");
        }
      });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  increaseBtn.addEventListener("click", () => {
    let quantity = parseInt(quantityInput.value, 10);
    quantityInput.value = quantity + 1;
  });

  decreaseBtn.addEventListener("click", () => {
    let quantity = parseInt(quantityInput.value, 10);
    if (quantity > 1) {
      quantityInput.value = quantity - 1;
    }
  });
});
