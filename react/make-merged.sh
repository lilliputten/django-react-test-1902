#!/bin/sh
cat build/bundles/*.js > build/bundles-merged.js
cat render-only.js build/bundles-merged.js > build/render-merged.js
uglifyjs build/render-merged.js -m > build/render-merged.min.js
