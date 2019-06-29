diff:
	diff -ur chrome firefox > a.diff

gen: FILE ?= images/icons/logo.png
gen:
	convert -resize 128x128 -quality 90 ${FILE} `echo ${FILE} | sed 's/\.png$$/-128.png/'`
	convert -resize 48x48 -quality 90 ${FILE} `echo ${FILE} | sed 's/\.png$$/-48.png/'`
	convert -resize 32x32 -quality 90 ${FILE} `echo ${FILE} | sed 's/\.png$$/-32.png/'`
	convert -resize 16x16 -quality 90 ${FILE} `echo ${FILE} | sed 's/\.png$$/-16.png/'`
