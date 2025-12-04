# Magazine Entry Documentation

This guide explains how to create properly formatted magazine entries for the OLD UFO MAGS archive.

## JSON Structure

Magazine data is stored in `/src/data/magazines.json` with the following structure:

```json
{
  "magazines": [
    {
      "id": "string",
      "slug": "string",
      "coverName": "string",
      "date": "string",
      "description": "string",
      "customText": "string",
      "coverImage": "string",
      "archiveUrl": "string"
    }
  ]
}
```

## Field Definitions

### id (required)
- **Type**: String
- **Purpose**: Unique identifier for the magazine entry
- **Format**: Lowercase, hyphenated, no spaces or special characters
- **Typically**: Matches the slug field
- **Example**: `"nov-dec-1997"`, `"jan-1998"`, `"summer-1999"`

### slug (required)
- **Type**: String
- **Purpose**: URL-friendly identifier used in the magazine reader page URL
- **Format**: Lowercase, hyphens instead of spaces, no special characters
- **Generated from**: Magazine publication date
- **Used in URL**: `/magazine/[slug]`
- **Examples**:
  - `"nov-dec-1997"` → `/magazine/nov-dec-1997`
  - `"jan-1998"` → `/magazine/jan-1998`
  - `"summer-1999"` → `/magazine/summer-1999`

**Slug Generation Rules:**
1. Convert date to lowercase
2. Replace spaces with hyphens
3. Replace slashes with hyphens
4. Remove special characters
5. Ensure uniqueness

### coverName (required)
- **Type**: String
- **Purpose**: The title/name as it appears on the magazine cover
- **Format**: Exact text from cover, proper capitalization
- **Searchable**: Yes (used in search functionality)
- **Examples**:
  - `"UFO Magazine"`
  - `"UFO Universe"`
  - `"Saucer Smear"`

### date (required)
- **Type**: String
- **Purpose**: Publication date as shown on the magazine cover
- **Format**: Flexible - match what's on the cover
- **Searchable**: Yes (used in search functionality)
- **Examples**:
  - `"Nov/Dec 1997"`
  - `"January 1998"`
  - `"Summer 1999"`
  - `"Vol. 12 No. 3 - 1995"`

### description (required)
- **Type**: String
- **Purpose**: Brief description of the issue's content and highlights
- **Format**: 1-3 sentences, plain text
- **Searchable**: Yes (used in search functionality)
- **Guidelines**:
  - Mention main articles or features
  - Highlight notable topics or interviews
  - Keep it concise and informative
- **Example**: `"Features articles on the Phoenix Lights incident, government disclosure, and interviews with leading researchers. Includes photo analysis and eyewitness testimonies."`

### customText (required)
- **Type**: String
- **Purpose**: Additional context, historical notes, or interesting facts
- **Format**: 1-2 sentences, plain text
- **Searchable**: Yes (used in search functionality)
- **Guidelines**:
  - Add historical context
  - Note special features or significance
  - Mention related events or issues
  - Can be empty string if no additional context needed
- **Example**: `"This issue includes a special report on the mass UFO sighting over Arizona in March 1997, one of the most witnessed UFO events in history."`

### coverImage (required)
- **Type**: String
- **Purpose**: Path to the magazine cover image file
- **Format**: Absolute path starting with `/covers/`
- **File Location**: `/public/covers/` directory
- **Supported Formats**: JPG, PNG, WebP
- **Guidelines**:
  - Use descriptive filenames matching the slug
  - Optimize images for web (800-1200px width recommended)
  - Compress to reduce file size
- **Example**: `"/covers/nov-dec-1997.jpg"`

### archiveUrl (required)
- **Type**: String
- **Purpose**: Full URL to the magazine's Internet Archive detail page
- **Format**: Complete URL starting with `https://archive.org/details/`
- **Used for**: Embedding the BookReader viewer
- **Example**: `"https://archive.org/details/36-37_20251202"`

## Complete Example Entry

```json
{
  "id": "nov-dec-1997",
  "slug": "nov-dec-1997",
  "coverName": "UFO Magazine",
  "date": "Nov/Dec 1997",
  "description": "Features articles on the Phoenix Lights incident, government disclosure, and interviews with leading researchers. Includes photo analysis and eyewitness testimonies.",
  "customText": "This issue includes a special report on the mass UFO sighting over Arizona in March 1997, one of the most witnessed UFO events in history.",
  "coverImage": "/covers/nov-dec-1997.jpg",
  "archiveUrl": "https://archive.org/details/36-37_20251202"
}
```

## Multiple Entries Example

```json
{
  "magazines": [
    {
      "id": "nov-dec-1997",
      "slug": "nov-dec-1997",
      "coverName": "UFO Magazine",
      "date": "Nov/Dec 1997",
      "description": "Features articles on the Phoenix Lights incident, government disclosure, and interviews with leading researchers.",
      "customText": "This issue includes a special report on the mass UFO sighting over Arizona in March 1997.",
      "coverImage": "/covers/nov-dec-1997.jpg",
      "archiveUrl": "https://archive.org/details/36-37_20251202"
    },
    {
      "id": "jan-1998",
      "slug": "jan-1998",
      "coverName": "UFO Magazine",
      "date": "January 1998",
      "description": "Explores the Roswell incident anniversary, new declassified documents, and Area 51 investigations.",
      "customText": "Special 50th anniversary coverage of the Roswell crash with never-before-seen photographs.",
      "coverImage": "/covers/jan-1998.jpg",
      "archiveUrl": "https://archive.org/details/ufo-mag-jan-1998"
    },
    {
      "id": "summer-1999",
      "slug": "summer-1999",
      "coverName": "UFO Universe",
      "date": "Summer 1999",
      "description": "Features on crop circles, alien abduction research, and the Belgian UFO wave. Includes exclusive interviews with researchers.",
      "customText": "This summer special edition covers the mysterious crop circle formations appearing across England.",
      "coverImage": "/covers/summer-1999.jpg",
      "archiveUrl": "https://archive.org/details/ufo-universe-summer-99"
    }
  ]
}
```

## Slug Generation Examples

Here are examples of how to generate slugs from various date formats:

| Magazine Date | Generated Slug |
|--------------|----------------|
| Nov/Dec 1997 | nov-dec-1997 |
| January 1998 | january-1998 or jan-1998 |
| Summer 1999 | summer-1999 |
| Vol. 12 No. 3 - 1995 | vol-12-no-3-1995 |
| March-April 1996 | march-april-1996 |
| Fall 1998 | fall-1998 |
| Issue #45 - 1997 | issue-45-1997 |

**Best Practices:**
- Keep slugs short but descriptive
- Use the date as the primary identifier
- Ensure each slug is unique
- Avoid special characters and spaces
- Use lowercase only

## Validation Checklist

Before adding a new magazine entry, verify:

- [ ] All required fields are present
- [ ] `id` and `slug` are unique (not used by other entries)
- [ ] `slug` is URL-friendly (lowercase, hyphens, no special characters)
- [ ] `coverImage` path starts with `/covers/`
- [ ] Cover image file exists in `/public/covers/` directory
- [ ] `archiveUrl` is a valid Internet Archive URL
- [ ] `archiveUrl` points to a publicly accessible magazine
- [ ] JSON syntax is valid (no trailing commas, proper quotes)
- [ ] Description and customText are informative and concise
- [ ] All text fields use proper grammar and spelling

## Common Mistakes to Avoid

1. **Duplicate IDs or Slugs**: Each entry must have a unique identifier
2. **Invalid JSON**: Missing commas, quotes, or brackets will break the site
3. **Wrong Image Paths**: Must start with `/covers/`, not `./covers/` or `covers/`
4. **Missing Cover Files**: Ensure the image file exists before adding the entry
5. **Invalid Archive URLs**: Test the URL in a browser before adding
6. **Empty Required Fields**: All fields must have values (can be empty string for customText)
7. **Special Characters in Slugs**: Use only lowercase letters, numbers, and hyphens

## Testing Your Entry

After adding a new magazine entry:

1. **Validate JSON**: Use a JSON validator to check syntax
2. **Run Development Server**: `npm run dev`
3. **Test Search**: Search for the magazine by name, date, or keywords
4. **Check Listing Page**: Visit `/magazines` and verify the card appears
5. **Test Reader Page**: Visit `/magazine/[slug]` and verify:
   - Cover image loads
   - Metadata displays correctly
   - Internet Archive embed works
   - "Back to Magazines" button functions
6. **Build Test**: Run `npm run build` to ensure static generation works

## Getting Internet Archive URLs

1. Visit [archive.org](https://archive.org)
2. Upload your magazine PDF (requires free account)
3. Fill in metadata:
   - Title: Magazine name and date
   - Creator: Original publisher
   - Description: Brief description
   - Subject: "UFO", "magazines", "1990s"
   - Language: English (or appropriate language)
   - License: Choose appropriate license
4. After upload, copy the detail page URL
5. Format: `https://archive.org/details/[identifier]`

## Need Help?

If you encounter issues:
- Check the JSON syntax with a validator
- Review existing entries for reference
- Ensure all file paths are correct
- Test locally before deploying
- Check browser console for errors

For more information, see the main README.md file.
