document.addEventListener("DOMContentLoaded", function () {
    const images = [
      'https://via.placeholder.com/500x300?text=Image+1',
      'https://via.placeholder.com/500x300?text=Image+2',
      'https://via.placeholder.com/500x300?text=Image+3',
      'https://via.placeholder.com/500x300?text=Image+4',
      'https://via.placeholder.com/500x300?text=Image+5',
      'https://via.placeholder.com/500x300?text=Image+6',
      'https://via.placeholder.com/500x300?text=Image+7',
      'https://via.placeholder.com/500x300?text=Image+8',
    ];
  
    const gallery = document.getElementById("gallery");
  
    images.forEach((src, index) => {
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("relative", "overflow-hidden", "rounded-lg", "hover-pop", "fade-in");
      imgContainer.style.animationDelay = `${index * 0.1}s`;
  
      const img = document.createElement("img");
      img.src = src;
      img.alt = `Image ${index + 1}`;
      img.classList.add("w-full", "h-auto", "object-cover", "rounded-lg");
  
      const overlay = document.createElement("div");
      overlay.classList.add(
        "absolute", "inset-0", "bg-black", "bg-opacity-50", "opacity-0", "hover:opacity-100",
        "flex", "items-center", "justify-center", "transition-opacity", "duration-300"
      );
  
      const overlayText = document.createElement("p");
      overlayText.classList.add("text-white", "font-semibold", "text-lg");
      overlayText.textContent = `Image ${index + 1}`;
  
      overlay.appendChild(overlayText);
      imgContainer.appendChild(img);
      imgContainer.appendChild(overlay);
      gallery.appendChild(imgContainer);
    });
  });
  