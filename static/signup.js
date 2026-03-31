// ─── Signup form ─────────────────────────────────────

const API_BASE = (window.SUMMER_BRIDGE_API_BASE || "").replace(/\/$/, "");

document.getElementById("signup-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name           = document.getElementById("student-name").value.trim();
  const studentClass   = document.getElementById("student-class").value;
  const parentName     = document.getElementById("parent-name").value.trim();
  const parentWhatsapp = document.getElementById("parent-whatsapp").value.trim();
  const schoolName     = document.getElementById("school-name").value.trim();

  if (!name) {
    alert("Please enter your name.");
    return;
  }
  if (!studentClass) {
    alert("Please select your class.");
    return;
  }

  const btn = document.getElementById("submit-btn");
  btn.disabled = true;
  btn.innerHTML = '<span class="btn-signup-text">Please wait…</span>';

  try {
    const res = await fetch(`${API_BASE}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        student_class: studentClass,
        parent_name: parentName,
        parent_whatsapp: parentWhatsapp,
        school_name: schoolName,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Signup failed. Please try again.");
      btn.disabled = false;
      btn.innerHTML = '<span class="btn-signup-text">Start Learning <span style="opacity:0.75;font-weight:500;font-family:\'Noto Sans Malayalam\',sans-serif;font-size:0.95em"> · പഠനം ആരംഭിക്കുക</span></span><span class="btn-signup-arrow material-symbols-outlined">arrow_forward</span>';
      return;
    }

    window.location.href = data.redirect;
  } catch (err) {
    console.error(err);
    alert("Could not connect to server. Please try again.");
    btn.disabled = false;
    btn.innerHTML = '<span class="btn-signup-text">Start Learning <span style="opacity:0.75;font-weight:500;font-family:\'Noto Sans Malayalam\',sans-serif;font-size:0.95em"> · പഠനം ആരംഭിക്കുക</span></span><span class="btn-signup-arrow material-symbols-outlined">arrow_forward</span>';
  }
});
