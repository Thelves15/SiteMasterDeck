// Aguarda o DOM estar completamente carregado
document.addEventListener("DOMContentLoaded", () => {
  console.log("MasterDeck website iniciado!")

  // DOM Elements
  const navToggle = document.getElementById("navToggle")
  const navMenu = document.getElementById("navMenu")
  const navLinks = document.querySelectorAll(".nav-link")
  const faqItems = document.querySelectorAll(".faq-item")
  const contactForm = document.getElementById("contactForm")
  const carouselTrack = document.getElementById("carouselTrack")
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")
  const carouselDots = document.getElementById("carouselDots")
  const header = document.querySelector(".header")
  const scrollIndicator = document.querySelector(".scroll-indicator")

  // Mobile Navigation
  if (navToggle && navMenu) {
    console.log("Configurando navegação mobile...")

    navToggle.addEventListener("click", (e) => {
      e.preventDefault()
      e.stopPropagation()

      navMenu.classList.toggle("active")
      navToggle.classList.toggle("active")

      console.log("Menu toggled:", navMenu.classList.contains("active"))
    })

    // Close mobile menu when clicking on a link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
        console.log("Menu fechado via link")
      })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
      }
    })
  }

  // FAQ Functionality
  console.log("Configurando FAQ...")
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    if (question) {
      question.addEventListener("click", (e) => {
        e.preventDefault()

        const isActive = item.classList.contains("active")
        console.log("FAQ clicado, ativo:", isActive)

        // Close all FAQ items
        faqItems.forEach((faqItem) => {
          faqItem.classList.remove("active")
        })

        // Open clicked item if it wasn't active
        if (!isActive) {
          item.classList.add("active")
          console.log("FAQ aberto")
        }
      })
    }
  })

  // Carousel Functionality
  if (carouselTrack && carouselDots) {
    console.log("Configurando carrossel...")

    let currentSlide = 0
    const slides = document.querySelectorAll(".carousel-slide")
    const totalSlides = slides.length
    let autoPlayInterval

    // Create dots
    carouselDots.innerHTML = "" // Limpa dots existentes
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div")
      dot.classList.add("carousel-dot")
      if (i === 0) dot.classList.add("active")
      dot.addEventListener("click", () => {
        goToSlide(i)
      })
      carouselDots.appendChild(dot)
    }

    const dots = document.querySelectorAll(".carousel-dot")

    function updateCarousel() {
      const translateX = -currentSlide * 100
      carouselTrack.style.transform = `translateX(${translateX}%)`

      // Update dots
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide)
      })
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides
      updateCarousel()
      console.log("Próximo slide:", currentSlide)
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
      updateCarousel()
      console.log("Slide anterior:", currentSlide)
    }

    function goToSlide(slideIndex) {
      currentSlide = slideIndex
      updateCarousel()
      console.log("Indo para slide:", slideIndex)
    }

    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, 4000) // Muda a cada 4 segundos
      console.log("Auto-play iniciado")
    }

    function stopAutoPlay() {
      clearInterval(autoPlayInterval)
      console.log("Auto-play parado")
    }

    // Event listeners para botões
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextSlide()
        stopAutoPlay()
        setTimeout(startAutoPlay, 8000) // Reinicia após 8 segundos
      })
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide()
        stopAutoPlay()
        setTimeout(startAutoPlay, 8000)
      })
    }

    // Touch support para mobile
    let startX = 0
    let endX = 0

    carouselTrack.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX
      stopAutoPlay()
    })

    carouselTrack.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX
      const diff = startX - endX
      const threshold = 50

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          nextSlide()
        } else {
          prevSlide()
        }
      }
      setTimeout(startAutoPlay, 5000)
    })

    // Pausa auto-play quando mouse está sobre o carrossel
    const carousel = document.querySelector(".gallery-carousel")
    if (carousel) {
      carousel.addEventListener("mouseenter", stopAutoPlay)
      carousel.addEventListener("mouseleave", startAutoPlay)
    }

    // Inicia o auto-play
    startAutoPlay()
  }

  // Contact Form
  if (contactForm) {
    console.log("Configurando formulário...")

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const formData = new FormData(contactForm)
      const name = formData.get("name")
      const phone = formData.get("phone")
      const email = formData.get("email")

      // Simula envio
      const submitBtn = contactForm.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...'
      submitBtn.disabled = true

      setTimeout(() => {
        alert(
          `Obrigado, ${name}! Sua mensagem foi enviada com sucesso. Entraremos em contato através do telefone ${phone} ou e-mail ${email}.`,
        )
        contactForm.reset()

        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }

  // Smooth scrolling para links âncora
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const headerHeight = 80
        const targetPosition = target.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
        console.log("Navegando para:", this.getAttribute("href"))
      }
    })
  })

  // Scroll indicator
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const benefitsSection = document.querySelector("#benefits")
      if (benefitsSection) {
        benefitsSection.scrollIntoView({ behavior: "smooth" })
      }
    })
  }

  // Header background on scroll
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.style.background = "rgba(255, 255, 255, 0.98)"
        header.style.backdropFilter = "blur(20px)"
      } else {
        header.style.background = "rgba(255, 255, 255, 0.95)"
        header.style.backdropFilter = "blur(10px)"
      }
    })
  }

  console.log("Todas as funcionalidades carregadas com sucesso!")
})

// Previne erros de runtime
window.addEventListener("error", (e) => {
  console.log("Erro capturado:", e.message)
})
