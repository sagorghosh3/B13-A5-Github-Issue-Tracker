// console.log(" i'm");
const IssueContainer = document.getElementById("issue-container");
const loadSpinner = document.getElementById("load-spinner");

let allIssues = [];
let currentTab = "all";

function showLoading() {
    loadSpinner.classList.remove("hidden");
    IssueContainer.innerHTML = "";
}

function hideLoading() {
    loadSpinner.classList.add("hidden");
}

function switchTab(tab) {

    const tabs = ["all", "open", "close"];
    for (const t of tabs) {
        const btnName = document.getElementById("btn-" + t);
        if (t === tab) {
            btnName.classList.add("btn-primary");
        } else {
            btnName.classList.remove("btn-primary");
        }
    }

}


const loadIssue = () => {
    showLoading()
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then((json) => displayIssue(json.data));
    hideLoading()
};

const displayIssue = (issues) => {
    IssueContainer.innerHTML = ""
    for (let issue of issues) {
        const div = document.createElement("div");
        div.innerHTML = `
                <div class="space-y-6 rounded-xl p-5 bg-base-100 shadow-md border-0 border-t-2" id="border">
                <div class="flex justify-between items-center ">
                    <img src="./assets/Open-Status.png" alt="" id="icon">
                    <div class="badge badge-soft badge-error" id="status">${issue.priority}</div>
                </div>
                <h2 id="Title" class="text-black">${issue.title}</h2>
                <p id="description" class="opacity-50 truncate">${issue.description}</p>
                <div class="space-y-5">
                    <div class="badge badge-outline badge-error ">
                        <span><img src="./assets/bug.png" alt=""></span> ${issue.labels}
                    </div>
                    <div class="badge badge-outline badge-warning "><span><img src="./assets/help.png" alt=""></span>
                        ${issue}</div>

                    <hr>

                    <p class="opacity-50">#${issue.id} by ${issue.author}</p>
                    <p class="opacity-50">${new Date(issue.updatedAt).toLocaleDateString()}</p>
                </div>

            </div>
    `
        IssueContainer.appendChild(div);
    }
}


loadIssue();

