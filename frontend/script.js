const API = "https://be-rest-226557433828.us-central1.run.app/";

let selectedId = null;

function formatDate(date) {
  if (!date) return "-";

  // ubah format MySQL → ISO
  const fixed = date.replace(" ", "T");

  return new Date(fixed).toLocaleString("id-ID");
}

async function getNotes() {
  const res = await fetch(API);
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach((note, index) => {
    list.innerHTML += `
      <div class="col-md-4 mb-3">
        <div class="card shadow-sm h-100 fade-in" style="animation-delay:${index * 0.1}s">
          <div class="card-body">
            <h5>${note.judul}</h5>
             <p class="form-control overflow-auto" style="max-height: 200px;">${note.isi}</p>

            <small class="text-muted">
              Dibuat: ${formatDate(note.createdAt)}<br>
              Update: ${formatDate(note.updatedAt)}
            </small>

            <div class="mt-3">
              <button onclick="openEdit(${note.id}, \`${note.judul}\`, \`${note.isi}\`)" 
                class="btn btn-warning btn-sm">Edit</button>

              <button onclick="deleteNote(${note.id})" 
                class="btn btn-danger btn-sm">Hapus</button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

async function addNote() {
  const judul = document.getElementById("judul").value;
  const isi = document.getElementById("isi").value;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ judul, isi })
  });

  getNotes();
}

async function deleteNote(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  getNotes();
}

// OPEN MODAL
function openEdit(id, judul, isi) {
  selectedId = id;
  document.getElementById("editJudul").value = judul;
  document.getElementById("editIsi").value = isi;

  const modal = new bootstrap.Modal(document.getElementById("editModal"));
  modal.show();
}

// SAVE EDIT
async function saveEdit() {
  const judul = document.getElementById("editJudul").value;
  const isi = document.getElementById("editIsi").value;

  await fetch(`${API}/${selectedId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ judul, isi }),
  });

  bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
  getNotes();
}

getNotes();