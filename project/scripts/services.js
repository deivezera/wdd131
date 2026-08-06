const serviceList = document.getElementById("serviceList");
const faqList = document.getElementById("faqList");

const services = [
  {
    num: "01",
    title: "Website development",
    summary:
      "Fast, modern websites that look professional and turn visitors into leads. We start from your content and goals, then build a mobile-first site with clear calls to action and room to grow.",
    tags: ["Responsive", "Accessible", "SEO-ready", "Analytics"],
  },
  {
    num: "02",
    title: "Database setup and management",
    summary:
      "Organized, secure, and maintained data behind your business. We migrate spreadsheets into usable systems, set up backups and access rules, and keep everything running reliably.",
    tags: ["Migration", "Security", "Backups", "Reporting"],
  },
  {
    num: "03",
    title: "AI solutions",
    summary:
      "Practical AI that saves real hours: chatbots that answer common questions, document tools that draft and summarize, and automations that replace repetitive manual work.",
    tags: ["Chatbots", "Automation", "Document tools"],
  },
  {
    num: "04",
    title: "MVP development",
    summary:
      "Take a founder from idea to a working, launchable product. We scope the smallest version that proves your concept, then ship it quickly without building features nobody asked for.",
    tags: ["Planning", "Prototyping", "Launch"],
  },
  {
    num: "05",
    title: "Business intelligence",
    summary:
      "Dashboards and insights that turn scattered data into clear decisions. We connect your tools, define the numbers that matter, and present them in a way your team actually uses.",
    tags: ["Dashboards", "Metrics", "Forecasting"],
  },
];

const faqs = [
  {
    question: "How long does a typical website take?",
    answer:
      "Most small-business websites are ready in three to six weeks. The timeline depends on how quickly we can confirm content and review design drafts together.",
  },
  {
    question: "Do I need any technical knowledge to work with you?",
    answer:
      "No. We handle the technical side and keep conversations in plain language. You only need to know your business and your customers, and we do the rest.",
  },
  {
    question: "What does ongoing support include?",
    answer:
      "Hosting, security updates, backups, and small changes such as edits and additions. You get one point of contact who knows your setup, with no call center runaround.",
  },
  {
    question: "How do you keep costs reasonable?",
    answer:
      "We scope only what you need today and say no to over-engineering. Every proposal lists clear deliverables and pricing, so there are no surprise invoices.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We review how the site or system performs, walk you through the handover, and offer an optional support plan so the work keeps paying off.",
  },
];

function buildServiceRow(service) {
  const tags = service.tags
    .map((tag) => `<li class="tag">${tag}</li>`)
    .join("");

  return `
    <article class="service-row">
      <header>
        <span class="service-num">${service.num}</span>
        <h3>${service.title}</h3>
      </header>
      <p>${service.summary}</p>
      <ul class="service-tags">${tags}</ul>
    </article>
  `;
}

function renderServices(list) {
  if (list.length === 0) {
    serviceList.innerHTML = `<p>No services available right now. Please check back soon.</p>`;
    return;
  }

  serviceList.innerHTML = list.map(buildServiceRow).join("");
}

function buildFaqItem(faq) {
  return `
    <div class="faq-item">
      <button class="faq-question" type="button" aria-expanded="false">
        <span>${faq.question}</span>
        <span class="faq-icon" aria-hidden="true">+</span>
      </button>
      <div class="faq-answer">
        <p>${faq.answer}</p>
      </div>
    </div>
  `;
}

function renderFaq(list) {
  if (list.length === 0) {
    faqList.innerHTML = `<p>No questions yet. Reach out and we will answer directly.</p>`;
    return;
  }

  faqList.innerHTML = list.map(buildFaqItem).join("");
}

function initFaq() {
  faqList.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const isOpen = item.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });
}

renderServices(services);
renderFaq(faqs);
initFaq();
