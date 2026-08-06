# CSV Uploader & Collections Deep Dive

## Why This Matters

The CSV uploader is one of the most powerful features in the DA Platform — it lets you bulk-import products and automatically organize them into collections in seconds. Instead of adding products one-by-one through the admin interface, you prepare a spreadsheet, upload it, and everything syncs instantly.

---

## Part 1: Understanding Collections & Connected Data

### What is a Collection?

A collection is a **curated group of related products** that live in your database. Collections have:
- A name (e.g., "Best Sellers", "Living Room Finds", "Under $200")
- A list of product IDs (the items included)
- A "Featured" flag (if true, the collection appears on your homepage)
- Metadata (created date, last updated, who created it)

### Why Collections Matter

Collections let you:
1. **Highlight specific product groups** without duplicating data
2. **Organize by mood, style, price, season** — whatever makes sense for your business
3. **Create dynamic homepage sections** that pull from collections
4. **Implement filtering** on the front-end (visitors click "Chairs" to see only chairs)
5. **Tell a story** (curated groups feel intentional, not random)

### Connected Data: How Products & Collections Link

**Key concept:** Collections don't store product data — they store a **list of product IDs**.

When you import CSV:
1. Products are created in the `products` table (one row per product)
2. Products get a unique `id` (UUID)
3. The collection's `item_ids` array is updated to include these new IDs
4. The database now knows: "Collection 'Best Sellers' includes products [uuid-1, uuid-2, uuid-3]"

**Example:**
```
Collection "Best Sellers"
├── item_ids: ["a1b2c3", "d4e5f6", "g7h8i9"]
└── When you load the site, it queries:
    SELECT * FROM products WHERE id IN ['a1b2c3', 'd4e5f6', 'g7h8i9']
    → Returns the full product data for all three
```

### Why "Connected" Data Matters

If you delete a product, it's automatically removed from all collections that reference it. If you update a product's price, the collection automatically shows the new price. This is data integrity — one source of truth.

---

## Part 2: CSV Format & Preparation

### Required Columns

Every CSV file MUST have these columns (in the header row):

| Column | Type | Required? | Example |
|--------|------|-----------|---------|
| **Title** | Text | ✅ Yes | "Vintage Wicker Waterfall Dresser" |
| **Price** | Number | ✅ Yes | 285.00 |
| **Category** | Text | ✅ Yes | "Storage" |
| **Image URL** | URL | ✅ Yes | "https://example.com/image.jpg" |
| **Description** | Text | ✅ Yes | "Handwoven wicker, warm finish, 38in W" |

### Optional Columns

| Column | Type | Purpose | Example |
|--------|------|---------|---------|
| External URL | URL | Link to a marketplace listing | "https://facebook.com/marketplace/..." |
| Selling State | Text | How this item is sold (inquiry / purchase) | "inquiry" |

### Column Name Variants

The importer is **forgiving** with column names. These all work:

- Title, title, TITLE, Item Name, Product Name, Name
- Price, price, PRICE, Cost, Amount
- Category, category, CATEGORY, Type, Group
- Image URL, image_url, Image, Photo, Image Link
- Description, description, DESCRIPTION, Desc, Details
- External URL, external_url, Link, Marketplace Link, URL
- Selling State, selling_state, Selling Method, Method, State

**Best practice:** Use the exact names (Title, Price, Category, Image URL, Description) to avoid confusion.

---

## Part 3: Spreadsheet Preparation

### Google Sheets Example

```
Title,Price,Category,Image URL,Description
"Vintage MCM Dining Set – Table + 4 Swivel Chairs",550.00,"Seating","https://images.example.com/dining-set.jpg","1970s pedestal base, cream vinyl, light surface wear"
"Vintage Wicker Waterfall Dresser",285.00,"Storage","https://images.example.com/dresser.jpg","Handwoven wicker, honey finish, 4 drawers, 38in W"
"Rattan Wall Mirror",95.00,"Decor","https://images.example.com/mirror.jpg","Woven rattan frame, 24in diameter, no backing"
```

### Column Tips

**Title**
- Be descriptive but not too long (50-70 characters ideal)
- Include style, era, material if relevant
- Examples: "Vintage Mid-Century Rattan Accent Chair" vs just "Chair"

**Price**
- Numbers only (no $ symbol, no commas)
- Use decimals: 285.00 (not 285)
- Negative numbers or $0 will cause import to fail

**Category**
- Consistent category names (don't mix "Chairs" and "Seating")
- These will show in filters on your site
- 3-5 categories is ideal; 20+ becomes hard to browse

**Image URL**
- Must be complete, starting with https:// or http://
- Images must be accessible (not behind a login or geo-block)
- Test URLs in your browser before importing
- Recommended size: 600px+ wide (platform auto-optimizes)

**Description**
- 1-3 sentences
- Include material, dimensions, condition, origin
- Use plain language (avoid "pre-owned," use "handpicked" or "restored")
- For SEO: mention material names, location, era

### How to Export as CSV

**Google Sheets:**
1. File > Download > Comma Separated Values (.csv)
2. This downloads the sheet as a `.csv` file

**Microsoft Excel:**
1. File > Save As > Choose format "CSV UTF-8 (.csv)"
2. Save with a descriptive name like `products-august-2026.csv`

**Apple Numbers:**
1. File > Export > CSV
2. Choose encoding: UTF-8
3. Save

**Important:** Always export as UTF-8 CSV, not Excel binary format.

---

## Part 4: Step-by-Step CSV Import

### Scenario 1: Import Products Into a Specific Collection

**Before you start:**
- Your CSV file is ready (see Part 3)
- You've tested that Image URLs are working
- You know which collection these products belong to (or you'll create one)

**Steps:**

1. **Log into the admin:** Go to https://cms.digitalallies.net/admin and log in

2. **Navigate to the Showroom:**
   - Sidebar > Showroom (or Products)
   - This shows your current product catalog

3. **Find or create the collection:**
   - Look for a "Collections" tab (or button)
   - If importing into existing collection, click "Edit" on that collection
   - If creating new, click "Create Collection", give it a name (e.g., "Best Sellers")
   - The collection now has an ID and you're editing it

4. **Scroll to "Import Spreadsheet Collection (CSV)":**
   - You'll see a section with upload area
   - It says "Upload a .csv spreadsheet containing columns: Title, Price, Category, Image URL, Description"

5. **Upload your CSV:**
   - Click the upload area or drag-and-drop your file
   - The importer reads the file and shows a preview
   - Preview displays: number of products found, first few rows parsed

6. **Review the preview:**
   - Scan titles, prices, categories — do they look right?
   - If something looks wrong, go back and fix your CSV, then re-upload
   - If looks good, proceed to next step

7. **Execute the import:**
   - Click the "Execute Import" button
   - The system uploads products to your database
   - Progress bar shows: creating products... linking to collection... done

8. **Success!**
   - You see "X products imported successfully"
   - Products are now in your catalog
   - If importing into a collection, they're automatically added to that collection's item list
   - Products appear on your live site (if marked Published and In Stock)

**Time:** Usually 30 seconds to 2 minutes depending on file size.

### Scenario 2: Import Products Without Specifying a Collection

If you just want to bulk-add products to your catalog without organizing into a collection yet:

1. Go to Showroom (not inside a specific collection)
2. Scroll to "Import Spreadsheet Collection (CSV)"
3. Upload your file
4. All products are created in your general catalog
5. Later, you can create a collection and manually add products to it (or re-import with a specific collection)

---

## Part 5: Troubleshooting

### "CSV file must have a header row and at least 1 data row"

**What this means:**
- Your file has fewer than 2 rows total
- Row 1 must be column headers
- Row 2+ must be data

**Fix:**
- Make sure your first row is: `Title, Price, Category, Image URL, Description`
- Make sure you have at least one product row below it
- Delete any blank rows at the bottom of the file

---

### "Failed to import spreadsheet collection"

**Common causes:**

1. **Image URLs are broken or incomplete**
   - Go back to your CSV, check that every Image URL starts with `https://`
   - Test a few URLs in your browser to confirm they work
   - Make sure the domain isn't behind a firewall or login
   - Re-export and try again

2. **Price column has non-numeric values**
   - Make sure Price column has only numbers (285.00, not $285 or "285 dollars")
   - No commas in prices (285.00 ✅, 285,00 ❌ depends on region; use decimals)
   - Delete any rows with invalid prices

3. **File encoding is wrong**
   - Re-export as UTF-8 CSV, not Excel or other format
   - Some spreadsheets default to regional encodings (ISO-8859-1, etc.)
   - Force UTF-8 during export

4. **Required columns are named differently**
   - The importer is forgiving (Title, title, TITLE all work)
   - But if a column is completely unnamed or blank, it gets skipped
   - Ensure every required column (Title, Price, Category, Image URL, Description) exists

**If you still can't get it working:**
- Email Anthony at `hello@digitalallies.net` with:
  - The CSV file (or first 5 rows as text)
  - Screenshot of the error
  - What you were trying to do
- Response within 24 hours

---

### Products imported but not showing on site

**Checklist:**

1. **Are they Published?**
   - Go to Showroom
   - Click each product
   - Check "Published" toggle is ON
   - If OFF, toggle it ON and save

2. **Are they In Stock?**
   - In the product editor, check "In Stock" toggle
   - If unchecked, they show as "sold" on the site (depending on your theme)

3. **Did you wait for cache to clear?**
   - Changes usually appear within 10-30 seconds
   - Refresh your browser (Cmd+R on Mac, Ctrl+R on Windows)
   - Wait another 30 seconds and refresh again

4. **Are they in the right category?**
   - Your site might have a homepage section showing only certain categories
   - Check that the product's category matches what's filtered on the homepage

5. **Are they in a collection, and is that collection featured?**
   - If products are only in a non-featured collection, they might not show on homepage
   - Go to Collections > find the collection > toggle "Featured" ON

---

### Products show duplicate titles or missing data

**Why this happens:**
- CSV had blank rows (importer creates a row even for blanks)
- Product titles are identical (creating the same product twice)
- Description or Image URL is missing

**Fix:**
- Delete extra rows in your CSV (no blank rows)
- Give every product a unique title
- Fill in Description and Image URL for every product (required columns)
- Re-upload

---

### Image not showing on live site (but import succeeded)

**Causes:**

1. **Image URL is broken**
   - Click the product on the site
   - Right-click the missing image > "Open image in new tab"
   - If it shows 404, the URL is dead
   - Update the product's Image URL in the Showroom editor

2. **Image is in a private folder**
   - Images must be publicly accessible (no login required)
   - If the image lives in a shared drive or private cloud storage, it won't load on the public site
   - Move images to a public CDN or folder

3. **Image is too small**
   - If the source image is tiny (<300px), it might appear blurry when enlarged
   - Use a higher-quality source image

4. **Caching issue**
   - Hard-refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
   - Wait 30 seconds and try again

---

## Part 6: Best Practices

### Collection Strategy

**Do:**
- Create 3-5 main collections that tell your story
- Use collections to highlight seasonal items or new arrivals
- Feature 1-2 collections on your homepage
- Name collections descriptively ("Living Room Finds" not "Collection 1")

**Don't:**
- Create too many collections (20+ gets overwhelming for visitors)
- Leave a featured collection empty (shows broken layout)
- Import the same product multiple times (causes duplicates)

### CSV Naming & Organization

**Do:**
- Name your CSV descriptively: `products-july-2026.csv`, `new-arrivals-august.csv`
- Keep historical CSVs (one per import session) in a folder like `~/Documents/Product Imports/`
- Update a master spreadsheet as your source of truth

**Don't:**
- Use generic names like `data.csv` (confusing later)
- Keep dozens of outdated CSVs on your desktop
- Copy-paste from old imports without verifying prices/descriptions

### Image Management

**Do:**
- Use high-quality images (600px+ wide)
- Name image files descriptively: `vintage-wicker-dresser-side-view.jpg`
- Upload to a stable cloud storage or CDN
- Test Image URLs in your browser before importing

**Don't:**
- Use tiny images that look blurry
- Use generic names like `photo1.jpg`
- Store images on a personal computer (they'll go offline)

### Data Validation

**Before uploading, check your CSV:**

```
# Open in your spreadsheet app and verify:
□ Header row is exactly: Title, Price, Category, Image URL, Description
□ No blank rows between products
□ Every product has: title, price, category, image URL, description
□ All prices are numbers (no $ or commas)
□ All image URLs start with https://
□ Categories are consistent (no "Chair" and "Chairs")
□ No special characters in titles that might break formatting
□ Total row count is products + 1 (for header)
```

---

## Part 7: Advanced Use Cases

### Use Case 1: Seasonal Collections

**Scenario:** Summer is ending; you want a "Late Summer Clearance" collection of old stock.

1. Filter your master product list to items you want to clear
2. Export as CSV (just Title, Price, Category, Image URL, Description columns)
3. Create a new collection called "Late Summer Clearance"
4. Import the CSV into that collection
5. Mark the collection as Featured
6. Set collection to appear on homepage
7. Optional: add a "clearance" discount price before importing, or edit prices in bulk after

### Use Case 2: Migrate Products From Another Platform

**Scenario:** You have products in an old system (Shopify, Etsy, etc.) and want to move them to DA.

1. Export from old platform as CSV
2. Map columns to DA format (some adjustment needed):
   - Old "Product Name" → DA "Title"
   - Old "Price" → DA "Price"
   - Old "Item Type" → DA "Category"
   - Old "Image URL" → DA "Image URL"
   - Old "Description" → DA "Description"
3. Use a spreadsheet formula or Google Sheets to reorder columns
4. Save as CSV
5. Upload to DA using CSV importer

### Use Case 3: Bulk Price Updates

**Scenario:** You want to update all products in a collection with new prices.

1. In the Showroom, find all products in that collection
2. Export the collection as CSV (if export feature available)
3. Update prices in the spreadsheet
4. Re-import (the importer will update existing products if IDs match)
5. Verify prices on live site

---

## Part 8: Templates

### CSV Template (Copy & Paste)

```csv
Title,Price,Category,Image URL,Description
"Vintage MCM Dining Set – Table + 4 Swivel Chairs",550.00,Seating,https://example.com/dining-set.jpg,"1970s pedestal base, cream vinyl chairs, light surface wear. Table: 42in W."
"Vintage Wicker Waterfall Dresser",285.00,Storage,https://example.com/dresser.jpg,"Handwoven wicker, warm honey finish. Four drawers, excellent condition. 38in W x 33in D."
"Rattan Wall Mirror",95.00,Decor,https://example.com/mirror.jpg,"Woven rattan frame, circular design. 24in diameter. Excellent condition."
```

Save this as `products-template.csv` and use it as a starting point for your imports.

### Google Sheets Template

Create a Google Sheet with columns: Title, Price, Category, Image URL, Description
- Share it with yourself or your team
- Fill it in as you source products
- When ready, export as CSV and import to DA

Link: [Create a new sheet](https://sheets.google.com)

---

## Glossary

- **CSV**: Comma-Separated Values. A simple text format that spreadsheet apps can read.
- **Collection**: A curated group of products (e.g., "Best Sellers").
- **Item ID**: A unique identifier (UUID) for each product.
- **Featured**: A toggle that makes a collection appear prominently on your homepage.
- **In Stock**: A toggle marking whether a product is available for sale.
- **Selling State**: How the product is sold (inquiry form, direct purchase, link to marketplace).
- **Image URL**: The web address (link) where an image file lives.
- **Category**: A type or grouping (e.g., Chairs, Lamps, Storage).
- **UTF-8**: A text encoding standard that supports all languages and special characters.

