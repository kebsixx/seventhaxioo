window.addEventListener("scroll", function () {
  var sections = document.querySelectorAll("section");
  var navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  sections.forEach(function (section, index) {
    var top = section.offsetTop - 200;
    var height = section.offsetHeight;

    if (window.pageYOffset >= top && window.pageYOffset < top + height) {
      navLinks[index].classList.add("active");
    } else {
      navLinks[index].classList.remove("active");
    }
  });
});

// Ambil elemen div untuk card anggota
const memberCardsContainer = document.getElementById("memberCards");
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const backBtn = document.getElementById("backButton");

// Ambil data anggota dari file JSON
fetch("json/members.json")
  .then((response) => response.json())
  .then((data) => {
    members = data; // Simpan data anggota ke dalam variabel global
    displayMembers(members); // Tampilkan semua anggota saat halaman dimuat
  })
  .catch((error) => console.error("Error fetching members:", error));

// Fungsi untuk membuat card
function createMemberCard(member) {
  return `
    <div class="mb-3 mt-4 shadow rounded-4" style="max-width: auto; background-color: rgba(241, 246, 249, 0.4);">
      <div class="row g-0">
        <div class="col-lg-2 card-profile">
          <img src="${member.image}" class="img-fluid rounded-circle crop-img p-4" alt="${member.name}" title="${member.name}"/>
        </div>
        <div class="col-lg-8">
          <div class="card-body warna-gelap p-4">
            <h5 class="card-title fw-bold ">${member.name}</h5>
            <p class="card-text poppins-reguler pt-1">${member.description}</p>
            <a href="#" class="text-primary see-more">More Info</a>
            <div class="additional-info" style="display: none;">
              <!-- Informasi tambahan -->
              <p>${member.additionalInfo}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Fungsi untuk menampilkan anggota
function displayMembers(members) {
  memberCardsContainer.innerHTML = ""; // Kosongkan kontainer kartu anggota
  members.forEach((member) => {
    const memberCard = createMemberCard(member);
    memberCardsContainer.innerHTML += memberCard; // Tambahkan kartu anggota ke kontainer
  });

  // Tambahkan kembali event listener untuk tombol "See More"
  const seeMoreButtons = document.querySelectorAll(".see-more");
  seeMoreButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault(); // Mencegah perilaku default dari tautan saat diklik
      const additionalInfo = this.parentElement.querySelector(".additional-info");
      // Toggling the display of additional info
      if (additionalInfo.style.display === "none") {
        additionalInfo.style.display = "block"; // Munculkan informasi tambahan
        this.textContent = "Less Info"; // Ubah teks tombol menjadi "See Less"
      } else {
        additionalInfo.style.display = "none"; // Sembunyikan informasi tambahan
        this.textContent = "More Info"; // Ubah teks tombol menjadi "See More"
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  backBtn.style.display = "none"; // Sembunyikan tombol "Back" saat halaman dimuat
});

// Fungsi untuk melakukan pencarian
function searchMembers(event) {
  event.preventDefault(); // Mencegah form untuk melakukan submit

  const searchTerm = searchInput.value.toLowerCase();
  const filteredMembers = members.filter((member) => member.name.toLowerCase().includes(searchTerm));
  displayMembers(filteredMembers);

  // Tampilkan tombol "Back"
  backBtn.style.display = "block";
}

// Event listener untuk form pencarian
searchForm.addEventListener("submit", searchMembers);

// Event listener untuk tombol "Back"
backBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Mencegah perilaku default dari tautan saat diklik
  displayMembers(members); // Tampilkan kembali semua anggota
  this.style.display = "none"; // Sembunyikan tombol "Back" setelah diklik
});

// Inisialisasi popover
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});
