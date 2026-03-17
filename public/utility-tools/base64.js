const utf8Encoder = new TextEncoder();
const utf8Decoder = new TextDecoder();

function bytesToBase64(bytes) {
  const chunkSize = 0x8000;
  let binary = "";

  for (let index = 0; index < bytes.length; index += chunkSize) {
    const chunk = bytes.subarray(index, index + chunkSize);
    binary += String.fromCharCode(...chunk);
  }

  return btoa(binary);
}

function encodeText(value) {
  return bytesToBase64(utf8Encoder.encode(value));
}

function decodeText(value) {
  const normalized = value.replace(/\s+/g, "");
  const binary = atob(normalized);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return utf8Decoder.decode(bytes);
}

async function copyText(value, output) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return;
  }

  output.focus();
  output.select();
  document.execCommand("copy");
}

function attachBase64App(app) {
  const input = app.querySelector('[data-role="input"]');
  const output = app.querySelector('[data-role="output"]');
  const resultBox = app.querySelector('[data-role="result-box"]');
  const status = app.querySelector('[data-role="status"]');
  const encodeButton = app.querySelector('[data-action="encode"]');
  const decodeButton = app.querySelector('[data-action="decode"]');
  const copyButton = app.querySelector('[data-action="copy"]');
  const resetButton = app.querySelector('[data-action="reset"]');
  const exampleButtons = app.querySelectorAll("[data-example-input]");

  const messages = {
    encoded: app.dataset.messageEncoded || "",
    decoded: app.dataset.messageDecoded || "",
    copied: app.dataset.messageCopied || "",
    copyEmpty: app.dataset.messageCopyEmpty || "",
    copyFailed: app.dataset.messageCopyFailed || "",
    decodeFailed: app.dataset.messageDecodeFailed || "",
    reset: app.dataset.messageReset || "",
  };

  function setStatus(message, state = "idle") {
    status.textContent = message;
    status.dataset.state = state;
  }

  function setResult(value, state = "filled") {
    output.value = value;
    resultBox.dataset.state = state;
  }

  function handleEncode() {
    try {
      setResult(encodeText(input.value), "filled");
      setStatus(messages.encoded, "success");
    } catch (error) {
      setResult("", "error");
      setStatus(messages.decodeFailed, "error");
    }
  }

  function handleDecode() {
    try {
      setResult(decodeText(input.value), "filled");
      setStatus(messages.decoded, "success");
    } catch (error) {
      setResult("", "error");
      setStatus(messages.decodeFailed, "error");
    }
  }

  async function handleCopy() {
    const value = output.value.trim();

    if (!value) {
      setStatus(messages.copyEmpty, "error");
      return;
    }

    try {
      await copyText(value, output);
      setStatus(messages.copied, "success");
    } catch (error) {
      setStatus(messages.copyFailed, "error");
    }
  }

  function handleReset() {
    input.value = "";
    setResult("", "idle");
    setStatus(messages.reset, "idle");
    input.focus();
  }

  encodeButton.addEventListener("click", handleEncode);
  decodeButton.addEventListener("click", handleDecode);
  copyButton.addEventListener("click", handleCopy);
  resetButton.addEventListener("click", handleReset);

  exampleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      input.value = button.dataset.exampleInput || "";

      if (button.dataset.exampleMode === "decode") {
        handleDecode();
        return;
      }

      handleEncode();
    });
  });
}

document.querySelectorAll("[data-base64-app]").forEach(attachBase64App);
