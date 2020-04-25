const cellElements = document.querySelectorAll("[data-cell]")


cellElements.forEach((cellElement) => {
  cellElement.addEventListener("click", handleClick, { once: true })
})

function handleCLick(e) {
  console.log("clicked")
}