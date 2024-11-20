"use client";

export function convertImageToBase64(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        // Event listener for successful file reading
        reader.onloadend = function () {
            const base64String = reader.result; // The Base64 encoded string
            resolve(base64String); // Resolve the promise with the Base64 string
        };

        // Event listener for file reading errors
        reader.onerror = function () {
            reject("Error reading file."); // Reject the promise in case of an error
        };

        // Validate if the file is an image
        if (file && file.type.startsWith("image")) {
            reader.readAsDataURL(file); // Read the file as a Data URL (Base64)
        } else {
            reject("The selected file is not an image."); // Reject if the file is not an image
        }
    });
}
