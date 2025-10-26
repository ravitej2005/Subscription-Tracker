const baseURL = `http://localhost:8080/api/auth`
let content = document.querySelector(".content");

const container = document.getElementById("authContainer");
const toggleBtn = document.getElementById("toggleBtn");

const signUpForm = document.querySelector(".signup");
const signInForm = document.querySelector(".signin");

const signUpFullName = document.querySelector(".sign-up-full-name");
const signUpEmail = document.querySelector(".sign-up-email");
const signUpPassword = document.querySelector(".sign-up-password");
const signUpCnfPass = document.querySelector(".sign-up-confirm-password");
const signUpPhone = document.querySelector(".sign-up-phone");
const signUpCheckBox = document.querySelector(".sign-up-checkbox");

const signInEmail = document.querySelector(".sign-in-email");
const signInPassword = document.querySelector(".sign-in-password");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;
const phoneRegex = /^[6-9]\d{9}$/;

let isSignIn = true;
toggleBtn.addEventListener("click", () => {
  container.classList.toggle("sign-up-mode");
  isSignIn = !isSignIn;

  if (isSignIn) {
    toggleBtn.textContent = "Sign Up";
    document.querySelector(".info-section h3").textContent = "New here?";
    document.querySelector(".info-section p").textContent =
      "Create your account to start tracking subscriptions smartly.";
  } else {
    toggleBtn.textContent = "Sign In";
    document.querySelector(".info-section h3").textContent =
      "Already have an account?";
    document.querySelector(".info-section p").textContent =
      "Login to track and manage all your subscriptions effortlessly.";
  }

  [signUpFullName, signUpEmail, signUpPassword, signUpCnfPass, signUpPhone, signInEmail, signInPassword].forEach(removeError)
});


function showError(input, message) {
  removeError(input);
  const error = document.createElement("small");
  error.classList.add("error-message");
  error.textContent = message;
  input.parentElement.appendChild(error);
  input.classList.add("error-input");
}

function removeError(input) {
  const parent = input.parentElement;
  const existingError = parent.querySelector(".error-message");
  if (existingError) existingError.remove();
  input.classList.remove("error-input");
}

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;


  [
    signUpFullName,
    signUpEmail,
    signUpPassword,
    signUpCnfPass,
    signUpPhone,
  ].forEach(removeError);


  if (signUpFullName.value.trim() === "") {
    showError(signUpFullName, "Full name is required");
    valid = false;
  }


  if (!emailRegex.test(signUpEmail.value.trim())) {
    showError(signUpEmail, "Enter a valid email address");
    valid = false;
  }


  if (!passwordRegex.test(signUpPassword.value.trim())) {
    showError(
      signUpPassword,
      "Password must have 6+ chars, 1 uppercase, 1 lowercase, and 1 digit"
    );
    valid = false;
  }


  if (signUpPassword.value.trim() !== signUpCnfPass.value.trim()) {
    showError(signUpCnfPass, "Passwords do not match");
    valid = false;
  }


  if (
    signUpPhone.value.trim() !== "" &&
    !phoneRegex.test(signUpPhone.value.trim())
  ) {
    showError(signUpPhone, "Enter a valid 10-digit mobile number");
    valid = false;
  }


  if (!signUpCheckBox.checked) {
    alert("Please agree to the Terms & Conditions before continuing.");
    valid = false;
  }

  if (valid) {
    const name = signUpFullName.value.trim();
    const email = signUpEmail.value.trim();
    const password = signUpPassword.value.trim();
    const cnfPassword = signUpCnfPass.value.trim();
    const phoneNumber = signUpPhone.value.trim();

    axios.post(`${baseURL}/register`, {
      "name": `${name}`,
      "email": `${email}`,
      "password": `${password}`,
      "confirmPassword": `${cnfPassword}`,
      "phoneNumber": `${phoneNumber}`
    })
      .then(function (response) {
        console.log(response);
        signUpForm.reset();
        alert("Sign Up Successful!");
      })
      .catch(function (error) {
        console.log(error);
        alert(`Sign Up Failed!\n${error.response.data}`);
      });
  }
});

// signInForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   let valid = true;

//   [signInEmail, signInPassword].forEach(removeError);

//   if (!emailRegex.test(signInEmail.value.trim())) {
//     showError(signInEmail, "Enter a valid email address");
//     valid = false;
//   }

//   if (signInPassword.value.trim() === "") {
//     showError(signInPassword, "Password is required");
//     valid = false;
//   }

//   if (valid) {
//     const email = signInEmail.value.trim();
//     const password = signInPassword.value.trim();

//     axios.post(`${baseURL}/login`, {
//       "email": `${email}`,
//       "password": `${password}`
//     })
//       .then(function (response) {
//         console.log(response);
//         signInForm.reset();
//         alert("Login Successful!");

//         e.preventDefault();
//         const url = `../dashboard.html`;
//         const res = fetch(url).then(function (response) {
//           return response.text().then(function (response) {
//             content.innerHTML = html; // update content dynamically
//             window.history.pushState({}, "", url); // update URL without 
//           });
//         });
//       })
//       .catch(function (error) {
//         console.log(error);
//         alert(`Log in Failed!\n${error.response.data}`);
//       });
//   }
// });


// window.addEventListener('popstate', async () => {
//   const res = await fetch(location.pathname);
//   content.innerHTML = await res.text();
// });

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let valid = true;

  [signInEmail, signInPassword].forEach(removeError);

  if (!emailRegex.test(signInEmail.value.trim())) {
    showError(signInEmail, "Enter a valid email address");
    valid = false;
  }

  if (signInPassword.value.trim() === "") {
    showError(signInPassword, "Password is required");
    valid = false;
  }

  if (!valid) return;

  const email = signInEmail.value.trim();
  const password = signInPassword.value.trim();

  try {
    const response = await axios.post(`${baseURL}/login`, { email, password });
    console.log(response);
    signInForm.reset();
    alert("Login Successful!");

    // SPA-style navigation
    const url = "../dashboard.html";
    const res = await fetch(url);
    const html = await res.text();
    content.innerHTML = html; // inject dashboard content
    window.history.pushState({}, "", url); // update URL without full reload

  } catch (error) {
    console.log(error);
    alert(`Log in Failed!\n${error.response?.data || error.message}`);
  }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', async () => {
  const res = await fetch(location.pathname);
  const html = await res.text();
  content.innerHTML = html;
});

