$(function() {
  const sidebarContainer = $("#container-sidebar");

  sidebarContainer.load("../../../../components/sidebar.html", function(response, status, xhr) {
    if (status === "error") {
      console.error("Error loading sidebar:", xhr.statusText);
      sidebarContainer.html("<p>Error loading sidebar</p>");
    } else {
      sidebarContainer.trigger("load");
    }
  });
})