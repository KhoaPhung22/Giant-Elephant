const productSelectors = document.querySelectorAll('.product-selector');
const productDisplay = document.querySelector('.product-showcase');
const priceDisplay = document.querySelector('.price-display p');
const imageContainer = document.querySelector('.product-image-container'); // No longer used for 360
const imageFrames = document.querySelectorAll('.product-image-frame'); // No longer used for 360

const productData = {
    1: { name: 'Warrior', price: 250.00, images: ['../asset/img/warrior_1.png'] }, // Only need the first image
    2: { name: 'Knight', price: 300.00, images: ['../asset/img/knight.png'] }, // Only need the first image
    3: { name: 'Wizard', price: 200.00, images: ['../asset/img/wizard.png']}, // Only need the first image
    4: { name: 'Rogue', price: 180.00, images: ['../asset/img/rogue.jpg'] }, // Only need the first image
    5: { name: 'Bard', price: 220.00, images: ['../asset/img/bard.png'] }, // Only need the first image
    6: { name: 'Paladin', price: 320.00, images: ['../asset/img/paladin.jpg'] }, // Only need the first image
    // Add data for all products
};

let activeProductId = 1; // Start with product 1 selected

function updateProductDisplay(productId) {
    const product = productData[productId];
    if (!product) return;

    productDisplay.classList.add('transitioning');
    priceDisplay.classList.add('transitioning');

    setTimeout(() => {
        productDisplay.querySelector('h2').textContent = product.name + " Costume";
        priceDisplay.textContent = `$${product.price.toFixed(2)}`;

        // Update product image.  Now much simpler.
        const firstImage = product.images[0];
        if (firstImage) {
            //imageContainer.innerHTML = `<img src="${firstImage}" alt="${product.name} Costume" class="main-product-image" style="border-radius: 0.75rem; max-width: 100%; height: auto; aspect-ratio: 1 / 1; object-fit: contain;">`;
            // productDisplay.innerHTML = `<img src="${firstImage}" alt="${product.name} Costume" class="main-product-image" style="border-radius: 0.75rem; max-width: 100%; height: auto;  object-fit: contain;">`;
             // Update 360 view.  Assumes imageFrames are already in the HTML
            imageFrames.forEach((frame, index) => {
                if (product.images[index]) { // Check if image exists for this index
                    frame.src = product.images[index];
                    frame.classList.toggle('active', index === 0); //show first image.
                }
                else{
                    frame.src = ''; // Clear the src if no image
                    frame.classList.remove('active');
                }
            });
        }
        else {
            //imageContainer.innerHTML = `<p>No image available</p>`; // Or a placeholder
            imageFrames.forEach((frame) => {
                frame.src='';
                frame.classList.remove('active');
            });
        }

        activeProductId = productId; //update

        productDisplay.classList.remove('transitioning');
        priceDisplay.classList.remove('transitioning');
    }, 300);
}

productSelectors.forEach(selector => {
    selector.addEventListener('click', function() {
        const productId = parseInt(this.getAttribute('data-product-id'));
        productSelectors.forEach(s => s.classList.remove('active'));
        this.classList.add('active');
        updateProductDisplay(productId);
    });
});

// Initialize display with the first product
updateProductDisplay(activeProductId);
productSelectors[0].classList.add('active');

// No 360 Degree View Logic
