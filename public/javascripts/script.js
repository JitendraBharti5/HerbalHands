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
        { "image": "TOOTHACHE.jpg", "title": "TOOTHACHE" },
        { "image": "Nausea.jpg", "title": "NAUSEA" },
        { "image": "CONSTIPATION IN CHILDREN.jpg", "title": "CONSTIPATION" },
        { "image": "cough.png", "title": "COUGH" },
  
      ]
    },
    "category2": {
      "name": "SKIN CARE",
      "cards": [
        { "image": "dry skin.jpg", "title": "DRY SKIN" },
        { "image": "face mask.jpg", "title": "FACE MASK" },
        { "image": "massage oil.jpg", "title": "MASSAGE OIL" },
        { "image": "ACNE.jpg", "title": "ACNE" },
  
      ]
    },
    "category3": {
      "name": "HAIR CARE",
      "cards": [
        { "image": "Dandruff.jpg", "title": "DANDRUFF" },
        { "image": "Restorative Hair Oil.jpg", "title": "RESTORATIVE HAIR OIL" },
        { "image": "Nourishing Hair Oil.jpg", "title": "NOURISHING HAIR OIL" },
        { "image": "Herbal Shampoos.jpg", "title": "HERBAL SHAMPOOS" },
  
      ]
    },
    "category4": {
      "name": "CHILD CARE",
      "cards": [
        { "image": "Summer Care.jpg", "title": "SUMMER CARE" },
        { "image": "Weaning Diets.jpg", "title": "WEANING DIETS" },
        { "image": "WHAT IS INDIGESTION.jpg", "title": "DIGESTION PROBLEM" },
        { "image": "DIARRHEA MEANING (1).jpg", "title": "DIARRHEA" },
  
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
  