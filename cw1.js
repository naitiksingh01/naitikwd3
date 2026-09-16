// ---- In-memory student data --------------------------------------------
let students = [
  { rollNo: "101", name: "Riya Sharma", branch: "CSE", year: "2nd Year" },
  { rollNo: "102", name: "Aman Verma", branch: "ECE", year: "3rd Year" },
  { rollNo: "103", name: "Kabir Anand", branch: "ME", year: "1st Year" }
];

// ---- Element references --------------------------------------------------
const studentForm = document.getElementById("studentForm");
const rollNoInput = document.getElementById("rollNo");
const nameInput = document.getElementById("name");
const branchInput = document.getElementById("branch");
const yearInput = document.getElementById("year");

const searchInput = document.getElementById("searchInput");
const filterBranch = document.getElementById("filterBranch");

const tableBody = document.getElementById("studentTableBody");
const noRecordMsg = document.getElementById("noRecordMsg");
const totalCount = document.getElementById("totalCount");

// ---- Render ----------------------------------------------------------
function renderStudents() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const branchFilter = filterBranch.value;

  const filtered = students.filter(s => {
    const matchesName = s.name.toLowerCase().includes(searchTerm);
    const matchesBranch = branchFilter === "All" || s.branch === branchFilter;
    return matchesName && matchesBranch;
  });

  tableBody.innerHTML = "";

  if (filtered.length === 0) {
    noRecordMsg.style.display = "block";
  } else {
    noRecordMsg.style.display = "none";
    filtered.forEach(s => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${escapeHtml(s.rollNo)}</td>
        <td>${escapeHtml(s.name)}</td>
        <td>${escapeHtml(s.branch)}</td>
        <td>${escapeHtml(s.year)}</td>
        <td><button class="btn-delete" data-roll="${escapeHtml(s.rollNo)}">Delete</button></td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Total count always reflects ALL students on file, not just filtered view
  totalCount.textContent = students.length;
}

// ---- Add student -----------------------------------------------------
studentForm.addEventListener("submit", e => {
  e.preventDefault();

  const rollNo = rollNoInput.value.trim();
  const name = nameInput.value.trim();
  const branch = branchInput.value;
  const year = yearInput.value;

  if (!rollNo || !name || !branch || !year) return;

  const duplicate = students.some(s => s.rollNo === rollNo);
  if (duplicate) {
    alert("A student with this Roll No. already exists.");
    return;
  }

  students.push({ rollNo, name, branch, year });
  studentForm.reset();

  // Reset search/filter so the newly added student is always visible immediately
  searchInput.value = "";
  filterBranch.value = "All";

  renderStudents();
});

// ---- Delete student ----------------------------------------------------
tableBody.addEventListener("click", e => {
  if (e.target.classList.contains("btn-delete")) {
    const roll = e.target.getAttribute("data-roll");
    students = students.filter(s => s.rollNo !== roll);
    renderStudents();
  }
});

// ---- Search & filter --------------------------------------------------
searchInput.addEventListener("input", renderStudents);
filterBranch.addEventListener("change", renderStudents);

// ---- Utility -------------------------------------------------------------
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = String(str);
  return div.innerHTML;
}

// ---- Initial render ----------------------------------------------------
renderStudents();
