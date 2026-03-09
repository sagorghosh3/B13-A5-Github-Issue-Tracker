const IssueContainer = document.getElementById("issue-container");
const loadSpinner = document.getElementById("load-spinner");
const searchInput = document.getElementById("searchInput");

const countAll = document.getElementById("count-all");
const countOpen = document.getElementById("count-open");
const countClosed = document.getElementById("count-closed");

let allIssues = [];
let currentTab = "all";

function showLoading() {
    loadSpinner.classList.remove("hidden");
}

function hideLoading() {
    loadSpinner.classList.add("hidden");
}

/* ---------- LOAD ALL ISSUES ---------- */

async function loadIssue() {
    try {
        showLoading();

        const res = await fetch(
            "https://phi-lab-server.vercel.app/api/v1/lab/issues"
        );
        const data = await res.json();

        allIssues = data?.data || [];

        updateCounters();
        filterIssues();
    } catch (err) {
        console.error(err);
    } finally {
        hideLoading();
    }
}

/* ---------- COUNTER ---------- */

function updateCounters() {
    const open = allIssues.filter(i => i.status?.toLowerCase() === "open").length;
    const closed = allIssues.filter(i => i.status?.toLowerCase() === "closed").length;

    countAll.innerText = allIssues.length;
    countOpen.innerText = open;
    countClosed.innerText = closed;
}

/* ---------- TAB SWITCH ---------- */

function switchTab(tab) {
    currentTab = tab;

    const tabs = ["all", "open", "closed"];

    tabs.forEach(t => {
        const btn = document.getElementById("btn-" + t);

        if (!btn) return;

        if (t === tab) {
            btn.classList.add("btn-primary");
        } else {
            btn.classList.remove("btn-primary");
        }
    });

    filterIssues();
}

/* ---------- FILTER ---------- */

function filterIssues() {
    if (currentTab === "all") {
        displayIssue(allIssues);
        return;
    }

    const filtered = allIssues.filter(
        i => i.status?.toLowerCase() === currentTab
    );

    displayIssue(filtered);
}

/* ---------- DISPLAY CARDS ---------- */

function displayIssue(issues) {
    IssueContainer.innerHTML = "";

    issues.forEach(issue => {
        const status = issue.status?.toLowerCase() || "open";

        const border =
            status === "closed"
                ? "border-purple-500"
                : "border-green-500";

        const icon =
            status === "closed"
                ? "./assets/Close-Status.png"
                : "./assets/Open-Status.png";

        const labels = issue.labels || [];

        const div = document.createElement("div");

        div.className = "cursor-pointer";

        div.innerHTML = `
    <div class="space-y-5 rounded-xl p-5 bg-base-100 shadow-md border-t-4 ${border}">

      <div class="flex justify-between items-center">

        <img src="${icon}" alt="status">

        <div class="badge badge-soft badge-error">
          ${issue.priority || ""}
        </div>

      </div>

      <h2 class="font-semibold text-black">
        ${issue.title || ""}
      </h2>

      <p class="text-sm opacity-60 truncate">
        ${issue.description || ""}
      </p>

      <div class="space-y-3">

        <div class="flex gap-2 flex-wrap">

          ${labels[0]
                ? `<span class="badge badge-outline badge-error">${labels[0]}</span>`
                : ""
            }

          ${labels[1]
                ? `<span class="badge badge-outline badge-warning">${labels[1]}</span>`
                : ""
            }

        </div>

        <hr>

        <p class="text-xs opacity-50">
          #${issue.id} by ${issue.author || "unknown"}
        </p>

        <p class="text-xs opacity-50">
          ${issue.createdAt ? new Date(issue.createdAt).toLocaleDateString() : ""}
        </p>

      </div>

    </div>
    `;

        div.addEventListener("click", () => {
            loadSingleIssue(issue.id);
        });

        IssueContainer.appendChild(div);
    });
}

/* ---------- SINGLE ISSUE ---------- */

async function loadSingleIssue(id) {
    try {
        const res = await fetch(
            `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
        );
        const data = await res.json();

        showIssueModal(data?.data);
    } catch (err) {
        console.error(err);
    }
}
/* ---------- Modal ---------- */

function showIssueModal(issue) {

    if (!issue) return;

    document.getElementById("modal_title").innerText = issue.title || "";
    document.getElementById("modal_desc").innerText = issue.description || "";
    document.getElementById("modal_author").innerText = issue.author || "";
    document.getElementById("modal_status").innerText = issue.status || "";
    document.getElementById("modal_priority").innerText = issue.priority || "";

    document.getElementById("modal_label").innerText =
        issue.labels?.join(", ") || "";

    // NEW
    document.getElementById("modal_assignee").innerText =
        issue.author || "";

    // NEW
    document.getElementById("modal_date").innerText =
        issue.createdAt
            ? new Date(issue.createdAt).toLocaleDateString()
            : "";

    document.getElementById("issue_modal").showModal();
}

/* ---------- SEARCH (DEBOUNCE) ---------- */

let searchTimer;

searchInput.addEventListener("keyup", e => {
    const text = e.target.value.trim();

    clearTimeout(searchTimer);

    searchTimer = setTimeout(() => {
        if (text === "") {
            filterIssues();
            return;
        }

        searchIssues(text);
    }, 500);
});

async function searchIssues(text) {
    try {
        showLoading();

        const res = await fetch(
            `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
        );

        const data = await res.json();

        displayIssue(data?.data || []);
    } catch (err) {
        console.error(err);
    } finally {
        hideLoading();
    }
}
/* ---------- INIT ---------- */

loadIssue();