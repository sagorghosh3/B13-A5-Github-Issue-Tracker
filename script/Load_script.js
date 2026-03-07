// console.log(" i'm");
const IssueContainer = document.getElementById("issue-container");

const loadIssue = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")    // give promise of response
        .then(res => res.json())  //promise of json data
        .then((json) => displayIssue(json.data));
    console.log(IssueContainer);
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
                    <div class="badge badge-soft badge-error" id="status">High</div>
                </div>
                <h2 id="heading" class="text-black">Fix navigation menu on mobile devices</h2>
                <p id="description" class="opacity-50 truncate">The navigation menu doesn't collapse properly on mobile
                    devices...</p>
                <div class="space-y-5">
                    <div class="badge badge-outline badge-error ">
                        <span><img src="./assets/bug.png" alt=""></span> BUG
                    </div>
                    <div class="badge badge-outline badge-warning "><span><img src="./assets/help.png" alt=""></span>
                        HELP WANTED</div>

                    <hr>

                    <p class="opacity-50">#1 by john_doe</p>
                    <p class="opacity-50">1/15/2024</p>
                </div>

            </div>
    `
        IssueContainer.appendChild(div);
    }
}


loadIssue();