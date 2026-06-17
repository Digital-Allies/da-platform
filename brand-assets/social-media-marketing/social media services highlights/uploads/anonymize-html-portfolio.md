# HTML Portfolio Anonymization Prompt

You are anonymizing a one-page HTML website for portfolio presentation.

Objective: remove all identifying business information and convert the site into a generic fictional example, while keeping the file otherwise exactly the same.

---

## Replace All Real-World Identifying Details

- Business name and brand name
- Logo text and branded headings
- Addresses and map/location references
- Email addresses
- Phone numbers
- Social media handles and profile links
- Booking/order/reservation links tied to the real company
- Brand-specific menu items, services, products, packages, and testimonials
- Staff names if they identify the real business
- Metadata, schema, alt text, filenames, comments, and hidden text that contain identifying information

---

## Replacement Rules

- Use a fictional business name appropriate to the industry
- Replace all contact information with the following Digital Allies details exactly as shown:
  - Phone: (928) 228-5769
  - Email: contact@digitalallies.net
  - Location: Kingman, Arizona
  - Footer copyright line: © 2026 Digital Allies. Based in Kingman, AZ.
  - Footer links:
    - Privacy — https://digitalallies.net/privacy.html
    - Terms — https://digitalallies.net/terms.html
    - Cookies — https://digitalallies.net/cookies.html
    - Sitemap — https://digitalallies.net/sitemap.html
- Use generic, industry-appropriate products, services, or menu items
- Preserve tone and category — restaurant stays restaurant, theater stays theater, salon stays salon
- Rename the output file using a generic industry slug with no real brand in the name

File naming examples:
- restaurant.html
- theater.html
- construction-company.html
- hair-salon.html
- dental-office.html
- law-firm.html

Match the slug to the actual industry of the file being anonymized.

---

## Preservation Rules

- Keep the HTML, CSS, JS, structure, layout, formatting, and styling unchanged
- Keep the same sections and visual hierarchy
- Keep the same approximate text length where possible so the design does not break
- Do not redesign or optimize anything unrelated to anonymization

---

## Output Rules

- State the recommended output filename at the top before the code
- Return the updated full HTML
- Then provide a short change log listing each category of anonymized information
- Flag anything uncertain with "manual review needed"
