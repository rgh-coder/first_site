// ПРОСТОЙ СКРИПТ ДЛЯ ГАЛЕРЕИ

// Функция для подсчёта фотографий
function countPhotos() {
    let photos = document.querySelectorAll('.image-card');
    let counter = document.getElementById('image-counter');
    if (counter) {
        counter.textContent = photos.length;
    }
    console.log('Найдено фотографий:', photos.length);
}

// Функция для работы с лайками
function setupLikes() {
    let likeButtons = document.querySelectorAll('.like-btn');
    let totalLikesElement = document.getElementById('total-likes');
    let totalLikes = 0;
    
    // Для каждой кнопки лайка
    likeButtons.forEach(function(button) {
        // При клике на кнопку
        button.addEventListener('click', function() {
            let likesSpan = this.querySelector('.like-count');
            let currentLikes = parseInt(likesSpan.textContent);
            let heartIcon = this.querySelector('i');
            
            if (this.classList.contains('liked')) {
                // Убираем лайк
                currentLikes--;
                totalLikes--;
                this.classList.remove('liked');
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
            } else {
                // Добавляем лайк
                currentLikes++;
                totalLikes++;
                this.classList.add('liked');
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
            }
            
            // Обновляем счётчики
            likesSpan.textContent = currentLikes;
            if (totalLikesElement) {
                totalLikesElement.textContent = totalLikes;
            }
            
            // Анимация
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
            
            console.log('Лайков всего:', totalLikes);
        });
    });
}

// Функция для переключения вида сетка/список
function setupViewControls() {
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const galleryGrid = document.getElementById('image-gallery');
    
    if (gridViewBtn && listViewBtn && galleryGrid) {
        gridViewBtn.addEventListener('click', function() {
            this.classList.add('active');
            listViewBtn.classList.remove('active');
            galleryGrid.classList.remove('list-view');
        });
        
        listViewBtn.addEventListener('click', function() {
            this.classList.add('active');
            gridViewBtn.classList.remove('active');
            galleryGrid.classList.add('list-view');
        });
    }
}

// Функция для фильтрации
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const imageCards = document.querySelectorAll('.image-card');
    
    // Добавляем кнопку НГТ если её нет
    if (!document.querySelector('[data-filter="ngt"]')) {
        const filterButtonsContainer = document.querySelector('.filter-buttons');
        if (filterButtonsContainer) {
            const ngtButton = document.createElement('button');
            ngtButton.className = 'filter-btn';
            ngtButton.setAttribute('data-filter', 'ngt');
            ngtButton.innerHTML = '<i class="fas fa-search"></i> НГТ';
            ngtButton.title = 'Наземный городской транспорт';
            filterButtonsContainer.appendChild(ngtButton);
        }
    }
    
    // Обновляем список кнопок
    const allFilterButtons = document.querySelectorAll('.filter-btn');
    
    allFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            allFilterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Показываем/скрываем карточки в зависимости от фильтра
            imageCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                    return;
                }
                
                const category = card.getAttribute('data-category');
                const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent);
                
                let shouldShow = false;
                
                switch(filter) {
                    case 'metro':
                        shouldShow = category === 'metro' || tags.includes('метро');
                        break;
                    case 'rail':
                        shouldShow = category === 'rail' || tags.includes('рельсовые');
                        break;
                    case 'road':
                        shouldShow = category === 'road' || tags.includes('электробус') || tags.includes('камаз');
                        break;
                    case 'special':
                        shouldShow = category === 'special' || tags.includes('спецтехника');
                        break;
                    case 'ngt':
                        shouldShow = tags.includes('НГТ');
                        break;
                    default:
                        shouldShow = true;
                }
                
                if (shouldShow) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}


// Функция для обновления года в футере
function updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Когда страница загрузится
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена!');
    countPhotos();
    setupLikes();
    setupViewControls();
    setupFilters();
    setupNGTTooltips();
    updateCurrentYear();
    
    // Показываем, что JavaScript работает
    setTimeout(function() {
        console.log('✅ JavaScript работает правильно!');
    }, 1000);
});