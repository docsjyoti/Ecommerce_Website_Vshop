document.addEventListener("DOMContentLoaded", () => {

    console.log("[INIT] DOM fully loaded. Initializing login module...");

    // ===== ELEMENTS =====
    const loginBtn = document.getElementById("loginBtn");
    const modal = document.getElementById("loginModal");
    const closeBtn = document.getElementById("closeBtn");

    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const email = document.getElementById("emailId");

    const userError = document.getElementById("userError");
    const passError = document.getElementById("passError");
    const invalidEmail = document.getElementById("InvalidEmail");

    const togglePassword = document.getElementById("togglePassword");
    const submitBtn = document.getElementById("submitBtn");

    console.log("[INIT] Elements mapped successfully");

    // ===== COMMON UTIL =====
    function log(type, message, data = "") {
        console.log(`[${type}] ${message}`, data);
    }

    // ===== MODAL HANDLER =====
    function toggleModal(modal, show) {
        if (show) {
            log("STATE", "Opening modal");
            modal.classList.add("show");
        } else {
            log("STATE", "Closing modal");
            modal.classList.remove("show");
        }
    }

    // ===== RESET FORM =====
    function resetForm() {
        log("STATE", "Resetting form fields and errors");

        username.value = "";
        email.value = "";
        password.value = "";

        userError.textContent = "";
        passError.textContent = "";
        invalidEmail.textContent = "";
    }

    // ===== BUTTON STATE =====
    function setLoading(button, isLoading) {
        button.disabled = isLoading;
        button.textContent = isLoading ? "Logging in..." : "Login";

        log("STATE", isLoading ? "Button loading state ON" : "Button reset");
    }

    // ===== VALIDATION =====
    function validateForm() {
        log("VALIDATION", "Running validation checks...");

        let isValid = true;

        // clear old errors
        userError.textContent = "";
        passError.textContent = "";
        invalidEmail.textContent = "";

        if (username.value.trim() === "") {
            userError.textContent = "Username required";
            log("VALIDATION", "Username is empty");
            isValid = false;
        }

        if (
            email.value.trim() === "" ||
            !email.value.includes("@") ||
            !email.value.includes(".com")
        ) {
            invalidEmail.textContent = "Valid Email-ID required";
            log("VALIDATION", "Invalid email");
            isValid = false;
        }

        if (password.value.trim().length < 4) {
            passError.textContent = "Min 4 characters required";
            log("VALIDATION", "Password too short");
            isValid = false;
        }

        log("VALIDATION", `Result: ${isValid ? "PASS" : "FAIL"}`);
        return isValid;
    }

    // ===== LOGIN CLICK =====
    function handleLoginClick() {
        log("ACTION", "Login button clicked");

        // Ensure fresh form every time user opens modal
        resetForm();

        toggleModal(modal, true);
        loginBtn.classList.add("active");
    }

    // ===== CLOSE HANDLER =====
    function handleClose() {
        log("ACTION", "Closing modal");

        toggleModal(modal, false);

        // Reset form when modal closes
        resetForm();
    }

    // ===== FAKE API =====
    function fakeLoginAPI(callback) {
        log("API", "Simulating login API call...");
        setTimeout(callback, 1500);
    }

    // ===== EVENTS =====

    // Open modal
    loginBtn.addEventListener("click", handleLoginClick);

    // Close modal (X)
    closeBtn.addEventListener("click", handleClose);

    // Close on outside click
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            handleClose();
        }
    });

    // Close on ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            handleClose();
        }
    });

    // Toggle password
    togglePassword.addEventListener("click", () => {
        const isPassword = password.type === "password";
        password.type = isPassword ? "text" : "password";
        togglePassword.textContent = isPassword ? "🙈" : "👁️";

        log("ACTION", `Password toggled → ${password.type}`);
    });

    // Submit
    submitBtn.addEventListener("click", () => {
        log("ACTION", "Submit button clicked");

        if (!validateForm()) {
            log("SUBMIT", "Validation failed");
            return;
        }

        setLoading(submitBtn, true);

        fakeLoginAPI(() => {
            log("API", "Login success");

            alert("Login Successful ✅");

            setLoading(submitBtn, false);
            handleClose(); // reuse close + reset
        });
    });

});