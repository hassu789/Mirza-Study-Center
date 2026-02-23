#!/bin/bash
# Download production images for Mirza Study Centre
# Uses Picsum (reliable) + Unsplash (when available) - all stored locally
set -e
BASE="public/images"
mkdir -p "$BASE"/{hero,subjects,courses,features,students,levels,patterns}

download() { curl -sL -o "$1" "$2" && echo "✓ $1"; }

# Hero (education/classroom themed - picsum seeds for consistency)
download "$BASE/hero/main.jpg" "https://picsum.photos/seed/msc-hero1/1200/800"
download "$BASE/hero/classroom.jpg" "https://picsum.photos/seed/msc-class1/1200/800"
download "$BASE/hero/students.jpg" "https://picsum.photos/seed/msc-stud1/1200/800"
download "$BASE/hero/library.jpg" "https://picsum.photos/seed/msc-lib1/1200/800"

# Subjects
download "$BASE/subjects/physics.jpg" "https://picsum.photos/seed/physics1/800/600"
download "$BASE/subjects/chemistry.jpg" "https://picsum.photos/seed/chemistry1/800/600"
download "$BASE/subjects/biology.jpg" "https://picsum.photos/seed/biology1/800/600"
download "$BASE/subjects/mathematics.jpg" "https://picsum.photos/seed/math1/800/600"
download "$BASE/subjects/english.jpg" "https://picsum.photos/seed/english1/800/600"
download "$BASE/subjects/commerce.jpg" "https://picsum.photos/seed/commerce1/800/600"

# Features
download "$BASE/features/results.jpg" "https://picsum.photos/seed/msc-results/800/600"
download "$BASE/features/tests.jpg" "https://picsum.photos/seed/msc-tests/800/600"

# Students
download "$BASE/students/about.jpg" "https://picsum.photos/seed/msc-about/800/600"
download "$BASE/students/group1.jpg" "https://picsum.photos/seed/msc-group/800/600"
download "$BASE/students/individual1.jpg" "https://picsum.photos/seed/msc-ind1/800/600"
cp "$BASE/students/individual1.jpg" "$BASE/students/individual2.jpg" && echo "✓ $BASE/students/individual2.jpg"

# Levels
download "$BASE/levels/junior.jpg" "https://picsum.photos/seed/msc-junior/800/600"
download "$BASE/levels/senior.jpg" "https://picsum.photos/seed/msc-senior/800/600"
download "$BASE/levels/higher.jpg" "https://picsum.photos/seed/msc-higher/800/600"

# Course images (reuse subjects by category)
cp -f "$BASE/subjects/physics.jpg" "$BASE/courses/physics910.jpg" 2>/dev/null || true
cp -f "$BASE/subjects/physics.jpg" "$BASE/courses/physics1112.jpg" 2>/dev/null || true
cp -f "$BASE/subjects/physics.jpg" "$BASE/courses/physicsBsc.jpg" 2>/dev/null || true
cp -f "$BASE/subjects/chemistry.jpg" "$BASE/courses/chemistry910.jpg" 2>/dev/null || true
cp -f "$BASE/subjects/chemistry.jpg" "$BASE/courses/chemistry1112.jpg" 2>/dev/null || true
cp -f "$BASE/subjects/chemistry.jpg" "$BASE/courses/chemistryBsc.jpg" 2>/dev/null || true
cp -f "$BASE/subjects/biology.jpg" "$BASE/courses/biology910.jpg" 2>/dev/null || true
cp -f "$BASE/subjects/biology.jpg" "$BASE/courses/biology1112.jpg" 2>/dev/null || true
cp -f "$BASE/subjects/biology.jpg" "$BASE/courses/biologyBsc.jpg" 2>/dev/null || true
cp -f "$BASE/subjects/commerce.jpg" "$BASE/courses/commerce1112.jpg" 2>/dev/null || true
cp -f "$BASE/subjects/mathematics.jpg" "$BASE/courses/maths68.jpg" 2>/dev/null || true
cp -f "$BASE/subjects/mathematics.jpg" "$BASE/courses/maths910.jpg" 2>/dev/null || true
cp -f "$BASE/subjects/mathematics.jpg" "$BASE/courses/maths1112.jpg" 2>/dev/null || true
cp -f "$BASE/subjects/english.jpg" "$BASE/courses/english68.jpg" 2>/dev/null || true
cp -f "$BASE/subjects/english.jpg" "$BASE/courses/english910.jpg" 2>/dev/null || true
cp -f "$BASE/subjects/english.jpg" "$BASE/courses/english1112.jpg" 2>/dev/null || true
echo "✓ Course images (from subjects)"

# Patterns (SVG - lightweight, no download needed)
cat > "$BASE/patterns/gradient1.svg" << 'SVG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#7c3aed"/><stop offset="100%" style="stop-color:#9333ea"/></linearGradient></defs><rect width="1200" height="400" fill="url(#g)"/></svg>
SVG
cp "$BASE/patterns/gradient1.svg" "$BASE/patterns/abstract.svg"
echo "✓ Patterns (SVG)"

echo ""
echo "Done! All images are now stored locally in public/images/"
echo "Tip: Replace with your own photos for a more personalized site."
