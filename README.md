# TransferBuses.com

### Scripts

---

> `npm run-script start-{nickname from GitHub}` - starts an app with a test db and developer version in the site header
> 
> `npm run-script build-{nickname from GitHub}` - builds an app with a test db and developer version in the site header
> 
> `npm start` - starts an app with a test db and `<rmant7 Studio>_` version in the site header
>
> `npm run-script build-dev` - builds an app with a test db and `<rmant7 Studio>_` version in the site header
> 
> `npm run-script build` - builds an app with a production db without developer version in the site header

*All values can be changed in the file `.env-cmdrc`, syntax as a JSON object*

---

### Please delete old files when deploying to AWS S3

---

### Server installation
---
All sources for express server is in express folder.
Create new empty project and copy all sources from express folder.
Install all dependencies with `npm install`.
Move all JSON files to data and partly folders.
Run with `npm run start`.
Edit corsOption.origin for enable some front end domain (ex. http://localhost:3000)