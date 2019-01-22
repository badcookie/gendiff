install:
	npm install

start:
	npx babel-node -- src/bin/gendiff.js $(F1) $(F2)

publish:
	npm publish

lint:
	npx eslint .

test:
	npm test