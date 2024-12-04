$(document).ready(function () {
  const headerContainer = $("#header");

  headerContainer.load("../../../../components/header.html", function (response, status, xhr) {
    if (status === "error") {
      console.error("Error loading header:", xhr.statusText);
      headerContainer.html("<p>Error loading header</p>");
    } else {
      // Trigger event setelah header selesai dimuat
      headerContainer.trigger('load');
    }
  });
});
