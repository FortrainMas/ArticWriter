# Artic writer
###### _Free social network for article authors_
#
#
#
## Getting started
#### Installation
```sh
git clone https://github.com/FortrainMas/ArticWriter.git
cd ArticWriter
```
#### Starting back-end side
```sh
cd server
npm i
```

#### Starting front-end side
```sh
cd ../front
yarn add
```

#### Config
Then you need to make the config file in ArticWriter/server/config/default.json
```sh
{
    "secretDeletionKey": "<Now, it doesn't work>",
    "mongoConnectionString": "<your_mongo_connection_string>"
}
```

##### Maybe in future I will add some features. Some things were added on the server, but not on the front - end.
##### So here are some things to add in the future.
- **Article rating**
- **Updating and deleting articles**
- **Some censorship mechanisms to avoid the spam**

MIT

**Free Software, Hell Yeah!**
