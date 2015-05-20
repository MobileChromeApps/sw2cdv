# sw2cdv

Global installation

```
npm install -g sw2cdv
```

Try it on a sample service worker app:

```
mkdir swtest
cd swtest
git clone https://github.com/mwoghiren/ServiceWorkerSample.git
cd ServiceWorkerSample
sw2cdv create ios
sw2cdv run ios
```


Clone your own copy of sw2cdv:
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
sw2cdv create ios
sw2cdv run ios
```

## Notes

* Uses the web app manifest (`manifest.json`) to read out a `service_worker` value.
