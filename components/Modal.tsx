import React, { useEffect, useState } from "react";
import InsertIcon from "@/assets/icons/insert";
import RegenerateIcon from "@/assets/icons/regenerate";
import SendIcon from "@/assets/icons/send";
import { createRoot } from "react-dom/client";
import RegenerateIcons from "@/assets/icons/regenerate";
import InsertingIcon from "@/assets/icons/insert";
import SendingIcon from "@/assets/icons/send";

const Modal = ({ closeModal, insertResponse }: { closeModal: () => void; insertResponse: (responseText: string) => void; }) => {
  const [input, setInput] = useState("");
  const [responseText, setResponseText] = useState("");
  const [inputText, setInputText] = useState("");
  const [step, setStep] = useState(1);

  const handleGenerate = () => {
    setResponseText("Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.");
    setInputText(input);
    setInput("");
    setStep(2);
  };

  const insertResponseModal = () => {
    insertResponse(responseText);
    closeModal(); // Close modal on successful insertion
  };

  return (
    <div>
      <div className="fixed bg-[#000] z-[200] opacity-50 top-0 w-full h-full" onClick={closeModal}></div>
      <div className="w-[60vw] opacity-100 translate-x-[-50%] translate-y-[-50%] z-[9999] bg-[#F9FAFB] fixed top-[50%] left-[50%] p-[26px] rounded-lg shadow-lg flex flex-col">
        {step === 2 && (
          <div className="flex gap-[26px] flex-col mb-[26px]">
            <div className="ml-auto max-w-[75%] rounded-[12px] bg-[#DFE1E7] p-[16px]">
              <p>{inputText}</p>
            </div>
            <div className="mr-auto max-w-[75%] rounded-[12px] bg-[#DBEAFE] p-[16px]">
              <p>{responseText}</p>
            </div>
          </div>
        )}
        <div className="w-full flex flex-col">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border h-[50px] border-[#C1C7D0] p-2 w-full rounded-lg text-[1.125em]"
            placeholder="Your Prompt"
          />
          <div className="ml-auto flex justify-center mt-[26px]">
            {step === 2 ? (
              <div className="flex flex-row">
                <button
                  onClick={insertResponseModal}
                  className="border border-[#666D80] py-[12px] gap-[10px] items-center rounded-[8px] px-[24px] flex text-[#666D80] text-[1.125em] mr-[26px]"
                >
                  <InsertingIcon height={"16px"} />
                  Insert
                </button>
                <button
                  onClick={handleGenerate}
                  className="bg-[#3B82F6] py-[12px] gap-[10px] items-center rounded-[8px] px-[24px] flex text-[#fff] text-[1.125em]"
                >
                  <RegenerateIcons width={"20px"} height={"20px"} />
                  Regenerate
                </button>
              </div>
            ) : (
              <button
                onClick={handleGenerate}
                className="bg-[#3B82F6] py-[12px] gap-[10px] items-center rounded-[8px] px-[24px] flex text-[#fff] text-[1.125em]"
              >
                <SendingIcon width={"20px"} height={"20px"} />
                Generate
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

// Function to mount the modal
export const mountModal = (insertResponse: (responseText: string) => void) => {
  const modalContainer = document.createElement("div");
  modalContainer.id = "modal-container";
  document.body.appendChild(modalContainer);

  const root = createRoot(modalContainer);

  const closeModal = () => {
    root.unmount(); // Unmount the modal
    modalContainer.remove(); // Remove the container from the DOM
  };

  // Render the Modal into the modalContainer
  root.render(<Modal closeModal={closeModal} insertResponse={insertResponse} />);
};

