#!/bin/bash
# Run this from the folder that holds your original photos AND the website files.
# It makes an "images" folder and saves every photo into it as a .jpeg with the
# short names the website expects. Your original photos are not changed.
mkdir -p images
put() {  # put "<original file>" <new name without extension>
  if [ -f "$1" ]; then
    if command -v sips >/dev/null 2>&1; then
      sips -s format jpeg -s formatOptions 85 "$1" --out "images/$2.jpeg" >/dev/null
    else
      cp "$1" "images/$2.jpeg"
    fi
    echo "ok       $2.jpeg  <-  $1"
  else
    echo "MISSING  $2.jpeg  <-  $1"
  fi
}
first() { for f in "$@"; do [ -f "$f" ] && { echo "$f"; return; }; done; echo "none"; }

# Rubbish Removal
put "Before Garage copy.jpeg"   rubbish-1-before
put "After Garage copy.jpeg"    rubbish-1-after
put "Before Garden copy.jpeg"   rubbish-2-before
put "After Garden copy.jpeg"    rubbish-2-after
put "Before Garage 2 copy.jpeg" rubbish-3-before
put "After Garage 2 copy.jpeg"  rubbish-3-after
put "Before copy.jpeg"          rubbish-4-before
put "After copy.jpeg"           rubbish-4-after

# Pressure Washing
put "Roof Before copy.png"      pressure-1-before
put "Roof After copy.png"       pressure-1-after
put "Pressure Before 2 copy.png" pressure-2-before
put "Pressure After 2 copy.png"  pressure-2-after

# Gardens and Landscaping (some of your names are cut off in Finder, so these match by the start of the name)
n=1
for f in Landscaping\ Backyar*.png Landscaping\ Final\ House*.[pP][nN][gG] Landscaping\ Nature*.jpg Landscaping\ Nature*.png; do
  [ -f "$f" ] && { put "$f" "gardens-$n"; n=$((n+1)); }
done

# People
put "OzTeenPeople copy.jpeg" team
put "IMG_1975.jpeg"          ute
echo "Done. Check the 'images' folder."
