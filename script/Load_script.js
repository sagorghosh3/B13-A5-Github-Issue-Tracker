// console.log(" i'm");
const IssueContainer = document.getElementById("issue-container");
const loadSpinner = document.getElementById("load-spinner");
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
let allIssues = [];

function showLoading() {
    loadSpinner.classList.remove("hidden");
    IssueContainer.innerHTML = "";
}

function hideLoading() {
    loadSpinner.classList.add("hidden");
}

function setActiveBtn(activeBtn) {

    allBtn.classList.remove("btn-primary");
    openBtn.classList.remove("btn-primary");
    closeBtn.classList.remove("btn-primary");

    activeBtn.classList.add("btn-primary");
}


allBtn.addEventListener("click", () => {

    setActiveBtn(allBtn);

    displayIssue(allIssues);

});

openBtn.addEventListener("click", () => {

    setActiveBtn(openBtn);

    const openIssues = allIssues.filter(issue => issue.status === "open");

    displayIssue(openIssues);

});

closeBtn.addEventListener("click", () => {

    setActiveBtn(closeBtn);

    const closeIssues = allIssues.filter(issue => issue.status === "closed");

    displayIssue(closeIssues);

});




const loadIssue = () => {
    showLoading()
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then((json) => displayIssue(json.data));
    hideLoading()

    // loadSpinner.classList.add("hidden"); //need to work
    // console.log(IssueContainer);
    // IssueContainer.innerHTML = "Dekhao tmi kothay bosba"
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