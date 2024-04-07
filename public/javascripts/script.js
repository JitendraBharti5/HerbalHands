function swiper() {
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: true,
      },
    });
  }
  swiper();
  
  function para() {
    var h1Text = document.querySelector("#left h1").textContent;
    var splittedText = h1Text.split("");
    var clutter = "";
    splittedText.forEach(function (elem) {
      clutter += `<span>${elem}</span>`;
    });
    document.querySelector("#left h1").innerHTML = clutter;
  
    gsap.to("#left h1 span", {
      color: "black",
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".page1",
        scroller: "body",
        start: "top 0",
        end: "top -100%",
        scrub: 2,
        pin: true
      }
    });
  }
  para();
  
  function initializePage() {
    const categories = document.querySelectorAll('.category');
    let selectedCategory = null;
  
    function selectCategory(categoryElement) {
      if (selectedCategory) {
        selectedCategory.classList.remove('selected');
      }
      selectedCategory = categoryElement;
      selectedCategory.classList.add('selected');
    }
  
    const defaultCategory = categories[0]; // Set the default category here
    selectCategory(defaultCategory);
    const defaultCategoryValue = defaultCategory.dataset.category;
    renderProducts(defaultCategoryValue);
  
    categories.forEach(category => {
      category.addEventListener('click', function () {
        selectCategory(this);
        const categoryValue = this.dataset.category;
        renderProducts(categoryValue);
      });
    });
  
    function renderProducts(category) {
      console.log("Rendering products for category:", category);
      displayCards(category);
    }
  }
  
  document.addEventListener("DOMContentLoaded", initializePage);
  
  
  const categoryData = {
    "category1": {
      "name": "HEALTH CARE",
      "cards": [
        { "image": "https://www.dabur.com/sites/default/files/styles/320x409/public/2021-09/TOOTHACHE.jpg?itok=OvPbhE7Q", "title": "TOOTHACHE" },
        { "image": "	https://www.dabur.com/sites/default/files/styles/320x409/public/2021-09/Nausea.jpg?itok=ai6HoRj", "title": "NAUSEA" },
        { "image": "https://www.dabur.com/sites/default/files/styles/320x409/public/2021-09/CONSTIPATION%20IN%20CHILDREN.jpg?itok=0Q_CHRBv", "title": "CONSTIPATION" },
        { "image": "https://www.dabur.com/sites/default/files/styles/320x409/public/2021-01/1.png?itok=tHJnTAzp", "title": "COUGH" },
       ]
    },
    "category2": {
      "name": "SKIN CARE",
      "cards": [
        { "image": "https://www.dabur.com/sites/default/files/styles/320x409/public/2021-09/dry%20skin.jpg?itok=xhh4KmUl", "title": "DRY SKIN" },
        { "image": "https://www.dabur.com/sites/default/files/styles/320x409/public/2021-09/face%20mask.jpg?itok=KMIjZyW5", "title": "FACE MASK" },
        { "image": "https://www.dabur.com/sites/default/files/styles/320x409/public/2021-09/massage%20oil.jpg?itok=f-mol90t", "title": "MASSAGE OIL" },
        { "image": "https://www.dabur.com/sites/default/files/styles/320x409/public/2021-09/ACNE.jpg?itok=6Mkhh_Gx", "title": "ACNE" },
         ]
    },
    "category3": {
      "name": "HAIR CARE",
      "cards": [
        { "image": "https://www.dabur.com/sites/default/files/styles/320x409/public/2021-09/Dandruff.jpg?itok=UOjsBoo1", "title": "DANDRUFF" },
        { "image": "https://www.dabur.com/sites/default/files/styles/320x409/public/2021-09/Restorative%20Hair%20Oil.jpg?itok=4R3tNTKE", "title": "RESTORATIVE HAIR OIL" },
        { "image": "https://www.dabur.com/sites/default/files/styles/320x409/public/2021-09/Nourishing%20Hair%20Oil.jpg?itok=iTI301kr", "title": "NOURISHING HAIR OIL" },
        { "image": "https://www.dabur.com/sites/default/files/styles/320x409/public/2021-09/Herbal%20Shampoos.jpg?itok=C4FImyii", "title": "HERBAL SHAMPOOS" },
        ]
    },
    "category4": {
      "name": "CHILD CARE",
      "cards": [
        { "image": "https://www.dabur.com/sites/default/files/styles/320x409/public/2021-09/Summer%20Care.jpg?itok=Lq31KEr7", "title": "SUMMER CARE" },
        { "image": "https://www.dabur.com/sites/default/files/styles/320x409/public/2021-09/Weaning%20Diets.jpg?itok=eBfP3tb_", "title": "WEANING DIETS" },
        { "image": "https://www.dabur.com/sites/default/files/styles/320x409/public/2021-09/WHAT%20IS%20INDIGESTION.jpg?itok=OBV1Lkca", "title": "DIGESTION PROBLEM" },
        { "image": "https://www.dabur.com/sites/default/files/styles/320x409/public/2021-09/DIARRHEA%20MEANING%20%281%29.jpg?itok=RJJxvZxL", "title": "DIARRHEA" },
           ]
    }
  };
  
  function displayCards(category) {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';
  
    const categoryInfo = categoryData[category];
  
    const cardsWrapper = document.createElement('div');
    cardsWrapper.classList.add('cards-wrapper');
  
    categoryInfo.cards.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('cards');
  
      const imgElement = document.createElement('img');
      imgElement.src = card.image;
      imgElement.alt = card.title;
      cardElement.appendChild(imgElement);
  
      const bottomElement = document.createElement('div');
      bottomElement.classList.add('bottom');
  
      const titleElement = document.createElement('h4');
      titleElement.textContent = card.title;
      bottomElement.appendChild(titleElement);
  
      cardElement.appendChild(bottomElement);
  
      cardsWrapper.appendChild(cardElement);
    });
  
    cardsContainer.appendChild(cardsWrapper);
  }
  