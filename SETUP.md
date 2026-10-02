# Arda Atik Portfolio V2

## Local preview
Run from this folder:

    python3 -m http.server 8000

Then open http://localhost:8000

## Adding a project
Normally you only edit `data/projects.js`.

Add one object with:
- `id`
- `title`
- `description.en`
- `description.tr`
- `tags`
- exact public GitHub `repo` name
- `featured`
- `order`

The site automatically updates:
- Featured projects on Home
- All Projects
- Project detail
- GitHub link
- live README

README content intentionally remains in its original GitHub language.

## Shared UI
Navbar, footer, language switch, and back-to-top are rendered centrally from `script.js`.

## Language
TR/EN UI selection is stored in localStorage.


## V2.2
Verified rewrite of the interaction layer:
- fixed always-visible navbar
- whole-capsule TR/EN toggle with sliding indicator
- floating back-to-top after normal scrolling
- pointer-reactive 3D project cards and press feedback
- clickable phone/email cards
- four independent ambient lights reacting to scroll and pointer


## V2.4 root-cause fix
The previous versions animated `body.page-enter` with a CSS transform.
That transform created a containing block for all `position: fixed` descendants,
which caused the navbar, back-to-top control, and ambient layer to move with the
document. V2.4 removes transforms from BODY and keeps the entrance animation
opacity-only. Navbar, floating control, and ambient layer are now genuinely
viewport-fixed.


## V2.6
- Home spacing reduced for a denser portfolio landing page.
- Featured cards are shorter on Home only.
- Projects page has Grid/List view controls.
- Grid/List preference is stored in localStorage.
- No search or category filters were added.
