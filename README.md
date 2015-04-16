# sw2cdv

To install:

```
git clone https://github.com/MobileChromeApps/sw2cdv.git
cd sw2cdv
npm install
# npm link # Optional
./dev-bin/git-up.js
```

To try it using the gulp workflow:

```
cd tests/gulp
ln -sf ../MwoghirenServiceWorkerSample/ app # Or any other SW app
gulp ios
```

To use the command line `sw2cdv`:

```
cd tests/MwoghirenServiceWorkerSample/ # Or any other SW app
sw2cdv run ios
```

## Notes

* Uses the web app manifest (`manifest.json`) to read out a `service_worker` value.
