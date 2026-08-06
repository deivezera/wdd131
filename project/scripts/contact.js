const STORAGE_KEY = "tibian-inquiries";

const form = document.getElementById("inquiryForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const companyInput = document.getElementById("company");
const serviceSelect = document.getElementById("service");
const messageTextarea = document.getElementById("message");
const formError = document.getElementById("formError");
const confirmation = document.getElementById("confirmation");
const inquiryList = document.getElementById("inquiryList");

function loadInquiries() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
}

function saveInquiries(inquiries) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
  } catch (error) {
    return false;
  }
  return true;
}

function getSelectedValue(name) {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : "";
}

function getSelectedPriorities() {
  const checked = document.querySelectorAll('input[name="priorities"]:checked');
  return Array.from(checked).map((input) => input.value);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateForm() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const service = serviceSelect.value;
  const budget = getSelectedValue("budget");
  const message = messageTextarea.value.trim();

  if (name === "") {
    return `Please enter your name.`;
  }

  if (!isValidEmail(email)) {
    return `Please enter a valid work email address.`;
  }

  if (service === "") {
    return `Please choose what you need help with.`;
  }

  if (budget === "") {
    return `Please select a rough budget range.`;
  }

  if (message.length < 20) {
    return `Please add a little more detail about your project, at least 20 characters.`;
  }

  return ``;
}

function buildInquiryCard(inquiry, index) {
  const company = inquiry.company === "" ? "Independent" : inquiry.company;
  const priorities =
    inquiry.priorities.length > 0
      ? `Priorities: ${inquiry.priorities.join(", ")}`
      : "Priorities: not specified";

  return `
    <article class="inquiry">
      <h3>${inquiry.name} · ${company}</h3>
      <p class="inquiry-meta">
        Needs ${inquiry.service} · Budget ${inquiry.budget} · Submitted ${inquiry.date}
      </p>
      <p>${inquiry.message}</p>
      <p>${priorities} · Contact: ${inquiry.email}</p>
    </article>
  `;
}

function renderInquiries(inquiries) {
  if (inquiries.length === 0) {
    inquiryList.innerHTML = `<p class='inquiry-empty'>No inquiries yet. Submit the form and it will appear here.</p>`;
    return;
  }

  const newestFirst = [...inquiries].reverse();
  inquiryList.innerHTML = newestFirst.map(buildInquiryCard).join("");
}

function showConfirmation(inquiry) {
  const budget = inquiry.budget === "Not sure yet" ? "we can help you set a realistic one" : `your ${inquiry.budget} budget`;
  confirmation.innerHTML = `
    <p>
      Thanks, ${inquiry.name}! We have saved your inquiry and will reply to
      ${inquiry.email} within one business day. We will keep ${budget} in mind.
    </p>
  `;
  confirmation.hidden = false;
}

function handleSubmit(event) {
  event.preventDefault();

  const errorMessage = validateForm();

  if (errorMessage !== "") {
    formError.textContent = errorMessage;
    formError.hidden = false;
    confirmation.hidden = true;
    return;
  }

  const inquiry = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    company: companyInput.value.trim(),
    service: serviceSelect.value,
    budget: getSelectedValue("budget"),
    priorities: getSelectedPriorities(),
    message: messageTextarea.value.trim(),
    date: new Date().toLocaleString(),
  };

  const inquiries = loadInquiries();
  inquiries.push(inquiry);

  if (saveInquiries(inquiries)) {
    renderInquiries(inquiries);
    showConfirmation(inquiry);
    formError.hidden = true;
    form.reset();
  } else {
    formError.textContent = `Storage is not available in this browser, so the inquiry could not be saved. Please try again later.`;
    formError.hidden = false;
  }
}

form.addEventListener("submit", handleSubmit);
renderInquiries(loadInquiries());
