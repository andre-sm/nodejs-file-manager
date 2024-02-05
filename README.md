# Node.js File Manager

### 1. Clone repository
```
git clone https://github.com/andre-sm/nodejs-file-manager
```
### 2. Go to the project directory
```
cd nodejs-file-manager
```
### 3. Switch to `dev` branch
```
git checkout dev
```
### 4. Start app
```
npm run start -- --username=your_username
```

## Notes

* All paths or filenames with spaces must be enclosed in quotes. Example:
```
rn "C:/Users/Andy/My Music/playlist.m3u" "anjunadeep playlist.m3u"
```

* In compress and decompress operations the second argument must be the destination folder. Example:
```
compress C:/Users/Andy/Music/file.txt C:/Users/Andy/Music
```