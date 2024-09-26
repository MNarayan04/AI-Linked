import { stringify } from "postcss";

export default defineBackground(() => {
  chrome.runtime.onMessage.addListener(
    async (message, sender, sendResponse) => {
      if (message.action === "insertResponse") {
        // Get the currently active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const tabId = tabs[0]?.id;
          if (!tabId) return -1;

          const response = message.response;

          chrome.scripting.executeScript(
            {
              target: { tabId: tabId, allFrames: true },
              function: insertResponseToEditableDiv,
              args: [response],
            },
            (res) => {
              console.log("Response from executeScript", res);
              // window?.close();
            }
          );
        });
      }
    }
  );

  // Function to insert response into the contenteditable div
  function insertResponseToEditableDiv(message: string) {
    const aiIcon = document.getElementById("ai-icon");

    // Check if the AI icon exists
    if (aiIcon) {
      const parentElement = aiIcon.parentElement;
      if (!parentElement) {
        return { message: "Parent element not found!" };
      }

      // Select the contenteditable div that is a sibling of the AI icon
      const editableDiv = parentElement.querySelector("div[contenteditable='true']");

      console.log("Attempting to insert message:", message);
      console.log("Editable div:", editableDiv);

      if (!editableDiv) {
        console.error("Contenteditable div not found!");
        return { message: "Contenteditable div not found!" };
      }

      // Insert the response into the contenteditable div
      const newNode = document.createTextNode(message);
      const para = document.createElement("p");
      para.appendChild(newNode);
      editableDiv.removeChild(editableDiv.firstChild as Node);
      editableDiv.appendChild(para);

      // Remove the placeholder if it exists
      const placeholder = document.getElementsByClassName("msg-form__placeholder")[0] as HTMLElement;
      if (placeholder) {
        placeholder.classList.remove("msg-form__placeholder");
      }

      // Remove the AI icon from the DOM
      parentElement.removeChild(aiIcon);

      return { message: "Response inserted!" };
    }
  }
});
