// Pre-defined dataset of plastic items
const plasticItems = [
  {
    id: 1,
    name: "PET Bottle",
    description: "Polyethylene Terephthalate, commonly used in bottles.",
    recyclingCode: "1",
    environmentalImpact: "High recyclability but often not recycled properly.",
    commonUses: ["Bottles", "Food containers"],
    alternatives: ["Glass bottles", "Stainless steel containers"],
  },
  {
    id: 2,
    name: "HDPE Container",
    description:
      "High-Density Polyethylene, used in milk jugs and detergent bottles.",
    recyclingCode: "2",
    environmentalImpact: "Recyclable and relatively safe for reuse.",
    commonUses: ["Milk jugs", "Detergent bottles"],
    alternatives: ["Glass containers", "Cardboard packaging"],
  },
  {
    id: 3,
    name: "PVC Pipe",
    description: "Polyvinyl Chloride, used in plumbing and construction.",
    recyclingCode: "3",
    environmentalImpact:
      "Difficult to recycle and releases harmful chemicals when burned.",
    commonUses: ["Pipes", "Cables"],
    alternatives: ["Copper pipes", "ABS pipes"],
  },
  {
    id: 4,
    name: "LDPE Bag",
    description: "Low-Density Polyethylene, used in plastic bags and wraps.",
    recyclingCode: "4",
    environmentalImpact:
      "Low recyclability and contributes to plastic pollution.",
    commonUses: ["Plastic bags", "Wraps"],
    alternatives: ["Reusable cloth bags", "Paper bags"],
  },
];

// DOM Elements
const fileInput = document.getElementById("file-input");
const loadingSpinner = document.getElementById("loading-spinner");
const scanResult = document.getElementById("scan-result");
const scanButton = document.getElementById("scan-button");
const itemName = document.getElementById("item-name");
const itemInfo = document.getElementById("item-info");

// Validate file input
function validateFile(file) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please upload a valid image file (JPEG, PNG).");
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("File size too large. Please upload an image under 5MB.");
  }
}

// Show loading state
function showLoadingState() {
  loadingSpinner.style.display = "block";
  scanButton.disabled = true;
  scanButton.textContent = "Scanning...";
  itemName.textContent = "Analyzing...";
  itemInfo.textContent = "";
}

// Hide loading state
function hideLoadingState() {
  loadingSpinner.style.display = "none";
  scanButton.disabled = false;
  scanButton.textContent = "Scan Image";
}

// Simulate scanning by selecting a random item from the dataset
function simulateScan() {
  const randomIndex = Math.floor(Math.random() * plasticItems.length);
  return plasticItems[randomIndex];
}

// Update results with the scanned item's details
function updateResults(item) {
  itemName.textContent = `Plastic Type: ${item.name}`;
  itemInfo.innerHTML = `
    <strong>Description:</strong> ${item.description}<br>
    <strong>Recycling Code:</strong> ${item.recyclingCode}<br>
    <strong>Environmental Impact:</strong> ${item.environmentalImpact}<br>
    <strong>Common Uses:</strong> ${item.commonUses.join(", ")}<br>
    <strong>Eco-Friendly Alternatives:</strong> ${item.alternatives.join(", ")}
  `;
  scanResult.style.display = "block"; // Show the result section
}

// Main scan function
async function handleScan() {
  try {
    // Validate file input
    if (!fileInput.files || fileInput.files.length === 0) {
      throw new Error("Please select an image first!");
    }

    const file = fileInput.files[0];
    validateFile(file);

    // Show loading state
    showLoadingState();

    // Simulate a delay to mimic scanning
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate scanning by selecting a random item
    const scannedItem = simulateScan();

    // Update results
    updateResults(scannedItem);
  } catch (error) {
    console.error("Scanning Error:", error);
    itemName.textContent = "Error";
    itemInfo.textContent = `Failed to analyze item: ${error.message}`;
    scanResult.style.display = "block"; // Show the result section even on error
  } finally {
    // Reset UI state
    hideLoadingState();
    fileInput.value = ""; // Clear file input
  }
}

// Event listener for the scan button
document.getElementById("scan-button").addEventListener("click", handleScan);
