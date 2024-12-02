/** 
 * https://github.com/papaguycodes 
 * 💡 In the Beginning, PaPaGuy wrote beautiful Codes 💜❤️ 
 */

const drop = document.querySelector(".drop");
const input = document.querySelector(".drop input");
const text = document.querySelector(".text");
const progress = document.querySelector(".progress");
const fileNamesContainer = document.querySelector(".file-names");
const uploadSuccessMessage = document.querySelector(".upload-success");

let files = [];

input.addEventListener("change", (e) => {
    drop.style.display = "none";
    files = e.target.files;
    displayFileNames();
    upload();
});

drop.addEventListener("dragover", (e) => {
    e.preventDefault();
    text.innerHTML = "Release your mouse to drop.";
    drop.classList.add("active");
});

drop.addEventListener("dragleave", (e) => {
    e.preventDefault();
    text.innerHTML = "Drag and drop your documents, photos, and video here.";
    drop.classList.remove("active");
});

drop.addEventListener("drop", (e) => {
    e.preventDefault();
    files = e.dataTransfer.files;
    drop.style.display = "none";
    displayFileNames();
    upload();
});

// Display selected file names with icons
function displayFileNames() {
    fileNamesContainer.innerHTML = ""; // Clear previous file names
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileElement = document.createElement("p");
        const fileType = file.type.split("/")[0]; // Get the file type (image, video, etc.)
        const fileNameElement = document.createElement("span");
        fileNameElement.textContent = file.name;

        const fileIcon = document.createElement("i");
        fileIcon.classList.add("file-icon");

        // Assign icon class based on file type
        if (fileType === "image") {
            fileIcon.classList.add("fa-solid", "fa-image", "image-icon");
        } else if (fileType === "video") {
            fileIcon.classList.add("fa-solid", "fa-video", "video-icon");
        } else if (file.type === "application/pdf") {
            fileIcon.classList.add("fa-solid", "fa-file-pdf", "pdf-icon");
        } else if (file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            fileIcon.classList.add("fa-solid", "fa-file-word", "doc-icon");
        } else if (file.type === "application/vnd.ms-excel" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            fileIcon.classList.add("fa-solid", "fa-file-excel", "excel-icon");
        } else if (file.type === "application/vnd.ms-powerpoint" || file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation") {
            fileIcon.classList.add("fa-solid", "fa-file-powerpoint", "ppt-icon");
        } else if (file.type === "text/plain") {
            fileIcon.classList.add("fa-solid", "fa-file-alt", "txt-icon");
        } else if (file.type === "audio/mpeg" || file.type === "audio/wav") {
            fileIcon.classList.add("fa-solid", "fa-file-audio", "audio-icon");
        } else if (file.type === "application/zip" || file.type === "application/x-zip-compressed" || file.type === "application/x-rar-compressed") {
            fileIcon.classList.add("fa-solid", "fa-file-archive", "zip-icon");
        } else if (file.type === "application/javascript") {
            fileIcon.classList.add("fa-solid", "fa-file-code", "js-icon");
        } else if (file.type === "application/json") {
            fileIcon.classList.add("fa-solid", "fa-file-code", "json-icon");
        } else {
            fileIcon.classList.add("fa-solid", "fa-file", "generic-icon");
        }

        fileElement.appendChild(fileIcon);
        fileElement.appendChild(fileNameElement);
        fileNamesContainer.appendChild(fileElement);
    }
}

// Upload Logic
function upload() {
    let intervalCount = 0.25;
    progress.style.display = "block";
    progress.style.width = `${20 * intervalCount}%`;
    const interval = setInterval(() => {
        intervalCount += 0.25;
        progress.style.width = `${20 * intervalCount}%`;
        if (intervalCount === 5) {
            clearInterval(interval);
            showUploadSuccess();  // Show success message once upload is "complete"
        }
    }, 100);
}

// Show success message after upload completion
function showUploadSuccess() {
    uploadSuccessMessage.style.display = "block";
    uploadSuccessMessage.textContent = "Upload successful! Redirecting in 5 secs...";

    // Refresh the page after 5 seconds
    setTimeout(() => {
        location.reload();  // Reload the page
    }, 5000); // 5 seconds delay
}
