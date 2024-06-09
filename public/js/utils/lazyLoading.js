document.addEventListener("DOMContentLoaded", () => {
  const loading = document.getElementById("loading");

  window.addEventListener("load", () => {
    loading.style.display = "none";
    document.body.style.overflow = "auto";
  });

  document.body.style.overflow = "hidden";
});
