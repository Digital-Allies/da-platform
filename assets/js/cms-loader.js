// Digital Allies — CMS Loader Script
// Fetches content dynamically from Supabase and applies it to the static HTML

const SUPABASE_URL = "https://auwhvicpyiwsubucanpb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1d2h2aWNweWl3c3VidWNhbnBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1Mjc3ODgsImV4cCI6MjA5NzEwMzc4OH0.Cc-bBW1lEXR1TU4LBjwevvc6cu8OA9gMbK-mKAlpQYg";
const CLIENT_ID = "3d76b896-e1fb-49f0-a8db-f62fdd5bc258";

const headers = {
  "apikey": SUPABASE_ANON_KEY,
  "Authorization": "Bearer " + SUPABASE_ANON_KEY,
  "Content-Type": "application/json"
};

// Helper to parse bilingual text (format: "English text || Spanish text")
function parseBilingual(text) {
  if (!text) return { en: "", es: "" };
  if (text.includes("||")) {
    const parts = text.split("||");
    return { en: parts[0].trim(), es: parts[1].trim() };
  }
  return { en: text, es: text };
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // 1. Load settings and apply identity/brand color
    const settingsRes = await fetch(`${SUPABASE_URL}/rest/v1/settings?client_id=eq.${CLIENT_ID}`, { headers });
    const settings = await settingsRes.json();
    
    if (settings && settings.length > 0) {
      const map = {};
      settings.forEach(s => {
        map[s.key] = s.value;
      });

      // Apply brand color
      if (map.brand_color) {
        document.body.style.setProperty("--brand", map.brand_color);
      }

      // Apply identity settings
      if (map.site_title) {
        const titleText = parseBilingual(map.site_title);
        const titleEl = document.querySelector("title");
        if (titleEl) {
          titleEl.textContent = titleText.en; // Fallback
          titleEl.setAttribute("data-en", titleText.en);
          titleEl.setAttribute("data-es", titleText.es);
        }
      }

      // Apply hero / lobby settings
      const heroTitleEl = document.getElementById("hero-heading");
      if (heroTitleEl && map.hero_title) {
        const text = parseBilingual(map.hero_title);
        heroTitleEl.setAttribute("data-en", text.en);
        heroTitleEl.setAttribute("data-es", text.es);
        heroTitleEl.innerHTML = document.documentElement.lang === "es" ? text.es : text.en;
      }

      const heroSubtitleEl = document.querySelector("#hero-heading + p");
      if (heroSubtitleEl && map.hero_subtitle) {
        const text = parseBilingual(map.hero_subtitle);
        heroSubtitleEl.setAttribute("data-en", text.en);
        heroSubtitleEl.setAttribute("data-es", text.es);
        heroSubtitleEl.innerHTML = document.documentElement.lang === "es" ? text.es : text.en;
      }
    }

    // 2. Load Services / Departments
    const servicesRes = await fetch(`${SUPABASE_URL}/rest/v1/services?client_id=eq.${CLIENT_ID}&order=display_order.asc`, { headers });
    const services = await servicesRes.json();
    
    const deptsContainer = document.querySelector("#departments .grid");
    if (deptsContainer && services && services.length > 0) {
      deptsContainer.innerHTML = ""; // Clear static
      
      services.forEach(svc => {
        const title = parseBilingual(svc.title);
        const desc = parseBilingual(svc.description);
        const price = svc.price ? parseBilingual(svc.price) : null;

        const card = document.createElement("div");
        card.className = "dept-card bg-bone-white p-10 text-center transition-all duration-300 border-t-4 border-t-transparent hover:border-t-signal-red hover:bg-light-pink/20 border-b border-r border-gray-dark";
        
        card.innerHTML = `
          <div class="flex justify-center mb-6">
            <span style="font-size: 48px;">${svc.icon || "💼"}</span>
          </div>
          <h3 class="font-headers font-bold text-lg mb-1" data-en="${title.en}" data-es="${title.es}">
            ${document.documentElement.lang === "es" ? title.es : title.en}
          </h3>
          ${price ? `
            <span class="block text-xs mb-5 text-signal-red font-bold tracking-widest uppercase" data-en="${price.en}" data-es="${price.es}">
              ${document.documentElement.lang === "es" ? price.es : price.en}
            </span>
          ` : ""}
          <p class="text-sm leading-relaxed" data-en="${desc.en}" data-es="${desc.es}">
            ${document.documentElement.lang === "es" ? desc.es : desc.en}
          </p>
        `;
        deptsContainer.appendChild(card);
      });
    }

    // 3. Load Testimonials / Field Notes
    const testimonialsRes = await fetch(`${SUPABASE_URL}/rest/v1/testimonials?client_id=eq.${CLIENT_ID}&order=display_order.asc`, { headers });
    const testimonials = await testimonialsRes.json();

    const testimonialsGrid = document.querySelector("#field-notes .grid");
    if (testimonialsGrid && testimonials && testimonials.length > 0) {
      testimonialsGrid.innerHTML = ""; // Clear static
      
      testimonials.forEach(note => {
        const author = parseBilingual(note.author_name);
        const role = parseBilingual(note.author_role);
        const content = parseBilingual(note.content);

        const card = document.createElement("div");
        card.className = "structural-border pinned-note p-8 text-center";
        card.innerHTML = `
          <div class="red-pin" aria-hidden="true"></div>
          <h3 class="font-headers font-bold mb-1">${author.en}</h3>
          <p class="text-xs mb-6 text-signal-red font-bold" data-en="${role.en}" data-es="${role.es}">
            ${document.documentElement.lang === "es" ? role.es : role.en}
          </p>
          <p class="text-sm leading-relaxed italic" data-en="&ldquo;${content.en}&rdquo;" data-es="&ldquo;${content.es}&rdquo;">
            &ldquo;${document.documentElement.lang === "es" ? content.es : content.en}&rdquo;
          </p>
        `;
        testimonialsGrid.appendChild(card);
      });
    }

    // 4. Handle Contact Form Submissions
    const contactForm = document.querySelector("#contact form");
    if (contactForm) {
      contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById("f-name");
        const emailInput = document.getElementById("f-email");
        const messageInput = document.getElementById("f-message");

        const submitBtn = contactForm.querySelector("button[type='submit']");
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = document.documentElement.lang === "es" ? "Enviando..." : "Sending...";

        const payload = {
          client_id: CLIENT_ID,
          name: nameInput.value,
          email: emailInput.value,
          message: messageInput.value,
          created_at: new Date().toISOString()
        };

        const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions`, {
          method: "POST",
          headers,
          body: JSON.stringify(payload)
        });

        submitBtn.disabled = false;
        submitBtn.textContent = originalText;

        if (res.ok) {
          alert(document.documentElement.lang === "es" ? "¡Mensaje enviado con éxito!" : "Message sent successfully!");
          contactForm.reset();
        } else {
          alert(document.documentElement.lang === "es" ? "Error al enviar el mensaje." : "Error sending message.");
        }
      });
    }

    // 5. Load dynamic articles on learn/index.html if we are on that page
    const learnGrid = document.getElementById("learn-articles-grid");
    if (learnGrid) {
      const articlesRes = await fetch(`${SUPABASE_URL}/rest/v1/articles?client_id=eq.${CLIENT_ID}&status=eq.published&order=created_at.desc`, { headers });
      const articles = await articlesRes.json();

      if (articles && articles.length > 0) {
        learnGrid.innerHTML = "";
        articles.forEach(art => {
          const title = parseBilingual(art.title);
          const excerpt = parseBilingual(art.excerpt);

          const item = document.createElement("div");
          item.className = "p-6 bg-white border border-charcoal hover:shadow-md transition duration-200";
          item.innerHTML = `
            <span class="text-xs text-signal-red font-bold uppercase tracking-widest">${art.type || "Article"}</span>
            <h3 class="font-headers text-xl font-bold mt-2 mb-3" data-en="${title.en}" data-es="${title.es}">
              ${document.documentElement.lang === "es" ? title.es : title.en}
            </h3>
            <p class="text-sm leading-relaxed mb-4" data-en="${excerpt.en}" data-es="${excerpt.es}">
              ${document.documentElement.lang === "es" ? excerpt.es : excerpt.en}
            </p>
            <a href="/blog/${art.slug}" class="text-sm font-bold text-primary-blue hover:underline" data-en="Read Article &rarr;" data-es="Leer Artículo &rarr;">
              ${document.documentElement.lang === "es" ? "Leer Artículo &rarr;" : "Read Article &rarr;"}
            </a>
          `;
          learnGrid.appendChild(item);
        });
      }
    }

  } catch (err) {
    console.error("CMS Loader Error: ", err);
  }
});
