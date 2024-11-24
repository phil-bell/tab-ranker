let tabHistory = []; // To store tab IDs in order of usage
const labels = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];
// Function to update tab history
function updateTabHistory(tabId) {
	// Remove the tab ID if it already exists
	tabHistory = tabHistory.filter((id) => id !== tabId);
	// Add the tab ID to the front
	tabHistory.unshift(tabId);
	console.log(tabHistory);
}

// Listener for tab activation
chrome.tabs.onActivated.addListener((activeInfo) => {
	updateTabHistory(activeInfo.tabId);
	updateTabColors();
});

// Listener for tab updates (e.g., navigation)
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
	if (changeInfo.status === "complete") {
		updateTabHistory(tabId);
		updateTabColors();
	}
});

function getTitle(rank, labels) {
  console.log(document.title)
   for (let label in labels){
    if (document.title.startsWith(label)){
      document.title = document.title.slice(3)
    }
   }
   document.title = `${labels[rank]} ${document.title}`
}

// Function to assign colors to tabs
function updateTabColors() {
	tabHistory.forEach((tabId, index) => {
		chrome.scripting.executeScript({
      target: {tabId},
      func: getTitle,
      args: [index, labels],
	}).then((e) => console.log(e));
})}